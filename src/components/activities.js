import { html, useEffect, useMemo, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { Rich, Paragraphs, Difficulty, CATEGORY, toast, EngineLoading } from './common.js';
import { CodeView, Editor, Console, ErrorCard, useRunner } from './code.js';
import { highlightLine as highlight, shuffledIndices } from '../lib/highlight.js';
import { Tracer } from './tracer.js';
import { Hints } from './hints.js';
import { actions, getState, useStore, currentAttempt } from '../state/store.js';
import { engine } from '../engine/python.js';

const TYPE_ICON = { predict: 'eye', code: 'code', order: 'list' };
const VARIANT_ICON = { complete: 'puzzle', fix: 'bug', build: 'pencil' };

function ActivityHeader({ activity }) {
  const s = useStore();
  const rec = s.activities[activity.id];
  return html`<div class="activity-head">
    <div class="activity-icon"><${Icon} name=${VARIANT_ICON[activity.variant] || TYPE_ICON[activity.type]} size=${22} /></div>
    <div style="flex:1;min-width:0">
      <div class="activity-type">${activity.kindLabel}</div>
      <h2 class="activity-title">${activity.title}</h2>
      <div class="row wrap" style="margin-top:8px;gap:6px">
        <${Difficulty} level=${activity.difficulty} />
        <span class="tag xp"><${Icon} name="zap" size=${12} /> ${activity.xp} XP</span>
        ${rec && rec.completed && html`<span class="tag ok"><${Icon} name="check" size=${12} /> Completada${rec.solutionViewed ? ' con solución' : ''}</span>`}
      </div>
    </div>
  </div>`;
}

function celebrate(activity, res) {
  if (res.first) {
    const bits = [];
    if (res.breakdown.bonus) bits.push('+5 por resolverlo a la primera sin ayuda');
    if (res.breakdown.factor < 1) bits.push(`${Math.round(res.breakdown.factor * 100)} % del XP por las ayudas usadas`);
    toast({ icon: 'zap', title: `+${res.xp} XP · ${activity.title}`, text: bits.join(' · ') });
  } else {
    toast({ icon: 'repeat', title: 'Práctica registrada', text: 'Ya habías completado esta actividad: cuenta para tus repasos.' });
  }
}

function RepeatNote({ activity }) {
  const rec = getState().activities[activity.id];
  if (!rec || !rec.completed) return null;
  return html`<div class="callout"><span class="callout-icon"><${Icon} name="repeat" /></span>
    <div>Ya completaste esta actividad. Puedes repetirla para practicar: no vuelve a dar XP, pero mantiene vivo el concepto en tu memoria y en tu plan de repaso.</div></div>`;
}

// ===================================================================== Predicción
export function PredictActivity({ activity, onComplete }) {
  const [picked, setPicked] = useState([]);
  const [solved, setSolved] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const runner = useRunner();

  const choose = (i) => {
    if (solved || picked.includes(i)) return;
    const opt = activity.options[i];
    const next = [...picked, i];
    setPicked(next);
    if (opt.correct) {
      setSolved(true);
      const res = actions.activityPass(activity);
      celebrate(activity, res);
      onComplete && onComplete(res);
    } else {
      actions.activityFail(activity, 'concepto', `Predicción: ${opt.text}`, { concepts: opt.concept ? [opt.concept] : null });
    }
  };
  const wrong = picked.filter((i) => !activity.options[i].correct);

  return html`<div class="stack" style="gap:16px">
    <${ActivityHeader} activity=${activity} />
    <${RepeatNote} activity=${activity} />
    <${Rich} tag="p" className="statement" text=${activity.prompt} />
    <div class="code-block"><div class="code-block-head"><${Icon} name="code" size=${14} /> programa.py</div><${CodeView} code=${activity.code} /></div>
    <div class="options">
      ${shuffledIndices(activity.options.length, activity.id).map((i, pos) => {
        const o = activity.options[i];
        const was = picked.includes(i);
        return html`<button class=${`option ${was ? (o.correct ? 'correct' : 'wrong') : ''}`} onClick=${() => choose(i)} disabled=${solved || was}>
          <span class="opt-key">${was ? html`<${Icon} name=${o.correct ? 'check' : 'x'} size=${14} />` : 'ABCD'[pos]}</span><code>${o.text}</code>
        </button>`;
      })}
    </div>
    ${wrong.length > 0 && !solved && html`<div class="feedback err">
      <div class="feedback-title"><${Icon} name="brain" size=${16} /> Idea interesante, pero no</div>
      <${Rich} text=${activity.options[wrong[wrong.length - 1]].why} />
      <div class="small muted" style="margin-top:6px">Vuelve a intentarlo: equivocarse aquí es útil, te muestra qué idea hay que ajustar.</div>
    </div>`}
    ${solved && html`<div class="feedback ok">
      <div class="feedback-title"><${Icon} name="check" size=${16} /> ${wrong.length === 0 ? '¡Correcto a la primera!' : '¡Correcto!'}</div>
      <div>Así lo razona Python:</div>
      <ol style="margin:6px 0 0;padding-left:20px">${activity.explain.map((e) => html`<li><${Rich} text=${e} /></li>`)}</ol>
    </div>
    <div class="row wrap">
      <button class="btn" onClick=${() => runner.run(activity.code)}><${Icon} name="play" size=${15} /> Compruébalo en Python</button>
      <button class="btn" onClick=${() => setShowTrace(!showTrace)}><${Icon} name="footsteps" size=${15} /> ${showTrace ? 'Ocultar' : 'Ver'} la ejecución paso a paso</button>
    </div>
    ${runner.status !== 'idle' && html`<${Console} runner=${runner} title="Salida real de Python" />`}
    ${showTrace && html`<${Tracer} code=${activity.code} />`}`}
  </div>`;
}

// ===================================================================== Planificación
function Plan({ activity, onDone, onSkip, onAnswer }) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState([]);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState(0);
  const q = activity.plan[qi];

  const verify = (selection) => {
    const correctSet = q.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
    const ok = correctSet.length === selection.length && correctSet.every((i) => selection.includes(i));
    setChecked(true);
    onAnswer && onAnswer();
    if (!ok) {
      setErrors((e) => e + 1);
      actions.activityFail(activity, 'planificacion', `Planificación: ${q.q}`, { planning: true });
    }
    return ok;
  };
  const isOk = checked && (() => {
    const c = q.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
    return c.length === sel.length && c.every((i) => sel.includes(i));
  })();

  const pick = (i) => {
    if (checked && isOk) return;
    if (q.multi) { setChecked(false); setSel((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i])); }
    else { setSel([i]); verify([i]); }
  };
  const next = () => {
    if (qi + 1 < activity.plan.length) { setQi(qi + 1); setSel([]); setChecked(false); }
    else onDone({ errors });
  };

  return html`<div class="plan">
    <div class="row between wrap" style="margin-bottom:8px">
      <div class="eyebrow" style="margin:0"><${Icon} name="brain" size=${13} /> Antes de programar · Planifica</div>
      <button class="btn sm ghost" onClick=${onSkip}>Ya lo tengo claro, ir al código</button>
    </div>
    <div class="plan-steps">${activity.plan.map((_, i) => html`<i class=${i <= qi ? 'on' : ''} />`)}</div>
    <div class="question-text">${q.q}${q.multi && html`<span class="muted small"> (elige todas las que correspondan)</span>`}</div>
    <div class="chips">
      ${shuffledIndices(q.options.length, q.q).map((i) => {
        const o = q.options[i];
        const on = sel.includes(i);
        let cls = on ? 'on' : '';
        if (checked && on) cls = o.correct ? 'correct' : 'wrong';
        if (checked && isOk && o.correct) cls = 'correct';
        return html`<button class=${`chip ${cls}`} onClick=${() => pick(i)} aria-pressed=${on}><${Rich} text=${o.text} /></button>`;
      })}
    </div>
    ${q.multi && !(checked && isOk) && html`<div style="margin-top:12px"><button class="btn sm primary" onClick=${() => verify(sel)} disabled=${!sel.length}>Comprobar</button></div>`}
    ${checked && !isOk && html`<div class="feedback info">
      <div class="feedback-title"><${Icon} name="info" size=${15} /> Revisa tu plan</div>
      ${q.options.map((o, i) => (sel.includes(i) && !o.correct ? html`<div><${Rich} text=${o.why} /></div>` : null))}
      ${q.multi && q.options.some((o, i) => o.correct && !sel.includes(i)) && html`<div>Te falta algún dato que el programa necesita.</div>`}
    </div>`}
    ${checked && isOk && html`<div class="feedback ok"><div class="feedback-title"><${Icon} name="check" size=${15} /> Bien razonado</div>
      <div class="row wrap" style="justify-content:space-between">
        <span class="small">${qi + 1 < activity.plan.length ? 'Siguiente pregunta del plan.' : 'Ya tienes el plan. Lo convertimos en comentarios dentro del editor para guiarte.'}</span>
        <button class="btn sm primary" onClick=${next}>${qi + 1 < activity.plan.length ? 'Continuar' : 'Empezar a programar'} <${Icon} name="arrowRight" size=${14} /></button>
      </div></div>`}
  </div>`;
}

// ===================================================================== Código
// Fases del método. Cada una se marca cuando ocurre de verdad (hitos), no por avanzar con clics:
// Razonar = responder el plan · Planificar = completarlo · Programar = editar · Ejecutar = ejecutar
// o ver paso a paso · Analizar = comprobar · Mejorar = pulir una solución que ya funciona.
const PHASES = ['Comprender', 'Razonar', 'Planificar', 'Programar', 'Ejecutar', 'Analizar', 'Mejorar'];

function PhaseBar({ reached }) {
  const current = [...PHASES].reverse().find((p) => reached.has(p));
  return html`<div class="thinking" aria-label=${`Fases del método. Fase actual: ${current}`}>
    ${PHASES.map((p) => html`<span class=${p === current ? 'on' : reached.has(p) ? 'done' : ''}>
      ${reached.has(p) && p !== current ? '✓ ' : ''}${p}</span>`)}
  </div>`;
}

export function CodeActivity({ activity, onComplete }) {
  const s = getState();
  const rec = s.activities[activity.id] || {};
  const hasPlan = !!activity.plan;
  const [planned, setPlanned] = useState(!hasPlan || !!s.plans[activity.id] || !!s.drafts[activity.id]);
  const [code, setCode] = useState(s.drafts[activity.id] ?? (hasPlan && s.plans[activity.id] && !activity.starter ? activity.planScaffold : activity.starter));
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  // Pistas y solución ya vistas se recuperan del almacén: salir y volver no las oculta ni las «olvida».
  const [revealed, setRevealed] = useState(() => Math.min(currentAttempt(activity.id).hints, activity.hints.length));
  const [solutionShown, setSolutionShown] = useState(() => currentAttempt(activity.id).solution);
  const [tracing, setTracing] = useState(null);
  const [reached, setReached] = useState(() => new Set(['Comprender', ...(s.plans[activity.id] ? ['Razonar', 'Planificar'] : [])]));
  const [passed, setPassed] = useState(false); // superada en esta visita
  const [improving, setImproving] = useState(false); // tenía sugerencias y se está puliendo
  const editorRef = useRef(null);
  const runner = useRunner();
  const mark = (p) => setReached((r) => (r.has(p) ? r : new Set([...r, p])));

  useEffect(() => {
    const t = setTimeout(() => actions.saveDraft(activity.id, code), 400);
    return () => clearTimeout(t);
  }, [code]);

  const run = () => { mark('Ejecutar'); setTracing(null); runner.run(code); };

  const check = async () => {
    setChecking(true);
    mark('Analizar');
    const res = await engine.check(code, activity.spec).catch((e) => ({ status: 'fail', category: 'ejecucion', title: 'Error interno al comprobar', message: e.message, cases: [] }));
    setChecking(false);
    if (res.status === 'pass') {
      if (passed) {
        // Ya estaba superada en esta visita: solo se valora la mejora.
        if (improving && res.category === 'correcto') {
          const xp = actions.improveSolution(activity);
          mark('Mejorar');
          setImproving(false);
          res.title = '¡Solución mejorada!';
          res.message = 'Has aplicado la sugerencia: ahora tu programa no solo funciona, también se entiende mejor.';
          toast({ icon: 'sparkle', title: xp ? `+${xp} XP · Solución mejorada` : 'Solución mejorada', text: activity.title });
        }
      } else {
        setPassed(true);
        const out = actions.activityPass(activity);
        celebrate(activity, out);
        onComplete && onComplete(out);
      }
      if (res.category === 'mejorable') mark('Mejorar');
    } else {
      actions.activityFail(activity, res.category, res.title, { code });
    }
    setResult(res);
  };

  const startImproving = () => {
    setImproving(true);
    const host = editorRef.current;
    if (host) {
      host.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const cm = host.querySelector('.CodeMirror');
      if (cm && cm.CodeMirror) cm.CodeMirror.focus();
    }
  };

  const restore = () => {
    setCode(hasPlan && s.plans[activity.id] && !activity.starter ? activity.planScaffold : activity.starter);
    setResult(null); runner.clear(); setTracing(null);
  };

  const reveal = (lvl) => { setRevealed(lvl); actions.hintUsed(activity.id, lvl); };
  const showSolution = () => { setSolutionShown(true); actions.hintUsed(activity.id, 5, true); };
  const cat = result && CATEGORY[result.category];
  const errLine = (result && result.error && result.error.line) || (runner.error && runner.error.line) || null;

  return html`<div class="stack" style="gap:16px">
    <${ActivityHeader} activity=${activity} />
    ${activity.variant === 'build' && html`<${PhaseBar} reached=${reached} />`}
    <${RepeatNote} activity=${activity} />
    <div class="statement"><${Paragraphs} text=${activity.statement} /></div>
    ${activity.expected && html`<div><div class="small muted" style="margin-bottom:4px">Salida esperada:</div><div class="expected-output">${activity.expected}</div></div>`}
    ${activity.note && html`<div class="small muted"><${Rich} text=${activity.note} /></div>`}

    ${!planned ? html`<${Plan} activity=${activity} onAnswer=${() => mark('Razonar')}
        onDone=${() => { actions.savePlan(activity.id, true); setPlanned(true); mark('Planificar'); if (!code && activity.planScaffold) setCode(activity.planScaffold); }}
        onSkip=${() => setPlanned(true)} />`
      : html`
      <div class="editor-wrap" ref=${editorRef}>
        <div class="editor-toolbar">
          <span class="label"><${Icon} name="code" size=${14} /> solucion.py <span class="tiny hide-mobile">· <kbd>Ctrl</kbd>+<kbd>Intro</kbd> ejecuta</span></span>
          <button class="btn sm" onClick=${restore} title="Restaurar el código inicial"><${Icon} name="rotate" size=${14} /> <span class="hide-mobile">Restaurar</span></button>
          <button class="btn sm" onClick=${() => { setTracing(code); mark('Ejecutar'); }} title="Ejecutar paso a paso"><${Icon} name="footsteps" size=${14} /> <span class="hide-mobile">Paso a paso</span></button>
          <button class="btn sm run" onClick=${run} disabled=${runner.status === 'running'}><${Icon} name="play" size=${14} /> Ejecutar</button>
          <button class="btn sm check" onClick=${check} disabled=${checking}><${Icon} name="check" size=${14} /> ${checking ? 'Comprobando…' : 'Comprobar'}</button>
        </div>
        <${Editor} value=${code} onChange=${(v) => { setCode(v); mark('Programar'); }} onRun=${run} errorLine=${errLine} minLines=${6} label=${`Editor de ${activity.title}`} />
      </div>
      <${EngineLoading} />
      <div class="small muted"><b>Ejecutar</b> prueba tu programa como quieras (si usa input(), la consola te pedirá los datos). <b>Comprobar</b> lo pone a prueba con varios casos, incluidos casos límite.</div>
      ${runner.status !== 'idle' && html`<${Console} runner=${runner} />`}
      ${runner.error && !result && html`<${ErrorCard} error=${runner.error} />`}
      ${tracing && html`<${Tracer} code=${tracing} />`}
      ${result && html`<div class=${`result ${result.status === 'pass' ? 'pass' : cat ? cat.tone : 'fail'}`} role="status">
        <div class="result-title"><${Icon} name=${cat ? cat.icon : 'info'} size=${18} /> ${result.title}
          ${cat && html`<span class=${`tag ${result.status === 'pass' ? 'ok' : result.category === 'sintaxis' || result.category === 'incompleto' ? 'warn' : result.category === 'comprension' ? 'info' : 'err'}`}>${cat.label}</span>`}</div>
        ${result.error ? html`<div style="margin-top:8px"><${ErrorCard} error=${result.error} /></div>` : html`<div>${result.message}</div>`}
        ${result.case && html`<div class="small muted" style="margin-top:6px">Ha fallado en el caso: <b>${result.case}</b></div>`}
        ${result.detail && html`<div class="diff">
          <div><div class="lbl">Se esperaba</div><pre>${result.detail.expected}</pre></div>
          <div><div class="lbl">Tu programa muestra</div><pre>${result.detail.got || '(nada)'}</pre></div>
        </div>`}
        ${result.cases && result.cases.length > 0 && html`<div class="cases" aria-label="Casos de prueba">
          ${result.cases.map((c) => html`<span class=${`case ${c.ok ? 'ok' : 'bad'}`}><${Icon} name=${c.ok ? 'check' : 'x'} size=${12} /> ${c.label}</span>`)}
        </div>`}
        ${result.category === 'mejorable' && html`<div class="improve">
          ${result.suggestions && result.suggestions.length > 1 && html`<ul class="small" style="margin:0 0 10px;padding-left:18px">${result.suggestions.slice(1).map((t) => html`<li>${t}</li>`)}</ul>`}
          ${improving
            ? html`<div class="small"><b>Modo mejora:</b> aplica la sugerencia en el editor y vuelve a pulsar <b>Comprobar</b>. Mejorar una solución que ya funciona también da XP.</div>`
            : html`<button class="btn sm primary" onClick=${startImproving}><${Icon} name="sparkle" size=${14} /> Mejorar mi solución</button>`}
        </div>`}
        ${result.status === 'pass' && html`<details class="more" style="margin-top:14px">
          <summary><span class="chev"><${Icon} name="chevRight" size=${14} /></span> Compara con otra solución posible</summary>
          <div class="more-body"><div class="code-block" style="margin-bottom:8px"><${CodeView} code=${activity.solution.code} /></div><${Rich} text=${activity.solution.explanation} />
          <div class="small muted" style="margin-top:6px">Tu solución no tiene por qué ser igual: hay muchas formas correctas de resolver un problema.</div></div>
        </details>`}
      </div>`}
      ${(!result || result.status !== 'pass') && html`<${Hints} hints=${activity.hints} solution=${activity.solution} lastResult=${result}
        revealed=${revealed} onReveal=${reveal} onSolution=${showSolution} solutionShown=${solutionShown} />`}`}
  </div>`;
}

// ===================================================================== Ordenar
function initialOrder(items) {
  // Orden inicial determinista y nunca correcto: invertido y rotado.
  const ids = items.map((i) => i.id).reverse();
  return [...ids.slice(1), ids[0]];
}

function OrderStage({ stage, activity, onSolved }) {
  const [order, setOrder] = useState(() => initialOrder(stage.items));
  const [verdict, setVerdict] = useState(null);
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(null);
  const runner = useRunner();
  const byId = useMemo(() => Object.fromEntries(stage.items.map((i) => [i.id, i])), [stage]);

  const move = (from, to) => {
    if (to < 0 || to >= order.length || from === to) return;
    const next = [...order];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x);
    setOrder(next);
    setVerdict(null);
  };

  const verify = () => {
    const pos = Object.fromEntries(order.map((id, i) => [id, i]));
    const bad = [];
    order.forEach((id, i) => {
      if (byId[id].after.some((dep) => pos[dep] > i)) bad.push(id);
    });
    if (bad.length) {
      actions.activityFail(activity, 'planificacion', 'Orden de los pasos');
      setVerdict({ ok: false, bad });
    } else {
      setVerdict({ ok: true });
      onSolved();
    }
  };

  return html`<div class="stack" style="gap:12px">
    <h3 style="margin:0">${stage.title}</h3>
    <div class="small muted">Arrastra los elementos o usa las flechas. Piensa en qué necesita cada paso para poder hacerse.</div>
    <ol class="order-list" style="list-style:none;margin:0;padding:0">
      ${order.map((id, i) => {
        const it = byId[id];
        const st = verdict ? (verdict.ok ? 'good' : verdict.bad.includes(id) ? 'bad' : '') : '';
        return html`<li key=${id} class=${`order-item ${st} ${drag === i ? 'dragging' : ''} ${over === i && drag !== i ? 'drop-target' : ''}`}
          draggable=${!(verdict && verdict.ok)}
          onDragStart=${(e) => { setDrag(i); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); }}
          onDragOver=${(e) => { e.preventDefault(); setOver(i); }}
          onDragLeave=${() => setOver(null)}
          onDrop=${(e) => { e.preventDefault(); move(drag, i); setDrag(null); setOver(null); }}
          onDragEnd=${() => { setDrag(null); setOver(null); }}>
          <span class="grip"><${Icon} name="grip" size=${16} /></span>
          <span class="order-num">${i + 1}</span>
          <span class="order-text">${stage.code ? html`<code dangerouslySetInnerHTML=${{ __html: highlight(it.text) }} />` : it.text}</span>
          <span class="order-btns">
            <button onClick=${() => move(i, i - 1)} disabled=${i === 0 || (verdict && verdict.ok)} aria-label=${`Subir «${it.text}»`}><${Icon} name="up" size=${16} /></button>
            <button onClick=${() => move(i, i + 1)} disabled=${i === order.length - 1 || (verdict && verdict.ok)} aria-label=${`Bajar «${it.text}»`}><${Icon} name="down" size=${16} /></button>
          </span>
        </li>`;
      })}
    </ol>
    ${!(verdict && verdict.ok) && html`<div class="row wrap">
      <button class="btn primary" onClick=${verify}><${Icon} name="check" size=${15} /> Comprobar orden</button>
      ${stage.code && html`<button class="btn" onClick=${() => runner.run(order.map((id) => byId[id].text).join('\n'))}><${Icon} name="play" size=${15} /> Probar este orden en Python</button>`}
    </div>`}
    ${verdict && !verdict.ok && html`<div class="feedback info">
      <div class="feedback-title"><${Icon} name="list" size=${15} /> Hay pasos que dependen de otros que van después</div>
      <ul style="margin:4px 0 0;padding-left:20px">${verdict.bad.map((id) => html`<li><${Rich} text=${byId[id].why || 'Este paso necesita algo que se hace más tarde.'} /></li>`)}</ul>
    </div>`}
    ${verdict && verdict.ok && html`<div class="feedback ok"><div class="feedback-title"><${Icon} name="check" size=${15} /> ¡Orden correcto!</div><${Rich} text=${stage.success} /></div>`}
    ${verdict && verdict.ok && stage.code && runner.status === 'idle' && html`<div><button class="btn run" onClick=${() => runner.run(order.map((id) => byId[id].text).join('\n'))}><${Icon} name="play" size=${15} /> Ejecuta tu programa</button></div>`}
    ${runner.status !== 'idle' && html`<${Console} runner=${runner} title="Python real" />`}
    <${ErrorCard} error=${runner.error} compact=${true} />
  </div>`;
}


export function OrderActivity({ activity, onComplete }) {
  const [stage, setStage] = useState(0);
  const [solved, setSolved] = useState([]);
  const done = (i) => {
    const next = [...solved, i];
    setSolved(next);
    if (next.length === activity.stages.length) {
      const res = actions.activityPass(activity);
      celebrate(activity, res);
      onComplete && onComplete(res);
    }
  };
  return html`<div class="stack" style="gap:16px">
    <${ActivityHeader} activity=${activity} />
    <${RepeatNote} activity=${activity} />
    <${Rich} tag="p" className="statement" text=${activity.statement} />
    ${activity.stages.map((st, i) => (i <= stage ? html`<div class="card flat" key=${i}>
      <${OrderStage} stage=${st} activity=${activity} onSolved=${() => done(i)} />
      ${solved.includes(i) && i === stage && i + 1 < activity.stages.length && html`<div style="margin-top:14px">
        <button class="btn primary" onClick=${() => setStage(i + 1)}>Siguiente: traducir a Python <${Icon} name="arrowRight" size=${15} /></button></div>`}
    </div>` : null))}
  </div>`;
}

export function ActivityRunner({ activity, onComplete }) {
  if (activity.type === 'predict') return html`<${PredictActivity} activity=${activity} onComplete=${onComplete} />`;
  if (activity.type === 'order') return html`<${OrderActivity} activity=${activity} onComplete=${onComplete} />`;
  return html`<${CodeActivity} activity=${activity} onComplete=${onComplete} />`;
}
