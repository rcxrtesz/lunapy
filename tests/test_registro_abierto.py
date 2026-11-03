"""Registro abierto: solo se admiten correos de proveedores fiables.

    python -m unittest tests.test_registro_abierto
"""

import json
import os
import shutil
import socket
import subprocess
import tempfile
import time
import unittest
import urllib.error
import urllib.request

from tests.test_api import PHP, ROOT, free_port


@unittest.skipUnless(PHP, "PHP no está instalado")
class RegistroAbiertoTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.mkdtemp()
        db = os.path.join(cls.tmp, "lunapy.sqlite").replace("\\", "/")
        buzon = os.path.join(cls.tmp, "correos").replace("\\", "/")
        config = os.path.join(cls.tmp, "config.php")
        with open(config, "w", encoding="utf-8") as f:
            # comprobar_mx desactivado: las pruebas no dependen de la red.
            f.write(f"<?php return ['dsn' => 'sqlite:{db}', 'emails_permitidos' => ['amiga@midominio.test'],\n"
                    f"  'registro_abierto' => true, 'comprobar_mx' => false, 'correo' => ['modo' => 'archivo', 'carpeta' => '{buzon}']];\n")
        cls.port = free_port()
        ext = os.path.join(os.path.dirname(PHP), "ext")
        cls.proc = subprocess.Popen(
            [PHP, "-n", "-d", f"extension_dir={ext}", "-d", "extension=pdo_sqlite", "-d", "extension=mbstring",
             "-S", f"127.0.0.1:{cls.port}", "-t", ROOT],
            cwd=ROOT, env=dict(os.environ, LUNAPY_CONFIG=config), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(50):
            try:
                with socket.create_connection(("127.0.0.1", cls.port), timeout=0.2):
                    break
            except OSError:
                time.sleep(0.1)

    @classmethod
    def tearDownClass(cls):
        cls.proc.terminate()
        cls.proc.wait(timeout=5)
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def registrar(self, email):
        req = urllib.request.Request(f"http://127.0.0.1:{self.port}/api/index.php/registro", method="POST",
                                     data=json.dumps({"email": email, "contrasena": "clave-segura-1"}).encode())
        req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req) as res:
                return res.status
        except urllib.error.HTTPError as e:
            with e:
                return e.code

    def test_proveedores_fiables(self):
        self.assertEqual(self.registrar("alguien@gmail.com"), 202)
        self.assertEqual(self.registrar("Otra@Outlook.es"), 202)

    def test_rechaza_desconocidos_y_desechables(self):
        self.assertEqual(self.registrar("spam@mailinator.com"), 403)
        self.assertEqual(self.registrar("x@dominio-raro.xyz"), 403)

    def test_la_lista_de_permitidos_entra_siempre(self):
        self.assertEqual(self.registrar("amiga@midominio.test"), 202)
