import { html, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Modal, toast } from '../components/common.js';
import { PaletteChoices, ModeChoices } from '../components/appearance.js';
import { actions, getState, useStore, levelInfo, streak, checkBackup } from '../state/store.js';
import { downloadBackup } from '../lib/backup.js';
import { ACHIEVEMENTS } from '../state/gamification.js';
import { usePWA, promptInstall, isIOS } from '../lib/pwa.js';

const GOALS = [[20, 'Suave', '≈ 10 min'], [30, 'Constante', '≈ 15 min'], [50, 'Intenso', '≈ 25 min']];

export function ProfileView() {
  const s = useStore();
  const pwa = usePWA();
  const [name, setName] = useState(s.profile.name);
  const [pending, setPending] = useState(null); // copia a importar, a la espera de confirmación
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const completed = Object.values(s.activities).filter((a) => a.completed).length;
  const resolved = s.theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : s.theme;
  const since = new Date(s.createdAt || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const initial = (s.profile.name || '').trim().charAt(0).toUpperCase();
  const dirty = name.trim() !== s.profile.name;

  const saveName = (e) => {
    e.preventDefault();
    actions.setProfile({ name: name.trim().slice(0, 30) });
    toast({ icon: 'check', title: 'Perfil actualizado', duration: 2000 });
  };

  const exportData = () => downloadBackup();

  const pickFile = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch {
      toast({ icon: 'alert', title: 'Archivo no válido', text: 'No es un archivo JSON.' });
      return;
    }
    const verdict = checkBackup(data);
    if (!verdict.ok) {
      toast({ icon: 'alert', title: 'Copia no válida', text: `Datos dañados o incompatibles: ${verdict.invalid.join(', ')}. No se ha cambiado nada.`, duration: 6000 });
      return;
    }
    setPending(data);
  };

  return html`<div>
    <div class="page-head">
      <div class="eyebrow">Perfil</div>
      <h1>Tu espacio en LunaPy</h1>
    </div>

    <div class="dash-grid" style="margin-top:0">
      <div class="card span-12 profile-hero">
        <div class="avatar" aria-hidden="true">${initial || html`<${Icon} name="user" size=${34} />`}</div>
        <div style="flex:1;min-width:0">
          <h2 style="margin:0">${s.profile.name || 'Estudiante'}</h2>
          <div class="small muted">Aprendiendo Python desde el ${since}</div>
          <div class="row wrap" style="margin-top:10px;gap:6px">
            <span class="tag accent"><${Icon} name="star" size=${12} /> Nivel ${lvl.level}</span>
            <span class="tag xp"><${Icon} name="zap" size=${12} /> ${s.xp} XP</span>
            <span class="tag"><${Icon} name="flame" size=${12} /> ${st.days} ${st.days === 1 ? 'día' : 'días'} de racha</span>
            <span class="tag"><${Icon} name="target" size=${12} /> ${completed} actividades</span>
            <span class="tag"><${Icon} name="trophy" size=${12} /> ${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length} logros</span>
          </div>
        </div>
        <a class="btn" href="#/progreso"><${Icon} name="chart" size=${15} /> Ver mi progreso</a>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="user" /> Datos personales</div>
        <form onSubmit=${saveName}>
          <label class="small" style="font-weight:700" for="pf-name">Nombre</label>
          <div class="row" style="margin:6px 0 18px">
            <input id="pf-name" class="input" value=${name} onInput=${(e) => setName(e.target.value)} maxlength="30" placeholder="¿Cómo quieres que te llamemos?" />
            <button class="btn primary" type="submit" disabled=${!dirty}>Guardar</button>
          </div>
        </form>
        <div class="small" style="font-weight:700;margin-bottom:6px">Objetivo diario</div>
        <div class="onboard-goals" role="radiogroup" aria-label="Objetivo diario">
          ${GOALS.map(([v, l, t]) => html`<button class=${`goal-opt ${s.profile.dailyGoal === v ? 'on' : ''}`} role="radio" aria-checked=${s.profile.dailyGoal === v}
            onClick=${() => actions.setProfile({ dailyGoal: v })}>
            <strong>${v} XP</strong><span class="small">${l}</span><div class="tiny muted">${t}</div></button>`)}
        </div>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="palette" /> Apariencia</div>
        <div class="appearance-title">Color</div>
        <${PaletteChoices} palette=${s.palette || 'indigo'} />
        <div class="appearance-title">Modo</div>
        <${ModeChoices} theme=${s.theme} resolved=${resolved} />
      </div>

      <div class="card span-12">
        <div class="card-title"><${Icon} name="layers" /> Instalar la app
          ${pwa.installed ? html`<span class="tag ok" style="margin-left:auto"><${Icon} name="check" size=${12} /> Instalada</span>` : null}</div>
        ${pwa.installed
          ? html`<p class="small">Estás usando LunaPy como aplicación instalada.</p>`
          : pwa.canInstall
            ? html`<p class="small">Instálala en este dispositivo: tendrás su icono, se abrirá en su propia ventana y funcionará sin conexión.</p>
                <button class="btn primary" onClick=${async () => { if (await promptInstall()) toast({ icon: 'check', title: 'LunaPy instalada' }); }}><${Icon} name="layers" size=${15} /> Instalar LunaPy</button>`
            : isIOS
              ? html`<p class="small">En iPhone y iPad se instala desde Safari:</p>
                  <ol class="install-steps small"><li>Pulsa el botón <b>Compartir</b> (el cuadrado con la flecha hacia arriba).</li>
                    <li>Elige <b>«Añadir a pantalla de inicio»</b>.</li><li>Pulsa <b>Añadir</b>: LunaPy aparecerá con su icono.</li></ol>`
              : html`<p class="small">Abre LunaPy en <b>Edge</b> o <b>Chrome</b> (también en Android) y elige <b>«Instalar LunaPy»</b> en el menú del navegador o en el icono de instalación de la barra de direcciones.</p>`}
        <div class="tiny muted" style="margin-top:10px">
          ${pwa.devMode ? 'Modo desarrollo: el funcionamiento sin conexión se activa cuando la app se publica.'
            : pwa.offlineReady ? '✓ Guardada en este dispositivo: funciona sin conexión.'
            : pwa.enabled ? 'Preparando el funcionamiento sin conexión…' : 'Este navegador no permite el funcionamiento sin conexión.'}
        </div>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="lock" /> Cuenta <span class="tag warn" style="margin-left:auto">Próximamente</span></div>
        <p class="small">Ahora mismo usas un <b>perfil local</b>: tu progreso se guarda solo en este navegador y no se envía a ningún servidor.</p>
        <p class="small muted">En la versión completa podrás crear una cuenta con tu correo electrónico para:</p>
        <ul class="small muted" style="margin:0;padding-left:18px">
          <li>Guardar tu progreso en la nube y no perderlo nunca.</li>
          <li>Continuar en cualquier dispositivo (ordenador, tablet, móvil).</li>
          <li>Recuperar el acceso si cambias de navegador.</li>
        </ul>
        <p class="small muted" style="margin-top:10px">Mientras tanto, puedes exportar una copia de seguridad de tu progreso.</p>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="save" /> Tus datos</div>
        <p class="small muted">Descarga una copia de tu progreso o restáurala en otro navegador.</p>
        <div class="row wrap">
          <button class="btn" onClick=${exportData}><${Icon} name="save" size=${15} /> Exportar copia</button>
          <button class="btn" onClick=${() => fileRef.current.click()}><${Icon} name="rotate" size=${15} /> Importar copia</button>
          <input ref=${fileRef} type="file" accept="application/json,.json" class="sr-only" onChange=${pickFile} aria-label="Archivo de copia de progreso" />
        </div>
        <div class="divider" />
        <button class="btn" style="color:var(--err)" onClick=${() => setConfirmReset(true)}><${Icon} name="trash" size=${15} /> Reiniciar todo el progreso</button>
      </div>
    </div>

    ${pending && html`<${Modal} onClose=${() => setPending(null)} label="Importar copia">
      <h2>¿Restaurar esta copia?</h2>
      <p class="muted">La copia tiene <b>${pending.xp} XP</b>${pending.profile && pending.profile.name ? ` y es de ${pending.profile.name}` : ''}. Sustituirá el progreso actual de este navegador (${s.xp} XP).</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setPending(null)}>Cancelar</button>
        <button class="btn primary" onClick=${() => {
          const { ok } = actions.importState(pending);
          setPending(null);
          if (ok) { setName(getState().profile.name); toast({ icon: 'check', title: 'Copia restaurada' }); }
          else toast({ icon: 'alert', title: 'No se pudo restaurar la copia' });
        }}>Sí, restaurar</button>
      </div>
    </${Modal}>`}

    ${confirmReset && html`<${Modal} onClose=${() => setConfirmReset(false)} label="Reiniciar progreso">
      <h2>¿Reiniciar el progreso?</h2>
      <p class="muted">Se borrarán XP, actividades, repasos y logros guardados en este navegador. Si quieres conservarlos, exporta antes una copia. No se puede deshacer.</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setConfirmReset(false)}>Cancelar</button>
        <button class="btn primary" style="background:var(--err);border-color:var(--err)" onClick=${() => { actions.reset(); setConfirmReset(false); location.hash = '#/'; }}>Sí, reiniciar</button>
      </div>
    </${Modal}>`}
  </div>`;
}
