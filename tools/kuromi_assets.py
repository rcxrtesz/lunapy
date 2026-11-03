"""
Prepara las imágenes de Kuromi de LunaPy a partir de los originales (assets-src/kuromi/*.jpg):
quita el fondo blanco, recorta, reduce y genera los iconos de la app.

    python tools/kuromi_assets.py

Necesita Pillow (pip install pillow). Solo hace falta volver a ejecutarlo si cambian los originales;
después, python tools/build_sw.py.

Cómo se quita el fondo: se rellena desde los bordes todo lo que sea casi blanco (el contorno negro del
pixel art hace de frontera, así la cara blanca de Kuromi no se toca). Los huecos de fondo encerrados
por el dibujo se indican a mano en HUECOS.
"""

import os
from collections import deque

from PIL import Image, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "assets-src", "kuromi")
IMG = os.path.join(ROOT, "img")
ICONS = os.path.join(ROOT, "icons")

# Huecos de fondo rodeados por el dibujo (coordenadas en el original de 2000×2000).
HUECOS = {
    "kuromi_vespa": [],
    "kuromi_motera": [],
    "kuromi_luna": [],
    "kuromi_kawasaki": [],
}
TAMANO = 512  # lado mayor de las imágenes de la app


def es_fondo(p):
    r, g, b = p[:3]
    return min(r, g, b) > 205 and max(r, g, b) - min(r, g, b) < 30


def sin_fondo(img, huecos):
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    visto = bytearray(w * h)
    cola = deque()
    semillas = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)] + [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    semillas += huecos
    for x, y in semillas:
        if es_fondo(px[x, y]) and not visto[y * w + x]:
            visto[y * w + x] = 1
            cola.append((x, y))
    while cola:
        x, y = cola.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visto[ny * w + nx] and es_fondo(px[nx, ny]):
                visto[ny * w + nx] = 1
                cola.append((nx, ny))
    alfa = Image.frombytes("L", (w, h), bytes(0 if v else 255 for v in visto))
    # Suaviza un poco el borde (los restos de compresión JPEG del contorno).
    alfa = alfa.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    img.putalpha(alfa)
    return img


def recortar(img, margen=0.02):
    caja = img.getchannel("A").point(lambda a: 255 if a > 20 else 0).getbbox()
    m = int(max(img.size) * margen)
    caja = (max(caja[0] - m, 0), max(caja[1] - m, 0), min(caja[2] + m, img.width), min(caja[3] + m, img.height))
    return img.crop(caja)


def reducir(img, lado):
    k = lado / max(img.size)
    return img.resize((round(img.width * k), round(img.height * k)), Image.LANCZOS)


def guardar(img, ruta):
    img.save(ruta, optimize=True)
    print(f"{os.path.relpath(ruta, ROOT)}: {img.width}×{img.height}, {os.path.getsize(ruta) // 1024} KB")


def icono(cara, lado, fondo=None, escala=0.92):
    """La cara de Kuromi centrada en un cuadrado; fondo opcional (para iOS y los «maskable»)."""
    lienzo = Image.new("RGBA", (lado, lado), fondo or (0, 0, 0, 0))
    c = reducir(cara, round(lado * escala))
    lienzo.alpha_composite(c, ((lado - c.width) // 2, (lado - c.height) // 2))
    return lienzo


def main():
    os.makedirs(IMG, exist_ok=True)
    limpias = {}
    for nombre, huecos in HUECOS.items():
        original = Image.open(os.path.join(SRC, f"{nombre}.jpg"))
        limpia = recortar(sin_fondo(original, huecos))
        limpias[nombre] = limpia
        guardar(reducir(limpia, TAMANO), os.path.join(IMG, f"{nombre}.png"))

    cara = limpias["kuromi_luna"]
    lila = (0xEE, 0xE4, 0xFA, 255)
    guardar(icono(cara, 192), os.path.join(ICONS, "icon-192.png"))
    guardar(icono(cara, 512), os.path.join(ICONS, "icon-512.png"))
    guardar(icono(cara, 64, escala=1), os.path.join(ICONS, "favicon.png"))
    # Android recorta los «maskable» en círculo: fondo completo y dibujo en la zona segura central.
    guardar(icono(cara, 512, lila, 0.72), os.path.join(ICONS, "icon-maskable-512.png"))
    # iOS no admite transparencia (la pinta de negro): fondo lila.
    guardar(icono(cara, 180, lila, 0.84), os.path.join(ICONS, "apple-touch-icon.png"))


if __name__ == "__main__":
    main()
