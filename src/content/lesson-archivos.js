// Lección 11.1 · Leer y escribir archivos. Contenido original, alineado con el cap. 13
// de «Piensa en Python» (persistencia, leer y escribir, nombres de archivo) y PE2
// módulo 4. En LunaPy los archivos viven en un disco virtual del navegador: cada
// ejemplo crea los archivos que necesita.

const TOPIC = 'Archivos';

export const LESSON_ARCHIVOS = {
  id: 'archivos',
  moduleId: 'm11',
  code: '11.1',
  title: 'Leer y escribir archivos',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explicar por qué los programas guardan datos en archivos',
    'Escribir texto en un archivo con open, write y with',
    'Leer un archivo entero o línea a línea',
    'Quitar el salto de línea final con strip',
    'Elegir el modo adecuado: "r", "w" o "a"',
  ],
  prerequisites: ['Módulo 10 «Diccionarios y tuplas»'],
  teaser: 'Empiezas el Módulo 11: hasta ahora, al terminar el programa, todo se olvidaba. Con los archivos, tus datos sobreviven.',
  celebration: 'Ya sabes guardar y recuperar datos con archivos: el primer paso para programas que recuerdan.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'por-que', title: 'Datos que sobreviven', concepts: ['archivos'],
      blocks: [
        { type: 'p', text: 'Las variables viven en la memoria y desaparecen al terminar el programa. Un **archivo** guarda datos en el disco: otro programa (o el mismo, mañana) puede leerlos. A esto se le llama **persistencia**.' },
        { type: 'callout', tone: 'info', title: 'Los archivos en LunaPy', text: 'LunaPy ejecuta Python dentro del navegador, con un disco virtual propio. Los archivos que crees duran mientras la página esté abierta; al recargarla, desaparecen. Por eso cada ejemplo crea primero los archivos que va a leer.' },
        {
          type: 'check', id: 'm11a-persistencia', concept: 'archivos', mode: 'choice',
          question: '¿Qué pasa con el valor de una variable cuando el programa termina?',
          options: [
            { text: 'Se pierde: para conservarlo hay que guardarlo, por ejemplo en un archivo', correct: true },
            { text: 'Se queda guardado para la próxima vez', why: 'Las variables viven en la memoria del programa: al terminar, se liberan.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'escribir', title: 'Escribir en un archivo', concepts: ['archivos'],
      blocks: [
        { type: 'p', text: '`open(nombre, "w")` abre un archivo para **escribir** (si existe, lo vacía). Con `with`, el archivo se **cierra solo** al terminar el bloque, aunque haya un error.' },
        { type: 'code', run: true, code: 'with open("saludo.txt", "w") as f:\n    f.write("Hola\\n")\n    f.write("desde LunaPy\\n")\n\nwith open("saludo.txt") as f:\n    print(f.read())' },
        { type: 'callout', tone: 'warn', title: 'write no añade saltos de línea', text: 'A diferencia de print, `write` escribe exactamente lo que le das. Si quieres una línea por dato, añade `"\\n"` al final de cada uno.' },
        {
          type: 'check', id: 'm11a-salto', concept: 'archivos', mode: 'choice',
          question: '¿Qué contiene el archivo?', code: 'with open("a.txt", "w") as f:\n    f.write("uno")\n    f.write("dos")\n\nwith open("a.txt") as f:\n    print(f.read())', expectOutput: 'unodos',
          options: [
            { text: 'unodos, en una sola línea', correct: true },
            { text: 'uno y dos en dos líneas', why: 'write no añade "\\n": hay que escribirlo tú.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'leer', title: 'Leer un archivo', concepts: ['archivos', 'bucles'],
      blocks: [
        { type: 'p', text: 'Sin segundo argumento, `open` abre para **leer**. Puedes leerlo entero con `read()` o, más habitual, recorrerlo **línea a línea** con for:' },
        { type: 'code', run: true, code: 'with open("compra.txt", "w") as f:\n    f.write("pan\\nleche\\nhuevos\\n")\n\nwith open("compra.txt") as f:\n    for linea in f:\n        print(repr(linea))      # repr muestra el \\n\n\nwith open("compra.txt") as f:\n    for linea in f:\n        print("-", linea.strip())' },
        { type: 'callout', tone: 'tip', title: 'strip() al leer', text: 'Cada línea leída termina en `"\\n"`. Casi siempre conviene quitarlo con `strip()` antes de compararla o convertirla.' },
        {
          type: 'check', id: 'm11a-strip', concept: 'archivos', mode: 'text',
          question: 'Predice:', code: 'with open("n.txt", "w") as f:\n    f.write("Ana\\nLuis\\n")\n\ncuenta = 0\nwith open("n.txt") as f:\n    for linea in f:\n        if linea == "Ana":\n            cuenta += 1\nprint(cuenta)', answer: '0',
          explain: 'La línea leída es "Ana\\n", no "Ana": la comparación falla. Con `linea.strip() == "Ana"` daría 1.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modos', title: 'Modos y errores', concepts: ['archivos', 'errores'],
      blocks: [
        {
          type: 'five', items: {
            '"r" (por defecto)': 'Leer. Error si el archivo no existe.',
            '"w"': 'Escribir desde cero. **Borra** el contenido anterior.',
            '"a"': 'Añadir al final, conservando lo que había.',
          },
        },
        { type: 'code', run: true, code: 'with open("diario.txt", "w") as f:\n    f.write("lunes\\n")\nwith open("diario.txt", "a") as f:\n    f.write("martes\\n")\nwith open("diario.txt") as f:\n    print(f.read())\n\nopen("no_existe.txt")' },
        {
          type: 'check', id: 'm11a-modo', concept: 'archivos', mode: 'choice',
          question: 'Quieres apuntar cada día una línea nueva en un diario sin perder las anteriores. ¿Qué modo usas?',
          options: [
            { text: '"a"', correct: true },
            { text: '"w"', why: '"w" vacía el archivo cada vez que lo abres: perderías lo escrito antes.' },
            { text: '"r"', why: '"r" solo sirve para leer.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'arc-predict' },
    { id: 'a2', activity: 'arc-complete' },
    { id: 'a3', activity: 'arc-fix' },
    { id: 'a4', activity: 'arc-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Los archivos guardan datos más allá de la ejecución del programa (persistencia).',
    '`with open(nombre, modo) as f:` abre el archivo y lo cierra solo al terminar el bloque.',
    'Escribir: `f.write(texto)`, sin salto de línea automático: añade `"\\n"`.',
    'Leer: `f.read()` entero o `for linea in f:` línea a línea; quita el `"\\n"` con `strip()`.',
    'Modos: `"r"` leer, `"w"` escribir desde cero, `"a"` añadir al final.',
  ],
};

export const ACTIVITIES_ARCHIVOS = {
  'arc-predict': {
    id: 'arc-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Escribir y añadir', difficulty: 2, xp: 10, concepts: ['archivos'],
    prompt: 'Se escribe, se vuelve a escribir y se añade. **¿Qué mostrará?**',
    code: 'with open("lista.txt", "w") as f:\n    f.write("a\\nb\\n")\nwith open("lista.txt", "w") as f:\n    f.write("c\\n")\nwith open("lista.txt", "a") as f:\n    f.write("d\\n")\nwith open("lista.txt") as f:\n    print(f.read().split())',
    expectedOutput: "['c', 'd']",
    options: [
      { text: "['c', 'd']", correct: true },
      { text: "['a', 'b', 'c', 'd']", concept: 'archivos', why: 'El segundo open con "w" vacía el archivo: a y b se pierden.' },
      { text: "['c']", concept: 'archivos', why: 'El modo "a" añade al final: d se suma a c.' },
      { text: "['d']", concept: 'archivos', why: '"a" conserva lo que había (c) y añade d.' },
    ],
    explain: ['Primer "w": a, b.', 'Segundo "w": borra y escribe c.', '"a": añade d.', 'Resultado: c y d.'],
  },
  'arc-complete': {
    id: 'arc-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Guardar las tareas', difficulty: 2, xp: 15, concepts: ['archivos', 'bucles'],
    statement: 'Completa `guardar(tareas, nombre)` para que escriba cada tarea de la lista en el archivo, **una por línea**.',
    expected: '3 tareas guardadas',
    starter: 'def guardar(tareas, nombre):\n    with open(nombre, ___) as f:\n        for tarea in tareas:\n            f.write(tarea + ___)\n\nguardar(["estudiar", "comprar", "correr"], "tareas.txt")\nwith open("tareas.txt") as f:\n    print(len(f.readlines()), "tareas guardadas")',
    spec: {
      blanks: true,
      functions: [{ name: 'guardar', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['3 tareas guardadas'] },
        { label: 'Contenido exacto', call: 'guardar(["x", "y"], "t2.txt")\nwith open("t2.txt") as f:\n    print(repr(f.read()))', out_lines: ["'x\\ny\\n'"] },
        { label: 'Guardar dos veces no acumula', call: 'guardar(["a"], "t3.txt")\nguardar(["b"], "t3.txt")\nwith open("t3.txt") as f:\n    print(repr(f.read()))', out_lines: ["'b\\n'"] },
      ],
      misconceptions: [
        { out_lines: ['1 tareas guardadas'], title: 'Todo en una línea', msg: 'write no añade saltos de línea: escribe `tarea + "\\n"`.' },
        { out_lines: ["'a\\nb\\n'"], title: 'Se acumula', msg: 'Con "a" cada llamada añade al final. Para guardar la lista desde cero, usa "w".' },
      ],
      logic_msg: 'Cada tarea debe ir en su propia línea.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos huecos: el modo de apertura y lo que va detrás de cada tarea.' },
      { level: 'Razonamiento', text: 'Quieres escribir el archivo desde cero. ¿Qué modo es? Y para que cada tarea vaya en su línea, ¿qué carácter hay que añadir?' },
      { level: 'Pseudocódigo', text: 'abrir nombre para escribir:\n    para cada tarea: escribir tarea + salto de línea', pre: true },
      { level: 'Ayuda técnica', text: '`open(nombre, "w")` y `f.write(tarea + "\\n")`.' },
    ],
    solution: {
      code: 'def guardar(tareas, nombre):\n    with open(nombre, "w") as f:\n        for tarea in tareas:\n            f.write(tarea + "\\n")\n\nguardar(["estudiar", "comprar", "correr"], "tareas.txt")\nwith open("tareas.txt") as f:\n    print(len(f.readlines()), "tareas guardadas")',
      explanation: '"w" escribe desde cero y el "\\n" separa las tareas en líneas. readlines() devuelve una lista con una línea por elemento.',
    },
    reference: ['def guardar(tareas, nombre):\n    with open(nombre, "w") as f:\n        for tarea in tareas:\n            f.write(tarea + "\\n")\n\nguardar(["estudiar", "comprar", "correr"], "tareas.txt")\nwith open("tareas.txt") as f:\n    print(len(f.readlines()), "tareas guardadas")'],
    wrongs: [
      { code: 'def guardar(tareas, nombre):\n    with open(nombre, ___) as f:\n        for tarea in tareas:\n            f.write(tarea + ___)', category: 'incompleto' },
      { code: 'def guardar(tareas, nombre):\n    with open(nombre, "w") as f:\n        for tarea in tareas:\n            f.write(tarea + "")\n\nguardar(["estudiar", "comprar", "correr"], "tareas.txt")\nwith open("tareas.txt") as f:\n    print(len(f.readlines()), "tareas guardadas")', category: 'comprension' },
    ],
  },
  'arc-fix': {
    id: 'arc-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La lista de invitados', difficulty: 2, xp: 20, concepts: ['archivos', 'cadenas'],
    statement: '`esta_invitada(nombre, archivo)` debería decir si un nombre aparece en el archivo (uno por línea), pero responde siempre False. Corrígelo.',
    expected: 'True\nFalse',
    starter: 'def esta_invitada(nombre, archivo):\n    with open(archivo) as f:\n        for linea in f:\n            if linea == nombre:\n                return True\n    return False\n\nwith open("invitados.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(esta_invitada("Luis", "invitados.txt"))\nprint(esta_invitada("Leo", "invitados.txt"))',
    spec: {
      functions: [{ name: 'esta_invitada', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True', 'False'] },
        { label: 'Última línea', call: 'with open("inv2.txt", "w") as f:\n    f.write("Sol\\nMar\\n")\nprint(esta_invitada("Mar", "inv2.txt"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['False', 'False'], title: 'El salto de línea', msg: 'Cada línea leída termina en "\\n": "Luis\\n" no es igual a "Luis". Compara `linea.strip() == nombre`.' },
      ],
      logic_msg: 'Comprueba con "Luis": está en el archivo, así que debe dar True.',
    },
    hints: [
      { level: 'Orientación', text: 'Muestra `repr(linea)` dentro del bucle para ver exactamente qué contiene cada línea.' },
      { level: 'Razonamiento', text: 'Las líneas leídas terminan en "\\n". ¿Qué método lo quita?' },
      { level: 'Pseudocódigo', text: 'si la línea sin espacios ni salto es igual al nombre: devolver True', pre: true },
      { level: 'Ayuda técnica', text: '`if linea.strip() == nombre:`.' },
    ],
    solution: {
      code: 'def esta_invitada(nombre, archivo):\n    with open(archivo) as f:\n        for linea in f:\n            if linea.strip() == nombre:\n                return True\n    return False\n\nwith open("invitados.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(esta_invitada("Luis", "invitados.txt"))\nprint(esta_invitada("Leo", "invitados.txt"))',
      explanation: 'Al leer línea a línea, cada línea conserva su "\\n" final. strip() lo quita (junto con espacios sobrantes) antes de comparar.',
    },
    reference: ['def esta_invitada(nombre, archivo):\n    with open(archivo) as f:\n        for linea in f:\n            if linea.strip() == nombre:\n                return True\n    return False\n\nwith open("invitados.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(esta_invitada("Luis", "invitados.txt"))\nprint(esta_invitada("Leo", "invitados.txt"))'],
    wrongs: [
      { code: 'def esta_invitada(nombre, archivo):\n    with open(archivo) as f:\n        for linea in f:\n            if linea == nombre:\n                return True\n    return False\n\nwith open("invitados.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(esta_invitada("Luis", "invitados.txt"))\nprint(esta_invitada("Leo", "invitados.txt"))', category: 'comprension' },
    ],
  },
  'arc-build': {
    id: 'arc-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La media del archivo', difficulty: 3, xp: 30, concepts: ['archivos', 'bucles'],
    unlock: { any: ['arc-predict', 'arc-complete', 'arc-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Un archivo tiene una nota por línea (puede haber líneas vacías, que hay que **ignorar**). Define `media_archivo(nombre)` que devuelva la media de las notas redondeada a 2 decimales.\n\nPara probarla, crea antes un archivo con algunas notas.',
    expected: '7.17',
    plan: [
      {
        q: '¿Qué haces con cada línea antes de sumarla?',
        options: [
          { text: 'strip() y, si no queda vacía, convertirla con float()', correct: true },
          { text: 'Sumarla directamente', why: 'Es un texto ("7.5\\n"): primero hay que limpiarla y convertirla.' },
        ],
      },
      {
        q: '¿Entre qué divides la suma?',
        options: [
          { text: 'Entre el número de notas que has sumado', correct: true },
          { text: 'Entre el número de líneas del archivo', why: 'Las líneas vacías no son notas: no deben contar.' },
        ],
      },
    ],
    planScaffold: 'def media_archivo(nombre):\n    # sumar y contar las notas (saltando líneas vacías)\n\n\nwith open("notas.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(media_archivo("notas.txt"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'media_archivo', params: 1 }],
      cases: [
        { label: '6, 8.5 y 7 (con una línea vacía)', call: 'with open("m1.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(media_archivo("m1.txt"))', out_lines: ['7.17'] },
        { label: 'Una nota', call: 'with open("m2.txt", "w") as f:\n    f.write("10\\n")\nprint(media_archivo("m2.txt"))', out_lines: ['10.0'] },
        { label: 'Espacios alrededor', call: 'with open("m3.txt", "w") as f:\n    f.write("  4 \\n6\\n")\nprint(media_archivo("m3.txt"))', out_lines: ['5.0'] },
      ],
      misconceptions: [
        { out_lines: ['5.38'], title: 'Cuentas las líneas vacías', msg: 'Divides entre todas las líneas, también la vacía. Cuenta solo las notas que sumas.' },
      ],
      logic_msg: 'Comprueba con 6, 8.5 y 7: (6 + 8.5 + 7) / 3 = 7.17.',
    },
    hints: [
      { level: 'Orientación', text: 'Un acumulador para la suma, un contador para las notas y un for sobre las líneas.' },
      { level: 'Razonamiento', text: 'Para cada línea: strip(). Si el resultado está vacío, sáltala; si no, conviértela con float, súmala y cuéntala.' },
      { level: 'Pseudocódigo', text: 'suma ← 0; cuenta ← 0\npara cada línea del archivo:\n    texto ← línea sin espacios\n    si texto no está vacío: suma += float(texto); cuenta += 1\ndevolver redondear(suma / cuenta, 2)', pre: true },
      { level: 'Ayuda técnica', text: '`texto = linea.strip()` y `if texto != "":` (o simplemente `if texto:`).' },
    ],
    solution: {
      code: 'def media_archivo(nombre):\n    """Devuelve la media de las notas del archivo (una por línea)."""\n    suma = 0\n    cuenta = 0\n    with open(nombre) as f:\n        for linea in f:\n            texto = linea.strip()\n            if texto:\n                suma += float(texto)\n                cuenta += 1\n    return round(suma / cuenta, 2)\n\nwith open("notas.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(media_archivo("notas.txt"))',
      explanation: 'Cada línea se limpia con strip(); las vacías se saltan. Solo se cuentan las notas de verdad, así que la media no se ve afectada por las líneas en blanco.',
    },
    reference: [
      'def media_archivo(nombre):\n    notas = []\n    with open(nombre) as f:\n        for linea in f:\n            if linea.strip():\n                notas.append(float(linea))\n    return round(sum(notas) / len(notas), 2)',
    ],
    wrongs: [
      { code: 'def media_archivo(nombre):\n    suma = 0\n    lineas = 0\n    with open(nombre) as f:\n        for linea in f:\n            lineas += 1\n            if linea.strip():\n                suma += float(linea)\n    return round(suma / lineas, 2)', category: 'comprension' },
      { code: 'def media_archivo(nombre):\n    suma = 0\n    cuenta = 0\n    with open(nombre) as f:\n        for linea in f:\n            suma += float(linea)\n            cuenta += 1\n    return round(suma / cuenta, 2)', category: 'ejecucion' },
    ],
  },
};
