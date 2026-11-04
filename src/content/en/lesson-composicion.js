// Lesson 6.3 · Composition and boolean functions (English translation of src/content/lesson-composicion.js).

const TOPIC = 'Return values';

export const LESSON_COMPOSICION = {
  id: 'composicion',
  moduleId: 'm6',
  code: '6.3',
  title: 'Composition and boolean functions',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Build new functions by calling others that already work',
    'Simplify boolean functions that use if to return True or False',
    'Use boolean functions as conditions',
    'Protect a function from invalid data with isinstance',
    'Combine recursion and composition (Fibonacci)',
  ],
  prerequisites: ['Lesson 6.2 «Incremental development»', 'Lesson 5.3 «Recursion»'],
  teaser: 'With small functions that already work you can build bigger ones as if they were building blocks.',
  celebration: 'You\'ve completed Module 6: you build functions out of other functions, write clean boolean functions and protect your code from strange data.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'componer', title: 'Composition: functions made of functions', concepts: ['composicion'],
      blocks: [
        { type: 'p', text: '**Composing** is using functions that already work to build new ones. For example, the area of a circle given its centre and a point on the edge: the radius is the distance between the two points.' },
        { type: 'code', run: true, code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef area(radius):\n    return math.pi * radius ** 2\n\ndef circle_area(xc, yc, xp, yp):\n    return area(distance(xc, yc, xp, yp))\n\nprint(round(circle_area(0, 0, 3, 4), 2))', caption: 'circle_area doesn\'t repeat any formula: it trusts distance and area, which are already tested.' },
        {
          type: 'check', id: 'm6c-componer', concept: 'composicion', mode: 'text',
          question: 'Predict:', code: 'def double(x):\n    return x * 2\n\ndef plus_one(x):\n    return x + 1\n\nprint(double(plus_one(4)), plus_one(double(4)))', answer: '10 9',
          explain: 'From the inside out: double(5) = 10 and plus_one(8) = 9. The order of composition matters.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'booleanas', title: 'Clean boolean functions', concepts: ['composicion', 'booleanos'],
      blocks: [
        { type: 'p', text: 'It\'s very common to see boolean functions written like this:' },
        { type: 'code', title: 'It works, but there\'s code to spare', code: 'def is_divisible(x, y):\n    if x % y == 0:\n        return True\n    else:\n        return False' },
        { type: 'p', text: 'The comparison `x % y == 0` **already is** True or False. Just return it:' },
        { type: 'code', run: true, title: 'Better', code: 'def is_divisible(x, y):\n    return x % y == 0\n\nprint(is_divisible(10, 5), is_divisible(10, 3))' },
        { type: 'p', text: 'And when you use it in a condition, there\'s no need to compare it with True: the call already reads like a question.' },
        { type: 'code', run: true, code: 'def is_divisible(x, y):\n    return x % y == 0\n\nif is_divisible(2026, 2):\n    print("2026 is even")' },
        {
          type: 'check', id: 'm6c-simplificar', concept: 'booleanos', mode: 'choice',
          question: 'What\'s the clearest way to write the body of `is_adult(age)`?',
          options: [
            { text: 'return age >= 18', correct: true },
            { text: 'if age >= 18: return True / else: return False', why: 'It works, but it\'s a long way of returning what the comparison is already worth.' },
            { text: 'return age >= 18 == True', why: 'As well as being unnecessary, Python reads it as a chained comparison (age >= 18 and 18 == True) and always gives False.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'proteger', title: 'Protecting a function from strange data', concepts: ['composicion', 'tipos'],
      blocks: [
        { type: 'p', text: 'What does `factorial(1.5)` or `factorial(-1)` do? The base case `n == 0` is never reached: infinite recursion. A robust function checks its data at the start and leaves early if it isn\'t valid.' },
        { type: 'p', text: '`isinstance(value, int)` returns True if the value is of that type:' },
        { type: 'code', run: true, code: 'def factorial(n):\n    if not isinstance(n, int) or n < 0:\n        return None   # invalid data\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))\nprint(factorial(1.5))\nprint(factorial(-2))' },
        { type: 'callout', tone: 'info', title: 'Guard clauses', text: 'Those opening `if`s that leave early with invalid data are called **guard clauses**. They keep the rest of the function clean: there you already know the data is correct.' },
        {
          type: 'check', id: 'm6c-isinstance', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'print(isinstance(3, int), isinstance(3.0, int), isinstance("3", str))', answer: 'True False True',
          explain: '3 is an int; 3.0 is a float, even though it\'s worth the same; "3" is a text.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'fibonacci', title: 'Fibonacci: recursion with two calls', concepts: ['recursion', 'composicion'],
      blocks: [
        { type: 'p', text: 'In the **Fibonacci** sequence, each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13… It\'s naturally defined with recursion: two base cases and **two** recursive calls.' },
        { type: 'code', run: true, code: 'def fibonacci(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(6))\nprint(fibonacci(10))' },
        { type: 'callout', tone: 'warn', title: 'Elegant, but slow', text: 'fibonacci(30) makes more than a million calls, because it repeats the same calculations again and again. When you know loops and dictionaries you\'ll see much faster ways.' },
        {
          type: 'check', id: 'm6c-fib', concept: 'recursion', mode: 'text',
          question: 'Predict:', code: 'def fibonacci(n):\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(7))', answer: '13',
          explain: '0, 1, 1, 2, 3, 5, 8, 13: the one in position 7 is 13.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'comp-predict' },
    { id: 'a2', activity: 'comp-complete' },
    { id: 'a3', activity: 'comp-fix' },
    { id: 'a4', activity: 'comp-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '**Composing** is building new functions by calling others that are already tested.',
    'A boolean function returns the comparison directly: `return x % y == 0`.',
    'In a condition, use the call as it is: `if is_divisible(n, 2):`.',
    '`isinstance(value, type)` checks the type; **guard clauses** leave early with invalid data.',
    'Fibonacci: two base cases and two recursive calls. Elegant, but slow for big numbers.',
  ],
};

export const ACTIVITIES_COMPOSICION = {
  'comp-predict': {
    id: 'comp-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Linked pieces', difficulty: 2, xp: 10, concepts: ['composicion'],
    prompt: 'Three small functions and one that combines them. **What will it show?**',
    code: 'def square(x):\n    return x * x\n\ndef is_even(n):\n    return n % 2 == 0\n\ndef square_if_even(n):\n    if is_even(n):\n        return square(n)\n    return n\n\nprint(square_if_even(4), square_if_even(5), is_even(square(3)))',
    expectedOutput: '16 5 False',
    options: [
      { text: '16 5 False', correct: true },
      { text: '16 25 False', concept: 'composicion', why: '5 isn\'t even: square_if_even returns the number unchanged.' },
      { text: '16 5 True', concept: 'composicion', why: 'square(3) is 9, and 9 isn\'t even.' },
      { text: '4 5 False', concept: 'composicion', why: '4 is even, so its square is returned: 16.' },
    ],
    explain: ['square_if_even(4): 4 is even → 16.', 'square_if_even(5): 5 is odd → 5.', 'is_even(square(3)) → is_even(9) → False.'],
  },
  'comp-complete': {
    id: 'comp-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The triangle\'s perimeter', difficulty: 2, xp: 15, concepts: ['composicion', 'modulos'],
    statement: 'You already have `distance`. Complete `perimeter` so it works out the perimeter of a triangle by **reusing** `distance` for each of its three sides.',
    expected: '12.0',
    starter: 'import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimeter(ax, ay, bx, by, cx, cy):\n    side1 = distance(ax, ay, bx, by)\n    side2 = ___(bx, by, cx, cy)\n    side3 = distance(___, ___, ax, ay)\n    return side1 + side2 + side3\n\nprint(perimeter(0, 0, 3, 0, 3, 4))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'perimeter', params: 6 }, { name: 'distance', params: 4 }],
      cases: [
        { label: 'Whole program', out_lines: ['12.0'] },
        { label: 'perimeter(0, 0, 1, 0, 0, 1)', call: 'print(round(perimeter(0, 0, 1, 0, 0, 1), 4))', out_lines: ['3.4142'] },
        { label: 'perimeter(1, 1, 4, 5, 1, 5)', call: 'print(perimeter(1, 1, 4, 5, 1, 5))', out_lines: ['12.0'] },
      ],
      rules: [{ type: 'must_call', name: 'distance', title: 'Reuse distance', msg: 'Work out each side by calling distance instead of repeating the formula.' }],
      logic_msg: 'Each side joins two different corners: A with B, B with C and C with A.',
    },
    hints: [
      { level: 'Orientation', text: 'The first gap is the name of the function that works out sides; the other two, the coordinates of corner C.' },
      { level: 'Reasoning', text: 'The third side goes from C to A: what are C\'s coordinates?' },
      { level: 'Pseudocode', text: 'side2 ← distance from B to C\nside3 ← distance from C to A', pre: true },
      { level: 'Technical help', text: '`distance(bx, by, cx, cy)` and `distance(cx, cy, ax, ay)`.' },
    ],
    solution: {
      code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimeter(ax, ay, bx, by, cx, cy):\n    side1 = distance(ax, ay, bx, by)\n    side2 = distance(bx, by, cx, cy)\n    side3 = distance(cx, cy, ax, ay)\n    return side1 + side2 + side3\n\nprint(perimeter(0, 0, 3, 0, 3, 4))',
      explanation: 'perimeter knows nothing about square roots or squares: it trusts distance. The sides of the example triangle are 3, 4 and 5.',
    },
    reference: ['import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimeter(ax, ay, bx, by, cx, cy):\n    side1 = distance(ax, ay, bx, by)\n    side2 = distance(bx, by, cx, cy)\n    side3 = distance(cx, cy, ax, ay)\n    return side1 + side2 + side3\n\nprint(perimeter(0, 0, 3, 0, 3, 4))'],
    wrongs: [
      { code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimeter(ax, ay, bx, by, cx, cy):\n    side1 = distance(ax, ay, bx, by)\n    side2 = ___(bx, by, cx, cy)\n    side3 = distance(___, ___, ax, ay)\n    return side1 + side2 + side3', category: 'incompleto' },
      { code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)\n\ndef perimeter(ax, ay, bx, by, cx, cy):\n    side1 = distance(ax, ay, bx, by)\n    side2 = distance(bx, by, cx, cy)\n    side3 = distance(bx, by, ax, ay)\n    return side1 + side2 + side3\n\nprint(perimeter(0, 0, 3, 0, 3, 4))', category: 'logica' },
    ],
  },
  'comp-fix': {
    id: 'comp-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The convoluted boolean', difficulty: 2, xp: 20, concepts: ['composicion', 'booleanos'],
    statement: '`is_vowel(letter)` should return True for a, e, i, o, u, but it returns a **text** instead of a boolean, and it\'s also written in a very long way. Fix it so it returns True or False and **simplify it** to a single return line.',
    expected: 'True\nFalse',
    starter: 'def is_vowel(letter):\n    if letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u":\n        return "True"\n    else:\n        return "False"\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))',
    spec: {
      exact_lines: true,
      functions: [{ name: 'is_vowel', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['True', 'False'] },
        { label: 'is_vowel("u")', call: 'print(is_vowel("u"))', out_lines: ['True'] },
        { label: 'is_vowel("b")', call: 'print(is_vowel("b"))', out_lines: ['False'] },
        { label: 'type(is_vowel("a"))', call: 'print(type(is_vowel("a")).__name__)', out_lines: ['bool'] },
      ],
      misconceptions: [
        { out_lines: ['str'], title: 'It returns a text', msg: '"True" in quotes is a text, not a boolean. Return the comparison directly: `return letter == "a" or …`.' },
      ],
      logic_msg: 'The function must return True only for the five vowels.',
    },
    hints: [
      { level: 'Orientation', text: 'Two problems: the quotes around True and False, and the unnecessary if/else.' },
      { level: 'Reasoning', text: 'The if condition is already True or False. What happens if you return it directly?' },
      { level: 'Pseudocode', text: 'return (letter is "a") or (letter is "e") or … or (letter is "u")', pre: true },
      { level: 'Technical help', text: '`return letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u"`.' },
    ],
    solution: {
      code: 'def is_vowel(letter):\n    return letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u"\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))',
      explanation: '"True" with quotes is a text: it looks like a boolean when shown, but `if is_vowel("z"):` would be true (a non-empty text counts as true). Returning the comparison gives a real boolean and removes the if.',
    },
    reference: [
      'def is_vowel(letter):\n    return letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u"\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))',
      'def is_vowel(letter):\n    if letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u":\n        return True\n    return False\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))',
    ],
    wrongs: [
      { code: 'def is_vowel(letter):\n    if letter == "a" or letter == "e" or letter == "i" or letter == "o" or letter == "u":\n        return "True"\n    else:\n        return "False"\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))', category: 'comprension' },
      { code: 'def is_vowel(letter):\n    return letter == "a" or "e" or "i" or "o" or "u"\n\nprint(is_vowel("e"))\nprint(is_vowel("z"))', category: 'logica' },
    ],
  },
  'comp-build': {
    id: 'comp-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Is it a right-angled triangle?', difficulty: 3, xp: 30, concepts: ['composicion', 'booleanos', 'descomponer'],
    unlock: { any: ['comp-predict', 'comp-complete', 'comp-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define two functions:\n\n• `square(x)`, which returns x².\n\n• `is_right_angled(a, b, c)`, which returns True if the sides a, b and c (with **c the longest**) form a right-angled triangle, that is, if a² + b² = c². Use `square` inside `is_right_angled`.\n\nExamples: `is_right_angled(3, 4, 5)` → True; `is_right_angled(2, 3, 4)` → False.',
    expected: 'True',
    plan: [
      {
        q: 'What does is_right_angled return?',
        options: [
          { text: 'The result of comparing a² + b² with c²', correct: true },
          { text: 'The text "Yes" or "No"', why: 'A boolean function returns True or False, so it can be used in an if.' },
        ],
      },
      {
        q: 'How do you make use of square?',
        options: [
          { text: 'return square(a) + square(b) == square(c)', correct: true },
          { text: 'By copying a * a inside is_right_angled', why: 'It would work, but the task asks you to compose: reuse the function you already have.' },
        ],
      },
    ],
    planScaffold: 'def square(x):\n    # return x squared\n\n\ndef is_right_angled(a, b, c):\n    # return the comparison using square\n\n\nprint(is_right_angled(3, 4, 5))\n',
    starter: '',
    spec: {
      exact_lines: true,
      allow_short_names: ['a', 'b', 'c', 'x'],
      functions: [{ name: 'square', params: 1 }, { name: 'is_right_angled', params: 3 }],
      cases: [
        { label: 'is_right_angled(3, 4, 5)', call: 'print(is_right_angled(3, 4, 5))', out_lines: ['True'] },
        { label: 'is_right_angled(2, 3, 4)', call: 'print(is_right_angled(2, 3, 4))', out_lines: ['False'] },
        { label: 'is_right_angled(5, 12, 13)', call: 'print(is_right_angled(5, 12, 13))', out_lines: ['True'] },
        { label: 'is_right_angled(6, 8, 11)', call: 'print(is_right_angled(6, 8, 11))', out_lines: ['False'] },
        { label: 'square(7)', call: 'print(square(7))', out_lines: ['49'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'It shows, but doesn\'t return', msg: 'Use return instead of print.' },
        { out_lines: ['None'], title: 'A return is missing', msg: 'One of the functions doesn\'t return anything. Check that both end with return.' },
      ],
      rules: [{ type: 'must_call', name: 'square', title: 'Compose the functions', msg: 'is_right_angled must call square instead of repeating the calculation.' }],
      logic_msg: 'Check with 3, 4, 5: 9 + 16 = 25, so it must give True.',
    },
    hints: [
      { level: 'Orientation', text: 'Two very short functions: each one fits in a single return line.' },
      { level: 'Reasoning', text: 'The comparison a² + b² == c² is already True or False: return it directly.' },
      { level: 'Pseudocode', text: 'square(x): return x × x\nis_right_angled(a, b, c): return square(a) + square(b) == square(c)', pre: true },
      { level: 'Technical help', text: '`return x * x` and `return square(a) + square(b) == square(c)`.' },
    ],
    solution: {
      code: 'def square(x):\n    return x * x\n\ndef is_right_angled(a, b, c):\n    """Return True if a, b and c (c the largest) form a right-angled triangle."""\n    return square(a) + square(b) == square(c)\n\nprint(is_right_angled(3, 4, 5))',
      explanation: 'is_right_angled reads almost like Pythagoras\' theorem because it hands the calculation over to square and returns the comparison directly.',
    },
    reference: [
      'def square(x):\n    return x ** 2\n\ndef is_right_angled(a, b, c):\n    return square(a) + square(b) == square(c)',
    ],
    wrongs: [
      { code: 'def square(x):\n    return x * x\n\ndef is_right_angled(a, b, c):\n    print(square(a) + square(b) == square(c))', category: 'comprension' },
      { code: 'def square(x):\n    return x * x\n\ndef is_right_angled(a, b, c):\n    return a + b == c', category: 'logica' },
    ],
  },
};
