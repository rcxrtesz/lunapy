// Lección 9.1 · Listas y operaciones. Contenido original, alineado con el cap. 9 de
// «Piensa en Python» (una lista es una secuencia, las listas son mutables, operaciones,
// porciones, métodos) y PE1 módulo 3 (listas).

const TOPIC = 'Listas';

export const LESSON_LISTAS = {
  id: 'listas',
  moduleId: 'm9',
  code: '9.1',
  title: 'Listas y operaciones',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Crear listas y acceder a sus elementos con índices y porciones',
    'Modificar elementos: a diferencia de los textos, las listas son mutables',
    'Añadir y quitar elementos con append, insert, remove y pop',
    'Ordenar con sort (modifica) y sorted (devuelve una nueva)',
    'Resumir una lista con len, sum, max, min e in',
  ],
  prerequisites: ['Módulo 8 «Cadenas de texto»'],
  teaser: 'Empiezas el Módulo 9: hasta ahora cada variable guardaba un dato. Una lista guarda muchos, en orden, y puede crecer o encoger.',
  celebration: 'Ya sabes crear, consultar, modificar y ordenar listas: la estructura de datos más usada en Python.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'crear', title: 'Muchos datos en una variable', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Una **lista** es una secuencia de valores entre corchetes, separados por comas. Como los textos, usa índices desde 0, índices negativos y porciones.' },
        { type: 'code', run: true, code: 'notas = [7.5, 9, 6, 8.25]\nnombres = ["Ana", "Luis", "Eva"]\nvacia = []\n\nprint(notas[0], notas[-1])\nprint(nombres[1:])\nprint(len(notas), len(vacia))\nprint("Eva" in nombres)' },
        { type: 'callout', tone: 'info', title: 'Pueden mezclar tipos', text: 'Una lista puede contener cualquier cosa, incluso otras listas: `[1, "dos", 3.0, [4, 5]]`. Lo habitual, eso sí, es que todos los elementos sean del mismo tipo.' },
        {
          type: 'check', id: 'm9l-indice', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'dias = ["lun", "mar", "mié", "jue", "vie"]\nprint(dias[2], dias[-2], len(dias))', answer: 'mié jue 5',
          explain: 'Posición 2: «mié». Penúltima: «jue». Cinco elementos.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mutable', title: 'Las listas sí se pueden cambiar', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'A diferencia de los textos, las listas son **mutables**: puedes cambiar un elemento asignándole un valor nuevo.' },
        { type: 'code', run: true, code: 'notas = [7.5, 9, 6]\nnotas[2] = 6.5\nprint(notas)\n\ntexto = "gato"\n# texto[0] = "p"  → TypeError: los textos no' },
        {
          type: 'check', id: 'm9l-mutable', concept: 'listas', mode: 'choice',
          question: '¿Qué mostrará?', code: 'colores = ["rojo", "verde", "azul"]\ncolores[-1] = "negro"\nprint(colores)', expectOutput: "['rojo', 'verde', 'negro']",
          options: [
            { text: "['rojo', 'verde', 'negro']", correct: true },
            { text: 'Un TypeError', why: 'Eso pasaría con un texto. Las listas son mutables: se puede cambiar un elemento.' },
            { text: "['rojo', 'verde', 'azul', 'negro']", why: 'Asignar a una posición **sustituye** el elemento; para añadir uno nuevo se usa append.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'metodos', title: 'Añadir y quitar', concepts: ['listas'],
      blocks: [
        {
          type: 'five', items: {
            'append(x)': 'Añade x al final.',
            'insert(i, x)': 'Inserta x en la posición i.',
            'remove(x)': 'Quita la primera aparición de x (error si no está).',
            'pop()': 'Quita y **devuelve** el último (o el de la posición que le digas).',
          },
        },
        { type: 'code', run: true, code: 'cesta = ["pan", "leche"]\ncesta.append("huevos")\ncesta.insert(0, "café")\nprint(cesta)\ncesta.remove("leche")\nultimo = cesta.pop()\nprint(cesta, "— he sacado:", ultimo)' },
        { type: 'p', text: 'También puedes unir listas con `+` y repetirlas con `*`, como los textos:' },
        { type: 'code', run: true, code: 'print([1, 2] + [3, 4])\nprint([0] * 5)' },
        {
          type: 'check', id: 'm9l-metodos', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'pila = [1, 2, 3]\npila.append(4)\npila.pop(0)\nprint(pila)', answer: '[2, 3, 4]',
          explain: 'append añade el 4 al final; pop(0) quita el de la posición 0 (el 1).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ordenar', title: 'sort y sorted', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Hay dos formas de ordenar, y la diferencia importa:' },
        {
          type: 'five', items: {
            'lista.sort()': '**Modifica** la lista y devuelve `None`.',
            'sorted(lista)': 'Devuelve una lista **nueva** ordenada y deja la original igual.',
          },
        },
        { type: 'code', run: true, code: 'tiempos = [12.5, 10.1, 11.8]\nordenados = sorted(tiempos)\nprint(ordenados, tiempos)\n\ntiempos.sort()\nprint(tiempos)\n\nprint(sorted(tiempos, reverse=True))' },
        { type: 'callout', tone: 'warn', title: 'Trampa clásica', text: '`x = lista.sort()` deja en x el valor `None`: sort ordena la lista, pero no devuelve nada.' },
        {
          type: 'check', id: 'm9l-sort', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'a = [3, 1, 2]\nb = a.sort()\nprint(a, b)', answer: '[1, 2, 3] None',
          explain: 'sort ordena a y devuelve None, que es lo que se guarda en b.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'resumir', title: 'Resumir una lista', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Funciones que ya conoces trabajan directamente con listas de números:' },
        { type: 'code', run: true, code: 'notas = [7.5, 9, 6, 8.25]\nprint("Suma:", sum(notas))\nprint("Máxima:", max(notas), "Mínima:", min(notas))\nprint("Media:", round(sum(notas) / len(notas), 2))\nprint("¿Hay un 9?", 9 in notas)\nprint("Posición del 6:", notas.index(6))' },
        {
          type: 'check', id: 'm9l-sum', concept: 'listas', mode: 'text',
          question: 'Predice:', code: 'v = [4, 8, 2, 6]\nprint(sum(v) / len(v), max(v) - min(v))', answer: '5.0 6',
          explain: '20 / 4 = 5.0 y 8 − 2 = 6.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'lis-predict' },
    { id: 'a2', activity: 'lis-complete' },
    { id: 'a3', activity: 'lis-fix' },
    { id: 'a4', activity: 'lis-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una lista guarda varios valores en orden: `[1, 2, 3]`. Índices, porciones, `len` e `in` funcionan como en los textos.',
    'Las listas son **mutables**: `lista[i] = nuevo` cambia un elemento.',
    '`append`, `insert`, `remove` y `pop` añaden y quitan elementos.',
    '`lista.sort()` ordena la lista y devuelve None; `sorted(lista)` devuelve una nueva.',
    '`sum`, `max`, `min` e `index` resumen y buscan en una lista.',
  ],
};

export const ACTIVITIES_LISTAS = {
  'lis-predict': {
    id: 'lis-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La cola del cine', difficulty: 2, xp: 10, concepts: ['listas'],
    prompt: 'La cola cambia: llega gente, alguien se cuela y alguien entra. **¿Qué mostrará?**',
    code: 'cola = ["Ana", "Luis"]\ncola.append("Eva")\ncola.insert(1, "Leo")\nprimero = cola.pop(0)\nprint(primero, cola, len(cola))',
    expectedOutput: "Ana ['Leo', 'Luis', 'Eva'] 3",
    options: [
      { text: "Ana ['Leo', 'Luis', 'Eva'] 3", correct: true },
      { text: "Eva ['Ana', 'Leo', 'Luis'] 3", concept: 'listas', why: 'pop(0) quita el de la posición 0 (Ana). Sin argumento quitaría el último.' },
      { text: "Ana ['Luis', 'Leo', 'Eva'] 3", concept: 'listas', why: 'insert(1, "Leo") pone a Leo en la posición 1, justo detrás de Ana, cuando Ana todavía estaba.' },
      { text: "Ana ['Leo', 'Luis', 'Eva'] 4", concept: 'listas', why: 'pop quita el elemento de la lista: quedan 3.' },
    ],
    explain: ['append → Ana, Luis, Eva.', 'insert(1, "Leo") → Ana, Leo, Luis, Eva.', 'pop(0) saca a Ana → Leo, Luis, Eva.'],
  },
  'lis-complete': {
    id: 'lis-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La cesta de la compra', difficulty: 1, xp: 15, concepts: ['listas'],
    statement: 'Completa el programa: añade el precio del queso (4.25 €) al final de la lista y muestra el **número de productos** y el **total**.',
    expected: '4 productos, total: 12.5',
    starter: 'precios = [2.5, 1.25, 4.5]\nprecios.___(4.25)\nprint(___(precios), "productos, total:", ___(precios))',
    spec: {
      blanks: true,
      cases: [{ label: 'Programa completo', out_lines: ['4 productos, total: 12.5'] }],
      rules: [{ type: 'must_call', name: 'sum', title: 'Calcúlalo con la lista', msg: 'Usa len() y sum() sobre la lista en lugar de escribir los números a mano.' }],
      misconceptions: [
        { out_lines: ['3 productos, total: 8.25'], title: 'Falta añadir el queso', msg: 'El primer hueco tiene que **añadir** 4.25 al final de la lista: `append`.' },
      ],
      logic_msg: 'Revisa los huecos: uno añade, otro cuenta y otro suma.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: un método que añade al final, una función que cuenta elementos y otra que los suma.' },
      { level: 'Razonamiento', text: '¿Qué método añade al final? ¿Qué función da la longitud? ¿Y la suma?' },
      { level: 'Pseudocódigo', text: 'añadir 4.25 al final de precios\nmostrar longitud de precios y suma de precios', pre: true },
      { level: 'Ayuda técnica', text: '`precios.append(4.25)`, `len(precios)` y `sum(precios)`.' },
    ],
    solution: {
      code: 'precios = [2.5, 1.25, 4.5]\nprecios.append(4.25)\nprint(len(precios), "productos, total:", sum(precios))',
      explanation: 'append modifica la lista añadiendo un elemento; len y sum la resumen sin cambiarla.',
    },
    reference: ['precios = [2.5, 1.25, 4.5]\nprecios.append(4.25)\nprint(len(precios), "productos, total:", sum(precios))'],
    wrongs: [
      { code: 'precios = [2.5, 1.25, 4.5]\nprecios.___(4.25)\nprint(___(precios), "productos, total:", ___(precios))', category: 'incompleto' },
      { code: 'precios = [2.5, 1.25, 4.5]\nprecios.append(4.25)\nprint(4, "productos, total:", 12.5)', category: 'logica' },
    ],
  },
  'lis-fix': {
    id: 'lis-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El ranking que desaparece', difficulty: 2, xp: 20, concepts: ['listas', 'errores'],
    statement: '`ranking(puntos)` debería devolver una lista **nueva** con las puntuaciones de mayor a menor, sin modificar la original. Ahora mismo devuelve `None` y además desordena la lista original. Corrígelo.',
    expected: '[90, 75, 60]\n[60, 90, 75]',
    starter: 'def ranking(puntos):\n    return puntos.sort(reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)',
    spec: {
      functions: [{ name: 'ranking', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['[90, 75, 60]', '[60, 90, 75]'] },
        { label: 'ranking([3, 1, 2])', call: 'print(ranking([3, 1, 2]))', out_lines: ['[3, 2, 1]'] },
      ],
      misconceptions: [
        { out_lines: ['None', '[90, 75, 60]'], title: 'sort devuelve None', msg: '`sort()` ordena la lista original y devuelve None. Usa `sorted(puntos, reverse=True)`, que devuelve una lista nueva.' },
        { out_lines: ['[90, 75, 60]', '[90, 75, 60]'], title: 'La original ha cambiado', msg: 'Ahora devuelve la lista correcta, pero la original también se ha ordenado. Usa sorted, que no la modifica.' },
      ],
      logic_msg: 'La función debe devolver la lista ordenada de mayor a menor y dejar la original como estaba.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: el primer print muestra None y el segundo, la lista ya ordenada. Las dos cosas vienen de sort().' },
      { level: 'Razonamiento', text: '¿Qué función ordena devolviendo una lista nueva, sin tocar la original?' },
      { level: 'Pseudocódigo', text: 'devolver una copia ordenada de puntos, de mayor a menor', pre: true },
      { level: 'Ayuda técnica', text: '`return sorted(puntos, reverse=True)`.' },
    ],
    solution: {
      code: 'def ranking(puntos):\n    return sorted(puntos, reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)',
      explanation: 'sorted crea una lista nueva ordenada y la devuelve; la original queda intacta. sort, en cambio, modifica la lista y devuelve None.',
    },
    reference: ['def ranking(puntos):\n    return sorted(puntos, reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)'],
    wrongs: [
      { code: 'def ranking(puntos):\n    return puntos.sort(reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)', category: 'comprension' },
      { code: 'def ranking(puntos):\n    puntos.sort(reverse=True)\n    return puntos\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)', category: 'comprension' },
    ],
  },
  'lis-build': {
    id: 'lis-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El podio', difficulty: 3, xp: 30, concepts: ['listas', 'retorno'],
    unlock: { any: ['lis-predict', 'lis-complete', 'lis-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'En una carrera gana quien hace **menos tiempo**. Define `podio(tiempos)` que devuelva una lista con los **3 mejores tiempos**, del mejor al peor, **sin modificar** la lista original. Si hay menos de 3 tiempos, devuelve todos ordenados.',
    expected: '[9.8, 10.2, 10.5]',
    plan: [
      {
        q: '¿Cómo obtienes los tiempos ordenados sin cambiar la lista original?',
        options: [
          { text: 'sorted(tiempos)', correct: true },
          { text: 'tiempos.sort()', why: 'sort modifica la lista original (y devuelve None).' },
        ],
      },
      {
        q: '¿Cómo te quedas con los 3 primeros?',
        options: [
          { text: 'Con la porción [:3]', correct: true },
          { text: 'Con [0], [1] y [2]', why: 'Si hay menos de 3 tiempos daría IndexError. La porción [:3] funciona con cualquier longitud.' },
        ],
      },
    ],
    planScaffold: 'def podio(tiempos):\n    # ordenar sin modificar y quedarse con los 3 primeros\n\n\nprint(podio([10.5, 12.0, 9.8, 10.2, 11.1]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'podio', params: 1 }],
      cases: [
        { label: 'Cinco tiempos', call: 'print(podio([10.5, 12.0, 9.8, 10.2, 11.1]))', out_lines: ['[9.8, 10.2, 10.5]'] },
        { label: 'Solo dos tiempos', call: 'print(podio([15.0, 14.2]))', out_lines: ['[14.2, 15.0]'] },
        { label: 'La original no cambia', call: 't = [3, 1, 2, 5]\npodio(t)\nprint(t)', out_lines: ['[3, 1, 2, 5]'] },
      ],
      misconceptions: [
        { out_lines: ['[12.0, 11.1, 10.5]'], title: 'Al revés', msg: 'Gana quien hace menos tiempo: ordena de menor a mayor (sin reverse).' },
        { out_lines: ['[1, 2, 3, 5]'], title: 'Has cambiado la original', msg: 'sort modifica la lista que recibe la función. Usa sorted, que crea una nueva.' },
      ],
      logic_msg: 'Comprueba con los cinco tiempos: el podio es 9.8, 10.2 y 10.5.',
    },
    hints: [
      { level: 'Orientación', text: 'Una línea basta: ordenar una copia y cortar.' },
      { level: 'Razonamiento', text: 'sorted devuelve una lista nueva; una porción [:3] se queda con los 3 primeros (o con menos si no hay tantos).' },
      { level: 'Pseudocódigo', text: 'devolver (tiempos ordenados de menor a mayor)[:3]', pre: true },
      { level: 'Ayuda técnica', text: '`return sorted(tiempos)[:3]`.' },
    ],
    solution: {
      code: 'def podio(tiempos):\n    """Devuelve los 3 mejores (menores) tiempos, sin modificar la lista."""\n    return sorted(tiempos)[:3]\n\nprint(podio([10.5, 12.0, 9.8, 10.2, 11.1]))',
      explanation: 'sorted crea una copia ordenada y la porción [:3] se queda con los tres primeros. Con menos de tres elementos, la porción simplemente devuelve los que haya.',
    },
    reference: ['def podio(tiempos):\n    return sorted(tiempos)[:3]'],
    wrongs: [
      { code: 'def podio(tiempos):\n    tiempos.sort()\n    return tiempos[:3]', category: 'comprension' },
      { code: 'def podio(tiempos):\n    return sorted(tiempos, reverse=True)[:3]', category: 'comprension' },
      { code: 'def podio(tiempos):\n    t = sorted(tiempos)\n    return [t[0], t[1], t[2]]', category: 'ejecucion' },
    ],
  },
};
