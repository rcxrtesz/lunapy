// Idioma de la interfaz: español (es) o inglés (en).
// Se decide UNA vez al cargar la app (el cambio de idioma recarga la página), así que los
// textos pueden escribirse en cualquier sitio, incluso en constantes de módulo:
//     t('Inicio', 'Home')
// Orden de preferencia: el idioma guardado en el estado (Perfil) → el del navegador
// (español si empieza por «es»; cualquier otro, inglés).
// Las lecciones, desafíos y repaso siguen en español por ahora.

export const IDIOMAS = [
  { id: 'es', nombre: 'Español' },
  { id: 'en', nombre: 'English' },
];

export function idiomaNavegador() {
  try {
    const l = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    return l.toLowerCase().startsWith('es') ? 'es' : 'en';
  } catch {
    return 'es';
  }
}

function detectar() {
  try {
    const s = JSON.parse(localStorage.getItem('lunapy.v1') || 'null');
    if (s && (s.lang === 'es' || s.lang === 'en')) return s.lang;
  } catch { /* sin almacenamiento */ }
  return idiomaNavegador();
}

export const LANG = detectar();
export const EN = LANG === 'en';
/** Locale para fechas y números. */
export const LOCALE = EN ? 'en-GB' : 'es-ES';

/** Texto en el idioma activo: t('Hola', 'Hello'). */
export const t = (es, en) => (EN ? en : es);

/** Plural sencillo: plural(3, 'lección', 'lecciones', 'lesson', 'lessons') → '3 lessons'. */
export function plural(n, esUno, esVarios, enUno, enVarios) {
  return `${n} ${n === 1 ? t(esUno, enUno) : t(esVarios, enVarios)}`;
}

try { document.documentElement.lang = LANG; } catch { /* sin DOM (tests) */ }
