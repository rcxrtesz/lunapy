# LunaPy — Plan de correcciones

Ordenado por prioridad. Cada punto indica el bug que resuelve (ver [QA_REPORT.md](QA_REPORT.md)), la propuesta técnica y cómo verificarla.

**Estado (28/10/2026):** **todo el plan (P0, P1, P2 y P3) está aplicado y verificado.** Solo queda la limitación LIM-001, ahora documentada.

| Punto | Estado | Cambios |
|---|---|---|
| P3-1 | ✅ Aplicado | `store.js` (`activityIds` del día) y `gamification.js` (misión de actividades distintas) |
| P3-2 | ✅ Aplicado | Contadores `runs` y `reviewSessions`, preguntas con `prediction`; logros basados en esos eventos |
| P3-3 | ✅ Aplicado | `unlockAchievements` en una sola actualización (`main.js`) |
| P3-4 | ✅ Aplicado | `runtime.py`: el eco de `input()` no cuenta para el límite y se recorta |
| P3-5 | ✅ Aplicado | `code.js`: `viewportMargin` adaptable y sin `getValue()` innecesarios |
| P3-6 | ✅ Aplicado | `runtime.py` (`_hidden_cases`, deterministas por código) y `activities.js` (`hidden`) |
| P3-7 | ✅ Documentado | Chuleta del laboratorio y README |
| P3-8 | ✅ Aplicado | `runtime.py` (`_has_blanks` sobre el árbol sintáctico) |
| P3-9 | ✅ Aplicado | `backup.js`: la exportación omite `dayOffset` |

| Punto | Estado | Cambios |
|---|---|---|
| P2-1 | ✅ Aplicado | `python.js`: cola con una petición en curso; timeout por petición; reinicio sin perder las pendientes |
| P2-2 | ✅ Aplicado | `common.js` (`Modal`): foco inicial, Tab retenido, Esc y devolución del foco |
| P2-3 | ✅ Aplicado | `styles.css`: lista del mapa y cabecera de módulo en móvil |
| P2-4 | ✅ Aplicado | `styles.css`: acentos y degradados de día, colores semánticos, `--faint`, `--xp-text` y `--streak` (valores calculados para ≥ 4,6:1) |
| P2-5 | ✅ Aplicado | `activities.js`: planificación en «Ticket con IVA» e «Intercambia los vasos» |
| P2-6 | ✅ Aplicado | `store.js` y `activities.js`: un reenvío idéntico no cuenta como fallo |
| P2-7 | ✅ Aplicado | `lesson.js`: límite de navegación por preguntas pendientes, también por URL |
| P2-8 | ✅ Aplicado | `activities.js` («Mejorar mi solución»), `store.js` (`improveSolution`), `runtime.py` (números repetidos) |
| P2-9 | ✅ Aplicado | `activities.js` (`PhaseBar` con 7 fases marcadas por hitos) |
| P2-10 | ✅ Aplicado | `activities.js` (concepto por opción) y `store.js` (`activityFail` con `concepts`) |

| Punto | Estado | Cambios |
|---|---|---|
| P1-1 | ✅ Aplicado | `runtime.py`: el resultado se busca entre los números de la última línea con números; los malentendidos ignoran los ecos de los datos. Enunciados de «Calculadora de rebajas» y «Ticket con IVA» actualizados |
| P1-2 | ✅ Aplicado | `runtime.py`: ocultación de los módulos bloqueados y *finder* durante la ejecución. `worker.js` y `python.js`: token secreto en las respuestas y `postMessage` capturado al arrancar |
| P1-3 | ✅ Aplicado | `store.js`: `validateState`, `checkBackup`, reparación al cargar. `profile.js`: rechazo con motivo antes de la confirmación |
| P1-4 | ✅ Aplicado | `lesson-variables.js`: paso «Operaciones con números», `str()` en «Texto y números» y resumen ampliado |
| P1-5 | ✅ Aplicado | `store.js`: XP de repaso solo para el primer acierto de cada concepto al día |

| Punto | Estado | Cambios |
|---|---|---|
| P0-1 | ✅ Aplicado | `runtime.py`: instantánea de builtins y módulos, restauración tras cada ejecución, detección de manipulación (categoría «manipulacion»). `worker.js`: el motor se carga en un módulo privado. `python.js`: reinicio del worker tras una manipulación o un error interno |
| P0-2 | ✅ Aplicado | `components/boundary.js` (barrera de errores por pantalla y global, con recuperación y copia previa), `lib/backup.js`, visualizador sin pasos en `tracer.js`, oyentes del almacén protegidos en `store.js` |
| P0-3 | ✅ Aplicado | `runtime.py` (`_apply_variant` sobre el árbol sintáctico; una variante nunca se omite); `activities.js` usa `set: {...}` |
| P0-4 | ✅ Aplicado | `store.js` (intento en curso `cur` guardado, migración de registros antiguos, `currentAttempt`); `components/activities.js` recupera pistas y solución del almacén; los errores de planificación no quitan el bonus |

## P0 · Bloqueantes antes de usarla con estudiantes

### P0-1 · Proteger el motor frente al código del alumno (BUG-001, BUG-003)
- **Problema:** el alumno y el validador comparten intérprete. El alumno puede reescribir el validador o los builtins y dejar el motor roto o permanentemente «aprobado».
- **Propuesta:**
  1. **Instantánea al arrancar:** al cargar `runtime.py`, guardar una copia de `builtins.__dict__`, de las referencias a las funciones del motor (`_compare`, `_rules`, `execute`…) y de la lista de módulos de `sys.modules`.
  2. **Restauración tras cada ejecución:**
     - Devolver `builtins` a su estado original.
     - Eliminar de `sys.modules` los módulos importados por el alumno, para que vuelvan a cargarse limpios (esto resuelve `math.pi`).
     - Comprobar que las funciones del motor son las mismas.
  3. **Detección de manipulación:** si alguna función del motor ha cambiado, la comprobación devuelve «No se pudo validar» y el cliente reinicia el worker (`engine._restart()`).
  4. **Bloquear el acceso trivial:** no exponer el motor en `__main__`. Cargarlo como un módulo con un nombre interno, borrar las referencias globales y mantener solo los `api_*` en un objeto que el worker capture al arrancar.
  5. **Garantía real (fase con cuentas):** cualquier resultado que cuente para una nota o un certificado debe revalidarse en el servidor, con un intérprete aislado por ejecución. En el navegador, las medidas anteriores protegen frente a errores y trampas casuales, no frente a un alumno decidido (siempre queda `gc.get_objects()`).
- **Verificación:** QA-B015…B017, QA-B031, QA-C011, QA-C012 y QA-C017 pasan a PASS.

### P0-2 · La interfaz no debe congelarse ante errores (BUG-004, BUG-007)
- **Propuesta:**
  1. En `Tracer`, si `steps.length === 0`, mostrar `data.error` con `ErrorCard` y no calcular la narración. Proteger `narrate` frente a pasos inexistentes.
  2. Añadir una **barrera de errores** en `App`: un componente con `componentDidCatch` o `useErrorBoundary` de Preact que muestre «Algo ha fallado» con tres botones: «Volver al inicio», «Recargar» y «Restablecer datos dañados» (que antes exporta automáticamente una copia).
  3. Barreras locales en las zonas de riesgo (visualizador, actividad), para que un fallo no tumbe la navegación.
- **Verificación:** QA-E003 (paso a paso de `sum(range(10**9))`) muestra el mensaje de tiempo agotado y la navegación sigue funcionando; QA-E004 permite recuperarse desde la interfaz.

### P0-3 · Las variantes anti-trampa no deben omitirse en silencio (BUG-006)
- **Propuesta:**
  1. Sustituir el reemplazo de texto por un **reemplazo sobre el árbol sintáctico (AST)**: en la especificación, `variants: [{ "set": { "edad": 30 }, … }]`. Se busca la primera asignación `edad = <constante>`, sea cual sea su formato, y se cambia la constante.
  2. Si la asignación no existe, el resultado es **fail** con un mensaje pedagógico, no un salto silencioso. Por ejemplo: «Tu programa debe guardar la edad en la variable `edad` (como en el código inicial) y usarla para calcular».
  3. Para «Intercambia los vasos», añadir la regla «no se pueden asignar textos literales a `vaso_a` ni a `vaso_b` después de la línea 2».
- **Verificación:** QA-B059, QA-B064, QA-B074 y QA-C035 pasan a PASS; las soluciones legítimas (QA-B056…B058, B060…B063, B071…B073) siguen en PASS.

### P0-4 · Calcular el XP y el dominio con los datos guardados (BUG-012)
- **Propuesta:**
  1. En el almacén, mantener por actividad un registro del **intento en curso** (`fails`, `hintsMax`, `solutionViewed` desde la última vez que se superó) y reiniciarlo solo al completarla.
  2. `activityPass` calcula el XP, el bonus, `firstTry`, `noHints` y el resultado del repaso a partir de ese registro, no de los argumentos del componente.
  3. `CodeActivity` inicializa `revealed` y `solutionShown` desde el almacén, de modo que al volver se siguen viendo las pistas ya abiertas.
- **Verificación:** QA-E001 (TC-PG-03) da 6 XP, sin bonus ni logro «Por mí misma», y el concepto queda en «necesita repaso».

## P1 · Importantes para el funcionamiento y el aprendizaje

### P1-1 · Regla del «último número» (PED-001)
- **Propuesta:**
  - Aceptar la salida si **alguno** de los números mostrados en la última línea con números coincide con el resultado esperado y ninguno coincide con un malentendido conocido.
  - Alternativa más pedagógica: pedir explícitamente «muestra solo el número» o comprobar el valor de una variable (`final`).
  - Activar los mensajes de malentendido solo cuando **todos** los números mostrados encajen con ese malentendido.
- **Verificación:** QA-B069, QA-B078 y QA-C034 pasan a PASS; QA-B068 y QA-B077 siguen detectando el error.

### P1-2 · Bloqueo de módulos robusto (BUG-002)
- **Propuesta:**
  1. Durante la ejecución del alumno, retirar temporalmente `js`, `pyodide*` y `_pyodide*` de `sys.modules` y restaurarlos después.
  2. Instalar un *finder* en `sys.meta_path` que rechace esos nombres mientras dura la ejecución.
  3. Sustituir también `builtins.__import__` real durante la ejecución.
  4. Ignorar en el cliente los mensajes del worker cuyo `id` no esté pendiente, y firmar las respuestas del motor con un token generado al arrancar el worker y desconocido para el código del alumno.
  5. Para la fase con cuentas, no usar cookies de sesión accesibles desde el worker. Mejor: tokens que solo conozca el hilo principal, o ejecutar el worker desde un origen aislado (iframe en otro subdominio).
- **Verificación:** QA-B028…B030 y QA-C014…C016 pasan a PASS.

### P1-3 · Validar el esquema al cargar e importar (BUG-007)
- **Propuesta:**
  - Una función `sanitize(data)` que compruebe el tipo de cada campo de primer nivel (objetos, números ≥ 0, `dailyGoal` dentro de {20, 30, 50}…).
  - Al **importar**: rechazar si falla, explicando qué campo es inválido.
  - Al **cargar**: reparar campo a campo con los valores por defecto.
- **Verificación:** QA-B097…B100 pasan a PASS.

### P1-4 · Alinear los contenidos con las actividades (PED-002)
- **Propuesta:**
  - Añadir a la lección un paso breve de «Operaciones con números»: `+ - * /`, que `/` siempre da decimal (`80.0`) y cómo se calcula un porcentaje.
  - Mostrar `str()` en el paso «Texto y números» con un ejemplo ejecutable.
  - Otra opción: mover «Calculadora de rebajas» a la lección 2.2 cuando exista.

### P1-5 · Limitar el XP de repaso (BUG-008)
- **Propuesta:** dar XP solo por el primer repaso de cada concepto al día, o con un tope diario de 15 XP. Las respuestas siguientes cuentan para el dominio, pero no dan XP.
- **Verificación:** QA-B085 pasa a PASS.

## P2 · Usabilidad, accesibilidad y robustez

| ID | Mejora | Bug | Propuesta |
|---|---|---|---|
| P2-1 | Timeout selectivo | BUG-005 | Al vencer el plazo, resolver con timeout solo la petición en curso y **reenviar** las pendientes al nuevo worker |
| P2-2 | Foco en las ventanas modales | BUG-015 | Enfocar el primer control al abrir, atrapar Tab, Esc para cerrar donde proceda, devolver el foco y `inert` en el resto |
| P2-3 | Mapa en móvil | BUG-016 | `.lesson-item { flex-wrap: wrap }`; en móvil, las etiquetas pasan a una segunda línea (`white-space: normal`); texto de desbloqueo más corto |
| P2-4 | Contraste en modo día | BUG-017 | Oscurecer el acento (Esmeralda `#0b7d59`, Atardecer `#b54d05`, Océano `#0b6aa1`, valores orientativos que hay que verificar); usar el tono «hover» en la navegación activa; textos de etiqueta más oscuros (XP `#9a5f00`, éxito `#0b7a4c`…); revisar el final del degradado de Frambuesa y Atardecer. Repetir el script de contraste |
| P2-5 | Planificación en más actividades | PED-003 | Añadir preguntas de plan a «Ticket con IVA» y una versión breve («¿qué cambia y qué se conserva?») a «Intercambia los vasos» |
| P2-6 | Envíos repetidos | BUG-014 | No registrar un fallo si el código es idéntico al del último intento |
| P2-7 | Saltos desde el índice | R-01 | Desactivar en el índice los pasos posteriores a uno con preguntas sin responder |
| P2-8 | Etapa «Mejorar» real | PED (metodología) | Tras un «Correcto, pero mejorable», ofrecer «Mejóralo» (reenviar sin perder el XP) y más heurísticas: números mágicos repetidos, `print` de valores calculados a mano… |
| P2-9 | Indicador de fases | PED (metodología) | Incluir «Razonar» y avanzar por hitos reales: plan completado, primera ejecución, primer análisis |
| P2-10 | Atribución de errores | PED-006 | Etiquetar cada opción incorrecta de predicción con el concepto que revela |

## P3 · Optimizaciones y mejoras menores

| ID | Mejora | Bug |
|---|---|---|
| P3-1 | Contar los identificadores de actividad distintos del día para la misión | BUG-009 |
| P3-2 | Logros basados en eventos específicos: ejecuciones, predicciones y sesiones de repaso completas | BUG-010 |
| P3-3 | Desbloquear varios logros en una sola actualización; un aviso por logro | BUG-013 |
| P3-4 | No contar el eco de `input()` en el límite de salida | BUG-011 |
| P3-5 | `viewportMargin` finito y no llamar a `getValue()` en cada render | BUG-018 |
| P3-6 | Casos aleatorios ocultos además de los visibles | LIM-002 |
| P3-7 | Documentar que la reejecución de `input()` no es fiel con programas que dependen de la hora, o pasar a entrada síncrona con `SharedArrayBuffer` (requiere cabeceras COOP/COEP) | LIM-001 |
| P3-8 | `___` en comentarios: ignorar las marcas dentro de comentarios al detectar huecos | PED-005 |
| P3-9 | Excluir `dayOffset` (herramienta de demo) de la exportación | R-04 |

## Orden de trabajo recomendado
1. P0-2 (barrera de errores y visualizador): es rápido y elimina los bloqueos.
2. P0-4 y P0-3: integridad del progreso y de la validación.
3. P0-1: integridad del motor; la parte más delicada.
4. P1-1 y P1-3; después, el resto de P1.
5. P2 de accesibilidad (P2-2, P2-3, P2-4) junto con la migración a React + TypeScript prevista en la fase completa.
6. Volver a ejecutar `tests/qa/qa.html` y `python -m unittest discover tests/qa` hasta que no quede ningún FAIL ni *expected failure* asociado a P0 o P1.
