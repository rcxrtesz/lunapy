// Lección 5.1 · Expresiones booleanas. Contenido original, alineado con el cap. 5 de
// «Piensa en Python» (expresiones booleanas, operadores lógicos, división entera y
// módulo) y PE1 módulo 3 (operadores de comparación y lógicos).

const TOPIC = 'Condicionales';

export const LESSON_BOOLEANAS = {
  id: 'booleanas',
  moduleId: 'm5',
  code: '5.1',
  title: 'Expresiones booleanas',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Reconocer el tipo bool y sus dos valores: True y False',
    'Comparar valores con ==, !=, <, >, <= y >=',
    'Distinguir = (asignar) de == (comparar)',
    'Combinar condiciones con and, or y not',
    'Escribir funciones que devuelven True o False',
  ],
  prerequisites: ['Módulo 4 (recomendado)', 'Lección 2.2 «Expresiones»'],
  teaser: 'Empiezas el Módulo 5: antes de que tus programas tomen decisiones, necesitan saber hacer preguntas de sí o no.',
  celebration: 'Ya sabes hacer preguntas de sí o no en Python. En la próxima lección tus programas las usarán para decidir.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'bool', title: 'Verdadero o falso', concepts: ['booleanos'],
      blocks: [
        { type: 'p', text: 'Una **expresión booleana** es una pregunta de sí o no. Su resultado es uno de dos valores: `True` (verdadero) o `False` (falso). Su tipo se llama `bool`.' },
        { type: 'code', run: true, code: 'print(5 > 3)\nprint(2 == 7)\nprint(type(True))\nmayor_de_edad = 20 >= 18\nprint(mayor_de_edad)' },
        { type: 'callout', tone: 'info', title: 'Con mayúscula', text: '`True` y `False` se escriben con la primera letra en mayúscula y sin comillas. `true` daría un NameError y `"True"` sería un texto.' },
        {
          type: 'check', id: 'm5b-bool', concept: 'booleanos', mode: 'text',
          question: 'Predice:', code: 'edad = 15\nprint(edad >= 18)', answer: 'False',
          explain: '15 no es mayor o igual que 18: la comparación vale False.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comparar', title: 'Operadores de comparación', concepts: ['booleanos'],
      blocks: [
        {
          type: 'five', items: {
            '==': 'Igual a: `3 == 3` → True',
            '!=': 'Distinto de: `3 != 4` → True',
            '< y >': 'Menor que y mayor que',
            '<= y >=': 'Menor o igual y mayor o igual',
          },
        },
        { type: 'callout', tone: 'warn', title: '= no es ==', text: '`x = 5` **guarda** 5 en x. `x == 5` **pregunta** si x vale 5. Confundirlos es el error más típico de este módulo.' },
        { type: 'p', text: 'También se comparan textos: `==` exige que sean idénticos (mayúsculas incluidas), y `<` compara por orden alfabético.' },
        { type: 'code', run: true, code: 'print("hola" == "Hola")\nprint("ana" < "luis")\nprint(1 < 5 < 10)   # se pueden encadenar' },
        {
          type: 'check', id: 'm5b-texto', concept: 'booleanos', mode: 'text',
          question: 'Predice:', code: 'clave = "Luna"\nprint(clave == "luna")', answer: 'False',
          explain: 'Para Python, "Luna" y "luna" son textos distintos: la L mayúscula cuenta.',
        },
        {
          type: 'check', id: 'm5b-rango', concept: 'booleanos', mode: 'text',
          question: 'Predice:', code: 'nota = 7\nprint(5 <= nota < 9)', answer: 'True',
          explain: '7 está entre 5 (incluido) y 9 (excluido): la comparación encadenada es verdadera.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'logicos', title: 'and, or y not', concepts: ['booleanos'],
      blocks: [
        { type: 'p', text: 'Las condiciones se combinan con tres **operadores lógicos**:' },
        {
          type: 'five', items: {
            'and': 'True solo si las **dos** partes son True: `tiene_entrada and edad >= 18`.',
            'or': 'True si **al menos una** parte es True: `es_socia or es_estudiante`.',
            'not': 'Le da la vuelta: `not lloviendo`.',
          },
        },
        { type: 'code', run: true, code: 'edad = 20\ntiene_entrada = False\nprint(edad >= 18 and tiene_entrada)\nprint(edad >= 18 or tiene_entrada)\nprint(not tiene_entrada)' },
        { type: 'callout', tone: 'tip', title: 'Orden de prioridad', text: 'Primero las comparaciones, después `not`, luego `and` y por último `or`. Si una condición mezcla `and` y `or`, añade paréntesis: se lee mejor y evitas sorpresas.' },
        {
          type: 'check', id: 'm5b-and', concept: 'booleanos', mode: 'choice',
          question: '¿Qué mostrará?', code: 'x = 15\nprint(x > 10 and x < 12)', expectOutput: 'False',
          options: [
            { text: 'False', correct: true },
            { text: 'True', why: 'Con `and` tienen que cumplirse las dos: 15 > 10 sí, pero 15 < 12 no.' },
          ],
        },
        {
          type: 'check', id: 'm5b-or-trampa', concept: 'booleanos', mode: 'choice',
          question: 'Queremos saber si `dia` es "sábado" o "domingo". ¿Qué expresión es correcta?',
          options: [
            { text: 'dia == "sábado" or dia == "domingo"', correct: true },
            { text: 'dia == "sábado" or "domingo"', why: 'Parece natural, pero Python lo lee como `(dia == "sábado") or "domingo"`, y un texto no vacío cuenta como verdadero: daría siempre algo verdadero. Hay que repetir la comparación.' },
            { text: 'dia == "sábado" and dia == "domingo"', why: 'Un día no puede ser sábado y domingo a la vez: siempre daría False.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulo', title: 'Preguntas con %', concepts: ['booleanos', 'operadores'],
      blocks: [
        { type: 'p', text: 'En la lección 2.2 usaste `%` para obtener restos. Combinado con `==` responde preguntas muy útiles:' },
        { type: 'code', run: true, code: 'n = 14\nprint(n % 2 == 0)    # ¿es par?\nprint(n % 7 == 0)    # ¿es múltiplo de 7?\nprint(n % 10 == 4)   # ¿termina en 4?' },
        {
          type: 'check', id: 'm5b-par', concept: 'booleanos', mode: 'text',
          question: 'Predice:', code: 'n = 9\nprint(n % 2 == 0 or n % 3 == 0)', answer: 'True',
          explain: '9 no es par (False), pero sí es múltiplo de 3 (True). Con `or` basta una: True.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones-bool', title: 'Funciones que responden sí o no', concepts: ['booleanos', 'parametros'],
      blocks: [
        { type: 'p', text: 'Una función puede **devolver** un booleano. Su nombre suele empezar por `es_` o `tiene_`, para que la llamada se lea como una pregunta:' },
        { type: 'code', run: true, code: 'def es_par(n):\n    return n % 2 == 0\n\ndef puede_votar(edad, nacionalidad):\n    return edad >= 18 and nacionalidad == "española"\n\nprint(es_par(10), es_par(7))\nprint(puede_votar(20, "española"))' },
        { type: 'callout', tone: 'tip', title: 'Devuelve la comparación directamente', text: 'La comparación **ya es** True o False: `return n % 2 == 0` basta. No hace falta ningún paso extra.' },
        {
          type: 'check', id: 'm5b-funcion', concept: 'booleanos', mode: 'text',
          question: 'Predice:', code: 'def es_positivo(x):\n    return x > 0\n\nprint(es_positivo(-3), es_positivo(8))', answer: 'False True',
          explain: '-3 > 0 es False y 8 > 0 es True.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'bool-predict' },
    { id: 'a2', activity: 'bool-complete' },
    { id: 'a3', activity: 'bool-fix' },
    { id: 'a4', activity: 'bool-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una expresión booleana vale `True` o `False` (tipo `bool`).',
    'Comparaciones: `==`, `!=`, `<`, `>`, `<=`, `>=`. Se pueden encadenar: `0 <= x < 10`.',
    '`=` asigna; `==` compara.',
    '`and` exige las dos condiciones; `or`, al menos una; `not` invierte.',
    'Repite la comparación con `or`: `dia == "sábado" or dia == "domingo"`.',
    '`n % 2 == 0` pregunta si n es par.',
    'Una función puede devolver directamente una comparación: `return n % 2 == 0`.',
  ],
};

export const ACTIVITIES_BOOLEANAS = {
  'bool-predict': {
    id: 'bool-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La puerta del cine', difficulty: 2, xp: 10, concepts: ['booleanos'],
    prompt: 'Para ver la película hace falta tener 12 años o más, **o** ir con un adulto. **¿Qué mostrará?**',
    code: 'edad = 10\ncon_adulto = True\npuede_entrar = edad >= 12 or con_adulto\nprint(puede_entrar, not puede_entrar, edad >= 12 and con_adulto)',
    expectedOutput: 'True False False',
    options: [
      { text: 'True False False', correct: true },
      { text: 'False True False', concept: 'booleanos', why: 'Con `or` basta una condición: aunque tiene 10 años, va con un adulto, así que `puede_entrar` es True.' },
      { text: 'True False True', concept: 'booleanos', why: 'Con `and` hacen falta las dos: `edad >= 12` es False, así que todo es False.' },
      { text: 'True True False', concept: 'booleanos', why: '`not` invierte: not True es False.' },
    ],
    explain: ['`edad >= 12` → False; `con_adulto` → True.', '`False or True` → True.', '`not True` → False.', '`False and True` → False.'],
  },
  'bool-complete': {
    id: 'bool-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Preguntas sobre números', difficulty: 2, xp: 15, concepts: ['booleanos', 'parametros'],
    statement: 'Completa las condiciones de estas dos funciones:\n\n• `es_multiplo(n, d)` devuelve True si n es múltiplo de d.\n\n• `en_rango(x, minimo, maximo)` devuelve True si x está entre minimo y maximo, **ambos incluidos**.',
    expected: 'True False\nTrue False',
    starter: 'def es_multiplo(n, d):\n    return n % d ___ 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo ___ x ___ maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))',
    spec: {
      blanks: true,
      functions: [{ name: 'es_multiplo', params: 2 }, { name: 'en_rango', params: 3 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True False', 'True False'] },
        { label: 'es_multiplo(21, 7)', call: 'print(es_multiplo(21, 7))', out_lines: ['True'] },
        { label: 'en_rango(1, 1, 3) (límite inferior)', call: 'print(en_rango(1, 1, 3))', out_lines: ['True'] },
        { label: 'en_rango(4, 1, 3)', call: 'print(en_rango(4, 1, 3))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True False', 'False False'], title: 'Los extremos cuentan', msg: '«Ambos incluidos»: 5 está en el rango de 1 a 5. Usa `<=` en lugar de `<`.' },
      ],
      logic_msg: 'Revisa los operadores: un múltiplo deja resto 0, y «incluidos» significa que el valor puede ser igual a los extremos.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos, tres operadores de comparación.' },
      { level: 'Razonamiento', text: '¿Qué resto deja un número al dividirlo entre uno de sus divisores? Para el rango: si los extremos están incluidos, x puede ser **igual** a minimo o a maximo.' },
      { level: 'Pseudocódigo', text: 'es_multiplo: resto de n ÷ d es igual a 0\nen_rango: minimo ≤ x ≤ maximo', pre: true },
      { level: 'Ayuda técnica', text: '`n % d == 0` y `minimo <= x <= maximo`.' },
    ],
    solution: {
      code: 'def es_multiplo(n, d):\n    return n % d == 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo <= x <= maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))',
      explanation: 'Cada función devuelve directamente una comparación. La comparación encadenada `minimo <= x <= maximo` se lee igual que en matemáticas.',
    },
    reference: [
      'def es_multiplo(n, d):\n    return n % d == 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo <= x <= maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))',
      'def es_multiplo(n, d):\n    return n % d == 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo <= x and x <= maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))',
    ],
    wrongs: [
      { code: 'def es_multiplo(n, d):\n    return n % d ___ 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo ___ x ___ maximo', category: 'incompleto' },
      { code: 'def es_multiplo(n, d):\n    return n % d = 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo <= x <= maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))', category: 'sintaxis' },
      { code: 'def es_multiplo(n, d):\n    return n % d == 0\n\ndef en_rango(x, minimo, maximo):\n    return minimo < x < maximo\n\nprint(es_multiplo(12, 4), es_multiplo(10, 3))\nprint(en_rango(5, 1, 5), en_rango(0, 1, 5))', category: 'comprension' },
    ],
  },
  'bool-fix': {
    id: 'bool-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El fin de semana eterno', difficulty: 2, xp: 20, concepts: ['booleanos', 'errores'],
    statement: '`es_fin_de_semana` debería devolver True solo para "sábado" y "domingo". No da ningún error… pero dice que el lunes también es fin de semana. Encuentra el fallo y corrígelo.',
    expected: 'True\nTrue\nFalse',
    starter: 'def es_fin_de_semana(dia):\n    return dia == "sábado" or "domingo"\n\nprint(es_fin_de_semana("sábado"))\nprint(es_fin_de_semana("domingo"))\nprint(es_fin_de_semana("lunes"))',
    spec: {
      functions: [{ name: 'es_fin_de_semana', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True', 'True', 'False'] },
        { label: 'es_fin_de_semana("martes")', call: 'print(es_fin_de_semana("martes"))', out_lines: ['False'] },
        { label: 'es_fin_de_semana("domingo")', call: 'print(es_fin_de_semana("domingo"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'domingo', 'domingo'], title: 'La comparación no se repite', msg: 'Python lee `(dia == "sábado") or "domingo"`: cuando el día no es sábado, devuelve el texto "domingo". Repite la comparación: `dia == "domingo"`.' },
        { out_lines: ['False', 'False', 'False'], title: 'and no puede ser', msg: 'Un día no puede ser sábado **y** domingo a la vez. Usa `or` repitiendo la comparación.' },
      ],
      logic_msg: 'Comprueba las tres llamadas: solo sábado y domingo deben dar True.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: con "lunes" no sale False, sino otra cosa. ¿Qué devuelve la función?' },
      { level: 'Razonamiento', text: 'Cada lado de `or` es una condición completa. ¿Qué compara el lado derecho, `"domingo"`?' },
      { level: 'Pseudocódigo', text: 'devolver (dia es "sábado") o (dia es "domingo")', pre: true },
      { level: 'Ayuda técnica', text: '`return dia == "sábado" or dia == "domingo"`.' },
    ],
    solution: {
      code: 'def es_fin_de_semana(dia):\n    return dia == "sábado" or dia == "domingo"\n\nprint(es_fin_de_semana("sábado"))\nprint(es_fin_de_semana("domingo"))\nprint(es_fin_de_semana("lunes"))',
      explanation: 'En español decimos «si el día es sábado o domingo», pero Python necesita la comparación completa a cada lado del `or`: `dia == "sábado" or dia == "domingo"`.',
    },
    reference: ['def es_fin_de_semana(dia):\n    return dia == "sábado" or dia == "domingo"\n\nprint(es_fin_de_semana("sábado"))\nprint(es_fin_de_semana("domingo"))\nprint(es_fin_de_semana("lunes"))'],
    wrongs: [
      { code: 'def es_fin_de_semana(dia):\n    return dia == "sábado" or "domingo"\n\nprint(es_fin_de_semana("sábado"))\nprint(es_fin_de_semana("domingo"))\nprint(es_fin_de_semana("lunes"))', category: 'comprension' },
      { code: 'def es_fin_de_semana(dia):\n    return dia == "sábado" and dia == "domingo"\n\nprint(es_fin_de_semana("sábado"))\nprint(es_fin_de_semana("domingo"))\nprint(es_fin_de_semana("lunes"))', category: 'comprension' },
      { code: 'def es_fin_de_semana(dia):\n    return dia = "sábado" or dia = "domingo"', category: 'sintaxis' },
    ],
  },
  'bool-build': {
    id: 'bool-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: '¿Año bisiesto?', difficulty: 3, xp: 30, concepts: ['booleanos', 'descomponer'],
    unlock: { any: ['bool-predict', 'bool-complete', 'bool-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `es_bisiesto(anio)`, que devuelva True si el año es bisiesto. La regla del calendario:\n\n• Es bisiesto si es múltiplo de 4…\n\n• …salvo que sea múltiplo de 100, que no lo es…\n\n• …salvo que también sea múltiplo de 400, que sí lo es.\n\nEjemplos: 2024 sí, 2023 no, 1900 no, 2000 sí. Resuélvelo con una sola expresión booleana.',
    expected: 'True',
    plan: [
      {
        q: '¿Qué años son bisiestos?', multi: true,
        options: [
          { text: '2024', correct: true },
          { text: '2000', correct: true },
          { text: '1900', why: 'Es múltiplo de 100 y no de 400: no es bisiesto.' },
          { text: '2023', why: 'No es múltiplo de 4.' },
        ],
      },
      {
        q: '¿Cómo se lee la regla con operadores?',
        options: [
          { text: '(múltiplo de 4 y no de 100) o múltiplo de 400', correct: true },
          { text: 'múltiplo de 4 o de 100 o de 400', why: 'Con eso 1900 sería bisiesto, y no lo es.' },
          { text: 'múltiplo de 4 y de 400', why: 'Con eso 2024 no sería bisiesto, y lo es.' },
        ],
      },
    ],
    planScaffold: 'def es_bisiesto(anio):\n    # devolver una expresión booleana con %, ==, !=, and y or\n\n\nprint(es_bisiesto(2024))\n',
    starter: '',
    spec: {
      functions: [{ name: 'es_bisiesto', params: 1 }],
      cases: [
        { label: '2024', call: 'print(es_bisiesto(2024))', out_lines: ['True'] },
        { label: '2023', call: 'print(es_bisiesto(2023))', out_lines: ['False'] },
        { label: '1900 (múltiplo de 100)', call: 'print(es_bisiesto(1900))', out_lines: ['False'] },
        { label: '2000 (múltiplo de 400)', call: 'print(es_bisiesto(2000))', out_lines: ['True'] },
        { label: '2100', call: 'print(es_bisiesto(2100))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'Muestra, pero no devuelve', msg: 'La función usa `print`. Devuelve la expresión con `return`.' },
      ],
      logic_msg: 'Revisa la regla con el caso que falla: 1900 no es bisiesto (múltiplo de 100 pero no de 400) y 2000 sí lo es.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres condiciones: múltiplo de 4, múltiplo de 100 y múltiplo de 400. Cada una se pregunta con `%`.' },
      { level: 'Razonamiento', text: 'Hay dos formas de ser bisiesto: ser múltiplo de 4 **sin** serlo de 100, **o** ser múltiplo de 400.' },
      { level: 'Pseudocódigo', text: 'devolver (anio múltiplo de 4 y anio no múltiplo de 100)\n        o anio múltiplo de 400', pre: true },
      { level: 'Ayuda técnica', text: '`return (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0`.' },
    ],
    solution: {
      code: 'def es_bisiesto(anio):\n    """Devuelve True si anio es bisiesto según el calendario gregoriano."""\n    return (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0\n\nprint(es_bisiesto(2024))',
      explanation: 'La regla tiene dos caminos unidos por `or`. Los paréntesis no son obligatorios (and va antes que or), pero dejan clara la intención.',
    },
    reference: [
      'def es_bisiesto(anio):\n    return (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0',
      'def es_bisiesto(anio):\n    return anio % 400 == 0 or (anio % 4 == 0 and not anio % 100 == 0)',
    ],
    wrongs: [
      { code: 'def es_bisiesto(anio):\n    return anio % 4 == 0', category: 'logica' },
      { code: 'def es_bisiesto(anio):\n    print(anio % 4 == 0 and anio % 100 != 0 or anio % 400 == 0)', category: 'comprension' },
      { code: 'def es_bisiesto(anio):\n    return anio % 4 == 0 and anio % 400 == 0', category: 'logica' },
    ],
  },
};
