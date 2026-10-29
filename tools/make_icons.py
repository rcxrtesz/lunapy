"""
Genera los iconos de LunaPy (icons/) sin dependencias externas: PNG escritos a mano con zlib.

    python tools/make_icons.py

El logo es una luna creciente blanca con una estrella ámbar sobre el color índigo de la app.
Geometría (en una cuadrícula de 32×32, igual que el SVG del logo):
  luna   = círculo A (centro 17.204, 16.416; r 10) menos círculo B (centro 22, 14.25; r 8.5035)
  estrella = círculo (23.5, 9.5; r 2.4)
"""

import math
import os
import struct
import zlib

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "icons")

BG = (0x4A, 0x57, 0xF0)
WHITE = (255, 255, 255)
STAR = (0xF2, 0xA5, 0x16)
A = (17.204, 16.416, 10.0)
B = (22.0, 14.25, 8.5035)
S = (23.5, 9.5, 2.4)
SS = 4  # submuestreo para suavizar bordes


def inside(c, x, y):
    return (x - c[0]) ** 2 + (y - c[1]) ** 2 <= c[2] ** 2


def shade(x, y, radius):
    """Color en coordenadas de 0..32; None si queda fuera del fondo redondeado."""
    if radius:
        cx, cy = min(max(x, radius), 32 - radius), min(max(y, radius), 32 - radius)
        if (x - cx) ** 2 + (y - cy) ** 2 > radius ** 2:
            return None
    if inside(S, x, y):
        return STAR
    if inside(A, x, y) and not inside(B, x, y):
        return WHITE
    return BG


def render(size, *, radius=7.0, scale=1.0):
    """scale < 1 encoge el dibujo dentro del fondo (zona segura de los iconos «maskable»)."""
    rows = []
    for py in range(size):
        row = bytearray([0])  # filtro PNG: ninguno
        for px in range(size):
            acc = [0, 0, 0, 0]
            for sy in range(SS):
                for sx in range(SS):
                    x = (px + (sx + 0.5) / SS) / size * 32
                    y = (py + (sy + 0.5) / SS) / size * 32
                    bg_only = shade(x, y, radius) is None
                    if bg_only:
                        continue
                    lx, ly = 16 + (x - 16) / scale, 16 + (y - 16) / scale
                    col = shade(lx, ly, 0) if 0 <= lx <= 32 and 0 <= ly <= 32 else BG
                    acc[0] += col[0]; acc[1] += col[1]; acc[2] += col[2]; acc[3] += 255
            n = SS * SS
            alpha = acc[3] / n
            if alpha:
                k = acc[3] / 255
                row += bytes([round(acc[0] / k), round(acc[1] / k), round(acc[2] / k), round(alpha)])
            else:
                row += bytes([0, 0, 0, 0])
        rows.append(bytes(row))
    return png(size, size, b"".join(rows))


def png(w, h, raw):
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))


SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#4a57f0"/>
  <path d="M18.5 6.5A10 10 0 1 0 25.5 22 8 8 0 0 1 18.5 6.5z" fill="#fff"/>
  <circle cx="23.5" cy="9.5" r="2.4" fill="#f2a516"/>
</svg>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    targets = {
        "icon-192.png": dict(size=192),
        "icon-512.png": dict(size=512),
        # Android recorta los «maskable» en círculo o forma libre: fondo completo y dibujo en el 80 % central.
        "icon-maskable-512.png": dict(size=512, radius=0, scale=0.8),
        # iOS redondea las esquinas por su cuenta: fondo completo.
        "apple-touch-icon.png": dict(size=180, radius=0, scale=0.9),
    }
    for name, opts in targets.items():
        size = opts.pop("size")
        with open(os.path.join(OUT, name), "wb") as f:
            f.write(render(size, **opts))
        print("Generado", name)
    with open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8") as f:
        f.write(SVG)
    print("Generado favicon.svg")


if __name__ == "__main__":
    main()
