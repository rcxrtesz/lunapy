import { t } from '../lib/i18n.js';

// Paletas de color. Cada una tiene variante de día (light) y de noche (dark).
// styles.css contiene los valores; aquí solo lo que necesita el selector.
export const PALETTES = [
  { id: 'kuromi', name: 'Kuromi', swatch: ['#2b2433', '#b98ce8'] },
  { id: 'indigo', name: t('Índigo', 'Indigo'), swatch: ['#4f5dff', '#8a5cf6'] },
  { id: 'ocean', name: t('Océano', 'Ocean'), swatch: ['#0e7fc0', '#0f8a9a'] },
  { id: 'emerald', name: t('Esmeralda', 'Emerald'), swatch: ['#0f9a6e', '#157f8f'] },
  { id: 'violet', name: t('Violeta', 'Violet'), swatch: ['#7c3aed', '#c056d6'] },
  { id: 'rose', name: t('Frambuesa', 'Raspberry'), swatch: ['#e11d63', '#f97362'] },
  { id: 'sunset', name: t('Atardecer', 'Sunset'), swatch: ['#ea6a0c', '#f43f5e'] },
  { id: 'graphite', name: t('Grafito', 'Graphite'), swatch: ['#334155', '#64748b'] },
];

export const DEFAULT_PALETTE = 'kuromi';
