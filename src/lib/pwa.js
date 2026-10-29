// Aplicación instalable (PWA): registro del service worker, actualizaciones,
// instalación y estado de la conexión.
//
// En desarrollo local (localhost) el service worker está desactivado para que los
// cambios en el código se vean al recargar. Para probar el modo sin conexión en local:
//   localStorage.setItem('lunapy.sw', '1')   y recargar   (quitarlo con removeItem)
import { useEffect, useState } from './ui.js';

const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]'];
const isLocal = LOCAL_HOSTS.includes(location.hostname);
const forced = (() => { try { return localStorage.getItem('lunapy.sw') === '1'; } catch { return false; } })();

export const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

let state = {
  supported: 'serviceWorker' in navigator,
  enabled: false, // service worker activo para esta página
  offlineReady: false, // la app ya está guardada en el dispositivo
  updateReady: false, // hay una versión nueva esperando
  canInstall: false, // el navegador ofrece instalar (Chrome, Edge, Android)
  installed: matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
  online: navigator.onLine,
  devMode: isLocal && !forced,
};
let registration = null;
let installEvent = null;
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l(state)); };

export function usePWA() {
  const [s, setS] = useState(state);
  useEffect(() => { listeners.add(setS); return () => listeners.delete(setS); }, []);
  return s;
}

export function initPWA() {
  addEventListener('online', () => set({ online: true }));
  addEventListener('offline', () => set({ online: false }));
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; set({ canInstall: true }); });
  addEventListener('appinstalled', () => { installEvent = null; set({ canInstall: false, installed: true }); });

  if (!state.supported || state.devMode) return;
  // Solo se recarga al cambiar de versión. En la primera instalación el service worker también
  // toma el control (clients.claim), pero no hay nada nuevo que cargar.
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    location.reload();
  });
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    registration = reg;
    set({ enabled: true });
    const track = (worker) => worker && worker.addEventListener('statechange', () => {
      if (worker.state === 'installed') set(navigator.serviceWorker.controller ? { updateReady: true } : { offlineReady: true });
    });
    if (reg.waiting && navigator.serviceWorker.controller) set({ updateReady: true });
    track(reg.installing);
    reg.addEventListener('updatefound', () => track(reg.installing));
    navigator.serviceWorker.ready.then(() => set({ offlineReady: true }));
    setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000); // busca versiones nuevas cada hora
  }).catch((e) => console.warn('[LunaPy] No se pudo activar el modo sin conexión:', e));
}

/** Aplica la versión nueva (el service worker en espera toma el control y la página se recarga). */
export function applyUpdate() {
  if (registration && registration.waiting) registration.waiting.postMessage('SKIP_WAITING');
}

/** Abre el diálogo de instalación del navegador. Devuelve true si se ha instalado. */
export async function promptInstall() {
  if (!installEvent) return false;
  installEvent.prompt();
  const { outcome } = await installEvent.userChoice;
  installEvent = null;
  set({ canInstall: false });
  return outcome === 'accepted';
}
