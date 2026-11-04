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
import * as encapsular from './lesson-encapsular.js';
import * as interfaces from './lesson-interfaces.js';
import * as refactorizar from './lesson-refactorizar.js';
import * as booleanas from './lesson-booleanas.js';
import * as condicionales from './lesson-condicionales.js';
import * as recursion from './lesson-recursion.js';
import * as retorno from './lesson-retorno.js';
import * as incremental from './lesson-incremental.js';
import * as composicion from './lesson-composicion.js';
import * as bucleFor from './lesson-for.js';
import * as bucleWhile from './lesson-while.js';
import * as busqueda from './lesson-busqueda.js';
import * as indices from './lesson-indices.js';
import * as metodos from './lesson-metodos.js';
import * as regex from './lesson-regex.js';
import * as listas from './lesson-listas.js';
import * as recorrerListas from './lesson-recorrer-listas.js';
import * as alias from './lesson-alias.js';
import * as diccionarios from './lesson-diccionarios.js';
import * as tuplas from './lesson-tuplas.js';
import * as proyectoTexto from './lesson-proyecto-texto.js';
import * as archivos from './lesson-archivos.js';
import * as procesar from './lesson-procesar.js';
import * as excepciones from './lesson-excepciones.js';
import * as clases from './lesson-clases.js';
import * as metodosClase from './lesson-metodos-clase.js';
import * as herencia from './lesson-herencia.js';
import * as depuracion from './lesson-depuracion.js';
import * as estilo from './lesson-estilo.js';
import * as proyectoFinal from './lesson-proyecto-final.js';
import * as repaso from './review.js';
import * as motos from './desafios-motos.js';

const PAQUETES = [curriculo, m1, m2Actividades, variables, expresiones, entrada,
  llamarFunciones, definirFunciones, parametros,
  encapsular, interfaces, refactorizar,
  booleanas, condicionales, recursion,
  retorno, incremental, composicion,
  bucleFor, bucleWhile, busqueda,
  indices, metodos, regex,
  listas, recorrerListas, alias,
  diccionarios, tuplas, proyectoTexto,
  archivos, procesar, excepciones,
  clases, metodosClase, herencia,
  depuracion, estilo, proyectoFinal,
  repaso, motos];

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
