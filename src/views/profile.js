import { html, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Modal, toast } from '../components/common.js';
import { PaletteChoices, ModeChoices, SelectorIdioma } from '../components/appearance.js';
import { actions, getState, useStore, levelInfo, streak, checkBackup } from '../state/store.js';
import { downloadBackup } from '../lib/backup.js';
import { ACHIEVEMENTS } from '../state/gamification.js';
import { usePWA, promptInstall, isIOS } from '../lib/pwa.js';
import { forzarSubida } from '../lib/sync.js';
import { CuentaCard } from '../components/cuenta.js';
import { AVATARES, GENEROS, MAX_DESCRIPCION, imagenAvatar } from '../state/avatares.js';
import { t, EN, LOCALE } from '../lib/i18n.js';

const GOALS = [[20, t('Suave', 'Gentle'), '≈ 10 min'], [30, t('Constante', 'Steady'), '≈ 15 min'], [50, t('Intenso', 'Intense'), '≈ 25 min']];

export function ProfileView() {
  const s = useStore();
  const pwa = usePWA();
  const [name, setName] = useState(s.profile.name);
  const [birthday, setBirthday] = useState(s.profile.birthday || '');
  const [gender, setGender] = useState(s.profile.gender || '');
  const [bio, setBio] = useState(s.profile.bio || '');
  const [pending, setPending] = useState(null); // copia a importar, a la espera de confirmación
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);
  const lvl = levelInfo(s.xp);
  const st = streak(s);
  const completed = Object.values(s.activities).filter((a) => a.completed).length;
  const resolved = s.theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : s.theme;
  const since = new Date(s.createdAt || Date.now()).toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' });
  const avatar = AVATARES.find((a) => a.id === s.profile.avatar) || AVATARES[0];
  const hoy = new Date();
  const esCumple = s.profile.birthday && s.profile.birthday.slice(5) === `${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  const dirty = name.trim() !== s.profile.name || birthday !== (s.profile.birthday || '')
    || gender !== (s.profile.gender || '') || bio.trim() !== (s.profile.bio || '');

  const saveName = (e) => {
    e.preventDefault();
    actions.setProfile({ name: name.trim().slice(0, 30), birthday, gender, bio: bio.trim().slice(0, MAX_DESCRIPCION) });
    toast({ icon: 'check', title: t('Perfil actualizado', 'Profile updated'), duration: 2000 });
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
      toast({ icon: 'alert', title: t('Archivo no válido', 'Invalid file'), text: t('No es un archivo JSON.', "It isn't a JSON file.") });
      return;
    }
    const verdict = checkBackup(data);
    if (!verdict.ok) {
      toast({ icon: 'alert', title: t('Copia no válida', 'Invalid backup'), text: t(`Datos dañados o incompatibles: ${verdict.invalid.join(', ')}. No se ha cambiado nada.`, `Damaged or incompatible data: ${verdict.invalid.join(', ')}. Nothing has been changed.`), duration: 6000 });
      return;
    }
    setPending(data);
  };

  return html`<div>
    <div class="page-head">
      <div class="eyebrow">${t('Perfil', 'Profile')}</div>
      <h1>${t('Tu espacio en LunaPy', 'Your space in LunaPy')}</h1>
    </div>

    <div class="dash-grid" style="margin-top:0">
      <div class="card span-12 profile-hero">
        <div class="avatar" title=${avatar.nombre}><img src=${imagenAvatar(avatar.id)} alt=${`Avatar: ${avatar.nombre}`} width="84" height="84" /></div>
        <div style="flex:1;min-width:0">
          <h2 style="margin:0">${s.profile.name || t('Estudiante', 'Student')}</h2>
          <div class="small muted">${t(`Aprendiendo Python desde el ${since}`, `Learning Python since ${since}`)}</div>
          ${s.profile.bio && html`<p class="profile-bio">${s.profile.bio}</p>`}
          <div class="row wrap" style="margin-top:10px;gap:6px">
            ${esCumple && html`<span class="tag accent">🎂 ${t('¡Feliz cumpleaños!', 'Happy birthday!')}</span>`}
            <span class="tag accent"><${Icon} name="star" size=${12} /> ${t('Nivel', 'Level')} ${lvl.level}</span>
            <span class="tag xp"><${Icon} name="zap" size=${12} /> ${s.xp} XP</span>
            <span class="tag"><${Icon} name="flame" size=${12} /> ${EN ? `${st.days}-day streak` : `${st.days} ${st.days === 1 ? 'día' : 'días'} de racha`}</span>
            <span class="tag"><${Icon} name="target" size=${12} /> ${completed} ${t('actividades', 'activities')}</span>
            <span class="tag"><${Icon} name="trophy" size=${12} /> ${Object.keys(s.achievements).length}/${ACHIEVEMENTS.length} ${t('logros', 'achievements')}</span>
          </div>
        </div>
        <a class="btn" href="#/progreso"><${Icon} name="chart" size=${15} /> ${t('Ver mi progreso', 'See my progress')}</a>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="user" /> ${t('Datos personales', 'Personal details')}</div>
        <div class="small" style="font-weight:700;margin-bottom:6px">Avatar</div>
        <div class="avatares" role="radiogroup" aria-label="Avatar">
          ${AVATARES.map((a) => html`<button class=${`avatar-opt ${avatar.id === a.id ? 'on' : ''}`} role="radio" aria-checked=${avatar.id === a.id}
            onClick=${() => actions.setProfile({ avatar: a.id })}>
            <img src=${imagenAvatar(a.id)} alt="" width="60" height="60" /><span>${a.nombre}</span></button>`)}
        </div>
        <form onSubmit=${saveName} style="margin-top:16px">
          <label class="small" style="font-weight:700" for="pf-name">${t('Nombre', 'Name')}</label>
          <input id="pf-name" class="input" style="width:100%;margin:6px 0 12px" value=${name} onInput=${(e) => setName(e.target.value)} maxlength="30" placeholder=${t('¿Cómo quieres que te llamemos?', 'What should we call you?')} />
          <div class="datos-grid">
            <div class="dato">
              <label for="pf-cumple">${t('Cumpleaños', 'Birthday')}</label>
              <input id="pf-cumple" class="input" type="date" value=${birthday} max=${new Date().toISOString().slice(0, 10)} onInput=${(e) => setBirthday(e.target.value)} />
            </div>
            <div class="dato">
              <label for="pf-genero">${t('Género', 'Gender')}</label>
              <select id="pf-genero" class="input" value=${gender} onChange=${(e) => setGender(e.target.value)}>
                ${GENEROS.map(([v, l]) => html`<option value=${v}>${l}</option>`)}
              </select>
            </div>
          </div>
          <label class="small" style="font-weight:700" for="pf-bio">${t('Descripción breve', 'Short description')}</label>
          <textarea id="pf-bio" class="input" style="margin-top:6px" rows="2" maxlength=${MAX_DESCRIPCION} value=${bio} onInput=${(e) => setBio(e.target.value)}
            placeholder=${t('Algo sobre ti: qué te gustaría programar, por qué aprendes Python…', "Something about you: what you'd like to code, why you're learning Python…")} />
          <div class="row between" style="margin:4px 0 18px">
            <span class="tiny muted">${bio.length}/${MAX_DESCRIPCION}</span>
            <button class="btn primary" type="submit" disabled=${!dirty}>${t('Guardar', 'Save')}</button>
          </div>
        </form>
        <div class="small" style="font-weight:700;margin-bottom:6px">${t('Objetivo diario', 'Daily goal')}</div>
        <div class="onboard-goals" role="radiogroup" aria-label=${t('Objetivo diario', 'Daily goal')}>
          ${GOALS.map(([v, l, tm]) => html`<button class=${`goal-opt ${s.profile.dailyGoal === v ? 'on' : ''}`} role="radio" aria-checked=${s.profile.dailyGoal === v}
            onClick=${() => actions.setProfile({ dailyGoal: v })}>
            <strong>${v} XP</strong><span class="small">${l}</span><div class="tiny muted">${tm}</div></button>`)}
        </div>
      </div>

      <div class="card span-6">
        <div class="card-title"><${Icon} name="palette" /> ${t('Apariencia', 'Appearance')}</div>
        <div class="appearance-title">${t('Idioma', 'Language')}</div>
        <${SelectorIdioma} />
        ${EN && html`<div class="tiny muted" style="margin-top:8px">The lessons, challenges and review are still in Spanish for now.</div>`}
        <div class="appearance-title">${t('Color', 'Colour')}</div>
        <${PaletteChoices} palette=${s.palette || 'kuromi'} />
        <div class="appearance-title">${t('Modo', 'Mode')}</div>
        <${ModeChoices} theme=${s.theme} resolved=${resolved} />
      </div>

      <div class="card span-12">
        <div class="card-title"><${Icon} name="layers" /> ${t('Instalar la app', 'Install the app')}
          ${pwa.installed ? html`<span class="tag ok" style="margin-left:auto"><${Icon} name="check" size=${12} /> ${t('Instalada', 'Installed')}</span>` : null}</div>
        ${pwa.installed
          ? html`<p class="small">${t('Estás usando LunaPy como aplicación instalada.', "You're using LunaPy as an installed app.")}</p>`
          : pwa.canInstall
            ? html`<p class="small">${t('Instálala en este dispositivo: tendrás su icono, se abrirá en su propia ventana y funcionará sin conexión.', "Install it on this device: you'll get its icon, it'll open in its own window and work offline.")}</p>
                <button class="btn primary" onClick=${async () => { if (await promptInstall()) toast({ icon: 'check', title: t('LunaPy instalada', 'LunaPy installed') }); }}><${Icon} name="layers" size=${15} /> ${t('Instalar LunaPy', 'Install LunaPy')}</button>`
            : isIOS
              ? (EN ? html`<p class="small">On iPhone and iPad it's installed from Safari:</p>
                  <ol class="install-steps small"><li>Tap the <b>Share</b> button (the square with the arrow pointing up).</li>
                    <li>Choose <b>«Add to Home Screen»</b>.</li><li>Tap <b>Add</b>: LunaPy will appear with its icon.</li></ol>`
                : html`<p class="small">En iPhone y iPad se instala desde Safari:</p>
                  <ol class="install-steps small"><li>Pulsa el botón <b>Compartir</b> (el cuadrado con la flecha hacia arriba).</li>
                    <li>Elige <b>«Añadir a pantalla de inicio»</b>.</li><li>Pulsa <b>Añadir</b>: LunaPy aparecerá con su icono.</li></ol>`)
              : html`<p class="small">${t(html`Abre LunaPy en <b>Edge</b> o <b>Chrome</b> (también en Android) y elige <b>«Instalar LunaPy»</b> en el menú del navegador o en el icono de instalación de la barra de direcciones.`, html`Open LunaPy in <b>Edge</b> or <b>Chrome</b> (also on Android) and choose <b>«Install LunaPy»</b> from the browser menu or the install icon in the address bar.`)}</p>`}
        <div class="tiny muted" style="margin-top:10px">
          ${pwa.devMode ? t('Modo desarrollo: el funcionamiento sin conexión se activa cuando la app se publica.', 'Development mode: offline support is enabled when the app is published.')
            : pwa.offlineReady ? t('✓ Guardada en este dispositivo: funciona sin conexión.', '✓ Saved on this device: works offline.')
            : pwa.enabled ? t('Preparando el funcionamiento sin conexión…', 'Getting offline support ready…') : t('Este navegador no permite el funcionamiento sin conexión.', "This browser doesn't support offline use.")}
        </div>
      </div>

      <${CuentaCard} />

      <div class="card span-6">
        <div class="card-title"><${Icon} name="save" /> ${t('Tus datos', 'Your data')}</div>
        <p class="small muted">${t('Descarga una copia de tu progreso o restáurala en otro navegador.', 'Download a backup of your progress or restore it in another browser.')}</p>
        <div class="row wrap">
          <button class="btn" onClick=${exportData}><${Icon} name="save" size=${15} /> ${t('Exportar copia', 'Export backup')}</button>
          <button class="btn" onClick=${() => fileRef.current.click()}><${Icon} name="rotate" size=${15} /> ${t('Importar copia', 'Import backup')}</button>
          <input ref=${fileRef} type="file" accept="application/json,.json" class="sr-only" onChange=${pickFile} aria-label=${t('Archivo de copia de progreso', 'Progress backup file')} />
        </div>
        <div class="divider" />
        <button class="btn" style="color:var(--err)" onClick=${() => setConfirmReset(true)}><${Icon} name="trash" size=${15} /> ${t('Reiniciar todo el progreso', 'Reset all progress')}</button>
      </div>
    </div>

    ${pending && html`<${Modal} onClose=${() => setPending(null)} label=${t('Importar copia', 'Import backup')}>
      <h2>${t('¿Restaurar esta copia?', 'Restore this backup?')}</h2>
      <p class="muted">${EN
        ? html`The backup has <b>${pending.xp} XP</b>${pending.profile && pending.profile.name ? ` and belongs to ${pending.profile.name}` : ''}. It will replace the current progress in this browser (${s.xp} XP).`
        : html`La copia tiene <b>${pending.xp} XP</b>${pending.profile && pending.profile.name ? ` y es de ${pending.profile.name}` : ''}. Sustituirá el progreso actual de este navegador (${s.xp} XP).`}</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setPending(null)}>${t('Cancelar', 'Cancel')}</button>
        <button class="btn primary" onClick=${() => {
          const { ok } = actions.importState(pending);
          if (ok) forzarSubida();
          setPending(null);
          if (ok) { const pf = getState().profile; setName(pf.name); setBirthday(pf.birthday || ''); setGender(pf.gender || ''); setBio(pf.bio || ''); toast({ icon: 'check', title: t('Copia restaurada', 'Backup restored') }); }
          else toast({ icon: 'alert', title: t('No se pudo restaurar la copia', "The backup couldn't be restored") });
        }}>${t('Sí, restaurar', 'Yes, restore')}</button>
      </div>
    </${Modal}>`}

    ${confirmReset && html`<${Modal} onClose=${() => setConfirmReset(false)} label=${t('Reiniciar progreso', 'Reset progress')}>
      <h2>${t('¿Reiniciar el progreso?', 'Reset your progress?')}</h2>
      <p class="muted">${t('Se borrarán XP, actividades, repasos y logros guardados en este navegador y, si tienes la sesión iniciada, también en tu cuenta (en todos tus dispositivos). Si quieres conservarlos, exporta antes una copia. No se puede deshacer.', "XP, activities, reviews and achievements saved in this browser will be deleted and, if you're signed in, also in your account (on all your devices). If you want to keep them, export a backup first. This can't be undone.")}</p>
      <div class="row" style="justify-content:flex-end;margin-top:16px">
        <button class="btn" onClick=${() => setConfirmReset(false)}>${t('Cancelar', 'Cancel')}</button>
        <button class="btn primary" style="background:var(--err);border-color:var(--err)" onClick=${() => { actions.reset(); forzarSubida(); setConfirmReset(false); location.hash = '#/'; }}>${t('Sí, reiniciar', 'Yes, reset')}</button>
      </div>
    </${Modal}>`}
  </div>`;
}
