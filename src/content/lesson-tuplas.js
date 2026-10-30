// Lección 10.2 · Tuplas. Contenido original, alineado con el cap. 11 de «Piensa en
// Python» (las tuplas son inmutables, asignación de tuplas, tuplas como valores de
// retorno, listas y tuplas, zip, diccionarios y tuplas).

const TOPIC = 'Diccionarios';

export const LESSON_TUPLAS = {
  id: 'tuplas',
  moduleId: 'm10',
  code: '10.2',
  title: 'Tuplas',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Crear tuplas y explicar en qué se diferencian de las listas',
    'Desempaquetar una tupla en varias variables (e intercambiar dos valores)',
    'Reconocer las tuplas en return a, b y en dic.items()',
    'Emparejar dos listas con zip',
    'Ordenar una lista de tuplas por el elemento que quieras',
  ],
  prerequisites: ['Lección 10.1 «Diccionarios»'],
  teaser: 'Ya has usado tuplas sin saberlo: al devolver dos valores y al recorrer items(). Hoy les pones nombre y aprendes sus trucos.',
  celebration: 'Ya conoces las tuplas: datos que viajan juntos y no cambian. Con zip y la ordenación por clave tienes todo listo para el proyecto.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'tupla', title: 'Una lista que no cambia', concepts: ['tuplas'],
      blocks: [
        { type: 'p', text: 'Una **tupla** es una secuencia como una lista, pero **inmutable**: una vez creada, no se puede cambiar. Se escribe con paréntesis (o solo con comas).' },
        { type: 'code', run: true, code: 'punto = (3, 4)\nfecha = 29, 10, 2026   # los paréntesis son opcionales\nprint(punto[0], fecha[-1], len(fecha))\nprint(type(fecha))\nsolo = (5,)            # con un elemento, hace falta la coma\nprint(type(solo))' },
        {
          type: 'five', items: {
            'Lista': 'Para colecciones que crecen o cambian: la cesta de la compra.',
            'Tupla': 'Para datos que van **juntos** y no cambian: unas coordenadas, una fecha, un nombre con su nota.',
          },
        },
        {
          type: 'check', id: 'm10t-inmutable', concept: 'tuplas', mode: 'choice',
          question: '¿Qué ocurre?', code: 'color = (255, 128, 0)\ncolor[0] = 200', expectError: 'TypeError',
          options: [
            { text: 'TypeError: las tuplas no se pueden modificar', correct: true },
            { text: 'color pasa a ser (200, 128, 0)', why: 'Las tuplas son inmutables, como los textos. Para «cambiarla», crea otra: `color = (200,) + color[1:]`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'desempaquetar', title: 'Desempaquetar', concepts: ['tuplas'],
      blocks: [
        { type: 'p', text: 'Puedes repartir los elementos de una tupla entre varias variables en una sola línea. Así funcionaban `return a, b` y `x, y = funcion()` del Módulo 6.' },
        { type: 'code', run: true, code: 'punto = (3, 4)\nx, y = punto\nprint(x, y)\n\na, b = 1, 2\na, b = b, a          # intercambio en una línea\nprint(a, b)' },
        {
          type: 'check', id: 'm10t-swap', concept: 'tuplas', mode: 'text',
          question: 'Predice:', code: 'x, y, z = 1, 2, 3\nx, y, z = z, x, y\nprint(x, y, z)', answer: '3 1 2',
          explain: 'Primero se evalúa la derecha (3, 1, 2) y después se reparte: x = 3, y = 1, z = 2.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'items', title: 'Tuplas por todas partes', concepts: ['tuplas', 'diccionarios'],
      blocks: [
        { type: 'p', text: '`dic.items()` da tuplas (clave, valor), y `enumerate` da tuplas (posición, elemento). Por eso puedes desempaquetarlas en el for:' },
        { type: 'code', run: true, code: 'notas = {"Ana": 8, "Luis": 6}\nprint(list(notas.items()))\nfor nombre, nota in notas.items():\n    print(nombre, nota)' },
        { type: 'p', text: 'Las tuplas pueden ser **claves** de un diccionario (las listas no, porque cambian):' },
        { type: 'code', run: true, code: 'ciudades = {(40.4, -3.7): "Madrid", (41.4, 2.2): "Barcelona"}\nprint(ciudades[(40.4, -3.7)])' },
        {
          type: 'check', id: 'm10t-items', concept: 'tuplas', mode: 'text',
          question: 'Predice:', code: 'd = {"a": 1, "b": 2}\nprint(list(d.items())[1])', answer: "('b', 2)",
          explain: 'items() da las parejas (clave, valor) en orden; la de la posición 1 es ("b", 2).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'zip', title: 'Emparejar con zip', concepts: ['tuplas', 'listas'],
      blocks: [
        { type: 'p', text: '`zip` empareja dos (o más) listas elemento a elemento y da tuplas. Se detiene cuando se acaba la más corta.' },
        { type: 'code', run: true, code: 'nombres = ["Ana", "Luis", "Eva"]\nnotas = [8, 6.5, 9]\nfor nombre, nota in zip(nombres, notas):\n    print(f"{nombre}: {nota}")\n\nprint(dict(zip(nombres, notas)))   # un diccionario en una línea' },
        {
          type: 'check', id: 'm10t-zip', concept: 'tuplas', mode: 'text',
          question: 'Predice:', code: 'print(list(zip([1, 2, 3], "ab")))', answer: "[(1, 'a'), (2, 'b')]",
          explain: 'zip se detiene en la más corta: "ab" tiene dos caracteres.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ordenar', title: 'Ordenar tuplas', concepts: ['tuplas', 'listas'],
      blocks: [
        { type: 'p', text: 'Una lista de tuplas se ordena por el **primer** elemento (y, si empatan, por el segundo…). Para ordenar por otro elemento, pasa a `sorted` una **función clave** que diga qué mirar:' },
        { type: 'code', run: true, code: 'alumnas = [("Eva", 9), ("Ana", 8), ("Luis", 6.5)]\nprint(sorted(alumnas))                 # por nombre\n\ndef nota(par):\n    return par[1]\n\nprint(sorted(alumnas, key=nota))        # por nota\nprint(sorted(alumnas, key=nota, reverse=True)[0])  # la mejor' },
        { type: 'callout', tone: 'info', title: 'key recibe una función', text: 'Se escribe el nombre de la función **sin paréntesis**: `key=nota`. sorted la llama con cada elemento para saber por qué ordenar. También funciona con max y min: `max(alumnas, key=nota)`.' },
        {
          type: 'check', id: 'm10t-key', concept: 'tuplas', mode: 'text',
          question: 'Predice:', code: 'def segundo(t):\n    return t[1]\n\nprint(min([("a", 3), ("b", 1), ("c", 2)], key=segundo))', answer: "('b', 1)",
          explain: 'min compara por el segundo elemento: el menor es 1.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'tup-predict' },
    { id: 'a2', activity: 'tup-complete' },
    { id: 'a3', activity: 'tup-fix' },
    { id: 'a4', activity: 'tup-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una **tupla** es una secuencia inmutable: `(3, 4)`. Con un solo elemento: `(5,)`.',
    'Desempaquetar: `x, y = punto`. Intercambiar: `a, b = b, a`.',
    '`return a, b`, `dic.items()` y `enumerate` producen tuplas.',
    '`zip(lista1, lista2)` empareja elemento a elemento; `dict(zip(...))` crea un diccionario.',
    '`sorted(lista, key=funcion)` ordena por lo que devuelva la función; también sirve en max y min.',
  ],
};

export const ACTIVITIES_TUPLAS = {
  'tup-predict': {
    id: 'tup-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Coordenadas', difficulty: 2, xp: 10, concepts: ['tuplas'],
    prompt: 'Desempaquetado e intercambio con tuplas. **¿Qué mostrará?**',
    code: 'origen = (2, 5)\nx, y = origen\nx, y = y, x + y\nprint(origen, (x, y))',
    expectedOutput: '(2, 5) (5, 7)',
    options: [
      { text: '(2, 5) (5, 7)', correct: true },
      { text: '(5, 7) (5, 7)', concept: 'tuplas', why: 'x e y son variables nuevas: cambiarlas no afecta a la tupla origen (que además es inmutable).' },
      { text: '(2, 5) (5, 10)', concept: 'tuplas', why: 'La derecha se calcula entera antes de asignar: x + y usa el x antiguo (2): 2 + 5 = 7.' },
      { text: '(2, 5) (5, 2)', concept: 'tuplas', why: 'El segundo valor es x + y, no x.' },
    ],
    explain: ['x = 2, y = 5.', 'La derecha vale (5, 2 + 5) = (5, 7), y se reparte entre x e y.', 'origen no ha cambiado.'],
  },
  'tup-complete': {
    id: 'tup-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El boletín', difficulty: 2, xp: 15, concepts: ['tuplas', 'listas'],
    statement: 'Completa `boletin(asignaturas, notas)` para que muestre cada asignatura con su nota, emparejando las dos listas.',
    expected: 'Mates: 8\nLengua: 6.5\nHistoria: 9',
    starter: 'def boletin(asignaturas, notas):\n    for asignatura, nota in ___(asignaturas, ___):\n        print(f"{asignatura}: {nota}")\n\nboletin(["Mates", "Lengua", "Historia"], [8, 6.5, 9])',
    spec: {
      blanks: true,
      functions: [{ name: 'boletin', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Mates: 8', 'Lengua: 6.5', 'Historia: 9'] },
        { label: 'boletin(["Física"], [7])', call: 'boletin(["Física"], [7])', out_lines: ['Física: 7'] },
      ],
      logic_msg: 'Cada asignatura debe aparecer con la nota de su misma posición.',
    },
    hints: [
      { level: 'Orientación', text: 'Una función que empareja listas elemento a elemento y la segunda lista.' },
      { level: 'Razonamiento', text: '¿Qué función da tuplas (asignatura, nota) a partir de dos listas?' },
      { level: 'Pseudocódigo', text: 'para cada pareja (asignatura, nota) de emparejar(asignaturas, notas): mostrar', pre: true },
      { level: 'Ayuda técnica', text: '`zip(asignaturas, notas)`.' },
    ],
    solution: {
      code: 'def boletin(asignaturas, notas):\n    for asignatura, nota in zip(asignaturas, notas):\n        print(f"{asignatura}: {nota}")\n\nboletin(["Mates", "Lengua", "Historia"], [8, 6.5, 9])',
      explanation: 'zip forma tuplas con los elementos de la misma posición, y el for las desempaqueta en dos variables.',
    },
    reference: ['def boletin(asignaturas, notas):\n    for asignatura, nota in zip(asignaturas, notas):\n        print(f"{asignatura}: {nota}")\n\nboletin(["Mates", "Lengua", "Historia"], [8, 6.5, 9])'],
    wrongs: [
      { code: 'def boletin(asignaturas, notas):\n    for asignatura, nota in ___(asignaturas, ___):\n        print(f"{asignatura}: {nota}")', category: 'incompleto' },
      { code: 'def boletin(asignaturas, notas):\n    for asignatura, nota in zip(notas, asignaturas):\n        print(f"{asignatura}: {nota}")\n\nboletin(["Mates", "Lengua", "Historia"], [8, 6.5, 9])', category: 'logica' },
    ],
  },
  'tup-fix': {
    id: 'tup-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Mover el punto', difficulty: 2, xp: 20, concepts: ['tuplas', 'errores'],
    statement: '`mover(punto, dx, dy)` debería devolver un punto **nuevo** desplazado, pero da un **TypeError** porque intenta modificar la tupla. Corrígelo.',
    expected: '(4, 7)\n(1, 2)',
    starter: 'def mover(punto, dx, dy):\n    punto[0] += dx\n    punto[1] += dy\n    return punto\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)',
    spec: {
      allow_short_names: ['p', 'x', 'y'],
      functions: [{ name: 'mover', params: 3 }],
      cases: [
        { label: 'Programa completo', out_lines: ['(4, 7)', '(1, 2)'] },
        { label: 'mover((0, 0), -1, 1)', call: 'print(mover((0, 0), -1, 1))', out_lines: ['(-1, 1)'] },
      ],
      misconceptions: [
        { out_lines: ['[4, 7]', '(1, 2)'], title: 'Devuelve una lista', msg: 'Se pide un punto como tupla: devuelve `(x + dx, y + dy)`, con paréntesis.' },
      ],
      logic_msg: 'mover((1, 2), 3, 5) debe devolver (4, 7) y dejar p igual.',
    },
    hints: [
      { level: 'Orientación', text: 'Las tuplas no se pueden modificar: hay que crear otra.' },
      { level: 'Razonamiento', text: 'Desempaqueta el punto en x e y y devuelve una tupla nueva con los valores desplazados.' },
      { level: 'Pseudocódigo', text: 'x, y ← punto\ndevolver (x + dx, y + dy)', pre: true },
      { level: 'Ayuda técnica', text: '`x, y = punto` y `return (x + dx, y + dy)`.' },
    ],
    solution: {
      code: 'def mover(punto, dx, dy):\n    x, y = punto\n    return (x + dx, y + dy)\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)',
      explanation: 'Como la tupla es inmutable, la función construye una nueva. Ventaja: el punto original nunca cambia por sorpresa.',
    },
    reference: [
      'def mover(punto, dx, dy):\n    x, y = punto\n    return (x + dx, y + dy)\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)',
      'def mover(punto, dx, dy):\n    return (punto[0] + dx, punto[1] + dy)\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)',
    ],
    wrongs: [
      { code: 'def mover(punto, dx, dy):\n    punto[0] += dx\n    punto[1] += dy\n    return punto\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)', category: 'ejecucion' },
      { code: 'def mover(punto, dx, dy):\n    x, y = punto\n    return [x + dx, y + dy]\n\np = (1, 2)\nprint(mover(p, 3, 5))\nprint(p)', category: 'comprension' },
    ],
  },
  'tup-build': {
    id: 'tup-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La mejor de la clase', difficulty: 3, xp: 30, concepts: ['tuplas', 'busqueda'],
    unlock: { any: ['tup-predict', 'tup-complete', 'tup-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Tienes una lista de tuplas `(nombre, nota)`. Define `mejor(alumnas)` que devuelva el **nombre** de quien tiene la nota más alta (si hay empate, la primera de la lista).\n\nEjemplo: `mejor([("Ana", 8), ("Eva", 9.5), ("Luis", 7)])` → "Eva".',
    expected: 'Eva',
    plan: [
      {
        q: '¿Cómo encuentras la tupla con la nota más alta?',
        options: [
          { text: 'max(alumnas, key=una función que devuelva la nota)', correct: true },
          { text: 'max(alumnas)', why: 'Sin key, max compara por el primer elemento: el nombre más «tardío» en el alfabeto.' },
        ],
      },
      {
        q: 'max devuelve la tupla entera. ¿Cómo obtienes el nombre?',
        options: [
          { text: 'Con [0], o desempaquetando: nombre, nota = …', correct: true },
          { text: 'Con [1]', why: 'La posición 1 es la nota.' },
        ],
      },
    ],
    planScaffold: 'def nota(par):\n    # devolver la nota de la pareja\n\n\ndef mejor(alumnas):\n    # max con key y devolver el nombre\n\n\nprint(mejor([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'mejor', params: 1 }],
      cases: [
        { label: 'Por nota, no por nombre', call: 'print(mejor([("Zoe", 4), ("Ana", 10)]))', out_lines: ['Ana'] },
        { label: 'Tres alumnas', call: 'print(mejor([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))', out_lines: ['Eva'] },
        { label: 'Empate', call: 'print(mejor([("Leo", 9), ("Bea", 9)]))', out_lines: ['Leo'] },
        { label: 'Una sola', call: 'print(mejor([("Sol", 5)]))', out_lines: ['Sol'] },
      ],
      misconceptions: [
        { out_lines: ['Zoe'], title: 'Compara por el nombre', msg: 'Sin key, max compara las tuplas por su primer elemento (el nombre). Pasa una función clave que devuelva la nota.' },
        { out_lines: ['10'], title: 'Devuelve la nota', msg: 'Se pide el nombre: es el elemento 0 de la tupla.' },
      ],
      logic_msg: 'Comprueba con [("Zoe", 4), ("Ana", 10)]: la mejor es Ana.',
    },
    hints: [
      { level: 'Orientación', text: 'Una función clave pequeña y una llamada a max.' },
      { level: 'Razonamiento', text: 'Con key, max compara lo que devuelve la función (la nota) pero devuelve el elemento completo (la tupla). Ante un empate, max se queda con el primero.' },
      { level: 'Pseudocódigo', text: 'nota(par): devolver par[1]\nmejor(alumnas): devolver max(alumnas, key=nota)[0]', pre: true },
      { level: 'Ayuda técnica', text: '`return max(alumnas, key=nota)[0]` con `def nota(par): return par[1]`.' },
    ],
    solution: {
      code: 'def nota(par):\n    return par[1]\n\ndef mejor(alumnas):\n    """Devuelve el nombre de la alumna con la nota más alta."""\n    nombre, _ = max(alumnas, key=nota)\n    return nombre\n\nprint(mejor([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))',
      explanation: 'max con key=nota compara las notas y devuelve la tupla ganadora; después se desempaqueta para quedarse con el nombre. El guion bajo `_` indica una variable que no se va a usar.',
    },
    reference: [
      'def nota(par):\n    return par[1]\n\ndef mejor(alumnas):\n    return max(alumnas, key=nota)[0]',
      'def mejor(alumnas):\n    ganadora = alumnas[0]\n    for par in alumnas:\n        if par[1] > ganadora[1]:\n            ganadora = par\n    return ganadora[0]',
    ],
    wrongs: [
      { code: 'def mejor(alumnas):\n    return max(alumnas)[0]', category: 'comprension' },
      { code: 'def nota(par):\n    return par[1]\n\ndef mejor(alumnas):\n    return max(alumnas, key=nota)[1]', category: 'comprension' },
    ],
  },
};
