// Contenido traducido del idioma activo (o null en español). Se carga una sola vez, antes que
// el resto del contenido (await de nivel superior), y solo si la app está en inglés.
import { EN } from '../lib/i18n.js';

export const PAQUETE = EN ? await import('./en/index.js') : null;

/** Sustituye cada elemento por su traducción (si la hay) y la marca con en = true. */
export function traducir(elemento, mapa) {
  const tr = mapa && mapa[elemento.id];
  return tr ? { ...tr, en: true } : elemento;
}
