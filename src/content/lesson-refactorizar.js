// Lección 4.3 · Refactorización. Contenido original, alineado con el cap. 4 de
// «Piensa en Python» (refactorización, un plan de desarrollo) y las buenas prácticas
// de PE1: código duplicado, nombres, constantes y desarrollo incremental.

const TOPIC = 'Diseño de funciones';

export const LESSON_REFACTORIZAR = {
  id: 'refactorizar',
  moduleId: 'm4',
  code: '4.3',
  title: 'Refactorización',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Explicar qué es refactorizar y cuándo conviene hacerlo',
    'Eliminar código duplicado extrayendo una función',
    'Mejorar nombres y sustituir números mágicos por constantes',
    'Seguir un plan de desarrollo incremental',
    'Comprobar que una refactorización no cambia el resultado',
  ],
  prerequisites: ['Lección 4.2 «Diseño de interfaces»'],
  teaser: 'Un programa que funciona no siempre está bien escrito. Hoy aprendes a mejorarlo sin romperlo.',
  celebration: 'Has completado el Módulo 4: ya no solo escribes programas que funcionan, sino programas claros, reutilizables y fáciles de cambiar.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'que-es', title: '¿Qué es refactorizar?', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: '**Refactorizar** es cambiar cómo está escrito un programa **sin cambiar lo que hace**. El objetivo es que sea más fácil de leer, de reutilizar y de modificar.' },
        {
          type: 'five', items: {
            'Código repetido': 'Las mismas líneas en varios sitios: extrae una función.',
            'Nombres que no dicen nada': '`x`, `f2`, `dato`: cámbialos por nombres que expliquen.',
            'Números mágicos': 'Un `0.21` suelto: ¿qué es? Ponle nombre con una constante.',
            'Funciones que hacen demasiado': 'Si cuesta ponerle nombre, divídela en funciones más pequeñas.',
          },
        },
        {
          type: 'check', id: 'm4r-definicion', concept: 'diseno', mode: 'choice',
          question: 'Después de refactorizar un programa, su salida…',
          options: [
            { text: 'Debe ser exactamente la misma', correct: true },
            { text: 'Debe ser mejor', why: 'Refactorizar mejora el **código**, no el resultado. Si cambia lo que hace, ya no es refactorizar: es añadir una función nueva (o introducir un error).' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'extraer', title: 'Extraer una función', concepts: ['diseno', 'funciones'],
      blocks: [
        { type: 'p', text: 'Mira este programa: las mismas tres líneas se repiten con datos distintos.' },
        { type: 'code', run: true, title: 'Antes', code: 'print("Producto:", "Lápiz")\nprint("Total:", 4 * 1.5)\nprint("-" * 15)\nprint("Producto:", "Goma")\nprint("Total:", 2 * 0.75)\nprint("-" * 15)' },
        { type: 'p', text: 'Lo que cambia entre repeticiones se convierte en **parámetros**; lo que se repite, en el **cuerpo** de la función:' },
        { type: 'code', run: true, title: 'Después', code: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", producto)\n    print("Total:", unidades * precio)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea("Goma", 2, 0.75)', caption: 'La salida es idéntica. Pero ahora, para cambiar el separador, tocas una sola línea.' },
        {
          type: 'check', id: 'm4r-parametros', concept: 'diseno', mode: 'choice',
          question: 'Al extraer una función de código repetido, ¿qué se convierte en parámetros?',
          options: [
            { text: 'Los datos que cambian de una repetición a otra', correct: true },
            { text: 'Todo lo que aparece en las líneas repetidas', why: 'Lo que es igual en todas las repeticiones (como `"-" * 15`) se queda dentro de la función.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nombres', title: 'Nombres claros y constantes', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'Compara estas dos versiones. Hacen exactamente lo mismo:' },
        { type: 'code', title: 'Antes', code: 'def f(x):\n    return x + x * 0.21' },
        { type: 'code', run: true, title: 'Después', code: 'IVA = 0.21\n\ndef precio_con_iva(precio):\n    return precio + precio * IVA\n\nprint(precio_con_iva(100))' },
        { type: 'callout', tone: 'info', title: 'Constantes en MAYÚSCULAS', text: 'Por convención, un valor que no debe cambiar durante el programa se escribe en mayúsculas al principio: `IVA = 0.21`. Si el IVA cambia, lo modificas en un solo sitio.' },
        {
          type: 'check', id: 'm4r-magico', concept: 'diseno', mode: 'choice',
          question: '¿Qué mejora más este código? `total = horas * 12.5`',
          options: [
            { text: 'PRECIO_HORA = 12.5 y total = horas * PRECIO_HORA', correct: true },
            { text: 'Escribir 12.50 en lugar de 12.5', why: 'Sigue siendo un número mágico: no explica qué representa.' },
            { text: 'Cambiar total por t', why: 'Un nombre más corto explica todavía menos.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'Un plan de desarrollo incremental', concepts: ['diseno', 'descomponer'],
      blocks: [
        { type: 'p', text: 'Los programadores con experiencia no escriben cien líneas y después ejecutan. Avanzan en **pasos pequeños**, comprobando cada uno:' },
        {
          type: 'five', items: {
            '1 · Empieza pequeño': 'Escribe unas pocas líneas que resuelvan una parte, sin funciones si quieres.',
            '2 · Ejecuta y comprueba': 'Con datos cuyo resultado conoces. Si falla, el error está en lo último que añadiste.',
            '3 · Encapsula y generaliza': 'Cuando funcione, conviértelo en una función con parámetros.',
            '4 · Repite y refactoriza': 'Añade la siguiente parte y, de vez en cuando, mejora lo que ya funciona.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'print temporales', text: 'Mientras desarrollas, un `print` que muestre un valor intermedio te dice si vas bien. Cuando la función funcione, quítalo: es un andamio, no parte del edificio.' },
        {
          type: 'check', id: 'm4r-plan', concept: 'descomponer', mode: 'choice',
          question: 'Has añadido tres funciones nuevas y el programa da un error que no entiendes. ¿Qué hubiera ayudado más?',
          options: [
            { text: 'Ejecutar después de añadir cada función', correct: true },
            { text: 'Escribir las tres funciones más deprisa', why: 'La velocidad no ayuda: si ejecutas a cada paso, sabes que el error está en lo último que has añadido.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comprobar', title: 'Refactorizar sin romper nada', concepts: ['diseno', 'errores'],
      blocks: [
        { type: 'p', text: 'El riesgo de refactorizar es cambiar el comportamiento sin querer. El error más típico al extraer una función: seguir usando una variable **de fuera** en lugar del parámetro.' },
        { type: 'code', run: true, code: 'precio = 80\n\ndef con_descuento(precio_base, porcentaje):\n    return precio - precio * porcentaje / 100   # usa precio, no precio_base\n\nprint(con_descuento(80, 25))   # 60.0: parece que funciona\nprint(con_descuento(40, 50))   # 40.0: ¡debería ser 20.0!', caption: 'Con el primer ejemplo coincide por casualidad. Por eso hay que comprobar con varios datos.' },
        {
          type: 'check', id: 'm4r-global', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'n = 5\n\ndef doble(x):\n    return n * 2\n\nprint(doble(10))', answer: '10',
          explain: 'La función ignora su parámetro x y usa la n de fuera (5): 5 × 2 = 10, no 20.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'ref-predict' },
    { id: 'a2', activity: 'ref-complete' },
    { id: 'a3', activity: 'ref-fix' },
    { id: 'a4', activity: 'ref-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '**Refactorizar** es mejorar cómo está escrito un programa sin cambiar lo que hace.',
    'Código repetido → extrae una función: lo que cambia son los parámetros; lo que se repite, el cuerpo.',
    'Nombres que expliquen y constantes en MAYÚSCULAS en lugar de números mágicos.',
    'Desarrollo incremental: pasos pequeños, ejecutando y comprobando cada uno.',
    'Después de refactorizar, comprueba con varios datos que la salida es la misma.',
  ],
};

export const ACTIVITIES_REFACTORIZAR = {
  'ref-predict': {
    id: 'ref-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La constante del IVA', difficulty: 1, xp: 10, concepts: ['diseno', 'parametros'],
    prompt: 'Un programa ya refactorizado, con una constante y una función. **¿Qué mostrará?**',
    code: 'IVA = 0.21\n\ndef con_iva(precio):\n    return precio * (1 + IVA)\n\nprint(con_iva(100), con_iva(50))',
    expectedOutput: '121.0 60.5',
    options: [
      { text: '121.0 60.5', correct: true },
      { text: '100.21 50.21', concept: 'expresiones', why: 'Los paréntesis se calculan primero: 1 + 0.21 = 1.21, y después se multiplica el precio por 1.21.' },
      { text: '121.0 121.0', concept: 'parametros', why: 'Cada llamada usa su propio argumento: la segunda calcula con 50.' },
      { text: 'Un error: IVA no está dentro de la función', concept: 'parametros', why: 'Una función puede **leer** una constante definida fuera. Lo que no conviene es depender de variables de fuera que cambian.' },
    ],
    explain: ['`IVA` vale 0.21 en todo el programa.', '`con_iva(100)` → 100 × 1.21 = 121.0.', '`con_iva(50)` → 50 × 1.21 = 60.5.'],
  },
  'ref-complete': {
    id: 'ref-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Extrae la función', difficulty: 2, xp: 15, concepts: ['diseno', 'funciones'],
    statement: 'Este programa repetía tres líneas para cada producto. Ya se ha extraído la función: completa los huecos para que muestre **exactamente lo mismo** que antes.',
    expected: 'Producto: Lápiz\nTotal: 6.0\n---------------\nProducto: Goma\nTotal: 1.5\n---------------',
    starter: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", ___)\n    print("Total:", ___ * ___)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea(___)',
    spec: {
      blanks: true,
      functions: [{ name: 'mostrar_linea', params: 3 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Producto: Lápiz', 'Total: 6.0', '---------------', 'Producto: Goma', 'Total: 1.5', '---------------'] },
        { label: 'mostrar_linea("Regla", 3, 2.0)', call: 'mostrar_linea("Regla", 3, 2.0)', out_lines: ['Producto: Regla', 'Total: 6.0', '---------------'] },
      ],
      logic_msg: 'La salida no coincide con la del programa original. ¿Usas los parámetros dentro de la función? ¿Le pasas a la segunda llamada "Goma", 2 y 0.75?',
    },
    hints: [
      { level: 'Orientación', text: 'Los huecos del cuerpo son parámetros de la función. El último hueco son los argumentos de la segunda llamada.' },
      { level: 'Razonamiento', text: 'Dentro de la función no se escribe «Lápiz» ni 4: se usan los nombres de los parámetros. En la segunda llamada, piensa en la goma: 2 unidades a 0.75 €.' },
      { level: 'Pseudocódigo', text: 'mostrar "Producto:", producto\nmostrar "Total:", unidades × precio\nllamar a mostrar_linea con "Goma", 2 y 0.75', pre: true },
      { level: 'Ayuda técnica', text: '`print("Producto:", producto)`, `print("Total:", unidades * precio)` y `mostrar_linea("Goma", 2, 0.75)`.' },
    ],
    solution: {
      code: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", producto)\n    print("Total:", unidades * precio)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea("Goma", 2, 0.75)',
      explanation: 'Lo que cambiaba entre repeticiones (producto, unidades y precio) se convirtió en parámetros. La salida es idéntica a la del programa original.',
    },
    reference: ['def mostrar_linea(producto, unidades, precio):\n    print("Producto:", producto)\n    print("Total:", unidades * precio)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea("Goma", 2, 0.75)'],
    wrongs: [
      { code: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", ___)\n    print("Total:", ___ * ___)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea(___)', category: 'incompleto' },
      { code: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", "Lápiz")\n    print("Total:", 4 * 1.5)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea("Goma", 2, 0.75)', category: 'logica' },
      { code: 'def mostrar_linea(producto, unidades, precio):\n    print("Producto:", producto)\n    print("Total:", unidades * precio)\n    print("-" * 15)\n\nmostrar_linea("Lápiz", 4, 1.5)\nmostrar_linea("Goma")', category: 'ejecucion' },
    ],
  },
  'ref-fix': {
    id: 'ref-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La refactorización que rompió algo', difficulty: 2, xp: 20, concepts: ['diseno', 'parametros'],
    statement: 'Alguien extrajo esta función y la probó solo con el primer ejemplo, que sale bien. Pero el segundo debería dar **20.0** y da otra cosa. Encuentra el fallo y corrígelo **en la función**.',
    expected: '60.0\n20.0',
    starter: 'precio_original = 80\n\ndef precio_final(precio, porcentaje):\n    return precio_original - precio_original * porcentaje / 100\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))',
    spec: {
      functions: [{ name: 'precio_final', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['60.0', '20.0'] },
        { label: 'print(precio_final(200, 10))', call: 'print(precio_final(200, 10))', out_lines: ['180.0'] },
      ],
      misconceptions: [
        { out_lines: ['60.0', '40.0'], title: 'Sigue usando la variable de fuera', msg: 'La función calcula con `precio_original` (que siempre vale 80) en lugar de con su parámetro `precio`.' },
      ],
      logic_msg: 'La salida no coincide. Calcula a mano: 40 € con un 50 % de descuento son 20 €.',
    },
    hints: [
      { level: 'Orientación', text: 'El primer ejemplo sale bien por casualidad: el precio que se pasa (80) coincide con `precio_original`. Prueba a cambiar el primer argumento.' },
      { level: 'Razonamiento', text: 'Una función debe trabajar con sus parámetros. ¿Qué parámetro recibe el precio? ¿Lo usa el cuerpo?' },
      { level: 'Pseudocódigo', text: 'devolver precio − precio × porcentaje ÷ 100', pre: true },
      { level: 'Ayuda técnica', text: 'Sustituye `precio_original` por `precio` dentro de la función. La variable de fuera ya no hace falta.' },
    ],
    solution: {
      code: 'def precio_final(precio, porcentaje):\n    return precio - precio * porcentaje / 100\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))',
      explanation: 'El cuerpo usaba una variable de fuera en lugar del parámetro, así que la función siempre calculaba con 80. Con `precio`, funciona con cualquier dato. Por eso hay que probar con varios ejemplos.',
    },
    reference: [
      'def precio_final(precio, porcentaje):\n    return precio - precio * porcentaje / 100\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))',
      'precio_original = 80\n\ndef precio_final(precio, porcentaje):\n    return precio * (1 - porcentaje / 100)\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))',
    ],
    wrongs: [
      { code: 'precio_original = 80\n\ndef precio_final(precio, porcentaje):\n    return precio_original - precio_original * porcentaje / 100\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))', category: 'comprension' },
      { code: 'def precio_final(precio, porcentaje):\n    return precio - porcentaje\n\nprint(precio_final(80, 25))\nprint(precio_final(40, 50))', category: 'logica' },
    ],
  },
  'ref-build': {
    id: 'ref-build', type: 'code', variant: 'build', kindLabel: 'Refactoriza', topic: TOPIC,
    title: 'Recibos sin repetir', difficulty: 3, xp: 30, concepts: ['diseno', 'funciones', 'print'],
    unlock: { any: ['ref-predict', 'ref-complete', 'ref-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'El código inicial funciona, pero repite lo mismo tres veces. **Refactorízalo**: define una función `recibo(cliente, importe)` que muestre las dos líneas de un recibo (con el importe a 2 decimales) y úsala para los tres clientes. La salida debe ser **la misma** que la del programa original.',
    expected: 'Cliente: Ana\nImporte: 25.00 €\nCliente: Luis\nImporte: 7.50 €\nCliente: Marta\nImporte: 12.30 €',
    starter: 'print("Cliente: Ana")\nprint(f"Importe: {25:.2f} €")\nprint("Cliente: Luis")\nprint(f"Importe: {7.5:.2f} €")\nprint("Cliente: Marta")\nprint(f"Importe: {12.3:.2f} €")',
    plan: [
      {
        q: '¿Qué cambia entre un recibo y otro?',
        multi: true,
        options: [
          { text: 'El nombre del cliente', correct: true },
          { text: 'El importe', correct: true },
          { text: 'El formato de las líneas', why: 'El formato es igual en los tres recibos: se queda dentro de la función.' },
        ],
      },
      {
        q: '¿Cómo compruebas que la refactorización no ha cambiado nada?',
        options: [
          { text: 'Comparando la salida nueva con la del programa original', correct: true },
          { text: 'Si no da error, está bien', why: 'Un programa puede ejecutarse sin errores y mostrar algo distinto. Compara la salida línea a línea.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'recibo', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Cliente: Ana', 'Importe: 25.00 €', 'Cliente: Luis', 'Importe: 7.50 €', 'Cliente: Marta', 'Importe: 12.30 €'] },
        { label: 'recibo("Eva", 3)', call: 'recibo("Eva", 3)', out_lines: ['Cliente: Eva', 'Importe: 3.00 €'] },
      ],
      misconceptions: [
        { out_lines: ['Cliente: Ana', 'Importe: 25 €', 'Cliente: Luis', 'Importe: 7.5 €', 'Cliente: Marta', 'Importe: 12.3 €'], title: 'Faltan decimales', msg: 'La salida original muestra el importe con 2 decimales: usa `{importe:.2f}`.' },
      ],
      rules: [{ type: 'must_call', name: 'recibo', title: 'Usa la función', msg: 'El programa debe mostrar los tres recibos llamando a recibo().' }],
      logic_msg: 'La salida debe ser idéntica a la del programa original. Compárala línea a línea.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta primero el código inicial y fíjate en su salida: tu versión debe producir exactamente la misma.' },
      { level: 'Razonamiento', text: 'Lo que cambia entre recibos (cliente e importe) serán los parámetros. Las dos líneas de print, el cuerpo.' },
      { level: 'Pseudocódigo', text: 'definir recibo(cliente, importe):\n    mostrar "Cliente: " + cliente\n    mostrar el importe con 2 decimales\nrecibo("Ana", 25)\nrecibo("Luis", 7.5)\nrecibo("Marta", 12.3)', pre: true },
      { level: 'Ayuda técnica', text: '`print(f"Cliente: {cliente}")` y `print(f"Importe: {importe:.2f} €")` dentro de la función.' },
    ],
    solution: {
      code: 'def recibo(cliente, importe):\n    """Muestra el recibo de un cliente con el importe a 2 decimales."""\n    print(f"Cliente: {cliente}")\n    print(f"Importe: {importe:.2f} €")\n\nrecibo("Ana", 25)\nrecibo("Luis", 7.5)\nrecibo("Marta", 12.3)',
      explanation: 'Seis líneas repetidas se convierten en una función de dos líneas y tres llamadas. Si mañana el recibo necesita una línea más, se añade en un solo sitio.',
    },
    reference: ['def recibo(cliente, importe):\n    print(f"Cliente: {cliente}")\n    print(f"Importe: {importe:.2f} €")\n\nrecibo("Ana", 25)\nrecibo("Luis", 7.5)\nrecibo("Marta", 12.3)'],
    wrongs: [
      { code: 'print("Cliente: Ana")\nprint(f"Importe: {25:.2f} €")\nprint("Cliente: Luis")\nprint(f"Importe: {7.5:.2f} €")\nprint("Cliente: Marta")\nprint(f"Importe: {12.3:.2f} €")', category: 'comprension' },
      { code: 'def recibo(cliente, importe):\n    print(f"Cliente: {cliente}")\n    print(f"Importe: {importe} €")\n\nrecibo("Ana", 25)\nrecibo("Luis", 7.5)\nrecibo("Marta", 12.3)', category: 'comprension' },
      { code: 'def recibo(cliente, importe):\n    print(f"Cliente: {cliente}")\n    print(f"Importe: {importe:.2f} €")\n\nrecibo("Ana", 25)\nrecibo("Luis", 7.5)', category: 'logica' },
    ],
  },
};
