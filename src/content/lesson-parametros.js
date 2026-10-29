// Lección 3.3 · Parámetros y variables locales. Contenido original, alineado con el
// cap. 3 de «Piensa en Python» (parámetros y argumentos, variables locales, diagramas
// de pila, funciones productivas y nulas) y PE1 módulo 4 (return, ámbito).

const TOPIC = 'Funciones';

export const LESSON_PARAMETROS = {
  id: 'parametros',
  moduleId: 'm3',
  code: '3.3',
  title: 'Parámetros y variables locales',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Pasar datos a una función con parámetros y argumentos',
    'Devolver un resultado con return y usarlo en otras expresiones',
    'Distinguir entre devolver y mostrar dentro de una función',
    'Explicar por qué las variables de una función son locales',
  ],
  prerequisites: ['Lección 3.2 «Definir tus propias funciones»'],
  teaser: 'Tus funciones van a recibir datos y devolver resultados. Con eso ya puedes construir herramientas reutilizables de verdad.',
  celebration: 'Has completado el Módulo 3: tus funciones reciben datos, devuelven resultados y guardan sus variables en su propio espacio.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'parametros', title: 'Dar datos a una función', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'Una función sin datos hace siempre lo mismo. Con **parámetros** puede trabajar con valores distintos en cada llamada:' },
        { type: 'code', run: true, code: 'def saludar(nombre):\n    print(f"Hola, {nombre}")\n\nsaludar("Lucía")\nsaludar("Marco")' },
        {
          type: 'five', items: {
            'Parámetro': 'El nombre entre los paréntesis del `def`: `nombre`. Es como una variable que espera un valor.',
            'Argumento': 'El valor que pasas al llamar: `"Lucía"`.',
            'Al llamar': 'Python hace `nombre = "Lucía"` y ejecuta el cuerpo con ese valor.',
          },
        },
        {
          type: 'check', id: 'm3p-presentar', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'def presentar(nombre, edad):\n    print(nombre, "tiene", edad, "años")\n\npresentar("Eva", 20)', answer: 'Eva tiene 20 años',
          explain: 'El primer argumento va al primer parámetro (nombre = "Eva") y el segundo al segundo (edad = 20).',
        },
        {
          type: 'check', id: 'm3p-orden', concept: 'parametros', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def presentar(nombre, edad):\n    print(nombre, "tiene", edad, "años")\n\npresentar(20, "Eva")', expectOutput: '20 tiene Eva años',
          options: [
            { text: '20 tiene Eva años', correct: true },
            { text: 'Eva tiene 20 años', why: 'Python no adivina qué valor es cuál: los asigna **por posición**. El primero (20) va a `nombre`.' },
            { text: 'Un error', why: 'No hay error: los parámetros aceptan cualquier tipo. Simplemente el resultado no tiene sentido.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'numero', title: 'El número de argumentos importa', concepts: ['parametros', 'errores'],
      blocks: [
        { type: 'p', text: 'Si la función tiene dos parámetros, cada llamada debe dar **dos** argumentos. Con uno de más o de menos, Python se detiene con un TypeError que dice exactamente qué falta:' },
        { type: 'code', run: true, code: 'def presentar(nombre, edad):\n    print(nombre, "tiene", edad, "años")\n\npresentar("Eva")' },
        {
          type: 'check', id: 'm3p-faltan', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'def area(base, altura):\n    print(base * altura)\n\narea(5)', expectError: 'TypeError',
          options: [
            { text: 'TypeError: falta el argumento altura', correct: true },
            { text: 'Muestra 5', why: 'Python no inventa valores: sin `altura` no puede multiplicar.' },
            { text: 'Muestra 25', why: 'Un argumento no se usa para dos parámetros: `altura` se queda sin valor.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'return', title: 'return: devolver un resultado', concepts: ['parametros', 'funciones'],
      blocks: [
        { type: 'p', text: 'Como viste con `round()` y `len()`, las funciones más útiles **devuelven** un valor. En las tuyas se hace con `return`: la llamada entera pasa a valer lo que devuelves, y puedes guardarlo, operar con él o pasarlo a otra función.' },
        { type: 'code', run: true, code: 'def area(base, altura):\n    return base * altura\n\ntotal = area(3, 4) + area(2, 5)\nprint(total)\nprint(area(10, 10) / 2)' },
        { type: 'callout', tone: 'info', title: 'return termina la función', text: 'En cuanto Python ejecuta un `return`, sale de la función con ese valor. Si una función no tiene `return`, devuelve `None`.' },
        {
          type: 'check', id: 'm3p-triple', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'def triple(x):\n    return x * 3\n\nprint(triple(2) + 1)', answer: '7',
          explain: '`triple(2)` vale 6, y 6 + 1 = 7.',
        },
        {
          type: 'check', id: 'm3p-print-return', concept: 'parametros', mode: 'choice',
          question: 'La función muestra en lugar de devolver. ¿Qué pasa?', code: 'def doble(x):\n    print(x * 2)\n\nr = doble(5)\nprint(r)', expectOutput: '10\nNone',
          options: [
            { text: 'Muestra 10 y después None', correct: true },
            { text: 'Muestra 10 dos veces', why: '`doble` **muestra** 10, pero no lo devuelve: sin `return`, la llamada vale `None` y eso es lo que se guarda en r.' },
          ],
          explain: 'Mostrar es para la persona que mira la pantalla; devolver es para que el programa siga usando el resultado.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'locales', title: 'Variables locales', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'Los parámetros y las variables que creas dentro de una función son **locales**: existen solo mientras la función se ejecuta, en su propio espacio de memoria. Al terminar, desaparecen.' },
        { type: 'p', text: 'Avanza paso a paso y observa el marco `precio_final()` en la memoria: aparece con la llamada y desaparece con el `return`.' },
        { type: 'trace', code: 'def precio_final(precio, descuento):\n    rebaja = precio * descuento / 100\n    return precio - rebaja\n\ntotal = precio_final(80, 25)\nprint(total)' },
        {
          type: 'check', id: 'm3p-local', concept: 'parametros', mode: 'choice',
          question: '¿Qué ocurre?', code: 'def precio_final(precio, descuento):\n    rebaja = precio * descuento / 100\n    return precio - rebaja\n\ntotal = precio_final(80, 25)\nprint(rebaja)', expectError: 'NameError',
          options: [
            { text: 'NameError: rebaja no existe fuera de la función', correct: true },
            { text: 'Muestra 20.0', why: '`rebaja` es local: desapareció al terminar la llamada. Si la necesitas fuera, devuélvela con `return`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mismo-nombre', title: 'Mismo nombre, variables distintas', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'Una variable local puede llamarse igual que una de fuera y **no** la toca: son dos variables distintas en espacios distintos.' },
        { type: 'code', run: true, code: 'x = 10\n\ndef cambiar():\n    x = 99\n    print("Dentro:", x)\n\ncambiar()\nprint("Fuera:", x)' },
        { type: 'callout', tone: 'tip', title: 'La regla para diseñar funciones', text: 'Los datos **entran** por los parámetros y el resultado **sale** con `return`. Así cada función es una pieza independiente que puedes probar y reutilizar sin miedo a romper el resto.' },
        {
          type: 'check', id: 'm3p-sombra', concept: 'parametros', mode: 'text',
          question: 'Predice:', code: 'total = 5\n\ndef sumar(a, b):\n    total = a + b\n    return total\n\nsumar(2, 3)\nprint(total)', answer: '5',
          explain: 'El `total` de dentro es local. Además, el resultado de `sumar(2, 3)` no se guarda en ningún sitio: el `total` de fuera sigue valiendo 5.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'par-predict' },
    { id: 'a2', activity: 'par-complete' },
    { id: 'a3', activity: 'par-fix' },
    { id: 'a4', activity: 'par-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Los **parámetros** son los nombres del `def`; los **argumentos**, los valores de la llamada. Se emparejan por posición.',
    'Con argumentos de más o de menos hay un TypeError.',
    '`return` devuelve un valor y termina la función; sin `return`, la función devuelve `None`.',
    'Mostrar (`print`) no es devolver: para seguir usando un resultado, devuélvelo.',
    'Parámetros y variables de una función son **locales**: solo existen durante la llamada y no tocan las de fuera.',
    'Diseño: los datos entran por parámetros y el resultado sale con `return`.',
  ],
};

export const ACTIVITIES_PARAMETROS = {
  'par-predict': {
    id: 'par-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Dos c distintas', difficulty: 2, xp: 10, concepts: ['parametros'],
    prompt: 'Hay una `c` dentro de la función y otra fuera. **¿Qué mostrará?**',
    code: 'def mezclar(a, b):\n    c = a + b\n    return c * 2\n\nc = 1\nr = mezclar(3, 4)\nprint(r, c)',
    expectedOutput: '14 1',
    options: [
      { text: '14 1', correct: true },
      { text: '14 7', concept: 'parametros', why: 'La `c` de dentro es local: crearla no cambia la `c` de fuera, que sigue valiendo 1.' },
      { text: '7 1', concept: 'parametros', why: 'La función devuelve `c * 2`: (3 + 4) × 2 = 14.' },
      { text: '14 14', concept: 'parametros', why: '`return` devuelve un valor, que se guarda en `r`; no cambia ninguna variable de fuera.' },
    ],
    explain: [
      '`c = 1` crea la c de fuera.',
      '`mezclar(3, 4)`: a = 3, b = 4, la c local vale 7 y se devuelve 14.',
      'Al terminar, la c local desaparece: la de fuera sigue valiendo 1.',
    ],
  },
  'par-complete': {
    id: 'par-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El ticket con IVA', difficulty: 2, xp: 15, concepts: ['parametros', 'funciones'],
    statement: 'Completa los huecos: `precio_con_iva` recibe un precio y **devuelve** el precio con un 21 % de IVA; `ticket` la usa para mostrar la línea del ticket.',
    expected: 'Libro 24.2 €',
    starter: 'def precio_con_iva(___):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(___(precio), 2), "€")\n\nticket("Libro", 20)',
    spec: {
      blanks: true,
      functions: [{ name: 'precio_con_iva', params: 1 }, { name: 'ticket', params: 2 }],
      cases: [
        { label: 'ticket("Libro", 20)', call: 'ticket("Libro", 20)', out_lines: ['Libro 24.2 €'] },
        { label: 'precio_con_iva(100)', call: 'print(precio_con_iva(100))', out_lines: ['121.0'] },
        { label: 'ticket("Mochila", 30)', call: 'ticket("Mochila", 30)', out_lines: ['Mochila 36.3 €'] },
      ],
      logic_msg: 'Revisa los huecos: el primero es el nombre del parámetro que usa el return; el segundo, la función que calcula el IVA.',
    },
    hints: [
      { level: 'Orientación', text: 'Primer hueco: ¿cómo se llama la variable que usa el `return`? Ese es el parámetro. Segundo hueco: ¿qué función calcula el precio con IVA?' },
      { level: 'Razonamiento', text: 'Dentro de `precio_con_iva` se usa `precio`, así que ese tiene que ser el nombre del parámetro. En `ticket`, para obtener el precio con IVA llamas a la otra función.' },
      { level: 'Pseudocódigo', text: 'definir precio_con_iva(precio): devolver precio × 1.21\ndefinir ticket(producto, precio): mostrar producto y precio_con_iva(precio) redondeado', pre: true },
      { level: 'Ayuda técnica', text: 'Cabecera: `def precio_con_iva(precio):`. Llamada: `precio_con_iva(precio)`.' },
    ],
    solution: {
      code: 'def precio_con_iva(precio):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(precio_con_iva(precio), 2), "€")\n\nticket("Libro", 20)',
      explanation: '`precio_con_iva` devuelve un número que `ticket` puede redondear y mostrar. Cada función hace una sola cosa: una calcula y la otra muestra.',
    },
    reference: ['def precio_con_iva(precio):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(precio_con_iva(precio), 2), "€")\n\nticket("Libro", 20)'],
    wrongs: [
      { code: 'def precio_con_iva(___):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(___(precio), 2), "€")', category: 'incompleto' },
      { code: 'def precio_con_iva(p):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(precio_con_iva(precio), 2), "€")', category: 'ejecucion' },
      { code: 'def precio_con_iva(precio):\n    return precio * 1.21\n\ndef ticket(producto, precio):\n    print(producto, round(precio, 2), "€")', category: 'logica' },
    ],
  },
  'par-fix': {
    id: 'par-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La media que no se deja sumar', difficulty: 2, xp: 20, concepts: ['parametros', 'errores'],
    statement: 'El programa quiere sumar un punto extra a la media de dos notas, pero falla con un TypeError. **Ejecútalo, lee el error y corrige la función** para que el programa principal funcione.',
    expected: 'Nota final: 8.5',
    starter: 'def media(a, b):\n    print((a + b) / 2)\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)',
    spec: {
      allow_short_names: ['a', 'b'],
      functions: [{ name: 'media', params: 2 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Nota final: 8.5'] },
        { label: 'media(4, 7)', call: 'print(media(4, 7))', out_lines: ['5.5'] },
      ],
      misconceptions: [
        { out_lines: ['7.5', 'Nota final: 8.5'], title: 'Sobra un print', msg: 'La función ya devuelve el valor, pero además lo sigue mostrando. Quita el `print`: mostrar es tarea del programa principal.' },
      ],
      rules: [{ type: 'must_call', name: 'media', title: 'Usa la función', msg: 'Calcula la nota con media(6, 9) en lugar de escribir el resultado.' }],
      logic_msg: 'La salida no coincide. ¿Qué devuelve media(6, 9)? Debería ser 7.5.',
    },
    hints: [
      { level: 'Orientación', text: 'El error dice que no se puede sumar `None` y un número. ¿De dónde sale ese `None`?' },
      { level: 'Razonamiento', text: '`media(6, 9)` muestra 7.5, pero ¿qué **devuelve**? Una función sin `return` devuelve `None`.' },
      { level: 'Pseudocódigo', text: 'definir media(a, b):\n    devolver (a + b) ÷ 2', pre: true },
      { level: 'Ayuda técnica', text: 'Cambia `print(...)` por `return (a + b) / 2`.' },
    ],
    solution: {
      code: 'def media(a, b):\n    return (a + b) / 2\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)',
      explanation: 'Con `print`, la función mostraba 7.5 pero devolvía `None`, y `None + 1` es un TypeError. Con `return`, `media(6, 9)` vale 7.5 y se le puede sumar 1.',
    },
    reference: ['def media(a, b):\n    return (a + b) / 2\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)'],
    wrongs: [
      { code: 'def media(a, b):\n    print((a + b) / 2)\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)', category: 'ejecucion' },
      { code: 'def media(a, b):\n    print((a + b) / 2)\n    return (a + b) / 2\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)', category: 'comprension' },
      { code: 'def media(a, b):\n    return a + b / 2\n\nnota_final = media(6, 9) + 1\nprint("Nota final:", nota_final)', category: 'logica' },
    ],
  },
  'par-build': {
    id: 'par-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El conversor de temperatura', difficulty: 3, xp: 30, concepts: ['parametros', 'descomponer'],
    unlock: { any: ['par-predict', 'par-complete', 'par-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define una función `a_fahrenheit(celsius)` que reciba una temperatura en grados Celsius y **devuelva** su equivalente en Fahrenheit:\n\n`F = C × 9 / 5 + 32`\n\nEjemplos: `a_fahrenheit(100)` → `212.0` y `a_fahrenheit(0)` → `32.0`.\n\nLunaPy probará tu función con varias temperaturas; la función no debe mostrar nada, solo devolver.',
    plan: [
      {
        q: '¿Cuántos parámetros necesita la función?',
        options: [
          { text: 'Uno: la temperatura en Celsius', correct: true },
          { text: 'Dos: Celsius y Fahrenheit', why: 'Fahrenheit es el **resultado**: se devuelve, no entra como dato.' },
        ],
      },
      {
        q: '¿Cómo entrega la función el resultado?',
        options: [
          { text: 'Con return', correct: true },
          { text: 'Con print', why: 'Con `print` la temperatura se vería en pantalla, pero el programa no podría usarla (la llamada valdría `None`).' },
        ],
      },
    ],
    planScaffold: '# Definir a_fahrenheit con un parámetro\n#     calcular y devolver el resultado\n\n# Prueba: print(a_fahrenheit(100))\n',
    starter: '',
    spec: {
      functions: [{ name: 'a_fahrenheit', params: 1 }],
      cases: [
        { label: 'a_fahrenheit(100)', call: 'print(a_fahrenheit(100))', out_lines: ['212.0'] },
        { label: 'a_fahrenheit(0)', call: 'print(a_fahrenheit(0))', out_lines: ['32.0'] },
        { label: 'a_fahrenheit(-40)', call: 'print(a_fahrenheit(-40))', out_lines: ['-40.0'] },
        { label: 'a_fahrenheit(36.6)', call: 'print(a_fahrenheit(36.6))', out_lines: ['97.88'] },
      ],
      misconceptions: [
        { out_lines: ['212.0', 'None'], title: 'Muestra, pero no devuelve', msg: 'Tu función usa `print`: la temperatura se ve, pero la llamada vale `None`. Usa `return`.' },
        { out_lines: ['237.6'], title: 'Revisa el orden', msg: 'Has sumado 32 antes de multiplicar. La fórmula es C × 9 / 5 y **después** + 32.' },
        { out_lines: ['2.6486486486486487'], title: 'Revisa los paréntesis', msg: 'Has dividido entre (5 + 32). La fórmula es C × 9 / 5 + 32, sin paréntesis.' },
      ],
      logic_msg: 'La función no devuelve el valor esperado. Pruébala tú con print(a_fahrenheit(100)): debería dar 212.0.',
    },
    hints: [
      { level: 'Orientación', text: 'Una función con un parámetro que **devuelve** un número. No hace falta `input()` ni `print()` dentro.' },
      { level: 'Razonamiento', text: 'Traduce la fórmula directamente: el parámetro hace de C. Recuerda que multiplicar y dividir van antes que sumar.' },
      { level: 'Pseudocódigo', text: 'definir a_fahrenheit(celsius):\n    devolver celsius × 9 ÷ 5 + 32', pre: true },
      { level: 'Ayuda técnica', text: '`def a_fahrenheit(celsius):` y en el cuerpo `return celsius * 9 / 5 + 32`. Para probarla: `print(a_fahrenheit(100))`.' },
    ],
    solution: {
      code: 'def a_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(a_fahrenheit(100))',
      explanation: 'El parámetro recibe la temperatura y `return` entrega el resultado. Como devuelve en lugar de mostrar, puedes usarla en cualquier expresión: `a_fahrenheit(20) > 60`, una tabla, un cálculo…',
    },
    reference: [
      'def a_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32',
      'def a_fahrenheit(c):\n    fahrenheit = c * 1.8 + 32\n    return fahrenheit\n\nprint(a_fahrenheit(0))',
    ],
    wrongs: [
      { code: 'def a_fahrenheit(celsius):\n    print(celsius * 9 / 5 + 32)', category: 'comprension' },
      { code: 'def a_fahrenheit(celsius):\n    return (celsius + 32) * 9 / 5', category: 'comprension' },
      { code: 'def a_fahrenheit():\n    return 212.0', category: 'comprension' },
      { code: 'def a_fahrenheit(celsius):\n    return 212.0', category: 'logica' },
    ],
  },
};
