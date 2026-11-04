// Lesson 10.1 · Dictionaries (English translation of src/content/lesson-diccionarios.js).

const TOPIC = 'Dictionaries';

export const LESSON_DICCIONARIOS = {
  id: 'diccionarios',
  moduleId: 'm10',
  code: '10.1',
  title: 'Dictionaries',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Store key → value pairs in a dictionary',
    'Look up, add, change and delete entries',
    'Avoid KeyError with in and with get',
    'Go through keys, values and pairs',
    'Count occurrences with a dictionary',
  ],
  prerequisites: ['Module 9 «Lists»'],
  teaser: 'You\'re starting Module 10: a list finds data by position; a dictionary, by name. Like an address book.',
  celebration: 'You now know how to use dictionaries: looking up by key, going through them and counting with them, a technique you\'ll use all the time.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'crear', title: 'Looking up by name, not by position', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'A **dictionary** stores **key → value** pairs. Instead of `list[2]`, you reach things with the key: `ages["Ana"]`. It\'s written in curly brackets:' },
        { type: 'code', run: true, code: 'ages = {"Ana": 19, "Luis": 22, "Eva": 20}\nprint(ages["Luis"])\nprint(len(ages))\nprint(ages)' },
        {
          type: 'five', items: {
            'Key': 'What you use to look things up. Usually a text or a number, and it isn\'t repeated.',
            'Value': 'What you store under that key. It can be anything, even a list.',
            'Order': 'The order in which the keys were added is kept.',
          },
        },
        {
          type: 'check', id: 'm10d-acceso', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'prices = {"bread": 1.2, "milk": 0.9, "coffee": 4.5}\nprint(prices["coffee"] - prices["bread"])', answer: '3.3',
          explain: '4.5 − 1.2 = 3.3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Adding, changing and deleting', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'Assigning to a **new** key adds it; assigning to a key that **already exists** replaces its value. `del` deletes it.' },
        { type: 'code', run: true, code: 'stock = {"apples": 10}\nstock["pears"] = 4        # new\nstock["apples"] -= 3      # change\nprint(stock)\ndel stock["pears"]\nprint(stock)' },
        {
          type: 'check', id: 'm10d-modificar', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'd = {"a": 1}\nd["b"] = 2\nd["a"] = 5\nprint(d)', answer: "{'a': 5, 'b': 2}",
          explain: '"b" is added; "a" already existed, so its value becomes 5 (and it keeps its position).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'keyerror', title: 'Keys that don\'t exist', concepts: ['diccionarios', 'errores'],
      blocks: [
        { type: 'p', text: 'Asking for a key that doesn\'t exist produces a **KeyError**. Two ways to avoid it:' },
        { type: 'code', run: true, code: 'phones = {"Ana": "600111222"}\nprint("Luis" in phones)                 # does the key exist?\nprint(phones.get("Luis"))               # None if it doesn\'t\nprint(phones.get("Luis", "unknown"))    # or the value you choose\nprint(phones["Luis"])                   # KeyError' },
        { type: 'callout', tone: 'info', title: 'in looks at the keys', text: '`"Ana" in phones` asks about the **keys**, not the values. To search the values: `"600111222" in phones.values()`.' },
        {
          type: 'check', id: 'm10d-get', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'marks = {"Ana": 8}\nprint(marks.get("Ana", 0), marks.get("Leo", 0))', answer: '8 0',
          explain: '"Ana" exists: 8. "Leo" doesn\'t: get returns the default value, 0.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'recorrer', title: 'Going through a dictionary', concepts: ['diccionarios', 'bucles'],
      blocks: [
        { type: 'p', text: '`for key in d` goes through the keys. To go through the values, `d.values()`; for both at once, `d.items()`:' },
        { type: 'code', run: true, code: 'marks = {"Ana": 8, "Luis": 6.5, "Eva": 9}\nfor name in marks:\n    print(name)\nprint(sum(marks.values()) / len(marks))\nfor name, mark in marks.items():\n    print(f"{name}: {mark}")' },
        {
          type: 'check', id: 'm10d-items', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'd = {"x": 3, "y": 5}\ntotal = 0\nfor k, v in d.items():\n    total += v\nprint(total)', answer: '8',
          explain: 'The values are added up: 3 + 5.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'contar', title: 'Counting with a dictionary', concepts: ['diccionarios', 'bucles'],
      blocks: [
        { type: 'p', text: 'The star use: counting how many times each thing appears. Each item is a key and its value, the counter. `get(x, 0)` handles the first time it appears:' },
        { type: 'code', run: true, code: 'votes = ["yes", "no", "yes", "yes", "abstain", "no"]\ncount = {}\nfor v in votes:\n    count[v] = count.get(v, 0) + 1\nprint(count)' },
        { type: 'p', text: 'Watch how the dictionary grows step by step:' },
        { type: 'trace', code: 'count = {}\nfor letter in "ana":\n    count[letter] = count.get(letter, 0) + 1\nprint(count)' },
        {
          type: 'check', id: 'm10d-contar', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'c = {}\nfor x in [2, 3, 2, 2]:\n    c[x] = c.get(x, 0) + 1\nprint(c)', answer: '{2: 3, 3: 1}',
          explain: 'The 2 appears three times and the 3, once.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'dic-predict' },
    { id: 'a2', activity: 'dic-complete' },
    { id: 'a3', activity: 'dic-fix' },
    { id: 'a4', activity: 'dic-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A dictionary stores key → value pairs: `{"Ana": 19}`. You reach them with `d[key]`.',
    'Assigning to a new key adds it; to an existing one, changes it. `del d[key]` deletes it.',
    'A missing key gives **KeyError**: check it with `in` or use `d.get(key, default)`.',
    'Go through keys with `for k in d`, values with `.values()` and pairs with `.items()`.',
    'Counting: `count[x] = count.get(x, 0) + 1`.',
  ],
};

export const ACTIVITIES_DICCIONARIOS = {
  'dic-predict': {
    id: 'dic-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The inventory', difficulty: 2, xp: 10, concepts: ['diccionarios'],
    prompt: 'An inventory that changes during the day. **What will it show?**',
    code: 'inventory = {"pencils": 20, "rubbers": 5}\ninventory["pencils"] -= 8\ninventory["rulers"] = 3\nprint(inventory.get("rubbers", 0), inventory.get("scissors", 0), len(inventory))',
    expectedOutput: '5 0 3',
    options: [
      { text: '5 0 3', correct: true },
      { text: '5 None 3', concept: 'diccionarios', why: 'get with a second argument returns that value (0) when the key doesn\'t exist.' },
      { text: '5 0 2', concept: 'diccionarios', why: '"rulers" is a new key: it\'s added and now there are three.' },
      { text: 'A KeyError for "scissors"', concept: 'diccionarios', why: 'get never gives a KeyError: that\'s exactly what it\'s for.' },
    ],
    explain: ['pencils goes down to 12 and rulers is added.', 'get("rubbers", 0) → 5; get("scissors", 0) → 0.', 'Keys: pencils, rubbers and rulers → 3.'],
  },
  'dic-complete': {
    id: 'dic-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The address book', difficulty: 1, xp: 15, concepts: ['diccionarios'],
    statement: 'Complete `look_up(book, name)` so it returns that person\'s phone number, or `"Not in the address book"` if they don\'t exist, **without giving an error**.',
    expected: '600111222\nNot in the address book',
    starter: 'def look_up(book, name):\n    return book.___(name, ___)\n\nbook = {"Ana": "600111222", "Luis": "611333444"}\nprint(look_up(book, "Ana"))\nprint(look_up(book, "Eva"))',
    spec: {
      blanks: true,
      functions: [{ name: 'look_up', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['600111222', 'Not in the address book'] },
        { label: 'Empty address book', call: 'print(look_up({}, "Ana"))', out_lines: ['Not in the address book'] },
      ],
      logic_msg: 'If the person isn\'t there, the function must return exactly "Not in the address book".',
    },
    hints: [
      { level: 'Orientation', text: 'A method that looks up a key and accepts a default value.' },
      { level: 'Reasoning', text: 'get(key, default) returns the value if the key exists, and the default if not.' },
      { level: 'Pseudocode', text: 'return the value of name in book, or "Not in the address book"', pre: true },
      { level: 'Technical help', text: '`book.get(name, "Not in the address book")`.' },
    ],
    solution: {
      code: 'def look_up(book, name):\n    return book.get(name, "Not in the address book")\n\nbook = {"Ana": "600111222", "Luis": "611333444"}\nprint(look_up(book, "Ana"))\nprint(look_up(book, "Eva"))',
      explanation: 'get solves in one line what would need an if with in: if the key exists it returns its value; if not, the default value.',
    },
    reference: ['def look_up(book, name):\n    return book.get(name, "Not in the address book")\n\nbook = {"Ana": "600111222", "Luis": "611333444"}\nprint(look_up(book, "Ana"))\nprint(look_up(book, "Eva"))'],
    wrongs: [
      { code: 'def look_up(book, name):\n    return book.___(name, ___)\n\nbook = {"Ana": "600111222"}\nprint(look_up(book, "Ana"))', category: 'incompleto' },
      { code: 'def look_up(book, name):\n    return book[name]\n\nbook = {"Ana": "600111222", "Luis": "611333444"}\nprint(look_up(book, "Ana"))\nprint(look_up(book, "Eva"))', category: 'ejecucion' },
    ],
  },
  'dic-fix': {
    id: 'dic-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The count that fails', difficulty: 2, xp: 20, concepts: ['diccionarios', 'errores'],
    statement: '`count_colours(items)` should return how many times each colour appears, but it gives a **KeyError** as soon as it finds a colour for the first time. Fix it.',
    expected: "{'red': 2, 'blue': 1}",
    starter: 'def count_colours(items):\n    count = {}\n    for colour in items:\n        count[colour] = count[colour] + 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))',
    spec: {
      functions: [{ name: 'count_colours', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ["{'red': 2, 'blue': 1}"] },
        { label: 'Empty list', call: 'print(count_colours([]))', out_lines: ['{}'] },
        { label: 'A single colour', call: 'print(count_colours(["green"] * 3))', out_lines: ["{'green': 3}"] },
      ],
      logic_msg: 'Each colour must appear with the number of times it\'s in the list.',
    },
    hints: [
      { level: 'Orientation', text: 'The first time "red" appears, does the key "red" already exist in the dictionary?' },
      { level: 'Reasoning', text: 'You need a default value for when the key doesn\'t exist yet. Which method allows that?' },
      { level: 'Pseudocode', text: 'count[colour] ← (current value or 0 if it doesn\'t exist) + 1', pre: true },
      { level: 'Technical help', text: '`count[colour] = count.get(colour, 0) + 1`.' },
    ],
    solution: {
      code: 'def count_colours(items):\n    count = {}\n    for colour in items:\n        count[colour] = count.get(colour, 0) + 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))',
      explanation: 'The first time a colour appears, its key doesn\'t exist: `count[colour]` gives KeyError. `get(colour, 0)` returns 0 in that case, and the stored value from then on.',
    },
    reference: [
      'def count_colours(items):\n    count = {}\n    for colour in items:\n        count[colour] = count.get(colour, 0) + 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))',
      'def count_colours(items):\n    count = {}\n    for colour in items:\n        if colour in count:\n            count[colour] += 1\n        else:\n            count[colour] = 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))',
    ],
    wrongs: [
      { code: 'def count_colours(items):\n    count = {}\n    for colour in items:\n        count[colour] = count[colour] + 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))', category: 'ejecucion' },
      { code: 'def count_colours(items):\n    count = {}\n    for colour in items:\n        count[colour] = 1\n    return count\n\nprint(count_colours(["red", "blue", "red"]))', category: 'logica' },
    ],
  },
  'dic-build': {
    id: 'dic-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The most frequent letter', difficulty: 3, xp: 30, concepts: ['diccionarios', 'busqueda'],
    unlock: { any: ['dic-predict', 'dic-complete', 'dic-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `most_frequent(text)` that returns the **letter** that appears most often in the text (ignoring spaces). If there\'s a tie, the one that appears **first** in the text.\n\nExamples: `most_frequent("banana")` → "a"; `most_frequent("hello world")` → "l".',
    expected: 'a',
    plan: [
      {
        q: 'Which two steps do you need?',
        options: [
          { text: 'Count each letter with a dictionary and then look for the one with the highest count', correct: true },
          { text: 'Sort the text alphabetically', why: 'Sorting doesn\'t count: you need to know how many times each letter appears.' },
        ],
      },
      {
        q: 'To respect the tie rule («the one that appears first»), how do you compare?',
        options: [
          { text: 'You only change candidate if the count is strictly greater (>)', correct: true },
          { text: 'You change if it\'s greater or equal (>=)', why: 'With >= a later tied letter would replace the first one.' },
        ],
      },
    ],
    planScaffold: 'def most_frequent(text):\n    # 1. Count each letter (without spaces)\n    # 2. Look for the one with the highest count\n\n\nprint(most_frequent("banana"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'most_frequent', params: 1 }],
      cases: [
        { label: '"banana"', call: 'print(most_frequent("banana"))', out_lines: ['a'] },
        { label: '"hello world"', call: 'print(most_frequent("hello world"))', out_lines: ['l'] },
        { label: 'Tie: "abab"', call: 'print(most_frequent("abab"))', out_lines: ['a'] },
        { label: 'Spaces: "a  b  b"', call: 'print(most_frequent("a  b  b"))', out_lines: ['b'] },
      ],
      misconceptions: [
        { out_lines: ['b'], title: 'Ties', msg: 'With a tie the first letter must win. Only change candidate if the count is strictly greater (`>`).' },
        { out_lines: [''], title: 'Watch out for spaces', msg: 'Spaces don\'t count: skip them when counting (for example, `if letter != " ":`).' },
      ],
      logic_msg: 'Check with "hello world": the «l» appears three times, more than any other letter.',
    },
    hints: [
      { level: 'Orientation', text: 'Two loops: one to count, another to look for the maximum.' },
      { level: 'Reasoning', text: 'Counting: the get(x, 0) + 1 pattern, skipping spaces. Looking: keep the best so far and change it only if you find a higher count. Since the dictionary keeps the order of appearance, ties sort themselves out.' },
      { level: 'Pseudocode', text: 'count ← {}\nfor each letter (that isn\'t a space): add 1\nbest ← None\nfor each letter, times in count:\n    if best is None or times > count[best]: best ← letter\nreturn best', pre: true },
      { level: 'Technical help', text: '`for letter, times in count.items():` and `if best is None or times > count[best]:`.' },
    ],
    solution: {
      code: 'def most_frequent(text):\n    """Return the most frequent letter (the first one if there\'s a tie)."""\n    count = {}\n    for letter in text:\n        if letter != " ":\n            count[letter] = count.get(letter, 0) + 1\n    best = None\n    for letter, times in count.items():\n        if best is None or times > count[best]:\n            best = letter\n    return best\n\nprint(most_frequent("banana"))',
      explanation: 'First you count (the counter-dictionary pattern) and then you look for the maximum (the «best so far» pattern). The dictionary keeps the order of appearance, so with `>` the first tied letter wins.',
    },
    reference: [
      'def most_frequent(text):\n    count = {}\n    for letter in text:\n        if letter != " ":\n            count[letter] = count.get(letter, 0) + 1\n    best = None\n    for letter, times in count.items():\n        if best is None or times > count[best]:\n            best = letter\n    return best',
    ],
    wrongs: [
      { code: 'def most_frequent(text):\n    count = {}\n    for letter in text:\n        if letter != " ":\n            count[letter] = count.get(letter, 0) + 1\n    best = None\n    for letter, times in count.items():\n        if best is None or times >= count[best]:\n            best = letter\n    return best', category: 'comprension' },
      { code: 'def most_frequent(text):\n    return max(text)', category: 'logica' },
    ],
  },
};
