# LunaPy · Estado del proyecto y traspaso a un nuevo chat

Documento para continuar el trabajo en otra conversación. Fecha: 1 de noviembre de 2026.

---

## 1. Qué es LunaPy

Plataforma interactiva en **español de España** para aprender Python desde cero hasta nivel
intermedio, pensada para **uso personal** (ordenador y móvil). Sigue el libro
[«Piensa en Python»](https://libropython.es/) (Think Python en español) complementado con
Cisco **Python Essentials 1 y 2**.

Método de cada ejercicio: **Comprender → Razonar → Planificar → Programar → Ejecutar →
Analizar → Mejorar**.

- Nombre: **LunaPy** (antes «Pyensa»; el progreso antiguo se migra solo).
- Logo de luna creciente; pie «developed by lunadev» con enlace a https://lunadev.es.
- 7 paletas de color (Índigo por defecto), cada una con modo día y noche.
- Repositorio **público**: https://github.com/rcxrtesz/lunapy (usuario GitHub `rcxrtesz`).
  - `main`: versión estable (la demo aprobada). **No se fusiona develop → main sin pedirlo.**
  - `develop`: rama de trabajo. Último commit: `b3d02ae` (cuenta y sincronización).

---

## 2. Reglas acordadas (importantes)

1. **Avisar antes de publicar**: no subir nada a Dinahosting, no empaquetar para tiendas ni
   publicar sin confirmación expresa de la usuaria.
2. **Commits y push a `develop`** tras cada cambio verificado (autor: `rcxrtesz`, correo
   noreply `253747104+rcxrtesz@users.noreply.github.com`).
3. **Repositorio público**: nunca subir contraseñas, tokens ni datos personales.
   `api/config.php` y `api/datos/` están en `.gitignore`.
4. **Las contraseñas las escribe siempre la usuaria** (panel de Dinahosting, base de datos,
   `config.php`). El asistente puede guiar y mirar la pantalla, pero no teclearlas.
5. Contenido nuevo: módulo a módulo; la usuaria revisa.

---

## 3. Lo que está HECHO

### 3.1 Aplicación (sin servidor, funciona sin conexión)
- **Tecnología**: Preact + htm sin compilación (módulos ES), CodeMirror 5, **Pyodide 0.27.7**
  (Python 3.12 real en el navegador, en un Web Worker). Todo en `vendor/` (sin CDN).
- **App instalable (PWA)**: `manifest.webmanifest`, `sw.js` + `sw-assets.js` (generado con
  `python tools/build_sw.py`, **obligatorio regenerarlo tras cambiar cualquier archivo**),
  aviso de actualización, iconos. En iPhone se instala desde Safari («Añadir a pantalla de inicio»).
- **Pantallas**: Inicio, Mapa (13 módulos), Lección, Laboratorio, Desafíos, Repaso
  (repetición espaciada Leitner), Progreso (logros, conceptos, errores), Perfil (nombre,
  objetivo diario, apariencia, instalar, **cuenta**, exportar/importar/reiniciar).
- **Motor de corrección** (`src/engine/runtime.py`): casos de prueba, casos ocultos
  aleatorios, variantes antimemorización, reglas (`must_call`, `must_use_op`…), conceptos
  erróneos con mensajes propios, huecos `___`, `exact_lines`, `functions`, `classes`, casos
  con `call` (llama a funciones/clases de la alumna), explicaciones en español de los
  errores más comunes, sugerencias de mejora («Correcto, pero mejorable»).
- **Auditoría QA** completa con todas las correcciones P0–P3 (`QA_REPORT.md`,
  `QA_TEST_CASES.md`, `QA_IMPROVEMENTS.md`).

### 3.2 Contenido: **temario completo** (13 módulos × 3 lecciones)
39 lecciones, **157 actividades** con validación automática y **104 preguntas de repaso**.

| Módulo | Lecciones |
|---|---|
| 1 Pensamiento computacional | Algoritmos · Python como calculadora · Primer programa |
| 2 Variables y tipos | Variables · Expresiones · Tipos, conversiones y entrada |
| 3 Funciones | Llamar · Definir · Parámetros y variables locales |
| 4 Diseño de funciones | Encapsular y generalizar · Interfaces · Refactorización |
| 5 Condicionales | Booleanas · if/elif/else · Recursión |
| 6 Valores de retorno | return a fondo · Desarrollo incremental · Composición |
| 7 Bucles | for · while · Búsqueda |
| 8 Cadenas | Índices y porciones · Métodos · Expresiones regulares |
| 9 Listas | Operaciones · Recorrer · Mutabilidad y alias |
| 10 Diccionarios y tuplas | Diccionarios · Tuplas · Proyecto de análisis de texto |
| 11 Archivos | Leer y escribir · Procesar CSV · Excepciones |
| 12 POO | Clases y objetos · Métodos · Herencia |
| 13 Depuración y proyecto | Depuración · Estilo (PEP 8) · Proyecto final: gestor de gastos |

Cada lección: teoría con preguntas intercaladas que bloquean el avance, visor paso a paso,
4 actividades (predecir, completar, corregir, construir) con pistas en 4 niveles,
resumen y logro de módulo.

Archivos: `src/content/module1.js`, `lesson-variables.js` + `activities.js` (2.1) y un
`src/content/lesson-<id>.js` por lección; registro en `lessons.js`, `activities.js`,
`curriculum.js`; repaso en `review.js`; logros en `src/state/gamification.js`.

### 3.3 Cuenta y sincronización (hecho y probado en local, **sin publicar**)
- **API PHP 8.4** en `api/` (`index.php`, `lib.php`, `.htaccess`, `config.example.php`,
  `herramientas/hash_contrasena.php`):
  - Rutas: `POST registro`, `POST/DELETE sesion`, `GET cuenta`, `POST cuenta/borrar`,
    `GET/PUT estado` (con revisiones; 409 si otro dispositivo guardó antes).
  - Registro **solo para correos autorizados** (`emails_permitidos` en `config.php`).
  - Contraseñas con bcrypt; tokens aleatorios (en la base solo su hash); 5 intentos
    fallidos cada 15 min; consultas preparadas; cabecera `X-LunaPy-Token`.
  - Crea las tablas sola (MySQL en el servidor, SQLite en pruebas locales).
- **App**: `src/lib/sync.js` (sincroniza al abrir, al volver la red, al ocultar la app,
  tras cada cambio y cada 5 min; funciona sin conexión), `src/state/merge.js` (fusiona el
  progreso de varios dispositivos: los contadores se suman respecto al último estado común),
  tarjeta de cuenta en Perfil (`src/components/cuenta.js`).
- Reiniciar o importar con sesión iniciada sustituye también la copia del servidor.
- **Guía de publicación**: `DESPLIEGUE.md`.

### 3.4 Pruebas (todas en verde)
- `tests.html` en el navegador: **994/994** (contenido, repaso, motor y fusión).
- `tests/qa/qa.html`: 111/112 (el único fallo es la limitación conocida LIM-001: un programa
  que usa la hora cambia en cada ejecución).
- Python: `python -m unittest discover -s tests -p "test_*.py"` (incluye `test_api.py`,
  8 pruebas de la API con PHP + SQLite) y `python -m unittest discover -s tests/qa -p "test_*.py"`
  (90 pruebas del motor).

---

## 4. Cómo trabajar en local

- **Solo la app**: `python serve.py 5180` → http://localhost:5180
- **App + API** (mismo origen): PHP instalado con winget (`PHP.PHP.NTS.8.4`). Servidor:
  ```
  php -n -d extension_dir=<carpeta de php>\ext -d extension=pdo_sqlite -d extension=mbstring -S localhost:5182
  ```
  (está configurado en `.claude/launch.json` como «lunapy-php»). PHP está en
  `%LOCALAPPDATA%\Microsoft\WinGet\Packages\PHP.PHP.NTS.8.4_…\php.exe`.
- `api/config.php` local (no se sube) usa SQLite en `api/datos/` y el correo de prueba
  `prueba@lunapy.test`.
- Tras cambiar cualquier archivo de la app: `python tools/build_sw.py`.

---

## 5. Lo que QUEDA por hacer

### 5.1 Publicar en Dinahosting (siguiente paso; la usuaria lo hace guiada)
Plan contratado: **Hosting Avanzado** (PHP 8.4, MySQL 8.4 LTS, bases ilimitadas de 2 GB).
Seguir `DESPLIEGUE.md`. La usuaria quiere hacerlo **ella misma, guiada paso a paso**, con el
asistente mirando su Chrome (extensión Claude in Chrome). Se estaba empezando: el acceso al
panel está en el enlace «Panel de Control» de la web de Dinahosting.

Pasos:
1. Entrar al panel (lo hace la usuaria, con su contraseña).
2. Crear una base de datos MySQL y anotar nombre, usuario, servidor (la contraseña la elige
   ella).
3. Decidir dominio y carpeta (por ejemplo `https://dominio/lunapy/`).
4. Subir los archivos (lista exacta en `DESPLIEGUE.md`; **no** subir `tests/`, `tools/`,
   `.git/`, `api/config.php` local ni `api/datos/`).
5. Crear `api/config.php` en el servidor con los datos de la base y su correo en
   `emails_permitidos` (la contraseña la escribe ella).
6. Activar SSL (Let's Encrypt) en el panel.
7. Abrir la web → Perfil → Crear cuenta. Comprobar que se crean las tablas y sincroniza
   (**la ruta MySQL solo se ha probado indirectamente, con SQLite**).
8. Instalar la app en el móvil e iniciar sesión.

### 5.2 Después
- **Revisión del contenido con uso real** (la usuaria aún no ha revisado los módulos 2–13 en
  detalle) y ajustes según sus comentarios.
- Recuperación de contraseña por correo (aplazada a propósito; de momento:
  `api/herramientas/hash_contrasena.php` + phpMyAdmin).
- Fusionar `develop` → `main` cuando la usuaria lo pida.
- Opcional: paquete para Microsoft Store (gratis para uso personal). App Store y Supabase
  descartados.
- Ideas: retos de módulo para los módulos 3–13 (solo existe el del módulo 2), resumen
  mensual en el gestor de gastos, más preguntas de repaso.

---

## 6. Trucos y avisos técnicos

- En este Windows, los *heredocs* de bash estropean `\n` y caracteres no ASCII al escribir
  archivos: usar scripts escritos con la herramienta de escritura de archivos.
- `tests.html` recorta los espacios finales; las preguntas de respuesta escrita no admiten
  respuestas de varias líneas (usar elección múltiple con `expectOutput`).
- El validador considera 7 igual a 7.0 salvo con `exact_lines`.
- En pruebas del navegador: cambiar solo el `#` no recarga; para inyectar `localStorage`,
  cambiar el hash y en otra llamada `setItem` + `location.reload()`.
