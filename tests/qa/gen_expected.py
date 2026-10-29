"""
Genera tests/qa/expected.json con salidas y secuencias de líneas de referencia
calculadas con el CPython local, para compararlas con Pyodide en tests/qa/qa.html.

    python tests/qa/gen_expected.py
"""

import json
import os
import platform
import sys

sys.path.insert(0, os.path.dirname(__file__))
from test_runtime_qa import SNIPPETS, cpython_output, reference_lines  # noqa: E402

TRACE_PROGRAMS = [
    "t = 0\nfor i in range(3):\n    t = t + i\nprint(t)",
    "def doble(x):\n    y = x * 2\n    return y\n\nz = doble(4)\nprint(z)",
    "n = 3\nwhile n > 0:\n    n -= 1\nif n == 0:\n    print('fin')",
]

data = {
    "python": platform.python_version(),
    "snippets": {name: {"code": code, "output": cpython_output(code)} for name, code in SNIPPETS.items()},
    "traces": [{"code": c, "lines": reference_lines(c)} for c in TRACE_PROGRAMS],
}
path = os.path.join(os.path.dirname(__file__), "expected.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print(f"Escrito {path} (CPython {data['python']}, {len(data['snippets'])} fragmentos)")
