import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Rich, Modal } from './common.js';
import { CodeView } from './code.js';

/**
 * Pistas progresivas en 5 niveles. El nivel 4 añade la explicación del último
 * error concreto del alumno; el 5 (solución explicada) exige confirmación
 * salvo que ya se hayan usado las cuatro pistas anteriores.
 */
export function Hints({ hints, solution, lastResult, revealed, onReveal, onSolution, solutionShown }) {
  const [confirm, setConfirm] = useState(false);
  const total = hints.length + 1;
  const lastErr = lastResult && lastResult.status === 'fail' ? lastResult : null;

  const askSolution = () => (revealed >= hints.length ? onSolution() : setConfirm(true));

  return html`<div class="hints">
    <div class="hints-head">
      <${Icon} name="bulb" size=${18} />
      <strong>Ayuda progresiva</strong>
      <span class="small muted">Pide solo la que necesites</span>
      <span class="hint-ladder" aria-label=${`${revealed} de ${total} niveles usados`}>
        ${Array.from({ length: total }, (_, i) => html`<i class=${i < revealed + (solutionShown ? 1 : 0) ? 'on' : ''} />`)}
      </span>
    </div>
    ${hints.slice(0, revealed).map((h, i) => html`<div class="hint" key=${i}>
      <div class="hint-level">Nivel ${i + 1} · ${h.level}</div>
      ${h.pre ? html`<pre>${h.text}</pre>` : html`<${Rich} tag="div" text=${h.text} />`}
      ${i === 3 && lastErr && html`<div class="feedback info" style="margin-top:10px">
        <div class="feedback-title"><${Icon} name="bug" size=${15} /> Sobre tu último intento</div>
        <div><strong>${lastErr.title}.</strong> ${lastErr.error ? `${lastErr.error.explanation} ${lastErr.error.suggestion}` : lastErr.message}</div>
      </div>`}
    </div>`)}
    ${solutionShown && html`<div class="hint">
      <div class="hint-level">Nivel 5 · Solución explicada</div>
      <div class="code-block" style="margin:6px 0 10px"><${CodeView} code=${solution.code} /></div>
      <${Rich} tag="div" text=${solution.explanation} />
      <div class="small muted" style="margin-top:8px">Consejo: no la copies. Cierra la solución, escríbela tú desde cero y ejecútala. Volveremos a preguntarte por este concepto en un repaso.</div>
    </div>`}
    <div class="hints-foot">
      ${revealed < hints.length && html`<button class="btn sm" onClick=${() => onReveal(revealed + 1)}>
        <${Icon} name="bulb" size=${14} /> ${revealed === 0 ? 'Necesito una pista' : `Otra pista (nivel ${revealed + 1}: ${hints[revealed].level.toLowerCase()})`}
      </button>`}
      ${!solutionShown && html`<button class="btn sm ghost" onClick=${askSolution}><${Icon} name="eye" size=${14} /> Ver solución explicada</button>`}
      ${revealed > 1 && !solutionShown && html`<span class="tiny faint">Cada pista a partir de la segunda resta un 10 % del XP de la actividad.</span>`}
    </div>
    ${confirm && html`<${Modal} onClose=${() => setConfirm(false)} label="Confirmar ver solución">
      <h2>¿Ver ya la solución?</h2>
      <p class="muted">Todavía te quedan pistas por usar. Equivocarse y volver a intentarlo es exactamente como se aprende: cada intento te acerca. Si ves la solución, la actividad contará como completada con ayuda y el concepto volverá pronto a tus repasos.</p>
      <div class="row wrap" style="justify-content:flex-end;margin-top:18px">
        <button class="btn" onClick=${() => { setConfirm(false); onReveal(revealed + 1); }} disabled=${revealed >= hints.length}>Mejor otra pista</button>
        <button class="btn primary" onClick=${() => { setConfirm(false); onSolution(); }}>Sí, ver la solución</button>
      </div>
    </${Modal}>`}
  </div>`;
}
