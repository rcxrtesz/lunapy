// Lección 10.3 · Proyecto: análisis de texto. Contenido original, inspirado en el
// cap. 12 de «Piensa en Python» (análisis de frecuencia de palabras). Integra cadenas,
// listas, diccionarios, tuplas y funciones en un programa completo.

const TOPIC = 'Diccionarios';

export const LESSON_PROYECTO_TEXTO = {
  id: 'proyecto-texto',
  moduleId: 'm10',
  code: '10.3',
  title: 'Proyecto: análisis de texto',
  minutes: 40,
  bonusXp: 40,
  objectives: [
    'Descomponer un problema mediano en funciones pequeñas',
    'Limpiar un texto: minúsculas y sin signos de puntuación',
    'Contar la frecuencia de cada palabra con un diccionario',
    'Obtener las palabras más frecuentes ordenando por frecuencia',
    'Unir todas las piezas en un informe',
  ],
  prerequisites: ['Lección 10.2 «Tuplas»'],
  teaser: 'Proyecto de módulo: vas a construir un analizador de textos que cuenta palabras, encuentra las más usadas y genera un informe. Todo con lo que ya sabes.',
  celebration: 'Has completado el Módulo 10 con un proyecto de verdad: un analizador de textos construido pieza a pieza.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'El plan', concepts: ['descomponer', 'diccionarios'],
      blocks: [
        { type: 'p', text: 'Queremos que, dado un texto, el programa diga cuántas palabras tiene, cuántas son distintas y cuáles son las más repetidas. Antes de programar, **descomponemos**:' },
        {
          type: 'five', items: {
            '1 · limpiar(texto)': 'Pasar a minúsculas y quitar los signos de puntuación.',
            '2 · contar(palabras)': 'Diccionario palabra → número de veces.',
            '3 · mas_frecuentes(recuento, n)': 'Las n palabras con más apariciones.',
            '4 · informe(texto)': 'Usar las tres anteriores y mostrar el resultado.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Una pieza cada vez', text: 'Escribe y prueba cada función por separado, como en el desarrollo incremental. Cuando las tres funcionen, el informe será casi inmediato.' },
        {
          type: 'check', id: 'm10p-plan', concept: 'descomponer', mode: 'choice',
          question: '¿Por qué hay que limpiar el texto antes de contar?',
          options: [
            { text: 'Para que «Sol», «sol» y «sol,» cuenten como la misma palabra', correct: true },
            { text: 'Para que el programa vaya más rápido', why: 'No es por velocidad: sin limpiar, la misma palabra aparecería como varias claves distintas.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limpiar', title: 'Paso 1: limpiar', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Minúsculas con `lower()` y, para cada signo de puntuación, un `replace` que lo elimine:' },
        { type: 'code', run: true, code: 'SIGNOS = ".,;:¡!¿?\\"()"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\nprint(limpiar("¡Hola, Mundo! ¿Qué tal?"))' },
        {
          type: 'check', id: 'm10p-limpiar', concept: 'cadenas', mode: 'text',
          question: 'Con esa función, ¿cuántas palabras da limpiar("Sol, sol. SOL").split()?', code: 'SIGNOS = ".,;:¡!¿?\\"()"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\nprint(len(limpiar("Sol, sol. SOL").split()))', answer: '3',
          explain: 'Tres palabras, y después de limpiar las tres son exactamente «sol».',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'contar', title: 'Paso 2: contar', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'El patrón del diccionario contador, aplicado a palabras:' },
        { type: 'code', run: true, code: 'def contar(palabras):\n    recuento = {}\n    for p in palabras:\n        recuento[p] = recuento.get(p, 0) + 1\n    return recuento\n\nprint(contar("el sol y el mar y el cielo".split()))' },
        {
          type: 'check', id: 'm10p-distintas', concept: 'diccionarios', mode: 'text',
          question: 'Predice: ¿cuántas palabras distintas hay?', code: 'recuento = {}\nfor p in "a b a c b a".split():\n    recuento[p] = recuento.get(p, 0) + 1\nprint(len(recuento))', answer: '3',
          explain: 'El diccionario tiene una clave por palabra distinta: a, b y c.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'top', title: 'Paso 3: las más frecuentes', concepts: ['tuplas', 'diccionarios'],
      blocks: [
        { type: 'p', text: '`recuento.items()` da tuplas (palabra, veces). Ordenándolas por el segundo elemento, de mayor a menor, las primeras son las más frecuentes:' },
        { type: 'code', run: true, code: 'def veces(par):\n    return par[1]\n\ndef mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), key=veces, reverse=True)\n    return ordenadas[:n]\n\nrecuento = {"el": 3, "sol": 1, "y": 2, "mar": 1}\nprint(mas_frecuentes(recuento, 2))' },
        { type: 'callout', tone: 'info', title: 'Empates', text: 'sorted es **estable**: si dos palabras tienen las mismas apariciones, conservan el orden en que estaban (el de su primera aparición en el texto).' },
        {
          type: 'check', id: 'm10p-top', concept: 'tuplas', mode: 'text',
          question: 'Predice:', code: 'def veces(par):\n    return par[1]\n\nr = {"a": 1, "b": 4, "c": 2}\nprint(sorted(r.items(), key=veces, reverse=True)[0])', answer: "('b', 4)",
          explain: 'La pareja con más apariciones es ("b", 4).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'informe', title: 'Paso 4: el informe', concepts: ['composicion', 'descomponer'],
      blocks: [
        { type: 'p', text: 'Con las tres piezas probadas, el informe solo tiene que combinarlas:' },
        { type: 'code', run: true, code: 'SIGNOS = ".,;:¡!¿?\\"()"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\ndef contar(palabras):\n    recuento = {}\n    for p in palabras:\n        recuento[p] = recuento.get(p, 0) + 1\n    return recuento\n\ndef veces(par):\n    return par[1]\n\ndef mas_frecuentes(recuento, n):\n    return sorted(recuento.items(), key=veces, reverse=True)[:n]\n\ndef informe(texto):\n    palabras = limpiar(texto).split()\n    recuento = contar(palabras)\n    print("Palabras:", len(palabras))\n    print("Distintas:", len(recuento))\n    for palabra, n in mas_frecuentes(recuento, 3):\n        print(f"  {palabra}: {n}")\n\ninforme("El mar es azul. El cielo es azul. ¿Y el sol? El sol es amarillo.")', caption: 'Cambia el texto por uno tuyo y vuelve a ejecutar.' },
        {
          type: 'check', id: 'm10p-informe', concept: 'composicion', mode: 'choice',
          question: '¿Qué ventaja tiene haber separado el programa en funciones?',
          options: [
            { text: 'Cada pieza se puede probar, entender y reutilizar por separado', correct: true },
            { text: 'Que el programa tiene menos líneas', why: 'De hecho tiene alguna más. La ventaja es que cada parte es sencilla y comprobable.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'txt-predict' },
    { id: 'a2', activity: 'txt-complete' },
    { id: 'a3', activity: 'txt-fix' },
    { id: 'a4', activity: 'txt-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un problema mediano se descompone en funciones pequeñas que se prueban por separado.',
    'Limpiar: `lower()` y un `replace` por cada signo de puntuación.',
    'Contar: diccionario palabra → veces con `get(p, 0) + 1`.',
    'Las más frecuentes: `sorted(recuento.items(), key=veces, reverse=True)[:n]`.',
    'El informe compone las piezas: limpiar → split → contar → ordenar → mostrar.',
  ],
};

const LIMPIAR = 'SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\n';

export const ACTIVITIES_PROYECTO_TEXTO = {
  'txt-predict': {
    id: 'txt-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Contar después de limpiar', difficulty: 2, xp: 10, concepts: ['diccionarios', 'cadenas'],
    prompt: 'Se limpia el texto y se cuentan las palabras. **¿Qué mostrará?**',
    code: 'texto = "Sí, sí. ¡NO! no, sí"\nlimpio = texto.lower().replace(",", "").replace(".", "").replace("¡", "").replace("!", "")\nrecuento = {}\nfor p in limpio.split():\n    recuento[p] = recuento.get(p, 0) + 1\nprint(recuento)',
    expectedOutput: "{'sí': 3, 'no': 2}",
    options: [
      { text: "{'sí': 3, 'no': 2}", correct: true },
      { text: "{'Sí': 1, 'sí': 2, 'NO': 1, 'no': 1}", concept: 'cadenas', why: 'lower() pasa todo a minúsculas antes de contar: «Sí» y «sí» son la misma palabra.' },
      { text: "{'sí,': 1, 'sí.': 1, '¡no!': 1, 'no,': 1, 'sí': 1}", concept: 'cadenas', why: 'Los replace quitan los signos antes de separar las palabras.' },
      { text: "{'no': 2, 'sí': 3}", concept: 'diccionarios', why: 'El diccionario conserva el orden en que aparecen las claves: «sí» aparece antes.' },
    ],
    explain: ['Tras limpiar: "sí sí no no sí".', 'Se cuentan 3 «sí» y 2 «no», en orden de aparición.'],
  },
  'txt-complete': {
    id: 'txt-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La función limpiar', difficulty: 2, xp: 15, concepts: ['cadenas', 'bucles'],
    statement: 'Completa `limpiar(texto)`: debe pasar el texto a minúsculas y eliminar todos los signos de `SIGNOS`.',
    expected: 'hola mundo qué tal',
    starter: 'SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.___()\n    for signo in ___:\n        texto = texto.___(signo, "")\n    return texto\n\nprint(limpiar("¡Hola, Mundo! ¿Qué tal?"))',
    spec: {
      blanks: true,
      exact_lines: true,
      functions: [{ name: 'limpiar', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['hola mundo qué tal'] },
        { label: 'limpiar("A; B: C.")', call: 'print(limpiar("A; B: C."))', out_lines: ['a b c'] },
      ],
      misconceptions: [
        { out_lines: ['¡hola, mundo! ¿qué tal?'], title: 'Los signos siguen ahí', msg: 'replace devuelve un texto nuevo: guárdalo en texto en cada vuelta (`texto = texto.replace(...)`).' },
      ],
      logic_msg: 'El resultado debe estar en minúsculas y sin ninguno de los signos.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: el método de las minúsculas, lo que recorre el bucle y el método que sustituye.' },
      { level: 'Razonamiento', text: 'Recorre cada signo de la constante SIGNOS y sustitúyelo por un texto vacío.' },
      { level: 'Pseudocódigo', text: 'texto ← texto en minúsculas\npara cada signo de SIGNOS:\n    texto ← texto sin ese signo', pre: true },
      { level: 'Ayuda técnica', text: '`texto.lower()`, `for signo in SIGNOS:` y `texto.replace(signo, "")`.' },
    ],
    solution: {
      code: 'SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\nprint(limpiar("¡Hola, Mundo! ¿Qué tal?"))',
      explanation: 'Un bucle sobre el texto SIGNOS recorre cada signo; replace devuelve un texto nuevo sin él, que se guarda para la siguiente vuelta.',
    },
    reference: ['SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto = texto.replace(signo, "")\n    return texto\n\nprint(limpiar("¡Hola, Mundo! ¿Qué tal?"))'],
    wrongs: [
      { code: 'SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.___()\n    for signo in ___:\n        texto = texto.___(signo, "")\n    return texto', category: 'incompleto' },
      { code: 'SIGNOS = ".,;:¡!¿?"\n\ndef limpiar(texto):\n    texto = texto.lower()\n    for signo in SIGNOS:\n        texto.replace(signo, "")\n    return texto\n\nprint(limpiar("¡Hola, Mundo! ¿Qué tal?"))', category: 'comprension' },
    ],
  },
  'txt-fix': {
    id: 'txt-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El top que ordena mal', difficulty: 3, xp: 25, concepts: ['tuplas', 'diccionarios'],
    statement: '`mas_frecuentes(recuento, n)` debería devolver las n palabras **con más apariciones**, pero devuelve las que van al final del alfabeto. Corrígelo.',
    expected: "[('el', 3), ('y', 2)]",
    starter: 'def mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), reverse=True)\n    return ordenadas[:n]\n\nprint(mas_frecuentes({"el": 3, "sol": 1, "y": 2, "mar": 1}, 2))',
    spec: {
      functions: [{ name: 'mas_frecuentes', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ["[('el', 3), ('y', 2)]"] },
        { label: 'Top 1', call: 'print(mas_frecuentes({"zeta": 1, "alfa": 5}, 1))', out_lines: ["[('alfa', 5)]"] },
        { label: 'Empate (orden original)', call: 'print(mas_frecuentes({"b": 2, "a": 2, "c": 1}, 2))', out_lines: ["[('b', 2), ('a', 2)]"] },
      ],
      misconceptions: [
        { out_lines: ["[('y', 2), ('sol', 1)]"], title: 'Ordena por la palabra', msg: 'Sin key, las tuplas se ordenan por su primer elemento: la palabra. Usa una función clave que devuelva el número de apariciones.' },
      ],
      logic_msg: 'Debe ordenar por el número de apariciones, de mayor a menor.',
    },
    hints: [
      { level: 'Orientación', text: 'Las tuplas (palabra, veces) se ordenan por defecto por la palabra. ¿Por qué elemento quieres ordenar?' },
      { level: 'Razonamiento', text: 'Necesitas pasar a sorted una función clave que devuelva el segundo elemento de cada tupla.' },
      { level: 'Pseudocódigo', text: 'veces(par): devolver par[1]\nordenadas ← ordenar recuento.items() por veces, de mayor a menor', pre: true },
      { level: 'Ayuda técnica', text: 'Define `def veces(par): return par[1]` y usa `sorted(recuento.items(), key=veces, reverse=True)`.' },
    ],
    solution: {
      code: 'def veces(par):\n    return par[1]\n\ndef mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), key=veces, reverse=True)\n    return ordenadas[:n]\n\nprint(mas_frecuentes({"el": 3, "sol": 1, "y": 2, "mar": 1}, 2))',
      explanation: 'Sin key, sorted compara las tuplas por su primer elemento (la palabra). Con key=veces compara el número de apariciones; como sorted es estable, los empates conservan el orden original.',
    },
    reference: ['def veces(par):\n    return par[1]\n\ndef mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), key=veces, reverse=True)\n    return ordenadas[:n]\n\nprint(mas_frecuentes({"el": 3, "sol": 1, "y": 2, "mar": 1}, 2))'],
    wrongs: [
      { code: 'def mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), reverse=True)\n    return ordenadas[:n]\n\nprint(mas_frecuentes({"el": 3, "sol": 1, "y": 2, "mar": 1}, 2))', category: 'comprension' },
      { code: 'def veces(par):\n    return par[1]\n\ndef mas_frecuentes(recuento, n):\n    ordenadas = sorted(recuento.items(), key=veces)\n    return ordenadas[:n]\n\nprint(mas_frecuentes({"el": 3, "sol": 1, "y": 2, "mar": 1}, 2))', category: 'logica' },
    ],
  },
  'txt-build': {
    id: 'txt-build', type: 'code', variant: 'build', kindLabel: 'Proyecto', topic: TOPIC,
    title: 'El resumen del texto', difficulty: 3, xp: 40, concepts: ['diccionarios', 'composicion', 'descomponer'],
    unlock: { any: ['txt-predict', 'txt-complete', 'txt-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Ya tienes `limpiar` en el código inicial. Define `resumen(texto)` que devuelva una **tupla** con tres datos del texto limpio:\n\n• el número total de palabras,\n\n• el número de palabras distintas,\n\n• la palabra más larga (si hay empate, la primera que aparece).\n\nEjemplo: `resumen("El sol, el mar y el cielo.")` → `(7, 5, \'cielo\')`.',
    expected: "(7, 5, 'cielo')",
    plan: [
      {
        q: '¿Cómo obtienes el número de palabras distintas?',
        options: [
          { text: 'Con len de un diccionario contador (o de un set)', correct: true },
          { text: 'Con len(palabras)', why: 'Eso cuenta todas, también las repetidas.' },
        ],
      },
      {
        q: '¿Cómo obtienes la palabra más larga?',
        options: [
          { text: 'max(palabras, key=len)', correct: true },
          { text: 'max(palabras)', why: 'Sin key, max compara alfabéticamente.' },
        ],
      },
    ],
    planScaffold: '',
    starter: LIMPIAR + 'def resumen(texto):\n    palabras = limpiar(texto).split()\n    # total, distintas y la más larga\n\n\nprint(resumen("El sol, el mar y el cielo."))\n',
    spec: {
      functions: [{ name: 'resumen', params: 1 }, { name: 'limpiar', params: 1 }],
      cases: [
        { label: 'Ejemplo', call: 'print(resumen("El sol, el mar y el cielo."))', out_lines: ["(7, 5, 'cielo')"] },
        { label: 'Empate de longitud', call: 'print(resumen("Gato, pato. ¡Rato!"))', out_lines: ["(3, 3, 'gato')"] },
        { label: 'Repeticiones', call: 'print(resumen("Sí, sí, SÍ."))', out_lines: ["(3, 1, 'sí')"] },
      ],
      misconceptions: [
        { out_lines: ["(7, 7, 'cielo')"], title: 'Distintas no son todas', msg: 'Las palabras repetidas solo cuentan una vez: usa len de un diccionario contador o de set(palabras).' },
        { out_lines: ["(7, 5, 'y')"], title: 'Compara alfabéticamente', msg: 'max sin key compara por orden alfabético. Usa `max(palabras, key=len)`.' },
        { out_lines: ['None'], title: 'Falta el return', msg: 'La función tiene que devolver la tupla: `return total, distintas, larga`.' },
      ],
      logic_msg: 'Comprueba con el ejemplo: 7 palabras en total, 5 distintas («el» aparece tres veces) y «cielo» es la más larga.',
    },
    hints: [
      { level: 'Orientación', text: 'Ya tienes la lista de palabras limpias. Te faltan tres cálculos y un return.' },
      { level: 'Razonamiento', text: 'Total: len de la lista. Distintas: len de un contador (o de set). Más larga: max con key=len, que en empate se queda con la primera.' },
      { level: 'Pseudocódigo', text: 'total ← len(palabras)\ndistintas ← len(contador de palabras)\nlarga ← max(palabras, key=len)\ndevolver total, distintas, larga', pre: true },
      { level: 'Ayuda técnica', text: '`len(set(palabras))` da las distintas en una línea. `return len(palabras), len(set(palabras)), max(palabras, key=len)`.' },
    ],
    solution: {
      code: LIMPIAR + 'def resumen(texto):\n    """Devuelve (total de palabras, palabras distintas, palabra más larga)."""\n    palabras = limpiar(texto).split()\n    recuento = {}\n    for p in palabras:\n        recuento[p] = recuento.get(p, 0) + 1\n    larga = max(palabras, key=len)\n    return len(palabras), len(recuento), larga\n\nprint(resumen("El sol, el mar y el cielo."))',
      explanation: 'resumen compone piezas que ya conoces: limpiar, el diccionario contador y max con key. Devuelve una tupla, así que se puede desempaquetar: `total, distintas, larga = resumen(texto)`.',
    },
    reference: [
      LIMPIAR + 'def resumen(texto):\n    palabras = limpiar(texto).split()\n    return len(palabras), len(set(palabras)), max(palabras, key=len)',
    ],
    wrongs: [
      { code: LIMPIAR + 'def resumen(texto):\n    palabras = limpiar(texto).split()\n    return len(palabras), len(palabras), max(palabras, key=len)', category: 'comprension' },
      { code: LIMPIAR + 'def resumen(texto):\n    palabras = limpiar(texto).split()\n    return len(palabras), len(set(palabras)), max(palabras)', category: 'comprension' },
    ],
  },
};
