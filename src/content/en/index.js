// Contenido del curso en inglés. Solo se carga con la app en inglés (lib/i18n.js).
//
// Cada archivo de esta carpeta es la traducción de su homólogo en src/content/ y exporta
// los mismos nombres. Las lecciones, actividades y preguntas de repaso CONSERVAN sus ids,
// conceptos, XP y estructura: así el progreso es el mismo en los dos idiomas. Lo que no
// esté traducido aquí se muestra en español.
//
// Para añadir una traducción: crear en/<archivo>.js e incluirlo en PAQUETES.

import * as curriculo from './curriculum.js';
import * as m1 from './module1.js';
import * as m2Actividades from './activities.js';
import * as variables from './lesson-variables.js';
import * as expresiones from './lesson-expresiones.js';
import * as entrada from './lesson-entrada.js';
import * as llamarFunciones from './lesson-llamar-funciones.js';
import * as definirFunciones from './lesson-definir-funciones.js';
import * as parametros from './lesson-parametros.js';

const PAQUETES = [curriculo, m1, m2Actividades, variables, expresiones, entrada,
  llamarFunciones, definirFunciones, parametros];

const recoger = (sufijo) => PAQUETES.flatMap((p) => Object.entries(p)
  .filter(([nombre]) => nombre.startsWith(sufijo))
  .map(([, valor]) => valor));

/** id → lección traducida */
export const LESSONS_EN = Object.fromEntries(recoger('LESSON')
  .flatMap((v) => (Array.isArray(v) ? v : [v]))
  .map((l) => [l.id, l]));

/** id → actividad traducida */
export const ACTIVITIES_EN = Object.assign({}, ...recoger('ACTIVITIES'));

/** id → pregunta de repaso traducida */
export const REVIEW_EN = Object.fromEntries(recoger('REVIEW').flat().map((r) => [r.id, r]));

/** id → módulo traducido (título, capítulos, objetivos, títulos de sus lecciones) */
export const MODULES_EN = Object.fromEntries(recoger('MODULE').flat().map((m) => [m.id, m]));
