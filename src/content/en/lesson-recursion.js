// Lesson 5.3 · Recursion (English translation of src/content/lesson-recursion.js).

const TOPIC = 'Recursion';

export const LESSON_RECURSION = {
  id: 'recursion',
  moduleId: 'm5',
  code: '5.3',
  title: 'Recursion',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explain what a recursive function is',
    'Identify the base case and the recursive step',
    'Follow the call stack of a recursive function',
    'Recognise and fix infinite recursion',
    'Write recursive functions that return a result',
  ],
  prerequisites: ['Lesson 5.2 «if, elif and else»', 'Lesson 3.3 «Parameters and local variables»'],
  teaser: 'A function that calls itself sounds like a trick, but it\'s a very elegant way of repeating. Today you discover how it works without getting lost.',
  celebration: 'You\'ve completed Module 5: your programs decide with conditionals and repeat with recursion.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'A function that calls itself', concepts: ['recursion'],
      blocks: [
        { type: 'p', text: 'A function can call other functions… and also **itself**. That\'s **recursion**. So it doesn\'t repeat forever, it needs two parts:' },
        {
          type: 'five', items: {
            'Base case': 'The situation in which the function **no longer** calls itself and ends.',
            'Recursive step': 'The function calls itself with a **smaller** problem, one that gets closer to the base case.',
          },
        },
        { type: 'code', run: true, code: 'def countdown(n):\n    if n == 0:              # base case\n        print("Lift-off!")\n    else:\n        print(n)\n        countdown(n - 1)  # recursive step: one number less\n\ncountdown(3)' },
        {
          type: 'check', id: 'm5r-partes', concept: 'recursion', mode: 'choice',
          question: 'In `countdown`, what guarantees that the function eventually ends?',
          options: [
            { text: 'That each call uses n - 1 and reaches 0, the base case', correct: true },
            { text: 'The print', why: 'The print only shows the number. What makes it end is that n gets closer to the base case with each call.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'pila', title: 'The call stack', concepts: ['recursion'],
      blocks: [
        { type: 'p', text: 'Each recursive call opens a **new frame**, with its own `n`. The frames pile up and close as the calls finish, in reverse order. Move forward step by step and watch the memory:' },
        { type: 'trace', code: 'def countdown(n):\n    if n == 0:\n        print("Lift-off!")\n    else:\n        print(n)\n        countdown(n - 1)\n\ncountdown(2)' },
        { type: 'callout', tone: 'info', title: 'Each n is different', text: 'When `countdown(2)` calls `countdown(1)`, there are two `n` variables at the same time, one in each frame (2 and 1). They\'re local: they don\'t overwrite each other.' },
        {
          type: 'check', id: 'm5r-marcos', concept: 'recursion', mode: 'choice',
          question: 'With `countdown(2)`, what\'s the largest number of countdown frames there are at the same time?',
          options: [
            { text: '3: with n = 2, n = 1 and n = 0', correct: true },
            { text: '1: the previous one is deleted when the next is called', why: 'A frame doesn\'t close until its call finishes. While it waits for the next call, it stays on the stack.' },
            { text: '2', why: 'Count the base case call too: countdown(0) opens its own frame.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'devolver', title: 'Recursion that returns a result', concepts: ['recursion', 'parametros'],
      blocks: [
        { type: 'p', text: 'The classic example is the **factorial**: 4! = 4 × 3 × 2 × 1. Notice that 4! = 4 × 3!, and 3! = 3 × 2!… Each factorial is defined using the previous one, until you reach 0! = 1:' },
        { type: 'code', run: true, code: 'def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)\n\nprint(factorial(4))\nprint(factorial(10))' },
        { type: 'p', text: 'The calls go down to the base case and the results **come back up**: factorial(0) returns 1, factorial(1) returns 1 × 1, factorial(2) returns 2 × 1… up to 4 × 6 = 24.' },
        { type: 'callout', tone: 'tip', title: 'The leap of faith', text: 'When you write the recursive step, **trust** that the smaller call returns the right thing. You only have to think: «if I already had factorial(n - 1), how would I get factorial(n)?».' },
        {
          type: 'check', id: 'm5r-suma', concept: 'recursion', mode: 'text',
          question: 'Predict:', code: 'def total(n):\n    if n == 0:\n        return 0\n    return n + total(n - 1)\n\nprint(total(4))', answer: '10',
          explain: '4 + 3 + 2 + 1 + 0 = 10.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'infinita', title: 'Infinite recursion', concepts: ['recursion', 'errores'],
      blocks: [
        { type: 'p', text: 'If the base case is missing, or if the recursive step doesn\'t get closer to it, the function calls itself non-stop. Python stops it at around a thousand calls with a **RecursionError**:' },
        { type: 'code', run: true, code: 'def countdown(n):\n    print(n)\n    countdown(n - 1)   # there\'s no base case!\n\ncountdown(3)' },
        {
          type: 'five', items: {
            'The base case is missing': 'No branch ends without calling again.',
            'It doesn\'t get closer to the base case': 'For example, `countdown(n + 1)` when the base case is 0.',
            'The base case is never reached': '`if n == 0` with n starting at 2.5 and going down by 1: it jumps from 0.5 to -0.5.',
          },
        },
        {
          type: 'check', id: 'm5r-infinita', concept: 'recursion', mode: 'choice',
          question: 'What happens?', code: 'def f(n):\n    if n == 0:\n        return 0\n    return f(n + 1)\n\nprint(f(3))', expectError: 'RecursionError',
          options: [
            { text: 'RecursionError: n moves away from the base case', correct: true },
            { text: 'It shows 0', why: 'n starts at 3 and goes up (4, 5, 6…): it never reaches 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'rec-predict' },
    { id: 'a2', activity: 'rec-complete' },
    { id: 'a3', activity: 'rec-fix' },
    { id: 'a4', activity: 'rec-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A **recursive** function calls itself.',
    'It needs a **base case** (ends without calling itself) and a **recursive step** that gets closer to it.',
    'Each call has its own frame with its variables; the frames close in reverse order.',
    'To return a result: `return n * factorial(n - 1)`. Trust the smaller call.',
    'Without a base case, or if it\'s never reached, there\'s a **RecursionError**.',
  ],
};

export const ACTIVITIES_RECURSION = {
  'rec-predict': {
    id: 'rec-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The echo that comes back', difficulty: 3, xp: 15, concepts: ['recursion'],
    prompt: 'Here there\'s one print **before** and another **after** the recursive call. **What will it show?**',
    code: 'def echo(n):\n    if n == 0:\n        return\n    print("down", n)\n    echo(n - 1)\n    print("up", n)\n\necho(2)',
    expectedOutput: 'down 2\ndown 1\nup 1\nup 2',
    options: [
      { text: 'down 2, down 1, up 1, up 2', correct: true },
      { text: 'down 2, up 2, down 1, up 1', concept: 'recursion', why: '«up 2» doesn\'t run until the whole echo(1) call has finished, including its «up 1».' },
      { text: 'down 2, down 1, up 2, up 1', concept: 'recursion', why: 'The frames close in reverse order: first echo(1) finishes and then echo(2).' },
      { text: 'down 2, down 1', concept: 'recursion', why: 'After each recursive call, the function carries on with its next line: the «up» print.' },
    ],
    explain: ['echo(2) shows «down 2» and calls echo(1).', 'echo(1) shows «down 1» and calls echo(0), which ends without doing anything.', 'echo(1) carries on: «up 1».', 'echo(2) carries on: «up 2».'],
  },
  'rec-complete': {
    id: 'rec-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Recursive powers', difficulty: 2, xp: 15, concepts: ['recursion'],
    statement: 'Complete the recursive function `power(base, exp)`. Idea: base⁰ = 1, and base^exp = base × base^(exp − 1).',
    expected: '8 1 81',
    starter: 'def power(base, exp):\n    if exp == ___:\n        return 1\n    return base * power(base, ___)\n\nprint(power(2, 3), power(5, 0), power(3, 4))',
    spec: {
      blanks: true,
      functions: [{ name: 'power', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['8 1 81'] },
        { label: 'power(10, 2)', call: 'print(power(10, 2))', out_lines: ['100'] },
        { label: 'power(7, 1)', call: 'print(power(7, 1))', out_lines: ['7'] },
      ],
      rules: [{ type: 'must_call', name: 'power', title: 'Use recursion', msg: 'The function must call itself.' }],
      logic_msg: 'Check the base case (with which exponent is the result 1?) and that each call reduces the exponent by 1.',
    },
    hints: [
      { level: 'Orientation', text: 'The first gap is the base case; the second, how the exponent changes in the recursive call.' },
      { level: 'Reasoning', text: 'What is any number to the power of 0? In each call, the exponent has to get closer to that value.' },
      { level: 'Pseudocode', text: 'if exp is 0: return 1\nreturn base × power(base, exp − 1)', pre: true },
      { level: 'Technical help', text: '`if exp == 0:` and `power(base, exp - 1)`.' },
    ],
    solution: {
      code: 'def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(2, 3), power(5, 0), power(3, 4))',
      explanation: 'power(2, 3) = 2 × power(2, 2) = 2 × 2 × power(2, 1) = 2 × 2 × 2 × power(2, 0) = 2 × 2 × 2 × 1 = 8.',
    },
    reference: ['def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(2, 3), power(5, 0), power(3, 4))'],
    wrongs: [
      { code: 'def power(base, exp):\n    if exp == ___:\n        return 1\n    return base * power(base, ___)', category: 'incompleto' },
      { code: 'def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp + 1)\n\nprint(power(2, 3), power(5, 0), power(3, 4))', category: 'ejecucion' },
      { code: 'def power(base, exp):\n    if exp == 1:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(2, 3), power(5, 1), power(3, 4))', category: 'logica' },
    ],
  },
  'rec-fix': {
    id: 'rec-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The sum that never ends', difficulty: 2, xp: 20, concepts: ['recursion', 'errores'],
    statement: '`digit_sum(n)` should add up the digits of a positive whole number (472 → 13), but it gives a **RecursionError**. Find out why it doesn\'t end and fix it.',
    expected: '13\n9\n0',
    starter: 'def digit_sum(n):\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(472))\nprint(digit_sum(9))\nprint(digit_sum(0))',
    spec: {
      skip_tips: ['repeated_numbers'], // the 10 splits digits: it isn't a magic number
      functions: [{ name: 'digit_sum', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['13', '9', '0'] },
        { label: 'digit_sum(2026)', call: 'print(digit_sum(2026))', out_lines: ['10'] },
        { label: 'digit_sum(99999)', call: 'print(digit_sum(99999))', out_lines: ['45'] },
      ],
      rules: [{ type: 'must_call', name: 'digit_sum', title: 'Keep the recursion', msg: 'Fix the recursive function instead of replacing it with something else.' }],
      logic_msg: 'It ends now, but the result isn\'t right. What should the function return when n is 0?',
    },
    hints: [
      { level: 'Orientation', text: 'A recursion needs two parts. Which of them is missing here?' },
      { level: 'Reasoning', text: 'Each call removes the last digit (n // 10). Which number do you reach at the end? What should the function return there, without calling itself again?' },
      { level: 'Pseudocode', text: 'if n is 0: return 0\nreturn last digit + digit_sum(n without its last digit)', pre: true },
      { level: 'Technical help', text: 'Add at the start: `if n == 0:` and inside it `return 0`.' },
    ],
    solution: {
      code: 'def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(472))\nprint(digit_sum(9))\nprint(digit_sum(0))',
      explanation: 'The base case was missing. Removing digits with `// 10` always ends up at 0, and there the digit sum is 0: the function returns without calling itself again.',
    },
    reference: ['def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(472))\nprint(digit_sum(9))\nprint(digit_sum(0))'],
    wrongs: [
      { code: 'def digit_sum(n):\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(472))\nprint(digit_sum(9))\nprint(digit_sum(0))', category: 'ejecucion' },
      { code: 'def digit_sum(n):\n    if n == 0:\n        return 1\n    return n % 10 + digit_sum(n // 10)\n\nprint(digit_sum(472))\nprint(digit_sum(9))\nprint(digit_sum(0))', category: 'logica' },
    ],
  },
  'rec-build': {
    id: 'rec-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The staircase of asterisks', difficulty: 3, xp: 30, concepts: ['recursion', 'descomponer'],
    unlock: { any: ['rec-predict', 'rec-complete', 'rec-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define a **recursive** function `staircase(n)` that draws a staircase of n steps: the first line with 1 asterisk, the second with 2… and the last with n. If n is 0, it shows nothing.\n\nDesign hint: to draw the staircase of n steps, first draw the one of n − 1 and then add the line of n asterisks.',
    expected: '*\n**\n***',
    plan: [
      {
        q: 'What\'s the base case?',
        options: [
          { text: 'n == 0: there\'s nothing to draw', correct: true },
          { text: 'n == 3', why: 'The function has to work for any n. The smallest possible case is 0 steps.' },
        ],
      },
      {
        q: 'In the recursive step, in what order do the two instructions go?',
        options: [
          { text: 'First staircase(n - 1) and then the line of n asterisks', correct: true },
          { text: 'First the line of n asterisks and then staircase(n - 1)', why: 'That way the staircase would come out upside down: from n asterisks to 1.' },
        ],
      },
    ],
    planScaffold: 'def staircase(n):\n    # base case\n\n    # recursive step: the staircase of n - 1 and then the line of n\n\n\nstaircase(3)\n',
    starter: '',
    spec: {
      functions: [{ name: 'staircase', params: 1 }],
      cases: [
        { label: 'staircase(3)', call: 'staircase(3)', out_lines: ['*', '**', '***'] },
        { label: 'staircase(1)', call: 'staircase(1)', out_lines: ['*'] },
        { label: 'staircase(5)', call: 'staircase(5)', out_lines: ['*', '**', '***', '****', '*****'] },
        { label: 'staircase(0)', call: 'staircase(0)', out_lines: [] },
      ],
      misconceptions: [
        { out_lines: ['***', '**', '*'], title: 'Upside-down staircase', msg: 'You drew the line before the recursive call. Call `staircase(n - 1)` first and then draw the line of n asterisks.' },
      ],
      rules: [{ type: 'must_call', name: 'staircase', title: 'Use recursion', msg: 'The staircase function must call itself.' }],
      logic_msg: 'The staircase of n steps has n lines: 1 asterisk on the first and n on the last.',
    },
    hints: [
      { level: 'Orientation', text: 'Just like the countdown, but the print goes **after** the recursive call.' },
      { level: 'Reasoning', text: 'If you already knew how to draw the staircase of n − 1 steps, what would you need for the one of n? A single line.' },
      { level: 'Pseudocode', text: 'if n is 0: do nothing (end)\notherwise:\n    staircase(n − 1)\n    show "*" repeated n times', pre: true },
      { level: 'Technical help', text: '`if n > 0:` with `staircase(n - 1)` and `print("*" * n)` inside. When n is 0, it doesn\'t go into the if and ends.' },
    ],
    solution: {
      code: 'def staircase(n):\n    if n == 0:\n        return\n    staircase(n - 1)\n    print("*" * n)\n\nstaircase(3)',
      explanation: 'The recursive call draws the top steps first; on the way back, each frame adds its line. Since the frames close in reverse order, the lines come out from 1 to n.',
    },
    reference: [
      'def staircase(n):\n    if n == 0:\n        return\n    staircase(n - 1)\n    print("*" * n)',
      'def staircase(n):\n    if n > 0:\n        staircase(n - 1)\n        print("*" * n)\n\nstaircase(3)',
    ],
    wrongs: [
      { code: 'def staircase(n):\n    if n == 0:\n        return\n    print("*" * n)\n    staircase(n - 1)', category: 'comprension' },
      { code: 'def staircase(n):\n    staircase(n - 1)\n    print("*" * n)', category: 'ejecucion' },
      { code: 'def staircase(n):\n    print("*")\n    print("**")\n    print("***")', category: 'logica' },
    ],
  },
};
