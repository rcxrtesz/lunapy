import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { toast } from '../components/common.js';
import { Question } from '../components/questions.js';
import { CONCEPTS } from '../content/curriculum.js';
import { actions, getState, useStore } from '../state/store.js';
import { buildReviewSession, dueReviews, currentLessonId } from '../state/gamification.js';
import { t, EN } from '../lib/i18n.js';

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
        <div class="eyebrow">${t('Repaso inteligente', 'Smart review')}</div>
        <h1>${t('Recordar es practicar', 'Remembering is practising')}</h1>
        <p>${t('Un repaso breve en el momento justo fija lo aprendido en la memoria a largo plazo. Elegimos las preguntas según tus conceptos pendientes de repaso y tus errores recientes.', "A short review at the right moment fixes what you've learnt in your long-term memory. We choose the questions based on the concepts due for review and your recent mistakes.")}</p>
        ${EN && html`<p class="small muted">The review questions are still in Spanish for now.</p>`}
      </div>
      <div class="card" style="max-width:640px">
        ${!practiced ? html`<div class="empty"><div class="icon-wrap"><${Icon} name="repeat" size=${24} /></div>
            <h3>${t('Aún no hay nada que repasar', 'Nothing to review yet')}</h3><p>${t('Empieza la lección de variables: en cuanto practiques, aparecerán aquí tus repasos.', 'Start the variables lesson: as soon as you practise, your reviews will appear here.')}</p>
            <a class="btn primary" href=${`#/leccion/${currentLessonId(s)}/0`}>${t('Ir a la lección', 'Go to the lesson')}</a></div>`
          : html`<div class="card-title"><${Icon} name="calendar" /> ${due.length ? (EN ? `You have ${due.length} concept${due.length > 1 ? 's' : ''} to review today` : `Tienes ${due.length} concepto${due.length > 1 ? 's' : ''} para repasar hoy`) : t('Hoy no te toca ningún repaso', 'No reviews due today')}</div>
            ${due.length > 0 && html`<div class="chips" style="margin-bottom:14px">${due.map((c) => html`<span class="tag warn">${c.name}</span>`)}</div>`}
            <p class="small muted">${due.length ? t('Son 5 preguntas rápidas (unos 2 minutos).', "It's 5 quick questions (about 2 minutes).") : t('Puedes hacer igualmente un repaso de refuerzo con tus conceptos más débiles.', 'You can still do a booster review with your weakest concepts.')}</p>
            <button class="btn primary lg" onClick=${start}><${Icon} name="play" size=${16} /> ${due.length ? t('Empezar repaso', 'Start review') : t('Repaso de refuerzo', 'Booster review')}</button>`}
      </div>
    </div>`;
  }

  if (!session.length) return html`<div class="empty"><h3>${t('No hay preguntas disponibles', 'No questions available')}</h3><button class="btn" onClick=${() => setSession(null)}>${t('Volver', 'Back')}</button></div>`;

  if (i >= session.length) {
    return html`<div class="card step-card" style="max-width:640px;margin:24px auto;text-align:center">
      <div class="celebrate-badge"><${Icon} name="repeat" size=${34} /></div>
      <h2>${t('Repaso terminado', 'Review finished')}</h2>
      <p class="muted">${t(`${score.ok} de ${score.total} correctas a la primera.`, `${score.ok} of ${score.total} correct first time.`)} ${score.ok === score.total ? t('Estos conceptos se espaciarán más en el tiempo.', 'These concepts will be spaced out further in time.') : t('Los conceptos que has fallado volverán a aparecer pronto: así es como se consolidan.', "The concepts you got wrong will come back soon: that's how they stick.")}</p>
      <div class="row wrap" style="justify-content:center"><a class="btn" href="#/progreso">${t('Ver mi dominio', 'See my mastery')}</a><button class="btn primary" onClick=${() => setSession(null)}>${t('Terminar', 'Finish')}</button></div>
    </div>`;
  }

  const item = session[i];
  return html`<div style="max-width:720px;margin:0 auto">
    <div class="row between" style="margin:16px 0">
      <span class="tag accent">${CONCEPTS[item.concept].name}</span>
      <span class="small muted">${t(`Pregunta ${i + 1} de ${session.length}`, `Question ${i + 1} of ${session.length}`)}</span>
    </div>
    <div class="plan-steps" style="margin-bottom:16px">${session.map((_, j) => html`<i class=${j <= i ? 'on' : ''} />`)}</div>
    <${Question} key=${item.id} item=${item} label=${t('Repaso', 'Review')} onFirstAnswer=${(ok) => {
      const xp = actions.review(item, ok);
      setScore((sc) => ({ ok: sc.ok + (ok ? 1 : 0), total: sc.total + 1 }));
      setAnswered(true);
      if (xp) toast({ icon: 'zap', title: `+${xp} XP`, text: t('Repaso', 'Review'), duration: 1800 });
    }} />
    <div class="row" style="justify-content:flex-end;margin-top:14px">
      <button class="btn primary" disabled=${!answered} onClick=${() => { setI(i + 1); setAnswered(false); }}>${i + 1 < session.length ? t('Siguiente', 'Next') : t('Ver resultado', 'See result')} <${Icon} name="arrowRight" size=${15} /></button>
    </div>
  </div>`;
}
