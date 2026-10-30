// Lección 10.1 · Diccionarios. Contenido original, alineado con el cap. 10 de
// «Piensa en Python» (un diccionario es una correspondencia, contar con un
// diccionario, recorrer, get) y PE1 módulo 4 (diccionarios).

const TOPIC = 'Diccionarios';

export const LESSON_DICCIONARIOS = {
  id: 'diccionarios',
  moduleId: 'm10',
  code: '10.1',
  title: 'Diccionarios',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Guardar parejas clave → valor en un diccionario',
    'Consultar, añadir, modificar y borrar entradas',
    'Evitar el KeyError con in y con get',
    'Recorrer claves, valores y parejas',
    'Contar apariciones con un diccionario',
  ],
  prerequisites: ['Módulo 9 «Listas»'],
  teaser: 'Empiezas el Módulo 10: una lista encuentra los datos por posición; un diccionario, por nombre. Como una agenda.',
  celebration: 'Ya sabes usar diccionarios: buscar por clave, recorrerlos y contar con ellos, una técnica que usarás constantemente.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'crear', title: 'Buscar por nombre, no por posición', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'Un **diccionario** guarda parejas **clave → valor**. En lugar de `lista[2]`, accedes con la clave: `edades["Ana"]`. Se escribe entre llaves:' },
        { type: 'code', run: true, code: 'edades = {"Ana": 19, "Luis": 22, "Eva": 20}\nprint(edades["Luis"])\nprint(len(edades))\nprint(edades)' },
        {
          type: 'five', items: {
            'Clave': 'Lo que usas para buscar. Suele ser un texto o un número, y no se repite.',
            'Valor': 'Lo que guardas con esa clave. Puede ser cualquier cosa, incluso una lista.',
            'Orden': 'Se conserva el orden en que se añadieron las claves.',
          },
        },
        {
          type: 'check', id: 'm10d-acceso', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'precios = {"pan": 1.2, "leche": 0.9, "café": 4.5}\nprint(precios["café"] - precios["pan"])', answer: '3.3',
          explain: '4.5 − 1.2 = 3.3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Añadir, modificar y borrar', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'Asignar a una clave **nueva** la añade; asignar a una clave que **ya existe** sustituye su valor. `del` la borra.' },
        { type: 'code', run: true, code: 'stock = {"manzanas": 10}\nstock["peras"] = 4        # nueva\nstock["manzanas"] -= 3    # modificar\nprint(stock)\ndel stock["peras"]\nprint(stock)' },
        {
          type: 'check', id: 'm10d-modificar', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'd = {"a": 1}\nd["b"] = 2\nd["a"] = 5\nprint(d)', answer: "{'a': 5, 'b': 2}",
          explain: '"b" se añade; "a" ya existía, así que su valor pasa a ser 5 (y conserva su posición).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'keyerror', title: 'Claves que no existen', concepts: ['diccionarios', 'errores'],
      blocks: [
        { type: 'p', text: 'Pedir una clave que no existe produce un **KeyError**. Dos formas de evitarlo:' },
        { type: 'code', run: true, code: 'telefonos = {"Ana": "600111222"}\nprint("Luis" in telefonos)                 # ¿existe la clave?\nprint(telefonos.get("Luis"))               # None si no existe\nprint(telefonos.get("Luis", "desconocido"))  # o el valor que elijas\nprint(telefonos["Luis"])                   # KeyError' },
        { type: 'callout', tone: 'info', title: 'in mira las claves', text: '`"Ana" in telefonos` pregunta por las **claves**, no por los valores. Para buscar en los valores: `"600111222" in telefonos.values()`.' },
        {
          type: 'check', id: 'm10d-get', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'notas = {"Ana": 8}\nprint(notas.get("Ana", 0), notas.get("Leo", 0))', answer: '8 0',
          explain: '"Ana" existe: 8. "Leo" no: get devuelve el valor por defecto, 0.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'recorrer', title: 'Recorrer un diccionario', concepts: ['diccionarios', 'bucles'],
      blocks: [
        { type: 'p', text: '`for clave in dic` recorre las claves. Para recorrer los valores, `dic.values()`; para las dos cosas a la vez, `dic.items()`:' },
        { type: 'code', run: true, code: 'notas = {"Ana": 8, "Luis": 6.5, "Eva": 9}\nfor nombre in notas:\n    print(nombre)\nprint(sum(notas.values()) / len(notas))\nfor nombre, nota in notas.items():\n    print(f"{nombre}: {nota}")' },
        {
          type: 'check', id: 'm10d-items', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'd = {"x": 3, "y": 5}\ntotal = 0\nfor k, v in d.items():\n    total += v\nprint(total)', answer: '8',
          explain: 'Se suman los valores: 3 + 5.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'contar', title: 'Contar con un diccionario', concepts: ['diccionarios', 'bucles'],
      blocks: [
        { type: 'p', text: 'El uso estrella: contar cuántas veces aparece cada cosa. Cada elemento es una clave y su valor, el contador. `get(x, 0)` resuelve la primera vez que aparece:' },
        { type: 'code', run: true, code: 'votos = ["sí", "no", "sí", "sí", "abstención", "no"]\nrecuento = {}\nfor v in votos:\n    recuento[v] = recuento.get(v, 0) + 1\nprint(recuento)' },
        { type: 'p', text: 'Mira cómo crece el diccionario paso a paso:' },
        { type: 'trace', code: 'recuento = {}\nfor letra in "ana":\n    recuento[letra] = recuento.get(letra, 0) + 1\nprint(recuento)' },
        {
          type: 'check', id: 'm10d-contar', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'c = {}\nfor x in [2, 3, 2, 2]:\n    c[x] = c.get(x, 0) + 1\nprint(c)', answer: '{2: 3, 3: 1}',
          explain: 'El 2 aparece tres veces y el 3, una.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'dic-predict' },
    { id: 'a2', activity: 'dic-complete' },
    { id: 'a3', activity: 'dic-fix' },
    { id: 'a4', activity: 'dic-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un diccionario guarda parejas clave → valor: `{"Ana": 19}`. Se accede con `dic[clave]`.',
    'Asignar a una clave nueva la añade; a una existente, la modifica. `del dic[clave]` la borra.',
    'Una clave inexistente da **KeyError**: compruébala con `in` o usa `dic.get(clave, defecto)`.',
    'Recorre claves con `for k in dic`, valores con `.values()` y parejas con `.items()`.',
    'Contar: `recuento[x] = recuento.get(x, 0) + 1`.',
  ],
};

export const ACTIVITIES_DICCIONARIOS = {
  'dic-predict': {
    id: 'dic-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El inventario', difficulty: 2, xp: 10, concepts: ['diccionarios'],
    prompt: 'Un inventario que cambia durante el día. **¿Qué mostrará?**',
    code: 'inventario = {"lápices": 20, "gomas": 5}\ninventario["lápices"] -= 8\ninventario["reglas"] = 3\nprint(inventario.get("gomas", 0), inventario.get("tijeras", 0), len(inventario))',
    expectedOutput: '5 0 3',
    options: [
      { text: '5 0 3', correct: true },
      { text: '5 None 3', concept: 'diccionarios', why: 'get con un segundo argumento devuelve ese valor (0) cuando la clave no existe.' },
      { text: '5 0 2', concept: 'diccionarios', why: '"reglas" es una clave nueva: se añade y ahora hay tres.' },
      { text: 'Un KeyError por "tijeras"', concept: 'diccionarios', why: 'get nunca da KeyError: es justo para eso.' },
    ],
    explain: ['lápices pasa a 12 y se añade reglas.', 'get("gomas", 0) → 5; get("tijeras", 0) → 0.', 'Claves: lápices, gomas y reglas → 3.'],
  },
  'dic-complete': {
    id: 'dic-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La agenda', difficulty: 1, xp: 15, concepts: ['diccionarios'],
    statement: 'Completa `buscar(agenda, nombre)` para que devuelva el teléfono de esa persona, o `"No está en la agenda"` si no existe, **sin dar error**.',
    expected: '600111222\nNo está en la agenda',
    starter: 'def buscar(agenda, nombre):\n    return agenda.___(nombre, ___)\n\nagenda = {"Ana": "600111222", "Luis": "611333444"}\nprint(buscar(agenda, "Ana"))\nprint(buscar(agenda, "Eva"))',
    spec: {
      blanks: true,
      functions: [{ name: 'buscar', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['600111222', 'No está en la agenda'] },
        { label: 'Agenda vacía', call: 'print(buscar({}, "Ana"))', out_lines: ['No está en la agenda'] },
      ],
      logic_msg: 'Si la persona no está, la función debe devolver exactamente "No está en la agenda".',
    },
    hints: [
      { level: 'Orientación', text: 'Un método que busca una clave y admite un valor por defecto.' },
      { level: 'Razonamiento', text: 'get(clave, defecto) devuelve el valor si la clave existe, y el defecto si no.' },
      { level: 'Pseudocódigo', text: 'devolver el valor de nombre en agenda, o "No está en la agenda"', pre: true },
      { level: 'Ayuda técnica', text: '`agenda.get(nombre, "No está en la agenda")`.' },
    ],
    solution: {
      code: 'def buscar(agenda, nombre):\n    return agenda.get(nombre, "No está en la agenda")\n\nagenda = {"Ana": "600111222", "Luis": "611333444"}\nprint(buscar(agenda, "Ana"))\nprint(buscar(agenda, "Eva"))',
      explanation: 'get resuelve en una línea lo que necesitaría un if con in: si la clave existe devuelve su valor; si no, el valor por defecto.',
    },
    reference: ['def buscar(agenda, nombre):\n    return agenda.get(nombre, "No está en la agenda")\n\nagenda = {"Ana": "600111222", "Luis": "611333444"}\nprint(buscar(agenda, "Ana"))\nprint(buscar(agenda, "Eva"))'],
    wrongs: [
      { code: 'def buscar(agenda, nombre):\n    return agenda.___(nombre, ___)\n\nagenda = {"Ana": "600111222"}\nprint(buscar(agenda, "Ana"))', category: 'incompleto' },
      { code: 'def buscar(agenda, nombre):\n    return agenda[nombre]\n\nagenda = {"Ana": "600111222", "Luis": "611333444"}\nprint(buscar(agenda, "Ana"))\nprint(buscar(agenda, "Eva"))', category: 'ejecucion' },
    ],
  },
  'dic-fix': {
    id: 'dic-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El recuento que falla', difficulty: 2, xp: 20, concepts: ['diccionarios', 'errores'],
    statement: '`contar_colores(lista)` debería devolver cuántas veces aparece cada color, pero da un **KeyError** en cuanto encuentra un color por primera vez. Corrígelo.',
    expected: "{'rojo': 2, 'azul': 1}",
    starter: 'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        recuento[color] = recuento[color] + 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))',
    spec: {
      functions: [{ name: 'contar_colores', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ["{'rojo': 2, 'azul': 1}"] },
        { label: 'Lista vacía', call: 'print(contar_colores([]))', out_lines: ['{}'] },
        { label: 'Un solo color', call: 'print(contar_colores(["verde"] * 3))', out_lines: ["{'verde': 3}"] },
      ],
      logic_msg: 'Cada color debe aparecer con el número de veces que está en la lista.',
    },
    hints: [
      { level: 'Orientación', text: 'La primera vez que aparece "rojo", ¿existe ya la clave "rojo" en el diccionario?' },
      { level: 'Razonamiento', text: 'Necesitas un valor por defecto para cuando la clave todavía no existe. ¿Qué método lo permite?' },
      { level: 'Pseudocódigo', text: 'recuento[color] ← (valor actual o 0 si no existe) + 1', pre: true },
      { level: 'Ayuda técnica', text: '`recuento[color] = recuento.get(color, 0) + 1`.' },
    ],
    solution: {
      code: 'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        recuento[color] = recuento.get(color, 0) + 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))',
      explanation: 'La primera vez que aparece un color, su clave no existe: `recuento[color]` da KeyError. `get(color, 0)` devuelve 0 en ese caso, y a partir de ahí el valor guardado.',
    },
    reference: [
      'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        recuento[color] = recuento.get(color, 0) + 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))',
      'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        if color in recuento:\n            recuento[color] += 1\n        else:\n            recuento[color] = 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))',
    ],
    wrongs: [
      { code: 'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        recuento[color] = recuento[color] + 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))', category: 'ejecucion' },
      { code: 'def contar_colores(lista):\n    recuento = {}\n    for color in lista:\n        recuento[color] = 1\n    return recuento\n\nprint(contar_colores(["rojo", "azul", "rojo"]))', category: 'logica' },
    ],
  },
  'dic-build': {
    id: 'dic-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La letra más frecuente', difficulty: 3, xp: 30, concepts: ['diccionarios', 'busqueda'],
    unlock: { any: ['dic-predict', 'dic-complete', 'dic-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `mas_frecuente(texto)` que devuelva la **letra** que más veces aparece en el texto (ignorando espacios). Si hay empate, la que aparezca **primero** en el texto.\n\nEjemplos: `mas_frecuente("banana")` → "a"; `mas_frecuente("hola mundo")` → "o".',
    expected: 'a',
    plan: [
      {
        q: '¿Qué dos pasos necesitas?',
        options: [
          { text: 'Contar cada letra con un diccionario y después buscar la de mayor recuento', correct: true },
          { text: 'Ordenar el texto alfabéticamente', why: 'Ordenar no cuenta: necesitas saber cuántas veces aparece cada letra.' },
        ],
      },
      {
        q: 'Para respetar el empate («la que aparece primero»), ¿cómo comparas?',
        options: [
          { text: 'Solo cambias de candidata si el recuento es estrictamente mayor (>)', correct: true },
          { text: 'Cambias si es mayor o igual (>=)', why: 'Con >= una letra posterior empatada sustituiría a la primera.' },
        ],
      },
    ],
    planScaffold: 'def mas_frecuente(texto):\n    # 1. Contar cada letra (sin espacios)\n    # 2. Buscar la de mayor recuento\n\n\nprint(mas_frecuente("banana"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'mas_frecuente', params: 1 }],
      cases: [
        { label: '"banana"', call: 'print(mas_frecuente("banana"))', out_lines: ['a'] },
        { label: '"hola mundo"', call: 'print(mas_frecuente("hola mundo"))', out_lines: ['o'] },
        { label: 'Empate: "abab"', call: 'print(mas_frecuente("abab"))', out_lines: ['a'] },
        { label: 'Espacios: "a  b  b"', call: 'print(mas_frecuente("a  b  b"))', out_lines: ['b'] },
      ],
      misconceptions: [
        { out_lines: ['b'], title: 'Empates', msg: 'Con empate debe ganar la primera letra. Cambia de candidata solo si el recuento es estrictamente mayor (`>`).' },
        { out_lines: [''], title: 'Cuidado con los espacios', msg: 'Los espacios no cuentan: sáltalos al contar (por ejemplo, `if letra != " ":`).' },
      ],
      logic_msg: 'Comprueba con "hola mundo": la «o» aparece dos veces y ninguna otra letra más.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos bucles: uno para contar, otro para buscar el máximo.' },
      { level: 'Razonamiento', text: 'Contar: patrón get(x, 0) + 1, saltando espacios. Buscar: guarda la mejor hasta ahora y cámbiala solo si encuentras un recuento mayor. Como el diccionario conserva el orden de aparición, los empates se resuelven solos.' },
      { level: 'Pseudocódigo', text: 'recuento ← {}\npara cada letra (que no sea espacio): sumar 1\nmejor ← None\npara cada letra, veces en recuento:\n    si mejor es None o veces > recuento[mejor]: mejor ← letra\ndevolver mejor', pre: true },
      { level: 'Ayuda técnica', text: '`for letra, veces in recuento.items():` y `if mejor is None or veces > recuento[mejor]:`.' },
    ],
    solution: {
      code: 'def mas_frecuente(texto):\n    """Devuelve la letra más frecuente (la primera en caso de empate)."""\n    recuento = {}\n    for letra in texto:\n        if letra != " ":\n            recuento[letra] = recuento.get(letra, 0) + 1\n    mejor = None\n    for letra, veces in recuento.items():\n        if mejor is None or veces > recuento[mejor]:\n            mejor = letra\n    return mejor\n\nprint(mas_frecuente("banana"))',
      explanation: 'Primero se cuenta (patrón del diccionario contador) y después se busca el máximo (patrón «mejor hasta ahora»). El diccionario conserva el orden de aparición, así que con `>` gana la primera letra empatada.',
    },
    reference: [
      'def mas_frecuente(texto):\n    recuento = {}\n    for letra in texto:\n        if letra != " ":\n            recuento[letra] = recuento.get(letra, 0) + 1\n    mejor = None\n    for letra, veces in recuento.items():\n        if mejor is None or veces > recuento[mejor]:\n            mejor = letra\n    return mejor',
    ],
    wrongs: [
      { code: 'def mas_frecuente(texto):\n    recuento = {}\n    for letra in texto:\n        if letra != " ":\n            recuento[letra] = recuento.get(letra, 0) + 1\n    mejor = None\n    for letra, veces in recuento.items():\n        if mejor is None or veces >= recuento[mejor]:\n            mejor = letra\n    return mejor', category: 'comprension' },
      { code: 'def mas_frecuente(texto):\n    return max(texto)', category: 'logica' },
    ],
  },
};
