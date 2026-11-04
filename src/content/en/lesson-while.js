// Lesson 7.2 · while loops (English translation of src/content/lesson-while.js).

const TOPIC = 'Loops';

export const LESSON_WHILE = {
  id: 'bucle-while',
  moduleId: 'm7',
  code: '7.2',
  title: 'while loops',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Repeat while a condition is met with while',
    'Make sure the loop ends and recognise an infinite loop',
    'Choose between for (known number of laps) and while (unknown)',
    'Validate user input by asking again',
    'Leave a loop with break',
  ],
  prerequisites: ['Lesson 7.1 «for loops»'],
  teaser: 'Sometimes you don\'t know how many laps you need: «keep asking until the answer is valid». That\'s what while is for.',
  celebration: 'You now control while loops: you know when they end, how to validate data and when to leave with break.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'while', title: 'Repeating while…', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`while condition:` repeats its block **while** the condition is true. Before each lap, Python checks it again.' },
        { type: 'code', run: true, code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Lift-off!")' },
        { type: 'trace', code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("Lift-off!")' },
        {
          type: 'check', id: 'm7w-vueltas', concept: 'bucles', mode: 'text',
          question: 'Predict:', code: 'x = 1\nwhile x < 50:\n    x *= 3\nprint(x)', answer: '81',
          explain: '1 → 3 → 9 → 27 → 81. With 81 the condition x < 50 is already false and the loop ends.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'infinito', title: 'Making the loop end', concepts: ['bucles', 'errores'],
      blocks: [
        { type: 'p', text: 'Something inside the block has to bring the condition closer to being **false**. Otherwise the loop never ends: an **infinite loop**.' },
        { type: 'code', title: 'Infinite loop (don\'t run it)', code: 'n = 3\nwhile n > 0:\n    print(n)\n# n -= 1 is missing: n is always 3' },
        { type: 'callout', tone: 'info', title: 'If it happens to you in LunaPy', text: 'LunaPy stops the program after a few seconds and warns you. Check which variable should change on each lap and whether it really gets closer to making the condition false.' },
        {
          type: 'check', id: 'm7w-infinito', concept: 'bucles', mode: 'choice',
          question: 'Which of these loops ends?',
          options: [
            { text: 'i = 0 / while i < 5: / i += 1', correct: true },
            { text: 'i = 0 / while i < 5: / i -= 1', why: 'i goes down (−1, −2…) and is always less than 5: it never ends.' },
            { text: 'i = 0 / while i != 5: / i += 2', why: 'i is 0, 2, 4, 6…: it skips the 5 and the condition never becomes false.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'cuando', title: 'for or while?', concepts: ['bucles'],
      blocks: [
        {
          type: 'five', items: {
            'for': 'When you know **how many** laps or what to go through: from 1 to 10, each letter of a text.',
            'while': 'When it depends on a **condition** and you don\'t know when it will be met: until the savings reach 1000 €, until the data is valid.',
          },
        },
        { type: 'code', run: true, code: '# How many years does it take for savings to double at 5 % a year?\nsavings = 1000\nyears = 0\nwhile savings < 2000:\n    savings *= 1.05\n    years += 1\nprint(years, "years:", round(savings, 2), "€")' },
        {
          type: 'check', id: 'm7w-cifras', concept: 'bucles', mode: 'text',
          question: 'Predict: how many digits does 2026 have?', code: 'n = 2026\ndigits = 0\nwhile n > 0:\n    n //= 10\n    digits += 1\nprint(digits)', answer: '4',
          explain: 'Each lap removes the last digit: 2026 → 202 → 20 → 2 → 0. Four laps.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Validating input', concepts: ['bucles', 'input'],
      blocks: [
        { type: 'p', text: 'A classic use of while: **asking again** while the data isn\'t valid.' },
        { type: 'code', run: true, code: 'age = int(input("Age: "))\nwhile age < 0 or age > 120:\n    print("That age isn\'t valid.")\n    age = int(input("Age: "))\nprint("Age saved:", age)', caption: 'Try typing -5 or 200 before a correct age.' },
        {
          type: 'check', id: 'm7w-validar', concept: 'bucles', mode: 'choice',
          question: 'If the user types 150 and then 30, how many times is «That age isn\'t valid.» shown?',
          options: [
            { text: 'Once', correct: true },
            { text: 'Never', why: '150 doesn\'t meet the validity condition (it\'s greater than 120): it goes into the loop once.' },
            { text: 'Twice', why: 'With 30 the while condition is already false: it doesn\'t go in again.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'break', title: 'Leaving with break', concepts: ['bucles'],
      blocks: [
        { type: 'p', text: '`break` leaves the loop **immediately**, even if the condition is still true. It\'s often used with `while True:` when the exit condition is only known inside the loop:' },
        { type: 'code', run: true, code: 'total = 0\nwhile True:\n    data = input("Number (or «end»): ")\n    if data == "end":\n        break\n    total += float(data)\nprint("Total:", total)', caption: 'Type a few numbers and then «end».' },
        { type: 'callout', tone: 'tip', title: 'In moderation', text: '`while True` with `break` is useful when you have to read before deciding. If the condition can be written at the top, the normal while reads better.' },
        {
          type: 'check', id: 'm7w-break', concept: 'bucles', mode: 'text',
          question: 'Predict:', code: 'n = 0\nwhile True:\n    n += 7\n    if n > 30:\n        break\nprint(n)', answer: '35',
          explain: '7, 14, 21, 28, 35: with 35, n > 30 is met and break leaves the loop.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'whi-predict' },
    { id: 'a2', activity: 'whi-complete' },
    { id: 'a3', activity: 'whi-fix' },
    { id: 'a4', activity: 'whi-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`while condition:` repeats while the condition is true; it\'s checked before each lap.',
    'Something inside the loop must bring the condition closer to being false; otherwise there\'s an **infinite loop**.',
    '`for` when you know what to go through; `while` when it depends on a condition.',
    'To validate data: ask, and while it isn\'t valid, ask again.',
    '`break` leaves the loop on the spot; useful with `while True:`.',
  ],
};

export const ACTIVITIES_WHILE = {
  'whi-predict': {
    id: 'whi-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The growing plant', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'A plant is 10 cm tall and grows by half its height every week. **What will it show?**',
    code: 'height = 10\nweeks = 0\nwhile height < 40:\n    height = height * 1.5\n    weeks += 1\nprint(weeks, height)',
    expectedOutput: '4 50.625',
    options: [
      { text: '4 50.625', correct: true },
      { text: '3 33.75', concept: 'bucles', why: 'With 33.75 the condition height < 40 is still true: there\'s one more lap.' },
      { text: '4 40', concept: 'bucles', why: 'The loop doesn\'t stop exactly at 40: it stops at the first height that\'s no longer less than 40.' },
      { text: '3 50.625', concept: 'bucles', why: 'Count the laps: 15, 22.5, 33.75 and 50.625 are four.' },
    ],
    explain: ['10 → 15 → 22.5 → 33.75 → 50.625.', 'With 50.625, height < 40 is false: the loop ends after 4 weeks.'],
  },
  'whi-complete': {
    id: 'whi-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The savings goal', difficulty: 2, xp: 15, concepts: ['bucles', 'retorno'],
    statement: 'Complete `months_to_save(goal, payment)`: it returns how many months it takes to **reach or pass** the goal by saving the same payment each month.',
    expected: '4\n10',
    starter: 'def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved ___ goal:\n        saved += ___\n        months += 1\n    return ___\n\nprint(months_to_save(100, 30))\nprint(months_to_save(500, 50))',
    spec: {
      blanks: true,
      functions: [{ name: 'months_to_save', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['4', '10'] },
        { label: 'months_to_save(90, 30) (exact)', call: 'print(months_to_save(90, 30))', out_lines: ['3'] },
        { label: 'months_to_save(0, 10)', call: 'print(months_to_save(0, 10))', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['4', '11'], title: 'One month too many', msg: 'With `<=` you keep saving when you\'ve already reached the goal exactly. Use `<`: another month is only needed while the amount saved is **less** than the goal.' },
      ],
      logic_msg: 'Check with 100 € and 30 a month: 30, 60, 90, 120 → 4 months.',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps: the condition for carrying on saving, what\'s added each month and what\'s returned.' },
      { level: 'Reasoning', text: 'While what do you need to keep saving? If you reach the goal exactly, do you need another month?' },
      { level: 'Pseudocode', text: 'while saved < goal:\n    saved ← saved + payment\n    months ← months + 1\nreturn months', pre: true },
      { level: 'Technical help', text: '`while saved < goal:`, `saved += payment` and `return months`.' },
    ],
    solution: {
      code: 'def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved < goal:\n        saved += payment\n        months += 1\n    return months\n\nprint(months_to_save(100, 30))\nprint(months_to_save(500, 50))',
      explanation: 'We don\'t know in advance how many months it will take: that\'s why it\'s while. The condition `saved < goal` makes it stop as soon as the goal is reached or passed.',
    },
    reference: ['def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved < goal:\n        saved += payment\n        months += 1\n    return months\n\nprint(months_to_save(100, 30))\nprint(months_to_save(500, 50))'],
    wrongs: [
      { code: 'def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved ___ goal:\n        saved += ___\n        months += 1\n    return ___', category: 'incompleto' },
      { code: 'def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved <= goal:\n        saved += payment\n        months += 1\n    return months\n\nprint(months_to_save(100, 30))\nprint(months_to_save(500, 50))', category: 'comprension' },
      { code: 'def months_to_save(goal, payment):\n    saved = 0\n    months = 0\n    while saved < goal:\n        saved += payment\n        months += 1\n    return saved\n\nprint(months_to_save(100, 30))\nprint(months_to_save(500, 50))', category: 'logica' },
    ],
  },
  'whi-fix': {
    id: 'whi-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The digit counter', difficulty: 2, xp: 20, concepts: ['bucles', 'errores'],
    statement: '`count_digits(n)` should return how many digits a positive whole number has, but it always says 1. Find the bug and fix it.',
    expected: '4\n1\n6',
    starter: 'def count_digits(n):\n    while n > 0:\n        digits = 0\n        n //= 10\n        digits += 1\n    return digits\n\nprint(count_digits(2026))\nprint(count_digits(7))\nprint(count_digits(100000))',
    spec: {
      functions: [{ name: 'count_digits', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['4', '1', '6'] },
        { label: 'count_digits(99)', call: 'print(count_digits(99))', out_lines: ['2'] },
        { label: 'count_digits(123456789)', call: 'print(count_digits(123456789))', out_lines: ['9'] },
      ],
      misconceptions: [
        { out_lines: ['1', '1', '1'], title: 'The counter is reset', msg: '`digits = 0` is inside the loop: it goes back to zero on every lap. Initialise it before the while.' },
      ],
      skip_tips: ['repeated_numbers'],
      logic_msg: 'Check with 2026: the loop must do 4 laps (2026 → 202 → 20 → 2 → 0).',
    },
    hints: [
      { level: 'Orientation', text: 'It\'s the same bug you saw with for: where is the counter initialised?' },
      { level: 'Reasoning', text: 'If `digits = 0` runs on every lap, at the end it can only be 1.' },
      { level: 'Pseudocode', text: 'digits ← 0\nwhile n > 0:\n    n ← n // 10\n    digits ← digits + 1\nreturn digits', pre: true },
      { level: 'Technical help', text: 'Move `digits = 0` before the `while`, at the same indentation level as the while.' },
    ],
    solution: {
      code: 'def count_digits(n):\n    digits = 0\n    while n > 0:\n        n //= 10\n        digits += 1\n    return digits\n\nprint(count_digits(2026))\nprint(count_digits(7))\nprint(count_digits(100000))',
      explanation: 'The counter is initialised once, before the loop, and goes up on every lap: as many laps as the number has digits.',
    },
    reference: ['def count_digits(n):\n    digits = 0\n    while n > 0:\n        n //= 10\n        digits += 1\n    return digits\n\nprint(count_digits(2026))\nprint(count_digits(7))\nprint(count_digits(100000))'],
    wrongs: [
      { code: 'def count_digits(n):\n    while n > 0:\n        digits = 0\n        n //= 10\n        digits += 1\n    return digits\n\nprint(count_digits(2026))\nprint(count_digits(7))\nprint(count_digits(100000))', category: 'comprension' },
      { code: 'def count_digits(n):\n    digits = 0\n    while n > 9:\n        n //= 10\n        digits += 1\n    return digits\n\nprint(count_digits(2026))\nprint(count_digits(7))\nprint(count_digits(100000))', category: 'logica' },
    ],
  },
  'whi-build': {
    id: 'whi-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'The valid mark', difficulty: 3, xp: 30, concepts: ['bucles', 'input', 'condicionales'],
    unlock: { any: ['whi-predict', 'whi-complete', 'whi-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Write a program that asks for a mark (it can have decimals) and, **while it isn\'t between 0 and 10**, shows `Invalid mark` and asks for it again. When it\'s valid, show `Mark saved: ` followed by the mark.\n\nExample: if the user types 15, -2 and 7.5, the program shows «Invalid mark» twice and then «Mark saved: 7.5».',
    expected: 'Invalid mark\nInvalid mark\nMark saved: 7.5',
    plan: [
      {
        q: 'What\'s the condition for asking again?',
        options: [
          { text: 'mark < 0 or mark > 10', correct: true },
          { text: 'mark < 0 and mark > 10', why: 'No number is both less than 0 and greater than 10: the loop would never run.' },
          { text: '0 <= mark <= 10', why: 'That\'s the condition for a **valid** mark: the loop has to repeat while it **isn\'t**.' },
        ],
      },
      {
        q: 'Where is the mark asked for?',
        options: [
          { text: 'Once before the while and again at the end of each lap', correct: true },
          { text: 'Only before the while', why: 'Then, if the first mark isn\'t valid, it would never change: infinite loop.' },
        ],
      },
    ],
    planScaffold: '# Ask for the mark\n\n# While it isn\'t valid: warn and ask again\n\n# Show the saved mark\n',
    starter: '',
    spec: {
      cases: [
        { label: '15, -2 and 7.5', stdin: ['15', '-2', '7.5'], out_lines: ['Invalid mark', 'Invalid mark', 'Mark saved: 7.5'] },
        { label: 'Valid first time: 8', stdin: ['8'], out_lines: ['Mark saved: 8.0'] },
        { label: 'Limits: 10.5 and 10', stdin: ['10.5', '10'], out_lines: ['Invalid mark', 'Mark saved: 10.0'] },
        { label: 'Limit: 0', stdin: ['0'], out_lines: ['Mark saved: 0.0'] },
      ],
      misconceptions: [
        { out_lines: ['Invalid mark', 'Mark saved: -2.0'], title: 'It\'s only checked once', msg: 'You used if: it checks the first mark, but not the second. Use while to repeat while it isn\'t valid.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the mark', msg: 'Use input() to ask for the mark (and float() to convert it).' }],
      logic_msg: 'Compare with the expected output: one «Invalid mark» for each wrong attempt and «Mark saved: …» at the end.',
    },
    hints: [
      { level: 'Orientation', text: 'Ask, check with while, warn and ask again; when you leave the loop, show it.' },
      { level: 'Reasoning', text: 'The while condition describes a mark that **isn\'t** valid: less than 0 or greater than 10. Inside, the mark has to change so the loop can end.' },
      { level: 'Pseudocode', text: 'mark ← ask for a decimal\nwhile mark < 0 or mark > 10:\n    show "Invalid mark"\n    mark ← ask for a decimal\nshow "Mark saved:", mark', pre: true },
      { level: 'Technical help', text: '`mark = float(input("Mark: "))`, `while mark < 0 or mark > 10:` and inside do `mark = float(input("Mark: "))` again.' },
    ],
    solution: {
      code: 'mark = float(input("Mark: "))\nwhile mark < 0 or mark > 10:\n    print("Invalid mark")\n    mark = float(input("Mark: "))\nprint("Mark saved:", mark)',
      explanation: 'The loop repeats while the mark isn\'t valid, and inside it\'s asked for again: that way the condition can become false. With an if it would only be checked the first time.',
    },
    reference: [
      'mark = float(input("Mark: "))\nwhile mark < 0 or mark > 10:\n    print("Invalid mark")\n    mark = float(input("Mark: "))\nprint("Mark saved:", mark)',
      'while True:\n    mark = float(input())\n    if 0 <= mark <= 10:\n        break\n    print("Invalid mark")\nprint("Mark saved:", mark)',
    ],
    wrongs: [
      { code: 'mark = float(input())\nif mark < 0 or mark > 10:\n    print("Invalid mark")\n    mark = float(input())\nprint("Mark saved:", mark)', category: 'comprension' },
      { code: 'mark = float(input())\nwhile mark < 0 and mark > 10:\n    print("Invalid mark")\n    mark = float(input())\nprint("Mark saved:", mark)', category: 'logica' },
    ],
  },
};
