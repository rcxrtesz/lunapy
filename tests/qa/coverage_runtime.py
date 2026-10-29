"""
Cobertura de líneas de src/engine/runtime.py usando solo la biblioteca estándar (módulo trace).

    python tests/qa/coverage_runtime.py            # tests originales + QA
    python tests/qa/coverage_runtime.py original   # solo tests/test_runtime.py
"""

import os
import sys
import trace
import unittest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TARGET = os.path.join(ROOT, "src", "engine", "runtime.py")
sys.path.insert(0, os.path.join(ROOT, "src", "engine"))


def main():
    only_original = len(sys.argv) > 1 and sys.argv[1] == "original"
    def discover_and_run():
        # El descubrimiento importa runtime: debe ocurrir dentro del trazado para contar
        # también las líneas de nivel de módulo.
        loader = unittest.TestLoader()
        suite = loader.discover(os.path.join(ROOT, "tests"), top_level_dir=os.path.join(ROOT, "tests"))
        if not only_original:
            suite.addTests(loader.discover(os.path.join(ROOT, "tests", "qa")))
        return unittest.TextTestRunner(stream=open(os.devnull, "w"), verbosity=0).run(suite)

    tracer = trace.Trace(count=True, trace=False)
    result = tracer.runfunc(discover_and_run)
    counts = tracer.results().counts

    executable = {ln for ln in trace._find_executable_linenos(TARGET) if isinstance(ln, int)}
    executed = {ln for (fname, ln), n in counts.items() if os.path.abspath(fname) == TARGET and n > 0}
    hit = executable & executed
    missed = sorted(executable - executed)
    pct = 100 * len(hit) / len(executable)
    label = "tests originales" if only_original else "tests originales + QA"
    print(f"{label}: {result.testsRun} tests, fallos={len(result.failures)}, errores={len(result.errors)}, "
          f"fallos esperados={len(result.expectedFailures)}")
    print(f"Cobertura de líneas de runtime.py: {len(hit)}/{len(executable)} = {pct:.1f} %")
    print("Líneas sin ejecutar:", ", ".join(map(str, missed)))


if __name__ == "__main__":
    main()
