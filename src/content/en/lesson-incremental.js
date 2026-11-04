// Lesson 6.2 · Incremental development (English translation of src/content/lesson-incremental.js).

const TOPIC = 'Return values';

export const LESSON_INCREMENTAL = {
  id: 'incremental',
  moduleId: 'm6',
  code: '6.2',
  title: 'Incremental development',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Start a function with its interface and a provisional result',
    'Move forward in small steps, running after each one',
    'Use temporary prints (scaffolding) to see in-between values',
    'Remove the scaffolding once the function works',
  ],
  prerequisites: ['Lesson 6.1 «return in depth»', 'Lesson 4.3 «Refactoring»'],
  teaser: 'Long functions are scary if you write them all at once. Today you learn to build them step by step, without ever getting lost.',
  celebration: 'You now know how to build functions step by step: you always know which part the error is in, because it\'s the last one you added.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'problema', title: 'The problem: the distance between two points', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'We want a function that works out the distance between two points on the plane, (x1, y1) and (x2, y2). The formula is:' },
        { type: 'p', text: '**distance = √((x2 − x1)² + (y2 − y1)²)**' },
        { type: 'p', text: 'Writing it all at once is risky: if it fails, you won\'t know which part is wrong. Instead, we\'ll go **step by step**, running after each one.' },
        {
          type: 'check', id: 'm6i-datos', concept: 'incremental', mode: 'choice',
          question: 'Which parameters does the function need?',
          options: [
            { text: 'Four: x1, y1, x2 and y2', correct: true },
            { text: 'One: the distance', why: 'The distance is the result: it\'s returned, it doesn\'t come in as data.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso1', title: 'Step 1: the interface and a provisional result', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Start with the **header** and return a provisional value. The function doesn\'t calculate anything yet, but you can already call it and check there are no typing errors:' },
        { type: 'code', run: true, code: 'def distance(x1, y1, x2, y2):\n    return 0.0\n\nprint(distance(1, 2, 4, 6))' },
        { type: 'callout', tone: 'tip', title: 'Choose an example you can solve', text: 'From (1, 2) to (4, 6): the differences are 3 and 4, so the distance is 5 (a 3-4-5 triangle). That way you can check each step.' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso2', title: 'Step 2: the differences, with scaffolding', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'Work out the first part and **show it** with a temporary print. That print is **scaffolding**: it\'s for checking while you build.' },
        { type: 'code', run: true, code: 'def distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    print("dx =", dx, "dy =", dy)   # scaffolding\n    return 0.0\n\nprint(distance(1, 2, 4, 6))', caption: 'It should show dx = 3 and dy = 4. If not, the error is in these two lines: there\'s no need to look anywhere else.' },
        {
          type: 'check', id: 'm6i-dx', concept: 'incremental', mode: 'text',
          question: 'With distance(2, 5, 7, 1), what value will dy have?', code: 'x1, y1, x2, y2 = 2, 5, 7, 1\nprint(y2 - y1)', answer: '-4',
          explain: 'dy = y2 − y1 = 1 − 5 = −4. When it\'s squared the sign won\'t matter.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso3', title: 'Steps 3 and 4: finish and remove the scaffolding', concepts: ['incremental'],
      blocks: [
        { type: 'p', text: 'With the differences checked, add the sum of squares (and check it: it should be 25), then the square root… and finally **remove the temporary print**:' },
        { type: 'code', run: true, code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    sum_of_squares = dx ** 2 + dy ** 2\n    return math.sqrt(sum_of_squares)\n\nprint(distance(1, 2, 4, 6))\nprint(distance(0, 0, 1, 1))' },
        {
          type: 'five', items: {
            '1 · Interface': 'Header and a provisional return.',
            '2 · One piece': 'Add one or two lines and show the in-between result.',
            '3 · Check': 'With an example you can solve by hand.',
            '4 · Clean up': 'When it works, remove the scaffolding prints.',
          },
        },
        { type: 'callout', tone: 'warn', title: 'Don\'t forget to remove the scaffolding', text: 'A forgotten print inside a function that returns a value messes up the output of any program that uses it.' },
        {
          type: 'check', id: 'm6i-andamio', concept: 'incremental', mode: 'choice',
          question: 'What will this program show?', code: 'def double(x):\n    print("x is", x)\n    return x * 2\n\nprint(double(4) + 1)', expectOutput: 'x is 4\n9',
          options: [
            { text: '«x is 4» and then 9', correct: true },
            { text: 'Just 9', why: 'The scaffolding print is still inside the function: it runs on every call.' },
          ],
          explain: 'That\'s why the scaffolding has to be removed once the function works.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'inc-order' },
    { id: 'a2', activity: 'inc-complete' },
    { id: 'a3', activity: 'inc-fix' },
    { id: 'a4', activity: 'inc-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'Start with the header and a provisional `return`: the function can already be called.',
    'Add a little at a time and run after each step: the error will be in the last thing you added.',
    'Use temporary prints (**scaffolding**) to see the in-between values.',
    'Check with examples you can solve by hand.',
    'When the function works, remove the scaffolding.',
  ],
};

export const ACTIVITIES_INCREMENTAL = {
  'inc-order': {
    id: 'inc-order', type: 'order', kindLabel: 'Put the steps in order', topic: TOPIC,
    title: 'The incremental plan', difficulty: 1, xp: 10, concepts: ['incremental', 'descomponer'],
    statement: 'You\'re going to write `circle_area(radius)` following incremental development. **Put the steps** of the plan in order.',
    stages: [
      {
        title: 'Order the development plan',
        items: [
          { id: 'i1', text: 'Write the header with return 0.0 and call it', after: [] },
          { id: 'i2', text: 'Work out radius ** 2 and show it with a temporary print', after: ['i1'], why: 'Before calculating anything, the function has to exist and be callable.' },
          { id: 'i3', text: 'Check with radius 2 that the square is 4', after: ['i2'], why: 'You can only check a value after working it out.' },
          { id: 'i4', text: 'Multiply by math.pi and return the result', after: ['i3'], why: 'First you check the previous part; that way, if something fails afterwards, you know the error is in the last step.' },
          { id: 'i5', text: 'Remove the temporary print', after: ['i4'], why: 'The scaffolding is removed at the end, when the function already works.' },
        ],
        success: 'Each step is small and is checked before carrying on. If something fails, the error is in the last thing you added.',
      },
    ],
  },
  'inc-complete': {
    id: 'inc-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The distance, finished', difficulty: 2, xp: 15, concepts: ['incremental', 'modulos'],
    statement: 'The function already works out the differences. Fill in the gaps to **return** the distance between the two points.',
    expected: '5.0\n13.0',
    starter: 'import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ___ 2 + ___ ** 2)\n\nprint(distance(1, 2, 4, 6))\nprint(distance(0, 0, 5, 12))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'distance', params: 4 }],
      cases: [
        { label: 'Whole program', out_lines: ['5.0', '13.0'] },
        { label: 'distance(3, 3, 3, 3)', call: 'print(distance(3, 3, 3, 3))', out_lines: ['0.0'] },
        { label: 'distance(-1, -1, 2, 3)', call: 'print(distance(-1, -1, 2, 3))', out_lines: ['5.0'] },
      ],
      logic_msg: 'The distance is the square root of dx² + dy². Check that you square both differences.',
    },
    hints: [
      { level: 'Orientation', text: 'Inside the square root you have to add the squares of dx and dy.' },
      { level: 'Reasoning', text: 'Which operator raises to a power? Which variable is missing in the second part?' },
      { level: 'Pseudocode', text: 'return sqrt(dx² + dy²)', pre: true },
      { level: 'Technical help', text: '`math.sqrt(dx ** 2 + dy ** 2)`.' },
    ],
    solution: {
      code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ** 2 + dy ** 2)\n\nprint(distance(1, 2, 4, 6))\nprint(distance(0, 0, 5, 12))',
      explanation: 'With the differences already checked, the last step only adds the sum of squares and the square root.',
    },
    reference: ['import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ** 2 + dy ** 2)\n\nprint(distance(1, 2, 4, 6))\nprint(distance(0, 0, 5, 12))'],
    wrongs: [
      { code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx ___ 2 + ___ ** 2)', category: 'incompleto' },
      { code: 'import math\n\ndef distance(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx * 2 + dy ** 2)\n\nprint(distance(1, 2, 4, 6))\nprint(distance(0, 0, 5, 12))', category: 'logica' },
    ],
  },
  'inc-fix': {
    id: 'inc-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The forgotten scaffolding', difficulty: 2, xp: 20, concepts: ['incremental', 'retorno'],
    statement: 'This function calculates correctly, but whoever wrote it forgot something from incremental development: the program\'s output comes out **messy**. Clean it up without changing what it returns.',
    expected: 'Total: 26.62',
    starter: 'def price_with_vat(price):\n    vat = price * 0.21\n    print("vat:", vat)\n    total = price + vat\n    print("total:", total)\n    return round(total, 2)\n\nprint("Total:", price_with_vat(22))',
    spec: {
      functions: [{ name: 'price_with_vat', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['Total: 26.62'] },
        { label: 'print(price_with_vat(100))', call: 'print(price_with_vat(100))', out_lines: ['121.0'] },
      ],
      misconceptions: [
        { out_contains: 'vat:', title: 'Scaffolding is left', msg: 'There\'s still a temporary print inside the function. Remove both: the function already works.' },
        { out_contains: 'total:', title: 'Scaffolding is left', msg: 'The print of the total is still inside the function. Remove it.' },
      ],
      logic_msg: 'The output must be a single line: «Total: 26.62».',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: as well as «Total: 26.62» other lines appear. Where do they come from?' },
      { level: 'Reasoning', text: 'There are two prints inside the function that were for checking while it was being written. Are they still needed?' },
      { level: 'Pseudocode', text: 'remove print("vat:", vat)\nremove print("total:", total)', pre: true },
      { level: 'Technical help', text: 'Delete the two print lines inside the function; keep the return and the main program\'s print.' },
    ],
    solution: {
      code: 'def price_with_vat(price):\n    vat = price * 0.21\n    total = price + vat\n    return round(total, 2)\n\nprint("Total:", price_with_vat(22))',
      explanation: 'The prints inside were scaffolding: useful while the function was being built, but not needed once it works. Showing is the main program\'s job.',
    },
    reference: ['def price_with_vat(price):\n    vat = price * 0.21\n    total = price + vat\n    return round(total, 2)\n\nprint("Total:", price_with_vat(22))'],
    wrongs: [
      { code: 'def price_with_vat(price):\n    vat = price * 0.21\n    print("vat:", vat)\n    total = price + vat\n    print("total:", total)\n    return round(total, 2)\n\nprint("Total:", price_with_vat(22))', category: 'comprension' },
      { code: 'def price_with_vat(price):\n    vat = price * 0.21\n    total = price + vat\n    print("Total:", round(total, 2))\n\nprice_with_vat(22)', category: 'logica' },
    ],
  },
  'inc-build': {
    id: 'inc-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The race clock', difficulty: 3, xp: 30, concepts: ['incremental', 'retorno', 'operadores'],
    unlock: { any: ['inc-order', 'inc-complete', 'inc-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `format_time(seconds)` that **returns** a text in the format `"1h 2m 5s"`.\n\nExamples: `format_time(3725)` → `"1h 2m 5s"` and `format_time(59)` → `"0h 0m 59s"`.\n\nDo it incrementally: first the hours (check them), then the minutes and finally the seconds and the text.',
    expected: '1h 2m 5s',
    plan: [
      {
        q: 'With 3725 seconds, which calculation gives the hours?',
        options: [
          { text: '3725 // 3600 → 1', correct: true },
          { text: '3725 / 3600 → 1.03', why: 'You need the **whole** hours: `//`.' },
          { text: '3725 % 3600 → 125', why: 'That\'s the seconds left over after removing the hours.' },
        ],
      },
      {
        q: 'What should you check before working out the minutes?',
        options: [
          { text: 'That the hours and the leftover seconds are right (1 and 125)', correct: true },
          { text: 'Nothing: better to write it all and test at the end', why: 'If it fails at the end, you won\'t know which part is wrong. Check each step.' },
        ],
      },
    ],
    planScaffold: 'def format_time(seconds):\n    hours = seconds // 3600\n    print("hours:", hours)   # scaffolding: check it and carry on\n    return ""\n\n\nprint(format_time(3725))\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'format_time', params: 1 }],
      cases: [
        { label: 'format_time(3725)', call: 'print(format_time(3725))', out_lines: ['1h 2m 5s'] },
        { label: 'format_time(59)', call: 'print(format_time(59))', out_lines: ['0h 0m 59s'] },
        { label: 'format_time(7200)', call: 'print(format_time(7200))', out_lines: ['2h 0m 0s'] },
        { label: 'format_time(45296)', call: 'print(format_time(45296))', out_lines: ['12h 34m 56s'] },
      ],
      misconceptions: [
        { out_contains: 'hours:', title: 'Scaffolding is left', msg: 'Remove the temporary prints from the function once it works.' },
        { out_lines: ['1h 2m 5s', 'None'], title: 'It shows, but doesn\'t return', msg: 'The function has to **return** the text with return.' },
      ],
      logic_msg: 'Compare the returned text with the expected one: hours, minutes and seconds, each with its letter and a space between them.',
    },
    hints: [
      { level: 'Orientation', text: 'Three numbers (hours, minutes, seconds) and a text that puts them together.' },
      { level: 'Reasoning', text: 'Hours: seconds // 3600. What\'s left over: seconds % 3600. From what\'s left over, the minutes are // 60 and the seconds, % 60.' },
      { level: 'Pseudocode', text: 'hours ← seconds ÷ 3600 (whole)\nrest ← seconds % 3600\nminutes ← rest ÷ 60 (whole)\nsecs ← rest % 60\nreturn «hours h minutes m secs s»', pre: true },
      { level: 'Technical help', text: '`return f"{hours}h {minutes}m {secs}s"`.' },
    ],
    solution: {
      code: 'def format_time(seconds):\n    """Return the time in «Xh Ym Zs» format."""\n    hours = seconds // 3600\n    rest = seconds % 3600\n    minutes = rest // 60\n    secs = rest % 60\n    return f"{hours}h {minutes}m {secs}s"\n\nprint(format_time(3725))',
      explanation: 'Each step could be checked separately (1 hour, 125 s left over, 2 minutes, 5 seconds). The final f-string puts the three values together in the required format.',
    },
    reference: [
      'def format_time(seconds):\n    hours = seconds // 3600\n    minutes = seconds % 3600 // 60\n    secs = seconds % 60\n    return f"{hours}h {minutes}m {secs}s"',
    ],
    wrongs: [
      { code: 'def format_time(seconds):\n    hours = seconds // 3600\n    print("hours:", hours)\n    minutes = seconds % 3600 // 60\n    secs = seconds % 60\n    return f"{hours}h {minutes}m {secs}s"', category: 'comprension' },
      { code: 'def format_time(seconds):\n    hours = seconds // 3600\n    minutes = seconds // 60\n    secs = seconds % 60\n    return f"{hours}h {minutes}m {secs}s"', category: 'logica' },
    ],
  },
};
