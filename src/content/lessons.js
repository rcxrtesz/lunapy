// Registro de lecciones disponibles, en el orden del curso.
import { LESSONS_M1 } from './module1.js';
import { LESSON_VARIABLES } from './lesson-variables.js';

const ALL = [...LESSONS_M1, LESSON_VARIABLES];

export const LESSONS = Object.fromEntries(ALL.map((l) => [l.id, l]));
export const LESSON_ORDER = ALL.map((l) => l.id);

/** Identificadores de las actividades de una lección, en orden. */
export const lessonActivities = (lesson) => lesson.steps.filter((st) => st.activity).map((st) => st.activity);
