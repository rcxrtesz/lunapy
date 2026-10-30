// Lección 11.2 · Procesar datos. Contenido original, alineado con el cap. 13 de
// «Piensa en Python» y PE2 módulo 4: leer datos tabulados (CSV), convertir tipos,
// agrupar con diccionarios y escribir un informe. El módulo csv aparece al final.

const TOPIC = 'Archivos';

const VENTAS = 'with open("ventas.csv", "w") as f:\n    f.write("producto,unidades,precio\\n")\n    f.write("libreta,3,2.5\\n")\n    f.write("boli,10,0.8\\n")\n    f.write("libreta,2,2.5\\n")\n';

export const LESSON_PROCESAR = {
  id: 'procesar',
  moduleId: 'm11',
  code: '11.2',
  title: 'Procesar datos',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Reconocer un archivo CSV: filas y columnas separadas por comas',
    'Separar cada fila con split y convertir cada campo a su tipo',
    'Saltar la fila de cabecera',
    'Agrupar y totalizar por categorías con un diccionario',
    'Usar el módulo csv y escribir un informe en otro archivo',
  ],
  prerequisites: ['Lección 11.1 «Leer y escribir archivos»'],
  teaser: 'Los datos reales suelen llegar en tablas: ventas, notas, gastos… Hoy aprendes a leerlas, resumirlas y sacar conclusiones.',
  celebration: 'Ya procesas datos de verdad: lees tablas, conviertes tipos, agrupas por categorías y generas informes.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'csv', title: 'Datos en tabla: CSV', concepts: ['archivos', 'datos'],
      blocks: [
        { type: 'p', text: 'Un archivo **CSV** (*valores separados por comas*) es una tabla en texto: cada línea es una fila y las comas separan las columnas. La primera fila suele ser la **cabecera** con los nombres de las columnas.' },
        { type: 'code', run: true, code: VENTAS + '\nwith open("ventas.csv") as f:\n    print(f.read())' },
        {
          type: 'check', id: 'm11p-columnas', concept: 'datos', mode: 'text',
          question: 'Predice: ¿cuántas columnas tiene la fila?', code: 'fila = "libreta,3,2.5\\n"\nprint(len(fila.strip().split(",")))', answer: '3',
          explain: 'split(",") da ["libreta", "3", "2.5"]: tres columnas.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'convertir', title: 'Separar y convertir', concepts: ['datos', 'tipos'],
      blocks: [
        { type: 'p', text: 'Al separar, **todo son textos**. Para calcular hay que convertir cada campo a su tipo. Y la cabecera se salta con `next(f)`, que consume la primera línea:' },
        { type: 'code', run: true, code: VENTAS + '\ntotal = 0\nwith open("ventas.csv") as f:\n    next(f)                      # saltar la cabecera\n    for linea in f:\n        producto, unidades, precio = linea.strip().split(",")\n        importe = int(unidades) * float(precio)\n        print(producto, importe)\n        total += importe\nprint("Total:", total)' },
        { type: 'callout', tone: 'warn', title: 'Si olvidas la cabecera', text: 'La primera «fila de datos» sería `producto,unidades,precio`, e `int("unidades")` daría un ValueError.' },
        {
          type: 'check', id: 'm11p-convertir', concept: 'datos', mode: 'text',
          question: 'Predice:', code: 'nombre, edad = "Ana,19".split(",")\nprint(int(edad) + 1)', answer: '20',
          explain: 'edad es el texto "19"; con int() se convierte en número y se le puede sumar 1.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'agrupar', title: 'Agrupar por categorías', concepts: ['datos', 'diccionarios'],
      blocks: [
        { type: 'p', text: '¿Cuántas unidades se vendieron de **cada** producto? Es el patrón del diccionario contador, pero sumando una cantidad en lugar de 1:' },
        { type: 'code', run: true, code: VENTAS + '\npor_producto = {}\nwith open("ventas.csv") as f:\n    next(f)\n    for linea in f:\n        producto, unidades, precio = linea.strip().split(",")\n        por_producto[producto] = por_producto.get(producto, 0) + int(unidades)\nprint(por_producto)' },
        {
          type: 'check', id: 'm11p-agrupar', concept: 'diccionarios', mode: 'text',
          question: 'Predice:', code: 'filas = ["a,5", "b,2", "a,1"]\ntot = {}\nfor f in filas:\n    k, v = f.split(",")\n    tot[k] = tot.get(k, 0) + int(v)\nprint(tot)', answer: "{'a': 6, 'b': 2}",
          explain: 'Las dos filas de «a» se suman: 5 + 1 = 6.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulo-csv', title: 'El módulo csv y escribir el informe', concepts: ['datos', 'archivos'],
      blocks: [
        { type: 'p', text: 'El módulo `csv` hace el split por ti y resuelve casos difíciles (como comas dentro de un campo entre comillas). `csv.reader` da cada fila como una lista:' },
        { type: 'code', run: true, code: 'import csv\n\n' + VENTAS + '\nwith open("ventas.csv") as f:\n    lector = csv.reader(f)\n    cabecera = next(lector)\n    for fila in lector:\n        print(fila)' },
        { type: 'p', text: 'Y para guardar los resultados, escribe un archivo nuevo con el informe:' },
        { type: 'code', run: true, code: 'resumen = {"libreta": 5, "boli": 10}\nwith open("informe.txt", "w") as f:\n    for producto, unidades in resumen.items():\n        f.write(f"{producto}: {unidades} unidades\\n")\n\nwith open("informe.txt") as f:\n    print(f.read())' },
        {
          type: 'check', id: 'm11p-reader', concept: 'datos', mode: 'choice',
          question: '¿Qué da csv.reader en cada vuelta del for?',
          options: [
            { text: 'Una lista con los campos de la fila, como textos', correct: true },
            { text: 'Los campos ya convertidos a números', why: 'csv.reader no adivina tipos: los campos siguen siendo textos y tienes que convertirlos tú.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'csv-predict' },
    { id: 'a2', activity: 'csv-complete' },
    { id: 'a3', activity: 'csv-fix' },
    { id: 'a4', activity: 'csv-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un CSV es una tabla en texto: filas en líneas y columnas separadas por comas; la primera suele ser la cabecera.',
    '`linea.strip().split(",")` separa los campos; todos son textos y hay que convertirlos (`int`, `float`).',
    '`next(f)` salta la cabecera antes del bucle.',
    'Agrupar: `totales[clave] = totales.get(clave, 0) + cantidad`.',
    'El módulo `csv` (`csv.reader`) separa las filas por ti; escribe los resultados en otro archivo con `write`.',
  ],
};

export const ACTIVITIES_PROCESAR = {
  'csv-predict': {
    id: 'csv-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El gasto del mes', difficulty: 2, xp: 10, concepts: ['datos', 'diccionarios'],
    prompt: 'Se agrupan los gastos por categoría. **¿Qué mostrará?**',
    code: 'with open("gastos.csv", "w") as f:\n    f.write("categoria,importe\\ncomida,30\\nocio,15\\ncomida,20\\n")\n\npor_categoria = {}\nwith open("gastos.csv") as f:\n    next(f)\n    for linea in f:\n        cat, imp = linea.strip().split(",")\n        por_categoria[cat] = por_categoria.get(cat, 0) + int(imp)\nprint(por_categoria)',
    expectedOutput: "{'comida': 50, 'ocio': 15}",
    options: [
      { text: "{'comida': 50, 'ocio': 15}", correct: true },
      { text: "{'comida': 20, 'ocio': 15}", concept: 'diccionarios', why: 'Se suma al valor anterior con get(cat, 0) + importe: 30 + 20 = 50.' },
      { text: "{'categoria': 'importe', 'comida': 50, 'ocio': 15}", concept: 'datos', why: 'next(f) se salta la cabecera antes del bucle.' },
      { text: "{'comida': '3020', 'ocio': '15'}", concept: 'tipos', why: 'int(imp) convierte cada importe en número antes de sumar.' },
    ],
    explain: ['next(f) salta «categoria,importe».', 'comida: 30 + 20 = 50; ocio: 15.'],
  },
  'csv-complete': {
    id: 'csv-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La nota media de la clase', difficulty: 2, xp: 15, concepts: ['datos', 'archivos'],
    statement: 'El archivo tiene la cabecera `nombre,nota` y una alumna por fila. Completa `media_clase(nombre_archivo)` para que devuelva la nota media redondeada a 2 decimales.',
    expected: '7.17',
    starter: 'def media_clase(nombre_archivo):\n    notas = []\n    with open(nombre_archivo) as f:\n        ___(f)\n        for linea in f:\n            nombre, nota = linea.strip().___(",")\n            notas.append(___(nota))\n    return round(sum(notas) / len(notas), 2)\n\nwith open("clase.csv", "w") as f:\n    f.write("nombre,nota\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(media_clase("clase.csv"))',
    spec: {
      blanks: true,
      functions: [{ name: 'media_clase', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['7.17'] },
        { label: 'Otra clase', call: 'with open("c2.csv", "w") as f:\n    f.write("nombre,nota\\nLeo,10\\nBea,5\\n")\nprint(media_clase("c2.csv"))', out_lines: ['7.5'] },
      ],
      logic_msg: 'Revisa los tres huecos: saltar la cabecera, separar por comas y convertir la nota a número decimal.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: la función que salta una línea, el método que separa y la conversión de la nota.' },
      { level: 'Razonamiento', text: 'La primera línea es la cabecera. Las notas pueden tener decimales.' },
      { level: 'Pseudocódigo', text: 'saltar la cabecera\npara cada línea: nombre, nota ← separar por ","\n    añadir nota convertida a decimal', pre: true },
      { level: 'Ayuda técnica', text: '`next(f)`, `split(",")` y `float(nota)`.' },
    ],
    solution: {
      code: 'def media_clase(nombre_archivo):\n    notas = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            nombre, nota = linea.strip().split(",")\n            notas.append(float(nota))\n    return round(sum(notas) / len(notas), 2)\n\nwith open("clase.csv", "w") as f:\n    f.write("nombre,nota\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(media_clase("clase.csv"))',
      explanation: 'next salta la cabecera; split separa nombre y nota; float convierte la nota para poder sumarla. (8 + 6 + 7.5) / 3 = 7.17.',
    },
    reference: ['def media_clase(nombre_archivo):\n    notas = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            nombre, nota = linea.strip().split(",")\n            notas.append(float(nota))\n    return round(sum(notas) / len(notas), 2)\n\nwith open("clase.csv", "w") as f:\n    f.write("nombre,nota\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(media_clase("clase.csv"))'],
    wrongs: [
      { code: 'def media_clase(nombre_archivo):\n    notas = []\n    with open(nombre_archivo) as f:\n        ___(f)\n        for linea in f:\n            nombre, nota = linea.strip().___(",")\n            notas.append(___(nota))\n    return round(sum(notas) / len(notas), 2)', category: 'incompleto' },
      { code: 'def media_clase(nombre_archivo):\n    notas = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            nombre, nota = linea.strip().split(",")\n            notas.append(int(nota))\n    return round(sum(notas) / len(notas), 2)\n\nwith open("clase.csv", "w") as f:\n    f.write("nombre,nota\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(media_clase("clase.csv"))', category: 'ejecucion' },
    ],
  },
  'csv-fix': {
    id: 'csv-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La cabecera traicionera', difficulty: 2, xp: 20, concepts: ['datos', 'errores'],
    statement: '`total_unidades(archivo)` debería sumar la columna de unidades, pero da un **ValueError** en la primera vuelta. Lee el error y corrígelo.',
    expected: '15',
    starter: VENTAS + '\ndef total_unidades(archivo):\n    total = 0\n    with open(archivo) as f:\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            total += int(unidades)\n    return total\n\nprint(total_unidades("ventas.csv"))',
    spec: {
      functions: [{ name: 'total_unidades', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['15'] },
        { label: 'Otro archivo', call: 'with open("v2.csv", "w") as f:\n    f.write("producto,unidades,precio\\nx,1,1\\n")\nprint(total_unidades("v2.csv"))', out_lines: ['1'] },
      ],
      logic_msg: 'Debe sumar solo las filas de datos: 3 + 10 + 2 = 15.',
    },
    hints: [
      { level: 'Orientación', text: 'El error dice que no puede convertir «unidades» en número. ¿De qué fila sale ese texto?' },
      { level: 'Razonamiento', text: 'La primera línea es la cabecera. Hay que saltarla antes del bucle.' },
      { level: 'Pseudocódigo', text: 'abrir el archivo\nsaltar la primera línea\npara cada línea restante: sumar las unidades', pre: true },
      { level: 'Ayuda técnica', text: 'Añade `next(f)` justo antes del `for`.' },
    ],
    solution: {
      code: VENTAS + '\ndef total_unidades(archivo):\n    total = 0\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            total += int(unidades)\n    return total\n\nprint(total_unidades("ventas.csv"))',
      explanation: 'La cabecera no es un dato: `int("unidades")` no tiene sentido. next(f) la consume antes de que empiece el bucle.',
    },
    reference: [VENTAS + '\ndef total_unidades(archivo):\n    total = 0\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            total += int(unidades)\n    return total\n\nprint(total_unidades("ventas.csv"))'],
    wrongs: [
      { code: VENTAS + '\ndef total_unidades(archivo):\n    total = 0\n    with open(archivo) as f:\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            total += int(unidades)\n    return total\n\nprint(total_unidades("ventas.csv"))', category: 'ejecucion' },
    ],
  },
  'csv-build': {
    id: 'csv-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'El producto estrella', difficulty: 3, xp: 30, concepts: ['datos', 'diccionarios', 'composicion'],
    unlock: { any: ['csv-predict', 'csv-complete', 'csv-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Con un archivo de ventas como el de la lección (cabecera `producto,unidades,precio`), define `facturacion(archivo)` que devuelva un **diccionario** producto → dinero facturado (unidades × precio, redondeado a 2 decimales), sumando todas las filas de cada producto.\n\nEjemplo con el archivo de la lección: `{\'libreta\': 12.5, \'boli\': 8.0}`.',
    expected: "{'libreta': 12.5, 'boli': 8.0}",
    plan: [
      {
        q: '¿Qué guarda el diccionario para cada producto?',
        options: [
          { text: 'La suma de unidades × precio de todas sus filas', correct: true },
          { text: 'Solo las unidades', why: 'Se pide el dinero facturado: unidades × precio.' },
        ],
      },
      {
        q: '¿Cuándo redondeas?',
        options: [
          { text: 'Al final, cuando ya está todo sumado', correct: true },
          { text: 'En cada fila', why: 'Funciona casi siempre, pero redondear antes de terminar de sumar puede acumular pequeños errores.' },
        ],
      },
    ],
    planScaffold: 'def facturacion(archivo):\n    # leer, saltar la cabecera, acumular por producto y redondear\n\n\n' + VENTAS + 'print(facturacion("ventas.csv"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'facturacion', params: 1 }],
      cases: [
        { label: 'Archivo de la lección', call: VENTAS + 'print(facturacion("ventas.csv"))', out_lines: ["{'libreta': 12.5, 'boli': 8.0}"] },
        { label: 'Decimales', call: 'with open("v3.csv", "w") as f:\n    f.write("producto,unidades,precio\\ncafé,3,1.15\\nté,2,0.9\\ncafé,1,1.15\\n")\nprint(facturacion("v3.csv"))', out_lines: ["{'café': 4.6, 'té': 1.8}"] },
      ],
      misconceptions: [
        { out_lines: ["{'libreta': 5, 'boli': 10}"], title: 'Solo unidades', msg: 'Se pide el dinero: multiplica las unidades por el precio de cada fila.' },
        { out_lines: ["{'libreta': 5.0, 'boli': 8.0}"], title: 'Se pisa el valor', msg: 'Para libreta solo queda la última fila. Suma al valor anterior: `fact[p] = fact.get(p, 0) + importe`.' },
      ],
      logic_msg: 'Comprueba con el archivo de la lección: libreta 3 × 2.5 + 2 × 2.5 = 12.5 y boli 10 × 0.8 = 8.0.',
    },
    hints: [
      { level: 'Orientación', text: 'Es el patrón de agrupar con un diccionario, sumando un importe en lugar de 1.' },
      { level: 'Razonamiento', text: 'Para cada fila: separa, convierte unidades (int) y precio (float), calcula el importe y súmalo a su producto. Al final, redondea cada valor.' },
      { level: 'Pseudocódigo', text: 'fact ← {}\nsaltar cabecera\npara cada fila: p, u, pr ← campos\n    fact[p] ← fact.get(p, 0) + int(u) × float(pr)\npara cada p: fact[p] ← redondear(fact[p], 2)\ndevolver fact', pre: true },
      { level: 'Ayuda técnica', text: 'Para redondear al final: `for p in fact: fact[p] = round(fact[p], 2)`.' },
    ],
    solution: {
      code: 'def facturacion(archivo):\n    """Devuelve un diccionario producto → dinero facturado."""\n    fact = {}\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            fact[producto] = fact.get(producto, 0) + int(unidades) * float(precio)\n    for producto in fact:\n        fact[producto] = round(fact[producto], 2)\n    return fact\n\n' + VENTAS + 'print(facturacion("ventas.csv"))',
      explanation: 'Leer, convertir, agrupar y redondear: los pasos de casi cualquier procesamiento de datos. Modificar los valores de un diccionario mientras se recorre está permitido; lo que no se puede es añadir o quitar claves.',
    },
    reference: [
      'def facturacion(archivo):\n    fact = {}\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            fact[producto] = fact.get(producto, 0) + int(unidades) * float(precio)\n    for producto in fact:\n        fact[producto] = round(fact[producto], 2)\n    return fact',
    ],
    wrongs: [
      { code: 'def facturacion(archivo):\n    fact = {}\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            fact[producto] = fact.get(producto, 0) + int(unidades)\n    return fact', category: 'comprension' },
      { code: 'def facturacion(archivo):\n    fact = {}\n    with open(archivo) as f:\n        next(f)\n        for linea in f:\n            producto, unidades, precio = linea.strip().split(",")\n            fact[producto] = round(int(unidades) * float(precio), 2)\n    return fact', category: 'comprension' },
    ],
  },
};
