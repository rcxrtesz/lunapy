import { html } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { PALETTES } from '../state/palettes.js';
import { actions, getState } from '../state/store.js';
import { t, IDIOMAS, LANG } from '../lib/i18n.js';

/** Selector de paleta (usado en el menú de la barra superior y en el Perfil). */
export function PaletteChoices({ palette }) {
  return html`<div class="swatches" role="radiogroup" aria-label=${t('Paleta de color', 'Colour palette')}>
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
    <div class="seg mode-seg" role="radiogroup" aria-label=${t('Modo de color', 'Colour mode')}>
      ${[['light', 'sun', t('Día', 'Light')], ['dark', 'moon', t('Noche', 'Dark')], ['system', 'eye', t('Sistema', 'System')]].map(([v, ic, l]) => html`
        <button class=${theme === v ? 'on' : ''} role="radio" aria-checked=${theme === v} onClick=${() => actions.setTheme(v)}>
          <${Icon} name=${ic} size=${14} /> ${l}</button>`)}
    </div>
    ${theme === 'system' && html`<div class="tiny muted" style="margin-top:8px">${t('Sigue el modo de tu dispositivo', 'Follows your device')} (${t('ahora', 'now')}: ${resolved === 'dark' ? t('noche', 'dark') : t('día', 'light')}).</div>`}
  </div>`;
}

/** Selector de idioma (Perfil y bienvenida). Cambiarlo recarga la app. */
export function SelectorIdioma({ compacto = false }) {
  const actual = getState().lang || LANG;
  return html`<div class=${`idioma-sel ${compacto ? 'compacto' : ''}`}>
    <div class="seg" role="radiogroup" aria-label=${t('Idioma', 'Language')}>
      ${IDIOMAS.map((i) => html`<button class=${actual === i.id ? 'on' : ''} role="radio" aria-checked=${actual === i.id}
        lang=${i.id} onClick=${() => actual !== i.id && actions.setLang(i.id)}>${i.nombre}</button>`)}
    </div>
  </div>`;
}
