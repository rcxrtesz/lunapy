"""Pruebas de la app instalable (PWA): python -m unittest discover tests"""

import json
import os
import re
import subprocess
import sys
import unittest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as f:
        return f.read()


class PwaTests(unittest.TestCase):
    def test_manifest(self):
        m = json.loads(read("manifest.webmanifest"))
        for key in ("name", "short_name", "start_url", "display", "icons", "theme_color", "background_color"):
            self.assertIn(key, m)
        self.assertEqual(m["display"], "standalone")
        sizes = {i["sizes"] for i in m["icons"]}
        self.assertTrue({"192x192", "512x512"} <= sizes)
        self.assertTrue(any(i.get("purpose") == "maskable" for i in m["icons"]))
        for icon in m["icons"]:
            self.assertTrue(os.path.exists(os.path.join(ROOT, icon["src"])), icon["src"])

    def test_png_icons_have_declared_size(self):
        for name, size in [("icon-192.png", 192), ("icon-512.png", 512), ("icon-maskable-512.png", 512), ("apple-touch-icon.png", 180)]:
            with open(os.path.join(ROOT, "icons", name), "rb") as f:
                head = f.read(24)
            self.assertEqual(head[:8], b"\x89PNG\r\n\x1a\n")
            self.assertEqual((int.from_bytes(head[16:20], "big"), int.from_bytes(head[20:24], "big")), (size, size), name)

    def test_no_external_resources(self):
        """Sin conexión no se puede cargar nada de internet: todo debe ser local."""
        files = ["index.html", "sw.js", "src/styles.css", "src/engine/worker.js", "src/lib/ui.js"]
        for base, _d, names in os.walk(os.path.join(ROOT, "src")):
            files += [os.path.relpath(os.path.join(base, n), ROOT) for n in names if n.endswith(".js")]
        # Recursos que se cargan (scripts, estilos, módulos, fuentes, fetch). Los enlaces <a href> sí pueden ser externos.
        pattern = re.compile(r"""(?:\bsrc\s*=|\bfrom\s|importScripts\(|url\(|fetch\(|<link[^>]*href=)\s*['"`(]?\s*https?://""")
        for rel in sorted(set(files)):
            self.assertIsNone(pattern.search(read(rel)), f"{rel} carga un recurso externo")

    def test_sw_assets_up_to_date(self):
        r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "build_sw.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)

    def test_precache_files_exist(self):
        text = read("sw-assets.js")
        assets = json.loads(text.split("self.LUNAPY_ASSETS = ", 1)[1].rstrip().rstrip(";"))
        self.assertIn("./vendor/pyodide/pyodide.asm.wasm", assets)
        self.assertIn("./src/engine/runtime.py", assets)
        for a in assets:
            if a != "./":
                self.assertTrue(os.path.exists(os.path.join(ROOT, a[2:])), a)

    def test_vendor_integrity(self):
        r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "vendor.py"), "--check"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)


if __name__ == "__main__":
    unittest.main()
