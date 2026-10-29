import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { EngineLoading, useEngine } from '../components/common.js';
import { Editor, Console, ErrorCard, useRunner } from '../components/code.js';
import { Tracer } from '../components/tracer.js';
import { actions, getState } from '../state/store.js';

const EXAMPLES = [
  { name: 'Mi primer programa', code: '# Escribe tu código aquí y pulsa Ejecutar (o Ctrl+Intro)\nnombre = "Python"\nprint("Hola,", nombre)\n' },
  { name: 'Saludo con input()', code: 'nombre = input("¿Cómo te llamas? ")\nedad = int(input("¿Cuántos años tienes? "))\nprint("Hola,", nombre)\nprint("Dentro de 10 años tendrás", edad + 10)\n' },
  { name: 'Tipos de datos', code: 'entero = 42\ndecimal = 3.14\ntexto = "42"\nprint(type(entero), type(decimal), type(texto))\nprint(entero + 8)\nprint(texto + "8")\nprint(int(texto) + 8)\n' },
  { name: 'Acumulador', code: 'total = 0\ntotal = total + 12.5\ntotal = total + 7.5\ntotal = total + 30\nprint("Total de la compra:", total)\n' },
  { name: 'Provoca un error', code: '# Ejecuta y lee cómo se explica el error.\n# Después, corrígelo.\nprecio = 20\nmensaje = "El precio es " + precio\nprint(mensaje)\n' },
];

export function Lab() {
  const eng = useEngine();
  const [code, setCode] = useState(() => getState().lab ?? EXAMPLES[0].code);
  const [trace, setTrace] = useState(null);
  const runner = useRunner({ onRun: () => actions.labRun() });

  useEffect(() => {
    const t = setTimeout(() => actions.saveLab(code), 500);
    return () => clearTimeout(t);
  }, [code]);

  const run = () => { setTrace(null); runner.run(code); };

  return html`<div>
    <div class="page-head" style="margin-bottom:16px">
      <div class="eyebrow">Laboratorio Python</div>
      <h1>Experimenta sin miedo</h1>
      <p>Python ${eng.python || '3'} real ejecutándose en tu navegador (Pyodide), aislado en un proceso independiente y con límite de tiempo. Tu código se guarda automáticamente.</p>
    </div>
    <div class="lab">
      <div class="stack">
        <div class="editor-wrap">
          <div class="editor-toolbar">
            <span class="label"><${Icon} name="code" size=${14} /> laboratorio.py</span>
            <select class="input sm" style="padding:5px 8px;font-size:.82rem;background:var(--code-bg);color:var(--code-text);border-color:var(--code-border)"
              aria-label="Cargar un ejemplo" onChange=${(e) => { const ex = EXAMPLES[e.target.value]; if (ex) { setCode(ex.code); runner.clear(); setTrace(null); } e.target.value = ''; }}>
              <option value="">Ejemplos…</option>
              ${EXAMPLES.map((ex, i) => html`<option value=${i}>${ex.name}</option>`)}
            </select>
            <button class="btn sm" onClick=${() => { setCode(''); runner.clear(); setTrace(null); }} title="Vaciar el editor"><${Icon} name="trash" size=${14} /></button>
            <button class="btn sm" onClick=${() => setTrace(code)}><${Icon} name="footsteps" size=${14} /> <span class="hide-mobile">Paso a paso</span></button>
            <button class="btn sm run" onClick=${run} disabled=${runner.status === 'running'}><${Icon} name="play" size=${14} /> Ejecutar</button>
          </div>
          <${Editor} value=${code} onChange=${setCode} onRun=${run} errorLine=${runner.error && runner.error.line} minLines=${14} label="Editor del laboratorio" />
        </div>
        <div class="tiny faint"><kbd>Ctrl</kbd>+<kbd>Intro</kbd> ejecuta · <kbd>Tab</kbd> sangra · <kbd>Esc</kbd> sale del editor</div>
      </div>
      <div class="stack">
        <${EngineLoading} />
        <${Console} runner=${runner} />
        <${ErrorCard} error=${runner.error} />
        <div class="card flat">
          <div class="card-title"><${Icon} name="book" size=${16} /> Chuleta rápida</div>
          <div class="small stack" style="gap:6px">
            <div><code>x = 5</code> asigna el valor 5 al nombre x</div>
            <div><code>print(a, b)</code> muestra valores separados por espacios</div>
            <div><code>input("Texto: ")</code> pide un dato (siempre devuelve str)</div>
            <div><code>int(t)</code> · <code>float(t)</code> · <code>str(n)</code> convierten tipos</div>
            <div><code>type(x)</code> dice el tipo de un valor</div>
            <div class="tiny muted" style="margin-top:4px">Cómo funciona <code>input()</code> aquí: cada vez que escribes un dato, el programa se vuelve a ejecutar desde el principio con todos los datos ya escritos. El resultado es el mismo, salvo en programas que muestran la hora actual, que puede cambiar entre una ejecución y otra.</div>
          </div>
        </div>
      </div>
    </div>
    ${trace && html`<div style="margin-top:18px"><${Tracer} code=${trace} /></div>`}
  </div>`;
}
