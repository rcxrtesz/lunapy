import { html, render, useEffect, useLayoutEffect, useRef, useState } from './lib/ui.js';
import { PaletteChoices, ModeChoices } from './components/appearance.js';
import { Icon, Logo } from './lib/icons.js';
import { Toasts, Modal, toast, useEngine } from './components/common.js';
import { engine } from './engine/python.js';
import { actions, getState, subscribe, useStore, levelInfo, streak } from './state/store.js';
import { newAchievements, dueReviews } from './state/gamification.js';
import { Dashboard } from './views/dashboard.js';
import { MapView } from './views/map.js';
import { LessonView } from './views/lesson.js';
import { Lab } from './views/lab.js';
import { Challenges, ChallengeView } from './views/challenges.js';
import { Review } from './views/review.js';
import { ProgressView } from './views/progress.js';
import { ProfileView } from './views/profile.js';
import { ErrorBoundary } from './components/boundary.js';

const NAV = [
  { href: '#/', icon: 'home', label: 'Inicio', match: (r) => r[0] === '' },
  { href: '#/mapa', icon: 'map', label: 'Mapa', match: (r) => r[0] === 'mapa' || r[0] === 'leccion' },
  { href: '#/lab', icon: 'terminal', label: 'Laboratorio', short: 'Lab', match: (r) => r[0] === 'lab' },
  { href: '#/desafios', icon: 'target', label: 'Desafíos', match: (r) => r[0] === 'desafios' },
  { href: '#/repaso', icon: 'repeat', label: 'Repaso', match: (r) => r[0] === 'repaso', desktopOnly: true },
  { href: '#/progreso', icon: 'chart', label: 'Mi progreso', short: 'Progreso', match: (r) => r[0] === 'progreso' },
  { href: '#/perfil', icon: 'user', label: 'Perfil', match: (r) => r[0] === 'perfil', desktopOnly: true },
];

const parseRoute = () => location.hash.replace(/^#\/?/, '').split('/');

function useRoute() {
  const [r, set] = useState(parseRoute());
  useEffect(() => {
    const on = () => set(parseRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}

// Tema efectivo derivado del ESTADO (no del DOM): así el icono y la página nunca se desincronizan.
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
function useResolvedTheme(theme) {
  const [sysDark, setSysDark] = useState(darkQuery.matches);
  useEffect(() => {
    const on = (e) => setSysDark(e.matches);
    darkQuery.addEventListener('change', on);
    return () => darkQuery.removeEventListener('change', on);
  }, []);
  return theme === 'system' ? (sysDark ? 'dark' : 'light') : theme;
}

function Appearance({ theme, resolved, palette, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const away = (e) => { if (ref.current && !ref.current.contains(e.target) && !e.target.closest('[data-appearance-toggle]')) onClose(); };
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, []);
  return html`<div class="appearance" ref=${ref} role="dialog" aria-label="Personalizar apariencia">
    <div class="appearance-title">Color</div>
    <${PaletteChoices} palette=${palette} />
    <div class="appearance-title">Modo</div>
    <${ModeChoices} theme=${theme} resolved=${resolved} />
  </div>`;
}

function Onboarding() {
  const s = getState();
  const [name, setName] = useState(s.profile.name);
  const [goal, setGoal] = useState(s.profile.dailyGoal);
  const done = () => { actions.setProfile({ name: name.trim().slice(0, 30), dailyGoal: goal, onboarded: true }); location.hash = '#/'; };
  return html`<${Modal} label="Bienvenida">
    <div class="brand-mark" style="width:48px;height:48px;border-radius:14px;margin-bottom:14px"><${Logo} size=${28} /></div>
    <h2>Te damos la bienvenida a LunaPy</h2>
    <p class="muted">Aquí no se trata de memorizar sintaxis, sino de <b>aprender a pensar</b> como programadora o programador. Cada problema sigue el mismo ciclo:</p>
    <div class="method" style="margin:10px 0 18px"><span>Comprender</span><i>→</i><span>Razonar</span><i>→</i><span>Planificar</span><i>→</i><span>Programar</span><i>→</i><span>Ejecutar</span><i>→</i><span>Analizar</span><i>→</i><span>Mejorar</span></div>
    <label class="small" style="font-weight:700" for="ob-name">¿Cómo quieres que te llamemos? <span class="muted" style="font-weight:400">(opcional)</span></label>
    <input id="ob-name" class="input" style="width:100%;margin:6px 0 16px" value=${name} onInput=${(e) => setName(e.target.value)} placeholder="Tu nombre" maxlength="30" />
    <div class="small" style="font-weight:700;margin-bottom:6px">Objetivo diario</div>
    <div class="onboard-goals" role="radiogroup">
      ${[[20, 'Suave', '≈ 10 min'], [30, 'Constante', '≈ 15 min'], [50, 'Intenso', '≈ 25 min']].map(([v, l, t]) => html`
        <button class=${`goal-opt ${goal === v ? 'on' : ''}`} role="radio" aria-checked=${goal === v} onClick=${() => setGoal(v)}>
          <strong>${v} XP</strong><span class="small">${l}</span><div class="tiny muted">${t}</div></button>`)}
    </div>
    <p class="tiny muted" style="margin-top:14px">Tu progreso se guarda solo en este navegador. No hay cuentas ni se envían datos a ningún servidor.</p>
    <div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn primary lg" onClick=${done}>Empezar <${Icon} name="arrowRight" size=${16} /></button></div>
  </${Modal}>`;
}

function App() {
  const s = useStore();
  const route = useRoute();
  const eng = useEngine();
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const due = dueReviews(s).length;
  const resolved = useResolvedTheme(s.theme);
  const [appearance, setAppearance] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.palette = s.palette || 'indigo';
  }, [resolved, s.palette]);

  let view;
  switch (route[0]) {
    case 'mapa': view = html`<${MapView} />`; break;
    case 'leccion': view = html`<${LessonView} step=${route[2]} />`; break;
    case 'lab': view = html`<${Lab} />`; break;
    case 'desafios': view = route[1] ? html`<${ChallengeView} id=${route[1]} key=${route[1]} />` : html`<${Challenges} />`; break;
    case 'repaso': view = html`<${Review} />`; break;
    case 'progreso': view = html`<${ProgressView} />`; break;
    case 'perfil': view = html`<${ProfileView} />`; break;
    default: view = html`<${Dashboard} />`;
  }
  const isDark = resolved === 'dark';
  const brand = html`<a class="brand" href="#/"><span class="brand-mark"><${Logo} size=${20} /></span>
    <span><span class="brand-name">LunaPy</span><span class="brand-sub">Aprende Python pensando</span></span></a>`;

  return html`<div class="app">
    <aside class="sidebar">
      ${brand}
      <nav aria-label="Principal">
        ${NAV.map((n) => html`<a class=${`nav-link ${n.match(route) ? 'active' : ''}`} href=${n.href} aria-current=${n.match(route) ? 'page' : undefined}>
          <${Icon} name=${n.icon} size=${19} /> ${n.label}
          ${n.icon === 'repeat' && due > 0 && html`<span class="badge-dot" aria-label=${`${due} pendientes`}>${due}</span>`}
        </a>`)}
      </nav>
      <div class="sidebar-foot">
        <div class="card flat" style="padding:14px">
          <div class="row between small"><b>Nivel ${lvl.level}</b><span class="muted">${s.xp}/${lvl.next} XP</span></div>
          <div style="margin-top:8px"><div class="progress xp"><span style=${{ width: `${lvl.pct}%` }} /></div></div>
        </div>
        <div class="engine-pill" title=${eng.error || ''}>
          <span class=${`dot ${eng.state}`} />
          ${eng.state === 'ready' ? `Python ${eng.python} · listo` : eng.state === 'error' ? 'Python no disponible' : 'Cargando Python…'}
        </div>
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        ${brand}
        <span class="stat-chip streak" title="Racha de días de estudio"><${Icon} name="flame" size=${16} /> ${st.days}</span>
        <span class="stat-chip xp" title="Puntos de experiencia"><${Icon} name="zap" size=${16} /> ${s.xp}</span>
        <span class="stat-chip level" title="Nivel"><${Icon} name="star" size=${16} /> Nv ${lvl.level}</span>
        <div class="appearance-wrap">
          <button class="icon-btn" data-appearance-toggle onClick=${() => setAppearance(!appearance)} aria-expanded=${appearance} aria-label="Personalizar colores" title="Personalizar colores">
            <${Icon} name="palette" size=${17} /></button>
          ${appearance && html`<${Appearance} theme=${s.theme} resolved=${resolved} palette=${s.palette || 'indigo'} onClose=${() => setAppearance(false)} />`}
        </div>
        <a class=${`avatar-btn ${route[0] === 'perfil' ? 'active' : ''}`} href="#/perfil" aria-label="Perfil" title="Perfil">
          ${(s.profile.name || '').trim().charAt(0).toUpperCase() || html`<${Icon} name="user" size=${16} />`}</a>
        <button class="icon-btn" onClick=${() => actions.setTheme(isDark ? 'light' : 'dark')} aria-label=${isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'} title=${isDark ? 'Modo día' : 'Modo noche'}>
          <${Icon} name=${isDark ? 'sun' : 'moon'} size=${17} /></button>
      </header>
      <main class=${`content ${route[0] === 'lab' ? 'wide' : ''}`} id="contenido"><${ErrorBoundary} key=${route.join('/')}>${view}</${ErrorBoundary}></main>
      <footer class="site-footer">developed by <a href="https://lunadev.es" target="_blank" rel="noopener">lunadev</a></footer>
    </div>
    <nav class="bottom-nav" aria-label="Principal (móvil)">
      ${NAV.filter((n) => !n.desktopOnly).map((n) => html`<a class=${n.match(route) ? 'active' : ''} href=${n.href}><${Icon} name=${n.icon} size=${21} />${n.short || n.label}</a>`)}
    </nav>
    ${!s.profile.onboarded && html`<${Onboarding} />`}
    <${Toasts} />
  </div>`;
}

// ---------- Servicios globales ----------
engine.start(); // Python se carga en segundo plano desde el primer momento

// Logros: se comprueban tras cada cambio de estado
subscribe((s) => {
  try {
    const earned = newAchievements(s);
    if (!earned.length) return;
    actions.unlockAchievements(earned.map((a) => a.id)); // una sola actualización: sin avisos repetidos
    earned.forEach((a) => toast({ icon: 'trophy', title: `Logro: ${a.name}`, text: a.desc, duration: 4500 }));
  } catch (e) {
    console.error('[LunaPy] No se pudieron comprobar los logros:', e);
  }
});

// Tiempo de práctica activa: cuenta solo con la pestaña visible y actividad en el último minuto
let lastInteraction = Date.now();
['pointerdown', 'keydown', 'scroll'].forEach((ev) => window.addEventListener(ev, () => { lastInteraction = Date.now(); }, { passive: true }));
setInterval(() => {
  if (document.visibilityState === 'visible' && Date.now() - lastInteraction < 60000 && getState().profile.onboarded) actions.addSeconds(15);
}, 15000);


render(html`<${ErrorBoundary} scope="aplicación"><${App} /></${ErrorBoundary}>`, document.getElementById('app'));
