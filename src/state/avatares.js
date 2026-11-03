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
  ['', 'Sin indicar'],
  ['mujer', 'Mujer'],
  ['hombre', 'Hombre'],
  ['no-binario', 'No binario'],
  ['otro', 'Otro'],
  ['prefiero-no-decirlo', 'Prefiero no decirlo'],
];
export const MAX_DESCRIPCION = 160;
