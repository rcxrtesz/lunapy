// Lección 7.1 · Bucles for. Contenido original, alineado con el cap. 7 de «Piensa
// en Python» (iteración) y PE1 módulo 3 (for y range). Las listas llegan en el
// Módulo 9: aquí se recorre range() y los caracteres de un texto.

const TOPIC = 'Bucles';

export const LESSON_FOR = {
  id: 'bucle-for',
  moduleId: 'm7',
  code: '7.1',
  title: 'Bucles for',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Repetir un bloque un número fijo de veces con for y range()',
    'Usar range con inicio, fin y paso, y evitar el error del «uno de más»',
    'Acumular resultados (sumas, productos) y contar dentro de un bucle',
    'Recorrer los caracteres de un texto',
  ],
  prerequisites: ['Módulo 6 (recomendado)', 'Lección 5.3 «Recursión»'],
  teaser: 'Empiezas el Módulo 7: con un bucle, una sola línea puede repetir algo diez, mil o un millón de veces.',
  celebration: 'Ya repites con for: recorres rangos y textos, acumulas sumas y cuentas lo que necesitas.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'repetir', title: 'Repetir sin copiar', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: 'Con la recursión ya sabías repetir, pero hay una forma más directa: el **bucle for**. Ejecuta su bloque una vez por cada valor de una secuencia.' },
        { type: 'code', run: true, code: 'for i in range(3):\n    print("Vuelta", i)\nprint("Fin")' },
        {
          type: 'five', items: {
            'for i in': 'En cada vuelta, la variable `i` toma el siguiente valor.',
            'range(3)': 'La secuencia 0, 1, 2: **3 valores, empezando en 0**.',
            'Bloque sangrado': 'Lo que se repite. La línea sin sangría se ejecuta una vez, al terminar.',
          },
        },
        { type: 'p', text: 'Avanza paso a paso y observa cómo cambia `i`:' },
        { type: 'trace', code: 'for i in range(3):\n    cuadrado = i * i\n    print(i, cuadrado)' },
        {
          type: 'check', id: 'm7f-vueltas', concept: 'bucles', mode: 'choice',
          question: '¿Qué mostrará?', code: 'for i in range(4):\n    print(i, end=" ")', expectOutput: '0 1 2 3',
          options: [
            { text: '0 1 2 3', correct: true },
            { text: '1 2 3 4', why: 'range empieza en 0 si no le dices otra cosa.' },
            { text: '0 1 2 3 4', why: 'range(4) da 4 valores: del 0 al 3. El 4 no se incluye.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'range', title: 'range a fondo', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`range` admite hasta tres argumentos: **inicio** (incluido), **fin** (excluido) y **paso**.' },
        { type: 'code', run: true, code: 'for n in range(1, 6):\n    print(n, end=" ")\nprint()\nfor n in range(0, 20, 5):\n    print(n, end=" ")\nprint()\nfor n in range(10, 0, -3):\n    print(n, end=" ")' },
        { type: 'callout', tone: 'warn', title: 'El error del «uno de más»', text: 'Para contar del 1 al 10 hace falta `range(1, 11)`: el fin nunca se incluye. Confundirse en uno es tan frecuente que tiene nombre en inglés: *off-by-one*.' },
        {
          type: 'check', id: 'm7f-range', concept: 'bucles', mode: 'text',
          question: 'Predice (en una línea):', code: 'for n in range(2, 11, 3):\n    print(n, end=" ")', answer: '2 5 8',
          explain: 'Empieza en 2 y suma 3: 2, 5, 8. El siguiente sería 11, que ya no se incluye.',
        },
        {
          type: 'check', id: 'm7f-uno-mas', concept: 'bucles', mode: 'choice',
          question: '¿Qué range da los números del 1 al 100, ambos incluidos?',
          options: [
            { text: 'range(1, 101)', correct: true },
            { text: 'range(1, 100)', why: 'El fin no se incluye: terminaría en 99.' },
            { text: 'range(100)', why: 'Daría del 0 al 99.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'acumular', title: 'Acumular y contar', concepts: ['bucles', 'reasignacion'],
      blocks: [
        { type: 'p', text: 'El patrón más útil con bucles es el **acumulador**: una variable que empieza en un valor neutro **antes** del bucle y se actualiza **en cada vuelta**.' },
        { type: 'code', run: true, code: 'total = 0                 # 1. antes del bucle\nfor n in range(1, 11):\n    total += n            # 2. en cada vuelta\nprint("Suma del 1 al 10:", total)   # 3. después' },
        { type: 'p', text: 'Un **contador** es un acumulador que suma 1 cuando se cumple algo:' },
        { type: 'code', run: true, code: 'multiplos = 0\nfor n in range(1, 31):\n    if n % 7 == 0:\n        multiplos += 1\nprint("Múltiplos de 7 hasta 30:", multiplos)' },
        { type: 'callout', tone: 'warn', title: 'Inicializa fuera del bucle', text: 'Si escribes `total = 0` **dentro** del bucle, se pone a cero en cada vuelta y al final solo quedará el último valor.' },
        {
          type: 'check', id: 'm7f-producto', concept: 'bucles', mode: 'text',
          question: 'Predice:', code: 'producto = 1\nfor n in range(1, 5):\n    producto *= n\nprint(producto)', answer: '24',
          explain: '1 × 1 × 2 × 3 × 4 = 24. Para multiplicar, el valor neutro inicial es 1, no 0.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'textos', title: 'Recorrer un texto', concepts: ['bucles', 'tipos'],
      blocks: [
        { type: 'p', text: '`for` también recorre los caracteres de un texto, uno por vuelta:' },
        { type: 'code', run: true, code: 'for letra in "Luna":\n    print(letra)\n\nespacios = 0\nfor caracter in "Hola mundo de Python":\n    if caracter == " ":\n        espacios += 1\nprint("Espacios:", espacios)' },
        {
          type: 'check', id: 'm7f-texto', concept: 'bucles', mode: 'text',
          question: 'Predice:', code: 'cuenta = 0\nfor c in "banana":\n    if c == "a":\n        cuenta += 1\nprint(cuenta)', answer: '3',
          explain: 'Hay tres letras «a» en «banana».',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'for-predict' },
    { id: 'a2', activity: 'for-complete' },
    { id: 'a3', activity: 'for-fix' },
    { id: 'a4', activity: 'for-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`for variable in secuencia:` repite el bloque sangrado una vez por cada valor.',
    '`range(fin)`, `range(inicio, fin)` y `range(inicio, fin, paso)`: el inicio se incluye, el fin **no**.',
    'Del 1 al 10 es `range(1, 11)`: cuidado con el error del «uno de más».',
    '**Acumulador**: se inicializa antes del bucle (0 para sumar, 1 para multiplicar) y se actualiza en cada vuelta.',
    '**Contador**: suma 1 cuando se cumple una condición.',
    '`for letra in texto:` recorre los caracteres de un texto.',
  ],
};

export const ACTIVITIES_FOR = {
  'for-predict': {
    id: 'for-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La hucha', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'Cada semana metes en la hucha el número de la semana en euros. **¿Qué mostrará?**',
    code: 'hucha = 0\nfor semana in range(1, 5):\n    hucha += semana\n    print(semana, hucha)',
    expectedOutput: '1 1\n2 3\n3 6\n4 10',
    options: [
      { text: '1 1 / 2 3 / 3 6 / 4 10 (una línea por semana)', correct: true },
      { text: '1 1 / 2 3 / 3 6 / 4 10 / 5 15', concept: 'bucles', why: 'range(1, 5) termina en 4: el 5 no se incluye.' },
      { text: '0 0 / 1 1 / 2 3 / 3 6', concept: 'bucles', why: 'El range empieza en 1, no en 0.' },
      { text: 'Solo 4 10', concept: 'bucles', why: 'El print está dentro del bucle (tiene sangría): se ejecuta en cada vuelta.' },
    ],
    explain: ['Semana 1: hucha = 1.', 'Semana 2: 1 + 2 = 3.', 'Semana 3: 3 + 3 = 6.', 'Semana 4: 6 + 4 = 10.'],
  },
  'for-complete': {
    id: 'for-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La tabla de multiplicar', difficulty: 1, xp: 15, concepts: ['bucles'],
    statement: 'Completa la función para que muestre la tabla de multiplicar de `n`, **del 1 al 10**:',
    expected: '7 x 1 = 7\n7 x 2 = 14\n…\n7 x 10 = 70',
    starter: 'def tabla(n):\n    for i in range(___, ___):\n        print(n, "x", i, "=", ___)\n\ntabla(7)',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'tabla', params: 1 }],
      cases: [
        { label: 'tabla(7)', call: 'tabla(7)', out_lines: ['7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35', '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63', '7 x 10 = 70'] },
        { label: 'tabla(3)', call: 'tabla(3)', out_lines: ['3 x 1 = 3', '3 x 2 = 6', '3 x 3 = 9', '3 x 4 = 12', '3 x 5 = 15', '3 x 6 = 18', '3 x 7 = 21', '3 x 8 = 24', '3 x 9 = 27', '3 x 10 = 30'] },
      ],
      misconceptions: [
        { out_lines: ['7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35', '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63'], title: 'Falta el 10', msg: 'El fin de range no se incluye: para llegar hasta el 10, el fin tiene que ser 11.' },
      ],
      logic_msg: 'La tabla debe ir del 1 al 10. ¿Empieza y termina el range donde toca?',
    },
    hints: [
      { level: 'Orientación', text: 'Los dos primeros huecos son el inicio y el fin del range; el tercero, el resultado de la multiplicación.' },
      { level: 'Razonamiento', text: 'Quieres i = 1, 2, …, 10. Recuerda que el fin de range no se incluye.' },
      { level: 'Pseudocódigo', text: 'para i desde 1 hasta 10:\n    mostrar n x i = n × i', pre: true },
      { level: 'Ayuda técnica', text: '`range(1, 11)` y `n * i`.' },
    ],
    solution: {
      code: 'def tabla(n):\n    for i in range(1, 11):\n        print(n, "x", i, "=", n * i)\n\ntabla(7)',
      explanation: '`range(1, 11)` da del 1 al 10. En cada vuelta, i cambia y la misma línea muestra una fila distinta de la tabla.',
    },
    reference: ['def tabla(n):\n    for i in range(1, 11):\n        print(n, "x", i, "=", n * i)\n\ntabla(7)'],
    wrongs: [
      { code: 'def tabla(n):\n    for i in range(___, ___):\n        print(n, "x", i, "=", ___)', category: 'incompleto' },
      { code: 'def tabla(n):\n    for i in range(1, 10):\n        print(n, "x", i, "=", n * i)\n\ntabla(7)', category: 'comprension' },
      { code: 'def tabla(n):\n    for i in range(10):\n        print(n, "x", i, "=", n * i)\n\ntabla(7)', category: 'logica' },
    ],
  },
  'for-fix': {
    id: 'for-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La suma que se olvida', difficulty: 2, xp: 20, concepts: ['bucles', 'errores'],
    statement: '`suma_hasta(n)` debería devolver 1 + 2 + … + n, pero devuelve siempre el último número. **No hay error de Python**: el fallo está en dónde se inicializa el acumulador. Corrígelo.',
    expected: '15\n55',
    starter: 'def suma_hasta(n):\n    for i in range(1, n + 1):\n        total = 0\n        total += i\n    return total\n\nprint(suma_hasta(5))\nprint(suma_hasta(10))',
    spec: {
      functions: [{ name: 'suma_hasta', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['15', '55'] },
        { label: 'suma_hasta(1)', call: 'print(suma_hasta(1))', out_lines: ['1'] },
        { label: 'suma_hasta(100)', call: 'print(suma_hasta(100))', out_lines: ['5050'] },
      ],
      misconceptions: [
        { out_lines: ['5', '10'], title: 'El acumulador se reinicia', msg: '`total = 0` está dentro del bucle: se pone a cero en cada vuelta. Muévelo antes del for.' },
      ],
      logic_msg: 'Comprueba a mano: 1 + 2 + 3 + 4 + 5 = 15.',
    },
    hints: [
      { level: 'Orientación', text: 'Sigue el bucle con n = 3: ¿cuánto vale total al empezar cada vuelta?' },
      { level: 'Razonamiento', text: 'Un acumulador se inicializa **una vez**, antes del bucle. ¿Dónde está aquí?' },
      { level: 'Pseudocódigo', text: 'total ← 0\npara i desde 1 hasta n:\n    total ← total + i\ndevolver total', pre: true },
      { level: 'Ayuda técnica', text: 'Mueve `total = 0` justo debajo del `def`, con 4 espacios de sangría (fuera del for).' },
    ],
    solution: {
      code: 'def suma_hasta(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(suma_hasta(5))\nprint(suma_hasta(10))',
      explanation: 'Con `total = 0` antes del bucle, el valor se conserva de una vuelta a otra y va acumulando la suma.',
    },
    reference: ['def suma_hasta(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(suma_hasta(5))\nprint(suma_hasta(10))'],
    wrongs: [
      { code: 'def suma_hasta(n):\n    for i in range(1, n + 1):\n        total = 0\n        total += i\n    return total\n\nprint(suma_hasta(5))\nprint(suma_hasta(10))', category: 'comprension' },
      { code: 'def suma_hasta(n):\n    total = 0\n    for i in range(1, n):\n        total += i\n    return total\n\nprint(suma_hasta(5))\nprint(suma_hasta(10))', category: 'logica' },
    ],
  },
  'for-build': {
    id: 'for-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Factorial con bucle', difficulty: 3, xp: 30, concepts: ['bucles', 'retorno'],
    unlock: { any: ['for-predict', 'for-complete', 'for-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'En la lección 5.3 calculaste el factorial con recursión. Ahora hazlo con un **bucle for**: define `factorial(n)` que devuelva 1 × 2 × … × n (y 1 si n es 0).\n\nEjemplos: `factorial(5)` → 120; `factorial(0)` → 1.',
    expected: '120',
    plan: [
      {
        q: '¿Con qué valor empieza el acumulador?',
        options: [
          { text: '1', correct: true },
          { text: '0', why: 'Cualquier número multiplicado por 0 da 0: el resultado sería siempre 0.' },
        ],
      },
      {
        q: '¿Qué range recorre del 1 al n?',
        options: [
          { text: 'range(1, n + 1)', correct: true },
          { text: 'range(n)', why: 'Empezaría en 0 (y multiplicar por 0 lo estropea todo) y terminaría en n − 1.' },
        ],
      },
    ],
    planScaffold: 'def factorial(n):\n    # acumulador\n    # bucle del 1 al n\n    # devolver el resultado\n\n\nprint(factorial(5))\n',
    starter: '',
    spec: {
      functions: [{ name: 'factorial', params: 1 }],
      cases: [
        { label: 'factorial(5)', call: 'print(factorial(5))', out_lines: ['120'] },
        { label: 'factorial(0)', call: 'print(factorial(0))', out_lines: ['1'] },
        { label: 'factorial(1)', call: 'print(factorial(1))', out_lines: ['1'] },
        { label: 'factorial(10)', call: 'print(factorial(10))', out_lines: ['3628800'] },
      ],
      misconceptions: [
        { out_lines: ['0'], title: 'El acumulador empieza en 0', msg: 'Para multiplicar, el acumulador empieza en 1: todo lo multiplicado por 0 da 0.' },
        { out_lines: ['24'], title: 'Falta multiplicar por n', msg: 'El range no llega hasta n: usa `range(1, n + 1)`.' },
      ],
      rules: [{ type: 'must_call', name: 'range', title: 'Usa un bucle for', msg: 'Esta vez, resuélvelo con un bucle for y range().' }],
      logic_msg: 'Comprueba a mano: 1 × 2 × 3 × 4 × 5 = 120.',
    },
    hints: [
      { level: 'Orientación', text: 'Un acumulador que multiplica, un for del 1 al n y un return al final.' },
      { level: 'Razonamiento', text: '¿Qué valor neutro tiene la multiplicación? ¿Qué range da 1, 2, …, n?' },
      { level: 'Pseudocódigo', text: 'resultado ← 1\npara i desde 1 hasta n:\n    resultado ← resultado × i\ndevolver resultado', pre: true },
      { level: 'Ayuda técnica', text: '`resultado = 1`, `for i in range(1, n + 1):`, `resultado *= i` y `return resultado`.' },
    ],
    solution: {
      code: 'def factorial(n):\n    """Devuelve n! calculado con un bucle."""\n    resultado = 1\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado\n\nprint(factorial(5))',
      explanation: 'Con n = 0, range(1, 1) está vacío: el bucle no da ninguna vuelta y se devuelve 1, que es justo 0!. A diferencia de la versión recursiva, no hay límite de llamadas.',
    },
    reference: [
      'def factorial(n):\n    resultado = 1\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado',
      'def factorial(n):\n    resultado = 1\n    for i in range(2, n + 1):\n        resultado = resultado * i\n    return resultado',
    ],
    wrongs: [
      { code: 'def factorial(n):\n    resultado = 0\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado', category: 'comprension' },
      { code: 'def factorial(n):\n    resultado = 1\n    for i in range(1, n):\n        resultado *= i\n    return resultado', category: 'comprension' },
    ],
  },
};
