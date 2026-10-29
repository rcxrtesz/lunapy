// Cliente del motor de Python. Gestiona el worker, los límites de tiempo y
// la reanudación de programas que usan input().
//
// Las peticiones se envían de una en una (cola): el límite de tiempo empieza a
// contar cuando el worker recibe cada programa, y si uno se cuelga solo ese
// recibe el aviso de tiempo agotado; los demás esperan al worker nuevo.

const TIMEOUTS = { run: 5000, trace: 6000, check: 10000 };

class PythonEngine {
  constructor() {
    this.state = 'idle'; // idle | loading | ready | error
    this.python = null;
    this.error = null;
    this.listeners = new Set();
    this.queue = []; // peticiones esperando turno
    this.inflight = null; // la petición que está ejecutando el worker
    this.nextId = 1;
    this.worker = null;
    this.token = null;
    this.needsRestart = false;
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _set(state, extra = {}) {
    Object.assign(this, { state }, extra);
    this.listeners.forEach((fn) => fn(this));
  }

  start() {
    if (this.worker) return;
    this._set('loading');
    this.token = null;
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    this.worker = worker;
    worker.onmessage = (e) => {
      if (worker !== this.worker) return; // mensaje tardío de un worker ya sustituido
      const msg = e.data;
      if (msg.type === 'ready') {
        if (this.token) return; // solo vale el primer «listo», antes de ejecutar código del alumno
        this.token = msg.token;
        this._set('ready', { python: msg.python, error: null });
        return this._pump();
      }
      if (msg.type === 'boot-error') {
        this._set('error', { error: msg.message });
        return this._failAll(new Error(msg.message));
      }
      if (!this.token || msg.token !== this.token) return; // mensaje que no viene del motor
      const job = this.inflight;
      if (!job || job.id !== msg.id) return;
      clearTimeout(job.timer);
      this.inflight = null;
      msg.ok ? job.resolve(msg.result) : job.reject(new Error(msg.message));
      // Si el código del alumno manipuló el motor, o el motor falló por dentro, se usa un
      // intérprete nuevo antes de atender la siguiente petición.
      if (!msg.ok || (msg.result && msg.result.tampered)) this._restart();
      else this._pump();
    };
    worker.onerror = (e) => {
      this._set('error', { error: e.message || 'No se pudo iniciar Python' });
      this._failAll(new Error(this.error));
    };
  }

  _restart() {
    this.needsRestart = false;
    if (this.worker) this.worker.terminate();
    this.worker = null;
    this.start(); // al estar listo, _pump() envía lo que quede en la cola
  }

  _failAll(err) {
    const jobs = [...(this.inflight ? [this.inflight] : []), ...this.queue];
    this.inflight = null;
    this.queue = [];
    jobs.forEach((j) => { clearTimeout(j.timer); j.reject(err); });
  }

  _pump() {
    if (this.inflight || this.state !== 'ready' || !this.queue.length) return;
    const job = this.queue.shift();
    this.inflight = job;
    job.timer = setTimeout(() => {
      if (this.inflight !== job) return;
      this.inflight = null;
      job.resolve(timeoutResult(job.op));
      this._restart();
    }, TIMEOUTS[job.op] || 5000);
    this.worker.postMessage({ id: job.id, op: job.op, payload: job.payload });
  }

  call(op, payload) {
    this.start();
    return new Promise((resolve, reject) => {
      this.queue.push({ id: this.nextId++, op, payload, resolve, reject, timer: null });
      this._pump();
    });
  }

  run(code, stdin = [], seed) { return this.call('run', { code, stdin, seed }); }
  trace(code, stdin = [], seed) { return this.call('trace', { code, stdin, seed }); }
  check(code, spec) { return this.call('check', { code, spec }); }
}

function timeoutResult(op) {
  const error = {
    type: 'Timeout', kind: 'ejecucion', line: null, code_line: '',
    title: 'El programa ha tardado demasiado',
    explanation: `Lo hemos detenido tras ${(TIMEOUTS[op] || 5000) / 1000} segundos para que no bloquee la página.`,
    suggestion: '¿Hay un bucle que nunca termina? Comprueba que la condición del bucle llega a ser falsa.',
    original: '',
  };
  if (op === 'check') return { status: 'fail', category: 'ejecucion', title: error.title, message: error.explanation, error, cases: [] };
  return { status: 'error', segs: [], error, steps: [] };
}

export const engine = new PythonEngine();

export const newSeed = () => Math.floor(Math.random() * 1e9);
