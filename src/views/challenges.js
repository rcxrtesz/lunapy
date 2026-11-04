import { html, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Difficulty } from '../components/common.js';
import { ActivityRunner } from '../components/activities.js';
import { ACTIVITIES, CHALLENGES } from '../content/activities.js';
import { CONCEPTS } from '../content/curriculum.js';
import { useStore } from '../state/store.js';
import { isUnlocked } from '../state/gamification.js';
import { t } from '../lib/i18n.js';

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
      <div class="eyebrow">${t('Zona de desafíos', 'Challenge zone')}</div>
      <h1>${t('Pon a prueba lo que sabes', 'Put what you know to the test')}</h1>
      <p>${t('Problemas por tema y dificultad. Los más exigentes se desbloquean cuando demuestras dominio resolviendo los anteriores, no por haber leído la teoría.', 'Problems by topic and difficulty. The hardest ones unlock when you show mastery by solving the earlier ones, not just by reading the theory.')}</p>
    </div>
    <div class="filters" role="group" aria-label=${t('Filtrar por tema', 'Filter by topic')}>
      ${['', ...TOPICS].map((tp) => html`<button class=${`chip ${topic === tp ? 'on' : ''}`} onClick=${() => setTopic(tp)} aria-pressed=${topic === tp}>${tp === 'Motos' || tp === 'Motorbikes' ? `🏍️ ${tp === 'Motos' ? t('Motos', 'Motorbikes') : tp}` : tp || t('Todos los temas', 'All topics')}</button>`)}
      ${UPCOMING.map((tp) => html`<span class="tag" title=${t('Llegará con los siguientes módulos', 'Coming with the next modules')}>${tp} · ${t('próximamente', 'coming soon')}</span>`)}
    </div>
    <div class="filters" role="group" aria-label=${t('Filtrar por dificultad', 'Filter by difficulty')}>
      ${[t('Todas', 'All'), t('Básico', 'Basic'), t('Intermedio', 'Intermediate'), t('Avanzado', 'Advanced')].map((d, i) => html`<button class=${`chip ${diff === i ? 'on' : ''}`} onClick=${() => setDiff(i)} aria-pressed=${diff === i}>${d}</button>`)}
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
            ${!ok ? html`<span class="tag"><${Icon} name="lock" size=${12} /> ${t('Bloqueado', 'Locked')}</span>`
              : rec?.completed ? html`<span class="tag ok"><${Icon} name="check" size=${12} /> ${t('Superado', 'Passed')}</span>` : html`<span class="tag info">${t('Disponible', 'Available')}</span>`}
          </div>
          ${!ok && html`<div class="tiny muted">${t('Para desbloquearlo', 'To unlock it')}: ${a.unlock.text.toLowerCase()}.</div>`}`;
        return ok ? html`<a class="card challenge" href=${`#/desafios/${a.id}`}>${body}</a>` : html`<div class="card challenge locked" aria-disabled="true">${body}</div>`;
      })}
    </div>
  </div>`;
}

export function ChallengeView({ id }) {
  const s = useStore();
  const a = ACTIVITIES[id];
  if (!a) return html`<div class="empty"><h3>${t('No encontramos este desafío', "We couldn't find this challenge")}</h3><a class="btn" href="#/desafios">${t('Volver', 'Back')}</a></div>`;
  const ok = isUnlocked(a, s);
  return html`<div>
    <div style="margin:14px 0"><a class="btn ghost sm" href="#/desafios"><${Icon} name="arrowLeft" size=${15} /> ${t('Desafíos', 'Challenges')}</a></div>
    <div class="card step-card">
      ${ok ? html`<${ActivityRunner} activity=${a} key=${a.id} />` : html`<div class="empty"><div class="icon-wrap"><${Icon} name="lock" size=${24} /></div>
        <h3>${a.title}</h3><p>${t('Para desbloquearlo', 'To unlock it')}: ${a.unlock.text.toLowerCase()}.</p></div>`}
    </div>
  </div>`;
}
