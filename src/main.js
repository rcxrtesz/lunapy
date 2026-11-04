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
import { AsistenteView } from './views/asistente.js';
import { AsistenteFlotante } from './components/asistente.js';
import { ErrorBoundary } from './components/boundary.js';
import { initPWA, usePWA, applyUpdate } from './lib/pwa.js';
import { initSync, useSync, estadoSync as getSyncEstado } from './lib/sync.js';
import { ocultarSplash, useSplashFuera } from './lib/splash.js';
import { FormularioEntrar, PantallaEnlace } from './components/cuenta.js';
import { SelectorIdioma } from './components/appearance.js';
import { imagenAvatar } from './state/avatares.js';
import { t, LANG } from './lib/i18n.js';

const NAV = [
  { href: '#/', icon: 'home', label: t('Inicio', 'Home'), match: (r) => r[0] === '' },
  { href: '#/mapa', icon: 'map', label: t('Mapa', 'Map'), match: (r) => r[0] === 'mapa' || r[0] === 'leccion' },
  { href: '#/lab', icon: 'terminal', label: t('Laboratorio', 'Lab'), short: 'Lab', match: (r) => r[0] === 'lab' },
  { href: '#/desafios', icon: 'target', label: t('Desafíos', 'Challenges'), match: (r) => r[0] === 'desafios' },
  { href: '#/repaso', icon: 'repeat', label: t('Repaso', 'Review'), match: (r) => r[0] === 'repaso', desktopOnly: true },
  { href: '#/progreso', icon: 'chart', label: t('Mi progreso', 'My progress'), short: t('Progreso', 'Progress'), match: (r) => r[0] === 'progreso' },
  { href: '#/asistente', icon: 'chat', label: t('Asistente', 'Assistant'), match: (r) => r[0] === 'asistente', desktopOnly: true },
  { href: '#/perfil', icon: 'user', label: t('Perfil', 'Profile'), match: (r) => r[0] === 'perfil', desktopOnly: true },
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
  return html`<div class="appearance" ref=${ref} role="dialog" aria-label=${t('Personalizar apariencia', 'Customise appearance')}>
    <div class="appearance-title">${t('Color', 'Colour')}</div>
    <${PaletteChoices} palette=${palette} />
    <div class="appearance-title">${t('Modo', 'Mode')}</div>
    <${ModeChoices} theme=${theme} resolved=${resolved} />
  </div>`;
}

/** Bienvenida al abrir la app sin sesión: iniciar sesión o entrar como invitado.
 *  Con la sesión iniciada no vuelve a aparecer en este dispositivo (la sesión se recuerda). */
function Bienvenida({ alEntrar }) {
  return html`<div class="bienvenida" role="dialog" aria-modal="true" aria-labelledby="bienvenida-titulo">
    <div class="bienvenida-tarjeta compacta">
      <div class="bienvenida-cabecera">
        <img class="bienvenida-kuromi" src="./img/kuromi_luna.png" alt="" width="72" height="71" />
        <div>
          <h1 id="bienvenida-titulo">${t('Bienvenida a LunaPy', 'Welcome to LunaPy')}</h1>
          <p class="muted">${t('Inicia sesión para guardar tu progreso en todos tus dispositivos.', 'Sign in to save your progress on all your devices.')}</p>
        </div>
      </div>
      <${FormularioEntrar} alEntrar=${alEntrar} idPrefijo="bienvenida" />
      <div class="bienvenida-o"><span>${t('o', 'or')}</span></div>
      <button class="btn bienvenida-invitado" onClick=${alEntrar}><${Icon} name="user" size=${17} /> ${t('Entrar como invitado', 'Continue as a guest')}</button>
      <p class="tiny muted" style="margin:8px 0 0">${t('Como invitado, tu progreso se guarda solo en este dispositivo.', 'As a guest, your progress is only saved on this device.')}</p>
      <${SelectorIdioma} />
    </div>
  </div>`;
}

function Onboarding() {
  const s = getState();
  const [name, setName] = useState(s.profile.name);
  const [goal, setGoal] = useState(s.profile.dailyGoal);
  const done = () => { actions.setProfile({ name: name.trim().slice(0, 30), dailyGoal: goal, onboarded: true }); location.hash = '#/'; };
  return html`<${Modal} label=${t('Bienvenida', 'Welcome')}>
    <div class="brand-mark" style="width:56px;height:56px;margin-bottom:10px"><${Logo} size=${56} /></div>
    <h2>${t('Antes de empezar', 'Before you start')}</h2>
    <p class="muted">${t(html`Aquí no se trata de memorizar sintaxis, sino de <b>aprender a pensar</b> como programadora o programador. Cada problema sigue el mismo ciclo:`, html`This isn't about memorising syntax, it's about <b>learning to think</b> like a programmer. Every problem follows the same cycle:`)}</p>
    <div class="method" style="margin:10px 0 18px">${(LANG === 'en'
      ? ['Understand', 'Reason', 'Plan', 'Code', 'Run', 'Analyse', 'Improve']
      : ['Comprender', 'Razonar', 'Planificar', 'Programar', 'Ejecutar', 'Analizar', 'Mejorar']).map((p, i) => html`${i > 0 && html`<i>→</i>`}<span>${p}</span>`)}</div>
    <label class="small" style="font-weight:700" for="ob-name">${t('¿Cómo quieres que te llamemos?', 'What should we call you?')} <span class="muted" style="font-weight:400">${t('(opcional)', '(optional)')}</span></label>
    <input id="ob-name" class="input" style="width:100%;margin:6px 0 16px" value=${name} onInput=${(e) => setName(e.target.value)} placeholder=${t('Tu nombre', 'Your name')} maxlength="30" />
    <div class="small" style="font-weight:700;margin-bottom:6px">${t('Objetivo diario', 'Daily goal')}</div>
    <div class="onboard-goals" role="radiogroup">
      ${[[20, t('Suave', 'Gentle'), '≈ 10 min'], [30, t('Constante', 'Steady'), '≈ 15 min'], [50, t('Intenso', 'Intense'), '≈ 25 min']].map(([v, l, tm]) => html`
        <button class=${`goal-opt ${goal === v ? 'on' : ''}`} role="radio" aria-checked=${goal === v} onClick=${() => setGoal(v)}>
          <strong>${v} XP</strong><span class="small">${l}</span><div class="tiny muted">${tm}</div></button>`)}
    </div>
    ${LANG === 'en' && html`<p class="tiny muted" style="margin-top:14px">${'The app is in English, but the lessons, challenges and review are still in Spanish for now. You can change the language in your Profile.'}</p>`}
    <p class="tiny muted" style="margin-top:14px">${useSync().status === 'off'
      ? t('Tu progreso se guarda en este dispositivo. Si inicias sesión en el Perfil, también se copia en tu cuenta.', 'Your progress is saved on this device. If you sign in from your Profile, it is also copied to your account.')
      : t('Tu progreso se guarda en este dispositivo y se sincroniza con tu cuenta.', 'Your progress is saved on this device and synced with your account.')}</p>
    <div class="row" style="justify-content:flex-end;margin-top:8px"><button class="btn primary lg" onClick=${done}>${t('Empezar', 'Start')} <${Icon} name="arrowRight" size=${16} /></button></div>
  </${Modal}>`;
}

function App() {
  const s = useStore();
  const route = useRoute();
  const eng = useEngine();
  const pwa = usePWA();
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const due = dueReviews(s).length;
  const resolved = useResolvedTheme(s.theme);
  const [appearance, setAppearance] = useState(false);
  const sync = useSync();
  const splashFuera = useSplashFuera();
  // Sin sesión, cada vez que se abre la app se ofrece iniciarla o entrar como invitado.
  const [puerta, setPuerta] = useState(() => sync.status === 'off');
  useEffect(() => { ocultarSplash(); }, []);
  // Enlaces de los correos: #/verificar?t=… y #/restablecer?t=…
  const enlace = /^(verificar|restablecer)\?t=([0-9a-f]{64})$/.exec(route.join('/'));
  const terminarEnlace = () => {
    location.hash = '#/';
    if (getSyncEstado().status !== 'off') setPuerta(false);
  };

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.palette = s.palette || 'kuromi';
  }, [resolved, s.palette]);

  let view;
  switch (route[0]) {
    case 'mapa': view = html`<${MapView} />`; break;
    case 'leccion': view = html`<${LessonView} lessonId=${route[1]} step=${route[2]} key=${route[1]} />`; break;
    case 'lab': view = html`<${Lab} />`; break;
    case 'desafios': view = route[1] ? html`<${ChallengeView} id=${route[1]} key=${route[1]} />` : html`<${Challenges} />`; break;
    case 'repaso': view = html`<${Review} />`; break;
    case 'progreso': view = html`<${ProgressView} />`; break;
    case 'perfil': view = html`<${ProfileView} />`; break;
    case 'asistente': view = html`<${AsistenteView} />`; break;
    default: view = html`<${Dashboard} />`;
  }
  const isDark = resolved === 'dark';
  const brand = html`<a class="brand" href="#/"><span class="brand-mark"><${Logo} size=${38} /></span>
    <span><span class="brand-name">LunaPy</span><span class="brand-sub">${t('Aprende Python pensando', 'Learn Python by thinking')}</span></span></a>`;

  return html`<div class="app">
    <aside class="sidebar">
      ${brand}
      <nav aria-label=${t('Principal', 'Main')}>
        ${NAV.map((n) => html`<a class=${`nav-link ${n.match(route) ? 'active' : ''}`} href=${n.href} aria-current=${n.match(route) ? 'page' : undefined}>
          <${Icon} name=${n.icon} size=${19} /> ${n.label}
          ${n.icon === 'repeat' && due > 0 && html`<span class="badge-dot" aria-label=${t(`${due} pendientes`, `${due} due`)}>${due}</span>`}
        </a>`)}
      </nav>
      <div class="sidebar-foot">
        <div class="card flat" style="padding:14px">
          <div class="row between small"><b>${t('Nivel', 'Level')} ${lvl.level}</b><span class="muted">${s.xp}/${lvl.next} XP</span></div>
          <div style="margin-top:8px"><div class="progress xp"><span style=${{ width: `${lvl.pct}%` }} /></div></div>
        </div>
        <div class="engine-pill" title=${eng.error || ''}>
          <span class=${`dot ${eng.state}`} />
          ${eng.state === 'ready' ? `Python ${eng.python} · ${t('listo', 'ready')}` : eng.state === 'error' ? t('Python no disponible', 'Python unavailable') : t('Cargando Python…', 'Loading Python…')}
        </div>
        ${!pwa.online && html`<div class="engine-pill" title=${t('Tu progreso se guarda en este dispositivo', 'Your progress is saved on this device')}><span class="dot offline" /> ${t('Sin conexión · todo sigue funcionando', 'Offline · everything still works')}</div>`}
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        ${brand}
        <span class="stat-chip streak" title=${t('Racha de días de estudio', 'Study streak (days)')}><${Icon} name="flame" size=${16} /> ${st.days}</span>
        <span class="stat-chip xp" title=${t('Puntos de experiencia', 'Experience points')}><${Icon} name="zap" size=${16} /> ${s.xp}</span>
        <span class="stat-chip level" title=${t('Nivel', 'Level')}><${Icon} name="star" size=${16} /> ${t('Nv', 'Lv')} ${lvl.level}</span>
        <div class="appearance-wrap">
          <button class="icon-btn" data-appearance-toggle onClick=${() => setAppearance(!appearance)} aria-expanded=${appearance} aria-label=${t('Personalizar colores', 'Customise colours')} title=${t('Personalizar colores', 'Customise colours')}>
            <${Icon} name="palette" size=${17} /></button>
          ${appearance && html`<${Appearance} theme=${s.theme} resolved=${resolved} palette=${s.palette || 'kuromi'} onClose=${() => setAppearance(false)} />`}
        </div>
        <a class=${`avatar-btn ${route[0] === 'perfil' ? 'active' : ''}`} href="#/perfil" aria-label=${t('Perfil', 'Profile')} title=${t('Perfil', 'Profile')}>
          <img src=${imagenAvatar(s.profile.avatar)} alt="" width="32" height="32" /></a>
        <button class="icon-btn" onClick=${() => actions.setTheme(isDark ? 'light' : 'dark')} aria-label=${isDark ? t('Cambiar a modo día', 'Switch to light mode') : t('Cambiar a modo noche', 'Switch to dark mode')} title=${isDark ? t('Modo día', 'Light mode') : t('Modo noche', 'Dark mode')}>
          <${Icon} name=${isDark ? 'sun' : 'moon'} size=${17} /></button>
      </header>
      <main class=${`content ${route[0] === 'lab' ? 'wide' : ''}`} id="contenido"><${ErrorBoundary} key=${route.join('/')}>${view}</${ErrorBoundary}></main>
      <footer class="site-footer">developed by <a href="https://lunadev.es" target="_blank" rel="noopener">lunadev</a></footer>
    </div>
    <nav class="bottom-nav" aria-label=${t('Principal (móvil)', 'Main (mobile)')}>
      ${NAV.filter((n) => !n.desktopOnly).map((n) => html`<a class=${n.match(route) ? 'active' : ''} href=${n.href}><${Icon} name=${n.icon} size=${21} />${n.short || n.label}</a>`)}
    </nav>
    ${enlace ? html`<${PantallaEnlace} tipo=${enlace[1]} token=${enlace[2]} alTerminar=${terminarEnlace} key=${enlace[2]} />`
      : puerta ? html`<${Bienvenida} alEntrar=${() => setPuerta(false)} />` : !s.profile.onboarded && html`<${Onboarding} />`}
    ${pwa.updateReady && html`<div class="update-banner" role="status">
      <${Icon} name="sparkle" size=${18} />
      <span>${t('Hay una versión nueva de LunaPy.', 'A new version of LunaPy is available.')}</span>
      <button class="btn sm primary" onClick=${applyUpdate}>${t('Actualizar', 'Update')}</button>
    </div>`}
    <${AsistenteFlotante} oculto=${route[0] === 'asistente' || !s.profile.onboarded || puerta || !!enlace} saludar=${splashFuera} />
    <${Toasts} />
  </div>`;
}

// ---------- Servicios globales ----------
engine.start(); // Python se carga en segundo plano desde el primer momento
initPWA(); // app instalable y sin conexión
initSync(); // cuenta: sincroniza el progreso entre dispositivos

// Kuromi pasa a ser el color predeterminado: quien seguía con el de antes (índigo) cambia una sola vez.
try {
  if (!localStorage.getItem('lunapy.paleta-kuromi')) {
    localStorage.setItem('lunapy.paleta-kuromi', '1');
    if (getState().palette === 'indigo') actions.setPalette('kuromi');
  }
} catch { /* sin almacenamiento */ }

// Idioma: si cambia en otro dispositivo (llega con la sincronización), se recarga en el nuevo.
subscribe((s) => { if (s.lang && s.lang !== LANG) location.reload(); });

// Logros: se comprueban tras cada cambio de estado
subscribe((s) => {
  try {
    const earned = newAchievements(s);
    if (!earned.length) return;
    actions.unlockAchievements(earned.map((a) => a.id)); // una sola actualización: sin avisos repetidos
    earned.forEach((a) => toast({ icon: 'trophy', title: `${t('Logro', 'Achievement')}: ${a.name}`, text: a.desc, duration: 4500 }));
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


render(html`<${ErrorBoundary} scope=${t('aplicación', 'app')}><${App} /></${ErrorBoundary}>`, document.getElementById('app'));
