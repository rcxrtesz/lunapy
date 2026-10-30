import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Difficulty } from '../components/common.js';
import { ActivityRunner } from '../components/activities.js';
import { ACTIVITIES, CHALLENGES } from '../content/activities.js';
import { CONCEPTS } from '../content/curriculum.js';
import { useStore } from '../state/store.js';
import { isUnlocked } from '../state/gamification.js';

// Temas con actividades (en el orden del curso) y los que llegarán con los siguientes módulos.
const TOPICS = [...new Set(CHALLENGES.map((id) => ACTIVITIES[id].topic))];
const UPCOMING = [];

export function Challenges() {
  const s = useStore();
  const [diff, setDiff] = useState(0);
  const [topic, setTopic] = useState('');
  const list = CHALLENGES.map((id) => ACTIVITIES[id])
    .filter((a) => (!diff || a.difficulty === diff) && (!topic || a.topic === topic));
  return html`<div>
    <div class="page-head">
      <div class="eyebrow">Zona de desafíos</div>
      <h1>Pon a prueba lo que sabes</h1>
      <p>Problemas por tema y dificultad. Los más exigentes se desbloquean cuando demuestras dominio resolviendo los anteriores, no por haber leído la teoría.</p>
    </div>
    <div class="filters" role="group" aria-label="Filtrar por tema">
      ${['', ...TOPICS].map((t) => html`<button class=${`chip ${topic === t ? 'on' : ''}`} onClick=${() => setTopic(t)} aria-pressed=${topic === t}>${t || 'Todos los temas'}</button>`)}
      ${UPCOMING.map((t) => html`<span class="tag" title="Llegará con los siguientes módulos">${t} · próximamente</span>`)}
    </div>
    <div class="filters" role="group" aria-label="Filtrar por dificultad">
      ${['Todas', 'Básico', 'Intermedio', 'Avanzado'].map((d, i) => html`<button class=${`chip ${diff === i ? 'on' : ''}`} onClick=${() => setDiff(i)} aria-pressed=${diff === i}>${d}</button>`)}
    </div>
    <div class="challenge-grid">
      ${list.map((a) => {
        const ok = isUnlocked(a, s);
        const rec = s.activities[a.id];
        const body = html`
          <div class="row between"><span class="tag accent">${a.kindLabel}</span><${Difficulty} level=${a.difficulty} /></div>
          <h3 style="margin:0">${a.title}</h3>
          <div class="small muted">${a.concepts.map((c) => CONCEPTS[c].short).join(' · ')}</div>
          <div class="row between" style="margin-top:auto">
            <span class="tag xp"><${Icon} name="zap" size=${12} /> ${a.xp} XP</span>
            ${!ok ? html`<span class="tag"><${Icon} name="lock" size=${12} /> Bloqueado</span>`
              : rec?.completed ? html`<span class="tag ok"><${Icon} name="check" size=${12} /> Superado</span>` : html`<span class="tag info">Disponible</span>`}
          </div>
          ${!ok && html`<div class="tiny muted">Para desbloquearlo: ${a.unlock.text.toLowerCase()}.</div>`}`;
        return ok ? html`<a class="card challenge" href=${`#/desafios/${a.id}`}>${body}</a>` : html`<div class="card challenge locked" aria-disabled="true">${body}</div>`;
      })}
    </div>
  </div>`;
}

export function ChallengeView({ id }) {
  const s = useStore();
  const a = ACTIVITIES[id];
  if (!a) return html`<div class="empty"><h3>No encontramos este desafío</h3><a class="btn" href="#/desafios">Volver</a></div>`;
  const ok = isUnlocked(a, s);
  return html`<div>
    <div style="margin:14px 0"><a class="btn ghost sm" href="#/desafios"><${Icon} name="arrowLeft" size=${15} /> Desafíos</a></div>
    <div class="card step-card">
      ${ok ? html`<${ActivityRunner} activity=${a} key=${a.id} />` : html`<div class="empty"><div class="icon-wrap"><${Icon} name="lock" size=${24} /></div>
        <h3>${a.title}</h3><p>Para desbloquearlo: ${a.unlock.text.toLowerCase()}.</p></div>`}
    </div>
  </div>`;
}
