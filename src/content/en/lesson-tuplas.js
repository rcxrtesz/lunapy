// Lesson 10.2 · Tuples (English translation of src/content/lesson-tuplas.js).

const TOPIC = 'Dictionaries';

export const LESSON_TUPLAS = {
  id: 'tuplas',
  moduleId: 'm10',
  code: '10.2',
  title: 'Tuples',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Create tuples and explain how they differ from lists',
    'Unpack a tuple into several variables (and swap two values)',
    'Recognise the tuples in return a, b and in d.items()',
    'Pair up two lists with zip',
    'Sort a list of tuples by whichever item you want',
  ],
  prerequisites: ['Lesson 10.1 «Dictionaries»'],
  teaser: 'You\'ve already used tuples without knowing it: when returning two values and when going through items(). Today you give them a name and learn their tricks.',
  celebration: 'You now know tuples: data that travels together and doesn\'t change. With zip and sorting by key you have everything ready for the project.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'tupla', title: 'A list that doesn\'t change', concepts: ['tuplas'],
      blocks: [
        { type: 'p', text: 'A **tuple** is a sequence like a list, but **immutable**: once created, it can\'t be changed. It\'s written with round brackets (or just with commas).' },
        { type: 'code', run: true, code: 'point = (3, 4)\ndate = 29, 10, 2026   # the brackets are optional\nprint(point[0], date[-1], len(date))\nprint(type(date))\nsingle = (5,)          # with one item, the comma is needed\nprint(type(single))' },
        {
          type: 'five', items: {
            'List': 'For collections that grow or change: the shopping basket.',
            'Tuple': 'For data that goes **together** and doesn\'t change: some coordinates, a date, a name with its mark.',
          },
        },
        {
          type: 'check', id: 'm10t-inmutable', concept: 'tuplas', mode: 'choice',
          question: 'What happens?', code: 'colour = (255, 128, 0)\ncolour[0] = 200', expectError: 'TypeError',
          options: [
            { text: 'TypeError: tuples can\'t be changed', correct: true },
            { text: 'colour becomes (200, 128, 0)', why: 'Tuples are immutable, like texts. To «change» one, create another: `colour = (200,) + colour[1:]`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'desempaquetar', title: 'Unpacking', concepts: ['tuplas'],
      blocks: [
        { type: 'p', text: 'You can share out the items of a tuple between several variables in a single line. That\'s how `return a, b` and `x, y = function()` from Module 6 worked.' },
        { type: 'code', run: true, code: 'point = (3, 4)\nx, y = point\nprint(x, y)\n\na, b = 1, 2\na, b = b, a          # swap in one line\nprint(a, b)' },
        {
          type: 'check', id: 'm10t-swap', concept: 'tuplas', mode: 'text',
          question: 'Predict:', code: 'x, y, z = 1, 2, 3\nx, y, z = z, x, y\nprint(x, y, z)', answer: '3 1 2',
          explain: 'The right-hand side is evaluated first (3, 1, 2) and then shared out: x = 3, y = 1, z = 2.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'items', title: 'Tuples everywhere', concepts: ['tuplas', 'diccionarios'],
      blocks: [
        { type: 'p', text: '`d.items()` gives (key, value) tuples, and `enumerate` gives (position, item) tuples. That\'s why you can unpack them in the for:' },
        { type: 'code', run: true, code: 'marks = {"Ana": 8, "Luis": 6}\nprint(list(marks.items()))\nfor name, mark in marks.items():\n    print(name, mark)' },
        { type: 'p', text: 'Tuples can be dictionary **keys** (lists can\'t, because they change):' },
        { type: 'code', run: true, code: 'cities = {(40.4, -3.7): "Madrid", (41.4, 2.2): "Barcelona"}\nprint(cities[(40.4, -3.7)])' },
        {
          type: 'check', id: 'm10t-items', concept: 'tuplas', mode: 'text',
          question: 'Predict:', code: 'd = {"a": 1, "b": 2}\nprint(list(d.items())[1])', answer: "('b', 2)",
          explain: 'items() gives the (key, value) pairs in order; the one at position 1 is ("b", 2).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'zip', title: 'Pairing up with zip', concepts: ['tuplas', 'listas'],
      blocks: [
        { type: 'p', text: '`zip` pairs up two (or more) lists item by item and gives tuples. It stops when the shortest one runs out.' },
        { type: 'code', run: true, code: 'names = ["Ana", "Luis", "Eva"]\nmarks = [8, 6.5, 9]\nfor name, mark in zip(names, marks):\n    print(f"{name}: {mark}")\n\nprint(dict(zip(names, marks)))   # a dictionary in one line' },
        {
          type: 'check', id: 'm10t-zip', concept: 'tuplas', mode: 'text',
          question: 'Predict:', code: 'print(list(zip([1, 2, 3], "ab")))', answer: "[(1, 'a'), (2, 'b')]",
          explain: 'zip stops at the shortest: "ab" has two characters.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ordenar', title: 'Sorting tuples', concepts: ['tuplas', 'listas'],
      blocks: [
        { type: 'p', text: 'A list of tuples is sorted by the **first** item (and, if they tie, by the second…). To sort by another item, pass `sorted` a **key function** that says what to look at:' },
        { type: 'code', run: true, code: 'students = [("Eva", 9), ("Ana", 8), ("Luis", 6.5)]\nprint(sorted(students))                 # by name\n\ndef mark(pair):\n    return pair[1]\n\nprint(sorted(students, key=mark))        # by mark\nprint(sorted(students, key=mark, reverse=True)[0])  # the best' },
        { type: 'callout', tone: 'info', title: 'key receives a function', text: 'You write the function\'s name **without brackets**: `key=mark`. sorted calls it with each item to know what to sort by. It works with max and min too: `max(students, key=mark)`.' },
        {
          type: 'check', id: 'm10t-key', concept: 'tuplas', mode: 'text',
          question: 'Predict:', code: 'def second(t):\n    return t[1]\n\nprint(min([("a", 3), ("b", 1), ("c", 2)], key=second))', answer: "('b', 1)",
          explain: 'min compares by the second item: the smallest is 1.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'tup-predict' },
    { id: 'a2', activity: 'tup-complete' },
    { id: 'a3', activity: 'tup-fix' },
    { id: 'a4', activity: 'tup-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A **tuple** is an immutable sequence: `(3, 4)`. With a single item: `(5,)`.',
    'Unpacking: `x, y = point`. Swapping: `a, b = b, a`.',
    '`return a, b`, `d.items()` and `enumerate` produce tuples.',
    '`zip(list1, list2)` pairs up item by item; `dict(zip(...))` creates a dictionary.',
    '`sorted(list, key=function)` sorts by whatever the function returns; it works in max and min too.',
  ],
};

export const ACTIVITIES_TUPLAS = {
  'tup-predict': {
    id: 'tup-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Coordinates', difficulty: 2, xp: 10, concepts: ['tuplas'],
    prompt: 'Unpacking and swapping with tuples. **What will it show?**',
    code: 'origin = (2, 5)\nx, y = origin\nx, y = y, x + y\nprint(origin, (x, y))',
    expectedOutput: '(2, 5) (5, 7)',
    options: [
      { text: '(2, 5) (5, 7)', correct: true },
      { text: '(5, 7) (5, 7)', concept: 'tuplas', why: 'x and y are new variables: changing them doesn\'t affect the origin tuple (which is immutable anyway).' },
      { text: '(2, 5) (5, 10)', concept: 'tuplas', why: 'The whole right-hand side is worked out before assigning: x + y uses the old x (2): 2 + 5 = 7.' },
      { text: '(2, 5) (5, 2)', concept: 'tuplas', why: 'The second value is x + y, not x.' },
    ],
    explain: ['x = 2, y = 5.', 'The right-hand side is (5, 2 + 5) = (5, 7), and it\'s shared out between x and y.', 'origin hasn\'t changed.'],
  },
  'tup-complete': {
    id: 'tup-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The school report', difficulty: 2, xp: 15, concepts: ['tuplas', 'listas'],
    statement: 'Complete `report(subjects, marks)` so it shows each subject with its mark, pairing up the two lists.',
    expected: 'Maths: 8\nEnglish: 6.5\nHistory: 9',
    starter: 'def report(subjects, marks):\n    for subject, mark in ___(subjects, ___):\n        print(f"{subject}: {mark}")\n\nreport(["Maths", "English", "History"], [8, 6.5, 9])',
    spec: {
      blanks: true,
      functions: [{ name: 'report', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['Maths: 8', 'English: 6.5', 'History: 9'] },
        { label: 'report(["Physics"], [7])', call: 'report(["Physics"], [7])', out_lines: ['Physics: 7'] },
      ],
      logic_msg: 'Each subject must appear with the mark in the same position.',
    },
    hints: [
      { level: 'Orientation', text: 'A function that pairs up lists item by item, and the second list.' },
      { level: 'Reasoning', text: 'Which function gives (subject, mark) tuples from two lists?' },
      { level: 'Pseudocode', text: 'for each (subject, mark) pair of pair_up(subjects, marks): show', pre: true },
      { level: 'Technical help', text: '`zip(subjects, marks)`.' },
    ],
    solution: {
      code: 'def report(subjects, marks):\n    for subject, mark in zip(subjects, marks):\n        print(f"{subject}: {mark}")\n\nreport(["Maths", "English", "History"], [8, 6.5, 9])',
      explanation: 'zip forms tuples with the items in the same position, and the for unpacks them into two variables.',
    },
    reference: ['def report(subjects, marks):\n    for subject, mark in zip(subjects, marks):\n        print(f"{subject}: {mark}")\n\nreport(["Maths", "English", "History"], [8, 6.5, 9])'],
    wrongs: [
      { code: 'def report(subjects, marks):\n    for subject, mark in ___(subjects, ___):\n        print(f"{subject}: {mark}")', category: 'incompleto' },
      { code: 'def report(subjects, marks):\n    for subject, mark in zip(marks, subjects):\n        print(f"{subject}: {mark}")\n\nreport(["Maths", "English", "History"], [8, 6.5, 9])', category: 'logica' },
    ],
  },
  'tup-fix': {
    id: 'tup-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'Moving the point', difficulty: 2, xp: 20, concepts: ['tuplas', 'errores'],
    statement: '`move(point, dx, dy)` should return a **new** point, shifted, but it gives a **TypeError** because it tries to change the tuple. Fix it.',
    expected: '(4, 7)\n(1, 2)',
    starter: 'def move(point, dx, dy):\n    point[0] += dx\n    point[1] += dy\n    return point\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)',
    spec: {
      allow_short_names: ['p', 'x', 'y'],
      functions: [{ name: 'move', params: 3 }],
      cases: [
        { label: 'Whole program', out_lines: ['(4, 7)', '(1, 2)'] },
        { label: 'move((0, 0), -1, 1)', call: 'print(move((0, 0), -1, 1))', out_lines: ['(-1, 1)'] },
      ],
      misconceptions: [
        { out_lines: ['[4, 7]', '(1, 2)'], title: 'It returns a list', msg: 'A point is asked for as a tuple: return `(x + dx, y + dy)`, with round brackets.' },
      ],
      logic_msg: 'move((1, 2), 3, 5) must return (4, 7) and leave p the same.',
    },
    hints: [
      { level: 'Orientation', text: 'Tuples can\'t be changed: you have to create another one.' },
      { level: 'Reasoning', text: 'Unpack the point into x and y and return a new tuple with the shifted values.' },
      { level: 'Pseudocode', text: 'x, y ← point\nreturn (x + dx, y + dy)', pre: true },
      { level: 'Technical help', text: '`x, y = point` and `return (x + dx, y + dy)`.' },
    ],
    solution: {
      code: 'def move(point, dx, dy):\n    x, y = point\n    return (x + dx, y + dy)\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)',
      explanation: 'Since the tuple is immutable, the function builds a new one. The advantage: the original point never changes by surprise.',
    },
    reference: [
      'def move(point, dx, dy):\n    x, y = point\n    return (x + dx, y + dy)\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)',
      'def move(point, dx, dy):\n    return (point[0] + dx, point[1] + dy)\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)',
    ],
    wrongs: [
      { code: 'def move(point, dx, dy):\n    point[0] += dx\n    point[1] += dy\n    return point\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)', category: 'ejecucion' },
      { code: 'def move(point, dx, dy):\n    x, y = point\n    return [x + dx, y + dy]\n\np = (1, 2)\nprint(move(p, 3, 5))\nprint(p)', category: 'comprension' },
    ],
  },
  'tup-build': {
    id: 'tup-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Top of the class', difficulty: 3, xp: 30, concepts: ['tuplas', 'busqueda'],
    unlock: { any: ['tup-predict', 'tup-complete', 'tup-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'You have a list of `(name, mark)` tuples. Define `best(students)` that returns the **name** of whoever has the highest mark (if there\'s a tie, the first in the list).\n\nExample: `best([("Ana", 8), ("Eva", 9.5), ("Luis", 7)])` → "Eva".',
    expected: 'Eva',
    plan: [
      {
        q: 'How do you find the tuple with the highest mark?',
        options: [
          { text: 'max(students, key=a function that returns the mark)', correct: true },
          { text: 'max(students)', why: 'Without key, max compares by the first item: the name that comes «latest» in the alphabet.' },
        ],
      },
      {
        q: 'max returns the whole tuple. How do you get the name?',
        options: [
          { text: 'With [0], or by unpacking: name, mark = …', correct: true },
          { text: 'With [1]', why: 'Position 1 is the mark.' },
        ],
      },
    ],
    planScaffold: 'def mark(pair):\n    # return the mark of the pair\n\n\ndef best(students):\n    # max with key and return the name\n\n\nprint(best([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'best', params: 1 }],
      cases: [
        { label: 'By mark, not by name', call: 'print(best([("Zoe", 4), ("Ana", 10)]))', out_lines: ['Ana'] },
        { label: 'Three students', call: 'print(best([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))', out_lines: ['Eva'] },
        { label: 'Tie', call: 'print(best([("Leo", 9), ("Bea", 9)]))', out_lines: ['Leo'] },
        { label: 'Just one', call: 'print(best([("Sol", 5)]))', out_lines: ['Sol'] },
      ],
      misconceptions: [
        { out_lines: ['Zoe'], title: 'It compares by name', msg: 'Without key, max compares the tuples by their first item (the name). Pass a key function that returns the mark.' },
        { out_lines: ['10'], title: 'It returns the mark', msg: 'The name is asked for: it\'s item 0 of the tuple.' },
      ],
      logic_msg: 'Check with [("Zoe", 4), ("Ana", 10)]: the best is Ana.',
    },
    hints: [
      { level: 'Orientation', text: 'A small key function and a call to max.' },
      { level: 'Reasoning', text: 'With key, max compares what the function returns (the mark) but returns the whole item (the tuple). With a tie, max keeps the first.' },
      { level: 'Pseudocode', text: 'mark(pair): return pair[1]\nbest(students): return max(students, key=mark)[0]', pre: true },
      { level: 'Technical help', text: '`return max(students, key=mark)[0]` with `def mark(pair): return pair[1]`.' },
    ],
    solution: {
      code: 'def mark(pair):\n    return pair[1]\n\ndef best(students):\n    """Return the name of the student with the highest mark."""\n    name, _ = max(students, key=mark)\n    return name\n\nprint(best([("Ana", 8), ("Eva", 9.5), ("Luis", 7)]))',
      explanation: 'max with key=mark compares the marks and returns the winning tuple; then it\'s unpacked to keep the name. The underscore `_` marks a variable that won\'t be used.',
    },
    reference: [
      'def mark(pair):\n    return pair[1]\n\ndef best(students):\n    return max(students, key=mark)[0]',
      'def best(students):\n    winner = students[0]\n    for pair in students:\n        if pair[1] > winner[1]:\n            winner = pair\n    return winner[0]',
    ],
    wrongs: [
      { code: 'def best(students):\n    return max(students)[0]', category: 'comprension' },
      { code: 'def mark(pair):\n    return pair[1]\n\ndef best(students):\n    return max(students, key=mark)[1]', category: 'comprension' },
    ],
  },
};
