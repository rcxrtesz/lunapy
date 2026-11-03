"""Ayudas de las pruebas de la API para los correos (modo 'archivo': cada correo es un JSON en una carpeta)."""

import glob
import json
import os
import re


def correos(carpeta):
    """Correos enviados, del más antiguo al más reciente."""
    out = []
    for ruta in sorted(glob.glob(os.path.join(carpeta, "*.json")), key=os.path.getmtime):
        with open(ruta, encoding="utf-8") as f:
            out.append(json.load(f))
    return out


def ultimo(carpeta, para, asunto_contiene):
    for c in reversed(correos(carpeta)):
        if c["para"] == para and asunto_contiene in c["asunto"]:
            return c
    return None


def token_del_enlace(correo, ruta):
    """Token del enlace «…#/<ruta>?t=TOKEN» del correo."""
    m = re.search(rf"#/{ruta}\?t=([0-9a-f]{{64}})", correo["texto"])
    return m.group(1) if m else None
