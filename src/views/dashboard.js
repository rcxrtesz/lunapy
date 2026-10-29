import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress, Ring } from '../components/common.js';
import { useStore, levelInfo, streak, lastDays, today } from '../state/store.js';
import { dailyMissions, weekly, dueReviews, upcomingReviews, lessonProgress, weakPoints } from '../state/gamification.js';

const DAYS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

function greeting() {
  const h = new Date().getHours();
  return h < 6 ? 'Buenas noches' : h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
}

export function Dashboard() {
  const s = useStore();
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const lp = lessonProgress(s);
  const t = s.daily[today()] || { xp: 0 };
  const goal = s.profile.dailyGoal;
  const missions = dailyMissions(s);
  const wk = weekly(s);
  const due = dueReviews(s);
  const upcoming = upcomingReviews(s).filter((c) => c.status !== 'repaso').slice(0, 3);
  const days = lastDays(7, s);
  const maxXp = Math.max(goal, ...days.map((d) => d.xp));
  const weak = weakPoints(s).slice(0, 2);
  const started = lp.pct > 0;
  const continueHref = lp.completed ? '#/desafios' : `#/leccion/variables/${lp.step || 0}`;

  return html`<div>
    <section class="hero" style="margin-top:12px">
      <div style="position:relative;z-index:1">
        <div class="hero-mod"><${Icon} name="map" size=${14} /> Módulo 2 · Lección 2.1</div>
        <h1>${greeting()}${s.profile.name ? `, ${s.profile.name}` : ''}</h1>
        <p>${lp.completed ? 'Has completado la lección de variables. Pon a prueba lo aprendido en la zona de desafíos o repasa lo que más te cueste.'
          : started ? `Vas por buen camino con «Variables: dar nombre a los datos». Te quedan ${lp.activitiesTotal - lp.activitiesDone} actividades para completar la lección.`
          : 'Hoy empiezas con las variables: la base de todo programa. Primero entenderás la idea, después la verás funcionar y, por último, resolverás problemas por tu cuenta.'}</p>
        <div class="row wrap" style="margin-top:18px">
          <a class="btn primary lg" href=${continueHref}><${Icon} name="play" size=${16} /> ${lp.completed ? 'Ir a los desafíos' : started ? 'Continuar aprendiendo' : 'Empezar la lección'}</a>
          <a class="btn glass lg" href="#/lab"><${Icon} name="terminal" size=${16} /> Laboratorio</a>
        </div>
        <div class="hero-progress">
          <div class="row between small" style="margin-bottom:6px;color:rgba(255,255,255,.85)"><span>Progreso de la lección</span><b>${lp.pct} %</b></div>
          <${Progress} value=${lp.pct} />
        </div>
      </div>
      <div class="hero-code" aria-hidden="true">
        <div><span style="color:#c7b8ff">progreso</span> = <span style="color:#ffd27a">${lp.pct}</span></div>
        <div><span style="color:#c7b8ff">racha</span> = <span style="color:#ffd27a">${st.days}</span></div>
        <div><span style="color:#8fd3ff">print</span>(<span style="color:#b8f28c">"¡A por ello!"</span>)</div>
      </div>
    </section>

    <div class="dash-grid">
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--streak-soft);color:var(--streak)"><${Icon} name="flame" size=${22} /></div>
        <div><div class="kpi-value">${st.days} ${st.days === 1 ? 'día' : 'días'}</div>
          <div class="kpi-label">${st.todayDone ? 'Racha de estudio · hoy ya cuenta' : st.days ? 'Estudia hoy para mantener la racha' : 'Gana XP hoy para iniciar tu racha'}</div></div>
      </div></div>
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--xp-soft);color:var(--xp-text)"><${Icon} name="zap" size=${22} /></div>
        <div style="flex:1"><div class="kpi-value">${s.xp} XP</div>
          <div class="kpi-label">Nivel ${lvl.level} · faltan ${lvl.next - s.xp} XP para el ${lvl.level + 1}</div>
          <div style="margin-top:6px"><${Progress} value=${lvl.pct} kind="xp" /></div></div>
      </div></div>
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--accent-soft);color:var(--accent)"><${Icon} name="repeat" size=${22} /></div>
        <div style="flex:1"><div class="kpi-value">${due.length}</div>
          <div class="kpi-label">${due.length ? 'conceptos para repasar hoy' : 'repasos pendientes hoy'}</div></div>
        ${due.length > 0 && html`<a class="btn sm primary" href="#/repaso">Repasar</a>`}
      </div></div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="target" /> Objetivo diario</div>
        <div class="row" style="gap:20px;align-items:center">
          <${Ring} value=${t.xp / goal} color=${t.xp >= goal ? 'var(--ok)' : 'var(--accent)'}>${Math.min(t.xp, 999)}<small>de ${goal} XP</small></${Ring}>
          <div style="flex:1">
            ${missions.map((m) => html`<div class="mission">
              <span class=${`check-circle ${m.progress >= m.total ? 'done' : ''}`}>${m.progress >= m.total && html`<${Icon} name="check" size=${13} stroke=${3} />`}</span>
              <div style="flex:1;min-width:0"><div class="small" style="font-weight:600">${m.text}</div>
                <div class="tiny muted">${m.progress} / ${m.total}</div></div>
            </div>`)}
          </div>
        </div>
      </div>

      <div class="card span-7">
        <div class="card-title"><${Icon} name="chart" /> Esta semana
          <span class="muted small" style="margin-left:auto">${wk.activeDays}/${wk.goalDays} días activos · ${wk.xp}/${wk.goalXp} XP</span></div>
        <div class="week">
          ${days.map((d, i) => {
            const [y, m, dd] = d.key.split('-').map(Number);
            const wd = new Date(y, m - 1, dd).getDay();
            return html`<div class=${`week-col ${i === 6 ? 'today' : ''}`}>
              <span class="week-val">${d.xp || ''}</span>
              <div class=${`week-bar ${d.xp ? '' : 'empty'}`} style=${{ height: `${Math.max(3, (d.xp / maxXp) * 80)}px` }} title=${`${d.xp} XP`} />
              <span class="week-day">${i === 6 ? 'Hoy' : DAYS[wd]}</span>
            </div>`;
          })}
        </div>
        <div class="row" style="gap:10px;margin-top:14px">
          <span class="small muted" style="flex:none">Objetivo semanal</span>
          <div style="flex:1"><${Progress} value=${(wk.activeDays / wk.goalDays) * 100} kind="ok" /></div>
        </div>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="calendar" /> Próximos repasos</div>
        ${due.length === 0 && upcoming.length === 0 ? html`<div class="empty" style="padding:12px">
            <div class="small">Cuando practiques conceptos, aquí verás cuándo conviene repasarlos para no olvidarlos (repetición espaciada).</div></div>`
          : html`<div class="stack" style="gap:8px">
            ${due.map((c) => html`<div class="row between"><span class="small"><b>${c.name}</b></span><span class="tag warn">Hoy</span></div>`)}
            ${upcoming.map((c) => html`<div class="row between"><span class="small">${c.name}</span><span class="tag">${c.inDays === 1 ? 'Mañana' : `En ${c.inDays} días`}</span></div>`)}
          </div>`}
        ${weak.length > 0 && html`<div class="divider" /><div class="small"><b>Tus puntos débiles:</b> ${weak.map((w) => w.short).join(', ')} · <a href="#/progreso">ver detalles</a></div>`}
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="terminal" /> Acceso rápido</div>
        <div class="grid quick-grid">
          <a class="btn" href="#/lab"><${Icon} name="code" size=${16} /> Laboratorio Python</a>
          <a class="btn" href="#/desafios"><${Icon} name="target" size=${16} /> Desafíos</a>
          <a class="btn" href="#/mapa"><${Icon} name="map" size=${16} /> Mapa de aprendizaje</a>
          <a class="btn" href="#/progreso"><${Icon} name="chart" size=${16} /> Mi progreso</a>
        </div>
        <div class="tiny faint" style="margin-top:12px">Todas las cifras de esta página son tu progreso real, guardado en este navegador.</div>
      </div>
    </div>
  </div>`;
}
