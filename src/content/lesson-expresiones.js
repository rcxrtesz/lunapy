// Lección 2.2 · Expresiones y operadores aritméticos. Contenido original, alineado
// con el cap. 2 de «Piensa en Python» (expresiones y sentencias, orden de las
// operaciones, operaciones con cadenas) y PE1 módulo 2 (operadores abreviados).
// La 1.2 ya presentó los operadores con números sueltos; aquí se trabaja con
// variables: cómo evalúa Python, qué tipo sale y patrones útiles con // y %.

const TOPIC = 'Expresiones';

export const LESSON_EXPRESIONES = {
  id: 'expresiones',
  moduleId: 'm2',
  code: '2.2',
  title: 'Expresiones y operadores aritméticos',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Distinguir una expresión (produce un valor) de una sentencia (hace algo)',
    'Predecir cómo evalúa Python una expresión: prioridad y dirección',
    'Saber de qué tipo será el resultado de una operación',
    'Modificar variables con += , -= , *= y compañía',
    'Usar // y % para separar unidades y cifras',
  ],
  prerequisites: ['Lección 2.1 «Variables»', 'Lección 1.2 «Python como calculadora» (recomendada)'],
  teaser: 'Hoy aprendes a leer una expresión como lo hace Python: en qué orden calcula, qué tipo obtiene y cómo modificar variables con atajos.',
  celebration: 'Ya lees las expresiones como Python: sabes en qué orden calcula, qué tipo obtiene y cómo sacar partido de // y %.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'expresion', title: 'Expresiones y sentencias', concepts: ['expresiones'],
      blocks: [
        { type: 'p', text: 'Una **expresión** es una combinación de valores, variables y operadores que Python puede **calcular**: el resultado es un valor. `ancho * alto`, `precio + 2` o incluso `edad` (una variable sola) son expresiones.' },
        { type: 'p', text: 'Una **sentencia** es una instrucción que **hace algo**: guardar un valor, mostrarlo… `area = ancho * alto` es una sentencia de asignación; su parte derecha es una expresión.' },
        { type: 'code', run: true, code: 'ancho = 4\nalto = 3\narea = ancho * alto\nprint(area)\nprint(ancho * alto + 2)', caption: 'Para calcular una expresión, Python sustituye cada variable por su valor: `ancho * alto` → `4 * 3` → `12`.' },
        {
          type: 'classify', id: 'm2e-expresion', concept: 'expresiones',
          question: '¿Es una expresión, es decir, algo que se calcula y da un valor?',
          items: [
            { text: 'ancho * alto', valid: true, why: 'Se calcula y da un valor: 12 con los datos de arriba.' },
            { text: 'total = 10', valid: false, why: 'Es una sentencia de asignación: guarda un valor. La expresión es solo la parte derecha, `10`.' },
            { text: 'edad', valid: true, why: 'Una variable sola también es una expresión: su valor es el que tenga guardado.' },
            { text: '"Hola, " + nombre', valid: true, why: 'Une dos textos y da un texto nuevo: es una expresión.' },
            { text: 'x = x + 1', valid: false, why: 'Es una sentencia: calcula `x + 1` (la expresión) y guarda el resultado en `x`.' },
          ],
        },
        {
          type: 'check', id: 'm2e-sustituir', concept: 'expresiones', mode: 'text',
          question: 'Predice:', code: 'a = 3\nb = a * 2 + 1\nprint(b - a)', answer: '4',
          explain: '`b` vale 3 × 2 + 1 = 7, y `b - a` es 7 − 3 = 4.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'evaluar', title: 'En qué orden calcula Python', concepts: ['operadores', 'expresiones'],
      blocks: [
        { type: 'p', text: 'En la lección 1.2 viste que la multiplicación va antes que la suma. Esta es la tabla completa, de **más** a **menos** prioridad:' },
        {
          type: 'five', items: {
            '1 · Paréntesis': '`( )`: lo de dentro se calcula primero.',
            '2 · Potencia': '`**`',
            '3 · Signo': '`-x`: el signo menos delante de un valor.',
            '4 · Multiplicar y dividir': '`*`  `/`  `//`  `%`',
            '5 · Sumar y restar': '`+`  `-`',
          },
        },
        { type: 'p', text: 'Si dos operadores tienen la **misma prioridad**, Python calcula de **izquierda a derecha**. La excepción es `**`, que va de derecha a izquierda.' },
        { type: 'code', run: true, code: 'print(8 / 2 * 4)    # (8 / 2) * 4\nprint(2 ** 3 ** 2)  # 2 ** (3 ** 2)\nprint(-3 ** 2)      # -(3 ** 2)\nprint((-3) ** 2)' },
        { type: 'callout', tone: 'tip', title: 'Ante la duda, paréntesis', text: 'No hace falta memorizar la tabla entera. Si una expresión te hace dudar, añade paréntesis: no cambian nada si sobran y hacen el código más fácil de leer.' },
        {
          type: 'check', id: 'm2e-izq-der', concept: 'operadores', mode: 'text',
          question: 'Predice:', code: 'print(12 / 2 * 3)', answer: '18.0',
          explain: '`/` y `*` tienen la misma prioridad: de izquierda a derecha. 12 / 2 = 6.0 y 6.0 × 3 = 18.0.',
        },
        {
          type: 'check', id: 'm2e-signo', concept: 'operadores', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print(-2 ** 2)', expectOutput: '-4',
          options: [
            { text: '-4', correct: true },
            { text: '4', why: 'La potencia tiene más prioridad que el signo: Python calcula 2 ** 2 = 4 y después le pone el signo menos. Para elevar −2 al cuadrado: `(-2) ** 2`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'tipo-resultado', title: '¿De qué tipo es el resultado?', concepts: ['tipos', 'operadores'],
      blocks: [
        { type: 'p', text: 'El tipo del resultado depende de los tipos que operas. Tres reglas lo cubren casi todo:' },
        {
          type: 'five', items: {
            'Entero con entero': 'Da un `int`… salvo con `/`, que siempre da `float`.',
            'Si hay un decimal': 'En cuanto uno de los dos es `float`, el resultado es `float`.',
            '// y % con decimales': 'También dan `float`: `7.5 // 2` es `3.0`.',
          },
        },
        { type: 'code', run: true, code: 'print(6 * 2, type(6 * 2))\nprint(6 * 2.0, type(6 * 2.0))\nprint(6 / 2, type(6 / 2))\nprint(7.5 // 2, type(7.5 // 2))' },
        {
          type: 'check', id: 'm2e-mezcla', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'precio = 4\nunidades = 2.5\nprint(precio * unidades)', answer: '10.0',
          explain: 'Uno de los dos es `float` (2.5), así que el resultado también lo es: 10.0.',
        },
        {
          type: 'check', id: 'm2e-floordiv-float', concept: 'tipos', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print(9.0 // 2)', expectOutput: '4.0',
          options: [
            { text: '4.0', correct: true },
            { text: '4', why: '`//` quita los decimales del resultado, pero si operas con un `float` el resultado sigue siendo `float`: 4.0.' },
            { text: '4.5', why: 'Eso daría `/`. `//` se queda con la parte entera: 4.0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'compuesta', title: 'Atajos: +=, -=, *= y compañía', concepts: ['reasignacion', 'operadores'],
      blocks: [
        { type: 'p', text: 'Modificar una variable a partir de su propio valor es tan habitual que Python tiene un **atajo**: `puntos += 10` significa exactamente lo mismo que `puntos = puntos + 10`.' },
        {
          type: 'five', items: {
            'x += 3': 'x = x + 3',
            'x -= 3': 'x = x - 3',
            'x *= 3': 'x = x * 3',
            'x /= 3': 'x = x / 3',
            'x //= 3 · x %= 3 · x **= 3': 'Igual con //, % y **',
          },
        },
        { type: 'p', text: 'Avanza línea a línea y observa cómo cambia `saldo` en la memoria:' },
        { type: 'trace', code: 'saldo = 100\nsaldo -= 30\nsaldo *= 2\nsaldo += 5\nprint(saldo)' },
        { type: 'callout', tone: 'info', title: 'Lo usarás muchísimo', text: 'Sumar puntos, acumular un total o contar cuántas veces pasa algo: `contador += 1` será uno de tus mejores amigos cuando lleguen los bucles.' },
        {
          type: 'check', id: 'm2e-compuesta', concept: 'reasignacion', mode: 'text',
          question: 'Predice:', code: 'x = 10\nx //= 3\nx **= 2\nprint(x)', answer: '9',
          explain: '10 // 3 = 3 y después 3 ** 2 = 9.',
        },
        {
          type: 'check', id: 'm2e-compuesta-error', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre al ejecutar este programa?', code: 'total += 5\nprint(total)', expectError: 'NameError',
          options: [
            { text: 'NameError: total no existe', correct: true },
            { text: 'Muestra 5', why: '`total += 5` es `total = total + 5`: para calcularlo, Python necesita el valor actual de `total`, y todavía no tiene ninguno.' },
          ],
          explain: 'Antes de usar `+=`, la variable tiene que existir: `total = 0` y después `total += 5`.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'texto', title: 'Expresiones con texto', concepts: ['tipos', 'expresiones'],
      blocks: [
        { type: 'p', text: 'Con textos solo funcionan dos operadores: `+` **une** dos textos y `*` **repite** un texto un número entero de veces. Los atajos también sirven: `mensaje += "!"`.' },
        { type: 'code', run: true, code: 'nombre = "Ana"\nlinea = "=" * 20\nsaludo = "Hola, " + nombre\nsaludo += "!"\nprint(linea)\nprint(saludo)\nprint(linea)' },
        {
          type: 'check', id: 'm2e-texto', concept: 'tipos', mode: 'text',
          question: 'Predice:', code: 'risa = "ja" * 2\nprint(risa + "!" * 3)', answer: 'jaja!!!',
          explain: '`"ja" * 2` es "jaja" y `"!" * 3` es "!!!". Recuerda: `*` va antes que `+`.',
        },
        {
          type: 'check', id: 'm2e-texto-resta', concept: 'tipos', mode: 'choice',
          question: '¿Qué ocurre?', code: 'print("10" - "3")', expectError: 'TypeError',
          options: [
            { text: 'TypeError: no se pueden restar textos', correct: true },
            { text: 'Muestra 7', why: 'Con comillas son textos, no números: Python no los convierte por su cuenta. Con `int("10") - int("3")` sí daría 7.' },
            { text: 'Muestra 1', why: 'Los textos no se pueden restar: solo admiten `+` y `*`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'patrones', title: 'Trucos con // y %', concepts: ['operadores', 'descomponer'],
      blocks: [
        { type: 'p', text: '`//` y `%` parecen poca cosa, pero resuelven muchos problemas reales. Estos patrones aparecen una y otra vez:' },
        {
          type: 'five', items: {
            'Separar unidades': '`dias // 7` semanas completas y `dias % 7` días sueltos.',
            '¿Par o impar?': '`n % 2` vale 0 si n es par y 1 si es impar.',
            'Última cifra': '`n % 10`: 4827 % 10 → 7.',
            'Quitar la última cifra': '`n // 10`: 4827 // 10 → 482.',
          },
        },
        { type: 'code', run: true, code: 'n = 4827\nprint(n % 10)       # última cifra\nprint(n // 10)      # sin la última cifra\nprint(n // 10 % 10) # penúltima cifra\nprint(n % 2)        # 1: es impar', caption: 'Cambia el número y vuelve a ejecutar. ¿Cómo obtendrías la primera cifra?' },
        {
          type: 'check', id: 'm2e-semanas', concept: 'operadores', mode: 'text',
          question: 'Predice: ¿cuántas semanas y días sueltos tiene un año?', code: 'dias = 365\nprint(dias // 7, dias % 7)', answer: '52 1',
          explain: '7 cabe 52 veces en 365 (364 días) y sobra 1.',
        },
        {
          type: 'check', id: 'm2e-cifra', concept: 'operadores', mode: 'text',
          question: 'Predice:', code: 'n = 593\nprint(n // 10 % 10)', answer: '9',
          explain: '593 // 10 = 59 y 59 % 10 = 9: la cifra de las decenas.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'Cuando la expresión falla (o calcula mal)', concepts: ['errores', 'operadores'],
      blocks: [
        { type: 'p', text: 'Dos errores avisan: dividir entre cero y mezclar tipos. El tercero no avisa, y por eso es el más peligroso.' },
        { type: 'code', run: true, title: 'Dividir entre cero', code: 'personas = 0\nprint(100 / personas)' },
        { type: 'code', run: true, title: 'Mezclar texto y número', code: 'edad = "17"\nprint(edad + 1)' },
        { type: 'code', run: true, title: 'Error de lógica: la media mal calculada', code: 'a = 6\nb = 8\nmedia = a + b / 2\nprint(media)', caption: 'No hay mensaje de error, pero la media de 6 y 8 es 7, no 10.0. Python ha dividido solo `b` entre 2.' },
        { type: 'callout', tone: 'warn', title: 'Comprueba con un ejemplo que sepas resolver', text: 'Contra los errores de lógica, la mejor defensa es probar con datos cuyo resultado conoces de antemano. Si no coincide, revisa la prioridad de los operadores.' },
        {
          type: 'check', id: 'm2e-media', concept: 'operadores', mode: 'choice',
          question: '¿Qué expresión calcula bien la media de `a` y `b`?',
          options: [
            { text: '`(a + b) / 2`', correct: true },
            { text: '`a + b / 2`', why: 'La división va antes que la suma: solo divides `b`.' },
            { text: '`a + b // 2`', why: 'Además de dividir solo `b`, `//` perdería los decimales.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'exp-predict' },
    { id: 'a2', activity: 'exp-complete' },
    { id: 'a3', activity: 'exp-fix' },
    { id: 'a4', activity: 'exp-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una **expresión** se calcula y da un valor; una **sentencia** hace algo (asignar, mostrar…).',
    'Prioridad: paréntesis, `**`, signo, `* / // %` y `+ -`. Con la misma prioridad, de izquierda a derecha (salvo `**`).',
    'Entero con entero da `int` (salvo `/`); si hay un `float`, el resultado es `float`.',
    '`x += 3` es `x = x + 3`; igual con `-=`, `*=`, `/=`, `//=`, `%=` y `**=`. La variable tiene que existir antes.',
    'Con textos: `+` une y `*` repite.',
    '`//` y `%` separan unidades (semanas y días) y cifras (`n % 10`, `n // 10`).',
    'Un error de lógica no avisa: comprueba con ejemplos cuyo resultado conoces.',
  ],
};

export const ACTIVITIES_EXPRESIONES = {
  'exp-predict': {
    id: 'exp-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El monedero', difficulty: 1, xp: 10, concepts: ['reasignacion', 'operadores'],
    prompt: 'Sigue el valor de `saldo` línea a línea. **¿Qué mostrará?**',
    code: 'saldo = 20\nsaldo += 15\nsaldo -= 8\nsaldo *= 2\nsobres = saldo // 5\nprint(saldo, sobres)',
    expectedOutput: '54 10',
    options: [
      { text: '54 10', correct: true },
      { text: '54 10.8', concept: 'operadores', why: '`//` da la parte entera: 54 // 5 es 10. Con `/` sí obtendrías 10.8.' },
      { text: '2 0', concept: 'reasignacion', why: '`saldo *= 2` no guarda un 2: multiplica el valor actual por 2. Es `saldo = saldo * 2`.' },
      { text: '20 4', concept: 'reasignacion', why: 'Los atajos `+=`, `-=` y `*=` sí cambian la variable: cada línea parte del valor que dejó la anterior.' },
    ],
    explain: [
      '`saldo = 20`.',
      '`saldo += 15` → 35, y `saldo -= 8` → 27.',
      '`saldo *= 2` → 54.',
      '`sobres = 54 // 5` → 10: el 5 cabe 10 veces entero en el 54.',
    ],
  },
  'exp-complete': {
    id: 'exp-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'El cronómetro', difficulty: 2, xp: 15, concepts: ['operadores', 'descomponer'],
    statement: 'Un cronómetro marca **3725 segundos**. Sustituye cada `___` por el operador adecuado para mostrarlo en horas, minutos y segundos:',
    expected: '1 h 2 min 5 s',
    note: 'Una hora son 3600 segundos y un minuto, 60. El programa debe funcionar con cualquier valor de `total`.',
    starter: 'total = 3725\nhoras = total ___ 3600\nresto = total ___ 3600\nminutos = resto ___ 60\nsegundos = resto ___ 60\nprint(horas, "h", minutos, "min", segundos, "s")',
    spec: {
      skip_tips: ['repeated_numbers'],
      blanks: true,
      cases: [{ label: 'Salida esperada', out_lines: ['1 h 2 min 5 s'] }],
      variants: [{
        label: 'total cambiado a 7384', set: { total: 7384 }, out_lines: ['2 h 3 min 4 s'],
        msg: 'Con 3725 sale bien, pero con otro tiempo no: revisa qué operador da las unidades completas (//) y cuál lo que sobra (%).',
      }],
      misconceptions: [
        { out_lines: ['125 h 0 min 1 s'], title: 'Has cambiado el orden', msg: 'Las **horas completas** salen con `//` y los segundos que **sobran**, con `%`. Los has intercambiado.' },
        { out_contains: '1.034', title: 'Horas con decimales', msg: 'Con `/` obtienes horas con decimales. Para las horas **completas** necesitas `//`.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['FloorDiv', 'Mod'], title: 'Calcúlalo con operadores', msg: 'Usa // y % para separar las unidades.' }],
      logic_msg: 'Compara tu salida con la esperada. En cada pareja de huecos, uno da las unidades completas y el otro lo que sobra.',
    },
    hints: [
      { level: 'Orientación', text: 'Hay dos parejas de huecos. En cada una, el primero calcula unidades **completas** y el segundo lo que **sobra**.' },
      { level: 'Razonamiento', text: '¿Cuántas horas completas caben en 3725 segundos? ¿Cuántos segundos sobran después? Con lo que sobra, repite la idea con los minutos.' },
      { level: 'Pseudocódigo', text: 'horas ← total entre 3600, sin decimales\nresto ← lo que sobra al dividir total entre 3600\nminutos ← resto entre 60, sin decimales\nsegundos ← lo que sobra al dividir resto entre 60', pre: true },
      { level: 'Ayuda técnica', text: '`//` da las unidades completas y `%` lo que sobra: `3725 // 3600` → 1 y `3725 % 3600` → 125.' },
    ],
    solution: {
      code: 'total = 3725\nhoras = total // 3600\nresto = total % 3600\nminutos = resto // 60\nsegundos = resto % 60\nprint(horas, "h", minutos, "min", segundos, "s")',
      explanation: '3725 // 3600 = 1 hora y sobran 125 s. De esos 125, 125 // 60 = 2 minutos y sobran 125 % 60 = 5 segundos. Es el patrón de «separar unidades»: primero las grandes, después lo que sobra.',
    },
    reference: ['total = 3725\nhoras = total // 3600\nresto = total % 3600\nminutos = resto // 60\nsegundos = resto % 60\nprint(horas, "h", minutos, "min", segundos, "s")'],
    wrongs: [
      { code: 'total = 3725\nhoras = total ___ 3600\nresto = total ___ 3600\nminutos = resto ___ 60\nsegundos = resto ___ 60\nprint(horas, "h", minutos, "min", segundos, "s")', category: 'incompleto' },
      { code: 'total = 3725\nhoras = total % 3600\nresto = total // 3600\nminutos = resto // 60\nsegundos = resto % 60\nprint(horas, "h", minutos, "min", segundos, "s")', category: 'comprension' },
      { code: 'total = 3725\nhoras = total // 3600\nresto = total % 3600\nminutos = 2\nsegundos = resto % 60\nprint(horas, "h", minutos, "min", segundos, "s")', category: 'logica' },
    ],
  },
  'exp-fix': {
    id: 'exp-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La media que no cuadra', difficulty: 2, xp: 20, concepts: ['operadores', 'errores'],
    statement: 'Este programa calcula la media de tres notas. **No da ningún error**, pero el resultado es imposible: ¡una media de 15.67 con notas sobre 10! Encuentra el fallo y corrígelo.',
    expected: 'Media: 7.0',
    starter: 'nota1 = 6\nnota2 = 7\nnota3 = 8\nmedia = nota1 + nota2 + nota3 / 3\nprint("Media:", media)',
    spec: {
      cases: [{ label: 'Notas 6, 7 y 8', out_lines: ['Media: 7.0'] }],
      variants: [{
        label: 'Notas cambiadas a 9, 5 y 5', set: { nota1: 9, nota2: 5, nota3: 5 }, out_lines: ['Media: 6.333333333333333'],
        msg: 'Con 6, 7 y 8 sale bien, pero con 9, 5 y 5 no: la media debería ser 6.33… Calcula a partir de las variables y divide con `/` (con `//` se pierden los decimales).',
      }],
      misconceptions: [
        { out_lines: ['Media: 15.666666666666666'], category: 'logica', title: 'La suma no va primero', msg: 'Python divide antes de sumar: solo `nota3` se divide entre 3. ¿Cómo haces que la suma vaya primero?' },
      ],
      rules: [{ type: 'must_load', names: ['nota1', 'nota2', 'nota3'], title: 'Usa las variables', msg: 'Calcula la media a partir de nota1, nota2 y nota3, no con los números escritos a mano.' }],
      logic_msg: 'La salida no coincide. Comprueba el cálculo a mano: (6 + 7 + 8) / 3 = 7.0.',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta el programa: no hay mensaje de error, es un **error de lógica**. Calcula a mano qué debería salir (la media de 6, 7 y 8) y compáralo.' },
      { level: 'Razonamiento', text: '¿En qué orden hace Python las operaciones de la línea 4? ¿Qué se divide entre 3 realmente?' },
      { level: 'Pseudocódigo', text: 'media ← (suma de las tres notas) ÷ 3', pre: true },
      { level: 'Ayuda técnica', text: 'Los paréntesis obligan a calcular primero lo que tienen dentro: `(a + b + c) / 3`.' },
    ],
    solution: {
      code: 'nota1 = 6\nnota2 = 7\nnota3 = 8\nmedia = (nota1 + nota2 + nota3) / 3\nprint("Media:", media)',
      explanation: 'Sin paréntesis, Python calcula `nota3 / 3` primero (2.67) y lo suma a 6 y 7. Con `(nota1 + nota2 + nota3) / 3` la suma va primero: 21 / 3 = 7.0.',
    },
    reference: [
      'nota1 = 6\nnota2 = 7\nnota3 = 8\nmedia = (nota1 + nota2 + nota3) / 3\nprint("Media:", media)',
      'nota1 = 6\nnota2 = 7\nnota3 = 8\nsuma = nota1 + nota2 + nota3\nmedia = suma / 3\nprint("Media:", media)',
    ],
    wrongs: [
      { code: 'nota1 = 6\nnota2 = 7\nnota3 = 8\nmedia = nota1 + nota2 + nota3 / 3\nprint("Media:", media)', category: 'logica' },
      { code: 'nota1 = 6\nnota2 = 7\nnota3 = 8\nmedia = (nota1 + nota2 + nota3) // 3\nprint("Media:", media)', category: 'logica' },
      { code: 'nota1 = 6\nnota2 = 7\nnota3 = 8\nprint("Media:", 7.0)', category: 'logica' },
    ],
  },
  'exp-build': {
    id: 'exp-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La suma de las cifras', difficulty: 3, xp: 30, concepts: ['operadores', 'input', 'descomponer'],
    unlock: { any: ['exp-predict', 'exp-complete', 'exp-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Escribe un programa que pida un número entero de **tres cifras** y muestre la **suma de sus cifras**.\n\nEjemplo: `472` → 4 + 7 + 2 = `13`.\n\nMuestra la suma en la **última línea** (puedes acompañarla de texto).',
    plan: [
      {
        q: '¿Qué necesitas obtener del número antes de sumar?', multi: true,
        options: [
          { text: 'La cifra de las centenas (4)', correct: true },
          { text: 'La cifra de las decenas (7)', correct: true },
          { text: 'La cifra de las unidades (2)', correct: true },
          { text: 'El número al revés (274)', why: 'No hace falta: para sumar, el orden de las cifras da igual.' },
        ],
      },
      {
        q: 'Con n = 472, ¿cómo obtienes la cifra de las unidades?',
        options: [
          { text: 'n % 10', correct: true },
          { text: 'n // 10', why: 'Eso **quita** la última cifra: da 47.' },
          { text: 'n / 10', why: 'Eso da 47.2: no separa la cifra.' },
        ],
      },
      {
        q: '¿Y la de las decenas?',
        options: [
          { text: 'n // 10 % 10', correct: true },
          { text: 'n // 10', why: 'Da 47: todavía queda la cifra de las centenas delante. Falta quedarte con la última de ese resultado.' },
          { text: 'n % 100', why: 'Da 72: las dos últimas cifras juntas.' },
        ],
      },
    ],
    planScaffold: '# 1. Pedir el número (y convertirlo en entero)\n\n# 2. Separar las tres cifras\n\n# 3. Sumarlas y mostrar el resultado\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['n'], // la lección usa n, como en matemáticas
      cases: [
        { label: '472', stdin: ['472'], args: { n: 472 } },
        { label: 'Con un cero en medio: 905', stdin: ['905'], args: { n: 905 } },
        { label: 'Caso límite: 100', stdin: ['100'], args: { n: 100 } },
        { label: 'Caso límite: 999', stdin: ['999'], args: { n: 999 } },
      ],
      expect_last_number: 'n // 100 + n // 10 % 10 + n % 10',
      hidden: { count: 2, args: { n: [100, 999, 0] }, stdin: ['n'] },
      tolerance: 0,
      misconceptions: [
        { expr: 'n // 100 + n // 10 + n % 10', title: 'Revisa la cifra del medio', msg: '`n // 10` da 47 con el número 472: falta quedarte solo con su última cifra con `% 10`.' },
        { expr: 'n // 100 + n % 10', title: 'Falta una cifra', msg: 'Has sumado la primera y la última cifra, pero falta la del medio.' },
        { expr: 'n % 10', title: 'Solo la última cifra', msg: 'Has obtenido la cifra de las unidades. Faltan las otras dos.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir el número', msg: 'Usa input() para pedir el número y conviértelo con int().' }],
    },
    hints: [
      { level: 'Orientación', text: 'Un dato de entrada (el número) y un resultado (la suma de sus tres cifras).' },
      { level: 'Razonamiento', text: 'Separa el problema: primero consigue cada cifra en su propia variable, ejecuta y comprueba que salen bien; después súmalas.' },
      { level: 'Pseudocódigo', text: 'n ← pedir número entero\ncentenas ← n ÷ 100, sin decimales\ndecenas ← (n ÷ 10, sin decimales), su última cifra\nunidades ← última cifra de n\nmostrar centenas + decenas + unidades', pre: true },
      { level: 'Ayuda técnica', text: '`int(input())` lee un entero. Última cifra: `n % 10`. Quitar la última cifra: `n // 10`. Con 472: `472 // 100` → 4, `472 // 10 % 10` → 7, `472 % 10` → 2.' },
    ],
    solution: {
      code: 'n = int(input("Número de tres cifras: "))\ncentenas = n // 100\ndecenas = n // 10 % 10\nunidades = n % 10\nprint("Suma de las cifras:", centenas + decenas + unidades)',
      explanation: '`// 100` deja solo la primera cifra; `// 10 % 10` quita la última y se queda con la nueva última (la del medio); `% 10` da la última. Probarlo con 905 y 100 confirma que los ceros también funcionan.',
    },
    reference: [
      'n = int(input())\nprint(n // 100 + n // 10 % 10 + n % 10)',
      'numero = int(input("Número: "))\nunidades = numero % 10\nnumero //= 10\ndecenas = numero % 10\ncentenas = numero // 10\nprint("Suma:", centenas + decenas + unidades)',
    ],
    wrongs: [
      { code: 'n = int(input())\nprint(n // 100 + n // 10 + n % 10)', category: 'comprension' },
      { code: 'n = input()\nprint(n // 100 + n // 10 % 10 + n % 10)', category: 'ejecucion' },
      { code: 'print(13)', category: 'logica' },
    ],
  },
};
