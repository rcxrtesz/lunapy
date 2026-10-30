// Lección 8.2 · Métodos de cadena. Contenido original, alineado con el cap. 8 de
// «Piensa en Python» (métodos de cadena, el operador in, comparar cadenas) y PE2
// módulo 2. split y join adelantan las listas del Módulo 9.

const TOPIC = 'Cadenas';

export const LESSON_METODOS = {
  id: 'metodos',
  moduleId: 'm8',
  code: '8.2',
  title: 'Métodos de cadena',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Llamar a métodos con la notación texto.metodo()',
    'Transformar textos: upper, lower, title, strip y replace',
    'Buscar y contar: find, count, startswith y endswith',
    'Recordar que los métodos devuelven un texto nuevo',
    'Separar un texto en palabras con split y unirlas con join',
  ],
  prerequisites: ['Lección 8.1 «Índices y porciones»'],
  teaser: 'Los textos traen herramientas incorporadas: pasar a mayúsculas, quitar espacios, reemplazar, contar… Hoy las conoces.',
  celebration: 'Ya tienes una caja de herramientas completa para trabajar con textos: limpiar, buscar, transformar y separar.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: '¿Qué es un método?', concepts: ['cadenas', 'funciones'],
      blocks: [
        { type: 'p', text: 'Un **método** es una función que pertenece a un tipo de dato. Se llama con un punto detrás del valor: `texto.upper()`. Es como `len(texto)`, pero escrito al revés: primero el dato, después la acción.' },
        { type: 'code', run: true, code: 'nombre = "lucía garcía"\nprint(nombre.upper())\nprint(nombre.title())\nprint("HOLA".lower())' },
        {
          type: 'check', id: 'm8m-upper', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 'print("buenos días".title())', answer: 'Buenos Días',
          explain: 'title() pone en mayúscula la primera letra de cada palabra.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nuevo', title: 'Los métodos devuelven un texto nuevo', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Como los textos son inmutables, un método **no cambia** el texto original: devuelve uno nuevo. Si quieres conservar el resultado, guárdalo.' },
        { type: 'code', run: true, code: 'ciudad = "madrid"\nciudad.upper()          # se calcula… y se pierde\nprint(ciudad)\nciudad = ciudad.upper()  # ahora sí se guarda\nprint(ciudad)' },
        {
          type: 'check', id: 'm8m-nuevo', concept: 'cadenas', mode: 'choice',
          question: '¿Qué mostrará?', code: 'x = "  hola  "\nx.strip()\nprint("[" + x + "]")', expectOutput: '[  hola  ]',
          options: [
            { text: '[  hola  ]', correct: true },
            { text: '[hola]', why: 'strip() devuelve un texto nuevo sin espacios, pero no se ha guardado: x sigue igual.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limpiar', title: 'Limpiar y transformar', concepts: ['cadenas'],
      blocks: [
        {
          type: 'five', items: {
            'strip()': 'Quita los espacios del principio y del final. Imprescindible con datos que escribe una persona.',
            'replace(a, b)': 'Cambia cada aparición de a por b.',
            'upper() / lower()': 'Todo en mayúsculas / minúsculas. Útil para comparar sin que importen las mayúsculas.',
          },
        },
        { type: 'code', run: true, code: 'entrada = "  SÍ "\nprint(entrada.strip().lower() == "sí")   # métodos encadenados\nprint("3,5".replace(",", "."))\nprint(float("3,5".replace(",", ".")) * 2)' },
        { type: 'callout', tone: 'tip', title: 'Encadenar', text: '`entrada.strip().lower()` aplica los métodos de izquierda a derecha: primero quita espacios y al resultado lo pasa a minúsculas.' },
        {
          type: 'check', id: 'm8m-replace', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 'print("banana".replace("a", "o"))', answer: 'bonono',
          explain: 'replace cambia **todas** las apariciones.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'buscar', title: 'Buscar y contar', concepts: ['cadenas', 'busqueda'],
      blocks: [
        {
          type: 'five', items: {
            'find(x)': 'Posición de la primera aparición de x, o −1 si no está.',
            'count(x)': 'Cuántas veces aparece x.',
            'startswith(x) / endswith(x)': '¿Empieza / termina por x? Devuelven True o False.',
          },
        },
        { type: 'code', run: true, code: 'email = "ana.lopez@correo.es"\nprint(email.find("@"))\nprint(email.count("."))\nprint(email.endswith(".es"))\nprint(email[:email.find("@")])   # usuario' },
        {
          type: 'check', id: 'm8m-find', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 's = "programar"\nprint(s.find("r"), s.count("r"), s.find("z"))', answer: '1 3 -1',
          explain: 'La primera «r» está en la posición 1; hay tres; la «z» no está: −1.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'split', title: 'Separar y unir palabras', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: '`split()` separa un texto en trozos (por defecto, por los espacios) y devuelve una **lista**, que conocerás a fondo en el Módulo 9. Ya puedes recorrerla con for. `join` hace lo contrario: une trozos con un separador.' },
        { type: 'code', run: true, code: 'frase = "aprender Python es divertido"\npalabras = frase.split()\nprint(palabras)\nprint(len(palabras), "palabras")\nfor p in palabras:\n    print(p.upper())\nprint("-".join(palabras))\nprint("12/05/2026".split("/"))' },
        {
          type: 'check', id: 'm8m-split', concept: 'cadenas', mode: 'text',
          question: 'Predice:', code: 'print(len("  hola   mundo  ".split()))', answer: '2',
          explain: 'split() sin argumentos separa por cualquier cantidad de espacios e ignora los de los extremos.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'met-predict' },
    { id: 'a2', activity: 'met-complete' },
    { id: 'a3', activity: 'met-fix' },
    { id: 'a4', activity: 'met-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un método se llama con un punto: `texto.upper()`.',
    'Los métodos de cadena **devuelven un texto nuevo**: guárdalo si lo necesitas.',
    'Limpiar y transformar: `strip`, `replace`, `upper`, `lower`, `title`. Se pueden encadenar.',
    'Buscar y contar: `find` (−1 si no está), `count`, `startswith`, `endswith`.',
    '`split()` separa en palabras; `separador.join(trozos)` las une.',
  ],
};

export const ACTIVITIES_METODOS = {
  'met-predict': {
    id: 'met-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La respuesta del usuario', difficulty: 2, xp: 10, concepts: ['cadenas'],
    prompt: 'El usuario ha escrito «  Si  » con espacios y mayúscula. **¿Qué mostrará?**',
    code: 'respuesta = "  Si  "\nprint(respuesta == "si", respuesta.strip() == "si", respuesta.strip().lower() == "si")',
    expectedOutput: 'False False True',
    options: [
      { text: 'False False True', correct: true },
      { text: 'False True True', concept: 'cadenas', why: 'strip() quita los espacios, pero «Si» con mayúscula sigue sin ser igual a «si».' },
      { text: 'True True True', concept: 'cadenas', why: '== compara los textos exactamente: espacios y mayúsculas incluidos.' },
      { text: 'False False False', concept: 'cadenas', why: 'Con strip() y lower(), «  Si  » se convierte en «si»: ahora sí son iguales.' },
    ],
    explain: ['«  Si  » no es «si» (espacios y mayúscula).', '«Si» tampoco (mayúscula).', '«si» sí.'],
  },
  'met-complete': {
    id: 'met-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Usuario y dominio', difficulty: 2, xp: 15, concepts: ['cadenas', 'retorno'],
    statement: 'Completa `partes_email(email)` para que devuelva dos valores: el **usuario** (lo que va antes de la @) y el **dominio** (lo que va después).',
    expected: 'ana.lopez correo.es',
    starter: 'def partes_email(email):\n    pos = email.___("@")\n    usuario = email[:___]\n    dominio = email[pos + ___:]\n    return usuario, dominio\n\nu, d = partes_email("ana.lopez@correo.es")\nprint(u, d)',
    spec: {
      blanks: true,
      allow_short_names: ['u', 'd'],
      functions: [{ name: 'partes_email', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['ana.lopez correo.es'] },
        { label: 'partes_email("x@y.com")', call: 'print(partes_email("x@y.com"))', out_lines: ["('x', 'y.com')"] },
      ],
      misconceptions: [
        { out_lines: ['ana.lopez @correo.es'], title: 'Sobra la @', msg: 'El dominio empieza **después** de la @: `email[pos + 1:]`.' },
      ],
      logic_msg: 'Comprueba con "x@y.com": el usuario es "x" y el dominio "y.com".',
    },
    hints: [
      { level: 'Orientación', text: 'Primero busca la posición de la @; después corta antes y después de ella.' },
      { level: 'Razonamiento', text: '¿Qué método da la posición de un carácter? El usuario acaba justo antes de esa posición; el dominio empieza justo después.' },
      { level: 'Pseudocódigo', text: 'pos ← posición de "@"\nusuario ← desde el principio hasta pos (sin incluir)\ndominio ← desde pos + 1 hasta el final', pre: true },
      { level: 'Ayuda técnica', text: '`email.find("@")`, `email[:pos]` y `email[pos + 1:]`.' },
    ],
    solution: {
      code: 'def partes_email(email):\n    pos = email.find("@")\n    usuario = email[:pos]\n    dominio = email[pos + 1:]\n    return usuario, dominio\n\nu, d = partes_email("ana.lopez@correo.es")\nprint(u, d)',
      explanation: 'find da la posición de la @; las porciones cortan justo antes y justo después. Con split("@") también se podría, pero esta versión practica índices y métodos a la vez.',
    },
    reference: [
      'def partes_email(email):\n    pos = email.find("@")\n    usuario = email[:pos]\n    dominio = email[pos + 1:]\n    return usuario, dominio\n\nu, d = partes_email("ana.lopez@correo.es")\nprint(u, d)',
    ],
    wrongs: [
      { code: 'def partes_email(email):\n    pos = email.___("@")\n    usuario = email[:___]\n    dominio = email[pos + ___:]\n    return usuario, dominio', category: 'incompleto' },
      { code: 'def partes_email(email):\n    pos = email.find("@")\n    usuario = email[:pos]\n    dominio = email[pos:]\n    return usuario, dominio\n\nu, d = partes_email("ana.lopez@correo.es")\nprint(u, d)', category: 'comprension' },
    ],
  },
  'met-fix': {
    id: 'met-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El nombre sin limpiar', difficulty: 2, xp: 20, concepts: ['cadenas', 'errores'],
    statement: '`limpiar_nombre` debería quitar los espacios sobrantes de los extremos y poner cada palabra con mayúscula inicial, pero devuelve el texto tal cual. **No hay error de Python.** Corrígelo.',
    expected: 'Ana García\nLuis Pérez',
    starter: 'def limpiar_nombre(nombre):\n    nombre.strip()\n    nombre.title()\n    return nombre\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))',
    spec: {
      exact_lines: true,
      functions: [{ name: 'limpiar_nombre', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Ana García', 'Luis Pérez'] },
        { label: 'limpiar_nombre("   eva  ")', call: 'print("[" + limpiar_nombre("   eva  ") + "]")', out_lines: ['[Eva]'] },
      ],
      misconceptions: [
        { out_lines: ['  ana garcía', 'LUIS PÉREZ'], title: 'Los resultados se pierden', msg: 'strip() y title() devuelven un texto nuevo, pero nadie lo guarda. Asigna el resultado: `nombre = nombre.strip()`.' },
      ],
      logic_msg: 'Comprueba con «   eva  »: debe devolver «Eva», sin espacios y con mayúscula.',
    },
    hints: [
      { level: 'Orientación', text: 'Las dos líneas del medio calculan algo… ¿y qué pasa con lo que calculan?' },
      { level: 'Razonamiento', text: 'Los textos son inmutables: los métodos no cambian `nombre`, devuelven uno nuevo. Hay que guardarlo (o devolverlo directamente).' },
      { level: 'Pseudocódigo', text: 'nombre ← nombre sin espacios en los extremos\nnombre ← nombre con mayúsculas iniciales\ndevolver nombre', pre: true },
      { level: 'Ayuda técnica', text: '`nombre = nombre.strip()` y `nombre = nombre.title()`, o en una línea: `return nombre.strip().title()`.' },
    ],
    solution: {
      code: 'def limpiar_nombre(nombre):\n    return nombre.strip().title()\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))',
      explanation: 'Los métodos de cadena no modifican el original: devuelven un texto nuevo. Encadenarlos y devolver el resultado lo resuelve en una línea.',
    },
    reference: [
      'def limpiar_nombre(nombre):\n    return nombre.strip().title()\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))',
      'def limpiar_nombre(nombre):\n    nombre = nombre.strip()\n    nombre = nombre.title()\n    return nombre\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))',
    ],
    wrongs: [
      { code: 'def limpiar_nombre(nombre):\n    nombre.strip()\n    nombre.title()\n    return nombre\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))', category: 'comprension' },
      { code: 'def limpiar_nombre(nombre):\n    return nombre.title()\n\nprint(limpiar_nombre("  ana garcía "))\nprint(limpiar_nombre("LUIS PÉREZ"))', category: 'logica' },
    ],
  },
  'met-build': {
    id: 'met-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'Validar un email', difficulty: 3, xp: 30, concepts: ['cadenas', 'booleanos', 'descomponer'],
    unlock: { any: ['met-predict', 'met-complete', 'met-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `email_valido(email)` que devuelva True si el email cumple estas reglas sencillas:\n\n• Tiene **exactamente una** @.\n\n• No tiene espacios.\n\n• Después de la @ hay al menos un punto.\n\n• No empieza por @.\n\nEjemplos: "ana@correo.es" → True; "ana@correo" → False; "a na@correo.es" → False.',
    expected: 'True',
    plan: [
      {
        q: '¿Cómo compruebas que hay exactamente una @?',
        options: [
          { text: 'email.count("@") == 1', correct: true },
          { text: '"@" in email', why: 'Eso solo dice que hay al menos una: "a@@b.es" también lo cumpliría.' },
        ],
      },
      {
        q: '¿Cómo miras si hay un punto después de la @?',
        options: [
          { text: 'Buscar "." en la porción que va desde la @ hasta el final', correct: true },
          { text: '"." in email', why: '"ana.lopez@correo" tiene un punto, pero antes de la @: no vale.' },
        ],
      },
    ],
    planScaffold: 'def email_valido(email):\n    # 1. ¿Exactamente una @?\n    # 2. ¿Sin espacios?\n    # 3. ¿Punto después de la @?\n    # 4. ¿No empieza por @?\n\n\nprint(email_valido("ana@correo.es"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'email_valido', params: 1 }],
      cases: [
        { label: '"ana@correo.es"', call: 'print(email_valido("ana@correo.es"))', out_lines: ['True'] },
        { label: '"ana@correo"', call: 'print(email_valido("ana@correo"))', out_lines: ['False'] },
        { label: '"a na@correo.es"', call: 'print(email_valido("a na@correo.es"))', out_lines: ['False'] },
        { label: '"ana@@correo.es"', call: 'print(email_valido("ana@@correo.es"))', out_lines: ['False'] },
        { label: '"ana.lopez@correo"', call: 'print(email_valido("ana.lopez@correo"))', out_lines: ['False'] },
        { label: '"@correo.es"', call: 'print(email_valido("@correo.es"))', out_lines: ['False'] },
        { label: '"luis.p@uni.edu.es"', call: 'print(email_valido("luis.p@uni.edu.es"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'Muestra, pero no devuelve', msg: 'Usa return en lugar de print.' },
      ],
      logic_msg: 'Revisa la regla que falla en el caso marcado. Cada regla puede comprobarse con un método de cadena.',
    },
    hints: [
      { level: 'Orientación', text: 'Cuatro reglas, cuatro condiciones. Si una falla, el email no es válido.' },
      { level: 'Razonamiento', text: 'count para la @, in para los espacios, find para saber dónde está la @ y una porción para mirar lo que va detrás, startswith para el principio.' },
      { level: 'Pseudocódigo', text: 'si no hay exactamente una @: devolver False\nsi hay un espacio: devolver False\nsi empieza por @: devolver False\ndominio ← lo que va después de la @\ndevolver "." está en dominio', pre: true },
      { level: 'Ayuda técnica', text: '`email.count("@") != 1`, `" " in email`, `email.startswith("@")` y `"." in email[email.find("@"):]`.' },
    ],
    solution: {
      code: 'def email_valido(email):\n    """Devuelve True si email cumple unas reglas básicas de formato."""\n    if email.count("@") != 1 or " " in email or email.startswith("@"):\n        return False\n    dominio = email[email.find("@") + 1:]\n    return "." in dominio\n\nprint(email_valido("ana@correo.es"))',
      explanation: 'Las cláusulas de guarda descartan pronto los casos claramente inválidos; la última línea devuelve directamente la comprobación del punto en el dominio.',
    },
    reference: [
      'def email_valido(email):\n    if email.count("@") != 1 or " " in email or email.startswith("@"):\n        return False\n    dominio = email[email.find("@") + 1:]\n    return "." in dominio',
      'def email_valido(email):\n    if email.count("@") != 1:\n        return False\n    usuario, dominio = email.split("@")\n    return usuario != "" and " " not in email and "." in dominio',
    ],
    wrongs: [
      { code: 'def email_valido(email):\n    return "@" in email and "." in email', category: 'logica' },
      { code: 'def email_valido(email):\n    print(email.count("@") == 1 and " " not in email and "." in email[email.find("@"):] and not email.startswith("@"))', category: 'comprension' },
    ],
  },
};
