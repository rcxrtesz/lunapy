import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { toast } from '../components/common.js';
import { Question } from '../components/questions.js';
import { CONCEPTS } from '../content/curriculum.js';
import { actions, getState, useStore } from '../state/store.js';
import { buildReviewSession, dueReviews, currentLessonId } from '../state/gamification.js';

export function Review() {
  const s = useStore();
  const [session, setSession] = useState(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [answered, setAnswered] = useState(false);

  // Una sesión cuenta como completada cuando se han respondido todas sus preguntas.
  useEffect(() => {
    if (session && session.length && i === session.length) actions.reviewSessionDone();
  }, [i]);
  const due = dueReviews(s);
  const practiced = Object.values(s.concepts).some((c) => c.attempts || c.seen);

  const start = () => { setSession(buildReviewSession(getState())); setI(0); setScore({ ok: 0, total: 0 }); setAnswered(false); };

  if (!session) {
    return html`<div>
      <div class="page-head">
        <div class="eyebrow">Repaso inteligente</div>
        <h1>Recordar es practicar</h1>
        <p>Un repaso breve en el momento justo fija lo aprendido en la memoria a largo plazo. Elegimos las preguntas según tus conceptos pendientes de repaso y tus errores recientes.</p>
      </div>
      <div class="card" style="max-width:640px">
        ${!practiced ? html`<div class="empty"><div class="icon-wrap"><${Icon} name="repeat" size=${24} /></div>
            <h3>Aún no hay nada que repasar</h3><p>Empieza la lección de variables: en cuanto practiques, aparecerán aquí tus repasos.</p>
            <a class="btn primary" href=${`#/leccion/${currentLessonId(s)}/0`}>Ir a la lección</a></div>`
          : html`<div class="card-title"><${Icon} name="calendar" /> ${due.length ? `Tienes ${due.length} concepto${due.length > 1 ? 's' : ''} para repasar hoy` : 'Hoy no te toca ningún repaso'}</div>
            ${due.length > 0 && html`<div class="chips" style="margin-bottom:14px">${due.map((c) => html`<span class="tag warn">${c.name}</span>`)}</div>`}
            <p class="small muted">${due.length ? 'Son 5 preguntas rápidas (unos 2 minutos).' : 'Puedes hacer igualmente un repaso de refuerzo con tus conceptos más débiles.'}</p>
            <button class="btn primary lg" onClick=${start}><${Icon} name="play" size=${16} /> ${due.length ? 'Empezar repaso' : 'Repaso de refuerzo'}</button>`}
      </div>
    </div>`;
  }

  if (!session.length) return html`<div class="empty"><h3>No hay preguntas disponibles</h3><button class="btn" onClick=${() => setSession(null)}>Volver</button></div>`;

  if (i >= session.length) {
    return html`<div class="card step-card" style="max-width:640px;margin:24px auto;text-align:center">
      <div class="celebrate-badge"><${Icon} name="repeat" size=${34} /></div>
      <h2>Repaso terminado</h2>
      <p class="muted">${score.ok} de ${score.total} correctas a la primera. ${score.ok === score.total ? 'Estos conceptos se espaciarán más en el tiempo.' : 'Los conceptos que has fallado volverán a aparecer pronto: así es como se consolidan.'}</p>
      <div class="row wrap" style="justify-content:center"><a class="btn" href="#/progreso">Ver mi dominio</a><button class="btn primary" onClick=${() => setSession(null)}>Terminar</button></div>
    </div>`;
  }

  const item = session[i];
  return html`<div style="max-width:720px;margin:0 auto">
    <div class="row between" style="margin:16px 0">
      <span class="tag accent">${CONCEPTS[item.concept].name}</span>
      <span class="small muted">Pregunta ${i + 1} de ${session.length}</span>
    </div>
    <div class="plan-steps" style="margin-bottom:16px">${session.map((_, j) => html`<i class=${j <= i ? 'on' : ''} />`)}</div>
    <${Question} key=${item.id} item=${item} label="Repaso" onFirstAnswer=${(ok) => {
      const xp = actions.review(item, ok);
      setScore((sc) => ({ ok: sc.ok + (ok ? 1 : 0), total: sc.total + 1 }));
      setAnswered(true);
      if (xp) toast({ icon: 'zap', title: `+${xp} XP`, text: 'Repaso', duration: 1800 });
    }} />
    <div class="row" style="justify-content:flex-end;margin-top:14px">
      <button class="btn primary" disabled=${!answered} onClick=${() => { setI(i + 1); setAnswered(false); }}>${i + 1 < session.length ? 'Siguiente' : 'Ver resultado'} <${Icon} name="arrowRight" size=${15} /></button>
    </div>
  </div>`;
}
