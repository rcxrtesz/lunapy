// Lección 7.2 · Bucles while. Contenido original, alineado con el cap. 7 de «Piensa
// en Python» (la sentencia while, break, raíces cuadradas por aproximación) y PE1
// módulo 3 (while, break, validar la entrada).

const TOPIC = 'Bucles';

export const LESSON_WHILE = {
  id: 'bucle-while',
  moduleId: 'm7',
  code: '7.2',
  title: 'Bucles while',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Repetir mientras se cumpla una condición con while',
    'Asegurarte de que el bucle termina y reconocer un bucle infinito',
    'Elegir entre for (número de vueltas conocido) y while (desconocido)',
    'Validar la entrada del usuario repitiendo la pregunta',
    'Salir de un bucle con break',
  ],
  prerequisites: ['Lección 7.1 «Bucles for»'],
  teaser: 'A veces no sabes cuántas vueltas hacen falta: «sigue pidiendo hasta que la respuesta sea válida». Para eso está while.',
  celebration: 'Ya controlas los bucles while: sabes cuándo terminan, cómo validar datos y cuándo salir con break.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'while', title: 'Repetir mientras…', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`while condicion:` repite su bloque **mientras** la condición sea verdadera. Antes de cada vuelta, Python vuelve a comprobarla.' },
        { type: 'code', run: true, code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("¡Despegue!")' },
        { type: 'trace', code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("¡Despegue!")' },
        {
          type: 'check', id: 'm7w-vueltas', concept: 'bucles', mode: 'text',
          question: 'Predice:', code: 'x = 1\nwhile x < 50:\n    x *= 3\nprint(x)', answer: '81',
          explain: '1 → 3 → 9 → 27 → 81. Con 81 la condición x < 50 ya es falsa y el bucle termina.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'infinito', title: 'Que el bucle termine', concepts: ['bucles', 'errores'],
      blocks: [
        { type: 'p', text: 'Algo dentro del bloque tiene que acercar la condición a ser **falsa**. Si no, el bucle no termina nunca: un **bucle infinito**.' },
        { type: 'code', title: 'Bucle infinito (no lo ejecutes)', code: 'n = 3\nwhile n > 0:\n    print(n)\n# falta n -= 1: n siempre vale 3' },
        { type: 'callout', tone: 'info', title: 'Si te pasa en LunaPy', text: 'LunaPy detiene el programa tras unos segundos y te avisa. Revisa qué variable debería cambiar en cada vuelta y si de verdad se acerca a hacer falsa la condición.' },
        {
          type: 'check', id: 'm7w-infinito', concept: 'bucles', mode: 'choice',
          question: '¿Cuál de estos bucles termina?',
          options: [
            { text: 'i = 0 / while i < 5: / i += 1', correct: true },
            { text: 'i = 0 / while i < 5: / i -= 1', why: 'i baja (−1, −2…) y siempre es menor que 5: nunca termina.' },
            { text: 'i = 0 / while i != 5: / i += 2', why: 'i vale 0, 2, 4, 6…: se salta el 5 y la condición nunca se hace falsa.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'cuando', title: '¿for o while?', concepts: ['bucles'],
      blocks: [
        {
          type: 'five', items: {
            'for': 'Cuando sabes **cuántas** vueltas o qué recorrer: del 1 al 10, cada letra de un texto.',
            'while': 'Cuando depende de una **condición** que no sabes cuándo se cumplirá: hasta que el ahorro llegue a 1000 €, hasta que el dato sea válido.',
          },
        },
        { type: 'code', run: true, code: '# ¿Cuántos años tarda en duplicarse un ahorro al 5 % anual?\nahorro = 1000\nanios = 0\nwhile ahorro < 2000:\n    ahorro *= 1.05\n    anios += 1\nprint(anios, "años:", round(ahorro, 2), "€")' },
        {
          type: 'check', id: 'm7w-cifras', concept: 'bucles', mode: 'text',
          question: 'Predice: ¿cuántas cifras tiene 2026?', code: 'n = 2026\ncifras = 0\nwhile n > 0:\n    n //= 10\n    cifras += 1\nprint(cifras)', answer: '4',
          explain: 'Cada vuelta quita la última cifra: 2026 → 202 → 20 → 2 → 0. Cuatro vueltas.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Validar la entrada', concepts: ['bucles', 'input'],
      blocks: [
        { type: 'p', text: 'Un uso clásico de while: **volver a preguntar** mientras el dato no sea válido.' },
        { type: 'code', run: true, code: 'edad = int(input("Edad: "))\nwhile edad < 0 or edad > 120:\n    print("Esa edad no es válida.")\n    edad = int(input("Edad: "))\nprint("Edad guardada:", edad)', caption: 'Prueba a escribir -5 o 200 antes de una edad correcta.' },
        {
          type: 'check', id: 'm7w-validar', concept: 'bucles', mode: 'choice',
          question: 'Si el usuario escribe 150 y después 30, ¿cuántas veces se muestra «Esa edad no es válida.»?',
          options: [
            { text: 'Una vez', correct: true },
            { text: 'Ninguna', why: '150 no cumple la condición de validez (es mayor que 120): entra en el bucle una vez.' },
            { text: 'Dos veces', why: 'Con 30 la condición del while ya es falsa: no se vuelve a entrar.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'break', title: 'Salir con break', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`break` sale del bucle **inmediatamente**, aunque la condición siga siendo verdadera. Se usa a menudo con `while True:` cuando la condición de salida se conoce dentro del bucle:' },
        { type: 'code', run: true, code: 'total = 0\nwhile True:\n    dato = input("Número (o «fin»): ")\n    if dato == "fin":\n        break\n    total += float(dato)\nprint("Total:", total)', caption: 'Escribe algunos números y después «fin».' },
        { type: 'callout', tone: 'tip', title: 'Con moderación', text: '`while True` con `break` es útil cuando hay que leer antes de decidir. Si la condición se puede escribir arriba, el while normal se lee mejor.' },
        {
          type: 'check', id: 'm7w-break', concept: 'bucles', mode: 'text',
          question: 'Predice:', code: 'n = 0\nwhile True:\n    n += 7\n    if n > 30:\n        break\nprint(n)', answer: '35',
          explain: '7, 14, 21, 28, 35: con 35 se cumple n > 30 y break sale del bucle.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'whi-predict' },
    { id: 'a2', activity: 'whi-complete' },
    { id: 'a3', activity: 'whi-fix' },
    { id: 'a4', activity: 'whi-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`while condicion:` repite mientras la condición sea verdadera; se comprueba antes de cada vuelta.',
    'Algo dentro del bucle debe acercar la condición a ser falsa; si no, hay un **bucle infinito**.',
    '`for` cuando sabes qué recorrer; `while` cuando depende de una condición.',
    'Para validar datos: pide, y mientras no sean válidos, vuelve a pedir.',
    '`break` sale del bucle en el momento; útil con `while True:`.',
  ],
};

export const ACTIVITIES_WHILE = {
  'whi-predict': {
    id: 'whi-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La planta que crece', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'Una planta mide 10 cm y crece la mitad de su altura cada semana. **¿Qué mostrará?**',
    code: 'altura = 10\nsemanas = 0\nwhile altura < 40:\n    altura = altura * 1.5\n    semanas += 1\nprint(semanas, altura)',
    expectedOutput: '4 50.625',
    options: [
      { text: '4 50.625', correct: true },
      { text: '3 33.75', concept: 'bucles', why: 'Con 33.75 la condición altura < 40 sigue siendo verdadera: hay una vuelta más.' },
      { text: '4 40', concept: 'bucles', why: 'El bucle no se detiene justo en 40: se detiene en la primera altura que deja de ser menor que 40.' },
      { text: '3 50.625', concept: 'bucles', why: 'Cuenta las vueltas: 15, 22.5, 33.75 y 50.625 son cuatro.' },
    ],
    explain: ['10 → 15 → 22.5 → 33.75 → 50.625.', 'Con 50.625, altura < 40 es falsa: el bucle termina tras 4 semanas.'],
  },
  'whi-complete': {
    id: 'whi-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La meta de ahorro', difficulty: 2, xp: 15, concepts: ['bucles', 'retorno'],
    statement: 'Completa `meses_para_ahorrar(meta, cuota)`: devuelve cuántos meses hacen falta para **llegar o superar** la meta ahorrando la misma cuota cada mes.',
    expected: '4\n10',
    starter: 'def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado ___ meta:\n        ahorrado += ___\n        meses += 1\n    return ___\n\nprint(meses_para_ahorrar(100, 30))\nprint(meses_para_ahorrar(500, 50))',
    spec: {
      blanks: true,
      functions: [{ name: 'meses_para_ahorrar', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['4', '10'] },
        { label: 'meses_para_ahorrar(90, 30) (exacto)', call: 'print(meses_para_ahorrar(90, 30))', out_lines: ['3'] },
        { label: 'meses_para_ahorrar(0, 10)', call: 'print(meses_para_ahorrar(0, 10))', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['4', '11'], title: 'Un mes de más', msg: 'Con `<=` sigues ahorrando cuando ya has llegado justo a la meta. Usa `<`: solo hace falta otro mes mientras lo ahorrado sea **menor** que la meta.' },
      ],
      logic_msg: 'Comprueba con 100 € y 30 al mes: 30, 60, 90, 120 → 4 meses.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: la condición para seguir ahorrando, lo que se suma cada mes y lo que se devuelve.' },
      { level: 'Razonamiento', text: '¿Mientras qué hay que seguir ahorrando? Si ya llegas justo a la meta, ¿hace falta otro mes?' },
      { level: 'Pseudocódigo', text: 'mientras ahorrado < meta:\n    ahorrado ← ahorrado + cuota\n    meses ← meses + 1\ndevolver meses', pre: true },
      { level: 'Ayuda técnica', text: '`while ahorrado < meta:`, `ahorrado += cuota` y `return meses`.' },
    ],
    solution: {
      code: 'def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado < meta:\n        ahorrado += cuota\n        meses += 1\n    return meses\n\nprint(meses_para_ahorrar(100, 30))\nprint(meses_para_ahorrar(500, 50))',
      explanation: 'No sabemos de antemano cuántos meses hacen falta: por eso while. La condición `ahorrado < meta` hace que se detenga en cuanto se llega o se supera la meta.',
    },
    reference: ['def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado < meta:\n        ahorrado += cuota\n        meses += 1\n    return meses\n\nprint(meses_para_ahorrar(100, 30))\nprint(meses_para_ahorrar(500, 50))'],
    wrongs: [
      { code: 'def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado ___ meta:\n        ahorrado += ___\n        meses += 1\n    return ___', category: 'incompleto' },
      { code: 'def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado <= meta:\n        ahorrado += cuota\n        meses += 1\n    return meses\n\nprint(meses_para_ahorrar(100, 30))\nprint(meses_para_ahorrar(500, 50))', category: 'comprension' },
      { code: 'def meses_para_ahorrar(meta, cuota):\n    ahorrado = 0\n    meses = 0\n    while ahorrado < meta:\n        ahorrado += cuota\n        meses += 1\n    return ahorrado\n\nprint(meses_para_ahorrar(100, 30))\nprint(meses_para_ahorrar(500, 50))', category: 'logica' },
    ],
  },
  'whi-fix': {
    id: 'whi-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El contador de cifras', difficulty: 2, xp: 20, concepts: ['bucles', 'errores'],
    statement: '`contar_cifras(n)` debería devolver cuántas cifras tiene un número entero positivo, pero siempre dice 1. Encuentra el fallo y corrígelo.',
    expected: '4\n1\n6',
    starter: 'def contar_cifras(n):\n    while n > 0:\n        cifras = 0\n        n //= 10\n        cifras += 1\n    return cifras\n\nprint(contar_cifras(2026))\nprint(contar_cifras(7))\nprint(contar_cifras(100000))',
    spec: {
      functions: [{ name: 'contar_cifras', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['4', '1', '6'] },
        { label: 'contar_cifras(99)', call: 'print(contar_cifras(99))', out_lines: ['2'] },
        { label: 'contar_cifras(123456789)', call: 'print(contar_cifras(123456789))', out_lines: ['9'] },
      ],
      misconceptions: [
        { out_lines: ['1', '1', '1'], title: 'El contador se reinicia', msg: '`cifras = 0` está dentro del bucle: vuelve a cero en cada vuelta. Inicialízalo antes del while.' },
      ],
      skip_tips: ['repeated_numbers'],
      logic_msg: 'Comprueba con 2026: el bucle debe dar 4 vueltas (2026 → 202 → 20 → 2 → 0).',
    },
    hints: [
      { level: 'Orientación', text: 'Es el mismo fallo que viste con for: ¿dónde se inicializa el contador?' },
      { level: 'Razonamiento', text: 'Si `cifras = 0` se ejecuta en cada vuelta, al final solo puede valer 1.' },
      { level: 'Pseudocódigo', text: 'cifras ← 0\nmientras n > 0:\n    n ← n // 10\n    cifras ← cifras + 1\ndevolver cifras', pre: true },
      { level: 'Ayuda técnica', text: 'Mueve `cifras = 0` antes del `while`, al nivel de sangría del while.' },
    ],
    solution: {
      code: 'def contar_cifras(n):\n    cifras = 0\n    while n > 0:\n        n //= 10\n        cifras += 1\n    return cifras\n\nprint(contar_cifras(2026))\nprint(contar_cifras(7))\nprint(contar_cifras(100000))',
      explanation: 'El contador se inicializa una vez, antes del bucle, y aumenta en cada vuelta: tantas vueltas como cifras tenga el número.',
    },
    reference: ['def contar_cifras(n):\n    cifras = 0\n    while n > 0:\n        n //= 10\n        cifras += 1\n    return cifras\n\nprint(contar_cifras(2026))\nprint(contar_cifras(7))\nprint(contar_cifras(100000))'],
    wrongs: [
      { code: 'def contar_cifras(n):\n    while n > 0:\n        cifras = 0\n        n //= 10\n        cifras += 1\n    return cifras\n\nprint(contar_cifras(2026))\nprint(contar_cifras(7))\nprint(contar_cifras(100000))', category: 'comprension' },
      { code: 'def contar_cifras(n):\n    cifras = 0\n    while n > 9:\n        n //= 10\n        cifras += 1\n    return cifras\n\nprint(contar_cifras(2026))\nprint(contar_cifras(7))\nprint(contar_cifras(100000))', category: 'logica' },
    ],
  },
  'whi-build': {
    id: 'whi-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'La nota válida', difficulty: 3, xp: 30, concepts: ['bucles', 'input', 'condicionales'],
    unlock: { any: ['whi-predict', 'whi-complete', 'whi-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Escribe un programa que pida una nota (puede tener decimales) y, **mientras no esté entre 0 y 10**, muestre `Nota no válida` y la vuelva a pedir. Cuando sea válida, muestra `Nota guardada: ` seguido de la nota.\n\nEjemplo: si el usuario escribe 15, -2 y 7.5, el programa muestra «Nota no válida» dos veces y después «Nota guardada: 7.5».',
    expected: 'Nota no válida\nNota no válida\nNota guardada: 7.5',
    plan: [
      {
        q: '¿Cuál es la condición para seguir pidiendo?',
        options: [
          { text: 'nota < 0 or nota > 10', correct: true },
          { text: 'nota < 0 and nota > 10', why: 'Ningún número es a la vez menor que 0 y mayor que 10: el bucle no se ejecutaría nunca.' },
          { text: '0 <= nota <= 10', why: 'Esa es la condición de una nota **válida**: el bucle tiene que repetirse mientras **no** lo sea.' },
        ],
      },
      {
        q: '¿Dónde se pide la nota?',
        options: [
          { text: 'Una vez antes del while y otra al final de cada vuelta', correct: true },
          { text: 'Solo antes del while', why: 'Entonces, si la primera nota no es válida, nunca cambiaría: bucle infinito.' },
        ],
      },
    ],
    planScaffold: '# Pedir la nota\n\n# Mientras no sea válida: avisar y volver a pedir\n\n# Mostrar la nota guardada\n',
    starter: '',
    spec: {
      cases: [
        { label: '15, -2 y 7.5', stdin: ['15', '-2', '7.5'], out_lines: ['Nota no válida', 'Nota no válida', 'Nota guardada: 7.5'] },
        { label: 'Válida a la primera: 8', stdin: ['8'], out_lines: ['Nota guardada: 8.0'] },
        { label: 'Límites: 10.5 y 10', stdin: ['10.5', '10'], out_lines: ['Nota no válida', 'Nota guardada: 10.0'] },
        { label: 'Límite: 0', stdin: ['0'], out_lines: ['Nota guardada: 0.0'] },
      ],
      misconceptions: [
        { out_lines: ['Nota no válida', 'Nota guardada: -2.0'], title: 'Solo se comprueba una vez', msg: 'Has usado if: comprueba la primera nota, pero la segunda ya no. Usa while para repetir mientras no sea válida.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir la nota', msg: 'Usa input() para pedir la nota (y float() para convertirla).' }],
      logic_msg: 'Compara con la salida esperada: un «Nota no válida» por cada intento incorrecto y al final «Nota guardada: …».',
    },
    hints: [
      { level: 'Orientación', text: 'Pedir, comprobar con while, avisar y volver a pedir; al salir del bucle, mostrar.' },
      { level: 'Razonamiento', text: 'La condición del while describe una nota **no** válida: menor que 0 o mayor que 10. Dentro, la nota tiene que cambiar para que el bucle pueda terminar.' },
      { level: 'Pseudocódigo', text: 'nota ← pedir decimal\nmientras nota < 0 o nota > 10:\n    mostrar "Nota no válida"\n    nota ← pedir decimal\nmostrar "Nota guardada:", nota', pre: true },
      { level: 'Ayuda técnica', text: '`nota = float(input("Nota: "))`, `while nota < 0 or nota > 10:` y dentro vuelve a hacer `nota = float(input("Nota: "))`.' },
    ],
    solution: {
      code: 'nota = float(input("Nota: "))\nwhile nota < 0 or nota > 10:\n    print("Nota no válida")\n    nota = float(input("Nota: "))\nprint("Nota guardada:", nota)',
      explanation: 'El bucle se repite mientras la nota no sea válida, y dentro se vuelve a pedir: así la condición puede llegar a ser falsa. Con un if solo se comprobaría la primera vez.',
    },
    reference: [
      'nota = float(input("Nota: "))\nwhile nota < 0 or nota > 10:\n    print("Nota no válida")\n    nota = float(input("Nota: "))\nprint("Nota guardada:", nota)',
      'while True:\n    nota = float(input())\n    if 0 <= nota <= 10:\n        break\n    print("Nota no válida")\nprint("Nota guardada:", nota)',
    ],
    wrongs: [
      { code: 'nota = float(input())\nif nota < 0 or nota > 10:\n    print("Nota no válida")\n    nota = float(input())\nprint("Nota guardada:", nota)', category: 'comprension' },
      { code: 'nota = float(input())\nwhile nota < 0 and nota > 10:\n    print("Nota no válida")\n    nota = float(input())\nprint("Nota guardada:", nota)', category: 'logica' },
    ],
  },
};
