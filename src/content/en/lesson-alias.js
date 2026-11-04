// Lesson 9.3 · Mutability and aliasing (English translation of src/content/lesson-alias.js).

const TOPIC = 'Lists';

export const LESSON_ALIAS = {
  id: 'alias',
  moduleId: 'm9',
  code: '9.3',
  title: 'Mutability and aliasing',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Explain what an alias is: two names for the same list',
    'Copy a list when you need an independent one',
    'Tell == (same content) apart from is (same object)',
    'Predict what happens when a function receives a list',
    'Decide between changing the list received or returning a new one',
  ],
  prerequisites: ['Lesson 9.2 «Looping over lists»'],
  teaser: 'In lesson 2.1 you saw that b = a copies the value. With lists there\'s a surprise: both variables can end up sharing the same list.',
  celebration: 'You\'ve completed Module 9: you can work with lists without getting caught out by aliases.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'alias', title: 'Two names, one list', concepts: ['alias'],
      blocks: [
        { type: 'p', text: 'With numbers and texts, `b = a` and then changing `a` doesn\'t affect `b`. With lists, `b = a` **doesn\'t copy the list**: it makes `b` **another name** for the same list. It\'s an **alias**.' },
        { type: 'code', run: true, code: 'a = [1, 2, 3]\nb = a          # alias: the same list\nb.append(4)\nprint(a)\nprint(b)' },
        { type: 'callout', tone: 'info', title: 'Why doesn\'t it happen with numbers?', text: 'Numbers and texts are immutable: «changing» them always creates a new value. Lists can be changed in place, so all their names see the change.' },
        {
          type: 'check', id: 'm9a-alias', concept: 'alias', mode: 'choice',
          question: 'What will it show?', code: 'original = ["x", "y"]\nother = original\nother[0] = "z"\nprint(original)', expectOutput: "['z', 'y']",
          options: [
            { text: "['z', 'y']", correct: true },
            { text: "['x', 'y']", why: 'other isn\'t a copy: it\'s another name for the same list.' },
          ],
          explain: 'other is an alias of original: changing an item through one name is visible from the other.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'copiar', title: 'Making a real copy', concepts: ['alias'],
      blocks: [
        { type: 'p', text: 'If you need an independent list, copy it. There are three equivalent ways:' },
        { type: 'code', run: true, code: 'a = [1, 2, 3]\nb = a.copy()      # or list(a), or a[:]\nb.append(4)\nprint(a)\nprint(b)' },
        {
          type: 'check', id: 'm9a-copia', concept: 'alias', mode: 'choice',
          question: 'What will it show?', code: 'a = [5, 6]\nb = a[:]\nb[0] = 99\nprint(a, b)', expectOutput: '[5, 6] [99, 6]',
          options: [
            { text: '[5, 6] [99, 6]', correct: true },
            { text: '[99, 6] [99, 6]', why: 'a[:] creates a new list with the same items: changing b doesn\'t affect a.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'is', title: '== versus is', concepts: ['alias'],
      blocks: [
        { type: 'p', text: '`==` asks whether two lists have the **same content**. `is` asks whether they\'re **the same list** (the same object in memory).' },
        { type: 'code', run: true, code: 'a = [1, 2]\nb = a\nc = [1, 2]\nprint(a == b, a is b)   # same content, same list\nprint(a == c, a is c)   # same content, different lists' },
        {
          type: 'check', id: 'm9a-is', concept: 'alias', mode: 'text',
          question: 'Predict:', code: 'x = [0]\ny = x.copy()\nprint(x == y, x is y)', answer: 'True False',
          explain: 'The copy has the same content, but it\'s another list.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Lists that go into functions', concepts: ['alias', 'parametros'],
      blocks: [
        { type: 'p', text: 'When you pass a list to a function, the parameter is an **alias** of the original list. If the function changes it, the change is visible outside:' },
        { type: 'code', run: true, code: 'def add_vat(prices):\n    for i in range(len(prices)):\n        prices[i] = round(prices[i] * 1.21, 2)\n\nbasket = [10, 20]\nadd_vat(basket)\nprint(basket)' },
        {
          type: 'five', items: {
            'Change it in place': 'The function changes the list it receives and returns nothing (like `sort`). Useful with huge lists.',
            'Return a new one': 'The function creates another list and returns it (like `sorted`). Safer: no unexpected side effects.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Decide and document', text: 'If a function changes the list it receives, say so in the docstring. If there\'s no need to change it, return a new one.' },
        {
          type: 'check', id: 'm9a-funcion', concept: 'alias', mode: 'text',
          question: 'Predict:', code: 'def empty_out(items):\n    items.clear()\n\nmy_data = [1, 2, 3]\nempty_out(my_data)\nprint(my_data)', answer: '[]',
          explain: 'items is an alias of my_data: clear() empties the original list.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'ali-predict' },
    { id: 'a2', activity: 'ali-complete' },
    { id: 'a3', activity: 'ali-fix' },
    { id: 'a4', activity: 'ali-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'With lists, `b = a` creates an **alias**: two names for the same list.',
    'For an independent list: `a.copy()`, `list(a)` or `a[:]`.',
    '`==` compares the content; `is` checks whether it\'s the same object.',
    'A parameter that receives a list is an alias: if the function changes it, it\'s visible outside.',
    'Choose and document: change it in place (like sort) or return a new one (like sorted).',
  ],
};

export const ACTIVITIES_ALIAS = {
  'ali-predict': {
    id: 'ali-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Aliases and copies', difficulty: 3, xp: 15, concepts: ['alias'],
    prompt: 'A list, an alias and a copy. **What will it show?**',
    code: 'a = [1, 2]\nb = a\nc = a.copy()\nb.append(3)\nc.append(4)\nprint(a, b, c)',
    expectedOutput: '[1, 2, 3] [1, 2, 3] [1, 2, 4]',
    options: [
      { text: '[1, 2, 3] [1, 2, 3] [1, 2, 4]', correct: true },
      { text: '[1, 2] [1, 2, 3] [1, 2, 4]', concept: 'alias', why: 'b is an alias of a: adding to b is adding to a.' },
      { text: '[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 4]', concept: 'alias', why: 'c is an independent copy: what\'s added to c doesn\'t affect a or b.' },
      { text: '[1, 2, 3] [1, 2, 3] [1, 2, 3, 4]', concept: 'alias', why: 'c was copied before the 3 was added: it only has 1, 2 and then the 4.' },
    ],
    explain: ['b is the same list as a; c is a copy of [1, 2].', 'b.append(3) changes the shared list: a and b are [1, 2, 3].', 'c.append(4) only changes the copy: [1, 2, 4].'],
  },
  'ali-complete': {
    id: 'ali-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The backup', difficulty: 2, xp: 15, concepts: ['alias'],
    statement: 'Before changing the task list, the program saves a **backup**. Fill in the gap so the backup doesn\'t change when the list is changed.',
    expected: "['study', 'shop', 'run']\n['study', 'shop']",
    starter: 'tasks = ["study", "shop"]\nbackup = ___\ntasks.append("run")\nprint(tasks)\nprint(backup)',
    spec: {
      blanks: true,
      cases: [{ label: 'Whole program', out_lines: ["['study', 'shop', 'run']", "['study', 'shop']"] }],
      misconceptions: [
        { out_lines: ["['study', 'shop', 'run']", "['study', 'shop', 'run']"], title: 'It\'s an alias', msg: '`backup = tasks` doesn\'t copy: it creates another name for the same list. Use `tasks.copy()`.' },
      ],
      logic_msg: 'The backup must keep the two original tasks.',
    },
    hints: [
      { level: 'Orientation', text: 'A single gap: create an independent copy of tasks.' },
      { level: 'Reasoning', text: '`backup = tasks` would be an alias. Which method creates a copy?' },
      { level: 'Pseudocode', text: 'backup ← copy of tasks', pre: true },
      { level: 'Technical help', text: '`tasks.copy()` (or `list(tasks)`, or `tasks[:]`).' },
    ],
    solution: {
      code: 'tasks = ["study", "shop"]\nbackup = tasks.copy()\ntasks.append("run")\nprint(tasks)\nprint(backup)',
      explanation: 'copy() creates a new list with the same items. From then on, each one changes on its own.',
    },
    reference: [
      'tasks = ["study", "shop"]\nbackup = tasks.copy()\ntasks.append("run")\nprint(tasks)\nprint(backup)',
      'tasks = ["study", "shop"]\nbackup = tasks[:]\ntasks.append("run")\nprint(tasks)\nprint(backup)',
    ],
    wrongs: [
      { code: 'tasks = ["study", "shop"]\nbackup = ___\ntasks.append("run")\nprint(tasks)\nprint(backup)', category: 'incompleto' },
      { code: 'tasks = ["study", "shop"]\nbackup = tasks\ntasks.append("run")\nprint(tasks)\nprint(backup)', category: 'comprension' },
    ],
  },
  'ali-fix': {
    id: 'ali-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The side effect', difficulty: 3, xp: 25, concepts: ['alias', 'parametros'],
    statement: '`with_bonus(marks)` should return a new list with one more point on each mark, **without touching** the original list. But after calling it, the original marks have changed too. Fix it.',
    expected: '[6, 8]\n[5, 7]',
    starter: 'def with_bonus(marks):\n    result = marks\n    for i in range(len(result)):\n        result[i] += 1\n    return result\n\nmy_marks = [5, 7]\nprint(with_bonus(my_marks))\nprint(my_marks)',
    spec: {
      functions: [{ name: 'with_bonus', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['[6, 8]', '[5, 7]'] },
        { label: 'with_bonus([0])', call: 'print(with_bonus([0]))', out_lines: ['[1]'] },
      ],
      misconceptions: [
        { out_lines: ['[6, 8]', '[6, 8]'], title: 'result is an alias', msg: '`result = marks` doesn\'t copy the list: the function changes the original. Do `result = marks.copy()` or build a new list.' },
      ],
      logic_msg: 'The function must return [6, 8] and leave my_marks as [5, 7].',
    },
    hints: [
      { level: 'Orientation', text: 'The problem is on the first line of the function. What does `result = marks` do with a list?' },
      { level: 'Reasoning', text: 'marks is already an alias of my_marks, and result is one more alias. How do you get an independent list?' },
      { level: 'Pseudocode', text: 'result ← copy of marks\nadd 1 to each item of result\nreturn result', pre: true },
      { level: 'Technical help', text: '`result = marks.copy()`, or directly `return [n + 1 for n in marks]`.' },
    ],
    solution: {
      code: 'def with_bonus(marks):\n    result = marks.copy()\n    for i in range(len(result)):\n        result[i] += 1\n    return result\n\nmy_marks = [5, 7]\nprint(with_bonus(my_marks))\nprint(my_marks)',
      explanation: 'The parameter is already an alias of the list outside; assigning it to another variable creates one more alias. With copy() the function works on its own list.',
    },
    reference: [
      'def with_bonus(marks):\n    result = marks.copy()\n    for i in range(len(result)):\n        result[i] += 1\n    return result\n\nmy_marks = [5, 7]\nprint(with_bonus(my_marks))\nprint(my_marks)',
      'def with_bonus(marks):\n    return [n + 1 for n in marks]\n\nmy_marks = [5, 7]\nprint(with_bonus(my_marks))\nprint(my_marks)',
    ],
    wrongs: [
      { code: 'def with_bonus(marks):\n    result = marks\n    for i in range(len(result)):\n        result[i] += 1\n    return result\n\nmy_marks = [5, 7]\nprint(with_bonus(my_marks))\nprint(my_marks)', category: 'comprension' },
    ],
  },
  'ali-build': {
    id: 'ali-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Two ways of rotating', difficulty: 3, xp: 30, concepts: ['alias', 'listas', 'diseno'],
    unlock: { any: ['ali-predict', 'ali-complete', 'ali-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define two functions that **rotate** a list by moving the first item to the end:\n\n• `rotated(items)` **returns a new list**, rotated, and doesn\'t touch the original.\n\n• `rotate(items)` **changes** the list it receives and returns nothing.\n\nExample: with [1, 2, 3], the rotated version is [2, 3, 1]. If the list is empty, it does nothing.',
    expected: '[2, 3, 1]',
    plan: [
      {
        q: 'How do you build the rotated list without changing the original?',
        options: [
          { text: 'items[1:] + items[:1]', correct: true },
          { text: 'items.append(items.pop(0))', why: 'That changes the original list: it works for rotate, but not for rotated.' },
        ],
      },
      {
        q: 'And to change it in place?',
        options: [
          { text: 'Take the first one out with pop(0) and add it with append', correct: true },
          { text: 'items = items[1:] + items[:1]', why: 'Assigning to the parameter creates a new list only inside the function: the one outside doesn\'t change.' },
        ],
      },
    ],
    planScaffold: 'def rotated(items):\n    # return a new list\n\n\ndef rotate(items):\n    # change the list received\n\n\nprint(rotated([1, 2, 3]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'rotated', params: 1 }, { name: 'rotate', params: 1 }],
      cases: [
        { label: 'rotated([1, 2, 3])', call: 'v = [1, 2, 3]\nprint(rotated(v), v)', out_lines: ['[2, 3, 1] [1, 2, 3]'] },
        { label: 'rotate([1, 2, 3])', call: 'v = [1, 2, 3]\nr = rotate(v)\nprint(v, r)', out_lines: ['[2, 3, 1] None'] },
        { label: 'rotated([])', call: 'print(rotated([]))', out_lines: ['[]'] },
        { label: 'rotate([])', call: 'v = []\nrotate(v)\nprint(v)', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['[2, 3, 1] [2, 3, 1]'], title: 'rotated changes the original', msg: 'rotated must not change the list it receives. Build a new one with slices: `items[1:] + items[:1]`.' },
        { out_lines: ['[1, 2, 3] None'], title: 'rotate doesn\'t change the list', msg: 'Assigning to the parameter (`items = …`) doesn\'t change the list outside. Change it with its methods: `items.append(items.pop(0))`.' },
      ],
      logic_msg: 'Check both behaviours: rotated returns a new list; rotate changes the original and returns None.',
    },
    hints: [
      { level: 'Orientation', text: 'Two functions with the same visible result but a different interface: one returns, the other changes.' },
      { level: 'Reasoning', text: 'For rotated use slices (they create new lists). For rotate, methods that change it: pop and append. Watch out for the empty list: pop(0) would give an error.' },
      { level: 'Pseudocode', text: 'rotated: return (items without the first) + (the first)\nrotate: if the list isn\'t empty:\n    remove the first and add it at the end', pre: true },
      { level: 'Technical help', text: '`return items[1:] + items[:1]` and `if items: items.append(items.pop(0))`.' },
    ],
    solution: {
      code: 'def rotated(items):\n    """Return a new list with the first item at the end."""\n    return items[1:] + items[:1]\n\ndef rotate(items):\n    """Move the first item to the end, changing the list."""\n    if items:\n        items.append(items.pop(0))\n\nprint(rotated([1, 2, 3]))',
      explanation: 'Slices create new lists, so rotated doesn\'t touch the original. rotate uses methods that change the list it receives (an alias of the one outside). With an empty list, `items[:1]` is [] and the if avoids the pop error.',
    },
    reference: [
      'def rotated(items):\n    return items[1:] + items[:1]\n\ndef rotate(items):\n    if items:\n        items.append(items.pop(0))',
    ],
    wrongs: [
      { code: 'def rotated(items):\n    items.append(items.pop(0))\n    return items\n\ndef rotate(items):\n    if items:\n        items.append(items.pop(0))', category: 'comprension' },
      { code: 'def rotated(items):\n    return items[1:] + items[:1]\n\ndef rotate(items):\n    items = items[1:] + items[:1]', category: 'comprension' },
    ],
  },
};
