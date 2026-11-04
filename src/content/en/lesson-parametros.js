// Lesson 3.3 · Parameters and local variables (English translation of src/content/lesson-parametros.js).

const TOPIC = 'Functions';

export const LESSON_PARAMETROS = {
  id: 'parametros',
  moduleId: 'm3',
  code: '3.3',
  title: 'Parameters and local variables',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Pass data to a function with parameters and arguments',
    'Give back a result with return and use it in other expressions',
    'Tell returning apart from showing inside a function',
    'Explain why a function\'s variables are local',
  ],
  prerequisites: ['Lesson 3.2 «Defining your own functions»'],
  teaser: 'Your functions are going to receive data and give back results. With that you can build truly reusable tools.',
  celebration: 'You\'ve completed Module 3: your functions receive data, give back results and keep their variables in their own space.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'parametros', title: 'Giving data to a function', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'A function without data always does the same thing. With **parameters** it can work with different values on each call:' },
        { type: 'code', run: true, code: 'def greet(name):\n    print(f"Hello, {name}")\n\ngreet("Lucía")\ngreet("Marco")' },
        {
          type: 'five', items: {
            'Parameter': 'The name between the brackets of the `def`: `name`. It\'s like a variable waiting for a value.',
            'Argument': 'The value you pass when calling: `"Lucía"`.',
            'When calling': 'Python does `name = "Lucía"` and runs the body with that value.',
          },
        },
        {
          type: 'check', id: 'm3p-presentar', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'def introduce(name, age):\n    print(name, "is", age, "years old")\n\nintroduce("Eva", 20)', answer: 'Eva is 20 years old',
          explain: 'The first argument goes to the first parameter (name = "Eva") and the second to the second (age = 20).',
        },
        {
          type: 'check', id: 'm3p-orden', concept: 'parametros', mode: 'choice',
          question: 'What will it show?', code: 'def introduce(name, age):\n    print(name, "is", age, "years old")\n\nintroduce(20, "Eva")', expectOutput: '20 is Eva years old',
          options: [
            { text: '20 is Eva years old', correct: true },
            { text: 'Eva is 20 years old', why: 'Python doesn\'t guess which value is which: it assigns them **by position**. The first (20) goes to `name`.' },
            { text: 'An error', why: 'There\'s no error: parameters accept any type. The result just doesn\'t make sense.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'numero', title: 'The number of arguments matters', concepts: ['parametros', 'errores'],
      blocks: [
        { type: 'p', text: 'If the function has two parameters, every call must give **two** arguments. With one too many or too few, Python stops with a TypeError that says exactly what\'s missing:' },
        { type: 'code', run: true, code: 'def introduce(name, age):\n    print(name, "is", age, "years old")\n\nintroduce("Eva")' },
        {
          type: 'check', id: 'm3p-faltan', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'def area(base, height):\n    print(base * height)\n\narea(5)', expectError: 'TypeError',
          options: [
            { text: 'TypeError: the height argument is missing', correct: true },
            { text: 'It shows 5', why: 'Python doesn\'t make up values: without `height` it can\'t multiply.' },
            { text: 'It shows 25', why: 'One argument isn\'t used for two parameters: `height` is left without a value.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'return', title: 'return: giving back a result', concepts: ['parametros', 'funciones'],
      blocks: [
        { type: 'p', text: 'As you saw with `round()` and `len()`, the most useful functions **return** a value. In yours you do it with `return`: the whole call becomes worth whatever you return, and you can store it, do maths with it or pass it to another function.' },
        { type: 'code', run: true, code: 'def area(base, height):\n    return base * height\n\ntotal = area(3, 4) + area(2, 5)\nprint(total)\nprint(area(10, 10) / 2)' },
        { type: 'callout', tone: 'info', title: 'return ends the function', text: 'As soon as Python runs a `return`, it leaves the function with that value. If a function has no `return`, it returns `None`.' },
        {
          type: 'check', id: 'm3p-triple', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'def triple(x):\n    return x * 3\n\nprint(triple(2) + 1)', answer: '7',
          explain: '`triple(2)` is worth 6, and 6 + 1 = 7.',
        },
        {
          type: 'check', id: 'm3p-print-return', concept: 'parametros', mode: 'choice',
          question: 'The function shows instead of returning. What happens?', code: 'def double(x):\n    print(x * 2)\n\nr = double(5)\nprint(r)', expectOutput: '10\nNone',
          options: [
            { text: 'It shows 10 and then None', correct: true },
            { text: 'It shows 10 twice', why: '`double` **shows** 10, but doesn\'t return it: without `return`, the call is worth `None` and that\'s what gets stored in r.' },
          ],
          explain: 'Showing is for the person looking at the screen; returning is so the program can keep using the result.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'locales', title: 'Local variables', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'The parameters and the variables you create inside a function are **local**: they only exist while the function runs, in their own memory space. When it finishes, they disappear.' },
        { type: 'p', text: 'Move forward step by step and watch the `final_price()` frame in memory: it appears with the call and disappears with the `return`.' },
        { type: 'trace', code: 'def final_price(price, discount):\n    saving = price * discount / 100\n    return price - saving\n\ntotal = final_price(80, 25)\nprint(total)' },
        {
          type: 'check', id: 'm3p-local', concept: 'parametros', mode: 'choice',
          question: 'What happens?', code: 'def final_price(price, discount):\n    saving = price * discount / 100\n    return price - saving\n\ntotal = final_price(80, 25)\nprint(saving)', expectError: 'NameError',
          options: [
            { text: 'NameError: saving doesn\'t exist outside the function', correct: true },
            { text: 'It shows 20.0', why: '`saving` is local: it disappeared when the call finished. If you need it outside, return it with `return`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mismo-nombre', title: 'Same name, different variables', concepts: ['parametros'],
      blocks: [
        { type: 'p', text: 'A local variable can have the same name as one outside and it does **not** touch it: they\'re two different variables in different spaces.' },
        { type: 'code', run: true, code: 'x = 10\n\ndef change():\n    x = 99\n    print("Inside:", x)\n\nchange()\nprint("Outside:", x)' },
        { type: 'callout', tone: 'tip', title: 'The rule for designing functions', text: 'Data **comes in** through the parameters and the result **goes out** with `return`. That way each function is an independent piece you can test and reuse without fear of breaking the rest.' },
        {
          type: 'check', id: 'm3p-sombra', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'total = 5\n\ndef add(a, b):\n    total = a + b\n    return total\n\nadd(2, 3)\nprint(total)', answer: '5',
          explain: 'The `total` inside is local. Besides, the result of `add(2, 3)` isn\'t stored anywhere: the `total` outside is still 5.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'par-predict' },
    { id: 'a2', activity: 'par-complete' },
    { id: 'a3', activity: 'par-fix' },
    { id: 'a4', activity: 'par-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '**Parameters** are the names in the `def`; **arguments**, the values in the call. They\'re matched by position.',
    'With too many or too few arguments there\'s a TypeError.',
    '`return` gives back a value and ends the function; without `return`, the function returns `None`.',
    'Showing (`print`) isn\'t returning: to keep using a result, return it.',
    'A function\'s parameters and variables are **local**: they only exist during the call and don\'t touch the ones outside.',
    'Design: data comes in through parameters and the result goes out with `return`.',
  ],
};

export const ACTIVITIES_PARAMETROS = {
  'par-predict': {
    id: 'par-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Two different c\'s', difficulty: 2, xp: 10, concepts: ['parametros'],
    prompt: 'There\'s one `c` inside the function and another outside. **What will it show?**',
    code: 'def mix(a, b):\n    c = a + b\n    return c * 2\n\nc = 1\nr = mix(3, 4)\nprint(r, c)',
    expectedOutput: '14 1',
    options: [
      { text: '14 1', correct: true },
      { text: '14 7', concept: 'parametros', why: 'The `c` inside is local: creating it doesn\'t change the `c` outside, which is still 1.' },
      { text: '7 1', concept: 'parametros', why: 'The function returns `c * 2`: (3 + 4) × 2 = 14.' },
      { text: '14 14', concept: 'parametros', why: '`return` gives back a value, which is stored in `r`; it doesn\'t change any variable outside.' },
    ],
    explain: [
      '`c = 1` creates the c outside.',
      '`mix(3, 4)`: a = 3, b = 4, the local c is 7 and 14 is returned.',
      'When it finishes, the local c disappears: the one outside is still 1.',
    ],
  },
  'par-complete': {
    id: 'par-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The receipt with VAT', difficulty: 2, xp: 15, concepts: ['parametros', 'funciones'],
    statement: 'Fill in the gaps: `price_with_vat` receives a price and **returns** the price with 21 % VAT; `receipt` uses it to show the receipt line.',
    expected: 'Book 24.2 €',
    starter: 'def price_with_vat(___):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(___(price), 2), "€")\n\nreceipt("Book", 20)',
    spec: {
      blanks: true,
      functions: [{ name: 'price_with_vat', params: 1 }, { name: 'receipt', params: 2 }],
      cases: [
        { label: 'receipt("Book", 20)', call: 'receipt("Book", 20)', out_lines: ['Book 24.2 €'] },
        { label: 'price_with_vat(100)', call: 'print(price_with_vat(100))', out_lines: ['121.0'] },
        { label: 'receipt("Backpack", 30)', call: 'receipt("Backpack", 30)', out_lines: ['Backpack 36.3 €'] },
      ],
      logic_msg: 'Check the gaps: the first is the name of the parameter the return uses; the second, the function that works out the VAT.',
    },
    hints: [
      { level: 'Orientation', text: 'First gap: what\'s the name of the variable the `return` uses? That\'s the parameter. Second gap: which function works out the price with VAT?' },
      { level: 'Reasoning', text: 'Inside `price_with_vat` the name `price` is used, so that has to be the parameter\'s name. In `receipt`, to get the price with VAT you call the other function.' },
      { level: 'Pseudocode', text: 'define price_with_vat(price): return price × 1.21\ndefine receipt(product, price): show product and price_with_vat(price) rounded', pre: true },
      { level: 'Technical help', text: 'Header: `def price_with_vat(price):`. Call: `price_with_vat(price)`.' },
    ],
    solution: {
      code: 'def price_with_vat(price):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(price_with_vat(price), 2), "€")\n\nreceipt("Book", 20)',
      explanation: '`price_with_vat` returns a number that `receipt` can round and show. Each function does just one thing: one calculates and the other shows.',
    },
    reference: ['def price_with_vat(price):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(price_with_vat(price), 2), "€")\n\nreceipt("Book", 20)'],
    wrongs: [
      { code: 'def price_with_vat(___):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(___(price), 2), "€")', category: 'incompleto' },
      { code: 'def price_with_vat(p):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(price_with_vat(price), 2), "€")', category: 'ejecucion' },
      { code: 'def price_with_vat(price):\n    return price * 1.21\n\ndef receipt(product, price):\n    print(product, round(price, 2), "€")', category: 'logica' },
    ],
  },
  'par-fix': {
    id: 'par-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The average that won\'t add up', difficulty: 2, xp: 20, concepts: ['parametros', 'errores'],
    statement: 'The program wants to add an extra point to the average of two marks, but it fails with a TypeError. **Run it, read the error and fix the function** so the main program works.',
    expected: 'Final mark: 8.5',
    starter: 'def average(a, b):\n    print((a + b) / 2)\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)',
    spec: {
      allow_short_names: ['a', 'b'],
      functions: [{ name: 'average', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['Final mark: 8.5'] },
        { label: 'average(4, 7)', call: 'print(average(4, 7))', out_lines: ['5.5'] },
      ],
      misconceptions: [
        { out_lines: ['7.5', 'Final mark: 8.5'], title: 'There\'s an extra print', msg: 'The function now returns the value, but it still shows it too. Remove the `print`: showing is the main program\'s job.' },
      ],
      rules: [{ type: 'must_call', name: 'average', title: 'Use the function', msg: 'Work out the mark with average(6, 9) instead of writing the result.' }],
      logic_msg: 'The output doesn\'t match. What does average(6, 9) return? It should be 7.5.',
    },
    hints: [
      { level: 'Orientation', text: 'The error says you can\'t add `None` and a number. Where does that `None` come from?' },
      { level: 'Reasoning', text: '`average(6, 9)` shows 7.5, but what does it **return**? A function without `return` returns `None`.' },
      { level: 'Pseudocode', text: 'define average(a, b):\n    return (a + b) ÷ 2', pre: true },
      { level: 'Technical help', text: 'Change `print(...)` to `return (a + b) / 2`.' },
    ],
    solution: {
      code: 'def average(a, b):\n    return (a + b) / 2\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)',
      explanation: 'With `print`, the function showed 7.5 but returned `None`, and `None + 1` is a TypeError. With `return`, `average(6, 9)` is worth 7.5 and you can add 1 to it.',
    },
    reference: ['def average(a, b):\n    return (a + b) / 2\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)'],
    wrongs: [
      { code: 'def average(a, b):\n    print((a + b) / 2)\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)', category: 'ejecucion' },
      { code: 'def average(a, b):\n    print((a + b) / 2)\n    return (a + b) / 2\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)', category: 'comprension' },
      { code: 'def average(a, b):\n    return a + b / 2\n\nfinal_mark = average(6, 9) + 1\nprint("Final mark:", final_mark)', category: 'logica' },
    ],
  },
  'par-build': {
    id: 'par-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The temperature converter', difficulty: 3, xp: 30, concepts: ['parametros', 'descomponer'],
    unlock: { any: ['par-predict', 'par-complete', 'par-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define a function `to_fahrenheit(celsius)` that receives a temperature in degrees Celsius and **returns** its equivalent in Fahrenheit:\n\n`F = C × 9 / 5 + 32`\n\nExamples: `to_fahrenheit(100)` → `212.0` and `to_fahrenheit(0)` → `32.0`.\n\nLunaPy will test your function with several temperatures; the function must not show anything, only return.',
    plan: [
      {
        q: 'How many parameters does the function need?',
        options: [
          { text: 'One: the temperature in Celsius', correct: true },
          { text: 'Two: Celsius and Fahrenheit', why: 'Fahrenheit is the **result**: it\'s returned, it doesn\'t come in as data.' },
        ],
      },
      {
        q: 'How does the function hand over the result?',
        options: [
          { text: 'With return', correct: true },
          { text: 'With print', why: 'With `print` the temperature would be seen on the screen, but the program couldn\'t use it (the call would be worth `None`).' },
        ],
      },
    ],
    planScaffold: '# Define to_fahrenheit with one parameter\n#     work out and return the result\n\n# Test: print(to_fahrenheit(100))\n',
    starter: '',
    spec: {
      functions: [{ name: 'to_fahrenheit', params: 1 }],
      cases: [
        { label: 'to_fahrenheit(100)', call: 'print(to_fahrenheit(100))', out_lines: ['212.0'] },
        { label: 'to_fahrenheit(0)', call: 'print(to_fahrenheit(0))', out_lines: ['32.0'] },
        { label: 'to_fahrenheit(-40)', call: 'print(to_fahrenheit(-40))', out_lines: ['-40.0'] },
        { label: 'to_fahrenheit(36.6)', call: 'print(to_fahrenheit(36.6))', out_lines: ['97.88'] },
      ],
      misconceptions: [
        { out_lines: ['212.0', 'None'], title: 'It shows, but doesn\'t return', msg: 'Your function uses `print`: the temperature can be seen, but the call is worth `None`. Use `return`.' },
        { out_lines: ['237.6'], title: 'Check the order', msg: 'You added 32 before multiplying. The formula is C × 9 / 5 and **then** + 32.' },
        { out_lines: ['2.6486486486486487'], title: 'Check the brackets', msg: 'You divided by (5 + 32). The formula is C × 9 / 5 + 32, without brackets.' },
      ],
      logic_msg: 'The function doesn\'t return the expected value. Test it yourself with print(to_fahrenheit(100)): it should give 212.0.',
    },
    hints: [
      { level: 'Orientation', text: 'A function with one parameter that **returns** a number. There\'s no need for `input()` or `print()` inside.' },
      { level: 'Reasoning', text: 'Translate the formula directly: the parameter plays the part of C. Remember that multiplying and dividing come before adding.' },
      { level: 'Pseudocode', text: 'define to_fahrenheit(celsius):\n    return celsius × 9 ÷ 5 + 32', pre: true },
      { level: 'Technical help', text: '`def to_fahrenheit(celsius):` and in the body `return celsius * 9 / 5 + 32`. To test it: `print(to_fahrenheit(100))`.' },
    ],
    solution: {
      code: 'def to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32\n\nprint(to_fahrenheit(100))',
      explanation: 'The parameter receives the temperature and `return` hands over the result. Because it returns instead of showing, you can use it in any expression: `to_fahrenheit(20) > 60`, a table, a calculation…',
    },
    reference: [
      'def to_fahrenheit(celsius):\n    return celsius * 9 / 5 + 32',
      'def to_fahrenheit(c):\n    fahrenheit = c * 1.8 + 32\n    return fahrenheit\n\nprint(to_fahrenheit(0))',
    ],
    wrongs: [
      { code: 'def to_fahrenheit(celsius):\n    print(celsius * 9 / 5 + 32)', category: 'comprension' },
      { code: 'def to_fahrenheit(celsius):\n    return (celsius + 32) * 9 / 5', category: 'comprension' },
      { code: 'def to_fahrenheit():\n    return 212.0', category: 'comprension' },
      { code: 'def to_fahrenheit(celsius):\n    return 212.0', category: 'logica' },
    ],
  },
};
