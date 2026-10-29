# LunaPy · Aprende Python pensando (DEMO)

Plataforma interactiva para aprender Python desde cero, centrada en el pensamiento computacional:
**Comprender → Razonar → Planificar → Programar → Ejecutar → Analizar → Mejorar.**

## Cómo ejecutarla

Solo necesitas Python 3 (no hace falta Node ni instalar nada):

```bash
python serve.py
```

Se abre `http://localhost:5173/`. La primera vez el navegador descarga Pyodide (~10 MB, Python 3.12 compilado a WebAssembly); después queda en caché.

Tests:

```bash
python -m unittest discover tests
```

Y con Python real en el navegador: `http://localhost:5173/tests.html`.

## Arquitectura

| Pieza | Decisión | Motivo |
|---|---|---|
| Interfaz | Preact + htm en módulos ES nativos, sin compilación | Este equipo no tiene Node; así la demo funciona con solo `python serve.py`. Los componentes son de estilo React, así que migrar a React + TS + Vite en la fase completa es directo. |
| Editor | CodeMirror 5 (resaltado, sangría automática, números de línea) | Ligero, accesible y sin compilación. |
| Ejecución | Pyodide dentro de un **Web Worker** | Python real, aislado del DOM, con límite de tiempo (si se supera, se termina el worker y se reinicia) y límite de salida. Los módulos `js`/`pyodide` están bloqueados para el código del alumno. |
| `input()` | Reejecución determinista | Cuando el programa pide un dato, la consola lo solicita y el programa se vuelve a ejecutar con todos los datos (misma semilla aleatoria). No requiere cabeceras COOP/COEP. **Limitación conocida:** los programas que dependen de la hora actual pueden mostrar valores distintos entre reejecuciones. Para eliminarla haría falta entrada síncrona con `SharedArrayBuffer`. |
| Paso a paso | `sys.settrace` en Python real | Cada paso es el estado real justo antes de ejecutar cada línea; nada está simulado. |
| Validación | `src/engine/runtime.py` | Casos de prueba con casos límite, variantes anti-trampa (cambia los datos y comprueba que el resultado se recalcula), reglas sobre el AST y detección de malentendidos frecuentes. Acepta cualquier implementación correcta. |
| Contenido | Datos en `src/content/` | Lecciones, actividades, pistas y repasos separados de los componentes. |
| Progreso | `localStorage` (`src/state/store.js`) | Persistente al recargar. Repetición espaciada con cajas de Leitner, explicada en «Mi progreso». |

```
index.html  serve.py  tests.html
src/
  engine/   runtime.py (ejecución, errores en español, traza, validación) · worker.js · python.js
  content/  curriculum.js · lesson-variables.js · activities.js · review.js
  state/    store.js (persistencia, XP, rachas, SRS) · gamification.js (logros, misiones, repasos)
  components/  code.js (editor, consola, errores) · tracer.js · questions.js · hints.js · activities.js
  views/    dashboard · map · lesson · lab · challenges · review · progress
tests/test_runtime.py
```

## Alcance de la demo

Completo: inicio, mapa de los 13 módulos (con su correspondencia con los capítulos de libropython.es), lección 2.1 de Variables, 5 actividades y 3 desafíos extra, laboratorio, pistas en 5 niveles, repaso espaciado, progreso, logros, modo claro/oscuro y diseño adaptable.

Apariencia: 7 paletas de color (Índigo por defecto, Océano, Esmeralda, Violeta, Frambuesa, Atardecer y Grafito), cada una con su versión de día y de noche. Se eligen con el botón de la paleta en la barra superior. Los valores están en `styles.css` (bloque «Paletas personalizables») y la lista en `src/state/palettes.js`.

Perfil (`src/views/profile.js`, también accesible desde el avatar de la barra superior): nombre, objetivo diario, apariencia, exportar e importar una copia del progreso en JSON y reiniciar. El apartado «Cuenta» está preparado para el futuro inicio de sesión.

Previsto para la fase completa: base de datos en la nube con registro e inicio de sesión por correo electrónico. El acceso al progreso está centralizado en `src/state/store.js`, así que la sincronización se añadirá ahí sin tocar las pantallas.

Pendiente: el contenido de los módulos 1 y 3–13, las lecciones 2.2–2.3, la tutoría con IA (no hay ningún modelo conectado: las pistas y el análisis son deterministas) y las cuentas o la sincronización entre dispositivos.
