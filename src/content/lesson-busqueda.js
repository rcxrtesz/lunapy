// Lección 7.3 · Patrones de búsqueda. Contenido original, alineado con el cap. 7 de
// «Piensa en Python» (búsqueda, el operador in, contar, el patrón «buscar y salir»)
// y PE1 módulo 3. Sin listas todavía: se busca en rangos y en textos.

const TOPIC = 'Bucles';

export const LESSON_BUSQUEDA = {
  id: 'busqueda',
  moduleId: 'm7',
  code: '7.3',
  title: 'Patrones de búsqueda',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Comprobar si un texto contiene a otro con el operador in',
    'Buscar el primer elemento que cumple una condición y salir en cuanto aparece',
    'Decidir «sí o no» recorriendo todos los casos (como en es_primo)',
    'Encontrar el máximo o el mínimo con un bucle',
    'Evitar el error de devolver dentro del else del bucle',
  ],
  prerequisites: ['Lección 7.2 «Bucles while»'],
  teaser: 'Buscar es una de las tareas más comunes de un programa: ¿está?, ¿dónde?, ¿cuál es el mayor? Hoy aprendes los patrones que lo resuelven.',
  celebration: 'Has completado el Módulo 7: ya sabes repetir con for y while y buscar lo que necesites en rangos y textos.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'in', title: 'El operador in', concepts: ['busqueda'],
      blocks: [
        { type: 'p', text: '`a in b` pregunta si el texto `a` aparece dentro de `b`. Devuelve True o False:' },
        { type: 'code', run: true, code: 'print("a" in "banana")\nprint("nan" in "banana")\nprint("x" in "banana")\nprint("A" in "banana")   # distingue mayúsculas' },
        { type: 'p', text: 'Es perfecto para preguntar si una letra pertenece a un grupo:' },
        { type: 'code', run: true, code: 'def es_vocal(letra):\n    return letra in "aeiouáéíóú"\n\nprint(es_vocal("e"), es_vocal("z"))' },
        {
          type: 'check', id: 'm7b-in', concept: 'busqueda', mode: 'text',
          question: 'Predice:', code: 'print("py" in "Python", "Py" in "Python")', answer: 'False True',
          explain: '"py" en minúsculas no aparece; "Py" sí, al principio.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'primero', title: 'Buscar el primero y salir', concepts: ['busqueda', 'retorno'],
      blocks: [
        { type: 'p', text: 'Para encontrar el **primer** valor que cumple algo, recorre y **devuelve en cuanto lo encuentres**. Si el bucle termina sin encontrarlo, devuelve un valor que lo indique (como `None` o `-1`).' },
        { type: 'code', run: true, code: 'def primer_divisor(n):\n    """Devuelve el menor divisor de n mayor que 1."""\n    for d in range(2, n + 1):\n        if n % d == 0:\n            return d      # encontrado: salimos ya\n    return None          # solo si n < 2\n\nprint(primer_divisor(35), primer_divisor(13))' },
        { type: 'p', text: 'Para saber **dónde** está un carácter en un texto, lleva la cuenta de la posición:' },
        { type: 'code', run: true, code: 'def posicion(texto, buscada):\n    pos = 0\n    for letra in texto:\n        if letra == buscada:\n            return pos\n        pos += 1\n    return -1\n\nprint(posicion("Python", "h"), posicion("Python", "z"))', caption: 'Las posiciones empiezan en 0, igual que range. -1 significa «no está».' },
        {
          type: 'check', id: 'm7b-primero', concept: 'busqueda', mode: 'text',
          question: 'Predice:', code: 'def primer_multiplo(desde, de):\n    n = desde\n    while n % de != 0:\n        n += 1\n    return n\n\nprint(primer_multiplo(20, 7))', answer: '21',
          explain: '20 no es múltiplo de 7; 21 sí: el bucle se detiene ahí.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'todos', title: 'Comprobar todos los casos', concepts: ['busqueda', 'booleanos'],
      blocks: [
        { type: 'p', text: 'Para responder «¿ningún divisor?» hay que mirar **todos** los candidatos. Si alguno falla, puedes devolver False enseguida; pero True solo se puede devolver **después del bucle**, cuando ya has comprobado todos.' },
        { type: 'code', run: true, code: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False   # un divisor basta para decir que no\n    return True            # ninguno lo era\n\nprint(es_primo(13), es_primo(15), es_primo(2))' },
        { type: 'callout', tone: 'warn', title: 'El error más típico', text: 'Poner `else: return True` **dentro** del bucle hace que la función decida mirando solo el primer candidato. Con 15: 15 % 2 no es 0 → devolvería True, ¡y 15 no es primo!' },
        {
          type: 'check', id: 'm7b-else', concept: 'busqueda', mode: 'choice',
          question: '¿Qué devuelve esta versión con 9?', code: 'def es_primo(n):\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n\nprint(es_primo(9))', expectOutput: 'True',
          options: [
            { text: 'True (¡incorrecto: 9 = 3 × 3!)', correct: true },
            { text: 'False', why: 'Solo llega a mirar d = 2: 9 % 2 no es 0, entra en el else y devuelve True sin probar el 3.' },
          ],
          explain: 'El return True tiene que ir fuera del bucle, cuando ya se han probado todos los divisores.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'maximo', title: 'El mayor (o el menor)', concepts: ['busqueda', 'bucles'],
      blocks: [
        { type: 'p', text: 'Para encontrar el máximo, guarda el **mejor hasta ahora** y actualízalo cuando aparezca uno mejor:' },
        { type: 'code', run: true, code: '# ¿Qué número del 1 al 30 tiene más divisores?\ndef num_divisores(n):\n    cuenta = 0\n    for d in range(1, n + 1):\n        if n % d == 0:\n            cuenta += 1\n    return cuenta\n\nmejor = 1\nfor n in range(1, 31):\n    if num_divisores(n) > num_divisores(mejor):\n        mejor = n\nprint(mejor, "tiene", num_divisores(mejor), "divisores")' },
        {
          type: 'check', id: 'm7b-max', concept: 'busqueda', mode: 'text',
          question: 'Predice: ¿qué letra del texto va más tarde en el alfabeto?', code: 'mayor = "a"\nfor letra in "python":\n    if letra > mayor:\n        mayor = letra\nprint(mayor)', answer: 'y',
          explain: 'Se compara cada letra con la mayor encontrada hasta el momento: p, después t, después y. Ninguna de las siguientes supera a la y.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'bus-predict' },
    { id: 'a2', activity: 'bus-complete' },
    { id: 'a3', activity: 'bus-fix' },
    { id: 'a4', activity: 'bus-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`a in b` comprueba si un texto aparece dentro de otro (distingue mayúsculas).',
    'Buscar el primero: recorre y devuelve en cuanto lo encuentres; después del bucle, devuelve «no encontrado» (None o -1).',
    'Para afirmar algo de **todos** los casos, el `return True` va **después** del bucle.',
    'No pongas `else: return …` dentro del bucle: decidiría mirando solo el primer caso.',
    'Máximo: guarda el mejor hasta ahora y actualízalo cuando aparezca uno mejor.',
  ],
};

export const ACTIVITIES_BUSQUEDA = {
  'bus-predict': {
    id: 'bus-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Buscando la primera vocal', difficulty: 2, xp: 10, concepts: ['busqueda'],
    prompt: 'La función devuelve en cuanto encuentra lo que busca. **¿Qué mostrará?**',
    code: 'def primera_vocal(texto):\n    for letra in texto:\n        if letra in "aeiou":\n            return letra\n    return "-"\n\nprint(primera_vocal("Python"), primera_vocal("ritmo"), primera_vocal("xyz"))',
    expectedOutput: 'o i -',
    options: [
      { text: 'o i -', correct: true },
      { text: 'o o -', concept: 'busqueda', why: 'En «ritmo» la primera vocal es la i: la función devuelve en cuanto la encuentra.' },
      { text: 'y i -', concept: 'busqueda', why: 'La «y» no está en "aeiou".' },
      { text: 'o i None', concept: 'busqueda', why: 'Si no encuentra ninguna, el bucle termina y se ejecuta return "-".' },
    ],
    explain: ['Python: P, y, t, h no son vocales; o sí → "o".', 'ritmo: r no; i sí → "i".', 'xyz: ninguna → al terminar el bucle, "-".'],
  },
  'bus-complete': {
    id: 'bus-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Contar letras de un grupo', difficulty: 2, xp: 15, concepts: ['busqueda', 'bucles'],
    statement: 'Completa `contar_vocales(texto)` para que devuelva cuántas vocales (minúsculas, sin tildes) tiene un texto.',
    expected: '5\n0',
    starter: 'def contar_vocales(texto):\n    cuenta = 0\n    for letra in ___:\n        if letra ___ "aeiou":\n            cuenta += 1\n    return ___\n\nprint(contar_vocales("murcielago"))\nprint(contar_vocales("xyz"))',
    spec: {
      blanks: true,
      functions: [{ name: 'contar_vocales', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['5', '0'] },
        { label: 'contar_vocales("banana")', call: 'print(contar_vocales("banana"))', out_lines: ['3'] },
        { label: 'contar_vocales("")', call: 'print(contar_vocales(""))', out_lines: ['0'] },
      ],
      logic_msg: 'Comprueba con «banana»: tiene 3 vocales (las tres «a»).',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: qué se recorre, qué operador pregunta si la letra está en el grupo y qué se devuelve.' },
      { level: 'Razonamiento', text: 'Recorres el parámetro de la función. Para «¿está en?» tienes un operador de dos letras.' },
      { level: 'Pseudocódigo', text: 'para cada letra de texto:\n    si letra está en "aeiou": cuenta + 1\ndevolver cuenta', pre: true },
      { level: 'Ayuda técnica', text: '`for letra in texto:`, `if letra in "aeiou":` y `return cuenta`.' },
    ],
    solution: {
      code: 'def contar_vocales(texto):\n    cuenta = 0\n    for letra in texto:\n        if letra in "aeiou":\n            cuenta += 1\n    return cuenta\n\nprint(contar_vocales("murcielago"))\nprint(contar_vocales("xyz"))',
      explanation: 'Es el patrón del contador: recorrer, comprobar y sumar 1. «murcielago» tiene las cinco vocales.',
    },
    reference: ['def contar_vocales(texto):\n    cuenta = 0\n    for letra in texto:\n        if letra in "aeiou":\n            cuenta += 1\n    return cuenta\n\nprint(contar_vocales("murcielago"))\nprint(contar_vocales("xyz"))'],
    wrongs: [
      { code: 'def contar_vocales(texto):\n    cuenta = 0\n    for letra in ___:\n        if letra ___ "aeiou":\n            cuenta += 1\n    return ___', category: 'incompleto' },
      { code: 'def contar_vocales(texto):\n    cuenta = 0\n    for letra in texto:\n        if letra == "aeiou":\n            cuenta += 1\n    return cuenta\n\nprint(contar_vocales("murcielago"))\nprint(contar_vocales("xyz"))', category: 'logica' },
    ],
  },
  'bus-fix': {
    id: 'bus-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El detector de primos despistado', difficulty: 3, xp: 25, concepts: ['busqueda', 'errores'],
    statement: '`es_primo(n)` dice que 9 y 15 son primos. **No hay error de Python**: el fallo está en dónde se decide que el número es primo. Corrígelo.',
    expected: 'True\nFalse\nFalse\nTrue',
    starter: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n    return True\n\nprint(es_primo(7))\nprint(es_primo(9))\nprint(es_primo(15))\nprint(es_primo(2))',
    spec: {
      skip_tips: ['repeated_numbers'], // el 2 forma parte de la definición de primo
      functions: [{ name: 'es_primo', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True', 'False', 'False', 'True'] },
        { label: 'es_primo(97)', call: 'print(es_primo(97))', out_lines: ['True'] },
        { label: 'es_primo(91) (7 × 13)', call: 'print(es_primo(91))', out_lines: ['False'] },
        { label: 'es_primo(1)', call: 'print(es_primo(1))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'True', 'True', 'True'], title: 'Decide demasiado pronto', msg: 'El `else: return True` está dentro del bucle: la función decide mirando solo el divisor 2. Quita ese else: el return True ya está después del bucle.' },
      ],
      logic_msg: 'Comprueba con 9: tiene el divisor 3, así que debe dar False.',
    },
    hints: [
      { level: 'Orientación', text: 'Sigue el bucle con n = 9: ¿qué pasa en la primera vuelta (d = 2)?' },
      { level: 'Razonamiento', text: 'Para decir que un número es primo hay que haber probado **todos** los divisores. ¿Puede decidirse eso dentro del bucle?' },
      { level: 'Pseudocódigo', text: 'para cada d de 2 a n − 1:\n    si d divide a n: devolver False\n(después del bucle) devolver True', pre: true },
      { level: 'Ayuda técnica', text: 'Borra las líneas `else:` y `return True` de dentro del bucle. El `return True` final (fuera del for) ya es correcto.' },
    ],
    solution: {
      code: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(es_primo(7))\nprint(es_primo(9))\nprint(es_primo(15))\nprint(es_primo(2))',
      explanation: 'Basta un divisor para decir «no es primo», así que ese return puede ir dentro. Pero «sí es primo» solo se sabe al terminar de probar todos: ese return va fuera del bucle.',
    },
    reference: ['def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(es_primo(7))\nprint(es_primo(9))\nprint(es_primo(15))\nprint(es_primo(2))'],
    wrongs: [
      { code: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n    return True\n\nprint(es_primo(7))\nprint(es_primo(9))\nprint(es_primo(15))\nprint(es_primo(2))', category: 'comprension' },
      { code: 'def es_primo(n):\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(es_primo(7))\nprint(es_primo(9))\nprint(es_primo(15))\nprint(es_primo(2))', category: 'logica' },
    ],
  },
  'bus-build': {
    id: 'bus-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El primer primo después de…', difficulty: 3, xp: 30, concepts: ['busqueda', 'composicion', 'bucles'],
    unlock: { any: ['bus-predict', 'bus-complete', 'bus-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `es_primo(n)` (como en la lección) y `siguiente_primo(n)`, que devuelva el **primer número primo mayor que n**, usando `es_primo`.\n\nEjemplos: `siguiente_primo(10)` → 11; `siguiente_primo(13)` → 17; `siguiente_primo(1)` → 2.',
    expected: '11',
    plan: [
      {
        q: '¿Qué tipo de bucle encaja mejor en siguiente_primo?',
        options: [
          { text: 'while: no sabes cuántos números tendrás que probar', correct: true },
          { text: 'for i in range(10)', why: 'Entre dos primos puede haber más de 10 números: no sabes de antemano cuántos probar.' },
        ],
      },
      {
        q: '¿Por dónde empiezas a probar?',
        options: [
          { text: 'Por n + 1, porque tiene que ser mayor que n', correct: true },
          { text: 'Por n', why: 'Si n ya es primo (como 13), devolverías el mismo n, y se pide uno mayor.' },
        ],
      },
    ],
    planScaffold: 'def es_primo(n):\n    # ...\n\n\ndef siguiente_primo(n):\n    # empezar en n + 1 y avanzar mientras no sea primo\n\n\nprint(siguiente_primo(10))\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'es_primo', params: 1 }, { name: 'siguiente_primo', params: 1 }],
      cases: [
        { label: 'siguiente_primo(10)', call: 'print(siguiente_primo(10))', out_lines: ['11'] },
        { label: 'siguiente_primo(13)', call: 'print(siguiente_primo(13))', out_lines: ['17'] },
        { label: 'siguiente_primo(1)', call: 'print(siguiente_primo(1))', out_lines: ['2'] },
        { label: 'siguiente_primo(89)', call: 'print(siguiente_primo(89))', out_lines: ['97'] },
        { label: 'es_primo(91)', call: 'print(es_primo(91))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['13'], title: 'Tiene que ser mayor', msg: 'Si n ya es primo, la función lo devuelve. Empieza a probar en n + 1.' },
      ],
      rules: [{ type: 'must_call', name: 'es_primo', title: 'Reutiliza es_primo', msg: 'siguiente_primo debe usar es_primo para comprobar cada candidato.' }],
      logic_msg: 'Comprueba con 13: el siguiente primo es 17 (14, 15 y 16 no lo son).',
    },
    hints: [
      { level: 'Orientación', text: 'Dos funciones: es_primo (ya la conoces) y siguiente_primo, que prueba candidatos uno a uno.' },
      { level: 'Razonamiento', text: 'Empieza en n + 1 y, mientras el candidato no sea primo, súmale 1. Cuando salgas del bucle, el candidato es la respuesta.' },
      { level: 'Pseudocódigo', text: 'candidato ← n + 1\nmientras no es_primo(candidato):\n    candidato ← candidato + 1\ndevolver candidato', pre: true },
      { level: 'Ayuda técnica', text: '`while not es_primo(candidato):` dentro de siguiente_primo.' },
    ],
    solution: {
      code: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef siguiente_primo(n):\n    """Devuelve el primer primo mayor que n."""\n    candidato = n + 1\n    while not es_primo(candidato):\n        candidato += 1\n    return candidato\n\nprint(siguiente_primo(10))',
      explanation: 'siguiente_primo compone búsqueda y comprobación: prueba candidatos con while y delega en es_primo la pregunta «¿es primo?».',
    },
    reference: [
      'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef siguiente_primo(n):\n    candidato = n + 1\n    while not es_primo(candidato):\n        candidato += 1\n    return candidato',
    ],
    wrongs: [
      { code: 'def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef siguiente_primo(n):\n    candidato = n\n    while not es_primo(candidato):\n        candidato += 1\n    return candidato', category: 'comprension' },
      { code: 'def es_primo(n):\n    return n % 2 != 0\n\ndef siguiente_primo(n):\n    candidato = n + 1\n    while not es_primo(candidato):\n        candidato += 1\n    return candidato', category: 'logica' },
    ],
  },
};
