"""
Auditoría QA del motor (src/engine/runtime.py) con CPython.

    python -m unittest discover tests/qa -v

Los tests describen el comportamiento ESPERADO. Los que fallan por un bug
conocido están marcados con @expectedFailure y el identificador del bug
(ver QA_REPORT.md). Cuando el bug se corrija, aparecerán como
«unexpected success»: entonces hay que quitar la marca.

Nota: CPython local es 3.14 y Pyodide usa 3.12; los mensajes de error de
Python pueden diferir ligeramente. El comportamiento en Pyodide se prueba en
tests/qa/qa.html.
"""

import builtins
import contextlib
import io
import json
import math
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "src", "engine"))
import runtime  # noqa: E402

expectedFailure = unittest.expectedFailure


def run(code, stdin=()):
    return json.loads(runtime.api_run(json.dumps({"code": code, "stdin": list(stdin)})))


def out(res):
    return "".join(s for _, s in res["segs"])


def cpython_output(code, stdin=()):
    """Salida de referencia: el mismo código ejecutado directamente por CPython."""
    feed = iter(stdin)
    buf = io.StringIO()
    ns = {"__name__": "__main__", "input": lambda p="": (buf.write(str(p)), next(feed))[1]}
    with contextlib.redirect_stdout(buf):
        exec(compile(code, "<ref>", "exec"), ns)
    return buf.getvalue()


# ---------------------------------------------------------------------------
# A. Ejecución: la salida coincide con la de CPython
# ---------------------------------------------------------------------------
SNIPPETS = {
    "enteros": "a = 7\nb = 2\nprint(a + b, a - b, a * b)",
    "division": "print(7 / 2, 7 // 2, -7 // 2, 7 % 3, -7 % 3, 2 ** 10)",
    "decimales": "print(0.1 + 0.2, round(2.675, 2), 1e3, 10 / 4)",
    "booleanos": "print(True and False, True or False, not True, 3 > 2, 3 == 3.0, 'a' < 'b')",
    "cadenas": "s = 'Hola'\nprint(s + ' mundo', s * 3, len(s), s[0], s[-1], s.upper())",
    "conversion": "print(int('42') + 1, float('3.5'), str(10) + '0', int(3.9), bool(''), bool('0'))",
    "print_args": "print('a', 'b', sep='-', end='!\\n')\nprint()\nprint(1, 2.5, None, True)",
    "condicional": "n = 5\nif n > 3:\n    print('grande')\nelif n > 1:\n    print('medio')\nelse:\n    print('pequeño')",
    "bucles": "t = 0\nfor i in range(5):\n    t += i\nwhile t > 3:\n    t -= 4\nprint(t, i)",
    "unicode": "print('Ñandú, cigüeña, acción ✓ 🐍🌙')\nprint(len('🐍'), 'ß'.upper())",
    "fstring": "p = 59.99\nprint(f'{p:.2f} € y {p*0.15:.1f}')",
    "funciones": "def doble(x):\n    return x * 2\nprint(doble(4), doble('ab'))",
}


class ExecutionTests(unittest.TestCase):
    def test_snippets_match_cpython(self):
        for name, code in SNIPPETS.items():
            with self.subTest(snippet=name):
                res = run(code)
                self.assertEqual(res["status"], "ok", res.get("error"))
                self.assertEqual(out(res), cpython_output(code))

    def test_input_order_and_multiple_prompts(self):
        code = "a = input('Uno: ')\nb = input('Dos: ')\nc = input(3)\nprint(c, b, a)"
        self.assertEqual(run(code)["prompt"], "Uno: ")
        self.assertEqual(run(code, ["x"])["prompt"], "Dos: ")
        self.assertEqual(run(code, ["x", "y"])["prompt"], "3")
        res = run(code, ["x", "y", "z"])
        self.assertEqual(res["status"], "ok")
        self.assertEqual(res["segs"], [["out", "Uno: "], ["in", "x\n"], ["out", "Dos: "], ["in", "y\n"], ["out", "3"], ["in", "z\n"], ["out", "z y x\n"]])

    def test_input_empty_and_unicode_values(self):
        res = run("a = input()\nb = input()\nprint(repr(a), b)", ["", "ñ🐍"])
        self.assertEqual(out(res).splitlines()[-1], "'' ñ🐍")

    def test_stderr_is_separated(self):
        res = run("import sys\nprint('ok')\nprint('aviso', file=sys.stderr)")
        self.assertIn(["err", "aviso\n"], res["segs"])

    def test_sys_exit_is_normal_end(self):
        res = run("print(1)\nimport sys\nsys.exit()\nprint(2)")
        self.assertEqual((res["status"], out(res)), ("ok", "1\n"))

    def test_output_limit(self):
        res = run("while True:\n    print('x' * 100)")
        self.assertEqual(res["status"], "error")
        self.assertEqual(res["error"]["type"], "OutputLimit")
        self.assertLessEqual(len(out(res)), runtime.MAX_OUT)

    def test_huge_single_print_is_limited(self):
        res = run("print('x' * 1_000_000)")
        self.assertEqual(res["error"]["type"], "OutputLimit")

    def test_stdout_restored_after_user_replaces_it(self):
        run("import sys\nsys.stdout = None")
        self.assertIsNot(sys.stdout, None)
        self.assertEqual(out(run("print('sigo')")), "sigo\n")


# ---------------------------------------------------------------------------
# B. Aislamiento entre ejecuciones
# ---------------------------------------------------------------------------
class IsolationTests(unittest.TestCase):
    def setUp(self):
        self._pi = math.pi
        self._len = builtins.len

    def tearDown(self):
        math.pi = self._pi
        builtins.len = self._len

    def test_variables_do_not_leak(self):
        run("secreto = 42")
        self.assertEqual(run("print(secreto)")["error"]["type"], "NameError")

    def test_user_builtins_override_does_not_leak(self):
        run("print = 5")
        self.assertEqual(out(run("print('hola')")), "hola\n")

    # Regresión BUG-003 (corregido)
    def test_module_state_does_not_leak(self):
        run("import math\nmath.pi = 3")
        self.assertEqual(out(run("import math\nprint(math.pi)")), f"{self._pi}\n")

    # Regresión BUG-003 (corregido)
    def test_builtins_module_patch_does_not_leak(self):
        run("import builtins\nbuiltins.len = lambda x: 0")
        self.assertEqual(out(run("print(len('abc'))")), "3\n")


# ---------------------------------------------------------------------------
# D. Seguridad: bloqueo de módulos y manipulación del validador
# ---------------------------------------------------------------------------
class SecurityTests(unittest.TestCase):
    """En CPython no existe 'js': se bloquea temporalmente 'json' para comprobar el mecanismo."""

    def setUp(self):
        runtime.BLOCKED_MODULES.add("json")
        self._compare = runtime._compare

    def tearDown(self):
        runtime.BLOCKED_MODULES.discard("json")
        runtime._compare = self._compare

    def test_direct_import_blocked(self):
        self.assertEqual(run("import json")["error"]["type"], "ImportError")
        self.assertEqual(run("from json import dumps")["error"]["type"], "ImportError")

    # Regresión BUG-002 (corregido)
    def test_importlib_bypass_blocked(self):
        self.assertEqual(run("import importlib\nimportlib.import_module('json')")["status"], "error")

    # Regresión BUG-002 (corregido)
    def test_builtins_import_bypass_blocked(self):
        self.assertEqual(run("import builtins\nbuiltins.__import__('json')")["status"], "error")

    # Regresión BUG-002 (corregido)
    def test_sys_modules_bypass_blocked(self):
        self.assertEqual(run("import sys\nsys.modules['json'].dumps(1)")["status"], "error")

    # Regresión BUG-001 (corregido)
    def test_student_cannot_patch_validator(self):
        spec = {"cases": [{"stdin": ["100", "20"], "args": {"p": 100, "d": 20}},
                          {"stdin": ["50", "10"], "args": {"p": 50, "d": 10}}],
                "expect_last_number": "p - p * d / 100"}
        trampa = "import sys\nsys.modules['runtime']._compare = lambda *a: (True, None)\ninput()\ninput()\nprint(0)"
        self.assertEqual(runtime.check(trampa, spec)["status"], "fail")


# ---------------------------------------------------------------------------
# F. Mensajes de error
# ---------------------------------------------------------------------------
class ErrorMessageTests(unittest.TestCase):
    def err(self, code):
        res = run(code)
        self.assertEqual(res["status"], "error", res)
        return res["error"]

    def test_catalogue(self):
        cases = {
            "x = 10 / 0": "División entre cero",
            "int('abc')": "No se puede convertir a número entero",
            "if True\n    print(1)": "Faltan los dos puntos",
            "  x = 1": "Problema de sangría",
            "if True:\nprint(1)": "Problema de sangría",
            "print 'hola'": "A print le faltan los paréntesis",
            "print(“hola”)": "Carácter no válido",
            "'3' * '2'": "Multiplicación con texto",
            "5 + 'a'": "Operación entre tipos incompatibles",
            "def f():\n    f()\nf()": "Demasiadas llamadas encadenadas",
            "print((1)": "Paréntesis sin cerrar",
            "print(1))": "Paréntesis de más",
        }
        for code, title in cases.items():
            with self.subTest(code=code):
                self.assertEqual(self.err(code)["title"], title)

    def test_comma_decimal_suggestion(self):
        self.assertIn("punto", self.err("float('3,5')")["suggestion"])

    def test_keyword_as_name(self):
        self.assertEqual(self.err("class = 5")["title"], "Palabra reservada")

    def test_runtime_line_inside_function(self):
        self.assertEqual(self.err("def f():\n    return 1 / 0\n\nf()")["line"], 2)

    def test_syntax_error_line(self):
        self.assertEqual(self.err("a = 1\nb = 2\nc = (3\n")["line"], 3)

    def test_name_suggestion(self):
        self.assertIn("nombre", self.err("nombre = 'a'\nprint(nombr)")["suggestion"])

    def test_eof_in_check_mode(self):
        r = runtime.check("a = input()\nb = input()\nprint(a)", {"cases": [{"stdin": ["1"], "out_lines": ["1"]}]})
        self.assertEqual(r["title"], "El programa pide más datos de los previstos")


# ---------------------------------------------------------------------------
# G. Traza paso a paso frente a un trazador independiente
# ---------------------------------------------------------------------------
def reference_lines(code):
    lines = []

    def tr(frame, event, arg):
        if frame.f_code.co_filename != "<ref>":
            return None
        if event == "line":
            lines.append(frame.f_lineno)
        return tr

    sys.settrace(tr)
    try:
        exec(compile(code, "<ref>", "exec"), {"__name__": "__main__", "print": lambda *a, **k: None})
    finally:
        sys.settrace(None)
    return lines


class TraceTests(unittest.TestCase):
    def trace(self, code, stdin=()):
        return json.loads(runtime.api_trace(json.dumps({"code": code, "stdin": list(stdin)})))

    def test_line_sequence_matches_reference(self):
        for code in [
            "t = 0\nfor i in range(3):\n    t = t + i\nprint(t)",
            "def doble(x):\n    y = x * 2\n    return y\n\nz = doble(4)\nprint(z)",
            "n = 3\nwhile n > 0:\n    n -= 1\nif n == 0:\n    print('fin')",
        ]:
            with self.subTest(code=code):
                res = self.trace(code)
                got = [s["line"] for s in res["steps"] if not s.get("end")]
                self.assertEqual(got, reference_lines(code))

    def test_function_frame_and_locals(self):
        res = self.trace("def doble(x):\n    y = x * 2\n    return y\n\nz = doble(4)")
        inner = [s for s in res["steps"] if s["line"] == 3][0]
        self.assertEqual([f["name"] for f in inner["frames"]], ["Programa principal", "doble()"])
        self.assertEqual({v["name"]: v["repr"] for v in inner["frames"][1]["vars"]}, {"x": "4", "y": "8"})

    def test_values_before_each_line(self):
        res = self.trace("a = 1\na = a + 1\na = a * 10")
        vals = [{v["name"]: v["repr"] for v in s["frames"][0]["vars"]} for s in res["steps"]]
        self.assertEqual(vals, [{}, {"a": "1"}, {"a": "2"}, {"a": "20"}])

    def test_error_step(self):
        res = self.trace("a = 1\nb = a + 'x'\nc = 3")
        self.assertEqual(res["steps"][-1]["error"]["type"], "TypeError")
        self.assertEqual(res["steps"][-1]["line"], 2)

    def test_output_offsets(self):
        res = self.trace("print('ab')\nprint('c')")
        self.assertEqual([s["out"] for s in res["steps"]], [0, 3, 5])

    def test_input_during_trace(self):
        res = self.trace("n = input('N: ')\nprint(n)")
        self.assertEqual(res["status"], "need_input")
        res = self.trace("n = input('N: ')\nprint(n)", ["7"])
        self.assertEqual(res["status"], "ok")
        self.assertEqual(res["steps"][-1]["frames"][0]["vars"], [{"name": "n", "type": "str", "repr": "'7'"}])


# ---------------------------------------------------------------------------
# Validador: casos generales y adversariales
# ---------------------------------------------------------------------------
DISCOUNT = {
    "cases": [
        {"stdin": ["100", "20"], "args": {"p": 100, "d": 20}},
        {"stdin": ["59.99", "15"], "args": {"p": 59.99, "d": 15}},
        {"stdin": ["40", "0"], "args": {"p": 40, "d": 0}},
    ],
    "expect_last_number": "p - p * d / 100",
    "misconceptions": [{"expr": "p * d / 100", "msg": "importe"}],
    "rules": [{"type": "must_call", "name": "input", "msg": "usa input"}],
}


class ValidatorTests(unittest.TestCase):
    def test_lookup_table_hardcode_rejected_when_not_all_cases_known(self):
        trampa = "p = input()\nd = input()\nprint({'100': 80, '59.99': 50.99}[p])"
        self.assertEqual(runtime.check(trampa, DISCOUNT)["status"], "fail")

    def test_rounding_to_two_decimals_accepted(self):
        code = "p = float(input())\nd = float(input())\nprint(f'{p - p * d / 100:.2f} €')"
        self.assertEqual(runtime.check(code, DISCOUNT)["status"], "pass")

    def test_comma_decimal_output_accepted(self):
        code = "p = float(input())\nd = float(input())\nprint(str(round(p - p * d / 100, 2)).replace('.', ','))"
        self.assertEqual(runtime.check(code, DISCOUNT)["status"], "pass")

    # Regresión PED-001 (corregido)
    def test_result_followed_by_other_number_accepted(self):
        code = ("precio = float(input())\ndescuento = float(input())\n"
                "final = precio - precio * descuento / 100\nprint('Pagas', final, 'euros tras un', descuento, '% de descuento')")
        self.assertEqual(runtime.check(code, DISCOUNT)["status"], "pass")

    # Regresión BUG-006 (corregido)
    def test_variant_not_skipped_by_spacing(self):
        spec = {"cases": [{"out_lines": ["20"]}],
                "variants": [{"replace": ["edad = 19", "edad = 30"], "out_lines": ["31"], "msg": "trampa"}]}
        self.assertEqual(runtime.check("edad=19\nedad = 20\nprint(edad)", spec)["status"], "fail")

    def test_blank_marker_inside_comment(self):
        # Regresión PED-005 (corregido): los ___ de un comentario no son huecos
        r = runtime.check("# rellena ___\nx = 1\nprint(x)", {"blanks": True, "cases": [{"out_lines": ["1"]}]})
        self.assertEqual(r["status"], "pass")
        r = runtime.check("x = ___\nprint(x)", {"blanks": True, "cases": [{"out_lines": ["1"]}]})
        self.assertEqual(r["category"], "incompleto")

    def test_vars_and_float_tolerance(self):
        spec = {"cases": [{"vars": {"x": 0.3}}]}
        self.assertEqual(runtime.check("x = 0.1 + 0.2", spec)["status"], "pass")

    def test_exit_inside_student_code(self):
        r = runtime.check("p = float(input())\nd = float(input())\nprint(p - p*d/100)\nimport sys\nsys.exit(0)", DISCOUNT)
        self.assertEqual(r["status"], "pass")


# ---------------------------------------------------------------------------
# Regresiones de las correcciones P0 (protección del motor y variantes por AST)
# ---------------------------------------------------------------------------
SPEC_EDAD = {
    "cases": [{"out_lines": ["20"]}],
    "variants": [{"set": {"edad": 30}, "out_lines": ["31"], "msg": "trampa"}],
}


class EngineProtectionTests(unittest.TestCase):
    def test_frame_walk_tamper_detected_and_restored(self):
        trampa = "import sys\nsys._getframe(1).f_globals['_compare'] = lambda *a: (True, None)\nprint(0)"
        r = runtime.check(trampa, DISCOUNT)
        self.assertEqual((r["status"], r["category"]), ("fail", "manipulacion"))
        self.assertIs(runtime._compare, runtime._ENGINE_SNAPSHOT["_compare"])
        self.assertEqual(runtime.check("print('nada')", DISCOUNT)["status"], "fail")

    def test_new_engine_global_removed(self):
        r = run("import sys\nsys._getframe(1).f_globals['intruso'] = 1")
        self.assertTrue(r["tampered"])
        self.assertFalse(hasattr(runtime, "intruso"))

    def test_json_patch_does_not_break_engine(self):
        raw = runtime.api_run(json.dumps({"code": "import json\njson.dumps = None\njson.loads = None", "stdin": []}))
        self.assertEqual(json.loads(raw)["status"], "ok")
        self.assertEqual(out(run("print('sigo')")), "sigo\n")

    def test_added_builtin_removed(self):
        run("import builtins\nbuiltins.extra = 1")
        self.assertEqual(run("print(extra)")["error"]["type"], "NameError")

    def test_recursion_limit_restored(self):
        limit = sys.getrecursionlimit()
        run("import sys\nsys.setrecursionlimit(50)")
        self.assertEqual(sys.getrecursionlimit(), limit)

    def test_warning_is_not_tampering(self):
        r = run("x = 'a'\nprint(x is 'a')")
        self.assertFalse(r["tampered"])

    def test_normal_run_is_not_tampering(self):
        self.assertFalse(run("import math\nprint(math.sqrt(16))")["tampered"])


class P1RegressionTests(unittest.TestCase):
    def setUp(self):
        runtime.BLOCKED_MODULES.add("json")

    def tearDown(self):
        runtime.BLOCKED_MODULES.discard("json")

    def test_blocked_modules_restored_after_run(self):
        run("x = 1")
        self.assertIn("json", sys.modules)
        self.assertNotIn(runtime._BLOCK_FINDER, sys.meta_path)

    def test_blocked_message_in_spanish(self):
        r = run("import importlib\nimportlib.import_module('json')")
        self.assertIn("no está disponible", r["error"]["original"])

    def test_misconception_still_detected_with_input_echo(self):
        code = "p = float(input())\nd = float(input())\nprint('Pagas', p * d / 100, 'euros con un', d, '%')"
        self.assertEqual(runtime.check(code, DISCOUNT)["category"], "comprension")

    def test_wrong_number_with_text_is_logic(self):
        code = "p = float(input())\nd = float(input())\nprint('Pagas', p + 1, 'euros')"
        self.assertEqual(runtime.check(code, DISCOUNT)["category"], "logica")

    def test_result_on_earlier_line_not_accepted(self):
        code = "p = float(input())\nd = float(input())\nprint(p - p * d / 100)\nprint('Gracias, vuelva el día', 7)"
        self.assertEqual(runtime.check(code, DISCOUNT)["status"], "fail")


HIDDEN = dict(DISCOUNT, hidden={"count": 2, "args": {"p": [1, 500, 2], "d": [0, 90, 0]}, "stdin": ["p", "d"]})


class P3RegressionTests(unittest.TestCase):
    def test_long_input_is_not_output(self):
        # Regresión BUG-011 (corregido)
        r = run("s = input()\nprint(len(s))", ["a" * 100000])
        self.assertEqual(r["status"], "ok")
        self.assertTrue(out(r).endswith("100000\n"))
        self.assertLess(len(out(r)), 3000)  # el eco se recorta

    def test_hidden_cases_reject_lookup_table(self):
        # Regresión LIM-002 (corregido)
        trampa = "p = input()\nd = input()\nprint({'100': 80, '59.99': 50.9915, '40': 40}[p])"
        r = runtime.check(trampa, HIDDEN)
        self.assertEqual(r["status"], "fail")
        self.assertIn("oculto", r["case"])

    def test_hidden_cases_accept_real_solution(self):
        r = runtime.check("precio = float(input())\ndescuento = float(input())\nprint(precio - precio * descuento / 100)", HIDDEN)
        self.assertEqual(r["status"], "pass")
        self.assertEqual(sum(1 for c in r["cases"] if "oculto" in c["label"]), 2)

    def test_hidden_cases_deterministic(self):
        code = "p = float(input())\nd = float(input())\nprint(p)"
        self.assertEqual(runtime.check(code, HIDDEN), runtime.check(code, HIDDEN))


class MustUseOpTests(unittest.TestCase):
    SPEC = {"cases": [{"out_lines": ["2 15"]}],
            "rules": [{"type": "must_use_op", "ops": ["FloorDiv", "Mod"], "msg": "usa // y %"}]}

    def test_operators_present(self):
        self.assertEqual(runtime.check("print(135 // 60, 135 % 60)", self.SPEC)["status"], "pass")

    def test_hardcoded_result_rejected(self):
        r = runtime.check("print(2, 15)", self.SPEC)
        self.assertEqual((r["status"], r["message"]), ("fail", "usa // y %"))

    def test_augmented_assignment_counts(self):
        self.assertEqual(runtime.check("h = 135\nh //= 60\nm = 135\nm %= 60\nprint(h, m)", self.SPEC)["status"], "pass")


class ExactLinesTests(unittest.TestCase):
    def test_numbers_tolerant_by_default(self):
        spec = {"cases": [{"out_lines": ["Total: 7.50 €"]}]}
        self.assertEqual(runtime.check('print("Total:", 7.5, "€")', spec)["status"], "pass")

    def test_exact_lines_requires_format(self):
        spec = {"exact_lines": True, "cases": [{"out_lines": ["Total: 7.50 €"]}],
                "misconceptions": [{"out_lines": ["Total: 7.5 €"], "title": "Formato", "msg": "usa :.2f"}]}
        self.assertEqual(runtime.check('print(f"Total: {7.5:.2f} €")', spec)["status"], "pass")
        r = runtime.check('print("Total:", 7.5, "€")', spec)
        self.assertEqual((r["status"], r["message"]), ("fail", "usa :.2f"))


class FunctionCallTests(unittest.TestCase):
    SPEC = {"functions": [{"name": "area", "params": 2}],
            "cases": [{"call": "print(area(3, 4))", "out_lines": ["12"]}, {"call": "print(area(2.5, 2))", "out_lines": ["5.0"]}],
            "misconceptions": [{"out_lines": ["12", "None"], "title": "Falta return", "msg": "usa return"}]}

    def test_correct_function_passes(self):
        self.assertEqual(runtime.check("def area(b, h):\n    return b * h", self.SPEC)["status"], "pass")

    def test_own_output_is_ignored(self):
        code = 'def area(b, h):\n    return b * h\nprint("prueba:", area(1, 1))'
        self.assertEqual(runtime.check(code, self.SPEC)["status"], "pass")

    def test_print_instead_of_return(self):
        r = runtime.check("def area(b, h):\n    print(b * h)", self.SPEC)
        self.assertEqual((r["status"], r["message"]), ("fail", "usa return"))

    def test_missing_function(self):
        r = runtime.check("def Area(b, h):\n    return b * h", self.SPEC)
        self.assertEqual((r["status"], r["title"]), ("fail", "Falta la función «area»"))

    def test_wrong_param_count(self):
        r = runtime.check("def area(b):\n    return b * b", self.SPEC)
        self.assertEqual((r["status"], r["title"]), ("fail", "Revisa los parámetros"))

    def test_error_inside_function(self):
        r = runtime.check("def area(b, h):\n    return b * altura", self.SPEC)
        self.assertEqual((r["status"], r["category"]), ("fail", "ejecucion"))

    def test_hardcoded_answer_fails_second_case(self):
        self.assertEqual(runtime.check("def area(b, h):\n    return 12", self.SPEC)["status"], "fail")


class VariantAstTests(unittest.TestCase):
    def test_any_spacing(self):
        self.assertEqual(runtime.check("edad=19\nedad = edad + 1\nprint(edad)", SPEC_EDAD)["status"], "pass")
        self.assertEqual(runtime.check("edad=19\nedad = 20\nprint(edad)", SPEC_EDAD)["status"], "fail")

    def test_tuple_assignment(self):
        self.assertEqual(runtime.check("x, edad = 0, 19\nprint(edad + 1)", SPEC_EDAD)["status"], "pass")

    def test_missing_variable_fails_with_message(self):
        r = runtime.check("print(20)", SPEC_EDAD)
        self.assertEqual((r["status"], r["title"]), ("fail", "Falta el dato de partida"))
        self.assertIn("edad", r["message"])

    def test_only_first_assignment_changed(self):
        self.assertEqual(runtime.check("edad = 19\nedad = 19 + 1\nprint(edad)", SPEC_EDAD)["status"], "fail")

    def test_legacy_replace_never_skipped(self):
        spec = {"cases": [{"out_lines": ["20"]}], "variants": [{"replace": ["edad = 19", "edad = 30"], "out_lines": ["31"], "msg": "x"}]}
        self.assertEqual(runtime.check("print(20)", spec)["status"], "fail")


if __name__ == "__main__":
    unittest.main()
