// Lección 6.2 · Desarrollo incremental. Contenido original, alineado con el cap. 6
// de «Piensa en Python» (desarrollo incremental, andamiaje, el ejemplo de la
// distancia entre dos puntos).

const TOPIC = 'Valores de retorno';

export const LESSON_INCREMENTAL = {
  id: 'incremental',
  moduleId: 'm6',
  code: '6.2',
  title: 'Desarrollo incremental',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Empezar una función por su interfaz y un resultado provisional',
    'Avanzar en pasos pequeños, ejecutando después de cada uno',
    'Usar print temporales (andamiaje) para ver valores intermedios',
    'Quitar el andamiaje cuando la función ya funciona',
  ],
  prerequisites: ['Lección 6.1 «return a fondo»', 'Lección 4.3 «Refactorización»'],
  teaser: 'Las funciones largas dan miedo si se escriben de golpe. Hoy aprendes a construirlas paso a paso, sin perderte nunca.',
  celebration: 'Ya sabes construir funciones paso a paso: siempre sabes en qué parte está el error, porque es la última que has añadido.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'problema', title: 'El problema: la distancia entre dos puntos', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Queremos una función que calcule la distancia entre dos puntos del plano, (x1, y1) y (x2, y2). La fórmula es:' },
        { type: 'p', text: '**distancia = √((x2 − x1)² + (y2 − y1)²)**' },
        { type: 'p', text: 'Escribirla de golpe es arriesgado: si falla, no sabrás qué parte está mal. En lugar de eso, iremos **paso a paso**, ejecutando después de cada uno.' },
        {
          type: 'check', id: 'm6i-datos', concept: 'incremental', mode: 'choice',
          question: '¿Qué parámetros necesita la función?',
          options: [
            { text: 'Cuatro: x1, y1, x2 e y2', correct: true },
            { text: 'Uno: la distancia', why: 'La distancia es el resultado: se devuelve, no entra como dato.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso1', title: 'Paso 1: la interfaz y un resultado provisional', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Empieza por la **cabecera** y devuelve un valor provisional. La función todavía no calcula nada, pero ya se puede llamar y comprobar que no hay errores de escritura:' },
        { type: 'code', run: true, code: 'def distancia(x1, y1, x2, y2):\n    return 0.0\n\nprint(distancia(1, 2, 4, 6))' },
        { type: 'callout', tone: 'tip', title: 'Elige un ejemplo que sepas resolver', text: 'De (1, 2) a (4, 6): las diferencias son 3 y 4, así que la distancia es 5 (un triángulo 3-4-5). Así podrás comprobar cada paso.' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso2', title: 'Paso 2: las diferencias, con andamiaje', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Calcula la primera parte y **muéstrala** con un print temporal. Ese print es **andamiaje**: sirve para comprobar mientras construyes.' },
        { type: 'code', run: true, code: 'def distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    print("dx =", dx, "dy =", dy)   # andamiaje\n    return 0.0\n\nprint(distancia(1, 2, 4, 6))', caption: 'Debería mostrar dx = 3 y dy = 4. Si no, el error está en estas dos líneas: no hay que buscar en ningún otro sitio.' },
        {
          type: 'check', id: 'm6i-dx', concept: 'incremental', mode: 'text',
          question: 'Con distancia(2, 5, 7, 1), ¿qué valor tendrá dy?', code: 'x1, y1, x2, y2 = 2, 5, 7, 1\nprint(y2 - y1)', answer: '-4',
          explain: 'dy = y2 − y1 = 1 − 5 = −4. Al elevarlo al cuadrado el signo dará igual.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso3', title: 'Paso 3 y 4: terminar y quitar el andamiaje', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Con las diferencias comprobadas, añade la suma de cuadrados (y compruébala: debería ser 25), después la raíz… y por último **quita el print temporal**:' },
        { type: 'code', run: true, code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    suma_cuadrados = dx ** 2 + dy ** 2\n    return math.sqrt(suma_cuadrados)\n\nprint(distancia(1, 2, 4, 6))\nprint(distancia(0, 0, 1, 1))' },
        {
          type: 'five', items: {
            '1 · Interfaz': 'Cabecera y un return provisional.',
            '2 · Un trozo': 'Añade una o dos líneas y muestra el resultado intermedio.',
            '3 · Comprueba': 'Con un ejemplo que sepas resolver a mano.',
            '4 · Limpia': 'Cuando funciona, quita los print de andamiaje.',
          },
        },
        { type: 'callout', tone: 'warn', title: 'No olvides quitar el andamiaje', text: 'Un print olvidado dentro de una función que devuelve un valor ensucia la salida de cualquier programa que la use.' },
        {
          type: 'check', id: 'm6i-andamio', concept: 'incremental', mode: 'choice',
          question: '¿Qué mostrará este programa?', code: 'def doble(x):\n    print("x vale", x)\n    return x * 2\n\nprint(doble(4) + 1)', expectOutput: 'x vale 4\n9',
          options: [
            { text: '«x vale 4» y después 9', correct: true },
            { text: 'Solo 9', why: 'El print de andamiaje sigue dentro de la función: se ejecuta en cada llamada.' },
          ],
          explain: 'Por eso el andamiaje hay que quitarlo cuando la función ya funciona.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'inc-order' },
    { id: 'a2', activity: 'inc-complete' },
    { id: 'a3', activity: 'inc-fix' },
    { id: 'a4', activity: 'inc-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Empieza por la cabecera y un `return` provisional: la función ya se puede llamar.',
    'Añade poco a poco y ejecuta después de cada paso: el error estará en lo último que añadiste.',
    'Usa print temporales (**andamiaje**) para ver los valores intermedios.',
    'Comprueba con ejemplos que sepas resolver a mano.',
    'Cuando la función funcione, quita el andamiaje.',
  ],
};

export const ACTIVITIES_INCREMENTAL = {
  'inc-order': {
    id: 'inc-order', type: 'order', kindLabel: 'Ordena los pasos', topic: TOPIC,
    title: 'El plan incremental', difficulty: 1, xp: 10, concepts: ['incremental', 'descomponer'],
    statement: 'Vas a escribir `area_circulo(radio)` siguiendo el desarrollo incremental. **Ordena los pasos** del plan.',
    stages: [
      {
        title: 'Ordena el plan de desarrollo',
        items: [
          { id: 'i1', text: 'Escribir la cabecera con return 0.0 y llamarla', after: [] },
          { id: 'i2', text: 'Calcular radio ** 2 y mostrarlo con un print temporal', after: ['i1'], why: 'Antes de calcular nada, la función tiene que existir y poder llamarse.' },
          { id: 'i3', text: 'Comprobar con radio 2 que el cuadrado vale 4', after: ['i2'], why: 'Solo puedes comprobar un valor después de calcularlo.' },
          { id: 'i4', text: 'Multiplicar por math.pi y devolver el resultado', after: ['i3'], why: 'Primero se comprueba la parte anterior; así, si algo falla después, sabes que el error está en el último paso.' },
          { id: 'i5', text: 'Quitar el print temporal', after: ['i4'], why: 'El andamiaje se quita al final, cuando la función ya funciona.' },
        ],
        success: 'Cada paso es pequeño y se comprueba antes de seguir. Si algo falla, el error está en lo último que has añadido.',
      },
    ],
  },
  'inc-complete': {
    id: 'inc-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La distancia, terminada', difficulty: 2, xp: 15, concepts: ['incremental', 'modulos'],
    statement: 'La función ya calcula las diferencias. Completa los huecos para **devolver** la distancia entre los dos puntos.',
    expected: '5.0\n13.0',
    starter: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ___ 2 + ___ ** 2)\n\nprint(distancia(1, 2, 4, 6))\nprint(distancia(0, 0, 5, 12))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'distancia', params: 4 }],
      cases: [
        { label: 'Programa completo', out_lines: ['5.0', '13.0'] },
        { label: 'distancia(3, 3, 3, 3)', call: 'print(distancia(3, 3, 3, 3))', out_lines: ['0.0'] },
        { label: 'distancia(-1, -1, 2, 3)', call: 'print(distancia(-1, -1, 2, 3))', out_lines: ['5.0'] },
      ],
      logic_msg: 'La distancia es la raíz de dx² + dy². Comprueba que elevas las dos diferencias al cuadrado.',
    },
    hints: [
      { level: 'Orientación', text: 'Dentro de la raíz hay que sumar los cuadrados de dx y de dy.' },
      { level: 'Razonamiento', text: '¿Qué operador eleva a una potencia? ¿Qué variable falta en la segunda parte?' },
      { level: 'Pseudocódigo', text: 'devolver raíz(dx² + dy²)', pre: true },
      { level: 'Ayuda técnica', text: '`math.sqrt(dx ** 2 + dy ** 2)`.' },
    ],
    solution: {
      code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ** 2 + dy ** 2)\n\nprint(distancia(1, 2, 4, 6))\nprint(distancia(0, 0, 5, 12))',
      explanation: 'Con las diferencias ya comprobadas, el último paso solo añade la suma de cuadrados y la raíz.',
    },
    reference: ['import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ** 2 + dy ** 2)\n\nprint(distancia(1, 2, 4, 6))\nprint(distancia(0, 0, 5, 12))'],
    wrongs: [
      { code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ___ 2 + ___ ** 2)', category: 'incompleto' },
      { code: 'import math\n\ndef distancia(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx * 2 + dy ** 2)\n\nprint(distancia(1, 2, 4, 6))\nprint(distancia(0, 0, 5, 12))', category: 'logica' },
    ],
  },
  'inc-fix': {
    id: 'inc-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El andamio olvidado', difficulty: 2, xp: 20, concepts: ['incremental', 'retorno'],
    statement: 'Esta función calcula bien, pero quien la escribió se olvidó de algo del desarrollo incremental: la salida del programa sale **sucia**. Déjala limpia sin cambiar lo que devuelve.',
    expected: 'Total: 26.62',
    starter: 'def precio_con_iva(precio):\n    iva = precio * 0.21\n    print("iva:", iva)\n    total = precio + iva\n    print("total:", total)\n    return round(total, 2)\n\nprint("Total:", precio_con_iva(22))',
    spec: {
      functions: [{ name: 'precio_con_iva', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Total: 26.62'] },
        { label: 'print(precio_con_iva(100))', call: 'print(precio_con_iva(100))', out_lines: ['121.0'] },
      ],
      misconceptions: [
        { out_contains: 'iva:', title: 'Queda andamiaje', msg: 'Todavía hay un print temporal dentro de la función. Quita los dos: la función ya funciona.' },
        { out_contains: 'total:', title: 'Queda andamiaje', msg: 'Todavía queda el print del total dentro de la función. Quítalo.' },
      ],
      logic_msg: 'La salida debe ser una sola línea: «Total: 26.62».',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: además de «Total: 26.62» aparecen otras líneas. ¿De dónde salen?' },
      { level: 'Razonamiento', text: 'Hay dos print dentro de la función que servían para comprobar mientras se escribía. ¿Siguen siendo necesarios?' },
      { level: 'Pseudocódigo', text: 'quitar print("iva:", iva)\nquitar print("total:", total)', pre: true },
      { level: 'Ayuda técnica', text: 'Borra las dos líneas con print de dentro de la función; deja el return y el print del programa principal.' },
    ],
    solution: {
      code: 'def precio_con_iva(precio):\n    iva = precio * 0.21\n    total = precio + iva\n    return round(total, 2)\n\nprint("Total:", precio_con_iva(22))',
      explanation: 'Los print de dentro eran andamiaje: útiles mientras se construía la función, pero sobran cuando ya funciona. Mostrar es tarea del programa principal.',
    },
    reference: ['def precio_con_iva(precio):\n    iva = precio * 0.21\n    total = precio + iva\n    return round(total, 2)\n\nprint("Total:", precio_con_iva(22))'],
    wrongs: [
      { code: 'def precio_con_iva(precio):\n    iva = precio * 0.21\n    print("iva:", iva)\n    total = precio + iva\n    print("total:", total)\n    return round(total, 2)\n\nprint("Total:", precio_con_iva(22))', category: 'comprension' },
      { code: 'def precio_con_iva(precio):\n    iva = precio * 0.21\n    total = precio + iva\n    print("Total:", round(total, 2))\n\nprecio_con_iva(22)', category: 'logica' },
    ],
  },
  'inc-build': {
    id: 'inc-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El reloj de la carrera', difficulty: 3, xp: 30, concepts: ['incremental', 'retorno', 'operadores'],
    unlock: { any: ['inc-order', 'inc-complete', 'inc-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `formato_tiempo(segundos)` que **devuelva** un texto con el formato `"1h 2m 5s"`.\n\nEjemplos: `formato_tiempo(3725)` → `"1h 2m 5s"` y `formato_tiempo(59)` → `"0h 0m 59s"`.\n\nHazlo de forma incremental: primero las horas (compruébalas), después los minutos y por último los segundos y el texto.',
    expected: '1h 2m 5s',
    plan: [
      {
        q: 'Con 3725 segundos, ¿qué cálculo da las horas?',
        options: [
          { text: '3725 // 3600 → 1', correct: true },
          { text: '3725 / 3600 → 1.03', why: 'Necesitas las horas **completas**: `//`.' },
          { text: '3725 % 3600 → 125', why: 'Eso son los segundos que sobran después de quitar las horas.' },
        ],
      },
      {
        q: '¿Qué deberías comprobar antes de calcular los minutos?',
        options: [
          { text: 'Que las horas y los segundos sobrantes son correctos (1 y 125)', correct: true },
          { text: 'Nada: mejor escribirlo todo y probar al final', why: 'Si falla al final, no sabrás qué parte está mal. Comprueba cada paso.' },
        ],
      },
    ],
    planScaffold: 'def formato_tiempo(segundos):\n    horas = segundos // 3600\n    print("horas:", horas)   # andamiaje: compruébalo y sigue\n    return ""\n\n\nprint(formato_tiempo(3725))\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'formato_tiempo', params: 1 }],
      cases: [
        { label: 'formato_tiempo(3725)', call: 'print(formato_tiempo(3725))', out_lines: ['1h 2m 5s'] },
        { label: 'formato_tiempo(59)', call: 'print(formato_tiempo(59))', out_lines: ['0h 0m 59s'] },
        { label: 'formato_tiempo(7200)', call: 'print(formato_tiempo(7200))', out_lines: ['2h 0m 0s'] },
        { label: 'formato_tiempo(45296)', call: 'print(formato_tiempo(45296))', out_lines: ['12h 34m 56s'] },
      ],
      misconceptions: [
        { out_contains: 'horas:', title: 'Queda andamiaje', msg: 'Quita los print temporales de la función cuando ya funcione.' },
        { out_lines: ['1h 2m 5s', 'None'], title: 'Muestra, pero no devuelve', msg: 'La función tiene que **devolver** el texto con return.' },
      ],
      logic_msg: 'Compara el texto devuelto con el esperado: horas, minutos y segundos, cada uno con su letra y un espacio entre ellos.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres números (horas, minutos, segundos) y un texto que los junta.' },
      { level: 'Razonamiento', text: 'Horas: segundos // 3600. Lo que sobra: segundos % 3600. De lo que sobra, los minutos son // 60 y los segundos, % 60.' },
      { level: 'Pseudocódigo', text: 'horas ← segundos ÷ 3600 (entero)\nresto ← segundos % 3600\nminutos ← resto ÷ 60 (entero)\nsegs ← resto % 60\ndevolver «horas h minutos m segs s»', pre: true },
      { level: 'Ayuda técnica', text: '`return f"{horas}h {minutos}m {segs}s"`.' },
    ],
    solution: {
      code: 'def formato_tiempo(segundos):\n    """Devuelve el tiempo en formato «Xh Ym Zs»."""\n    horas = segundos // 3600\n    resto = segundos % 3600\n    minutos = resto // 60\n    segs = resto % 60\n    return f"{horas}h {minutos}m {segs}s"\n\nprint(formato_tiempo(3725))',
      explanation: 'Cada paso se pudo comprobar por separado (1 hora, 125 s de resto, 2 minutos, 5 segundos). La f-string final junta los tres valores con el formato pedido.',
    },
    reference: [
      'def formato_tiempo(segundos):\n    horas = segundos // 3600\n    minutos = segundos % 3600 // 60\n    segs = segundos % 60\n    return f"{horas}h {minutos}m {segs}s"',
    ],
    wrongs: [
      { code: 'def formato_tiempo(segundos):\n    horas = segundos // 3600\n    print("horas:", horas)\n    minutos = segundos % 3600 // 60\n    segs = segundos % 60\n    return f"{horas}h {minutos}m {segs}s"', category: 'comprension' },
      { code: 'def formato_tiempo(segundos):\n    horas = segundos // 3600\n    minutos = segundos // 60\n    segs = segundos % 60\n    return f"{horas}h {minutos}m {segs}s"', category: 'logica' },
    ],
  },
};
