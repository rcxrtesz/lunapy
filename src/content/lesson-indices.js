// Lección 8.1 · Índices y porciones. Contenido original, alineado con el cap. 8 de
// «Piensa en Python» (una cadena es una secuencia, len, recorridos, porciones,
// las cadenas son inmutables) y PE2 módulo 2.

const TOPIC = 'Cadenas';

export const LESSON_INDICES = {
  id: 'indices',
  moduleId: 'm8',
  code: '8.1',
  title: 'Índices y porciones',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Acceder a un carácter por su posición, desde el principio o desde el final',
    'Evitar el IndexError al salirte del texto',
    'Extraer partes de un texto con porciones [inicio:fin:paso]',
    'Explicar por qué un texto no se puede modificar y cómo crear otro nuevo',
    'Recorrer un texto por posiciones con range(len(texto))',
  ],
  prerequisites: ['Módulo 7 «Bucles, iteración y búsqueda»'],
  teaser: 'Empiezas el Módulo 8: un texto es una fila de caracteres numerados. Hoy aprendes a coger justo los que necesitas.',
  celebration: 'Ya manejas los textos por dentro: posiciones, porciones y la regla de oro de que no se pueden modificar.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'indice', title: 'Cada carácter tiene una posición', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Un texto es una **secuencia** de caracteres. Cada uno tiene un **índice** (su posición), que empieza en **0**. Se accede con corchetes:' },
        { type: 'code', run: true, code: 'palabra = "Python"\nprint(palabra[0])    # primera\nprint(palabra[3])\nprint(palabra[-1])   # última\nprint(palabra[-2])   # penúltima\nprint(len(palabra))' },
        {
          type: 'five', items: {
            'Desde el principio': 'P=0, y=1, t=2, h=3, o=4, n=5',
            'Desde el final': 'n=−1, o=−2, h=−3, t=−4, y=−5, P=−6',
            'La última': 'Siempre `texto[-1]` o `texto[len(texto) - 1]`.',
          },
        },
        {
          type: 'check', id: 'm8i-indice', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 's = "LunaPy"\nprint(s[2], s[-3])', answer: 'n a',
          explain: 'L=0, u=1, n=2. Desde el final: y=−1, P=−2, a=−3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'indexerror', title: 'Salirse del texto', concepts: ['cadenas', 'errores'],
      blocks: [
        { type: 'p', text: 'Si pides una posición que no existe, Python se detiene con un **IndexError**. El caso más frecuente: usar `len(texto)` como índice.' },
        { type: 'code', run: true, code: 'palabra = "sol"\nprint(len(palabra))\nprint(palabra[len(palabra)])' },
        { type: 'callout', tone: 'warn', title: 'El último índice es len − 1', text: '"sol" tiene 3 caracteres, en las posiciones 0, 1 y 2. La posición 3 no existe.' },
        {
          type: 'check', id: 'm8i-error', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'nombre = "Ana"\nprint(nombre[3])', expectError: 'IndexError',
          options: [
            { text: 'IndexError: la posición 3 no existe', correct: true },
            { text: 'Muestra a', why: '"Ana" tiene posiciones 0, 1 y 2: la «a» final es nombre[2].' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'porciones', title: 'Porciones', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Una **porción** (*slice*) extrae un trozo: `texto[inicio:fin]`, del inicio **incluido** al fin **excluido**, igual que range. Si omites un extremo, llega hasta el borde.' },
        { type: 'code', run: true, code: 's = "Programación"\nprint(s[0:3])\nprint(s[:7])\nprint(s[7:])\nprint(s[-4:])\nprint(s[::2])    # de 2 en 2\nprint(s[::-1])   # al revés' },
        {
          type: 'check', id: 'm8i-porcion', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 's = "Barcelona"\nprint(s[3:6], s[:3], s[-4:])', answer: 'cel Bar lona',
          explain: 'Posiciones 3, 4 y 5: «cel». Las tres primeras: «Bar». Las cuatro últimas: «lona».',
        },
        {
          type: 'check', id: 'm8i-reves', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 'print("roma"[::-1])', answer: 'amor',
          explain: 'Con paso −1 la porción recorre el texto de atrás hacia delante.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'inmutable', title: 'Los textos no se pueden cambiar', concepts: ['cadenas', 'errores'],
      blocks: [
        { type: 'p', text: 'Los textos son **inmutables**: no se puede cambiar un carácter. Para «modificarlo», se construye un texto **nuevo** con porciones y se guarda:' },
        { type: 'code', run: true, title: 'Esto falla', code: 'saludo = "hola"\nsaludo[0] = "H"' },
        { type: 'code', run: true, title: 'Esto funciona', code: 'saludo = "hola"\nsaludo = "H" + saludo[1:]\nprint(saludo)' },
        {
          type: 'check', id: 'm8i-inmutable', concept: 'cadenas', mode: 'choice',
          question: '¿Qué ocurre?', code: 'palabra = "gato"\npalabra[0] = "p"', expectError: 'TypeError',
          options: [
            { text: 'TypeError: un texto no admite cambiar caracteres', correct: true },
            { text: 'palabra pasa a ser "pato"', why: 'Los textos son inmutables. Para obtener "pato": `palabra = "p" + palabra[1:]`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'recorrer', title: 'Recorrer por posiciones', concepts: ['cadenas', 'bucles'],
      blocks: [
        { type: 'p', text: 'Con `for letra in texto` recorres los caracteres. Si además necesitas la **posición**, recorre los índices con `range(len(texto))`:' },
        { type: 'code', run: true, code: 'texto = "casa"\nfor i in range(len(texto)):\n    print(i, texto[i])' },
        { type: 'p', text: 'Es útil para comparar cada carácter con el de al lado o con el del extremo opuesto:' },
        { type: 'code', run: true, code: 'texto = "llamar"\nfor i in range(len(texto) - 1):\n    if texto[i] == texto[i + 1]:\n        print("Letra doble en la posición", i)' },
        {
          type: 'check', id: 'm8i-rango', concept: 'cadenas', mode: 'text',
          question: 'Predice (en una línea):', code: 's = "hola"\nfor i in range(len(s)):\n    print(s[len(s) - 1 - i], end="")', answer: 'aloh',
          explain: 'len(s) − 1 − i recorre las posiciones 3, 2, 1 y 0: el texto al revés.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'idx-predict' },
    { id: 'a2', activity: 'idx-complete' },
    { id: 'a3', activity: 'idx-fix' },
    { id: 'a4', activity: 'idx-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`texto[i]` da el carácter de la posición i; la primera es 0 y la última, −1 (o len − 1).',
    'Una posición que no existe produce un **IndexError**.',
    '`texto[inicio:fin:paso]` da una porción: inicio incluido, fin excluido. `[::-1]` le da la vuelta.',
    'Los textos son **inmutables**: para cambiarlos, crea uno nuevo con porciones.',
    '`for i in range(len(texto))` recorre las posiciones cuando necesitas el índice.',
  ],
};

export const ACTIVITIES_INDICES = {
  'idx-predict': {
    id: 'idx-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El código secreto', difficulty: 2, xp: 10, concepts: ['cadenas'],
    prompt: 'Índices y porciones sobre el mismo texto. **¿Qué mostrará?**',
    code: 'clave = "MURCIELAGO"\nprint(clave[0] + clave[-1], clave[2:5], clave[::3])',
    expectedOutput: 'MO RCI MCLO',
    options: [
      { text: 'MO RCI MCLO', correct: true },
      { text: 'MO RCIE MCLO', concept: 'cadenas', why: 'El fin de la porción no se incluye: [2:5] son las posiciones 2, 3 y 4.' },
      { text: 'MG RCI MCLO', concept: 'cadenas', why: '[-1] es el último carácter: la O.' },
      { text: 'MO UCRCI MRL', concept: 'cadenas', why: '[::3] empieza en la posición 0 y salta de 3 en 3: 0, 3, 6, 9.' },
    ],
    explain: ['clave[0] + clave[-1] → "M" + "O".', 'clave[2:5] → posiciones 2, 3, 4: R, C, I.', 'clave[::3] → posiciones 0, 3, 6, 9: M, C, L, O.'],
  },
  'idx-complete': {
    id: 'idx-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Ocultar la tarjeta', difficulty: 2, xp: 15, concepts: ['cadenas'],
    statement: 'Completa `ocultar(numero)` para mostrar solo los **4 últimos** caracteres de un número de tarjeta y sustituir el resto por asteriscos, **tantos como caracteres ocultos**.',
    expected: '************3456',
    starter: 'def ocultar(numero):\n    visibles = numero[___:]\n    ocultos = "*" * (len(numero) - ___)\n    return ocultos + ___\n\nprint(ocultar("1234567890123456"))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'ocultar', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['************3456'] },
        { label: 'ocultar("98765432")', call: 'print(ocultar("98765432"))', out_lines: ['****5432'] },
        { label: 'ocultar("1234")', call: 'print(ocultar("1234"))', out_lines: ['1234'] },
      ],
      misconceptions: [
        { out_lines: ['************456'], title: 'Solo tres visibles', msg: 'Para quedarte con los 4 últimos caracteres, la porción empieza en -4: `numero[-4:]`.' },
      ],
      logic_msg: 'Comprueba con "98765432": deben verse 4 asteriscos y 5432.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer hueco es dónde empieza la porción de los 4 últimos; el segundo, cuántos quedan visibles; el tercero, qué se une a los asteriscos.' },
      { level: 'Razonamiento', text: 'Los 4 últimos empiezan en la posición −4. Los ocultos son todos menos esos 4.' },
      { level: 'Pseudocódigo', text: 'visibles ← los 4 últimos caracteres\nocultos ← "*" repetido (longitud − 4) veces\ndevolver ocultos + visibles', pre: true },
      { level: 'Ayuda técnica', text: '`numero[-4:]`, `len(numero) - 4` y `return ocultos + visibles`.' },
    ],
    solution: {
      code: 'def ocultar(numero):\n    visibles = numero[-4:]\n    ocultos = "*" * (len(numero) - 4)\n    return ocultos + visibles\n\nprint(ocultar("1234567890123456"))',
      explanation: 'Los índices negativos permiten tomar los últimos caracteres sin saber cuánto mide el texto. La función sirve para números de cualquier longitud.',
    },
    reference: ['def ocultar(numero):\n    visibles = numero[-4:]\n    ocultos = "*" * (len(numero) - 4)\n    return ocultos + visibles\n\nprint(ocultar("1234567890123456"))'],
    wrongs: [
      { code: 'def ocultar(numero):\n    visibles = numero[___:]\n    ocultos = "*" * (len(numero) - ___)\n    return ocultos + ___', category: 'incompleto' },
      { code: 'def ocultar(numero):\n    visibles = numero[-4:]\n    ocultos = "*" * 12\n    return ocultos + visibles\n\nprint(ocultar("1234567890123456"))', category: 'logica' },
    ],
  },
  'idx-fix': {
    id: 'idx-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Primera y última', difficulty: 2, xp: 20, concepts: ['cadenas', 'errores'],
    statement: '`extremos(palabra)` debería devolver la primera y la última letra unidas, pero da un **IndexError**. Corrígela para que funcione con palabras de cualquier longitud.',
    expected: 'Pn\nsl',
    starter: 'def extremos(palabra):\n    return palabra[1] + palabra[len(palabra)]\n\nprint(extremos("Python"))\nprint(extremos("sol"))',
    spec: {
      functions: [{ name: 'extremos', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Pn', 'sl'] },
        { label: 'extremos("ok")', call: 'print(extremos("ok"))', out_lines: ['ok'] },
        { label: 'extremos("a")', call: 'print(extremos("a"))', out_lines: ['aa'] },
      ],
      misconceptions: [
        { out_lines: ['yn', 'ol'], title: 'La primera es la 0', msg: 'Los índices empiezan en 0: la primera letra es `palabra[0]`.' },
      ],
      logic_msg: 'Comprueba con "Python": la primera letra es P y la última, n.',
    },
    hints: [
      { level: 'Orientación', text: 'Hay dos errores de índice: uno da error y el otro coge la letra equivocada.' },
      { level: 'Razonamiento', text: '¿En qué posición está la primera letra? ¿Y la última, si el texto mide len(palabra)?' },
      { level: 'Pseudocódigo', text: 'devolver carácter en la posición 0 + último carácter', pre: true },
      { level: 'Ayuda técnica', text: '`palabra[0] + palabra[-1]` (o `palabra[len(palabra) - 1]`).' },
    ],
    solution: {
      code: 'def extremos(palabra):\n    return palabra[0] + palabra[-1]\n\nprint(extremos("Python"))\nprint(extremos("sol"))',
      explanation: 'La primera posición es 0 y la última, −1 (equivale a len − 1). `palabra[len(palabra)]` siempre está fuera del texto.',
    },
    reference: [
      'def extremos(palabra):\n    return palabra[0] + palabra[-1]\n\nprint(extremos("Python"))\nprint(extremos("sol"))',
      'def extremos(palabra):\n    return palabra[0] + palabra[len(palabra) - 1]\n\nprint(extremos("Python"))\nprint(extremos("sol"))',
    ],
    wrongs: [
      { code: 'def extremos(palabra):\n    return palabra[1] + palabra[len(palabra)]\n\nprint(extremos("Python"))\nprint(extremos("sol"))', category: 'ejecucion' },
      { code: 'def extremos(palabra):\n    return palabra[1] + palabra[-1]\n\nprint(extremos("Python"))\nprint(extremos("sol"))', category: 'comprension' },
    ],
  },
  'idx-build': {
    id: 'idx-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: '¿Es un palíndromo?', difficulty: 3, xp: 30, concepts: ['cadenas', 'booleanos'],
    unlock: { any: ['idx-predict', 'idx-complete', 'idx-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Un **palíndromo** se lee igual al derecho y al revés, como «reconocer» o «oso». Define `es_palindromo(palabra)` que devuelva True si la palabra lo es.\n\nLas palabras llegarán en minúsculas y sin espacios.',
    expected: 'True',
    plan: [
      {
        q: '¿Cómo obtienes la palabra al revés?',
        options: [
          { text: 'palabra[::-1]', correct: true },
          { text: 'palabra[-1]', why: 'Eso es solo la última letra.' },
          { text: 'palabra[1:]', why: 'Eso quita la primera letra, no le da la vuelta.' },
        ],
      },
      {
        q: '¿Qué devuelve la función?',
        options: [
          { text: 'La comparación entre la palabra y su versión al revés', correct: true },
          { text: 'La palabra al revés', why: 'Se pide True o False: compara la palabra con su versión al revés.' },
        ],
      },
    ],
    planScaffold: 'def es_palindromo(palabra):\n    # comparar la palabra con su versión al revés\n\n\nprint(es_palindromo("reconocer"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'es_palindromo', params: 1 }],
      cases: [
        { label: 'es_palindromo("reconocer")', call: 'print(es_palindromo("reconocer"))', out_lines: ['True'] },
        { label: 'es_palindromo("python")', call: 'print(es_palindromo("python"))', out_lines: ['False'] },
        { label: 'es_palindromo("oso")', call: 'print(es_palindromo("oso"))', out_lines: ['True'] },
        { label: 'es_palindromo("ab")', call: 'print(es_palindromo("ab"))', out_lines: ['False'] },
        { label: 'es_palindromo("a")', call: 'print(es_palindromo("a"))', out_lines: ['True'] },
        { label: 'es_palindromo("arena")', call: 'print(es_palindromo("arena"))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['reconocer'], title: 'Devuelve el texto', msg: 'La función tiene que devolver True o False: compara la palabra con su versión al revés.' },
        { out_lines: ['True', 'None'], title: 'Muestra, pero no devuelve', msg: 'Usa return en lugar de print.' },
      ],
      logic_msg: 'Comprueba con "ab": al revés es "ba", así que debe dar False.',
    },
    hints: [
      { level: 'Orientación', text: 'Una línea basta: compara la palabra con su versión al revés.' },
      { level: 'Razonamiento', text: '¿Qué porción le da la vuelta a un texto? ¿Qué operador compara dos textos?' },
      { level: 'Pseudocódigo', text: 'devolver palabra == palabra al revés', pre: true },
      { level: 'Ayuda técnica', text: '`return palabra == palabra[::-1]`.' },
    ],
    solution: {
      code: 'def es_palindromo(palabra):\n    """Devuelve True si palabra se lee igual al revés."""\n    return palabra == palabra[::-1]\n\nprint(es_palindromo("reconocer"))',
      explanation: '`palabra[::-1]` crea la palabra al revés y `==` la compara con la original. La comparación ya es el booleano que hay que devolver.',
    },
    reference: [
      'def es_palindromo(palabra):\n    return palabra == palabra[::-1]',
      'def es_palindromo(palabra):\n    for i in range(len(palabra) // 2):\n        if palabra[i] != palabra[-1 - i]:\n            return False\n    return True',
    ],
    wrongs: [
      { code: 'def es_palindromo(palabra):\n    return palabra[::-1]', category: 'comprension' },
      { code: 'def es_palindromo(palabra):\n    return palabra[0] == palabra[-1]', category: 'logica' },
    ],
  },
};
