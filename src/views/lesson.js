import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Rich, Progress, Modal, toast } from '../components/common.js';
import { CodeView, RunnableCode } from '../components/code.js';
import { Tracer } from '../components/tracer.js';
import { Question, Classify } from '../components/questions.js';
import { ActivityRunner } from '../components/activities.js';
import { LESSONS, lessonActivities } from '../content/lessons.js';
import { ACTIVITIES } from '../content/activities.js';
import { actions, useStore } from '../state/store.js';
import { isUnlocked } from '../state/gamification.js';

function Block({ b }) {
  switch (b.type) {
    case 'p': return html`<${Rich} tag="p" text=${b.text} />`;
    case 'code': return b.run ? html`<${RunnableCode} code=${b.code} title=${b.title} caption=${b.caption} />`
      : html`<div><div class="code-block"><${CodeView} code=${b.code} /></div>${b.caption && html`<div class="small muted" style="margin-top:6px">${b.caption}</div>`}</div>`;
    case 'diagram': return html`<div>
      <div class="mem-diagram">${b.vars.map((v) => html`<div class="mem-row"><span class="mem-name">${v.name}</span><span class="mem-arrow">→</span><span class="mem-value">${v.value}</span><span class="mem-type">${v.type}</span></div>`)}</div>
      ${b.caption && html`<div class="small muted" style="margin-top:6px">${b.caption}</div>`}</div>`;
    case 'callout': return html`<div class=${`callout ${b.tone}`}><span class="callout-icon"><${Icon} name=${b.tone === 'warn' ? 'alert' : b.tone === 'tip' ? 'bulb' : 'info'} /></span>
      <div><strong>${b.title}</strong><${Rich} text=${b.text} /></div></div>`;
    case 'five': return html`<div class="five">${Object.entries(b.items).map(([k, v]) => html`<div class="five-item"><h4>${k}</h4><${Rich} tag="p" text=${v} /></div>`)}</div>`;
    case 'more': return html`<details class="more"><summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> ${b.summary}</summary>
      <div class="more-body"><ul>${b.items.map((i) => html`<li><${Rich} text=${i} /></li>`)}</ul></div></details>`;
    case 'check': return html`<${Question} item=${b} onFirstAnswer=${(ok) => { const xp = actions.answerCheck(b.id, b.concept, ok, { prediction: !!b.code }); if (xp) toast({ icon: 'zap', title: `+${xp} XP`, text: 'Pregunta de comprensión', duration: 2200 }); }} />`;
    case 'classify': return html`<${Classify} block=${b} onFirstAnswer=${(ok) => actions.answerCheck(b.id, b.concept, ok)} />`;
    case 'trace': return html`<${Tracer} code=${b.code} />`;
    default: return null;
  }
}

const checksOf = (step) => (step.blocks || []).filter((b) => b.type === 'check' || b.type === 'classify');

export function LessonView({ lessonId, step: stepParam }) {
  const L = LESSONS[lessonId];
  // La vista se monta con una clave por lección, así que esta rama es estable para cada instancia.
  if (!L) {
    return html`<div class="empty" style="margin-top:40px"><div class="icon-wrap"><${Icon} name="book" size=${24} /></div>
      <h3>Esta lección todavía no está disponible</h3><a class="btn primary" href="#/mapa">Ir al mapa</a></div>`;
  }
  const s = useStore();
  const LESSON_ACTIVITIES = lessonActivities(L);
  const lesson = s.lessons[L.id] || { maxStep: 0 };
  // No se puede ir más allá del primer paso de teoría con preguntas sin responder
  // (ni con el índice ni escribiendo la dirección): predecir antes de seguir es parte del método.
  const blocked = L.steps.findIndex((st) => !st.activity && !st.summary && checksOf(st).some((b) => !s.checks[b.id]));
  const maxAllowed = Math.min(lesson.maxStep + 1, blocked === -1 ? Infinity : blocked, L.steps.length - 1);
  const requested = Math.max(0, Math.min(L.steps.length - 1, Number(stepParam) || 0));
  const idx = Math.min(requested, maxAllowed);
  const step = L.steps[idx];
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (requested !== idx) location.replace(`#/leccion/${L.id}/${idx}`);
  }, [requested, idx]);

  useEffect(() => {
    actions.lessonStep(L.id, idx);
    if (step.concepts) actions.markSeen(step.concepts);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idx]);

  const go = (i) => { location.hash = `#/leccion/${L.id}/${i}`; };
  const activity = step.activity && ACTIVITIES[step.activity];
  const activityDone = activity && s.activities[activity.id]?.completed;
  const pendingChecks = checksOf(step).filter((b) => !s.checks[b.id]);
  const allDone = LESSON_ACTIVITIES.every((id) => s.activities[id]?.completed);
  const locked = activity && !isUnlocked(activity, s);

  const finish = () => {
    if (actions.completeLesson(L.id, L.bonusXp)) {
      toast({ icon: 'trophy', title: `+${L.bonusXp} XP · Lección completada` });
    }
    setCelebrate(true);
  };

  const stepDone = (i) => {
    const st = L.steps[i];
    if (st.activity) return !!s.activities[st.activity]?.completed;
    if (st.summary) return !!lesson.completed;
    // Un paso de teoría cuenta como hecho si se ha visitado y se han respondido sus preguntas.
    return i <= lesson.maxStep && checksOf(st).every((b) => s.checks[b.id]) && (i < lesson.maxStep || i !== idx);
  };

  const pct = Math.round(((idx + 1) / L.steps.length) * 100);
  const order = Object.keys(LESSONS);
  const next = LESSONS[order[order.indexOf(L.id) + 1]];

  return html`<div>
    <div class="row between wrap" style="margin-top:14px">
      <a class="btn ghost sm" href="#/mapa"><${Icon} name="arrowLeft" size=${15} /> Mapa</a>
      <span class="small muted">Lección ${L.code} · ${L.minutes} min aprox.</span>
    </div>
    <div class="lesson-progress-top"><${Progress} value=${pct} /><span class="small muted" style="flex:none">${idx + 1}/${L.steps.length}</span></div>

    <div class="lesson-shell">
      <nav class="lesson-toc card flat" style="padding:12px" aria-label="Pasos de la lección">
        <div class="small" style="font-weight:800;padding:4px 10px 10px">${L.title}</div>
        ${L.steps.map((st, i) => {
          const act = st.activity && ACTIVITIES[st.activity];
          const reachable = i <= maxAllowed;
          return html`<button class=${`toc-item ${i === idx ? 'active' : ''} ${stepDone(i) ? 'done' : ''}`} onClick=${() => go(i)} disabled=${!reachable}
            aria-current=${i === idx ? 'step' : undefined}>
            <span class="toc-dot">${stepDone(i) ? html`<${Icon} name="check" size=${12} stroke=${3} />` : i + 1}</span>
            <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${act ? act.title : st.title}</span>
            ${act && html`<span class="toc-kind"><${Icon} name="target" size=${13} /></span>`}
          </button>`;
        })}
      </nav>

      <div class="card step-card" key=${idx}>
        ${idx === 0 && html`<div class="card flat" style="background:var(--surface-2);margin-bottom:22px;padding:18px">
          <div class="eyebrow">Lección ${L.code}</div>
          <h1 style="margin-bottom:10px">${L.title}</h1>
          <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">
            <div><div class="small" style="font-weight:700;margin-bottom:4px">Al terminar sabrás…</div>
              <ul class="small" style="margin:0;padding-left:18px">${L.objectives.map((o) => html`<li>${o}</li>`)}</ul></div>
            <div><div class="small" style="font-weight:700;margin-bottom:4px">Necesitas</div>
              <div class="small muted">${L.prerequisites.join('. ')}</div>
              <div class="small" style="font-weight:700;margin:10px 0 4px">Cómo vas a trabajar</div>
              <div class="method"><span>Comprender</span><i>→</i><span>Razonar</span><i>→</i><span>Planificar</span><i>→</i><span>Programar</span><i>→</i><span>Ejecutar</span><i>→</i><span>Analizar</span><i>→</i><span>Mejorar</span></div>
            </div>
          </div>
        </div>`}

        ${step.blocks && html`<h2 class="step-title">${step.title}</h2><div class="step-body">${step.blocks.map((b, i) => html`<${Block} b=${b} key=${`${idx}-${i}`} />`)}</div>`}

        ${activity && (locked ? html`<div class="empty">
            <div class="icon-wrap"><${Icon} name="lock" size=${24} /></div>
            <h3>${activity.title}</h3>
            <p>Este problema integra todo lo anterior. Se desbloquea cuando demuestras que dominas las bases: <b>${activity.unlock.text.toLowerCase()}</b>.</p>
          </div>` : html`<${ActivityRunner} activity=${activity} key=${activity.id} />`)}

        ${step.summary && html`<div>
          <h2 class="step-title">Resumen de la lección</h2>
          <ul class="stack" style="padding-left:20px;gap:6px">${L.summary.map((x) => html`<li><${Rich} text=${x} /></li>`)}</ul>
          <div class="divider" />
          <h3>Actividades</h3>
          <div class="stack" style="gap:8px">${LESSON_ACTIVITIES.map((id) => {
            const a = ACTIVITIES[id];
            const r = s.activities[id];
            const at = L.steps.findIndex((x) => x.activity === id);
            return html`<div class="row between wrap">
              <span class="row"><${Icon} name=${r?.completed ? 'check' : 'target'} size=${16} /> ${a.title} <span class="tag">${a.kindLabel}</span></span>
              ${r?.completed ? html`<span class="tag ok">+${r.xpEarned} XP</span>` : html`<button class="btn sm" onClick=${() => go(at)}>Ir a la actividad</button>`}
            </div>`;
          })}</div>
          <div style="margin-top:20px">
            ${lesson.completed ? html`<div class="callout tip"><span class="callout-icon"><${Icon} name="trophy" /></span><div><strong>Lección completada</strong>Puedes volver a cualquier paso cuando quieras. Lo que ya has conseguido no se pierde.</div></div>`
              : allDone ? html`<button class="btn primary lg" onClick=${finish}><${Icon} name="trophy" size=${17} /> Completar lección (+${L.bonusXp} XP)</button>`
              : html`<div class="callout"><span class="callout-icon"><${Icon} name="info" /></span><div>Para completar la lección tienes que superar ${LESSON_ACTIVITIES.length === 1 ? 'la actividad' : `las ${LESSON_ACTIVITIES.length} actividades`}. Leer la teoría no basta: queremos que demuestres que sabes aplicarla.</div></div>`}
          </div>
        </div>`}

        <div class="step-nav">
          <button class="btn" onClick=${() => go(idx - 1)} disabled=${idx === 0}><${Icon} name="arrowLeft" size=${15} /> Anterior</button>
          ${idx < L.steps.length - 1 && html`<div class="row wrap" style="gap:8px">
            ${pendingChecks.length > 0 && html`<span class="small muted">Responde ${pendingChecks.length === 1 ? 'la pregunta' : `las ${pendingChecks.length} preguntas`} para continuar</span>`}
            ${activity && !activityDone && html`<button class="btn ghost" onClick=${() => go(idx + 1)}>Saltar por ahora</button>`}
            <button class="btn primary" onClick=${() => go(idx + 1)} disabled=${pendingChecks.length > 0 || (activity && !activityDone)}>
              ${activity ? 'Siguiente actividad' : 'Continuar'} <${Icon} name="arrowRight" size=${15} /></button>
          </div>`}
        </div>
      </div>
    </div>

    ${celebrate && html`<${Modal} onClose=${() => setCelebrate(false)} label="Lección completada">
      <div style="text-align:center">
        <div class="celebrate-badge"><${Icon} name="trophy" size=${36} /></div>
        <h2>¡Lección completada!</h2>
        <p class="muted">${L.celebration} Mañana te propondremos un repaso breve para fijarlo en la memoria a largo plazo.</p>
        <div class="row wrap" style="justify-content:center;margin-top:18px">
          <a class="btn" href="#/progreso" onClick=${() => setCelebrate(false)}>Ver mi progreso</a>
          ${next ? html`<a class="btn primary" href=${`#/leccion/${next.id}/0`} onClick=${() => setCelebrate(false)}>Siguiente lección: ${next.code} <${Icon} name="arrowRight" size=${15} /></a>`
            : html`<a class="btn primary" href="#/desafios" onClick=${() => setCelebrate(false)}>Ir a los desafíos <${Icon} name="arrowRight" size=${15} /></a>`}
        </div>
      </div>
    </${Modal}>`}
  </div>`;
}
