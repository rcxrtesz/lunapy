// Tarjeta de cuenta del perfil: iniciar sesión, crear la cuenta y estado de la sincronización.
import { html, useEffect, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import {
  useSync, entrar, salir, sincronizar, reenviarVerificacion, recuperarContrasena, verificarCorreo, restablecerContrasena,
} from '../lib/sync.js';

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
  return html`<div class="card span-6">
    <div class="card-title"><${Icon} name="lock" /> Cuenta</div>
    <p class="small">Tu progreso se guarda en este dispositivo. Con una cuenta se copia en tu servidor y es el mismo en el ordenador y en el móvil. Sin conexión sigue funcionando: los cambios se suben al volver la red.</p>
    ${aviso && html`<p class="small" style="color:var(--err)" role="alert">${aviso}</p>`}
    <${FormularioEntrar} />
    <p class="tiny muted" style="margin-top:10px">Al crear la cuenta te enviaremos un correo para activarla. La contraseña debe tener al menos 8 caracteres.</p>
  </div>`;
}

/** Mensaje de error en rojo. */
const MensajeError = ({ texto }) => texto && html`<p class="small" style="color:var(--err);margin:0" role="alert">${texto}</p>`;

/**
 * Formulario de cuenta: iniciar sesión, crear cuenta (con correo de verificación) y
 * recuperar la contraseña. Se usa en el Perfil y en la bienvenida.
 */
export function FormularioEntrar({ alEntrar, idPrefijo = 'cuenta' }) {
  const [modo, setModo] = useState('entrar'); // entrar | recuperar | enviado | recuperado
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);
  const [sinVerificar, setSinVerificar] = useState(false);
  const [aviso, setAviso] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const ir = (m) => { setModo(m); setError(null); setAviso(null); setSinVerificar(false); };

  const enviar = async (nueva) => {
    setError(null); setAviso(null); setSinVerificar(false);
    if (!email.trim() || !contrasena) { setError('Escribe tu correo y tu contraseña.'); return; }
    setEnviando(true);
    const r = await entrar(email.trim(), contrasena, nueva);
    setEnviando(false);
    if (r.ok && r.pendiente) { setContrasena(''); ir('enviado'); return; }
    if (!r.ok) { setError(r.error); setSinVerificar(r.sinVerificar); return; }
    setContrasena('');
    if (alEntrar) alEntrar();
  };

  const reenviar = async () => {
    setEnviando(true);
    const r = await reenviarVerificacion(email.trim());
    setEnviando(false);
    if (r.ok) { setError(null); setAviso('Te hemos enviado otro correo de activación.'); } else setError(r.error);
  };

  const recuperar = async (ev) => {
    ev.preventDefault();
    setError(null);
    if (!email.trim()) { setError('Escribe tu correo.'); return; }
    setEnviando(true);
    const r = await recuperarContrasena(email.trim());
    setEnviando(false);
    if (r.ok) ir('recuperado'); else setError(r.error);
  };

  const campoEmail = html`<label class="small" for=${`${idPrefijo}-email`}>Correo electrónico</label>
    <input id=${`${idPrefijo}-email`} class="input" type="email" autocomplete="username" value=${email} onInput=${(ev) => setEmail(ev.target.value)} />`;

  if (modo === 'enviado' || modo === 'recuperado') {
    return html`<div class="cuenta-mensaje" role="status">
      <${Icon} name="send" size=${22} />
      <div>
        ${modo === 'enviado'
          ? html`<b>Revisa tu correo</b><p class="small">Te hemos enviado un enlace a <b>${email.trim()}</b> para activar tu cuenta. Si no lo ves, mira en la carpeta de spam.</p>`
          : html`<b>Revisa tu correo</b><p class="small">Si hay una cuenta con <b>${email.trim()}</b>, te llegará un enlace para elegir una contraseña nueva. Caduca en 1 hora.</p>`}
        ${aviso && html`<p class="small" style="color:var(--ok);margin:0 0 8px">${aviso}</p>`}
        <${MensajeError} texto=${error} />
        <div class="row wrap" style="margin-top:8px">
          ${modo === 'enviado' && html`<button class="btn sm" type="button" disabled=${enviando} onClick=${reenviar}>Reenviar el correo</button>`}
          <button class="btn sm" type="button" onClick=${() => ir('entrar')}>Volver</button>
        </div>
      </div>
    </div>`;
  }

  if (modo === 'recuperar') {
    return html`<form onSubmit=${recuperar} style="display:grid;gap:8px">
      <p class="small" style="margin:0">Escribe el correo de tu cuenta y te enviaremos un enlace para elegir una contraseña nueva.</p>
      ${campoEmail}
      <${MensajeError} texto=${error} />
      <div class="row wrap" style="margin-top:4px">
        <button class="btn primary" type="submit" disabled=${enviando}>${enviando ? 'Enviando…' : 'Enviar enlace'}</button>
        <button class="btn" type="button" onClick=${() => ir('entrar')}>Volver</button>
      </div>
    </form>`;
  }

  return html`<form onSubmit=${(ev) => { ev.preventDefault(); enviar(false); }} style="display:grid;gap:8px">
      ${campoEmail}
      <label class="small" for=${`${idPrefijo}-pass`}>Contraseña</label>
      <input id=${`${idPrefijo}-pass`} class="input" type="password" autocomplete="current-password" value=${contrasena} onInput=${(ev) => setContrasena(ev.target.value)} />
      <${MensajeError} texto=${error} />
      ${aviso && html`<p class="small" style="color:var(--ok);margin:0">${aviso}</p>`}
      ${sinVerificar && html`<button class="btn sm" type="button" disabled=${enviando} onClick=${reenviar} style="justify-self:start">Reenviar el correo de activación</button>`}
      <div class="row wrap" style="margin-top:4px">
        <button class="btn primary" type="submit" disabled=${enviando}>${enviando ? 'Conectando…' : 'Iniciar sesión'}</button>
        <button class="btn" type="button" disabled=${enviando} onClick=${() => enviar(true)}>Crear cuenta</button>
      </div>
      <button class="enlace-btn" type="button" onClick=${() => ir('recuperar')}>¿Has olvidado tu contraseña?</button>
    </form>`;
}

/**
 * Pantalla de los enlaces de los correos: #/verificar?t=… (activar la cuenta) y
 * #/restablecer?t=… (elegir una contraseña nueva). alTerminar() vuelve a la app.
 */
export function PantallaEnlace({ tipo, token, alTerminar }) {
  const [estado, setEstado] = useState(tipo === 'verificar' ? 'cargando' : 'formulario'); // cargando | formulario | ok | error
  const [error, setError] = useState(null);
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (tipo !== 'verificar') return;
    verificarCorreo(token).then((r) => { if (r.ok) setEstado('ok'); else { setError(r.error); setEstado('error'); } });
  }, []);

  const cambiar = async (ev) => {
    ev.preventDefault();
    setError(null);
    if (c1.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (c1 !== c2) { setError('Las dos contraseñas no coinciden.'); return; }
    setEnviando(true);
    const r = await restablecerContrasena(token, c1);
    setEnviando(false);
    if (r.ok) setEstado('ok'); else setError(r.error);
  };

  let cuerpo;
  if (estado === 'cargando') cuerpo = html`<p class="muted"><span class="spinner" style="display:inline-block;vertical-align:middle" /> Activando tu cuenta…</p>`;
  else if (estado === 'ok') {
    cuerpo = html`<p class="muted">${tipo === 'verificar'
      ? '¡Tu cuenta ya está activa! Te hemos enviado un correo de bienvenida. Tu progreso se guardará en tu cuenta.'
      : 'Contraseña cambiada. Ya has iniciado sesión en este dispositivo.'}</p>
      <button class="btn primary lg" style="width:100%;justify-content:center" onClick=${alTerminar}>Empezar <${Icon} name="arrowRight" size=${16} /></button>`;
  } else if (estado === 'error') {
    cuerpo = html`<p class="small" style="color:var(--err)" role="alert">${error}</p>
      <button class="btn" onClick=${alTerminar}>Volver al inicio</button>`;
  } else {
    cuerpo = html`<form onSubmit=${cambiar} style="display:grid;gap:8px;text-align:left">
      <label class="small" for="nueva-1">Contraseña nueva</label>
      <input id="nueva-1" class="input" type="password" autocomplete="new-password" value=${c1} onInput=${(ev) => setC1(ev.target.value)} />
      <label class="small" for="nueva-2">Repite la contraseña</label>
      <input id="nueva-2" class="input" type="password" autocomplete="new-password" value=${c2} onInput=${(ev) => setC2(ev.target.value)} />
      <${MensajeError} texto=${error} />
      <button class="btn primary" type="submit" disabled=${enviando} style="margin-top:4px">${enviando ? 'Guardando…' : 'Guardar contraseña'}</button>
      <button class="enlace-btn" type="button" onClick=${alTerminar}>Cancelar</button>
    </form>`;
  }

  return html`<div class="bienvenida" role="dialog" aria-modal="true" aria-labelledby="enlace-titulo">
    <div class="bienvenida-tarjeta">
      <img class="bienvenida-kuromi" src="./img/kuromi_luna.png" alt="" width="120" height="119" />
      <h1 id="enlace-titulo">${tipo === 'verificar' ? 'Activar tu cuenta' : 'Elige una contraseña nueva'}</h1>
      ${cuerpo}
    </div>
  </div>`;
}
