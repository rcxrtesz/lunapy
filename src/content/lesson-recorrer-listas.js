// Lección 9.2 · Recorrer listas. Contenido original, alineado con el cap. 9 de
// «Piensa en Python» (recorrer una lista, mapear, filtrar y reducir, listas y
// cadenas) y PE1 módulo 3. Las comprensiones de listas se presentan al final.

const TOPIC = 'Listas';

export const LESSON_RECORRER_LISTAS = {
  id: 'recorrer-listas',
  moduleId: 'm9',
  code: '9.2',
  title: 'Recorrer listas',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Recorrer una lista con for, por elementos o por posiciones (enumerate)',
    'Construir una lista nueva transformando cada elemento (mapear)',
    'Quedarte solo con los elementos que cumplen algo (filtrar)',
    'Reducir una lista a un único valor (acumular)',
    'Escribir mapeos y filtros cortos con comprensiones de listas',
  ],
  prerequisites: ['Lección 9.1 «Listas y operaciones»'],
  teaser: 'Con una lista y un bucle puedes procesar cien datos igual que uno. Hoy aprendes los tres patrones que lo resuelven casi todo.',
  celebration: 'Ya dominas los tres grandes patrones con listas: transformar, filtrar y acumular.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'for', title: 'Recorrer elemento a elemento', concepts: ['listas', 'bucles'],
      blocks: [
        { type: 'p', text: '`for` recorre los elementos de una lista igual que los caracteres de un texto. Si además necesitas la posición, `enumerate` te da las dos cosas:' },
        { type: 'code', run: true, code: 'invitados = ["Ana", "Luis", "Eva"]\nfor nombre in invitados:\n    print("Hola,", nombre)\n\nfor i, nombre in enumerate(invitados):\n    print(i + 1, nombre)' },
        {
          type: 'check', id: 'm9r-enumerate', concept: 'listas', mode: 'text',
          question: 'Predice (en una línea):', code: 'for i, x in enumerate(["a", "b", "c"]):\n    print(i, x, end=" ")', answer: '0 a 1 b 2 c',
          explain: 'enumerate empieza a contar en 0 y da la posición y el elemento en cada vuelta.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'patrones', title: 'Mapear, filtrar y acumular', concepts: ['listas', 'bucles'],
      blocks: [
        { type: 'p', text: 'Casi todo lo que harás con listas encaja en uno de estos tres patrones. Los tres empiezan antes del bucle y terminan después:' },
        {
          type: 'five', items: {
            'Mapear': 'Lista nueva vacía; en cada vuelta, `append` del elemento **transformado**.',
            'Filtrar': 'Lista nueva vacía; `append` solo de los elementos que **cumplen** una condición.',
            'Acumular': 'Un valor inicial (0, 1, ""…); en cada vuelta, se **combina** con el elemento.',
          },
        },
        { type: 'code', run: true, code: 'precios = [10, 25, 4, 60]\n\ncon_iva = []                    # mapear\nfor p in precios:\n    con_iva.append(round(p * 1.21, 2))\n\ncaros = []                      # filtrar\nfor p in precios:\n    if p > 20:\n        caros.append(p)\n\ntotal = 0                       # acumular\nfor p in precios:\n    total += p\n\nprint(con_iva, caros, total)' },
        {
          type: 'check', id: 'm9r-filtrar', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'pares = []\nfor n in [3, 8, 5, 12, 7]:\n    if n % 2 == 0:\n        pares.append(n)\nprint(pares)', answer: '[8, 12]',
          explain: 'Solo se añaden los elementos que cumplen la condición.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'variable', title: 'Cambiar la variable no cambia la lista', concepts: ['listas', 'errores'],
      blocks: [
        { type: 'p', text: 'Un error muy frecuente: intentar modificar la lista cambiando la variable del bucle. La variable es solo una etiqueta temporal para cada elemento; reasignarla no toca la lista.' },
        { type: 'code', run: true, code: 'notas = [5, 6, 7]\nfor n in notas:\n    n = n + 1        # cambia n, no la lista\nprint(notas)\n\nfor i in range(len(notas)):\n    notas[i] = notas[i] + 1   # esto sí\nprint(notas)' },
        { type: 'callout', tone: 'tip', title: 'Dos opciones', text: 'O modificas la lista por posiciones (`lista[i] = …`), o —normalmente más claro— construyes una lista nueva con el patrón mapear.' },
        {
          type: 'check', id: 'm9r-variable', concept: 'listas', mode: 'choice',
          question: '¿Qué mostrará?', code: 'v = [1, 2, 3]\nfor x in v:\n    x = x * 10\nprint(v)', expectOutput: '[1, 2, 3]',
          options: [
            { text: '[1, 2, 3]', correct: true },
            { text: '[10, 20, 30]', why: 'x es una variable temporal: darle un valor nuevo no cambia el elemento de la lista.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'textos', title: 'De texto a lista y vuelta', concepts: ['listas', 'cadenas'],
      blocks: [
        { type: 'p', text: '`split` convierte un texto en una lista y `join` hace lo contrario. Con un bucle en medio puedes procesar palabra a palabra:' },
        { type: 'code', run: true, code: 'frase = "el gato come pescado"\npalabras = frase.split()\nlargas = []\nfor p in palabras:\n    if len(p) > 3:\n        largas.append(p.upper())\nprint(" ".join(largas))\n\nprint(list("hola"))   # un texto como lista de caracteres' },
        {
          type: 'check', id: 'm9r-split', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'datos = "3,7,2"\ntotal = 0\nfor trozo in datos.split(","):\n    total += int(trozo)\nprint(total)', answer: '12',
          explain: 'split(",") da ["3", "7", "2"]; cada trozo se convierte en número y se suma.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comprension', title: 'Comprensiones de listas', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Mapear y filtrar son tan habituales que Python tiene una forma corta: la **comprensión de listas**. Se lee casi como en español: «el doble de n, para cada n de números, si n es positivo».' },
        { type: 'code', run: true, code: 'numeros = [4, -2, 7, 0, -5]\ndobles = [n * 2 for n in numeros]\npositivos = [n for n in numeros if n > 0]\ncuadrados_positivos = [n ** 2 for n in numeros if n > 0]\nprint(dobles)\nprint(positivos)\nprint(cuadrados_positivos)' },
        { type: 'callout', tone: 'info', title: 'Úsalas con moderación', text: 'Son ideales para transformaciones cortas. Si la lógica no cabe cómodamente en una línea, el bucle con append se lee mejor.' },
        {
          type: 'check', id: 'm9r-comprension', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'print([len(p) for p in ["sol", "luna", "mar"]])', answer: '[3, 4, 3]',
          explain: 'Una lista con la longitud de cada palabra.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'lr-predict' },
    { id: 'a2', activity: 'lr-complete' },
    { id: 'a3', activity: 'lr-fix' },
    { id: 'a4', activity: 'lr-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`for x in lista:` recorre los elementos; `enumerate(lista)` da también la posición.',
    '**Mapear**: lista nueva con cada elemento transformado. **Filtrar**: solo los que cumplen algo. **Acumular**: un único valor.',
    'Reasignar la variable del bucle no cambia la lista: usa `lista[i] = …` o construye una nueva.',
    '`split` y `join` convierten entre textos y listas.',
    'Comprensión de listas: `[expresión for x in lista if condición]`.',
  ],
};

export const ACTIVITIES_RECORRER_LISTAS = {
  'lr-predict': {
    id: 'lr-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Tres patrones, una lista', difficulty: 2, xp: 10, concepts: ['listas', 'bucles'],
    prompt: 'Un bucle que mapea, filtra y acumula a la vez. **¿Qué mostrará?**',
    code: 'temperaturas = [18, 25, 31, 22]\ncalurosos = []\nsuma = 0\nfor t in temperaturas:\n    suma += t\n    if t > 24:\n        calurosos.append(t - 24)\nprint(calurosos, suma)',
    expectedOutput: '[1, 7] 96',
    options: [
      { text: '[1, 7] 96', correct: true },
      { text: '[25, 31] 96', concept: 'listas', why: 'Lo que se añade es t − 24, no t.' },
      { text: '[1, 7] 56', concept: 'bucles', why: 'La suma está fuera del if: se acumulan todas las temperaturas.' },
      { text: '[0, 1, 7, 0] 96', concept: 'listas', why: 'Solo se añade algo cuando se cumple la condición: es un filtro.' },
    ],
    explain: ['Se suman las cuatro: 18 + 25 + 31 + 22 = 96.', 'Solo 25 y 31 superan 24: se añaden 25 − 24 = 1 y 31 − 24 = 7.'],
  },
  'lr-complete': {
    id: 'lr-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Los aprobados', difficulty: 2, xp: 15, concepts: ['listas', 'bucles'],
    statement: 'Completa `aprobados(notas)` para que devuelva una **lista nueva** solo con las notas de 5 o más.',
    expected: '[7, 5, 9.5]',
    starter: 'def aprobados(notas):\n    resultado = ___\n    for nota in notas:\n        if nota ___ 5:\n            resultado.___(nota)\n    return resultado\n\nprint(aprobados([7, 3, 5, 4.5, 9.5]))',
    spec: {
      blanks: true,
      functions: [{ name: 'aprobados', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['[7, 5, 9.5]'] },
        { label: 'aprobados([1, 2])', call: 'print(aprobados([1, 2]))', out_lines: ['[]'] },
        { label: 'aprobados([])', call: 'print(aprobados([]))', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['[7, 9.5]'], title: 'El 5 también aprueba', msg: '«5 o más» incluye el 5: usa `>=`.' },
      ],
      logic_msg: 'La lista resultante debe contener solo las notas de 5 o más, en el mismo orden.',
    },
    hints: [
      { level: 'Orientación', text: 'Es el patrón filtrar: lista vacía, condición y append.' },
      { level: 'Razonamiento', text: '¿Cómo se escribe una lista vacía? ¿Qué operador significa «5 o más»? ¿Qué método añade al final?' },
      { level: 'Pseudocódigo', text: 'resultado ← lista vacía\npara cada nota:\n    si nota ≥ 5: añadir nota a resultado\ndevolver resultado', pre: true },
      { level: 'Ayuda técnica', text: '`resultado = []`, `if nota >= 5:` y `resultado.append(nota)`.' },
    ],
    solution: {
      code: 'def aprobados(notas):\n    resultado = []\n    for nota in notas:\n        if nota >= 5:\n            resultado.append(nota)\n    return resultado\n\nprint(aprobados([7, 3, 5, 4.5, 9.5]))',
      explanation: 'Patrón filtrar: la lista nueva empieza vacía y solo recibe los elementos que cumplen la condición. La original no cambia. En una línea: `[n for n in notas if n >= 5]`.',
    },
    reference: [
      'def aprobados(notas):\n    resultado = []\n    for nota in notas:\n        if nota >= 5:\n            resultado.append(nota)\n    return resultado\n\nprint(aprobados([7, 3, 5, 4.5, 9.5]))',
      'def aprobados(notas):\n    return [n for n in notas if n >= 5]\n\nprint(aprobados([7, 3, 5, 4.5, 9.5]))',
    ],
    wrongs: [
      { code: 'def aprobados(notas):\n    resultado = ___\n    for nota in notas:\n        if nota ___ 5:\n            resultado.___(nota)\n    return resultado', category: 'incompleto' },
      { code: 'def aprobados(notas):\n    resultado = []\n    for nota in notas:\n        if nota > 5:\n            resultado.append(nota)\n    return resultado\n\nprint(aprobados([7, 3, 5, 4.5, 9.5]))', category: 'comprension' },
    ],
  },
  'lr-fix': {
    id: 'lr-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Las notas que no suben', difficulty: 2, xp: 20, concepts: ['listas', 'errores'],
    statement: '`subir_nota(notas)` debería devolver una lista **nueva** con cada nota aumentada en 1 punto (sin pasar de 10). Pero devuelve las notas sin cambios. Corrígelo.',
    expected: '[6, 8, 10]',
    starter: 'def subir_nota(notas):\n    for n in notas:\n        n = min(n + 1, 10)\n    return notas\n\nprint(subir_nota([5, 7, 9.5]))',
    spec: {
      functions: [{ name: 'subir_nota', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['[6, 8, 10]'] },
        { label: 'subir_nota([10, 0])', call: 'print(subir_nota([10, 0]))', out_lines: ['[10, 1]'] },
        { label: 'La original no cambia', call: 'v = [1, 2]\nsubir_nota(v)\nprint(v)', out_lines: ['[1, 2]'] },
      ],
      misconceptions: [
        { out_lines: ['[5, 7, 9.5]'], title: 'La variable del bucle no cambia la lista', msg: 'Reasignar `n` no modifica la lista. Crea una lista nueva y añade cada nota subida con append.' },
        { out_lines: ['[2, 3]'], title: 'Has cambiado la original', msg: 'Se pide una lista **nueva**: no modifiques la que recibe la función.' },
      ],
      logic_msg: 'Comprueba con [5, 7, 9.5]: debe dar [6, 8, 10] (el 10.5 se queda en 10).',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: la lista sale igual. ¿Qué cambia realmente la línea `n = …`?' },
      { level: 'Razonamiento', text: 'n es una etiqueta temporal. Para obtener una lista con los nuevos valores, usa el patrón mapear: lista nueva y append.' },
      { level: 'Pseudocódigo', text: 'nuevas ← lista vacía\npara cada n de notas:\n    añadir min(n + 1, 10) a nuevas\ndevolver nuevas', pre: true },
      { level: 'Ayuda técnica', text: '`nuevas = []`, `nuevas.append(min(n + 1, 10))` y `return nuevas`.' },
    ],
    solution: {
      code: 'def subir_nota(notas):\n    nuevas = []\n    for n in notas:\n        nuevas.append(min(n + 1, 10))\n    return nuevas\n\nprint(subir_nota([5, 7, 9.5]))',
      explanation: 'La variable del bucle es solo una copia temporal del valor. Con el patrón mapear se construye una lista nueva y la original queda intacta.',
    },
    reference: [
      'def subir_nota(notas):\n    nuevas = []\n    for n in notas:\n        nuevas.append(min(n + 1, 10))\n    return nuevas\n\nprint(subir_nota([5, 7, 9.5]))',
      'def subir_nota(notas):\n    return [min(n + 1, 10) for n in notas]\n\nprint(subir_nota([5, 7, 9.5]))',
    ],
    wrongs: [
      { code: 'def subir_nota(notas):\n    for n in notas:\n        n = min(n + 1, 10)\n    return notas\n\nprint(subir_nota([5, 7, 9.5]))', category: 'comprension' },
      { code: 'def subir_nota(notas):\n    for i in range(len(notas)):\n        notas[i] = min(notas[i] + 1, 10)\n    return notas\n\nprint(subir_nota([5, 7, 9.5]))', category: 'comprension' },
    ],
  },
  'lr-build': {
    id: 'lr-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Sin repetidos', difficulty: 3, xp: 30, concepts: ['listas', 'busqueda'],
    unlock: { any: ['lr-predict', 'lr-complete', 'lr-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `sin_repetidos(lista)` que devuelva una lista nueva con los elementos de la original **sin repetir**, en el **orden de su primera aparición**.\n\nEjemplo: `sin_repetidos([3, 1, 3, 2, 1])` → `[3, 1, 2]`.',
    expected: '[3, 1, 2]',
    plan: [
      {
        q: '¿Qué patrón encaja?',
        options: [
          { text: 'Filtrar: añadir cada elemento solo si todavía no está en el resultado', correct: true },
          { text: 'Acumular: sumar los elementos', why: 'No se busca un único valor sino una lista.' },
        ],
      },
      {
        q: '¿Cómo sabes si un elemento ya está en la lista nueva?',
        options: [
          { text: 'Con el operador in', correct: true },
          { text: 'Ordenando la lista', why: 'Ordenar cambiaría el orden de aparición, y se pide conservarlo.' },
        ],
      },
    ],
    planScaffold: 'def sin_repetidos(lista):\n    # lista nueva vacía\n    # añadir cada elemento si todavía no está\n\n\nprint(sin_repetidos([3, 1, 3, 2, 1]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'sin_repetidos', params: 1 }],
      cases: [
        { label: '[3, 1, 3, 2, 1]', call: 'print(sin_repetidos([3, 1, 3, 2, 1]))', out_lines: ['[3, 1, 2]'] },
        { label: 'Textos', call: 'print(sin_repetidos(["sol", "mar", "sol"]))', out_lines: ["['sol', 'mar']"] },
        { label: 'Lista vacía', call: 'print(sin_repetidos([]))', out_lines: ['[]'] },
        { label: 'Sin repetidos', call: 'print(sin_repetidos([5, 4]))', out_lines: ['[5, 4]'] },
      ],
      misconceptions: [
        { out_lines: ['[1, 2, 3]'], title: 'Se ha perdido el orden', msg: 'Se pide el orden de primera aparición. Ordenar (o usar set) lo cambia: recorre la lista y añade cada elemento si no está ya.' },
      ],
      logic_msg: 'Comprueba con [3, 1, 3, 2, 1]: el resultado es [3, 1, 2].',
    },
    hints: [
      { level: 'Orientación', text: 'Lista nueva vacía, un for y una condición con `not in`.' },
      { level: 'Razonamiento', text: 'Para cada elemento: ¿está ya en el resultado? Si no, añádelo.' },
      { level: 'Pseudocódigo', text: 'resultado ← lista vacía\npara cada x de lista:\n    si x no está en resultado: añadir x\ndevolver resultado', pre: true },
      { level: 'Ayuda técnica', text: '`if x not in resultado:` y `resultado.append(x)`.' },
    ],
    solution: {
      code: 'def sin_repetidos(lista):\n    """Devuelve los elementos sin repetir, en orden de primera aparición."""\n    resultado = []\n    for x in lista:\n        if x not in resultado:\n            resultado.append(x)\n    return resultado\n\nprint(sin_repetidos([3, 1, 3, 2, 1]))',
      explanation: 'Es un filtro cuya condición depende de lo que ya has guardado: solo pasa lo que todavía no está en el resultado.',
    },
    reference: ['def sin_repetidos(lista):\n    resultado = []\n    for x in lista:\n        if x not in resultado:\n            resultado.append(x)\n    return resultado'],
    wrongs: [
      { code: 'def sin_repetidos(lista):\n    return sorted(set(lista))', category: 'comprension' },
      { code: 'def sin_repetidos(lista):\n    resultado = []\n    for x in lista:\n        if x in resultado:\n            resultado.append(x)\n    return resultado', category: 'logica' },
    ],
  },
};
