// Lección 3.2 · Definir tus propias funciones. Contenido original, alineado con el
// cap. 3 de «Piensa en Python» (añadir funciones nuevas, definiciones y usos, flujo
// de ejecución) y PE1 módulo 4. Funciones sin parámetros: los parámetros, return y
// las variables locales llegan en la 3.3.

const TOPIC = 'Funciones';

export const LESSON_DEFINIR_FUNCIONES = {
  id: 'definir-funciones',
  moduleId: 'm3',
  code: '3.2',
  title: 'Definir tus propias funciones',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Explicar para qué sirve crear funciones propias',
    'Definir una función con def, dos puntos y sangría',
    'Distinguir entre definir una función y llamarla',
    'Seguir el flujo de ejecución cuando unas funciones llaman a otras',
    'Corregir los errores típicos: sangría, dos puntos y nombres',
  ],
  prerequisites: ['Lección 3.1 «Llamar a funciones»'],
  teaser: 'Hasta ahora usabas funciones que otros habían escrito. Hoy creas las tuyas: les pones nombre, decides qué hacen y las reutilizas.',
  celebration: 'Ya creas tus propias funciones y sabes seguir el camino que recorre Python al llamarlas. En la próxima lección les darás datos con parámetros.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'por-que', title: '¿Por qué crear funciones?', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Imagina que tu programa muestra la misma cabecera en tres sitios. Copiar y pegar funciona… hasta que quieres cambiarla y tienes que hacerlo tres veces (y te olvidas de una).' },
        { type: 'code', run: true, code: 'print("==========")\nprint("  LunaPy")\nprint("==========")\nprint("Lección 1")\nprint("==========")\nprint("  LunaPy")\nprint("==========")\nprint("Lección 2")' },
        { type: 'p', text: 'Una **función propia** agrupa esas líneas bajo un nombre. Después basta con escribir el nombre para ejecutarlas todas:' },
        { type: 'code', run: true, code: 'def cabecera():\n    print("==========")\n    print("  LunaPy")\n    print("==========")\n\ncabecera()\nprint("Lección 1")\ncabecera()\nprint("Lección 2")' },
        {
          type: 'five', items: {
            'Reutilizar': 'Escribes el código una vez y lo usas tantas veces como quieras.',
            'Dar nombre': '`cabecera()` explica qué hace mejor que tres `print` seguidos.',
            'Cambiar en un sitio': 'Si modificas la función, cambia en todos los lugares donde la llamas.',
          },
        },
        {
          type: 'check', id: 'm3d-motivo', concept: 'funciones', mode: 'choice',
          question: 'Quieres cambiar el texto de la cabecera. ¿Cuántos cambios haces en la versión con función?',
          options: [
            { text: 'Uno: dentro de la función', correct: true },
            { text: 'Dos: uno por cada vez que la llamo', why: 'Las llamadas solo dicen «ejecuta cabecera». El contenido está en un único sitio: la definición.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'def', title: 'Definir y llamar', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Una **definición** tiene una cabecera y un cuerpo:' },
        {
          type: 'five', items: {
            'def': 'La palabra que indica «voy a definir una función».',
            'Nombre y ()': 'Mismas reglas que las variables: `cabecera`, `mostrar_menu`…',
            'Dos puntos': 'Al final de la cabecera: `def cabecera():`',
            'Cuerpo con sangría': 'Las líneas de la función, desplazadas 4 espacios a la derecha.',
          },
        },
        { type: 'callout', tone: 'warn', title: 'Definir no es ejecutar', text: 'Al leer `def`, Python solo **aprende** la función: no ejecuta su cuerpo. El cuerpo se ejecuta cada vez que la **llamas** escribiendo su nombre con paréntesis.' },
        {
          type: 'check', id: 'm3d-sin-llamar', concept: 'funciones', mode: 'text',
          question: 'Predice:', code: 'def hola():\n    print("Hola")\n\nprint("Fin")', answer: 'Fin',
          explain: 'La función se define, pero nadie la llama: su `print` no llega a ejecutarse.',
        },
        {
          type: 'check', id: 'm3d-dos-llamadas', concept: 'funciones', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def eco():\n    print("¡Hola!")\n\neco()\neco()', expectOutput: '¡Hola!\n¡Hola!',
          options: [
            { text: '¡Hola! dos veces, una por línea', correct: true },
            { text: '¡Hola! una vez', why: 'Cada llamada ejecuta el cuerpo de nuevo: dos llamadas, dos saludos.' },
            { text: '¡Hola! tres veces', why: 'La definición no cuenta: solo las llamadas ejecutan el cuerpo.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sangria', title: 'La sangría marca el cuerpo', concepts: ['funciones', 'errores'],
      blocks: [
        { type: 'p', text: 'En Python, la **sangría** (los espacios a la izquierda) no es decorativa: decide qué líneas forman parte de la función. En cuanto una línea vuelve al margen, la función ha terminado.' },
        { type: 'code', run: true, code: 'def menu():\n    print("1. Jugar")\n    print("2. Opciones")\nprint("Bienvenida")   # fuera de la función\nmenu()' },
        { type: 'code', run: true, title: 'Sin sangría', code: 'def menu():\nprint("1. Jugar")' },
        { type: 'code', run: true, title: 'Sin dos puntos', code: 'def menu()\n    print("1. Jugar")' },
        { type: 'callout', tone: 'tip', title: 'Cuatro espacios', text: 'Usa siempre 4 espacios (el editor los pone al pulsar Tab). Mezclar 2 y 4 espacios en el mismo cuerpo produce un IndentationError.' },
        {
          type: 'check', id: 'm3d-fuera', concept: 'funciones', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def menu():\n    print("1. Jugar")\nprint("2. Salir")\nmenu()', expectOutput: '2. Salir\n1. Jugar',
          options: [
            { text: '«2. Salir» y después «1. Jugar»', correct: true },
            { text: '«1. Jugar» y después «2. Salir»', why: '«2. Salir» no tiene sangría: no pertenece a la función y se ejecuta antes, porque menu() se llama en la última línea.' },
            { text: 'Solo «1. Jugar»', why: 'La línea de «2. Salir» está fuera de la función, en el programa principal, así que también se ejecuta.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'flujo', title: 'Funciones que llaman a funciones', concepts: ['funciones', 'algoritmo'],
      blocks: [
        { type: 'p', text: 'Una función puede llamar a otra. Al hacerlo, Python **salta** al cuerpo de la función llamada, lo ejecuta entero y **vuelve** justo donde estaba. Es como un desvío que siempre regresa a la carretera.' },
        { type: 'p', text: 'Avanza paso a paso y fíjate en el panel **Memoria**: cada llamada abre su propio marco, que desaparece al terminar.' },
        { type: 'trace', code: 'def linea():\n    print("----------")\n\ndef titulo():\n    linea()\n    print("  LunaPy")\n    linea()\n\nprint("Inicio")\ntitulo()\nprint("Fin")' },
        {
          type: 'check', id: 'm3d-flujo', concept: 'funciones', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def a():\n    print("A")\n\ndef b():\n    print("B")\n    a()\n\nb()\na()', expectOutput: 'B\nA\nA',
          options: [
            { text: 'B, A, A (una por línea)', correct: true },
            { text: 'A, B, A', why: 'Python ejecuta las llamadas en orden: primero `b()`, que muestra B y después llama a `a()`.' },
            { text: 'B, A', why: 'Falta la última línea: después de `b()` hay otra llamada a `a()`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'orden', title: 'Primero definir, después llamar', concepts: ['funciones', 'errores'],
      blocks: [
        { type: 'p', text: 'Python lee el programa de arriba abajo. Si llamas a una función antes de que su `def` se haya ejecutado, todavía no la conoce:' },
        { type: 'code', run: true, code: 'saludar()\n\ndef saludar():\n    print("Hola")' },
        { type: 'callout', tone: 'tip', title: 'Una estructura que funciona siempre', text: 'Pon todas las definiciones arriba y el programa principal (las llamadas) abajo. Dentro de una función sí puedes llamar a otra definida más abajo, siempre que la llamada ocurra cuando ambas ya existen.' },
        {
          type: 'more', summary: 'Consejos para nombrar funciones',
          items: [
            'Usa verbos que describan la acción: `mostrar_menu`, `dibujar_linea`, `saludar`.',
            'No reutilices el nombre de una variable ni de una función de Python como `print` o `len`: la taparías.',
            'Python distingue mayúsculas: `Saludar()` y `saludar()` son nombres distintos.',
          ],
        },
        {
          type: 'check', id: 'm3d-antes', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'despedir()\n\ndef despedir():\n    print("Adiós")', expectError: 'NameError',
          options: [
            { text: 'NameError: despedir todavía no existe', correct: true },
            { text: 'Muestra Adiós', why: 'La llamada está en la primera línea, antes de que Python haya leído el `def`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'def-predict' },
    { id: 'a2', activity: 'def-complete' },
    { id: 'a3', activity: 'def-fix' },
    { id: 'a4', activity: 'def-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una función propia agrupa código bajo un nombre para reutilizarlo y cambiarlo en un solo sitio.',
    'Se define con `def nombre():` y un cuerpo con 4 espacios de sangría.',
    'Definir no ejecuta: el cuerpo se ejecuta en cada **llamada**, `nombre()`.',
    'La sangría decide qué líneas son de la función; sin sangría o sin dos puntos hay error.',
    'Al llamar, Python salta al cuerpo, lo ejecuta y vuelve a donde estaba.',
    'Define las funciones antes de llamarlas: definiciones arriba, programa principal abajo.',
  ],
};

export const ACTIVITIES_DEFINIR_FUNCIONES = {
  'def-predict': {
    id: 'def-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El estribillo', difficulty: 1, xp: 10, concepts: ['funciones'],
    prompt: 'Sigue el flujo: ¿cuándo se ejecuta el cuerpo de la función? **¿Qué mostrará?**',
    code: 'def estribillo():\n    print("la la la")\n\nprint("Inicio")\nestribillo()\nprint("Medio")\nestribillo()',
    expectedOutput: 'Inicio\nla la la\nMedio\nla la la',
    options: [
      { text: 'Inicio, la la la, Medio, la la la', correct: true },
      { text: 'la la la, Inicio, la la la, Medio, la la la', concept: 'funciones', why: 'La definición no ejecuta nada: el cuerpo solo se ejecuta en cada llamada.' },
      { text: 'Inicio, la la la, Medio', concept: 'funciones', why: 'Cada llamada ejecuta el cuerpo otra vez: hay dos llamadas, así que «la la la» sale dos veces.' },
      { text: 'Inicio, Medio, la la la, la la la', concept: 'funciones', why: 'Python ejecuta las líneas en orden: la primera llamada va entre «Inicio» y «Medio».' },
    ],
    explain: [
      'Líneas 1–2: Python aprende `estribillo`, sin ejecutarla.',
      'Muestra «Inicio» y la primera llamada muestra «la la la».',
      'Muestra «Medio» y la segunda llamada vuelve a mostrar «la la la».',
    ],
  },
  'def-complete': {
    id: 'def-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El menú enmarcado', difficulty: 1, xp: 15, concepts: ['funciones'],
    statement: 'Completa los huecos para **definir** la función `separador` y **llamarla** antes y después del título:',
    expected: '====================\nMenú del día\n====================',
    starter: '___ separador___\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\n___',
    spec: {
      blanks: true,
      functions: [{ name: 'separador', params: 0 }],
      cases: [{ label: 'Salida esperada', out_lines: ['====================', 'Menú del día', '===================='] }],
      misconceptions: [
        { out_lines: ['====================', 'Menú del día'], title: 'Falta una llamada', msg: 'La línea de abajo no aparece: el último hueco tiene que **llamar** a la función otra vez.' },
      ],
      rules: [{ type: 'must_call', name: 'separador', title: 'Usa la función', msg: 'Llama a separador() en lugar de repetir el print.' }],
      logic_msg: 'Compara tu salida con la esperada: una línea de iguales, el título y otra línea de iguales.',
    },
    hints: [
      { level: 'Orientación', text: 'Los dos primeros huecos están en la **definición**; el último, en el programa principal.' },
      { level: 'Razonamiento', text: '¿Con qué palabra empieza una definición? ¿Qué lleva el nombre detrás? ¿Cómo se ejecuta una función ya definida?' },
      { level: 'Pseudocódigo', text: 'definir separador sin datos:\n    mostrar 20 signos =\nllamar a separador\nmostrar el título\nllamar a separador', pre: true },
      { level: 'Ayuda técnica', text: 'La cabecera es `def separador():` (paréntesis y dos puntos). Para llamarla: `separador()`.' },
    ],
    solution: {
      code: 'def separador():\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\nseparador()',
      explanation: '`def separador():` define la función; cada `separador()` la ejecuta. La línea de iguales se escribe una sola vez y aparece dos.',
    },
    reference: ['def separador():\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\nseparador()'],
    wrongs: [
      { code: '___ separador___\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\n___', category: 'incompleto' },
      { code: 'def separador()\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\nseparador()', category: 'sintaxis' },
      { code: 'def separador():\n    print("=" * 20)\n\nseparador()\nprint("Menú del día")\nseparador', category: 'comprension' },
    ],
  },
  'def-fix': {
    id: 'def-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La cabecera rota', difficulty: 2, xp: 20, concepts: ['funciones', 'errores'],
    statement: 'Este programa debería mostrar la cabecera dos veces, pero tiene **tres errores**. Ejecútalo, lee cada error y corrígelo uno a uno.',
    expected: 'LunaPy\nAprende Python\nLunaPy\nAprende Python',
    starter: 'def cabecera()\n    print("LunaPy")\n  print("Aprende Python")\n\ncabecera()\nCabecera()',
    spec: {
      functions: [{ name: 'cabecera', params: 0, missing_msg: 'Mantén la función cabecera: corrige sus errores en lugar de quitarla.' }],
      cases: [{ label: 'Salida esperada', out_lines: ['LunaPy', 'Aprende Python', 'LunaPy', 'Aprende Python'] }],
      misconceptions: [
        { out_lines: ['Aprende Python', 'LunaPy', 'LunaPy'], title: 'Una línea se ha salido', msg: '«Aprende Python» se muestra una sola vez y al principio: esa línea ha quedado fuera de la función. Dale la misma sangría que la anterior.' },
      ],
      rules: [{ type: 'must_call', name: 'cabecera', title: 'Llama a la función', msg: 'El programa debe llamar a cabecera() en lugar de repetir los print.' }],
      logic_msg: 'Ya no hay errores, pero la salida no coincide. ¿Cuántas veces se llama a la función? ¿Están las dos líneas dentro?',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta y lee el primer error: Python revisa la escritura (sintaxis) antes de ejecutar nada. Corrige, vuelve a ejecutar y repite.' },
      { level: 'Razonamiento', text: '¿Qué le falta a la cabecera de la función al final? ¿Tienen las dos líneas del cuerpo la misma sangría? ¿Coincide el nombre de la última llamada con el de la definición?' },
      { level: 'Pseudocódigo', text: 'Línea 1: añadir los dos puntos\nLínea 3: 4 espacios de sangría, como la línea 2\nLínea 6: el nombre en minúsculas', pre: true },
      { level: 'Ayuda técnica', text: 'La cabecera termina en `:`. Todo el cuerpo lleva 4 espacios. Python distingue mayúsculas: `cabecera` no es `Cabecera`.' },
    ],
    solution: {
      code: 'def cabecera():\n    print("LunaPy")\n    print("Aprende Python")\n\ncabecera()\ncabecera()',
      explanation: 'Los dos primeros errores son de escritura (faltan los dos puntos y la sangría no coincide) y Python los detecta antes de ejecutar. El tercero, `Cabecera()`, es un NameError que solo aparece al ejecutar.',
    },
    reference: ['def cabecera():\n    print("LunaPy")\n    print("Aprende Python")\n\ncabecera()\ncabecera()'],
    wrongs: [
      { code: 'def cabecera()\n    print("LunaPy")\n  print("Aprende Python")\n\ncabecera()\nCabecera()', category: 'sintaxis' },
      { code: 'def cabecera():\n    print("LunaPy")\n  print("Aprende Python")\n\ncabecera()\nCabecera()', category: 'sintaxis' },
      { code: 'def cabecera():\n    print("LunaPy")\n    print("Aprende Python")\n\ncabecera()\nCabecera()', category: 'ejecucion' },
      { code: 'def cabecera():\n    print("LunaPy")\nprint("Aprende Python")\n\ncabecera()\ncabecera()', category: 'comprension' },
    ],
  },
  'def-build': {
    id: 'def-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La tarjeta de felicitación', difficulty: 2, xp: 25, concepts: ['funciones', 'descomponer'],
    unlock: { any: ['def-predict', 'def-complete', 'def-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define dos funciones:\n\n- `borde()`, que muestra una línea de **20 asteriscos**.\n- `tarjeta()`, que muestra el borde, el texto `¡Feliz cumpleaños!` y otra vez el borde, **llamando a `borde()`**.\n\nAl comprobar, LunaPy llamará a tus funciones. Puedes llamarlas tú también para probarlas.',
    expected: '********************\n¡Feliz cumpleaños!\n********************',
    plan: [
      {
        q: '¿Qué función debes definir primero?',
        options: [
          { text: 'Da igual el orden, siempre que las dos estén definidas antes de llamar a tarjeta()', correct: true },
          { text: 'Obligatoriamente tarjeta()', why: 'Lo único que importa es que, **cuando se llama** a `tarjeta()`, `borde()` ya exista.' },
        ],
      },
      {
        q: '¿Cómo muestra tarjeta() las líneas de asteriscos?',
        options: [
          { text: 'Llamando a borde() dos veces', correct: true },
          { text: 'Copiando el print de borde() dos veces', why: 'Funcionaría, pero si cambias el borde tendrías que cambiarlo en tres sitios. Reutilizar es la gracia de las funciones.' },
        ],
      },
    ],
    planScaffold: '# Función que dibuja el borde\n\n# Función que dibuja la tarjeta usando borde()\n\n# Prueba: llama a tarjeta()\n',
    starter: '',
    spec: {
      functions: [{ name: 'borde', params: 0 }, { name: 'tarjeta', params: 0 }],
      cases: [
        { label: 'tarjeta()', call: 'tarjeta()', out_lines: ['********************', '¡Feliz cumpleaños!', '********************'] },
        { label: 'borde()', call: 'borde()', out_lines: ['********************'] },
      ],
      misconceptions: [
        { out_lines: ['¡Feliz cumpleaños!'], title: 'Faltan los bordes', msg: '`tarjeta()` tiene que llamar a `borde()` antes y después del texto.' },
        { out_lines: ['********************', '¡Feliz cumpleaños!'], title: 'Falta el borde de abajo', msg: 'Después del texto, `tarjeta()` debe volver a llamar a `borde()`.' },
      ],
      rules: [{ type: 'must_call', name: 'borde', title: 'Reutiliza borde()', msg: 'Haz que tarjeta() llame a borde() en lugar de repetir los asteriscos.' }],
      logic_msg: 'Compara la salida con la esperada: 20 asteriscos exactos, el texto con sus signos y otros 20 asteriscos.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos funciones pequeñas. Empieza por `borde()`, pruébala llamándola y después escribe `tarjeta()`.' },
      { level: 'Razonamiento', text: 'Para 20 asteriscos no hace falta contarlos a mano: recuerda qué hace `*` con un texto.' },
      { level: 'Pseudocódigo', text: 'definir borde:\n    mostrar "*" repetido 20 veces\ndefinir tarjeta:\n    borde\n    mostrar ¡Feliz cumpleaños!\n    borde', pre: true },
      { level: 'Ayuda técnica', text: '`print("*" * 20)` muestra 20 asteriscos. Dentro de `tarjeta`, cada `borde()` lleva 4 espacios de sangría.' },
    ],
    solution: {
      code: 'def borde():\n    print("*" * 20)\n\ndef tarjeta():\n    borde()\n    print("¡Feliz cumpleaños!")\n    borde()\n\ntarjeta()',
      explanation: '`tarjeta()` reutiliza `borde()` dos veces. Si mañana quieres un borde de guiones, solo cambias una línea.',
    },
    reference: [
      'def borde():\n    print("*" * 20)\n\ndef tarjeta():\n    borde()\n    print("¡Feliz cumpleaños!")\n    borde()',
      'def tarjeta():\n    borde()\n    print("¡Feliz cumpleaños!")\n    borde()\n\ndef borde():\n    print("********************")\n\ntarjeta()',
    ],
    wrongs: [
      { code: 'def borde():\n    print("*" * 20)\n\ndef tarjeta():\n    print("¡Feliz cumpleaños!")', category: 'comprension' },
      { code: 'def borde():\n    print("*" * 20)\n\ndef tarjeta():\n    borde()\n    print("¡Feliz cumpleaños!")', category: 'comprension' },
      { code: 'def borde():\n    print("*" * 20)', category: 'comprension' },
      { code: 'def borde():\n    print("*" * 2)\n\ndef tarjeta():\n    borde()\n    print("¡Feliz cumpleaños!")\n    borde()', category: 'logica' },
    ],
  },
};
