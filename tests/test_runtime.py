"""Pruebas del motor de ejecución con CPython: python -m unittest discover tests"""

import json
import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src", "engine"))
import runtime  # noqa: E402


def run(code, stdin=()):
    return json.loads(runtime.api_run(json.dumps({"code": code, "stdin": list(stdin)})))


def out(res):
    return "".join(s for _, s in res["segs"])


DISCOUNT_SPEC = {
    "cases": [
        {"stdin": ["100", "20"], "args": {"p": 100, "d": 20}},
        {"stdin": ["59.99", "15"], "args": {"p": 59.99, "d": 15}},
        {"stdin": ["40", "0"], "args": {"p": 40, "d": 0}},
    ],
    "expect_last_number": "p - p * d / 100",
    "misconceptions": [{"expr": "p * d / 100", "msg": "importe"}],
    "rules": [{"type": "must_call", "name": "input", "msg": "usa input"}],
}


class RunTests(unittest.TestCase):
    def test_print(self):
        res = run("edad = 18\nedad = edad + 2\nprint(edad)")
        self.assertEqual(res["status"], "ok")
        self.assertEqual(out(res), "20\n")

    def test_input_replay(self):
        code = 'n = input("Nombre: ")\nprint("Hola", n)'
        first = run(code)
        self.assertEqual(first["status"], "need_input")
        self.assertEqual(first["prompt"], "Nombre: ")
        second = run(code, ["Ana"])
        self.assertEqual(second["status"], "ok")
        self.assertEqual(second["segs"], [["out", "Nombre: "], ["in", "Ana\n"], ["out", "Hola Ana\n"]])

    def test_blocked_import(self):
        res = run("import js")
        self.assertEqual(res["error"]["type"], "ImportError")


class ErrorTests(unittest.TestCase):
    def err(self, code):
        res = run(code)
        self.assertEqual(res["status"], "error")
        return res["error"]

    def test_unterminated(self):
        e = self.err('print("hola)')
        self.assertEqual(e["kind"], "sintaxis")
        self.assertEqual(e["title"], "Texto sin cerrar")

    def test_reversed_assignment(self):
        self.assertEqual(self.err("18 = edad")["title"], "La asignación está al revés")

    def test_space_in_name(self):
        self.assertEqual(self.err("mi edad = 5")["title"], "Nombre de variable con espacios")

    def test_digit_start(self):
        self.assertEqual(self.err("2edad = 5")["title"], "Nombre que empieza por un número")

    def test_name_error_case(self):
        e = self.err("Edad = 3\nprint(edad)")
        self.assertEqual(e["line"], 2)
        self.assertIn("Edad", e["suggestion"])

    def test_concat(self):
        e = self.err('edad = 17\nprint("Tienes " + edad)')
        self.assertEqual(e["title"], "Mezcla de texto y números")
        self.assertEqual(e["line"], 2)

    def test_int_with_decimals(self):
        e = self.err('int("59.99")')
        self.assertIn("float()", e["suggestion"])


class TraceTests(unittest.TestCase):
    def test_steps(self):
        res = json.loads(runtime.api_trace(json.dumps({"code": "edad = 18\nedad = edad + 2\nprint(edad)"})))
        lines = [s["line"] for s in res["steps"]]
        self.assertEqual(lines, [1, 2, 3, None])
        final_vars = res["steps"][-1]["frames"][0]["vars"]
        self.assertEqual(final_vars, [{"name": "edad", "type": "int", "repr": "20"}])
        # antes de ejecutar la línea 2, edad vale 18
        self.assertEqual(res["steps"][1]["frames"][0]["vars"][0]["repr"], "18")
        self.assertEqual(res["steps"][2]["out"], 0)
        self.assertEqual(res["steps"][3]["out"], 3)

    def test_infinite_loop_limit(self):
        res = json.loads(runtime.api_trace(json.dumps({"code": "while True:\n    pass"})))
        self.assertEqual(res["status"], "trace_limit")


class CheckTests(unittest.TestCase):
    def check(self, code, spec=DISCOUNT_SPEC):
        return runtime.check(code, spec)

    def test_correct_variants(self):
        sols = [
            "precio = float(input())\ndescuento = float(input())\nprint(precio - precio * descuento / 100)",
            "precio = float(input('Precio: '))\ndescuento = float(input('Descuento: '))\nfinal = precio * (1 - descuento / 100)\nprint('Precio final:', round(final, 2))",
        ]
        for s in sols:
            r = self.check(s)
            self.assertEqual(r["status"], "pass", r)

    def test_hardcoded(self):
        r = self.check("print(80.0)")
        self.assertEqual(r["status"], "fail")

    def test_misconception(self):
        r = self.check("p = float(input())\nd = float(input())\nprint(p * d / 100)")
        self.assertEqual(r["category"], "comprension")

    def test_runtime_not_converted(self):
        r = self.check("p = input()\nd = input()\nprint(p - p * d / 100)")
        self.assertEqual(r["category"], "ejecucion")

    def test_int_edge_case(self):
        r = self.check("p = int(input())\nd = int(input())\nprint(p - p * d / 100)")
        self.assertEqual(r["category"], "ejecucion")
        self.assertEqual(r["case"], "Datos: 59.99, 15")

    def test_improvable(self):
        r = self.check("p = float(input())\nd = float(input())\nprint(p - p * d / 100)")
        self.assertEqual(r["category"], "mejorable")

    def test_blanks(self):
        r = runtime.check("x = ___", {"blanks": True, "cases": [{}]})
        self.assertEqual(r["category"], "incompleto")

    def test_variant_detects_hardcode(self):
        spec = {
            "cases": [{"out_lines": ["20"]}],
            "variants": [{"replace": ["edad = 19", "edad = 30"], "out_lines": ["31"], "msg": "hardcode"}],
        }
        self.assertEqual(runtime.check("edad = 19\nedad = edad + 1\nprint(edad)", spec)["status"], "pass")
        self.assertEqual(runtime.check("edad = 19\nedad = 20\nprint(edad)", spec)["message"], "hardcode")


if __name__ == "__main__":
    unittest.main()
