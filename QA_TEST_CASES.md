# LunaPy — Catálogo de casos de prueba

Casos reproducibles de la auditoría QA. Los resultados obtenidos están en [QA_REPORT.md](QA_REPORT.md).

## Cómo ejecutar las baterías

| Batería | Comando o URL | Qué cubre |
|---|---|---|
| Original CPython | `python -m unittest discover tests` | Motor básico (20 tests) |
| Original navegador | `http://localhost:5173/tests.html` | Contenido de las actividades con Pyodide (52 tests) |
| **QA CPython** | `python -m unittest discover tests/qa -v` | Motor: ejecución, aislamiento, seguridad, errores, traza y validador (38 tests; los bugs abiertos aparecen como *expected failure*) |
| **QA navegador** | `http://localhost:5173/tests/qa/qa.html` | Pyodide real: paridad, límites, seguridad, `input()`, errores, traza, validadores de las 8 actividades, progreso, gamificación e importación (101 tests). Hace una copia del progreso guardado y la restaura al terminar |
| Cobertura de `runtime.py` | `python tests/qa/coverage_runtime.py` · `python tests/qa/coverage_runtime.py original` | Cobertura de líneas con la biblioteca estándar |
| Referencias CPython | `python tests/qa/gen_expected.py` | Regenera `tests/qa/expected.json` |

Requisito previo para todo lo que usa el navegador: tener `python serve.py` en marcha.

Cuando se corrija un bug, su test aparecerá como «unexpected success» en CPython o como PASS en el navegador. Entonces hay que quitar la marca `@expectedFailure` o la etiqueta del bug.

---

## 1. Motor Python

| ID | Caso | Pasos | Resultado esperado |
|---|---|---|---|
| TC-RT-01 | Paridad con CPython | Ejecutar los 12 fragmentos de `SNIPPETS` (en `test_runtime_qa.py`) en Pyodide y compararlos con `expected.json` | Salida idéntica |
| TC-RT-02 | División normal y entera | `print(7 / 2, 7 // 2, -7 // 2, 7 % 3, -7 % 3, 2 ** 10)` | `3.5 3 -4 1 2 1024` |
| TC-RT-03 | Unicode | `print('Ñandú, cigüeña, acción ✓ 🐍🌙')` | Texto idéntico |
| TC-RT-04 | Aislamiento de variables | Ejecutar `secreto = 42`; después, `print(secreto)` | `NameError` |
| TC-RT-05 | Aislamiento de módulos | Ejecutar `import math; math.pi = 3`; después, `import math; print(math.pi)` | `3.141592653589793` (hoy: `3`, BUG-003) |
| TC-RT-06 | Integridad del motor | Ejecutar `import builtins; builtins.len = lambda x: 0`; después, `print(len("abc"))` | `3` (hoy: el motor queda roto, BUG-003) |
| TC-RT-07 | Bucle infinito | Ejecutar `while True: pass`; después, `print(2)` | Timeout hacia los 5 s; la segunda ejecución imprime `2` |
| TC-RT-08 | Peticiones en cola | Lanzar a la vez `while True: pass` y `print("inocente")` | La segunda imprime `inocente` (hoy recibe el timeout, BUG-005) |
| TC-RT-09 | Salida excesiva | `while True: print("x"*100)` | `OutputLimit` («Demasiada salida») a unos 20 000 caracteres |
| TC-RT-10 | Entrada larga | `s = input(); print(len(s))` con 100 000 caracteres | `100000` (hoy: «Demasiada salida», BUG-011) |
| TC-RT-11 | `os._exit` | `import os; os._exit(0)`; después, `print("vivo")` | `vivo` |
| TC-RT-12 | Recursión | `def f(): f()` + `f()` | `RecursionError` explicado |
| TC-RT-13 | `input()` múltiple | 3 llamadas a `input()` con avisos `"Uno: "`, `"Dos: "` y `3` | Avisos en orden; los datos se muestran como `in`; salida final `z y x` |
| TC-RT-14 | Determinismo de la reejecución | `random.randint` antes de dos `input()` | El mismo número aleatorio en todas las reejecuciones |
| TC-RT-15 | No determinismo (limitación) | `print(time.time_ns()); input()` | Documentado como LIM-001 |
| TC-RT-16 | `sys.exit()` | `print(1); sys.exit(); print(2)` | Termina con normalidad y muestra `1` |
| TC-RT-17 | `stderr` | `print('aviso', file=sys.stderr)` | Segmento de error (rojo en la consola) |

## 2. Seguridad del entorno

| ID | Caso | Código | Esperado |
|---|---|---|---|
| TC-SEC-01 | Importación directa | `import js` · `import pyodide` · `import micropip` | `ImportError` |
| TC-SEC-02 | Elusión con `importlib` | `importlib.import_module("js")` | `ImportError` (hoy da acceso, BUG-002) |
| TC-SEC-03 | Elusión con `builtins` | `builtins.__import__("js")` | `ImportError` (hoy da acceso, BUG-002) |
| TC-SEC-04 | `sys.modules` | `"js" in sys.modules` | No accesible (hoy `True`, BUG-002) |
| TC-SEC-05 | Manipulación del validador | `import __main__; __main__._compare = lambda *a: (True, None)` + Comprobar; después, `x = 1` en «Intercambia los vasos» | Ambos «fail» (hoy ambos «pass», BUG-001) |
| TC-SEC-06 | XSS por el nombre | Perfil → nombre `<img src=x onerror="window.__xss1=1">` → Inicio | Texto literal; no se crea `<img>` y `window.__xss1` queda sin definir |
| TC-SEC-07 | XSS por el historial importado | Copia con `log[0].label` = `<img … onerror>` → Mi progreso | Texto literal |
| TC-SEC-08 | XSS en el visualizador y la consola | `x = "<img src=z onerror=window.__xss3=1>"; print(x)` → Paso a paso y Ejecutar | Texto literal |

## 3. Mensajes de error (español)

Para cada código, ejecutarlo y comprobar el título:

| Código | Título esperado |
|---|---|
| `x = 10 / 0` | División entre cero |
| `int('abc')` | No se puede convertir a número entero |
| `float('3,5')` | (sugerencia que menciona el punto decimal) |
| `if True` + `    print(1)` | Faltan los dos puntos |
| `  x = 1` · `if True:` + `print(1)` | Problema de sangría |
| `print 'hola'` | A print le faltan los paréntesis |
| `print(“hola”)` | Carácter no válido |
| `'3' * '2'` | Multiplicación con texto |
| `5 + 'a'` | Operación entre tipos incompatibles |
| `print((1)` · `print(1))` | Paréntesis sin cerrar · Paréntesis de más |
| `class = 5` | Palabra reservada |
| `mi edad = 3` | Nombre de variable con espacios |
| `2edad = 3` | Nombre que empieza por un número |
| `print("hola)` | Texto sin cerrar |
| `18 = edad` | La asignación está al revés |
| `edad = 17` + `print("Tengo " + edad)` | Mezcla de texto y números |
| `print(nombre)` | Python no conoce el nombre «nombre» |
| `nombre='a'` + `print(nombr)` | La sugerencia menciona «nombre» |
| Error dentro de una función (línea 2) | Se indica la línea 2 |

## 4. Paso a paso

| ID | Caso | Esperado |
|---|---|---|
| TC-TR-01 | `for` de 3 vueltas · llamada a función · `while` + `if` | La secuencia de líneas coincide con un trazador independiente (`reference_lines`) |
| TC-TR-02 | `a = 1; a = a + 1; a = a * 10` | Variables antes de cada línea: `{}`, `{a:1}`, `{a:2}`, `{a:20}` |
| TC-TR-03 | Función `doble(4)` | En la línea 3, marcos `[Programa principal, doble()]` con `x=4, y=8` |
| TC-TR-04 | Error en la línea 2 | El último paso marca el error en la línea 2 |
| TC-TR-05 | Bucle infinito en Python | Se corta a los 400 pasos con un aviso |
| TC-TR-06 | **Laboratorio:** `x = sum(range(10**9))` → Paso a paso | Mensaje de tiempo agotado. Hoy la interfaz se congela (BUG-004): hay que recargar |

## 5. Validadores: tres escenarios por actividad más adversariales

Ejecutar en la actividad (Desafíos → actividad) o con `engine.check(código, ACTIVITIES[id].spec)`.

### «La ficha de Lucía» (`var-complete`)
| Escenario | Código (resumen) | Esperado |
|---|---|---|
| Convencional | `nombre = "Lucía"` · `edad = edad + 1` | PASS |
| Alternativa | `nombre = 'Lucía'` · `edad = 1 + edad` | PASS |
| Parece correcta | `edad = 19 + 1` | FAIL, lógica («solo por casualidad») |
| Adversarial | Borrar todo; `print("Lucía tiene 19 años")` + `print("El año que viene tendrá 20")` | FAIL (hoy PASS, BUG-006) |

### «El saludo roto» (`var-fix`)
| Escenario | Código | Esperado |
|---|---|---|
| Convencional | `"…Tienes " + str(edad) + " años."` + `print(mensaje)` | PASS |
| Alternativas | `"Hola, {}. Tienes {} años.".format(nombre, edad)` · `"Hola, %s. Tienes %d años." % (nombre, edad)` | PASS |
| Parece correcta | Falta el espacio: `str(edad) + "años."` | FAIL, lógica |
| Adversarial | `edad=17` (sin espacios), la línea `nombre, edad` y `print("Hola, Marco. Tienes 17 años.")` | FAIL (hoy PASS, BUG-006) |

### «Calculadora de rebajas» (`var-build`)
| Escenario | Código | Esperado |
|---|---|---|
| Convencional | Solución explicada | PASS |
| Alternativa | `p * (100 - d) / 100` con f-string de 2 decimales y `int` para el descuento | PASS (sugiere mejorar los nombres) |
| Parece correcta | `int(input())` para el precio | FAIL, ejecución (falla con 59.99) |
| Parece correcta | `precio - descuento` | FAIL, comprensión («Porcentaje ≠ euros») |
| Legítima | `print("Pagas", final, "euros con un", descuento, "% de descuento")` | PASS (hoy FAIL con un diagnóstico falso, PED-001) |
| Adversarial | Tabla `{"100": 80, "59.99": 50.9915, …}[p]` | FAIL (hoy PASS, LIM-002) |
| Adversarial | `print(80.0)` | FAIL (test original) |

### «Intercambia los vasos» (`ch-swap`)
| Escenario | Código | Esperado |
|---|---|---|
| Convencional | Con variable `aux` | PASS |
| Alternativa | `vaso_b, vaso_a = vaso_a, vaso_b` | PASS |
| Parece correcta | `vaso_a = vaso_b; vaso_b = vaso_a` | FAIL, lógica (pista del tercer vaso) |
| Adversarial | Comillas simples en las líneas iniciales y los valores escritos a mano | FAIL (hoy PASS, BUG-006) |

### «Ticket con IVA» (`ch-iva`)
| Escenario | Código | Esperado |
|---|---|---|
| Convencional | Solución explicada | PASS |
| Alternativa | `precio + precio * 21 / 100` | PASS |
| Parece correcta | `precio * 0.21` | FAIL, comprensión |
| Legítima | `print("Total:", round(precio * 1.21, 2), "(IVA del 21 %)")` | PASS (hoy FAIL, PED-001) |

### «El marcador» (`var-predict`), «¿Qué hace este programa?» (`ch-explain`) y «Planifica el descuento» (`var-order`)
| Caso | Esperado |
|---|---|
| Elegir cada opción incorrecta | Explicación específica del error; se puede reintentar |
| Elegir la correcta | XP (+5 si es a la primera); se muestran la explicación, la salida real y el paso a paso |
| Pasos 1 y 2 intercambiados en el plan | Se acepta (dependencias) |
| «Probar este orden» con el código desordenado | `NameError` real explicado |
| Contenido | Una sola opción correcta; todas las incorrectas con explicación; dependencias válidas |

## 6. Progreso y gamificación

| ID | Caso | Pasos | Esperado |
|---|---|---|---|
| TC-PG-01 | XP no duplicado | Superar la misma actividad dos veces | XP solo la primera vez |
| TC-PG-02 | Penalización por pistas | 3 pistas en una actividad de 20 XP; solución vista en una de 30 XP | 16 XP · 9 XP |
| TC-PG-03 | **Salir y volver** | «El saludo roto»: Comprobar ×3 → Ver solución → confirmar → Desafíos → volver → solución correcta → Comprobar | 6 XP, sin bonus ni logro «Por mí misma» (hoy 25 XP y logro, BUG-012) |
| TC-PG-04 | Avisos de logros | Situación de TC-PG-03 | Cada logro se anuncia una vez (hoy se duplican, BUG-013) |
| TC-PG-05 | XP de repaso | «Repaso de refuerzo» repetido | Con límite (hoy 3 XP por acierto sin límite, BUG-008) |
| TC-PG-06 | Misión de actividades | Superar dos veces la misma actividad | La misión no se completa (hoy sí, BUG-009) |
| TC-PG-07 | Logros | Fallo de planificación sin ejecutar código; 3 aciertos en preguntas que no son de predicción | No se conceden «Hola, mundo» ni «Mente de intérprete» (hoy sí, BUG-010) |
| TC-PG-08 | Envío repetido | Comprobar dos veces el mismo código erróneo | Un solo fallo (hoy dos, BUG-014) |
| TC-PG-09 | Leitner, mismo día | 5 aciertos del mismo concepto | Caja 2, estado «practicado» |
| TC-PG-10 | Leitner, días después | «Simular el día siguiente» ×2 → acertar un repaso | «Necesita repaso» → caja 3, «Dominado», próximo repaso a 4 días |
| TC-PG-11 | Leitner, fallo | Fallar un repaso | Caja 1 y repaso hoy |
| TC-PG-12 | Racha | XP hoy; simular un día y ganar XP; simular un día; simular otro | 2 → 2 → 0 |

## 7. Persistencia e importación

| ID | Caso | Esperado |
|---|---|---|
| TC-PS-01 | Superar una actividad y recargar | Sigue completada, con el mismo XP |
| TC-PS-02 | Importar una copia válida | Se restaura tras la confirmación |
| TC-PS-03 | Importar texto que no es JSON o JSON sin `version` | Aviso «Archivo no válido»; nada cambia |
| TC-PS-04 | Importar `{"version":1,"xp":5,"daily":{},"activities":null}` y recargar | Se rechaza (hoy la app queda rota de forma persistente, BUG-007). **Para recuperarse:** borrar en las herramientas del navegador la clave `lunapy.v1` de `localStorage` |
| TC-PS-05 | Importar `concepts: "texto"`, `xp: -500` o `dailyGoal: 0` | Se rechaza (hoy se acepta, BUG-007) |
| TC-PS-06 | Reiniciar el progreso | Pide confirmación; borra el progreso y conserva el tema y la paleta |
| TC-PS-07 | Cambiar nombre y objetivo | Se guarda y se refleja en el avatar, el saludo y el anillo |

## 8. Interfaz y accesibilidad

| ID | Caso | Esperado |
|---|---|---|
| TC-UI-01 | Resoluciones 1920×1080, 1366×768, 768×1024, 390×844 y 360×640 en 12 pantallas (Inicio, Mapa, lección pasos 0/2/10/12, Laboratorio, Desafíos, desafío, Repaso, Mi progreso, Perfil) | `scrollWidth ≤ innerWidth` (hoy el Mapa falla con 390 y 360, BUG-016) |
| TC-UI-02 | Contraste de las 7 paletas en día y noche (script de la sección B.5 del informe) | ≥ 4,5:1 en texto normal (hoy hay fallos en modo día, BUG-017) |
| TC-UI-03 | Primera visita → 3 pulsaciones de Tab | El foco permanece en la ventana de bienvenida (hoy se va detrás, BUG-015) |
| TC-UI-04 | Navegar con Tab por la app | Contorno de foco visible |
| TC-UI-05 | Botón día/noche ×10, a veces rápido | El icono y el tema siempre coinciden |
| TC-UI-06 | Ejecutar un bucle infinito y cambiar de pantalla 6 veces | Al volver, el motor funciona |
| TC-UI-07 | Editor con 30, 150, 500 y 2000 líneas | Escritura fluida (hoy 152 ms por pulsación con 2000 líneas, BUG-018) |

## 9. Rendimiento (informativo)
Medido en `qa.html` (fila QA-B101) y en el laboratorio: arranque del worker, primera ejecución, media de 50 ejecuciones, `check`, traza, `DOMContentLoaded`, Python listo y tiempo de pulsación en el editor. Registrar siempre el navegador y el estado de la caché.
