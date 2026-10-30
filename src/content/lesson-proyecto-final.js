// Lección 13.3 · Proyecto final: gestor de gastos. Contenido original. Integra todo el
// curso: clases, archivos CSV, excepciones, diccionarios, ordenar con key, f-strings
// y una estructura con main(). Cada actividad incluye en su código inicial las piezas
// anteriores, para que se puedan resolver por separado.

const TOPIC = 'Proyecto final';

const CLASE_GASTO = 'class Gasto:\n    def __init__(self, fecha, categoria, importe, concepto):\n        self.fecha = fecha\n        self.categoria = categoria\n        self.importe = importe\n        self.concepto = concepto\n\n    def __str__(self):\n        return f"{self.fecha} {self.categoria}: {self.importe:.2f} € ({self.concepto})"\n';

const DATOS = 'with open("gastos.csv", "w") as f:\n    f.write("fecha,categoria,importe,concepto\\n")\n    f.write("2026-10-02,comida,23.5,mercado\\n")\n    f.write("2026-10-05,ocio,12,cine\\n")\n    f.write("2026-10-09,comida,abc,error de tecleo\\n")\n    f.write("2026-11-01,transporte,40,abono\\n")\n    f.write("2026-11-03,comida,18.25,cena\\n")\n';

const GASTOS_EJEMPLO = 'gastos = [\n    Gasto("2026-10-02", "comida", 23.5, "mercado"),\n    Gasto("2026-10-05", "ocio", 12, "cine"),\n    Gasto("2026-11-01", "transporte", 40, "abono"),\n    Gasto("2026-11-03", "comida", 18.25, "cena"),\n]\n';

export const LESSON_PROYECTO_FINAL = {
  id: 'proyecto-final',
  moduleId: 'm13',
  code: '13.3',
  title: 'Proyecto final: gestor de gastos',
  minutes: 50,
  bonusXp: 60,
  objectives: [
    'Planificar un programa completo antes de escribirlo',
    'Modelar los datos con una clase',
    'Cargar datos de un archivo CSV tolerando líneas erróneas',
    'Resumir por categorías con un diccionario',
    'Presentar un informe ordenado con un gráfico de texto',
  ],
  prerequisites: ['Lección 13.2 «Estilo y buenas prácticas»'],
  teaser: 'Proyecto final: vas a construir un gestor de gastos personal que lee un archivo, lo resume y genera un informe. Todo lo que has aprendido, en un solo programa.',
  celebration: '¡Has completado LunaPy! Has pasado de print("Hola") a construir un programa completo con clases, archivos, excepciones y diccionarios. Ahora toca crear tus propios proyectos.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'El plan del proyecto', concepts: ['descomponer', 'diseno'],
      blocks: [
        { type: 'p', text: 'Queremos un programa que lea los gastos de un archivo, diga cuánto se ha gastado en cada categoría y lo muestre en un informe claro. Antes de escribir una línea, **diseñamos**:' },
        {
          type: 'five', items: {
            'Datos': 'Una clase `Gasto` con fecha, categoría, importe y concepto.',
            'Entrada': '`cargar(archivo)` → lista de Gasto, saltando las líneas con errores.',
            'Proceso': '`por_categoria(gastos)` → diccionario categoría → total.',
            'Salida': '`informe(totales)` → líneas ordenadas de más a menos, con barras de texto.',
            'Programa': '`main()` une las piezas.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Una pieza cada vez', text: 'Cada actividad de esta lección construye una pieza, y el código inicial trae ya las anteriores. Así puedes probar cada una por separado, como en el desarrollo incremental.' },
        {
          type: 'check', id: 'm13p-plan', concept: 'descomponer', mode: 'choice',
          question: '¿Por qué conviene una clase Gasto en lugar de tuplas (fecha, categoria, importe, concepto)?',
          options: [
            { text: 'Porque gasto.importe se entiende mejor que gasto[2] y se le puede añadir un __str__', correct: true },
            { text: 'Porque las tuplas no pueden guardar números', why: 'Sí pueden. La ventaja de la clase es la claridad: atributos con nombre y métodos propios.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'datos', title: 'Los datos y el archivo', concepts: ['clases', 'datos'],
      blocks: [
        { type: 'p', text: 'El archivo de gastos es un CSV. Fíjate en la cuarta fila: alguien escribió «abc» en el importe. El programa no debe romperse por eso.' },
        { type: 'code', run: true, code: DATOS + '\nwith open("gastos.csv") as f:\n    print(f.read())' },
        { type: 'p', text: 'Y así se ve un Gasto con su `__str__`:' },
        { type: 'code', run: true, code: CLASE_GASTO + '\nprint(Gasto("2026-10-02", "comida", 23.5, "mercado"))' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'piezas', title: 'Cómo encajan las piezas', concepts: ['composicion', 'estilo'],
      blocks: [
        { type: 'p', text: 'Cuando tengas las tres funciones, main() solo tiene que encadenarlas. Este es el aspecto final del programa (con las funciones resumidas):' },
        { type: 'code', title: 'Estructura final', code: 'def main():\n    gastos = cargar("gastos.csv")\n    totales = por_categoria(gastos)\n    informe(totales)\n\nif __name__ == "__main__":\n    main()' },
        {
          type: 'check', id: 'm13p-orden', concept: 'composicion', mode: 'choice',
          question: '¿En qué orden hay que llamar a las funciones dentro de main()?',
          options: [
            { text: 'cargar → por_categoria → informe', correct: true },
            { text: 'informe → cargar → por_categoria', why: 'El informe necesita los totales, y los totales necesitan los gastos cargados.' },
          ],
        },
        {
          type: 'more', summary: 'Ideas para seguir ampliándolo',
          items: [
            'Un resumen por mes: la clave sería `gasto.fecha[:7]` («2026-10»).',
            'Un presupuesto por categoría que avise cuando se supera.',
            'Pedir gastos nuevos con input (validando con try) y añadirlos al archivo con el modo "a".',
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'pf-gasto' },
    { id: 'a2', activity: 'pf-cargar' },
    { id: 'a3', activity: 'pf-resumen' },
    { id: 'a4', activity: 'pf-informe' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un programa mediano se diseña antes de escribirlo: datos, entrada, proceso y salida.',
    'Una clase da nombre a los datos (`gasto.importe`) y un `__str__` para mostrarlos.',
    'Al cargar archivos reales, captura los errores de cada línea para que una fila mala no rompa todo.',
    'Los diccionarios resumen por categorías; `sorted(..., key=..., reverse=True)` los ordena para el informe.',
    'main() encadena las piezas: cargar → resumir → informar.',
  ],
};

export const ACTIVITIES_PROYECTO_FINAL = {
  'pf-gasto': {
    id: 'pf-gasto', type: 'code', variant: 'complete', kindLabel: 'Proyecto · pieza 1', topic: TOPIC,
    title: 'La clase Gasto', difficulty: 2, xp: 20, concepts: ['clases'],
    statement: 'Completa la clase `Gasto`: guarda sus cuatro datos y define `__str__` para que un gasto se muestre como en el ejemplo.',
    expected: '2026-10-02 comida: 23.50 € (mercado)',
    starter: 'class Gasto:\n    def __init__(self, fecha, categoria, importe, concepto):\n        self.fecha = fecha\n        self.categoria = categoria\n        self.___ = importe\n        self.concepto = concepto\n\n    def ___(self):\n        return f"{self.fecha} {self.categoria}: {self.importe:___} € ({self.concepto})"\n\nprint(Gasto("2026-10-02", "comida", 23.5, "mercado"))',
    spec: {
      blanks: true,
      exact_lines: true,
      classes: [{ name: 'Gasto' }],
      cases: [
        { label: 'Programa completo', out_lines: ['2026-10-02 comida: 23.50 € (mercado)'] },
        { label: 'Importe entero', call: 'print(Gasto("2026-11-01", "transporte", 40, "abono"))', out_lines: ['2026-11-01 transporte: 40.00 € (abono)'] },
      ],
      logic_msg: 'Compara el texto con el ejemplo: el importe con 2 decimales exactos.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: el nombre del atributo del importe, el nombre del método que usa print y el formato de 2 decimales.' },
      { level: 'Razonamiento', text: 'Mira qué atributo usa el f-string. ¿Qué método especial decide lo que muestra print?' },
      { level: 'Pseudocódigo', text: 'self.importe ← importe\ndefinir __str__(self): devolver el texto con {self.importe:.2f}', pre: true },
      { level: 'Ayuda técnica', text: '`self.importe = importe`, `def __str__(self):` y `{self.importe:.2f}`.' },
    ],
    solution: {
      code: CLASE_GASTO + '\nprint(Gasto("2026-10-02", "comida", 23.5, "mercado"))',
      explanation: 'La clase da nombre a cada dato y __str__ fija cómo se presenta un gasto en cualquier parte del programa.',
    },
    reference: [CLASE_GASTO + '\nprint(Gasto("2026-10-02", "comida", 23.5, "mercado"))'],
    wrongs: [
      { code: 'class Gasto:\n    def __init__(self, fecha, categoria, importe, concepto):\n        self.fecha = fecha\n        self.categoria = categoria\n        self.___ = importe\n        self.concepto = concepto', category: 'incompleto' },
      { code: 'class Gasto:\n    def __init__(self, fecha, categoria, importe, concepto):\n        self.fecha = fecha\n        self.categoria = categoria\n        self.importe = importe\n        self.concepto = concepto\n\n    def __str__(self):\n        return f"{self.fecha} {self.categoria}: {self.importe} € ({self.concepto})"\n\nprint(Gasto("2026-10-02", "comida", 23.5, "mercado"))', category: 'logica' },
    ],
  },
  'pf-cargar': {
    id: 'pf-cargar', type: 'code', variant: 'build', kindLabel: 'Proyecto · pieza 2', topic: TOPIC,
    title: 'Cargar el archivo', difficulty: 3, xp: 35, concepts: ['archivos', 'excepciones', 'clases'],
    unlock: { any: ['pf-gasto'], count: 1, text: 'Completa la pieza 1: la clase Gasto' },
    statement: 'La clase `Gasto` ya está en el código inicial. Define `cargar(nombre_archivo)` que lea el CSV (cabecera `fecha,categoria,importe,concepto`) y devuelva una **lista de Gasto**, con el importe como `float`.\n\nSi el importe de una línea no es un número, **sáltala** sin detener el programa.',
    expected: '4 gastos cargados',
    starter: CLASE_GASTO + '\n\ndef cargar(nombre_archivo):\n    # leer, saltar la cabecera, crear un Gasto por línea válida\n    pass\n\n\n' + DATOS + '\ngastos = cargar("gastos.csv")\nprint(len(gastos), "gastos cargados")\n',
    plan: [
      {
        q: '¿Cómo saltas la línea con el importe «abc»?',
        options: [
          { text: 'Con try/except ValueError alrededor del float() de esa línea', correct: true },
          { text: 'Con un try alrededor de todo el bucle', why: 'Entonces el primer error detendría el bucle entero y perderías las líneas siguientes.' },
        ],
      },
      {
        q: '¿Qué se añade a la lista por cada línea válida?',
        options: [
          { text: 'Un objeto Gasto creado con los cuatro campos', correct: true },
          { text: 'La línea de texto tal cual', why: 'El resto del programa trabaja con objetos Gasto: créalos al cargar.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      classes: [{ name: 'Gasto' }],
      functions: [{ name: 'cargar', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['4 gastos cargados'] },
        { label: 'Contenido', call: DATOS + 'gs = cargar("gastos.csv")\nprint(gs[0])\nprint(type(gs[-1].importe).__name__, gs[-1].importe)', out_lines: ['2026-10-02 comida: 23.50 € (mercado)', 'float 18.25'] },
        { label: 'Solo cabecera', call: 'with open("vacio.csv", "w") as f:\n    f.write("fecha,categoria,importe,concepto\\n")\nprint(cargar("vacio.csv"))', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['5 gastos cargados'], title: 'La línea errónea se ha colado', msg: 'Convierte el importe con float() dentro de un try y, si da ValueError, salta esa línea.' },
      ],
      logic_msg: 'Del archivo de ejemplo deben cargarse 4 gastos: la línea con «abc» se salta.',
    },
    hints: [
      { level: 'Orientación', text: 'Abre, salta la cabecera, recorre las líneas, separa los campos y crea un Gasto por línea válida.' },
      { level: 'Razonamiento', text: 'El try va dentro del for, rodeando solo la conversión del importe. En el except, `continue`… o simplemente no añadas nada: crea el Gasto en un else.' },
      { level: 'Pseudocódigo', text: 'gastos ← []\nabrir el archivo; saltar cabecera\npara cada línea:\n    fecha, cat, imp, concepto ← separar por ","\n    intentar: importe ← float(imp)\n    si ValueError: saltar la línea\n    si no: añadir Gasto(fecha, cat, importe, concepto)\ndevolver gastos', pre: true },
      { level: 'Ayuda técnica', text: 'Estructura: `try: importe = float(imp)` / `except ValueError: pass` / `else: gastos.append(Gasto(fecha, cat, importe, concepto))`.' },
    ],
    solution: {
      code: CLASE_GASTO + '\n\ndef cargar(nombre_archivo):\n    """Devuelve la lista de Gasto del archivo, saltando las líneas con importe no válido."""\n    gastos = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            fecha, categoria, texto_importe, concepto = linea.strip().split(",")\n            try:\n                importe = float(texto_importe)\n            except ValueError:\n                continue\n            gastos.append(Gasto(fecha, categoria, importe, concepto))\n    return gastos\n\n\n' + DATOS + '\ngastos = cargar("gastos.csv")\nprint(len(gastos), "gastos cargados")',
      explanation: 'El try rodea solo lo que puede fallar (la conversión). `continue` salta a la siguiente vuelta del bucle sin añadir nada: una línea mala no estropea las demás.',
    },
    reference: [
      CLASE_GASTO + '\n\ndef cargar(nombre_archivo):\n    gastos = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            fecha, categoria, texto, concepto = linea.strip().split(",")\n            try:\n                importe = float(texto)\n            except ValueError:\n                pass\n            else:\n                gastos.append(Gasto(fecha, categoria, importe, concepto))\n    return gastos\n\n\n' + DATOS + 'gastos = cargar("gastos.csv")\nprint(len(gastos), "gastos cargados")',
    ],
    wrongs: [
      { code: CLASE_GASTO + '\n\ndef cargar(nombre_archivo):\n    gastos = []\n    with open(nombre_archivo) as f:\n        next(f)\n        for linea in f:\n            fecha, categoria, texto, concepto = linea.strip().split(",")\n            gastos.append(Gasto(fecha, categoria, float(texto), concepto))\n    return gastos\n\n\n' + DATOS + '\ngastos = cargar("gastos.csv")\nprint(len(gastos), "gastos cargados")', category: 'ejecucion' },
    ],
  },
  'pf-resumen': {
    id: 'pf-resumen', type: 'code', variant: 'build', kindLabel: 'Proyecto · pieza 3', topic: TOPIC,
    title: 'Totales por categoría', difficulty: 3, xp: 30, concepts: ['diccionarios', 'clases'],
    unlock: { any: ['pf-cargar'], count: 1, text: 'Completa la pieza 2: cargar el archivo' },
    statement: 'Con una lista de objetos `Gasto` (ya en el código inicial), define `por_categoria(gastos)` que devuelva un **diccionario** categoría → total gastado, con los totales **redondeados a 2 decimales**.',
    expected: "{'comida': 41.75, 'ocio': 12, 'transporte': 40}",
    starter: CLASE_GASTO + '\n\ndef por_categoria(gastos):\n    # diccionario categoría → total\n    pass\n\n\n' + GASTOS_EJEMPLO + '\nprint(por_categoria(gastos))\n',
    planScaffold: '',
    spec: {
      classes: [{ name: 'Gasto' }],
      functions: [{ name: 'por_categoria', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ["{'comida': 41.75, 'ocio': 12, 'transporte': 40}"] },
        { label: 'Decimales', call: 'gs = [Gasto("d", "a", 0.1, "x"), Gasto("d", "a", 0.2, "y")]\nprint(por_categoria(gs))', out_lines: ["{'a': 0.3}"] },
        { label: 'Lista vacía', call: 'print(por_categoria([]))', out_lines: ['{}'] },
      ],
      misconceptions: [
        { out_lines: ["{'comida': 18.25, 'ocio': 12, 'transporte': 40}"], title: 'Se pisa el total', msg: 'Para comida solo queda el último gasto. Suma al total anterior: `totales[c] = totales.get(c, 0) + gasto.importe`.' },
        { out_lines: ["{'a': 0.30000000000000004}"], title: 'Falta redondear', msg: 'Redondea cada total a 2 decimales al final.' },
      ],
      logic_msg: 'comida: 23.5 + 18.25 = 41.75; ocio: 12; transporte: 40.',
    },
    hints: [
      { level: 'Orientación', text: 'Es el patrón del diccionario que agrupa, leyendo los atributos de cada Gasto.' },
      { level: 'Razonamiento', text: 'Para cada gasto: la clave es gasto.categoria y se suma gasto.importe. Al final, redondea cada total.' },
      { level: 'Pseudocódigo', text: 'totales ← {}\npara cada gasto: totales[categoría] ← get(categoría, 0) + importe\npara cada categoría: redondear\ndevolver totales', pre: true },
      { level: 'Ayuda técnica', text: '`totales[gasto.categoria] = totales.get(gasto.categoria, 0) + gasto.importe` y después `for c in totales: totales[c] = round(totales[c], 2)`.' },
    ],
    solution: {
      code: CLASE_GASTO + '\n\ndef por_categoria(gastos):\n    """Devuelve un diccionario categoría → total gastado (2 decimales)."""\n    totales = {}\n    for gasto in gastos:\n        totales[gasto.categoria] = totales.get(gasto.categoria, 0) + gasto.importe\n    for categoria in totales:\n        totales[categoria] = round(totales[categoria], 2)\n    return totales\n\n\n' + GASTOS_EJEMPLO + '\nprint(por_categoria(gastos))',
      explanation: 'El mismo patrón de contar con un diccionario, pero sumando importes y leyendo los datos de objetos. El redondeo final evita totales como 0.30000000000000004.',
    },
    reference: [
      CLASE_GASTO + '\n\ndef por_categoria(gastos):\n    totales = {}\n    for g in gastos:\n        totales[g.categoria] = totales.get(g.categoria, 0) + g.importe\n    return {c: round(t, 2) for c, t in totales.items()}\n\n\n' + GASTOS_EJEMPLO + 'print(por_categoria(gastos))',
    ],
    wrongs: [
      { code: CLASE_GASTO + '\n\ndef por_categoria(gastos):\n    totales = {}\n    for gasto in gastos:\n        totales[gasto.categoria] = gasto.importe\n    return totales\n\n\n' + GASTOS_EJEMPLO + '\nprint(por_categoria(gastos))', category: 'comprension' },
    ],
  },
  'pf-informe': {
    id: 'pf-informe', type: 'code', variant: 'build', kindLabel: 'Proyecto · pieza 4', topic: TOPIC,
    title: 'El informe con barras', difficulty: 3, xp: 40, concepts: ['tuplas', 'cadenas', 'composicion'],
    unlock: { any: ['pf-resumen'], count: 1, text: 'Completa la pieza 3: totales por categoría' },
    statement: 'Define `informe(totales)`, que reciba el diccionario categoría → total y **muestre** una línea por categoría, **de mayor a menor gasto**, con este formato:\n\n`comida: #### 41.75 €`\n\nEl número de `#` es el total dividido entre 10, sin decimales (`int(total // 10)`). Al final, una línea `Total: X €` con la suma de todo (2 decimales).',
    expected: 'comida: #### 41.75 €\ntransporte: #### 40.00 €\nocio: # 12.00 €\nTotal: 93.75 €',
    starter: 'def informe(totales):\n    # ordenar de mayor a menor y mostrar las líneas\n    pass\n\n\ninforme({"comida": 41.75, "ocio": 12, "transporte": 40})\n',
    planScaffold: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'informe', params: 1 }],
      cases: [
        { label: 'Ejemplo', call: 'informe({"comida": 41.75, "ocio": 12, "transporte": 40})', out_lines: ['comida: #### 41.75 €', 'transporte: #### 40.00 €', 'ocio: # 12.00 €', 'Total: 93.75 €'] },
        { label: 'Menos de 10 €', call: 'informe({"café": 3.5})', out_lines: ['café:  3.50 €', 'Total: 3.50 €'] },
        { label: 'Vacío', call: 'informe({})', out_lines: ['Total: 0.00 €'] },
      ],
      misconceptions: [
        { out_lines: ['comida: #### 41.75 €', 'ocio: # 12.00 €', 'transporte: #### 40.00 €', 'Total: 93.75 €'], title: 'Sin ordenar', msg: 'Las categorías deben ir de mayor a menor gasto: ordena los items por el total con key y reverse=True.' },
        { out_lines: ['ocio: # 12.00 €', 'transporte: #### 40.00 €', 'comida: #### 41.75 €', 'Total: 93.75 €'], title: 'Orden al revés', msg: 'Se pide de mayor a menor: añade reverse=True.' },
      ],
      logic_msg: 'Compara línea a línea con el ejemplo: orden, número de #, decimales y la línea final.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres pasos: ordenar las parejas por total, mostrar cada línea y mostrar el total.' },
      { level: 'Razonamiento', text: 'sorted(totales.items(), key=…, reverse=True) da tuplas (categoría, total) de mayor a menor. Las barras: "#" * int(total // 10). El total: sum(totales.values()).' },
      { level: 'Pseudocódigo', text: 'para cada (categoría, total) ordenado por total, de mayor a menor:\n    mostrar f"{categoría}: {barras} {total:.2f} €"\nmostrar f"Total: {suma:.2f} €"', pre: true },
      { level: 'Ayuda técnica', text: 'Con `def segundo(par): return par[1]`, usa `sorted(totales.items(), key=segundo, reverse=True)`. La línea: `print(f"{categoria}: {\'#\' * int(total // 10)} {total:.2f} €")`.' },
    ],
    solution: {
      code: 'def segundo(par):\n    return par[1]\n\n\ndef informe(totales):\n    """Muestra los totales de mayor a menor con una barra de # cada 10 €."""\n    for categoria, total in sorted(totales.items(), key=segundo, reverse=True):\n        barras = "#" * int(total // 10)\n        print(f"{categoria}: {barras} {total:.2f} €")\n    print(f"Total: {sum(totales.values()):.2f} €")\n\n\ninforme({"comida": 41.75, "ocio": 12, "transporte": 40})',
      explanation: 'Ordenar por el segundo elemento de cada pareja pone primero las categorías más caras. La repetición de cadenas dibuja las barras y las f-strings fijan los 2 decimales. Con esta pieza, el gestor de gastos está completo.',
    },
    reference: [
      'def segundo(par):\n    return par[1]\n\ndef informe(totales):\n    for categoria, total in sorted(totales.items(), key=segundo, reverse=True):\n        print(f"{categoria}: {\'#\' * int(total // 10)} {total:.2f} €")\n    print(f"Total: {sum(totales.values()):.2f} €")',
    ],
    wrongs: [
      { code: 'def informe(totales):\n    for categoria, total in totales.items():\n        print(f"{categoria}: {\'#\' * int(total // 10)} {total:.2f} €")\n    print(f"Total: {sum(totales.values()):.2f} €")', category: 'comprension' },
      { code: 'def segundo(par):\n    return par[1]\n\ndef informe(totales):\n    for categoria, total in sorted(totales.items(), key=segundo, reverse=True):\n        print(f"{categoria}: {\'#\' * int(total // 10)} {total} €")\n    print(f"Total: {sum(totales.values())} €")', category: 'logica' },
    ],
  },
};
