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
