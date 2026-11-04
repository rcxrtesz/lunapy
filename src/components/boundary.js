import { html, Component } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { actions } from '../state/store.js';
import { downloadBackup } from '../lib/backup.js';
import { t } from '../lib/i18n.js';

/**
 * Barrera de errores: si una pantalla falla al dibujarse, muestra cómo recuperarse
 * en lugar de dejar toda la aplicación congelada.
 */
export class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { error: null, confirmReset: false };
  }

  componentDidCatch(error) {
    console.error('[LunaPy] Error al dibujar la pantalla:', error);
    this.setState({ error });
  }

  render({ children, scope = t('pantalla', 'screen') }, { error, confirmReset }) {
    // Contenedor con clave distinta según el estado: al fallar, Preact desmonta por completo
    // el contenido anterior (si no, quedarían restos de la vista que se estaba dibujando).
    if (!error) return html`<div class="eb" key="ok">${children}</div>`;
    return html`<div class="eb" key="error">${this.renderCrash(scope, error, confirmReset)}</div>`;
  }

  renderCrash(scope, error, confirmReset) {
    const retry = () => this.setState({ error: null, confirmReset: false });
    const resetData = () => {
      downloadBackup(t('lunapy-copia-antes-de-restablecer', 'lunapy-backup-before-reset'));
      actions.reset();
      location.hash = '#/';
      location.reload();
    };
    return html`<div class="card crash" role="alert">
      <div class="crash-icon"><${Icon} name="alert" size=${26} /></div>
      <h2>${t(`Algo ha fallado en esta ${scope}`, `Something went wrong in this ${scope}`)}</h2>
      <p class="muted">${t('No es culpa tuya. El resto de LunaPy sigue funcionando: puedes volver al inicio o intentarlo de nuevo.', "It's not your fault. The rest of LunaPy still works: you can go back home or try again.")}</p>
      <div class="row wrap" style="justify-content:center">
        <button class="btn primary" onClick=${() => { location.hash = '#/'; retry(); }}><${Icon} name="home" size=${15} /> ${t('Volver al inicio', 'Back to home')}</button>
        <button class="btn" onClick=${retry}><${Icon} name="rotate" size=${15} /> ${t('Reintentar', 'Try again')}</button>
        <button class="btn" onClick=${() => location.reload()}>${t('Recargar la página', 'Reload the page')}</button>
      </div>
      <details class="more" style="margin-top:18px;text-align:left">
        <summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> ${t('¿Sigue fallando?', 'Still failing?')}</summary>
        <div class="more-body small">
          <p>${t('Si el problema aparece siempre, puede que los datos guardados en este navegador estén dañados (por ejemplo, tras importar una copia defectuosa). Puedes restablecerlos: antes descargaremos automáticamente una copia de lo que hay ahora.', 'If the problem keeps happening, the data saved in this browser may be damaged (for example, after importing a faulty backup). You can reset it: first we will automatically download a backup of what is there now.')}</p>
          ${confirmReset
            ? html`<div class="row wrap"><button class="btn" style="color:var(--err)" onClick=${resetData}>${t('Sí, descargar copia y restablecer', 'Yes, download a backup and reset')}</button>
                <button class="btn ghost" onClick=${() => this.setState({ confirmReset: false })}>${t('Cancelar', 'Cancel')}</button></div>`
            : html`<button class="btn" onClick=${() => this.setState({ confirmReset: true })}><${Icon} name="trash" size=${15} /> ${t('Restablecer datos dañados', 'Reset damaged data')}</button>`}
          <div class="tiny faint" style="margin-top:10px">${t('Detalle técnico', 'Technical details')}: ${String(error && error.message || error)}</div>
        </div>
      </details>
    </div>`;
  }
}
