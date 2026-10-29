// Lección 3.1 · Llamar a funciones. Contenido original, alineado con el cap. 3 de
// «Piensa en Python» (llamadas a funciones, funciones matemáticas, composición) y
// PE1 módulo 4. Aquí solo se USAN funciones; definirlas llega en la 3.2.

const TOPIC = 'Funciones';

export const LESSON_LLAMAR_FUNCIONES = {
  id: 'llamar-funciones',
  moduleId: 'm3',
  code: '3.1',
  title: 'Llamar a funciones',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Reconocer las partes de una llamada: nombre, argumentos y valor devuelto',
    'Distinguir entre devolver un valor y mostrarlo',
    'Combinar llamadas y predecir en qué orden se evalúan',
    'Importar el módulo math y usar sus funciones',
    'Entender los errores típicos al llamar a una función',
  ],
  prerequisites: ['Módulo 2 «Variables, tipos y expresiones»'],
  teaser: 'Empiezas el Módulo 3: hoy descubres qué pasa realmente cuando escribes print(), round() o len(), y amplías tu caja de herramientas con el módulo math.',
  celebration: 'Ya sabes usar funciones como una profesional: qué reciben, qué devuelven y cómo combinarlas. En la próxima lección crearás las tuyas.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'anatomia', title: 'Anatomía de una llamada', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Ya has usado muchas funciones: `print()`, `round()`, `input()`, `int()`… Una **función** es un trozo de código con nombre que hace una tarea. **Llamarla** es pedirle que la haga.' },
        {
          type: 'five', items: {
            'Nombre': 'Qué función quieres usar: `round`.',
            'Argumentos': 'Los datos que le das, entre paréntesis y separados por comas: `round(3.14159, 2)`.',
            'Valor devuelto': 'El resultado que te entrega: `3.14`. La llamada entera «vale» ese resultado.',
          },
        },
        { type: 'p', text: 'Tres funciones nuevas muy útiles: `len()` cuenta los caracteres de un texto, y `max()` y `min()` dan el mayor y el menor de sus argumentos.' },
        { type: 'code', run: true, code: 'print(len("Python"))\nprint(max(4, 9, 2), min(4, 9, 2))\nprint(abs(-7))' },
        {
          type: 'check', id: 'm3a-len', concept: 'funciones', mode: 'text',
          question: 'Predice:', code: 'print(len("hola mundo"))', answer: '10',
          explain: '`len()` cuenta todos los caracteres, también el espacio: 4 + 1 + 5 = 10.',
        },
        {
          type: 'check', id: 'm3a-maxmin', concept: 'funciones', mode: 'text',
          question: 'Predice:', code: 'print(max(3, 8, 5) - min(3, 8, 5))', answer: '5',
          explain: 'Cada llamada se sustituye por su valor: 8 − 3 = 5.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Devolver no es mostrar', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Algunas funciones **devuelven** un valor que puedes guardar y seguir usando, como `round()` o `len()`. Otras **hacen algo** y no devuelven nada útil, como `print()`: muestra en la pantalla y devuelve `None`, el valor especial de Python para «nada».' },
        { type: 'code', run: true, code: 'r = round(2.567, 1)\nprint(r * 2)\nx = print("hola")\nprint(x)' },
        { type: 'callout', tone: 'warn', title: 'Una confusión muy frecuente', text: 'Que algo aparezca en la pantalla no significa que se haya guardado. `round(2.567, 1)` sola, sin `print` ni variable, calcula 2.6… y el resultado se pierde.' },
        {
          type: 'check', id: 'm3a-none', concept: 'funciones', mode: 'choice',
          question: '¿Qué mostrará este programa?', code: 'x = print("hola")\nprint(x)', expectOutput: 'hola\nNone',
          options: [
            { text: 'hola y, en la línea siguiente, None', correct: true },
            { text: 'hola dos veces', why: '`print("hola")` muestra hola, pero lo que **devuelve** (y se guarda en x) es `None`.' },
            { text: 'Solo hola', why: 'La segunda línea muestra el valor de x, que es `None`: lo que devuelve print.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'composicion', title: 'Combinar llamadas', concepts: ['funciones', 'expresiones'],
      blocks: [
        { type: 'p', text: 'Un argumento puede ser cualquier expresión, también otra llamada. Python evalúa **de dentro hacia fuera**: primero la llamada más interna, después la que la contiene.' },
        { type: 'code', run: true, code: 'print(round(abs(-3.14159), 2))\nprint(len(str(2 ** 10)))', caption: '`abs(-3.14159)` → 3.14159 → `round(3.14159, 2)` → 3.14. Y `2 ** 10` es 1024, que como texto tiene 4 caracteres.' },
        { type: 'p', text: 'Mira cómo se evalúa paso a paso, guardando cada resultado intermedio:' },
        { type: 'trace', code: 'numero = -3.14159\npositivo = abs(numero)\nredondeado = round(positivo, 2)\nprint(redondeado)' },
        {
          type: 'check', id: 'm3a-compuesta', concept: 'funciones', mode: 'text',
          question: 'Predice:', code: 'print(len(str(12345)))', answer: '5',
          explain: '`str(12345)` es el texto "12345", que tiene 5 caracteres.',
        },
        {
          type: 'check', id: 'm3a-max-len', concept: 'funciones', mode: 'text',
          question: 'Predice:', code: 'print(max(len("sol"), len("luna")))', answer: '4',
          explain: 'Primero las llamadas internas: 3 y 4. Después `max(3, 4)` → 4.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulos', title: 'Módulos: el ejemplo de math', concepts: ['modulos', 'funciones'],
      blocks: [
        { type: 'p', text: 'Python agrupa funciones relacionadas en **módulos**. Para usar uno, primero lo **importas** con `import`. Después accedes a lo que contiene con un punto: `modulo.funcion()`.' },
        { type: 'code', run: true, code: 'import math\n\nprint(math.sqrt(16))   # raíz cuadrada\nprint(math.pi)         # el número π\nprint(math.floor(3.7)) # redondea hacia abajo\nprint(math.ceil(3.2))  # redondea hacia arriba' },
        { type: 'callout', tone: 'tip', title: 'Importa al principio', text: 'Los `import` se escriben en las primeras líneas del programa. Así cualquiera ve de un vistazo qué herramientas usa.' },
        {
          type: 'check', id: 'm3a-ceil', concept: 'modulos', mode: 'text',
          question: 'Predice:', code: 'import math\nprint(math.ceil(7 / 2))', answer: '4',
          explain: '7 / 2 = 3.5 y `ceil` redondea siempre hacia arriba: 4.',
        },
        {
          type: 'check', id: 'm3a-sin-import', concept: 'modulos', mode: 'choice',
          question: '¿Qué ocurre?', code: 'print(math.sqrt(9))', expectError: 'NameError',
          options: [
            { text: 'NameError: math no existe', correct: true },
            { text: 'Muestra 3.0', why: 'Sin `import math`, Python no sabe qué es `math`.' },
          ],
          explain: 'Antes de usar un módulo hay que importarlo: `import math`.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'Errores al llamar funciones', concepts: ['errores', 'funciones'],
      blocks: [
        { type: 'p', text: 'Cada función espera unos argumentos concretos. Si le das más, menos o del tipo equivocado, se queja con un **TypeError**. Ejecuta y lee:' },
        { type: 'code', run: true, title: 'Argumento de un tipo que no admite', code: 'print(len(2026))' },
        { type: 'code', run: true, title: 'Demasiados argumentos', code: 'print(abs(-3, -4))' },
        { type: 'code', run: true, title: 'Olvidar los paréntesis', code: 'print(len)', caption: 'No da error, pero no llama a la función: muestra la función en sí. Sin paréntesis no hay llamada.' },
        {
          type: 'check', id: 'm3a-typeerror', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'print(len(42))', expectError: 'TypeError',
          options: [
            { text: 'TypeError: un número no tiene longitud', correct: true },
            { text: 'Muestra 2', why: '`len()` cuenta caracteres de un texto; un número no los tiene. `len(str(42))` sí daría 2.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'fun-predict' },
    { id: 'a2', activity: 'fun-complete' },
    { id: 'a3', activity: 'fun-fix' },
    { id: 'a4', activity: 'fun-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una llamada tiene **nombre**, **argumentos** y un **valor devuelto**: `round(3.14159, 2)` vale 3.14.',
    'Devolver no es mostrar: `print()` muestra y devuelve `None`.',
    '`len()` cuenta caracteres; `max()` y `min()` dan el mayor y el menor.',
    'Las llamadas se combinan y se evalúan de dentro hacia fuera.',
    '`import math` da acceso a `math.sqrt`, `math.pi`, `math.floor` y `math.ceil`.',
    'Argumentos de más, de menos o del tipo equivocado producen un TypeError.',
  ],
};

export const ACTIVITIES_LLAMAR_FUNCIONES = {
  'fun-predict': {
    id: 'fun-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Contar letras', difficulty: 1, xp: 10, concepts: ['funciones'],
    prompt: 'Tres funciones trabajan con el mismo dato. **¿Qué mostrará?**',
    code: 'palabra = "programar"\nn = len(palabra)\nprint(n, max(n, 5), round(n / 4))',
    expectedOutput: '9 9 2',
    options: [
      { text: '9 9 2', correct: true },
      { text: '9 5 2', concept: 'funciones', why: '`max()` devuelve el **mayor** de sus argumentos: entre 9 y 5, el 9.' },
      { text: '9 9 2.25', concept: 'funciones', why: '`round()` con un solo argumento redondea al entero más cercano: 9 / 4 = 2.25 → 2.' },
      { text: '8 9 2', concept: 'funciones', why: 'Cuenta otra vez: p-r-o-g-r-a-m-a-r son 9 letras.' },
    ],
    explain: ['`len("programar")` → 9.', '`max(9, 5)` → 9.', '`round(9 / 4)` → `round(2.25)` → 2.'],
  },
  'fun-complete': {
    id: 'fun-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La hipotenusa', difficulty: 2, xp: 15, concepts: ['modulos', 'funciones'],
    statement: 'Por el teorema de Pitágoras, la hipotenusa de un triángulo rectángulo es la **raíz cuadrada** de a² + b². Completa los huecos para calcularla y mostrarla **redondeada a 2 decimales**:',
    expected: 'La hipotenusa mide 5.0',
    starter: 'import math\n\na = 3\nb = 4\nc = math.___(a ** 2 + b ** 2)\nprint("La hipotenusa mide", ___(c, 2))',
    spec: {
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['a', 'b', 'c'], // notación habitual del teorema de Pitágoras
      blanks: true,
      cases: [{ label: 'Catetos 3 y 4', out_lines: ['La hipotenusa mide 5.0'] }],
      variants: [{
        label: 'Catetos 5 y 7', set: { a: 5, b: 7 }, out_lines: ['La hipotenusa mide 8.6'],
        msg: 'Con 3 y 4 sale bien, pero con 5 y 7 no (debería dar 8.6). Calcula con las variables a y b.',
      }],
      misconceptions: [
        { out_lines: ['La hipotenusa mide 25.0'], title: 'Falta la raíz', msg: '25 es a² + b². La hipotenusa es su **raíz cuadrada**: `math.sqrt`.' },
      ],
      logic_msg: 'Compara tu salida con la esperada. ¿Qué función de math calcula la raíz cuadrada? ¿Cuál redondea?',
    },
    hints: [
      { level: 'Orientación', text: 'Dos huecos: una función de `math` que hace raíces cuadradas y una función que redondea.' },
      { level: 'Razonamiento', text: 'La raíz cuadrada en inglés es *square root*. Para redondear a 2 decimales ya conoces una función desde el Módulo 1.' },
      { level: 'Pseudocódigo', text: 'c ← raíz cuadrada de (a² + b²)\nmostrar c redondeado a 2 decimales', pre: true },
      { level: 'Ayuda técnica', text: '`math.sqrt(x)` calcula la raíz cuadrada y `round(x, 2)` redondea a 2 decimales.' },
    ],
    solution: {
      code: 'import math\n\na = 3\nb = 4\nc = math.sqrt(a ** 2 + b ** 2)\nprint("La hipotenusa mide", round(c, 2))',
      explanation: '`math.sqrt(9 + 16)` → `math.sqrt(25)` → 5.0, y `round(5.0, 2)` → 5.0. Con catetos 5 y 7 daría 8.6.',
    },
    reference: ['import math\n\na = 3\nb = 4\nc = math.sqrt(a ** 2 + b ** 2)\nprint("La hipotenusa mide", round(c, 2))'],
    wrongs: [
      { code: 'import math\n\na = 3\nb = 4\nc = math.___(a ** 2 + b ** 2)\nprint("La hipotenusa mide", ___(c, 2))', category: 'incompleto' },
      { code: 'import math\n\na = 3\nb = 4\nc = math.Sqrt(a ** 2 + b ** 2)\nprint("La hipotenusa mide", round(c, 2))', category: 'ejecucion' },
      { code: 'import math\n\na = 3\nb = 4\nc = a ** 2 + b ** 2\nprint("La hipotenusa mide", round(c, 2))', category: 'comprension' },
      { code: 'import math\n\na = 3\nb = 4\nprint("La hipotenusa mide", 5.0)', category: 'logica' },
    ],
  },
  'fun-fix': {
    id: 'fun-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El área del círculo', difficulty: 2, xp: 20, concepts: ['modulos', 'errores'],
    statement: 'Este programa debería mostrar el área de un círculo de radio 5 redondeada a 2 decimales, pero tiene **dos errores**. Ejecútalo, lee cada error y corrígelo.',
    expected: 'Área: 78.54',
    starter: 'radio = 5\narea = math.pi * radio ** 2\nprint("Área:", Round(area, 2))',
    spec: {
      cases: [{ label: 'Radio 5', out_lines: ['Área: 78.54'] }],
      variants: [{
        label: 'Radio 2', set: { radio: 2 }, out_lines: ['Área: 12.57'],
        msg: 'Con radio 5 sale bien, pero con otros radios no: calcula el área a partir de la variable radio.',
      }],
      misconceptions: [
        { out_lines: ['Área: 78.5'], title: 'Revisa π', msg: 'Usa `math.pi` en lugar de escribir 3.14: es mucho más preciso.' },
      ],
      logic_msg: 'La salida no coincide. El área de un círculo es π × radio².',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta el programa: el primer error es un NameError en la línea 2. ¿Qué nombre no conoce Python?' },
      { level: 'Razonamiento', text: 'Para usar `math.pi`, Python tiene que conocer el módulo `math`. ¿Qué línea falta al principio? Después, fíjate en las mayúsculas de la línea 3.' },
      { level: 'Pseudocódigo', text: 'Línea nueva al principio: importar el módulo math\nLínea 3: escribir round en minúsculas', pre: true },
      { level: 'Ayuda técnica', text: '`import math` va en la primera línea. Python distingue mayúsculas: la función es `round`, no `Round`.' },
    ],
    solution: {
      code: 'import math\n\nradio = 5\narea = math.pi * radio ** 2\nprint("Área:", round(area, 2))',
      explanation: 'Sin `import math`, el nombre `math` no existe (NameError). Al importarlo aparece el segundo NameError: `Round` con mayúscula no es ninguna función; la correcta es `round`.',
    },
    reference: [
      'import math\n\nradio = 5\narea = math.pi * radio ** 2\nprint("Área:", round(area, 2))',
      'import math\nradio = 5\nprint("Área:", round(math.pi * radio ** 2, 2))',
    ],
    wrongs: [
      { code: 'radio = 5\narea = math.pi * radio ** 2\nprint("Área:", Round(area, 2))', category: 'ejecucion' },
      { code: 'import math\nradio = 5\narea = math.pi * radio ** 2\nprint("Área:", Round(area, 2))', category: 'ejecucion' },
      { code: 'radio = 5\narea = 3.14 * radio ** 2\nprint("Área:", round(area, 2))', category: 'comprension' },
      { code: 'radio = 5\nprint("Área:", 78.54)', category: 'logica' },
    ],
  },
  'fun-build': {
    id: 'fun-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'La mudanza de libros', difficulty: 3, xp: 30, concepts: ['modulos', 'input', 'descomponer'],
    unlock: { any: ['fun-predict', 'fun-complete', 'fun-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Vas a mudarte y tienes que empaquetar tus libros. Escribe un programa que pida **cuántos libros** tienes y **cuántos caben en cada caja**, y muestre **cuántas cajas necesitas**.\n\nEjemplo: 50 libros, 12 por caja → `5` cajas (4 llenas y una con los 2 que sobran).\n\nMuestra el número de cajas en la **última línea**.',
    plan: [
      {
        q: 'Con 50 libros y 12 por caja, 50 / 12 = 4.17. ¿Cuántas cajas necesitas?',
        options: [
          { text: '5: la caja con los libros que sobran también cuenta', correct: true },
          { text: '4', why: 'Con 4 cajas solo guardas 48 libros: quedarían 2 fuera.' },
          { text: '4.17', why: 'No existen 0.17 cajas: hay que redondear hacia arriba.' },
        ],
      },
      {
        q: '¿Qué función redondea siempre hacia arriba?',
        options: [
          { text: 'math.ceil()', correct: true },
          { text: 'round()', why: '`round()` va al entero **más cercano**: round(4.17) es 4.' },
          { text: 'math.floor()', why: '`floor` redondea hacia **abajo**.' },
          { text: 'int()', why: '`int()` corta los decimales: también daría 4.' },
        ],
      },
    ],
    planScaffold: '# Importar lo que necesites\n\n# Entrada: libros y libros por caja\n\n# Proceso: cajas necesarias (redondeando hacia arriba)\n\n# Salida\n',
    starter: '',
    spec: {
      cases: [
        { label: '50 libros, 12 por caja', stdin: ['50', '12'], args: { l: 50, c: 12 } },
        { label: 'Caso exacto: 48 libros, 12 por caja', stdin: ['48', '12'], args: { l: 48, c: 12 } },
        { label: 'Caso límite: 1 libro, 10 por caja', stdin: ['1', '10'], args: { l: 1, c: 10 } },
      ],
      expect_last_number: '-(-l // c)',
      hidden: { count: 2, args: { l: [1, 500, 0], c: [1, 40, 0] }, stdin: ['l', 'c'] },
      tolerance: 0,
      misconceptions: [
        { expr: 'l // c', title: 'Te quedan libros fuera', msg: 'Con `//` (o `round`, `int` o `floor`) los libros que sobran se quedan sin caja. Redondea hacia **arriba** con `math.ceil()`.' },
        { expr: 'l / c', title: 'No hay cajas a medias', msg: 'El resultado tiene decimales: necesitas un número entero de cajas, redondeado hacia arriba con `math.ceil()`.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir los datos', msg: 'Usa input() para pedir los libros y la capacidad de cada caja.' }],
    },
    hints: [
      { level: 'Orientación', text: 'Dos datos (libros y capacidad) y un resultado (cajas). Recuerda que una caja medio llena también es una caja.' },
      { level: 'Razonamiento', text: 'Divide los libros entre la capacidad. Si sale con decimales, necesitas una caja más: eso es redondear hacia arriba.' },
      { level: 'Pseudocódigo', text: 'libros ← pedir entero\ncapacidad ← pedir entero\ncajas ← libros ÷ capacidad, redondeado hacia arriba\nmostrar cajas', pre: true },
      { level: 'Ayuda técnica', text: '`import math` al principio y `math.ceil(libros / capacidad)` para redondear hacia arriba.' },
    ],
    solution: {
      code: 'import math\n\nlibros = int(input("¿Cuántos libros tienes? "))\ncapacidad = int(input("¿Cuántos caben en una caja? "))\ncajas = math.ceil(libros / capacidad)\nprint("Necesitas", cajas, "cajas")',
      explanation: '`libros / capacidad` da 4.17 y `math.ceil` lo sube a 5. Con 48 libros da exactamente 4.0 y ceil lo deja en 4: no sobra ninguna caja.',
    },
    reference: [
      'import math\nlibros = int(input())\ncapacidad = int(input())\nprint(math.ceil(libros / capacidad))',
      'libros = int(input())\ncapacidad = int(input())\nprint((libros + capacidad - 1) // capacidad)',
    ],
    wrongs: [
      { code: 'libros = int(input())\ncapacidad = int(input())\nprint(libros // capacidad)', category: 'comprension' },
      { code: 'libros = int(input())\ncapacidad = int(input())\nprint(math.ceil(libros / capacidad))', category: 'ejecucion' },
      { code: 'print(5)', category: 'logica' },
    ],
  },
};
