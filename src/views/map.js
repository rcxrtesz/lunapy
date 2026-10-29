import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Progress } from '../components/common.js';
import { MODULES } from '../content/curriculum.js';
import { ACTIVITIES } from '../content/activities.js';
import { useStore } from '../state/store.js';
import { lessonProgress, isUnlocked } from '../state/gamification.js';

export function MapView() {
  const s = useStore();
  const lp = lessonProgress(s);
  const [open, setOpen] = useState({ m2: true });

  return html`<div>
    <div class="page-head">
      <div class="eyebrow">Mapa de aprendizaje</div>
      <h1>De cero a nivel intermedio</h1>
      <p>13 módulos que siguen el orden de <a href="https://libropython.es/" target="_blank" rel="noopener">«Piensa en Python»</a>, el libro de referencia de tu asignatura, complementado con Cisco Python Essentials. Cada módulo indica a qué capítulos corresponde.</p>
      <span class="demo-note"><${Icon} name="info" size=${13} /> Demo: solo la lección 2.1 tiene contenido completo</span>
    </div>
    <div class="path">
      ${MODULES.map((m) => {
        const isCurrent = m.id === 'm2';
        const state = isCurrent ? 'current' : m.id === 'm1' ? '' : 'locked';
        const expanded = open[m.id];
        const modPct = isCurrent ? Math.round(lp.pct / m.lessons.length) : 0;
        return html`<div class=${`module-card ${state}`} key=${m.id}>
          <div class="module-node"><div class="module-badge">${m.id === 'm1' || isCurrent ? m.num : html`<${Icon} name="lock" size=${20} />`}</div></div>
          <div class="card module-body">
            <div class="row between wrap" style="align-items:flex-start">
              <div style="min-width:0;flex:1">
                <div class="tiny faint" style="font-weight:700;letter-spacing:.05em">MÓDULO ${m.num}</div>
                <h3 style="margin:2px 0 4px">${m.title}</h3>
                <div class="book-ref"><${Icon} name="book" size=${13} /> ${m.book.join(' · ')} <span class="faint">· ${m.cisco}</span></div>
              </div>
              <div class="row" style="gap:8px">
                ${isCurrent && html`<span class="tag accent">En curso · ${modPct} %</span>`}
                ${m.id === 'm1' && html`<span class="tag">Contenido pendiente</span>`}
                ${state === 'locked' && html`<span class="tag">Se desbloquea al dominar el módulo ${m.num - 1}</span>`}
              </div>
            </div>
            ${isCurrent && html`<div style="margin-top:12px"><${Progress} value=${modPct} /></div>`}
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
                  if (l.available) {
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
                    <span style="flex:1"><b>${m.num}.${i + 1}</b> ${l.title}</span><span class="tiny faint">Fuera de la demo</span></div>`;
                })}
              </div>
            </div>`}
          </div>
        </div>`;
      })}
    </div>
  </div>`;
}
