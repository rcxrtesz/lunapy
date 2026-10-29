// Web Worker que aloja Pyodide. El código del alumno se ejecuta aquí,
// fuera del hilo de la interfaz y sin acceso al DOM.
const PYODIDE_VERSION = '0.27.7';
importScripts(`https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`);

let ready = null;

// Token secreto de esta instancia: solo vive en el ámbito léxico del worker (no en `self`),
// así que el código Python no puede leerlo ni falsificar respuestas del motor.
const TOKEN = self.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Math.random()}${Date.now()}`;
const send = self.postMessage.bind(self); // capturado antes de que se ejecute código del alumno

async function boot() {
  const pyodide = await loadPyodide({ stdout: () => {}, stderr: () => {} });
  const src = await (await fetch(new URL('./runtime.py', self.location.href))).text();
  // El motor se carga en un módulo privado, fuera de __main__ y de sys.modules, para que
  // el código del alumno no lo encuentre con un simple «import __main__».
  pyodide.globals.set('__lunapy_src', src);
  const exported = pyodide.runPython(`
import types as _types
_engine = _types.ModuleType("_lunapy_engine")
exec(compile(__lunapy_src, "lunapy_engine.py", "exec"), _engine.__dict__)
_exported = {k: getattr(_engine, k) for k in ("api_run", "api_trace", "api_check", "api_version")}
del _engine, _types, __lunapy_src
_exported
`);
  const api = {
    run: exported.get('api_run'),
    trace: exported.get('api_trace'),
    check: exported.get('api_check'),
    version: exported.get('api_version'),
  };
  exported.destroy();
  pyodide.runPython('del _exported');
  const { python } = JSON.parse(api.version('{}'));
  send({ type: 'ready', python, token: TOKEN });
  return api;
}

ready = boot().catch((err) => {
  send({ type: 'boot-error', message: String(err && err.message ? err.message : err) });
  throw err;
});

self.onmessage = async (e) => {
  const { id, op, payload } = e.data;
  try {
    const api = await ready;
    const out = api[op](JSON.stringify(payload));
    send({ id, ok: true, result: JSON.parse(out), token: TOKEN });
  } catch (err) {
    send({ id, ok: false, message: String(err && err.message ? err.message : err), token: TOKEN });
  }
};
