// Lección 9.3 · Mutabilidad y alias. Contenido original, alineado con el cap. 9 de
// «Piensa en Python» (objetos y valores, alias, argumentos de tipo lista) y PE1
// módulo 3 (copiar listas).

const TOPIC = 'Listas';

export const LESSON_ALIAS = {
  id: 'alias',
  moduleId: 'm9',
  code: '9.3',
  title: 'Mutabilidad y alias',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Explicar qué es un alias: dos nombres para la misma lista',
    'Copiar una lista cuando necesitas una independiente',
    'Distinguir == (mismo contenido) de is (mismo objeto)',
    'Predecir qué pasa cuando una función recibe una lista',
    'Decidir entre modificar la lista recibida o devolver una nueva',
  ],
  prerequisites: ['Lección 9.2 «Recorrer listas»'],
  teaser: 'En la lección 2.1 viste que b = a copia el valor. Con listas hay una sorpresa: las dos variables pueden acabar compartiendo la misma lista.',
  celebration: 'Has completado el Módulo 9: sabes trabajar con listas sin llevarte sustos con los alias.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'alias', title: 'Dos nombres, una lista', concepts: ['alias'],
      blocks: [
        { type: 'p', text: 'Con números y textos, `b = a` y después cambiar `a` no afecta a `b`. Con listas, `b = a` **no copia la lista**: hace que `b` sea **otro nombre** para la misma lista. Es un **alias**.' },
        { type: 'code', run: true, code: 'a = [1, 2, 3]\nb = a          # alias: la misma lista\nb.append(4)\nprint(a)\nprint(b)' },
        { type: 'callout', tone: 'info', title: '¿Por qué con números no pasa?', text: 'Los números y los textos son inmutables: «cambiarlos» siempre crea un valor nuevo. Las listas se pueden modificar en el sitio, así que todos sus nombres ven el cambio.' },
        {
          type: 'check', id: 'm9a-alias', concept: 'alias', mode: 'choice',
          question: '¿Qué mostrará?', code: 'original = ["x", "y"]\notra = original\notra[0] = "z"\nprint(original)', expectOutput: "['z', 'y']",
          options: [
            { text: "['z', 'y']", correct: true },
            { text: "['x', 'y']", why: 'otra no es una copia: es otro nombre para la misma lista.' },
          ],
          explain: 'otra es un alias de original: modificar un elemento a través de un nombre se ve desde el otro.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'copiar', title: 'Hacer una copia de verdad', concepts: ['alias'],
      blocks: [
        { type: 'p', text: 'Si necesitas una lista independiente, cópiala. Hay tres formas equivalentes:' },
        { type: 'code', run: true, code: 'a = [1, 2, 3]\nb = a.copy()      # o list(a), o a[:]\nb.append(4)\nprint(a)\nprint(b)' },
        {
          type: 'check', id: 'm9a-copia', concept: 'alias', mode: 'choice',
          question: '¿Qué mostrará?', code: 'a = [5, 6]\nb = a[:]\nb[0] = 99\nprint(a, b)', expectOutput: '[5, 6] [99, 6]',
          options: [
            { text: '[5, 6] [99, 6]', correct: true },
            { text: '[99, 6] [99, 6]', why: 'a[:] crea una lista nueva con los mismos elementos: cambiar b no afecta a a.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'is', title: '== frente a is', concepts: ['alias'],
      blocks: [
        { type: 'p', text: '`==` pregunta si dos listas tienen el **mismo contenido**. `is` pregunta si son **la misma lista** (el mismo objeto en memoria).' },
        { type: 'code', run: true, code: 'a = [1, 2]\nb = a\nc = [1, 2]\nprint(a == b, a is b)   # mismo contenido, misma lista\nprint(a == c, a is c)   # mismo contenido, listas distintas' },
        {
          type: 'check', id: 'm9a-is', concept: 'alias', mode: 'text',
          question: 'Predice:', code: 'x = [0]\ny = x.copy()\nprint(x == y, x is y)', answer: 'True False',
          explain: 'La copia tiene el mismo contenido, pero es otra lista.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Listas que entran en funciones', concepts: ['alias', 'parametros'],
      blocks: [
        { type: 'p', text: 'Cuando pasas una lista a una función, el parámetro es un **alias** de la lista original. Si la función la modifica, el cambio se ve fuera:' },
        { type: 'code', run: true, code: 'def anadir_iva(precios):\n    for i in range(len(precios)):\n        precios[i] = round(precios[i] * 1.21, 2)\n\ncesta = [10, 20]\nanadir_iva(cesta)\nprint(cesta)' },
        {
          type: 'five', items: {
            'Modificar en el sitio': 'La función cambia la lista recibida y no devuelve nada (como `sort`). Útil con listas enormes.',
            'Devolver una nueva': 'La función crea otra lista y la devuelve (como `sorted`). Más segura: no hay efectos inesperados.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Decide y documenta', text: 'Si una función modifica la lista que recibe, dilo en el docstring. Si no es necesario modificarla, devuelve una nueva.' },
        {
          type: 'check', id: 'm9a-funcion', concept: 'alias', mode: 'text',
          question: 'Predice:', code: 'def vaciar(lista):\n    lista.clear()\n\nmis_datos = [1, 2, 3]\nvaciar(mis_datos)\nprint(mis_datos)', answer: '[]',
          explain: 'lista es un alias de mis_datos: clear() vacía la lista original.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'ali-predict' },
    { id: 'a2', activity: 'ali-complete' },
    { id: 'a3', activity: 'ali-fix' },
    { id: 'a4', activity: 'ali-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Con listas, `b = a` crea un **alias**: dos nombres para la misma lista.',
    'Para una lista independiente: `a.copy()`, `list(a)` o `a[:]`.',
    '`==` compara el contenido; `is` comprueba si es el mismo objeto.',
    'Un parámetro que recibe una lista es un alias: si la función la modifica, se ve fuera.',
    'Elige y documenta: modificar en el sitio (como sort) o devolver una nueva (como sorted).',
  ],
};

export const ACTIVITIES_ALIAS = {
  'ali-predict': {
    id: 'ali-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Alias y copias', difficulty: 3, xp: 15, concepts: ['alias'],
    prompt: 'Una lista, un alias y una copia. **¿Qué mostrará?**',
    code: 'a = [1, 2]\nb = a\nc = a.copy()\nb.append(3)\nc.append(4)\nprint(a, b, c)',
    expectedOutput: '[1, 2, 3] [1, 2, 3] [1, 2, 4]',
    options: [
      { text: '[1, 2, 3] [1, 2, 3] [1, 2, 4]', correct: true },
      { text: '[1, 2] [1, 2, 3] [1, 2, 4]', concept: 'alias', why: 'b es un alias de a: añadir a b es añadir a a.' },
      { text: '[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4]', concept: 'alias', why: 'c es una copia independiente: lo que se añade a c no afecta a a ni a b.' },
      { text: '[1, 2, 3] [1, 2, 3] [1, 2, 3, 4]', concept: 'alias', why: 'c se copió antes de añadir el 3: solo tiene 1, 2 y después el 4.' },
    ],
    explain: ['b es la misma lista que a; c es una copia de [1, 2].', 'b.append(3) cambia la lista compartida: a y b son [1, 2, 3].', 'c.append(4) solo cambia la copia: [1, 2, 4].'],
  },
  'ali-complete': {
    id: 'ali-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La copia de seguridad', difficulty: 2, xp: 15, concepts: ['alias'],
    statement: 'Antes de modificar la lista de tareas, el programa guarda una **copia de seguridad**. Completa el hueco para que la copia no cambie cuando se modifica la lista.',
    expected: "['estudiar', 'comprar', 'correr']\n['estudiar', 'comprar']",
    starter: 'tareas = ["estudiar", "comprar"]\nseguridad = ___\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)',
    spec: {
      blanks: true,
      cases: [{ label: 'Programa completo', out_lines: ["['estudiar', 'comprar', 'correr']", "['estudiar', 'comprar']"] }],
      misconceptions: [
        { out_lines: ["['estudiar', 'comprar', 'correr']", "['estudiar', 'comprar', 'correr']"], title: 'Es un alias', msg: '`seguridad = tareas` no copia: crea otro nombre para la misma lista. Usa `tareas.copy()`.' },
      ],
      logic_msg: 'La copia de seguridad debe conservar las dos tareas originales.',
    },
    hints: [
      { level: 'Orientación', text: 'Un solo hueco: crear una copia independiente de tareas.' },
      { level: 'Razonamiento', text: '`seguridad = tareas` sería un alias. ¿Qué método crea una copia?' },
      { level: 'Pseudocódigo', text: 'seguridad ← copia de tareas', pre: true },
      { level: 'Ayuda técnica', text: '`tareas.copy()` (o `list(tareas)`, o `tareas[:]`).' },
    ],
    solution: {
      code: 'tareas = ["estudiar", "comprar"]\nseguridad = tareas.copy()\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)',
      explanation: 'copy() crea una lista nueva con los mismos elementos. A partir de ahí, cada una cambia por su cuenta.',
    },
    reference: [
      'tareas = ["estudiar", "comprar"]\nseguridad = tareas.copy()\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)',
      'tareas = ["estudiar", "comprar"]\nseguridad = tareas[:]\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)',
    ],
    wrongs: [
      { code: 'tareas = ["estudiar", "comprar"]\nseguridad = ___\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)', category: 'incompleto' },
      { code: 'tareas = ["estudiar", "comprar"]\nseguridad = tareas\ntareas.append("correr")\nprint(tareas)\nprint(seguridad)', category: 'comprension' },
    ],
  },
  'ali-fix': {
    id: 'ali-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El efecto secundario', difficulty: 3, xp: 25, concepts: ['alias', 'parametros'],
    statement: '`con_bonus(notas)` debería devolver una lista nueva con un punto más en cada nota, **sin tocar** la lista original. Pero después de llamarla, las notas originales también han cambiado. Corrígelo.',
    expected: '[6, 8]\n[5, 7]',
    starter: 'def con_bonus(notas):\n    resultado = notas\n    for i in range(len(resultado)):\n        resultado[i] += 1\n    return resultado\n\nmis_notas = [5, 7]\nprint(con_bonus(mis_notas))\nprint(mis_notas)',
    spec: {
      functions: [{ name: 'con_bonus', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['[6, 8]', '[5, 7]'] },
        { label: 'con_bonus([0])', call: 'print(con_bonus([0]))', out_lines: ['[1]'] },
      ],
      misconceptions: [
        { out_lines: ['[6, 8]', '[6, 8]'], title: 'resultado es un alias', msg: '`resultado = notas` no copia la lista: la función modifica la original. Haz `resultado = notas.copy()` o construye una lista nueva.' },
      ],
      logic_msg: 'La función debe devolver [6, 8] y dejar mis_notas como [5, 7].',
    },
    hints: [
      { level: 'Orientación', text: 'El problema está en la primera línea de la función. ¿Qué hace `resultado = notas` con una lista?' },
      { level: 'Razonamiento', text: 'notas ya es un alias de mis_notas, y resultado otro alias más. ¿Cómo consigues una lista independiente?' },
      { level: 'Pseudocódigo', text: 'resultado ← copia de notas\nsumar 1 a cada elemento de resultado\ndevolver resultado', pre: true },
      { level: 'Ayuda técnica', text: '`resultado = notas.copy()`, o directamente `return [n + 1 for n in notas]`.' },
    ],
    solution: {
      code: 'def con_bonus(notas):\n    resultado = notas.copy()\n    for i in range(len(resultado)):\n        resultado[i] += 1\n    return resultado\n\nmis_notas = [5, 7]\nprint(con_bonus(mis_notas))\nprint(mis_notas)',
      explanation: 'El parámetro ya es un alias de la lista de fuera; asignarlo a otra variable crea un alias más. Con copy() la función trabaja sobre su propia lista.',
    },
    reference: [
      'def con_bonus(notas):\n    resultado = notas.copy()\n    for i in range(len(resultado)):\n        resultado[i] += 1\n    return resultado\n\nmis_notas = [5, 7]\nprint(con_bonus(mis_notas))\nprint(mis_notas)',
      'def con_bonus(notas):\n    return [n + 1 for n in notas]\n\nmis_notas = [5, 7]\nprint(con_bonus(mis_notas))\nprint(mis_notas)',
    ],
    wrongs: [
      { code: 'def con_bonus(notas):\n    resultado = notas\n    for i in range(len(resultado)):\n        resultado[i] += 1\n    return resultado\n\nmis_notas = [5, 7]\nprint(con_bonus(mis_notas))\nprint(mis_notas)', category: 'comprension' },
    ],
  },
  'ali-build': {
    id: 'ali-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Dos formas de rotar', difficulty: 3, xp: 30, concepts: ['alias', 'listas', 'diseno'],
    unlock: { any: ['ali-predict', 'ali-complete', 'ali-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define dos funciones que **rotan** una lista pasando el primer elemento al final:\n\n• `rotada(lista)` **devuelve una lista nueva** rotada y no toca la original.\n\n• `rotar(lista)` **modifica** la lista que recibe y no devuelve nada.\n\nEjemplo: con [1, 2, 3], la versión rotada es [2, 3, 1]. Si la lista está vacía, no hace nada.',
    expected: '[2, 3, 1]',
    plan: [
      {
        q: '¿Cómo construyes la lista rotada sin modificar la original?',
        options: [
          { text: 'lista[1:] + lista[:1]', correct: true },
          { text: 'lista.append(lista.pop(0))', why: 'Eso modifica la lista original: sirve para rotar, pero no para rotada.' },
        ],
      },
      {
        q: '¿Y para modificarla en el sitio?',
        options: [
          { text: 'Sacar el primero con pop(0) y añadirlo con append', correct: true },
          { text: 'lista = lista[1:] + lista[:1]', why: 'Asignar al parámetro crea una lista nueva solo dentro de la función: la de fuera no cambia.' },
        ],
      },
    ],
    planScaffold: 'def rotada(lista):\n    # devolver una lista nueva\n\n\ndef rotar(lista):\n    # modificar la lista recibida\n\n\nprint(rotada([1, 2, 3]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'rotada', params: 1 }, { name: 'rotar', params: 1 }],
      cases: [
        { label: 'rotada([1, 2, 3])', call: 'v = [1, 2, 3]\nprint(rotada(v), v)', out_lines: ['[2, 3, 1] [1, 2, 3]'] },
        { label: 'rotar([1, 2, 3])', call: 'v = [1, 2, 3]\nr = rotar(v)\nprint(v, r)', out_lines: ['[2, 3, 1] None'] },
        { label: 'rotada([])', call: 'print(rotada([]))', out_lines: ['[]'] },
        { label: 'rotar([])', call: 'v = []\nrotar(v)\nprint(v)', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['[2, 3, 1] [2, 3, 1]'], title: 'rotada modifica la original', msg: 'rotada no debe cambiar la lista que recibe. Construye una nueva con porciones: `lista[1:] + lista[:1]`.' },
        { out_lines: ['[1, 2, 3] None'], title: 'rotar no modifica la lista', msg: 'Asignar al parámetro (`lista = …`) no cambia la lista de fuera. Modifícala con sus métodos: `lista.append(lista.pop(0))`.' },
      ],
      logic_msg: 'Comprueba los dos comportamientos: rotada devuelve una lista nueva; rotar cambia la original y devuelve None.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos funciones con el mismo resultado visible pero distinta interfaz: una devuelve, la otra modifica.' },
      { level: 'Razonamiento', text: 'Para rotada usa porciones (crean listas nuevas). Para rotar, métodos que modifican: pop y append. Ojo con la lista vacía: pop(0) daría error.' },
      { level: 'Pseudocódigo', text: 'rotada: devolver (lista sin el primero) + (el primero)\nrotar: si la lista no está vacía:\n    quitar el primero y añadirlo al final', pre: true },
      { level: 'Ayuda técnica', text: '`return lista[1:] + lista[:1]` y `if lista: lista.append(lista.pop(0))`.' },
    ],
    solution: {
      code: 'def rotada(lista):\n    """Devuelve una lista nueva con el primer elemento al final."""\n    return lista[1:] + lista[:1]\n\ndef rotar(lista):\n    """Pasa el primer elemento al final, modificando la lista."""\n    if lista:\n        lista.append(lista.pop(0))\n\nprint(rotada([1, 2, 3]))',
      explanation: 'Las porciones crean listas nuevas, así que rotada no toca la original. rotar usa métodos que modifican la lista recibida (un alias de la de fuera). Con una lista vacía, `lista[:1]` es [] y el if evita el error de pop.',
    },
    reference: [
      'def rotada(lista):\n    return lista[1:] + lista[:1]\n\ndef rotar(lista):\n    if lista:\n        lista.append(lista.pop(0))',
    ],
    wrongs: [
      { code: 'def rotada(lista):\n    lista.append(lista.pop(0))\n    return lista\n\ndef rotar(lista):\n    if lista:\n        lista.append(lista.pop(0))', category: 'comprension' },
      { code: 'def rotada(lista):\n    return lista[1:] + lista[:1]\n\ndef rotar(lista):\n    lista = lista[1:] + lista[:1]', category: 'comprension' },
    ],
  },
};
