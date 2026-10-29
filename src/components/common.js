import { html, useEffect, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { inlineCode } from '../lib/highlight.js';
import { engine } from '../engine/python.js';

/** Texto de contenido con `código` y **negrita**. */
export function Rich({ text, tag = 'span', className = '' }) {
  const Tag = tag;
  return html`<${Tag} class=${className} dangerouslySetInnerHTML=${{ __html: inlineCode(text) }} />`;
}

export function Paragraphs({ text }) {
  return html`${text.split('\n\n').map((p) => html`<${Rich} tag="p" text=${p} />`)}`;
}

export function Difficulty({ level }) {
  const names = ['', 'Básico', 'Intermedio', 'Avanzado'];
  return html`<span class="tag" title=${`Dificultad: ${names[level]}`}>
    <span class="difficulty">${[1, 2, 3].map((i) => html`<i class=${i <= level ? 'on' : ''} />`)}</span>
    ${names[level]}
  </span>`;
}

export function Progress({ value, kind = '' }) {
  return html`<div class=${`progress ${kind}`} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(value)}>
    <span style=${{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>`;
}

export function Ring({ value, size = 104, stroke = 10, color = 'var(--accent)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return html`<div class="ring" style=${{ width: `${size}px`, height: `${size}px` }}>
    <svg width=${size} height=${size}>
      <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke="var(--surface-3)" stroke-width=${stroke} />
      <circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke=${color} stroke-width=${stroke}
        stroke-linecap="round" stroke-dasharray=${c} stroke-dashoffset=${c * (1 - v)}
        style=${{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1)' }} />
    </svg>
    <div class="ring-label">${children}</div>
  </div>`;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Ventana modal accesible: al abrirse enfoca su primer control, Tab no sale de ella,
 * Esc la cierra (si se puede cerrar) y al cerrarse el foco vuelve a donde estaba.
 */
export function Modal({ onClose, children, label = 'Diálogo' }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    const box = ref.current;
    const items = () => [...box.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    (items()[0] || box).focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && closeRef.current) { e.preventDefault(); closeRef.current(); return; }
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) { e.preventDefault(); return; }
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) previous.focus();
    };
  }, []);

  return html`<div class="modal-backdrop" onClick=${(e) => e.target === e.currentTarget && onClose && onClose()}>
    <div class="modal" role="dialog" aria-modal="true" aria-label=${label} ref=${ref} tabIndex="-1">${children}</div>
  </div>`;
}

// ---------- Avisos flotantes ----------
let toastId = 0;
const toastListeners = new Set();
let toasts = [];
export function toast(t) {
  const id = ++toastId;
  toasts = [...toasts, { id, ...t }];
  toastListeners.forEach((l) => l(toasts));
  setTimeout(() => {
    toasts = toasts.filter((x) => x.id !== id);
    toastListeners.forEach((l) => l(toasts));
  }, t.duration || 3800);
}
export function Toasts() {
  const [list, set] = useState(toasts);
  useEffect(() => { toastListeners.add(set); return () => toastListeners.delete(set); }, []);
  return html`<div class="toasts" aria-live="polite">
    ${list.map((t) => html`<div class="toast" key=${t.id}>
      <div class="t-icon"><${Icon} name=${t.icon || 'zap'} /></div>
      <div><strong>${t.title}</strong>${t.text && html`<span class="muted small">${t.text}</span>`}</div>
    </div>`)}
  </div>`;
}

export function useEngine() {
  const [s, set] = useState({ state: engine.state, python: engine.python, error: engine.error });
  useEffect(() => engine.subscribe((e) => set({ state: e.state, python: e.python, error: e.error })), []);
  return s;
}

export function EngineLoading() {
  const eng = useEngine();
  if (eng.state === 'ready') return null;
  if (eng.state === 'error') {
    return html`<div class="error-card"><h4><${Icon} name="alert" /> No se pudo cargar Python</h4>
      <div>Comprueba tu conexión a internet: la primera vez se descargan unos 10 MB (Pyodide). Detalle: ${eng.error}</div></div>`;
  }
  return html`<div class="loading-line"><span class="spinner" /> Preparando Python en tu navegador… (solo tarda la primera vez)</div>`;
}

export const CATEGORY = {
  sintaxis: { label: 'Error de sintaxis', tone: 'syntax', icon: 'pencil' },
  ejecucion: { label: 'Error de ejecución', tone: 'fail', icon: 'bug' },
  logica: { label: 'Error de lógica', tone: 'fail', icon: 'brain' },
  comprension: { label: 'Comprensión del enunciado', tone: 'comprension', icon: 'book' },
  planificacion: { label: 'Planificación', tone: 'planificacion', icon: 'list' },
  concepto: { label: 'Concepto por afianzar', tone: 'comprension', icon: 'brain' },
  manipulacion: { label: 'Entorno modificado', tone: 'syntax', icon: 'alert' },
  incompleto: { label: 'Incompleto', tone: 'incompleto', icon: 'pencil' },
  mejorable: { label: 'Correcto, pero mejorable', tone: 'pass', icon: 'sparkle' },
  correcto: { label: 'Correcto', tone: 'pass', icon: 'check' },
  repaso: { label: 'Repaso', tone: 'fail', icon: 'repeat' },
};
