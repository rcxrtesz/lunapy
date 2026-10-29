import { html, useEffect, useRef, useState } from '../lib/ui.js';
import { Icon } from '../lib/icons.js';
import { CodeView, ErrorCard } from './code.js';
import { engine, newSeed } from '../engine/python.js';
import { EngineLoading } from './common.js';

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
    parts.push(step.end ? 'El programa no tiene instrucciones que ejecutar.' : `El programa está a punto de empezar. Pulsa <b>Siguiente</b> para ejecutar la línea ${step.line}.`);
    return parts.join(' ');
  }
  const prev = steps[i - 1];
  parts.push(`Python ha ejecutado la línea ${prev.line}: <code>${esc(lines[prev.line - 1]?.trim() || '')}</code>.`);
  const before = varsOf(prev);
  const after = varsOf(step);
  after.forEach((v, key) => {
    const b = before.get(key);
    if (!b) parts.push(`Se crea <b>${esc(v.name)}</b> con el valor <code>${esc(v.repr)}</code> (${v.type}).`);
    else if (b.repr !== v.repr) parts.push(`<b>${esc(v.name)}</b> cambia de <code>${esc(b.repr)}</code> a <code>${esc(v.repr)}</code>.`);
  });
  if (step.out > prev.out) parts.push('Ha aparecido texto nuevo en la consola.');
  if (step.error) parts.push(`<span style="color:var(--err)">Python se detiene: ${esc(step.error.title)}.</span>`);
  else if (step.end) parts.push('<b>El programa ha terminado.</b>');
  else parts.push(`Siguiente: línea ${step.line}.`);
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

  if (!data) return html`<div class="card flat"><${EngineLoading} />${engine.state === 'ready' && html`<div class="loading-line"><span class="spinner" /> Preparando la visualización…</div>`}</div>`;

  const steps = data.steps || [];
  // Sin pasos (p. ej. se agotó el tiempo dentro de una operación muy larga): no hay nada que recorrer.
  if (!steps.length) {
    return html`<div class="stack" style="gap:12px">
      ${data.error ? html`<${ErrorCard} error=${data.error} />`
        : html`<div class="callout warn"><span class="callout-icon"><${Icon} name="alert" /></span><div>No se ha podido visualizar este programa.</div></div>`}
      <div class="small muted">El visualizador solo puede mostrar los pasos de programas que terminan en unos segundos.
        Prueba con números más pequeños para ver cómo funciona paso a paso.</div>
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
        <div class="code-block-head"><${Icon} name="footsteps" size=${14} /> Ejecución paso a paso <span class="spacer" />
          <span class="tiny">← → para moverte</span></div>
        <${CodeView} code=${code} next=${step && !step.end && !step.error ? step.line : null}
          prev=${i > 0 ? steps[i - 1].line : null} errLine=${step && step.error ? step.error.line : null} />
        <div class="tracer-controls" role="toolbar" aria-label="Controles del visualizador">
          <button class="btn sm" onClick=${() => { setI(0); setPlaying(false); }} disabled=${i === 0} title="Reiniciar" aria-label="Reiniciar"><${Icon} name="skipBack" size=${15} /></button>
          <button class="btn sm" onClick=${() => setI(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Paso anterior"><${Icon} name="stepBack" size=${15} /> Atrás</button>
          <button class="btn sm primary" onClick=${() => setI(Math.min(last, i + 1))} disabled=${atEnd} aria-label="Paso siguiente">Siguiente <${Icon} name="stepFwd" size=${15} /></button>
          <button class="btn sm" onClick=${() => { if (atEnd) setI(0); setPlaying(!playing); }} aria-label=${playing ? 'Pausar' : 'Reproducir'}>
            <${Icon} name=${playing ? 'x' : 'play'} size=${14} /> ${playing ? 'Pausa' : 'Auto'}</button>
          <input type="range" min="0" max=${last} value=${i} onInput=${(e) => setI(Number(e.target.value))} aria-label="Posición en la ejecución" />
          <span class="step-count">Paso ${i} de ${last}</span>
        </div>
      </div>
      <div class="tracer-side">
        <div class="memory">
          <div class="memory-head"><${Icon} name="layers" size=${14} /> Memoria (variables)</div>
          <div class="memory-body">
            ${(step?.frames || []).map((f) => html`
              ${(step.frames.length > 1) && html`<div class="memory-frame-name">${f.name}</div>`}
              ${f.vars.length === 0 ? html`<span class="faint small">Todavía no hay variables.</span>`
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
          <div class="console-head"><${Icon} name="terminal" size=${14} /> Consola</div>
          <div class="console-body">${segs.length ? segs.map(([k, s]) => html`<span class=${`seg-${k}`}>${s}</span>`) : html`<span class="placeholder">(sin salida todavía)</span>`}</div>
          ${needInput && html`<form class="console-input" onSubmit=${sendInput}>
            <input value=${val} onInput=${(e) => setVal(e.target.value)} placeholder=${data.prompt || 'Escribe un dato'} aria-label="Dato para input()" autofocus />
            <button class="btn sm" type="submit">Enviar</button></form>`}
        </div>
      </div>
    </div>
    <div class="narration" aria-live="polite" dangerouslySetInnerHTML=${{ __html: needInput ? `El programa ha llegado a <code>input()</code> y espera que escribas un dato en la consola.` : narrate(steps, i, code) }} />
    ${data.status === 'trace_limit' && atEnd && html`<div class="callout warn"><span class="callout-icon"><${Icon} name="alert" /></span><div>El programa tiene más de ${data.limit} pasos: mostramos solo los primeros. ¿Hay un bucle que no termina?</div></div>`}
    ${step && step.error && html`<${ErrorCard} error=${step.error} />`}
  </div>`;
}
