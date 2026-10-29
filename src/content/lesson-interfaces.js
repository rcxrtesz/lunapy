// Lección 4.2 · Diseño de interfaces. Contenido original, alineado con el cap. 4 de
// «Piensa en Python» (diseño de interfaces, docstrings) y PE1 módulo 4 (argumentos
// por palabra clave y valores por defecto).

const TOPIC = 'Diseño de funciones';

export const LESSON_INTERFACES = {
  id: 'interfaces',
  moduleId: 'm4',
  code: '4.2',
  title: 'Diseño de interfaces',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Explicar qué es la interfaz de una función y por qué importa',
    'Dar valores por defecto a los parámetros',
    'Llamar a funciones con argumentos por nombre',
    'Preferir devolver a mostrar para que la función sea reutilizable',
    'Documentar una función con un docstring',
  ],
  prerequisites: ['Lección 4.1 «Encapsulación y generalización»'],
  teaser: 'Una función bien diseñada se entiende con solo ver su cabecera. Hoy aprendes a diseñar esa «cara visible».',
  celebration: 'Ya diseñas funciones cómodas de usar: con valores por defecto, argumentos por nombre, return y documentación.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'interfaz', title: 'La interfaz: lo que ve quien usa la función', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'La **interfaz** de una función es lo que necesitas saber para usarla sin mirar por dentro: su **nombre**, qué **parámetros** recibe y qué **devuelve**. Es un contrato: «dame esto y te devuelvo aquello».' },
        { type: 'p', text: 'Compara dos versiones de la misma idea:' },
        { type: 'code', title: 'Interfaz pobre', code: 'def area():\n    base = float(input("Base: "))\n    altura = float(input("Altura: "))\n    print(base * altura)' },
        { type: 'code', run: true, title: 'Interfaz clara', code: 'def area(base, altura):\n    return base * altura\n\nprint(area(3, 4))\nprint(area(2, 5) + area(1, 1))' },
        { type: 'callout', tone: 'tip', title: 'Los datos entran y salen por la interfaz', text: 'La primera solo sirve si una persona escribe los datos y solo muestra el resultado. La segunda sirve en cualquier contexto: con datos de input, de un cálculo o de otra función, y su resultado se puede reutilizar.' },
        {
          type: 'check', id: 'm4i-interfaz', concept: 'diseno', mode: 'choice',
          question: 'Necesitas sumar las áreas de tres habitaciones. ¿Qué versión te sirve?',
          options: [
            { text: 'area(base, altura) con return', correct: true },
            { text: 'area() con input y print', why: 'Pediría los datos por teclado cada vez y solo mostraría los resultados: no podrías sumarlos.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'defecto', title: 'Valores por defecto', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'Un parámetro puede tener un **valor por defecto**: se usa cuando la llamada no da ese argumento. Así el caso habitual es corto y el especial sigue siendo posible.' },
        { type: 'code', run: true, code: 'def saludar(nombre, saludo="Hola"):\n    print(f"{saludo}, {nombre}")\n\nsaludar("Ana")\nsaludar("Ana", "Buenas noches")' },
        { type: 'callout', tone: 'warn', title: 'Los parámetros con valor por defecto van al final', text: '`def saludar(saludo="Hola", nombre):` es un SyntaxError: Python no sabría a qué parámetro asignar un único argumento.' },
        {
          type: 'check', id: 'm4i-defecto', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'def precio(base, iva=21):\n    return base + base * iva // 100\n\nprint(precio(200), precio(200, 10))', answer: '242 220',
          explain: 'Sin segundo argumento, iva vale 21: 200 + 42 = 242. Con 10: 200 + 20 = 220.',
        },
        {
          type: 'check', id: 'm4i-orden-defecto', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'def saludar(saludo="Hola", nombre):\n    print(saludo, nombre)', expectError: 'SyntaxError',
          options: [
            { text: 'SyntaxError: el parámetro sin valor por defecto va después', correct: true },
            { text: 'Nada: la función se define sin problemas', why: 'Los parámetros con valor por defecto tienen que ir después de los que no lo tienen.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nombrados', title: 'Argumentos por nombre', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'Puedes indicar a qué parámetro va cada argumento escribiendo su **nombre**. Así el orden da igual y la llamada se lee mejor. ¡Ya lo usabas con `print(..., sep="-")`!' },
        { type: 'code', run: true, code: 'def rectangulo(ancho, alto, simbolo="#"):\n    print(((simbolo * ancho) + "\\n") * alto, end="")\n\nrectangulo(4, 2)\nrectangulo(alto=1, ancho=6, simbolo="*")\nrectangulo(3, 2, simbolo="o")' },
        { type: 'callout', tone: 'info', title: 'Primero por posición, después por nombre', text: 'Puedes mezclar ambos, pero los argumentos por posición van primero: `rectangulo(3, 2, simbolo="o")` sí; `rectangulo(simbolo="o", 3, 2)` no.' },
        {
          type: 'check', id: 'm4i-nombre', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'def resta(a, b):\n    return a - b\n\nprint(resta(b=10, a=3))', answer: '-7',
          explain: 'Con nombres, el orden de escritura no importa: a = 3 y b = 10, así que 3 − 10 = −7.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Devolver da más juego que mostrar', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'Una función que **devuelve** un texto en lugar de mostrarlo es más flexible: puedes mostrarlo, unirlo con otros o guardarlo.' },
        { type: 'code', run: true, code: 'def linea(n, simbolo="-"):\n    return simbolo * n\n\nprint(linea(10))\ntitulo = linea(3, "=") + " Menú " + linea(3, "=")\nprint(titulo)\nprint(len(linea(7)))' },
        {
          type: 'check', id: 'm4i-devolver', concept: 'diseno', mode: 'text',
          question: 'Predice:', code: 'def eco(texto, veces=2):\n    return texto * veces\n\nprint(eco("bo") + eco("!", 3))', answer: 'bobo!!!',
          explain: '`eco("bo")` devuelve "bobo" (veces = 2 por defecto) y `eco("!", 3)` devuelve "!!!".',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'docstring', title: 'Documentar con docstrings', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'Un **docstring** es un texto entre triples comillas justo debajo del `def`. Explica qué hace la función, qué recibe y qué devuelve. Python lo guarda en `__doc__`, y los editores lo muestran al escribir el nombre de la función:' },
        { type: 'code', run: true, code: 'def area(base, altura):\n    """Devuelve el área de un rectángulo de base y altura dadas."""\n    return base * altura\n\nprint(area.__doc__)' },
        { type: 'callout', tone: 'tip', title: 'Un buen docstring', text: 'Empieza con un verbo y dice el **qué**, no el cómo: «Devuelve el precio con IVA del precio dado». Si un parámetro tiene una unidad o una condición (en euros, mayor que 0…), dilo.' },
        {
          type: 'check', id: 'm4i-docstring', concept: 'diseno', mode: 'choice',
          question: '¿Cuál es el mejor docstring para `def iva(precio):` que devuelve `precio * 0.21`?',
          options: [
            { text: '"""Devuelve el IVA (21 %) del precio dado, en euros."""', correct: true },
            { text: '"""Multiplica precio por 0.21."""', why: 'Cuenta el **cómo**, que ya se ve en el código. Mejor explicar qué significa el resultado.' },
            { text: '"""Función iva."""', why: 'No aporta nada que no diga ya el nombre.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'int-predict' },
    { id: 'a2', activity: 'int-complete' },
    { id: 'a3', activity: 'int-fix' },
    { id: 'a4', activity: 'int-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'La **interfaz** de una función es su nombre, sus parámetros y lo que devuelve: lo necesario para usarla sin mirar dentro.',
    'Los datos deberían entrar por parámetros y salir con `return`, no con `input` y `print` dentro.',
    'Los **valores por defecto** (`simbolo="-"`) hacen corto el caso habitual; van al final.',
    'Los **argumentos por nombre** (`simbolo="*"`) permiten cualquier orden y se leen mejor; van después de los de posición.',
    'Un **docstring** explica qué hace la función; se guarda en `__doc__`.',
  ],
};

export const ACTIVITIES_INTERFACES = {
  'int-predict': {
    id: 'int-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Potencias a la carta', difficulty: 2, xp: 10, concepts: ['parametros', 'diseno'],
    prompt: 'Valores por defecto y argumentos por nombre en la misma línea. **¿Qué mostrará?**',
    code: 'def potencia(base, exponente=2):\n    return base ** exponente\n\nprint(potencia(3), potencia(2, 5), potencia(exponente=3, base=2))',
    expectedOutput: '9 32 8',
    options: [
      { text: '9 32 8', correct: true },
      { text: '3 32 8', concept: 'parametros', why: 'Sin segundo argumento, `exponente` toma su valor por defecto, 2: 3 ** 2 = 9.' },
      { text: '9 32 9', concept: 'parametros', why: 'Con nombres, cada valor va a su parámetro aunque el orden cambie: base = 2 y exponente = 3, así que 8.' },
      { text: 'Un error en la tercera llamada', concept: 'parametros', why: 'Los argumentos por nombre pueden escribirse en cualquier orden.' },
    ],
    explain: ['`potencia(3)`: exponente = 2 por defecto → 9.', '`potencia(2, 5)` → 32.', '`potencia(exponente=3, base=2)` → 2 ** 3 = 8.'],
  },
  'int-complete': {
    id: 'int-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Línea con valor por defecto', difficulty: 2, xp: 15, concepts: ['parametros', 'diseno'],
    statement: 'Completa los huecos: el símbolo de `linea` debe ser `"-"` **por defecto**, y la segunda llamada debe pedir una línea de asteriscos.',
    expected: '-----\n***',
    starter: 'def linea(n, simbolo___):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, ___))',
    spec: {
      blanks: true,
      functions: [{ name: 'linea', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['-----', '***'] },
        { label: 'print(linea(4))', call: 'print(linea(4))', out_lines: ['----'] },
        { label: 'print(linea(2, "="))', call: 'print(linea(2, "="))', out_lines: ['=='] },
      ],
      logic_msg: 'Revisa los huecos: el primero da a simbolo su valor por defecto; el segundo es el símbolo de la segunda línea.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer hueco va justo detrás de `simbolo`, en la cabecera. El segundo es un argumento de la llamada.' },
      { level: 'Razonamiento', text: 'Un valor por defecto se escribe con `=` en la cabecera. ¿Qué texto quieres que use si no se indica ninguno?' },
      { level: 'Pseudocódigo', text: 'cabecera: linea(n, simbolo que por defecto vale "-")\nsegunda llamada: linea(3, el texto "*")', pre: true },
      { level: 'Ayuda técnica', text: '`def linea(n, simbolo="-"):` y `linea(3, "*")` (o `linea(3, simbolo="*")`).' },
    ],
    solution: {
      code: 'def linea(n, simbolo="-"):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, "*"))',
      explanation: 'Con `simbolo="-"`, `linea(5)` usa el guion sin tener que indicarlo; `linea(3, "*")` lo sustituye por un asterisco.',
    },
    reference: [
      'def linea(n, simbolo="-"):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, "*"))',
      "def linea(n, simbolo='-'):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, simbolo='*'))",
    ],
    wrongs: [
      { code: 'def linea(n, simbolo___):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, ___))', category: 'incompleto' },
      { code: 'def linea(n, simbolo):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, "*"))', category: 'ejecucion' },
      { code: 'def linea(n, simbolo="-"):\n    return simbolo * n\n\nprint(linea(5))\nprint(linea(3, *))', category: 'sintaxis' },
    ],
  },
  'int-fix': {
    id: 'int-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La función que no se deja usar', difficulty: 3, xp: 25, concepts: ['diseno', 'parametros', 'errores'],
    statement: 'El programa principal quiere sumar el área de dos rectángulos, pero la función tiene una **interfaz mal diseñada**: pide los datos con input y muestra en lugar de devolver. **Rediseña la función** (sin cambiar el programa principal) para que funcione.',
    expected: 'Total: 22',
    starter: 'def area_rectangulo():\n    base = float(input("Base: "))\n    altura = float(input("Altura: "))\n    print(base * altura)\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)',
    spec: {
      cases: [
        { label: 'Programa completo', out_lines: ['Total: 22'] },
        { label: 'print(area_rectangulo(2.5, 2))', call: 'print(area_rectangulo(2.5, 2))', out_lines: ['5.0'] },
      ],
      misconceptions: [
        { out_lines: ['12', '10', 'Total: 22'], title: 'Sobra un print', msg: 'La función ya devuelve el área, pero además la muestra. Quita el `print` de la función: mostrar es cosa del programa principal.' },
      ],
      rules: [{ type: 'must_call', name: 'area_rectangulo', title: 'Usa la función', msg: 'El programa principal debe seguir llamando a area_rectangulo.' }],
      logic_msg: 'La salida no coincide. ¿Devuelve la función base × altura?',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta y lee el error: la función no acepta argumentos, pero el programa le pasa dos.' },
      { level: 'Razonamiento', text: 'Los datos deben **entrar** por parámetros (no por input) y el resultado **salir** con return (no con print). Cambia la cabecera y el cuerpo.' },
      { level: 'Pseudocódigo', text: 'definir area_rectangulo(base, altura):\n    devolver base × altura', pre: true },
      { level: 'Ayuda técnica', text: '`def area_rectangulo(base, altura):` y en el cuerpo solo `return base * altura`.' },
    ],
    solution: {
      code: 'def area_rectangulo(base, altura):\n    return base * altura\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)',
      explanation: 'Con parámetros y return, la función recibe los datos del programa y le devuelve el área, que se puede sumar. Es la misma idea, con una interfaz que sirve para cualquier uso.',
    },
    reference: ['def area_rectangulo(base, altura):\n    return base * altura\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)'],
    wrongs: [
      { code: 'def area_rectangulo():\n    base = float(input("Base: "))\n    altura = float(input("Altura: "))\n    print(base * altura)\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)', category: 'ejecucion' },
      { code: 'def area_rectangulo(base, altura):\n    print(base * altura)\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)', category: 'ejecucion' },
      { code: 'def area_rectangulo(base, altura):\n    print(base * altura)\n    return base * altura\n\ntotal = area_rectangulo(3, 4) + area_rectangulo(2, 5)\nprint("Total:", total)', category: 'comprension' },
    ],
  },
  'int-build': {
    id: 'int-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Etiquetas de precio', difficulty: 3, xp: 30, concepts: ['diseno', 'parametros', 'print'],
    unlock: { any: ['int-predict', 'int-complete', 'int-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Una tienda necesita una función `etiqueta(nombre, precio, moneda="€")` que **devuelva** (no muestre) el texto de la etiqueta con el precio a **2 decimales**:\n\n`etiqueta("Pan", 1.2)` → `"Pan: 1.20 €"`\n\n`etiqueta("Libro", 15, "$")` → `"Libro: 15.00 $"`\n\nIncluye un docstring que explique qué devuelve.',
    expected: 'Pan: 1.20 €',
    plan: [
      {
        q: '¿Qué tiene que tener la cabecera?',
        options: [
          { text: 'Tres parámetros, con moneda="€" por defecto al final', correct: true },
          { text: 'Dos parámetros: nombre y precio', why: 'También tiene que aceptar la moneda cuando se indique (`"$"`), así que necesita un tercer parámetro con valor por defecto.' },
        ],
      },
      {
        q: '¿Cómo consigues los 2 decimales exactos?',
        options: [
          { text: 'Con una f-string y el formato :.2f', correct: true },
          { text: 'Con round(precio, 2)', why: '`round(1.2, 2)` sigue siendo 1.2: redondea, pero no añade el cero. Para mostrar 1.20 hace falta el formato `:.2f`.' },
        ],
      },
    ],
    planScaffold: 'def etiqueta(nombre, precio, moneda="€"):\n    """..."""\n    # Construir y devolver el texto\n\n\nprint(etiqueta("Pan", 1.2))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'etiqueta', params: 3 }],
      cases: [
        { label: 'etiqueta("Pan", 1.2)', call: 'print(etiqueta("Pan", 1.2))', out_lines: ['Pan: 1.20 €'] },
        { label: 'etiqueta("Libro", 15, "$")', call: 'print(etiqueta("Libro", 15, "$"))', out_lines: ['Libro: 15.00 $'] },
        { label: 'etiqueta("Té", 3.456, moneda="£")', call: 'print(etiqueta("Té", 3.456, moneda="£"))', out_lines: ['Té: 3.46 £'] },
      ],
      misconceptions: [
        { out_lines: ['Pan: 1.20 €', 'None'], title: 'Muestra, pero no devuelve', msg: 'La función usa `print`. Tiene que **devolver** el texto con `return` para que se pueda usar en cualquier sitio.' },
        { out_lines: ['Pan: 1.2 €'], title: 'Faltan decimales', msg: 'El precio debe mostrarse con 2 decimales exactos: usa `{precio:.2f}` dentro de una f-string.' },
      ],
      logic_msg: 'Compara el texto devuelto con el esperado carácter a carácter: los dos puntos, los espacios, los decimales y la moneda.',
    },
    hints: [
      { level: 'Orientación', text: 'Una función con tres parámetros (el último con valor por defecto) que devuelve un texto.' },
      { level: 'Razonamiento', text: 'Construye el texto con una f-string: el nombre, dos puntos, el precio con 2 decimales y la moneda.' },
      { level: 'Pseudocódigo', text: 'definir etiqueta(nombre, precio, moneda = "€"):\n    devolver «nombre: precio con 2 decimales moneda»', pre: true },
      { level: 'Ayuda técnica', text: '`return f"{nombre}: {precio:.2f} {moneda}"`. El docstring va en la primera línea del cuerpo, entre triples comillas.' },
    ],
    solution: {
      code: 'def etiqueta(nombre, precio, moneda="€"):\n    """Devuelve el texto de la etiqueta: nombre y precio con 2 decimales."""\n    return f"{nombre}: {precio:.2f} {moneda}"\n\nprint(etiqueta("Pan", 1.2))\nprint(etiqueta("Libro", 15, "$"))',
      explanation: 'La interfaz es cómoda: el caso habitual solo necesita nombre y precio, y la moneda se puede cambiar. Como devuelve el texto, sirve para mostrarlo, guardarlo o imprimir muchas etiquetas.',
    },
    reference: [
      'def etiqueta(nombre, precio, moneda="€"):\n    """Devuelve el texto de la etiqueta."""\n    return f"{nombre}: {precio:.2f} {moneda}"',
    ],
    wrongs: [
      { code: 'def etiqueta(nombre, precio, moneda="€"):\n    print(f"{nombre}: {precio:.2f} {moneda}")', category: 'comprension' },
      { code: 'def etiqueta(nombre, precio, moneda="€"):\n    return f"{nombre}: {precio} {moneda}"', category: 'comprension' },
      { code: 'def etiqueta(nombre, precio):\n    return f"{nombre}: {precio:.2f} €"', category: 'comprension' },
    ],
  },
};
