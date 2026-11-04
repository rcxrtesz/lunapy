import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { EngineLoading, useEngine } from '../components/common.js';
import { Editor, Console, ErrorCard, useRunner } from '../components/code.js';
import { Tracer } from '../components/tracer.js';
import { actions, getState } from '../state/store.js';
import { t, EN } from '../lib/i18n.js';

const EXAMPLES = EN ? [
  { name: 'My first program', code: '# Write your code here and press Run (or Ctrl+Enter)\nname = "Python"\nprint("Hello,", name)\n' },
  { name: 'Greeting with input()', code: 'name = input("What\'s your name? ")\nage = int(input("How old are you? "))\nprint("Hello,", name)\nprint("In 10 years you will be", age + 10)\n' },
  { name: 'Data types', code: 'integer = 42\ndecimal = 3.14\ntext = "42"\nprint(type(integer), type(decimal), type(text))\nprint(integer + 8)\nprint(text + "8")\nprint(int(text) + 8)\n' },
  { name: 'Accumulator', code: 'total = 0\ntotal = total + 12.5\ntotal = total + 7.5\ntotal = total + 30\nprint("Shopping total:", total)\n' },
  { name: 'Cause an error', code: '# Run it and read how the error is explained.\n# Then fix it.\nprice = 20\nmessage = "The price is " + price\nprint(message)\n' },
] : [
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
    const tm = setTimeout(() => actions.saveLab(code), 500);
    return () => clearTimeout(tm);
  }, [code]);

  const run = () => { setTrace(null); runner.run(code); };

  return html`<div>
    <div class="page-head" style="margin-bottom:16px">
      <div class="eyebrow">${t('Laboratorio Python', 'Python Lab')}</div>
      <h1>${t('Experimenta sin miedo', 'Experiment without fear')}</h1>
      <p>${t(`Python ${eng.python || '3'} real ejecutándose en tu navegador (Pyodide), aislado en un proceso independiente y con límite de tiempo. Tu código se guarda automáticamente.`, `Real Python ${eng.python || '3'} running in your browser (Pyodide), isolated in a separate process and with a time limit. Your code is saved automatically.`)}</p>
    </div>
    <div class="lab">
      <div class="stack">
        <div class="editor-wrap">
          <div class="editor-toolbar">
            <span class="label"><${Icon} name="code" size=${14} /> ${t('laboratorio.py', 'lab.py')}</span>
            <select class="input sm" style="padding:5px 8px;font-size:.82rem;background:var(--code-bg);color:var(--code-text);border-color:var(--code-border)"
              aria-label=${t('Cargar un ejemplo', 'Load an example')} onChange=${(e) => { const ex = EXAMPLES[e.target.value]; if (ex) { setCode(ex.code); runner.clear(); setTrace(null); } e.target.value = ''; }}>
              <option value="">${t('Ejemplos…', 'Examples…')}</option>
              ${EXAMPLES.map((ex, i) => html`<option value=${i}>${ex.name}</option>`)}
            </select>
            <button class="btn sm" onClick=${() => { setCode(''); runner.clear(); setTrace(null); }} title=${t('Vaciar el editor', 'Clear the editor')}><${Icon} name="trash" size=${14} /></button>
            <button class="btn sm" onClick=${() => setTrace(code)}><${Icon} name="footsteps" size=${14} /> <span class="hide-mobile">${t('Paso a paso', 'Step by step')}</span></button>
            <button class="btn sm run" onClick=${run} disabled=${runner.status === 'running'}><${Icon} name="play" size=${14} /> ${t('Ejecutar', 'Run')}</button>
          </div>
          <${Editor} value=${code} onChange=${setCode} onRun=${run} errorLine=${runner.error && runner.error.line} minLines=${14} label=${t('Editor del laboratorio', 'Lab editor')} />
        </div>
        <div class="tiny faint">${t(html`<kbd>Ctrl</kbd>+<kbd>Intro</kbd> ejecuta · <kbd>Tab</kbd> sangra · <kbd>Esc</kbd> sale del editor`, html`<kbd>Ctrl</kbd>+<kbd>Enter</kbd> runs · <kbd>Tab</kbd> indents · <kbd>Esc</kbd> leaves the editor`)}</div>
      </div>
      <div class="stack">
        <${EngineLoading} />
        <${Console} runner=${runner} />
        <${ErrorCard} error=${runner.error} />
        <div class="card flat">
          <div class="card-title"><${Icon} name="book" size=${16} /> ${t('Chuleta rápida', 'Quick cheat sheet')}</div>
          <div class="small stack" style="gap:6px">
            <div><code>x = 5</code> ${t('asigna el valor 5 al nombre x', 'assigns the value 5 to the name x')}</div>
            <div><code>print(a, b)</code> ${t('muestra valores separados por espacios', 'shows values separated by spaces')}</div>
            <div><code>${t('input("Texto: ")', 'input("Text: ")')}</code> ${t('pide un dato (siempre devuelve str)', 'asks for a value (always returns str)')}</div>
            <div><code>int(t)</code> · <code>float(t)</code> · <code>str(n)</code> ${t('convierten tipos', 'convert types')}</div>
            <div><code>type(x)</code> ${t('dice el tipo de un valor', 'tells you the type of a value')}</div>
            <div class="tiny muted" style="margin-top:4px">${t(html`Cómo funciona <code>input()</code> aquí: cada vez que escribes un dato, el programa se vuelve a ejecutar desde el principio con todos los datos ya escritos. El resultado es el mismo, salvo en programas que muestran la hora actual, que puede cambiar entre una ejecución y otra.`, html`How <code>input()</code> works here: every time you type a value, the program runs again from the start with all the values typed so far. The result is the same, except for programs that show the current time, which can change between runs.`)}</div>
          </div>
        </div>
      </div>
    </div>
    ${trace && html`<div style="margin-top:18px"><${Tracer} code=${trace} /></div>`}
  </div>`;
}
