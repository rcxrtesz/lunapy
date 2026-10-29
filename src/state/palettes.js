// Paletas de color. Cada una tiene variante de día (light) y de noche (dark).
// styles.css contiene los valores; aquí solo lo que necesita el selector.
export const PALETTES = [
  { id: 'indigo', name: 'Índigo', swatch: ['#4f5dff', '#8a5cf6'] },
  { id: 'ocean', name: 'Océano', swatch: ['#0e7fc0', '#0f8a9a'] },
  { id: 'emerald', name: 'Esmeralda', swatch: ['#0f9a6e', '#157f8f'] },
  { id: 'violet', name: 'Violeta', swatch: ['#7c3aed', '#c056d6'] },
  { id: 'rose', name: 'Frambuesa', swatch: ['#e11d63', '#f97362'] },
  { id: 'sunset', name: 'Atardecer', swatch: ['#ea6a0c', '#f43f5e'] },
  { id: 'graphite', name: 'Grafito', swatch: ['#334155', '#64748b'] },
];

export const DEFAULT_PALETTE = 'indigo';
