"""
Genera sw-assets.js: la lista de archivos que el service worker guarda para que LunaPy
funcione sin conexión, y una versión calculada a partir de su contenido.

    python tools/build_sw.py          # regenera sw-assets.js
    python tools/build_sw.py --check  # falla si sw-assets.js está desactualizado

Hay que regenerarlo cada vez que cambie cualquier archivo de la app: si la versión
cambia, la app instalada descarga la actualización y ofrece aplicarla.
(tests/test_pwa.py comprueba que está al día.)
"""

import hashlib
import json
import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUTPUT = os.path.join(ROOT, "sw-assets.js")

ROOT_FILES = ["index.html", "manifest.webmanifest"]
DIRS = {"src": (".js", ".css", ".py"), "icons": (".png", ".svg"), "vendor": (".js", ".css", ".wasm", ".zip", ".json", ".woff2")}


def collect():
    files = list(ROOT_FILES)
    for d, exts in DIRS.items():
        for base, _dirs, names in os.walk(os.path.join(ROOT, d)):
            for n in names:
                if n.endswith(exts):
                    files.append(os.path.relpath(os.path.join(base, n), ROOT).replace(os.sep, "/"))
    return sorted(files)


def render():
    files = collect()
    h = hashlib.sha256()
    for rel in files:
        h.update(rel.encode())
        with open(os.path.join(ROOT, rel), "rb") as f:
            # Normaliza saltos de línea: el mismo contenido da la misma versión en Windows y en Linux.
            h.update(f.read().replace(b"\r\n", b"\n"))
    version = h.hexdigest()[:12]
    assets = ["./"] + [f"./{rel}" for rel in files]
    return (
        "// Generado por tools/build_sw.py — no editar a mano.\n"
        f"self.LUNAPY_VERSION = {json.dumps(version)};\n"
        f"self.LUNAPY_ASSETS = {json.dumps(assets, indent=2)};\n"
    )


def main():
    text = render()
    if "--check" in sys.argv:
        current = open(OUTPUT, encoding="utf-8").read() if os.path.exists(OUTPUT) else ""
        if current.replace("\r\n", "\n") != text:
            sys.exit("sw-assets.js está desactualizado: ejecuta python tools/build_sw.py")
        print("sw-assets.js al día")
        return
    with open(OUTPUT, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    n = text.count('"./')
    print(f"sw-assets.js: {n} archivos, versión {text.split(chr(34))[1]}")


if __name__ == "__main__":
    main()
