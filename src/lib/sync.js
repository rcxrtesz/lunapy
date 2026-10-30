// Cuenta y sincronización del progreso con la API de LunaPy (api/index.php).
//
// El progreso sigue viviendo en este dispositivo (funciona sin conexión). Con una sesión
// iniciada, los cambios se suben al servidor y se traen los de otros dispositivos:
//  · al abrir la app, al recuperar la conexión y al volver a la pestaña;
//  · unos segundos después de cada cambio, y cada pocos minutos.
// Si dos dispositivos han cambiado cosas, el servidor responde 409 y se fusionan (merge.js).
import { useEffect, useState } from './ui.js';
import { getState, replaceState, subscribe } from '../state/store.js';
import { merge } from '../state/merge.js';

const CUENTA = 'lunapy.cuenta';    // { email, token, revision, ultima }
const BASE = 'lunapy.cuenta.base'; // último estado sincronizado: el antepasado común al fusionar
const PAUSA = 8000;                // calma tras un cambio antes de subirlo (ms)
const PERIODO = 5 * 60 * 1000;     // comprobación periódica (ms)

const leer = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
const escribir = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };

let cuenta = leer(CUENTA);
let estado = { status: cuenta ? 'idle' : 'off', email: cuenta?.email || null, ultima: cuenta?.ultima || null, error: null };
let pendiente = false; // hay cambios locales sin subir (al arrancar se deduce comparando con la base)
let forzar = !!cuenta?.forzar; // la próxima subida sustituye lo del servidor (tras reiniciar o importar)
let aplicando = false; // el cambio de estado lo provoca la propia sincronización
let enCurso = null;
let temporizador = null;
const oyentes = new Set();

function fijar(patch) {
  estado = { ...estado, ...patch };
  oyentes.forEach((f) => f(estado));
}

export function useSync() {
  const [s, set] = useState(estado);
  useEffect(() => { oyentes.add(set); return () => oyentes.delete(set); }, []);
  return s;
}

function guardarCuenta() {
  escribir(CUENTA, cuenta);
}

// ---------- Llamadas a la API ----------

function url(ruta) {
  // En desarrollo se puede apuntar a otra API: localStorage['lunapy.api'] = 'http://…/api/index.php'
  let base = 'api/index.php';
  try { base = localStorage.getItem('lunapy.api') || base; } catch { /* sin almacenamiento */ }
  return new URL(`${base}/${ruta}`, location.href).href;
}

async function api(metodo, ruta, cuerpo) {
  const headers = { Accept: 'application/json' };
  if (cuerpo) headers['Content-Type'] = 'application/json';
  if (cuenta?.token) headers['X-LunaPy-Token'] = cuenta.token;
  const res = await fetch(url(ruta), { method: metodo, headers, body: cuerpo ? JSON.stringify(cuerpo) : undefined, cache: 'no-store' });
  let datos = {};
  try { datos = await res.json(); } catch { /* respuesta sin JSON */ }
  return { status: res.status, datos };
}

const mensajeRed = 'No se ha podido contactar con el servidor. Tu progreso sigue guardado en este dispositivo.';

// ---------- Sesión ----------

/** Inicia sesión (o crea la cuenta si nueva = true). Devuelve { ok, error }. */
export async function entrar(email, contrasena, nueva = false) {
  try {
    const { status, datos } = await api('POST', nueva ? 'registro' : 'sesion', { email, contrasena });
    if (status !== 200 && status !== 201) return { ok: false, error: datos.error || `Error ${status}` };
    cuenta = { email: datos.email, token: datos.token, revision: 0, ultima: null };
    guardarCuenta();
    escribir(BASE, null);
    pendiente = true;
    fijar({ status: 'idle', email: cuenta.email, ultima: null, error: null });
    await sincronizar();
    return { ok: true };
  } catch {
    return { ok: false, error: mensajeRed };
  }
}

/** Cierra la sesión en este dispositivo. El progreso local se conserva. */
export async function salir() {
  const token = cuenta?.token;
  cerrarLocal();
  if (token) {
    try { await fetch(url('sesion'), { method: 'DELETE', headers: { 'X-LunaPy-Token': token } }); } catch { /* sin conexión: caducará sola */ }
  }
}

function cerrarLocal(error = null) {
  cuenta = null;
  pendiente = false;
  forzar = false;
  escribir(CUENTA, null);
  escribir(BASE, null);
  fijar({ status: 'off', email: null, ultima: null, error });
}

/** Tras reiniciar o importar una copia: la próxima subida sustituye el progreso del servidor. */
export function forzarSubida() {
  if (!cuenta) return;
  forzar = true;
  cuenta.forzar = true; // se guarda: si la app se cierra antes de subir, se recuerda
  guardarCuenta();
  pendiente = true;
  programar(1000);
}

// ---------- Sincronización ----------

function aplicar(datos) {
  aplicando = true;
  try { replaceState(datos); } finally { aplicando = false; }
}

function sesionCaducada(status) {
  if (status !== 401) return false;
  cerrarLocal('La sesión ha caducado. Vuelve a iniciar sesión para seguir sincronizando.');
  return true;
}

async function subir() {
  for (let intento = 0; intento < 3; intento++) {
    const local = getState();
    pendiente = false;
    const { status, datos } = await api('PUT', 'estado', { revision_base: cuenta.revision, datos: local });
    if (sesionCaducada(status)) return;
    if (status === 200) {
      cuenta.revision = datos.revision;
      escribir(BASE, local);
      return;
    }
    if (status === 409) {
      // Otro dispositivo guardó antes: se fusiona (o se sustituye, si se pidió) y se reintenta.
      if (!forzar && datos.datos) aplicar(merge(getState(), datos.datos, leer(BASE)));
      cuenta.revision = datos.revision;
      continue;
    }
    pendiente = true;
    throw new Error(datos.error || `Error ${status}`);
  }
  pendiente = true;
  throw new Error('No se ha podido guardar: hay demasiados cambios a la vez. Se volverá a intentar.');
}

async function bajar() {
  const { status, datos } = await api('GET', `estado?desde=${cuenta.revision}`);
  if (sesionCaducada(status)) return;
  if (status !== 200) throw new Error(datos.error || `Error ${status}`);
  if (datos.datos && datos.revision !== cuenta.revision) {
    aplicar(merge(getState(), datos.datos, leer(BASE)));
    cuenta.revision = datos.revision;
    escribir(BASE, getState());
  }
}

/** Sincroniza ahora. Si ya hay una sincronización en marcha, devuelve esa. */
export function sincronizar() {
  if (!cuenta) return Promise.resolve();
  if (enCurso) return enCurso;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    fijar({ status: 'offline' });
    return Promise.resolve();
  }
  clearTimeout(temporizador);
  enCurso = (async () => {
    fijar({ status: 'syncing', error: null });
    try {
      if (pendiente || forzar || cuenta.revision === 0) await subir();
      else await bajar();
      if (!cuenta) return; // la sesión caducó durante la sincronización
      forzar = false;
      delete cuenta.forzar;
      cuenta.ultima = Date.now();
      guardarCuenta();
      fijar({ status: 'ok', ultima: cuenta.ultima, error: null });
    } catch (e) {
      if (!cuenta) return;
      guardarCuenta();
      const sinRed = e instanceof TypeError; // fetch falla sin conexión
      fijar({ status: sinRed ? 'offline' : 'error', error: sinRed ? null : e.message });
    } finally {
      enCurso = null;
      if (cuenta && pendiente) programar();
    }
  })();
  return enCurso;
}

function programar(espera = PAUSA) {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => { sincronizar(); }, espera);
}

let iniciada = false;

/** Pone en marcha la sincronización automática (se llama una vez al arrancar la app). */
export function initSync() {
  if (iniciada) return;
  iniciada = true;
  subscribe(() => {
    if (aplicando || !cuenta) return;
    pendiente = true;
    programar();
  });
  window.addEventListener('online', () => sincronizar());
  window.addEventListener('offline', () => cuenta && fijar({ status: 'offline' }));
  document.addEventListener('visibilitychange', () => {
    // Al ocultar la app se sube lo pendiente; al volver, se traen los cambios de otros dispositivos.
    if (document.visibilityState === 'hidden' ? pendiente : true) sincronizar();
  });
  setInterval(() => sincronizar(), PERIODO);
  if (cuenta) {
    // ¿Hubo cambios después de la última sincronización (por ejemplo, sin conexión) que no llegaron a subirse?
    const base = leer(BASE);
    pendiente = !base || (getState().updatedAt || 0) > (base.updatedAt || 0);
    sincronizar();
  }
}
