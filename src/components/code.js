import { html, useEffect, useRef, useState, useCallback } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { highlightLine } from '../lib/highlight.js';
import { engine, newSeed } from '../engine/python.js';
import { actions } from '../state/store.js';

/** Código de solo lectura con resaltado y marcas de línea. */
export function CodeView({ code, next = null, prev = null, errLine = null }) {
  const lines = code.split('\n');
  return html`<pre class="code-pre"><code>${lines.map((ln, i) => {
    const n = i + 1;
    const cls = n === errLine ? 'errline' : n === next ? 'next' : n === prev ? 'prev' : '';
    return html`<div class=${`code-line ${cls}`} key=${n}>
      <span class="marker">${n === next ? '➜' : ''}</span>
      <span class="ln">${n}</span>
      <span class="lc" dangerouslySetInnerHTML=${{ __html: highlightLine(ln) || ' ' }} />
    </div>`;
  })}</code></pre>`;
}

/** Editor real (CodeMirror 5): resaltado, sangría automática, números de línea. */
const LONG_PROGRAM = 300; // líneas a partir de las cuales el editor deja de dibujar todo el documento

export function Editor({ value, onChange, onRun, errorLine = null, minLines = 5, label = 'Editor de código' }) {
  const host = useRef(null);
  const cm = useRef(null);
  const cbs = useRef({});
  const emitted = useRef(null); // último valor que el editor comunicó con onChange
  cbs.current = { onChange, onRun };

  useEffect(() => {
    const CM = window.CodeMirror;
    if (!CM || !host.current) return undefined;
    const ed = CM(host.current, {
      value: value || '',
      mode: 'python',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      smartIndent: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      viewportMargin: Infinity,
      screenReaderLabel: label,
      extraKeys: {
        Tab: (c) => (c.somethingSelected() ? c.indentSelection('add') : c.replaceSelection('    ', 'end')),
        'Shift-Tab': (c) => c.indentSelection('subtract'),
        'Ctrl-Enter': () => cbs.current.onRun && cbs.current.onRun(),
        'Cmd-Enter': () => cbs.current.onRun && cbs.current.onRun(),
        Esc: (c) => c.getInputField().blur(), // permite salir del editor con el teclado
      },
    });
    if (minLines <= 2) host.current.classList.add('cm-compact');
    const fitViewport = () => {
      // Con programas largos se dibujan solo las líneas visibles (más margen): escribir sigue siendo fluido.
      const margin = ed.lineCount() > LONG_PROGRAM ? 40 : Infinity;
      if (ed.getOption('viewportMargin') !== margin) ed.setOption('viewportMargin', margin);
    };
    fitViewport();
    ed.on('change', () => {
      fitViewport();
      const v = ed.getValue();
      emitted.current = v;
      if (cbs.current.onChange) cbs.current.onChange(v);
    });
    cm.current = ed;
    return () => { host.current && (host.current.innerHTML = ''); cm.current = null; };
  }, []);

  // Sincroniza cambios externos (restaurar, solución…). Si el valor es el que acaba de
  // escribir el propio editor, no hace falta releer todo el documento.
  useEffect(() => {
    const ed = cm.current;
    if (!ed || value === emitted.current) return;
    if (value !== ed.getValue()) ed.setValue(value || '');
  }, [value]);

  useEffect(() => {
    const ed = cm.current;
    if (!ed) return undefined;
    if (errorLine && errorLine <= ed.lineCount()) {
      const h = ed.addLineClass(errorLine - 1, 'background', 'cm-error-line');
      return () => ed.removeLineClass(h, 'background', 'cm-error-line');
    }
    return undefined;
  }, [errorLine]);

  return html`<div ref=${host} />`;
}

/**
 * Ejecuta programas con soporte de input(): si el programa pide un dato,
 * la consola lo solicita y el programa se vuelve a ejecutar desde el principio
 * con todos los datos introducidos (misma semilla aleatoria, misma salida).
 */
export function useRunner({ onRun } = {}) {
  const [st, set] = useState({ status: 'idle', segs: [], error: null, prompt: null, stdin: [] });
  const ctx = useRef({ code: '', seed: 0 });

  const exec = useCallback(async (code, stdin) => {
    set((s) => ({ ...s, status: 'running', stdin }));
    const res = await engine.run(code, stdin, ctx.current.seed).catch((e) => ({ status: 'error', segs: [], error: { title: 'Error interno', explanation: String(e.message), suggestion: '', kind: 'ejecucion', original: '' } }));
    set({ status: res.status === 'need_input' ? 'input' : res.status === 'error' ? 'error' : 'done', segs: res.segs || [], error: res.error, prompt: res.prompt, stdin });
    return res;
  }, []);

  const run = useCallback((code) => {
    ctx.current = { code, seed: newSeed() };
    actions.programRun();
    onRun && onRun();
    return exec(code, []);
  }, [exec, onRun]);

  const submit = useCallback((value) => exec(ctx.current.code, [...st.stdin, value]), [exec, st.stdin]);
  const clear = useCallback(() => set({ status: 'idle', segs: [], error: null, prompt: null, stdin: [] }), []);
  return { ...st, run, submit, clear };
}

export function Console({ runner, title = 'Consola', placeholder = 'Pulsa Ejecutar para ver aquí la salida del programa.' }) {
  const [val, setVal] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    if (runner.status === 'input' && inputRef.current) inputRef.current.focus({ preventScroll: true });
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [runner.status, runner.segs]);
  const send = (e) => { e.preventDefault(); runner.submit(val); setVal(''); };
  const empty = !runner.segs.length;
  return html`<div class="console">
    <div class="console-head"><${Icon} name="terminal" size=${14} /> ${title}
      <span class="spacer" />
      ${runner.status === 'running' && html`<span>Ejecutando…</span>`}
      ${runner.status === 'done' && html`<span style="color:#3ccf8e">✓ Programa terminado</span>`}
      ${runner.status === 'error' && html`<span style="color:#ff8a8e">✗ Terminado con error</span>`}
      ${runner.status === 'input' && html`<span style="color:#ffcf5c">Esperando un dato…</span>`}
    </div>
    <div class="console-body" ref=${bodyRef} aria-live="polite">
      ${empty && runner.status !== 'input' ? html`<span class="placeholder">${{
          running: 'Ejecutando…',
          done: '(El programa ha terminado sin mostrar nada. ¿Falta un print?)',
          error: '(El programa se ha detenido por un error antes de mostrar nada.)',
        }[runner.status] || placeholder}</span>`
        : runner.segs.map(([k, s]) => html`<span class=${`seg-${k}`}>${s}</span>`)}
    </div>
    ${runner.status === 'input' && html`<form class="console-input" onSubmit=${send}>
      <input ref=${inputRef} value=${val} onInput=${(e) => setVal(e.target.value)} aria-label=${`Dato para input(): ${runner.prompt || ''}`} placeholder="Escribe y pulsa Intro" />
      <button class="btn sm" type="submit">Enviar</button>
    </form>`}
  </div>`;
}

export function ErrorCard({ error, compact = false }) {
  if (!error) return null;
  const syntax = error.kind === 'sintaxis';
  return html`<div class=${`error-card ${syntax ? 'syntax' : ''}`} role="alert">
    <h4><${Icon} name=${syntax ? 'pencil' : 'bug'} />
      ${error.title}
      ${error.line && html`<span class="tag">${`Línea ${error.line}`}</span>`}
      <span class=${`tag ${syntax ? 'warn' : 'err'}`}>${syntax ? 'Error de sintaxis' : 'Error de ejecución'}</span>
    </h4>
    ${error.code_line && html`<code style="display:inline-block;margin-bottom:6px">${error.code_line.trim()}</code>`}
    <div>${error.explanation}</div>
    ${error.suggestion && html`<div class="sug"><strong>Qué probar:</strong> ${error.suggestion}</div>`}
    ${!compact && error.original && html`<div class="orig">Mensaje original de Python → ${error.original}</div>`}
  </div>`;
}

/** Bloque de código de la lección: editable y ejecutable con Python real. */
export function RunnableCode({ code: initial, title, caption }) {
  const [code, setCode] = useState(initial);
  const runner = useRunner();
  return html`<div class="stack" style="gap:10px">
    <div class="editor-wrap">
      <div class="editor-toolbar">
        <span class="label"><${Icon} name="code" size=${14} /> ${title || 'Pruébalo'} · <span class="tiny">editable</span></span>
        ${code !== initial && html`<button class="btn sm" onClick=${() => { setCode(initial); runner.clear(); }} title="Restaurar el código original"><${Icon} name="rotate" size=${14} /> Restaurar</button>`}
        <button class="btn sm run" onClick=${() => runner.run(code)} disabled=${runner.status === 'running'}><${Icon} name="play" size=${14} /> Ejecutar</button>
      </div>
      <${Editor} value=${code} onChange=${setCode} onRun=${() => runner.run(code)} minLines=${1} errorLine=${runner.error && runner.error.line} />
    </div>
    ${caption && html`<div class="small muted">${caption}</div>`}
    ${runner.status !== 'idle' && html`<${Console} runner=${runner} />`}
    <${ErrorCard} error=${runner.error} />
  </div>`;
}
