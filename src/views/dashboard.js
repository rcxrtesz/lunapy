import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress, Ring } from '../components/common.js';
import { useStore, levelInfo, streak, lastDays, today } from '../state/store.js';
import { dailyMissions, weekly, dueReviews, upcomingReviews, lessonProgress, weakPoints, courseCompleted } from '../state/gamification.js';
import { MODULES } from '../content/curriculum.js';
import { t, EN } from '../lib/i18n.js';

const DAYS = EN ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

function greeting() {
  const h = new Date().getHours();
  if (EN) return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  return h < 6 ? 'Buenas noches' : h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
}

export function Dashboard() {
  const s = useStore();
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const lp = lessonProgress(s);
  const hoy = s.daily[today()] || { xp: 0 };
  const goal = s.profile.dailyGoal;
  const missions = dailyMissions(s);
  const wk = weekly(s);
  const due = dueReviews(s);
  const upcoming = upcomingReviews(s).filter((c) => c.status !== 'repaso').slice(0, 3);
  const days = lastDays(7, s);
  const maxXp = Math.max(goal, ...days.map((d) => d.xp));
  const weak = weakPoints(s).slice(0, 2);
  const L = lp.lesson;
  const mod = MODULES.find((m) => m.id === L.moduleId);
  const allDone = courseCompleted(s);
  const started = lp.started;
  const continueHref = allDone ? '#/desafios' : `#/leccion/${L.id}/${lp.step || 0}`;
  const left = lp.activitiesTotal - lp.activitiesDone;

  return html`<div>
    <section class="hero" style="margin-top:12px">
      <div style="position:relative;z-index:1">
        <div class="hero-mod"><${Icon} name="map" size=${14} /> ${t('Módulo', 'Module')} ${mod.num} · ${t('Lección', 'Lesson')} ${L.code} · ${L.title}</div>
        <h1>${greeting()}${s.profile.name ? `, ${s.profile.name}` : ''}</h1>
        <p>${allDone ? t('Has completado todas las lecciones disponibles. Pon a prueba lo aprendido en la zona de desafíos o repasa lo que más te cueste.', "You've completed all the available lessons. Test what you've learnt in the challenge zone or review what you find hardest.")
          : started ? (EN
            ? `You're on the right track with «${L.title}». ${left ? `${left === 1 ? '1 activity' : `${left} activities`} left to complete the lesson.` : 'You just need to close the lesson in the summary.'}`
            : `Vas por buen camino con «${L.title}». ${left ? `Te ${left === 1 ? 'queda 1 actividad' : `quedan ${left} actividades`} para completar la lección.` : 'Solo te falta cerrar la lección en el resumen.'}`)
          : L.teaser}</p>
        <div class="row wrap" style="margin-top:18px">
          <a class="btn primary lg" href=${continueHref}><${Icon} name="play" size=${16} /> ${allDone ? t('Ir a los desafíos', 'Go to the challenges') : started ? t('Continuar aprendiendo', 'Keep learning') : t('Empezar la lección', 'Start the lesson')}</a>
          <a class="btn glass lg" href="#/lab"><${Icon} name="terminal" size=${16} /> ${t('Laboratorio', 'Lab')}</a>
        </div>
        <div class="hero-progress">
          <div class="row between small" style="margin-bottom:6px;color:rgba(255,255,255,.85)"><span>${t('Progreso de la lección', 'Lesson progress')}</span><b>${lp.pct} %</b></div>
          <${Progress} value=${lp.pct} />
        </div>
      </div>
      <div class="hero-code" aria-hidden="true">
        <div><span style="color:#c7b8ff">${t('progreso', 'progress')}</span> = <span style="color:#ffd27a">${lp.pct}</span></div>
        <div><span style="color:#c7b8ff">${t('racha', 'streak')}</span> = <span style="color:#ffd27a">${st.days}</span></div>
        <div><span style="color:#8fd3ff">print</span>(<span style="color:#b8f28c">${t('"¡A por ello!"', '"Let\'s go!"')}</span>)</div>
      </div>
    </section>

    <div class="dash-grid">
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--streak-soft);color:var(--streak)"><${Icon} name="flame" size=${22} /></div>
        <div><div class="kpi-value">${st.days} ${st.days === 1 ? t('día', 'day') : t('días', 'days')}</div>
          <div class="kpi-label">${st.todayDone ? t('Racha de estudio · hoy ya cuenta', 'Study streak · today already counts') : st.days ? t('Estudia hoy para mantener la racha', 'Study today to keep your streak') : t('Gana XP hoy para iniciar tu racha', 'Earn XP today to start your streak')}</div></div>
      </div></div>
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--xp-soft);color:var(--xp-text)"><${Icon} name="zap" size=${22} /></div>
        <div style="flex:1"><div class="kpi-value">${s.xp} XP</div>
          <div class="kpi-label">${t(`Nivel ${lvl.level} · faltan ${lvl.next - s.xp} XP para el ${lvl.level + 1}`, `Level ${lvl.level} · ${lvl.next - s.xp} XP to level ${lvl.level + 1}`)}</div>
          <div style="margin-top:6px"><${Progress} value=${lvl.pct} kind="xp" /></div></div>
      </div></div>
      <div class="card span-4"><div class="kpi">
        <div class="kpi-icon" style="background:var(--accent-soft);color:var(--accent)"><${Icon} name="repeat" size=${22} /></div>
        <div style="flex:1"><div class="kpi-value">${due.length}</div>
          <div class="kpi-label">${due.length ? t('conceptos para repasar hoy', 'concepts to review today') : t('repasos pendientes hoy', 'reviews due today')}</div></div>
        ${due.length > 0 && html`<a class="btn sm primary" href="#/repaso">${t('Repasar', 'Review')}</a>`}
      </div></div>

      <div class="card span-5">
        <div class="card-title"><${Icon} name="target" /> ${t('Objetivo diario', 'Daily goal')}</div>
        <div class="row" style="gap:20px;align-items:center">
          <${Ring} value=${hoy.xp / goal} color=${hoy.xp >= goal ? 'var(--ok)' : 'var(--accent)'}>${Math.min(hoy.xp, 999)}<small>${t('de', 'of')} ${goal} XP</small></${Ring}>
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
        <div class="card-title"><${Icon} name="chart" /> ${t('Esta semana', 'This week')}
          <span class="muted small" style="margin-left:auto">${wk.activeDays}/${wk.goalDays} ${t('días activos', 'active days')} · ${wk.xp}/${wk.goalXp} XP</span></div>
        <div class="week">
          ${days.map((d, i) => {
            const [y, m, dd] = d.key.split('-').map(Number);
            const wd = new Date(y, m - 1, dd).getDay();
            return html`<div class=${`week-col ${i === 6 ? 'today' : ''}`}>
              <span class="week-val">${d.xp || ''}</span>
              <div class=${`week-bar ${d.xp ? '' : 'empty'}`} style=${{ height: `${Math.max(3, (d.xp / maxXp) * 80)}px` }} title=${`${d.xp} XP`} />
              <span class="week-day">${i === 6 ? t('Hoy', 'Today') : DAYS[wd]}</span>
            </div>`;
          })}
        </div>
        <div class="row" style="gap:10px;margin-top:14px">
          <span class="small muted" style="flex:none">${t('Objetivo semanal', 'Weekly goal')}</span>
          <div style="flex:1"><${Progress} value=${(wk.activeDays / wk.goalDays) * 100} kind="ok" /></div>
        </div>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="calendar" /> ${t('Próximos repasos', 'Upcoming reviews')}</div>
        ${due.length === 0 && upcoming.length === 0 ? html`<div class="empty" style="padding:12px">
            <div class="small">${t('Cuando practiques conceptos, aquí verás cuándo conviene repasarlos para no olvidarlos (repetición espaciada).', "When you practise concepts, you'll see here when it's best to review them so you don't forget (spaced repetition).")}</div></div>`
          : html`<div class="stack" style="gap:8px">
            ${due.map((c) => html`<div class="row between"><span class="small"><b>${c.name}</b></span><span class="tag warn">${t('Hoy', 'Today')}</span></div>`)}
            ${upcoming.map((c) => html`<div class="row between"><span class="small">${c.name}</span><span class="tag">${c.inDays === 1 ? t('Mañana', 'Tomorrow') : t(`En ${c.inDays} días`, `In ${c.inDays} days`)}</span></div>`)}
          </div>`}
        ${weak.length > 0 && html`<div class="divider" /><div class="small"><b>${t('Tus puntos débiles:', 'Your weak points:')}</b> ${weak.map((w) => w.short).join(', ')} · <a href="#/progreso">${t('ver detalles', 'see details')}</a></div>`}
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="terminal" /> ${t('Acceso rápido', 'Quick access')}</div>
        <div class="grid quick-grid">
          <a class="btn" href="#/lab"><${Icon} name="code" size=${16} /> ${t('Laboratorio Python', 'Python Lab')}</a>
          <a class="btn" href="#/desafios"><${Icon} name="target" size=${16} /> ${t('Desafíos', 'Challenges')}</a>
          <a class="btn" href="#/mapa"><${Icon} name="map" size=${16} /> ${t('Mapa de aprendizaje', 'Learning map')}</a>
          <a class="btn" href="#/progreso"><${Icon} name="chart" size=${16} /> ${t('Mi progreso', 'My progress')}</a>
        </div>
        <div class="tiny faint" style="margin-top:12px">${t('Todas las cifras de esta página son tu progreso real, guardado en este navegador.', 'All the figures on this page are your real progress, saved in this browser.')}</div>
      </div>
    </div>
  </div>`;
}
