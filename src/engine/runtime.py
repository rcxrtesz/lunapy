"""
Motor de ejecución de LunaPy.

Se carga dentro de Pyodide (en un Web Worker) y también puede importarse con
CPython para las pruebas automáticas (tests/test_runtime.py). No depende de
ningún módulo propio de Pyodide.

Funciones públicas (reciben y devuelven JSON):
    api_run(payload)    -> ejecuta código con soporte de input()
    api_trace(payload)  -> ejecuta registrando cada paso (línea, variables, salida)
    api_check(payload)  -> valida una solución contra la especificación del ejercicio
"""

import ast
import builtins
import difflib
import io
import json
import keyword
import random
import re
import sys

USER_FILE = "<alumno>"
MAX_OUT = 20000
MAX_TRACE_STEPS = 400
BLOCKED_MODULES = {"js", "pyodide", "pyodide_js", "_pyodide", "micropip", "pyodide_http"}

TYPE_ES = {
    "int": "número entero (int)",
    "float": "número decimal (float)",
    "str": "texto (str)",
    "bool": "booleano (bool)",
    "NoneType": "None",
    "list": "lista (list)",
    "dict": "diccionario (dict)",
    "tuple": "tupla (tuple)",
}


def tipo_es(name):
    return TYPE_ES.get(name, name)


# ---------------------------------------------------------------------------
# Ejecución
# ---------------------------------------------------------------------------

class NeedInput(Exception):
    def __init__(self, prompt):
        super().__init__(prompt)
        self.prompt = prompt


class OutputLimit(Exception):
    pass


class TraceLimit(Exception):
    pass


class Transcript:
    """Guarda lo que vería el alumno en la consola, separado por tipo."""

    def __init__(self):
        self.segs = []
        self.size = 0

    def add(self, kind, s):
        if not s:
            return
        if kind != "in":  # lo que escribe el usuario no cuenta como salida del programa
            self.size += len(s)
        if self.size > MAX_OUT:
            raise OutputLimit()
        if self.segs and self.segs[-1][0] == kind:
            self.segs[-1][1] += s
        else:
            self.segs.append([kind, s])


class _Writer(io.TextIOBase):
    def __init__(self, transcript, kind, sink=None):
        self.transcript = transcript
        self.kind = kind
        self.sink = sink

    def writable(self):
        return True

    def write(self, s):
        s = str(s)
        self.transcript.add(self.kind, s)
        if self.sink is not None:
            self.sink.append(s)
        return len(s)


# ---------------------------------------------------------------------------
# Protección del entorno
# ---------------------------------------------------------------------------
# El código del alumno comparte intérprete con el motor. Tras cada ejecución se
# deshace lo que haya podido modificar: builtins, módulos que ha importado y las
# propias funciones del motor (validador incluido). Es una defensa frente a
# errores y trampas sencillas, no una frontera de seguridad: un resultado que
# deba contar para una evaluación tiene que revalidarse en el servidor.

_PRISTINE_BUILTINS = dict(vars(builtins))
_RECURSION_LIMIT = sys.getrecursionlimit()
_MODULE_SNAPSHOTS = {}  # nombre → (módulo, copia de su __dict__ antes de que el alumno lo tocara)
_ENGINE_SNAPSHOT = {}  # se rellena al final del archivo


def _remember_module(mod):
    name = getattr(mod, "__name__", None)
    if isinstance(mod, type(sys)) and isinstance(name, str) and name != "sys" and name not in _MODULE_SNAPSHOTS:
        _MODULE_SNAPSHOTS[name] = (mod, dict(vars(mod)))


for _mod in (builtins, json, re, ast, difflib, keyword, random, io):
    _remember_module(_mod)


def _safe_import(name, globals=None, locals=None, fromlist=(), level=0):
    if _is_blocked(name):
        raise ImportError(f"El módulo '{name}' no está disponible en este entorno de aprendizaje.")
    mod = _PRISTINE_BUILTINS["__import__"](name, globals, locals, fromlist, level)
    parts = name.split(".")
    for i in range(1, len(parts) + 1):
        _remember_module(sys.modules.get(".".join(parts[:i])))
    for attr in fromlist or ():
        _remember_module(getattr(mod, attr, None))
    return mod


def _is_blocked(name):
    return name.split(".")[0] in BLOCKED_MODULES


class _BlockFinder:
    """Impide importar módulos bloqueados por cualquier vía (importlib, builtins.__import__…)."""

    @staticmethod
    def find_spec(name, path=None, target=None):
        if _is_blocked(name):
            raise ImportError(f"El módulo '{name}' no está disponible en este entorno de aprendizaje.")
        return None


_BLOCK_FINDER = _BlockFinder()


def _hide_blocked_modules():
    """Retira de sys.modules los módulos bloqueados mientras se ejecuta el código del alumno."""
    hidden = {k: sys.modules.pop(k) for k in [k for k in sys.modules if _is_blocked(k)]}
    sys.meta_path.insert(0, _BLOCK_FINDER)
    return hidden


def _unhide_blocked_modules(hidden):
    while _BLOCK_FINDER in sys.meta_path:
        sys.meta_path.remove(_BLOCK_FINDER)
    sys.modules.update(hidden)


def _restore_environment(builtin_keys_before):
    """Deshace los cambios del alumno. Devuelve True si había modificado el propio motor."""
    bd = vars(builtins)
    for k in [k for k in bd if k not in builtin_keys_before and k not in _PRISTINE_BUILTINS]:
        del bd[k]
    for k, v in _PRISTINE_BUILTINS.items():
        if bd.get(k) is not v:
            bd[k] = v
    for name, (mod, snap) in _MODULE_SNAPSHOTS.items():
        d = vars(mod)
        for k in [k for k in d if k not in snap]:
            del d[k]
        for k, v in snap.items():
            if d.get(k) is not v:
                d[k] = v
        sys.modules[name] = mod
    sys.setrecursionlimit(_RECURSION_LIMIT)

    tampered = False
    g = globals()
    for k, v in _ENGINE_SNAPSHOT.items():
        if g.get(k) is not v:
            g[k] = v
            tampered = True
    if _ENGINE_SNAPSHOT:
        for k in [k for k in g if not k.startswith("__") and k not in _ENGINE_SNAPSHOT]:
            del g[k]
            tampered = True
    return tampered


TAMPER_RESULT = {
    "status": "fail", "category": "manipulacion", "title": "No se ha podido validar",
    "message": "Tu programa ha modificado el funcionamiento interno de LunaPy (por ejemplo, el validador o las funciones de Python). "
               "Lo hemos restablecido. Vuelve a comprobar tu solución sin esas modificaciones.",
    "cases": [], "tampered": True,
}


def execute(code, stdin=(), interactive=False, seed=None, tracer=None, _restore=_restore_environment):
    """Ejecuta el código del alumno en un espacio de nombres limpio."""
    transcript = Transcript()
    printed = []  # solo lo que el programa escribe con print (sin los textos de input)
    queue = [str(v) for v in stdin]

    def _input(prompt=""):
        prompt = str(prompt)
        transcript.add("out", prompt)
        if not queue:
            if interactive:
                raise NeedInput(prompt)
            raise EOFError("__sin_datos__")
        value = queue.pop(0)
        # Eco del dato en la consola (recortado si es enorme; el programa recibe el dato completo).
        echo = value if len(value) <= 2000 else value[:2000] + f"… (+{len(value) - 2000} caracteres)"
        transcript.add("in", echo + "\n")
        return value

    user_builtins = dict(_PRISTINE_BUILTINS)
    user_builtins["input"] = _input
    user_builtins["__import__"] = _safe_import
    ns = {"__name__": "__main__", "__builtins__": user_builtins}

    result = {"status": "ok", "error": None, "prompt": None, "ns": ns, "printed": "", "tampered": False}

    try:
        compiled = compile(code, USER_FILE, "exec")
    except SyntaxError as exc:  # incluye IndentationError
        result["status"] = "error"
        result["error"] = explain(exc, code, [])
        result["segs"] = transcript.segs
        return result

    random.seed(seed)
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = _Writer(transcript, "out", printed)
    sys.stderr = _Writer(transcript, "err")
    old_trace = sys.gettrace()
    builtin_keys_before = set(vars(builtins))
    caught = None
    hidden = _hide_blocked_modules()
    try:
        if tracer is not None:
            sys.settrace(tracer)
        exec(compiled, ns)
    except NeedInput as exc:
        result["status"] = "need_input"
        result["prompt"] = exc.prompt
    except SystemExit:
        pass
    except TraceLimit:
        result["status"] = "trace_limit"
    except BaseException as exc:  # noqa: BLE001 - queremos explicar cualquier error del alumno
        caught = exc
    finally:
        sys.settrace(old_trace)
        sys.stdout, sys.stderr = old_out, old_err
        _unhide_blocked_modules(hidden)
        # Primero se restaura el entorno: la explicación del error usa funciones que el alumno pudo alterar.
        result["tampered"] = _restore(builtin_keys_before)

    if isinstance(caught, OutputLimit):
        result["status"] = "error"
        result["error"] = {
            "type": "OutputLimit", "kind": "ejecucion", "line": None, "code_line": "",
            "title": "Demasiada salida",
            "explanation": f"El programa ha escrito más de {MAX_OUT} caracteres y lo hemos detenido.",
            "suggestion": "¿Hay un bucle que no termina o un print dentro de un bucle muy largo?",
            "original": "",
        }
    elif caught is not None:
        result["status"] = "error"
        names = [k for k in ns if not k.startswith("__")]
        result["error"] = explain(caught, code, names)

    result["segs"] = transcript.segs
    result["printed"] = "".join(printed)
    return result


# ---------------------------------------------------------------------------
# Explicación de errores en español
# ---------------------------------------------------------------------------

def _find_line(exc):
    if isinstance(exc, SyntaxError):
        return exc.lineno
    line = None
    tb = exc.__traceback__
    while tb is not None:
        if tb.tb_frame.f_code.co_filename == USER_FILE:
            line = tb.tb_lineno
        tb = tb.tb_next
    return line


def explain(exc, code, names):
    etype = type(exc).__name__
    msg = (exc.msg or "") if isinstance(exc, SyntaxError) else str(exc)
    low = msg.lower()
    line = _find_line(exc)
    lines = code.splitlines()
    code_line = lines[line - 1] if line and 0 < line <= len(lines) else ""
    kind = "sintaxis" if isinstance(exc, SyntaxError) else "ejecucion"
    title, expl, sug = "", "", ""

    if isinstance(exc, IndentationError):
        title = "Problema de sangría"
        if "unexpected indent" in low:
            expl = "Esta línea empieza con espacios que Python no esperaba. En Python la sangría tiene significado: solo se sangra dentro de un bloque (por ejemplo, tras una línea que acaba en «:»)."
            sug = "Borra los espacios del principio de la línea."
        elif "expected an indented block" in low:
            expl = "Después de una línea que termina en «:» Python necesita al menos una línea sangrada (con 4 espacios)."
            sug = "Añade 4 espacios al principio de la línea siguiente."
        else:
            expl = "La sangría (los espacios al principio de la línea) no encaja con las líneas de alrededor."
            sug = "Usa siempre 4 espacios por nivel y no mezcles tabuladores con espacios."
    elif isinstance(exc, SyntaxError):
        title = "Python no entiende cómo está escrita esta línea"
        stripped = code_line.strip()
        first = re.match(r"\s*([A-Za-z_]\w*)", code_line)
        if "unterminated string" in low or "eol while scanning" in low:
            title = "Texto sin cerrar"
            expl = "Has abierto unas comillas pero no las has cerrado. Todo texto (str) tiene que empezar y terminar con el mismo tipo de comillas."
            sug = 'Revisa la línea y comprueba que cada " o \' tiene su pareja, por ejemplo: "Hola".'
        elif "was never closed" in low:
            title = "Paréntesis sin cerrar"
            expl = "Has abierto un paréntesis «(» que no se cierra."
            sug = "Cuenta los paréntesis: debe haber tantos «(» como «)»."
        elif "unmatched" in low:
            title = "Paréntesis de más"
            expl = "Hay un paréntesis de cierre «)» que no tiene su pareja de apertura."
            sug = "Busca el paréntesis que sobra o el que falta al principio."
        elif "missing parentheses in call to 'print'" in low:
            title = "A print le faltan los paréntesis"
            expl = "En Python 3, print es una función: lo que quieres mostrar va entre paréntesis."
            sug = 'Escribe print("Hola") en lugar de print "Hola".'
        elif "cannot assign to literal" in low or "cannot assign to expression" in low or "cannot assign to function call" in low:
            title = "La asignación está al revés"
            expl = "A la izquierda del signo = debe ir siempre el NOMBRE de una variable, y a la derecha el valor. «=» no es una igualdad matemática: significa «guarda este valor con este nombre»."
            sug = "Escribe primero el nombre: edad = 18 (y no 18 = edad)."
        elif "invalid decimal literal" in low or (first is None and re.match(r"\s*\d+[A-Za-z_]", code_line)):
            title = "Nombre que empieza por un número"
            expl = "Los nombres de variable no pueden empezar por un número."
            sug = "Pon el número al final o usa una palabra: edad2 o segunda_edad."
        elif "invalid character" in low:
            title = "Carácter no válido"
            expl = "Hay un carácter que Python no reconoce. Suele pasar al copiar código con comillas tipográficas (“ ” ‘ ’) en lugar de comillas rectas (\" ')."
            sug = "Vuelve a escribir las comillas desde el teclado."
        elif "expected ':'" in low:
            title = "Faltan los dos puntos"
            expl = "Las líneas que abren un bloque (if, for, while, def…) deben terminar con «:»."
            sug = "Añade «:» al final de la línea."
        elif "forgot a comma" in low:
            title = "Puede que falte una coma"
            expl = "Python encuentra dos valores seguidos sin nada que los separe."
            sug = 'Si quieres mostrar varias cosas con print, sepáralas con comas: print("Edad:", edad).'
        elif re.match(r"^\s*[A-Za-z_]\w*\s+[A-Za-z_]\w*\s*=(?!=)", code_line):
            title = "Nombre de variable con espacios"
            expl = "Un nombre de variable es una sola palabra: no puede contener espacios."
            sug = "Une las palabras con guion bajo: mi_edad = 18."
        elif first and keyword.iskeyword(first.group(1)) and re.match(r"^\s*\w+\s*=(?!=)", code_line):
            title = "Palabra reservada"
            expl = f"«{first.group(1)}» es una palabra reservada de Python y no puede usarse como nombre de variable."
            sug = "Elige otro nombre, por ejemplo añadiendo un sufijo: clase_1."
        else:
            expl = "La línea no sigue las reglas de escritura (sintaxis) de Python. Es como una frase con la puntuación rota: Python ni siquiera empieza a ejecutar el programa."
            sug = "Revisa comillas, paréntesis, comas y el signo «=» en esa línea (o en la anterior)."
        if not stripped and line and line > 1:
            sug += " El problema puede estar en la línea anterior."
    elif isinstance(exc, NameError):
        m = re.search(r"name '(\w+)' is not defined", msg)
        name = m.group(1) if m else "?"
        title = f"Python no conoce el nombre «{name}»"
        expl = f"Estás usando «{name}», pero en ese momento no existe ninguna variable (ni función) con ese nombre."
        candidates = list(names) + ["print", "input", "int", "float", "str", "len", "type", "round"]
        close = difflib.get_close_matches(name, candidates, n=1, cutoff=0.6)
        close_ci = [c for c in candidates if c.lower() == name.lower() and c != name]
        if close_ci:
            sug = f"Python distingue mayúsculas y minúsculas: ¿querías escribir «{close_ci[0]}»?"
        elif close:
            sug = f"¿Querías escribir «{close[0]}»? Comprueba que el nombre esté escrito exactamente igual que cuando lo creaste."
        else:
            sug = "Comprueba tres cosas: 1) que está bien escrito, 2) que le has asignado un valor ANTES de usarlo, 3) si querías un texto, ponlo entre comillas."
    elif isinstance(exc, TypeError):
        title = "Tipos de datos incompatibles"
        m_concat = re.search(r'can only concatenate str \(not "(\w+)"\) to str', msg)
        m_op = re.search(r"unsupported operand type\(s\) for (\S+): '(\w+)' and '(\w+)'", msg)
        m_mul = re.search(r"can't multiply sequence by non-int of type '(\w+)'", msg)
        if m_concat:
            t = m_concat.group(1)
            title = "Mezcla de texto y números"
            expl = f"Estás intentando unir con + un texto (str) y un {tipo_es(t)}. Con + Python puede sumar números o pegar textos, pero no mezclar ambos."
            sug = 'Convierte el número a texto con str(), o deja que print los separe con comas: print("Tienes", edad, "años").'
        elif m_op:
            op, a, b = m_op.groups()
            title = "Operación entre tipos incompatibles"
            expl = f"No se puede usar «{op}» entre un {tipo_es(a)} y un {tipo_es(b)}."
            if "str" in (a, b):
                sug = "Si el valor viene de input(), recuerda que input() SIEMPRE devuelve texto: conviértelo con int() o float() antes de operar."
            else:
                sug = "Comprueba qué tipo de dato tiene cada variable (puedes usar type())."
        elif m_mul:
            title = "Multiplicación con texto"
            expl = f"Estás multiplicando un texto por un {tipo_es(m_mul.group(1))}. Seguramente uno de los valores es un número guardado como texto."
            sug = "input() siempre devuelve texto: usa float(input(...)) o int(input(...)) para obtener un número."
        elif "object is not callable" in low:
            t = re.search(r"'(\w+)' object is not callable", msg)
            title = "Se está usando un valor como si fuera una función"
            expl = f"Has puesto paréntesis detrás de algo que es un {tipo_es(t.group(1)) if t else 'valor'}, no una función."
            sug = "¿Has creado una variable llamada como una función (por ejemplo print = 5)? Cámbiale el nombre y vuelve a ejecutar."
        else:
            expl = "Una operación ha recibido un tipo de dato que no puede usar."
            sug = "Comprueba el tipo de cada valor con type()."
    elif isinstance(exc, ValueError):
        m_int = re.search(r"invalid literal for int\(\) with base 10: '(.*)'", msg)
        m_float = re.search(r"could not convert string to float: '(.*)'", msg)
        if m_int:
            val = m_int.group(1)
            title = "No se puede convertir a número entero"
            expl = f"int() no puede convertir el texto «{val}» en un número entero."
            if re.fullmatch(r"-?\d+[.,]\d+", val.strip()):
                sug = "Ese valor tiene decimales: usa float() en lugar de int()."
            elif re.fullmatch(r"-?\d+,\d+", val.strip()):
                sug = "Python usa punto decimal, no coma."
            else:
                sug = "Comprueba que el dato introducido sea realmente un número."
        elif m_float:
            val = m_float.group(1)
            title = "No se puede convertir a número decimal"
            expl = f"float() no puede convertir el texto «{val}» en un número."
            sug = "Python usa punto como separador decimal (3.5, no 3,5)." if "," in val else "Comprueba que el dato introducido sea un número."
        else:
            title = "Valor no válido"
            expl = "Una función ha recibido un valor del tipo correcto pero con un contenido que no puede usar."
            sug = "Revisa el valor que se pasa en esa línea."
    elif isinstance(exc, ZeroDivisionError):
        title = "División entre cero"
        expl = "Has dividido un número entre 0, algo que no tiene resultado."
        sug = "Comprueba el valor del divisor antes de dividir."
    elif isinstance(exc, EOFError):
        title = "El programa pide más datos de los previstos"
        expl = "El programa ha llamado a input() más veces de las que el ejercicio proporciona datos."
        sug = "Relee el enunciado: ¿cuántos datos tienes que pedir?"
    elif isinstance(exc, RecursionError):
        title = "Demasiadas llamadas encadenadas"
        expl = "Una función se llama a sí misma sin parar."
        sug = "Comprueba que la recursión tiene un caso base que la detenga."
    elif isinstance(exc, ImportError):
        title = "Módulo no disponible"
        expl = msg
        sug = "En este entorno puedes usar la biblioteca estándar de Python (math, random…)."
    else:
        title = f"Error de ejecución ({etype})"
        expl = "El programa se ha detenido por un error mientras se ejecutaba."
        sug = "Lee el mensaje original de Python: suele indicar la causa."

    original = f"{etype}: {msg}" if msg != "__sin_datos__" else f"{etype}: EOF when reading a line"
    return {
        "type": etype,
        "kind": kind,
        "line": line,
        "code_line": code_line,
        "title": title,
        "explanation": expl,
        "suggestion": sug,
        "original": original,
    }


# ---------------------------------------------------------------------------
# Traza paso a paso
# ---------------------------------------------------------------------------

def _safe_repr(v, limit=80):
    try:
        if callable(v) and hasattr(v, "__name__"):
            return f"<función {v.__name__}>"
        r = repr(v)
    except Exception:  # noqa: BLE001
        r = "<valor>"
    return r if len(r) <= limit else r[: limit - 1] + "…"


def _snapshot(mapping):
    out = []
    for k, v in mapping.items():
        if k.startswith("__") or type(v).__name__ == "module":
            continue
        out.append({"name": k, "type": type(v).__name__, "repr": _safe_repr(v)})
    return out


def trace(code, stdin=(), seed=None):
    steps = []

    def frames_of(frame):
        stack = []
        f = frame
        while f is not None and f.f_code.co_filename == USER_FILE:
            name = f.f_code.co_name
            stack.append({
                "name": "Programa principal" if name == "<module>" else f"{name}()",
                "vars": _snapshot(f.f_globals if name == "<module>" else f.f_locals),
            })
            f = f.f_back
        stack.reverse()
        return stack

    def current_out_len():
        out = sys.stdout
        tr = getattr(out, "transcript", None)
        return sum(len(s) for _, s in tr.segs) if tr else 0

    def local(frame, event, arg):
        if frame.f_code.co_filename != USER_FILE:
            return None
        if event == "line":
            if len(steps) >= MAX_TRACE_STEPS:
                raise TraceLimit()
            steps.append({"line": frame.f_lineno, "frames": frames_of(frame), "out": current_out_len()})
        return local

    def glob(frame, event, arg):
        if frame.f_code.co_filename != USER_FILE:
            return None
        return local

    res = execute(code, stdin=stdin, interactive=True, seed=seed, tracer=glob)
    total = sum(len(s) for _, s in res["segs"])
    final = {"line": None, "frames": [{"name": "Programa principal", "vars": _snapshot(res["ns"])}], "out": total, "end": True}
    if res["status"] == "error":
        final["error"] = res["error"]
        final["line"] = res["error"]["line"]
    steps.append(final)
    return {
        "status": res["status"],
        "steps": steps,
        "segs": res["segs"],
        "prompt": res["prompt"],
        "error": res["error"],
        "limit": MAX_TRACE_STEPS,
        "tampered": res["tampered"],
    }


# ---------------------------------------------------------------------------
# Validación de ejercicios
# ---------------------------------------------------------------------------

NUM_RE = re.compile(r"-?\d+(?:[.,]\d+)?(?:[eE][-+]?\d+)?")


def _to_num(tok):
    try:
        return float(tok.replace(",", "."))
    except ValueError:
        return None


def _clean_lines(text):
    lines = [ln.rstrip() for ln in text.split("\n")]
    while lines and lines[-1] == "":
        lines.pop()
    return lines


def _line_eq(a, b):
    if a.strip() == b.strip():
        return True
    ta, tb = a.split(), b.split()
    if len(ta) != len(tb):
        return False
    for x, y in zip(ta, tb):
        if x == y:
            continue
        nx, ny = _to_num(x), _to_num(y)
        if nx is None or ny is None or abs(nx - ny) > 1e-9:
            return False
    return True


def _lines_match(got, expected, exact=False):
    """exact=True compara el texto tal cual (para ejercicios de formato: 7.50 no es 7.5)."""
    g = _clean_lines(got)
    if len(g) != len(expected):
        return False, min(len(g), len(expected))
    for i, (x, y) in enumerate(zip(g, expected)):
        if not (x.strip() == y.strip() if exact else _line_eq(x, y)):
            return False, i
    return True, None


def _numbers_in_result_line(text):
    """Números de la última línea que contiene alguno: la línea donde el programa da su resultado."""
    for line in reversed(text.split("\n")):
        nums = [v for v in (_to_num(n) for n in NUM_RE.findall(line)) if v is not None]
        if nums:
            return nums
    return []


def _eval_expr(expr, args):
    return eval(expr, {"__builtins__": {"round": round, "abs": abs}}, dict(args))  # noqa: S307 - contenido propio


def _values_equal(a, b):
    if isinstance(a, (int, float)) and isinstance(b, (int, float)) and not isinstance(a, bool):
        return abs(a - b) <= 1e-6
    return a == b


def _case_label(case, i):
    if case.get("label"):
        return case["label"]
    if case.get("call"):
        return case["call"]
    if case.get("stdin"):
        return "Datos: " + ", ".join(case["stdin"])
    return f"Caso {i + 1}"


def _compare(case, spec, res):
    """Devuelve (ok, detalle) para un caso ya ejecutado."""
    printed = res["printed"]
    args = case.get("args", {})
    if "out_lines" in case:
        ok, idx = _lines_match(printed, case["out_lines"], spec.get("exact_lines", False))
        if not ok:
            return False, {"expected": "\n".join(case["out_lines"]), "got": "\n".join(_clean_lines(printed)), "line_index": idx}
    if spec.get("expect_last_number"):
        # El resultado debe aparecer en la última línea con números; puede ir acompañado
        # de otros datos («Pagas 80.0 euros con un 20 % de descuento»).
        expected = _eval_expr(spec["expect_last_number"], args)
        values = _numbers_in_result_line(printed)
        tol = spec.get("tolerance", 0.01)
        if not values:
            return False, {"expected": _fmt(expected), "got": printed.strip() or "(nada)", "no_number": True}
        if not any(abs(v - expected) <= tol for v in values):
            return False, {"expected": _fmt(expected), "got": ", ".join(_fmt(v) for v in values), "got_values": values}
    for name, value in case.get("vars", {}).items():
        ns = res["ns"]
        if name not in ns:
            return False, {"expected": f"{name} = {value!r}", "got": f"«{name}» no existe al terminar"}
        if not _values_equal(ns[name], value):
            return False, {"expected": f"{name} = {value!r}", "got": f"{name} = {ns[name]!r}"}
    return True, None


def _fmt(n):
    if isinstance(n, float) and n.is_integer():
        return str(int(n))
    return f"{n:.4f}".rstrip("0").rstrip(".") if isinstance(n, float) else str(n)


def _misconception(case, spec, res, detail):
    printed = res["printed"]
    tol = spec.get("tolerance", 0.01)
    # Los números que solo repiten los datos de entrada (p. ej. «con un 20 %») no indican un error
    # de razonamiento: se ignoran salvo que no quede ningún otro número.
    inputs = [_to_num(str(x)) for x in case.get("stdin", [])]
    inputs += [v for v in case.get("args", {}).values() if isinstance(v, (int, float))]
    for mis in spec.get("misconceptions", []):
        if "expr" in mis and detail and detail.get("got_values"):
            try:
                val = _eval_expr(mis["expr"], case.get("args", {}))
            except Exception:  # noqa: BLE001
                continue
            shown = detail["got_values"]
            candidates = [v for v in shown if not any(i is not None and abs(v - i) <= tol for i in inputs)] or shown
            if any(abs(v - val) <= tol for v in candidates):
                return mis
        if "out_lines" in mis and _lines_match(printed, mis["out_lines"], spec.get("exact_lines", False))[0]:
            return mis
        if "out_contains" in mis and mis["out_contains"] in printed:
            return mis
    return None


class _Usage(ast.NodeVisitor):
    def __init__(self):
        self.loads, self.stores, self.calls = {}, {}, set()
        self.self_refs = set()  # variables reasignadas a partir de sí mismas
        self.print_names = set()
        self.ops = set()  # operadores usados: "Add", "Mult", "FloorDiv", "Mod"…

    def visit_BinOp(self, node):
        self.ops.add(type(node.op).__name__)
        self.generic_visit(node)

    def visit_Name(self, node):
        target = self.loads if isinstance(node.ctx, ast.Load) else self.stores
        target[node.id] = target.get(node.id, 0) + 1

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            self.calls.add(node.func.id)
            if node.func.id == "print":
                for arg in node.args:
                    for sub in ast.walk(arg):
                        if isinstance(sub, ast.Name):
                            self.print_names.add(sub.id)
        self.generic_visit(node)

    def visit_Assign(self, node):
        used = {n.id for n in ast.walk(node.value) if isinstance(n, ast.Name)}
        for t in node.targets:
            if isinstance(t, ast.Name) and t.id in used:
                self.self_refs.add(t.id)
        self.generic_visit(node)

    def visit_AugAssign(self, node):
        self.ops.add(type(node.op).__name__)
        if isinstance(node.target, ast.Name):
            self.self_refs.add(node.target.id)
        self.generic_visit(node)


def _rules(tree, spec):
    u = _Usage()
    u.visit(tree)
    for rule in spec.get("rules", []):
        t = rule["type"]
        bad = False
        if t == "must_call":
            bad = rule["name"] not in u.calls
        elif t == "must_load":
            bad = any(n not in u.loads for n in rule["names"])
        elif t == "must_assign":
            bad = any(n not in u.stores for n in rule["names"])
        elif t == "assign_refs_self":
            bad = rule["name"] not in u.self_refs
        elif t == "print_uses":
            bad = any(n not in u.print_names for n in rule["names"])
        elif t == "must_use_op":  # p. ej. ["FloorDiv", "Mod"]: el resultado debe calcularse, no escribirse
            bad = any(op not in u.ops for op in rule["ops"])
        if bad:
            return rule
    return None


def _suggestions(tree, spec):
    u = _Usage()
    u.visit(tree)
    tips = []
    allowed_short = set(spec.get("allow_short_names", []))
    short = sorted(n for n in u.stores if len(n) == 1 and n not in allowed_short and n != "_")
    if short:
        tips.append(
            f"Funciona, pero nombres como «{short[0]}» dicen poco. Un nombre descriptivo (precio, descuento…) hace que tu programa se entienda al releerlo dentro de un mes."
        )
    expected_vars = set()
    for c in spec.get("cases", []):
        expected_vars |= set(c.get("vars", {}).keys())
    unused = sorted(n for n in u.stores if n not in u.loads and n not in expected_vars)
    if unused:
        tips.append(f"La variable «{unused[0]}» se crea pero nunca se usa. Si no la necesitas, puedes eliminarla.")
    # Números «mágicos» repetidos: mejor un nombre que explique qué son y un único sitio donde cambiarlos.
    # spec["skip_tips"] = ["repeated_numbers"] lo desactiva (p. ej. antes de enseñar las variables).
    counts = {}
    for node in ast.walk(tree):
        if isinstance(node, ast.Constant) and type(node.value) in (int, float) and node.value not in (0, 1):
            counts[node.value] = counts.get(node.value, 0) + 1
    repeated = sorted((v for v, n in counts.items() if n >= 2), key=lambda v: -counts[v])
    if repeated and "repeated_numbers" not in spec.get("skip_tips", []):
        v = repeated[0]
        tips.append(
            f"El número {_fmt(v)} aparece {counts[v]} veces. Guárdalo en una variable con un nombre que explique "
            "qué representa y úsala en su lugar: si un día cambia, solo tendrás que tocar una línea.")
    return tips


def _has_blanks(code):
    """¿Quedan huecos ___ en el código? Los ___ dentro de comentarios no cuentan."""
    try:
        return any(isinstance(n, ast.Name) and n.id == "___" for n in ast.walk(ast.parse(code)))
    except SyntaxError:
        return any("___" in line.split("#", 1)[0] for line in code.splitlines())


def _hidden_cases(code, spec):
    """
    Casos ocultos con datos aleatorios, además de los visibles: impiden aprobar memorizando
    las respuestas de los casos que se muestran. Son deterministas para un mismo código
    (la semilla depende del código), así que comprobar dos veces da el mismo resultado.
    spec["hidden"] = {"count": 2, "args": {"p": [1, 500, 2], "d": [0, 90, 0]}, "stdin": ["p", "d"]},
    con [mínimo, máximo, decimales] para cada dato.
    """
    hidden = spec.get("hidden")
    if not hidden:
        return []
    rng = random.Random(sum((i + 1) * ord(ch) for i, ch in enumerate(code)))
    cases = []
    for k in range(hidden.get("count", 2)):
        args = {}
        for name, (lo, hi, dec) in hidden["args"].items():
            v = round(rng.uniform(lo, hi), dec)
            args[name] = int(v) if dec == 0 else v
        cases.append({"label": f"Caso oculto {k + 1}", "args": args, "stdin": [str(args[n]) for n in hidden["stdin"]]})
    return cases


def _apply_variant(code, var):
    """
    Prepara una variante del programa con otros datos de partida.

    {"set": {"edad": 30}} sustituye el valor constante de la PRIMERA asignación a
    cada variable (sea cual sea su formato: «edad=19», «edad = 19»,
    «a, edad = 1, 19»). Devuelve (código, variables no encontradas).
    {"replace": [antes, después]} es el formato antiguo por texto literal.
    """
    if "replace" in var:
        old, new = var["replace"]
        return (code.replace(old, new, 1), []) if old in code else (code, [old])

    targets = dict(var["set"])
    tree = ast.parse(code)
    done = set()
    nodes = sorted((n for n in ast.walk(tree) if isinstance(n, ast.Assign)), key=lambda n: (n.lineno, n.col_offset))
    for node in nodes:
        if len(node.targets) != 1:
            continue
        target, value = node.targets[0], node.value
        pairs = []
        if isinstance(target, ast.Name):
            pairs = [(target, value, lambda new, node=node: setattr(node, "value", new))]
        elif isinstance(target, ast.Tuple) and isinstance(value, ast.Tuple) and len(target.elts) == len(value.elts):
            pairs = [(t, v, lambda new, value=value, i=i: value.elts.__setitem__(i, new))
                     for i, (t, v) in enumerate(zip(target.elts, value.elts))]
        for t, v, setter in pairs:
            if isinstance(t, ast.Name) and t.id in targets and t.id not in done and isinstance(v, ast.Constant):
                setter(ast.Constant(targets[t.id]))
                done.add(t.id)
    missing = [name for name in targets if name not in done]
    return ast.unparse(ast.fix_missing_locations(tree)), missing


# Separa la salida del programa de la salida de la llamada de prueba («call» en un caso).
_CALL_MARK = "\x1e__lunapy_call__"


def _run_case(code, case):
    """Ejecuta un caso. Con «call», añade al final una llamada de prueba (p. ej. «print(area(3, 4))»)
    y se queda solo con lo que muestra esa llamada."""
    call = case.get("call")
    if not call:
        return execute(code, stdin=case.get("stdin", []), interactive=False, seed=1)
    res = execute(f"{code}\nprint({_CALL_MARK!r})\n{call}\n", stdin=case.get("stdin", []), interactive=False, seed=1)
    printed = res["printed"]
    cut = printed.rfind(_CALL_MARK + "\n")
    if cut != -1:
        res = dict(res, printed=printed[cut + len(_CALL_MARK) + 1:])
    return res


def _check_functions(tree, spec):
    """spec["functions"] = [{"name": "area", "params": 2}]: comprueba que existen antes de llamarlas."""
    defs = {n.name: n for n in tree.body if isinstance(n, ast.FunctionDef)}
    for fn in spec.get("functions", []):
        node = defs.get(fn["name"])
        if node is None:
            return {
                "status": "fail", "category": "comprension", "title": f"Falta la función «{fn['name']}»",
                "message": fn.get("missing_msg") or (
                    f"El enunciado pide definir una función llamada «{fn['name']}» con `def {fn['name']}(...):`. "
                    "Comprueba que el nombre coincide exactamente (mayúsculas incluidas) y que está al principio de la línea."),
                "cases": [],
            }
        want = fn.get("params")
        got = len(node.args.args)
        if want is not None and got != want:
            plural = "parámetro" if want == 1 else "parámetros"
            return {
                "status": "fail", "category": "comprension", "title": "Revisa los parámetros",
                "message": f"«{fn['name']}» debe recibir {want} {plural} y la tuya recibe {got}.",
                "cases": [],
            }
    return None


def check(code, spec):
    if spec.get("blanks") and _has_blanks(code):
        return {
            "status": "fail", "category": "incompleto", "title": "Quedan huecos por completar",
            "message": "Sustituye cada ___ por el código que falta antes de comprobar.", "cases": [],
        }
    try:
        tree = ast.parse(code)
        compile(code, USER_FILE, "exec")
    except SyntaxError as exc:
        err = explain(exc, code, [])
        return {"status": "fail", "category": "sintaxis", "title": err["title"], "message": err["explanation"], "error": err, "cases": []}

    missing_fn = _check_functions(tree, spec)
    if missing_fn:
        return missing_fn

    cases = (spec.get("cases") or [{}]) + _hidden_cases(code, spec)
    results = []
    first_fail = None
    for i, case in enumerate(cases):
        res = _run_case(code, case)
        if res["tampered"]:
            return dict(TAMPER_RESULT)
        label = _case_label(case, i)
        if res["status"] == "error":
            results.append({"label": label, "ok": False})
            if first_fail is None:
                err = res["error"]
                first_fail = {"status": "fail", "category": err["kind"], "title": err["title"], "message": err["explanation"], "error": err, "case": label}
            continue
        ok, detail = _compare(case, spec, res)
        results.append({"label": label, "ok": ok})
        if not ok and first_fail is None:
            mis = _misconception(case, spec, res, detail)
            if mis:
                first_fail = {"status": "fail", "category": mis.get("category", "comprension"), "title": mis.get("title", "Revisa qué pide el enunciado"), "message": mis["msg"], "case": label, "detail": detail}
            else:
                first_fail = {"status": "fail", "category": "logica", "title": "El programa se ejecuta, pero el resultado no es el esperado", "message": spec.get("logic_msg", "Compara lo que muestra tu programa con lo que se esperaba en este caso."), "case": label, "detail": detail}

    if first_fail:
        first_fail["cases"] = results
        return first_fail

    for var in spec.get("variants", []):
        variant_code, missing = _apply_variant(code, var)
        label = var.get("label", "Prueba con otros valores")
        if missing:
            # Nunca se omite una variante en silencio: sin el dato de partida no se puede
            # comprobar que el programa calcula en lugar de escribir el resultado a mano.
            results.append({"label": label, "ok": False})
            name = missing[0]
            return {
                "status": "fail", "category": "logica", "title": "Falta el dato de partida",
                "message": var.get("missing_msg") or (
                    f"Tu programa debe guardar el valor inicial en la variable «{name}», como en el código inicial, "
                    "y calcular el resultado a partir de ella. Así funcionará con cualquier dato, no solo con este."),
                "cases": results,
            }
        res = _run_case(variant_code, var)
        if res["tampered"]:
            return dict(TAMPER_RESULT)
        ok = res["status"] == "ok" and _compare(var, spec, res)[0]
        results.append({"label": label, "ok": ok})
        if not ok:
            return {"status": "fail", "category": "logica", "title": "Funciona solo con estos valores concretos", "message": var["msg"], "cases": results}

    rule = _rules(tree, spec)
    if rule:
        sev = rule.get("severity", "fail")
        if sev == "fail":
            return {"status": "fail", "category": rule.get("category", "logica"), "title": rule.get("title", "Falta algo importante"), "message": rule["msg"], "cases": results}

    tips = _suggestions(tree, spec)
    if tips:
        return {"status": "pass", "category": "mejorable", "title": "¡Correcto! Y se puede pulir un poco", "message": tips[0], "suggestions": tips, "cases": results}
    return {"status": "pass", "category": "correcto", "title": "¡Correcto!", "message": spec.get("success_msg", "Tu programa resuelve el problema en todos los casos de prueba."), "cases": results}


# ---------------------------------------------------------------------------
# API JSON
# ---------------------------------------------------------------------------

def _clean_run(res):
    return {"status": res["status"], "segs": res["segs"], "prompt": res["prompt"], "error": res["error"], "tampered": res["tampered"]}


def api_run(payload):
    p = json.loads(payload)
    return json.dumps(_clean_run(execute(p["code"], p.get("stdin", []), interactive=True, seed=p.get("seed"))))


def api_trace(payload):
    p = json.loads(payload)
    return json.dumps(trace(p["code"], p.get("stdin", []), seed=p.get("seed")))


def api_check(payload):
    p = json.loads(payload)
    return json.dumps(check(p["code"], p["spec"]))


def api_version(_payload="{}"):
    return json.dumps({"python": sys.version.split()[0]})


# Estado de referencia del motor: cualquier cambio posterior lo ha hecho el código del alumno.
_ENGINE_SNAPSHOT.update({k: v for k, v in globals().items() if not k.startswith("__")})
