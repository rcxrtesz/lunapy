import { html, useEffect, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { CodeView, ErrorCard } from './code.js';
import { engine, newSeed } from '../engine/python.js';
import { EngineLoading } from './common.js';
import { t } from '../lib/i18n.js';

// Visualizador paso a paso. Los pasos proceden de sys.settrace en Python real:
// cada paso es el estado JUSTO ANTES de ejecutar su línea.

function sliceSegs(segs, n) {
  const out = [];
  let left = n;
  for (const [k, s] of segs) {
    if (left <= 0) break;
    out.push([k, s.slice(0, left)]);
    left -= s.length;
  }
  return out;
}

const varsOf = (step) => {
  const m = new Map();
  (step?.frames || []).forEach((f) => f.vars.forEach((v) => m.set(`${f.name}:${v.name}`, v)));
  return m;
};

function narrate(steps, i, code) {
  const lines = code.split('\n');
  const step = steps[i];
  const parts = [];
  if (!step) return '';
  if (i === 0) {
    parts.push(step.end ? t('El programa no tiene instrucciones que ejecutar.', 'The program has no instructions to run.') : t(`El programa está a punto de empezar. Pulsa <b>Siguiente</b> para ejecutar la línea ${step.line}.`, `The program is about to start. Press <b>Next</b> to run line ${step.line}.`));
    return parts.join(' ');
  }
  const prev = steps[i - 1];
  parts.push(`${t('Python ha ejecutado la línea', 'Python ran line')} ${prev.line}: <code>${esc(lines[prev.line - 1]?.trim() || '')}</code>.`);
  const before = varsOf(prev);
  const after = varsOf(step);
  after.forEach((v, key) => {
    const b = before.get(key);
    if (!b) parts.push(t(`Se crea <b>${esc(v.name)}</b> con el valor <code>${esc(v.repr)}</code> (${v.type}).`, `<b>${esc(v.name)}</b> is created with the value <code>${esc(v.repr)}</code> (${v.type}).`));
    else if (b.repr !== v.repr) parts.push(t(`<b>${esc(v.name)}</b> cambia de <code>${esc(b.repr)}</code> a <code>${esc(v.repr)}</code>.`, `<b>${esc(v.name)}</b> changes from <code>${esc(b.repr)}</code> to <code>${esc(v.repr)}</code>.`));
  });
  if (step.out > prev.out) parts.push(t('Ha aparecido texto nuevo en la consola.', 'New text has appeared in the console.'));
  if (step.error) parts.push(`<span style="color:var(--err)">${t('Python se detiene', 'Python stops')}: ${esc(step.error.title)}.</span>`);
  else if (step.end) parts.push(t('<b>El programa ha terminado.</b>', '<b>The program has finished.</b>'));
  else parts.push(`${t('Siguiente: línea', 'Next: line')} ${step.line}.`);
  return parts.join(' ');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function Tracer({ code, autoStart = true, onFinish }) {
  const [data, setData] = useState(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [stdin, setStdin] = useState([]);
  const [val, setVal] = useState('');
  const seed = useRef(newSeed());
  const finished = useRef(false);

  const load = async (input) => {
    const res = await engine.trace(code, input, seed.current);
    setData(res);
    return res;
  };

  useEffect(() => {
    if (!autoStart) return;
    finished.current = false;
    setI(0); setStdin([]); seed.current = newSeed();
    load([]);
  }, [code]);

  useEffect(() => {
    if (!playing || !data) return undefined;
    if (i >= data.steps.length - 1) { setPlaying(false); return undefined; }
    const t = setTimeout(() => setI((x) => x + 1), 900);
    return () => clearTimeout(t);
  }, [playing, i, data]);

  useEffect(() => {
    if (data && i === data.steps.length - 1 && data.status !== 'need_input' && !finished.current) {
      finished.current = true;
      onFinish && onFinish();
    }
  }, [i, data]);

  if (!data) return html`<div class="card flat"><${EngineLoading} />${engine.state === 'ready' && html`<div class="loading-line"><span class="spinner" /> ${t('Preparando la visualización…', 'Preparing the visualisation…')}</div>`}</div>`;

  const steps = data.steps || [];
  // Sin pasos (p. ej. se agotó el tiempo dentro de una operación muy larga): no hay nada que recorrer.
  if (!steps.length) {
    return html`<div class="stack" style="gap:12px">
      ${data.error ? html`<${ErrorCard} error=${data.error} />`
        : html`<div class="callout warn"><span class="callout-icon"><${Icon} name="alert" /></span><div>${t('No se ha podido visualizar este programa.', 'This program could not be visualised.')}</div></div>`}
      <div class="small muted">${t('El visualizador solo puede mostrar los pasos de programas que terminan en unos segundos. Prueba con números más pequeños para ver cómo funciona paso a paso.', 'The visualiser can only show the steps of programs that finish within a few seconds. Try smaller numbers to see how it works step by step.')}</div>
    </div>`;
  }
  const step = steps[i] || steps[steps.length - 1];
  const last = steps.length - 1;
  const atEnd = i === last;
  const needInput = atEnd && data.status === 'need_input';
  const prevVars = varsOf(steps[i - 1]);
  const segs = sliceSegs(data.segs || [], step?.out || 0);

  const sendInput = async (e) => {
    e.preventDefault();
    const next = [...stdin, val];
    setStdin(next); setVal('');
    await load(next);
    setI((x) => x + 1);
  };

  const onKey = (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); setI((x) => Math.min(last, x + 1)); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
  };

  return html`<div class="stack" style="gap:12px" onKeyDown=${onKey}>
    <div class="tracer">
      <div class="code-block">
        <div class="code-block-head"><${Icon} name="footsteps" size=${14} /> ${t('Ejecución paso a paso', 'Step-by-step execution')} <span class="spacer" />
          <span class="tiny">${t('← → para moverte', '← → to move')}</span></div>
        <${CodeView} code=${code} next=${step && !step.end && !step.error ? step.line : null}
          prev=${i > 0 ? steps[i - 1].line : null} errLine=${step && step.error ? step.error.line : null} />
        <div class="tracer-controls" role="toolbar" aria-label=${t('Controles del visualizador', 'Visualiser controls')}>
          <button class="btn sm" onClick=${() => { setI(0); setPlaying(false); }} disabled=${i === 0} title=${t('Reiniciar', 'Restart')} aria-label=${t('Reiniciar', 'Restart')}><${Icon} name="skipBack" size=${15} /></button>
          <button class="btn sm" onClick=${() => setI(Math.max(0, i - 1))} disabled=${i === 0} aria-label=${t('Paso anterior', 'Previous step')}><${Icon} name="stepBack" size=${15} /> ${t('Atrás', 'Back')}</button>
          <button class="btn sm primary" onClick=${() => setI(Math.min(last, i + 1))} disabled=${atEnd} aria-label=${t('Paso siguiente', 'Next step')}>${t('Siguiente', 'Next')} <${Icon} name="stepFwd" size=${15} /></button>
          <button class="btn sm" onClick=${() => { if (atEnd) setI(0); setPlaying(!playing); }} aria-label=${playing ? t('Pausar', 'Pause') : t('Reproducir', 'Play')}>
            <${Icon} name=${playing ? 'x' : 'play'} size=${14} /> ${playing ? t('Pausa', 'Pause') : 'Auto'}</button>
          <input type="range" min="0" max=${last} value=${i} onInput=${(e) => setI(Number(e.target.value))} aria-label=${t('Posición en la ejecución', 'Position in the execution')} />
          <span class="step-count">${t(`Paso ${i} de ${last}`, `Step ${i} of ${last}`)}</span>
        </div>
      </div>
      <div class="tracer-side">
        <div class="memory">
          <div class="memory-head"><${Icon} name="layers" size=${14} /> ${t('Memoria (variables)', 'Memory (variables)')}</div>
          <div class="memory-body">
            ${(step?.frames || []).map((f) => html`
              ${(step.frames.length > 1) && html`<div class="memory-frame-name">${f.name}</div>`}
              ${f.vars.length === 0 ? html`<span class="faint small">${t('Todavía no hay variables.', 'No variables yet.')}</span>`
                : f.vars.map((v) => {
                  const b = prevVars.get(`${f.name}:${v.name}`);
                  const cls = !b && i > 0 ? 'new' : b && b.repr !== v.repr ? 'changed' : '';
                  return html`<div class=${`var-row ${cls}`} key=${v.name}>
                    <span class="mem-name">${v.name}</span><span class="mem-arrow">→</span>
                    <span class="mem-value">${v.repr}</span><span class="mem-type">${v.type}</span>
                  </div>`;
                })}`)}
          </div>
        </div>
        <div class="console">
          <div class="console-head"><${Icon} name="terminal" size=${14} /> ${t('Consola', 'Console')}</div>
          <div class="console-body">${segs.length ? segs.map(([k, s]) => html`<span class=${`seg-${k}`}>${s}</span>`) : html`<span class="placeholder">${t('(sin salida todavía)', '(no output yet)')}</span>`}</div>
          ${needInput && html`<form class="console-input" onSubmit=${sendInput}>
            <input value=${val} onInput=${(e) => setVal(e.target.value)} placeholder=${data.prompt || t('Escribe un dato', 'Type a value')} aria-label=${t('Dato para input()', 'Value for input()')} autofocus />
            <button class="btn sm" type="submit">${t('Enviar', 'Send')}</button></form>`}
        </div>
      </div>
    </div>
    <div class="narration" aria-live="polite" dangerouslySetInnerHTML=${{ __html: needInput ? t('El programa ha llegado a <code>input()</code> y espera que escribas un dato en la consola.', 'The program has reached <code>input()</code> and is waiting for you to type a value in the console.') : narrate(steps, i, code) }} />
    ${data.status === 'trace_limit' && atEnd && html`<div class="callout warn"><span class="callout-icon"><${Icon} name="alert" /></span><div>${t(`El programa tiene más de ${data.limit} pasos: mostramos solo los primeros. ¿Hay un bucle que no termina?`, `The program has more than ${data.limit} steps: only the first ones are shown. Is there a loop that never ends?`)}</div></div>`}
    ${step && step.error && html`<${ErrorCard} error=${step.error} />`}
  </div>`;
}
