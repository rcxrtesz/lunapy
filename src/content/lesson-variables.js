// Lección 2.1 · Variables. Contenido original, alineado con el cap. 2 de
// «Piensa en Python» (Variables y sentencias) y PE1 módulo 2.
//
// Tipos de bloque: p, code (run: ejecutable), diagram, callout, five, more,
// check (pregunta intercalada), classify, trace (visualizador paso a paso).
// Las preguntas con código indican expectOutput / expectError: tests.html
// comprueba con Python real que la respuesta marcada como correcta lo es.

export const LESSON_VARIABLES = {
  id: 'variables',
  moduleId: 'm2',
  code: '2.1',
  title: 'Variables: dar nombre a los datos',
  minutes: 30,
  bonusXp: 25,
  teaser: 'Hoy empiezas con las variables: la base de todo programa. Primero entenderás la idea, después la verás funcionar y, por último, resolverás problemas por tu cuenta.',
  celebration: 'Ya sabes guardar datos, modificarlos, distinguir tipos, pedir información y leer errores.',
  objectives: [
    'Explicar qué es una variable y para qué sirve',
    'Asignar y modificar valores sabiendo en qué orden actúa Python',
    'Distinguir texto (str) de números (int, float)',
    'Mostrar resultados con print() y pedir datos con input()',
    'Reconocer y corregir los errores más habituales',
  ],
  prerequisites: ['Saber qué es un programa y cómo se ejecuta (Módulo 1)'],
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'que-es', title: '¿Por qué necesitamos variables?', concepts: ['asignacion'],
      blocks: [
        { type: 'p', text: 'Piensa en la app de una tienda. Necesita **recordar** cosas: el precio de un producto, el descuento, el nombre de quien compra… y usarlas más tarde para hacer cálculos.' },
        { type: 'p', text: 'Una **variable** es un **nombre** que apunta a un **valor** guardado en la memoria. Imagina una etiqueta: el valor es el objeto y el nombre es la etiqueta que le pegas para poder encontrarlo después.' },
        { type: 'diagram', caption: 'Así se representa el estado de la memoria: cada nombre apunta a su valor.', vars: [{ name: 'precio', value: '25.5', type: 'float' }, { name: 'cliente', value: "'Ana'", type: 'str' }, { name: 'unidades', value: '3', type: 'int' }] },
        {
          type: 'five', items: {
            'Qué es': 'Un nombre asociado a un valor.',
            'Para qué sirve': 'Para guardar datos y reutilizarlos sin escribirlos una y otra vez.',
            'Cómo funciona': 'Con `=` le das un valor a un nombre. Cuando usas el nombre, Python lo sustituye por su valor.',
            'Cuándo usarla': 'Siempre que un dato se use más de una vez, pueda cambiar o merezca un nombre que explique qué es.',
            'Errores típicos': 'Usarla antes de darle valor, escribir mal su nombre o confundir el nombre con un texto.',
          },
        },
        {
          type: 'check', id: 'q-def', concept: 'asignacion', mode: 'choice',
          question: '¿Qué descripción se ajusta mejor a una variable?',
          options: [
            { text: 'Un nombre que apunta a un valor guardado en memoria', correct: true },
            { text: 'Una operación matemática que se recalcula sola', why: 'No: una variable guarda un valor concreto. Si quieres otro, tienes que asignarlo de nuevo (lo verás enseguida).' },
            { text: 'Un tipo especial de texto', why: 'Una variable puede guardar texto, números u otros tipos de datos. El nombre no es el valor.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'asignar', title: 'Asignar: guardar un valor con un nombre', concepts: ['asignacion'],
      blocks: [
        { type: 'code', code: 'edad = 18', caption: 'Se lee: «edad toma el valor 18»' },
        { type: 'p', text: 'El signo `=` en Python **no** significa «es igual a». Significa **asignar**: «calcula lo que hay a la derecha y guárdalo con el nombre de la izquierda».' },
        { type: 'callout', tone: 'tip', title: 'Regla de oro', text: 'Python **siempre** resuelve primero lo que hay a la derecha del `=` y después guarda el resultado en el nombre de la izquierda.' },
        { type: 'p', text: 'Pulsa **Ejecutar** para ver este programa en acción. Puedes modificarlo: cambia el nombre o la edad y vuelve a ejecutarlo.' },
        { type: 'code', run: true, code: 'nombre = "Lucía"\nedad = 18\nprint(nombre)\nprint(edad)' },
        {
          type: 'check', id: 'q-ciudad', concept: 'asignacion', mode: 'text',
          question: 'Predice: ¿qué mostrará este programa?', code: 'ciudad = "Sevilla"\nprint(ciudad)', answer: 'Sevilla',
          explain: '`print(ciudad)` no muestra la palabra «ciudad»: muestra el **valor** al que apunta ese nombre.',
        },
        {
          type: 'more', summary: 'Reglas para elegir nombres de variables',
          items: [
            'Pueden contener letras, números y guion bajo `_`, pero **no pueden empezar por un número**.',
            'No pueden tener espacios: `precio_final`, no `precio final`.',
            'Python distingue mayúsculas: `edad` y `Edad` son variables distintas.',
            'No puedes usar palabras reservadas como `if`, `for`, `class` o `while`.',
            'Por convención se escriben en minúsculas con guiones bajos (estilo *snake_case*).',
            'Lo más importante: elige nombres que expliquen qué guardan. `precio` se entiende; `p` no tanto.',
          ],
        },
        {
          type: 'classify', id: 'q-nombres', concept: 'errores',
          question: '¿Son nombres de variable válidos en Python?',
          items: [
            { text: 'precio_final', valid: true, why: 'Letras y guion bajo: perfecto.' },
            { text: '2edad', valid: false, why: 'No puede empezar por un número.' },
            { text: 'mi edad', valid: false, why: 'No puede contener espacios.' },
            { text: 'Edad', valid: true, why: 'Es válido, pero recuerda que es distinto de edad.' },
            { text: 'class', valid: false, why: 'Es una palabra reservada de Python.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso-a-paso', title: 'Míralo paso a paso', concepts: ['reasignacion'],
      blocks: [
        { type: 'p', text: 'Antes de ejecutar, **predice**. Es la mejor forma de descubrir qué parte entiendes y cuál no.' },
        {
          type: 'check', id: 'q-edad2', concept: 'reasignacion', mode: 'choice',
          question: '¿Qué mostrará este programa?', code: 'edad = 18\nedad = edad + 2\nprint(edad)', expectOutput: '20',
          options: [
            { text: '18', why: 'La línea 2 cambia el valor de edad antes del print.' },
            { text: '20', correct: true },
            { text: 'edad + 2', why: 'print muestra valores. Además, Python ya ha calculado edad + 2 en la línea 2.' },
            { text: 'Un error, porque edad no puede ser igual a edad + 2', why: 'Recuerda: `=` no es una igualdad matemática, es una asignación.' },
          ],
        },
        { type: 'p', text: 'Ahora compruébalo con el **visualizador**: avanza línea a línea y observa el panel **Memoria** y la **Consola**. Lo que ves es la ejecución real del programa en Python.' },
        { type: 'trace', code: 'edad = 18\nedad = edad + 2\nprint(edad)' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Modificar una variable', concepts: ['reasignacion'],
      blocks: [
        { type: 'p', text: 'Si asignas un nuevo valor a una variable que ya existe, el valor anterior **se pierde**: la etiqueta pasa a apuntar al nuevo valor.' },
        { type: 'code', code: 'edad = edad + 2', caption: '① Python lee la derecha: edad vale 18 → 18 + 2 = 20   ② guarda 20 en edad' },
        { type: 'callout', tone: 'warn', title: 'No es una ecuación', text: 'En matemáticas `edad = edad + 2` sería imposible. En Python es una **instrucción**: «calcula edad + 2 y guarda el resultado en edad». Es uno de los patrones más usados en programación.' },
        {
          type: 'check', id: 'q-puntos', concept: 'reasignacion', mode: 'text',
          question: 'Predice el resultado:', code: 'puntos = 5\npuntos = puntos * 3\npuntos = puntos - 1\nprint(puntos)', answer: '14',
          explain: '5 → 5 × 3 = 15 → 15 − 1 = 14. Cada línea parte del valor que dejó la anterior.',
        },
        {
          type: 'check', id: 'q-copia', concept: 'reasignacion', mode: 'choice',
          question: 'Esta es una trampa clásica. ¿Qué mostrará?', code: 'a = 10\nb = a\na = 99\nprint(b)', expectOutput: '10',
          options: [
            { text: '10', correct: true },
            { text: '99', why: '`b = a` copia en b el valor que tenía a **en ese momento** (10). Las variables no quedan «enlazadas»: cambiar a después no cambia b.' },
          ],
        },
        { type: 'p', text: 'Si te ha costado, mira qué ocurre en memoria:' },
        { type: 'trace', code: 'a = 10\nb = a\na = 99\nprint(b)' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'tipos', title: 'Texto y números no son lo mismo', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Cada valor tiene un **tipo**, y el tipo decide qué puedes hacer con él. Los tres primeros que necesitas:' },
        {
          type: 'five', items: {
            'int': 'Números enteros: `18`, `-3`, `2024`.',
            'float': 'Números decimales, con **punto**: `3.5`, `59.99`.',
            'str': 'Texto, entre comillas: `"Hola"`, `\'Ana\'`, `"18"`.',
          },
        },
        { type: 'p', text: 'Puedes preguntarle a Python el tipo de cualquier valor con `type()`:' },
        { type: 'code', run: true, code: 'print(type(18))\nprint(type(3.5))\nprint(type("18"))' },
        { type: 'p', text: 'Las comillas lo cambian todo: `18` es un número; `"18"` es un texto formado por los caracteres 1 y 8. Y el operador `+` se comporta de forma distinta según el tipo:' },
        { type: 'code', run: true, code: 'print(18 + 2)\nprint("18" + "2")' },
        {
          type: 'check', id: 'q-55', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'print("5" + "5")', answer: '55',
          explain: 'Son textos: + los pega (concatena). Resultado: el texto "55".',
        },
        {
          type: 'check', id: 'q-mezcla', concept: 'tipos', mode: 'choice',
          question: '¿Y este?', code: 'print(7 + "3")', expectError: 'TypeError',
          options: [
            { text: '10', why: 'Python no convierte el texto "3" en número por su cuenta.' },
            { text: '73', why: 'Python tampoco convierte el 7 en texto automáticamente.' },
            { text: 'Un error (TypeError)', correct: true },
          ],
          explain: 'Python no adivina: si mezclas texto y números con +, se detiene con un TypeError. Tú decides la conversión: `7 + int("3")` da 10; `str(7) + "3"` da "73".',
        },
        { type: 'p', text: 'Para **unir** un número con un texto, conviértelo antes en texto con `str()`:' },
        { type: 'code', run: true, code: 'edad = 17\nprint("Tengo " + str(edad) + " años")', caption: 'str(17) es el texto "17", que ya se puede unir con otros textos.' },
        { type: 'callout', tone: 'tip', title: 'Las tres conversiones', text: '`int("18")` → número entero 18 · `float("3.5")` → número decimal 3.5 · `str(18)` → texto "18".' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'operaciones', title: 'Operaciones con números', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Python sabe hacer las operaciones de una calculadora: `+` suma, `-` resta, `*` multiplica y `/` divide.' },
        { type: 'code', run: true, code: 'print(10 + 3)\nprint(10 - 3)\nprint(10 * 3)\nprint(10 / 4)\nprint(10 / 2)' },
        { type: 'callout', tone: 'warn', title: 'La división siempre da decimal', text: 'El resultado de `/` es siempre un float, aunque la división sea exacta: `10 / 2` da `5.0`, no `5`. Por eso, al calcular precios verás resultados como `80.0`.' },
        { type: 'p', text: 'Igual que en matemáticas, `*` y `/` se calculan antes que `+` y `-`. Si quieres otro orden, usa paréntesis: `(2 + 3) * 4` da 20.' },
        {
          type: 'check', id: 'q-prioridad', concept: 'tipos', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print(2 + 3 * 4)', expectOutput: '14',
          options: [
            { text: '14', correct: true },
            { text: '20', why: 'Python multiplica antes de sumar: 3 * 4 = 12 y después 2 + 12 = 14. Para obtener 20 harían falta paréntesis: (2 + 3) * 4.' },
          ],
        },
        { type: 'p', text: '**Porcentajes.** Un porcentaje significa «tantos de cada cien». El 20 % de 50 € es 50 × 20 ÷ 100 = 10 €. En Python:' },
        { type: 'code', run: true, code: 'precio = 50\ndescuento = 20\nimporte = precio * descuento / 100\nprint(importe)', caption: 'Prueba a cambiar el precio o el descuento y vuelve a ejecutar.' },
        {
          type: 'check', id: 'q-division', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'print(8 / 2)', answer: '4.0',
          explain: 'Con `/` el resultado siempre es decimal, aunque la división sea exacta.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'print', title: 'Mostrar resultados con print()', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` muestra valores en la consola. Puedes pasarle varios valores separados por **comas**: los muestra en la misma línea, separados por un espacio.' },
        { type: 'code', run: true, code: 'nombre = "Lucía"\nedad = 18\nprint("Hola,", nombre)\nprint(nombre, "tiene", edad, "años")' },
        { type: 'callout', tone: 'tip', title: 'Comas frente a +', text: 'Con comas puedes mezclar texto y números sin convertir nada: `print("Tienes", edad, "años")`. Con `+` todo tiene que ser texto.' },
        {
          type: 'check', id: 'q-comillas', concept: 'print', mode: 'choice',
          question: '¿Qué mostrará?', code: 'edad = 18\nprint("edad")', expectOutput: 'edad',
          options: [
            { text: 'edad', correct: true },
            { text: '18', why: 'Las comillas convierten edad en un texto literal. Para mostrar el valor: `print(edad)`, sin comillas.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'input', title: 'Pedir datos con input()', concepts: ['input', 'tipos'],
      blocks: [
        { type: 'p', text: '`input()` detiene el programa, muestra un mensaje y espera a que el usuario escriba algo y pulse Intro. Devuelve lo que se ha escrito.' },
        { type: 'code', run: true, code: 'nombre = input("¿Cómo te llamas? ")\nprint("Hola,", nombre)', caption: 'Ejecútalo: la consola te pedirá que escribas tu nombre.' },
        { type: 'callout', tone: 'warn', title: 'Importante', text: '`input()` devuelve **siempre texto (str)**, aunque el usuario escriba cifras. Para hacer cálculos tienes que convertirlo con `int()` (enteros) o `float()` (decimales).' },
        { type: 'code', run: true, code: 'edad = input("¿Cuántos años tienes? ")\nprint(type(edad))\nedad = int(edad)\nprint("Dentro de un año tendrás", edad + 1)' },
        { type: 'p', text: 'Lo habitual es convertir en la misma línea: `edad = int(input("Edad: "))`. Python resuelve de dentro hacia fuera: primero `input()`, después `int()`.' },
        {
          type: 'check', id: 'q-input', concept: 'input', mode: 'choice',
          question: 'Si el usuario escribe 20 en `x = input()`, ¿qué guarda x?',
          options: [
            { text: 'El texto "20"', correct: true },
            { text: 'El número 20', why: 'input() siempre devuelve texto. Sería el número 20 si escribieras `x = int(input())`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'Errores habituales (y cómo leerlos)', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'Equivocarse es parte de programar. Lo importante es **leer el error**: Python te dice el **tipo** de error, la **línea** y una pista de la causa. Ejecuta cada ejemplo y lee la explicación.' },
        { type: 'code', run: true, title: 'Usar una variable que no existe', code: 'print(nombre)' },
        { type: 'code', run: true, title: 'Mayúsculas distintas', code: 'Edad = 20\nprint(edad)' },
        { type: 'code', run: true, title: 'Comillas sin cerrar', code: 'print("Hola)' },
        { type: 'code', run: true, title: 'Mezclar texto y números con +', code: 'edad = 17\nprint("Tengo " + edad + " años")' },
        { type: 'code', run: true, title: 'Asignación al revés', code: '18 = edad' },
        { type: 'callout', tone: 'info', title: 'Dos familias de errores', text: 'Un **error de sintaxis** (SyntaxError) impide que el programa empiece: está mal escrito. Un **error de ejecución** (NameError, TypeError…) aparece mientras se ejecuta. Y existe una tercera familia, la más traicionera: el **error de lógica**, cuando el programa funciona pero no hace lo que debería.' },
        {
          type: 'check', id: 'q-error', concept: 'errores', mode: 'choice',
          question: '¿Qué error dará este programa?', code: 'precio = 10\nprint(Precio)', expectError: 'NameError',
          options: [
            { text: 'NameError', correct: true },
            { text: 'SyntaxError', why: 'Está bien escrito: el problema aparece al ejecutar, cuando Python busca un nombre que no existe.' },
            { text: 'Ninguno: muestra 10', why: 'Precio y precio son nombres distintos para Python.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'var-predict' },
    { id: 'a2', activity: 'var-complete' },
    { id: 'a3', activity: 'var-order' },
    { id: 'a4', activity: 'var-fix' },
    { id: 'a5', activity: 'var-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una variable es un nombre que apunta a un valor.',
    '`=` asigna: Python calcula la derecha y lo guarda en el nombre de la izquierda.',
    'Al reasignar, el valor anterior se pierde; `x = x + 1` usa el valor viejo para calcular el nuevo.',
    'Las variables guardan valores, no fórmulas: no se recalculan solas.',
    '`18` (int) y `"18"` (str) son distintos; `input()` siempre devuelve str. Se convierte con `int()`, `float()` y `str()`.',
    'Los operadores `+ - * /` funcionan como en matemáticas; `/` siempre da un decimal (`10 / 2` → `5.0`).',
    'Leer el error (tipo, línea, causa) es el primer paso para corregirlo.',
  ],
};
