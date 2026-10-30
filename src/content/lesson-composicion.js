// Lección 6.3 · Composición y funciones booleanas. Contenido original, alineado con
// el cap. 6 de «Piensa en Python» (composición, funciones booleanas, comprobar tipos,
// más recursión: Fibonacci).

const TOPIC = 'Valores de retorno';

export const LESSON_COMPOSICION = {
  id: 'composicion',
  moduleId: 'm6',
  code: '6.3',
  title: 'Composición y funciones booleanas',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Construir funciones nuevas llamando a otras que ya funcionan',
    'Simplificar funciones booleanas que usan if para devolver True o False',
    'Usar funciones booleanas como condiciones',
    'Proteger una función de datos no válidos con isinstance',
    'Combinar recursión y composición (Fibonacci)',
  ],
  prerequisites: ['Lección 6.2 «Desarrollo incremental»', 'Lección 5.3 «Recursión»'],
  teaser: 'Con funciones pequeñas que ya funcionan puedes construir otras más grandes como si fueran piezas de construcción.',
  celebration: 'Has completado el Módulo 6: construyes funciones con otras funciones, escribes booleanas limpias y proteges tu código de datos raros.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'componer', title: 'Composición: funciones hechas de funciones', concepts: ['composicion'],
      blocks: [
        { type: 'p', text: '**Componer** es usar funciones que ya funcionan para construir otras nuevas. Por ejemplo, el área de un círculo dado su centro y un punto del borde: el radio es la distancia entre los dos puntos.' },
        { type: 'code', run: true, code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef area(radio):\n    return math.pi * radio ** 2\n\ndef area_circulo(xc, yc, xp, yp):\n    return area(distancia(xc, yc, xp, yp))\n\nprint(round(area_circulo(0, 0, 3, 4), 2))', caption: 'area_circulo no repite ninguna fórmula: confía en distancia y en area, que ya están probadas.' },
        {
          type: 'check', id: 'm6c-componer', concept: 'composicion', mode: 'text',
          question: 'Predice:', code: 'def doble(x):\n    return x * 2\n\ndef mas_uno(x):\n    return x + 1\n\nprint(doble(mas_uno(4)), mas_uno(doble(4)))', answer: '10 9',
          explain: 'De dentro hacia fuera: doble(5) = 10 y mas_uno(8) = 9. El orden de composición importa.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'booleanas', title: 'Funciones booleanas limpias', concepts: ['composicion', 'booleanos'],
      blocks: [
        { type: 'p', text: 'Es muy habitual ver funciones booleanas escritas así:' },
        { type: 'code', title: 'Funciona, pero sobra código', code: 'def es_divisible(x, y):\n    if x % y == 0:\n        return True\n    else:\n        return False' },
        { type: 'p', text: 'La comparación `x % y == 0` **ya es** True o False. Basta con devolverla:' },
        { type: 'code', run: true, title: 'Mejor', code: 'def es_divisible(x, y):\n    return x % y == 0\n\nprint(es_divisible(10, 5), es_divisible(10, 3))' },
        { type: 'p', text: 'Y al usarla en una condición, no hace falta compararla con True: la llamada ya se lee como una pregunta.' },
        { type: 'code', run: true, code: 'def es_divisible(x, y):\n    return x % y == 0\n\nif es_divisible(2026, 2):\n    print("2026 es par")' },
        {
          type: 'check', id: 'm6c-simplificar', concept: 'booleanos', mode: 'choice',
          question: '¿Cuál es la forma más clara de escribir el cuerpo de `es_adulta(edad)`?',
          options: [
            { text: 'return edad >= 18', correct: true },
            { text: 'if edad >= 18: return True / else: return False', why: 'Funciona, pero es una forma larga de devolver lo mismo que ya vale la comparación.' },
            { text: 'return edad >= 18 == True', why: 'Además de sobrar, Python lo lee como una comparación encadenada (edad >= 18 and 18 == True) y da False siempre.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'proteger', title: 'Proteger una función de datos raros', concepts: ['composicion', 'tipos'],
      blocks: [
        { type: 'p', text: '¿Qué hace `factorial(1.5)` o `factorial(-1)`? El caso base `n == 0` nunca se alcanza: recursión infinita. Una función robusta comprueba sus datos al principio y sale pronto si no valen.' },
        { type: 'p', text: '`isinstance(valor, int)` devuelve True si el valor es de ese tipo:' },
        { type: 'code', run: true, code: 'def factorial(n):\n    if not isinstance(n, int) or n < 0:\n        return None   # dato no válido\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))\nprint(factorial(1.5))\nprint(factorial(-2))' },
        { type: 'callout', tone: 'info', title: 'Cláusulas de guarda', text: 'Esos `if` iniciales que salen pronto con datos no válidos se llaman **cláusulas de guarda**. Dejan el resto de la función limpio: ahí ya sabes que los datos son correctos.' },
        {
          type: 'check', id: 'm6c-isinstance', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'print(isinstance(3, int), isinstance(3.0, int), isinstance("3", str))', answer: 'True False True',
          explain: '3 es int; 3.0 es float, aunque valga lo mismo; "3" es un texto.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'fibonacci', title: 'Fibonacci: recursión con dos llamadas', concepts: ['recursion', 'composicion'],
      blocks: [
        { type: 'p', text: 'En la sucesión de **Fibonacci**, cada número es la suma de los dos anteriores: 0, 1, 1, 2, 3, 5, 8, 13… Se define de forma natural con recursión: dos casos base y **dos** llamadas recursivas.' },
        { type: 'code', run: true, code: 'def fibonacci(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(6))\nprint(fibonacci(10))' },
        { type: 'callout', tone: 'warn', title: 'Elegante, pero lenta', text: 'fibonacci(30) hace más de un millón de llamadas, porque repite los mismos cálculos una y otra vez. Cuando conozcas los bucles y los diccionarios verás formas mucho más rápidas.' },
        {
          type: 'check', id: 'm6c-fib', concept: 'recursion', mode: 'text',
          question: 'Predice:', code: 'def fibonacci(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(7))', answer: '13',
          explain: '0, 1, 1, 2, 3, 5, 8, 13: el de la posición 7 es 13.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'comp-predict' },
    { id: 'a2', activity: 'comp-complete' },
    { id: 'a3', activity: 'comp-fix' },
    { id: 'a4', activity: 'comp-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '**Componer** es construir funciones nuevas llamando a otras ya probadas.',
    'Una función booleana devuelve directamente la comparación: `return x % y == 0`.',
    'En una condición, usa la llamada tal cual: `if es_divisible(n, 2):`.',
    '`isinstance(valor, tipo)` comprueba el tipo; las **cláusulas de guarda** salen pronto con datos no válidos.',
    'Fibonacci: dos casos base y dos llamadas recursivas. Elegante, pero lenta para números grandes.',
  ],
};

export const ACTIVITIES_COMPOSICION = {
  'comp-predict': {
    id: 'comp-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Piezas encadenadas', difficulty: 2, xp: 10, concepts: ['composicion'],
    prompt: 'Tres funciones pequeñas y una que las combina. **¿Qué mostrará?**',
    code: 'def cuadrado(x):\n    return x * x\n\ndef es_par(n):\n    return n % 2 == 0\n\ndef cuadrado_si_par(n):\n    if es_par(n):\n        return cuadrado(n)\n    return n\n\nprint(cuadrado_si_par(4), cuadrado_si_par(5), es_par(cuadrado(3)))',
    expectedOutput: '16 5 False',
    options: [
      { text: '16 5 False', correct: true },
      { text: '16 25 False', concept: 'composicion', why: '5 no es par: cuadrado_si_par devuelve el número sin cambiar.' },
      { text: '16 5 True', concept: 'composicion', why: 'cuadrado(3) es 9, y 9 no es par.' },
      { text: '4 5 False', concept: 'composicion', why: '4 es par, así que se devuelve su cuadrado: 16.' },
    ],
    explain: ['cuadrado_si_par(4): 4 es par → 16.', 'cuadrado_si_par(5): 5 es impar → 5.', 'es_par(cuadrado(3)) → es_par(9) → False.'],
  },
  'comp-complete': {
    id: 'comp-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El perímetro del triángulo', difficulty: 2, xp: 15, concepts: ['composicion', 'modulos'],
    statement: 'Ya tienes `distancia`. Completa `perimetro` para que calcule el perímetro de un triángulo **reutilizando** `distancia` para cada uno de sus tres lados.',
    expected: '12.0',
    starter: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimetro(ax, ay, bx, by, cx, cy):\n    lado1 = distancia(ax, ay, bx, by)\n    lado2 = ___(bx, by, cx, cy)\n    lado3 = distancia(___, ___, ax, ay)\n    return lado1 + lado2 + lado3\n\nprint(perimetro(0, 0, 3, 0, 3, 4))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'perimetro', params: 6 }, { name: 'distancia', params: 4 }],
      cases: [
        { label: 'Programa completo', out_lines: ['12.0'] },
        { label: 'perimetro(0, 0, 1, 0, 0, 1)', call: 'print(round(perimetro(0, 0, 1, 0, 0, 1), 4))', out_lines: ['3.4142'] },
        { label: 'perimetro(1, 1, 4, 5, 1, 5)', call: 'print(perimetro(1, 1, 4, 5, 1, 5))', out_lines: ['12.0'] },
      ],
      rules: [{ type: 'must_call', name: 'distancia', title: 'Reutiliza distancia', msg: 'Calcula cada lado llamando a distancia en lugar de repetir la fórmula.' }],
      logic_msg: 'Cada lado une dos vértices distintos: A con B, B con C y C con A.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer hueco es el nombre de la función que calcula lados; los otros dos, las coordenadas del vértice C.' },
      { level: 'Razonamiento', text: 'El tercer lado va de C a A: ¿cuáles son las coordenadas de C?' },
      { level: 'Pseudocódigo', text: 'lado2 ← distancia de B a C\nlado3 ← distancia de C a A', pre: true },
      { level: 'Ayuda técnica', text: '`distancia(bx, by, cx, cy)` y `distancia(cx, cy, ax, ay)`.' },
    ],
    solution: {
      code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimetro(ax, ay, bx, by, cx, cy):\n    lado1 = distancia(ax, ay, bx, by)\n    lado2 = distancia(bx, by, cx, cy)\n    lado3 = distancia(cx, cy, ax, ay)\n    return lado1 + lado2 + lado3\n\nprint(perimetro(0, 0, 3, 0, 3, 4))',
      explanation: 'perimetro no sabe nada de raíces ni de cuadrados: confía en distancia. Los lados del triángulo de ejemplo miden 3, 4 y 5.',
    },
    reference: ['import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimetro(ax, ay, bx, by, cx, cy):\n    lado1 = distancia(ax, ay, bx, by)\n    lado2 = distancia(bx, by, cx, cy)\n    lado3 = distancia(cx, cy, ax, ay)\n    return lado1 + lado2 + lado3\n\nprint(perimetro(0, 0, 3, 0, 3, 4))'],
    wrongs: [
      { code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimetro(ax, ay, bx, by, cx, cy):\n    lado1 = distancia(ax, ay, bx, by)\n    lado2 = ___(bx, by, cx, cy)\n    lado3 = distancia(___, ___, ax, ay)\n    return lado1 + lado2 + lado3', category: 'incompleto' },
      { code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimetro(ax, ay, bx, by, cx, cy):\n    lado1 = distancia(ax, ay, bx, by)\n    lado2 = distancia(bx, by, cx, cy)\n    lado3 = distancia(bx, by, ax, ay)\n    return lado1 + lado2 + lado3\n\nprint(perimetro(0, 0, 3, 0, 3, 4))', category: 'logica' },
    ],
  },
  'comp-fix': {
    id: 'comp-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La booleana enrevesada', difficulty: 2, xp: 20, concepts: ['composicion', 'booleanos'],
    statement: '`es_vocal(letra)` debería devolver True para a, e, i, o, u, pero devuelve un **texto** en lugar de un booleano, y además está escrita de forma muy larga. Corrígela para que devuelva True o False y **simplifícala** a una sola línea de return.',
    expected: 'True\nFalse',
    starter: 'def es_vocal(letra):\n    if letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":\n        return "True"\n    else:\n        return "False"\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))',
    spec: {
      exact_lines: true,
      functions: [{ name: 'es_vocal', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True', 'False'] },
        { label: 'es_vocal("u")', call: 'print(es_vocal("u"))', out_lines: ['True'] },
        { label: 'es_vocal("b")', call: 'print(es_vocal("b"))', out_lines: ['False'] },
        { label: 'type(es_vocal("a"))', call: 'print(type(es_vocal("a")).__name__)', out_lines: ['bool'] },
      ],
      misconceptions: [
        { out_lines: ['str'], title: 'Devuelve un texto', msg: '"True" entre comillas es un texto, no un booleano. Devuelve directamente la comparación: `return letra == "a" or …`.' },
      ],
      logic_msg: 'La función debe devolver True solo para las cinco vocales.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos problemas: las comillas alrededor de True y False, y el if/else que sobra.' },
      { level: 'Razonamiento', text: 'La condición del if ya vale True o False. ¿Qué pasa si la devuelves directamente?' },
      { level: 'Pseudocódigo', text: 'devolver (letra es "a") o (letra es "e") o … o (letra es "u")', pre: true },
      { level: 'Ayuda técnica', text: '`return letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u"`.' },
    ],
    solution: {
      code: 'def es_vocal(letra):\n    return letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u"\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))',
      explanation: '"True" con comillas es un texto: parece un booleano al mostrarlo, pero `if es_vocal("z"):` sería verdadero (un texto no vacío cuenta como verdadero). Devolver la comparación da un booleano de verdad y elimina el if.',
    },
    reference: [
      'def es_vocal(letra):\n    return letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u"\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))',
      'def es_vocal(letra):\n    if letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":\n        return True\n    return False\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))',
    ],
    wrongs: [
      { code: 'def es_vocal(letra):\n    if letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":\n        return "True"\n    else:\n        return "False"\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))', category: 'comprension' },
      { code: 'def es_vocal(letra):\n    return letra == "a" or "e" or "i" or "o" or "u"\n\nprint(es_vocal("e"))\nprint(es_vocal("z"))', category: 'logica' },
    ],
  },
  'comp-build': {
    id: 'comp-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: '¿Es un triángulo rectángulo?', difficulty: 3, xp: 30, concepts: ['composicion', 'booleanos', 'descomponer'],
    unlock: { any: ['comp-predict', 'comp-complete', 'comp-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define dos funciones:\n\n• `cuadrado(x)`, que devuelve x².\n\n• `es_rectangulo(a, b, c)`, que devuelve True si los lados a, b y c (con **c el más largo**) forman un triángulo rectángulo, es decir, si a² + b² = c². Usa `cuadrado` dentro de `es_rectangulo`.\n\nEjemplos: `es_rectangulo(3, 4, 5)` → True; `es_rectangulo(2, 3, 4)` → False.',
    expected: 'True',
    plan: [
      {
        q: '¿Qué devuelve es_rectangulo?',
        options: [
          { text: 'El resultado de comparar a² + b² con c²', correct: true },
          { text: 'El texto "Sí" o "No"', why: 'Una función booleana devuelve True o False, para poder usarla en un if.' },
        ],
      },
      {
        q: '¿Cómo aprovechas cuadrado?',
        options: [
          { text: 'return cuadrado(a) + cuadrado(b) == cuadrado(c)', correct: true },
          { text: 'Copiando a * a dentro de es_rectangulo', why: 'Funcionaría, pero el enunciado pide componer: reutilizar la función que ya tienes.' },
        ],
      },
    ],
    planScaffold: 'def cuadrado(x):\n    # devolver x al cuadrado\n\n\ndef es_rectangulo(a, b, c):\n    # devolver la comparación usando cuadrado\n\n\nprint(es_rectangulo(3, 4, 5))\n',
    starter: '',
    spec: {
      exact_lines: true,
      allow_short_names: ['a', 'b', 'c', 'x'],
      functions: [{ name: 'cuadrado', params: 1 }, { name: 'es_rectangulo', params: 3 }],
      cases: [
        { label: 'es_rectangulo(3, 4, 5)', call: 'print(es_rectangulo(3, 4, 5))', out_lines: ['True'] },
        { label: 'es_rectangulo(2, 3, 4)', call: 'print(es_rectangulo(2, 3, 4))', out_lines: ['False'] },
        { label: 'es_rectangulo(5, 12, 13)', call: 'print(es_rectangulo(5, 12, 13))', out_lines: ['True'] },
        { label: 'es_rectangulo(6, 8, 11)', call: 'print(es_rectangulo(6, 8, 11))', out_lines: ['False'] },
        { label: 'cuadrado(7)', call: 'print(cuadrado(7))', out_lines: ['49'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'Muestra, pero no devuelve', msg: 'Usa return en lugar de print.' },
        { out_lines: ['None'], title: 'Falta un return', msg: 'Alguna de las funciones no devuelve nada. Revisa que las dos terminen en return.' },
      ],
      rules: [{ type: 'must_call', name: 'cuadrado', title: 'Compón las funciones', msg: 'es_rectangulo debe llamar a cuadrado en lugar de repetir el cálculo.' }],
      logic_msg: 'Comprueba con 3, 4, 5: 9 + 16 = 25, así que debe dar True.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos funciones muy cortas: cada una cabe en una línea de return.' },
      { level: 'Razonamiento', text: 'La comparación a² + b² == c² ya es True o False: devuélvela directamente.' },
      { level: 'Pseudocódigo', text: 'cuadrado(x): devolver x × x\nes_rectangulo(a, b, c): devolver cuadrado(a) + cuadrado(b) == cuadrado(c)', pre: true },
      { level: 'Ayuda técnica', text: '`return x * x` y `return cuadrado(a) + cuadrado(b) == cuadrado(c)`.' },
    ],
    solution: {
      code: 'def cuadrado(x):\n    return x * x\n\ndef es_rectangulo(a, b, c):\n    """Devuelve True si a, b y c (c el mayor) forman un triángulo rectángulo."""\n    return cuadrado(a) + cuadrado(b) == cuadrado(c)\n\nprint(es_rectangulo(3, 4, 5))',
      explanation: 'es_rectangulo se lee casi como el teorema de Pitágoras porque delega el cálculo en cuadrado y devuelve directamente la comparación.',
    },
    reference: [
      'def cuadrado(x):\n    return x ** 2\n\ndef es_rectangulo(a, b, c):\n    return cuadrado(a) + cuadrado(b) == cuadrado(c)',
    ],
    wrongs: [
      { code: 'def cuadrado(x):\n    return x * x\n\ndef es_rectangulo(a, b, c):\n    print(cuadrado(a) + cuadrado(b) == cuadrado(c))', category: 'comprension' },
      { code: 'def cuadrado(x):\n    return x * x\n\ndef es_rectangulo(a, b, c):\n    return a + b == c', category: 'logica' },
    ],
  },
};
