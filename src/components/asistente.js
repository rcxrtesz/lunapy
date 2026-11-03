import { html, useEffect, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { inlineCode } from '../lib/highlight.js';
import { CodeView } from './code.js';
import { toast } from './common.js';
import { useSync } from '../lib/sync.js';
import { usePWA } from '../lib/pwa.js';
import {
  useAsistente, conversacionActiva, preguntar, cancelarRespuesta, nuevaConversacion, cerrarAsistente,
  contextoActual, consultarAsistente, fijarBorrador, abrirAsistente,
} from '../lib/asistente.js';

// ---------- Texto de las respuestas (Markdown sencillo) ----------

/** Divide la respuesta en bloques: párrafos, listas y código. */
function bloques(texto) {
  const out = [];
  const lineas = texto.split('\n');
  for (let i = 0; i < lineas.length; i++) {
    const ln = lineas[i];
    const valla = ln.match(/^\s*```(\w*)/);
    if (valla) {
      const codigo = [];
      while (++i < lineas.length && !/^\s*```\s*$/.test(lineas[i])) codigo.push(lineas[i]);
      out.push({ tipo: 'codigo', texto: codigo.join('\n') });
    } else if (/^\s*([-*•]|\d+[.)])\s+/.test(ln)) {
      const ordenada = /^\s*\d/.test(ln);
      const items = [];
      while (i < lineas.length && /^\s*([-*•]|\d+[.)])\s+/.test(lineas[i])) items.push(lineas[i++].replace(/^\s*([-*•]|\d+[.)])\s+/, ''));
      i--;
      out.push({ tipo: ordenada ? 'ol' : 'ul', items });
    } else if (ln.trim()) {
      const ultimo = out[out.length - 1];
      const limpio = ln.replace(/^#+\s*(.*)$/, '**$1**');
      if (ultimo && ultimo.tipo === 'p' && !ultimo.cerrado) ultimo.texto += `\n${limpio}`;
      else out.push({ tipo: 'p', texto: limpio });
    } else if (out.length) {
      out[out.length - 1].cerrado = true;
    }
  }
  return out;
}

const enLinea = (t) => inlineCode(t).replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>').replace(/\n/g, '<br>');

function BloqueCodigo({ texto }) {
  const copiar = async () => {
    try { await navigator.clipboard.writeText(texto); toast({ icon: 'check', title: 'Código copiado' }); } catch { /* sin portapapeles */ }
  };
  return html`<div class="code-block asis-code">
    <div class="code-block-head"><${Icon} name="code" size=${13} /> Python<span class="spacer" />
      <button class="btn sm" onClick=${copiar}>Copiar</button></div>
    <${CodeView} code=${texto} />
  </div>`;
}

export function Respuesta({ texto }) {
  return html`<div class="asis-texto">${bloques(texto).map((b) => {
    if (b.tipo === 'codigo') return html`<${BloqueCodigo} texto=${b.texto} />`;
    if (b.tipo === 'p') return html`<p dangerouslySetInnerHTML=${{ __html: enLinea(b.texto) }} />`;
    const Lista = b.tipo;
    return html`<${Lista}>${b.items.map((it) => html`<li dangerouslySetInnerHTML=${{ __html: enLinea(it) }} />`)}</${Lista}>`;
  })}</div>`;
}

// ---------- Chat ----------

const SUGERENCIAS = [
  'Explícame los bucles con un ejemplo de motos 🏍️',
  '¿Qué diferencia hay entre una lista y una tupla?',
  '¿Cuándo uso for y cuándo while?',
  'Explícame qué hace return con un ejemplo',
];

/** Carita de Lunakiri (Kuromi con casco y luna) que acompaña sus mensajes. */
export function AvatarLunakiri({ grande }) {
  return html`<img class=${`asis-avatar-img ${grande ? 'lg' : ''}`} src="./img/kuromi_luna.png" alt="" width="64" height="63" />`;
}

function Aviso({ icono, children }) {
  return html`<div class="asis-aviso"><${Icon} name=${icono} size=${22} /><div>${children}</div></div>`;
}

/** La conversación activa con su cuadro de texto. Se usa en el panel flotante y en la pantalla Asistente. */
export function Chat() {
  const { estado } = useAsistente();
  const sync = useSync();
  const pwa = usePWA();
  const conv = conversacionActiva();
  const [texto, setTexto] = useState(estado.borrador);
  const [conContexto, setConContexto] = useState(true);
  const lista = useRef(null);
  const entrada = useRef(null);
  const contexto = contextoActual();

  useEffect(() => { if (sync.status !== 'off') consultarAsistente(); }, [sync.status]);
  useEffect(() => { if (estado.borrador) setTexto(estado.borrador); }, [estado.borrador]);
  useEffect(() => { if (lista.current) lista.current.scrollTop = lista.current.scrollHeight; }, [conv?.mensajes]);
  useEffect(() => { if (entrada.current && matchMedia('(pointer: fine)').matches) entrada.current.focus({ preventScroll: true }); }, [conv?.id]);
  useEffect(() => {
    const t = entrada.current;
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = `${Math.min(t.scrollHeight + 3, 160)}px`; // + borde
    t.style.overflowY = t.scrollHeight > 160 ? 'auto' : 'hidden';
  }, [texto]);

  if (sync.status === 'off') {
    return html`<${Aviso} icono="lock">
      <b>Inicia sesión para hablar con Lunakiri.</b>
      <p class="small muted">Lunakiri funciona a través de tu servidor de LunaPy. Entra con tu cuenta en el Perfil.</p>
      <a class="btn sm primary" href="#/perfil" onClick=${cerrarAsistente}>Ir al Perfil</a>
    </${Aviso}>`;
  }
  if (estado.disponible === false) {
    return html`<${Aviso} icono="info">
      <b>El asistente no está activado en el servidor.</b>
      <p class="small muted">Falta la clave de Anthropic en <code>api/config.php</code>.</p>
    </${Aviso}>`;
  }

  const enviar = (e) => {
    e && e.preventDefault();
    if (!texto.trim() || estado.enviando) return;
    preguntar(texto, { conContexto });
    setTexto('');
  };
  const teclas = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) enviar(e);
  };
  const cambiar = (e) => { setTexto(e.target.value); fijarBorrador(e.target.value); };
  const mensajes = conv ? conv.mensajes : [];

  return html`<div class="asis-chat">
    <div class="asis-mensajes" ref=${lista} aria-live="polite">
      ${!mensajes.length && html`<div class="asis-bienvenida">
        <img class="asis-motera" src="./img/kuromi_motera.png" alt="Lunakiri" width="120" height="173" />
        <b>¡Hola! Soy Lunakiri. ¿En qué te ayudo?</b>
        <p class="small muted">Pregúntame cualquier duda de Python: conceptos, errores, ejercicios… Te explico el porqué y te doy pistas sin destriparte las soluciones.</p>
        <div class="asis-sugerencias">${SUGERENCIAS.map((s) => html`<button class="btn sm" onClick=${() => preguntar(s, { conContexto })} disabled=${estado.enviando || !pwa.online}>${s}</button>`)}</div>
      </div>`}
      ${mensajes.map((m, i) => (m.role === 'user'
        ? html`<div class="asis-msg yo" key=${i}>${m.content}</div>`
        : html`<div class="asis-msg ella" key=${i}>
            <${AvatarLunakiri} />
            ${m.content ? html`<${Respuesta} texto=${m.content} />` : html`<div class="asis-pensando" aria-label="Pensando"><span /><span /><span /></div>`}
          </div>`))}
      ${estado.error && html`<div class="asis-error" role="alert"><${Icon} name="alert" size=${16} /> ${estado.error}</div>`}
    </div>
    <form class="asis-entrada" onSubmit=${enviar}>
      ${contexto && html`<label class="asis-contexto" title="Envía al asistente la lección, tu último código y su error para que entienda tu pregunta">
        <input type="checkbox" checked=${conContexto} onChange=${(e) => setConContexto(e.target.checked)} />
        <span>Incluir lo que tengo en pantalla: <b>${contexto.leccion || 'mi código'}</b>${contexto.codigo ? ' · código' : ''}${contexto.error ? ' · error' : ''}</span>
      </label>`}
      <div class="asis-caja">
        <textarea ref=${entrada} class="asis-texto-entrada" rows="1" value=${texto} onInput=${cambiar} onKeyDown=${teclas}
          placeholder=${pwa.online ? 'Escribe tu duda…' : 'Sin conexión: el asistente necesita internet'} disabled=${!pwa.online} maxlength="8000" aria-label="Tu pregunta" />
        ${estado.enviando
          ? html`<button type="button" class="icon-btn asis-enviar" onClick=${cancelarRespuesta} aria-label="Detener la respuesta" title="Detener"><${Icon} name="x" size=${17} /></button>`
          : html`<button type="submit" class="icon-btn asis-enviar primary" disabled=${!texto.trim() || !pwa.online} aria-label="Enviar" title="Enviar (Intro)"><${Icon} name="send" size=${17} /></button>`}
      </div>
      <div class="tiny muted asis-pie">
        <span>Intro para enviar · Mayús+Intro, nueva línea</span>
        ${estado.restantes != null && html`<span>${estado.restantes} preguntas más hoy</span>`}
      </div>
    </form>
  </div>`;
}

// ---------- Botón flotante y panel ----------

let saludado = false; // Lunakiri saluda una vez cada vez que se abre la app

export function AsistenteFlotante({ oculto, saludar }) {
  const { estado } = useAsistente();
  const [saludo, setSaludo] = useState(false);
  useEffect(() => {
    if (saludado || oculto || !saludar || estado.abierto) return undefined;
    saludado = true;
    setSaludo(true);
    const t = setTimeout(() => setSaludo(false), 3000);
    return () => clearTimeout(t);
  }, [oculto, saludar]);
  useEffect(() => {
    if (!estado.abierto) return undefined;
    const esc = (e) => e.key === 'Escape' && cerrarAsistente();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [estado.abierto]);
  if (oculto) return null;

  if (!estado.abierto) {
    return html`<div class="asis-fab-wrap">
      ${saludo && html`<div class="asis-saludo" role="status">¡Hola! Soy <b>Lunakiri</b> 🌙<br />¿Te ayudo con Python?</div>`}
      <button class="asis-fab" onClick=${() => { setSaludo(false); abrirAsistente(); }}
        aria-label="Abrir a Lunakiri, la asistente" title="Pregunta tus dudas a Lunakiri">
        <img src="./img/kuromi_vespa.png" alt="" width="79" height="102" draggable="false" /></button>
    </div>`;
  }
  return html`<section class="asis-panel" role="dialog" aria-label="Lunakiri, la asistente">
    <header class="asis-cabecera">
      <${AvatarLunakiri} />
      <b>Lunakiri</b>
      <span class="spacer" />
      <button class="icon-btn" onClick=${nuevaConversacion} disabled=${estado.enviando} aria-label="Conversación nueva" title="Conversación nueva"><${Icon} name="plus" size=${16} /></button>
      <a class="icon-btn" href="#/asistente" onClick=${cerrarAsistente} aria-label="Abrir en pantalla completa" title="Ver todas las conversaciones"><${Icon} name="expand" size=${16} /></a>
      <button class="icon-btn" onClick=${cerrarAsistente} aria-label="Cerrar el asistente" title="Cerrar"><${Icon} name="x" size=${16} /></button>
    </header>
    <${Chat} />
  </section>`;
}
