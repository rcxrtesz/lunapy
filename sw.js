// Service worker de LunaPy: guarda la app en el dispositivo para que funcione sin conexión.
//
// - Al instalarse, descarga todos los archivos de sw-assets.js (lista generada por tools/build_sw.py).
// - Después responde desde esa copia local, con o sin conexión.
// - Cuando hay una versión nueva, la descarga en segundo plano y espera a que la persona
//   pulse «Actualizar» (mensaje SKIP_WAITING) para no recargar en mitad de un ejercicio.

importScripts('./sw-assets.js');

const CACHE = `lunapy-${self.LUNAPY_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // cache: 'reload' evita copiar versiones antiguas guardadas por el navegador.
    await cache.addAll(self.LUNAPY_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('lunapy-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.includes('/api/')) return; // la API siempre va a la red, nunca a la caché

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      // Cualquier navegación dentro de la app abre index.html (las rutas van tras «#»).
      return (await cache.match('./')) || fetch(request);
    }
    const hit = await cache.match(request, { ignoreSearch: true });
    if (hit) return hit;
    try {
      return await fetch(request);
    } catch {
      return new Response('Sin conexión y sin copia local de este archivo.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
