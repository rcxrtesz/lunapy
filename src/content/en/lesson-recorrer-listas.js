// Lesson 9.2 · Looping over lists (English translation of src/content/lesson-recorrer-listas.js).

const TOPIC = 'Lists';

export const LESSON_RECORRER_LISTAS = {
  id: 'recorrer-listas',
  moduleId: 'm9',
  code: '9.2',
  title: 'Looping over lists',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Go through a list with for, by item or by position (enumerate)',
    'Build a new list by transforming each item (mapping)',
    'Keep only the items that meet something (filtering)',
    'Reduce a list to a single value (accumulating)',
    'Write short maps and filters with list comprehensions',
  ],
  prerequisites: ['Lesson 9.1 «Lists and operations»'],
  teaser: 'With a list and a loop you can process a hundred pieces of data just like one. Today you learn the three patterns that solve almost everything.',
  celebration: 'You\'ve now mastered the three big patterns with lists: transforming, filtering and accumulating.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'for', title: 'Going through item by item', concepts: ['listas', 'bucles'],
      blocks: [
        { type: 'p', text: '`for` goes through the items of a list just like the characters of a text. If you also need the position, `enumerate` gives you both:' },
        { type: 'code', run: true, code: 'guests = ["Ana", "Luis", "Eva"]\nfor name in guests:\n    print("Hello,", name)\n\nfor i, name in enumerate(guests):\n    print(i + 1, name)' },
        {
          type: 'check', id: 'm9r-enumerate', concept: 'listas', mode: 'text',
          question: 'Predict (on one line):', code: 'for i, x in enumerate(["a", "b", "c"]):\n    print(i, x, end=" ")', answer: '0 a 1 b 2 c',
          explain: 'enumerate starts counting at 0 and gives the position and the item on each lap.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'patrones', title: 'Mapping, filtering and accumulating', concepts: ['listas', 'bucles'],
      blocks: [
        { type: 'p', text: 'Almost everything you\'ll do with lists fits one of these three patterns. All three start before the loop and finish after it:' },
        {
          type: 'five', items: {
            'Mapping': 'An empty new list; on each lap, `append` the **transformed** item.',
            'Filtering': 'An empty new list; `append` only the items that **meet** a condition.',
            'Accumulating': 'A starting value (0, 1, ""…); on each lap, it\'s **combined** with the item.',
          },
        },
        { type: 'code', run: true, code: 'prices = [10, 25, 4, 60]\n\nwith_vat = []                   # mapping\nfor p in prices:\n    with_vat.append(round(p * 1.21, 2))\n\nexpensive = []                  # filtering\nfor p in prices:\n    if p > 20:\n        expensive.append(p)\n\ntotal = 0                       # accumulating\nfor p in prices:\n    total += p\n\nprint(with_vat, expensive, total)' },
        {
          type: 'check', id: 'm9r-filtrar', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'evens = []\nfor n in [3, 8, 5, 12, 7]:\n    if n % 2 == 0:\n        evens.append(n)\nprint(evens)', answer: '[8, 12]',
          explain: 'Only the items that meet the condition are added.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'variable', title: 'Changing the variable doesn\'t change the list', concepts: ['listas', 'errores'],
      blocks: [
        { type: 'p', text: 'A very common mistake: trying to change the list by changing the loop variable. The variable is just a temporary label for each item; reassigning it doesn\'t touch the list.' },
        { type: 'code', run: true, code: 'marks = [5, 6, 7]\nfor n in marks:\n    n = n + 1        # changes n, not the list\nprint(marks)\n\nfor i in range(len(marks)):\n    marks[i] = marks[i] + 1   # this does\nprint(marks)' },
        { type: 'callout', tone: 'tip', title: 'Two options', text: 'Either you change the list by position (`list[i] = …`), or —usually clearer— you build a new list with the mapping pattern.' },
        {
          type: 'check', id: 'm9r-variable', concept: 'listas', mode: 'choice',
          question: 'What will it show?', code: 'v = [1, 2, 3]\nfor x in v:\n    x = x * 10\nprint(v)', expectOutput: '[1, 2, 3]',
          options: [
            { text: '[1, 2, 3]', correct: true },
            { text: '[10, 20, 30]', why: 'x is a temporary variable: giving it a new value doesn\'t change the item in the list.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'textos', title: 'From text to list and back', concepts: ['listas', 'cadenas'],
      blocks: [
        { type: 'p', text: '`split` turns a text into a list and `join` does the opposite. With a loop in between you can process word by word:' },
        { type: 'code', run: true, code: 'sentence = "the cat eats fish"\nwords = sentence.split()\nlong_words = []\nfor w in words:\n    if len(w) > 3:\n        long_words.append(w.upper())\nprint(" ".join(long_words))\n\nprint(list("hello"))   # a text as a list of characters' },
        {
          type: 'check', id: 'm9r-split', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'data = "3,7,2"\ntotal = 0\nfor piece in data.split(","):\n    total += int(piece)\nprint(total)', answer: '12',
          explain: 'split(",") gives ["3", "7", "2"]; each piece is turned into a number and added.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comprension', title: 'List comprehensions', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Mapping and filtering are so common that Python has a short form: the **list comprehension**. It reads almost like English: «double n, for each n in numbers, if n is positive».' },
        { type: 'code', run: true, code: 'numbers = [4, -2, 7, 0, -5]\ndoubles = [n * 2 for n in numbers]\npositives = [n for n in numbers if n > 0]\npositive_squares = [n ** 2 for n in numbers if n > 0]\nprint(doubles)\nprint(positives)\nprint(positive_squares)' },
        { type: 'callout', tone: 'info', title: 'Use them in moderation', text: 'They\'re ideal for short transformations. If the logic doesn\'t fit comfortably on one line, the loop with append reads better.' },
        {
          type: 'check', id: 'm9r-comprension', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'print([len(w) for w in ["sun", "moon", "sea"]])', answer: '[3, 4, 3]',
          explain: 'A list with the length of each word.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'lr-predict' },
    { id: 'a2', activity: 'lr-complete' },
    { id: 'a3', activity: 'lr-fix' },
    { id: 'a4', activity: 'lr-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`for x in list:` goes through the items; `enumerate(list)` gives the position too.',
    '**Mapping**: a new list with each item transformed. **Filtering**: only the ones that meet something. **Accumulating**: a single value.',
    'Reassigning the loop variable doesn\'t change the list: use `list[i] = …` or build a new one.',
    '`split` and `join` convert between texts and lists.',
    'List comprehension: `[expression for x in list if condition]`.',
  ],
};

export const ACTIVITIES_RECORRER_LISTAS = {
  'lr-predict': {
    id: 'lr-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Three patterns, one list', difficulty: 2, xp: 10, concepts: ['listas', 'bucles'],
    prompt: 'A loop that maps, filters and accumulates at the same time. **What will it show?**',
    code: 'temperatures = [18, 25, 31, 22]\nhot = []\ntotal = 0\nfor t in temperatures:\n    total += t\n    if t > 24:\n        hot.append(t - 24)\nprint(hot, total)',
    expectedOutput: '[1, 7] 96',
    options: [
      { text: '[1, 7] 96', correct: true },
      { text: '[25, 31] 96', concept: 'listas', why: 'What\'s added is t − 24, not t.' },
      { text: '[1, 7] 56', concept: 'bucles', why: 'The sum is outside the if: every temperature is added up.' },
      { text: '[0, 1, 7, 0] 96', concept: 'listas', why: 'Something is only added when the condition is met: it\'s a filter.' },
    ],
    explain: ['All four are added up: 18 + 25 + 31 + 22 = 96.', 'Only 25 and 31 are above 24: 25 − 24 = 1 and 31 − 24 = 7 are added.'],
  },
  'lr-complete': {
    id: 'lr-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The passes', difficulty: 2, xp: 15, concepts: ['listas', 'bucles'],
    statement: 'Complete `passes(marks)` so it returns a **new list** with only the marks of 5 or more.',
    expected: '[7, 5, 9.5]',
    starter: 'def passes(marks):\n    result = ___\n    for mark in marks:\n        if mark ___ 5:\n            result.___(mark)\n    return result\n\nprint(passes([7, 3, 5, 4.5, 9.5]))',
    spec: {
      blanks: true,
      functions: [{ name: 'passes', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['[7, 5, 9.5]'] },
        { label: 'passes([1, 2])', call: 'print(passes([1, 2]))', out_lines: ['[]'] },
        { label: 'passes([])', call: 'print(passes([]))', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['[7, 9.5]'], title: 'A 5 passes too', msg: '«5 or more» includes 5: use `>=`.' },
      ],
      logic_msg: 'The resulting list must contain only the marks of 5 or more, in the same order.',
    },
    hints: [
      { level: 'Orientation', text: 'It\'s the filtering pattern: an empty list, a condition and append.' },
      { level: 'Reasoning', text: 'How do you write an empty list? Which operator means «5 or more»? Which method adds at the end?' },
      { level: 'Pseudocode', text: 'result ← empty list\nfor each mark:\n    if mark ≥ 5: add mark to result\nreturn result', pre: true },
      { level: 'Technical help', text: '`result = []`, `if mark >= 5:` and `result.append(mark)`.' },
    ],
    solution: {
      code: 'def passes(marks):\n    result = []\n    for mark in marks:\n        if mark >= 5:\n            result.append(mark)\n    return result\n\nprint(passes([7, 3, 5, 4.5, 9.5]))',
      explanation: 'Filtering pattern: the new list starts empty and only receives the items that meet the condition. The original doesn\'t change. In one line: `[n for n in marks if n >= 5]`.',
    },
    reference: [
      'def passes(marks):\n    result = []\n    for mark in marks:\n        if mark >= 5:\n            result.append(mark)\n    return result\n\nprint(passes([7, 3, 5, 4.5, 9.5]))',
      'def passes(marks):\n    return [n for n in marks if n >= 5]\n\nprint(passes([7, 3, 5, 4.5, 9.5]))',
    ],
    wrongs: [
      { code: 'def passes(marks):\n    result = ___\n    for mark in marks:\n        if mark ___ 5:\n            result.___(mark)\n    return result', category: 'incompleto' },
      { code: 'def passes(marks):\n    result = []\n    for mark in marks:\n        if mark > 5:\n            result.append(mark)\n    return result\n\nprint(passes([7, 3, 5, 4.5, 9.5]))', category: 'comprension' },
    ],
  },
  'lr-fix': {
    id: 'lr-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The marks that won\'t go up', difficulty: 2, xp: 20, concepts: ['listas', 'errores'],
    statement: '`raise_marks(marks)` should return a **new** list with each mark raised by 1 point (without going over 10). But it returns the marks unchanged. Fix it.',
    expected: '[6, 8, 10]',
    starter: 'def raise_marks(marks):\n    for n in marks:\n        n = min(n + 1, 10)\n    return marks\n\nprint(raise_marks([5, 7, 9.5]))',
    spec: {
      functions: [{ name: 'raise_marks', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['[6, 8, 10]'] },
        { label: 'raise_marks([10, 0])', call: 'print(raise_marks([10, 0]))', out_lines: ['[10, 1]'] },
        { label: 'The original doesn\'t change', call: 'v = [1, 2]\nraise_marks(v)\nprint(v)', out_lines: ['[1, 2]'] },
      ],
      misconceptions: [
        { out_lines: ['[5, 7, 9.5]'], title: 'The loop variable doesn\'t change the list', msg: 'Reassigning `n` doesn\'t change the list. Create a new list and add each raised mark with append.' },
        { out_lines: ['[2, 3]'], title: 'You\'ve changed the original', msg: 'A **new** list is asked for: don\'t change the one the function receives.' },
      ],
      logic_msg: 'Check with [5, 7, 9.5]: it must give [6, 8, 10] (the 10.5 stays at 10).',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: the list comes out the same. What does the `n = …` line really change?' },
      { level: 'Reasoning', text: 'n is a temporary label. To get a list with the new values, use the mapping pattern: a new list and append.' },
      { level: 'Pseudocode', text: 'new_marks ← empty list\nfor each n of marks:\n    add min(n + 1, 10) to new_marks\nreturn new_marks', pre: true },
      { level: 'Technical help', text: '`new_marks = []`, `new_marks.append(min(n + 1, 10))` and `return new_marks`.' },
    ],
    solution: {
      code: 'def raise_marks(marks):\n    new_marks = []\n    for n in marks:\n        new_marks.append(min(n + 1, 10))\n    return new_marks\n\nprint(raise_marks([5, 7, 9.5]))',
      explanation: 'The loop variable is just a temporary copy of the value. With the mapping pattern a new list is built and the original stays untouched.',
    },
    reference: [
      'def raise_marks(marks):\n    new_marks = []\n    for n in marks:\n        new_marks.append(min(n + 1, 10))\n    return new_marks\n\nprint(raise_marks([5, 7, 9.5]))',
      'def raise_marks(marks):\n    return [min(n + 1, 10) for n in marks]\n\nprint(raise_marks([5, 7, 9.5]))',
    ],
    wrongs: [
      { code: 'def raise_marks(marks):\n    for n in marks:\n        n = min(n + 1, 10)\n    return marks\n\nprint(raise_marks([5, 7, 9.5]))', category: 'comprension' },
      { code: 'def raise_marks(marks):\n    for i in range(len(marks)):\n        marks[i] = min(marks[i] + 1, 10)\n    return marks\n\nprint(raise_marks([5, 7, 9.5]))', category: 'comprension' },
    ],
  },
  'lr-build': {
    id: 'lr-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'No repeats', difficulty: 3, xp: 30, concepts: ['listas', 'busqueda'],
    unlock: { any: ['lr-predict', 'lr-complete', 'lr-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `no_repeats(items)` that returns a new list with the items of the original **without repeats**, in the **order they first appear**.\n\nExample: `no_repeats([3, 1, 3, 2, 1])` → `[3, 1, 2]`.',
    expected: '[3, 1, 2]',
    plan: [
      {
        q: 'Which pattern fits?',
        options: [
          { text: 'Filtering: add each item only if it isn\'t in the result yet', correct: true },
          { text: 'Accumulating: add up the items', why: 'It\'s not a single value you want but a list.' },
        ],
      },
      {
        q: 'How do you know if an item is already in the new list?',
        options: [
          { text: 'With the in operator', correct: true },
          { text: 'By sorting the list', why: 'Sorting would change the order they appear in, and you\'re asked to keep it.' },
        ],
      },
    ],
    planScaffold: 'def no_repeats(items):\n    # empty new list\n    # add each item if it isn\'t there yet\n\n\nprint(no_repeats([3, 1, 3, 2, 1]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'no_repeats', params: 1 }],
      cases: [
        { label: '[3, 1, 3, 2, 1]', call: 'print(no_repeats([3, 1, 3, 2, 1]))', out_lines: ['[3, 1, 2]'] },
        { label: 'Texts', call: 'print(no_repeats(["sun", "sea", "sun"]))', out_lines: ["['sun', 'sea']"] },
        { label: 'Empty list', call: 'print(no_repeats([]))', out_lines: ['[]'] },
        { label: 'No repeats', call: 'print(no_repeats([5, 4]))', out_lines: ['[5, 4]'] },
      ],
      misconceptions: [
        { out_lines: ['[1, 2, 3]'], title: 'The order has been lost', msg: 'The order of first appearance is asked for. Sorting (or using set) changes it: go through the list and add each item if it isn\'t already there.' },
      ],
      logic_msg: 'Check with [3, 1, 3, 2, 1]: the result is [3, 1, 2].',
    },
    hints: [
      { level: 'Orientation', text: 'An empty new list, a for and a condition with `not in`.' },
      { level: 'Reasoning', text: 'For each item: is it already in the result? If not, add it.' },
      { level: 'Pseudocode', text: 'result ← empty list\nfor each x of items:\n    if x isn\'t in result: add x\nreturn result', pre: true },
      { level: 'Technical help', text: '`if x not in result:` and `result.append(x)`.' },
    ],
    solution: {
      code: 'def no_repeats(items):\n    """Return the items without repeats, in order of first appearance."""\n    result = []\n    for x in items:\n        if x not in result:\n            result.append(x)\n    return result\n\nprint(no_repeats([3, 1, 3, 2, 1]))',
      explanation: 'It\'s a filter whose condition depends on what you\'ve already stored: only what isn\'t in the result yet gets through.',
    },
    reference: ['def no_repeats(items):\n    result = []\n    for x in items:\n        if x not in result:\n            result.append(x)\n    return result'],
    wrongs: [
      { code: 'def no_repeats(items):\n    return sorted(set(items))', category: 'comprension' },
      { code: 'def no_repeats(items):\n    result = []\n    for x in items:\n        if x in result:\n            result.append(x)\n    return result', category: 'logica' },
    ],
  },
};
