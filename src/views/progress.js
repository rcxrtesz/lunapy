import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress, Modal, CATEGORY, toast } from '../components/common.js';
import { actions, useStore, levelInfo, streak, lastDays, INTERVALS, today } from '../state/store.js';
import { conceptList, weakPoints, ACHIEVEMENTS } from '../state/gamification.js';
import { t, EN, LOCALE } from '../lib/i18n.js';

const STATUS = {
  nuevo: { label: t('Sin empezar', 'Not started'), cls: '' },
  aprendido: { label: t('Aprendido', 'Learnt'), cls: 'info' },
  practicado: { label: t('Practicado', 'Practised'), cls: 'accent' },
  dominado: { label: t('Dominado', 'Mastered'), cls: 'ok' },
  repaso: { label: t('Necesita repaso', 'Needs review'), cls: 'warn' },
};

// Etiquetas fijas del historial: se guardan en español y se traducen al mostrarlas.
const LOG_EN = { 'Lección completada': 'Lesson completed', 'Pregunta de comprensión': 'Comprehension question', Repaso: 'Review' };
function etiquetaLog(label) {
  if (!EN || !label) return label;
  if (LOG_EN[label]) return LOG_EN[label];
  if (label.startsWith('Solución mejorada · ')) return `Solution improved · ${label.slice(20)}`;
  return label;
}
const ERR_COLORS = { sintaxis: 'var(--warn)', ejecucion: 'var(--err)', logica: '#e5602e', comprension: 'var(--info)', planificacion: 'var(--accent)', concepto: '#a55df0', incompleto: 'var(--faint)' };

const fmtTime = (sec) => (sec < 60 ? `${sec} s` : sec < 3600 ? `${Math.round(sec / 60)} min` : `${Math.floor(sec / 3600)} h ${Math.round((sec % 3600) / 60)} min`);
const fmtDay = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' }); };

export function ProgressView() {
  const s = useStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const concepts = conceptList(s);
  const weak = weakPoints(s);
  const days = lastDays(14, s);
  const totalSec = Object.values(s.daily).reduce((a, d) => a + (d.seconds || 0), 0);
  const acts = Object.values(s.activities);
  const completed = acts.filter((a) => a.completed);
  const firstTry = completed.filter((a) => a.firstTry).length;
  const errEntries = Object.entries(s.errors).filter(([k]) => CATEGORY[k]).sort((a, b) => b[1] - a[1]);
  const errMax = Math.max(1, ...errEntries.map(([, v]) => v));
  const maxXp = Math.max(10, ...days.map((d) => d.xp));

  return html`<div>
    <div class="page-head">
      <div class="eyebrow">${t('Mi progreso', 'My progress')}</div>
      <h1>${t('Lo que ya dominas y lo que toca reforzar', "What you've mastered and what needs reinforcing")}</h1>
      <p>${t('Todas las cifras proceden de tu actividad real en esta plataforma, guardada en este navegador.', 'All the figures come from your real activity on this platform, saved in this browser.')}</p>
    </div>

    <div class="dash-grid" style="margin-top:0">
      ${[
        { icon: 'zap', bg: 'var(--xp-soft)', fg: 'var(--xp-text)', v: `${s.xp} XP`, l: `${t('Nivel', 'Level')} ${lvl.level}` },
        { icon: 'flame', bg: 'var(--streak-soft)', fg: 'var(--streak)', v: `${st.days} ${st.days === 1 ? t('día', 'day') : t('días', 'days')}`, l: t('Racha actual', 'Current streak') },
        { icon: 'clock', bg: 'var(--info-soft)', fg: 'var(--info)', v: fmtTime(totalSec), l: t('Tiempo de práctica activa', 'Active practice time') },
        { icon: 'target', bg: 'var(--ok-soft)', fg: 'var(--ok)', v: `${completed.length}`, l: completed.length ? t(`Actividades superadas · ${firstTry} a la primera`, `Activities passed · ${firstTry} first time`) : t('Actividades superadas', 'Activities passed') },
      ].map((k) => html`<div class="card span-3"><div class="kpi">
        <div class="kpi-icon" style=${{ background: k.bg, color: k.fg }}><${Icon} name=${k.icon} size=${22} /></div>
        <div><div class="kpi-value">${k.v}</div><div class="kpi-label">${k.l}</div></div></div></div>`)}

      <div class="card span-7">
        <div class="card-title"><${Icon} name="brain" /> ${t('Dominio por concepto', 'Mastery by concept')}</div>
        <div class="legend" style="margin-bottom:6px">${Object.values(STATUS).map((x) => html`<span class=${`tag ${x.cls}`}>${x.label}</span>`)}</div>
        ${concepts.map((c) => html`<div class="mastery-row">
          <div style="min-width:0"><div style="font-weight:650;font-size:.94rem">${c.name}</div>
            <div class="tiny muted">${c.rec?.attempts ? `${c.rec.good} ${t('bien a la primera', 'right first time')} · ${c.rec.wrong} ${t('errores', 'mistakes')} · ${c.rec.next ? (c.rec.next <= today() ? t('repaso: hoy', 'review: today') : `${t('repaso', 'review')}: ${fmtDay(c.rec.next)}`) : ''}` : c.status === 'aprendido' ? t('Teoría vista, falta practicar', 'Theory seen, practice needed') : t('Aún no lo has visto', "You haven't seen it yet")}</div></div>
          <${Progress} value=${(c.box / 5) * 100} kind=${c.status === 'dominado' ? 'ok' : ''} />
          <span class=${`tag ${STATUS[c.status].cls}`}>${STATUS[c.status].label}</span>
        </div>`)}
        <details class="more" style="margin-top:14px">
          <summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> ${t('¿Cómo se calcula el dominio?', 'How is mastery calculated?')}</summary>
          ${EN ? html`<div class="more-body small">
            <p>We use a <b>spaced repetition</b> system (Leitner boxes), simple and transparent. It isn't artificial intelligence.</p>
            <ul>
              <li>Each concept is in a box from 0 to 5 (the bar).</li>
              <li>If you solve an activity <b>first time and with at most one hint</b>, the concept moves up a box. On the same day it can only reach box 2: to master something you have to remember it days later.</li>
              <li>If you solve it after mistakes or with several hints, it stays in its box. If you see the solution or fail a review, it goes back to box 1.</li>
              <li>The next review is scheduled ${INTERVALS.slice(1).join(', ')} days later depending on the box.</li>
              <li><b>Learnt</b>: you've seen the theory. <b>Practised</b>: you've applied it. <b>Mastered</b>: box 3 or higher with no reviews due. <b>Needs review</b>: a review is due or it has recent mistakes.</li>
            </ul>
          </div>` : html`<div class="more-body small">
            <p>Usamos un sistema de <b>repetición espaciada</b> (cajas de Leitner), sencillo y transparente. No es inteligencia artificial.</p>
            <ul>
              <li>Cada concepto está en una caja del 0 al 5 (la barra).</li>
              <li>Si resuelves una actividad <b>a la primera y con una pista como mucho</b>, el concepto sube una caja. En un mismo día solo puede llegar a la caja 2: para dominar algo hay que recordarlo días después.</li>
              <li>Si lo resuelves tras fallos o con varias pistas, se queda en su caja. Si ves la solución o fallas un repaso, vuelve a la caja 1.</li>
              <li>El siguiente repaso se programa a ${INTERVALS.slice(1).join(', ')} días según la caja.</li>
              <li><b>Aprendido</b>: has visto la teoría. <b>Practicado</b>: lo has aplicado. <b>Dominado</b>: caja 3 o superior sin repasos pendientes. <b>Necesita repaso</b>: le toca repaso o acumula errores recientes.</li>
            </ul>
          </div>`}
        </details>
      </div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="alert" /> ${t('Mis puntos débiles', 'My weak points')}</div>
        ${weak.length === 0 ? html`<div class="empty" style="padding:14px"><div class="small">${Object.keys(s.concepts).length ? t('Ningún concepto presenta dificultades ahora mismo. ¡Bien!', 'No concept is giving you trouble right now. Nice!') : t('Cuando practiques, aquí aparecerán los conceptos en los que más te equivocas y qué tipo de error cometes.', 'When you practise, the concepts you get wrong most often and the kind of mistakes you make will appear here.')}</div></div>`
          : html`<div class="stack">${weak.map((w) => html`<div style="padding:10px 12px;border-radius:12px;background:var(--surface-2)">
              <div class="row between"><b class="small">${w.name}</b><span class="tag warn">${w.rec.wrong} ${t('errores', 'mistakes')}</span></div>
              ${w.topErrors.length > 0 && html`<ul class="tiny muted" style="margin:6px 0 0;padding-left:16px">${w.topErrors.map(([txt, n]) => html`<li>${txt} ×${n}</li>`)}</ul>`}
            </div>`)}
            <a class="btn primary" href="#/repaso"><${Icon} name="repeat" size=${15} /> ${t('Repasar ahora', 'Review now')}</a></div>`}
        <div class="divider" />
        <div class="card-title" style="margin-bottom:10px"><${Icon} name="bug" size=${16} /> ${t('Tipos de error', 'Error types')}</div>
        ${errEntries.length === 0 ? html`<div class="small muted">${t('Sin errores registrados todavía.', 'No mistakes recorded yet.')}</div>`
          : html`<div class="bars">${errEntries.map(([k, v]) => html`<div class="bar-row">
              <span>${CATEGORY[k].label}</span>
              <div class="bar-track"><span style=${{ width: `${(v / errMax) * 100}%`, background: ERR_COLORS[k] || 'var(--accent)' }} /></div>
              <b class="small">${v}</b></div>`)}</div>`}
      </div>

      <div class="card span-7">
        <div class="card-title"><${Icon} name="chart" /> ${t('Últimos 14 días', 'Last 14 days')} <span class="muted small" style="margin-left:auto">${t('XP por día', 'XP per day')}</span></div>
        <div class="week" style="grid-template-columns:repeat(14,minmax(0,1fr));gap:4px">
          ${days.map((d, i) => html`<div class=${`week-col ${i === 13 ? 'today' : ''}`} title=${`${fmtDay(d.key)}: ${d.xp} XP · ${fmtTime(d.seconds || 0)}`}>
            <span class="week-val">${d.xp || ''}</span>
            <div class=${`week-bar ${d.xp ? '' : 'empty'}`} style=${{ height: `${Math.max(3, (d.xp / maxXp) * 80)}px` }} />
            <span class="week-day">${i === 13 ? t('Hoy', 'Today') : Number(d.key.slice(8))}</span>
          </div>`)}
        </div>
      </div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="list" /> ${t('Actividad reciente', 'Recent activity')}</div>
        ${s.log.length === 0 ? html`<div class="small muted">${t('Aquí verás tu historial.', "You'll see your history here.")}</div>`
          : s.log.slice(0, 7).map((e) => html`<div class="history-item">
            <${Icon} name=${e.kind === 'fail' || e.kind === 'review-fail' ? 'x' : e.kind === 'lesson' ? 'trophy' : 'check'} size=${15} />
            <span style="flex:1;min-width:0">${etiquetaLog(e.label)}${e.category && CATEGORY[e.category] ? html` <span class="tiny muted">· ${CATEGORY[e.category].label}</span>` : ''}</span>
            ${e.xp ? html`<span class="tag xp">+${e.xp}</span>` : null}
          </div>`)}
      </div>

      <div class="card span-12">
        <div class="card-title"><${Icon} name="trophy" /> ${t('Logros', 'Achievements')} <span class="muted small">${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length}</span></div>
        <div class="ach-grid">${ACHIEVEMENTS.map((a) => {
          const on = !!s.achievements[a.id];
          return html`<div class=${`ach ${on ? 'on' : ''}`}><div class="ach-icon"><${Icon} name=${on ? a.icon : 'lock'} size=${22} /></div>
            <div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`;
        })}</div>
      </div>

      <div class="card span-12 flat" style="border-style:dashed">
        <div class="card-title"><${Icon} name="info" /> ${t('Herramientas de la demo', 'Demo tools')} <span class="demo-note">${t('Solo para evaluar', 'For evaluation only')}</span></div>
        <p class="small muted">${t('«Simular el día siguiente» adelanta el reloj interno para que puedas comprobar la racha y los repasos espaciados sin esperar.', '«Simulate the next day» moves the internal clock forward so you can check the streak and spaced reviews without waiting.')} ${s.dayOffset ? t(`Ahora mismo vas ${s.dayOffset} día(s) por delante.`, `You're currently ${s.dayOffset} day(s) ahead.`) : ''}</p>
        <div class="row wrap">
          <button class="btn" onClick=${() => { actions.advanceDay(); toast({ icon: 'calendar', title: t('Ha pasado un día', 'A day has passed'), text: t('Revisa tus repasos en el inicio.', 'Check your reviews on the home screen.') }); }}><${Icon} name="calendar" size=${15} /> ${t('Simular el día siguiente', 'Simulate the next day')}</button>
          <button class="btn" onClick=${() => setConfirmReset(true)} style="color:var(--err)"><${Icon} name="trash" size=${15} /> ${t('Reiniciar todo el progreso', 'Reset all progress')}</button>
        </div>
      </div>
    </div>

    ${confirmReset && html`<${Modal} onClose=${() => setConfirmReset(false)} label=${t('Reiniciar progreso', 'Reset progress')}>
      <h2>${t('¿Reiniciar el progreso?', 'Reset your progress?')}</h2>
      <p class="muted">${t('Se borrarán XP, actividades, repasos y logros guardados en este navegador. No se puede deshacer.', "XP, activities, reviews and achievements saved in this browser will be deleted. This can't be undone.")}</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setConfirmReset(false)}>${t('Cancelar', 'Cancel')}</button>
        <button class="btn primary" style="background:var(--err);border-color:var(--err)" onClick=${() => { actions.reset(); setConfirmReset(false); location.hash = '#/'; }}>${t('Sí, reiniciar', 'Yes, reset')}</button>
      </div>
    </${Modal}>`}
  </div>`;
}
