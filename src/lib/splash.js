// Pantalla de carga (está en index.html para verse antes de que cargue el JavaScript).
// Cuando la app está lista, Kuromi se va en moto hacia la derecha y la pantalla desaparece.
import { useEffect, useState } from './ui.js';

const MINIMO = 1600; // ms en pantalla como mínimo, para que se vea la animación
const SALIDA = 1100; // ms que dura la salida en moto

let fuera = !document.getElementById('splash');
const oyentes = new Set();

/** true cuando la pantalla de carga ya se ha ido. */
export function useSplashFuera() {
  const [f, set] = useState(fuera);
  useEffect(() => {
    if (fuera) { set(true); return undefined; }
    oyentes.add(set);
    return () => oyentes.delete(set);
  }, []);
  return f;
}

/** Se llama cuando la app ya se ha pintado. */
export function ocultarSplash() {
  const el = document.getElementById('splash');
  if (!el) return;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const espera = Math.max(0, MINIMO - performance.now());
  setTimeout(() => {
    el.classList.add('salir');
    setTimeout(() => {
      el.remove();
      fuera = true;
      oyentes.forEach((f) => f(true));
    }, reducido ? 300 : SALIDA);
  }, espera);
}
