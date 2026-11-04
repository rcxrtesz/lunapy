// Lesson 7.1 · for loops (English translation of src/content/lesson-for.js).

const TOPIC = 'Loops';

export const LESSON_FOR = {
  id: 'bucle-for',
  moduleId: 'm7',
  code: '7.1',
  title: 'for loops',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Repeat a block a fixed number of times with for and range()',
    'Use range with start, stop and step, and avoid the «off-by-one» error',
    'Accumulate results (sums, products) and count inside a loop',
    'Loop over the characters of a text',
  ],
  prerequisites: ['Module 6 (recommended)', 'Lesson 5.3 «Recursion»'],
  teaser: 'You\'re starting Module 7: with a loop, a single line can repeat something ten, a thousand or a million times.',
  celebration: 'You now repeat with for: you loop over ranges and texts, build up sums and count what you need.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'repetir', title: 'Repeating without copying', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: 'With recursion you already knew how to repeat, but there\'s a more direct way: the **for loop**. It runs its block once for each value in a sequence.' },
        { type: 'code', run: true, code: 'for i in range(3):\n    print("Lap", i)\nprint("End")' },
        {
          type: 'five', items: {
            'for i in': 'On each lap, the variable `i` takes the next value.',
            'range(3)': 'The sequence 0, 1, 2: **3 values, starting at 0**.',
            'Indented block': 'What gets repeated. The line without indentation runs once, at the end.',
          },
        },
        { type: 'p', text: 'Step forward and watch how `i` changes:' },
        { type: 'trace', code: 'for i in range(3):\n    square = i * i\n    print(i, square)' },
        {
          type: 'check', id: 'm7f-vueltas', concept: 'bucles', mode: 'choice',
          question: 'What will it show?', code: 'for i in range(4):\n    print(i, end=" ")', expectOutput: '0 1 2 3',
          options: [
            { text: '0 1 2 3', correct: true },
            { text: '1 2 3 4', why: 'range starts at 0 unless you tell it otherwise.' },
            { text: '0 1 2 3 4', why: 'range(4) gives 4 values: from 0 to 3. The 4 isn\'t included.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'range', title: 'range in depth', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`range` takes up to three arguments: **start** (included), **stop** (excluded) and **step**.' },
        { type: 'code', run: true, code: 'for n in range(1, 6):\n    print(n, end=" ")\nprint()\nfor n in range(0, 20, 5):\n    print(n, end=" ")\nprint()\nfor n in range(10, 0, -3):\n    print(n, end=" ")' },
        { type: 'callout', tone: 'warn', title: 'The «off-by-one» error', text: 'To count from 1 to 10 you need `range(1, 11)`: the stop is never included. Being out by one is so common it has a name: *off-by-one*.' },
        {
          type: 'check', id: 'm7f-range', concept: 'bucles', mode: 'text',
          question: 'Predict (on one line):', code: 'for n in range(2, 11, 3):\n    print(n, end=" ")', answer: '2 5 8',
          explain: 'It starts at 2 and adds 3: 2, 5, 8. The next would be 11, which isn\'t included.',
        },
        {
          type: 'check', id: 'm7f-uno-mas', concept: 'bucles', mode: 'choice',
          question: 'Which range gives the numbers from 1 to 100, both included?',
          options: [
            { text: 'range(1, 101)', correct: true },
            { text: 'range(1, 100)', why: 'The stop isn\'t included: it would end at 99.' },
            { text: 'range(100)', why: 'It would give 0 to 99.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'acumular', title: 'Accumulating and counting', concepts: ['bucles', 'reasignacion'],
      blocks: [
        { type: 'p', text: 'The most useful pattern with loops is the **accumulator**: a variable that starts at a neutral value **before** the loop and is updated **on every lap**.' },
        { type: 'code', run: true, code: 'total = 0                 # 1. before the loop\nfor n in range(1, 11):\n    total += n            # 2. on every lap\nprint("Sum from 1 to 10:", total)   # 3. afterwards' },
        { type: 'p', text: 'A **counter** is an accumulator that adds 1 when something happens:' },
        { type: 'code', run: true, code: 'multiples = 0\nfor n in range(1, 31):\n    if n % 7 == 0:\n        multiples += 1\nprint("Multiples of 7 up to 30:", multiples)' },
        { type: 'callout', tone: 'warn', title: 'Initialise outside the loop', text: 'If you write `total = 0` **inside** the loop, it\'s reset to zero on every lap and only the last value will be left at the end.' },
        {
          type: 'check', id: 'm7f-producto', concept: 'bucles', mode: 'text',
          question: 'Predict:', code: 'product = 1\nfor n in range(1, 5):\n    product *= n\nprint(product)', answer: '24',
          explain: '1 × 1 × 2 × 3 × 4 = 24. For multiplying, the neutral starting value is 1, not 0.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'textos', title: 'Looping over a text', concepts: ['bucles', 'tipos'],
      blocks: [
        { type: 'p', text: '`for` also loops over the characters of a text, one per lap:' },
        { type: 'code', run: true, code: 'for letter in "Luna":\n    print(letter)\n\nspaces = 0\nfor character in "Hello world from Python":\n    if character == " ":\n        spaces += 1\nprint("Spaces:", spaces)' },
        {
          type: 'check', id: 'm7f-texto', concept: 'bucles', mode: 'text',
          question: 'Predict:', code: 'count = 0\nfor c in "banana":\n    if c == "a":\n        count += 1\nprint(count)', answer: '3',
          explain: 'There are three letters «a» in «banana».',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'for-predict' },
    { id: 'a2', activity: 'for-complete' },
    { id: 'a3', activity: 'for-fix' },
    { id: 'a4', activity: 'for-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`for variable in sequence:` repeats the indented block once for each value.',
    '`range(stop)`, `range(start, stop)` and `range(start, stop, step)`: the start is included, the stop is **not**.',
    'From 1 to 10 is `range(1, 11)`: watch out for the «off-by-one» error.',
    '**Accumulator**: initialised before the loop (0 to add, 1 to multiply) and updated on every lap.',
    '**Counter**: adds 1 when a condition is met.',
    '`for letter in text:` loops over the characters of a text.',
  ],
};

export const ACTIVITIES_FOR = {
  'for-predict': {
    id: 'for-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The piggy bank', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'Each week you put the week\'s number in euros into the piggy bank. **What will it show?**',
    code: 'piggy_bank = 0\nfor week in range(1, 5):\n    piggy_bank += week\n    print(week, piggy_bank)',
    expectedOutput: '1 1\n2 3\n3 6\n4 10',
    options: [
      { text: '1 1 / 2 3 / 3 6 / 4 10 (one line per week)', correct: true },
      { text: '1 1 / 2 3 / 3 6 / 4 10 / 5 15', concept: 'bucles', why: 'range(1, 5) ends at 4: the 5 isn\'t included.' },
      { text: '0 0 / 1 1 / 2 3 / 3 6', concept: 'bucles', why: 'The range starts at 1, not 0.' },
      { text: 'Just 4 10', concept: 'bucles', why: 'The print is inside the loop (it\'s indented): it runs on every lap.' },
    ],
    explain: ['Week 1: piggy_bank = 1.', 'Week 2: 1 + 2 = 3.', 'Week 3: 3 + 3 = 6.', 'Week 4: 6 + 4 = 10.'],
  },
  'for-complete': {
    id: 'for-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The times table', difficulty: 1, xp: 15, concepts: ['bucles'],
    statement: 'Complete the function so it shows the times table of `n`, **from 1 to 10**:',
    expected: '7 x 1 = 7\n7 x 2 = 14\n…\n7 x 10 = 70',
    starter: 'def table(n):\n    for i in range(___, ___):\n        print(n, "x", i, "=", ___)\n\ntable(7)',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'table', params: 1 }],
      cases: [
        { label: 'table(7)', call: 'table(7)', out_lines: ['7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35', '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63', '7 x 10 = 70'] },
        { label: 'table(3)', call: 'table(3)', out_lines: ['3 x 1 = 3', '3 x 2 = 6', '3 x 3 = 9', '3 x 4 = 12', '3 x 5 = 15', '3 x 6 = 18', '3 x 7 = 21', '3 x 8 = 24', '3 x 9 = 27', '3 x 10 = 30'] },
      ],
      misconceptions: [
        { out_lines: ['7 x 1 = 7', '7 x 2 = 14', '7 x 3 = 21', '7 x 4 = 28', '7 x 5 = 35', '7 x 6 = 42', '7 x 7 = 49', '7 x 8 = 56', '7 x 9 = 63'], title: 'The 10 is missing', msg: 'The stop of range isn\'t included: to get to 10, the stop has to be 11.' },
      ],
      logic_msg: 'The table must go from 1 to 10. Does the range start and stop where it should?',
    },
    hints: [
      { level: 'Orientation', text: 'The first two gaps are the start and stop of the range; the third, the result of the multiplication.' },
      { level: 'Reasoning', text: 'You want i = 1, 2, …, 10. Remember that the stop of range isn\'t included.' },
      { level: 'Pseudocode', text: 'for i from 1 to 10:\n    show n x i = n × i', pre: true },
      { level: 'Technical help', text: '`range(1, 11)` and `n * i`.' },
    ],
    solution: {
      code: 'def table(n):\n    for i in range(1, 11):\n        print(n, "x", i, "=", n * i)\n\ntable(7)',
      explanation: '`range(1, 11)` gives 1 to 10. On each lap, i changes and the same line shows a different row of the table.',
    },
    reference: ['def table(n):\n    for i in range(1, 11):\n        print(n, "x", i, "=", n * i)\n\ntable(7)'],
    wrongs: [
      { code: 'def table(n):\n    for i in range(___, ___):\n        print(n, "x", i, "=", ___)', category: 'incompleto' },
      { code: 'def table(n):\n    for i in range(1, 10):\n        print(n, "x", i, "=", n * i)\n\ntable(7)', category: 'comprension' },
      { code: 'def table(n):\n    for i in range(10):\n        print(n, "x", i, "=", n * i)\n\ntable(7)', category: 'logica' },
    ],
  },
  'for-fix': {
    id: 'for-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The sum that forgets', difficulty: 2, xp: 20, concepts: ['bucles', 'errores'],
    statement: '`sum_up_to(n)` should return 1 + 2 + … + n, but it always returns the last number. **There\'s no Python error**: the bug is in where the accumulator is initialised. Fix it.',
    expected: '15\n55',
    starter: 'def sum_up_to(n):\n    for i in range(1, n + 1):\n        total = 0\n        total += i\n    return total\n\nprint(sum_up_to(5))\nprint(sum_up_to(10))',
    spec: {
      functions: [{ name: 'sum_up_to', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['15', '55'] },
        { label: 'sum_up_to(1)', call: 'print(sum_up_to(1))', out_lines: ['1'] },
        { label: 'sum_up_to(100)', call: 'print(sum_up_to(100))', out_lines: ['5050'] },
      ],
      misconceptions: [
        { out_lines: ['5', '10'], title: 'The accumulator is reset', msg: '`total = 0` is inside the loop: it\'s reset to zero on every lap. Move it before the for.' },
      ],
      logic_msg: 'Check by hand: 1 + 2 + 3 + 4 + 5 = 15.',
    },
    hints: [
      { level: 'Orientation', text: 'Follow the loop with n = 3: what is total at the start of each lap?' },
      { level: 'Reasoning', text: 'An accumulator is initialised **once**, before the loop. Where is it here?' },
      { level: 'Pseudocode', text: 'total ← 0\nfor i from 1 to n:\n    total ← total + i\nreturn total', pre: true },
      { level: 'Technical help', text: 'Move `total = 0` to just under the `def`, with 4 spaces of indentation (outside the for).' },
    ],
    solution: {
      code: 'def sum_up_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(sum_up_to(5))\nprint(sum_up_to(10))',
      explanation: 'With `total = 0` before the loop, the value is kept from one lap to the next and builds up the sum.',
    },
    reference: ['def sum_up_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nprint(sum_up_to(5))\nprint(sum_up_to(10))'],
    wrongs: [
      { code: 'def sum_up_to(n):\n    for i in range(1, n + 1):\n        total = 0\n        total += i\n    return total\n\nprint(sum_up_to(5))\nprint(sum_up_to(10))', category: 'comprension' },
      { code: 'def sum_up_to(n):\n    total = 0\n    for i in range(1, n):\n        total += i\n    return total\n\nprint(sum_up_to(5))\nprint(sum_up_to(10))', category: 'logica' },
    ],
  },
  'for-build': {
    id: 'for-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Factorial with a loop', difficulty: 3, xp: 30, concepts: ['bucles', 'retorno'],
    unlock: { any: ['for-predict', 'for-complete', 'for-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'In lesson 5.3 you worked out the factorial with recursion. Now do it with a **for loop**: define `factorial(n)` that returns 1 × 2 × … × n (and 1 if n is 0).\n\nExamples: `factorial(5)` → 120; `factorial(0)` → 1.',
    expected: '120',
    plan: [
      {
        q: 'What value does the accumulator start with?',
        options: [
          { text: '1', correct: true },
          { text: '0', why: 'Any number multiplied by 0 gives 0: the result would always be 0.' },
        ],
      },
      {
        q: 'Which range goes from 1 to n?',
        options: [
          { text: 'range(1, n + 1)', correct: true },
          { text: 'range(n)', why: 'It would start at 0 (and multiplying by 0 spoils everything) and end at n − 1.' },
        ],
      },
    ],
    planScaffold: 'def factorial(n):\n    # accumulator\n    # loop from 1 to n\n    # return the result\n\n\nprint(factorial(5))\n',
    starter: '',
    spec: {
      functions: [{ name: 'factorial', params: 1 }],
      cases: [
        { label: 'factorial(5)', call: 'print(factorial(5))', out_lines: ['120'] },
        { label: 'factorial(0)', call: 'print(factorial(0))', out_lines: ['1'] },
        { label: 'factorial(1)', call: 'print(factorial(1))', out_lines: ['1'] },
        { label: 'factorial(10)', call: 'print(factorial(10))', out_lines: ['3628800'] },
      ],
      misconceptions: [
        { out_lines: ['0'], title: 'The accumulator starts at 0', msg: 'For multiplying, the accumulator starts at 1: everything multiplied by 0 gives 0.' },
        { out_lines: ['24'], title: 'Multiplying by n is missing', msg: 'The range doesn\'t reach n: use `range(1, n + 1)`.' },
      ],
      rules: [{ type: 'must_call', name: 'range', title: 'Use a for loop', msg: 'This time, solve it with a for loop and range().' }],
      logic_msg: 'Check by hand: 1 × 2 × 3 × 4 × 5 = 120.',
    },
    hints: [
      { level: 'Orientation', text: 'An accumulator that multiplies, a for from 1 to n and a return at the end.' },
      { level: 'Reasoning', text: 'What\'s the neutral value for multiplication? Which range gives 1, 2, …, n?' },
      { level: 'Pseudocode', text: 'result ← 1\nfor i from 1 to n:\n    result ← result × i\nreturn result', pre: true },
      { level: 'Technical help', text: '`result = 1`, `for i in range(1, n + 1):`, `result *= i` and `return result`.' },
    ],
    solution: {
      code: 'def factorial(n):\n    """Return n! worked out with a loop."""\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))',
      explanation: 'With n = 0, range(1, 1) is empty: the loop doesn\'t do a single lap and 1 is returned, which is exactly 0!. Unlike the recursive version, there\'s no call limit.',
    },
    reference: [
      'def factorial(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result',
      'def factorial(n):\n    result = 1\n    for i in range(2, n + 1):\n        result = result * i\n    return result',
    ],
    wrongs: [
      { code: 'def factorial(n):\n    result = 0\n    for i in range(1, n + 1):\n        result *= i\n    return result', category: 'comprension' },
      { code: 'def factorial(n):\n    result = 1\n    for i in range(1, n):\n        result *= i\n    return result', category: 'comprension' },
    ],
  },
};
