// Banco de preguntas breves para las sesiones de repaso espaciado.
// La salida esperada de cada fragmento se verifica con Python real en tests.html.

export const REVIEW_ITEMS = [
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
