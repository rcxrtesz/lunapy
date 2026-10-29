// Estado del alumno, persistido en localStorage.
// Todo lo que se muestra como estadística sale de aquí: no hay datos inventados.
import { useEffect, useState } from '../lib/ui.js';
import { PALETTES } from './palettes.js';

const KEY = 'lunapy.v1';
const LEGACY_KEYS = ['pyensa.v1']; // nombre anterior del proyecto: se migra el progreso
const DAY = 86400000;

// Repetición espaciada (sistema Leitner): caja → días hasta el siguiente repaso.
export const INTERVALS = [0, 1, 2, 4, 8, 16];
export const LEVELS = [0, 60, 150, 280, 450, 680, 980, 1350, 1800];

const fresh = () => ({
  version: 1,
  createdAt: Date.now(),
  profile: { name: '', dailyGoal: 30, onboarded: false },
  theme: 'system', // 'light' | 'dark' | 'system'
  palette: 'indigo',
  dayOffset: 0, // herramienta de demo: simular el paso de los días
  xp: 0,
  daily: {}, // 'AAAA-MM-DD' → { xp, seconds, activities, labRuns, reviews }
  activities: {}, // id → { attempts, fails, completed, hintsMax, solutionViewed, xpEarned, firstTry, completedAt }
  concepts: {}, // id → { seen, attempts, good, wrong, box, next, lastPromoted, history[], errors{} }
  lessons: {}, // id → { step, maxStep, completed, completedAt }
  checks: {}, // preguntas intercaladas respondidas: id → { correct, at }
  errors: {}, // categoría → nº
  log: [], // { t, day, kind, label, xp, category }
  achievements: {}, // id → fecha de obtención
  drafts: {}, // código guardado por actividad
  plans: {}, // planificación hecha antes de programar
  lab: null,
});

// ---------- Validación de la estructura ----------
// Se aplica al importar una copia (si algo no es válido, se rechaza) y al cargar
// (los campos dañados se sustituyen por sus valores iniciales).
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isCount = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0;
const optCount = (v) => v === undefined || isCount(v);
const PALETTE_IDS = PALETTES.map((p) => p.id);

const FIELDS = {
  version: { label: 'versión', ok: (v) => v === 1 },
  createdAt: { label: 'fecha de inicio', ok: isCount },
  profile: { label: 'perfil', ok: (v) => isObj(v) && typeof v.name === 'string' && v.name.length <= 60 && [20, 30, 50].includes(v.dailyGoal) && typeof v.onboarded === 'boolean' },
  theme: { label: 'modo de color', ok: (v) => ['light', 'dark', 'system'].includes(v) },
  palette: { label: 'paleta', ok: (v) => PALETTE_IDS.includes(v) },
  dayOffset: { label: 'días simulados', ok: (v) => Number.isInteger(v) && v >= 0 && v <= 3650 },
  xp: { label: 'XP', ok: isCount },
  daily: { label: 'actividad diaria', ok: (v) => isObj(v) && Object.values(v).every((d) => isObj(d) && ['xp', 'seconds', 'activities', 'labRuns', 'reviews'].every((k) => optCount(d[k]))) },
  activities: { label: 'actividades', ok: (v) => isObj(v) && Object.values(v).every((a) => isObj(a) && ['attempts', 'fails', 'xpEarned', 'hintsMax'].every((k) => optCount(a[k])) && (a.cur === undefined || (isObj(a.cur) && isCount(a.cur.fails) && isCount(a.cur.hints)))) },
  concepts: { label: 'conceptos', ok: (v) => isObj(v) && Object.values(v).every((c) => isObj(c) && isCount(c.box) && c.box <= 5 && Array.isArray(c.history) && isObj(c.errors) && optCount(c.attempts) && optCount(c.wrong) && optCount(c.good)) },
  lessons: { label: 'lecciones', ok: (v) => isObj(v) && Object.values(v).every((l) => isObj(l) && optCount(l.step) && optCount(l.maxStep)) },
  checks: { label: 'preguntas', ok: (v) => isObj(v) && Object.values(v).every(isObj) },
  errors: { label: 'estadística de errores', ok: (v) => isObj(v) && Object.values(v).every(isCount) },
  log: { label: 'historial', ok: (v) => Array.isArray(v) && v.every(isObj) },
  achievements: { label: 'logros', ok: isObj },
  drafts: { label: 'borradores', ok: (v) => isObj(v) && Object.values(v).every((x) => typeof x === 'string') },
  plans: { label: 'planificaciones', ok: isObj },
  lab: { label: 'código del laboratorio', ok: (v) => v === null || typeof v === 'string' },
};

/** Combina con los valores iniciales y devuelve { data, invalid: [etiquetas de campos no válidos] }. */
export function validateState(input) {
  if (!isObj(input)) return { data: fresh(), invalid: ['estructura general'] };
  const base = fresh();
  let profile = input.profile;
  if (profile === undefined) profile = base.profile; // campo ausente: valor inicial
  else if (isObj(profile)) profile = { ...base.profile, ...profile };
  const data = { ...base, ...input, profile };
  const invalid = Object.entries(FIELDS).filter(([k, f]) => !f.ok(data[k])).map(([k]) => k);
  return { data, invalid: invalid.map((k) => FIELDS[k].label), invalidKeys: invalid };
}

/** Comprueba una copia exportada sin aplicarla: { ok, invalid: [motivos], data }. */
export function checkBackup(input) {
  // Campos imprescindibles para considerar el archivo una copia de LunaPy.
  if (!isObj(input) || input.version !== 1 || !('xp' in input) || !('daily' in input)) {
    return { ok: false, invalid: ['no es una copia de LunaPy'] };
  }
  const { data, invalid } = validateState(input);
  return { ok: invalid.length === 0, invalid, data };
}

function load() {
  try {
    let raw = localStorage.getItem(KEY);
    if (!raw) {
      const legacy = LEGACY_KEYS.find((k) => localStorage.getItem(k));
      if (legacy) {
        raw = localStorage.getItem(legacy);
        localStorage.setItem(KEY, raw);
        localStorage.removeItem(legacy);
      }
    }
    if (!raw) return fresh();
    const { data, invalidKeys } = validateState(JSON.parse(raw));
    if (invalidKeys.length) {
      // Reparar en lugar de fallar: los campos dañados vuelven a su valor inicial.
      const base = fresh();
      invalidKeys.forEach((k) => { data[k] = base[k]; });
      console.warn('[LunaPy] Datos guardados reparados:', invalidKeys.join(', '));
    }
    return data;
  } catch {
    return fresh();
  }
}

let state = load();
const listeners = new Set();

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* almacenamiento no disponible */ }
}

export function getState() { return state; }

export function update(fn) {
  const draft = structuredClone(state);
  fn(draft);
  state = draft;
  persist();
  notify();
  return state;
}

// Un oyente que falla no debe impedir que los demás (la interfaz) se actualicen.
function notify() {
  listeners.forEach((l) => {
    try { l(state); } catch (e) { console.error('[LunaPy] Error en un oyente del estado:', e); }
  });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useStore() {
  const [s, set] = useState(state);
  useEffect(() => subscribe(set), []);
  return s;
}

// ---------- Fechas ----------
const pad = (n) => String(n).padStart(2, '0');
export function dayKey(offsetDays = 0, base = state.dayOffset) {
  const d = new Date(Date.now() + (base + offsetDays) * DAY);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export const today = () => dayKey(0);
export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
}
export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / DAY);
}

function todayRec(s) {
  const k = dayKey(0, s.dayOffset);
  s.daily[k] ||= { xp: 0, seconds: 0, activities: 0, labRuns: 0, reviews: 0 };
  s.daily[k].activityIds ||= []; // actividades distintas superadas hoy (para las misiones)
  return s.daily[k];
}

function logEvent(s, entry) {
  s.log.unshift({ t: Date.now(), day: dayKey(0, s.dayOffset), ...entry });
  s.log = s.log.slice(0, 300);
}

function gain(s, amount, label, kind = 'xp') {
  if (amount <= 0) return;
  s.xp += amount;
  todayRec(s).xp += amount;
  logEvent(s, { kind, label, xp: amount });
}

// ---------- Conceptos y repetición espaciada ----------
function concept(s, id) {
  s.concepts[id] ||= { seen: false, attempts: 0, good: 0, wrong: 0, box: 0, next: null, lastPromoted: null, history: [], errors: {} };
  return s.concepts[id];
}

/**
 * Actualiza un concepto tras una práctica.
 * good: bien a la primera (sube de caja; como máximo hasta la caja 2 en un mismo día,
 *       para que «dominado» exija repasar en días distintos).
 * partial: resuelto tras fallos o con pistas (se mantiene la caja).
 * bad: no resuelto o resuelto viendo la solución (vuelve a la caja 1).
 */
function practice(s, id, outcome) {
  const c = concept(s, id);
  const t = dayKey(0, s.dayOffset);
  c.attempts += 1;
  if (outcome === 'good') {
    if (c.lastPromoted !== t || c.box < 2) {
      c.box = Math.min(5, c.box + 1);
      c.lastPromoted = t;
    }
    c.good += 1;
  } else if (outcome === 'bad') {
    c.box = 1;
  } else {
    c.box = Math.max(1, c.box);
  }
  c.history = [...c.history, outcome === 'good' ? 1 : 0].slice(-10);
  c.next = addDays(t, outcome === 'bad' ? 0 : INTERVALS[c.box]);
}

export function conceptStatus(c, t = today()) {
  if (!c || (!c.seen && !c.attempts)) return 'nuevo';
  if (!c.attempts) return 'aprendido';
  const due = c.next && c.next <= t;
  const lastBad = c.history.length && c.history[c.history.length - 1] === 0;
  if (due || (lastBad && c.box <= 1) || (c.wrong >= 3 && c.box <= 1)) return 'repaso';
  if (c.box >= 3) return 'dominado';
  return 'practicado';
}

/** Registro de una actividad. cur = intento en curso desde la última vez que se superó. */
function activityRec(s, id) {
  const a = (s.activities[id] ||= { attempts: 0, fails: 0, completed: false, hintsMax: 0, solutionViewed: false, xpEarned: 0 });
  a.cur ||= initialAttempt(a);
  return a;
}

// Registros anteriores a «cur»: si la actividad no estaba superada, su historial es el intento en curso.
function initialAttempt(a) {
  if (!a || a.completed) return { fails: 0, hints: 0, solution: false };
  return { fails: a.fails || 0, hints: Math.min(a.hintsMax || 0, 4), solution: !!a.solutionViewed };
}

/** Intento en curso de una actividad (para que la interfaz recupere pistas y solución ya vistas). */
export function currentAttempt(id) {
  const a = state.activities[id];
  return a?.cur || initialAttempt(a);
}

// ---------- Acciones ----------
export const actions = {
  setProfile(patch) { update((s) => { Object.assign(s.profile, patch); }); },
  setTheme(theme) { update((s) => { s.theme = theme; }); },
  setPalette(palette) { update((s) => { s.palette = palette; }); },

  markSeen(conceptIds) {
    update((s) => { conceptIds.forEach((id) => { concept(s, id).seen = true; }); });
  },

  lessonStep(lessonId, step) {
    update((s) => {
      const l = (s.lessons[lessonId] ||= { step: 0, maxStep: 0, completed: false });
      l.step = step;
      l.maxStep = Math.max(l.maxStep, step);
    });
  },

  completeLesson(lessonId, bonus) {
    let first = false;
    update((s) => {
      const l = (s.lessons[lessonId] ||= { step: 0, maxStep: 0, completed: false });
      if (!l.completed) {
        first = true;
        l.completed = true;
        l.completedAt = Date.now();
        gain(s, bonus, 'Lección completada', 'lesson');
      }
    });
    return first;
  },

  /** Pregunta intercalada en la teoría. Solo da XP la primera vez que se acierta. */
  answerCheck(id, conceptId, correct, { prediction = false } = {}) {
    let xp = 0;
    update((s) => {
      const prev = s.checks[id];
      if (!prev) {
        s.checks[id] = { correct, at: Date.now(), prediction };
        if (conceptId) {
          const c = concept(s, conceptId);
          c.seen = true;
          if (!correct) c.wrong += 1;
        }
        if (correct) { xp = 2; gain(s, xp, 'Pregunta de comprensión'); }
      }
    });
    return xp;
  },

  /**
   * Intento fallido en una actividad: se registra la categoría del error (no resta XP).
   * planning: errores de la planificación previa; no cuentan como intento fallido del ejercicio.
   */
  activityFail(activity, category, title, { planning = false, concepts = null, code = null } = {}) {
    let counted = true;
    update((s) => {
      const a = activityRec(s, activity.id);
      // Volver a comprobar exactamente el mismo código no es un error nuevo
      // (evita inflar las estadísticas con dobles clics o reenvíos sin cambios).
      if (code !== null && a.cur.lastCode === code) { counted = false; return; }
      if (code !== null) a.cur.lastCode = code;
      a.attempts += 1;
      a.fails += 1;
      if (!planning) a.cur.fails += 1;
      s.errors[category] = (s.errors[category] || 0) + 1;
      // Un envío incompleto no es un error de concepto; los fallos de planificación
      // se atribuyen a «descomponer», no a la sintaxis que el ejercicio también practica;
      // en las predicciones, al concepto que revela la opción elegida.
      if (category === 'incompleto') return;
      const targets = concepts
        || (category === 'planificacion' && activity.concepts.includes('descomponer') ? ['descomponer'] : activity.concepts);
      targets.forEach((id) => {
        const c = concept(s, id);
        c.wrong += 1;
        if (title) c.errors[title] = (c.errors[title] || 0) + 1;
      });
      logEvent(s, { kind: 'fail', label: activity.title, category });
    });
    return counted;
  },

  /** Pista revelada (nivel 1-4) o solución vista. Se guarda para que salir y volver no la borre. */
  hintUsed(activityId, level, solution = false) {
    update((s) => {
      const a = activityRec(s, activityId);
      a.hintsMax = Math.max(a.hintsMax, level);
      if (solution) {
        a.solutionViewed = true;
        a.cur.solution = true;
      } else {
        a.cur.hints = Math.max(a.cur.hints, level);
      }
    });
  },

  /**
   * Actividad superada. Devuelve el XP ganado.
   * XP = base · (1 − 0,1 por cada pista a partir de la 2.ª) · (0,3 si se vio la solución) + 5 si es a la primera.
   * Los fallos, pistas y solución salen del intento en curso GUARDADO (a.cur), no del componente:
   * salir de la actividad y volver no los borra.
   * Repetir una actividad ya completada no da XP, pero sí cuenta como práctica para el repaso.
   */
  activityPass(activity) {
    const result = { xp: 0, first: false, breakdown: null };
    update((s) => {
      const a = activityRec(s, activity.id);
      const { fails, hints: hintsUsed, solution: solutionViewed } = a.cur;
      a.attempts += 1;
      a.cur = { fails: 0, hints: 0, solution: false }; // empieza un intento nuevo
      const outcome = solutionViewed ? 'bad' : (fails === 0 && hintsUsed <= 1 ? 'good' : 'partial');
      activity.concepts.forEach((id) => practice(s, id, outcome));
      const t = todayRec(s);
      t.activities += 1;
      if (!t.activityIds.includes(activity.id)) t.activityIds.push(activity.id);
      if (!a.completed) {
        let factor = 1 - 0.1 * Math.max(0, hintsUsed - 1);
        if (solutionViewed) factor = 0.3;
        const base = Math.round(activity.xp * factor);
        const bonus = fails === 0 && hintsUsed === 0 && !solutionViewed ? 5 : 0;
        result.xp = base + bonus;
        result.first = true;
        result.breakdown = { base: activity.xp, factor, bonus };
        a.completed = true;
        a.completedAt = Date.now();
        a.firstTry = fails === 0;
        a.noHints = hintsUsed === 0 && !solutionViewed;
        a.xpEarned = result.xp;
        gain(s, result.xp, activity.title, 'activity');
      } else {
        logEvent(s, { kind: 'practice', label: activity.title, xp: 0 });
      }
    });
    return result;
  },

  /** Etapa «Mejorar»: pulir una solución que ya funcionaba. Da 3 XP la primera vez en cada actividad. */
  improveSolution(activity) {
    let xp = 0;
    update((s) => {
      const a = activityRec(s, activity.id);
      if (!a.improved) {
        a.improved = true;
        xp = 3;
        gain(s, xp, `Solución mejorada · ${activity.title}`, 'activity');
      }
    });
    return xp;
  },

  /**
   * Respuesta en una sesión de repaso. Todas las respuestas cuentan para el dominio,
   * pero solo el primer acierto de cada concepto en el día da XP (evita acumular XP repitiendo repasos).
   */
  review(item, correct) {
    let xp = 0;
    update((s) => {
      practice(s, item.concept, correct ? 'good' : 'bad');
      const c = concept(s, item.concept);
      if (!correct) c.wrong += 1;
      todayRec(s).reviews += 1;
      const t = dayKey(0, s.dayOffset);
      if (correct && c.reviewXpDay !== t) {
        xp = 3;
        c.reviewXpDay = t;
        gain(s, xp, 'Repaso', 'review');
      } else if (correct) {
        logEvent(s, { kind: 'practice', label: 'Repaso', xp: 0 });
      } else {
        logEvent(s, { kind: 'review-fail', label: 'Repaso', category: 'repaso' });
      }
    });
    return xp;
  },

  labRun() { update((s) => { todayRec(s).labRuns += 1; }); },
  /** Cualquier programa ejecutado (laboratorio, lección o actividad). */
  programRun() { update((s) => { const t = todayRec(s); t.runs = (t.runs || 0) + 1; }); },
  /** Sesión de repaso terminada (todas sus preguntas respondidas). */
  reviewSessionDone() { update((s) => { const t = todayRec(s); t.reviewSessions = (t.reviewSessions || 0) + 1; }); },
  saveDraft(id, code) { update((s) => { s.drafts[id] = code; }); },
  savePlan(id, plan) { update((s) => { s.plans[id] = plan; }); },
  saveLab(code) { update((s) => { s.lab = code; }); },
  addSeconds(n) { update((s) => { todayRec(s).seconds += n; }); },
  /** Desbloquea varios logros en una sola actualización (así cada aviso aparece una vez). */
  unlockAchievements(ids) { update((s) => { ids.forEach((id) => { s.achievements[id] ||= Date.now(); }); }); },
  advanceDay() { update((s) => { s.dayOffset += 1; }); },
  /** Restaura una copia exportada. Devuelve false si el archivo no es una copia válida de LunaPy. */
  importState(input) {
    const { ok, invalid, data } = checkBackup(input);
    if (!ok) return { ok, invalid };
    data.profile.onboarded = true;
    state = data;
    persist();
    notify();
    return { ok: true, invalid: [] };
  },
  reset() {
    const { theme, palette } = state;
    state = { ...fresh(), theme, palette };
    persist();
    notify();
  },
};

// ---------- Derivados ----------
export function levelInfo(xp) {
  let lvl = 0;
  while (lvl + 1 < LEVELS.length && xp >= LEVELS[lvl + 1]) lvl++;
  const cur = LEVELS[lvl];
  const next = LEVELS[lvl + 1] ?? cur + 500;
  return { level: lvl + 1, cur, next, pct: Math.min(100, ((xp - cur) / (next - cur)) * 100) };
}

export function streak(s = state) {
  const active = (k) => (s.daily[k]?.xp || 0) > 0;
  let n = 0;
  let k = dayKey(0, s.dayOffset);
  if (!active(k)) k = addDays(k, -1); // la racha sigue viva hasta que termine el día
  while (active(k)) { n++; k = addDays(k, -1); }
  return { days: n, todayDone: active(dayKey(0, s.dayOffset)) };
}

export function lastDays(n, s = state) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const k = dayKey(-i, s.dayOffset);
    out.push({ key: k, ...(s.daily[k] || { xp: 0, seconds: 0, activities: 0, labRuns: 0, reviews: 0 }) });
  }
  return out;
}
