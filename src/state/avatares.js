import { t } from '../lib/i18n.js';

// Avatares del perfil: personajes en versión motera (imágenes en img/avatares/, generadas por
// tools/kuromi_assets.py a partir de assets-src/avatares/).
export const AVATARES = [
  { id: 'kuromi', nombre: 'Kuromi' },
  { id: 'mymelody', nombre: 'My Melody' },
  { id: 'hellokitty', nombre: 'Hello Kitty' },
  { id: 'cinnamoroll', nombre: 'Cinnamoroll' },
  { id: 'keroppi', nombre: 'Keroppi' },
  { id: 'badtz_maru', nombre: 'Badtz-Maru' },
];

export const AVATAR_PREDETERMINADO = 'kuromi';
export const AVATAR_IDS = AVATARES.map((a) => a.id);

/** Ruta de la imagen del avatar (si el id no existe, el predeterminado). */
export function imagenAvatar(id) {
  return `./img/avatares/${AVATAR_IDS.includes(id) ? id : AVATAR_PREDETERMINADO}.png`;
}

export const GENEROS = [
  ['', t('Sin indicar', 'Not specified')],
  ['mujer', t('Mujer', 'Woman')],
  ['hombre', t('Hombre', 'Man')],
  ['no-binario', t('No binario', 'Non-binary')],
  ['otro', t('Otro', 'Other')],
  ['prefiero-no-decirlo', t('Prefiero no decirlo', 'Prefer not to say')],
];
export const MAX_DESCRIPCION = 160;
