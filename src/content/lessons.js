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

const ALL = [...LESSONS_M1, LESSON_VARIABLES, LESSON_EXPRESIONES, LESSON_ENTRADA, LESSON_LLAMAR_FUNCIONES, LESSON_DEFINIR_FUNCIONES, LESSON_PARAMETROS,
  LESSON_ENCAPSULAR, LESSON_INTERFACES, LESSON_REFACTORIZAR,
  LESSON_BOOLEANAS, LESSON_CONDICIONALES, LESSON_RECURSION];

export const LESSONS = Object.fromEntries(ALL.map((l) => [l.id, l]));
export const LESSON_ORDER = ALL.map((l) => l.id);

/** Identificadores de las actividades de una lección, en orden. */
export const lessonActivities = (lesson) => lesson.steps.filter((st) => st.activity).map((st) => st.activity);
