import { html, Component } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { actions } from '../state/store.js';
import { downloadBackup } from '../lib/backup.js';

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

  render({ children, scope = 'pantalla' }, { error, confirmReset }) {
    // Contenedor con clave distinta según el estado: al fallar, Preact desmonta por completo
    // el contenido anterior (si no, quedarían restos de la vista que se estaba dibujando).
    if (!error) return html`<div class="eb" key="ok">${children}</div>`;
    return html`<div class="eb" key="error">${this.renderCrash(scope, error, confirmReset)}</div>`;
  }

  renderCrash(scope, error, confirmReset) {
    const retry = () => this.setState({ error: null, confirmReset: false });
    const resetData = () => {
      downloadBackup('lunapy-copia-antes-de-restablecer');
      actions.reset();
      location.hash = '#/';
      location.reload();
    };
    return html`<div class="card crash" role="alert">
      <div class="crash-icon"><${Icon} name="alert" size=${26} /></div>
      <h2>Algo ha fallado en esta ${scope}</h2>
      <p class="muted">No es culpa tuya. El resto de LunaPy sigue funcionando: puedes volver al inicio o intentarlo de nuevo.</p>
      <div class="row wrap" style="justify-content:center">
        <button class="btn primary" onClick=${() => { location.hash = '#/'; retry(); }}><${Icon} name="home" size=${15} /> Volver al inicio</button>
        <button class="btn" onClick=${retry}><${Icon} name="rotate" size=${15} /> Reintentar</button>
        <button class="btn" onClick=${() => location.reload()}>Recargar la página</button>
      </div>
      <details class="more" style="margin-top:18px;text-align:left">
        <summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> ¿Sigue fallando?</summary>
        <div class="more-body small">
          <p>Si el problema aparece siempre, puede que los datos guardados en este navegador estén dañados (por ejemplo, tras importar una copia defectuosa).
            Puedes restablecerlos: antes descargaremos automáticamente una copia de lo que hay ahora.</p>
          ${confirmReset
            ? html`<div class="row wrap"><button class="btn" style="color:var(--err)" onClick=${resetData}>Sí, descargar copia y restablecer</button>
                <button class="btn ghost" onClick=${() => this.setState({ confirmReset: false })}>Cancelar</button></div>`
            : html`<button class="btn" onClick=${() => this.setState({ confirmReset: true })}><${Icon} name="trash" size=${15} /> Restablecer datos dañados</button>`}
          <div class="tiny faint" style="margin-top:10px">Detalle técnico: ${String(error && error.message || error)}</div>
        </div>
      </details>
    </div>`;
  }
}
