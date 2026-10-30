// Reglas de gamificación y repaso. Todo se deriva del estado real del alumno.
import { conceptStatus, streak, today, lastDays, addDays } from './store.js';
import { CONCEPTS } from '../content/curriculum.js';
import { REVIEW_ITEMS } from '../content/review.js';
import { LESSONS, LESSON_ORDER, lessonActivities } from '../content/lessons.js';
import { ACTIVITIES } from '../content/activities.js';

const CODE_ACTIVITIES = Object.values(ACTIVITIES).filter((a) => a.type === 'code').map((a) => a.id);
const M1_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm1');
const M2_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm2');
const M3_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm3');
const M4_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm4');
const M5_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm5');
const M6_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm6');
const M7_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm7');
const M8_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm8');
const M9_LESSONS = LESSON_ORDER.filter((id) => LESSONS[id].moduleId === 'm9');

export const ACHIEVEMENTS = [
  { id: 'first-run', name: 'Hola, mundo', desc: 'Ejecuta tu primer programa', icon: 'play', test: (s) => Object.values(s.daily).some((d) => (d.runs || 0) > 0 || d.labRuns > 0) },
  { id: 'first-activity', name: 'Primer paso', desc: 'Supera tu primera actividad', icon: 'flag', test: (s) => Object.values(s.activities).some((a) => a.completed) },
  { id: 'predictor', name: 'Mente de intérprete', desc: 'Acierta 3 predicciones a la primera', icon: 'eye', test: (s) => Object.values(s.checks).filter((c) => c.correct && c.prediction).length >= 3 },
  { id: 'debugger', name: 'Depuradora', desc: 'Corrige tu primer programa con errores', icon: 'bug', test: (s) => ['m1p-fix', 'var-fix'].some((id) => s.activities[id]?.completed) },
  { id: 'planner', name: 'Primero pienso', desc: 'Completa una planificación antes de programar', icon: 'brain', test: (s) => Object.keys(s.plans).length > 0 },
  { id: 'no-hints', name: 'Por mí misma', desc: 'Resuelve un ejercicio de código sin pistas', icon: 'star', test: (s) => CODE_ACTIVITIES.some((id) => s.activities[id]?.noHints) },
  { id: 'lesson', name: 'Primera lección', desc: 'Completa tu primera lección', icon: 'trophy', test: (s) => LESSON_ORDER.some((id) => s.lessons[id]?.completed) },
  { id: 'module-1', name: 'Pensamiento computacional', desc: 'Completa el Módulo 1', icon: 'brain', test: (s) => M1_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-2', name: 'Dueña de los datos', desc: 'Completa las lecciones del Módulo 2', icon: 'layers', test: (s) => M2_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-3', name: 'Arquitecta de funciones', desc: 'Completa las lecciones del Módulo 3', icon: 'puzzle', test: (s) => M3_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-4', name: 'Código con estilo', desc: 'Completa las lecciones del Módulo 4', icon: 'pencil', test: (s) => M4_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-5', name: 'Toma de decisiones', desc: 'Completa las lecciones del Módulo 5', icon: 'flag', test: (s) => M5_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-6', name: 'Pieza a pieza', desc: 'Completa las lecciones del Módulo 6', icon: 'layers', test: (s) => M6_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-7', name: 'Una y otra vez', desc: 'Completa las lecciones del Módulo 7', icon: 'repeat', test: (s) => M7_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-8', name: 'Tejedora de textos', desc: 'Completa las lecciones del Módulo 8', icon: 'pencil', test: (s) => M8_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'module-9', name: 'Todo en su lista', desc: 'Completa las lecciones del Módulo 9', icon: 'list', test: (s) => M9_LESSONS.every((id) => s.lessons[id]?.completed) },
  { id: 'streak-3', name: 'Constancia', desc: 'Mantén una racha de 3 días', icon: 'flame', test: (s) => streak(s).days >= 3 },
  { id: 'reviewer', name: 'Memoria a largo plazo', desc: 'Completa una sesión de repaso', icon: 'repeat', test: (s) => Object.values(s.daily).some((d) => (d.reviewSessions || 0) > 0) },
];

export function newAchievements(s) {
  return ACHIEVEMENTS.filter((a) => !s.achievements[a.id] && a.test(s));
}

export function dailyMissions(s) {
  const t = s.daily[today()] || { xp: 0, activities: 0, labRuns: 0, reviews: 0 };
  return [
    { id: 'goal', text: `Consigue ${s.profile.dailyGoal} XP`, progress: Math.min(t.xp, s.profile.dailyGoal), total: s.profile.dailyGoal, icon: 'zap' },
    { id: 'activity', text: 'Supera 2 actividades distintas', progress: Math.min((t.activityIds || []).length, 2), total: 2, icon: 'target' },
    { id: 'lab', text: 'Experimenta en el laboratorio', progress: Math.min(t.labRuns, 1), total: 1, icon: 'code' },
  ];
}

export function weekly(s) {
  const days = lastDays(7, s);
  return { activeDays: days.filter((d) => d.xp > 0).length, xp: days.reduce((a, d) => a + d.xp, 0), goalDays: 4, goalXp: 150 };
}

export function conceptList(s) {
  const t = today();
  return Object.entries(CONCEPTS).map(([id, meta]) => {
    const c = s.concepts[id];
    return { id, ...meta, rec: c, status: conceptStatus(c, t), box: c?.box || 0 };
  });
}

/** Repasos: conceptos practicados cuyo próximo repaso es hoy o antes, o que acumulan errores. */
export function dueReviews(s) {
  return conceptList(s).filter((c) => c.status === 'repaso');
}

export function upcomingReviews(s) {
  const t = today();
  return conceptList(s)
    .filter((c) => c.rec && c.rec.attempts && c.rec.next)
    .map((c) => ({ ...c, inDays: Math.max(0, Math.round((new Date(c.rec.next) - new Date(t)) / 86400000)) }))
    .sort((a, b) => a.inDays - b.inDays);
}

/** Selección de preguntas: primero conceptos que tocan repaso, después los más débiles. Máx. 5. */
export function buildReviewSession(s, max = 5) {
  const list = conceptList(s).filter((c) => c.rec && (c.rec.attempts || c.rec.seen));
  const score = (c) => (c.status === 'repaso' ? 0 : 10) + c.box * 2 - Math.min(5, c.rec.wrong || 0);
  list.sort((a, b) => score(a) - score(b));
  const pick = [];
  for (const c of list) {
    REVIEW_ITEMS.filter((i) => i.concept === c.id).forEach((i) => { if (pick.length < max && !pick.includes(i)) pick.push(i); });
    if (pick.length >= max) break;
  }
  return pick.slice(0, max);
}

/**
 * Lección en la que está el alumno: la última que ha abierto y no ha terminado;
 * si no ha empezado ninguna, la primera pendiente del curso.
 */
export function currentLessonId(s) {
  const pending = LESSON_ORDER.filter((id) => !s.lessons[id]?.completed);
  if (!pending.length) return LESSON_ORDER[LESSON_ORDER.length - 1];
  const touched = pending.filter((id) => s.lessons[id]?.lastAt).sort((a, b) => s.lessons[b].lastAt - s.lessons[a].lastAt);
  return touched[0] || pending[0];
}

/** Progreso de una lección: teoría recorrida (1 punto por paso) y actividades superadas (2 puntos cada una). */
export function lessonProgress(s, lessonId = currentLessonId(s)) {
  const lesson = LESSONS[lessonId];
  const acts = lessonActivities(lesson);
  const l = s.lessons[lessonId] || { maxStep: 0, step: 0 };
  const done = acts.filter((id) => s.activities[id]?.completed).length;
  const isTheory = (st) => !st.activity && !st.summary;
  const theory = lesson.steps.filter(isTheory).length;
  const theorySeen = lesson.steps.slice(0, l.maxStep || 0).filter(isTheory).length;
  const pct = l.completed ? 100 : Math.round(((theorySeen + done * 2) / (theory + acts.length * 2)) * 100);
  return {
    lessonId, lesson, pct, activitiesDone: done, activitiesTotal: acts.length,
    completed: !!l.completed, started: (l.maxStep || 0) > 0 || done > 0, step: l.step || 0,
  };
}

/** Todas las lecciones terminadas. */
export const courseCompleted = (s) => LESSON_ORDER.every((id) => s.lessons[id]?.completed);

export function weakPoints(s) {
  return conceptList(s)
    .filter((c) => c.rec && (c.status === 'repaso' || (c.rec.wrong || 0) >= 2))
    .map((c) => ({ ...c, topErrors: Object.entries(c.rec.errors || {}).sort((a, b) => b[1] - a[1]).slice(0, 3) }))
    .sort((a, b) => (b.rec.wrong || 0) - (a.rec.wrong || 0));
}

/** Los retos se desbloquean por dominio demostrado (actividades superadas), no por clics. */
export function isUnlocked(activity, s) {
  const u = activity.unlock;
  if (!u) return true;
  if (u.activity) return !!s.activities[u.activity]?.completed;
  if (u.any) return u.any.filter((id) => s.activities[id]?.completed).length >= u.count;
  if (u.lesson) return (s.lessons[u.lesson]?.maxStep || 0) >= u.step;
  return true;
}

export { addDays };
