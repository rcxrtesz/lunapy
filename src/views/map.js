import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress } from '../components/common.js';
import { MODULES } from '../content/curriculum.js';
import { ACTIVITIES } from '../content/activities.js';
import { LESSONS } from '../content/lessons.js';
import { useStore } from '../state/store.js';
import { lessonProgress, isUnlocked, currentLessonId } from '../state/gamification.js';

// Módulos con contenido. El resto se muestra bloqueado hasta que se desarrolle.
const OPEN_MODULES = new Set(['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11']);

export function MapView() {
  const s = useStore();
  const current = LESSONS[currentLessonId(s)];
  const [open, setOpen] = useState({ [current.moduleId]: true });

  return html`<div>
    <div class="page-head">
      <div class="eyebrow">Mapa de aprendizaje</div>
      <h1>De cero a nivel intermedio</h1>
      <p>13 módulos que siguen el orden de <a href="https://libropython.es/" target="_blank" rel="noopener">«Piensa en Python»</a>, el libro de referencia de tu asignatura, complementado con Cisco Python Essentials. Cada módulo indica a qué capítulos corresponde.</p>
      <span class="demo-note"><${Icon} name="info" size=${13} /> En desarrollo: módulos 1 a 11 disponibles</span>
    </div>
    <div class="path">
      ${MODULES.map((m) => {
        const available = OPEN_MODULES.has(m.id);
        const lessons = m.lessons.filter((l) => l.id && LESSONS[l.id]);
        const progress = lessons.map((l) => lessonProgress(s, l.id));
        const modPct = m.lessons.length ? Math.round(progress.reduce((a, p) => a + p.pct, 0) / m.lessons.length) : 0;
        const done = lessons.length > 0 && lessons.length === m.lessons.filter((l) => !l.challenge).length && progress.every((p) => p.completed);
        const isCurrent = current.moduleId === m.id;
        const state = !available ? 'locked' : done ? 'done' : isCurrent ? 'current' : '';
        const expanded = open[m.id];
        return html`<div class=${`module-card ${state}`} key=${m.id}>
          <div class="module-node"><div class="module-badge">${!available ? html`<${Icon} name="lock" size=${20} />` : done ? html`<${Icon} name="check" size=${22} stroke=${3} />` : m.num}</div></div>
          <div class="card module-body">
            <div class="row between wrap" style="align-items:flex-start">
              <div style="min-width:0;flex:1">
                <div class="tiny faint" style="font-weight:700;letter-spacing:.05em">MÓDULO ${m.num}</div>
                <h3 style="margin:2px 0 4px">${m.title}</h3>
                <div class="book-ref"><${Icon} name="book" size=${13} /> ${m.book.join(' · ')} <span class="faint">· ${m.cisco}</span></div>
              </div>
              <div class="row" style="gap:8px">
                ${available && (done ? html`<span class="tag ok">Completado</span>` : html`<span class=${`tag ${isCurrent ? 'accent' : ''}`}>${isCurrent ? 'En curso · ' : ''}${modPct} %</span>`)}
                ${!available && html`<span class="tag">Se desbloquea al dominar el módulo ${m.num - 1}</span>`}
              </div>
            </div>
            ${available && html`<div style="margin-top:12px"><${Progress} value=${modPct} kind=${done ? 'ok' : ''} /></div>`}
            <button class="details-toggle" style="margin-top:12px" onClick=${() => setOpen({ ...open, [m.id]: !expanded })} aria-expanded=${!!expanded}>
              ${expanded ? 'Ocultar detalles' : 'Ver objetivos y lecciones'}
            </button>
            ${expanded && html`<div style="margin-top:12px">
              <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">
                <div><div class="small" style="font-weight:700;margin-bottom:4px">Objetivos</div>
                  <ul class="small muted" style="margin:0;padding-left:18px">${m.objectives.map((o) => html`<li>${o}</li>`)}</ul></div>
                <div><div class="small" style="font-weight:700;margin-bottom:4px">Prerrequisitos</div>
                  <div class="small muted">${m.prerequisites.join(', ')}</div></div>
              </div>
              <div class="lesson-list">
                ${m.lessons.map((l, i) => {
                  if (l.id && LESSONS[l.id] && available) {
                    const lp = lessonProgress(s, l.id);
                    const cls = lp.completed ? 'completed' : 'available';
                    return html`<a class=${`lesson-item ${cls}`} href=${`#/leccion/${l.id}/${lp.step || 0}`}>
                      <span class="li-icon"><${Icon} name=${lp.completed ? 'check' : 'play'} size=${15} /></span>
                      <span style="flex:1"><b>${m.num}.${i + 1}</b> ${l.title}</span>
                      <span class="tag ${lp.completed ? 'ok' : 'accent'}">${lp.completed ? 'Completada' : `${lp.activitiesDone}/${lp.activitiesTotal} actividades`}</span>
                    </a>`;
                  }
                  if (l.challenge) {
                    const a = ACTIVITIES[l.challenge];
                    const ok = isUnlocked(a, s);
                    const comp = s.activities[a.id]?.completed;
                    return ok ? html`<a class=${`lesson-item ${comp ? 'completed' : 'available'}`} href=${`#/desafios/${a.id}`}>
                        <span class="li-icon"><${Icon} name=${comp ? 'check' : 'trophy'} size=${15} /></span><span style="flex:1">${l.title}</span><span class="tag xp">${a.xp} XP</span></a>`
                      : html`<div class="lesson-item pending"><span class="li-icon"><${Icon} name="lock" size=${15} /></span><span style="flex:1">${l.title}</span><span class="tag">${a.unlock.text}</span></div>`;
                  }
                  return html`<div class="lesson-item pending"><span class="li-icon"><${Icon} name="lock" size=${15} /></span>
                    <span style="flex:1"><b>${m.num}.${i + 1}</b> ${l.title}</span><span class="tiny faint">Próximamente</span></div>`;
                })}
              </div>
            </div>`}
          </div>
        </div>`;
      })}
    </div>
  </div>`;
}
