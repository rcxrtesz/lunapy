// Lesson 3.1 · Calling functions (English translation of src/content/lesson-llamar-funciones.js).

const TOPIC = 'Functions';

export const LESSON_LLAMAR_FUNCIONES = {
  id: 'llamar-funciones',
  moduleId: 'm3',
  code: '3.1',
  title: 'Calling functions',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Recognise the parts of a call: name, arguments and returned value',
    'Tell returning a value apart from showing it',
    'Combine calls and predict in what order they are evaluated',
    'Import the math module and use its functions',
    'Understand the typical errors when calling a function',
  ],
  prerequisites: ['Module 2 «Variables, types and expressions»'],
  teaser: 'You\'re starting Module 3: today you find out what really happens when you write print(), round() or len(), and you add the math module to your toolbox.',
  celebration: 'You now use functions like a pro: what they take, what they return and how to combine them. In the next lesson you\'ll create your own.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'anatomia', title: 'Anatomy of a call', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'You\'ve already used lots of functions: `print()`, `round()`, `input()`, `int()`… A **function** is a named piece of code that does a task. **Calling** it is asking it to do it.' },
        {
          type: 'five', items: {
            'Name': 'Which function you want to use: `round`.',
            'Arguments': 'The data you give it, in brackets and separated by commas: `round(3.14159, 2)`.',
            'Returned value': 'The result it hands back: `3.14`. The whole call is «worth» that result.',
          },
        },
        { type: 'p', text: 'Three very useful new functions: `len()` counts the characters in a text, and `max()` and `min()` give the largest and the smallest of their arguments.' },
        { type: 'code', run: true, code: 'print(len("Python"))\nprint(max(4, 9, 2), min(4, 9, 2))\nprint(abs(-7))' },
        {
          type: 'check', id: 'm3a-len', concept: 'funciones', mode: 'text',
          question: 'Predict:', code: 'print(len("hello world"))', answer: '11',
          explain: '`len()` counts every character, including the space: 5 + 1 + 5 = 11.',
        },
        {
          type: 'check', id: 'm3a-maxmin', concept: 'funciones', mode: 'text',
          question: 'Predict:', code: 'print(max(3, 8, 5) - min(3, 8, 5))', answer: '5',
          explain: 'Each call is replaced by its value: 8 − 3 = 5.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Returning is not showing', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Some functions **return** a value you can store and keep using, like `round()` or `len()`. Others **do something** and don\'t return anything useful, like `print()`: it shows on the screen and returns `None`, Python\'s special value for «nothing».' },
        { type: 'code', run: true, code: 'r = round(2.567, 1)\nprint(r * 2)\nx = print("hello")\nprint(x)' },
        { type: 'callout', tone: 'warn', title: 'A very common mix-up', text: 'Something appearing on the screen doesn\'t mean it has been stored. `round(2.567, 1)` on its own, without `print` or a variable, calculates 2.6… and the result is lost.' },
        {
          type: 'check', id: 'm3a-none', concept: 'funciones', mode: 'choice',
          question: 'What will this program show?', code: 'x = print("hello")\nprint(x)', expectOutput: 'hello\nNone',
          options: [
            { text: 'hello and, on the next line, None', correct: true },
            { text: 'hello twice', why: '`print("hello")` shows hello, but what it **returns** (and is stored in x) is `None`.' },
            { text: 'Just hello', why: 'The second line shows the value of x, which is `None`: what print returns.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'composicion', title: 'Combining calls', concepts: ['funciones', 'expresiones'],
      blocks: [
        { type: 'p', text: 'An argument can be any expression, including another call. Python evaluates **from the inside out**: first the innermost call, then the one that contains it.' },
        { type: 'code', run: true, code: 'print(round(abs(-3.14159), 2))\nprint(len(str(2 ** 10)))', caption: '`abs(-3.14159)` → 3.14159 → `round(3.14159, 2)` → 3.14. And `2 ** 10` is 1024, which as text has 4 characters.' },
        { type: 'p', text: 'See how it\'s evaluated step by step, storing each in-between result:' },
        { type: 'trace', code: 'number = -3.14159\npositive = abs(number)\nrounded = round(positive, 2)\nprint(rounded)' },
        {
          type: 'check', id: 'm3a-compuesta', concept: 'funciones', mode: 'text',
          question: 'Predict:', code: 'print(len(str(12345)))', answer: '5',
          explain: '`str(12345)` is the text "12345", which has 5 characters.',
        },
        {
          type: 'check', id: 'm3a-max-len', concept: 'funciones', mode: 'text',
          question: 'Predict:', code: 'print(max(len("sun"), len("moon")))', answer: '4',
          explain: 'First the inner calls: 3 and 4. Then `max(3, 4)` → 4.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulos', title: 'Modules: the math example', concepts: ['modulos', 'funciones'],
      blocks: [
        { type: 'p', text: 'Python groups related functions into **modules**. To use one, you first **import** it with `import`. Then you reach what it contains with a dot: `module.function()`.' },
        { type: 'code', run: true, code: 'import math\n\nprint(math.sqrt(16))   # square root\nprint(math.pi)         # the number π\nprint(math.floor(3.7)) # rounds down\nprint(math.ceil(3.2))  # rounds up' },
        { type: 'callout', tone: 'tip', title: 'Import at the start', text: 'The `import` lines go at the top of the program. That way anyone can see at a glance which tools it uses.' },
        {
          type: 'check', id: 'm3a-ceil', concept: 'modulos', mode: 'text',
          question: 'Predict:', code: 'import math\nprint(math.ceil(7 / 2))', answer: '4',
          explain: '7 / 2 = 3.5 and `ceil` always rounds up: 4.',
        },
        {
          type: 'check', id: 'm3a-sin-import', concept: 'modulos', mode: 'choice',
          question: 'What happens?', code: 'print(math.sqrt(9))', expectError: 'NameError',
          options: [
            { text: 'NameError: math doesn\'t exist', correct: true },
            { text: 'It shows 3.0', why: 'Without `import math`, Python doesn\'t know what `math` is.' },
          ],
          explain: 'Before using a module you have to import it: `import math`.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'Errors when calling functions', concepts: ['errores', 'funciones'],
      blocks: [
        { type: 'p', text: 'Every function expects specific arguments. If you give it more, fewer or the wrong type, it complains with a **TypeError**. Run and read:' },
        { type: 'code', run: true, title: 'An argument of a type it doesn\'t accept', code: 'print(len(2026))' },
        { type: 'code', run: true, title: 'Too many arguments', code: 'print(abs(-3, -4))' },
        { type: 'code', run: true, title: 'Forgetting the brackets', code: 'print(len)', caption: 'It doesn\'t give an error, but it doesn\'t call the function: it shows the function itself. Without brackets there\'s no call.' },
        {
          type: 'check', id: 'm3a-typeerror', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'print(len(42))', expectError: 'TypeError',
          options: [
            { text: 'TypeError: a number has no length', correct: true },
            { text: 'It shows 2', why: '`len()` counts the characters of a text; a number doesn\'t have any. `len(str(42))` would give 2.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'fun-predict' },
    { id: 'a2', activity: 'fun-complete' },
    { id: 'a3', activity: 'fun-fix' },
    { id: 'a4', activity: 'fun-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A call has a **name**, **arguments** and a **returned value**: `round(3.14159, 2)` is worth 3.14.',
    'Returning isn\'t showing: `print()` shows and returns `None`.',
    '`len()` counts characters; `max()` and `min()` give the largest and the smallest.',
    'Calls can be combined and are evaluated from the inside out.',
    '`import math` gives access to `math.sqrt`, `math.pi`, `math.floor` and `math.ceil`.',
    'Too many, too few or wrong-type arguments produce a TypeError.',
  ],
};

export const ACTIVITIES_LLAMAR_FUNCIONES = {
  'fun-predict': {
    id: 'fun-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Counting letters', difficulty: 1, xp: 10, concepts: ['funciones'],
    prompt: 'Three functions work with the same data. **What will it show?**',
    code: 'word = "computers"\nn = len(word)\nprint(n, max(n, 5), round(n / 4))',
    expectedOutput: '9 9 2',
    options: [
      { text: '9 9 2', correct: true },
      { text: '9 5 2', concept: 'funciones', why: '`max()` returns the **largest** of its arguments: between 9 and 5, it\'s 9.' },
      { text: '9 9 2.25', concept: 'funciones', why: '`round()` with a single argument rounds to the nearest whole number: 9 / 4 = 2.25 → 2.' },
      { text: '8 9 2', concept: 'funciones', why: 'Count again: c-o-m-p-u-t-e-r-s is 9 letters.' },
    ],
    explain: ['`len("computers")` → 9.', '`max(9, 5)` → 9.', '`round(9 / 4)` → `round(2.25)` → 2.'],
  },
  'fun-complete': {
    id: 'fun-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The hypotenuse', difficulty: 2, xp: 15, concepts: ['modulos', 'funciones'],
    statement: 'By Pythagoras\' theorem, the hypotenuse of a right-angled triangle is the **square root** of a² + b². Fill in the gaps to work it out and show it **rounded to 2 decimal places**:',
    expected: 'The hypotenuse is 5.0',
    starter: 'import math\n\na = 3\nb = 4\nc = math.___(a ** 2 + b ** 2)\nprint("The hypotenuse is", ___(c, 2))',
    spec: {
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['a', 'b', 'c'], // the usual notation for Pythagoras' theorem
      blanks: true,
      cases: [{ label: 'Sides 3 and 4', out_lines: ['The hypotenuse is 5.0'] }],
      variants: [{
        label: 'Sides 5 and 7', set: { a: 5, b: 7 }, out_lines: ['The hypotenuse is 8.6'],
        msg: 'It works with 3 and 4, but not with 5 and 7 (it should give 8.6). Calculate with the variables a and b.',
      }],
      misconceptions: [
        { out_lines: ['The hypotenuse is 25.0'], title: 'The square root is missing', msg: '25 is a² + b². The hypotenuse is its **square root**: `math.sqrt`.' },
      ],
      logic_msg: 'Compare your output with the expected one. Which math function works out the square root? Which one rounds?',
    },
    hints: [
      { level: 'Orientation', text: 'Two gaps: a `math` function that does square roots and a function that rounds.' },
      { level: 'Reasoning', text: 'Square root is *sqrt* for short. To round to 2 decimal places you\'ve known a function since Module 1.' },
      { level: 'Pseudocode', text: 'c ← square root of (a² + b²)\nshow c rounded to 2 decimal places', pre: true },
      { level: 'Technical help', text: '`math.sqrt(x)` works out the square root and `round(x, 2)` rounds to 2 decimal places.' },
    ],
    solution: {
      code: 'import math\n\na = 3\nb = 4\nc = math.sqrt(a ** 2 + b ** 2)\nprint("The hypotenuse is", round(c, 2))',
      explanation: '`math.sqrt(9 + 16)` → `math.sqrt(25)` → 5.0, and `round(5.0, 2)` → 5.0. With sides 5 and 7 it would give 8.6.',
    },
    reference: ['import math\n\na = 3\nb = 4\nc = math.sqrt(a ** 2 + b ** 2)\nprint("The hypotenuse is", round(c, 2))'],
    wrongs: [
      { code: 'import math\n\na = 3\nb = 4\nc = math.___(a ** 2 + b ** 2)\nprint("The hypotenuse is", ___(c, 2))', category: 'incompleto' },
      { code: 'import math\n\na = 3\nb = 4\nc = math.Sqrt(a ** 2 + b ** 2)\nprint("The hypotenuse is", round(c, 2))', category: 'ejecucion' },
      { code: 'import math\n\na = 3\nb = 4\nc = a ** 2 + b ** 2\nprint("The hypotenuse is", round(c, 2))', category: 'comprension' },
      { code: 'import math\n\na = 3\nb = 4\nprint("The hypotenuse is", 5.0)', category: 'logica' },
    ],
  },
  'fun-fix': {
    id: 'fun-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The area of the circle', difficulty: 2, xp: 20, concepts: ['modulos', 'errores'],
    statement: 'This program should show the area of a circle with radius 5 rounded to 2 decimal places, but it has **two errors**. Run it, read each error and fix it.',
    expected: 'Area: 78.54',
    starter: 'radius = 5\narea = math.pi * radius ** 2\nprint("Area:", Round(area, 2))',
    spec: {
      cases: [{ label: 'Radius 5', out_lines: ['Area: 78.54'] }],
      variants: [{
        label: 'Radius 2', set: { radius: 2 }, out_lines: ['Area: 12.57'],
        msg: 'It works with radius 5, but not with other radii: calculate the area from the radius variable.',
      }],
      misconceptions: [
        { out_lines: ['Area: 78.5'], title: 'Check π', msg: 'Use `math.pi` instead of writing 3.14: it\'s much more precise.' },
      ],
      logic_msg: 'The output doesn\'t match. The area of a circle is π × radius².',
    },
    hints: [
      { level: 'Orientation', text: 'Run the program: the first error is a NameError on line 2. Which name doesn\'t Python know?' },
      { level: 'Reasoning', text: 'To use `math.pi`, Python has to know the `math` module. Which line is missing at the start? Then look at the capitals on line 3.' },
      { level: 'Pseudocode', text: 'New line at the start: import the math module\nLine 3: write round in lower case', pre: true },
      { level: 'Technical help', text: '`import math` goes on the first line. Python is case-sensitive: the function is `round`, not `Round`.' },
    ],
    solution: {
      code: 'import math\n\nradius = 5\narea = math.pi * radius ** 2\nprint("Area:", round(area, 2))',
      explanation: 'Without `import math`, the name `math` doesn\'t exist (NameError). Once it\'s imported, the second NameError appears: `Round` with a capital isn\'t a function; the right one is `round`.',
    },
    reference: [
      'import math\n\nradius = 5\narea = math.pi * radius ** 2\nprint("Area:", round(area, 2))',
      'import math\nradius = 5\nprint("Area:", round(math.pi * radius ** 2, 2))',
    ],
    wrongs: [
      { code: 'radius = 5\narea = math.pi * radius ** 2\nprint("Area:", Round(area, 2))', category: 'ejecucion' },
      { code: 'import math\nradius = 5\narea = math.pi * radius ** 2\nprint("Area:", Round(area, 2))', category: 'ejecucion' },
      { code: 'radius = 5\narea = 3.14 * radius ** 2\nprint("Area:", round(area, 2))', category: 'comprension' },
      { code: 'radius = 5\nprint("Area:", 78.54)', category: 'logica' },
    ],
  },
  'fun-build': {
    id: 'fun-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Moving house with books', difficulty: 3, xp: 30, concepts: ['modulos', 'input', 'descomponer'],
    unlock: { any: ['fun-predict', 'fun-complete', 'fun-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'You\'re moving house and you have to pack your books. Write a program that asks **how many books** you have and **how many fit in each box**, and shows **how many boxes you need**.\n\nExample: 50 books, 12 per box → `5` boxes (4 full ones and one with the 2 left over).\n\nShow the number of boxes on the **last line**.',
    plan: [
      {
        q: 'With 50 books and 12 per box, 50 / 12 = 4.17. How many boxes do you need?',
        options: [
          { text: '5: the box with the leftover books counts too', correct: true },
          { text: '4', why: 'With 4 boxes you only pack 48 books: 2 would be left out.' },
          { text: '4.17', why: 'There\'s no such thing as 0.17 of a box: you have to round up.' },
        ],
      },
      {
        q: 'Which function always rounds up?',
        options: [
          { text: 'math.ceil()', correct: true },
          { text: 'round()', why: '`round()` goes to the **nearest** whole number: round(4.17) is 4.' },
          { text: 'math.floor()', why: '`floor` rounds **down**.' },
          { text: 'int()', why: '`int()` cuts off the decimals: it would also give 4.' },
        ],
      },
    ],
    planScaffold: '# Import what you need\n\n# Input: books and books per box\n\n# Processing: boxes needed (rounding up)\n\n# Output\n',
    starter: '',
    spec: {
      cases: [
        { label: '50 books, 12 per box', stdin: ['50', '12'], args: { l: 50, c: 12 } },
        { label: 'Exact case: 48 books, 12 per box', stdin: ['48', '12'], args: { l: 48, c: 12 } },
        { label: 'Edge case: 1 book, 10 per box', stdin: ['1', '10'], args: { l: 1, c: 10 } },
      ],
      expect_last_number: '-(-l // c)',
      hidden: { count: 2, args: { l: [1, 500, 0], c: [1, 40, 0] }, stdin: ['l', 'c'] },
      tolerance: 0,
      misconceptions: [
        { expr: 'l // c', title: 'Some books are left out', msg: 'With `//` (or `round`, `int` or `floor`) the leftover books don\'t get a box. Round **up** with `math.ceil()`.' },
        { expr: 'l / c', title: 'There are no half boxes', msg: 'The result has decimals: you need a whole number of boxes, rounded up with `math.ceil()`.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the data', msg: 'Use input() to ask for the books and the capacity of each box.' }],
    },
    hints: [
      { level: 'Orientation', text: 'Two inputs (books and capacity) and one result (boxes). Remember that a half-full box is still a box.' },
      { level: 'Reasoning', text: 'Divide the books by the capacity. If it comes out with decimals, you need one more box: that\'s rounding up.' },
      { level: 'Pseudocode', text: 'books ← ask for a whole number\ncapacity ← ask for a whole number\nboxes ← books ÷ capacity, rounded up\nshow boxes', pre: true },
      { level: 'Technical help', text: '`import math` at the start and `math.ceil(books / capacity)` to round up.' },
    ],
    solution: {
      code: 'import math\n\nbooks = int(input("How many books do you have? "))\ncapacity = int(input("How many fit in a box? "))\nboxes = math.ceil(books / capacity)\nprint("You need", boxes, "boxes")',
      explanation: '`books / capacity` gives 4.17 and `math.ceil` takes it up to 5. With 48 books it gives exactly 4.0 and ceil leaves it at 4: no extra box.',
    },
    reference: [
      'import math\nbooks = int(input())\ncapacity = int(input())\nprint(math.ceil(books / capacity))',
      'books = int(input())\ncapacity = int(input())\nprint((books + capacity - 1) // capacity)',
    ],
    wrongs: [
      { code: 'books = int(input())\ncapacity = int(input())\nprint(books // capacity)', category: 'comprension' },
      { code: 'books = int(input())\ncapacity = int(input())\nprint(math.ceil(books / capacity))', category: 'ejecucion' },
      { code: 'print(5)', category: 'logica' },
    ],
  },
};
