// Lección 5.3 · Recursión. Contenido original, alineado con el cap. 5 de «Piensa en
// Python» (recursión, diagramas de pila, recursión infinita) y el cap. 6 (factorial).
// Antes de los bucles, la recursión es la primera forma de repetir.

const TOPIC = 'Recursión';

export const LESSON_RECURSION = {
  id: 'recursion',
  moduleId: 'm5',
  code: '5.3',
  title: 'Recursión',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explicar qué es una función recursiva',
    'Identificar el caso base y el paso recursivo',
    'Seguir la pila de llamadas de una función recursiva',
    'Reconocer y corregir una recursión infinita',
    'Escribir funciones recursivas que devuelven un resultado',
  ],
  prerequisites: ['Lección 5.2 «if, elif y else»', 'Lección 3.3 «Parámetros y variables locales»'],
  teaser: 'Una función que se llama a sí misma suena a trampa, pero es una forma muy elegante de repetir. Hoy descubres cómo funciona sin perderte.',
  celebration: 'Has completado el Módulo 5: tus programas deciden con condicionales y repiten con recursión.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'Una función que se llama a sí misma', concepts: ['recursion'],
      blocks: [
        { type: 'p', text: 'Una función puede llamar a otras… y también **a sí misma**. Eso es la **recursión**. Para no repetirse para siempre necesita dos partes:' },
        {
          type: 'five', items: {
            'Caso base': 'La situación en la que la función **ya no** se llama a sí misma y termina.',
            'Paso recursivo': 'La función se llama a sí misma con un problema **más pequeño**, que se acerca al caso base.',
          },
        },
        { type: 'code', run: true, code: 'def cuenta_atras(n):\n    if n == 0:              # caso base\n        print("¡Despegue!")\n    else:\n        print(n)\n        cuenta_atras(n - 1)  # paso recursivo: un número menos\n\ncuenta_atras(3)' },
        {
          type: 'check', id: 'm5r-partes', concept: 'recursion', mode: 'choice',
          question: 'En `cuenta_atras`, ¿qué garantiza que la función acabe terminando?',
          options: [
            { text: 'Que cada llamada usa n - 1 y llega a 0, el caso base', correct: true },
            { text: 'El print', why: 'El print solo muestra el número. Lo que hace que termine es que n se acerca al caso base en cada llamada.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'pila', title: 'La pila de llamadas', concepts: ['recursion'],
      blocks: [
        { type: 'p', text: 'Cada llamada recursiva abre un **marco nuevo**, con su propia `n`. Los marcos se apilan y se van cerrando cuando las llamadas terminan, en orden inverso. Avanza paso a paso y observa la memoria:' },
        { type: 'trace', code: 'def cuenta_atras(n):\n    if n == 0:\n        print("¡Despegue!")\n    else:\n        print(n)\n        cuenta_atras(n - 1)\n\ncuenta_atras(2)' },
        { type: 'callout', tone: 'info', title: 'Cada n es distinta', text: 'Cuando `cuenta_atras(2)` llama a `cuenta_atras(1)`, hay dos variables `n` a la vez, una en cada marco (2 y 1). Son locales: no se pisan.' },
        {
          type: 'check', id: 'm5r-marcos', concept: 'recursion', mode: 'choice',
          question: 'Con `cuenta_atras(2)`, ¿cuántos marcos de cuenta_atras llega a haber a la vez como máximo?',
          options: [
            { text: '3: con n = 2, n = 1 y n = 0', correct: true },
            { text: '1: el anterior se borra al llamar al siguiente', why: 'Un marco no se cierra hasta que su llamada termina. Mientras espera a la siguiente llamada, sigue en la pila.' },
            { text: '2', why: 'Cuenta también la llamada del caso base: cuenta_atras(0) abre su propio marco.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Recursión que devuelve un resultado', concepts: ['recursion', 'parametros'],
      blocks: [
        { type: 'p', text: 'El ejemplo clásico es el **factorial**: 4! = 4 × 3 × 2 × 1. Fíjate en que 4! = 4 × 3!, y 3! = 3 × 2!… Cada factorial se define con el anterior, hasta llegar a 0! = 1:' },
        { type: 'code', run: true, code: 'def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(4))\nprint(factorial(10))' },
        { type: 'p', text: 'Las llamadas bajan hasta el caso base y los resultados **suben**: factorial(0) devuelve 1, factorial(1) devuelve 1 × 1, factorial(2) devuelve 2 × 1… hasta 4 × 6 = 24.' },
        { type: 'callout', tone: 'tip', title: 'El salto de fe', text: 'Al escribir el paso recursivo, **confía** en que la llamada más pequeña devuelve lo correcto. Solo tienes que pensar: «si ya tuviera factorial(n - 1), ¿cómo obtengo factorial(n)?».' },
        {
          type: 'check', id: 'm5r-suma', concept: 'recursion', mode: 'text',
          question: 'Predice:', code: 'def suma(n):\n    if n == 0:\n        return 0\n    return n + suma(n - 1)\n\nprint(suma(4))', answer: '10',
          explain: '4 + 3 + 2 + 1 + 0 = 10.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'infinita', title: 'Recursión infinita', concepts: ['recursion', 'errores'],
      blocks: [
        { type: 'p', text: 'Si falta el caso base, o si el paso recursivo no se acerca a él, la función se llama a sí misma sin parar. Python la detiene al llegar a unas mil llamadas con un **RecursionError**:' },
        { type: 'code', run: true, code: 'def cuenta_atras(n):\n    print(n)\n    cuenta_atras(n - 1)   # ¡no hay caso base!\n\ncuenta_atras(3)' },
        {
          type: 'five', items: {
            'Falta el caso base': 'Ninguna rama termina sin volver a llamar.',
            'No se acerca al caso base': 'Por ejemplo, `cuenta_atras(n + 1)` cuando el caso base es 0.',
            'El caso base no se alcanza': '`if n == 0` con n que empieza en 2.5 y baja de 1 en 1: salta del 0.5 al -0.5.',
          },
        },
        {
          type: 'check', id: 'm5r-infinita', concept: 'recursion', mode: 'choice',
          question: '¿Qué ocurre?', code: 'def f(n):\n    if n == 0:\n        return 0\n    return f(n + 1)\n\nprint(f(3))', expectError: 'RecursionError',
          options: [
            { text: 'RecursionError: n se aleja del caso base', correct: true },
            { text: 'Muestra 0', why: 'n empieza en 3 y sube (4, 5, 6…): nunca llega a 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'rec-predict' },
    { id: 'a2', activity: 'rec-complete' },
    { id: 'a3', activity: 'rec-fix' },
    { id: 'a4', activity: 'rec-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una función **recursiva** se llama a sí misma.',
    'Necesita un **caso base** (termina sin llamarse) y un **paso recursivo** que se acerque a él.',
    'Cada llamada tiene su propio marco con sus variables; los marcos se cierran en orden inverso.',
    'Para devolver un resultado: `return n * factorial(n - 1)`. Confía en la llamada más pequeña.',
    'Sin caso base, o si no se alcanza, hay un **RecursionError**.',
  ],
};

export const ACTIVITIES_RECURSION = {
  'rec-predict': {
    id: 'rec-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El eco que vuelve', difficulty: 3, xp: 15, concepts: ['recursion'],
    prompt: 'Aquí hay un print **antes** y otro **después** de la llamada recursiva. **¿Qué mostrará?**',
    code: 'def eco(n):\n    if n == 0:\n        return\n    print("baja", n)\n    eco(n - 1)\n    print("sube", n)\n\neco(2)',
    expectedOutput: 'baja 2\nbaja 1\nsube 1\nsube 2',
    options: [
      { text: 'baja 2, baja 1, sube 1, sube 2', correct: true },
      { text: 'baja 2, sube 2, baja 1, sube 1', concept: 'recursion', why: 'El «sube 2» no se ejecuta hasta que termina toda la llamada eco(1), incluido su «sube 1».' },
      { text: 'baja 2, baja 1, sube 2, sube 1', concept: 'recursion', why: 'Los marcos se cierran en orden inverso: primero termina eco(1) y después eco(2).' },
      { text: 'baja 2, baja 1', concept: 'recursion', why: 'Después de cada llamada recursiva, la función sigue con su línea siguiente: el print de «sube».' },
    ],
    explain: ['eco(2) muestra «baja 2» y llama a eco(1).', 'eco(1) muestra «baja 1» y llama a eco(0), que termina sin hacer nada.', 'eco(1) continúa: «sube 1».', 'eco(2) continúa: «sube 2».'],
  },
  'rec-complete': {
    id: 'rec-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Potencias recursivas', difficulty: 2, xp: 15, concepts: ['recursion'],
    statement: 'Completa la función recursiva `potencia(base, exp)`. Idea: base⁰ = 1, y base^exp = base × base^(exp − 1).',
    expected: '8 1 81',
    starter: 'def potencia(base, exp):\n    if exp == ___:\n        return 1\n    return base * potencia(base, ___)\n\nprint(potencia(2, 3), potencia(5, 0), potencia(3, 4))',
    spec: {
      blanks: true,
      functions: [{ name: 'potencia', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['8 1 81'] },
        { label: 'potencia(10, 2)', call: 'print(potencia(10, 2))', out_lines: ['100'] },
        { label: 'potencia(7, 1)', call: 'print(potencia(7, 1))', out_lines: ['7'] },
      ],
      rules: [{ type: 'must_call', name: 'potencia', title: 'Usa la recursión', msg: 'La función debe llamarse a sí misma.' }],
      logic_msg: 'Revisa el caso base (¿con qué exponente el resultado es 1?) y que cada llamada reduzca el exponente en 1.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer hueco es el caso base; el segundo, cómo cambia el exponente en la llamada recursiva.' },
      { level: 'Razonamiento', text: '¿Cuánto vale cualquier número elevado a 0? En cada llamada, el exponente tiene que acercarse a ese valor.' },
      { level: 'Pseudocódigo', text: 'si exp es 0: devolver 1\ndevolver base × potencia(base, exp − 1)', pre: true },
      { level: 'Ayuda técnica', text: '`if exp == 0:` y `potencia(base, exp - 1)`.' },
    ],
    solution: {
      code: 'def potencia(base, exp):\n    if exp == 0:\n        return 1\n    return base * potencia(base, exp - 1)\n\nprint(potencia(2, 3), potencia(5, 0), potencia(3, 4))',
      explanation: 'potencia(2, 3) = 2 × potencia(2, 2) = 2 × 2 × potencia(2, 1) = 2 × 2 × 2 × potencia(2, 0) = 2 × 2 × 2 × 1 = 8.',
    },
    reference: ['def potencia(base, exp):\n    if exp == 0:\n        return 1\n    return base * potencia(base, exp - 1)\n\nprint(potencia(2, 3), potencia(5, 0), potencia(3, 4))'],
    wrongs: [
      { code: 'def potencia(base, exp):\n    if exp == ___:\n        return 1\n    return base * potencia(base, ___)', category: 'incompleto' },
      { code: 'def potencia(base, exp):\n    if exp == 0:\n        return 1\n    return base * potencia(base, exp + 1)\n\nprint(potencia(2, 3), potencia(5, 0), potencia(3, 4))', category: 'ejecucion' },
      { code: 'def potencia(base, exp):\n    if exp == 1:\n        return 1\n    return base * potencia(base, exp - 1)\n\nprint(potencia(2, 3), potencia(5, 1), potencia(3, 4))', category: 'logica' },
    ],
  },
  'rec-fix': {
    id: 'rec-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La suma que no termina', difficulty: 2, xp: 20, concepts: ['recursion', 'errores'],
    statement: '`suma_digitos(n)` debería sumar las cifras de un número entero positivo (472 → 13), pero da un **RecursionError**. Encuentra por qué no termina y corrígelo.',
    expected: '13\n9\n0',
    starter: 'def suma_digitos(n):\n    return n % 10 + suma_digitos(n // 10)\n\nprint(suma_digitos(472))\nprint(suma_digitos(9))\nprint(suma_digitos(0))',
    spec: {
      skip_tips: ['repeated_numbers'], // el 10 separa cifras: no es un número mágico
      functions: [{ name: 'suma_digitos', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['13', '9', '0'] },
        { label: 'suma_digitos(2026)', call: 'print(suma_digitos(2026))', out_lines: ['10'] },
        { label: 'suma_digitos(99999)', call: 'print(suma_digitos(99999))', out_lines: ['45'] },
      ],
      rules: [{ type: 'must_call', name: 'suma_digitos', title: 'Mantén la recursión', msg: 'Corrige la función recursiva en lugar de cambiarla por otra cosa.' }],
      logic_msg: 'Ya termina, pero el resultado no es correcto. ¿Qué debe devolver la función cuando n es 0?',
    },
    hints: [
      { level: 'Orientación', text: 'Una recursión necesita dos partes. ¿Cuál de ellas falta aquí?' },
      { level: 'Razonamiento', text: 'Cada llamada quita la última cifra (n // 10). ¿A qué número se llega al final? ¿Qué debería devolver la función ahí, sin volver a llamarse?' },
      { level: 'Pseudocódigo', text: 'si n es 0: devolver 0\ndevolver última cifra + suma_digitos(n sin la última cifra)', pre: true },
      { level: 'Ayuda técnica', text: 'Añade al principio: `if n == 0:` y dentro `return 0`.' },
    ],
    solution: {
      code: 'def suma_digitos(n):\n    if n == 0:\n        return 0\n    return n % 10 + suma_digitos(n // 10)\n\nprint(suma_digitos(472))\nprint(suma_digitos(9))\nprint(suma_digitos(0))',
      explanation: 'Faltaba el caso base. Al quitar cifras con `// 10` siempre se acaba llegando a 0, y ahí la suma de cifras es 0: la función devuelve sin volver a llamarse.',
    },
    reference: ['def suma_digitos(n):\n    if n == 0:\n        return 0\n    return n % 10 + suma_digitos(n // 10)\n\nprint(suma_digitos(472))\nprint(suma_digitos(9))\nprint(suma_digitos(0))'],
    wrongs: [
      { code: 'def suma_digitos(n):\n    return n % 10 + suma_digitos(n // 10)\n\nprint(suma_digitos(472))\nprint(suma_digitos(9))\nprint(suma_digitos(0))', category: 'ejecucion' },
      { code: 'def suma_digitos(n):\n    if n == 0:\n        return 1\n    return n % 10 + suma_digitos(n // 10)\n\nprint(suma_digitos(472))\nprint(suma_digitos(9))\nprint(suma_digitos(0))', category: 'logica' },
    ],
  },
  'rec-build': {
    id: 'rec-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La escalera de asteriscos', difficulty: 3, xp: 30, concepts: ['recursion', 'descomponer'],
    unlock: { any: ['rec-predict', 'rec-complete', 'rec-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define una función **recursiva** `escalera(n)` que dibuje una escalera de n peldaños: la primera línea con 1 asterisco, la segunda con 2… y la última con n. Si n es 0, no muestra nada.\n\nPista de diseño: para dibujar la escalera de n peldaños, primero dibuja la de n − 1 y después añade la línea de n asteriscos.',
    expected: '*\n**\n***',
    plan: [
      {
        q: '¿Cuál es el caso base?',
        options: [
          { text: 'n == 0: no hay que dibujar nada', correct: true },
          { text: 'n == 3', why: 'La función tiene que servir para cualquier n. El caso más pequeño posible es 0 peldaños.' },
        ],
      },
      {
        q: 'En el paso recursivo, ¿en qué orden van las dos instrucciones?',
        options: [
          { text: 'Primero escalera(n - 1) y después la línea de n asteriscos', correct: true },
          { text: 'Primero la línea de n asteriscos y después escalera(n - 1)', why: 'Así la escalera saldría al revés: de n asteriscos a 1.' },
        ],
      },
    ],
    planScaffold: 'def escalera(n):\n    # caso base\n\n    # paso recursivo: la escalera de n - 1 y después la línea de n\n\n\nescalera(3)\n',
    starter: '',
    spec: {
      functions: [{ name: 'escalera', params: 1 }],
      cases: [
        { label: 'escalera(3)', call: 'escalera(3)', out_lines: ['*', '**', '***'] },
        { label: 'escalera(1)', call: 'escalera(1)', out_lines: ['*'] },
        { label: 'escalera(5)', call: 'escalera(5)', out_lines: ['*', '**', '***', '****', '*****'] },
        { label: 'escalera(0)', call: 'escalera(0)', out_lines: [] },
      ],
      misconceptions: [
        { out_lines: ['***', '**', '*'], title: 'Escalera al revés', msg: 'Has dibujado la línea antes de la llamada recursiva. Llama primero a `escalera(n - 1)` y después dibuja la línea de n asteriscos.' },
      ],
      rules: [{ type: 'must_call', name: 'escalera', title: 'Usa la recursión', msg: 'La función escalera debe llamarse a sí misma.' }],
      logic_msg: 'La escalera de n peldaños tiene n líneas: 1 asterisco en la primera y n en la última.',
    },
    hints: [
      { level: 'Orientación', text: 'Igual que la cuenta atrás, pero el print va **después** de la llamada recursiva.' },
      { level: 'Razonamiento', text: 'Si ya supieras dibujar la escalera de n − 1 peldaños, ¿qué te faltaría para la de n? Una sola línea.' },
      { level: 'Pseudocódigo', text: 'si n es 0: no hacer nada (terminar)\nsi no:\n    escalera(n − 1)\n    mostrar "*" repetido n veces', pre: true },
      { level: 'Ayuda técnica', text: '`if n > 0:` con dentro `escalera(n - 1)` y `print("*" * n)`. Cuando n es 0, no entra en el if y termina.' },
    ],
    solution: {
      code: 'def escalera(n):\n    if n == 0:\n        return\n    escalera(n - 1)\n    print("*" * n)\n\nescalera(3)',
      explanation: 'La llamada recursiva dibuja primero los peldaños de arriba; al volver, cada marco añade su línea. Como los marcos se cierran en orden inverso, las líneas salen de 1 a n.',
    },
    reference: [
      'def escalera(n):\n    if n == 0:\n        return\n    escalera(n - 1)\n    print("*" * n)',
      'def escalera(n):\n    if n > 0:\n        escalera(n - 1)\n        print("*" * n)\n\nescalera(3)',
    ],
    wrongs: [
      { code: 'def escalera(n):\n    if n == 0:\n        return\n    print("*" * n)\n    escalera(n - 1)', category: 'comprension' },
      { code: 'def escalera(n):\n    escalera(n - 1)\n    print("*" * n)', category: 'ejecucion' },
      { code: 'def escalera(n):\n    print("*")\n    print("**")\n    print("***")', category: 'logica' },
    ],
  },
};
