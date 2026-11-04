// Lesson 5.2 · if, elif and else (English translation of src/content/lesson-condicionales.js).

const TOPIC = 'Conditionals';

export const LESSON_CONDICIONALES = {
  id: 'condicionales',
  moduleId: 'm5',
  code: '5.2',
  title: 'if, elif and else',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Run code only when a condition is met with if',
    'Choose between two paths with else',
    'Chain several options with elif and order the conditions properly',
    'Nest conditionals and simplify them with and/or',
    'Use conditionals inside functions that return a result',
  ],
  prerequisites: ['Lesson 5.1 «Boolean expressions»'],
  teaser: 'Your programs stop always doing the same thing: today they learn to decide what to do depending on the data.',
  celebration: 'Your programs now make decisions. With if, elif and else you can solve most «it depends» problems.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'if', title: 'if: do something only if…', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: '`if` runs a block of code **only if** its condition is true. Just like with functions, the block is marked with a colon and indentation.' },
        { type: 'code', run: true, code: 'temperature = 32\nif temperature > 30:\n    print("It\'s hot!")\n    print("Drink water.")\nprint("End of forecast")', caption: 'Change the temperature to 20 and run it again: the two indented lines disappear; the last one doesn\'t.' },
        {
          type: 'check', id: 'm5c-if', concept: 'condicionales', mode: 'text',
          question: 'Predict:', code: 'balance = 5\nif balance < 0:\n    print("Overdrawn")\nprint("Balance:", balance)', answer: 'Balance: 5',
          explain: '5 < 0 is False: the if block is skipped. The last line has no indentation, so it always runs.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'else', title: 'else: otherwise, the other thing', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: 'With `else` you give an alternative path: exactly **one** of the two blocks runs.' },
        { type: 'code', run: true, code: 'n = 7\nif n % 2 == 0:\n    print(n, "is even")\nelse:\n    print(n, "is odd")' },
        { type: 'p', text: 'Follow the execution step by step and watch which lines are skipped:' },
        { type: 'trace', code: 'age = 16\nif age >= 18:\n    message = "You can vote"\nelse:\n    message = "You can\'t vote yet"\nprint(message)' },
        {
          type: 'check', id: 'm5c-else', concept: 'condicionales', mode: 'text',
          question: 'Predict:', code: 'mark = 4.5\nif mark >= 5:\n    print("Pass")\nelse:\n    print("Fail")', answer: 'Fail',
          explain: '4.5 >= 5 is False, so the else block runs.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'elif', title: 'elif: several options', concepts: ['condicionales'],
      blocks: [
        { type: 'p', text: 'When there are more than two paths, `elif` (short for *else if*) adds conditions in between. Python checks them **in order** and runs only the **first** block whose condition is true.' },
        { type: 'code', run: true, code: 'mark = 7.5\nif mark >= 9:\n    print("Excellent")\nelif mark >= 7:\n    print("Very good")\nelif mark >= 5:\n    print("Pass")\nelse:\n    print("Fail")' },
        { type: 'callout', tone: 'warn', title: 'Order matters', text: 'If you put `mark >= 5` first, a 9.5 would go in there («Pass») and never reach «Excellent». With `>=`, order from the most demanding condition to the least.' },
        {
          type: 'check', id: 'm5c-orden', concept: 'condicionales', mode: 'choice',
          question: 'What will it show?', code: 'x = 50\nif x > 10:\n    print("big")\nelif x > 40:\n    print("huge")\nelse:\n    print("small")', expectOutput: 'big',
          options: [
            { text: 'big', correct: true },
            { text: 'huge', why: 'Python takes the **first** true condition: 50 > 10 already is, so the elif isn\'t even looked at.' },
            { text: 'big and huge', why: 'In an if/elif/else chain at most one block runs.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'anidados', title: 'Nested conditionals', concepts: ['condicionales', 'booleanos'],
      blocks: [
        { type: 'p', text: 'An `if` can go inside another one. It works, but each level adds indentation and is harder to read. It can often be simplified with `and`:' },
        { type: 'code', run: true, title: 'Nested', code: 'age = 25\nlicence = True\nif age >= 18:\n    if licence:\n        print("You can drive")' },
        { type: 'code', run: true, title: 'Simplified', code: 'age = 25\nlicence = True\nif age >= 18 and licence:\n    print("You can drive")' },
        { type: 'callout', tone: 'tip', title: 'if with booleans', text: 'If a variable is already True or False, use it directly: `if licence:` instead of `if licence == True:`.' },
        {
          type: 'check', id: 'm5c-anidado', concept: 'condicionales', mode: 'text',
          question: 'Predict:', code: 'x = 8\nif x > 5:\n    if x % 2 == 0:\n        print("big and even")\n    else:\n        print("big and odd")\nelse:\n    print("small")', answer: 'big and even',
          explain: '8 > 5 goes into the first block; inside, 8 is even.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Conditionals inside functions', concepts: ['condicionales', 'parametros'],
      blocks: [
        { type: 'p', text: 'The most common thing is to use `if` inside a function that **returns** a different result depending on the case. As soon as a `return` runs, the function ends:' },
        { type: 'code', run: true, code: 'def grade(mark):\n    if mark >= 9:\n        return "Excellent"\n    elif mark >= 7:\n        return "Very good"\n    elif mark >= 5:\n        return "Pass"\n    else:\n        return "Fail"\n\nprint(grade(9.2), grade(6), grade(3))' },
        { type: 'callout', tone: 'warn', title: 'Make every path return something', text: 'If a function has a `return` in the `if` but not in the other cases, in those cases it will return `None`. Check that every path ends in a `return`.' },
        {
          type: 'check', id: 'm5c-none', concept: 'condicionales', mode: 'choice',
          question: 'What will it show?', code: 'def sign(x):\n    if x > 0:\n        return "positive"\n    elif x < 0:\n        return "negative"\n\nprint(sign(0))', expectOutput: 'None',
          options: [
            { text: 'None', correct: true },
            { text: 'positive', why: '0 > 0 is False.' },
            { text: 'An error', why: 'There\'s no error: no condition is met, the function reaches the end without a return and returns None.' },
          ],
          explain: 'The zero case is missing: an `else: return "zero"` would solve it.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'cond-predict' },
    { id: 'a2', activity: 'cond-complete' },
    { id: 'a3', activity: 'cond-fix' },
    { id: 'a4', activity: 'cond-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`if condition:` runs the indented block only if the condition is true.',
    '`else:` gives the alternative path: exactly one of the two runs.',
    '`elif` chains options: Python runs only the **first** true one, so order matters.',
    'Nested ifs can often be simplified with `and`.',
    'In a function, every path must end in a `return`; otherwise it returns `None`.',
  ],
};

export const ACTIVITIES_CONDICIONALES = {
  'cond-predict': {
    id: 'cond-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The thermostat', difficulty: 2, xp: 10, concepts: ['condicionales'],
    prompt: 'Follow the chain of conditions with a temperature of 19. **What will it show?**',
    code: 'temperature = 19\nif temperature < 15:\n    action = "Heating high"\nelif temperature < 20:\n    action = "Heating low"\nelif temperature < 25:\n    action = "Off"\nelse:\n    action = "Air conditioning"\nprint(action)',
    expectedOutput: 'Heating low',
    options: [
      { text: 'Heating low', correct: true },
      { text: 'Off', concept: 'condicionales', why: '19 < 25 is true too, but Python takes the **first** true condition: 19 < 20.' },
      { text: 'Heating low and Off', concept: 'condicionales', why: 'In an if/elif/else chain only one block runs.' },
      { text: 'Air conditioning', concept: 'condicionales', why: 'The else only runs if none of the earlier conditions is met.' },
    ],
    explain: ['19 < 15 → False.', '19 < 20 → True: this block runs and the rest are skipped.'],
  },
  'cond-complete': {
    id: 'cond-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The ticket price', difficulty: 2, xp: 15, concepts: ['condicionales', 'parametros'],
    statement: 'A museum charges by age: **under 12**, free (0 €); from **12 to 64**, 10 €; from **65**, 4 €. Complete the function:',
    expected: '0 10 4',
    starter: 'def ticket_price(age):\n    if age ___ 12:\n        return 0\n    ___ age < 65:\n        return 10\n    ___\n        return 4\n\nprint(ticket_price(8), ticket_price(30), ticket_price(70))',
    spec: {
      blanks: true,
      functions: [{ name: 'ticket_price', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['0 10 4'] },
        { label: 'ticket_price(12) (limit)', call: 'print(ticket_price(12))', out_lines: ['10'] },
        { label: 'ticket_price(65) (limit)', call: 'print(ticket_price(65))', out_lines: ['4'] },
        { label: 'ticket_price(64)', call: 'print(ticket_price(64))', out_lines: ['10'] },
      ],
      misconceptions: [
        { out_lines: ['0'], title: 'Check the limit of 12', msg: 'At 12 you already pay: the first condition is «under 12», `age < 12`.' },
      ],
      logic_msg: 'Test the limits: 11 is free, 12 pays 10 €, 64 pays 10 € and 65 pays 4 €.',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps: a comparison operator, the word that chains another condition and the one that catches all other cases.' },
      { level: 'Reasoning', text: '«Under 12» excludes 12. The other two words are the ones you\'ve seen in this lesson for «otherwise, if…» and «otherwise».' },
      { level: 'Pseudocode', text: 'if age < 12: return 0\notherwise, if age < 65: return 10\notherwise: return 4', pre: true },
      { level: 'Technical help', text: '`if age < 12:`, `elif age < 65:` and `else:` (with the colons).' },
    ],
    solution: {
      code: 'def ticket_price(age):\n    if age < 12:\n        return 0\n    elif age < 65:\n        return 10\n    else:\n        return 4\n\nprint(ticket_price(8), ticket_price(30), ticket_price(70))',
      explanation: 'Since the first case has already ruled out the under-12s, the `elif` only needs to check `age < 65`. The `else` catches those aged 65 or over.',
    },
    reference: ['def ticket_price(age):\n    if age < 12:\n        return 0\n    elif age < 65:\n        return 10\n    else:\n        return 4\n\nprint(ticket_price(8), ticket_price(30), ticket_price(70))'],
    wrongs: [
      { code: 'def ticket_price(age):\n    if age ___ 12:\n        return 0\n    ___ age < 65:\n        return 10\n    ___\n        return 4', category: 'incompleto' },
      { code: 'def ticket_price(age):\n    if age <= 12:\n        return 0\n    elif age < 65:\n        return 10\n    else:\n        return 4\n\nprint(ticket_price(8), ticket_price(30), ticket_price(70))', category: 'comprension' },
      { code: 'def ticket_price(age):\n    if age < 12:\n        return 0\n    elif age < 65:\n        return 10\n    else\n        return 4', category: 'sintaxis' },
    ],
  },
  'cond-fix': {
    id: 'cond-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'Everybody passes', difficulty: 2, xp: 20, concepts: ['condicionales', 'errores'],
    statement: 'This function should give the grade for a mark, but a 9.5 comes out as «Pass» and so does a 7. **There\'s no Python error**: the bug is in the logic. Fix it.',
    expected: 'Excellent\nVery good\nPass\nFail',
    starter: 'def grade(mark):\n    if mark >= 5:\n        return "Pass"\n    elif mark >= 7:\n        return "Very good"\n    elif mark >= 9:\n        return "Excellent"\n    else:\n        return "Fail"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))',
    spec: {
      functions: [{ name: 'grade', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['Excellent', 'Very good', 'Pass', 'Fail'] },
        { label: 'grade(9) (limit)', call: 'print(grade(9))', out_lines: ['Excellent'] },
        { label: 'grade(8.9)', call: 'print(grade(8.9))', out_lines: ['Very good'] },
        { label: 'grade(4.99)', call: 'print(grade(4.99))', out_lines: ['Fail'] },
      ],
      misconceptions: [
        { out_lines: ['Pass', 'Pass', 'Pass', 'Fail'], title: 'The first condition takes everything', msg: 'A 9.5 meets `mark >= 5`, and since it\'s the first true condition, it never reaches the others. Order them from the most demanding to the least.' },
      ],
      logic_msg: 'Check the limits: 9 is Excellent, from 7 up to just under 9 Very good and from 5 up to just under 7 Pass.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: nearly everything comes out «Pass». Which condition is checked first?' },
      { level: 'Reasoning', text: 'Python runs the first block whose condition is true. A 9.5 meets `mark >= 5`… and also `mark >= 9`. Which should be looked at first?' },
      { level: 'Pseudocode', text: 'if mark ≥ 9: Excellent\notherwise, if mark ≥ 7: Very good\notherwise, if mark ≥ 5: Pass\notherwise: Fail', pre: true },
      { level: 'Technical help', text: 'Reverse the order of the three conditions: start with `mark >= 9`.' },
    ],
    solution: {
      code: 'def grade(mark):\n    if mark >= 9:\n        return "Excellent"\n    elif mark >= 7:\n        return "Very good"\n    elif mark >= 5:\n        return "Pass"\n    else:\n        return "Fail"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))',
      explanation: 'With `>=` conditions, the most demanding goes first. That way each mark lands in the right block and never «slips into» a less demanding one.',
    },
    reference: [
      'def grade(mark):\n    if mark >= 9:\n        return "Excellent"\n    elif mark >= 7:\n        return "Very good"\n    elif mark >= 5:\n        return "Pass"\n    else:\n        return "Fail"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))',
      'def grade(mark):\n    if mark < 5:\n        return "Fail"\n    elif mark < 7:\n        return "Pass"\n    elif mark < 9:\n        return "Very good"\n    return "Excellent"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))',
    ],
    wrongs: [
      { code: 'def grade(mark):\n    if mark >= 5:\n        return "Pass"\n    elif mark >= 7:\n        return "Very good"\n    elif mark >= 9:\n        return "Excellent"\n    else:\n        return "Fail"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))', category: 'comprension' },
      { code: 'def grade(mark):\n    if mark > 9:\n        return "Excellent"\n    elif mark > 7:\n        return "Very good"\n    elif mark >= 5:\n        return "Pass"\n    else:\n        return "Fail"\n\nprint(grade(9.5))\nprint(grade(7))\nprint(grade(5))\nprint(grade(2))', category: 'logica' },
    ],
  },
  'cond-build': {
    id: 'cond-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Free delivery', difficulty: 3, xp: 30, concepts: ['condicionales', 'parametros', 'descomponer'],
    unlock: { any: ['cond-predict', 'cond-complete', 'cond-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'An online shop works out delivery costs like this:\n\n• If the order is **50 € or more**, delivery is **free**.\n\n• Otherwise it costs **4.99 €**… unless the customer is a **member**, who pays **2 €**.\n\nDefine `delivery_cost(amount, is_member)` that **returns** the delivery cost. `is_member` will be True or False.',
    expected: '0',
    plan: [
      {
        q: 'Which condition is checked first?',
        options: [
          { text: 'Whether the amount is 50 € or more', correct: true },
          { text: 'Whether they\'re a member', why: 'A member with a 60 € order doesn\'t pay delivery either: the amount comes first.' },
        ],
      },
      {
        q: 'A 30 € order from a member: how much do they pay for delivery?',
        options: [
          { text: '2 €', correct: true },
          { text: '0 €', why: 'It doesn\'t reach 50 €, so it isn\'t free.' },
          { text: '4.99 €', why: 'They\'re a member: they pay the reduced rate.' },
        ],
      },
    ],
    planScaffold: 'def delivery_cost(amount, is_member):\n    # 1. Order of 50 € or more?\n    # 2. If not, are they a member?\n    # 3. If not, normal rate\n\n\nprint(delivery_cost(60, False))\n',
    starter: '',
    spec: {
      functions: [{ name: 'delivery_cost', params: 2 }],
      cases: [
        { label: 'delivery_cost(60, False)', call: 'print(delivery_cost(60, False))', out_lines: ['0'] },
        { label: 'delivery_cost(50, False) (limit)', call: 'print(delivery_cost(50, False))', out_lines: ['0'] },
        { label: 'delivery_cost(30, True)', call: 'print(delivery_cost(30, True))', out_lines: ['2'] },
        { label: 'delivery_cost(30, False)', call: 'print(delivery_cost(30, False))', out_lines: ['4.99'] },
        { label: 'delivery_cost(80, True)', call: 'print(delivery_cost(80, True))', out_lines: ['0'] },
        { label: 'delivery_cost(49.99, False)', call: 'print(delivery_cost(49.99, False))', out_lines: ['4.99'] },
      ],
      misconceptions: [
        { out_lines: ['0', 'None'], title: 'It shows, but doesn\'t return', msg: 'Use `return` in each case instead of `print`.' },
        { out_lines: ['None'], title: 'A path is missing', msg: 'In some case the function doesn\'t reach any `return` and returns None. Make sure you cover all three cases.' },
      ],
      logic_msg: 'Check the case that fails. Remember: exactly 50 € already has free delivery.',
    },
    hints: [
      { level: 'Orientation', text: 'Three possible results (0, 2 and 4.99) depending on two pieces of data (amount and is_member).' },
      { level: 'Reasoning', text: 'First the amount: if it reaches 50, nothing else matters. If it doesn\'t, it depends on whether they\'re a member.' },
      { level: 'Pseudocode', text: 'if amount ≥ 50: return 0\notherwise, if is_member: return 2\notherwise: return 4.99', pre: true },
      { level: 'Technical help', text: '`if amount >= 50:` … `elif is_member:` … `else:`. Since is_member is already True or False, you don\'t need `== True`.' },
    ],
    solution: {
      code: 'def delivery_cost(amount, is_member):\n    """Return the delivery cost of an order."""\n    if amount >= 50:\n        return 0\n    elif is_member:\n        return 2\n    else:\n        return 4.99\n\nprint(delivery_cost(60, False))\nprint(delivery_cost(30, True))',
      explanation: 'The amount is checked first because it overrides everything else. `elif is_member:` uses the boolean directly. Every path ends in a return.',
    },
    reference: [
      'def delivery_cost(amount, is_member):\n    if amount >= 50:\n        return 0\n    elif is_member:\n        return 2\n    else:\n        return 4.99',
      'def delivery_cost(amount, is_member):\n    if amount < 50 and is_member:\n        return 2\n    if amount < 50:\n        return 4.99\n    return 0',
    ],
    wrongs: [
      { code: 'def delivery_cost(amount, is_member):\n    if is_member:\n        return 2\n    elif amount >= 50:\n        return 0\n    else:\n        return 4.99', category: 'logica' },
      { code: 'def delivery_cost(amount, is_member):\n    if amount > 50:\n        return 0\n    elif is_member:\n        return 2\n    else:\n        return 4.99', category: 'logica' },
      { code: 'def delivery_cost(amount, is_member):\n    if amount >= 50:\n        return 0\n    elif is_member:\n        return 2', category: 'comprension' },
    ],
  },
};
