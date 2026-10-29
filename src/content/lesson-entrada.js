// Lección 2.3 · Tipos, conversiones y entrada de datos. Contenido original, alineado
// con el cap. 2 de «Piensa en Python» y PE1 módulo 2 (input, conversiones, print con
// sep y end). La 2.1 ya presentó input(), int(), float() y str(); aquí se profundiza:
// qué hace cada conversión en los casos difíciles, cómo elegir el tipo, f-strings y
// el esquema entrada → proceso → salida.

const TOPIC = 'Tipos y entrada';

export const LESSON_ENTRADA = {
  id: 'entrada',
  moduleId: 'm2',
  code: '2.3',
  title: 'Tipos, conversiones y entrada de datos',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Predecir qué hacen int(), float() y str() en los casos difíciles',
    'Elegir el tipo adecuado para cada dato que pide un programa',
    'Entender el ValueError y por qué aparece con input()',
    'Controlar la salida con sep, end y f-strings',
    'Organizar un programa en entrada, proceso y salida',
  ],
  prerequisites: ['Lección 2.1 «Variables»', 'Lección 2.2 «Expresiones» (recomendada)'],
  teaser: 'Hoy cierras el Módulo 2: conversiones sin sorpresas, datos del usuario y una salida con el formato exacto que quieras.',
  celebration: 'Con esta lección cierras la teoría del Módulo 2: ya sabes guardar, transformar, pedir y mostrar datos. Te queda el reto del módulo: el ticket de compra.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'conversiones', title: 'Conversiones a fondo', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'En la lección 2.1 conociste `int()`, `float()` y `str()`. Ahora toca ver qué hacen en los casos que más confunden:' },
        { type: 'code', run: true, code: 'print(int(3.9), round(3.9))\nprint(float("3"), int(" 42 "))\nprint(str(2.5) + " €")' },
        {
          type: 'five', items: {
            'int() de un decimal': '**Corta** los decimales, no redondea: `int(3.9)` es 3. Para redondear, `round()`.',
            'float() de un entero': 'Añade el decimal: `float("3")` es 3.0.',
            'Espacios': 'Se ignoran los del principio y el final: `int(" 42 ")` es 42.',
            'Texto con decimales': '`int("3.5")` da error: un texto con punto solo lo entiende `float()`.',
          },
        },
        {
          type: 'check', id: 'm2t-int-corta', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'print(int(7.99))', answer: '7',
          explain: '`int()` corta los decimales sin redondear: 7.99 → 7.',
        },
        {
          type: 'check', id: 'm2t-int-texto', concept: 'tipos', mode: 'choice',
          question: '¿Qué ocurre?', code: 'print(int("3.5"))', expectError: 'ValueError',
          options: [
            { text: 'ValueError: "3.5" no es un entero', correct: true },
            { text: 'Muestra 3', why: '`int()` corta los decimales de un **número**, pero un **texto** con punto no lo acepta. Primero habría que hacer `float("3.5")`.' },
            { text: 'Muestra 4', why: '`int()` nunca redondea, y además aquí ni siquiera llega a convertir: el texto "3.5" no es un entero válido.' },
          ],
          explain: 'Si necesitas la parte entera de un texto con decimales: `int(float("3.5"))` → 3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'valueerror', title: 'Cuando el usuario escribe otra cosa', concepts: ['input', 'errores'],
      blocks: [
        { type: 'p', text: 'Con `input()` no controlas qué escribe la persona. Si conviertes con `int()` y escribe «doce» o «17.5», Python se detiene con un **ValueError**: el valor tiene el tipo correcto (texto), pero su contenido no se puede convertir.' },
        { type: 'code', run: true, code: 'edad = int(input("Edad: "))\nprint("El año que viene tendrás", edad + 1)', caption: 'Ejecútalo varias veces: escribe 17, después «doce» y después 17.5. Lee el error en cada caso.' },
        { type: 'callout', tone: 'info', title: 'De momento, confía en el usuario', text: 'Más adelante aprenderás a capturar estos errores con `try` para volver a preguntar. Por ahora, elige bien la conversión y escribe mensajes claros: «Edad (en años): ».' },
        {
          type: 'check', id: 'm2t-altura', concept: 'input', mode: 'choice',
          question: 'Con `altura = int(input("Altura: "))` el usuario escribe 1.68 y salta un ValueError. ¿Cómo lo arreglas?',
          options: [
            { text: 'altura = float(input("Altura: "))', correct: true },
            { text: 'altura = input("Altura: ")', why: 'Ya no daría error, pero `altura` sería un texto: no podrías hacer cálculos con ella.' },
            { text: 'altura = int(input("Altura (sin decimales): "))', why: 'Cambia el mensaje, pero una altura en metros necesita decimales: el tipo adecuado es `float`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'elegir-tipo', title: '¿int, float o texto?', concepts: ['tipos', 'input'],
      blocks: [
        { type: 'p', text: 'Antes de escribir `input()`, pregúntate dos cosas: **¿voy a hacer cálculos con este dato?** Si no, déjalo como texto. **¿Puede tener decimales?** Si sí, `float`; si siempre es entero, `int`.' },
        {
          type: 'classify', id: 'm2t-tipo-dato', concept: 'tipos',
          question: '¿Lo leerías con int()? (si no, sería float() o lo dejarías como texto)',
          items: [
            { text: 'La edad en años', valid: true, why: 'Es un número entero y se puede operar con él (edad + 1).' },
            { text: 'El precio de un producto', valid: false, why: 'Puede tener céntimos: `float()`.' },
            { text: 'El número de hermanos', valid: true, why: 'Siempre es un entero.' },
            { text: 'La altura en metros', valid: false, why: 'Tiene decimales (1.68): `float()`.' },
            { text: 'El código postal', valid: false, why: 'Se deja como **texto**: no se hacen cálculos con él y `int("08001")` perdería el cero inicial.' },
          ],
        },
        {
          type: 'check', id: 'm2t-cero', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'cp = int("08001")\nprint(cp)', answer: '8001',
          explain: 'Como número, el cero de la izquierda no significa nada y desaparece. Por eso los códigos postales y los teléfonos se guardan como texto.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'print-avanzado', title: 'print() a medida: sep y end', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` separa los valores con un espacio y termina con un salto de línea. Puedes cambiar las dos cosas: `sep` es el separador y `end`, lo que escribe al final.' },
        { type: 'code', run: true, code: 'print(29, 10, 2026, sep="/")\nprint("A", "B", "C", sep="")\nprint("Cargando", end="")\nprint("...")\nprint("Listo")' },
        { type: 'callout', tone: 'tip', title: 'Cuándo usarlos', text: '`sep=""` pega los valores sin espacios; `end=""` hace que el siguiente `print` continúe en la misma línea.' },
        {
          type: 'check', id: 'm2t-sep', concept: 'print', mode: 'text',
          question: 'Predice:', code: 'print("a", "b", "c", sep="-")', answer: 'a-b-c',
          explain: '`sep="-"` pone un guion entre cada valor, en lugar del espacio.',
        },
        {
          type: 'check', id: 'm2t-end', concept: 'print', mode: 'text',
          question: 'Predice (es una sola línea):', code: 'print("Hola", end=" ")\nprint("mundo")', answer: 'Hola mundo',
          explain: 'El primer print termina con un espacio en lugar de un salto de línea, así que «mundo» aparece a continuación.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'fstrings', title: 'f-strings: textos con huecos', concepts: ['print', 'tipos'],
      blocks: [
        { type: 'p', text: 'Una **f-string** es un texto con una `f` delante de las comillas. Dentro, todo lo que pongas entre llaves `{ }` se calcula y se coloca en su sitio, sin necesidad de `str()`:' },
        { type: 'code', run: true, code: 'nombre = "Lucía"\nedad = 18\nprint(f"{nombre} tiene {edad} años")\nprint(f"El año que viene tendrá {edad + 1}")' },
        { type: 'p', text: 'Detrás de dos puntos puedes indicar el **formato**. El más útil: `:.2f`, que muestra el número con 2 decimales exactos.' },
        { type: 'code', run: true, code: 'precio = 4.5\ntotal = 19.999\nprint(f"Precio: {precio:.2f} €")\nprint(f"Total: {total:.2f} €")' },
        {
          type: 'five', items: {
            'Con comas': '`print("Tiene", edad, "años")`: sencillo; añade espacios.',
            'Con +': '`print("Tiene " + str(edad) + " años")`: todo tiene que ser texto.',
            'Con f-string': '`print(f"Tiene {edad} años")`: la más clara y permite dar formato.',
          },
        },
        {
          type: 'check', id: 'm2t-fstring', concept: 'print', mode: 'text',
          question: 'Predice:', code: 'n = 3\nprint(f"{n} x 2 = {n * 2}")', answer: '3 x 2 = 6',
          explain: 'Cada par de llaves se sustituye por su valor: n es 3 y n * 2 es 6.',
        },
        {
          type: 'check', id: 'm2t-sin-f', concept: 'print', mode: 'choice',
          question: '¿Qué mostrará?', code: 'nombre = "Ana"\nprint("Hola, {nombre}")', expectOutput: 'Hola, {nombre}',
          options: [
            { text: 'Hola, {nombre}', correct: true },
            { text: 'Hola, Ana', why: 'Falta la `f` delante de las comillas: sin ella, las llaves son texto normal.' },
          ],
          explain: 'Sin la `f`, es un texto corriente: `print(f"Hola, {nombre}")` sí mostraría «Hola, Ana».',
        },
        {
          type: 'check', id: 'm2t-2f', concept: 'print', mode: 'text',
          question: 'Predice:', code: 'media = 7.0 / 3\nprint(f"{media:.2f}")', answer: '2.33',
          explain: '7 / 3 es 2.333…; `:.2f` lo muestra redondeado a 2 decimales.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'eps', title: 'Entrada, proceso y salida', concepts: ['descomponer', 'input'],
      blocks: [
        { type: 'p', text: 'Casi todos los programas que harás en este módulo siguen el mismo esquema. Pensar en él antes de escribir te ayuda a planificar:' },
        {
          type: 'five', items: {
            '1 · Entrada': 'Pedir los datos y convertirlos al tipo adecuado.',
            '2 · Proceso': 'Hacer los cálculos y guardarlos en variables con buen nombre.',
            '3 · Salida': 'Mostrar el resultado con un formato claro.',
          },
        },
        { type: 'code', run: true, code: '# Entrada\ncelsius = float(input("Temperatura en °C: "))\n# Proceso\nfahrenheit = celsius * 9 / 5 + 32\n# Salida\nprint(f"{celsius} °C son {fahrenheit:.1f} °F")', caption: 'Prueba con 100 (el agua hierve: 212 °F) y con 36.6.' },
        {
          type: 'check', id: 'm2t-eps', concept: 'descomponer', mode: 'choice',
          question: 'En ese programa, ¿a qué parte pertenece `fahrenheit = celsius * 9 / 5 + 32`?',
          options: [
            { text: 'Proceso', correct: true },
            { text: 'Entrada', why: 'La entrada es donde se piden los datos (`input`). Esta línea calcula a partir de ellos.' },
            { text: 'Salida', why: 'La salida es el `print`. Esta línea solo calcula y guarda el resultado.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'tip-predict' },
    { id: 'a2', activity: 'tip-complete' },
    { id: 'a3', activity: 'tip-fix' },
    { id: 'a4', activity: 'tip-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`int()` corta los decimales de un número (no redondea) y no acepta textos con punto: `int("3.5")` da ValueError.',
    'Un **ValueError** aparece cuando el contenido no se puede convertir, por ejemplo si el usuario escribe «doce».',
    'Elige el tipo pensando en el dato: enteros con `int`, decimales con `float` y códigos o nombres como texto.',
    '`sep` cambia el separador de `print` y `end`, lo que escribe al final.',
    'Las f-strings (`f"…{valor}…"`) colocan valores en un texto; `:.2f` da 2 decimales exactos.',
    'Esquema de un programa: entrada → proceso → salida.',
  ],
};

export const ACTIVITIES_ENTRADA = {
  'tip-predict': {
    id: 'tip-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El siete camaleón', difficulty: 1, xp: 10, concepts: ['tipos'],
    prompt: 'El mismo «7» se comporta distinto según su tipo. **¿Qué mostrará?**',
    code: 'a = "7"\nb = int(a) + 3\nc = a * 2\nprint(b, c, float(b))',
    expectedOutput: '10 77 10.0',
    options: [
      { text: '10 77 10.0', correct: true },
      { text: '10 14 10.0', concept: 'tipos', why: '`a` sigue siendo el texto "7": `int(a)` crea un número nuevo, pero no cambia `a`. Y un texto por 2 se **repite**: "77".' },
      { text: '73 77 10.0', concept: 'tipos', why: '`int(a)` convierte el texto en el número 7, así que `+ 3` suma: 10.' },
      { text: '10 77 10', concept: 'tipos', why: '`float()` siempre da un decimal: `float(10)` es 10.0.' },
    ],
    explain: [
      '`a` es el texto "7".',
      '`int(a)` es el número 7, y 7 + 3 = 10.',
      '`a * 2` repite el texto: "77". `a` no ha cambiado de tipo.',
      '`float(10)` es 10.0.',
    ],
  },
  'tip-complete': {
    id: 'tip-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La línea del ticket', difficulty: 2, xp: 15, concepts: ['print', 'tipos'],
    statement: 'Completa la f-string para que la línea del ticket muestre el **nombre del producto** y el **total con 2 decimales exactos**:',
    expected: 'Cuaderno x3: 7.50 €',
    starter: 'producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{___} x{unidades}: {total:___} €")',
    spec: {
      blanks: true,
      exact_lines: true,
      cases: [{ label: 'Salida esperada', out_lines: ['Cuaderno x3: 7.50 €'] }],
      variants: [{
        label: 'Precio 1.2 € y 4 unidades', set: { precio: 1.2, unidades: 4 }, out_lines: ['Cuaderno x4: 4.80 €'],
        msg: 'Con otros datos la línea no sale bien: muestra los valores de las variables, no los escribas a mano.',
      }],
      misconceptions: [
        { out_lines: ['Cuaderno x3: 7.5 €'], title: 'Faltan decimales', msg: 'El total debe mostrar **2 decimales exactos** (7.50). Eso se consigue con el formato `.2f` detrás de los dos puntos.' },
        { out_contains: 'producto x', title: 'Has escrito la palabra', msg: 'Se muestra la palabra «producto». Dentro de las llaves va el **nombre de la variable**, sin comillas: `{producto}`.' },
      ],
      rules: [{ type: 'must_load', names: ['producto', 'total'], title: 'Usa las variables', msg: 'Coloca en la f-string las variables producto y total.' }],
      logic_msg: 'Compara tu salida con la esperada carácter a carácter: aquí también cuentan los decimales.',
    },
    hints: [
      { level: 'Orientación', text: 'Hay dos huecos: el primero es **qué** se muestra (el nombre del producto); el segundo, **cómo** se muestra el total.' },
      { level: 'Razonamiento', text: '¿Qué variable guarda «Cuaderno»? ¿Qué formato da exactamente 2 decimales?' },
      { level: 'Pseudocódigo', text: 'primer hueco ← la variable con el nombre del producto\nsegundo hueco ← formato de 2 decimales', pre: true },
      { level: 'Ayuda técnica', text: 'Dentro de las llaves va la variable sin comillas: `{producto}`. Para 2 decimales: `{total:.2f}`.' },
    ],
    solution: {
      code: 'producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{producto} x{unidades}: {total:.2f} €")',
      explanation: '`{producto}` coloca el valor de la variable y `{total:.2f}` muestra 7.5 como 7.50: los precios siempre se escriben con dos decimales.',
    },
    reference: ['producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{producto} x{unidades}: {total:.2f} €")'],
    wrongs: [
      { code: 'producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{___} x{unidades}: {total:___} €")', category: 'incompleto' },
      { code: 'producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{producto} x{unidades}: {total} €")', category: 'comprension' },
      { code: 'producto = "Cuaderno"\nprecio = 2.5\nunidades = 3\ntotal = precio * unidades\nprint(f"{producto} x{unidades}: 7.50 €")', category: 'logica' },
    ],
  },
  'tip-fix': {
    id: 'tip-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La ficha que no arranca', difficulty: 2, xp: 20, concepts: ['input', 'tipos', 'errores'],
    statement: 'Este programa pide nombre, edad y altura, pero falla. **Ejecútalo** (prueba con Ana, 30 y 1.68), lee cada error y corrígelo. Hay **dos** fallos.',
    expected: 'Ana cumplirá 31 años\nMide 1.68 m',
    starter: 'nombre = input("Nombre: ")\nedad = input("Edad: ")\naltura = int(input("Altura (m): "))\nprint(nombre + " cumplirá " + edad + 1 + " años")\nprint("Mide", altura, "m")',
    spec: {
      cases: [
        { label: 'Ana, 30 años, 1.68 m', stdin: ['Ana', '30', '1.68'], out_lines: ['Ana cumplirá 31 años', 'Mide 1.68 m'] },
        { label: 'Luis, 9 años, 1.3 m', stdin: ['Luis', '9', '1.3'], out_lines: ['Luis cumplirá 10 años', 'Mide 1.3 m'] },
      ],
      misconceptions: [
        { out_lines: ['Ana cumplirá 301 años', 'Mide 1.68 m'], title: '30 + 1 no es 301', msg: 'Has pegado el texto "1" al texto "30". Para **sumar**, `edad` tiene que ser un número: conviértela con `int()`.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir los datos', msg: 'Mantén los input(): el programa tiene que funcionar con cualquier persona.' }],
      logic_msg: 'Ya no hay errores, pero la salida no coincide. Revisa los espacios: con + no se añade ninguno automáticamente.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta y escribe Ana, 30 y 1.68. El primer error es un **ValueError**: ¿en qué línea? ¿Qué valor no se ha podido convertir?' },
      { level: 'Razonamiento', text: 'Línea 3: ¿qué tipo necesita una altura con decimales? Línea 4: `edad` es un texto; ¿puedes sumarle 1? ¿Y unir un número con textos usando `+`?' },
      { level: 'Pseudocódigo', text: 'Línea 2: convertir la edad en entero\nLínea 3: convertir la altura en decimal\nLínea 4: mostrar edad + 1 sin mezclar tipos con +', pre: true },
      { level: 'Ayuda técnica', text: '`float(input())` lee decimales. Con una f-string no hace falta `str()`: `print(f"{nombre} cumplirá {edad + 1} años")`.' },
    ],
    solution: {
      code: 'nombre = input("Nombre: ")\nedad = int(input("Edad: "))\naltura = float(input("Altura (m): "))\nprint(f"{nombre} cumplirá {edad + 1} años")\nprint("Mide", altura, "m")',
      explanation: '`int("1.68")` da ValueError: una altura con decimales se lee con `float()`. Después, `edad` debe ser número para sumarle 1, y la f-string evita mezclar texto y números con `+`.',
    },
    reference: [
      'nombre = input("Nombre: ")\nedad = int(input("Edad: "))\naltura = float(input("Altura (m): "))\nprint(f"{nombre} cumplirá {edad + 1} años")\nprint("Mide", altura, "m")',
      'nombre = input()\nedad = int(input())\naltura = float(input())\nprint(nombre + " cumplirá " + str(edad + 1) + " años")\nprint("Mide", altura, "m")',
    ],
    wrongs: [
      { code: 'nombre = input("Nombre: ")\nedad = input("Edad: ")\naltura = int(input("Altura (m): "))\nprint(nombre + " cumplirá " + edad + 1 + " años")\nprint("Mide", altura, "m")', category: 'ejecucion' },
      { code: 'nombre = input("Nombre: ")\nedad = input("Edad: ")\naltura = float(input("Altura (m): "))\nprint(nombre + " cumplirá " + edad + 1 + " años")\nprint("Mide", altura, "m")', category: 'ejecucion' },
      { code: 'nombre = input("Nombre: ")\nedad = input("Edad: ")\naltura = float(input("Altura (m): "))\nprint(nombre + " cumplirá " + edad + "1" + " años")\nprint("Mide", altura, "m")', category: 'comprension' },
      { code: 'nombre = input()\nedad = input()\naltura = input()\nprint("Ana cumplirá 31 años")\nprint("Mide 1.68 m")', category: 'logica' },
    ],
  },
  'tip-build': {
    id: 'tip-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'La velocidad media', difficulty: 3, xp: 30, concepts: ['input', 'tipos', 'descomponer'],
    unlock: { any: ['tip-predict', 'tip-complete', 'tip-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Una app de deporte quiere mostrar la **velocidad media en km/h** de cada salida. Escribe un programa que pida la **distancia en km** (puede tener decimales) y el **tiempo en minutos** (entero) y muestre la velocidad en km/h.\n\nEjemplo: 10 km en 30 minutos → 20 km/h.\n\nMuestra la velocidad en la **última línea**; puedes redondearla a un decimal con `:.1f`.',
    plan: [
      {
        q: '¿Cómo lees cada dato?', multi: true,
        options: [
          { text: 'distancia = float(input(...))', correct: true },
          { text: 'minutos = int(input(...))', correct: true },
          { text: 'distancia = int(input(...))', why: 'Una distancia como 42.195 km tiene decimales: `int()` daría ValueError.' },
          { text: 'minutos = input(...)', why: 'Sin convertir sería texto y no podrías dividir.' },
        ],
      },
      {
        q: 'La velocidad en km/h es kilómetros entre **horas**. ¿Cómo pasas los minutos a horas?',
        options: [
          { text: 'minutos / 60', correct: true },
          { text: 'minutos * 60', why: '30 minutos serían 1800 horas: al revés. Una hora tiene 60 minutos, así que se divide.' },
          { text: 'minutos // 60', why: 'Con `//` se pierden los decimales: 30 minutos darían 0 horas (y una división entre cero).' },
        ],
      },
      {
        q: 'Con 10 km en 30 minutos, ¿qué cálculo da 20 km/h?',
        options: [
          { text: '10 / (30 / 60)', correct: true },
          { text: '10 / 30 / 60', why: 'Sin paréntesis divides también entre 60: da 0.0055. Fíjate en el orden de las operaciones.' },
          { text: '10 / 30', why: 'Eso son kilómetros por **minuto** (0.33), no por hora.' },
        ],
      },
    ],
    planScaffold: '# Entrada: distancia (km) y tiempo (minutos)\n\n# Proceso: pasar los minutos a horas y calcular la velocidad\n\n# Salida: mostrar la velocidad\n',
    starter: '',
    spec: {
      cases: [
        { label: '10 km en 30 min', stdin: ['10', '30'], args: { d: 10, t: 30 } },
        { label: 'Maratón: 42.195 km en 180 min', stdin: ['42.195', '180'], args: { d: 42.195, t: 180 } },
        { label: 'Caso límite: 5 km en 60 min', stdin: ['5', '60'], args: { d: 5, t: 60 } },
      ],
      expect_last_number: 'd / (t / 60)',
      hidden: { count: 2, args: { d: [1, 100, 1], t: [10, 300, 0] }, stdin: ['d', 't'] },
      tolerance: 0.05,
      misconceptions: [
        { expr: 'd / t', title: 'Km por minuto', msg: 'Has dividido entre minutos: eso son kilómetros por **minuto**. Pasa antes los minutos a horas (÷ 60).' },
        { expr: 'd / t / 60', title: 'Revisa el orden', msg: 'Sin paréntesis divides la distancia entre los minutos y otra vez entre 60. Usa `distancia / (minutos / 60)`.' },
        { expr: 'd / (t * 60)', title: 'Minutos a horas', msg: 'Para pasar minutos a horas se **divide** entre 60, no se multiplica.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir los datos', msg: 'Usa input() para pedir la distancia y el tiempo.' }],
    },
    hints: [
      { level: 'Orientación', text: 'Dos datos de entrada (distancia y minutos) y un resultado (km/h). Sigue el esquema entrada → proceso → salida.' },
      { level: 'Razonamiento', text: 'km/h significa «kilómetros cada hora». Tienes minutos: primero conviértelos en horas y después divide la distancia entre las horas.' },
      { level: 'Pseudocódigo', text: 'distancia ← pedir número decimal\nminutos ← pedir número entero\nhoras ← minutos ÷ 60\nvelocidad ← distancia ÷ horas\nmostrar velocidad', pre: true },
      { level: 'Ayuda técnica', text: '`float(input("Distancia (km): "))` e `int(input("Minutos: "))`. Para mostrar un decimal: `print(f"Velocidad: {velocidad:.1f} km/h")`.' },
    ],
    solution: {
      code: '# Entrada\ndistancia = float(input("Distancia (km): "))\nminutos = int(input("Tiempo (minutos): "))\n# Proceso\nhoras = minutos / 60\nvelocidad = distancia / horas\n# Salida\nprint(f"Velocidad media: {velocidad:.1f} km/h")',
      explanation: 'Se leen los datos con el tipo adecuado, se pasan los minutos a horas y se divide. Con 42.195 km en 180 minutos: 3 horas y 14.1 km/h.',
    },
    reference: [
      'd = float(input())\nt = int(input())\nprint(d / (t / 60))',
      'distancia = float(input("Km: "))\nminutos = int(input("Min: "))\nprint(f"{distancia * 60 / minutos:.1f} km/h")',
    ],
    wrongs: [
      { code: 'distancia = float(input())\nminutos = int(input())\nprint(distancia / minutos)', category: 'comprension' },
      { code: 'distancia = int(input())\nminutos = int(input())\nprint(distancia / (minutos / 60))', category: 'ejecucion' },
      { code: 'print(20)', category: 'logica' },
    ],
  },
};
