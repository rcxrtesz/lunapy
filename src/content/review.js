// Banco de preguntas breves para las sesiones de repaso espaciado.
// La salida esperada de cada fragmento se verifica con Python real en tests.html.

export const REVIEW_ITEMS = [
  // ---- Módulo 1 · algoritmos y operadores
  {
    id: 'r-algoritmo', concept: 'algoritmo', mode: 'choice',
    question: '¿Qué hace que una instrucción sirva para un algoritmo?',
    options: [{ text: 'Que sea precisa y no admita dudas', correct: true }, { text: 'Que sea corta' }, { text: 'Que esté escrita en inglés' }],
    explain: 'Un ordenador no interpreta: necesita instrucciones exactas, como «repite 3 veces» en lugar de «unas cuantas veces».',
  },
  {
    id: 'r-comentario', concept: 'algoritmo', mode: 'text', code: '# print("Hola")\nprint("Adiós")', answer: 'Adiós',
    question: '¿Qué muestra este programa?',
    explain: 'La primera línea es un comentario: Python la ignora.',
  },
  {
    id: 'r-orden', concept: 'algoritmo', mode: 'choice',
    question: 'En un algoritmo para hacer un bocadillo, ¿qué paso no puede ir antes de «abrir el pan»?',
    options: [{ text: 'Poner el queso dentro', correct: true }, { text: 'Sacar el queso de la nevera' }, { text: 'Lavarse las manos' }],
    explain: 'Poner el queso dentro depende de que el pan esté abierto; los otros pasos son independientes.',
  },
  {
    id: 'r-div-entera', concept: 'operadores', mode: 'text', code: 'print(20 // 6)', answer: '3',
    question: '¿Qué muestra este programa?',
    explain: '`//` da la parte entera: el 6 cabe 3 veces en el 20.',
  },
  {
    id: 'r-resto', concept: 'operadores', mode: 'text', code: 'print(20 % 6)', answer: '2',
    question: '¿Qué muestra este programa?',
    explain: '20 = 6 × 3 + 2: sobran 2.',
  },
  {
    id: 'r-division', concept: 'operadores', mode: 'text', code: 'print(9 / 3)', answer: '3.0',
    question: '¿Qué muestra este programa?',
    explain: '`/` siempre da un decimal, aunque la división sea exacta.',
  },
  {
    id: 'r-prioridad', concept: 'operadores', mode: 'text', code: 'print(2 + 2 * 5)', answer: '12',
    question: '¿Qué muestra este programa?',
    explain: 'Primero la multiplicación (2 × 5 = 10) y después la suma: 12.',
  },
  // ---- Módulo 2 · expresiones
  {
    id: 'r-compuesta', concept: 'reasignacion', mode: 'text', code: 'x = 5\nx += 2\nx *= 3\nprint(x)', answer: '21',
    question: '¿Qué muestra este programa?',
    explain: '5 + 2 = 7 y 7 × 3 = 21. `x += 2` es lo mismo que `x = x + 2`.',
  },
  {
    id: 'r-signo-potencia', concept: 'expresiones', mode: 'text', code: 'print(-2 ** 2)', answer: '-4',
    question: '¿Qué muestra este programa?',
    explain: 'La potencia va antes que el signo: -(2 ** 2) = -4.',
  },
  {
    id: 'r-izq-der', concept: 'expresiones', mode: 'text', code: 'print(20 / 4 * 2)', answer: '10.0',
    question: '¿Qué muestra este programa?',
    explain: 'Misma prioridad, de izquierda a derecha: 20 / 4 = 5.0 y 5.0 × 2 = 10.0.',
  },
  {
    id: 'r-tipo-mezcla', concept: 'tipos', mode: 'text', code: 'print(4 * 2.5)', answer: '10.0',
    question: '¿Qué muestra este programa?',
    explain: 'Si uno de los dos es float, el resultado también: 10.0.',
  },
  {
    id: 'r-ultima-cifra', concept: 'operadores', mode: 'text', code: 'n = 538\nprint(n % 10, n // 10)', answer: '8 53',
    question: '¿Qué muestra este programa?',
    explain: '`% 10` da la última cifra (8) y `// 10` la quita (53).',
  },
  {
    id: 'r-media', concept: 'expresiones', mode: 'choice',
    question: '¿Qué expresión calcula la media de a, b y c?',
    options: [{ text: '`(a + b + c) / 3`', correct: true }, { text: '`a + b + c / 3`' }, { text: '`a + b + c // 3`' }],
    explain: 'Sin paréntesis solo se divide c, porque la división va antes que la suma.',
  },
  // ---- Módulo 5 · condicionales y recursión
  {
    id: 'r-igual', concept: 'booleanos', mode: 'choice',
    question: '¿Qué operador pregunta si dos valores son iguales?',
    options: [{ text: '==', correct: true }, { text: '=' }, { text: '===' }],
    explain: '`=` asigna; `==` compara.',
  },
  {
    id: 'r-and-or', concept: 'booleanos', mode: 'text', code: 'x = 7\nprint(x > 5 and x < 10, x < 0 or x > 6)', answer: 'True True',
    question: '¿Qué muestra este programa?',
    explain: 'Las dos partes del and se cumplen; en el or, basta con x > 6.',
  },
  {
    id: 'r-not', concept: 'booleanos', mode: 'text', code: 'print(not 3 > 5)', answer: 'True',
    question: '¿Qué muestra este programa?',
    explain: 'La comparación va primero: 3 > 5 es False, y not False es True.',
  },
  {
    id: 'r-elif', concept: 'condicionales', mode: 'text', code: 'x = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', answer: 'A',
    question: '¿Qué muestra este programa?',
    explain: 'Solo se ejecuta la primera condición verdadera: 15 > 10.',
  },
  {
    id: 'r-sin-return', concept: 'condicionales', mode: 'text', code: 'def f(x):\n    if x > 0:\n        return "positivo"\n\nprint(f(-1))', answer: 'None',
    question: '¿Qué muestra este programa?',
    explain: 'Con -1 no se cumple el if y la función llega al final sin return: devuelve None.',
  },
  {
    id: 'r-factorial', concept: 'recursion', mode: 'text', code: 'def f(n):\n    if n == 0:\n        return 1\n    return n * f(n - 1)\n\nprint(f(3))', answer: '6',
    question: '¿Qué muestra este programa?',
    explain: '3 × 2 × 1 × 1 = 6.',
  },
  {
    id: 'r-caso-base', concept: 'recursion', mode: 'choice',
    question: '¿Qué le pasa a una función recursiva sin caso base?',
    options: [{ text: 'Se llama sin parar hasta un RecursionError', correct: true }, { text: 'Devuelve None' }, { text: 'Se ejecuta una sola vez' }],
    explain: 'El caso base es lo que la hace terminar.',
  },
  // ---- Módulo 4 · diseño de funciones
  {
    id: 'r-generalizar', concept: 'diseno', mode: 'choice',
    question: 'Tienes `def linea_de_10(): print("-" * 10)`. ¿Qué significa generalizarla?',
    options: [{ text: 'Cambiar el 10 por un parámetro: linea(n)', correct: true }, { text: 'Darle un nombre más largo' }, { text: 'Llamarla más veces' }],
    explain: 'Generalizar es sustituir valores fijos por parámetros para que la función sirva en más casos.',
  },
  {
    id: 'r-defecto', concept: 'parametros', mode: 'text', code: 'def f(a, b=3):\n    return a * b\n\nprint(f(2), f(2, 5))', answer: '6 10',
    question: '¿Qué muestra este programa?',
    explain: 'Sin segundo argumento, b vale 3 por defecto: 2 × 3 = 6. Con 5: 2 × 5 = 10.',
  },
  {
    id: 'r-nombrados', concept: 'parametros', mode: 'text', code: 'def div(a, b):\n    return a // b\n\nprint(div(b=2, a=9))', answer: '4',
    question: '¿Qué muestra este programa?',
    explain: 'Por nombre: a = 9 y b = 2, así que 9 // 2 = 4.',
  },
  {
    id: 'r-salto', concept: 'diseno', mode: 'choice', code: 'print(("ab" + "\\n") * 2, end="")', answer: 'ab\nab',
    question: '¿Qué muestra este programa?',
    options: [{ text: 'ab en dos líneas', correct: true }, { text: 'abab en una línea' }, { text: 'ab\\nab tal cual' }],
    explain: '"\\n" es un salto de línea: "ab" aparece en dos líneas.',
  },
  {
    id: 'r-refactor', concept: 'diseno', mode: 'choice',
    question: 'Refactorizar un programa significa…',
    options: [{ text: 'Mejorar cómo está escrito sin cambiar lo que hace', correct: true }, { text: 'Añadirle funciones nuevas' }, { text: 'Hacer que dé un resultado mejor' }],
    explain: 'Si cambia lo que hace, ya no es refactorizar.',
  },
  {
    id: 'r-constante', concept: 'diseno', mode: 'choice',
    question: '¿Cómo se escribe por convención un valor que no cambia, como el IVA?',
    options: [{ text: 'IVA = 0.21', correct: true }, { text: 'iva = 0.21' }, { text: 'Iva = 0.21' }],
    explain: 'Las constantes se escriben en MAYÚSCULAS al principio del programa.',
  },
  // ---- Módulo 3 · parámetros y return
  {
    id: 'r-param-orden', concept: 'parametros', mode: 'text', code: 'def resta(a, b):\n    return a - b\n\nprint(resta(2, 10))', answer: '-8',
    question: '¿Qué muestra este programa?',
    explain: 'Los argumentos se asignan por posición: a = 2 y b = 10, así que 2 − 10 = −8.',
  },
  {
    id: 'r-return-none', concept: 'parametros', mode: 'text', code: 'def f(x):\n    x * 2\n\nprint(f(4))', answer: 'None',
    question: '¿Qué muestra este programa?',
    explain: 'La función calcula x * 2 pero no lo devuelve: sin return, devuelve None.',
  },
  {
    id: 'r-return-usar', concept: 'parametros', mode: 'text', code: 'def cuadrado(n):\n    return n * n\n\nprint(cuadrado(3) + cuadrado(4))', answer: '25',
    question: '¿Qué muestra este programa?',
    explain: '9 + 16 = 25: cada llamada vale lo que devuelve.',
  },
  {
    id: 'r-local', concept: 'parametros', mode: 'text', code: 'n = 1\n\ndef f():\n    n = 50\n\nf()\nprint(n)', answer: '1',
    question: '¿Qué muestra este programa?',
    explain: 'La n de dentro es local: no cambia la n de fuera.',
  },
  {
    id: 'r-faltan-args', concept: 'errores', mode: 'choice', code: 'def suma(a, b):\n    return a + b\n\nprint(suma(1))',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'TypeError: falta un argumento', correct: true }, { text: 'Muestra 1' }, { text: 'Muestra 2' }],
    explain: 'suma necesita dos argumentos y solo recibe uno.',
    expectError: 'TypeError',
  },
  // ---- Módulo 3 · definir funciones
  {
    id: 'r-def-sin-llamar', concept: 'funciones', mode: 'text', code: 'def f():\n    print("dentro")\n\nprint("fuera")', answer: 'fuera',
    question: '¿Qué muestra este programa?',
    explain: 'Definir no ejecuta: f no se llama nunca, así que solo se muestra «fuera».',
  },
  {
    id: 'r-def-llamadas', concept: 'funciones', mode: 'text', code: 'def f():\n    print("ok", end=" ")\n\nf()\nf()\nf()', answer: 'ok ok ok',
    question: '¿Qué muestra este programa?',
    explain: 'Cada llamada ejecuta el cuerpo: tres llamadas, tres «ok».',
  },
  {
    id: 'r-def-partes', concept: 'funciones', mode: 'choice',
    question: '¿Cuál es la cabecera correcta de una función?',
    options: [{ text: '`def saludar():`', correct: true }, { text: '`def saludar()`' }, { text: '`saludar():`' }],
    explain: 'def, el nombre, los paréntesis y los dos puntos al final.',
  },
  {
    id: 'r-def-antes', concept: 'errores', mode: 'choice', code: 'f()\ndef f():\n    print("hola")',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'NameError', correct: true }, { text: 'Muestra hola' }, { text: 'SyntaxError' }],
    explain: 'La llamada ocurre antes de que Python haya leído la definición.',
    expectError: 'NameError',
  },
  // ---- Módulo 3 · llamar a funciones
  {
    id: 'r-len', concept: 'funciones', mode: 'text', code: 'print(len("luna py"))', answer: '7',
    question: '¿Qué muestra este programa?',
    explain: '`len()` cuenta todos los caracteres, también el espacio.',
  },
  {
    id: 'r-none', concept: 'funciones', mode: 'choice',
    question: '¿Qué devuelve `print("hola")`?',
    options: [{ text: 'None', correct: true }, { text: 'El texto "hola"' }, { text: 'Nada: da un error' }],
    explain: 'print muestra el texto en pantalla, pero el valor que devuelve es `None`.',
  },
  {
    id: 'r-anidada', concept: 'funciones', mode: 'text', code: 'print(abs(min(-8, 3)))', answer: '8',
    question: '¿Qué muestra este programa?',
    explain: 'De dentro hacia fuera: min(-8, 3) = -8 y abs(-8) = 8.',
  },
  {
    id: 'r-floor-ceil', concept: 'modulos', mode: 'text', code: 'import math\nprint(math.floor(2.9), math.ceil(2.1))', answer: '2 3',
    question: '¿Qué muestra este programa?',
    explain: '`floor` redondea hacia abajo y `ceil` hacia arriba.',
  },
  {
    id: 'r-import', concept: 'modulos', mode: 'choice', code: 'print(math.pi)',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'NameError: falta import math', correct: true }, { text: 'Muestra 3.141592653589793' }],
    explain: 'Un módulo hay que importarlo antes de usarlo.',
    expectError: 'NameError',
  },
  // ---- Módulo 2 · tipos y entrada
  {
    id: 'r-int-corta', concept: 'tipos', mode: 'text', code: 'print(int(9.7))', answer: '9',
    question: '¿Qué muestra este programa?',
    explain: '`int()` corta los decimales, no redondea.',
  },
  {
    id: 'r-valueerror', concept: 'input', mode: 'choice', code: 'print(int("2.5"))',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'ValueError', correct: true }, { text: 'Muestra 2' }, { text: 'Muestra 3' }],
    explain: 'Un texto con punto no es un entero válido para `int()`. Primero `float("2.5")`.',
    expectError: 'ValueError',
  },
  {
    id: 'r-sep', concept: 'print', mode: 'text', code: 'print(1, 2, 3, sep="")', answer: '123',
    question: '¿Qué muestra este programa?',
    explain: 'Con `sep=""` los valores se pegan sin espacios.',
  },
  {
    id: 'r-fstring', concept: 'print', mode: 'text', code: 'x = 4\nprint(f"{x} al cuadrado es {x ** 2}")', answer: '4 al cuadrado es 16',
    question: '¿Qué muestra este programa?',
    explain: 'En una f-string, cada `{ }` se sustituye por el valor de lo que contiene.',
  },
  {
    id: 'r-2f', concept: 'print', mode: 'text', code: 'print(f"{3.14159:.2f}")', answer: '3.14',
    question: '¿Qué muestra este programa?',
    explain: '`:.2f` muestra el número con 2 decimales.',
  },
  {
    id: 'r-cp', concept: 'tipos', mode: 'choice',
    question: '¿Cómo guardarías un número de teléfono que pide tu programa?',
    options: [{ text: 'Como texto: input() sin convertir', correct: true }, { text: 'Con int(input())' }, { text: 'Con float(input())' }],
    explain: 'No se hacen cálculos con él y como número perdería los ceros iniciales.',
  },
  // ---- Módulo 2 · variables
  {
    id: 'r-concat', concept: 'tipos', mode: 'text', code: 'print("5" + "3")', answer: '53',
    question: '¿Qué muestra este programa?',
    explain: 'Con comillas, "5" y "3" son textos: + los pega uno detrás de otro.',
  },
  {
    id: 'r-sum', concept: 'tipos', mode: 'text', code: 'print(5 + 3)', answer: '8',
    question: '¿Qué muestra este programa?',
    explain: 'Sin comillas son números enteros, así que + los suma.',
  },
  {
    id: 'r-input-type', concept: 'input', mode: 'choice',
    question: 'Si el usuario escribe 20, ¿de qué tipo es x tras `x = input()`?',
    options: [{ text: 'str (texto)', correct: true }, { text: 'int (número entero)' }, { text: 'float (número decimal)' }],
    explain: 'input() siempre devuelve texto. Para operar, conviértelo con int() o float().',
  },
  {
    id: 'r-reassign', concept: 'reasignacion', mode: 'text', code: 'x = 4\nx = x * 2\nx = x - 1\nprint(x)', answer: '7',
    question: '¿Qué muestra este programa?',
    explain: '4 → 4 × 2 = 8 → 8 − 1 = 7. Cada línea usa el valor que dejó la anterior.',
  },
  {
    id: 'r-copy', concept: 'reasignacion', mode: 'text', code: 'a = 3\nb = a\na = 10\nprint(b)', answer: '3',
    question: '¿Qué muestra este programa?',
    explain: 'b recibió el valor que tenía a en ese momento (3). Cambiar a después no modifica b.',
  },
  {
    id: 'r-valid-name', concept: 'asignacion', mode: 'choice',
    question: '¿Cuál de estos nombres de variable es válido?',
    options: [{ text: '`mi_edad`', correct: true }, { text: '`2edad`' }, { text: '`mi edad`' }],
    explain: 'Los nombres no pueden empezar por número ni contener espacios. Se usa el guion bajo para unir palabras.',
  },
  {
    id: 'r-print-quotes', concept: 'print', mode: 'text', code: 'edad = 18\nprint("edad")', answer: 'edad',
    question: '¿Qué muestra este programa?',
    explain: 'Entre comillas, "edad" es un texto literal: se muestra la palabra, no el valor de la variable.',
  },
  {
    id: 'r-print-commas', concept: 'print', mode: 'text', code: 'n = "Ana"\nprint("Hola", n, "!")', answer: 'Hola Ana !',
    question: '¿Qué muestra este programa? (fíjate en los espacios)',
    explain: 'print separa con un espacio cada elemento que pones entre comas, también antes de "!".',
  },
  {
    id: 'r-nameerror', concept: 'errores', mode: 'choice', code: 'precio = 10\nprint(Precio)',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'NameError: Precio no existe', correct: true }, { text: 'Muestra 10' }, { text: 'Muestra Precio' }],
    explain: 'Python distingue mayúsculas y minúsculas: Precio y precio son nombres distintos.',
    expectError: 'NameError',
  },
  {
    id: 'r-typeerror', concept: 'errores', mode: 'choice', code: 'edad = 20\nprint("Edad: " + edad)',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'TypeError: no se puede unir texto y número con +', correct: true }, { text: 'Muestra Edad: 20' }, { text: 'SyntaxError' }],
    explain: 'Con + no se mezclan texto y números. Soluciones: str(edad), o print("Edad:", edad).',
    expectError: 'TypeError',
  },
  {
    id: 'r-plan', concept: 'descomponer', mode: 'choice',
    question: 'Para calcular la media de tres notas, ¿qué paso va primero?',
    options: [{ text: 'Obtener las tres notas', correct: true }, { text: 'Dividir entre 3' }, { text: 'Mostrar la media' }],
    explain: 'Antes de operar hay que tener los datos: dividir o mostrar depende de pasos anteriores.',
  },
];
