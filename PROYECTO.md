# LunaPy — Documento del proyecto

> Plataforma web interactiva para aprender Python desde cero hasta un nivel intermedio, centrada en el **pensamiento computacional**.
> Estado: **DEMO funcional en revisión**, pendiente de aprobación antes del desarrollo completo.
> Pie de página: «developed by [lunadev](https://lunadev.es)».

---

## 1. Visión

LunaPy no es una web de teoría y ejercicios. Es un entorno donde el estudiante **comprende, razona, experimenta, se equivoca, depura y resuelve problemas por sí mismo**.

Sigue siempre el mismo ciclo:

**Comprender → Razonar → Planificar → Programar → Ejecutar → Analizar → Mejorar**

El objetivo es que el estudiante piense: *«Ahora entiendo por qué funciona. Y creo que puedo resolver el siguiente problema por mí misma».*

### Público
- Estudiantes en un entorno académico con conocimientos iniciales de programación.
- Accesible para principiantes, con una estética y un lenguaje para jóvenes y adultos (nada infantil).
- Todo en **español de España**.

### Prioridades (en este orden)
1. Aprendizaje real y comprensión.
2. Desarrollo del razonamiento lógico.
3. Claridad de las explicaciones.
4. Calidad de los ejercicios.
5. Interactividad funcional.
6. Usabilidad.
7. Calidad visual.
8. Gamificación.
9. Funcionalidades adicionales.

---

## 2. Currículo

La referencia principal es **«Piensa en Python»** ([libropython.es](https://libropython.es/)), versión española de *Think Python* de Allen B. Downey. Se complementa con **Cisco Python Essentials 1 y 2**. Todas las explicaciones y ejercicios son originales.

| Módulo | Contenido | Capítulos del libro | Cisco |
|---|---|---|---|
| 1 | Pensamiento computacional y Python | Cap. 1 Bienvenida | PE1 M1 |
| 2 | Variables, tipos, expresiones y operadores | Cap. 2 Variables y sentencias | PE1 M2 |
| 3 | Funciones, parámetros y argumentos | Cap. 3 Funciones | PE1 M4 |
| 4 | Funciones, interfaces y organización | Cap. 4 Funciones e interfaces | PE1 M4 |
| 5 | Condicionales, lógica booleana y recursión | Cap. 5 Condicionales y recursión | PE1 M3 |
| 6 | Valores de retorno y composición | Cap. 6 Valores de retorno | PE1 M4 |
| 7 | Bucles, iteración y búsqueda | Cap. 7 Iteración y búsqueda | PE1 M3 |
| 8 | Cadenas de texto | Cap. 8 Cadenas y expresiones regulares | PE2 M2 |
| 9 | Listas | Cap. 9 Listas | PE1 M3 |
| 10 | Diccionarios y tuplas | Cap. 10, 11 y 12 (proyecto de análisis de texto) | PE1 M4 |
| 11 | Archivos y tratamiento de datos | Cap. 13 Archivos y bases de datos | PE2 M4 |
| 12 | Clases, objetos y POO | Cap. 14, 15, 16 y 17 | PE2 M3 |
| 13 | Depuración, buenas prácticas y proyectos | Cap. 18, 19 y secciones de depuración | PE1/PE2 |

Cada módulo tendrá:
- Objetivos y prerrequisitos.
- Lecciones breves con ejemplos visuales.
- Actividades de comprensión, ejercicios de programación y retos de razonamiento.
- Evaluación práctica y repaso de errores habituales.
- Proyecto integrador cuando corresponda.

---

## 3. Funcionalidades de la demo

### Pantallas
| Pantalla | Qué hace |
|---|---|
| **Bienvenida** | Nombre (opcional), objetivo diario y explicación del método. |
| **Inicio** | Saludo, progreso de la lección, botón «Continuar aprendiendo», racha, XP y nivel, objetivo diario, 3 misiones diarias, objetivo semanal con gráfica de 7 días, próximos repasos, puntos débiles y accesos rápidos. |
| **Mapa** | Los 13 módulos con su correspondencia con el libro, objetivos, prerrequisitos y estado (en curso, pendiente o bloqueado). |
| **Lección 2.1 «Variables»** | 8 pasos de teoría y 5 actividades, con índice lateral, barra de progreso y resumen final. |
| **Laboratorio** | Editor con Python real, consola con `input()`, ejemplos, modo paso a paso y chuleta rápida. Guarda el código automáticamente. |
| **Desafíos** | Retos filtrables por dificultad que se desbloquean por dominio demostrado. |
| **Repaso** | Sesiones de 5 preguntas elegidas por repetición espaciada. |
| **Mi progreso** | Dominio por concepto, puntos débiles, tipos de error, actividad de 14 días, historial, logros y herramientas de la demo. |
| **Perfil** | Nombre, objetivo diario, apariencia, área de cuenta («Próximamente»), exportar e importar una copia del progreso, y reinicio. |

### Lección de variables
- Qué es una variable, cómo se asigna, cómo se modifica, texto frente a números, `print()`, `input()` y errores habituales.
- Cada concepto responde a: **qué es, para qué sirve, cómo funciona, cuándo usarlo y qué errores suelen cometerse**.
- Incluye preguntas de predicción intercaladas, código editable y ejecutable, diagramas de memoria, desplegables «para saber más» y una actividad de clasificar nombres válidos.
- Para avanzar hay que responder las preguntas de cada paso. Para completar la lección hay que **superar las 5 actividades**; leer la teoría no basta.

### Las 5 actividades
1. **Predice el resultado:** cada opción incorrecta explica la idea errónea que la origina. Después se comprueba con Python real y con el visualizador.
2. **Completa el código:** detecta si el programa acierta solo por casualidad, cambiando la edad inicial y comprobando que el resultado se recalcula.
3. **Ordena los pasos:** primero el plan en lenguaje natural y después el código. Se valida por dependencias, así que se aceptan varios órdenes correctos, y se puede probar un orden incorrecto para ver el `NameError` real.
4. **Detecta el error:** tiene dos fallos encadenados (`TypeError` y `NameError`) y rechaza la trampa de escribir el texto a mano.
5. **Construye desde cero:** empieza con una planificación guiada que se convierte en comentarios dentro del editor. Se valida con 4 casos de prueba, incluidos casos límite (0 %, 100 % y precios con decimales).

Desafíos extra: «Intercambia los vasos», «¿Qué hace este programa?» (explicar código) y «Ticket con IVA».

### Sistema de ayuda (determinista, sin IA)
| Nivel | Contenido |
|---|---|
| 1 · Orientación | Ayuda a interpretar el enunciado. |
| 2 · Razonamiento | Cómo dividir el problema. |
| 3 · Pseudocódigo | La solución expresada en pasos. |
| 4 · Ayuda técnica | Sintaxis relevante y explicación del último error concreto. |
| 5 · Solución explicada | Pide confirmación si quedan pistas por usar. |

Clasificación de cada intento: **sintaxis**, **ejecución**, **lógica**, **comprensión del enunciado**, **planificación**, **concepto por afianzar** o **correcto pero mejorable** (nombres poco descriptivos, variables que no se usan…).

### Gamificación
- XP por actividad, con un 10 % menos por cada pista a partir de la segunda, un 30 % si se ve la solución y +5 si se resuelve a la primera sin ayuda.
- Niveles, rachas, objetivo diario, 3 misiones diarias, objetivo semanal y 9 logros con avisos discretos.
- Repetir una actividad no da XP de nuevo, pero cuenta para el repaso. **Los errores no restan puntos.**

### Repetición espaciada
- Cajas de Leitner del 0 al 5, con repasos a 1, 2, 4, 8 y 16 días.
- En un mismo día un concepto solo puede llegar a la caja 2: para **dominarlo** hay que recordarlo días después.
- Estados: **Aprendido**, **Practicado**, **Dominado** y **Necesita repaso**.
- El algoritmo se explica en la propia interfaz y no se presenta como IA.

### Apariencia
- **7 paletas:** Índigo (por defecto), Océano, Esmeralda, Violeta, Frambuesa, Atardecer y Grafito.
- Cada paleta tiene versión de **día** y de **noche**, y se puede elegir **Sistema** para seguir al dispositivo.
- Botón rápido de día/noche en la barra superior.
- Logo: luna creciente con estrella ámbar.
- Tipografías: Inter y JetBrains Mono.
- Diseño adaptable a escritorio y móvil (barra inferior en móvil), con navegación por teclado y estados de foco.

---

## 4. Arquitectura técnica

### Decisiones
| Pieza | Elección | Motivo |
|---|---|---|
| Interfaz | Preact + htm en módulos ES nativos, sin compilación | El equipo de desarrollo no tenía Node; la demo funciona con solo `python serve.py`. Los componentes son de estilo React, así que la migración a React + TypeScript + Vite es directa. |
| Editor | CodeMirror 5 | Resaltado, sangría automática, números de línea y atajos (`Ctrl+Intro`, `Tab`, `Esc`). |
| Ejecución | Pyodide 0.27.7 (Python 3.12) en un **Web Worker** | Python real, aislado de la página. Límite de tiempo de 5 s (se reinicia el worker), límite de salida de 20 000 caracteres y módulos `js`/`pyodide` bloqueados. |
| `input()` | Reejecución determinista | Al pedir un dato, se vuelve a ejecutar el programa con todas las respuestas (misma semilla aleatoria). No requiere cabeceras especiales del servidor. |
| Paso a paso | `sys.settrace` | Cada paso es el estado real justo antes de cada línea (máximo 400 pasos). |
| Validación | Motor propio en Python | Casos de prueba y casos límite, variantes anti-trampa, reglas sobre el árbol sintáctico y detección de malentendidos frecuentes. Acepta implementaciones distintas y no compara texto con una solución modelo. |
| Contenido | Datos estructurados | Lecciones, actividades, pistas y repasos están separados de los componentes visuales. |
| Persistencia | `localStorage` (clave `lunapy.v1`) | Migra automáticamente el progreso guardado con el nombre anterior (`pyensa.v1`). |

### Estructura de archivos
```
index.html            Página principal (aplica tema y paleta antes de pintar)
serve.py              Servidor local
tests.html            Tests de ejercicios con Python real en el navegador
tests/test_runtime.py Tests del motor con CPython
src/
  main.js             Aplicación, navegación, bienvenida, apariencia y pie
  styles.css          Sistema visual y paletas
  lib/                ui.js (Preact+htm), icons.js, highlight.js
  engine/             runtime.py (ejecución, errores en español, traza, validación)
                      worker.js · python.js (tiempos límite e input)
  content/            curriculum.js · lesson-variables.js · activities.js · review.js
  state/              store.js (progreso, XP, rachas, repaso espaciado)
                      gamification.js (logros, misiones, desbloqueos) · palettes.js
  components/         code.js · tracer.js · questions.js · hints.js
                      activities.js · appearance.js · common.js
  views/              dashboard · map · lesson · lab · challenges · review · progress · profile
```

### Cómo ejecutarlo
```bash
python serve.py
```
Abre `http://localhost:5173/`. La primera carga descarga Pyodide (unos 10 MB); después queda en caché.

```bash
python -m unittest discover tests
```
Tests del motor. Los tests con Python real están en `http://localhost:5173/tests.html`.

### Pruebas realizadas
- **20/20** tests del motor con CPython: ejecución, `input()`, errores en español, traza y validación.
- **52/52** tests en el navegador con Pyodide:
  - Cada ejercicio acepta varias soluciones correctas y rechaza las erróneas con la categoría correcta.
  - Las respuestas de todas las preguntas coinciden con la salida real de Python.
  - Un bucle infinito se detiene y el motor se recupera.
- Recorrido completo de la lección en el navegador. Persistencia tras recargar, repaso tras simular un día y ausencia de desbordamiento horizontal en móvil comprobados en todas las pantallas. Sin errores en consola.

---

## 5. Historial de revisiones

### Demo inicial
- Inicio, mapa, lección de variables, 5 actividades, laboratorio, pistas, progreso persistente, gamificación y diseño adaptable.

### Revisión 1 (comentarios de la clienta)
- ✅ Pie «developed by lunadev» con enlace a lunadev.es.
- ✅ Paletas de color personalizables, cada una con día y noche. Índigo se mantiene por defecto.
- ✅ Botón día/noche corregido: el icono y la página se desincronizaban; ahora ambos leen el mismo estado.
- ✅ El proyecto pasa a llamarse **LunaPy**, conservando el progreso guardado.
- ✅ Logo con luna creciente (elegido frente a la alternativa con la inicial «L»). Se trabajará más adelante.
- ✅ Nueva sección **Perfil**, preparada para el futuro inicio de sesión.
- Sin cambios: tipografías, claridad de las explicaciones y dificultad de las actividades (valoradas positivamente).

---

## 6. Pendiente

### Fuera del alcance de la demo
- Contenido de los módulos 7–13. (Terminados: módulos 1 a 6, con tres lecciones cada uno.)
- Tutoría con IA: ahora las pistas y el análisis son deterministas.
- Cuentas de usuario y sincronización entre dispositivos.
- Diseño definitivo del logo.

### Próximo paso tras aprobar la demo: base de datos y cuentas
Requisito: **registro e inicio de sesión por correo electrónico**, con el progreso guardado en la nube.

Opciones a estudiar:

| Opción | Cómo sería | Ventajas | A tener en cuenta |
|---|---|---|---|
| **Dinahosting** (hosting ya contratado) | Base de datos MySQL/MariaDB y una API en PHP en el propio hosting; correo del hosting para verificación y recuperación de contraseña | Datos en tu propio alojamiento, sin coste adicional | Hay que programar la autenticación y la seguridad. **Pendiente de confirmar qué incluye el plan** (PHP, versión, MySQL, Node.js). |
| **Servicio gestionado** (por ejemplo, Supabase) | Base de datos y autenticación por correo ya preparadas | Más rápido y con la seguridad resuelta | Los datos quedan fuera de tu hosting; dependencia de un tercero. |

Principio en cualquier caso: el navegador **nunca** se conecta directamente a la base de datos; siempre hay una API intermedia. El acceso al progreso está centralizado en `src/state/store.js`, así que la sincronización se añadirá ahí sin rehacer las pantallas.

### Hoja de ruta propuesta (a concretar tras aprobar la demo)
1. **Aprobación de la demo.**
2. **Estudio de infraestructura:** revisar el plan de Dinahosting, decidir dónde va la base de datos y la API, y diseñar las tablas (usuarios, progreso, intentos, repasos).
3. **Migración técnica:** pasar a React + TypeScript + Vite y ampliar los tests automáticos.
4. **Cuentas y nube:** registro, verificación de correo, inicio de sesión, recuperación de contraseña, sincronización del progreso e importación del progreso local.
5. **Contenido:** módulos 1 a 13 en orden, cada uno revisado antes de pasar al siguiente.
6. **Publicación:** despliegue en el hosting elegido, con pruebas en escritorio y móvil.

---

*Documento generado el 28 de octubre de 2026.*
