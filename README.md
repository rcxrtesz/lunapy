# LunaPy · Aprende Python pensando

Aplicación interactiva para aprender Python desde cero, centrada en el pensamiento computacional:
**Comprender → Razonar → Planificar → Programar → Ejecutar → Analizar → Mejorar.**

Es una **aplicación instalable (PWA)**: se instala en Windows, Android e iPhone desde el navegador y **funciona sin conexión** (Python incluido).

## Cómo ejecutarla en local

Solo necesitas Python 3 (no hace falta Node ni instalar nada):

```bash
python serve.py
```

Se abre `http://localhost:5173/`. Todas las dependencias (Pyodide, CodeMirror, Preact y las fuentes) van incluidas en `vendor/`: no se descarga nada de internet.

Tests:

```bash
python -m unittest discover tests
```

Con Python real en el navegador: `http://localhost:5173/tests.html` y la suite QA en `http://localhost:5173/tests/qa/qa.html`.

## Aplicación instalable y sin conexión

| Pieza | Archivo |
|---|---|
| Manifiesto (nombre, iconos, colores, atajos) | `manifest.webmanifest` |
| Iconos (generados con `python tools/make_icons.py`) | `icons/` |
| Service worker (guarda la app en el dispositivo) | `sw.js` |
| Lista de archivos y versión (generada) | `sw-assets.js` |
| Registro, actualizaciones e instalación | `src/lib/pwa.js` |
| Configuración de Apache para el hosting | `.htaccess` |

**Después de cambiar cualquier archivo de la app hay que regenerar la lista:**

```bash
python tools/build_sw.py
```

`tests/test_pwa.py` falla si se olvida. Cuando la versión cambia, la app instalada descarga la novedad en segundo plano y muestra «Hay una versión nueva de LunaPy · Actualizar».

**En desarrollo local** (`localhost`) el service worker está desactivado, para que los cambios se vean al recargar. Para probar el modo sin conexión en local, ejecuta esto en la consola del navegador y recarga la página:

```js
localStorage.setItem('lunapy.sw', '1')
```

Para desactivarlo de nuevo, usa `localStorage.removeItem('lunapy.sw')` y elimina el service worker desde las herramientas del navegador.

**Dependencias incluidas:** `python tools/vendor.py` las descarga en versiones fijas y `vendor/VENDOR.md` recoge el origen, el tamaño (13,6 MB, casi todo Pyodide) y las huellas SHA-256. Las licencias de cada una están en su carpeta.

## Arquitectura

| Pieza | Decisión | Motivo |
|---|---|---|
| Interfaz | Preact + htm en módulos ES nativos, sin compilación | Funciona con solo `python serve.py`; componentes de estilo React. |
| Editor | CodeMirror 5 | Resaltado, sangría automática, números de línea; en programas largos solo dibuja las líneas visibles. |
| Ejecución | Pyodide 0.27.7 (Python 3.12) en un **Web Worker** | Python real, aislado de la interfaz, con cola de peticiones, límites de tiempo y salida, y protección del motor frente al código del alumno. |
| `input()` | Reejecución determinista | Cuando el programa pide un dato, la consola lo solicita y el programa se vuelve a ejecutar con todos los datos (misma semilla aleatoria). **Limitación conocida:** los programas que dependen de la hora actual pueden mostrar valores distintos entre reejecuciones. Para eliminarla haría falta entrada síncrona con `SharedArrayBuffer`. |
| Paso a paso | `sys.settrace` en Python real | Cada paso es el estado real justo antes de ejecutar cada línea. |
| Validación | `src/engine/runtime.py` | Casos visibles, casos límite y casos ocultos aleatorios; variantes anti-trampa sobre el árbol sintáctico; detección de malentendidos frecuentes. Acepta cualquier implementación correcta. |
| Contenido | Datos en `src/content/` | Lecciones, actividades, pistas y repasos separados de los componentes. |
| Progreso | `localStorage` (`src/state/store.js`) | Validación y reparación de datos, repetición espaciada (Leitner), exportación e importación. |
| Cuenta y sincronización | `src/lib/sync.js`, `src/state/merge.js`, `api/` (PHP 8.4 + MySQL) | Funciona sin conexión; con sesión iniciada sube y trae el progreso y fusiona los cambios hechos en varios dispositivos. Ver [DESPLIEGUE.md](DESPLIEGUE.md). |

```
index.html  manifest.webmanifest  sw.js  sw-assets.js  .htaccess  serve.py
src/
  engine/      runtime.py · worker.js · python.js
  content/     curriculum.js · lesson-variables.js · activities.js · review.js
  state/       store.js · gamification.js · palettes.js
  components/  code.js · tracer.js · questions.js · hints.js · activities.js · boundary.js · appearance.js · common.js
  views/       dashboard · map · lesson · lab · challenges · review · progress · profile
  lib/         ui.js · icons.js · highlight.js · backup.js · pwa.js
vendor/        pyodide · codemirror · preact · fonts   (dependencias incluidas)
icons/         iconos de la app
tools/         vendor.py · build_sw.py · make_icons.py
tests/         test_runtime.py · test_pwa.py · qa/
```

## Estado

- **Hecho:** demo aprobada, auditoría QA con todas las correcciones aplicadas, app instalable sin conexión y **el temario completo**: 13 módulos con 3 lecciones cada uno (39 lecciones, 157 actividades con validación automática y 104 preguntas de repaso), desde «Qué es programar» hasta clases, herencia y un proyecto final.
- **Hecho también:** cuenta y sincronización entre dispositivos (API en PHP 8.4 con MySQL, registro limitado a correos autorizados), probada en local con SQLite.
- **Siguiente:** publicar en Dinahosting siguiendo [DESPLIEGUE.md](DESPLIEGUE.md) (cuando lo decidas) y revisar el contenido con uso real.
- **Publicación:** pendiente de confirmación expresa. Antes de subir la app al hosting o generar paquetes para tiendas, se avisará.

Las pistas y el análisis de errores son deterministas: no hay ningún modelo de IA conectado.
