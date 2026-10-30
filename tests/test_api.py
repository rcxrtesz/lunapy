"""
Pruebas de la API de sincronización (api/index.php) con el servidor integrado de PHP y una
base SQLite temporal. Se saltan si PHP no está instalado.

    python -m unittest tests.test_api
"""

import glob
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

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def find_php():
    php = shutil.which("php")
    if php:
        return php
    # Instalación de winget en Windows (puede no estar todavía en el PATH)
    pattern = os.path.join(os.environ.get("LOCALAPPDATA", ""), "Microsoft", "WinGet", "Packages", "PHP.PHP*", "php.exe")
    found = glob.glob(pattern)
    return found[0] if found else None


PHP = find_php()
EMAIL = "prueba@lunapy.test"
CLAVE = "contraseña-segura"


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@unittest.skipUnless(PHP, "PHP no está instalado")
class ApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.mkdtemp()
        db = os.path.join(cls.tmp, "lunapy.sqlite").replace("\\", "/")
        config = os.path.join(cls.tmp, "config.php")
        with open(config, "w", encoding="utf-8") as f:
            f.write(f"<?php return ['dsn' => 'sqlite:{db}', 'emails_permitidos' => ['{EMAIL}', 'otra@lunapy.test']];\n")
        cls.port = free_port()
        ext = os.path.join(os.path.dirname(PHP), "ext")
        env = dict(os.environ, LUNAPY_CONFIG=config)
        cls.proc = subprocess.Popen(
            [PHP, "-n", "-d", f"extension_dir={ext}", "-d", "extension=pdo_sqlite", "-d", "extension=mbstring",
             "-S", f"127.0.0.1:{cls.port}", "-t", ROOT],
            cwd=ROOT, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
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

    def call(self, method, route, body=None, token=None):
        req = urllib.request.Request(f"http://127.0.0.1:{self.port}/api/index.php/{route}", method=method,
                                     data=json.dumps(body).encode() if body is not None else None)
        req.add_header("Content-Type", "application/json")
        if token:
            req.add_header("X-LunaPy-Token", token)
        try:
            with urllib.request.urlopen(req) as res:
                return res.status, json.loads(res.read())
        except urllib.error.HTTPError as e:
            with e:
                return e.code, json.loads(e.read() or b"{}")

    def register(self, email=EMAIL, password=CLAVE):
        return self.call("POST", "registro", {"email": email, "contrasena": password})

    def login(self, email=EMAIL, password=CLAVE):
        return self.call("POST", "sesion", {"email": email, "contrasena": password})

    def token(self):
        status, body = self.login()
        if status == 401:
            self.register()
            status, body = self.login()
        self.assertEqual(status, 200, body)
        return body["token"]

    # ---------- Cuenta ----------

    def test_01_registration_rules(self):
        self.assertEqual(self.register("intrusa@ejemplo.com")[0], 403)
        self.assertEqual(self.register(EMAIL, "corta")[0], 400)
        self.assertEqual(self.register("no-es-un-correo")[0], 400)
        status, body = self.register(" Prueba@LunaPy.test ")  # se normaliza
        self.assertEqual(status, 201, body)
        self.assertEqual(body["email"], EMAIL)
        self.assertEqual(len(body["token"]), 64)
        self.assertEqual(self.register()[0], 409)

    def test_02_login_and_account(self):
        self.assertEqual(self.login(password="incorrecta")[0], 401)
        token = self.token()
        self.assertEqual(self.call("GET", "cuenta", token=token), (200, {"email": EMAIL}))
        self.assertEqual(self.call("GET", "cuenta")[0], 401)
        self.assertEqual(self.call("GET", "cuenta", token="a" * 64)[0], 401)

    def test_03_failed_attempts_are_limited(self):
        self.register("otra@lunapy.test")
        for _ in range(5):
            self.assertEqual(self.login("otra@lunapy.test", "mal-mal-mal")[0], 401)
        self.assertEqual(self.login("otra@lunapy.test", "mal-mal-mal")[0], 429)
        # El límite es por correo: la otra cuenta sigue funcionando
        self.assertEqual(self.login()[0], 200)

    # ---------- Estado ----------

    def test_04_state_with_optimistic_revisions(self):
        token = self.token()
        status, body = self.call("GET", "estado", token=token)
        self.assertEqual((status, body), (200, {"revision": 0, "datos": None}))
        estado = {"version": 1, "xp": 10, "nombre": "ñandú"}
        self.assertEqual(self.call("PUT", "estado", {"revision_base": 0, "datos": estado}, token), (200, {"revision": 1}))
        # Otro dispositivo que partía de la revisión 0 recibe un conflicto con los datos actuales
        status, body = self.call("PUT", "estado", {"revision_base": 0, "datos": {"version": 1, "xp": 3}}, token)
        self.assertEqual(status, 409)
        self.assertEqual((body["revision"], body["datos"]), (1, estado))
        self.assertEqual(self.call("PUT", "estado", {"revision_base": 1, "datos": {"version": 1, "xp": 20}}, token), (200, {"revision": 2}))
        self.assertEqual(self.call("GET", "estado?desde=2", token=token), (200, {"revision": 2}))
        status, body = self.call("GET", "estado?desde=1", token=token)
        self.assertEqual(body["datos"]["xp"], 20)

    def test_05_invalid_state_is_rejected(self):
        token = self.token()
        self.assertEqual(self.call("PUT", "estado", {"revision_base": 0, "datos": {"xp": 1}}, token)[0], 400)
        self.assertEqual(self.call("PUT", "estado", {"revision_base": "1", "datos": {"version": 1}}, token)[0], 400)
        self.assertEqual(self.call("PUT", "estado", {"version": 1}, token)[0], 400)

    def test_06_logout_invalidates_token(self):
        token = self.token()
        self.assertEqual(self.call("DELETE", "sesion", token=token)[0], 200)
        self.assertEqual(self.call("GET", "cuenta", token=token)[0], 401)

    def test_07_unknown_route(self):
        self.assertEqual(self.call("GET", "nada")[0], 404)

    def test_08_delete_account(self):
        token = self.token()
        self.call("PUT", "estado", {"revision_base": 0, "datos": {"version": 1}}, token)
        self.assertEqual(self.call("POST", "cuenta/borrar", {"contrasena": "mal-mal-mal"}, token)[0], 401)
        self.assertEqual(self.call("POST", "cuenta/borrar", {"contrasena": CLAVE}, token)[0], 200)
        self.assertEqual(self.login()[0], 401)
        self.assertEqual(self.call("GET", "cuenta", token=token)[0], 401)


if __name__ == "__main__":
    unittest.main()
