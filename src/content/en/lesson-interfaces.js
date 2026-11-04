// Lesson 4.2 · Interface design (English translation of src/content/lesson-interfaces.js).

const TOPIC = 'Function design';

export const LESSON_INTERFACES = {
  id: 'interfaces',
  moduleId: 'm4',
  code: '4.2',
  title: 'Interface design',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Explain what a function\'s interface is and why it matters',
    'Give parameters default values',
    'Call functions with keyword arguments',
    'Prefer returning to showing so the function is reusable',
    'Document a function with a docstring',
  ],
  prerequisites: ['Lesson 4.1 «Encapsulation and generalisation»'],
  teaser: 'A well-designed function can be understood just by looking at its header. Today you learn to design that «visible face».',
  celebration: 'You now design functions that are easy to use: with default values, keyword arguments, return and documentation.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'interfaz', title: 'The interface: what the function\'s user sees', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'A function\'s **interface** is what you need to know to use it without looking inside: its **name**, which **parameters** it takes and what it **returns**. It\'s a contract: «give me this and I\'ll give you that back».' },
        { type: 'p', text: 'Compare two versions of the same idea:' },
        { type: 'code', title: 'Poor interface', code: 'def area():\n    base = float(input("Base: "))\n    height = float(input("Height: "))\n    print(base * height)' },
        { type: 'code', run: true, title: 'Clear interface', code: 'def area(base, height):\n    return base * height\n\nprint(area(3, 4))\nprint(area(2, 5) + area(1, 1))' },
        { type: 'callout', tone: 'tip', title: 'Data goes in and out through the interface', text: 'The first one only works if a person types the data and it only shows the result. The second works in any context: with data from input, from a calculation or from another function, and its result can be reused.' },
        {
          type: 'check', id: 'm4i-interfaz', concept: 'diseno', mode: 'choice',
          question: 'You need to add up the areas of three rooms. Which version works for you?',
          options: [
            { text: 'area(base, height) with return', correct: true },
            { text: 'area() with input and print', why: 'It would ask for the data from the keyboard every time and only show the results: you couldn\'t add them up.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'defecto', title: 'Default values', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'A parameter can have a **default value**: it\'s used when the call doesn\'t give that argument. That way the usual case is short and the special case is still possible.' },
        { type: 'code', run: true, code: 'def greet(name, greeting="Hello"):\n    print(f"{greeting}, {name}")\n\ngreet("Ana")\ngreet("Ana", "Good evening")' },
        { type: 'callout', tone: 'warn', title: 'Parameters with a default value go at the end', text: '`def greet(greeting="Hello", name):` is a SyntaxError: Python wouldn\'t know which parameter to give a single argument to.' },
        {
          type: 'check', id: 'm4i-defecto', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'def price(base, vat=21):\n    return base + base * vat // 100\n\nprint(price(200), price(200, 10))', answer: '242 220',
          explain: 'With no second argument, vat is 21: 200 + 42 = 242. With 10: 200 + 20 = 220.',
        },
        {
          type: 'check', id: 'm4i-orden-defecto', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'def greet(greeting="Hello", name):\n    print(greeting, name)', expectError: 'SyntaxError',
          options: [
            { text: 'SyntaxError: the parameter without a default value goes after', correct: true },
            { text: 'Nothing: the function is defined without problems', why: 'Parameters with a default value have to go after the ones that don\'t have one.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nombrados', title: 'Keyword arguments', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'You can say which parameter each argument goes to by writing its **name**. That way the order doesn\'t matter and the call reads better. You were already using it with `print(..., sep="-")`!' },
        { type: 'code', run: true, code: 'def rectangle(width, height, symbol="#"):\n    print(((symbol * width) + "\\n") * height, end="")\n\nrectangle(4, 2)\nrectangle(height=1, width=6, symbol="*")\nrectangle(3, 2, symbol="o")' },
        { type: 'callout', tone: 'info', title: 'Positional first, then keyword', text: 'You can mix both, but positional arguments go first: `rectangle(3, 2, symbol="o")` yes; `rectangle(symbol="o", 3, 2)` no.' },
        {
          type: 'check', id: 'm4i-nombre', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'def subtract(a, b):\n    return a - b\n\nprint(subtract(b=10, a=3))', answer: '-7',
          explain: 'With names, the order you write them in doesn\'t matter: a = 3 and b = 10, so 3 − 10 = −7.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Returning gives you more options than showing', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: 'A function that **returns** a text instead of showing it is more flexible: you can show it, join it with others or store it.' },
        { type: 'code', run: true, code: 'def line(n, symbol="-"):\n    return symbol * n\n\nprint(line(10))\ntitle = line(3, "=") + " Menu " + line(3, "=")\nprint(title)\nprint(len(line(7)))' },
        {
          type: 'check', id: 'm4i-devolver', concept: 'diseno', mode: 'text',
          question: 'Predict:', code: 'def echo(text, times=2):\n    return text * times\n\nprint(echo("bo") + echo("!", 3))', answer: 'bobo!!!',
          explain: '`echo("bo")` returns "bobo" (times = 2 by default) and `echo("!", 3)` returns "!!!".',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'docstring', title: 'Documenting with docstrings', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'A **docstring** is a text in triple quotes right under the `def`. It explains what the function does, what it takes and what it returns. Python stores it in `__doc__`, and editors show it when you type the function\'s name:' },
        { type: 'code', run: true, code: 'def area(base, height):\n    """Return the area of a rectangle with the given base and height."""\n    return base * height\n\nprint(area.__doc__)' },
        { type: 'callout', tone: 'tip', title: 'A good docstring', text: 'It starts with a verb and says **what**, not how: «Return the price with VAT for the given price». If a parameter has a unit or a condition (in euros, greater than 0…), say so.' },
        {
          type: 'check', id: 'm4i-docstring', concept: 'diseno', mode: 'choice',
          question: 'Which is the best docstring for `def vat(price):` that returns `price * 0.21`?',
          options: [
            { text: '"""Return the VAT (21 %) of the given price, in euros."""', correct: true },
            { text: '"""Multiply price by 0.21."""', why: 'It tells the **how**, which you can already see in the code. Better to explain what the result means.' },
            { text: '"""vat function."""', why: 'It adds nothing the name doesn\'t already say.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'int-predict' },
    { id: 'a2', activity: 'int-complete' },
    { id: 'a3', activity: 'int-fix' },
    { id: 'a4', activity: 'int-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A function\'s **interface** is its name, its parameters and what it returns: what you need to use it without looking inside.',
    'Data should come in through parameters and go out with `return`, not with `input` and `print` inside.',
    '**Default values** (`symbol="-"`) keep the usual case short; they go at the end.',
    '**Keyword arguments** (`symbol="*"`) allow any order and read better; they go after the positional ones.',
    'A **docstring** explains what the function does; it\'s stored in `__doc__`.',
  ],
};

export const ACTIVITIES_INTERFACES = {
  'int-predict': {
    id: 'int-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Powers to order', difficulty: 2, xp: 10, concepts: ['parametros', 'diseno'],
    prompt: 'Default values and keyword arguments on the same line. **What will it show?**',
    code: 'def power(base, exponent=2):\n    return base ** exponent\n\nprint(power(3), power(2, 5), power(exponent=3, base=2))',
    expectedOutput: '9 32 8',
    options: [
      { text: '9 32 8', correct: true },
      { text: '3 32 8', concept: 'parametros', why: 'With no second argument, `exponent` takes its default value, 2: 3 ** 2 = 9.' },
      { text: '9 32 9', concept: 'parametros', why: 'With names, each value goes to its parameter even if the order changes: base = 2 and exponent = 3, so 8.' },
      { text: 'An error in the third call', concept: 'parametros', why: 'Keyword arguments can be written in any order.' },
    ],
    explain: ['`power(3)`: exponent = 2 by default → 9.', '`power(2, 5)` → 32.', '`power(exponent=3, base=2)` → 2 ** 3 = 8.'],
  },
  'int-complete': {
    id: 'int-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Line with a default value', difficulty: 2, xp: 15, concepts: ['parametros', 'diseno'],
    statement: 'Fill in the gaps: the symbol of `line` must be `"-"` **by default**, and the second call must ask for a line of asterisks.',
    expected: '-----\n***',
    starter: 'def line(n, symbol___):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, ___))',
    spec: {
      blanks: true,
      functions: [{ name: 'line', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['-----', '***'] },
        { label: 'print(line(4))', call: 'print(line(4))', out_lines: ['----'] },
        { label: 'print(line(2, "="))', call: 'print(line(2, "="))', out_lines: ['=='] },
      ],
      logic_msg: 'Check the gaps: the first gives symbol its default value; the second is the symbol of the second line.',
    },
    hints: [
      { level: 'Orientation', text: 'The first gap goes right after `symbol`, in the header. The second is an argument of the call.' },
      { level: 'Reasoning', text: 'A default value is written with `=` in the header. Which text do you want it to use if none is given?' },
      { level: 'Pseudocode', text: 'header: line(n, symbol which by default is "-")\nsecond call: line(3, the text "*")', pre: true },
      { level: 'Technical help', text: '`def line(n, symbol="-"):` and `line(3, "*")` (or `line(3, symbol="*")`).' },
    ],
    solution: {
      code: 'def line(n, symbol="-"):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, "*"))',
      explanation: 'With `symbol="-"`, `line(5)` uses the dash without you having to say so; `line(3, "*")` replaces it with an asterisk.',
    },
    reference: [
      'def line(n, symbol="-"):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, "*"))',
      "def line(n, symbol='-'):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, symbol='*'))",
    ],
    wrongs: [
      { code: 'def line(n, symbol___):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, ___))', category: 'incompleto' },
      { code: 'def line(n, symbol):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, "*"))', category: 'ejecucion' },
      { code: 'def line(n, symbol="-"):\n    return symbol * n\n\nprint(line(5))\nprint(line(3, *))', category: 'sintaxis' },
    ],
  },
  'int-fix': {
    id: 'int-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The function that can\'t be used', difficulty: 3, xp: 25, concepts: ['diseno', 'parametros', 'errores'],
    statement: 'The main program wants to add up the area of two rectangles, but the function has a **badly designed interface**: it asks for the data with input and shows instead of returning. **Redesign the function** (without changing the main program) so it works.',
    expected: 'Total: 22',
    starter: 'def rectangle_area():\n    base = float(input("Base: "))\n    height = float(input("Height: "))\n    print(base * height)\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)',
    spec: {
      cases: [
        { label: 'Whole program', out_lines: ['Total: 22'] },
        { label: 'print(rectangle_area(2.5, 2))', call: 'print(rectangle_area(2.5, 2))', out_lines: ['5.0'] },
      ],
      misconceptions: [
        { out_lines: ['12', '10', 'Total: 22'], title: 'There\'s an extra print', msg: 'The function now returns the area, but it also shows it. Remove the `print` from the function: showing is the main program\'s job.' },
      ],
      rules: [{ type: 'must_call', name: 'rectangle_area', title: 'Use the function', msg: 'The main program must keep calling rectangle_area.' }],
      logic_msg: 'The output doesn\'t match. Does the function return base × height?',
    },
    hints: [
      { level: 'Orientation', text: 'Run it and read the error: the function doesn\'t accept arguments, but the program passes it two.' },
      { level: 'Reasoning', text: 'The data must **come in** through parameters (not input) and the result **go out** with return (not print). Change the header and the body.' },
      { level: 'Pseudocode', text: 'define rectangle_area(base, height):\n    return base × height', pre: true },
      { level: 'Technical help', text: '`def rectangle_area(base, height):` and in the body only `return base * height`.' },
    ],
    solution: {
      code: 'def rectangle_area(base, height):\n    return base * height\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)',
      explanation: 'With parameters and return, the function receives the data from the program and gives it back the area, which can be added up. It\'s the same idea, with an interface that works for any use.',
    },
    reference: ['def rectangle_area(base, height):\n    return base * height\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)'],
    wrongs: [
      { code: 'def rectangle_area():\n    base = float(input("Base: "))\n    height = float(input("Height: "))\n    print(base * height)\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)', category: 'ejecucion' },
      { code: 'def rectangle_area(base, height):\n    print(base * height)\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)', category: 'ejecucion' },
      { code: 'def rectangle_area(base, height):\n    print(base * height)\n    return base * height\n\ntotal = rectangle_area(3, 4) + rectangle_area(2, 5)\nprint("Total:", total)', category: 'comprension' },
    ],
  },
  'int-build': {
    id: 'int-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Price labels', difficulty: 3, xp: 30, concepts: ['diseno', 'parametros', 'print'],
    unlock: { any: ['int-predict', 'int-complete', 'int-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'A shop needs a function `label(name, price, currency="€")` that **returns** (doesn\'t show) the label text with the price to **2 decimal places**:\n\n`label("Bread", 1.2)` → `"Bread: 1.20 €"`\n\n`label("Book", 15, "$")` → `"Book: 15.00 $"`\n\nInclude a docstring that explains what it returns.',
    expected: 'Bread: 1.20 €',
    plan: [
      {
        q: 'What does the header need to have?',
        options: [
          { text: 'Three parameters, with currency="€" as the default at the end', correct: true },
          { text: 'Two parameters: name and price', why: 'It also has to accept the currency when one is given (`"$"`), so it needs a third parameter with a default value.' },
        ],
      },
      {
        q: 'How do you get exactly 2 decimal places?',
        options: [
          { text: 'With an f-string and the :.2f format', correct: true },
          { text: 'With round(price, 2)', why: '`round(1.2, 2)` is still 1.2: it rounds, but doesn\'t add the zero. To show 1.20 you need the `:.2f` format.' },
        ],
      },
    ],
    planScaffold: 'def label(name, price, currency="€"):\n    """..."""\n    # Build and return the text\n\n\nprint(label("Bread", 1.2))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'label', params: 3 }],
      cases: [
        { label: 'label("Bread", 1.2)', call: 'print(label("Bread", 1.2))', out_lines: ['Bread: 1.20 €'] },
        { label: 'label("Book", 15, "$")', call: 'print(label("Book", 15, "$"))', out_lines: ['Book: 15.00 $'] },
        { label: 'label("Tea", 3.456, currency="£")', call: 'print(label("Tea", 3.456, currency="£"))', out_lines: ['Tea: 3.46 £'] },
      ],
      misconceptions: [
        { out_lines: ['Bread: 1.20 €', 'None'], title: 'It shows, but doesn\'t return', msg: 'The function uses `print`. It has to **return** the text with `return` so it can be used anywhere.' },
        { out_lines: ['Bread: 1.2 €'], title: 'Decimals are missing', msg: 'The price must be shown with exactly 2 decimal places: use `{price:.2f}` inside an f-string.' },
      ],
      logic_msg: 'Compare the returned text with the expected one character by character: the colon, the spaces, the decimals and the currency.',
    },
    hints: [
      { level: 'Orientation', text: 'A function with three parameters (the last with a default value) that returns a text.' },
      { level: 'Reasoning', text: 'Build the text with an f-string: the name, a colon, the price with 2 decimal places and the currency.' },
      { level: 'Pseudocode', text: 'define label(name, price, currency = "€"):\n    return «name: price with 2 decimal places currency»', pre: true },
      { level: 'Technical help', text: '`return f"{name}: {price:.2f} {currency}"`. The docstring goes on the first line of the body, in triple quotes.' },
    ],
    solution: {
      code: 'def label(name, price, currency="€"):\n    """Return the label text: name and price with 2 decimal places."""\n    return f"{name}: {price:.2f} {currency}"\n\nprint(label("Bread", 1.2))\nprint(label("Book", 15, "$"))',
      explanation: 'The interface is easy to use: the usual case only needs name and price, and the currency can be changed. Because it returns the text, it works for showing it, storing it or printing lots of labels.',
    },
    reference: [
      'def label(name, price, currency="€"):\n    """Return the label text."""\n    return f"{name}: {price:.2f} {currency}"',
    ],
    wrongs: [
      { code: 'def label(name, price, currency="€"):\n    print(f"{name}: {price:.2f} {currency}")', category: 'comprension' },
      { code: 'def label(name, price, currency="€"):\n    return f"{name}: {price} {currency}"', category: 'comprension' },
      { code: 'def label(name, price):\n    return f"{name}: {price:.2f} €"', category: 'comprension' },
    ],
  },
};
