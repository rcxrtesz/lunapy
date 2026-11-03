// Asistente de LunaPy: conversaciones con Claude a través de la API (api/asistente.php).
//
// · Las conversaciones se guardan solo en este dispositivo (localStorage), no se sincronizan.
// · Cada pregunta puede llevar el contexto de la pantalla: la lección o desafío, el último
//   código ejecutado y su error. Así se puede preguntar «¿por qué falla?» sin copiar nada.
// · La respuesta llega por partes y se va mostrando mientras se escribe.
import { useEffect, useState } from './ui.js';
import { urlApi, tokenSesion } from './sync.js';
import { LESSONS } from '../content/lessons.js';
import { ACTIVITIES } from '../content/activities.js';

const CLAVE = 'lunapy.asistente';
const MAX_CONVERSACIONES = 30;
const MAX_HISTORIAL = 40; // mensajes que se envían como contexto de la conversación

const leer = () => { try { return JSON.parse(localStorage.getItem(CLAVE)); } catch { return null; } };
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch { /* sin almacenamiento */ } };

let datos = leer() || { conversaciones: [], activa: null }; // conversación: { id, titulo, mensajes: [{ role, content }], actualizada }
let estado = { abierto: false, enviando: false, error: null, restantes: null, disponible: null, borrador: '' };
let ultimaEjecucion = null; // { ruta, codigo, error }
let peticion = null; // AbortController de la respuesta en curso
const oyentes = new Set();

function avisar() {
  const instantanea = { datos, estado };
  oyentes.forEach((f) => f(instantanea));
}

function fijar(patch) {
  estado = { ...estado, ...patch };
  avisar();
}

export function useAsistente() {
  const [s, set] = useState({ datos, estado });
  useEffect(() => { oyentes.add(set); return () => oyentes.delete(set); }, []);
  return s;
}

export const conversacionActiva = () => datos.conversaciones.find((c) => c.id === datos.activa) || null;

// ---------- Panel ----------

/** Abre el panel flotante. Con una pregunta, la envía en una conversación nueva. */
export function abrirAsistente(pregunta) {
  fijar({ abierto: true });
  if (pregunta && !estado.enviando) {
    nuevaConversacion();
    preguntar(pregunta);
  }
}

export const cerrarAsistente = () => fijar({ abierto: false });
export const fijarBorrador = (borrador) => { estado = { ...estado, borrador }; };

// ---------- Conversaciones ----------

export function nuevaConversacion() {
  if (estado.enviando) return;
  const vacia = conversacionActiva();
  if (vacia && !vacia.mensajes.length) return; // ya hay una nueva sin empezar
  datos = { ...datos, activa: null };
  guardar();
  fijar({ error: null });
}

export function elegirConversacion(id) {
  if (estado.enviando) return;
  datos = { ...datos, activa: id };
  guardar();
  fijar({ error: null });
}

export function borrarConversacion(id) {
  if (estado.enviando && id === datos.activa) return;
  datos = { conversaciones: datos.conversaciones.filter((c) => c.id !== id), activa: datos.activa === id ? null : datos.activa };
  guardar();
  avisar();
}

function actualizarActiva(fn) {
  datos = {
    ...datos,
    conversaciones: datos.conversaciones.map((c) => (c.id === datos.activa ? { ...fn(c), actualizada: Date.now() } : c)),
  };
}

// ---------- Contexto de la pantalla ----------

/** La consola llama a esto en cada ejecución: así el asistente sabe qué código y error hay. */
export function registrarEjecucion(codigo, error) {
  ultimaEjecucion = { ruta: location.hash, codigo, error: error ? textoError(error) : '' };
}

function textoError(e) {
  return [e.line && `Línea ${e.line}${e.code_line ? `: ${e.code_line.trim()}` : ''}`, e.original || e.title, e.explanation && `Explicación de LunaPy: ${e.explanation}`]
    .filter(Boolean).join('\n');
}

/** Contexto de lo que hay ahora en pantalla (o null si no hay nada útil). */
export function contextoActual() {
  const [vista, id] = location.hash.replace(/^#\/?/, '').split('/');
  let leccion = '';
  if (vista === 'leccion' && LESSONS[id]) leccion = `${LESSONS[id].title}`;
  else if (vista === 'desafios' && ACTIVITIES[id]) leccion = `Desafío «${ACTIVITIES[id].title}»`;
  else if (vista === 'lab') leccion = 'Laboratorio (programación libre)';
  const ejec = ultimaEjecucion && ultimaEjecucion.ruta === location.hash ? ultimaEjecucion : null;
  if (!leccion && !ejec) return null;
  return { leccion, codigo: ejec?.codigo || '', error: ejec?.error || '' };
}

// ---------- Preguntar ----------

/** Consulta si el asistente está disponible y cuántas preguntas quedan hoy. */
export async function consultarAsistente() {
  if (!tokenSesion()) return;
  try {
    const res = await fetch(urlApi('asistente'), { headers: { 'X-LunaPy-Token': tokenSesion() }, cache: 'no-store' });
    if (res.ok) {
      const d = await res.json();
      fijar({ disponible: d.disponible, restantes: d.restantes });
    }
  } catch { /* sin conexión: se vuelve a intentar al preguntar */ }
}

export function cancelarRespuesta() {
  if (peticion) peticion.abort();
}

/** Envía una pregunta en la conversación activa (o en una nueva) y va mostrando la respuesta. */
export async function preguntar(texto, { conContexto = true } = {}) {
  texto = texto.trim();
  if (!texto || estado.enviando) return;
  if (!conversacionActiva()) {
    const nueva = { id: `c${Date.now().toString(36)}`, titulo: texto.slice(0, 60), mensajes: [], actualizada: Date.now() };
    datos = { activa: nueva.id, conversaciones: [nueva, ...datos.conversaciones].slice(0, MAX_CONVERSACIONES) };
  }
  actualizarActiva((c) => ({ ...c, mensajes: [...c.mensajes, { role: 'user', content: texto }, { role: 'assistant', content: '' }] }));
  fijar({ enviando: true, error: null, borrador: '' });

  const historial = conversacionActiva().mensajes.slice(0, -1).slice(-MAX_HISTORIAL);
  const contexto = conContexto ? contextoActual() : null;
  peticion = new AbortController();
  let respuesta = '';
  let error = null;
  try {
    const res = await fetch(urlApi('asistente'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-LunaPy-Token': tokenSesion() || '' },
      body: JSON.stringify({ mensajes: historial, contexto }),
      signal: peticion.signal,
      cache: 'no-store',
    });
    if (!(res.headers.get('Content-Type') || '').startsWith('text/event-stream')) {
      let d = {};
      try { d = await res.json(); } catch { /* respuesta sin JSON */ }
      throw new Error(d.error || `Error ${res.status} del servidor.`);
    }
    await leerEventos(res.body, (ev) => {
      if (ev.texto) {
        respuesta += ev.texto;
        actualizarActiva((c) => ({ ...c, mensajes: [...c.mensajes.slice(0, -1), { role: 'assistant', content: respuesta }] }));
        avisar();
      } else if (ev.error) {
        error = ev.error;
      } else if (ev.fin) {
        estado = { ...estado, restantes: ev.restantes };
        if (ev.motivo === 'max_tokens') respuesta += '\n\n*(La respuesta era muy larga y se ha cortado. Pídeme que continúe.)*';
      }
    });
  } catch (e) {
    error = e.name === 'AbortError' ? null : e instanceof TypeError ? 'No se ha podido contactar con el servidor. Comprueba la conexión.' : e.message;
  }
  peticion = null;

  if (respuesta) {
    if (error) respuesta += '\n\n*(Respuesta incompleta.)*';
    actualizarActiva((c) => ({ ...c, mensajes: [...c.mensajes.slice(0, -1), { role: 'assistant', content: respuesta }] }));
  } else {
    // Sin respuesta: se quita la pregunta (para poder reenviarla) y se devuelve al cuadro de texto.
    actualizarActiva((c) => ({ ...c, mensajes: c.mensajes.slice(0, -2) }));
    if (!conversacionActiva().mensajes.length) borrarSinAvisar(datos.activa);
    estado = { ...estado, borrador: texto };
  }
  guardar();
  fijar({ enviando: false, error });
}

function borrarSinAvisar(id) {
  datos = { ...datos, conversaciones: datos.conversaciones.filter((c) => c.id !== id), activa: null };
}

/** Lee una respuesta text/event-stream y llama a alEvento con cada `data: {…}`. */
async function leerEventos(cuerpo, alEvento) {
  const lector = cuerpo.getReader();
  const decodificador = new TextDecoder();
  let resto = '';
  for (;;) {
    const { value, done } = await lector.read();
    if (done) break;
    resto += decodificador.decode(value, { stream: true });
    const bloques = resto.split('\n\n');
    resto = bloques.pop();
    for (const bloque of bloques) {
      for (const linea of bloque.split('\n')) {
        if (linea.startsWith('data: ')) {
          try { alEvento(JSON.parse(linea.slice(6))); } catch { /* evento no válido */ }
        }
      }
    }
  }
}
