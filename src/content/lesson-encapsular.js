// Lección 4.1 · Encapsulación y generalización. Contenido original, alineado con el
// cap. 4 de «Piensa en Python» (encapsulación, generalización). En lugar de la tortuga
// del libro se dibuja con texto, usando la repetición de cadenas (`"#" * 5`).

const TOPIC = 'Diseño de funciones';

export const LESSON_ENCAPSULAR = {
  id: 'encapsular',
  moduleId: 'm4',
  code: '4.1',
  title: 'Encapsulación y generalización',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Encapsular: envolver un trozo de código en una función con nombre',
    'Generalizar: sustituir valores fijos por parámetros',
    'Construir funciones grandes a partir de otras pequeñas',
    'Detectar una función que ignora sus parámetros',
  ],
  prerequisites: ['Módulo 3 «Funciones, parámetros y argumentos»'],
  teaser: 'Empiezas el Módulo 4: hoy conviertes código que solo sirve para un caso en funciones que sirven para todos.',
  celebration: 'Ya sabes encapsular y generalizar: tus funciones dejan de servir para un solo caso y empiezan a servir para todos.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'encapsular', title: 'Encapsular: darle nombre a un trozo de código', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'Este programa dibuja una línea de 10 almohadillas. Funciona, pero si necesitas la línea en varios sitios tendrás que repetirlo.' },
        { type: 'code', run: true, code: 'print("#" * 10)' },
        { type: 'p', text: '**Encapsular** es envolver ese código en una función con un nombre que diga qué hace. Ya lo hiciste en el Módulo 3; ahora le ponemos nombre a la técnica:' },
        { type: 'code', run: true, code: 'def linea_de_10():\n    print("#" * 10)\n\nlinea_de_10()\nprint("Título")\nlinea_de_10()' },
        {
          type: 'check', id: 'm4e-encapsular', concept: 'diseno', mode: 'choice',
          question: '¿Qué ganas al encapsular?',
          options: [
            { text: 'Un nombre que explica el código y poder reutilizarlo', correct: true },
            { text: 'Que el programa se ejecute más rápido', why: 'La velocidad es la misma: la ventaja es que el código se entiende mejor y se reutiliza.' },
            { text: 'Nada: solo añade líneas', why: 'Añade unas pocas líneas, pero cada llamada ahorra repetir el código y el nombre documenta qué hace.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'generalizar', title: 'Generalizar: de un caso a todos', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: '`linea_de_10()` solo sabe hacer líneas de 10. ¿Y si necesitas una de 25? **Generalizar** es cambiar el valor fijo por un parámetro:' },
        { type: 'code', run: true, code: 'def linea(n):\n    print("#" * n)\n\nlinea(3)\nlinea(8)' },
        { type: 'p', text: 'Se puede seguir generalizando: ¿por qué siempre almohadillas? Otro parámetro para el símbolo:' },
        { type: 'code', run: true, code: 'def linea(n, simbolo):\n    print(simbolo * n)\n\nlinea(5, "*")\nlinea(3, "=-")' },
        { type: 'callout', tone: 'tip', title: 'Pregúntate qué podría cambiar', text: 'Busca en tu función los valores escritos a mano. Si otro uso podría necesitar un valor distinto, conviértelo en parámetro. Sin pasarse: una función con diez parámetros es difícil de usar.' },
        {
          type: 'check', id: 'm4e-general', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'def linea(n, simbolo):\n    print(simbolo * n)\n\nlinea(4, "ab")', answer: 'abababab',
          explain: 'El texto "ab" se repite 4 veces.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'componer', title: 'Funciones hechas de funciones', concepts: ['diseno', 'funciones'],
      blocks: [
        { type: 'p', text: 'Con una línea puedes construir un rectángulo: una fila repetida varias veces. El truco: `"\\n"` es el **salto de línea** dentro de un texto, así que `(fila + "\\n") * alto` repite la fila en líneas distintas.' },
        { type: 'code', run: true, code: 'def rectangulo(ancho, alto, simbolo):\n    fila = simbolo * ancho\n    print((fila + "\\n") * alto, end="")\n\nrectangulo(6, 3, "#")\nrectangulo(2, 2, "o")', caption: '`end=""` evita la línea en blanco extra: el texto ya termina en un salto de línea.' },
        { type: 'p', text: 'Y con funciones pequeñas puedes montar otras más grandes. Cada pieza se prueba por separado:' },
        { type: 'code', run: true, code: 'def linea(n, simbolo):\n    print(simbolo * n)\n\ndef titulo(texto):\n    linea(len(texto), "=")\n    print(texto)\n    linea(len(texto), "=")\n\ntitulo("Menú")\ntitulo("Configuración")' },
        {
          type: 'check', id: 'm4e-rect', concept: 'diseno', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def rectangulo(ancho, alto, simbolo):\n    fila = simbolo * ancho\n    print((fila + "\\n") * alto, end="")\n\nrectangulo(3, 2, "*")', expectOutput: '***\n***',
          options: [
            { text: 'Dos filas de tres asteriscos', correct: true },
            { text: 'Tres filas de dos asteriscos', why: 'El primer argumento es el ancho (3 por fila) y el segundo, el alto (2 filas).' },
            { text: 'Una fila de seis asteriscos', why: 'El `"\\n"` hace que cada repetición de la fila empiece en una línea nueva.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ignorar', title: 'Cuidado con generalizar a medias', concepts: ['diseno', 'errores'],
      blocks: [
        { type: 'p', text: 'Un error frecuente al generalizar: añadir el parámetro… y seguir usando el valor fijo dentro. El programa no da ningún error, pero la función hace siempre lo mismo:' },
        { type: 'code', run: true, code: 'def linea(n):\n    print("#" * 10)   # ¡ignora n!\n\nlinea(3)\nlinea(15)' },
        { type: 'callout', tone: 'warn', title: 'Pruébala con valores distintos', text: 'Si una función con parámetros da lo mismo con argumentos diferentes, probablemente ignora alguno. Pruébala al menos con dos valores muy distintos.' },
        {
          type: 'check', id: 'm4e-ignora', concept: 'diseno', mode: 'choice',
          question: '¿Qué le pasa a esta función?', code: 'def saludar(nombre):\n    print("Hola, Ana")\n\nsaludar("Luis")', expectOutput: 'Hola, Ana',
          options: [
            { text: 'Ignora su parámetro: siempre saluda a Ana', correct: true },
            { text: 'Da un error porque no usa nombre', why: 'Python no obliga a usar los parámetros: no hay error, y por eso el fallo pasa desapercibido.' },
          ],
          explain: 'La versión correcta usa el parámetro: `print("Hola,", nombre)`.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'enc-predict' },
    { id: 'a2', activity: 'enc-complete' },
    { id: 'a3', activity: 'enc-fix' },
    { id: 'a4', activity: 'enc-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '**Encapsular**: envolver código en una función con un nombre que explique qué hace.',
    '**Generalizar**: cambiar los valores fijos por parámetros para que la función sirva en más casos.',
    'Las funciones grandes se montan con funciones pequeñas, cada una probada por separado.',
    '`"\\n"` es un salto de línea dentro de un texto: `(fila + "\\n") * alto` dibuja varias filas.',
    'Una función que ignora sus parámetros no da error: pruébala con valores distintos.',
  ],
};

export const ACTIVITIES_ENCAPSULAR = {
  'enc-predict': {
    id: 'enc-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Líneas a medida', difficulty: 1, xp: 10, concepts: ['diseno', 'parametros'],
    prompt: 'La misma función, dos llamadas con argumentos distintos. **¿Qué mostrará?**',
    code: 'def linea(n, simbolo):\n    print(simbolo * n)\n\nlinea(3, "*")\nlinea(2, "ab")',
    expectedOutput: '***\nabab',
    options: [
      { text: '*** y debajo abab', correct: true },
      { text: '*** y debajo ab ab', concept: 'tipos', why: 'Repetir un texto no añade espacios: "ab" * 2 es "abab".' },
      { text: '3* y debajo 2ab', concept: 'tipos', why: 'Multiplicar un texto por un número lo **repite**: "*" * 3 es "***".' },
      { text: '*** dos veces', concept: 'parametros', why: 'Cada llamada usa sus propios argumentos: la segunda repite "ab" dos veces.' },
    ],
    explain: ['`linea(3, "*")`: n = 3, simbolo = "*" → ***', '`linea(2, "ab")`: n = 2, simbolo = "ab" → abab'],
  },
  'enc-complete': {
    id: 'enc-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Cajas de cualquier tamaño', difficulty: 2, xp: 15, concepts: ['diseno', 'parametros'],
    statement: 'Esta función debería dibujar una caja de `#` de cualquier ancho y alto. Completa los huecos **con los parámetros** para que funcione con cualquier tamaño:',
    expected: '####\n####',
    starter: 'def caja(ancho, alto):\n    fila = "#" * ___\n    print((fila + "\\n") * ___, end="")\n\ncaja(4, 2)',
    spec: {
      blanks: true,
      functions: [{ name: 'caja', params: 2 }],
      cases: [
        { label: 'caja(4, 2)', call: 'caja(4, 2)', out_lines: ['####', '####'] },
        { label: 'caja(2, 3)', call: 'caja(2, 3)', out_lines: ['##', '##', '##'] },
        { label: 'caja(5, 1)', call: 'caja(5, 1)', out_lines: ['#####'] },
      ],
      misconceptions: [
        { out_lines: ['##', '##', '##', '##'], title: 'Ancho y alto cambiados', msg: 'Has intercambiado los parámetros: la fila mide `ancho` y se repite `alto` veces.' },
      ],
      logic_msg: 'Con este tamaño la caja no sale bien. ¿Usas los parámetros, o has escrito números fijos?',
    },
    hints: [
      { level: 'Orientación', text: 'Los dos huecos son parámetros de la función: uno decide cuánto mide una fila y el otro cuántas filas hay.' },
      { level: 'Razonamiento', text: 'Si escribes números (4 y 2), solo funcionará para la caja de ejemplo. ¿Qué nombre tiene el dato del ancho? ¿Y el del alto?' },
      { level: 'Pseudocódigo', text: 'fila ← "#" repetido ancho veces\nmostrar la fila repetida alto veces', pre: true },
      { level: 'Ayuda técnica', text: '`fila = "#" * ancho` y `(fila + "\\n") * alto`.' },
    ],
    solution: {
      code: 'def caja(ancho, alto):\n    fila = "#" * ancho\n    print((fila + "\\n") * alto, end="")\n\ncaja(4, 2)',
      explanation: 'Usando los parámetros en lugar de números fijos, la misma función dibuja cajas de cualquier tamaño: eso es generalizar.',
    },
    reference: ['def caja(ancho, alto):\n    fila = "#" * ancho\n    print((fila + "\\n") * alto, end="")\n\ncaja(4, 2)'],
    wrongs: [
      { code: 'def caja(ancho, alto):\n    fila = "#" * ___\n    print((fila + "\\n") * ___, end="")', category: 'incompleto' },
      { code: 'def caja(ancho, alto):\n    fila = "#" * 4\n    print((fila + "\\n") * 2, end="")', category: 'logica' },
      { code: 'def caja(ancho, alto):\n    fila = "#" * alto\n    print((fila + "\\n") * ancho, end="")', category: 'comprension' },
    ],
  },
  'enc-fix': {
    id: 'enc-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El subrayado de talla única', difficulty: 2, xp: 20, concepts: ['diseno', 'funciones'],
    statement: 'La función `subrayar` debería poner debajo de cada texto **tantos guiones como letras tenga**. No da ningún error, pero algo falla: ejecútala y compara.',
    expected: 'Hola\n----\nProgramación\n------------',
    starter: 'def subrayar(texto):\n    print(texto)\n    print("-" * 10)\n\nsubrayar("Hola")\nsubrayar("Programación")',
    spec: {
      functions: [{ name: 'subrayar', params: 1 }],
      cases: [
        { label: 'subrayar("Hola")', call: 'subrayar("Hola")', out_lines: ['Hola', '----'] },
        { label: 'subrayar("Programación")', call: 'subrayar("Programación")', out_lines: ['Programación', '------------'] },
        { label: 'subrayar("Python es genial")', call: 'subrayar("Python es genial")', out_lines: ['Python es genial', '----------------'] },
      ],
      misconceptions: [
        { out_lines: ['Hola', '----------'], title: 'Siempre 10 guiones', msg: 'La función usa un 10 fijo: cuenta las letras del texto con `len(texto)`.' },
      ],
      logic_msg: 'El número de guiones debe coincidir con la longitud del texto, sea cual sea.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: «Hola» tiene 4 letras y aparecen 10 guiones. ¿De dónde sale ese 10?' },
      { level: 'Razonamiento', text: 'El número de guiones depende del texto. ¿Qué función de la lección 3.1 cuenta los caracteres?' },
      { level: 'Pseudocódigo', text: 'mostrar texto\nmostrar "-" repetido tantas veces como caracteres tenga texto', pre: true },
      { level: 'Ayuda técnica', text: '`len(texto)` da el número de caracteres: `print("-" * len(texto))`.' },
    ],
    solution: {
      code: 'def subrayar(texto):\n    print(texto)\n    print("-" * len(texto))\n\nsubrayar("Hola")\nsubrayar("Programación")',
      explanation: 'El 10 era un valor fijo que convertía la función en «de talla única». Con `len(texto)` el subrayado se adapta a cualquier texto.',
    },
    reference: ['def subrayar(texto):\n    print(texto)\n    print("-" * len(texto))'],
    wrongs: [
      { code: 'def subrayar(texto):\n    print(texto)\n    print("-" * 10)', category: 'comprension' },
      { code: 'def subrayar(texto):\n    print(texto)\n    print("-" * len(Texto))', category: 'ejecucion' },
      { code: 'def subrayar(texto):\n    print(texto)\n    print("-" * 4)', category: 'logica' },
    ],
  },
  'enc-build': {
    id: 'enc-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El marco para textos', difficulty: 3, xp: 30, concepts: ['diseno', 'funciones', 'descomponer'],
    unlock: { any: ['enc-predict', 'enc-complete', 'enc-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define una función `marco(texto)` que muestre el texto dentro de un marco que **se adapte a su longitud**. Por ejemplo, `marco("Hola")` debe mostrar la salida esperada de abajo.\n\nEl borde tiene un `+` en cada extremo y tantos guiones como letras del texto **más 2** (por los espacios a cada lado).',
    expected: '+------+\n| Hola |\n+------+',
    plan: [
      {
        q: 'Para «Hola» (4 letras), ¿cuántos guiones lleva el borde?',
        options: [
          { text: '6: las 4 letras más los 2 espacios', correct: true },
          { text: '4: uno por letra', why: 'Mira la línea del medio: hay un espacio a cada lado del texto, y el borde los cubre también.' },
        ],
      },
      {
        q: '¿Cómo evitas escribir el borde dos veces?',
        options: [
          { text: 'Guardándolo en una variable (o con otra función) y mostrándolo arriba y abajo', correct: true },
          { text: 'No se puede evitar', why: 'Calcúlalo una vez, guárdalo en una variable `borde` y muéstralo dos veces.' },
        ],
      },
    ],
    planScaffold: 'def marco(texto):\n    # 1. Calcular el borde según la longitud del texto\n\n    # 2. Mostrar borde, texto con | y espacios, borde\n\n\nmarco("Hola")\n',
    starter: '',
    spec: {
      functions: [{ name: 'marco', params: 1 }],
      cases: [
        { label: 'marco("Hola")', call: 'marco("Hola")', out_lines: ['+------+', '| Hola |', '+------+'] },
        { label: 'marco("LunaPy")', call: 'marco("LunaPy")', out_lines: ['+--------+', '| LunaPy |', '+--------+'] },
        { label: 'marco("¡Python mola!")', call: 'marco("¡Python mola!")', out_lines: ['+---------------+', '| ¡Python mola! |', '+---------------+'] },
      ],
      misconceptions: [
        { out_lines: ['+----+', '| Hola |', '+----+'], title: 'Faltan 2 guiones', msg: 'El borde es 2 guiones más largo que el texto, por los espacios a cada lado: `len(texto) + 2`.' },
        { out_lines: ['+------+', '|Hola|', '+------+'], title: 'Faltan los espacios', msg: 'La línea del medio lleva un espacio entre cada `|` y el texto: `"| " + texto + " |"`.' },
      ],
      rules: [{ type: 'must_call', name: 'len', title: 'Adapta el marco al texto', msg: 'Calcula el borde con len(texto) para que sirva con cualquier texto.' }],
      logic_msg: 'Compara las tres líneas con las esperadas: los + de las esquinas, el número de guiones y los espacios junto a los |.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres líneas: borde, texto enmarcado y el mismo borde. Solo cambia la longitud del borde.' },
      { level: 'Razonamiento', text: 'El número de guiones depende del texto: `len(texto) + 2`. Construye el borde uniendo `"+"`, los guiones y `"+"`.' },
      { level: 'Pseudocódigo', text: 'borde ← "+" + "-" × (longitud del texto + 2) + "+"\nmostrar borde\nmostrar "| " + texto + " |"\nmostrar borde', pre: true },
      { level: 'Ayuda técnica', text: '`borde = "+" + "-" * (len(texto) + 2) + "+"`. Ojo con los paréntesis: sin ellos, el `+ 2` se sumaría al texto.' },
    ],
    solution: {
      code: 'def marco(texto):\n    borde = "+" + "-" * (len(texto) + 2) + "+"\n    print(borde)\n    print("| " + texto + " |")\n    print(borde)\n\nmarco("Hola")',
      explanation: 'El borde se calcula una sola vez a partir de `len(texto)` y se muestra arriba y abajo. La misma función sirve para cualquier texto.',
    },
    reference: [
      'def marco(texto):\n    borde = "+" + "-" * (len(texto) + 2) + "+"\n    print(borde)\n    print("| " + texto + " |")\n    print(borde)',
      'def borde(n):\n    print("+" + "-" * n + "+")\n\ndef marco(texto):\n    borde(len(texto) + 2)\n    print(f"| {texto} |")\n    borde(len(texto) + 2)',
    ],
    wrongs: [
      { code: 'def marco(texto):\n    borde = "+" + "-" * len(texto) + "+"\n    print(borde)\n    print("| " + texto + " |")\n    print(borde)', category: 'comprension' },
      { code: 'def marco(texto):\n    borde = "+" + "-" * (len(texto) + 2) + "+"\n    print(borde)\n    print("|" + texto + "|")\n    print(borde)', category: 'comprension' },
      { code: 'def marco(texto):\n    print("+------+")\n    print("| " + texto + " |")\n    print("+------+")', category: 'logica' },
    ],
  },
};
