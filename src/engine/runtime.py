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

# Idioma de los mensajes ("es" | "en"). Lo fija cada llamada a la API (payload["lang"]).
# Es un diccionario (no una variable) para que cambiar el idioma no cuente como
# una modificación del motor en _restore_environment.
_LANG = {"v": "es"}


def _t(es, en):
    """Texto en el idioma activo."""
    return en if _LANG["v"] == "en" else es


def _set_lang(p):
    _LANG["v"] = "en" if p.get("lang") == "en" else "es"


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

TYPE_EN = {
    "int": "whole number (int)",
    "float": "decimal number (float)",
    "str": "text (str)",
    "bool": "boolean (bool)",
    "NoneType": "None",
    "list": "list (list)",
    "dict": "dictionary (dict)",
    "tuple": "tuple (tuple)",
}


def tipo_es(name):
    return (TYPE_EN if _LANG["v"] == "en" else TYPE_ES).get(name, name)


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


def _tamper_result():
    return {
        "status": "fail", "category": "manipulacion", "title": _t("No se ha podido validar", "It couldn't be validated"),
        "message": _t("Tu programa ha modificado el funcionamiento interno de LunaPy (por ejemplo, el validador o las funciones de Python). "
                      "Lo hemos restablecido. Vuelve a comprobar tu solución sin esas modificaciones.",
                      "Your program changed LunaPy's internal workings (for example, the validator or Python's functions). "
                      "We've restored it. Check your solution again without those changes."),
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
        echo = value if len(value) <= 2000 else value[:2000] + _t(f"… (+{len(value) - 2000} caracteres)", f"… (+{len(value) - 2000} characters)")
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
            "title": _t("Demasiada salida", "Too much output"),
            "explanation": _t(f"El programa ha escrito más de {MAX_OUT} caracteres y lo hemos detenido.", f"The program wrote more than {MAX_OUT} characters and we stopped it."),
            "suggestion": _t("¿Hay un bucle que no termina o un print dentro de un bucle muy largo?", "Is there a loop that never ends, or a print inside a very long loop?"),
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
        title = _t("Problema de sangría", "Indentation problem")
        if "unexpected indent" in low:
            expl = _t("Esta línea empieza con espacios que Python no esperaba. En Python la sangría tiene significado: solo se sangra dentro de un bloque (por ejemplo, tras una línea que acaba en «:»).",
                      "This line starts with spaces Python wasn't expecting. In Python indentation has meaning: you only indent inside a block (for example, after a line ending in «:»).")
            sug = _t("Borra los espacios del principio de la línea.", "Delete the spaces at the start of the line.")
        elif "expected an indented block" in low:
            expl = _t("Después de una línea que termina en «:» Python necesita al menos una línea sangrada (con 4 espacios).",
                      "After a line ending in «:» Python needs at least one indented line (with 4 spaces).")
            sug = _t("Añade 4 espacios al principio de la línea siguiente.", "Add 4 spaces at the start of the next line.")
        else:
            expl = _t("La sangría (los espacios al principio de la línea) no encaja con las líneas de alrededor.",
                      "The indentation (the spaces at the start of the line) doesn't match the lines around it.")
            sug = _t("Usa siempre 4 espacios por nivel y no mezcles tabuladores con espacios.", "Always use 4 spaces per level and don't mix tabs with spaces.")
    elif isinstance(exc, SyntaxError):
        title = _t("Python no entiende cómo está escrita esta línea", "Python doesn't understand how this line is written")
        stripped = code_line.strip()
        first = re.match(r"\s*([A-Za-z_]\w*)", code_line)
        if "unterminated string" in low or "eol while scanning" in low:
            title = _t("Texto sin cerrar", "Unclosed text")
            expl = _t("Has abierto unas comillas pero no las has cerrado. Todo texto (str) tiene que empezar y terminar con el mismo tipo de comillas.",
                      "You opened some quotes but didn't close them. All text (str) has to start and end with the same kind of quotes.")
            sug = _t('Revisa la línea y comprueba que cada " o \' tiene su pareja, por ejemplo: "Hola".',
                     'Check the line and make sure every " or \' has its partner, for example: "Hello".')
        elif "was never closed" in low:
            title = _t("Paréntesis sin cerrar", "Unclosed bracket")
            expl = _t("Has abierto un paréntesis «(» que no se cierra.", "You opened a bracket «(» that is never closed.")
            sug = _t("Cuenta los paréntesis: debe haber tantos «(» como «)».", "Count the brackets: there must be as many «(» as «)».")
        elif "unmatched" in low:
            title = _t("Paréntesis de más", "Extra bracket")
            expl = _t("Hay un paréntesis de cierre «)» que no tiene su pareja de apertura.", "There's a closing bracket «)» without a matching opening one.")
            sug = _t("Busca el paréntesis que sobra o el que falta al principio.", "Look for the extra bracket, or the one missing at the start.")
        elif "missing parentheses in call to 'print'" in low:
            title = _t("A print le faltan los paréntesis", "print is missing its brackets")
            expl = _t("En Python 3, print es una función: lo que quieres mostrar va entre paréntesis.", "In Python 3, print is a function: what you want to show goes inside brackets.")
            sug = _t('Escribe print("Hola") en lugar de print "Hola".', 'Write print("Hello") instead of print "Hello".')
        elif "cannot assign to literal" in low or "cannot assign to expression" in low or "cannot assign to function call" in low:
            title = _t("La asignación está al revés", "The assignment is the wrong way round")
            expl = _t("A la izquierda del signo = debe ir siempre el NOMBRE de una variable, y a la derecha el valor. «=» no es una igualdad matemática: significa «guarda este valor con este nombre».",
                      "To the left of the = sign there must always be the NAME of a variable, and the value on the right. «=» isn't mathematical equality: it means «store this value under this name».")
            sug = _t("Escribe primero el nombre: edad = 18 (y no 18 = edad).", "Write the name first: age = 18 (not 18 = age).")
        elif "invalid decimal literal" in low or (first is None and re.match(r"\s*\d+[A-Za-z_]", code_line)):
            title = _t("Nombre que empieza por un número", "Name starting with a number")
            expl = _t("Los nombres de variable no pueden empezar por un número.", "Variable names can't start with a number.")
            sug = _t("Pon el número al final o usa una palabra: edad2 o segunda_edad.", "Put the number at the end or use a word: age2 or second_age.")
        elif "invalid character" in low:
            title = _t("Carácter no válido", "Invalid character")
            expl = _t("Hay un carácter que Python no reconoce. Suele pasar al copiar código con comillas tipográficas (“ ” ‘ ’) en lugar de comillas rectas (\" ').",
                      "There's a character Python doesn't recognise. It usually happens when copying code with curly quotes (“ ” ‘ ’) instead of straight quotes (\" ').")
            sug = _t("Vuelve a escribir las comillas desde el teclado.", "Type the quotes again from the keyboard.")
        elif "expected ':'" in low:
            title = _t("Faltan los dos puntos", "Missing colon")
            expl = _t("Las líneas que abren un bloque (if, for, while, def…) deben terminar con «:».", "Lines that open a block (if, for, while, def…) must end with «:».")
            sug = _t("Añade «:» al final de la línea.", "Add «:» at the end of the line.")
        elif "maybe you meant '=='" in low or re.match(r"^\s*(return|if|elif|while)\b[^=]*[^=!<>]=[^=]", code_line):
            title = _t("Para comparar se usa ==", "Use == to compare")
            expl = _t("En una condición has escrito «=», que sirve para asignar. Para preguntar si dos valores son iguales se usa «==».",
                      "In a condition you wrote «=», which is for assigning. To ask whether two values are equal you use «==».")
            sug = _t("Cambia «=» por «==»: if edad == 18:", "Change «=» to «==»: if age == 18:")
        elif "forgot a comma" in low:
            title = _t("Puede que falte una coma", "There may be a comma missing")
            expl = _t("Python encuentra dos valores seguidos sin nada que los separe.", "Python finds two values in a row with nothing separating them.")
            sug = _t('Si quieres mostrar varias cosas con print, sepáralas con comas: print("Edad:", edad).', 'If you want to show several things with print, separate them with commas: print("Age:", age).')
        elif re.match(r"^\s*[A-Za-z_]\w*\s+[A-Za-z_]\w*\s*=(?!=)", code_line):
            title = _t("Nombre de variable con espacios", "Variable name with spaces")
            expl = _t("Un nombre de variable es una sola palabra: no puede contener espacios.", "A variable name is a single word: it can't contain spaces.")
            sug = _t("Une las palabras con guion bajo: mi_edad = 18.", "Join the words with an underscore: my_age = 18.")
        elif first and keyword.iskeyword(first.group(1)) and re.match(r"^\s*\w+\s*=(?!=)", code_line):
            title = _t("Palabra reservada", "Reserved word")
            expl = _t(f"«{first.group(1)}» es una palabra reservada de Python y no puede usarse como nombre de variable.",
                      f"«{first.group(1)}» is a Python reserved word and can't be used as a variable name.")
            sug = _t("Elige otro nombre, por ejemplo añadiendo un sufijo: clase_1.", "Choose another name, for example by adding a suffix: class_1.")
        else:
            expl = _t("La línea no sigue las reglas de escritura (sintaxis) de Python. Es como una frase con la puntuación rota: Python ni siquiera empieza a ejecutar el programa.",
                      "The line doesn't follow Python's writing rules (syntax). It's like a sentence with broken punctuation: Python doesn't even start running the program.")
            sug = _t("Revisa comillas, paréntesis, comas y el signo «=» en esa línea (o en la anterior).", "Check the quotes, brackets, commas and the «=» sign on that line (or the one before).")
        if not stripped and line and line > 1:
            sug += _t(" El problema puede estar en la línea anterior.", " The problem may be on the previous line.")
    elif isinstance(exc, IndexError) and "out of range" in low:
        if _LANG["v"] == "en":
            que = "text" if "string" in low else "tuple" if "tuple" in low else "list"
        else:
            que = "texto" if "string" in low else "tupla" if "tuple" in low else "lista"
        title = _t("Posición fuera de rango", "Index out of range")
        expl = _t(f"Pides una posición que no existe en la {que}: las posiciones van de 0 a len − 1.",
                  f"You're asking for a position that doesn't exist in the {que}: positions go from 0 to len − 1.")
        sug = _t(f"Si quieres el último elemento, usa [-1]. Si la {que} puede estar vacía, compruébalo antes (if not datos: …).",
                 f"If you want the last item, use [-1]. If the {que} can be empty, check that first (if not data: …).")
    elif isinstance(exc, AssertionError):
        title = _t("Una comprobación (assert) ha fallado", "A check (assert) failed")
        expl = _t(f"La condición del assert de esta línea es falsa{': ' + msg if msg else ''}.",
                  f"The assert condition on this line is false{': ' + msg if msg else ''}.")
        sug = _t("Calcula a mano qué debería salir y muestra con print qué devuelve realmente la función: la diferencia te dirá dónde está el fallo.",
                 "Work out by hand what should come out and use print to show what the function really returns: the difference will tell you where the bug is.")
    elif isinstance(exc, UnboundLocalError):  # subclase de NameError: va antes
        m_loc = re.search(r"local variable '(\w+)'|cannot access local variable '(\w+)'", msg)
        nombre = (m_loc.group(1) or m_loc.group(2)) if m_loc else "?"
        title = _t("Variable local usada antes de darle valor", "Local variable used before it has a value")
        expl = _t(f"Dentro de la función asignas un valor a «{nombre}», así que Python la trata como una variable local… "
                  "pero la usas antes de haberle dado ese valor.",
                  f"Inside the function you assign a value to «{nombre}», so Python treats it as a local variable… "
                  "but you use it before giving it that value.")
        sug = _t(f"Si «{nombre}» es una variable de fuera, no la modifiques desde la función: pásala como parámetro "
                 "y devuelve el resultado con return.",
                 f"If «{nombre}» is a variable from outside, don't change it from the function: pass it as a parameter "
                 "and give back the result with return.")
    elif isinstance(exc, NameError):
        m = re.search(r"name '(\w+)' is not defined", msg)
        name = m.group(1) if m else "?"
        title = _t(f"Python no conoce el nombre «{name}»", f"Python doesn't know the name «{name}»")
        expl = _t(f"Estás usando «{name}», pero en ese momento no existe ninguna variable (ni función) con ese nombre.",
                  f"You're using «{name}», but at that point there's no variable (or function) with that name.")
        candidates = list(names) + ["print", "input", "int", "float", "str", "len", "type", "round"]
        close = difflib.get_close_matches(name, candidates, n=1, cutoff=0.6)
        close_ci = [c for c in candidates if c.lower() == name.lower() and c != name]
        if close_ci:
            sug = _t(f"Python distingue mayúsculas y minúsculas: ¿querías escribir «{close_ci[0]}»?", f"Python is case-sensitive: did you mean «{close_ci[0]}»?")
        elif close:
            sug = _t(f"¿Querías escribir «{close[0]}»? Comprueba que el nombre esté escrito exactamente igual que cuando lo creaste.",
                     f"Did you mean «{close[0]}»? Check that the name is spelt exactly the same as when you created it.")
        else:
            sug = _t("Comprueba tres cosas: 1) que está bien escrito, 2) que le has asignado un valor ANTES de usarlo, 3) si querías un texto, ponlo entre comillas.",
                     "Check three things: 1) that it's spelt correctly, 2) that you gave it a value BEFORE using it, 3) if you meant text, put it in quotes.")
    elif isinstance(exc, TypeError):
        title = _t("Tipos de datos incompatibles", "Incompatible data types")
        m_concat = re.search(r'can only concatenate str \(not "(\w+)"\) to str', msg)
        m_op = re.search(r"unsupported operand type\(s\) for (\S+): '(\w+)' and '(\w+)'", msg)
        m_mul = re.search(r"can't multiply sequence by non-int of type '(\w+)'", msg)
        if m_concat:
            t = m_concat.group(1)
            title = _t("Mezcla de texto y números", "Mixing text and numbers")
            expl = _t(f"Estás intentando unir con + un texto (str) y un {tipo_es(t)}. Con + Python puede sumar números o pegar textos, pero no mezclar ambos.",
                      f"You're trying to join a text (str) and a {tipo_es(t)} with +. With + Python can add numbers or stick texts together, but not mix both.")
            sug = _t('Convierte el número a texto con str(), o deja que print los separe con comas: print("Tienes", edad, "años").',
                     'Convert the number to text with str(), or let print separate them with commas: print("You are", age, "years old").')
        elif m_op:
            op, a, b = m_op.groups()
            title = _t("Operación entre tipos incompatibles", "Operation between incompatible types")
            expl = _t(f"No se puede usar «{op}» entre un {tipo_es(a)} y un {tipo_es(b)}.", f"You can't use «{op}» between a {tipo_es(a)} and a {tipo_es(b)}.")
            if "NoneType" in (a, b):
                sug = _t("Uno de los valores es None. Suele venir de una función que muestra el resultado con print() pero no lo devuelve: usa return.",
                         "One of the values is None. It usually comes from a function that shows the result with print() but doesn't return it: use return.")
            elif "str" in (a, b):
                sug = _t("Si el valor viene de input(), recuerda que input() SIEMPRE devuelve texto: conviértelo con int() o float() antes de operar.",
                         "If the value comes from input(), remember that input() ALWAYS returns text: convert it with int() or float() before doing maths.")
            else:
                sug = _t("Comprueba qué tipo de dato tiene cada variable (puedes usar type()).", "Check what data type each variable has (you can use type()).")
        elif m_mul:
            title = _t("Multiplicación con texto", "Multiplying with text")
            expl = _t(f"Estás multiplicando un texto por un {tipo_es(m_mul.group(1))}. Seguramente uno de los valores es un número guardado como texto.",
                      f"You're multiplying a text by a {tipo_es(m_mul.group(1))}. One of the values is probably a number stored as text.")
            sug = _t("input() siempre devuelve texto: usa float(input(...)) o int(input(...)) para obtener un número.",
                     "input() always returns text: use float(input(...)) or int(input(...)) to get a number.")
        elif m_args := (re.search(r"(\w+)\(\) missing (\d+) required positional arguments?: (.+)", msg)
                        or re.search(r"(\w+)\(\) takes (?:exactly )?(\w+) (?:positional )?arguments? but (\d+) (?:was|were) given", msg)
                        or re.search(r"(\w+)\(\) takes (?:exactly )?(\w+) arguments? \((\d+) given\)", msg)):
            fn = m_args.group(1)
            title = _t("Número de argumentos incorrecto", "Wrong number of arguments")
            if "missing" in msg:
                faltan = m_args.group(3).replace("'", "")
                if _LANG["v"] != "en":
                    faltan = faltan.replace(" and ", " y ")
                expl = _t(f"Has llamado a {fn}() sin darle valor a: {faltan}. Cada parámetro sin valor por defecto necesita su argumento.",
                          f"You called {fn}() without giving a value to: {faltan}. Every parameter without a default value needs its argument.")
            else:
                expl = _t(f"{fn}() recibe {m_args.group(2).replace('one', '1')} argumento(s), pero le has pasado {m_args.group(3)}.",
                          f"{fn}() takes {m_args.group(2).replace('one', '1')} argument(s), but you passed {m_args.group(3)}.")
            sug = _t(f"Compara la llamada con la cabecera de {fn}(): debe haber un argumento por cada parámetro, en el mismo orden.",
                     f"Compare the call with the header of {fn}(): there must be one argument for each parameter, in the same order.")
            if re.search(rf"\w+\.{fn}\(\)", msg):  # Clase.metodo(): falta self en la definición
                sug = _t(f"{fn} es un método: Python le pasa el objeto como primer argumento, así que su primer parámetro tiene que ser self: def {fn}(self, …).",
                         f"{fn} is a method: Python passes it the object as the first argument, so its first parameter has to be self: def {fn}(self, …).")
        elif "__str__ returned non-string" in msg:
            title = _t("__str__ debe devolver un texto", "__str__ must return a text")
            expl = _t("El método __str__ no ha devuelto un texto (probablemente usa print en lugar de return).",
                      "The __str__ method didn't return a text (it probably uses print instead of return).")
            sug = _t('Haz que __str__ devuelva el texto: return f"…". Es print quien lo mostrará.', 'Make __str__ return the text: return f"…". print is what will show it.')
        elif m_unpack := re.search(r"cannot unpack non-iterable (\w+) object", msg):
            title = _t("Se esperaban varios valores", "Several values were expected")
            expl = _t(f"Intentas repartir un único valor (un {tipo_es(m_unpack.group(1))}) entre varias variables.",
                      f"You're trying to split a single value (a {tipo_es(m_unpack.group(1))}) between several variables.")
            sug = _t("Si viene de una función, comprueba que devuelve todos los valores en el mismo return, separados por comas: return a, b.",
                     "If it comes from a function, check that it returns all the values in the same return, separated by commas: return a, b.")
        elif m_kw := re.search(r"(\w+)\(\) got an unexpected keyword argument '(\w+)'", msg):
            title = _t("Argumento con un nombre que no existe", "Argument with a name that doesn't exist")
            expl = _t(f"{m_kw.group(1)}() no tiene ningún parámetro llamado «{m_kw.group(2)}».", f"{m_kw.group(1)}() has no parameter called «{m_kw.group(2)}».")
            sug = _t("Revisa cómo se llaman los parámetros en la cabecera de la función (el def).", "Check what the parameters are called in the function header (the def).")
        elif "object is not callable" in low:
            t = re.search(r"'(\w+)' object is not callable", msg)
            title = _t("Se está usando un valor como si fuera una función", "A value is being used as if it were a function")
            expl = _t(f"Has puesto paréntesis detrás de algo que es un {tipo_es(t.group(1)) if t else 'valor'}, no una función.",
                      f"You put brackets after something that is a {tipo_es(t.group(1)) if t else 'value'}, not a function.")
            sug = _t("¿Has creado una variable llamada como una función (por ejemplo print = 5)? Cámbiale el nombre y vuelve a ejecutar.",
                     "Did you create a variable with the same name as a function (for example print = 5)? Rename it and run again.")
        else:
            expl = _t("Una operación ha recibido un tipo de dato que no puede usar.", "An operation received a data type it can't use.")
            sug = _t("Comprueba el tipo de cada valor con type().", "Check the type of each value with type().")
    elif isinstance(exc, ValueError):
        m_int = re.search(r"invalid literal for int\(\) with base 10: '(.*)'", msg)
        m_float = re.search(r"could not convert string to float: '(.*)'", msg)
        if m_int:
            val = m_int.group(1)
            title = _t("No se puede convertir a número entero", "Can't convert to a whole number")
            expl = _t(f"int() no puede convertir el texto «{val}» en un número entero.", f"int() can't convert the text «{val}» into a whole number.")
            if re.fullmatch(r"-?\d+[.,]\d+", val.strip()):
                sug = _t("Ese valor tiene decimales: usa float() en lugar de int().", "That value has decimals: use float() instead of int().")
            elif re.fullmatch(r"-?\d+,\d+", val.strip()):
                sug = _t("Python usa punto decimal, no coma.", "Python uses a decimal point, not a comma.")
            else:
                sug = _t("Comprueba que el dato introducido sea realmente un número.", "Check that the value entered really is a number.")
        elif m_float:
            val = m_float.group(1)
            title = _t("No se puede convertir a número decimal", "Can't convert to a decimal number")
            expl = _t(f"float() no puede convertir el texto «{val}» en un número.", f"float() can't convert the text «{val}» into a number.")
            sug = (_t("Python usa punto como separador decimal (3.5, no 3,5).", "Python uses a point as the decimal separator (3.5, not 3,5).") if "," in val
                   else _t("Comprueba que el dato introducido sea un número.", "Check that the value entered is a number."))
        elif m_vals := re.search(r"(not enough|too many) values to unpack \(expected (\d+)(?:, got (\d+))?\)", msg):
            title = _t("No coincide el número de valores", "The number of values doesn't match")
            got = _t(f" y llegan {m_vals.group(3)}", f" and {m_vals.group(3)} arrive") if m_vals.group(3) else ""
            expl = _t(f"Hay {m_vals.group(2)} variables a la izquierda del «=»{got}: tiene que haber una variable por cada valor.",
                      f"There are {m_vals.group(2)} variables to the left of «=»{got}: there has to be one variable for each value.")
            sug = _t("Comprueba cuántos valores devuelve la función (los que separa con comas en el return) y usa el mismo número de variables.",
                     "Check how many values the function returns (the ones separated by commas in the return) and use the same number of variables.")
        else:
            title = _t("Valor no válido", "Invalid value")
            # Con raise ValueError("…") propio, el mensaje del alumno es la mejor explicación.
            expl = (_t(f"Se ha lanzado un ValueError: «{msg}».", f"A ValueError was raised: «{msg}».") if msg
                    else _t("Una función ha recibido un valor del tipo correcto pero con un contenido que no puede usar.",
                            "A function received a value of the right type but with content it can't use."))
            sug = _t("Revisa el valor que se pasa en esa línea.", "Check the value passed on that line.")
    elif isinstance(exc, AttributeError) and (m_attr := re.search(r"'(\w+)' object has no attribute '(\w+)'|module '(\w+)' has no attribute '(\w+)'", msg)):
        dueno, attr = (m_attr.group(1), m_attr.group(2)) if m_attr.group(1) else (m_attr.group(3), m_attr.group(4))
        title = _t("Ese atributo o método no existe", "That attribute or method doesn't exist")
        expl = _t(f"«{dueno}» no tiene nada llamado «{attr}».", f"«{dueno}» has nothing called «{attr}».")
        if m_attr.group(3):
            sug = _t("Revisa cómo se escribe la función del módulo: Python distingue mayúsculas (sqrt, no Sqrt).",
                     "Check how the module's function is spelt: Python is case-sensitive (sqrt, not Sqrt).")
        else:
            sug = _t(f"Si «{dueno}» es una clase tuya, comprueba que en __init__ guardas el dato con self.{attr} = … "
                     "y que el nombre coincide exactamente. Si es un método, revisa que esté definido dentro de la clase.",
                     f"If «{dueno}» is one of your classes, check that __init__ stores the value with self.{attr} = … "
                     "and that the name matches exactly. If it's a method, check that it's defined inside the class.")
    elif isinstance(exc, KeyError):
        clave = exc.args[0] if exc.args else "?"
        title = _t("La clave no existe", "The key doesn't exist")
        expl = _t(f"El diccionario no tiene la clave {clave!r}.", f"The dictionary doesn't have the key {clave!r}.")
        sug = _t("Comprueba antes si existe con «in», o usa dic.get(clave, valor_por_defecto). Ojo con las mayúsculas y los espacios de la clave.",
                 "Check first whether it exists with «in», or use d.get(key, default_value). Watch out for capitals and spaces in the key.")
    elif isinstance(exc, ZeroDivisionError):
        title = _t("División entre cero", "Division by zero")
        expl = _t("Has dividido un número entre 0, algo que no tiene resultado.", "You divided a number by 0, which has no result.")
        sug = _t("Comprueba el valor del divisor antes de dividir.", "Check the value of the divisor before dividing.")
    elif isinstance(exc, EOFError):
        title = _t("El programa pide más datos de los previstos", "The program asks for more data than expected")
        expl = _t("El programa ha llamado a input() más veces de las que el ejercicio proporciona datos.",
                  "The program called input() more times than the exercise provides data for.")
        sug = _t("Relee el enunciado: ¿cuántos datos tienes que pedir?", "Read the task again: how many values do you have to ask for?")
    elif isinstance(exc, RecursionError):
        title = _t("Demasiadas llamadas encadenadas", "Too many chained calls")
        expl = _t("Una función se llama a sí misma sin parar.", "A function calls itself without stopping.")
        sug = _t("Comprueba que la recursión tiene un caso base que la detenga.", "Check that the recursion has a base case that stops it.")
    elif isinstance(exc, ImportError):
        title = _t("Módulo no disponible", "Module not available")
        expl = msg
        sug = _t("En este entorno puedes usar la biblioteca estándar de Python (math, random…).", "In this environment you can use Python's standard library (math, random…).")
    else:
        title = _t(f"Error de ejecución ({etype})", f"Runtime error ({etype})")
        expl = _t("El programa se ha detenido por un error mientras se ejecutaba.", "The program stopped because of an error while it was running.")
        sug = _t("Lee el mensaje original de Python: suele indicar la causa.", "Read Python's original message: it usually points to the cause.")

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
            return _t(f"<función {v.__name__}>", f"<function {v.__name__}>")
        r = repr(v)
    except Exception:  # noqa: BLE001
        r = _t("<valor>", "<value>")
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
                "name": _t("Programa principal", "Main program") if name == "<module>" else f"{name}()",
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
    final = {"line": None, "frames": [{"name": _t("Programa principal", "Main program"), "vars": _snapshot(res["ns"])}], "out": total, "end": True}
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
        return _t("Datos: ", "Input: ") + ", ".join(case["stdin"])
    return _t(f"Caso {i + 1}", f"Case {i + 1}")


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
            return False, {"expected": _fmt(expected), "got": printed.strip() or _t("(nada)", "(nothing)"), "no_number": True}
        if not any(abs(v - expected) <= tol for v in values):
            return False, {"expected": _fmt(expected), "got": ", ".join(_fmt(v) for v in values), "got_values": values}
    for name, value in case.get("vars", {}).items():
        ns = res["ns"]
        if name not in ns:
            return False, {"expected": f"{name} = {value!r}", "got": _t(f"«{name}» no existe al terminar", f"«{name}» doesn't exist at the end")}
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
    # Contadores de bucle (for i in …) y parámetros (n //= 10) con una letra son una convención aceptada.
    unpacked = set()  # a, b = …: desempaquetar obliga a nombrar campos que quizá no se usen
    for node in ast.walk(tree):
        if isinstance(node, ast.For) and isinstance(node.target, ast.Name):
            allowed_short.add(node.target.id)
        elif isinstance(node, ast.FunctionDef):
            allowed_short.update(a.arg for a in node.args.args)
        elif isinstance(node, ast.withitem) and isinstance(node.optional_vars, ast.Name):
            allowed_short.add(node.optional_vars.id)   # with open(...) as f
        elif isinstance(node, ast.ExceptHandler) and node.name:
            allowed_short.add(node.name)               # except ValueError as e
        if isinstance(node, (ast.Assign, ast.For)):
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            for t in targets:
                if isinstance(t, ast.Tuple):
                    unpacked.update(e.id for e in t.elts if isinstance(e, ast.Name))
    short = sorted(n for n in u.stores if len(n) == 1 and n not in allowed_short and n != "_")
    if short:
        tips.append(
            _t(f"Funciona, pero nombres como «{short[0]}» dicen poco. Un nombre descriptivo (precio, descuento…) hace que tu programa se entienda al releerlo dentro de un mes.",
               f"It works, but names like «{short[0]}» don't say much. A descriptive name (price, discount…) makes your program easy to understand when you reread it a month from now.")
        )
    expected_vars = set()
    for c in spec.get("cases", []):
        expected_vars |= set(c.get("vars", {}).keys())
    unused = sorted(n for n in u.stores if n not in u.loads and n not in expected_vars and n != "_" and n not in unpacked)
    if unused:
        tips.append(_t(f"La variable «{unused[0]}» se crea pero nunca se usa. Si no la necesitas, puedes eliminarla.",
                       f"The variable «{unused[0]}» is created but never used. If you don't need it, you can remove it."))
    # Números «mágicos» repetidos: mejor un nombre que explique qué son y un único sitio donde cambiarlos.
    # spec["skip_tips"] = ["repeated_numbers"] lo desactiva (p. ej. antes de enseñar las variables).
    # Los argumentos de las llamadas a funciones propias (calificacion(7)) son datos de prueba, no números mágicos.
    # Funciones, clases y métodos propios: Rectangulo(2, 3) o carrito.anadir("pan", 1.5) también son pruebas.
    own_funcs = {n.name for n in ast.walk(tree) if isinstance(n, (ast.FunctionDef, ast.ClassDef))}

    def _own_call(func):
        return (isinstance(func, ast.Name) and func.id in own_funcs) or (isinstance(func, ast.Attribute) and func.attr in own_funcs)

    test_args = {id(sub) for n in ast.walk(tree)
                 if isinstance(n, ast.Call) and _own_call(n.func)
                 for a in n.args + [kw.value for kw in n.keywords]
                 for sub in ast.walk(a)}  # también lo que va dentro: sin_repetidos([3, 1, 3])
    counts = {}
    for node in ast.walk(tree):
        if (isinstance(node, ast.Constant) and type(node.value) in (int, float) and node.value not in (0, 1)
                and id(node) not in test_args):
            counts[node.value] = counts.get(node.value, 0) + 1
    repeated = sorted((v for v, n in counts.items() if n >= 2), key=lambda v: -counts[v])
    if repeated and "repeated_numbers" not in spec.get("skip_tips", []):
        v = repeated[0]
        tips.append(
            _t(f"El número {_fmt(v)} aparece {counts[v]} veces. Guárdalo en una variable con un nombre que explique "
               "qué representa y úsala en su lugar: si un día cambia, solo tendrás que tocar una línea.",
               f"The number {_fmt(v)} appears {counts[v]} times. Store it in a variable with a name that explains "
               "what it represents and use that instead: if it ever changes, you'll only need to edit one line."))
    return tips


def _has_blanks(code):
    """¿Quedan huecos ___ en el código? Los ___ dentro de comentarios no cuentan."""
    try:
        return any((isinstance(n, ast.Name) and n.id == "___")
                   or (isinstance(n, ast.Attribute) and n.attr == "___")              # re.___(…)
                   or (isinstance(n, ast.Constant) and isinstance(n.value, str) and "___" in n.value)  # r"\d{___}"
                   for n in ast.walk(ast.parse(code)))
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
        cases.append({"label": _t(f"Caso oculto {k + 1}", f"Hidden case {k + 1}"), "args": args, "stdin": [str(args[n]) for n in hidden["stdin"]]})
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


def _without_top_level_calls(code):
    """Vacía las líneas de las expresiones sueltas del programa principal (las pruebas del alumno,
    como «print(pedir_edad())»): en un caso con «call» solo cuenta la llamada de prueba, y así no
    gastan los datos de entrada ni ensucian el resultado. Se dejan las líneas en blanco para que
    los números de línea de los errores sigan coincidiendo con el editor."""
    try:
        tree = ast.parse(code)
    except SyntaxError:
        return code
    lines = code.split("\n")
    for node in tree.body:
        if isinstance(node, ast.Expr) and not isinstance(node.value, ast.Constant):
            for i in range(node.lineno - 1, node.end_lineno):
                lines[i] = ""
    return "\n".join(lines)


def _run_case(code, case):
    """Ejecuta un caso. Con «call», añade al final una llamada de prueba (p. ej. «print(area(3, 4))»)
    y se queda solo con lo que muestra esa llamada."""
    call = case.get("call")
    if not call:
        return execute(code, stdin=case.get("stdin", []), interactive=False, seed=1)
    res = execute(f"{_without_top_level_calls(code)}\nprint({_CALL_MARK!r})\n{call}\n", stdin=case.get("stdin", []), interactive=False, seed=1)
    printed = res["printed"]
    cut = printed.rfind(_CALL_MARK + "\n")
    if cut != -1:
        res = dict(res, printed=printed[cut + len(_CALL_MARK) + 1:])
    return res


def _check_functions(tree, spec):
    """spec["functions"] = [{"name": "area", "params": 2}]: comprueba que existen antes de llamarlas."""
    classes = {n.name for n in tree.body if isinstance(n, ast.ClassDef)}
    for cl in spec.get("classes", []):  # spec["classes"] = [{"name": "Punto"}]
        if cl["name"] not in classes:
            return {
                "status": "fail", "category": "comprension", "title": _t(f"Falta la clase «{cl['name']}»", f"The class «{cl['name']}» is missing"),
                "message": cl.get("missing_msg") or _t(
                    f"El enunciado pide definir una clase llamada «{cl['name']}» con `class {cl['name']}:`. "
                    "Comprueba el nombre exacto (las clases empiezan por mayúscula) y que está al principio de la línea.",
                    f"The task asks you to define a class called «{cl['name']}» with `class {cl['name']}:`. "
                    "Check the exact name (classes start with a capital letter) and that it's at the start of the line."),
                "cases": [],
            }
    defs = {n.name: n for n in tree.body if isinstance(n, ast.FunctionDef)}
    for fn in spec.get("functions", []):
        node = defs.get(fn["name"])
        if node is None:
            return {
                "status": "fail", "category": "comprension", "title": _t(f"Falta la función «{fn['name']}»", f"The function «{fn['name']}» is missing"),
                "message": fn.get("missing_msg") or _t(
                    f"El enunciado pide definir una función llamada «{fn['name']}» con `def {fn['name']}(...):`. "
                    "Comprueba que el nombre coincide exactamente (mayúsculas incluidas) y que está al principio de la línea.",
                    f"The task asks you to define a function called «{fn['name']}» with `def {fn['name']}(...):`. "
                    "Check that the name matches exactly (capitals included) and that it's at the start of the line."),
                "cases": [],
            }
        want = fn.get("params")
        got = len(node.args.args)
        if want is not None and got != want:
            plural = _t("parámetro", "parameter") if want == 1 else _t("parámetros", "parameters")
            return {
                "status": "fail", "category": "comprension", "title": _t("Revisa los parámetros", "Check the parameters"),
                "message": _t(f"«{fn['name']}» debe recibir {want} {plural} y la tuya recibe {got}.", f"«{fn['name']}» must take {want} {plural} and yours takes {got}."),
                "cases": [],
            }
    return None


def check(code, spec):
    if spec.get("blanks") and _has_blanks(code):
        return {
            "status": "fail", "category": "incompleto", "title": _t("Quedan huecos por completar", "There are still gaps to fill in"),
            "message": _t("Sustituye cada ___ por el código que falta antes de comprobar.", "Replace each ___ with the missing code before checking."), "cases": [],
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
            return _tamper_result()
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
                first_fail = {"status": "fail", "category": mis.get("category", "comprension"), "title": mis.get("title", _t("Revisa qué pide el enunciado", "Check what the task asks for")), "message": mis["msg"], "case": label, "detail": detail}
            else:
                first_fail = {"status": "fail", "category": "logica", "title": _t("El programa se ejecuta, pero el resultado no es el esperado", "The program runs, but the result isn't the expected one"),
                              "message": spec.get("logic_msg", _t("Compara lo que muestra tu programa con lo que se esperaba en este caso.", "Compare what your program shows with what was expected in this case.")), "case": label, "detail": detail}

    if first_fail:
        first_fail["cases"] = results
        return first_fail

    for var in spec.get("variants", []):
        variant_code, missing = _apply_variant(code, var)
        label = var.get("label", _t("Prueba con otros valores", "Test with other values"))
        if missing:
            # Nunca se omite una variante en silencio: sin el dato de partida no se puede
            # comprobar que el programa calcula en lugar de escribir el resultado a mano.
            results.append({"label": label, "ok": False})
            name = missing[0]
            return {
                "status": "fail", "category": "logica", "title": _t("Falta el dato de partida", "The starting value is missing"),
                "message": var.get("missing_msg") or _t(
                    f"Tu programa debe guardar el valor inicial en la variable «{name}», como en el código inicial, "
                    "y calcular el resultado a partir de ella. Así funcionará con cualquier dato, no solo con este.",
                    f"Your program must store the starting value in the variable «{name}», as in the starting code, "
                    "and calculate the result from it. That way it will work with any data, not just this one."),
                "cases": results,
            }
        res = _run_case(variant_code, var)
        if res["tampered"]:
            return _tamper_result()
        ok = res["status"] == "ok" and _compare(var, spec, res)[0]
        results.append({"label": label, "ok": ok})
        if not ok:
            return {"status": "fail", "category": "logica", "title": _t("Funciona solo con estos valores concretos", "It only works with these specific values"), "message": var["msg"], "cases": results}

    rule = _rules(tree, spec)
    if rule:
        sev = rule.get("severity", "fail")
        if sev == "fail":
            return {"status": "fail", "category": rule.get("category", "logica"), "title": rule.get("title", _t("Falta algo importante", "Something important is missing")), "message": rule["msg"], "cases": results}

    tips = _suggestions(tree, spec)
    if tips:
        return {"status": "pass", "category": "mejorable", "title": _t("¡Correcto! Y se puede pulir un poco", "Correct! And it can be polished a little"), "message": tips[0], "suggestions": tips, "cases": results}
    return {"status": "pass", "category": "correcto", "title": _t("¡Correcto!", "Correct!"),
            "message": spec.get("success_msg", _t("Tu programa resuelve el problema en todos los casos de prueba.", "Your program solves the problem in all the test cases.")), "cases": results}


# ---------------------------------------------------------------------------
# API JSON
# ---------------------------------------------------------------------------

def _clean_run(res):
    return {"status": res["status"], "segs": res["segs"], "prompt": res["prompt"], "error": res["error"], "tampered": res["tampered"]}


def api_run(payload):
    p = json.loads(payload)
    _set_lang(p)
    return json.dumps(_clean_run(execute(p["code"], p.get("stdin", []), interactive=True, seed=p.get("seed"))))


def api_trace(payload):
    p = json.loads(payload)
    _set_lang(p)
    return json.dumps(trace(p["code"], p.get("stdin", []), seed=p.get("seed")))


def api_check(payload):
    p = json.loads(payload)
    _set_lang(p)
    return json.dumps(check(p["code"], p["spec"]))


def api_version(_payload="{}"):
    return json.dumps({"python": sys.version.split()[0]})


# Estado de referencia del motor: cualquier cambio posterior lo ha hecho el código del alumno.
_ENGINE_SNAPSHOT.update({k: v for k, v in globals().items() if not k.startswith("__")})
