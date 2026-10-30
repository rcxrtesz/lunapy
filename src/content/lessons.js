// Registro de lecciones disponibles, en el orden del curso.
import { LESSONS_M1 } from './module1.js';
import { LESSON_VARIABLES } from './lesson-variables.js';
import { LESSON_EXPRESIONES } from './lesson-expresiones.js';
import { LESSON_ENTRADA } from './lesson-entrada.js';
import { LESSON_LLAMAR_FUNCIONES } from './lesson-llamar-funciones.js';
import { LESSON_DEFINIR_FUNCIONES } from './lesson-definir-funciones.js';
import { LESSON_PARAMETROS } from './lesson-parametros.js';
import { LESSON_ENCAPSULAR } from './lesson-encapsular.js';
import { LESSON_INTERFACES } from './lesson-interfaces.js';
import { LESSON_REFACTORIZAR } from './lesson-refactorizar.js';
import { LESSON_BOOLEANAS } from './lesson-booleanas.js';
import { LESSON_CONDICIONALES } from './lesson-condicionales.js';
import { LESSON_RECURSION } from './lesson-recursion.js';
import { LESSON_RETORNO } from './lesson-retorno.js';
import { LESSON_INCREMENTAL } from './lesson-incremental.js';
import { LESSON_COMPOSICION } from './lesson-composicion.js';
import { LESSON_FOR } from './lesson-for.js';
import { LESSON_WHILE } from './lesson-while.js';
import { LESSON_BUSQUEDA } from './lesson-busqueda.js';
import { LESSON_INDICES } from './lesson-indices.js';
import { LESSON_METODOS } from './lesson-metodos.js';
import { LESSON_REGEX } from './lesson-regex.js';
import { LESSON_LISTAS } from './lesson-listas.js';
import { LESSON_RECORRER_LISTAS } from './lesson-recorrer-listas.js';
import { LESSON_ALIAS } from './lesson-alias.js';

const ALL = [...LESSONS_M1, LESSON_VARIABLES, LESSON_EXPRESIONES, LESSON_ENTRADA, LESSON_LLAMAR_FUNCIONES, LESSON_DEFINIR_FUNCIONES, LESSON_PARAMETROS,
  LESSON_ENCAPSULAR, LESSON_INTERFACES, LESSON_REFACTORIZAR,
  LESSON_BOOLEANAS, LESSON_CONDICIONALES, LESSON_RECURSION,
  LESSON_RETORNO, LESSON_INCREMENTAL, LESSON_COMPOSICION,
  LESSON_FOR, LESSON_WHILE, LESSON_BUSQUEDA,
  LESSON_INDICES, LESSON_METODOS, LESSON_REGEX,
  LESSON_LISTAS, LESSON_RECORRER_LISTAS, LESSON_ALIAS];

export const LESSONS = Object.fromEntries(ALL.map((l) => [l.id, l]));
export const LESSON_ORDER = ALL.map((l) => l.id);

/** Identificadores de las actividades de una lección, en orden. */
export const lessonActivities = (lesson) => lesson.steps.filter((st) => st.activity).map((st) => st.activity);
