// Resaltado ligero de Python para fragmentos de solo lectura.
const KW = new Set(['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']);
const BUILTINS = new Set(['print', 'input', 'int', 'float', 'str', 'type', 'len', 'round', 'range', 'list', 'dict', 'abs', 'max', 'min', 'sum', 'bool']);

const TOKEN = /(#.*$)|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?)|(___)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|([+\-*/%=<>!]+)/g;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function highlightLine(line) {
  let out = '';
  let last = 0;
  line.replace(TOKEN, (m, com, str, blank, num, word, op, idx) => {
    out += esc(line.slice(last, idx));
    let cls = null;
    if (com) cls = 'com';
    else if (str) cls = 'str';
    else if (blank) cls = 'blank';
    else if (num) cls = 'num';
    else if (word) cls = KW.has(word) ? 'kw' : BUILTINS.has(word) ? 'fn' : null;
    else if (op) cls = 'op';
    out += cls ? `<span class="tk-${cls}">${esc(m)}</span>` : esc(m);
    last = idx + m.length;
    return m;
  });
  return out + esc(line.slice(last));
}

/** Orden estable pero «aleatorio» de opciones (para que la correcta no sea siempre la primera). */
export function shuffledIndices(n, seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

// Para textos de contenido: `código` en línea → <code>
export function inlineCode(text) {
  return esc(text).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
