# LunaPy — Informe de auditoría QA

**Fecha:** 28 de octubre de 2026
**Versión auditada:** demo actual (`src/`), sin modificaciones de código de producción durante la auditoría.

**Entorno de pruebas**
| Elemento | Detalle |
|---|---|
| Sistema | Windows 11 Pro (10.0.26200) |
| Python local | CPython 3.14.8 |
| Navegador | Panel de navegador integrado, basado en Chromium (Chrome/152.0.7977.167) |
| Python en el navegador | Pyodide 0.27.7 (Python 3.12.7) |
| Servidor | `python serve.py` en `localhost:5173` |
| Herramientas | `unittest` y `trace` de la biblioteca estándar; suite propia en el navegador (`tests/qa/qa.html`); automatización del navegador integrado. No había Node, Playwright ni `coverage`, y no he instalado nada. |

Documentos relacionados: [QA_TEST_CASES.md](QA_TEST_CASES.md) (catálogo reproducible) y [QA_IMPROVEMENTS.md](QA_IMPROVEMENTS.md) (plan de correcciones).

> **Actualización (28/10/2026) · correcciones P0 aplicadas.** Este informe describe la auditoría original. Después se corrigieron los cuatro bloques P0 y se repitieron todas las baterías:
>
> | Bug | Estado | Verificación |
> |---|---|---|
> | BUG-001 Manipular el validador | **Corregido** (con riesgo residual, ver abajo) | QA-C017 y regresiones nuevas en CPython; en el navegador, `import __main__` ya no expone el motor y la manipulación desde la pila de llamadas se detecta («Entorno modificado»), se restaura y se reinicia el worker. Comprobado también en la app |
> | BUG-003 Estado persistente y motor roto | **Corregido** | `math.pi`, `builtins.len`, `json.loads` y `sys.setrecursionlimit` se restauran tras cada ejecución (QA-C011, QA-C012 y nuevas regresiones; QA-B015…B017) |
> | BUG-004 Paso a paso congela la app | **Corregido** | El visualizador muestra «El programa ha tardado demasiado» y la navegación sigue funcionando (E2E en la app) |
> | BUG-006 Variantes omitidas | **Corregido** | Las variantes cambian el dato de partida sobre el árbol sintáctico (`set: {edad: 30}`); si falta la variable, el resultado es «Falta el dato de partida» (QA-B059, B064, B074 y QA-C035 en PASS; comprobado en la app) |
> | BUG-007 Importación que rompe la app | **Mitigado** | Ahora hay barreras de errores: la app ya no se congela, cada pantalla dañada muestra opciones de recuperación y «Restablecer datos dañados» descarga antes una copia y deja la app operativa (E2E; la descarga se interceptó sin guardar el archivo). **La validación del esquema al importar (P1-3) sigue pendiente**, así que QA-B102…B105 siguen en FAIL |
> | BUG-012 Salir y volver borraba fallos y pistas | **Corregido** | En la app: 3 fallos + solución + salir y volver → 6 XP, sin bonus ni logro «Por mí misma»; las pistas y la solución ya vistas reaparecen al volver |
>
> **Cifras tras la corrección:**
> - Originales: 20/20 (CPython) y 52/52 (navegador).
> - QA CPython: 50 tests, 46 PASS y 4 fallos esperados (BUG-002 ×3 y PED-001).
> - QA navegador: 106 tests, **89 PASS y 17 FAIL**; todos los FAIL corresponden a P1–P3 o a limitaciones documentadas.
> - Cobertura de `runtime.py`: 69,4 % solo con los tests originales y 81,3 % con originales + QA (el archivo ha pasado de 565 a 654 líneas ejecutables).
>
> **Actualización · correcciones P1 aplicadas.**
>
> | Problema | Estado | Verificación |
> |---|---|---|
> | PED-001 Validación injusta por el «último número» | **Corregido** | El resultado debe aparecer en la última línea con números y puede ir acompañado de otros datos («Pagas 80.0 euros con un 20 % de descuento»). Los malentendidos ignoran los números que solo repiten los datos de entrada (QA-B072, QA-B081 y nuevas regresiones en CPython; comprobado en la app) |
> | BUG-002 Elusión del bloqueo de `js` | **Corregido** (con riesgo residual) | Mientras se ejecuta el código del alumno, los módulos bloqueados se retiran de `sys.modules` y un *finder* impide reimportarlos. Las respuestas del worker llevan un token secreto que el código Python no puede leer (QA-B028…B030; en la app, «Módulo no disponible») |
> | BUG-007 Importación de estructuras inválidas | **Corregido** | Validación de tipos de cada campo. Al importar, la copia se rechaza **antes** de pedir confirmación, explicando qué campo falla; al cargar, los campos dañados se reparan con su valor inicial y se conserva el resto (QA-B102…B106; comprobado en la app) |
> | PED-002 Contenidos usados antes de enseñarse | **Corregido** | Paso nuevo «Operaciones con números» (operadores, `/` siempre da decimal, prioridad, porcentajes) con dos preguntas verificadas con Python real; `str()` explicado con un ejemplo ejecutable en «Texto y números» |
> | BUG-008 XP de repaso ilimitado | **Corregido** | Solo el primer acierto de cada concepto al día da XP; los demás cuentan para el dominio (QA-B090: 50 aciertos → 3 XP) |
>
> **Cifras tras P1:**
> - Originales: 20/20 (CPython) y **54/54** (navegador; dos preguntas nuevas).
> - QA CPython: **55/55**, sin fallos esperados.
> - QA navegador: **100/107 PASS**. Los 7 FAIL restantes son P2/P3 (BUG-005, BUG-009, BUG-010 ×2, BUG-011) y limitaciones (LIM-001, LIM-002).
> - Cobertura de `runtime.py` con todas las baterías: **82,4 %** (561/681 líneas).
> - Sin errores en consola.
>
> **Actualización · mejoras P2 aplicadas.**
>
> | Problema | Estado | Verificación |
> |---|---|---|
> | BUG-005 Timeout que afectaba a peticiones en cola | **Corregido** | El cliente envía las peticiones de una en una; el tiempo límite cuenta desde que el worker recibe cada programa y solo afecta al que se cuelga (QA-B020: la petición inocente devuelve `inocente`) |
> | BUG-015 Foco en ventanas modales | **Corregido** | Al abrirse, el foco va al primer control (el campo de nombre en la bienvenida). Tab y Mayús+Tab dan la vuelta dentro de la ventana, Esc la cierra cuando se puede cerrar y el foco vuelve a su sitio (comprobado con el teclado en la app) |
> | BUG-016 Mapa en móvil | **Corregido** | Sin desbordamiento a 360 px; en móvil las etiquetas pasan a su propia línea y los títulos ya no se parten palabra a palabra (capturas) |
> | BUG-017 Contraste | **Corregido** | 0 pares por debajo de 4,5:1 en las 7 paletas en día y noche (mínimo 4,6) y en las etiquetas de XP, estado, racha y texto tenue. Nuevos tokens `--xp-text`, `--streak` y `--streak-soft` |
> | BUG-014 Envíos idénticos | **Corregido** | Comprobar el mismo código erróneo dos veces cuenta un solo fallo |
> | R-01 Saltos desde el índice | **Corregido** | Con el índice o la URL ya no se puede pasar de un paso de teoría con preguntas sin responder (con `maxStep` 12 guardado, la URL al paso 10 redirige al 0) |
> | PED-003 Planificación escasa | **Corregido** | «Ticket con IVA» (3 preguntas y comentarios guía) e «Intercambia los vasos» (2 preguntas) tienen planificación |
> | PED-006 Atribución de errores | **Corregido** | Cada opción incorrecta de predicción indica el concepto que revela; solo ese concepto suma el error |
> | Metodología: «Mejorar» y fases | **Corregido** | Botón «Mejorar mi solución» y modo mejora; +3 XP la primera vez que se mejora una solución. Heurística nueva de números repetidos. El indicador incluye «Razonar» y marca cada fase solo cuando ocurre |
>
> **Cifras tras P2:**
> - Originales: 20/20 (CPython) y 54/54 (navegador).
> - QA CPython: 55/55.
> - QA navegador: **104/110 PASS**. Los 6 FAIL restantes son P3 (BUG-009, BUG-010 ×2, BUG-011) y limitaciones (LIM-001, LIM-002).
> - Cobertura de `runtime.py`: 82,1 % (567/691).
> - Sin errores en consola.
>
> **Actualización · mejoras P3 aplicadas (todas las correcciones del plan completadas).**
>
> | Problema | Estado | Verificación |
> |---|---|---|
> | BUG-009 Misión cumplida repitiendo la misma actividad | **Corregido** | La misión cuenta actividades **distintas** del día (QA: 1/2 tras repetir la misma) |
> | BUG-010 Logros sin cumplir su descripción | **Corregido** | «Hola, mundo» exige ejecutar un programa, «Mente de intérprete» exige preguntas de predicción y «Memoria a largo plazo», terminar una sesión de repaso. Tests negativos y positivos |
> | BUG-011 Entrada larga = «Demasiada salida» | **Corregido** | Lo que escribe el usuario no cuenta como salida; el eco en la consola se recorta a 2000 caracteres |
> | BUG-013 Avisos de logros duplicados | **Corregido** | Una sola actualización para varios logros; en la app, 3 logros a la vez = 3 avisos, sin repetir |
> | BUG-018 Editor lento con programas largos | **Corregido** | 2,6 ms por pulsación con 500 y con 2000 líneas (antes 28 y 152 ms); solo se dibujan las líneas visibles a partir de 300 |
> | LIM-002 Casos de prueba memorizables | **Corregido** | Dos casos ocultos con datos aleatorios en «Calculadora de rebajas» y «Ticket con IVA»; la tabla de respuestas falla en «Caso oculto 1» |
> | PED-005 `___` en comentarios | **Corregido** | Los huecos se detectan en el árbol sintáctico, no en el texto |
> | R-04 Días simulados en la copia | **Corregido** | La exportación ya no incluye `dayOffset` |
> | LIM-001 `input()` y la hora | **Documentado** | Explicado en la chuleta del laboratorio y en el README. Sigue siendo una limitación de diseño (QA-B036, único FAIL) |
>
> **Cifras finales:**
> - Originales: 20/20 (CPython) y 54/54 (navegador).
> - QA CPython: **59/59**.
> - QA navegador: **111/112 PASS**; el único FAIL es la limitación documentada LIM-001.
> - Cobertura de `runtime.py`: 82,4 % (586/711).
> - Sin errores en consola.
>
> **Pendiente fuera de este plan:** prueba con lector de pantalla real, Firefox y Safari, caché vacía, sin conexión, dispositivos modestos y zonas horarias (ver la sección B.6). Son pruebas que este entorno no permite ejecutar.
>
> **Riesgo residual de BUG-002:** el intérprete conserva referencias internas a JavaScript (por ejemplo, a través de `gc` o de los *finders* de Pyodide). Un alumno experto podría encontrarlas. El token impide falsificar respuestas del motor, pero no peticiones de red desde el worker. Antes de añadir cuentas, la sesión no debe depender de cookies accesibles desde el worker.
>
> **Riesgo residual de BUG-001:** el motor sigue compartiendo intérprete con el alumno. Un alumno con conocimientos avanzados de Python podría desactivar también la detección. Cuando haya cuentas, cualquier resultado que cuente para una nota debe revalidarse en el servidor.

---

## A. Resumen ejecutivo

### Estado general
Dentro del alcance de la demo, LunaPy **funciona y la base es sólida**:
- El motor ejecuta Python real con resultados idénticos a CPython en los 12 programas comparados.
- La traza paso a paso coincide línea a línea con un trazador independiente.
- Los mensajes de error en español son correctos en los 18 casos probados.
- La repetición espaciada y las rachas calculan bien las fechas.
- No se ha encontrado ninguna vulnerabilidad XSS.

Aun así, la auditoría ha encontrado **18 bugs reproducibles**, ninguno crítico y 6 de gravedad alta, además de 2 limitaciones de diseño y 9 problemas pedagógicos. Los más importantes forman tres grupos:

1. **Integridad de la validación.** Un alumno puede conseguir «¡Correcto!» sin resolver el ejercicio:
   - Borrando el código e imprimiendo el texto fijo (BUG-006).
   - Reescribiendo el validador desde su propio código; a partir de ese momento, **cualquier** ejercicio pasa (BUG-001).
   - Saliendo y volviendo a la actividad, con lo que se borran los fallos, las pistas y la solución vista (BUG-012).
2. **Robustez.** Hay tres situaciones que dejan la aplicación inutilizable hasta recargar o borrar datos a mano:
   - El paso a paso sobre un cálculo largo hecho en C (BUG-004).
   - Importar una copia con estructura inválida, que además persiste tras recargar (BUG-007).
   - Que el alumno modifique `builtins` (BUG-003).
3. **Aislamiento del código.** El bloqueo de los módulos `js` y `pyodide` se puede eludir con `importlib` (BUG-002).

### Funcionalidades verificadas con pruebas ejecutadas
- Ejecución de Python, `input()`, límites de tiempo y de salida, y recuperación del motor.
- Mensajes de error y visualizador paso a paso.
- Validadores de las 8 actividades y desafíos: soluciones convencionales, alternativas, erróneas y adversariales.
- XP, pistas, misiones, logros, rachas, cajas de Leitner, persistencia, importación y XSS.
- Diseño adaptable a 5 resoluciones en 12 pantallas, contraste de las 7 paletas en día y noche, teclado y rendimiento.

### Riesgos principales
| Riesgo | Bugs |
|---|---|
| Validación eludible y progreso inflado | BUG-001, BUG-006, BUG-012, BUG-008 |
| Bloqueos de la interfaz sin forma de recuperarse | BUG-004, BUG-007, BUG-003 |
| Aislamiento del intérprete incompleto | BUG-002, BUG-003 |
| Accesibilidad: contraste en modo día y foco en ventanas modales | BUG-015, BUG-017 |

### Grado de preparación para uso educativo
**Apta para pruebas guiadas con estudiantes** (piloto con supervisión). **No está lista para uso autónomo ni evaluable** hasta corregir los bugs P0 y P1 de [QA_IMPROVEMENTS.md](QA_IMPROVEMENTS.md). El motivo: hoy el progreso y los «¡Correcto!» no son una evidencia fiable de dominio, y hay bloqueos que un principiante no sabría resolver.

### Cifras de ejecución
| Batería | Ejecutadas | PASS | FAIL | Notas |
|---|---|---|---|---|
| `tests/test_runtime.py` (original, CPython) | 20 | 20 | 0 | |
| `tests.html` (original, navegador) | 52 | 52 | 0 | |
| `tests/qa/test_runtime_qa.py` (nueva, CPython) | 38 | 30 | 8 | Los 8 fallos están marcados como «fallo esperado», cada uno asociado a su bug |
| `tests/qa/qa.html` (nueva, navegador con Pyodide) | 101 | 76 | 25 | Los 25 fallos corresponden a bugs documentados |
| Pruebas E2E en la app (automatizadas en el navegador) | 20 | 10 | 10 | Detalle en la sección B.3; 3 de los PASS proceden de la verificación previa en esta misma sesión |

---

## B. Resultados de las pruebas

Estados: **PASS** (ejecutada y superada), **FAIL** (ejecutada y fallida), **BLOCKED** (no se pudo ejecutar por una limitación concreta), **NOT RUN** (identificada, no ejecutada). Un FAIL asociado a un bug significa que el comportamiento esperado no se cumple.

### B.1 Suite del navegador (`tests/qa/qa.html`, Pyodide real)

| ID | Componente | Escenario | Resultado | Evidencia |
|---|---|---|---|---|
| QA-B001…B012 | Runtime | Paridad con CPython 3.14.8: enteros, división (`/`, `//`, `%` con negativos, `**`), decimales, booleanos y comparaciones, cadenas, conversión de tipos, `print` con `sep`/`end`, condicional, bucles, Unicode (tildes, ñ, emojis), f-strings, funciones | PASS (12/12) | Salidas idénticas, p. ej. `"3.5 3 -4 1 2 1024"` y `"Ñandú, cigüeña, acción ✓ 🐍🌙"` |
| QA-B013 | Runtime | Versión de Python | PASS | Python 3.12.7 |
| QA-B014 | Runtime | Las variables no pasan de una ejecución a otra | PASS | `NameError: name 'secreto' is not defined` |
| QA-B015 | Runtime | El estado de módulos importados no persiste | **FAIL** (BUG-003) | Tras `math.pi = 3`, la siguiente ejecución imprime `3` |
| QA-B016 | Runtime | Parchear `builtins` no rompe el motor | **FAIL** (BUG-003) | La siguiente ejecución falla dentro del motor (`Error in sys.excepthook…`) |
| QA-B017 | Runtime | El motor se recupera solo tras quedar corrupto | **FAIL** (BUG-003) | Sigue roto hasta reiniciar el worker o recargar |
| QA-B018 | Runtime | Bucle infinito se detiene y el motor se recupera | PASS | Timeout tras 5009 ms; la siguiente ejecución funciona |
| QA-B019 | Runtime | 3 ejecuciones simultáneas devuelven cada una su resultado | PASS | `a,b,c` |
| QA-B020 | Runtime | Una petición en cola no recibe el timeout de otra | **FAIL** (BUG-005) | La petición inocente devolvió «El programa ha tardado demasiado» |
| QA-B021 | Runtime | Salida excesiva cortada | PASS | `OutputLimit` a 19 998 caracteres |
| QA-B022 | Runtime | Paso a paso de `sum(range(10**9))` informa del límite | **FAIL** (BUG-004) | `steps=0`, `error=Timeout` (ver E003: congela la interfaz) |
| QA-B023 | Runtime | `os._exit()` no inutiliza el motor | PASS | La siguiente ejecución imprime `vivo` |
| QA-B024 | Runtime | Recursión infinita | PASS | `RecursionError` explicado, sin cuelgue |
| QA-B025 | Runtime | `input()` con 100 000 caracteres | **FAIL** (BUG-011) | `OutputLimit «Demasiada salida»` (con 19 000 caracteres funciona) |
| QA-B026 | Seguridad | `import js` bloqueado | PASS | `ImportError` con mensaje en español |
| QA-B027 | Seguridad | `import pyodide` / `import micropip` bloqueados | PASS | `ImportError` en ambos |
| QA-B028 | Seguridad | `importlib.import_module("js")` no da acceso a JavaScript | **FAIL** (BUG-002) | Salida: `JsProxy /src/engine/worker.js` |
| QA-B029 | Seguridad | `builtins.__import__("js")` no da acceso | **FAIL** (BUG-002) | `hasattr(js, "postMessage")` → `True` |
| QA-B030 | Seguridad | `sys.modules` no expone `js` | **FAIL** (BUG-002) | `"js" in sys.modules` → `True` |
| QA-B031 | Seguridad | El alumno no puede reescribir el validador | **FAIL** (BUG-001) | Trampa → «¡Correcto!»; después, `x = 1` en otro ejercicio → «pass» |
| QA-B032 | Runtime | `input()`: la reejecución conserva orden y semilla | PASS | Segmentos `A: 1 / B: 2` y el mismo número aleatorio |
| QA-B033 | Runtime | `input()` con programas no deterministas (hora) | **FAIL** (LIM-001) | `time.time_ns()` cambia entre reejecuciones |
| QA-B034…B051 | Errores | 18 mensajes en Pyodide 3.12: división entre cero, `int('abc')`, faltan dos puntos, sangría (2), `print` sin paréntesis, comillas tipográficas, `'3'*'2'`, `5+'a'`, paréntesis sin cerrar o de más, palabra reservada, espacios en el nombre, nombre que empieza por número, texto sin cerrar, asignación al revés, texto + número, `NameError` | PASS (18/18) | Título en español correcto en todos los casos |
| QA-B052…B054 | Paso a paso | Secuencia de líneas igual que un trazador independiente en CPython (bucle `for`, función, `while` + `if`) | PASS (3/3) | Ej.: `[1,2,3,2,3,2,3,2,4]` en ambos |
| QA-B055 | Paso a paso | Más de 400 pasos: se corta y se indica | PASS | `trace_limit`, 401 pasos |
| QA-B056…B078 | Validadores | 23 escenarios en 5 ejercicios de código (detalle en la sección D y en QA_TEST_CASES) | 17 PASS · 6 FAIL | FAIL: B059, B064, B074 (BUG-006); B069, B078 (PED-001); B070 (LIM-002) |
| QA-B079, B080 | Contenido | Predicción y «Explica el código»: una sola opción correcta y todas las incorrectas explicadas | PASS | `correctas=1, sin explicación=0` |
| QA-B081 | Contenido | Ordenar pasos: dependencias válidas y código final ejecutable | PASS | Salida `Precio final: 5.0` con 10 € y 50 % |
| QA-B082 | Progreso | Repetir una actividad no duplica XP | PASS | 20 XP la primera vez y 0 XP la segunda |
| QA-B083 | Progreso | Reducción de XP por pistas o solución | PASS | 3 pistas → 16 XP; solución vista → 9 XP |
| QA-B084 | Progreso | Pregunta intercalada da XP solo una vez | PASS | `[2, 0]` |
| QA-B085 | Gamificación | El XP de repaso tiene límite | **FAIL** (BUG-008) | 50 aciertos el mismo día = 150 XP |
| QA-B086 | Gamificación | La misión de actividades no se cumple repitiendo la misma | **FAIL** (BUG-009) | Progreso 2/2 con la misma actividad |
| QA-B087 | Gamificación | «Hola, mundo» exige ejecutar un programa | **FAIL** (BUG-010) | Se concede tras un fallo de planificación |
| QA-B088 | Gamificación | «Mente de intérprete» exige predicciones | **FAIL** (BUG-010) | Se concede con 3 preguntas que no son de predicción |
| QA-B089 | Gamificación | «Depuradora» solo tras superar `var-fix` | PASS | Antes `false`, después `true` |
| QA-B090 | Repaso espaciado | Mismo día: máximo caja 2 | PASS | Caja 2, «practicado», próximo repaso en 2 días |
| QA-B091 | Repaso espaciado | Día +2: toca repaso; acierto → caja 3 y repaso a 4 días | PASS | «repaso» → caja 3, «dominado», próximo 03/11 |
| QA-B092 | Repaso espaciado | Fallo → caja 1 y repaso inmediato | PASS | Caja 1, próximo = hoy, «repaso» |
| QA-B093 | Rachas | Racha consecutiva, se mantiene durante el día y se rompe | PASS | 2 → 2 → 0 |
| QA-B094 | Persistencia | Se guarda en `localStorage` tras cada acción | PASS | XP guardado = 15 |
| QA-B095, B096 | Importación | Copia válida aceptada; JSON sin `version` rechazado | PASS | `true` / `false` |
| QA-B097…B100 | Importación | `activities: null`, `concepts: "texto"`, XP negativo y `dailyGoal: 0` deben rechazarse | **FAIL** (BUG-007) | `importState` devolvió `true` en los 4 casos |
| QA-B101 | Rendimiento | Mediciones | PASS (informativo) | Ver la sección B.4 |

### B.2 Suite CPython (`tests/qa/test_runtime_qa.py`)
38 tests: 30 PASS y 8 fallos esperados.

| ID | Escenario | Resultado | Evidencia |
|---|---|---|---|
| QA-C001 | 12 fragmentos idénticos a la ejecución directa en CPython | PASS | `subTest` por fragmento |
| QA-C002 | Varias llamadas a `input()`: orden, aviso no textual (`input(3)`) y segmentos | PASS | |
| QA-C003 | `input()` vacío y con Unicode | PASS | `'' ñ🐍` |
| QA-C004 | `stderr` separado de `stdout` | PASS | Segmento `err` |
| QA-C005 | `sys.exit()` = final normal | PASS | |
| QA-C006 | Límite de salida en bucle | PASS | `OutputLimit` |
| QA-C007 | Un `print` gigante (1 000 000 caracteres) | PASS | `OutputLimit` |
| QA-C008 | `sys.stdout = None` se restaura | PASS | |
| QA-C009 | Variables aisladas | PASS | |
| QA-C010 | `print = 5` no se filtra a la siguiente ejecución | PASS | |
| QA-C011 | El estado de módulos (`math.pi`) se filtra | **FAIL esperado** (BUG-003) | Imprime `3` |
| QA-C012 | Parchear `builtins.len` | **FAIL esperado** (BUG-003) | El motor no puede ni leer la siguiente petición: `JSONDecodeError: Extra data` |
| QA-C013 | Importación directa bloqueada | PASS | |
| QA-C014…C016 | Eludir el bloqueo con `importlib`, `builtins.__import__` o `sys.modules` | **FAIL esperado** (BUG-002) | Devuelven el módulo bloqueado |
| QA-C017 | Parchear `runtime._compare` | **FAIL esperado** (BUG-001) | Trampa → pass; comprobación posterior de otro código → pass |
| QA-C018…C024 | Catálogo de 12 errores, coma decimal, palabra reservada, línea dentro de función, línea de `SyntaxError`, sugerencia de nombre parecido, `EOF` en comprobación | PASS | |
| QA-C025…C030 | Traza: secuencia de líneas igual a la referencia, marcos y variables locales, valores antes de cada línea, paso de error, desplazamientos de salida, `input()` durante la traza | PASS | |
| QA-C031…C038 | Validador: tabla parcial rechazada, 2 decimales aceptados, coma decimal aceptada, número tras el resultado, variante omitida por espacios, `___` en comentario, tolerancia de decimales, `sys.exit` | 6 PASS · 2 **FAIL esperados** (PED-001, BUG-006) | |

### B.3 Pruebas E2E en la aplicación (navegador integrado, automatizadas con scripts)

| ID | Componente | Escenario | Resultado | Evidencia |
|---|---|---|---|---|
| QA-E001 | Actividades | 3 fallos + ver la solución + salir y volver + resolver | **FAIL** (BUG-012) | El almacén registra `fails:3, solutionViewed:true`, y al final `xpEarned:25, firstTry:true, noHints:true` + logro «Por mí misma». Esperado: 6 XP y sin bonus |
| QA-E002 | Logros | Cada logro se anuncia una vez | **FAIL** (BUG-013) | Avisos: «Por mí misma» ×3 y «Depuradora» ×2 |
| QA-E003 | Laboratorio | Paso a paso de `x = sum(range(10**9))` | **FAIL** (BUG-004) | Consola: `TypeError: Cannot read properties of undefined (reading 'end') at narrate`. Tras ello, `location.hash='#/mapa'` sigue mostrando el laboratorio y la píldora queda en «Cargando Python…» |
| QA-E004 | Perfil | Importar `{"version":1,"xp":5,"daily":{},"activities":null}` | **FAIL** (BUG-007) | La app se congela. Tras recargar, el Inicio y el Perfil lanzan `Cannot convert undefined or null to object`; no hay recuperación desde la interfaz |
| QA-E005 | Seguridad | XSS con `<img onerror>` en el nombre, el historial, una variable del visualizador y la consola | PASS | 0 elementos `<img>` creados; banderas `window.__xss*` sin definir; el texto se muestra literal |
| QA-E006 | Navegación | Ejecutar un bucle infinito y recorrer 6 pantallas durante la ejecución | PASS | Al volver al laboratorio, `print("ok")` funciona |
| QA-E007 | Actividades | Enviar dos veces el mismo código erróneo | **FAIL** (BUG-014) | `attempts` +2 con el mismo código |
| QA-E008 | Accesibilidad | El foco entra en la ventana de bienvenida | **FAIL** (BUG-015) | Foco inicial en `BODY`; tras 3 pulsaciones de Tab, el foco está en el enlace «Mapa» de detrás |
| QA-E009 | Accesibilidad | Indicador de foco visible | PASS | `outline: solid 2.4px` |
| QA-E010 | Diseño adaptable | 1920×1080 · 12 pantallas | PASS | Sin desbordamiento horizontal |
| QA-E011 | Diseño adaptable | 1366×768 · 12 pantallas | PASS | Sin desbordamiento |
| QA-E012 | Diseño adaptable | 768×1024 · 12 pantallas | PASS | Sin desbordamiento |
| QA-E013 | Diseño adaptable | 390×844 · 12 pantallas | **FAIL** (BUG-016) | `#/mapa`: ancho de página 440 px (`lesson-item`, `tag accent`) |
| QA-E014 | Diseño adaptable | 360×640 · 12 pantallas | **FAIL** (BUG-016) | `#/mapa`: 440 px; captura con el título «Reto / del…» aplastado |
| QA-E015 | Contraste | 7 paletas en modo noche | PASS | Botones entre 6,18 y 12,92; navegación activa ≥ 4,79 |
| QA-E016 | Contraste | 7 paletas en modo día + etiquetas | **FAIL** (BUG-017) | Ver tabla en B.5 |
| QA-E017 | Rendimiento | Editor con programas largos | **FAIL leve** (BUG-018) | 3,2 / 8,0 / 28 / 152 ms por pulsación con 30 / 150 / 500 / 2000 líneas |
| QA-E018 | Tema | Botón día/noche pulsado 10 veces, a veces muy rápido | PASS | Icono y tema siempre coincidentes (ejecutada en la verificación previa de esta misma sesión) |
| QA-E019 | Persistencia | Recargar conserva el progreso | PASS | QA-B094; E004 demuestra que los datos sobreviven a la recarga; la lección completa sobrevivió a la recarga en la verificación previa |
| QA-E020 | Planificación | Planificar convierte el plan en comentarios del editor | PASS | Ejecutada en la verificación previa de la demo (misma sesión) |

### B.4 Rendimiento (mediciones reales; caché del navegador caliente)
| Métrica | Valor |
|---|---|
| `DOMContentLoaded` / `load` de la página | 2495 ms / 2584 ms |
| Python listo desde la navegación (Pyodide en caché) | ≈ 6,5 s |
| Arranque del worker (`engine.start` → listo) | 4041 ms y 4068 ms (dos ejecuciones) |
| Primera ejecución tras arrancar | 3 ms |
| Media de 50 ejecuciones consecutivas | 0,5–0,6 ms |
| `check` de «Calculadora de rebajas» (4 casos) | 7 ms |
| Traza de un bucle de 100 iteraciones | 9–12 ms |
| Timeout + reinicio | El timeout salta a los 5009 ms; después el worker vuelve a arrancar (≈ 4 s, igual que el arranque) |
| Clic en «Ejecutar» → salida visible | 17 ms |
| Memoria | Montón JS de la página: 2–6 MB. **La memoria del worker no se pudo medir** (`performance.memory` no lo incluye) |

### B.5 Contraste (WCAG 2.1; texto normal requiere ≥ 4,5:1)
| Par | Índigo | Océano | Esmeralda | Violeta | Frambuesa | Atardecer | Grafito |
|---|---|---|---|---|---|---|---|
| Botón primario, **día** | 4,84 | **4,36** | **3,58** | 5,70 | 4,61 | **3,76** | 10,35 |
| Navegación activa, **día** | **4,20** | **3,81** | **3,18** | 4,87 | **3,92** | **3,37** | 8,98 |
| Blanco sobre el final del degradado de la cabecera | **4,25** | **4,10** | 4,70 | **3,79** | **2,74** | **3,67** | 4,76 |
| Botón primario, **noche** | 6,18 | 8,22 | 9,98 | 7,05 | 7,24 | 8,48 | 12,92 |

En modo día (común a todas las paletas), los pares de etiquetas fallan: XP 2,18; aviso 3,22; correcto 3,12; error 3,87; información 3,56; texto «faint» 3,13. En modo noche, todos superan 4,5 salvo «faint» (4,09).

### B.6 No ejecutadas o bloqueadas
| ID | Escenario | Estado | Motivo |
|---|---|---|---|
| QA-N001 | Lector de pantalla real (NVDA, VoiceOver) | BLOCKED | No hay lector de pantalla en el entorno; solo revisión estática de `aria-*` |
| QA-N002 | Firefox y Safari | BLOCKED | Solo hay un navegador basado en Chromium |
| QA-N003 | Primera carga con caché vacía (descarga de Pyodide) | NOT RUN | No se puede vaciar de forma fiable la caché HTTP del panel |
| QA-N004 | Sin conexión o caída del CDN | NOT RUN | No hay forma de simular la desconexión en este entorno |
| QA-N005 | Dispositivos modestos o CPU limitada | BLOCKED | No hay dispositivo ni herramienta de limitación de CPU |
| QA-N006 | Memoria del worker de Pyodide | BLOCKED | No es medible desde la página |
| QA-N007 | Descarga real del archivo exportado | NOT RUN | Requiere confirmar una descarga; el código se revisó de forma estática y la importación sí se probó con archivo |
| QA-N008 | Cambio de zona horaria y horario de verano | NOT RUN | No se puede cambiar la zona horaria del sistema; ver el riesgo estático R-02 |
| QA-N009 | E2E con Playwright | BLOCKED | No hay Node ni Playwright; sustituido por `qa.html` y scripts en el navegador integrado |
| QA-N010 | Cobertura de líneas del JavaScript | BLOCKED | No hay herramienta de cobertura sin dependencias nuevas |

---

## C. Bugs detectados

Severidad: **crítica** (pérdida de datos o seguridad grave inmediata), **alta** (bloquea el uso o invalida el aprendizaje medido), **media**, **baja**.

### BUG-001 · El código del alumno puede reescribir el validador; todas las comprobaciones posteriores pasan
- **Severidad:** alta · **Componente:** `src/engine/runtime.py` (`check`), `worker.js`
- **Pasos:**
  1. En cualquier actividad de código, escribir:
     ```python
     import __main__
     __main__._compare = lambda *a: (True, None)
     input(); input(); print(0)
     ```
  2. Pulsar «Comprobar».
  3. Ir a otro ejercicio y comprobar `x = 1`.
- **Esperado:** «fail» en los dos casos.
- **Real:** «¡Correcto!» en ambos, hasta que se reinicia el worker o se recarga la página.
- **Evidencia:** QA-B031, QA-C017.
- **Causa:** el motor de validación y el código del alumno comparten intérprete; las funciones del validador se buscan como variables globales en cada llamada.
- **Propuesta:** ver P0-1 en el plan de mejoras (detección de manipulación con reinicio del worker; validación definitiva en el servidor cuando haya cuentas).

### BUG-002 · El bloqueo de `js` y `pyodide` se elude con `importlib`, `builtins.__import__` y `sys.modules`
- **Severidad:** media (pasará a alta cuando haya cuentas y API en el mismo origen) · **Componente:** `runtime.py` (`_safe_import`)
- **Pasos:** ejecutar en el laboratorio:
  ```python
  import importlib
  js = importlib.import_module("js")
  print(type(js.fetch).__name__, js.self.location.pathname)
  ```
- **Esperado:** `ImportError`.
- **Real:** `JsProxy /src/engine/worker.js`, es decir, acceso a `fetch` y `postMessage` del worker.
- **Evidencia:** QA-B028…B030, QA-C014…C016.
- **Causa:** el bloqueo solo sustituye `__import__` en el diccionario de builtins del alumno.
- **Riesgo real:** el worker no tiene acceso al DOM ni a `localStorage`, pero puede hacer peticiones de red con el origen de la app y enviar mensajes `postMessage` que el cliente podría tomar por respuestas del motor.
- **Propuesta:** P1-2.

### BUG-003 · El estado del intérprete persiste entre ejecuciones; parchear `builtins` deja el motor inutilizable
- **Severidad:** alta · **Componente:** `runtime.py` (`execute`)
- **Pasos:**
  1. Laboratorio: `import builtins` y `builtins.len = lambda x: 0`; Ejecutar.
  2. Ejecutar `print(len("abc"))`.
- **Esperado:** `3`.
- **Real:** la petición falla dentro del motor; todas las ejecuciones siguientes fallan hasta recargar, sin aviso comprensible. Variante leve: tras `math.pi = 3`, el valor persiste en las ejecuciones siguientes.
- **Evidencia:** QA-B015…B017, QA-C011, QA-C012.
- **Causa:** el intérprete es único y nunca se restaura; el propio motor usa `len` y `json`.
- **Propuesta:** P0-1.

### BUG-004 · El paso a paso de un cálculo largo en C congela toda la aplicación
- **Severidad:** alta · **Componente:** `src/components/tracer.js` (`narrate`); falta una barrera de errores en `main.js`
- **Pasos:** en el laboratorio, escribir `x = sum(range(10**9))` y pulsar «Paso a paso». Esperar 6 s.
- **Esperado:** un mensaje «El programa ha tardado demasiado».
- **Real:** `TypeError … reading 'end' at narrate`. Toda la interfaz deja de actualizarse: la navegación no cambia de pantalla y la píldora queda en «Cargando Python…». Solo se recupera recargando.
- **Evidencia:** QA-B022, QA-E003.
- **Causa:** el resultado del timeout trae `steps: []`; `narrate(steps, 0)` accede a `steps[0].end`. Sin barrera de errores, el fallo de render tumba toda la app.
- **Propuesta:** P0-2.

### BUG-005 · El timeout de una ejecución se aplica también a peticiones en cola
- **Severidad:** media · **Componente:** `src/engine/python.js` (`call`)
- **Pasos:** lanzar a la vez `while True: pass` y `print("inocente")`.
- **Esperado:** la segunda petición imprime `inocente`.
- **Real:** también recibe «El programa ha tardado demasiado».
- **Evidencia:** QA-B020.
- **Causa:** al vencer el plazo se resuelven todas las peticiones pendientes con timeout. Ocurre en la interfaz si se pulsa «Paso a paso» mientras «Ejecutar» está colgado.
- **Propuesta:** P2-1.

### BUG-006 · Las variantes anti-trampa se omiten si el texto no coincide: se aceptan soluciones con el resultado escrito a mano
- **Severidad:** alta · **Componente:** `runtime.py` (`check`, bucle `variants`); datos en `activities.js`
- **Pasos:** en «La ficha de Lucía», borrar todo y escribir:
  ```python
  print("Lucía tiene 19 años")
  print("El año que viene tendrá 20")
  ```
  Pulsar «Comprobar».
- **Esperado:** fail, porque no usa variables ni calcula.
- **Real:** «¡Correcto!». Lo mismo ocurre en «El saludo roto» (`edad=17` sin espacios más el texto fijo) y en «Intercambia los vasos» (comillas simples más los valores escritos a mano).
- **Evidencia:** QA-B059, QA-B064, QA-B074, QA-C035.
- **Causa:** `if old not in code: continue`; la variante se salta en silencio cuando la línea original no aparece literalmente.
- **Propuesta:** P0-3.

### BUG-007 · La importación acepta estructuras inválidas y rompe la app de forma persistente
- **Severidad:** alta · **Componente:** `src/state/store.js` (`importState`, `load`)
- **Pasos:** Perfil → Importar copia con `{"version":1,"xp":5,"daily":{},"activities":null}` → Sí, restaurar → recargar.
- **Esperado:** la copia se rechaza con un mensaje.
- **Real:** se acepta. La app se congela; tras recargar, el Inicio y el Perfil fallan siempre (`Cannot convert undefined or null to object`) y no hay forma de reiniciar desde la interfaz. También se aceptan `concepts:"texto"`, XP negativo y `dailyGoal: 0`.
- **Evidencia:** QA-B097…B100, QA-E004.
- **Causa:** la validación solo mira `version`, `xp` y `daily`; `load()` mezcla campos sin comprobar tipos; no hay barrera de errores.
- **Propuesta:** P0-2 y P1-3.

### BUG-008 · El XP de repaso es ilimitado
- **Severidad:** media · **Componente:** `store.js` (`review`)
- **Pasos:** Repaso → «Repaso de refuerzo» repetidas veces, respondiendo bien.
- **Esperado:** XP de repaso limitado por día o por concepto.
- **Real:** 50 aciertos = 150 XP.
- **Evidencia:** QA-B085.
- **Propuesta:** P1-5.

### BUG-009 · La misión «Supera 2 actividades» se cumple repitiendo la misma
- **Severidad:** baja · **Componente:** `store.js` (`todayRec.activities`), `gamification.js`
- **Evidencia:** QA-B086.
- **Propuesta:** contar los identificadores de actividad distintos del día.

### BUG-010 · Logros concedidos sin cumplir su descripción
- **Severidad:** baja · **Componente:** `gamification.js` (`ACHIEVEMENTS`)
- **Real:**
  - «Hola, mundo» (*Ejecuta tu primer programa*) se concede con un fallo de planificación.
  - «Mente de intérprete» (*3 predicciones*) cuenta cualquier pregunta acertada.
  - «Memoria a largo plazo» (*completa una sesión de repaso*) se concede con 3 respuestas, sin terminar la sesión (revisión estática).
- **Evidencia:** QA-B087, QA-B088.
- **Propuesta:** registrar eventos específicos (`runs`, `predictionsCorrect`, `reviewSessionsCompleted`).

### BUG-011 · Un dato largo en `input()` produce «Demasiada salida»
- **Severidad:** baja · **Componente:** `runtime.py` (`_input`, `Transcript`)
- **Evidencia:** QA-B025 (con 100 000 caracteres falla; con 19 000, no).
- **Causa:** el eco del dato cuenta para `MAX_OUT`.
- **Propuesta:** no contar los segmentos `in` en el límite, o truncar el eco.

### BUG-012 · Salir y volver a una actividad borra fallos, pistas y solución vista
- **Severidad:** alta · **Componente:** `src/components/activities.js` (`CodeActivity`: `fails`, `revealed` y `solutionShown` son estado local)
- **Pasos:** Desafíos → «El saludo roto» → Comprobar ×3 → Ver solución explicada → confirmar → volver a Desafíos → entrar de nuevo → escribir la solución → Comprobar.
- **Esperado:** 6 XP (30 %), sin bonus, sin el logro «Por mí misma» y con el concepto marcado como fallado.
- **Real:** +25 XP con «+5 por resolverlo a la primera sin ayuda», `firstTry:true`, `noHints:true`, logro «Por mí misma» y el concepto promovido como «bien a la primera».
- **Evidencia:** QA-E001.
- **Causa:** `activityPass` recibe los contadores locales del componente, que se reinician al volver a montarlo, y no los ya guardados en el almacén (`fails:3`, `solutionViewed:true`).
- **Propuesta:** P0-4.

### BUG-013 · Los avisos de logros se duplican
- **Severidad:** baja · **Componente:** `main.js` (suscripción de logros)
- **Evidencia:** QA-E002.
- **Causa:** `unlockAchievement` se llama dentro del bucle del suscriptor y vuelve a disparar el suscriptor antes de que se registren los demás logros.
- **Propuesta:** desbloquear todos los logros en una sola actualización y anunciarlos después.

### BUG-014 · Reenviar el mismo código erróneo cuenta como un fallo nuevo
- **Severidad:** baja · **Componente:** `CodeActivity.check`, `actions.activityFail`
- **Evidencia:** QA-E007.
- **Efecto:** infla «Tipos de error» y «Mis puntos débiles».
- **Propuesta:** no registrar un fallo si el código es idéntico al del último intento.

### BUG-015 · Las ventanas modales no gestionan el foco
- **Severidad:** media (accesibilidad) · **Componente:** `components/common.js` (`Modal`)
- **Evidencia:** QA-E008.
- **Propuesta:** enfocar el primer control al abrir, atrapar Tab dentro de la ventana, devolver el foco al cerrar y marcar el resto con `inert`.

### BUG-016 · Desbordamiento horizontal en el Mapa con 390 px o menos
- **Severidad:** media · **Componente:** `styles.css` (`.lesson-item`, `.tag { white-space: nowrap }`), `views/map.js`
- **Evidencia:** QA-E013, QA-E014 (página de 440 px; título del reto partido letra a letra).
- **Propuesta:** permitir que la etiqueta pase a una segunda línea en móvil (`flex-wrap`, `white-space: normal`) y acortar «Resuelve «Calculadora de rebajas»».

### BUG-017 · Contraste insuficiente en modo día
- **Severidad:** media (accesibilidad) · **Componente:** `styles.css` (paletas y etiquetas)
- **Evidencia:** QA-E016 y tabla B.5.
- **Propuesta:** oscurecer el acento de Esmeralda, Atardecer y Océano en modo día; usar el tono «hover» para el texto de la navegación activa; oscurecer los textos de las etiquetas; revisar el final del degradado de Frambuesa y Atardecer.

### BUG-018 · El editor se ralentiza con programas largos
- **Severidad:** baja · **Componente:** `components/code.js` (`viewportMargin: Infinity`; `getValue()` en cada render)
- **Evidencia:** QA-E017.
- **Propuesta:** `viewportMargin` finito en el laboratorio y evitar `getValue()` en cada render.

### Limitaciones de diseño (no son defectos de implementación)
- **LIM-001:** la reejecución de `input()` no es fiel con programas que dependen de la hora (QA-B033). Debe documentarse o resolverse con `SharedArrayBuffer` y entrada síncrona.
- **LIM-002:** los casos de prueba son fijos y sus etiquetas («59.99 € con 15 %») revelan los datos, así que una tabla de respuestas supera la validación (QA-B070). Propuesta: añadir casos aleatorios ocultos.

### Riesgos detectados por revisión estática (no ejecutados)
- **R-01:** el índice lateral de la lección permite saltar a `maxStep + 1` sin responder las preguntas obligatorias del paso.
- **R-02:** `dayKey` usa la fecha local; `upcomingReviews` mezcla fechas UTC con días locales. Es coherente en la misma zona horaria, pero no se ha probado un cambio de zona ni el horario de verano.
- **R-03:** dentro del editor, Tab inserta espacios. Para salir con el teclado hay que pulsar Esc, y eso solo se explica en el laboratorio.
- **R-04:** la herramienta de demo «Simular el día siguiente» y `dayOffset` se exportan e importan con el progreso.

---

## D. Problemas pedagógicos

### Etapas de la metodología: ¿implementadas o solo descritas?
| Etapa | Estado | Dónde |
|---|---|---|
| Comprender | Implementada | Enunciados, teoría breve y preguntas intercaladas con retroalimentación |
| Razonar | Implementada | Predicciones con explicación de cada idea errónea; visualizador paso a paso |
| Planificar | **Parcial** | Solo en «Calculadora de rebajas» (preguntas de plan) y «Ordena los pasos». No en «Ticket con IVA» (reto avanzado) ni en «Intercambia los vasos» |
| Programar | Implementada | Editor real |
| Ejecutar | Implementada | Ejecutar, paso a paso, consola con `input()` |
| Analizar | Implementada | Categoría del error, casos superados, comparación esperado/obtenido, malentendidos detectados |
| Mejorar | **Mayoritariamente descriptiva** | Solo dos heurísticas (nombres de una letra y variables sin usar) y «Compara con otra solución». No se pide refactorizar ni volver a intentar |

El indicador de fases (solo en ejercicios «Construye») es **cosmético**: avanza con los clics, no con lo que el alumno ha comprendido, y omite «Razonar» aunque la bienvenida anuncia 7 etapas.

### Problemas
| ID | Problema | Evidencia |
|---|---|---|
| PED-001 | **Validación injusta por la regla del «último número».** Salidas legítimas como `Pagas 80.0 euros con un 20 % de descuento` o `Total: 121.0 (IVA del 21 %)` se rechazan, y además con un diagnóstico falso («Has mostrado el importe descontado», «Solo has calculado el impuesto»). Un principiante creerá que su razonamiento es erróneo cuando no lo es | QA-B069, QA-B078, QA-C034 |
| PED-002 | **Contenidos usados antes de enseñarse.** «Calculadora de rebajas» necesita `/`, porcentajes y resultados decimales (`80.0`), que corresponden a la lección 2.2, aún pendiente. «El saludo roto» necesita `str()`, que solo aparece en la explicación de una pregunta y en la pista 4 | Revisión de `lesson-variables.js` |
| PED-003 | Planificación presente solo en 2 de las 8 actividades; el reto más difícil (IVA) no la ofrece | `activities.js` |
| PED-004 | La pista de nivel 3 de «La ficha de Lucía» (`edad ← (valor actual de edad) + 1`) prácticamente da la respuesta; el salto entre los niveles 2 y 3 es grande | Revisión |
| PED-005 | `___` dentro de un comentario hace que el ejercicio se considere incompleto | QA-C036 |
| PED-006 | Los fallos de predicción se atribuyen a todos los conceptos de la actividad (reasignación y `print`), aunque el error solo afecte a uno | `store.activityFail` |
| PED-007 | Los tres bugs de validación (BUG-001, BUG-006, BUG-012) hacen que «Dominado», el XP y los logros puedan no reflejar el aprendizaje real | Ver la sección C |
| PED-008 | El índice permite saltar las preguntas de comprobación (R-01), lo que debilita el principio de «predecir antes de ejecutar» | Revisión estática |
| PED-009 | Tras un fallo, el reenvío idéntico cuenta como error (BUG-014): «Mis puntos débiles» puede señalar como débil un concepto donde solo hubo un doble clic | QA-E007 |

### Lo que funciona bien pedagógicamente (verificado)
- Los errores de ejecución se explican con causa y «Qué probar», en lenguaje claro (18/18 correctos).
- Las predicciones explican **por qué** cada opción incorrecta es tentadora («Python no es una hoja de cálculo»).
- Las soluciones correctas distintas se aceptan: `format`, `%`, f-strings, desempaquetado, `+=`, cálculo en una línea, 2 decimales y coma decimal.
- Los errores «que parecen correctos» reciben un diagnóstico específico: `int()` con 59.99, porcentaje restado como euros, solo el IVA y `edad = 19 + 1`.
- Se aceptan varios órdenes correctos en «Ordena los pasos», y se puede ejecutar un orden incorrecto para ver el `NameError` real.
- Equivocarse no resta puntos; las pistas reducen el XP de forma moderada y transparente.

---

## E. Cobertura de testing

### Cobertura medida
| Archivo | Herramienta | Tests originales | Originales + QA |
|---|---|---|---|
| `src/engine/runtime.py` | `trace` (biblioteca estándar), `tests/qa/coverage_runtime.py` | **407/565 líneas = 72,0 %** | **468/565 líneas = 82,8 %** |

La cifra infravalora la cobertura real. Las funciones internas de la traza (`frames_of`, `local`, `glob`) usan `sys.settrace` y anulan el trazador de cobertura mientras se ejecutan, así que aparecen como no ejecutadas aunque QA-C025…C030 sí las ejercitan. Las reglas `must_load` y `print_uses` solo se ejercitan en el navegador, con las especificaciones de `activities.js`.

**JavaScript:** no hay herramienta de cobertura disponible sin añadir dependencias, así que no se da ningún porcentaje.

### Mapa funcional
| Área | Probado | Sin verificar |
|---|---|---|
| Motor y validación | Ejecución, aislamiento, límites, seguridad, `input()`, errores, traza, 8 actividades | Caída del CDN, caché vacía |
| Interfaz | Navegación, lección, actividades, laboratorio, perfil, importación, XSS, tema, resoluciones, contraste, foco | Lector de pantalla real, Firefox y Safari |
| Progreso | XP, pistas, misiones, logros, Leitner, rachas, persistencia | Zona horaria y horario de verano, descarga real del archivo exportado |
| Rendimiento | Arranque, ejecuciones, comprobación, traza, editor | Dispositivos modestos, memoria del worker |

---

## F. Recomendaciones priorizadas
Resumen; el detalle técnico está en [QA_IMPROVEMENTS.md](QA_IMPROVEMENTS.md).

- **P0 (corregir antes de usarla con estudiantes):**
  - Aislar y proteger el motor: detectar manipulación y reiniciar el worker (BUG-001, BUG-003).
  - Proteger la interfaz frente a errores: barrera de errores y visualizador sin pasos (BUG-004, BUG-007).
  - Que las variantes anti-trampa nunca se omitan en silencio (BUG-006).
  - Calcular el XP y el dominio con los datos guardados, no con los del componente (BUG-012).
- **P1:**
  - Corregir la regla del «último número» (PED-001).
  - Validar el esquema al importar y al cargar (BUG-007).
  - Reforzar el bloqueo de módulos (BUG-002).
  - Limitar el XP de repaso (BUG-008).
  - Alinear los contenidos con las actividades (PED-002).
- **P2:**
  - Timeout solo para la petición culpable (BUG-005).
  - Foco en las ventanas modales (BUG-015).
  - Desbordamiento del mapa en móvil (BUG-016).
  - Contraste en modo día (BUG-017).
  - Planificación en más actividades (PED-003).
  - Reenvíos idénticos (BUG-014).
  - Saltos desde el índice de la lección (R-01).
- **P3:**
  - Logros y misiones (BUG-009, BUG-010, BUG-013).
  - Eco de `input()` (BUG-011).
  - Rendimiento del editor (BUG-018).
  - Casos aleatorios ocultos (LIM-002).
  - Documentar LIM-001.

---

## G. Veredicto final

1. **¿Funciona correctamente dentro del alcance de la demo?**
   Sí en el uso previsto, es decir, un alumno que sigue la lección y resuelve los ejercicios con normalidad. Todas las pantallas, actividades, pistas, repasos y la persistencia funcionaron en las pruebas. Pero hay salidas de ese camino que bloquean la app: el paso a paso con un cálculo largo y la importación de una copia inválida.

2. **¿Es el motor Python suficientemente robusto?**
   Para ejecutar código de principiante, sí: la paridad con CPython, los errores, los límites de tiempo y salida, la recuperación tras un bucle infinito, `os._exit` y la recursión funcionan. **Como entorno aislado, no:** el estado persiste entre ejecuciones, el bloqueo de módulos se elude y el alumno puede dañar el motor o el validador. Para una demo de autoaprendizaje es aceptable; para cualquier uso evaluable, no.

3. **¿Reconocen los validadores las soluciones correctas y rechazan las trampas?**
   Las soluciones correctas, sí: todas las alternativas probadas se aceptaron. Las trampas, **solo parcialmente**: los resultados escritos a mano se detectan si se conserva la línea original, pero se cuelan si se reescribe o se borra (3 ejercicios afectados), y el validador puede neutralizarse desde el propio código. Además, la regla del «último número» rechaza salidas legítimas con un diagnóstico erróneo.

4. **¿Se guarda bien el progreso?**
   Sí: se conserva al recargar, y el XP no se duplica al repetir actividades. Pero se puede **inflar** (salir y volver, repasos ilimitados) y **corromper sin recuperación** importando una copia mal formada.

5. **¿Es adecuada la experiencia para alguien que empieza desde cero?**
   En general, sí. Las explicaciones son claras, los errores se explican bien y la retroalimentación sobre ideas erróneas es de calidad. A mejorar: la última actividad usa operaciones aún no enseñadas, la planificación es escasa, la etapa «Mejorar» es casi nominal y el contraste en modo día dificulta la lectura de las etiquetas.

6. **¿Qué debe corregirse antes de usarla con estudiantes reales?**
   Como mínimo, los P0: BUG-001, BUG-003, BUG-004, BUG-006, BUG-007 y BUG-012. Además, por su impacto en la confianza del alumno, PED-001 (rechazar soluciones correctas con un diagnóstico falso) y BUG-017 (contraste).
