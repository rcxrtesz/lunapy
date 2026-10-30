// Lección 6.1 · return a fondo. Contenido original, alineado con el cap. 6 de
// «Piensa en Python» (valores de retorno, código muerto, varios return) y PE1
// módulo 4 (return y None).

const TOPIC = 'Valores de retorno';

export const LESSON_RETORNO = {
  id: 'retorno',
  moduleId: 'm6',
  code: '6.1',
  title: 'return a fondo',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Usar varios return en una función y salir en cuanto se conoce la respuesta',
    'Reconocer el código muerto que hay después de un return',
    'Comprobar que todos los caminos devuelven un valor del mismo tipo',
    'Devolver dos valores a la vez y recogerlos en dos variables',
  ],
  prerequisites: ['Módulo 5 «Condicionales, lógica booleana y recursión»'],
  teaser: 'Empiezas el Módulo 6: ya usas return, pero hoy aprendes a sacarle todo el partido: salidas tempranas, código muerto y funciones que devuelven más de un valor.',
  celebration: 'Ya dominas return: salidas tempranas, caminos completos y varios valores a la vez.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'varios', title: 'Varios return en una función', concepts: ['retorno'],
      blocks: [
        { type: 'p', text: 'Una función puede tener varios `return`, uno en cada camino. En cuanto se ejecuta uno, la función **termina**: no se ejecuta nada más de ella.' },
        { type: 'code', run: true, code: 'def valor_absoluto(x):\n    if x < 0:\n        return -x\n    return x\n\nprint(valor_absoluto(-7), valor_absoluto(3))', caption: 'No hace falta `else`: si x < 0, el primer return ya ha salido de la función.' },
        {
          type: 'check', id: 'm6r-temprano', concept: 'retorno', mode: 'text',
          question: 'Predice:', code: 'def mayor(a, b):\n    if a > b:\n        return a\n    return b\n\nprint(mayor(3, 9), mayor(5, 2))', answer: '9 5',
          explain: 'mayor(3, 9): 3 > 9 es False, se salta el if y devuelve b (9). mayor(5, 2): devuelve a (5) y termina.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'muerto', title: 'Código muerto', concepts: ['retorno', 'errores'],
      blocks: [
        { type: 'p', text: 'Las líneas que hay **después** de un `return` en el mismo bloque nunca se ejecutan: es **código muerto**. Python no avisa, así que es un error silencioso.' },
        { type: 'code', run: true, code: 'def area(base, altura):\n    return base * altura\n    print("Área calculada")   # código muerto\n\nprint(area(3, 4))' },
        {
          type: 'check', id: 'm6r-muerto', concept: 'retorno', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def f(x):\n    resultado = x * 2\n    return resultado\n    resultado = resultado + 100\n\nprint(f(5))', expectOutput: '10',
          options: [
            { text: '10', correct: true },
            { text: '110', why: 'La línea que suma 100 está después del return: nunca se ejecuta.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'caminos', title: 'Todos los caminos, el mismo tipo', concepts: ['retorno', 'condicionales'],
      blocks: [
        { type: 'p', text: 'Ya sabes que si un camino no llega a un `return` la función devuelve `None`. Hay un segundo cuidado: que todos los caminos devuelvan **el mismo tipo** de valor. Si unos devuelven un número y otros un texto, quien use la función no sabrá qué esperar.' },
        { type: 'code', run: true, title: 'Mezcla tipos', code: 'def precio(edad):\n    if edad < 12:\n        return "Gratis"\n    return 10\n\ntotal = precio(30) + precio(8)   # ¡TypeError!' },
        { type: 'code', run: true, title: 'Siempre un número', code: 'def precio(edad):\n    if edad < 12:\n        return 0\n    return 10\n\nprint(precio(30) + precio(8))' },
        {
          type: 'check', id: 'm6r-tipo', concept: 'retorno', mode: 'choice',
          question: 'Una función `buscar_nota(nombre)` devuelve la nota de una alumna. ¿Qué debería devolver si la alumna no existe?',
          options: [
            { text: 'None, y documentarlo en el docstring', correct: true },
            { text: 'El texto "No existe"', why: 'Mezclaría números y textos: si alguien hace `buscar_nota(x) + 1`, el programa fallaría de forma confusa.' },
            { text: '0', why: 'Sería ambiguo: no sabrías si la alumna no existe o si sacó un 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'dos-valores', title: 'Devolver dos valores', concepts: ['retorno'],
      blocks: [
        { type: 'p', text: 'A veces una función calcula dos resultados relacionados. Puedes devolver los dos separándolos con una coma y recogerlos en dos variables:' },
        { type: 'code', run: true, code: 'def division(a, b):\n    return a // b, a % b\n\ncociente, resto = division(17, 5)\nprint("Cociente:", cociente)\nprint("Resto:", resto)' },
        { type: 'callout', tone: 'info', title: 'En realidad es una tupla', text: 'Python agrupa los dos valores en una **tupla**, que conocerás en el Módulo 10. Por ahora basta con saber que se recogen en el mismo orden: el primero en la primera variable.' },
        {
          type: 'check', id: 'm6r-dos', concept: 'retorno', mode: 'text',
          question: 'Predice:', code: 'def min_max(a, b):\n    if a < b:\n        return a, b\n    return b, a\n\nmenor, mayor = min_max(8, 3)\nprint(menor, mayor)', answer: '3 8',
          explain: '8 < 3 es False: devuelve (b, a) = (3, 8). menor recibe 3 y mayor recibe 8.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'ret-predict' },
    { id: 'a2', activity: 'ret-complete' },
    { id: 'a3', activity: 'ret-fix' },
    { id: 'a4', activity: 'ret-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una función puede tener varios `return`; el primero que se ejecuta la termina.',
    'Salir pronto con un `return` evita `else` innecesarios.',
    'Lo que va después de un `return` en el mismo bloque es **código muerto**: nunca se ejecuta.',
    'Todos los caminos deben devolver algo, y del mismo tipo. Para «no hay resultado», `None`.',
    '`return a, b` devuelve dos valores; se recogen con `x, y = funcion()`.',
  ],
};

export const ACTIVITIES_RETORNO = {
  'ret-predict': {
    id: 'ret-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La salida temprana', difficulty: 2, xp: 10, concepts: ['retorno'],
    prompt: 'Fíjate en dónde termina cada llamada. **¿Qué mostrará?**',
    code: 'def clasificar(n):\n    if n < 0:\n        return "negativo"\n    if n == 0:\n        return "cero"\n    print("comprobando...")\n    return "positivo"\n\nprint(clasificar(-2))\nprint(clasificar(4))',
    expectedOutput: 'negativo\ncomprobando...\npositivo',
    options: [
      { text: 'negativo, comprobando..., positivo', correct: true },
      { text: 'comprobando..., negativo, comprobando..., positivo', concept: 'retorno', why: 'Con -2, el primer return termina la función antes de llegar al print.' },
      { text: 'negativo, positivo', concept: 'retorno', why: 'Con 4 no se cumple ningún if, así que se ejecuta el print antes del último return.' },
      { text: 'negativo, cero, positivo', concept: 'retorno', why: 'Cada llamada devuelve un solo valor: con 4, la condición n == 0 es falsa.' },
    ],
    explain: ['clasificar(-2): -2 < 0 → devuelve "negativo" y termina.', 'clasificar(4): ningún if se cumple; muestra «comprobando...» y devuelve "positivo".'],
  },
  'ret-complete': {
    id: 'ret-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Horas y minutos', difficulty: 2, xp: 15, concepts: ['retorno', 'operadores'],
    statement: 'Completa `horas_y_minutos(total)` para que **devuelva dos valores**: las horas completas y los minutos que sobran. Después recógelos en dos variables.',
    expected: '2 h 15 min',
    starter: 'def horas_y_minutos(total):\n    return total // 60___ total % 60\n\nh, ___ = horas_y_minutos(135)\nprint(h, "h", m, "min")',
    spec: {
      blanks: true,
      allow_short_names: ['h', 'm'],
      functions: [{ name: 'horas_y_minutos', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['2 h 15 min'] },
        { label: 'horas_y_minutos(59)', call: 'print(horas_y_minutos(59))', out_lines: ['(0, 59)'] },
        { label: 'horas_y_minutos(180)', call: 'print(horas_y_minutos(180))', out_lines: ['(3, 0)'] },
      ],
      logic_msg: 'La función debe devolver primero las horas y después los minutos, separados por una coma.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer hueco separa los dos valores devueltos; el segundo es el nombre de la variable que recoge los minutos.' },
      { level: 'Razonamiento', text: '¿Qué signo separa dos valores en un return? Mira el print: ¿cómo se llama la variable de los minutos?' },
      { level: 'Pseudocódigo', text: 'devolver horas, minutos\nh, m ← horas_y_minutos(135)', pre: true },
      { level: 'Ayuda técnica', text: '`return total // 60, total % 60` y `h, m = horas_y_minutos(135)`.' },
    ],
    solution: {
      code: 'def horas_y_minutos(total):\n    return total // 60, total % 60\n\nh, m = horas_y_minutos(135)\nprint(h, "h", m, "min")',
      explanation: 'La coma en el return devuelve los dos valores juntos, y `h, m = …` los reparte en dos variables, en el mismo orden.',
    },
    reference: ['def horas_y_minutos(total):\n    return total // 60, total % 60\n\nh, m = horas_y_minutos(135)\nprint(h, "h", m, "min")'],
    wrongs: [
      { code: 'def horas_y_minutos(total):\n    return total // 60___ total % 60\n\nh, ___ = horas_y_minutos(135)\nprint(h, "h", m, "min")', category: 'incompleto' },
      { code: 'def horas_y_minutos(total):\n    return total // 60\n    return total % 60\n\nh, m = horas_y_minutos(135)\nprint(h, "h", m, "min")', category: 'ejecucion' },
      { code: 'def horas_y_minutos(total):\n    return total % 60, total // 60\n\nh, m = horas_y_minutos(135)\nprint(h, "h", m, "min")', category: 'logica' },
    ],
  },
  'ret-fix': {
    id: 'ret-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El descuento que nunca llega', difficulty: 2, xp: 20, concepts: ['retorno', 'errores'],
    statement: '`precio_final` debería aplicar un **10 % de descuento** a los pedidos de 100 € o más. No da errores, pero el descuento no se aplica nunca. Encuentra el fallo y corrígelo.',
    expected: '135.0\n50',
    starter: 'def precio_final(importe):\n    total = importe\n    return total\n    if importe >= 100:\n        total = importe * 0.9\n\nprint(precio_final(150))\nprint(precio_final(50))',
    spec: {
      functions: [{ name: 'precio_final', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['135.0', '50'] },
        { label: 'precio_final(100) (límite)', call: 'print(precio_final(100))', out_lines: ['90.0'] },
        { label: 'precio_final(99)', call: 'print(precio_final(99))', out_lines: ['99'] },
      ],
      misconceptions: [
        { out_lines: ['150', '50'], title: 'Sigue sin aplicarse', msg: 'El `return` está antes del if: la función termina sin llegar a comprobar el importe. Muévelo al final.' },
        { out_lines: ['None', '50'], title: 'Falta un return', msg: 'En el caso del descuento la función no devuelve nada. Asegúrate de que el return está al final y fuera del if.' },
      ],
      logic_msg: 'Comprueba el resultado con 150 € (135.0) y con 50 € (50).',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: 150 € sale 150. Sigue la función línea a línea: ¿qué ocurre al llegar al return?' },
      { level: 'Razonamiento', text: 'Todo lo que va después de un return en el mismo bloque es código muerto. ¿Dónde debería estar el return?' },
      { level: 'Pseudocódigo', text: 'total ← importe\nsi importe ≥ 100: total ← importe × 0.9\ndevolver total', pre: true },
      { level: 'Ayuda técnica', text: 'Mueve `return total` a la última línea de la función, sin sangría extra (al nivel de `total = importe`).' },
    ],
    solution: {
      code: 'def precio_final(importe):\n    total = importe\n    if importe >= 100:\n        total = importe * 0.9\n    return total\n\nprint(precio_final(150))\nprint(precio_final(50))',
      explanation: 'El if estaba detrás del return: era código muerto. Con el return al final, primero se decide el total y después se devuelve.',
    },
    reference: [
      'def precio_final(importe):\n    total = importe\n    if importe >= 100:\n        total = importe * 0.9\n    return total\n\nprint(precio_final(150))\nprint(precio_final(50))',
      'def precio_final(importe):\n    if importe >= 100:\n        return importe * 0.9\n    return importe\n\nprint(precio_final(150))\nprint(precio_final(50))',
    ],
    wrongs: [
      { code: 'def precio_final(importe):\n    total = importe\n    return total\n    if importe >= 100:\n        total = importe * 0.9\n\nprint(precio_final(150))\nprint(precio_final(50))', category: 'comprension' },
      { code: 'def precio_final(importe):\n    total = importe\n    if importe >= 100:\n        total = importe * 0.9\n        return total\n\nprint(precio_final(150))\nprint(precio_final(50))', category: 'logica' },
    ],
  },
  'ret-build': {
    id: 'ret-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Estadísticas de tres notas', difficulty: 3, xp: 30, concepts: ['retorno', 'descomponer'],
    unlock: { any: ['ret-predict', 'ret-complete', 'ret-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `estadisticas(a, b, c)` que reciba tres notas y **devuelva dos valores**: la **media** (redondeada a 2 decimales) y la **nota más alta**.\n\nEjemplo: `media, maxima = estadisticas(6, 9, 7.5)` → `7.5` y `9`.',
    expected: '7.5 9',
    plan: [
      {
        q: '¿Cómo obtienes la nota más alta?',
        options: [
          { text: 'Con max(a, b, c)', correct: true },
          { text: 'Con (a + b + c) / 3', why: 'Eso es la media, no la máxima.' },
        ],
      },
      {
        q: '¿Cómo devuelves los dos resultados?',
        options: [
          { text: 'return media, maxima', correct: true },
          { text: 'return media y en la línea siguiente return maxima', why: 'El primer return termina la función: el segundo sería código muerto.' },
        ],
      },
    ],
    planScaffold: 'def estadisticas(a, b, c):\n    # media redondeada y nota máxima\n\n\nmedia, maxima = estadisticas(6, 9, 7.5)\nprint(media, maxima)\n',
    starter: '',
    spec: {
      allow_short_names: ['a', 'b', 'c'],
      functions: [{ name: 'estadisticas', params: 3 }],
      cases: [
        { label: 'estadisticas(6, 9, 7.5)', call: 'm, x = estadisticas(6, 9, 7.5)\nprint(m, x)', out_lines: ['7.5 9'] },
        { label: 'estadisticas(5, 5, 6)', call: 'm, x = estadisticas(5, 5, 6)\nprint(m, x)', out_lines: ['5.33 6'] },
        { label: 'estadisticas(10, 2, 3)', call: 'm, x = estadisticas(10, 2, 3)\nprint(m, x)', out_lines: ['5.0 10'] },
      ],
      misconceptions: [
        { out_lines: ['5.333333333333333 6'], title: 'Falta redondear', msg: 'La media debe ir redondeada a 2 decimales: `round(media, 2)`.' },
      ],
      logic_msg: 'Comprueba el orden: primero la media (redondeada) y después la nota más alta.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos cálculos (media y máximo) y un return con los dos separados por coma.' },
      { level: 'Razonamiento', text: 'La media es la suma entre 3, con paréntesis. Para la máxima tienes una función que ya conoces del Módulo 3.' },
      { level: 'Pseudocódigo', text: 'media ← redondear((a + b + c) ÷ 3, 2)\nmaxima ← la mayor de a, b, c\ndevolver media, maxima', pre: true },
      { level: 'Ayuda técnica', text: '`round((a + b + c) / 3, 2)` y `max(a, b, c)`; después `return media, maxima`.' },
    ],
    solution: {
      code: 'def estadisticas(a, b, c):\n    """Devuelve la media (2 decimales) y la nota máxima de tres notas."""\n    media = round((a + b + c) / 3, 2)\n    maxima = max(a, b, c)\n    return media, maxima\n\nmedia, maxima = estadisticas(6, 9, 7.5)\nprint(media, maxima)',
      explanation: 'Cada resultado se calcula en su variable y se devuelven juntos. Quien llama los recoge en el mismo orden.',
    },
    reference: [
      'def estadisticas(a, b, c):\n    return round((a + b + c) / 3, 2), max(a, b, c)',
    ],
    wrongs: [
      { code: 'def estadisticas(a, b, c):\n    return (a + b + c) / 3, max(a, b, c)', category: 'comprension' },
      { code: 'def estadisticas(a, b, c):\n    return max(a, b, c), round((a + b + c) / 3, 2)', category: 'logica' },
      { code: 'def estadisticas(a, b, c):\n    return round((a + b + c) / 3, 2)\n    return max(a, b, c)', category: 'ejecucion' },
    ],
  },
};
