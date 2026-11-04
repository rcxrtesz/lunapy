// Lesson 5.1 · Boolean expressions (English translation of src/content/lesson-booleanas.js).

const TOPIC = 'Conditionals';

export const LESSON_BOOLEANAS = {
  id: 'booleanas',
  moduleId: 'm5',
  code: '5.1',
  title: 'Boolean expressions',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Recognise the bool type and its two values: True and False',
    'Compare values with ==, !=, <, >, <= and >=',
    'Tell = (assign) apart from == (compare)',
    'Combine conditions with and, or and not',
    'Write functions that return True or False',
  ],
  prerequisites: ['Module 4 (recommended)', 'Lesson 2.2 «Expressions»'],
  teaser: 'You\'re starting Module 5: before your programs make decisions, they need to know how to ask yes-or-no questions.',
  celebration: 'You can now ask yes-or-no questions in Python. In the next lesson your programs will use them to decide.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'bool', title: 'True or false', concepts: ['booleanos'],
      blocks: [
        { type: 'p', text: 'A **boolean expression** is a yes-or-no question. Its result is one of two values: `True` or `False`. Its type is called `bool`.' },
        { type: 'code', run: true, code: 'print(5 > 3)\nprint(2 == 7)\nprint(type(True))\nadult = 20 >= 18\nprint(adult)' },
        { type: 'callout', tone: 'info', title: 'With a capital letter', text: '`True` and `False` are written with a capital first letter and without quotes. `true` would give a NameError and `"True"` would be a text.' },
        {
          type: 'check', id: 'm5b-bool', concept: 'booleanos', mode: 'text',
          question: 'Predict:', code: 'age = 15\nprint(age >= 18)', answer: 'False',
          explain: '15 isn\'t greater than or equal to 18: the comparison is False.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comparar', title: 'Comparison operators', concepts: ['booleanos'],
      blocks: [
        {
          type: 'five', items: {
            '==': 'Equal to: `3 == 3` → True',
            '!=': 'Not equal to: `3 != 4` → True',
            '< and >': 'Less than and greater than',
            '<= and >=': 'Less than or equal and greater than or equal',
          },
        },
        { type: 'callout', tone: 'warn', title: '= is not ==', text: '`x = 5` **stores** 5 in x. `x == 5` **asks** whether x is 5. Mixing them up is the most typical mistake in this module.' },
        { type: 'p', text: 'You can compare texts too: `==` requires them to be identical (capitals included), and `<` compares in alphabetical order.' },
        { type: 'code', run: true, code: 'print("hello" == "Hello")\nprint("ana" < "luis")\nprint(1 < 5 < 10)   # they can be chained' },
        {
          type: 'check', id: 'm5b-texto', concept: 'booleanos', mode: 'text',
          question: 'Predict:', code: 'password = "Luna"\nprint(password == "luna")', answer: 'False',
          explain: 'For Python, "Luna" and "luna" are different texts: the capital L counts.',
        },
        {
          type: 'check', id: 'm5b-rango', concept: 'booleanos', mode: 'text',
          question: 'Predict:', code: 'mark = 7\nprint(5 <= mark < 9)', answer: 'True',
          explain: '7 is between 5 (included) and 9 (excluded): the chained comparison is true.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'logicos', title: 'and, or and not', concepts: ['booleanos'],
      blocks: [
        { type: 'p', text: 'Conditions are combined with three **logical operators**:' },
        {
          type: 'five', items: {
            'and': 'True only if **both** parts are True: `has_ticket and age >= 18`.',
            'or': 'True if **at least one** part is True: `is_member or is_student`.',
            'not': 'It flips it: `not raining`.',
          },
        },
        { type: 'code', run: true, code: 'age = 20\nhas_ticket = False\nprint(age >= 18 and has_ticket)\nprint(age >= 18 or has_ticket)\nprint(not has_ticket)' },
        { type: 'callout', tone: 'tip', title: 'Order of priority', text: 'First comparisons, then `not`, then `and` and last of all `or`. If a condition mixes `and` and `or`, add brackets: it reads better and you avoid surprises.' },
        {
          type: 'check', id: 'm5b-and', concept: 'booleanos', mode: 'choice',
          question: 'What will it show?', code: 'x = 15\nprint(x > 10 and x < 12)', expectOutput: 'False',
          options: [
            { text: 'False', correct: true },
            { text: 'True', why: 'With `and` both have to be true: 15 > 10 yes, but 15 < 12 no.' },
          ],
        },
        {
          type: 'check', id: 'm5b-or-trampa', concept: 'booleanos', mode: 'choice',
          question: 'We want to know if `day` is "Saturday" or "Sunday". Which expression is correct?',
          options: [
            { text: 'day == "Saturday" or day == "Sunday"', correct: true },
            { text: 'day == "Saturday" or "Sunday"', why: 'It feels natural, but Python reads it as `(day == "Saturday") or "Sunday"`, and a non-empty text counts as true: it would always give something true. You have to repeat the comparison.' },
            { text: 'day == "Saturday" and day == "Sunday"', why: 'A day can\'t be Saturday and Sunday at the same time: it would always give False.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulo', title: 'Questions with %', concepts: ['booleanos', 'operadores'],
      blocks: [
        { type: 'p', text: 'In lesson 2.2 you used `%` to get remainders. Combined with `==` it answers very useful questions:' },
        { type: 'code', run: true, code: 'n = 14\nprint(n % 2 == 0)    # is it even?\nprint(n % 7 == 0)    # is it a multiple of 7?\nprint(n % 10 == 4)   # does it end in 4?' },
        {
          type: 'check', id: 'm5b-par', concept: 'booleanos', mode: 'text',
          question: 'Predict:', code: 'n = 9\nprint(n % 2 == 0 or n % 3 == 0)', answer: 'True',
          explain: '9 isn\'t even (False), but it is a multiple of 3 (True). With `or` one is enough: True.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones-bool', title: 'Functions that answer yes or no', concepts: ['booleanos', 'parametros'],
      blocks: [
        { type: 'p', text: 'A function can **return** a boolean. Its name usually starts with `is_` or `has_`, so the call reads like a question:' },
        { type: 'code', run: true, code: 'def is_even(n):\n    return n % 2 == 0\n\ndef can_vote(age, nationality):\n    return age >= 18 and nationality == "British"\n\nprint(is_even(10), is_even(7))\nprint(can_vote(20, "British"))' },
        { type: 'callout', tone: 'tip', title: 'Return the comparison directly', text: 'The comparison **already is** True or False: `return n % 2 == 0` is enough. No extra step is needed.' },
        {
          type: 'check', id: 'm5b-funcion', concept: 'booleanos', mode: 'text',
          question: 'Predict:', code: 'def is_positive(x):\n    return x > 0\n\nprint(is_positive(-3), is_positive(8))', answer: 'False True',
          explain: '-3 > 0 is False and 8 > 0 is True.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'bool-predict' },
    { id: 'a2', activity: 'bool-complete' },
    { id: 'a3', activity: 'bool-fix' },
    { id: 'a4', activity: 'bool-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A boolean expression is `True` or `False` (type `bool`).',
    'Comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`. They can be chained: `0 <= x < 10`.',
    '`=` assigns; `==` compares.',
    '`and` requires both conditions; `or`, at least one; `not` flips it.',
    'Repeat the comparison with `or`: `day == "Saturday" or day == "Sunday"`.',
    '`n % 2 == 0` asks whether n is even.',
    'A function can return a comparison directly: `return n % 2 == 0`.',
  ],
};

export const ACTIVITIES_BOOLEANAS = {
  'bool-predict': {
    id: 'bool-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The cinema door', difficulty: 2, xp: 10, concepts: ['booleanos'],
    prompt: 'To see the film you need to be 12 or older, **or** go with an adult. **What will it show?**',
    code: 'age = 10\nwith_adult = True\ncan_enter = age >= 12 or with_adult\nprint(can_enter, not can_enter, age >= 12 and with_adult)',
    expectedOutput: 'True False False',
    options: [
      { text: 'True False False', correct: true },
      { text: 'False True False', concept: 'booleanos', why: 'With `or` one condition is enough: although they\'re 10, they\'re with an adult, so `can_enter` is True.' },
      { text: 'True False True', concept: 'booleanos', why: 'With `and` both are needed: `age >= 12` is False, so the whole thing is False.' },
      { text: 'True True False', concept: 'booleanos', why: '`not` flips it: not True is False.' },
    ],
    explain: ['`age >= 12` → False; `with_adult` → True.', '`False or True` → True.', '`not True` → False.', '`False and True` → False.'],
  },
  'bool-complete': {
    id: 'bool-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Questions about numbers', difficulty: 2, xp: 15, concepts: ['booleanos', 'parametros'],
    statement: 'Complete the conditions of these two functions:\n\n• `is_multiple(n, d)` returns True if n is a multiple of d.\n\n• `in_range(x, low, high)` returns True if x is between low and high, **both included**.',
    expected: 'True False\nTrue False',
    starter: 'def is_multiple(n, d):\n    return n % d ___ 0\n\ndef in_range(x, low, high):\n    return low ___ x ___ high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))',
    spec: {
      blanks: true,
      functions: [{ name: 'is_multiple', params: 2 }, { name: 'in_range', params: 3 }],
      cases: [
        { label: 'Whole program', out_lines: ['True False', 'True False'] },
        { label: 'is_multiple(21, 7)', call: 'print(is_multiple(21, 7))', out_lines: ['True'] },
        { label: 'in_range(1, 1, 3) (lower limit)', call: 'print(in_range(1, 1, 3))', out_lines: ['True'] },
        { label: 'in_range(4, 1, 3)', call: 'print(in_range(4, 1, 3))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True False', 'False False'], title: 'The ends count', msg: '«Both included»: 5 is in the range from 1 to 5. Use `<=` instead of `<`.' },
      ],
      logic_msg: 'Check the operators: a multiple leaves a remainder of 0, and «included» means the value can be equal to the ends.',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps, three comparison operators.' },
      { level: 'Reasoning', text: 'What remainder does a number leave when divided by one of its divisors? For the range: if the ends are included, x can be **equal** to low or high.' },
      { level: 'Pseudocode', text: 'is_multiple: remainder of n ÷ d is equal to 0\nin_range: low ≤ x ≤ high', pre: true },
      { level: 'Technical help', text: '`n % d == 0` and `low <= x <= high`.' },
    ],
    solution: {
      code: 'def is_multiple(n, d):\n    return n % d == 0\n\ndef in_range(x, low, high):\n    return low <= x <= high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))',
      explanation: 'Each function returns a comparison directly. The chained comparison `low <= x <= high` reads just like in maths.',
    },
    reference: [
      'def is_multiple(n, d):\n    return n % d == 0\n\ndef in_range(x, low, high):\n    return low <= x <= high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))',
      'def is_multiple(n, d):\n    return n % d == 0\n\ndef in_range(x, low, high):\n    return low <= x and x <= high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))',
    ],
    wrongs: [
      { code: 'def is_multiple(n, d):\n    return n % d ___ 0\n\ndef in_range(x, low, high):\n    return low ___ x ___ high', category: 'incompleto' },
      { code: 'def is_multiple(n, d):\n    return n % d = 0\n\ndef in_range(x, low, high):\n    return low <= x <= high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))', category: 'sintaxis' },
      { code: 'def is_multiple(n, d):\n    return n % d == 0\n\ndef in_range(x, low, high):\n    return low < x < high\n\nprint(is_multiple(12, 4), is_multiple(10, 3))\nprint(in_range(5, 1, 5), in_range(0, 1, 5))', category: 'comprension' },
    ],
  },
  'bool-fix': {
    id: 'bool-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The never-ending weekend', difficulty: 2, xp: 20, concepts: ['booleanos', 'errores'],
    statement: '`is_weekend` should return True only for "Saturday" and "Sunday". It gives no error… but it says Monday is the weekend too. Find the bug and fix it.',
    expected: 'True\nTrue\nFalse',
    starter: 'def is_weekend(day):\n    return day == "Saturday" or "Sunday"\n\nprint(is_weekend("Saturday"))\nprint(is_weekend("Sunday"))\nprint(is_weekend("Monday"))',
    spec: {
      functions: [{ name: 'is_weekend', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['True', 'True', 'False'] },
        { label: 'is_weekend("Tuesday")', call: 'print(is_weekend("Tuesday"))', out_lines: ['False'] },
        { label: 'is_weekend("Sunday")', call: 'print(is_weekend("Sunday"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'Sunday', 'Sunday'], title: 'The comparison isn\'t repeated', msg: 'Python reads `(day == "Saturday") or "Sunday"`: when the day isn\'t Saturday, it returns the text "Sunday". Repeat the comparison: `day == "Sunday"`.' },
        { out_lines: ['False', 'False', 'False'], title: 'It can\'t be and', msg: 'A day can\'t be Saturday **and** Sunday at the same time. Use `or`, repeating the comparison.' },
      ],
      logic_msg: 'Check the three calls: only Saturday and Sunday should give True.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: with "Monday" it doesn\'t give False, but something else. What does the function return?' },
      { level: 'Reasoning', text: 'Each side of `or` is a complete condition. What does the right-hand side, `"Sunday"`, compare?' },
      { level: 'Pseudocode', text: 'return (day is "Saturday") or (day is "Sunday")', pre: true },
      { level: 'Technical help', text: '`return day == "Saturday" or day == "Sunday"`.' },
    ],
    solution: {
      code: 'def is_weekend(day):\n    return day == "Saturday" or day == "Sunday"\n\nprint(is_weekend("Saturday"))\nprint(is_weekend("Sunday"))\nprint(is_weekend("Monday"))',
      explanation: 'In English we say «if the day is Saturday or Sunday», but Python needs the complete comparison on each side of the `or`: `day == "Saturday" or day == "Sunday"`.',
    },
    reference: ['def is_weekend(day):\n    return day == "Saturday" or day == "Sunday"\n\nprint(is_weekend("Saturday"))\nprint(is_weekend("Sunday"))\nprint(is_weekend("Monday"))'],
    wrongs: [
      { code: 'def is_weekend(day):\n    return day == "Saturday" or "Sunday"\n\nprint(is_weekend("Saturday"))\nprint(is_weekend("Sunday"))\nprint(is_weekend("Monday"))', category: 'comprension' },
      { code: 'def is_weekend(day):\n    return day == "Saturday" and day == "Sunday"\n\nprint(is_weekend("Saturday"))\nprint(is_weekend("Sunday"))\nprint(is_weekend("Monday"))', category: 'comprension' },
      { code: 'def is_weekend(day):\n    return day = "Saturday" or day = "Sunday"', category: 'sintaxis' },
    ],
  },
  'bool-build': {
    id: 'bool-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Leap year?', difficulty: 3, xp: 30, concepts: ['booleanos', 'descomponer'],
    unlock: { any: ['bool-predict', 'bool-complete', 'bool-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `is_leap(year)`, which returns True if the year is a leap year. The calendar rule:\n\n• It\'s a leap year if it\'s a multiple of 4…\n\n• …unless it\'s a multiple of 100, then it isn\'t…\n\n• …unless it\'s also a multiple of 400, then it is.\n\nExamples: 2024 yes, 2023 no, 1900 no, 2000 yes. Solve it with a single boolean expression.',
    expected: 'True',
    plan: [
      {
        q: 'Which years are leap years?', multi: true,
        options: [
          { text: '2024', correct: true },
          { text: '2000', correct: true },
          { text: '1900', why: 'It\'s a multiple of 100 and not of 400: it isn\'t a leap year.' },
          { text: '2023', why: 'It isn\'t a multiple of 4.' },
        ],
      },
      {
        q: 'How does the rule read with operators?',
        options: [
          { text: '(multiple of 4 and not of 100) or multiple of 400', correct: true },
          { text: 'multiple of 4 or of 100 or of 400', why: 'With that, 1900 would be a leap year, and it isn\'t.' },
          { text: 'multiple of 4 and of 400', why: 'With that, 2024 wouldn\'t be a leap year, and it is.' },
        ],
      },
    ],
    planScaffold: 'def is_leap(year):\n    # return a boolean expression with %, ==, !=, and and or\n\n\nprint(is_leap(2024))\n',
    starter: '',
    spec: {
      functions: [{ name: 'is_leap', params: 1 }],
      cases: [
        { label: '2024', call: 'print(is_leap(2024))', out_lines: ['True'] },
        { label: '2023', call: 'print(is_leap(2023))', out_lines: ['False'] },
        { label: '1900 (multiple of 100)', call: 'print(is_leap(1900))', out_lines: ['False'] },
        { label: '2000 (multiple of 400)', call: 'print(is_leap(2000))', out_lines: ['True'] },
        { label: '2100', call: 'print(is_leap(2100))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'It shows, but doesn\'t return', msg: 'The function uses `print`. Return the expression with `return`.' },
      ],
      logic_msg: 'Check the rule with the case that fails: 1900 isn\'t a leap year (multiple of 100 but not of 400) and 2000 is.',
    },
    hints: [
      { level: 'Orientation', text: 'Three conditions: multiple of 4, multiple of 100 and multiple of 400. Each one is asked with `%`.' },
      { level: 'Reasoning', text: 'There are two ways to be a leap year: be a multiple of 4 **without** being one of 100, **or** be a multiple of 400.' },
      { level: 'Pseudocode', text: 'return (year multiple of 4 and year not multiple of 100)\n        or year multiple of 400', pre: true },
      { level: 'Technical help', text: '`return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0`.' },
    ],
    solution: {
      code: 'def is_leap(year):\n    """Return True if year is a leap year in the Gregorian calendar."""\n    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0\n\nprint(is_leap(2024))',
      explanation: 'The rule has two paths joined by `or`. The brackets aren\'t required (and comes before or), but they make the intention clear.',
    },
    reference: [
      'def is_leap(year):\n    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0',
      'def is_leap(year):\n    return year % 400 == 0 or (year % 4 == 0 and not year % 100 == 0)',
    ],
    wrongs: [
      { code: 'def is_leap(year):\n    return year % 4 == 0', category: 'logica' },
      { code: 'def is_leap(year):\n    print(year % 4 == 0 and year % 100 != 0 or year % 400 == 0)', category: 'comprension' },
      { code: 'def is_leap(year):\n    return year % 4 == 0 and year % 400 == 0', category: 'logica' },
    ],
  },
};
