// Registro de lecciones disponibles, en el orden del curso.
import { LESSONS_M1 } from './module1.js';
import { LESSON_VARIABLES } from './lesson-variables.js';
import { LESSON_EXPRESIONES } from './lesson-expresiones.js';
import { LESSON_ENTRADA } from './lesson-entrada.js';
import { LESSON_LLAMAR_FUNCIONES } from './lesson-llamar-funciones.js';
import { LESSON_DEFINIR_FUNCIONES } from './lesson-definir-funciones.js';
import { LESSON_PARAMETROS } from './lesson-parametros.js';

const ALL = [...LESSONS_M1, LESSON_VARIABLES, LESSON_EXPRESIONES, LESSON_ENTRADA, LESSON_LLAMAR_FUNCIONES, LESSON_DEFINIR_FUNCIONES, LESSON_PARAMETROS];

export const LESSONS = Object.fromEntries(ALL.map((l) => [l.id, l]));
export const LESSON_ORDER = ALL.map((l) => l.id);

/** Identificadores de las actividades de una lección, en orden. */
export const lessonActivities = (lesson) => lesson.steps.filter((st) => st.activity).map((st) => st.activity);
