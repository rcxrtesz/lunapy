import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Chat } from '../components/asistente.js';
import { useAsistente, nuevaConversacion, elegirConversacion, borrarConversacion } from '../lib/asistente.js';
import { t, LOCALE } from '../lib/i18n.js';

const fecha = (ms) => new Date(ms).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' });

/** Pantalla del asistente: lista de conversaciones a un lado y el chat al otro. */
export function AsistenteView() {
  const { datos, estado } = useAsistente();
  const convs = datos.conversaciones.filter((c) => c.mensajes.length);
  return html`<div class="asis-vista">
    <div class="page-head asis-vista-cabecera">
      <img class="asis-vista-kuromi" src="./img/kuromi_motera.png" alt="" width="62" height="89" />
      <div>
        <h1 style="margin:0">Lunakiri</h1>
        <p class="muted" style="margin:4px 0 0">${t('Tu asistente de Python. Pregúntale tus dudas: te explica el porqué y te guía con pistas.', 'Your Python assistant. Ask her your questions: she explains the why and guides you with hints.')}</p>
      </div>
    </div>
    <div class="asis-vista-grid">
      <aside class="card flat asis-historial" aria-label=${t('Conversaciones', 'Conversations')}>
        <button class="btn primary sm" style="width:100%" onClick=${nuevaConversacion} disabled=${estado.enviando}>
          <${Icon} name="plus" size=${15} /> ${t('Conversación nueva', 'New conversation')}</button>
        ${!convs.length && html`<p class="tiny muted" style="margin:12px 4px 0">${t('Aquí aparecerán tus conversaciones. Se guardan solo en este dispositivo.', 'Your conversations will appear here. They are only saved on this device.')}</p>`}
        <ul>${convs.map((c) => html`<li key=${c.id} class=${c.id === datos.activa ? 'on' : ''}>
          <button class="asis-conv" onClick=${() => elegirConversacion(c.id)} disabled=${estado.enviando} aria-current=${c.id === datos.activa ? 'true' : undefined}>
            <span class="asis-conv-titulo">${c.titulo}</span><span class="tiny muted">${fecha(c.actualizada)}</span></button>
          <button class="icon-btn asis-borrar" onClick=${() => confirm(t('¿Borrar esta conversación?', 'Delete this conversation?')) && borrarConversacion(c.id)}
            aria-label=${`${t('Borrar', 'Delete')} «${c.titulo}»`} title=${t('Borrar', 'Delete')}><${Icon} name="trash" size=${14} /></button>
        </li>`)}</ul>
      </aside>
      <section class="card asis-principal"><${Chat} /></section>
    </div>
  </div>`;
}
