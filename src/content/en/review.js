// Spaced-review question bank (English translation of src/content/review.js).
// Same ids as the original: the expected output of each snippet is checked with real
// Python in tests.html.

export const REVIEW_ITEMS_EN = [
  // ---- Module 1 · algorithms and operators
  {
    id: 'r-algoritmo', concept: 'algoritmo', mode: 'choice',
    question: 'What makes an instruction suitable for an algorithm?',
    options: [{ text: 'Being precise and leaving no room for doubt', correct: true }, { text: 'Being short' }, { text: 'Being written in English' }],
    explain: 'A computer doesn\'t interpret: it needs exact instructions, like «repeat 3 times» instead of «a few times».',
  },
  {
    id: 'r-comentario', concept: 'algoritmo', mode: 'text', code: '# print("Hello")\nprint("Goodbye")', answer: 'Goodbye',
    question: 'What does this program show?',
    explain: 'The first line is a comment: Python ignores it.',
  },
  {
    id: 'r-orden', concept: 'algoritmo', mode: 'choice',
    question: 'In an algorithm for making a sandwich, which step can\'t come before «open the bread»?',
    options: [{ text: 'Put the cheese inside', correct: true }, { text: 'Take the cheese out of the fridge' }, { text: 'Wash your hands' }],
    explain: 'Putting the cheese inside depends on the bread being open; the other steps are independent.',
  },
  {
    id: 'r-div-entera', concept: 'operadores', mode: 'text', code: 'print(20 // 6)', answer: '3',
    question: 'What does this program show?',
    explain: '`//` gives the whole part: 6 goes into 20 three times.',
  },
  {
    id: 'r-resto', concept: 'operadores', mode: 'text', code: 'print(20 % 6)', answer: '2',
    question: 'What does this program show?',
    explain: '20 = 6 × 3 + 2: 2 is left over.',
  },
  {
    id: 'r-division', concept: 'operadores', mode: 'text', code: 'print(9 / 3)', answer: '3.0',
    question: 'What does this program show?',
    explain: '`/` always gives a decimal, even if the division is exact.',
  },
  {
    id: 'r-prioridad', concept: 'operadores', mode: 'text', code: 'print(2 + 2 * 5)', answer: '12',
    question: 'What does this program show?',
    explain: 'First the multiplication (2 × 5 = 10) and then the addition: 12.',
  },
  // ---- Module 2 · expressions
  {
    id: 'r-compuesta', concept: 'reasignacion', mode: 'text', code: 'x = 5\nx += 2\nx *= 3\nprint(x)', answer: '21',
    question: 'What does this program show?',
    explain: '5 + 2 = 7 and 7 × 3 = 21. `x += 2` is the same as `x = x + 2`.',
  },
  {
    id: 'r-signo-potencia', concept: 'expresiones', mode: 'text', code: 'print(-2 ** 2)', answer: '-4',
    question: 'What does this program show?',
    explain: 'The power comes before the sign: -(2 ** 2) = -4.',
  },
  {
    id: 'r-izq-der', concept: 'expresiones', mode: 'text', code: 'print(20 / 4 * 2)', answer: '10.0',
    question: 'What does this program show?',
    explain: 'Same priority, from left to right: 20 / 4 = 5.0 and 5.0 × 2 = 10.0.',
  },
  {
    id: 'r-tipo-mezcla', concept: 'tipos', mode: 'text', code: 'print(4 * 2.5)', answer: '10.0',
    question: 'What does this program show?',
    explain: 'If one of the two is a float, so is the result: 10.0.',
  },
  {
    id: 'r-ultima-cifra', concept: 'operadores', mode: 'text', code: 'n = 538\nprint(n % 10, n // 10)', answer: '8 53',
    question: 'What does this program show?',
    explain: '`% 10` gives the last digit (8) and `// 10` removes it (53).',
  },
  {
    id: 'r-media', concept: 'expresiones', mode: 'choice',
    question: 'Which expression works out the average of a, b and c?',
    options: [{ text: '`(a + b + c) / 3`', correct: true }, { text: '`a + b + c / 3`' }, { text: '`a + b + c // 3`' }],
    explain: 'Without brackets only c is divided, because division comes before addition.',
  },
  // ---- Module 13 · debugging and style
  {
    id: 'r-logica', concept: 'depuracion', mode: 'choice',
    question: 'A program runs with no error messages, but the total comes out wrong. What type of error is it?',
    options: [{ text: 'Logic', correct: true }, { text: 'Syntax' }, { text: 'Runtime' }],
    explain: 'Logic errors give no warning: the program does something different from what you wanted.',
  },
  {
    id: 'r-assert', concept: 'depuracion', mode: 'choice', code: 'assert 2 + 2 == 5',
    question: 'What happens when this program runs?',
    options: [{ text: 'AssertionError', correct: true }, { text: 'Nothing happens' }, { text: 'It shows False' }],
    explain: 'assert stops the program if its condition is false.',
    expectError: 'AssertionError',
  },
  {
    id: 'r-limite', concept: 'depuracion', mode: 'choice',
    question: 'Your function counts the marks of 5 or more. Which test is most useful for detecting a > instead of >=?',
    options: [{ text: 'A list with a 5', correct: true }, { text: 'A list with high marks' }, { text: 'A list with low marks' }],
    explain: 'The values right on the limit are the ones that tell > and >= apart.',
  },
  {
    id: 'r-pep8-clase', concept: 'estilo', mode: 'choice',
    question: 'According to PEP 8, how is a class name written?',
    options: [{ text: 'BankAccount', correct: true }, { text: 'bank_account' }, { text: 'BANK_ACCOUNT' }],
    explain: 'Classes in CapitalisedWords; functions and variables in lower case with underscores; constants in capitals.',
  },
  {
    id: 'r-global', concept: 'estilo', mode: 'choice', code: 'n = 0\n\ndef f():\n    n += 1\n\nf()',
    question: 'What happens when this program runs?',
    options: [{ text: 'UnboundLocalError', correct: true }, { text: 'n becomes 1' }, { text: 'NameError' }],
    explain: 'Assigning to n inside the function makes it local. Better: pass n as a parameter and return the result.',
    expectError: 'UnboundLocalError',
  },
  // ---- Module 12 · classes
  {
    id: 'r-clase-objeto', concept: 'clases', mode: 'choice',
    question: 'If Car is a class, what is Car("red")?',
    options: [{ text: 'An object (an instance) of the Car class', correct: true }, { text: 'Another class' }, { text: 'A method' }],
    explain: 'Calling the class creates a new object and runs its __init__.',
  },
  {
    id: 'r-self', concept: 'clases', mode: 'text', code: 'class C:\n    def __init__(self, v):\n        self.v = v * 2\n\nprint(C(5).v)', answer: '10',
    question: 'What does this program show?',
    explain: '__init__ stores double the value received in self.v.',
  },
  {
    id: 'r-metodo', concept: 'clases', mode: 'text', code: 'class Die:\n    def __init__(self, sides):\n        self.sides = sides\n\n    def maximum(self):\n        return self.sides\n\nprint(Die(20).maximum())', answer: '20',
    question: 'What does this program show?',
    explain: 'The method uses the attribute of the object it\'s called on.',
  },
  {
    id: 'r-str', concept: 'clases', mode: 'choice',
    question: 'Which special method decides what print(object) shows?',
    options: [{ text: '__str__', correct: true }, { text: '__init__' }, { text: '__print__' }],
    explain: '__str__ returns the text that represents the object.',
  },
  {
    id: 'r-herencia', concept: 'herencia', mode: 'text', code: 'class A:\n    def f(self):\n        return "A"\n\nclass B(A):\n    pass\n\nprint(B().f())', answer: 'A',
    question: 'What does this program show?',
    explain: 'B inherits the method f from A.',
  },
  {
    id: 'r-super', concept: 'herencia', mode: 'choice',
    question: 'What is super().__init__(…) for in a child class\'s __init__?',
    options: [{ text: 'So the parent class also stores its attributes', correct: true }, { text: 'To create a new object of the parent' }, { text: 'To delete the parent\'s attributes' }],
    explain: 'The child\'s __init__ replaces the parent\'s; super() lets you reuse it.',
  },
  // ---- Module 11 · files and exceptions
  {
    id: 'r-modo-w', concept: 'archivos', mode: 'choice',
    question: 'What does open("data.txt", "w") do if the file already exists?',
    options: [{ text: 'It empties it and starts writing from scratch', correct: true }, { text: 'It appends at the end' }, { text: 'It gives an error' }],
    explain: 'To add without deleting you use mode "a".',
  },
  {
    id: 'r-strip-linea', concept: 'archivos', mode: 'text', code: 'print("Ana\\n".strip() + "!")', answer: 'Ana!',
    question: 'What does this program show?',
    explain: 'strip removes the trailing newline that lines read from a file have.',
  },
  {
    id: 'r-csv-split', concept: 'datos', mode: 'text', code: 'p, u = "pen,3".split(",")\nprint(int(u) * 2)', answer: '6',
    question: 'What does this program show?',
    explain: 'split gives texts: you have to convert u with int() before calculating.',
  },
  {
    id: 'r-try', concept: 'excepciones', mode: 'text', code: 'try:\n    x = int("a")\n    print("ok")\nexcept ValueError:\n    print("error")', answer: 'error',
    question: 'What does this program show?',
    explain: 'int("a") fails and Python jumps straight to the except.',
  },
  {
    id: 'r-except-tipo', concept: 'excepciones', mode: 'choice',
    question: 'Why is it better to write except ValueError instead of a bare except?',
    options: [{ text: 'So as not to hide other errors, like a misspelt variable', correct: true }, { text: 'Because a bare except gives a syntax error' }, { text: 'Because it\'s faster' }],
    explain: 'An except with no type catches any error and can hide programming mistakes.',
  },
  {
    id: 'r-raise', concept: 'excepciones', mode: 'text', code: 'try:\n    raise ValueError("oops")\nexcept ValueError as e:\n    print(e)', answer: 'oops',
    question: 'What does this program show?',
    explain: 'raise raises the exception with its message, and the except picks it up in e.',
  },
  // ---- Module 10 · dictionaries and tuples
  {
    id: 'r-dic-get', concept: 'diccionarios', mode: 'text', code: 'd = {"a": 1}\nprint(d.get("a", 0), d.get("z", 0))', answer: '1 0',
    question: 'What does this program show?',
    explain: 'get returns the value if the key exists and the default value if not.',
  },
  {
    id: 'r-dic-keyerror', concept: 'diccionarios', mode: 'choice', code: 'd = {"a": 1}\nprint(d["b"])',
    question: 'What happens when this program runs?',
    options: [{ text: 'KeyError', correct: true }, { text: 'It shows None' }, { text: 'It shows 0' }],
    explain: 'With square brackets, a key that doesn\'t exist gives KeyError. get wouldn\'t.',
    expectError: 'KeyError',
  },
  {
    id: 'r-dic-contar', concept: 'diccionarios', mode: 'text', code: 'c = {}\nfor x in "abca":\n    c[x] = c.get(x, 0) + 1\nprint(c["a"], len(c))', answer: '2 3',
    question: 'What does this program show?',
    explain: 'The a appears twice; there are three different letters.',
  },
  {
    id: 'r-swap', concept: 'tuplas', mode: 'text', code: 'a, b = 1, 2\na, b = b, a\nprint(a, b)', answer: '2 1',
    question: 'What does this program show?',
    explain: 'First the right-hand side is evaluated (2, 1) and then it\'s shared out.',
  },
  {
    id: 'r-zip', concept: 'tuplas', mode: 'text', code: 'print(dict(zip("ab", [1, 2])))', answer: "{'a': 1, 'b': 2}",
    question: 'What does this program show?',
    explain: 'zip pairs each letter with a number and dict turns the pairs into a dictionary.',
  },
  {
    id: 'r-key', concept: 'tuplas', mode: 'choice',
    question: 'What does sorted(words, key=len) do?',
    options: [{ text: 'Sorts the words from shortest to longest', correct: true }, { text: 'Returns the length of the list' }, { text: 'Sorts alphabetically' }],
    explain: 'key says what to sort by: here, by the length of each word.',
  },
  // ---- Module 9 · lists
  {
    id: 'r-lista-indice', concept: 'listas', mode: 'text', code: 'v = [10, 20, 30, 40]\nprint(v[1], v[-1], len(v))', answer: '20 40 4',
    question: 'What does this program show?',
    explain: 'Position 1: 20. Last: 40. Four items.',
  },
  {
    id: 'r-append-pop', concept: 'listas', mode: 'text', code: 'v = [1, 2]\nv.append(3)\nv.pop(0)\nprint(v)', answer: '[2, 3]',
    question: 'What does this program show?',
    explain: 'append adds the 3; pop(0) removes the first.',
  },
  {
    id: 'r-sort-none', concept: 'listas', mode: 'text', code: 'v = [2, 1]\nprint(v.sort())', answer: 'None',
    question: 'What does this program show?',
    explain: 'sort sorts the list in place and returns None. sorted(v) would return [1, 2].',
  },
  {
    id: 'r-comprension', concept: 'listas', mode: 'text', code: 'print([n * n for n in range(4) if n % 2 == 1])', answer: '[1, 9]',
    question: 'What does this program show?',
    explain: 'Only the odd ones (1 and 3), squared.',
  },
  {
    id: 'r-alias', concept: 'alias', mode: 'text', code: 'a = [1]\nb = a\nb.append(2)\nprint(len(a))', answer: '2',
    question: 'What does this program show?',
    explain: 'b is an alias of a: both names point to the same list.',
  },
  {
    id: 'r-copia', concept: 'alias', mode: 'choice',
    question: 'Which of these lines does NOT create an independent copy of list a?',
    options: [{ text: 'b = a', correct: true }, { text: 'b = a.copy()' }, { text: 'b = a[:]' }],
    explain: 'b = a just creates another name for the same list.',
  },
  // ---- Module 8 · strings
  {
    id: 'r-indice', concept: 'cadenas', mode: 'text', code: 's = "Python"\nprint(s[1], s[-1])', answer: 'y n',
    question: 'What does this program show?',
    explain: 'Position 1 is the second letter; −1 is the last.',
  },
  {
    id: 'r-porcion', concept: 'cadenas', mode: 'text', code: 'print("Valencia"[2:5])', answer: 'len',
    question: 'What does this program show?',
    explain: 'Positions 2, 3 and 4: l, e, n.',
  },
  {
    id: 'r-inmutable', concept: 'cadenas', mode: 'choice', code: 's = "hello"\ns[0] = "H"',
    question: 'What happens when this program runs?',
    options: [{ text: 'TypeError: texts can\'t be changed', correct: true }, { text: 's becomes "Hello"' }, { text: 'IndexError' }],
    explain: 'To get "Hello": s = "H" + s[1:].',
    expectError: 'TypeError',
  },
  {
    id: 'r-metodo-nuevo', concept: 'cadenas', mode: 'text', code: 'x = "abc"\nx.upper()\nprint(x)', answer: 'abc',
    question: 'What does this program show?',
    explain: 'upper() returns a new text that hasn\'t been stored: x stays the same.',
  },
  {
    id: 'r-find', concept: 'cadenas', mode: 'text', code: 'print("banana".find("n"), "banana".count("a"))', answer: '2 3',
    question: 'What does this program show?',
    explain: 'The first n is at position 2; there are three a\'s.',
  },
  {
    id: 'r-regex', concept: 'regex', mode: 'choice', code: 'import re\nprint(re.findall(r"\\d+", "1 and 22"))', answer: "['1', '22']",
    question: 'What does this program show?',
    options: [{ text: "['1', '22']", correct: true }, { text: "['1', '2', '2']" }, { text: '[1, 22]' }],
    explain: '\\d+ groups consecutive digits, and findall returns texts.',
  },
  // ---- Module 7 · loops and searching
  {
    id: 'r-range', concept: 'bucles', mode: 'choice', code: 'for i in range(1, 4):\n    print(i)', answer: '1\n2\n3',
    question: 'What does this program show?',
    options: [{ text: '1, 2 and 3, one per line', correct: true }, { text: '1, 2, 3 and 4' }, { text: '0, 1, 2 and 3' }],
    explain: 'range(1, 4) starts at 1 and doesn\'t include 4.',
  },
  {
    id: 'r-acumulador', concept: 'bucles', mode: 'text', code: 'total = 0\nfor n in range(1, 5):\n    total += n * 2\nprint(total)', answer: '20',
    question: 'What does this program show?',
    explain: '2 + 4 + 6 + 8 = 20.',
  },
  {
    id: 'r-while', concept: 'bucles', mode: 'text', code: 'n = 100\ntimes = 0\nwhile n > 1:\n    n //= 2\n    times += 1\nprint(times)', answer: '6',
    question: 'What does this program show?',
    explain: '100 → 50 → 25 → 12 → 6 → 3 → 1: six divisions.',
  },
  {
    id: 'r-break', concept: 'bucles', mode: 'text', code: 'for i in range(10):\n    if i == 3:\n        break\n    print(i, end="")', answer: '012',
    question: 'What does this program show?',
    explain: 'When it reaches 3, break leaves the loop before the print.',
  },
  {
    id: 'r-in', concept: 'busqueda', mode: 'text', code: 'print("ell" in "Hello", "h" in "Hello")', answer: 'True False',
    question: 'What does this program show?',
    explain: '"ell" appears inside "Hello"; lower-case "h" doesn\'t (the one in Hello is a capital).',
  },
  {
    id: 'r-return-bucle', concept: 'busqueda', mode: 'choice',
    question: 'In an is_prime function, where does the return True go?',
    options: [{ text: 'After the loop, when all the divisors have been tried', correct: true }, { text: 'In an else inside the loop' }, { text: 'Before the loop' }],
    explain: 'You only know it has no divisors after trying them all.',
  },
  // ---- Module 6 · return values and composition
  {
    id: 'r-muerto', concept: 'retorno', mode: 'text', code: 'def f():\n    return 1\n    return 2\n\nprint(f())', answer: '1',
    question: 'What does this program show?',
    explain: 'The first return ends the function: the second is dead code.',
  },
  {
    id: 'r-dos-valores', concept: 'retorno', mode: 'text', code: 'def f(x):\n    return x + 1, x * 2\n\na, b = f(5)\nprint(b, a)', answer: '10 6',
    question: 'What does this program show?',
    explain: 'a receives 6 and b receives 10; the print shows them in the order b, a.',
  },
  {
    id: 'r-andamio', concept: 'incremental', mode: 'choice',
    question: 'In incremental development, what is scaffolding?',
    options: [{ text: 'The temporary prints that show intermediate values', correct: true }, { text: 'The comments in the code' }, { text: 'The function header' }],
    explain: 'They\'re for checking as you build and are removed when you finish.',
  },
  {
    id: 'r-componer', concept: 'composicion', mode: 'text', code: 'def f(x):\n    return x + 3\n\ndef g(x):\n    return x * 10\n\nprint(g(f(1)))', answer: '40',
    question: 'What does this program show?',
    explain: 'From the inside out: f(1) = 4 and g(4) = 40.',
  },
  {
    id: 'r-isinstance', concept: 'tipos', mode: 'text', code: 'print(isinstance(2.5, float), isinstance(2.5, int))', answer: 'True False',
    question: 'What does this program show?',
    explain: '2.5 is a float, not an int.',
  },
  {
    id: 'r-bool-limpia', concept: 'composicion', mode: 'choice',
    question: 'What\'s the clearest way to write a function that says whether n is negative?',
    options: [{ text: 'return n < 0', correct: true }, { text: 'if n < 0: return True, otherwise return False' }, { text: 'return "True" if n < 0' }],
    explain: 'The comparison is already a boolean: return it directly.',
  },
  // ---- Module 5 · conditionals and recursion
  {
    id: 'r-igual', concept: 'booleanos', mode: 'choice',
    question: 'Which operator asks whether two values are equal?',
    options: [{ text: '==', correct: true }, { text: '=' }, { text: '===' }],
    explain: '`=` assigns; `==` compares.',
  },
  {
    id: 'r-and-or', concept: 'booleanos', mode: 'text', code: 'x = 7\nprint(x > 5 and x < 10, x < 0 or x > 6)', answer: 'True True',
    question: 'What does this program show?',
    explain: 'Both parts of the and hold; in the or, x > 6 is enough.',
  },
  {
    id: 'r-not', concept: 'booleanos', mode: 'text', code: 'print(not 3 > 5)', answer: 'True',
    question: 'What does this program show?',
    explain: 'The comparison goes first: 3 > 5 is False, and not False is True.',
  },
  {
    id: 'r-elif', concept: 'condicionales', mode: 'text', code: 'x = 15\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")', answer: 'A',
    question: 'What does this program show?',
    explain: 'Only the first true condition runs: 15 > 10.',
  },
  {
    id: 'r-sin-return', concept: 'condicionales', mode: 'text', code: 'def f(x):\n    if x > 0:\n        return "positive"\n\nprint(f(-1))', answer: 'None',
    question: 'What does this program show?',
    explain: 'With -1 the if doesn\'t hold and the function reaches the end without a return: it returns None.',
  },
  {
    id: 'r-factorial', concept: 'recursion', mode: 'text', code: 'def f(n):\n    if n == 0:\n        return 1\n    return n * f(n - 1)\n\nprint(f(3))', answer: '6',
    question: 'What does this program show?',
    explain: '3 × 2 × 1 × 1 = 6.',
  },
  {
    id: 'r-caso-base', concept: 'recursion', mode: 'choice',
    question: 'What happens to a recursive function with no base case?',
    options: [{ text: 'It calls itself non-stop until a RecursionError', correct: true }, { text: 'It returns None' }, { text: 'It runs just once' }],
    explain: 'The base case is what makes it end.',
  },
  // ---- Module 4 · function design
  {
    id: 'r-generalizar', concept: 'diseno', mode: 'choice',
    question: 'You have `def line_of_10(): print("-" * 10)`. What does generalising it mean?',
    options: [{ text: 'Replacing the 10 with a parameter: line(n)', correct: true }, { text: 'Giving it a longer name' }, { text: 'Calling it more times' }],
    explain: 'Generalising is replacing fixed values with parameters so the function works in more cases.',
  },
  {
    id: 'r-defecto', concept: 'parametros', mode: 'text', code: 'def f(a, b=3):\n    return a * b\n\nprint(f(2), f(2, 5))', answer: '6 10',
    question: 'What does this program show?',
    explain: 'Without a second argument, b is 3 by default: 2 × 3 = 6. With 5: 2 × 5 = 10.',
  },
  {
    id: 'r-nombrados', concept: 'parametros', mode: 'text', code: 'def div(a, b):\n    return a // b\n\nprint(div(b=2, a=9))', answer: '4',
    question: 'What does this program show?',
    explain: 'By name: a = 9 and b = 2, so 9 // 2 = 4.',
  },
  {
    id: 'r-salto', concept: 'diseno', mode: 'choice', code: 'print(("ab" + "\\n") * 2, end="")', answer: 'ab\nab',
    question: 'What does this program show?',
    options: [{ text: 'ab on two lines', correct: true }, { text: 'abab on one line' }, { text: 'ab\\nab as it is' }],
    explain: '"\\n" is a newline: "ab" appears on two lines.',
  },
  {
    id: 'r-refactor', concept: 'diseno', mode: 'choice',
    question: 'Refactoring a program means…',
    options: [{ text: 'Improving how it\'s written without changing what it does', correct: true }, { text: 'Adding new functions to it' }, { text: 'Making it give a better result' }],
    explain: 'If what it does changes, it\'s no longer refactoring.',
  },
  {
    id: 'r-constante', concept: 'diseno', mode: 'choice',
    question: 'By convention, how is a value that doesn\'t change, like VAT, written?',
    options: [{ text: 'VAT = 0.21', correct: true }, { text: 'vat = 0.21' }, { text: 'Vat = 0.21' }],
    explain: 'Constants are written in CAPITALS at the start of the program.',
  },
  // ---- Module 3 · parameters and return
  {
    id: 'r-param-orden', concept: 'parametros', mode: 'text', code: 'def subtract(a, b):\n    return a - b\n\nprint(subtract(2, 10))', answer: '-8',
    question: 'What does this program show?',
    explain: 'Arguments are assigned by position: a = 2 and b = 10, so 2 − 10 = −8.',
  },
  {
    id: 'r-return-none', concept: 'parametros', mode: 'text', code: 'def f(x):\n    x * 2\n\nprint(f(4))', answer: 'None',
    question: 'What does this program show?',
    explain: 'The function works out x * 2 but doesn\'t return it: without return, it returns None.',
  },
  {
    id: 'r-return-usar', concept: 'parametros', mode: 'text', code: 'def square(n):\n    return n * n\n\nprint(square(3) + square(4))', answer: '25',
    question: 'What does this program show?',
    explain: '9 + 16 = 25: each call is worth what it returns.',
  },
  {
    id: 'r-local', concept: 'parametros', mode: 'text', code: 'n = 1\n\ndef f():\n    n = 50\n\nf()\nprint(n)', answer: '1',
    question: 'What does this program show?',
    explain: 'The n inside is local: it doesn\'t change the n outside.',
  },
  {
    id: 'r-faltan-args', concept: 'errores', mode: 'choice', code: 'def add(a, b):\n    return a + b\n\nprint(add(1))',
    question: 'What happens when this program runs?',
    options: [{ text: 'TypeError: an argument is missing', correct: true }, { text: 'It shows 1' }, { text: 'It shows 2' }],
    explain: 'add needs two arguments and only receives one.',
    expectError: 'TypeError',
  },
  // ---- Module 3 · defining functions
  {
    id: 'r-def-sin-llamar', concept: 'funciones', mode: 'text', code: 'def f():\n    print("inside")\n\nprint("outside")', answer: 'outside',
    question: 'What does this program show?',
    explain: 'Defining doesn\'t run anything: f is never called, so only «outside» is shown.',
  },
  {
    id: 'r-def-llamadas', concept: 'funciones', mode: 'text', code: 'def f():\n    print("ok", end=" ")\n\nf()\nf()\nf()', answer: 'ok ok ok',
    question: 'What does this program show?',
    explain: 'Each call runs the body: three calls, three «ok».',
  },
  {
    id: 'r-def-partes', concept: 'funciones', mode: 'choice',
    question: 'Which is the correct header for a function?',
    options: [{ text: '`def greet():`', correct: true }, { text: '`def greet()`' }, { text: '`greet():`' }],
    explain: 'def, the name, the brackets and the colon at the end.',
  },
  {
    id: 'r-def-antes', concept: 'errores', mode: 'choice', code: 'f()\ndef f():\n    print("hello")',
    question: 'What happens when this program runs?',
    options: [{ text: 'NameError', correct: true }, { text: 'It shows hello' }, { text: 'SyntaxError' }],
    explain: 'The call happens before Python has read the definition.',
    expectError: 'NameError',
  },
  // ---- Module 3 · calling functions
  {
    id: 'r-len', concept: 'funciones', mode: 'text', code: 'print(len("luna py"))', answer: '7',
    question: 'What does this program show?',
    explain: '`len()` counts all the characters, including the space.',
  },
  {
    id: 'r-none', concept: 'funciones', mode: 'choice',
    question: 'What does `print("hello")` return?',
    options: [{ text: 'None', correct: true }, { text: 'The text "hello"' }, { text: 'Nothing: it gives an error' }],
    explain: 'print shows the text on screen, but the value it returns is `None`.',
  },
  {
    id: 'r-anidada', concept: 'funciones', mode: 'text', code: 'print(abs(min(-8, 3)))', answer: '8',
    question: 'What does this program show?',
    explain: 'From the inside out: min(-8, 3) = -8 and abs(-8) = 8.',
  },
  {
    id: 'r-floor-ceil', concept: 'modulos', mode: 'text', code: 'import math\nprint(math.floor(2.9), math.ceil(2.1))', answer: '2 3',
    question: 'What does this program show?',
    explain: '`floor` rounds down and `ceil` rounds up.',
  },
  {
    id: 'r-import', concept: 'modulos', mode: 'choice', code: 'print(math.pi)',
    question: 'What happens when this program runs?',
    options: [{ text: 'NameError: import math is missing', correct: true }, { text: 'It shows 3.141592653589793' }],
    explain: 'A module has to be imported before you use it.',
    expectError: 'NameError',
  },
  // ---- Module 2 · types and input
  {
    id: 'r-int-corta', concept: 'tipos', mode: 'text', code: 'print(int(9.7))', answer: '9',
    question: 'What does this program show?',
    explain: '`int()` cuts off the decimals, it doesn\'t round.',
  },
  {
    id: 'r-valueerror', concept: 'input', mode: 'choice', code: 'print(int("2.5"))',
    question: 'What happens when this program runs?',
    options: [{ text: 'ValueError', correct: true }, { text: 'It shows 2' }, { text: 'It shows 3' }],
    explain: 'A text with a point isn\'t a valid whole number for `int()`. First `float("2.5")`.',
    expectError: 'ValueError',
  },
  {
    id: 'r-sep', concept: 'print', mode: 'text', code: 'print(1, 2, 3, sep="")', answer: '123',
    question: 'What does this program show?',
    explain: 'With `sep=""` the values are stuck together with no spaces.',
  },
  {
    id: 'r-fstring', concept: 'print', mode: 'text', code: 'x = 4\nprint(f"{x} squared is {x ** 2}")', answer: '4 squared is 16',
    question: 'What does this program show?',
    explain: 'In an f-string, each `{ }` is replaced by the value of what it contains.',
  },
  {
    id: 'r-2f', concept: 'print', mode: 'text', code: 'print(f"{3.14159:.2f}")', answer: '3.14',
    question: 'What does this program show?',
    explain: '`:.2f` shows the number with 2 decimal places.',
  },
  {
    id: 'r-cp', concept: 'tipos', mode: 'choice',
    question: 'How would you store a phone number your program asks for?',
    options: [{ text: 'As text: input() without converting', correct: true }, { text: 'With int(input())' }, { text: 'With float(input())' }],
    explain: 'You don\'t do calculations with it and as a number it would lose any leading zeros.',
  },
  // ---- Module 2 · variables
  {
    id: 'r-concat', concept: 'tipos', mode: 'text', code: 'print("5" + "3")', answer: '53',
    question: 'What does this program show?',
    explain: 'With quotes, "5" and "3" are texts: + sticks them one after the other.',
  },
  {
    id: 'r-sum', concept: 'tipos', mode: 'text', code: 'print(5 + 3)', answer: '8',
    question: 'What does this program show?',
    explain: 'Without quotes they\'re whole numbers, so + adds them.',
  },
  {
    id: 'r-input-type', concept: 'input', mode: 'choice',
    question: 'If the user types 20, what type is x after `x = input()`?',
    options: [{ text: 'str (text)', correct: true }, { text: 'int (whole number)' }, { text: 'float (decimal number)' }],
    explain: 'input() always returns text. To calculate, convert it with int() or float().',
  },
  {
    id: 'r-reassign', concept: 'reasignacion', mode: 'text', code: 'x = 4\nx = x * 2\nx = x - 1\nprint(x)', answer: '7',
    question: 'What does this program show?',
    explain: '4 → 4 × 2 = 8 → 8 − 1 = 7. Each line uses the value the previous one left.',
  },
  {
    id: 'r-copy', concept: 'reasignacion', mode: 'text', code: 'a = 3\nb = a\na = 10\nprint(b)', answer: '3',
    question: 'What does this program show?',
    explain: 'b received the value a had at that moment (3). Changing a afterwards doesn\'t change b.',
  },
  {
    id: 'r-valid-name', concept: 'asignacion', mode: 'choice',
    question: 'Which of these variable names is valid?',
    options: [{ text: '`my_age`', correct: true }, { text: '`2age`' }, { text: '`my age`' }],
    explain: 'Names can\'t start with a number or contain spaces. The underscore is used to join words.',
  },
  {
    id: 'r-print-quotes', concept: 'print', mode: 'text', code: 'age = 18\nprint("age")', answer: 'age',
    question: 'What does this program show?',
    explain: 'In quotes, "age" is a literal text: the word is shown, not the variable\'s value.',
  },
  {
    id: 'r-print-commas', concept: 'print', mode: 'text', code: 'n = "Ana"\nprint("Hello", n, "!")', answer: 'Hello Ana !',
    question: 'What does this program show? (look at the spaces)',
    explain: 'print separates each item you put between commas with a space, including before "!".',
  },
  {
    id: 'r-nameerror', concept: 'errores', mode: 'choice', code: 'price = 10\nprint(Price)',
    question: 'What happens when this program runs?',
    options: [{ text: 'NameError: Price doesn\'t exist', correct: true }, { text: 'It shows 10' }, { text: 'It shows Price' }],
    explain: 'Python tells capitals and lower case apart: Price and price are different names.',
    expectError: 'NameError',
  },
  {
    id: 'r-typeerror', concept: 'errores', mode: 'choice', code: 'age = 20\nprint("Age: " + age)',
    question: 'What happens when this program runs?',
    options: [{ text: 'TypeError: you can\'t join text and a number with +', correct: true }, { text: 'It shows Age: 20' }, { text: 'SyntaxError' }],
    explain: 'With + you can\'t mix text and numbers. Solutions: str(age), or print("Age:", age).',
    expectError: 'TypeError',
  },
  {
    id: 'r-plan', concept: 'descomponer', mode: 'choice',
    question: 'To work out the average of three marks, which step comes first?',
    options: [{ text: 'Get the three marks', correct: true }, { text: 'Divide by 3' }, { text: 'Show the average' }],
    explain: 'Before calculating you need the data: dividing or showing depends on earlier steps.',
  },
];
