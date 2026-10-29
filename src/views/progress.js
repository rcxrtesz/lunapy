import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress, Modal, CATEGORY, toast } from '../components/common.js';
import { actions, useStore, levelInfo, streak, lastDays, INTERVALS, today } from '../state/store.js';
import { conceptList, weakPoints, ACHIEVEMENTS } from '../state/gamification.js';

const STATUS = {
  nuevo: { label: 'Sin empezar', cls: '' },
  aprendido: { label: 'Aprendido', cls: 'info' },
  practicado: { label: 'Practicado', cls: 'accent' },
  dominado: { label: 'Dominado', cls: 'ok' },
  repaso: { label: 'Necesita repaso', cls: 'warn' },
};
const ERR_COLORS = { sintaxis: 'var(--warn)', ejecucion: 'var(--err)', logica: '#e5602e', comprension: 'var(--info)', planificacion: 'var(--accent)', concepto: '#a55df0', incompleto: 'var(--faint)' };

const fmtTime = (sec) => (sec < 60 ? `${sec} s` : sec < 3600 ? `${Math.round(sec / 60)} min` : `${Math.floor(sec / 3600)} h ${Math.round((sec % 3600) / 60)} min`);
const fmtDay = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }); };

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
      <div class="eyebrow">Mi progreso</div>
      <h1>Lo que ya dominas y lo que toca reforzar</h1>
      <p>Todas las cifras proceden de tu actividad real en esta plataforma, guardada en este navegador.</p>
    </div>

    <div class="dash-grid" style="margin-top:0">
      ${[
        { icon: 'zap', bg: 'var(--xp-soft)', fg: 'var(--xp-text)', v: `${s.xp} XP`, l: `Nivel ${lvl.level}` },
        { icon: 'flame', bg: 'var(--streak-soft)', fg: 'var(--streak)', v: `${st.days} ${st.days === 1 ? 'día' : 'días'}`, l: 'Racha actual' },
        { icon: 'clock', bg: 'var(--info-soft)', fg: 'var(--info)', v: fmtTime(totalSec), l: 'Tiempo de práctica activa' },
        { icon: 'target', bg: 'var(--ok-soft)', fg: 'var(--ok)', v: `${completed.length}`, l: completed.length ? `Actividades superadas · ${firstTry} a la primera` : 'Actividades superadas' },
      ].map((k) => html`<div class="card span-3"><div class="kpi">
        <div class="kpi-icon" style=${{ background: k.bg, color: k.fg }}><${Icon} name=${k.icon} size=${22} /></div>
        <div><div class="kpi-value">${k.v}</div><div class="kpi-label">${k.l}</div></div></div></div>`)}

      <div class="card span-7">
        <div class="card-title"><${Icon} name="brain" /> Dominio por concepto</div>
        <div class="legend" style="margin-bottom:6px">${Object.values(STATUS).map((x) => html`<span class=${`tag ${x.cls}`}>${x.label}</span>`)}</div>
        ${concepts.map((c) => html`<div class="mastery-row">
          <div style="min-width:0"><div style="font-weight:650;font-size:.94rem">${c.name}</div>
            <div class="tiny muted">${c.rec?.attempts ? `${c.rec.good} bien a la primera · ${c.rec.wrong} errores · ${c.rec.next ? (c.rec.next <= today() ? 'repaso: hoy' : `repaso: ${fmtDay(c.rec.next)}`) : ''}` : c.status === 'aprendido' ? 'Teoría vista, falta practicar' : 'Aún no lo has visto'}</div></div>
          <${Progress} value=${(c.box / 5) * 100} kind=${c.status === 'dominado' ? 'ok' : ''} />
          <span class=${`tag ${STATUS[c.status].cls}`}>${STATUS[c.status].label}</span>
        </div>`)}
        <details class="more" style="margin-top:14px">
          <summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> ¿Cómo se calcula el dominio?</summary>
          <div class="more-body small">
            <p>Usamos un sistema de <b>repetición espaciada</b> (cajas de Leitner), sencillo y transparente. No es inteligencia artificial.</p>
            <ul>
              <li>Cada concepto está en una caja del 0 al 5 (la barra).</li>
              <li>Si resuelves una actividad <b>a la primera y con una pista como mucho</b>, el concepto sube una caja. En un mismo día solo puede llegar a la caja 2: para dominar algo hay que recordarlo días después.</li>
              <li>Si lo resuelves tras fallos o con varias pistas, se queda en su caja. Si ves la solución o fallas un repaso, vuelve a la caja 1.</li>
              <li>El siguiente repaso se programa a ${INTERVALS.slice(1).join(', ')} días según la caja.</li>
              <li><b>Aprendido</b>: has visto la teoría. <b>Practicado</b>: lo has aplicado. <b>Dominado</b>: caja 3 o superior sin repasos pendientes. <b>Necesita repaso</b>: le toca repaso o acumula errores recientes.</li>
            </ul>
          </div>
        </details>
      </div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="alert" /> Mis puntos débiles</div>
        ${weak.length === 0 ? html`<div class="empty" style="padding:14px"><div class="small">${Object.keys(s.concepts).length ? 'Ningún concepto presenta dificultades ahora mismo. ¡Bien!' : 'Cuando practiques, aquí aparecerán los conceptos en los que más te equivocas y qué tipo de error cometes.'}</div></div>`
          : html`<div class="stack">${weak.map((w) => html`<div style="padding:10px 12px;border-radius:12px;background:var(--surface-2)">
              <div class="row between"><b class="small">${w.name}</b><span class="tag warn">${w.rec.wrong} errores</span></div>
              ${w.topErrors.length > 0 && html`<ul class="tiny muted" style="margin:6px 0 0;padding-left:16px">${w.topErrors.map(([t, n]) => html`<li>${t} ×${n}</li>`)}</ul>`}
            </div>`)}
            <a class="btn primary" href="#/repaso"><${Icon} name="repeat" size=${15} /> Repasar ahora</a></div>`}
        <div class="divider" />
        <div class="card-title" style="margin-bottom:10px"><${Icon} name="bug" size=${16} /> Tipos de error</div>
        ${errEntries.length === 0 ? html`<div class="small muted">Sin errores registrados todavía.</div>`
          : html`<div class="bars">${errEntries.map(([k, v]) => html`<div class="bar-row">
              <span>${CATEGORY[k].label}</span>
              <div class="bar-track"><span style=${{ width: `${(v / errMax) * 100}%`, background: ERR_COLORS[k] || 'var(--accent)' }} /></div>
              <b class="small">${v}</b></div>`)}</div>`}
      </div>

      <div class="card span-7">
        <div class="card-title"><${Icon} name="chart" /> Últimos 14 días <span class="muted small" style="margin-left:auto">XP por día</span></div>
        <div class="week" style="grid-template-columns:repeat(14,minmax(0,1fr));gap:4px">
          ${days.map((d, i) => html`<div class=${`week-col ${i === 13 ? 'today' : ''}`} title=${`${fmtDay(d.key)}: ${d.xp} XP · ${fmtTime(d.seconds || 0)}`}>
            <span class="week-val">${d.xp || ''}</span>
            <div class=${`week-bar ${d.xp ? '' : 'empty'}`} style=${{ height: `${Math.max(3, (d.xp / maxXp) * 80)}px` }} />
            <span class="week-day">${i === 13 ? 'Hoy' : Number(d.key.slice(8))}</span>
          </div>`)}
        </div>
      </div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="list" /> Actividad reciente</div>
        ${s.log.length === 0 ? html`<div class="small muted">Aquí verás tu historial.</div>`
          : s.log.slice(0, 7).map((e) => html`<div class="history-item">
            <${Icon} name=${e.kind === 'fail' || e.kind === 'review-fail' ? 'x' : e.kind === 'lesson' ? 'trophy' : 'check'} size=${15} />
            <span style="flex:1;min-width:0">${e.label}${e.category && CATEGORY[e.category] ? html` <span class="tiny muted">· ${CATEGORY[e.category].label}</span>` : ''}</span>
            ${e.xp ? html`<span class="tag xp">+${e.xp}</span>` : null}
          </div>`)}
      </div>

      <div class="card span-12">
        <div class="card-title"><${Icon} name="trophy" /> Logros <span class="muted small">${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length}</span></div>
        <div class="ach-grid">${ACHIEVEMENTS.map((a) => {
          const on = !!s.achievements[a.id];
          return html`<div class=${`ach ${on ? 'on' : ''}`}><div class="ach-icon"><${Icon} name=${on ? a.icon : 'lock'} size=${22} /></div>
            <div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`;
        })}</div>
      </div>

      <div class="card span-12 flat" style="border-style:dashed">
        <div class="card-title"><${Icon} name="info" /> Herramientas de la demo <span class="demo-note">Solo para evaluar</span></div>
        <p class="small muted">«Simular el día siguiente» adelanta el reloj interno para que puedas comprobar la racha y los repasos espaciados sin esperar. ${s.dayOffset ? `Ahora mismo vas ${s.dayOffset} día(s) por delante.` : ''}</p>
        <div class="row wrap">
          <button class="btn" onClick=${() => { actions.advanceDay(); toast({ icon: 'calendar', title: 'Ha pasado un día', text: 'Revisa tus repasos en el inicio.' }); }}><${Icon} name="calendar" size=${15} /> Simular el día siguiente</button>
          <button class="btn" onClick=${() => setConfirmReset(true)} style="color:var(--err)"><${Icon} name="trash" size=${15} /> Reiniciar todo el progreso</button>
        </div>
      </div>
    </div>

    ${confirmReset && html`<${Modal} onClose=${() => setConfirmReset(false)} label="Reiniciar progreso">
      <h2>¿Reiniciar el progreso?</h2>
      <p class="muted">Se borrarán XP, actividades, repasos y logros guardados en este navegador. No se puede deshacer.</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setConfirmReset(false)}>Cancelar</button>
        <button class="btn primary" style="background:var(--err);border-color:var(--err)" onClick=${() => { actions.reset(); setConfirmReset(false); location.hash = '#/'; }}>Sí, reiniciar</button>
      </div>
    </${Modal}>`}
  </div>`;
}
