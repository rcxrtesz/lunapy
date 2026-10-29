import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { PALETTES } from '../state/palettes.js';
import { actions } from '../state/store.js';

/** Selector de paleta (usado en el menú de la barra superior y en el Perfil). */
export function PaletteChoices({ palette }) {
  return html`<div class="swatches" role="radiogroup" aria-label="Paleta de color">
    ${PALETTES.map((p) => html`<button class=${`swatch ${palette === p.id ? 'on' : ''}`} role="radio" aria-checked=${palette === p.id}
      onClick=${() => actions.setPalette(p.id)} title=${p.name}>
      <span class="swatch-dot" style=${{ background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})` }}>
        ${palette === p.id && html`<${Icon} name="check" size=${14} stroke=${3} />`}</span>
      <span class="swatch-name">${p.name}</span>
    </button>`)}
  </div>`;
}

/** Selector de modo día / noche / sistema. */
export function ModeChoices({ theme, resolved }) {
  return html`<div>
    <div class="seg mode-seg" role="radiogroup" aria-label="Modo de color">
      ${[['light', 'sun', 'Día'], ['dark', 'moon', 'Noche'], ['system', 'eye', 'Sistema']].map(([v, ic, l]) => html`
        <button class=${theme === v ? 'on' : ''} role="radio" aria-checked=${theme === v} onClick=${() => actions.setTheme(v)}>
          <${Icon} name=${ic} size=${14} /> ${l}</button>`)}
    </div>
    ${theme === 'system' && html`<div class="tiny muted" style="margin-top:8px">Sigue el modo de tu dispositivo (ahora: ${resolved === 'dark' ? 'noche' : 'día'}).</div>`}
  </div>`;
}
