// Fusión del progreso de dos dispositivos (sin conexión → cambios en los dos).
//
// merge(local, remoto, base):
//   local  = estado de este dispositivo
//   remoto = estado del servidor (puede traer cambios de otro dispositivo)
//   base   = último estado que este dispositivo sincronizó (el antepasado común), o null
//
// Contadores (XP, intentos…): lo del servidor + lo que este dispositivo ha sumado desde la
// base. Así, si practicas sin conexión en el móvil y en el ordenador, se suman los dos.
// Sin base (primera sincronización), se toma el mayor. Lo que solo crece (lecciones
// completadas, logros, preguntas respondidas) se une; los ajustes, del más reciente.

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function counter(l, r, b) {
  if (b === undefined || b === null) return Math.max(num(l), num(r));
  return num(r) + Math.max(0, num(l) - num(b));
}

const minDefined = (a, b) => (a == null ? b : b == null ? a : Math.min(a, b));

/** Une dos mapas clave → valor; si la clave está en los dos, decide fn(l, r, b). */
function mergeMap(l, r, b, fn) {
  const L = isObj(l) ? l : {};
  const R = isObj(r) ? r : {};
  const B = isObj(b) ? b : {};
  const out = {};
  for (const k of new Set([...Object.keys(R), ...Object.keys(L)])) {
    if (!(k in L)) out[k] = R[k];
    else if (!(k in R)) out[k] = L[k];
    else out[k] = fn(L[k], R[k], B[k]);
  }
  return out;
}

const COUNTERS_DAILY = ['xp', 'seconds', 'activities', 'labRuns', 'reviews'];

function mergeDay(l, r, b) {
  const out = { ...r, ...l };
  for (const k of COUNTERS_DAILY) out[k] = counter(l[k], r[k], b?.[k]);
  if (l.activityIds || r.activityIds) out.activityIds = [...new Set([...(r.activityIds || []), ...(l.activityIds || [])])];
  return out;
}

function mergeActivity(l, r, b, localNewer) {
  const out = localNewer ? { ...r, ...l } : { ...l, ...r };
  out.attempts = counter(l.attempts, r.attempts, b?.attempts);
  out.fails = counter(l.fails, r.fails, b?.fails);
  out.hintsMax = Math.max(num(l.hintsMax), num(r.hintsMax));
  out.xpEarned = Math.max(num(l.xpEarned), num(r.xpEarned));
  out.completed = !!(l.completed || r.completed);
  out.solutionViewed = !!(l.solutionViewed || r.solutionViewed);
  if (l.noHints || r.noHints) out.noHints = true;
  const completedAt = minDefined(l.completedAt, r.completedAt);
  if (completedAt != null) {
    out.completedAt = completedAt;
    // firstTry pertenece a quien la superó primero.
    const first = l.completedAt === completedAt ? l : r;
    if ('firstTry' in first) out.firstTry = first.firstTry;
  }
  return out;
}

function mergeConcept(l, r, b) {
  // La caja, la próxima fecha y el historial vienen del lado con más práctica.
  const lead = num(l.attempts) >= num(r.attempts) ? l : r;
  return {
    ...lead,
    seen: !!(l.seen || r.seen),
    attempts: counter(l.attempts, r.attempts, b?.attempts),
    good: counter(l.good, r.good, b?.good),
    wrong: counter(l.wrong, r.wrong, b?.wrong),
    errors: mergeMap(l.errors, r.errors, b?.errors, counter),
  };
}

function mergeLesson(l, r) {
  const recent = num(l.lastAt) >= num(r.lastAt) ? l : r;
  const out = { ...recent };
  out.maxStep = Math.max(num(l.maxStep), num(r.maxStep));
  out.completed = !!(l.completed || r.completed);
  const completedAt = minDefined(l.completedAt, r.completedAt);
  if (completedAt != null) out.completedAt = completedAt;
  return out;
}

const earliest = (l, r) => (num(l?.at) && num(r?.at) && num(r.at) < num(l.at) ? r : l);

function mergeLog(l, r) {
  const seen = new Set();
  const all = [...(Array.isArray(l) ? l : []), ...(Array.isArray(r) ? r : [])].filter((e) => {
    const key = `${e.t}|${e.kind}|${e.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return all.sort((a, b) => num(b.t) - num(a.t)).slice(0, 300);
}

export function merge(local, remote, base = null) {
  if (!isObj(remote)) return local;
  if (!isObj(local)) return remote;
  const b = isObj(base) ? base : null;
  const localNewer = num(local.updatedAt) >= num(remote.updatedAt);
  const newer = localNewer ? local : remote;
  const pick = (l, r) => (localNewer ? l : r);

  return {
    ...remote,
    ...local,
    version: 1,
    createdAt: minDefined(local.createdAt, remote.createdAt) ?? Date.now(),
    updatedAt: Math.max(num(local.updatedAt), num(remote.updatedAt)),
    // Ajustes: del dispositivo que cambió algo más recientemente.
    profile: newer.profile,
    theme: newer.theme,
    palette: newer.palette,
    dayOffset: newer.dayOffset,
    lab: newer.lab,
    // Contadores
    xp: counter(local.xp, remote.xp, b?.xp),
    daily: mergeMap(local.daily, remote.daily, b?.daily, mergeDay),
    errors: mergeMap(local.errors, remote.errors, b?.errors, counter),
    activities: mergeMap(local.activities, remote.activities, b?.activities, (l, r, bb) => mergeActivity(l, r, bb, localNewer)),
    concepts: mergeMap(local.concepts, remote.concepts, b?.concepts, mergeConcept),
    // Lo que solo crece
    lessons: mergeMap(local.lessons, remote.lessons, null, mergeLesson),
    checks: mergeMap(local.checks, remote.checks, null, earliest),
    achievements: mergeMap(local.achievements, remote.achievements, null, (l, r) => (num(r) && num(r) < num(l) ? r : l)),
    log: mergeLog(local.log, remote.log),
    // Borradores y planificaciones: se unen; si chocan, gana el más reciente.
    drafts: mergeMap(local.drafts, remote.drafts, null, pick),
    plans: mergeMap(local.plans, remote.plans, null, pick),
  };
}
