// Lección 5.2 · if, elif y else. Contenido original, alineado con el cap. 5 de
// «Piensa en Python» (ejecución condicional, alternativa, encadenada y anidada)
// y PE1 módulo 3 (if, elif, else).

const TOPIC = 'Condicionales';

export const LESSON_CONDICIONALES = {
  id: 'condicionales',
  moduleId: 'm5',
  code: '5.2',
  title: 'if, elif y else',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Ejecutar código solo cuando se cumple una condición con if',
    'Elegir entre dos caminos con else',
    'Encadenar varias opciones con elif y ordenar bien las condiciones',
    'Anidar condicionales y simplificarlos con and/or',
    'Usar condicionales dentro de funciones que devuelven un resultado',
  ],
  prerequisites: ['Lección 5.1 «Expresiones booleanas»'],
  teaser: 'Tus programas dejan de hacer siempre lo mismo: hoy aprenden a decidir qué hacer según los datos.',
  celebration: 'Tus programas ya toman decisiones. Con if, elif y else puedes resolver la mayoría de los problemas de «depende».',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'if', title: 'if: hacer algo solo si…', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: '`if` ejecuta un bloque de código **solo si** su condición es verdadera. Igual que en las funciones, el bloque se marca con dos puntos y sangría.' },
        { type: 'code', run: true, code: 'temperatura = 32\nif temperatura > 30:\n    print("¡Hace calor!")\n    print("Bebe agua.")\nprint("Fin del parte")', caption: 'Cambia la temperatura a 20 y vuelve a ejecutar: las dos líneas sangradas desaparecen; la última, no.' },
        {
          type: 'check', id: 'm5c-if', concept: 'condicionales', mode: 'text',
          question: 'Predice:', code: 'saldo = 5\nif saldo < 0:\n    print("En números rojos")\nprint("Saldo:", saldo)', answer: 'Saldo: 5',
          explain: '5 < 0 es False: el bloque del if se salta. La última línea no tiene sangría, así que se ejecuta siempre.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'else', title: 'else: si no, lo otro', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: 'Con `else` das un camino alternativo: se ejecuta exactamente **uno** de los dos bloques.' },
        { type: 'code', run: true, code: 'n = 7\nif n % 2 == 0:\n    print(n, "es par")\nelse:\n    print(n, "es impar")' },
        { type: 'p', text: 'Sigue la ejecución paso a paso y observa qué líneas se saltan:' },
        { type: 'trace', code: 'edad = 16\nif edad >= 18:\n    mensaje = "Puedes votar"\nelse:\n    mensaje = "Aún no puedes votar"\nprint(mensaje)' },
        {
          type: 'check', id: 'm5c-else', concept: 'condicionales', mode: 'text',
          question: 'Predice:', code: 'nota = 4.5\nif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")', answer: 'Suspenso',
          explain: '4.5 >= 5 es False, así que se ejecuta el bloque del else.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'elif', title: 'elif: varias opciones', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: 'Cuando hay más de dos caminos, `elif` (abreviatura de *else if*) añade condiciones intermedias. Python las comprueba **en orden** y ejecuta solo el **primer** bloque cuya condición sea verdadera.' },
        { type: 'code', run: true, code: 'nota = 7.5\nif nota >= 9:\n    print("Sobresaliente")\nelif nota >= 7:\n    print("Notable")\nelif nota >= 5:\n    print("Aprobado")\nelse:\n    print("Suspenso")' },
        { type: 'callout', tone: 'warn', title: 'El orden importa', text: 'Si pusieras `nota >= 5` primero, un 9.5 entraría ahí («Aprobado») y nunca llegaría a «Sobresaliente». Con `>=`, ordena de la condición más exigente a la menos.' },
        {
          type: 'check', id: 'm5c-orden', concept: 'condicionales', mode: 'choice',
          question: '¿Qué mostrará?', code: 'x = 50\nif x > 10:\n    print("grande")\nelif x > 40:\n    print("enorme")\nelse:\n    print("pequeño")', expectOutput: 'grande',
          options: [
            { text: 'grande', correct: true },
            { text: 'enorme', why: 'Python se queda con la **primera** condición verdadera: 50 > 10 ya lo es, así que el elif ni se mira.' },
            { text: 'grande y enorme', why: 'En una cadena if/elif/else se ejecuta como mucho un bloque.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'anidados', title: 'Condicionales anidados', concepts: ['condicionales', 'booleanos'],
      blocks: [
        { type: 'p', text: 'Un `if` puede ir dentro de otro. Funciona, pero cada nivel añade sangría y cuesta más de leer. A menudo se puede simplificar con `and`:' },
        { type: 'code', run: true, title: 'Anidado', code: 'edad = 25\ncarnet = True\nif edad >= 18:\n    if carnet:\n        print("Puedes conducir")' },
        { type: 'code', run: true, title: 'Simplificado', code: 'edad = 25\ncarnet = True\nif edad >= 18 and carnet:\n    print("Puedes conducir")' },
        { type: 'callout', tone: 'tip', title: 'if con booleanos', text: 'Si una variable ya es True o False, úsala directamente: `if carnet:` en lugar de `if carnet == True:`.' },
        {
          type: 'check', id: 'm5c-anidado', concept: 'condicionales', mode: 'text',
          question: 'Predice:', code: 'x = 8\nif x > 5:\n    if x % 2 == 0:\n        print("grande y par")\n    else:\n        print("grande e impar")\nelse:\n    print("pequeño")', answer: 'grande y par',
          explain: '8 > 5 entra en el primer bloque; dentro, 8 es par.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Condicionales dentro de funciones', concepts: ['condicionales', 'parametros'],
      blocks: [
        { type: 'p', text: 'Lo más habitual es usar `if` dentro de una función que **devuelve** un resultado distinto según el caso. En cuanto se ejecuta un `return`, la función termina:' },
        { type: 'code', run: true, code: 'def calificacion(nota):\n    if nota >= 9:\n        return "Sobresaliente"\n    elif nota >= 7:\n        return "Notable"\n    elif nota >= 5:\n        return "Aprobado"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.2), calificacion(6), calificacion(3))' },
        { type: 'callout', tone: 'warn', title: 'Que todos los caminos devuelvan algo', text: 'Si una función tiene `return` en el `if` pero no en el resto de casos, en esos casos devolverá `None`. Comprueba que cada camino termina en un `return`.' },
        {
          type: 'check', id: 'm5c-none', concept: 'condicionales', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def signo(x):\n    if x > 0:\n        return "positivo"\n    elif x < 0:\n        return "negativo"\n\nprint(signo(0))', expectOutput: 'None',
          options: [
            { text: 'None', correct: true },
            { text: 'positivo', why: '0 > 0 es False.' },
            { text: 'Un error', why: 'No hay error: ninguna condición se cumple, la función llega al final sin return y devuelve None.' },
          ],
          explain: 'Falta el caso del cero: un `else: return "cero"` lo resolvería.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'cond-predict' },
    { id: 'a2', activity: 'cond-complete' },
    { id: 'a3', activity: 'cond-fix' },
    { id: 'a4', activity: 'cond-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`if condicion:` ejecuta el bloque sangrado solo si la condición es verdadera.',
    '`else:` da el camino alternativo: se ejecuta exactamente uno de los dos.',
    '`elif` encadena opciones: Python ejecuta solo la **primera** verdadera, así que el orden importa.',
    'Los if anidados se pueden simplificar a menudo con `and`.',
    'En una función, cada camino debe terminar en un `return`; si no, devuelve `None`.',
  ],
};

export const ACTIVITIES_CONDICIONALES = {
  'cond-predict': {
    id: 'cond-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El termostato', difficulty: 2, xp: 10, concepts: ['condicionales'],
    prompt: 'Sigue la cadena de condiciones con temperatura 19. **¿Qué mostrará?**',
    code: 'temperatura = 19\nif temperatura < 15:\n    accion = "Calefacción fuerte"\nelif temperatura < 20:\n    accion = "Calefacción suave"\nelif temperatura < 25:\n    accion = "Apagado"\nelse:\n    accion = "Aire acondicionado"\nprint(accion)',
    expectedOutput: 'Calefacción suave',
    options: [
      { text: 'Calefacción suave', correct: true },
      { text: 'Apagado', concept: 'condicionales', why: '19 < 25 también es verdad, pero Python se queda con la **primera** condición verdadera: 19 < 20.' },
      { text: 'Calefacción suave y Apagado', concept: 'condicionales', why: 'En una cadena if/elif/else solo se ejecuta un bloque.' },
      { text: 'Aire acondicionado', concept: 'condicionales', why: 'El else solo se ejecuta si ninguna condición anterior se cumple.' },
    ],
    explain: ['19 < 15 → False.', '19 < 20 → True: se ejecuta este bloque y se salta el resto.'],
  },
  'cond-complete': {
    id: 'cond-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El precio de la entrada', difficulty: 2, xp: 15, concepts: ['condicionales', 'parametros'],
    statement: 'Un museo cobra según la edad: **menores de 12**, gratis (0 €); de **12 a 64**, 10 €; desde **65**, 4 €. Completa la función:',
    expected: '0 10 4',
    starter: 'def precio_entrada(edad):\n    if edad ___ 12:\n        return 0\n    ___ edad < 65:\n        return 10\n    ___\n        return 4\n\nprint(precio_entrada(8), precio_entrada(30), precio_entrada(70))',
    spec: {
      blanks: true,
      functions: [{ name: 'precio_entrada', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['0 10 4'] },
        { label: 'precio_entrada(12) (límite)', call: 'print(precio_entrada(12))', out_lines: ['10'] },
        { label: 'precio_entrada(65) (límite)', call: 'print(precio_entrada(65))', out_lines: ['4'] },
        { label: 'precio_entrada(64)', call: 'print(precio_entrada(64))', out_lines: ['10'] },
      ],
      misconceptions: [
        { out_lines: ['0'], title: 'Revisa el límite de 12', msg: 'Con 12 años ya se paga: la primera condición es «menor que 12», `edad < 12`.' },
      ],
      logic_msg: 'Prueba los límites: 11 años es gratis, 12 paga 10 €, 64 paga 10 € y 65 paga 4 €.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: un operador de comparación, la palabra que encadena otra condición y la que recoge el resto de casos.' },
      { level: 'Razonamiento', text: '«Menores de 12» excluye el 12. Las otras dos palabras son las que has visto en esta lección para «si no, si…» y «si no».' },
      { level: 'Pseudocódigo', text: 'si edad < 12: devolver 0\nsi no, si edad < 65: devolver 10\nsi no: devolver 4', pre: true },
      { level: 'Ayuda técnica', text: '`if edad < 12:`, `elif edad < 65:` y `else:` (con los dos puntos).' },
    ],
    solution: {
      code: 'def precio_entrada(edad):\n    if edad < 12:\n        return 0\n    elif edad < 65:\n        return 10\n    else:\n        return 4\n\nprint(precio_entrada(8), precio_entrada(30), precio_entrada(70))',
      explanation: 'Como el primer caso ya ha descartado a los menores de 12, el `elif` solo necesita comprobar `edad < 65`. El `else` recoge a los de 65 o más.',
    },
    reference: ['def precio_entrada(edad):\n    if edad < 12:\n        return 0\n    elif edad < 65:\n        return 10\n    else:\n        return 4\n\nprint(precio_entrada(8), precio_entrada(30), precio_entrada(70))'],
    wrongs: [
      { code: 'def precio_entrada(edad):\n    if edad ___ 12:\n        return 0\n    ___ edad < 65:\n        return 10\n    ___\n        return 4', category: 'incompleto' },
      { code: 'def precio_entrada(edad):\n    if edad <= 12:\n        return 0\n    elif edad < 65:\n        return 10\n    else:\n        return 4\n\nprint(precio_entrada(8), precio_entrada(30), precio_entrada(70))', category: 'comprension' },
      { code: 'def precio_entrada(edad):\n    if edad < 12:\n        return 0\n    elif edad < 65:\n        return 10\n    else\n        return 4', category: 'sintaxis' },
    ],
  },
  'cond-fix': {
    id: 'cond-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Todo el mundo aprueba', difficulty: 2, xp: 20, concepts: ['condicionales', 'errores'],
    statement: 'Esta función debería dar la calificación de una nota, pero un 9.5 sale «Aprobado» y un 7 también. **No hay ningún error de Python**: el fallo está en la lógica. Corrígelo.',
    expected: 'Sobresaliente\nNotable\nAprobado\nSuspenso',
    starter: 'def calificacion(nota):\n    if nota >= 5:\n        return "Aprobado"\n    elif nota >= 7:\n        return "Notable"\n    elif nota >= 9:\n        return "Sobresaliente"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))',
    spec: {
      functions: [{ name: 'calificacion', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Sobresaliente', 'Notable', 'Aprobado', 'Suspenso'] },
        { label: 'calificacion(9) (límite)', call: 'print(calificacion(9))', out_lines: ['Sobresaliente'] },
        { label: 'calificacion(8.9)', call: 'print(calificacion(8.9))', out_lines: ['Notable'] },
        { label: 'calificacion(4.99)', call: 'print(calificacion(4.99))', out_lines: ['Suspenso'] },
      ],
      misconceptions: [
        { out_lines: ['Aprobado', 'Aprobado', 'Aprobado', 'Suspenso'], title: 'La primera condición se lo queda todo', msg: 'Un 9.5 cumple `nota >= 5`, y como es la primera condición verdadera, nunca llega a las demás. Ordénalas de la más exigente a la menos.' },
      ],
      logic_msg: 'Revisa los límites: 9 es Sobresaliente, de 7 a menos de 9 Notable y de 5 a menos de 7 Aprobado.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta: casi todo sale «Aprobado». ¿Qué condición se comprueba primero?' },
      { level: 'Razonamiento', text: 'Python ejecuta el primer bloque cuya condición es verdadera. Un 9.5 cumple `nota >= 5`… y también `nota >= 9`. ¿Cuál debería mirarse antes?' },
      { level: 'Pseudocódigo', text: 'si nota ≥ 9: Sobresaliente\nsi no, si nota ≥ 7: Notable\nsi no, si nota ≥ 5: Aprobado\nsi no: Suspenso', pre: true },
      { level: 'Ayuda técnica', text: 'Invierte el orden de las tres condiciones: empieza por `nota >= 9`.' },
    ],
    solution: {
      code: 'def calificacion(nota):\n    if nota >= 9:\n        return "Sobresaliente"\n    elif nota >= 7:\n        return "Notable"\n    elif nota >= 5:\n        return "Aprobado"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))',
      explanation: 'Con condiciones `>=`, la más exigente va primero. Así cada nota se queda en el bloque correcto y nunca «se cuela» en uno menos exigente.',
    },
    reference: [
      'def calificacion(nota):\n    if nota >= 9:\n        return "Sobresaliente"\n    elif nota >= 7:\n        return "Notable"\n    elif nota >= 5:\n        return "Aprobado"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))',
      'def calificacion(nota):\n    if nota < 5:\n        return "Suspenso"\n    elif nota < 7:\n        return "Aprobado"\n    elif nota < 9:\n        return "Notable"\n    return "Sobresaliente"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))',
    ],
    wrongs: [
      { code: 'def calificacion(nota):\n    if nota >= 5:\n        return "Aprobado"\n    elif nota >= 7:\n        return "Notable"\n    elif nota >= 9:\n        return "Sobresaliente"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))', category: 'comprension' },
      { code: 'def calificacion(nota):\n    if nota > 9:\n        return "Sobresaliente"\n    elif nota > 7:\n        return "Notable"\n    elif nota >= 5:\n        return "Aprobado"\n    else:\n        return "Suspenso"\n\nprint(calificacion(9.5))\nprint(calificacion(7))\nprint(calificacion(5))\nprint(calificacion(2))', category: 'logica' },
    ],
  },
  'cond-build': {
    id: 'cond-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'Envío gratis', difficulty: 3, xp: 30, concepts: ['condicionales', 'parametros', 'descomponer'],
    unlock: { any: ['cond-predict', 'cond-complete', 'cond-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Una tienda online calcula los gastos de envío así:\n\n• Si el pedido es de **50 € o más**, el envío es **gratis**.\n\n• Si no, cuesta **4.99 €**… salvo que la clienta sea **socia**, que paga **2 €**.\n\nDefine `gastos_envio(importe, es_socia)` que **devuelva** el coste del envío. `es_socia` será True o False.',
    expected: '0',
    plan: [
      {
        q: '¿Qué condición se comprueba primero?',
        options: [
          { text: 'Si el importe es de 50 € o más', correct: true },
          { text: 'Si es socia', why: 'Una socia con un pedido de 60 € tampoco paga envío: el importe manda primero.' },
        ],
      },
      {
        q: 'Pedido de 30 € de una socia: ¿cuánto paga de envío?',
        options: [
          { text: '2 €', correct: true },
          { text: '0 €', why: 'No llega a 50 €, así que no es gratis.' },
          { text: '4.99 €', why: 'Es socia: paga la tarifa reducida.' },
        ],
      },
    ],
    planScaffold: 'def gastos_envio(importe, es_socia):\n    # 1. ¿Pedido de 50 € o más?\n    # 2. Si no, ¿es socia?\n    # 3. Si no, tarifa normal\n\n\nprint(gastos_envio(60, False))\n',
    starter: '',
    spec: {
      functions: [{ name: 'gastos_envio', params: 2 }],
      cases: [
        { label: 'gastos_envio(60, False)', call: 'print(gastos_envio(60, False))', out_lines: ['0'] },
        { label: 'gastos_envio(50, False) (límite)', call: 'print(gastos_envio(50, False))', out_lines: ['0'] },
        { label: 'gastos_envio(30, True)', call: 'print(gastos_envio(30, True))', out_lines: ['2'] },
        { label: 'gastos_envio(30, False)', call: 'print(gastos_envio(30, False))', out_lines: ['4.99'] },
        { label: 'gastos_envio(80, True)', call: 'print(gastos_envio(80, True))', out_lines: ['0'] },
        { label: 'gastos_envio(49.99, False)', call: 'print(gastos_envio(49.99, False))', out_lines: ['4.99'] },
      ],
      misconceptions: [
        { out_lines: ['0', 'None'], title: 'Muestra, pero no devuelve', msg: 'Usa `return` en cada caso en lugar de `print`.' },
        { out_lines: ['None'], title: 'Falta un camino', msg: 'En algún caso la función no llega a ningún `return` y devuelve None. Asegúrate de cubrir los tres casos.' },
      ],
      logic_msg: 'Revisa el caso que falla. Recuerda: 50 € exactos ya tienen envío gratis.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres resultados posibles (0, 2 y 4.99) según dos datos (importe y es_socia).' },
      { level: 'Razonamiento', text: 'Primero el importe: si llega a 50, no importa nada más. Si no llega, depende de si es socia.' },
      { level: 'Pseudocódigo', text: 'si importe ≥ 50: devolver 0\nsi no, si es_socia: devolver 2\nsi no: devolver 4.99', pre: true },
      { level: 'Ayuda técnica', text: '`if importe >= 50:` … `elif es_socia:` … `else:`. Como es_socia ya es True o False, no hace falta `== True`.' },
    ],
    solution: {
      code: 'def gastos_envio(importe, es_socia):\n    """Devuelve el coste de envío de un pedido."""\n    if importe >= 50:\n        return 0\n    elif es_socia:\n        return 2\n    else:\n        return 4.99\n\nprint(gastos_envio(60, False))\nprint(gastos_envio(30, True))',
      explanation: 'El importe se comprueba primero porque anula todo lo demás. `elif es_socia:` usa el booleano directamente. Cada camino termina en un return.',
    },
    reference: [
      'def gastos_envio(importe, es_socia):\n    if importe >= 50:\n        return 0\n    elif es_socia:\n        return 2\n    else:\n        return 4.99',
      'def gastos_envio(importe, es_socia):\n    if importe < 50 and es_socia:\n        return 2\n    if importe < 50:\n        return 4.99\n    return 0',
    ],
    wrongs: [
      { code: 'def gastos_envio(importe, es_socia):\n    if es_socia:\n        return 2\n    elif importe >= 50:\n        return 0\n    else:\n        return 4.99', category: 'logica' },
      { code: 'def gastos_envio(importe, es_socia):\n    if importe > 50:\n        return 0\n    elif es_socia:\n        return 2\n    else:\n        return 4.99', category: 'logica' },
      { code: 'def gastos_envio(importe, es_socia):\n    if importe >= 50:\n        return 0\n    elif es_socia:\n        return 2', category: 'comprension' },
    ],
  },
};
