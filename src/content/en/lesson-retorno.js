// Lesson 6.1 · return in depth (English translation of src/content/lesson-retorno.js).

const TOPIC = 'Return values';

export const LESSON_RETORNO = {
  id: 'retorno',
  moduleId: 'm6',
  code: '6.1',
  title: 'return in depth',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Use several returns in a function and leave as soon as the answer is known',
    'Recognise the dead code after a return',
    'Check that every path returns a value of the same type',
    'Return two values at once and collect them in two variables',
  ],
  prerequisites: ['Module 5 «Conditionals, boolean logic and recursion»'],
  teaser: 'You\'re starting Module 6: you already use return, but today you learn to get the most out of it: early exits, dead code and functions that return more than one value.',
  celebration: 'You\'ve now mastered return: early exits, complete paths and several values at once.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'varios', title: 'Several returns in a function', concepts: ['retorno'],
      blocks: [
        { type: 'p', text: 'A function can have several `return`s, one on each path. As soon as one runs, the function **ends**: nothing else in it runs.' },
        { type: 'code', run: true, code: 'def absolute_value(x):\n    if x < 0:\n        return -x\n    return x\n\nprint(absolute_value(-7), absolute_value(3))', caption: 'There\'s no need for `else`: if x < 0, the first return has already left the function.' },
        {
          type: 'check', id: 'm6r-temprano', concept: 'retorno', mode: 'text',
          question: 'Predict:', code: 'def larger(a, b):\n    if a > b:\n        return a\n    return b\n\nprint(larger(3, 9), larger(5, 2))', answer: '9 5',
          explain: 'larger(3, 9): 3 > 9 is False, the if is skipped and it returns b (9). larger(5, 2): it returns a (5) and ends.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'muerto', title: 'Dead code', concepts: ['retorno', 'errores'],
      blocks: [
        { type: 'p', text: 'The lines **after** a `return` in the same block never run: it\'s **dead code**. Python doesn\'t warn you, so it\'s a silent mistake.' },
        { type: 'code', run: true, code: 'def area(base, height):\n    return base * height\n    print("Area calculated")   # dead code\n\nprint(area(3, 4))' },
        {
          type: 'check', id: 'm6r-muerto', concept: 'retorno', mode: 'choice',
          question: 'What will it show?', code: 'def f(x):\n    result = x * 2\n    return result\n    result = result + 100\n\nprint(f(5))', expectOutput: '10',
          options: [
            { text: '10', correct: true },
            { text: '110', why: 'The line that adds 100 is after the return: it never runs.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'caminos', title: 'Every path, the same type', concepts: ['retorno', 'condicionales'],
      blocks: [
        { type: 'p', text: 'You already know that if a path doesn\'t reach a `return` the function returns `None`. There\'s a second thing to watch: that every path returns **the same type** of value. If some return a number and others a text, whoever uses the function won\'t know what to expect.' },
        { type: 'code', run: true, title: 'Mixes types', code: 'def price(age):\n    if age < 12:\n        return "Free"\n    return 10\n\ntotal = price(30) + price(8)   # TypeError!' },
        { type: 'code', run: true, title: 'Always a number', code: 'def price(age):\n    if age < 12:\n        return 0\n    return 10\n\nprint(price(30) + price(8))' },
        {
          type: 'check', id: 'm6r-tipo', concept: 'retorno', mode: 'choice',
          question: 'A function `find_mark(name)` returns a student\'s mark. What should it return if the student doesn\'t exist?',
          options: [
            { text: 'None, and say so in the docstring', correct: true },
            { text: 'The text "Doesn\'t exist"', why: 'It would mix numbers and texts: if someone does `find_mark(x) + 1`, the program would fail in a confusing way.' },
            { text: '0', why: 'It would be ambiguous: you wouldn\'t know if the student doesn\'t exist or got a 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'dos-valores', title: 'Returning two values', concepts: ['retorno'],
      blocks: [
        { type: 'p', text: 'Sometimes a function works out two related results. You can return both by separating them with a comma and collect them in two variables:' },
        { type: 'code', run: true, code: 'def division(a, b):\n    return a // b, a % b\n\nquotient, remainder = division(17, 5)\nprint("Quotient:", quotient)\nprint("Remainder:", remainder)' },
        { type: 'callout', tone: 'info', title: 'It\'s actually a tuple', text: 'Python groups the two values into a **tuple**, which you\'ll meet in Module 10. For now it\'s enough to know they\'re collected in the same order: the first into the first variable.' },
        {
          type: 'check', id: 'm6r-dos', concept: 'retorno', mode: 'text',
          question: 'Predict:', code: 'def min_max(a, b):\n    if a < b:\n        return a, b\n    return b, a\n\nsmallest, largest = min_max(8, 3)\nprint(smallest, largest)', answer: '3 8',
          explain: '8 < 3 is False: it returns (b, a) = (3, 8). smallest gets 3 and largest gets 8.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'ret-predict' },
    { id: 'a2', activity: 'ret-complete' },
    { id: 'a3', activity: 'ret-fix' },
    { id: 'a4', activity: 'ret-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A function can have several `return`s; the first one that runs ends it.',
    'Leaving early with a `return` avoids unnecessary `else`s.',
    'Anything after a `return` in the same block is **dead code**: it never runs.',
    'Every path must return something, and of the same type. For «no result», `None`.',
    '`return a, b` returns two values; you collect them with `x, y = function()`.',
  ],
};

export const ACTIVITIES_RETORNO = {
  'ret-predict': {
    id: 'ret-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The early exit', difficulty: 2, xp: 10, concepts: ['retorno'],
    prompt: 'Look at where each call ends. **What will it show?**',
    code: 'def classify(n):\n    if n < 0:\n        return "negative"\n    if n == 0:\n        return "zero"\n    print("checking...")\n    return "positive"\n\nprint(classify(-2))\nprint(classify(4))',
    expectedOutput: 'negative\nchecking...\npositive',
    options: [
      { text: 'negative, checking..., positive', correct: true },
      { text: 'checking..., negative, checking..., positive', concept: 'retorno', why: 'With -2, the first return ends the function before it reaches the print.' },
      { text: 'negative, positive', concept: 'retorno', why: 'With 4 no if is met, so the print runs before the last return.' },
      { text: 'negative, zero, positive', concept: 'retorno', why: 'Each call returns a single value: with 4, the condition n == 0 is false.' },
    ],
    explain: ['classify(-2): -2 < 0 → returns "negative" and ends.', 'classify(4): no if is met; it shows «checking...» and returns "positive".'],
  },
  'ret-complete': {
    id: 'ret-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Hours and minutes', difficulty: 2, xp: 15, concepts: ['retorno', 'operadores'],
    statement: 'Complete `hours_and_minutes(total)` so it **returns two values**: the whole hours and the minutes left over. Then collect them in two variables.',
    expected: '2 h 15 min',
    starter: 'def hours_and_minutes(total):\n    return total // 60___ total % 60\n\nh, ___ = hours_and_minutes(135)\nprint(h, "h", m, "min")',
    spec: {
      blanks: true,
      allow_short_names: ['h', 'm'],
      functions: [{ name: 'hours_and_minutes', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['2 h 15 min'] },
        { label: 'hours_and_minutes(59)', call: 'print(hours_and_minutes(59))', out_lines: ['(0, 59)'] },
        { label: 'hours_and_minutes(180)', call: 'print(hours_and_minutes(180))', out_lines: ['(3, 0)'] },
      ],
      logic_msg: 'The function must return the hours first and then the minutes, separated by a comma.',
    },
    hints: [
      { level: 'Orientation', text: 'The first gap separates the two returned values; the second is the name of the variable that collects the minutes.' },
      { level: 'Reasoning', text: 'Which sign separates two values in a return? Look at the print: what\'s the minutes variable called?' },
      { level: 'Pseudocode', text: 'return hours, minutes\nh, m ← hours_and_minutes(135)', pre: true },
      { level: 'Technical help', text: '`return total // 60, total % 60` and `h, m = hours_and_minutes(135)`.' },
    ],
    solution: {
      code: 'def hours_and_minutes(total):\n    return total // 60, total % 60\n\nh, m = hours_and_minutes(135)\nprint(h, "h", m, "min")',
      explanation: 'The comma in the return gives back both values together, and `h, m = …` shares them out between two variables, in the same order.',
    },
    reference: ['def hours_and_minutes(total):\n    return total // 60, total % 60\n\nh, m = hours_and_minutes(135)\nprint(h, "h", m, "min")'],
    wrongs: [
      { code: 'def hours_and_minutes(total):\n    return total // 60___ total % 60\n\nh, ___ = hours_and_minutes(135)\nprint(h, "h", m, "min")', category: 'incompleto' },
      { code: 'def hours_and_minutes(total):\n    return total // 60\n    return total % 60\n\nh, m = hours_and_minutes(135)\nprint(h, "h", m, "min")', category: 'ejecucion' },
      { code: 'def hours_and_minutes(total):\n    return total % 60, total // 60\n\nh, m = hours_and_minutes(135)\nprint(h, "h", m, "min")', category: 'logica' },
    ],
  },
  'ret-fix': {
    id: 'ret-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The discount that never arrives', difficulty: 2, xp: 20, concepts: ['retorno', 'errores'],
    statement: '`final_price` should apply a **10 % discount** to orders of 100 € or more. It gives no errors, but the discount is never applied. Find the bug and fix it.',
    expected: '135.0\n50',
    starter: 'def final_price(amount):\n    total = amount\n    return total\n    if amount >= 100:\n        total = amount * 0.9\n\nprint(final_price(150))\nprint(final_price(50))',
    spec: {
      functions: [{ name: 'final_price', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['135.0', '50'] },
        { label: 'final_price(100) (limit)', call: 'print(final_price(100))', out_lines: ['90.0'] },
        { label: 'final_price(99)', call: 'print(final_price(99))', out_lines: ['99'] },
      ],
      misconceptions: [
        { out_lines: ['150', '50'], title: 'It still isn\'t applied', msg: 'The `return` is before the if: the function ends without checking the amount. Move it to the end.' },
        { out_lines: ['None', '50'], title: 'A return is missing', msg: 'In the discount case the function doesn\'t return anything. Make sure the return is at the end and outside the if.' },
      ],
      logic_msg: 'Check the result with 150 € (135.0) and with 50 € (50).',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: 150 € comes out as 150. Follow the function line by line: what happens when it reaches the return?' },
      { level: 'Reasoning', text: 'Everything after a return in the same block is dead code. Where should the return be?' },
      { level: 'Pseudocode', text: 'total ← amount\nif amount ≥ 100: total ← amount × 0.9\nreturn total', pre: true },
      { level: 'Technical help', text: 'Move `return total` to the last line of the function, with no extra indentation (at the level of `total = amount`).' },
    ],
    solution: {
      code: 'def final_price(amount):\n    total = amount\n    if amount >= 100:\n        total = amount * 0.9\n    return total\n\nprint(final_price(150))\nprint(final_price(50))',
      explanation: 'The if was after the return: it was dead code. With the return at the end, the total is decided first and then returned.',
    },
    reference: [
      'def final_price(amount):\n    total = amount\n    if amount >= 100:\n        total = amount * 0.9\n    return total\n\nprint(final_price(150))\nprint(final_price(50))',
      'def final_price(amount):\n    if amount >= 100:\n        return amount * 0.9\n    return amount\n\nprint(final_price(150))\nprint(final_price(50))',
    ],
    wrongs: [
      { code: 'def final_price(amount):\n    total = amount\n    return total\n    if amount >= 100:\n        total = amount * 0.9\n\nprint(final_price(150))\nprint(final_price(50))', category: 'comprension' },
      { code: 'def final_price(amount):\n    total = amount\n    if amount >= 100:\n        total = amount * 0.9\n        return total\n\nprint(final_price(150))\nprint(final_price(50))', category: 'logica' },
    ],
  },
  'ret-build': {
    id: 'ret-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Statistics for three marks', difficulty: 3, xp: 30, concepts: ['retorno', 'descomponer'],
    unlock: { any: ['ret-predict', 'ret-complete', 'ret-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `statistics(a, b, c)` that receives three marks and **returns two values**: the **average** (rounded to 2 decimal places) and the **highest mark**.\n\nExample: `average, highest = statistics(6, 9, 7.5)` → `7.5` and `9`.',
    expected: '7.5 9',
    plan: [
      {
        q: 'How do you get the highest mark?',
        options: [
          { text: 'With max(a, b, c)', correct: true },
          { text: 'With (a + b + c) / 3', why: 'That\'s the average, not the highest.' },
        ],
      },
      {
        q: 'How do you return the two results?',
        options: [
          { text: 'return average, highest', correct: true },
          { text: 'return average and on the next line return highest', why: 'The first return ends the function: the second would be dead code.' },
        ],
      },
    ],
    planScaffold: 'def statistics(a, b, c):\n    # rounded average and highest mark\n\n\naverage, highest = statistics(6, 9, 7.5)\nprint(average, highest)\n',
    starter: '',
    spec: {
      allow_short_names: ['a', 'b', 'c'],
      functions: [{ name: 'statistics', params: 3 }],
      cases: [
        { label: 'statistics(6, 9, 7.5)', call: 'm, x = statistics(6, 9, 7.5)\nprint(m, x)', out_lines: ['7.5 9'] },
        { label: 'statistics(5, 5, 6)', call: 'm, x = statistics(5, 5, 6)\nprint(m, x)', out_lines: ['5.33 6'] },
        { label: 'statistics(10, 2, 3)', call: 'm, x = statistics(10, 2, 3)\nprint(m, x)', out_lines: ['5.0 10'] },
      ],
      misconceptions: [
        { out_lines: ['5.333333333333333 6'], title: 'Rounding is missing', msg: 'The average must be rounded to 2 decimal places: `round(average, 2)`.' },
      ],
      logic_msg: 'Check the order: first the average (rounded) and then the highest mark.',
    },
    hints: [
      { level: 'Orientation', text: 'Two calculations (average and maximum) and a return with both separated by a comma.' },
      { level: 'Reasoning', text: 'The average is the sum divided by 3, with brackets. For the highest you have a function you already know from Module 3.' },
      { level: 'Pseudocode', text: 'average ← round((a + b + c) ÷ 3, 2)\nhighest ← the largest of a, b, c\nreturn average, highest', pre: true },
      { level: 'Technical help', text: '`round((a + b + c) / 3, 2)` and `max(a, b, c)`; then `return average, highest`.' },
    ],
    solution: {
      code: 'def statistics(a, b, c):\n    """Return the average (2 decimal places) and the highest of three marks."""\n    average = round((a + b + c) / 3, 2)\n    highest = max(a, b, c)\n    return average, highest\n\naverage, highest = statistics(6, 9, 7.5)\nprint(average, highest)',
      explanation: 'Each result is worked out in its own variable and they\'re returned together. Whoever calls it collects them in the same order.',
    },
    reference: [
      'def statistics(a, b, c):\n    return round((a + b + c) / 3, 2), max(a, b, c)',
    ],
    wrongs: [
      { code: 'def statistics(a, b, c):\n    return (a + b + c) / 3, max(a, b, c)', category: 'comprension' },
      { code: 'def statistics(a, b, c):\n    return max(a, b, c), round((a + b + c) / 3, 2)', category: 'logica' },
      { code: 'def statistics(a, b, c):\n    return round((a + b + c) / 3, 2)\n    return max(a, b, c)', category: 'ejecucion' },
    ],
  },
};
