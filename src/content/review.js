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
  // ---- Módulo 13 · depuración y estilo
  {
    id: 'r-logica', concept: 'depuracion', mode: 'choice',
    question: 'Un programa se ejecuta sin mensajes de error, pero el total sale mal. ¿Qué tipo de error es?',
    options: [{ text: 'De lógica', correct: true }, { text: 'De sintaxis' }, { text: 'De ejecución' }],
    explain: 'Los errores de lógica no avisan: el programa hace algo distinto de lo que querías.',
  },
  {
    id: 'r-assert', concept: 'depuracion', mode: 'choice', code: 'assert 2 + 2 == 5',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'AssertionError', correct: true }, { text: 'No pasa nada' }, { text: 'Muestra False' }],
    explain: 'assert detiene el programa si su condición es falsa.',
    expectError: 'AssertionError',
  },
  {
    id: 'r-limite', concept: 'depuracion', mode: 'choice',
    question: 'Tu función cuenta las notas de 5 o más. ¿Qué prueba es más útil para detectar un > en lugar de >=?',
    options: [{ text: 'Una lista con un 5', correct: true }, { text: 'Una lista con notas altas' }, { text: 'Una lista con notas bajas' }],
    explain: 'Los valores justo en el límite son los que distinguen > de >=.',
  },
  {
    id: 'r-pep8-clase', concept: 'estilo', mode: 'choice',
    question: 'Según PEP 8, ¿cómo se escribe el nombre de una clase?',
    options: [{ text: 'CuentaBancaria', correct: true }, { text: 'cuenta_bancaria' }, { text: 'CUENTA_BANCARIA' }],
    explain: 'Clases en PalabrasConMayúscula; funciones y variables en minúsculas con guion bajo; constantes en mayúsculas.',
  },
  {
    id: 'r-global', concept: 'estilo', mode: 'choice', code: 'n = 0\n\ndef f():\n    n += 1\n\nf()',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'UnboundLocalError', correct: true }, { text: 'n pasa a valer 1' }, { text: 'NameError' }],
    explain: 'Asignar a n dentro de la función la convierte en local. Mejor: pasar n como parámetro y devolver el resultado.',
    expectError: 'UnboundLocalError',
  },
  // ---- Módulo 12 · clases
  {
    id: 'r-clase-objeto', concept: 'clases', mode: 'choice',
    question: 'Si Coche es una clase, ¿qué es Coche("rojo")?',
    options: [{ text: 'Un objeto (una instancia) de la clase Coche', correct: true }, { text: 'Otra clase' }, { text: 'Un método' }],
    explain: 'Llamar a la clase crea un objeto nuevo y ejecuta su __init__.',
  },
  {
    id: 'r-self', concept: 'clases', mode: 'text', code: 'class C:\n    def __init__(self, v):\n        self.v = v * 2\n\nprint(C(5).v)', answer: '10',
    question: '¿Qué muestra este programa?',
    explain: '__init__ guarda en self.v el doble del valor recibido.',
  },
  {
    id: 'r-metodo', concept: 'clases', mode: 'text', code: 'class Dado:\n    def __init__(self, caras):\n        self.caras = caras\n\n    def maximo(self):\n        return self.caras\n\nprint(Dado(20).maximo())', answer: '20',
    question: '¿Qué muestra este programa?',
    explain: 'El método usa el atributo del objeto con el que se llama.',
  },
  {
    id: 'r-str', concept: 'clases', mode: 'choice',
    question: '¿Qué método especial decide lo que muestra print(objeto)?',
    options: [{ text: '__str__', correct: true }, { text: '__init__' }, { text: '__print__' }],
    explain: '__str__ devuelve el texto que representa al objeto.',
  },
  {
    id: 'r-herencia', concept: 'herencia', mode: 'text', code: 'class A:\n    def f(self):\n        return "A"\n\nclass B(A):\n    pass\n\nprint(B().f())', answer: 'A',
    question: '¿Qué muestra este programa?',
    explain: 'B hereda el método f de A.',
  },
  {
    id: 'r-super', concept: 'herencia', mode: 'choice',
    question: '¿Para qué sirve super().__init__(…) en el __init__ de una clase hija?',
    options: [{ text: 'Para que la clase madre guarde también sus atributos', correct: true }, { text: 'Para crear un objeto nuevo de la madre' }, { text: 'Para borrar los atributos de la madre' }],
    explain: 'El __init__ de la hija sustituye al de la madre; super() permite reutilizarlo.',
  },
  // ---- Módulo 11 · archivos y excepciones
  {
    id: 'r-modo-w', concept: 'archivos', mode: 'choice',
    question: '¿Qué hace open("datos.txt", "w") si el archivo ya existe?',
    options: [{ text: 'Lo vacía y empieza a escribir desde cero', correct: true }, { text: 'Añade al final' }, { text: 'Da un error' }],
    explain: 'Para añadir sin borrar se usa el modo "a".',
  },
  {
    id: 'r-strip-linea', concept: 'archivos', mode: 'text', code: 'print("Ana\\n".strip() + "!")', answer: 'Ana!',
    question: '¿Qué muestra este programa?',
    explain: 'strip quita el salto de línea final que tienen las líneas leídas de un archivo.',
  },
  {
    id: 'r-csv-split', concept: 'datos', mode: 'text', code: 'p, u = "boli,3".split(",")\nprint(int(u) * 2)', answer: '6',
    question: '¿Qué muestra este programa?',
    explain: 'split da textos: hay que convertir u con int() antes de operar.',
  },
  {
    id: 'r-try', concept: 'excepciones', mode: 'text', code: 'try:\n    x = int("a")\n    print("ok")\nexcept ValueError:\n    print("error")', answer: 'error',
    question: '¿Qué muestra este programa?',
    explain: 'int("a") falla y Python salta directamente al except.',
  },
  {
    id: 'r-except-tipo', concept: 'excepciones', mode: 'choice',
    question: '¿Por qué conviene escribir except ValueError en lugar de except a secas?',
    options: [{ text: 'Para no esconder otros errores, como una variable mal escrita', correct: true }, { text: 'Porque except a secas da un error de sintaxis' }, { text: 'Porque es más rápido' }],
    explain: 'Un except sin tipo captura cualquier error y puede ocultar fallos de programación.',
  },
  {
    id: 'r-raise', concept: 'excepciones', mode: 'text', code: 'try:\n    raise ValueError("ups")\nexcept ValueError as e:\n    print(e)', answer: 'ups',
    question: '¿Qué muestra este programa?',
    explain: 'raise lanza la excepción con su mensaje, y el except la recoge en e.',
  },
  // ---- Módulo 10 · diccionarios y tuplas
  {
    id: 'r-dic-get', concept: 'diccionarios', mode: 'text', code: 'd = {"a": 1}\nprint(d.get("a", 0), d.get("z", 0))', answer: '1 0',
    question: '¿Qué muestra este programa?',
    explain: 'get devuelve el valor si la clave existe y el valor por defecto si no.',
  },
  {
    id: 'r-dic-keyerror', concept: 'diccionarios', mode: 'choice', code: 'd = {"a": 1}\nprint(d["b"])',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'KeyError', correct: true }, { text: 'Muestra None' }, { text: 'Muestra 0' }],
    explain: 'Con corchetes, una clave inexistente da KeyError. get no lo daría.',
    expectError: 'KeyError',
  },
  {
    id: 'r-dic-contar', concept: 'diccionarios', mode: 'text', code: 'c = {}\nfor x in "abca":\n    c[x] = c.get(x, 0) + 1\nprint(c["a"], len(c))', answer: '2 3',
    question: '¿Qué muestra este programa?',
    explain: 'La a aparece dos veces; hay tres letras distintas.',
  },
  {
    id: 'r-swap', concept: 'tuplas', mode: 'text', code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)', answer: '2 1',
    question: '¿Qué muestra este programa?',
    explain: 'Primero se evalúa la derecha (2, 1) y después se reparte.',
  },
  {
    id: 'r-zip', concept: 'tuplas', mode: 'text', code: 'print(dict(zip("ab", [1, 2])))', answer: "{'a': 1, 'b': 2}",
    question: '¿Qué muestra este programa?',
    explain: 'zip empareja cada letra con un número y dict convierte las parejas en un diccionario.',
  },
  {
    id: 'r-key', concept: 'tuplas', mode: 'choice',
    question: '¿Qué hace sorted(palabras, key=len)?',
    options: [{ text: 'Ordena las palabras de más corta a más larga', correct: true }, { text: 'Devuelve la longitud de la lista' }, { text: 'Ordena alfabéticamente' }],
    explain: 'key indica por qué ordenar: aquí, por la longitud de cada palabra.',
  },
  // ---- Módulo 9 · listas
  {
    id: 'r-lista-indice', concept: 'listas', mode: 'text', code: 'v = [10, 20, 30, 40]\nprint(v[1], v[-1], len(v))', answer: '20 40 4',
    question: '¿Qué muestra este programa?',
    explain: 'Posición 1: 20. Última: 40. Cuatro elementos.',
  },
  {
    id: 'r-append-pop', concept: 'listas', mode: 'text', code: 'v = [1, 2]\nv.append(3)\nv.pop(0)\nprint(v)', answer: '[2, 3]',
    question: '¿Qué muestra este programa?',
    explain: 'append añade el 3; pop(0) quita el primero.',
  },
  {
    id: 'r-sort-none', concept: 'listas', mode: 'text', code: 'v = [2, 1]\nprint(v.sort())', answer: 'None',
    question: '¿Qué muestra este programa?',
    explain: 'sort ordena la lista en el sitio y devuelve None. sorted(v) devolvería [1, 2].',
  },
  {
    id: 'r-comprension', concept: 'listas', mode: 'text', code: 'print([n * n for n in range(4) if n % 2 == 1])', answer: '[1, 9]',
    question: '¿Qué muestra este programa?',
    explain: 'Solo los impares (1 y 3), elevados al cuadrado.',
  },
  {
    id: 'r-alias', concept: 'alias', mode: 'text', code: 'a = [1]\nb = a\nb.append(2)\nprint(len(a))', answer: '2',
    question: '¿Qué muestra este programa?',
    explain: 'b es un alias de a: los dos nombres apuntan a la misma lista.',
  },
  {
    id: 'r-copia', concept: 'alias', mode: 'choice',
    question: '¿Cuál de estas líneas NO crea una copia independiente de la lista a?',
    options: [{ text: 'b = a', correct: true }, { text: 'b = a.copy()' }, { text: 'b = a[:]' }],
    explain: 'b = a solo crea otro nombre para la misma lista.',
  },
  // ---- Módulo 8 · cadenas
  {
    id: 'r-indice', concept: 'cadenas', mode: 'text', code: 's = "Python"\nprint(s[1], s[-1])', answer: 'y n',
    question: '¿Qué muestra este programa?',
    explain: 'La posición 1 es la segunda letra; −1 es la última.',
  },
  {
    id: 'r-porcion', concept: 'cadenas', mode: 'text', code: 'print("Valencia"[2:5])', answer: 'len',
    question: '¿Qué muestra este programa?',
    explain: 'Posiciones 2, 3 y 4: l, e, n.',
  },
  {
    id: 'r-inmutable', concept: 'cadenas', mode: 'choice', code: 's = "hola"\ns[0] = "H"',
    question: '¿Qué ocurre al ejecutar este programa?',
    options: [{ text: 'TypeError: los textos no se pueden modificar', correct: true }, { text: 's pasa a ser "Hola"' }, { text: 'IndexError' }],
    explain: 'Para obtener "Hola": s = "H" + s[1:].',
    expectError: 'TypeError',
  },
  {
    id: 'r-metodo-nuevo', concept: 'cadenas', mode: 'text', code: 'x = "abc"\nx.upper()\nprint(x)', answer: 'abc',
    question: '¿Qué muestra este programa?',
    explain: 'upper() devuelve un texto nuevo que no se ha guardado: x sigue igual.',
  },
  {
    id: 'r-find', concept: 'cadenas', mode: 'text', code: 'print("banana".find("n"), "banana".count("a"))', answer: '2 3',
    question: '¿Qué muestra este programa?',
    explain: 'La primera n está en la posición 2; hay tres a.',
  },
  {
    id: 'r-regex', concept: 'regex', mode: 'choice', code: 'import re\nprint(re.findall(r"\\d+", "1 y 22"))', answer: "['1', '22']",
    question: '¿Qué muestra este programa?',
    options: [{ text: "['1', '22']", correct: true }, { text: "['1', '2', '2']" }, { text: '[1, 22]' }],
    explain: '\\d+ agrupa los dígitos seguidos, y findall devuelve textos.',
  },
  // ---- Módulo 7 · bucles y búsqueda
  {
    id: 'r-range', concept: 'bucles', mode: 'choice', code: 'for i in range(1, 4):\n    print(i)', answer: '1\n2\n3',
    question: '¿Qué muestra este programa?',
    options: [{ text: '1, 2 y 3, uno por línea', correct: true }, { text: '1, 2, 3 y 4' }, { text: '0, 1, 2 y 3' }],
    explain: 'range(1, 4) empieza en 1 y no incluye el 4.',
  },
  {
    id: 'r-acumulador', concept: 'bucles', mode: 'text', code: 'total = 0\nfor n in range(1, 5):\n    total += n * 2\nprint(total)', answer: '20',
    question: '¿Qué muestra este programa?',
    explain: '2 + 4 + 6 + 8 = 20.',
  },
  {
    id: 'r-while', concept: 'bucles', mode: 'text', code: 'n = 100\nveces = 0\nwhile n > 1:\n    n //= 2\n    veces += 1\nprint(veces)', answer: '6',
    question: '¿Qué muestra este programa?',
    explain: '100 → 50 → 25 → 12 → 6 → 3 → 1: seis divisiones.',
  },
  {
    id: 'r-break', concept: 'bucles', mode: 'text', code: 'for i in range(10):\n    if i == 3:\n        break\n    print(i, end="")', answer: '012',
    question: '¿Qué muestra este programa?',
    explain: 'Al llegar a 3, break sale del bucle antes del print.',
  },
  {
    id: 'r-in', concept: 'busqueda', mode: 'text', code: 'print("ola" in "Hola", "h" in "Hola")', answer: 'True False',
    question: '¿Qué muestra este programa?',
    explain: '"ola" aparece dentro de "Hola"; "h" minúscula no (la de Hola es mayúscula).',
  },
  {
    id: 'r-return-bucle', concept: 'busqueda', mode: 'choice',
    question: 'En una función es_primo, ¿dónde va el return True?',
    options: [{ text: 'Después del bucle, cuando se han probado todos los divisores', correct: true }, { text: 'En un else dentro del bucle' }, { text: 'Antes del bucle' }],
    explain: 'Solo se sabe que no tiene divisores después de probarlos todos.',
  },
  // ---- Módulo 6 · valores de retorno y composición
  {
    id: 'r-muerto', concept: 'retorno', mode: 'text', code: 'def f():\n    return 1\n    return 2\n\nprint(f())', answer: '1',
    question: '¿Qué muestra este programa?',
    explain: 'El primer return termina la función: el segundo es código muerto.',
  },
  {
    id: 'r-dos-valores', concept: 'retorno', mode: 'text', code: 'def f(x):\n    return x + 1, x * 2\n\na, b = f(5)\nprint(b, a)', answer: '10 6',
    question: '¿Qué muestra este programa?',
    explain: 'a recibe 6 y b recibe 10; el print los muestra en orden b, a.',
  },
  {
    id: 'r-andamio', concept: 'incremental', mode: 'choice',
    question: 'En el desarrollo incremental, ¿qué es el andamiaje?',
    options: [{ text: 'Los print temporales que muestran valores intermedios', correct: true }, { text: 'Los comentarios del código' }, { text: 'La cabecera de la función' }],
    explain: 'Sirven para comprobar mientras construyes y se quitan al terminar.',
  },
  {
    id: 'r-componer', concept: 'composicion', mode: 'text', code: 'def f(x):\n    return x + 3\n\ndef g(x):\n    return x * 10\n\nprint(g(f(1)))', answer: '40',
    question: '¿Qué muestra este programa?',
    explain: 'De dentro hacia fuera: f(1) = 4 y g(4) = 40.',
  },
  {
    id: 'r-isinstance', concept: 'tipos', mode: 'text', code: 'print(isinstance(2.5, float), isinstance(2.5, int))', answer: 'True False',
    question: '¿Qué muestra este programa?',
    explain: '2.5 es un float, no un int.',
  },
  {
    id: 'r-bool-limpia', concept: 'composicion', mode: 'choice',
    question: '¿Cuál es la forma más clara de escribir una función que dice si n es negativo?',
    options: [{ text: 'return n < 0', correct: true }, { text: 'if n < 0: return True, si no return False' }, { text: 'return "True" if n < 0' }],
    explain: 'La comparación ya es un booleano: devuélvela directamente.',
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
