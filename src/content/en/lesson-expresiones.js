// Lesson 2.2 · Expressions and arithmetic operators (English translation of src/content/lesson-expresiones.js).

const TOPIC = 'Expressions';

export const LESSON_EXPRESIONES = {
  id: 'expresiones',
  moduleId: 'm2',
  code: '2.2',
  title: 'Expressions and arithmetic operators',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Tell an expression (produces a value) apart from a statement (does something)',
    'Predict how Python evaluates an expression: priority and direction',
    'Know what type the result of an operation will be',
    'Change variables with += , -= , *= and friends',
    'Use // and % to split units and digits',
  ],
  prerequisites: ['Lesson 2.1 «Variables»', 'Lesson 1.2 «Python as a calculator» (recommended)'],
  teaser: 'Today you learn to read an expression the way Python does: in what order it calculates, what type it gets and how to change variables with shortcuts.',
  celebration: 'You now read expressions like Python: you know in what order it calculates, what type it gets and how to make the most of // and %.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'expresion', title: 'Expressions and statements', concepts: ['expresiones'],
      blocks: [
        { type: 'p', text: 'An **expression** is a combination of values, variables and operators that Python can **calculate**: the result is a value. `width * height`, `price + 2` or even `age` (a variable on its own) are expressions.' },
        { type: 'p', text: 'A **statement** is an instruction that **does something**: store a value, show it… `area = width * height` is an assignment statement; its right-hand side is an expression.' },
        { type: 'code', run: true, code: 'width = 4\nheight = 3\narea = width * height\nprint(area)\nprint(width * height + 2)', caption: 'To calculate an expression, Python replaces each variable with its value: `width * height` → `4 * 3` → `12`.' },
        {
          type: 'classify', id: 'm2e-expresion', concept: 'expresiones',
          question: 'Is it an expression, that is, something that is calculated and gives a value?',
          items: [
            { text: 'width * height', valid: true, why: 'It\'s calculated and gives a value: 12 with the data above.' },
            { text: 'total = 10', valid: false, why: 'It\'s an assignment statement: it stores a value. The expression is only the right-hand side, `10`.' },
            { text: 'age', valid: true, why: 'A variable on its own is also an expression: its value is whatever it has stored.' },
            { text: '"Hello, " + name', valid: true, why: 'It joins two texts and gives a new text: it\'s an expression.' },
            { text: 'x = x + 1', valid: false, why: 'It\'s a statement: it calculates `x + 1` (the expression) and stores the result in `x`.' },
          ],
        },
        {
          type: 'check', id: 'm2e-sustituir', concept: 'expresiones', mode: 'text',
          question: 'Predict:', code: 'a = 3\nb = a * 2 + 1\nprint(b - a)', answer: '4',
          explain: '`b` is 3 × 2 + 1 = 7, and `b - a` is 7 − 3 = 4.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'evaluar', title: 'In what order Python calculates', concepts: ['operadores', 'expresiones'],
      blocks: [
        { type: 'p', text: 'In lesson 1.2 you saw that multiplication comes before addition. This is the full table, from **highest** to **lowest** priority:' },
        {
          type: 'five', items: {
            '1 · Brackets': '`( )`: what\'s inside is calculated first.',
            '2 · Power': '`**`',
            '3 · Sign': '`-x`: the minus sign in front of a value.',
            '4 · Multiply and divide': '`*`  `/`  `//`  `%`',
            '5 · Add and subtract': '`+`  `-`',
          },
        },
        { type: 'p', text: 'If two operators have the **same priority**, Python calculates from **left to right**. The exception is `**`, which goes from right to left.' },
        { type: 'code', run: true, code: 'print(8 / 2 * 4)    # (8 / 2) * 4\nprint(2 ** 3 ** 2)  # 2 ** (3 ** 2)\nprint(-3 ** 2)      # -(3 ** 2)\nprint((-3) ** 2)' },
        { type: 'callout', tone: 'tip', title: 'When in doubt, brackets', text: 'You don\'t need to memorise the whole table. If an expression makes you hesitate, add brackets: they change nothing if they\'re not needed and they make the code easier to read.' },
        {
          type: 'check', id: 'm2e-izq-der', concept: 'operadores', mode: 'text',
          question: 'Predict:', code: 'print(12 / 2 * 3)', answer: '18.0',
          explain: '`/` and `*` have the same priority: left to right. 12 / 2 = 6.0 and 6.0 × 3 = 18.0.',
        },
        {
          type: 'check', id: 'm2e-signo', concept: 'operadores', mode: 'choice',
          question: 'What will it show?', code: 'print(-2 ** 2)', expectOutput: '-4',
          options: [
            { text: '-4', correct: true },
            { text: '4', why: 'The power has higher priority than the sign: Python calculates 2 ** 2 = 4 and then puts the minus sign on it. To square −2: `(-2) ** 2`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'tipo-resultado', title: 'What type is the result?', concepts: ['tipos', 'operadores'],
      blocks: [
        { type: 'p', text: 'The type of the result depends on the types you operate with. Three rules cover almost everything:' },
        {
          type: 'five', items: {
            'Whole with whole': 'Gives an `int`… except with `/`, which always gives a `float`.',
            'If there\'s a decimal': 'As soon as one of the two is a `float`, the result is a `float`.',
            '// and % with decimals': 'They also give a `float`: `7.5 // 2` is `3.0`.',
          },
        },
        { type: 'code', run: true, code: 'print(6 * 2, type(6 * 2))\nprint(6 * 2.0, type(6 * 2.0))\nprint(6 / 2, type(6 / 2))\nprint(7.5 // 2, type(7.5 // 2))' },
        {
          type: 'check', id: 'm2e-mezcla', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'price = 4\nunits = 2.5\nprint(price * units)', answer: '10.0',
          explain: 'One of the two is a `float` (2.5), so the result is too: 10.0.',
        },
        {
          type: 'check', id: 'm2e-floordiv-float', concept: 'tipos', mode: 'choice',
          question: 'What will it show?', code: 'print(9.0 // 2)', expectOutput: '4.0',
          options: [
            { text: '4.0', correct: true },
            { text: '4', why: '`//` removes the decimals from the result, but if you operate with a `float` the result is still a `float`: 4.0.' },
            { text: '4.5', why: 'That\'s what `/` would give. `//` keeps the whole part: 4.0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'compuesta', title: 'Shortcuts: +=, -=, *= and friends', concepts: ['reasignacion', 'operadores'],
      blocks: [
        { type: 'p', text: 'Changing a variable based on its own value is so common that Python has a **shortcut**: `points += 10` means exactly the same as `points = points + 10`.' },
        {
          type: 'five', items: {
            'x += 3': 'x = x + 3',
            'x -= 3': 'x = x - 3',
            'x *= 3': 'x = x * 3',
            'x /= 3': 'x = x / 3',
            'x //= 3 · x %= 3 · x **= 3': 'The same with //, % and **',
          },
        },
        { type: 'p', text: 'Move forward line by line and watch how `balance` changes in memory:' },
        { type: 'trace', code: 'balance = 100\nbalance -= 30\nbalance *= 2\nbalance += 5\nprint(balance)' },
        { type: 'callout', tone: 'info', title: 'You\'ll use it a lot', text: 'Adding points, building up a total or counting how many times something happens: `counter += 1` will be one of your best friends when loops arrive.' },
        {
          type: 'check', id: 'm2e-compuesta', concept: 'reasignacion', mode: 'text',
          question: 'Predict:', code: 'x = 10\nx //= 3\nx **= 2\nprint(x)', answer: '9',
          explain: '10 // 3 = 3 and then 3 ** 2 = 9.',
        },
        {
          type: 'check', id: 'm2e-compuesta-error', concept: 'errores', mode: 'choice',
          question: 'What happens when you run this program?', code: 'total += 5\nprint(total)', expectError: 'NameError',
          options: [
            { text: 'NameError: total doesn\'t exist', correct: true },
            { text: 'It shows 5', why: '`total += 5` is `total = total + 5`: to work it out, Python needs the current value of `total`, and it doesn\'t have one yet.' },
          ],
          explain: 'Before using `+=`, the variable has to exist: `total = 0` and then `total += 5`.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'texto', title: 'Expressions with text', concepts: ['tipos', 'expresiones'],
      blocks: [
        { type: 'p', text: 'With text only two operators work: `+` **joins** two texts and `*` **repeats** a text a whole number of times. The shortcuts work too: `message += "!"`.' },
        { type: 'code', run: true, code: 'name = "Ana"\nline = "=" * 20\ngreeting = "Hello, " + name\ngreeting += "!"\nprint(line)\nprint(greeting)\nprint(line)' },
        {
          type: 'check', id: 'm2e-texto', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'laugh = "ha" * 2\nprint(laugh + "!" * 3)', answer: 'haha!!!',
          explain: '`"ha" * 2` is "haha" and `"!" * 3` is "!!!". Remember: `*` comes before `+`.',
        },
        {
          type: 'check', id: 'm2e-texto-resta', concept: 'tipos', mode: 'choice',
          question: 'What happens?', code: 'print("10" - "3")', expectError: 'TypeError',
          options: [
            { text: 'TypeError: texts can\'t be subtracted', correct: true },
            { text: 'It shows 7', why: 'With quotes they\'re texts, not numbers: Python doesn\'t convert them on its own. With `int("10") - int("3")` it would give 7.' },
            { text: 'It shows 1', why: 'Texts can\'t be subtracted: they only allow `+` and `*`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'patrones', title: 'Tricks with // and %', concepts: ['operadores', 'descomponer'],
      blocks: [
        { type: 'p', text: '`//` and `%` don\'t look like much, but they solve lots of real problems. These patterns come up again and again:' },
        {
          type: 'five', items: {
            'Splitting units': '`days // 7` whole weeks and `days % 7` days left over.',
            'Even or odd?': '`n % 2` is 0 if n is even and 1 if it\'s odd.',
            'Last digit': '`n % 10`: 4827 % 10 → 7.',
            'Remove the last digit': '`n // 10`: 4827 // 10 → 482.',
          },
        },
        { type: 'code', run: true, code: 'n = 4827\nprint(n % 10)       # last digit\nprint(n // 10)      # without the last digit\nprint(n // 10 % 10) # second-to-last digit\nprint(n % 2)        # 1: it\'s odd', caption: 'Change the number and run it again. How would you get the first digit?' },
        {
          type: 'check', id: 'm2e-semanas', concept: 'operadores', mode: 'text',
          question: 'Predict: how many weeks and days left over are there in a year?', code: 'days = 365\nprint(days // 7, days % 7)', answer: '52 1',
          explain: '7 goes into 365 fifty-two times (364 days) and 1 is left over.',
        },
        {
          type: 'check', id: 'm2e-cifra', concept: 'operadores', mode: 'text',
          question: 'Predict:', code: 'n = 593\nprint(n // 10 % 10)', answer: '9',
          explain: '593 // 10 = 59 and 59 % 10 = 9: the tens digit.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'When the expression fails (or calculates wrongly)', concepts: ['errores', 'operadores'],
      blocks: [
        { type: 'p', text: 'Two errors warn you: dividing by zero and mixing types. The third doesn\'t warn you, and that\'s why it\'s the most dangerous.' },
        { type: 'code', run: true, title: 'Dividing by zero', code: 'people = 0\nprint(100 / people)' },
        { type: 'code', run: true, title: 'Mixing text and a number', code: 'age = "17"\nprint(age + 1)' },
        { type: 'code', run: true, title: 'Logic error: the average calculated wrongly', code: 'a = 6\nb = 8\naverage = a + b / 2\nprint(average)', caption: 'There\'s no error message, but the average of 6 and 8 is 7, not 10.0. Python has only divided `b` by 2.' },
        { type: 'callout', tone: 'warn', title: 'Check with an example you know how to solve', text: 'Against logic errors, the best defence is testing with data whose result you know in advance. If it doesn\'t match, check the priority of the operators.' },
        {
          type: 'check', id: 'm2e-media', concept: 'operadores', mode: 'choice',
          question: 'Which expression correctly calculates the average of `a` and `b`?',
          options: [
            { text: '`(a + b) / 2`', correct: true },
            { text: '`a + b / 2`', why: 'Division comes before addition: you only divide `b`.' },
            { text: '`a + b // 2`', why: 'As well as only dividing `b`, `//` would lose the decimals.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'exp-predict' },
    { id: 'a2', activity: 'exp-complete' },
    { id: 'a3', activity: 'exp-fix' },
    { id: 'a4', activity: 'exp-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'An **expression** is calculated and gives a value; a **statement** does something (assign, show…).',
    'Priority: brackets, `**`, sign, `* / // %` and `+ -`. With the same priority, left to right (except `**`).',
    'Whole with whole gives `int` (except `/`); if there\'s a `float`, the result is a `float`.',
    '`x += 3` is `x = x + 3`; the same with `-=`, `*=`, `/=`, `//=`, `%=` and `**=`. The variable has to exist first.',
    'With text: `+` joins and `*` repeats.',
    '`//` and `%` split units (weeks and days) and digits (`n % 10`, `n // 10`).',
    'A logic error doesn\'t warn you: check with examples whose result you know.',
  ],
};

export const ACTIVITIES_EXPRESIONES = {
  'exp-predict': {
    id: 'exp-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The purse', difficulty: 1, xp: 10, concepts: ['reasignacion', 'operadores'],
    prompt: 'Follow the value of `balance` line by line. **What will it show?**',
    code: 'balance = 20\nbalance += 15\nbalance -= 8\nbalance *= 2\nenvelopes = balance // 5\nprint(balance, envelopes)',
    expectedOutput: '54 10',
    options: [
      { text: '54 10', correct: true },
      { text: '54 10.8', concept: 'operadores', why: '`//` gives the whole part: 54 // 5 is 10. With `/` you would get 10.8.' },
      { text: '2 0', concept: 'reasignacion', why: '`balance *= 2` doesn\'t store a 2: it multiplies the current value by 2. It\'s `balance = balance * 2`.' },
      { text: '20 4', concept: 'reasignacion', why: 'The shortcuts `+=`, `-=` and `*=` do change the variable: each line starts from the value the previous one left.' },
    ],
    explain: [
      '`balance = 20`.',
      '`balance += 15` → 35, and `balance -= 8` → 27.',
      '`balance *= 2` → 54.',
      '`envelopes = 54 // 5` → 10: 5 goes into 54 ten whole times.',
    ],
  },
  'exp-complete': {
    id: 'exp-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The stopwatch', difficulty: 2, xp: 15, concepts: ['operadores', 'descomponer'],
    statement: 'A stopwatch shows **3725 seconds**. Replace each `___` with the right operator to show it in hours, minutes and seconds:',
    expected: '1 h 2 min 5 s',
    note: 'An hour is 3600 seconds and a minute, 60. The program must work with any value of `total`.',
    starter: 'total = 3725\nhours = total ___ 3600\nrest = total ___ 3600\nminutes = rest ___ 60\nseconds = rest ___ 60\nprint(hours, "h", minutes, "min", seconds, "s")',
    spec: {
      skip_tips: ['repeated_numbers'],
      blanks: true,
      cases: [{ label: 'Expected output', out_lines: ['1 h 2 min 5 s'] }],
      variants: [{
        label: 'total changed to 7384', set: { total: 7384 }, out_lines: ['2 h 3 min 4 s'],
        msg: 'It works with 3725, but not with another time: check which operator gives the whole units (//) and which gives what\'s left over (%).',
      }],
      misconceptions: [
        { out_lines: ['125 h 0 min 1 s'], title: 'You\'ve swapped the order', msg: 'The **whole hours** come from `//` and the seconds **left over** from `%`. You\'ve swapped them.' },
        { out_contains: '1.034', title: 'Hours with decimals', msg: 'With `/` you get hours with decimals. For **whole** hours you need `//`.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['FloorDiv', 'Mod'], title: 'Calculate it with operators', msg: 'Use // and % to split the units.' }],
      logic_msg: 'Compare your output with the expected one. In each pair of gaps, one gives the whole units and the other what\'s left over.',
    },
    hints: [
      { level: 'Orientation', text: 'There are two pairs of gaps. In each one, the first works out **whole** units and the second what\'s **left over**.' },
      { level: 'Reasoning', text: 'How many whole hours fit in 3725 seconds? How many seconds are left over after that? With what\'s left over, repeat the idea with minutes.' },
      { level: 'Pseudocode', text: 'hours ← total divided by 3600, without decimals\nrest ← what\'s left over when dividing total by 3600\nminutes ← rest divided by 60, without decimals\nseconds ← what\'s left over when dividing rest by 60', pre: true },
      { level: 'Technical help', text: '`//` gives the whole units and `%` what\'s left over: `3725 // 3600` → 1 and `3725 % 3600` → 125.' },
    ],
    solution: {
      code: 'total = 3725\nhours = total // 3600\nrest = total % 3600\nminutes = rest // 60\nseconds = rest % 60\nprint(hours, "h", minutes, "min", seconds, "s")',
      explanation: '3725 // 3600 = 1 hour and 125 s are left over. Of those 125, 125 // 60 = 2 minutes and 125 % 60 = 5 seconds are left over. It\'s the «splitting units» pattern: first the big ones, then what\'s left over.',
    },
    reference: ['total = 3725\nhours = total // 3600\nrest = total % 3600\nminutes = rest // 60\nseconds = rest % 60\nprint(hours, "h", minutes, "min", seconds, "s")'],
    wrongs: [
      { code: 'total = 3725\nhours = total ___ 3600\nrest = total ___ 3600\nminutes = rest ___ 60\nseconds = rest ___ 60\nprint(hours, "h", minutes, "min", seconds, "s")', category: 'incompleto' },
      { code: 'total = 3725\nhours = total % 3600\nrest = total // 3600\nminutes = rest // 60\nseconds = rest % 60\nprint(hours, "h", minutes, "min", seconds, "s")', category: 'comprension' },
      { code: 'total = 3725\nhours = total // 3600\nrest = total % 3600\nminutes = 2\nseconds = rest % 60\nprint(hours, "h", minutes, "min", seconds, "s")', category: 'logica' },
    ],
  },
  'exp-fix': {
    id: 'exp-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The average that doesn\'t add up', difficulty: 2, xp: 20, concepts: ['operadores', 'errores'],
    statement: 'This program calculates the average of three marks. **It doesn\'t give any error**, but the result is impossible: an average of 15.67 with marks out of 10! Find the bug and fix it.',
    expected: 'Average: 7.0',
    starter: 'mark1 = 6\nmark2 = 7\nmark3 = 8\naverage = mark1 + mark2 + mark3 / 3\nprint("Average:", average)',
    spec: {
      cases: [{ label: 'Marks 6, 7 and 8', out_lines: ['Average: 7.0'] }],
      variants: [{
        label: 'Marks changed to 9, 5 and 5', set: { mark1: 9, mark2: 5, mark3: 5 }, out_lines: ['Average: 6.333333333333333'],
        msg: 'It works with 6, 7 and 8, but not with 9, 5 and 5: the average should be 6.33… Calculate from the variables and divide with `/` (with `//` the decimals are lost).',
      }],
      misconceptions: [
        { out_lines: ['Average: 15.666666666666666'], category: 'logica', title: 'The addition doesn\'t go first', msg: 'Python divides before adding: only `mark3` is divided by 3. How do you make the addition go first?' },
      ],
      rules: [{ type: 'must_load', names: ['mark1', 'mark2', 'mark3'], title: 'Use the variables', msg: 'Calculate the average from mark1, mark2 and mark3, not with the numbers typed in by hand.' }],
      logic_msg: 'The output doesn\'t match. Check the calculation by hand: (6 + 7 + 8) / 3 = 7.0.',
    },
    hints: [
      { level: 'Orientation', text: 'Run the program: there\'s no error message, it\'s a **logic error**. Work out by hand what should come out (the average of 6, 7 and 8) and compare.' },
      { level: 'Reasoning', text: 'In what order does Python do the operations on line 4? What is really divided by 3?' },
      { level: 'Pseudocode', text: 'average ← (sum of the three marks) ÷ 3', pre: true },
      { level: 'Technical help', text: 'Brackets force what\'s inside them to be calculated first: `(a + b + c) / 3`.' },
    ],
    solution: {
      code: 'mark1 = 6\nmark2 = 7\nmark3 = 8\naverage = (mark1 + mark2 + mark3) / 3\nprint("Average:", average)',
      explanation: 'Without brackets, Python calculates `mark3 / 3` first (2.67) and adds it to 6 and 7. With `(mark1 + mark2 + mark3) / 3` the addition goes first: 21 / 3 = 7.0.',
    },
    reference: [
      'mark1 = 6\nmark2 = 7\nmark3 = 8\naverage = (mark1 + mark2 + mark3) / 3\nprint("Average:", average)',
      'mark1 = 6\nmark2 = 7\nmark3 = 8\ntotal = mark1 + mark2 + mark3\naverage = total / 3\nprint("Average:", average)',
    ],
    wrongs: [
      { code: 'mark1 = 6\nmark2 = 7\nmark3 = 8\naverage = mark1 + mark2 + mark3 / 3\nprint("Average:", average)', category: 'logica' },
      { code: 'mark1 = 6\nmark2 = 7\nmark3 = 8\naverage = (mark1 + mark2 + mark3) // 3\nprint("Average:", average)', category: 'logica' },
      { code: 'mark1 = 6\nmark2 = 7\nmark3 = 8\nprint("Average:", 7.0)', category: 'logica' },
    ],
  },
  'exp-build': {
    id: 'exp-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The sum of the digits', difficulty: 3, xp: 30, concepts: ['operadores', 'input', 'descomponer'],
    unlock: { any: ['exp-predict', 'exp-complete', 'exp-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Write a program that asks for a **three-digit** whole number and shows the **sum of its digits**.\n\nExample: `472` → 4 + 7 + 2 = `13`.\n\nShow the sum on the **last line** (you can add some text with it).',
    plan: [
      {
        q: 'What do you need to get from the number before adding?', multi: true,
        options: [
          { text: 'The hundreds digit (4)', correct: true },
          { text: 'The tens digit (7)', correct: true },
          { text: 'The units digit (2)', correct: true },
          { text: 'The number backwards (274)', why: 'Not needed: for adding, the order of the digits doesn\'t matter.' },
        ],
      },
      {
        q: 'With n = 472, how do you get the units digit?',
        options: [
          { text: 'n % 10', correct: true },
          { text: 'n // 10', why: 'That **removes** the last digit: it gives 47.' },
          { text: 'n / 10', why: 'That gives 47.2: it doesn\'t separate the digit.' },
        ],
      },
      {
        q: 'And the tens digit?',
        options: [
          { text: 'n // 10 % 10', correct: true },
          { text: 'n // 10', why: 'It gives 47: the hundreds digit is still in front. You still need to keep just the last digit of that result.' },
          { text: 'n % 100', why: 'It gives 72: the last two digits together.' },
        ],
      },
    ],
    planScaffold: '# 1. Ask for the number (and turn it into a whole number)\n\n# 2. Separate the three digits\n\n# 3. Add them up and show the result\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['n'], // the lesson uses n, as in maths
      cases: [
        { label: '472', stdin: ['472'], args: { n: 472 } },
        { label: 'With a zero in the middle: 905', stdin: ['905'], args: { n: 905 } },
        { label: 'Edge case: 100', stdin: ['100'], args: { n: 100 } },
        { label: 'Edge case: 999', stdin: ['999'], args: { n: 999 } },
      ],
      expect_last_number: 'n // 100 + n // 10 % 10 + n % 10',
      hidden: { count: 2, args: { n: [100, 999, 0] }, stdin: ['n'] },
      tolerance: 0,
      misconceptions: [
        { expr: 'n // 100 + n // 10 + n % 10', title: 'Check the middle digit', msg: '`n // 10` gives 47 with the number 472: you still need to keep only its last digit with `% 10`.' },
        { expr: 'n // 100 + n % 10', title: 'A digit is missing', msg: 'You\'ve added the first and the last digit, but the middle one is missing.' },
        { expr: 'n % 10', title: 'Only the last digit', msg: 'You\'ve got the units digit. The other two are missing.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the number', msg: 'Use input() to ask for the number and convert it with int().' }],
    },
    hints: [
      { level: 'Orientation', text: 'One input (the number) and one result (the sum of its three digits).' },
      { level: 'Reasoning', text: 'Split the problem: first get each digit into its own variable, run it and check they come out right; then add them up.' },
      { level: 'Pseudocode', text: 'n ← ask for a whole number\nhundreds ← n ÷ 100, without decimals\ntens ← (n ÷ 10, without decimals), its last digit\nunits ← last digit of n\nshow hundreds + tens + units', pre: true },
      { level: 'Technical help', text: '`int(input())` reads a whole number. Last digit: `n % 10`. Remove the last digit: `n // 10`. With 472: `472 // 100` → 4, `472 // 10 % 10` → 7, `472 % 10` → 2.' },
    ],
    solution: {
      code: 'n = int(input("Three-digit number: "))\nhundreds = n // 100\ntens = n // 10 % 10\nunits = n % 10\nprint("Sum of the digits:", hundreds + tens + units)',
      explanation: '`// 100` leaves only the first digit; `// 10 % 10` removes the last one and keeps the new last one (the middle one); `% 10` gives the last one. Testing with 905 and 100 confirms that zeros work too.',
    },
    reference: [
      'n = int(input())\nprint(n // 100 + n // 10 % 10 + n % 10)',
      'number = int(input("Number: "))\nunits = number % 10\nnumber //= 10\ntens = number % 10\nhundreds = number // 10\nprint("Sum:", hundreds + tens + units)',
    ],
    wrongs: [
      { code: 'n = int(input())\nprint(n // 100 + n // 10 + n % 10)', category: 'comprension' },
      { code: 'n = input()\nprint(n // 100 + n // 10 % 10 + n % 10)', category: 'ejecucion' },
      { code: 'print(13)', category: 'logica' },
    ],
  },
};
