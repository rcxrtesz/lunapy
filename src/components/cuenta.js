// Tarjeta de cuenta del perfil: iniciar sesión, crear la cuenta y estado de la sincronización.
import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { useSync, entrar, salir, sincronizar } from '../lib/sync.js';

function hace(ms) {
  const min = Math.round((Date.now() - ms) / 60000);
  if (min < 1) return 'hace un momento';
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  return h < 24 ? `hace ${h} h` : `hace ${Math.round(h / 24)} días`;
}

const ESTADOS = {
  idle: { icon: 'clock', texto: () => 'Pendiente de sincronizar.' },
  syncing: { icon: 'rotate', texto: () => 'Sincronizando…' },
  ok: { icon: 'check', texto: (s) => `Sincronizado ${hace(s.ultima)}.` },
  offline: { icon: 'info', texto: () => 'Sin conexión: tu progreso se guarda aquí y se subirá cuando vuelva la red.' },
  error: { icon: 'alert', texto: (s) => s.error || 'No se ha podido sincronizar.' },
};

export function CuentaCard() {
  const sync = useSync();
  const [, refrescar] = useState(0);
  // Refresca «hace X min» cada minuto.
  useEffect(() => { const t = setInterval(() => refrescar((n) => n + 1), 60000); return () => clearInterval(t); }, []);

  if (sync.status === 'off') return html`<${FormularioCuenta} aviso=${sync.error} />`;

  const e = ESTADOS[sync.status] || ESTADOS.idle;
  return html`<div class="card span-6">
    <div class="card-title"><${Icon} name="user" /> Cuenta <span class="tag ok" style="margin-left:auto">Conectada</span></div>
    <p class="small">Sesión iniciada como <b>${sync.email}</b>. Tu progreso se guarda en este dispositivo y se sincroniza con tu servidor.</p>
    <p class=${`small ${sync.status === 'error' ? '' : 'muted'}`} role="status" style=${sync.status === 'error' ? 'color:var(--err)' : ''}>
      <${Icon} name=${e.icon} size=${14} /> ${e.texto(sync)}
    </p>
    <div class="row wrap">
      <button class="btn" onClick=${() => sincronizar()} disabled=${sync.status === 'syncing'}><${Icon} name="rotate" size=${15} /> Sincronizar ahora</button>
      <button class="btn" onClick=${() => salir()}>Cerrar sesión</button>
    </div>
  </div>`;
}

function FormularioCuenta({ aviso }) {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const enviar = async (nueva) => {
    setError(null);
    if (!email.trim() || !contrasena) { setError('Escribe tu correo y tu contraseña.'); return; }
    setEnviando(true);
    const r = await entrar(email.trim(), contrasena, nueva);
    setEnviando(false);
    if (!r.ok) setError(r.error);
    else setContrasena('');
  };

  return html`<div class="card span-6">
    <div class="card-title"><${Icon} name="lock" /> Cuenta</div>
    <p class="small">Tu progreso se guarda en este dispositivo. Con una cuenta se copia en tu servidor y es el mismo en el ordenador y en el móvil. Sin conexión sigue funcionando: los cambios se suben al volver la red.</p>
    ${aviso && html`<p class="small" style="color:var(--err)" role="alert">${aviso}</p>`}
    <form onSubmit=${(ev) => { ev.preventDefault(); enviar(false); }} style="display:grid;gap:8px">
      <label class="small" for="cuenta-email">Correo electrónico</label>
      <input id="cuenta-email" class="input" type="email" autocomplete="username" value=${email} onInput=${(ev) => setEmail(ev.target.value)} />
      <label class="small" for="cuenta-pass">Contraseña</label>
      <input id="cuenta-pass" class="input" type="password" autocomplete="current-password" value=${contrasena} onInput=${(ev) => setContrasena(ev.target.value)} />
      ${error && html`<p class="small" style="color:var(--err);margin:0" role="alert">${error}</p>`}
      <div class="row wrap" style="margin-top:4px">
        <button class="btn primary" type="submit" disabled=${enviando}>${enviando ? 'Conectando…' : 'Iniciar sesión'}</button>
        <button class="btn" type="button" disabled=${enviando} onClick=${() => enviar(true)}>Crear cuenta</button>
      </div>
    </form>
    <p class="tiny muted" style="margin-top:10px">Solo pueden crear cuenta los correos autorizados en tu servidor. La contraseña debe tener al menos 8 caracteres.</p>
  </div>`;
}
