"""
Descarga a vendor/ las dependencias que LunaPy necesita para funcionar sin conexión,
en versiones fijas, y escribe vendor/VENDOR.md con su origen, tamaño y huella SHA-256.

    python tools/vendor.py          # descarga lo que falte
    python tools/vendor.py --check  # verifica que lo descargado coincide con VENDOR.md
"""

import hashlib
import os
import sys
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VENDOR = os.path.join(ROOT, "vendor")

PYODIDE = "0.27.7"
CODEMIRROR = "5.65.16"
HTM = "3.1.1"
FONTS = "5.3.0"
JSD = "https://cdn.jsdelivr.net"

FILES = [
    # Python en el navegador (Pyodide) — MPL-2.0
    (f"{JSD}/pyodide/v{PYODIDE}/full/pyodide.js", f"pyodide/pyodide.js"),
    (f"{JSD}/pyodide/v{PYODIDE}/full/pyodide.asm.js", f"pyodide/pyodide.asm.js"),
    (f"{JSD}/pyodide/v{PYODIDE}/full/pyodide.asm.wasm", f"pyodide/pyodide.asm.wasm"),
    (f"{JSD}/pyodide/v{PYODIDE}/full/python_stdlib.zip", f"pyodide/python_stdlib.zip"),
    (f"{JSD}/pyodide/v{PYODIDE}/full/pyodide-lock.json", f"pyodide/pyodide-lock.json"),
    (f"https://raw.githubusercontent.com/pyodide/pyodide/{PYODIDE}/LICENSE", "pyodide/LICENSE"),
    # Editor de código (CodeMirror 5) — MIT
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/lib/codemirror.min.js", "codemirror/codemirror.min.js"),
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/lib/codemirror.min.css", "codemirror/codemirror.min.css"),
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/mode/python/python.min.js", "codemirror/python.min.js"),
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/addon/edit/matchbrackets.min.js", "codemirror/matchbrackets.min.js"),
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/addon/edit/closebrackets.min.js", "codemirror/closebrackets.min.js"),
    (f"{JSD}/npm/codemirror@{CODEMIRROR}/LICENSE", "codemirror/LICENSE"),
    # Interfaz (Preact + htm) — htm: Apache-2.0, Preact: MIT
    (f"{JSD}/npm/htm@{HTM}/preact/standalone.module.js", "preact/standalone.module.js"),
    (f"{JSD}/npm/htm@{HTM}/LICENSE", "preact/LICENSE-htm"),
    (f"{JSD}/npm/preact@10.26.4/LICENSE", "preact/LICENSE-preact"),
    # Tipografías (Inter y JetBrains Mono, variables) — SIL OFL 1.1
    (f"{JSD}/npm/@fontsource-variable/inter@{FONTS}/files/inter-latin-wght-normal.woff2", "fonts/inter-latin.woff2"),
    (f"{JSD}/npm/@fontsource-variable/inter@{FONTS}/files/inter-latin-ext-wght-normal.woff2", "fonts/inter-latin-ext.woff2"),
    (f"{JSD}/npm/@fontsource-variable/jetbrains-mono@{FONTS}/files/jetbrains-mono-latin-wght-normal.woff2", "fonts/jetbrains-mono-latin.woff2"),
    (f"{JSD}/npm/@fontsource-variable/jetbrains-mono@{FONTS}/files/jetbrains-mono-latin-ext-wght-normal.woff2", "fonts/jetbrains-mono-latin-ext.woff2"),
    (f"{JSD}/npm/@fontsource-variable/inter@{FONTS}/LICENSE", "fonts/LICENSE-inter"),
    (f"{JSD}/npm/@fontsource-variable/jetbrains-mono@{FONTS}/LICENSE", "fonts/LICENSE-jetbrains-mono"),
]


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": "lunapy-vendor/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "wb") as f:
        f.write(data)


def main():
    check = "--check" in sys.argv
    rows = []
    total = 0
    for url, rel in FILES:
        dest = os.path.join(VENDOR, rel)
        if not os.path.exists(dest):
            if check:
                sys.exit(f"Falta {rel}: ejecuta python tools/vendor.py")
            print("Descargando", rel)
            download(url, dest)
        size = os.path.getsize(dest)
        total += size
        rows.append((rel, size, sha256(dest), url))

    lines = ["# Dependencias incluidas (vendor/)", "",
             "Generado por `python tools/vendor.py`. Se incluyen en el repositorio para que LunaPy funcione sin conexión.", "",
             "| Archivo | Tamaño | SHA-256 | Origen |", "|---|---|---|---|"]
    for rel, size, digest, url in rows:
        lines.append(f"| `{rel}` | {size / 1024:,.0f} KB | `{digest[:16]}…` | {url} |")
    lines += ["", f"**Total:** {total / 1048576:.1f} MB", ""]
    text = "\n".join(lines)
    path = os.path.join(VENDOR, "VENDOR.md")
    if check:
        with open(path, encoding="utf-8") as f:
            if f.read() != text:
                sys.exit("vendor/ no coincide con VENDOR.md")
        print("vendor/ verificado")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Listo: {len(rows)} archivos, {total / 1048576:.1f} MB")


if __name__ == "__main__":
    main()
