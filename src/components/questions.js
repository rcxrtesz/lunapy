import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Rich } from './common.js';
import { CodeView, Console, useRunner } from './code.js';
import { shuffledIndices } from '../lib/highlight.js';

const KEYS = 'ABCDEFG';

export const normalize = (s) => String(s).trim().replace(/\s+/g, ' ');

/** Pregunta de opción múltiple o de respuesta escrita. onFirstAnswer(correct) solo se llama una vez. */
export function Question({ item, onFirstAnswer, label = 'Comprueba tu comprensión', allowRun = true }) {
  const [picked, setPicked] = useState([]); // índices elegidos en orden
  const [text, setText] = useState('');
  const [tries, setTries] = useState(0);
  const [solved, setSolved] = useState(false);
  const [msg, setMsg] = useState(null);
  const runner = useRunner();

  const first = (correct) => { if (tries === 0 && onFirstAnswer) onFirstAnswer(correct); };

  const choose = (idx) => {
    if (solved || picked.includes(idx)) return;
    const opt = item.options[idx];
    first(!!opt.correct);
    setTries((t) => t + 1);
    setPicked((p) => [...p, idx]);
    if (opt.correct) { setSolved(true); setMsg({ ok: true, text: item.explain || '' }); }
    else setMsg({ ok: false, text: opt.why || 'No es esa. Vuelve a leer el código línea a línea.' });
  };

  const submitText = (e) => {
    e.preventDefault();
    if (!text.trim() || solved) return;
    let given = normalize(text);
    const quoted = /^(["']).*\1$/.test(given);
    if (quoted) given = given.slice(1, -1);
    const expected = normalize(item.answer);
    // Listas y tuplas impresas: da igual el espacio tras las comas y el tipo de comillas.
    const repr = (s) => s.replace(/\s*([,[\]()])\s*/g, '$1').replace(/"/g, "'");
    const ok = given === expected || (/^[[(]/.test(expected) && repr(given) === repr(expected));
    first(ok);
    const n = tries + 1;
    setTries(n);
    if (ok) {
      setSolved(true);
      setMsg({ ok: true, text: (quoted ? 'Ojo: la consola no muestra las comillas de los textos, pero la idea es correcta. ' : '') + (item.explain || '') });
    } else if (n >= 2) {
      setSolved(true);
      setMsg({ ok: false, reveal: true, text: `La salida correcta es «${item.answer}». ${item.explain || ''}` });
    } else {
      setMsg({ ok: false, text: 'No es eso. Sigue el programa línea a línea: ¿qué valor tiene cada variable justo antes del print?' });
    }
  };

  return html`<div class="question">
    <div class="question-head"><${Icon} name="brain" size=${14} /> ${label}</div>
    <${Rich} tag="div" className="question-text" text=${item.question} />
    ${item.code && html`<div class="code-block" style="margin-bottom:12px"><${CodeView} code=${item.code} /></div>`}
    ${item.mode === 'choice' ? html`<div class="options" role="group">
        ${shuffledIndices(item.options.length, item.id).map((idx, pos) => {
          const o = item.options[idx];
          const was = picked.includes(idx);
          const cls = was ? (o.correct ? 'correct' : 'wrong') : '';
          return html`<button class=${`option ${cls}`} onClick=${() => choose(idx)} disabled=${solved || was} aria-pressed=${was}>
            <span class="opt-key">${was ? html`<${Icon} name=${o.correct ? 'check' : 'x'} size=${14} />` : KEYS[pos]}</span>
            <${Rich} text=${o.text} />
          </button>`;
        })}
      </div>`
      : html`<form class="text-answer" onSubmit=${submitText}>
        <input class="input mono" value=${text} onInput=${(e) => setText(e.target.value)} disabled=${solved}
          placeholder="Escribe lo que mostrará la consola" aria-label="Tu predicción" />
        <button class="btn primary" type="submit" disabled=${solved || !text.trim()}>Comprobar</button>
      </form>`}
    ${msg && html`<div class=${`feedback ${msg.ok ? 'ok' : 'err'}`}>
      <div class="feedback-title"><${Icon} name=${msg.ok ? 'check' : msg.reveal ? 'info' : 'x'} size=${16} />
        ${msg.ok ? (tries === 1 ? '¡Exacto, a la primera!' : '¡Ahora sí!') : msg.reveal ? 'Veamos por qué' : 'Todavía no'}</div>
      ${msg.text && html`<${Rich} text=${msg.text} />`}
    </div>`}
    ${solved && allowRun && item.code && html`<div style="margin-top:12px" class="stack">
      ${runner.status === 'idle' ? html`<div><button class="btn sm" onClick=${() => runner.run(item.code)}><${Icon} name="play" size=${14} /> Compruébalo ejecutando en Python</button></div>`
        : html`<${Console} runner=${runner} title="Salida real de Python" />`}
      ${runner.error && html`<div class="small muted">Python se ha detenido con <code>${runner.error.type}</code>: ${runner.error.title}.</div>`}
    </div>`}
  </div>`;
}

/** Clasificar elementos como válidos o no válidos. */
export function Classify({ block, onFirstAnswer }) {
  const [ans, setAns] = useState({});
  const set = (i, v) => {
    if (ans[i] !== undefined) return;
    const next = { ...ans, [i]: v };
    setAns(next);
    if (Object.keys(next).length === block.items.length && onFirstAnswer) {
      onFirstAnswer(block.items.every((it, j) => next[j] === it.valid));
    }
  };
  const done = Object.keys(ans).length;
  const right = block.items.filter((it, j) => ans[j] === it.valid).length;
  return html`<div class="question">
    <div class="question-head"><${Icon} name="list" size=${14} /> Clasifica</div>
    <div class="question-text">${block.question}</div>
    <div class="classify">
      ${block.items.map((it, i) => {
        const a = ans[i];
        const st = a === undefined ? '' : a === it.valid ? 'ok' : 'bad';
        return html`<div class=${`classify-row ${st}`}>
          <code>${it.text}</code>
          ${st && html`<${Icon} name=${st === 'ok' ? 'check' : 'x'} size=${16} />`}
          <div class="seg" role="group" aria-label=${`¿Es válido ${it.text}?`}>
            <button class=${a === true ? 'on' : ''} onClick=${() => set(i, true)} disabled=${a !== undefined}>Válido</button>
            <button class=${a === false ? 'on' : ''} onClick=${() => set(i, false)} disabled=${a !== undefined}>No válido</button>
          </div>
          ${a !== undefined && html`<span class="why">${it.valid ? 'Válido. ' : 'No válido. '}${it.why}</span>`}
        </div>`;
      })}
    </div>
    ${done === block.items.length && html`<div class=${`feedback ${right === done ? 'ok' : 'info'}`}>
      <div class="feedback-title">${right}/${done} correctas</div>
      ${right === done ? 'Dominas las reglas de los nombres.' : 'Repasa las reglas de los nombres en el desplegable de arriba.'}
    </div>`}
  </div>`;
}
