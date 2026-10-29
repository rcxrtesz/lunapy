// Reglas de gamificación y repaso. Todo se deriva del estado real del alumno.
import { conceptStatus, streak, today, lastDays, addDays } from './store.js';
import { CONCEPTS } from '../content/curriculum.js';
import { REVIEW_ITEMS } from '../content/review.js';
import { LESSON_VARIABLES } from '../content/lesson-variables.js';
import { LESSON_ACTIVITIES } from '../content/activities.js';

export const ACHIEVEMENTS = [
  { id: 'first-run', name: 'Hola, mundo', desc: 'Ejecuta tu primer programa', icon: 'play', test: (s) => Object.values(s.daily).some((d) => (d.runs || 0) > 0 || d.labRuns > 0) },
  { id: 'first-activity', name: 'Primer paso', desc: 'Supera tu primera actividad', icon: 'flag', test: (s) => Object.values(s.activities).some((a) => a.completed) },
  { id: 'predictor', name: 'Mente de intérprete', desc: 'Acierta 3 predicciones a la primera', icon: 'eye', test: (s) => Object.values(s.checks).filter((c) => c.correct && c.prediction).length >= 3 },
  { id: 'debugger', name: 'Depuradora', desc: 'Corrige «El saludo roto»', icon: 'bug', test: (s) => s.activities['var-fix']?.completed },
  { id: 'planner', name: 'Primero pienso', desc: 'Completa una planificación antes de programar', icon: 'brain', test: (s) => Object.keys(s.plans).length > 0 },
  { id: 'no-hints', name: 'Por mí misma', desc: 'Resuelve un ejercicio de código sin pistas', icon: 'star', test: (s) => ['var-complete', 'var-fix', 'var-build', 'ch-swap', 'ch-iva'].some((id) => s.activities[id]?.noHints) },
  { id: 'lesson', name: 'Variables desbloqueadas', desc: 'Completa la lección de variables', icon: 'trophy', test: (s) => s.lessons.variables?.completed },
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

export function lessonProgress(s) {
  const l = s.lessons.variables || { maxStep: 0, step: 0 };
  const done = LESSON_ACTIVITIES.filter((id) => s.activities[id]?.completed).length;
  const theory = LESSON_VARIABLES.steps.filter((st) => !st.activity && !st.summary).length;
  const theorySeen = Math.min(theory, l.maxStep);
  return {
    pct: Math.round(((theorySeen + done * 2) / (theory + LESSON_ACTIVITIES.length * 2)) * 100),
    activitiesDone: done, activitiesTotal: LESSON_ACTIVITIES.length, completed: !!l.completed, step: l.step || 0,
  };
}

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
