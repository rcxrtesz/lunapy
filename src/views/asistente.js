import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Chat } from '../components/asistente.js';
import { useAsistente, nuevaConversacion, elegirConversacion, borrarConversacion } from '../lib/asistente.js';

const fecha = (t) => new Date(t).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

/** Pantalla del asistente: lista de conversaciones a un lado y el chat al otro. */
export function AsistenteView() {
  const { datos, estado } = useAsistente();
  const convs = datos.conversaciones.filter((c) => c.mensajes.length);
  return html`<div class="asis-vista">
    <div class="page-head" style="margin:14px 0 18px">
      <h1 style="margin:0">Asistente</h1>
      <p class="muted" style="margin:4px 0 0">Pregunta tus dudas de Python. Te explica el porqué y te guía con pistas.</p>
    </div>
    <div class="asis-vista-grid">
      <aside class="card flat asis-historial" aria-label="Conversaciones">
        <button class="btn primary sm" style="width:100%" onClick=${nuevaConversacion} disabled=${estado.enviando}>
          <${Icon} name="plus" size=${15} /> Conversación nueva</button>
        ${!convs.length && html`<p class="tiny muted" style="margin:12px 4px 0">Aquí aparecerán tus conversaciones. Se guardan solo en este dispositivo.</p>`}
        <ul>${convs.map((c) => html`<li key=${c.id} class=${c.id === datos.activa ? 'on' : ''}>
          <button class="asis-conv" onClick=${() => elegirConversacion(c.id)} disabled=${estado.enviando} aria-current=${c.id === datos.activa ? 'true' : undefined}>
            <span class="asis-conv-titulo">${c.titulo}</span><span class="tiny muted">${fecha(c.actualizada)}</span></button>
          <button class="icon-btn asis-borrar" onClick=${() => confirm('¿Borrar esta conversación?') && borrarConversacion(c.id)}
            aria-label=${`Borrar «${c.titulo}»`} title="Borrar"><${Icon} name="trash" size=${14} /></button>
        </li>`)}</ul>
      </aside>
      <section class="card asis-principal"><${Chat} /></section>
    </div>
  </div>`;
}
