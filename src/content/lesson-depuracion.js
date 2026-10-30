// Lección 13.1 · Estrategias de depuración. Contenido original, alineado con las
// secciones de depuración de cada capítulo de «Piensa en Python» y el apéndice de
// depuración: tipos de error, leer tracebacks, método científico, assert y casos límite.

const TOPIC = 'Depuración';

export const LESSON_DEPURACION = {
  id: 'depuracion',
  moduleId: 'm13',
  code: '13.1',
  title: 'Estrategias de depuración',
  minutes: 35,
  bonusXp: 35,
  objectives: [
    'Identificar si un error es de sintaxis, de ejecución o de lógica, y qué hacer en cada caso',
    'Leer un traceback con varias llamadas hasta la línea culpable',
    'Depurar con método: observar, formular una hipótesis y comprobarla',
    'Comprobar funciones automáticamente con assert',
    'Probar los casos límite',
  ],
  prerequisites: ['Módulo 12 (recomendado)'],
  teaser: 'Último módulo: llevas todo el curso corrigiendo errores. Hoy los ordenas en un método que podrás usar con cualquier programa.',
  celebration: 'Ya depuras con método: lees el error, formulas hipótesis, pruebas con assert y piensas en los casos límite.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'familias', title: 'Tres familias de errores', concepts: ['depuracion'],
      blocks: [
        {
          type: 'five', items: {
            'Sintaxis': 'Python no entiende cómo está escrito y no empieza a ejecutar. Mira la línea indicada… y la anterior (paréntesis o comillas sin cerrar).',
            'Ejecución': 'El programa se detiene a mitad (NameError, TypeError, IndexError…). Lee el tipo, el mensaje y la línea.',
            'Lógica': 'No hay mensaje de error, pero el resultado es incorrecto. Es la más difícil: hay que investigar.',
          },
        },
        {
          type: 'classify', id: 'm13d-familias', concept: 'depuracion',
          question: '¿Es un error de lógica (el programa funciona pero da un resultado equivocado)?',
          items: [
            { text: 'La media de 4 y 6 sale 7.0', valid: true, why: 'No hay ningún mensaje de error: calcula mal (seguramente falta un paréntesis).' },
            { text: 'NameError: name \'totl\' is not defined', valid: false, why: 'Es un error de ejecución: Python se detiene al no encontrar el nombre.' },
            { text: 'Faltan los dos puntos al final del def', valid: false, why: 'Es un error de sintaxis: el programa ni siquiera empieza.' },
            { text: 'El programa de descuentos cobra de más a los socios', valid: true, why: 'Funciona sin errores, pero hace algo distinto de lo que debería.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'traceback', title: 'Leer un error con varias llamadas', concepts: ['depuracion', 'errores'],
      blocks: [
        { type: 'p', text: 'Cuando el error ocurre dentro de una función llamada desde otra, Python muestra la **cadena de llamadas** (el *traceback*). La pista más importante está **al final**: el tipo de error y la línea donde ocurrió.' },
        { type: 'code', run: true, code: 'def media(notas):\n    return sum(notas) / len(notas)\n\ndef informe(alumna, notas):\n    return f"{alumna}: {media(notas):.2f}"\n\nprint(informe("Ana", [7, 8]))\nprint(informe("Leo", []))' },
        { type: 'callout', tone: 'tip', title: 'De abajo arriba', text: 'El error salta en media (dividir entre cero), pero la causa está en quien la llamó con una lista vacía. Lee primero dónde ocurre y después pregúntate de dónde vienen esos datos.' },
        {
          type: 'check', id: 'm13d-causa', concept: 'depuracion', mode: 'choice',
          question: 'En ese ejemplo, ¿cuál es la mejor corrección?',
          options: [
            { text: 'Que media compruebe si la lista está vacía y lo resuelva (por ejemplo, devolviendo None)', correct: true },
            { text: 'Borrar la línea de Leo', why: 'Esconde el síntoma, pero la función seguirá fallando la próxima vez que reciba una lista vacía.' },
            { text: 'Cambiar / por //', why: 'Dividir entre cero falla igual con // .' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: 'Depurar con método', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: 'Con los errores de lógica, cambiar cosas al azar casi nunca funciona. Funciona pensar como una científica:' },
        {
          type: 'five', items: {
            '1 · Observa': '¿Qué sale y qué debería salir? Busca el caso más pequeño que falla.',
            '2 · Hipótesis': '«Creo que el total se reinicia en cada vuelta».',
            '3 · Experimento': 'Un print de un valor intermedio, el visor paso a paso o un assert.',
            '4 · Conclusión': 'Si la hipótesis era cierta, corrige; si no, formula otra.',
          },
        },
        { type: 'callout', tone: 'info', title: 'El patito de goma', text: 'Explicar el código línea a línea en voz alta (a alguien, o a un patito de goma) obliga a fijarse en lo que realmente hace, no en lo que crees que hace. Sorprende lo a menudo que el error aparece a mitad de la explicación.' },
        {
          type: 'check', id: 'm13d-metodo', concept: 'depuracion', mode: 'choice',
          question: 'Una función de 30 líneas da un resultado incorrecto. ¿Qué haces primero?',
          options: [
            { text: 'Buscar el ejemplo más pequeño que falla y mostrar valores intermedios', correct: true },
            { text: 'Reescribirla entera de otra forma', why: 'Podrías repetir el mismo error. Primero entiende dónde está.' },
            { text: 'Cambiar líneas hasta que salga bien', why: 'Sin una hipótesis, puedes «arreglar» un caso y romper otros.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'assert', title: 'Comprobar con assert', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: '`assert condición` no hace nada si la condición es verdadera, y detiene el programa con un **AssertionError** si es falsa. Es perfecto para escribir **pruebas** de tus funciones que se ejecutan solas:' },
        { type: 'code', run: true, code: 'def es_par(n):\n    return n % 2 == 0\n\nassert es_par(4)\nassert not es_par(7)\nassert es_par(0)\nprint("Todas las pruebas pasan")' },
        { type: 'p', text: 'Si una prueba falla, sabes enseguida qué caso no funciona. Añade un mensaje para que sea aún más claro:' },
        { type: 'code', run: true, code: 'def doble(x):\n    return x * 3        # error de lógica\n\nassert doble(2) == 4, "doble(2) debería ser 4"\nprint("ok")' },
        {
          type: 'check', id: 'm13d-assert', concept: 'depuracion', mode: 'choice',
          question: '¿Qué ocurre?', code: 'def area(a, b):\n    return a * b\n\nassert area(2, 3) == 6\nassert area(0, 5) == 0\nprint("Pruebas superadas")', expectOutput: 'Pruebas superadas',
          options: [
            { text: 'Muestra «Pruebas superadas»', correct: true },
            { text: 'AssertionError', why: 'Las dos condiciones son verdaderas: 2 × 3 = 6 y 0 × 5 = 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limites', title: 'Los casos límite', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: 'Muchos errores solo aparecen con datos «raros». Antes de dar una función por buena, pruébala con:' },
        {
          type: 'five', items: {
            'Vacío': 'Lista vacía, texto vacío, diccionario vacío.',
            'Uno solo': 'Una lista de un elemento.',
            'Cero y negativos': '0, −1, números muy grandes.',
            'Justo en el límite': 'Si la regla es «≥ 5», prueba con 5 y con 4.99.',
          },
        },
        {
          type: 'check', id: 'm13d-limite', concept: 'depuracion', mode: 'choice',
          question: 'Pruebas `aprobados(notas)`, que cuenta las notas de 5 o más. ¿Qué lista detecta mejor un `>` donde debía ir `>=`?',
          options: [
            { text: '[5]', correct: true },
            { text: '[9, 8]', why: 'Con notas lejos del límite, > y >= dan lo mismo.' },
            { text: '[2, 3]', why: 'Tampoco distingue: ninguna nota llega a 5.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'dep-predict' },
    { id: 'a2', activity: 'dep-complete' },
    { id: 'a3', activity: 'dep-fix' },
    { id: 'a4', activity: 'dep-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Sintaxis (no empieza), ejecución (se detiene) y lógica (resultado incorrecto): cada una pide una estrategia.',
    'En un traceback, la pista principal está al final: tipo de error y línea. Después, busca de dónde vienen los datos.',
    'Depura con método: observa, formula una hipótesis, compruébala (print, visor, assert) y concluye.',
    '`assert condición, "mensaje"` comprueba suposiciones y sirve para escribir pruebas automáticas.',
    'Prueba siempre los casos límite: vacío, uno solo, cero, negativos y justo en el límite.',
  ],
};

export const ACTIVITIES_DEPURACION = {
  'dep-predict': {
    id: 'dep-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Prints de andamiaje', difficulty: 2, xp: 10, concepts: ['depuracion'],
    prompt: 'Alguien ha añadido un print para investigar. **¿Qué mostrará?**',
    code: 'def media(v):\n    total = 0\n    for x in v:\n        total += x\n        print("total:", total)\n    return total / len(v)\n\nprint(media([4, 6, 2]))',
    expectedOutput: 'total: 4\ntotal: 10\ntotal: 12\n4.0',
    options: [
      { text: 'total: 4, total: 10, total: 12 y después 4.0', correct: true },
      { text: 'Solo 4.0', concept: 'depuracion', why: 'El print está dentro del bucle: se ejecuta en cada vuelta, antes del resultado.' },
      { text: 'total: 12 y después 4.0', concept: 'depuracion', why: 'El print está dentro del bucle, no después: muestra el total tras cada suma.' },
      { text: 'total: 4, total: 6, total: 2 y después 4.0', concept: 'bucles', why: 'Se muestra el total acumulado, no cada elemento.' },
    ],
    explain: ['Vuelta 1: total = 4. Vuelta 2: 10. Vuelta 3: 12.', 'Después, 12 / 3 = 4.0.'],
  },
  'dep-complete': {
    id: 'dep-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Escribe las pruebas', difficulty: 2, xp: 15, concepts: ['depuracion'],
    statement: 'La función `maximo` ya está escrita. Completa los asserts con el **resultado correcto** de cada caso, incluidos los casos límite.',
    expected: 'Todas las pruebas pasan',
    starter: 'def maximo(lista):\n    mayor = lista[0]\n    for x in lista:\n        if x > mayor:\n            mayor = x\n    return mayor\n\nassert maximo([3, 9, 2]) == ___\nassert maximo([-5, -2, -8]) == ___     # todos negativos\nassert maximo([7]) == ___              # un solo elemento\nprint("Todas las pruebas pasan")',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      cases: [{ label: 'Programa completo', out_lines: ['Todas las pruebas pasan'] }],
      logic_msg: 'Calcula a mano el máximo de cada lista.',
    },
    hints: [
      { level: 'Orientación', text: 'Cada hueco es el valor que debería devolver maximo para esa lista.' },
      { level: 'Razonamiento', text: 'Entre números negativos, el mayor es el más cercano a cero.' },
      { level: 'Pseudocódigo', text: '[3, 9, 2] → 9\n[-5, -2, -8] → -2\n[7] → 7', pre: true },
      { level: 'Ayuda técnica', text: '`== 9`, `== -2` y `== 7`.' },
    ],
    solution: {
      code: 'def maximo(lista):\n    mayor = lista[0]\n    for x in lista:\n        if x > mayor:\n            mayor = x\n    return mayor\n\nassert maximo([3, 9, 2]) == 9\nassert maximo([-5, -2, -8]) == -2     # todos negativos\nassert maximo([7]) == 7              # un solo elemento\nprint("Todas las pruebas pasan")',
      explanation: 'El caso de todos negativos comprueba que mayor no empieza en 0 (un error frecuente); el de un solo elemento, que el bucle funciona aunque no haya nada más que comparar.',
    },
    reference: ['def maximo(lista):\n    mayor = lista[0]\n    for x in lista:\n        if x > mayor:\n            mayor = x\n    return mayor\n\nassert maximo([3, 9, 2]) == 9\nassert maximo([-5, -2, -8]) == -2\nassert maximo([7]) == 7\nprint("Todas las pruebas pasan")'],
    wrongs: [
      { code: 'def maximo(lista):\n    mayor = lista[0]\n    for x in lista:\n        if x > mayor:\n            mayor = x\n    return mayor\n\nassert maximo([3, 9, 2]) == ___\nprint("Todas las pruebas pasan")', category: 'incompleto' },
      { code: 'def maximo(lista):\n    mayor = lista[0]\n    for x in lista:\n        if x > mayor:\n            mayor = x\n    return mayor\n\nassert maximo([3, 9, 2]) == 9\nassert maximo([-5, -2, -8]) == -8\nassert maximo([7]) == 7\nprint("Todas las pruebas pasan")', category: 'ejecucion' },
    ],
  },
  'dep-fix': {
    id: 'dep-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Las pruebas que fallan', difficulty: 3, xp: 25, concepts: ['depuracion', 'bucles'],
    statement: '`contar_mayores(lista, limite)` debería contar cuántos elementos son **estrictamente mayores** que el límite. Las pruebas del final fallan: usa los AssertionError para localizar los **dos** errores y corrígelos (no cambies los asserts).',
    expected: 'OK',
    starter: 'def contar_mayores(lista, limite):\n    cuenta = 1\n    for x in lista:\n        if x >= limite:\n            cuenta += 1\n    return cuenta\n\nassert contar_mayores([], 5) == 0, "lista vacía"\nassert contar_mayores([5, 6, 7], 5) == 2, "el límite no cuenta"\nassert contar_mayores([1, 2], 5) == 0, "ninguno mayor"\nprint("OK")',
    spec: {
      functions: [{ name: 'contar_mayores', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['OK'] },
        { label: 'contar_mayores([10, 20, 30], 15)', call: 'print(contar_mayores([10, 20, 30], 15))', out_lines: ['2'] },
      ],
      rules: [{ type: 'must_call', name: 'contar_mayores', title: 'Mantén las pruebas', msg: 'No borres los asserts: corrige la función para que los supere.' }],
      logic_msg: 'La función debe contar solo los elementos estrictamente mayores que el límite, empezando desde 0.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta y lee el mensaje del assert que falla: «lista vacía». Con una lista vacía el bucle no da ninguna vuelta… ¿qué devuelve?' },
      { level: 'Razonamiento', text: 'El contador empieza en un valor incorrecto. Cuando arregles eso, fallará «el límite no cuenta»: revisa el operador de comparación.' },
      { level: 'Pseudocódigo', text: 'cuenta ← 0\npara cada x: si x > limite: cuenta + 1', pre: true },
      { level: 'Ayuda técnica', text: '`cuenta = 0` y `if x > limite:`.' },
    ],
    solution: {
      code: 'def contar_mayores(lista, limite):\n    cuenta = 0\n    for x in lista:\n        if x > limite:\n            cuenta += 1\n    return cuenta\n\nassert contar_mayores([], 5) == 0, "lista vacía"\nassert contar_mayores([5, 6, 7], 5) == 2, "el límite no cuenta"\nassert contar_mayores([1, 2], 5) == 0, "ninguno mayor"\nprint("OK")',
      explanation: 'Cada assert apunta a un caso límite: la lista vacía delata que el contador no empieza en 0, y el límite exacto (5) delata el >= que debía ser >.',
    },
    reference: ['def contar_mayores(lista, limite):\n    cuenta = 0\n    for x in lista:\n        if x > limite:\n            cuenta += 1\n    return cuenta\n\nassert contar_mayores([], 5) == 0, "lista vacía"\nassert contar_mayores([5, 6, 7], 5) == 2, "el límite no cuenta"\nassert contar_mayores([1, 2], 5) == 0, "ninguno mayor"\nprint("OK")'],
    wrongs: [
      { code: 'def contar_mayores(lista, limite):\n    cuenta = 1\n    for x in lista:\n        if x >= limite:\n            cuenta += 1\n    return cuenta\n\nassert contar_mayores([], 5) == 0, "lista vacía"\nassert contar_mayores([5, 6, 7], 5) == 2, "el límite no cuenta"\nassert contar_mayores([1, 2], 5) == 0, "ninguno mayor"\nprint("OK")', category: 'ejecucion' },
      { code: 'def contar_mayores(lista, limite):\n    cuenta = 0\n    for x in lista:\n        if x >= limite:\n            cuenta += 1\n    return cuenta\n\nassert contar_mayores([], 5) == 0, "lista vacía"\nassert contar_mayores([5, 6, 7], 5) == 2, "el límite no cuenta"\nassert contar_mayores([1, 2], 5) == 0, "ninguno mayor"\nprint("OK")', category: 'ejecucion' },
    ],
  },
  'dep-build': {
    id: 'dep-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La mediana sin sorpresas', difficulty: 3, xp: 35, concepts: ['depuracion', 'listas'],
    unlock: { any: ['dep-predict', 'dep-complete', 'dep-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'La **mediana** es el valor central de una lista ordenada. Si hay un número par de elementos, es la media de los dos centrales. Define `mediana(lista)` que:\n\n• devuelva la mediana sin modificar la lista original,\n\n• devuelva `None` si la lista está vacía.\n\nEjemplos: `[3, 1, 2]` → 2; `[4, 1, 3, 2]` → 2.5. Escribe tus propios asserts para los casos límite antes de comprobar.',
    expected: '2',
    plan: [
      {
        q: '¿Qué casos límite deberías probar?', multi: true,
        options: [
          { text: 'Lista vacía', correct: true },
          { text: 'Un solo elemento', correct: true },
          { text: 'Número par de elementos', correct: true },
          { text: 'Que la lista original no cambie', correct: true },
        ],
      },
      {
        q: 'Con 4 elementos ordenados, ¿qué posiciones son las centrales?',
        options: [
          { text: '1 y 2 (n // 2 − 1 y n // 2)', correct: true },
          { text: '2 y 3', why: 'Las posiciones empiezan en 0: con 4 elementos (0, 1, 2, 3) las centrales son 1 y 2.' },
        ],
      },
    ],
    planScaffold: 'def mediana(lista):\n    # caso vacío\n    # ordenar una copia\n    # impar: el central; par: media de los dos centrales\n    pass\n\n\nassert mediana([3, 1, 2]) == 2\nprint("ok")\n',
    starter: '',
    spec: {
      allow_short_names: ['n'],
      skip_tips: ['repeated_numbers'], // el 2 de la mitad y de par/impar es parte de la definición
      functions: [{ name: 'mediana', params: 1 }],
      cases: [
        { label: 'Impar: [3, 1, 2]', call: 'print(mediana([3, 1, 2]))', out_lines: ['2'] },
        { label: 'Par: [4, 1, 3, 2]', call: 'print(mediana([4, 1, 3, 2]))', out_lines: ['2.5'] },
        { label: 'Vacía', call: 'print(mediana([]))', out_lines: ['None'] },
        { label: 'Un solo elemento', call: 'print(mediana([7]))', out_lines: ['7'] },
        { label: 'La original no cambia', call: 'v = [3, 1, 2]\nmediana(v)\nprint(v)', out_lines: ['[3, 1, 2]'] },
      ],
      misconceptions: [
        { out_lines: ['1'], title: '¿Has ordenado?', msg: 'La mediana se calcula sobre la lista **ordenada**: usa sorted(lista).' },
        { out_lines: ['[1, 2, 3]'], title: 'Has modificado la original', msg: 'sort() cambia la lista que recibe la función. Usa sorted(), que devuelve una copia.' },
        { out_lines: ['3'], title: 'Revisa los centrales', msg: 'Con un número par de elementos, la mediana es la media de las posiciones n // 2 − 1 y n // 2.' },
      ],
      logic_msg: 'Comprueba los casos límite: vacía, un elemento y número par de elementos.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres pasos: el caso vacío, ordenar una copia y decidir entre par e impar.' },
      { level: 'Razonamiento', text: 'Con n elementos ordenados: si n es impar, el central está en n // 2; si es par, haz la media de n // 2 − 1 y n // 2.' },
      { level: 'Pseudocódigo', text: 'si la lista está vacía: devolver None\nv ← sorted(lista); n ← len(v); m ← n // 2\nsi n es impar: devolver v[m]\ndevolver (v[m − 1] + v[m]) / 2', pre: true },
      { level: 'Ayuda técnica', text: '`if not lista: return None`, `if n % 2 == 1: return v[m]` y `return (v[m - 1] + v[m]) / 2`.' },
    ],
    solution: {
      code: 'def mediana(lista):\n    """Devuelve la mediana de lista (None si está vacía), sin modificarla."""\n    if not lista:\n        return None\n    ordenada = sorted(lista)\n    n = len(ordenada)\n    mitad = n // 2\n    if n % 2 == 1:\n        return ordenada[mitad]\n    return (ordenada[mitad - 1] + ordenada[mitad]) / 2\n\nassert mediana([3, 1, 2]) == 2\nassert mediana([4, 1, 3, 2]) == 2.5\nassert mediana([]) is None\nassert mediana([7]) == 7\nprint("Todas las pruebas pasan")',
      explanation: 'Cada assert vigila un caso límite. Con ellos puedes cambiar la función más adelante con la tranquilidad de que, si rompes algo, lo sabrás al momento.',
    },
    reference: [
      'def mediana(lista):\n    if not lista:\n        return None\n    ordenada = sorted(lista)\n    n = len(ordenada)\n    mitad = n // 2\n    if n % 2 == 1:\n        return ordenada[mitad]\n    return (ordenada[mitad - 1] + ordenada[mitad]) / 2',
    ],
    wrongs: [
      { code: 'def mediana(lista):\n    if not lista:\n        return None\n    lista.sort()\n    n = len(lista)\n    mitad = n // 2\n    if n % 2 == 1:\n        return lista[mitad]\n    return (lista[mitad - 1] + lista[mitad]) / 2', category: 'comprension' },
      { code: 'def mediana(lista):\n    ordenada = sorted(lista)\n    n = len(ordenada)\n    mitad = n // 2\n    if n % 2 == 1:\n        return ordenada[mitad]\n    return (ordenada[mitad - 1] + ordenada[mitad]) / 2', category: 'ejecucion' },
    ],
  },
};
