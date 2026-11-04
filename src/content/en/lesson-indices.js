// Lesson 8.1 · Indexes and slices (English translation of src/content/lesson-indices.js).

const TOPIC = 'Strings';

export const LESSON_INDICES = {
  id: 'indices',
  moduleId: 'm8',
  code: '8.1',
  title: 'Indexes and slices',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Reach a character by its position, from the start or from the end',
    'Avoid IndexError when going past the end of the text',
    'Extract parts of a text with slices [start:stop:step]',
    'Explain why a text can\'t be changed and how to create a new one',
    'Go through a text by position with range(len(text))',
  ],
  prerequisites: ['Module 7 «Loops, iteration and search»'],
  teaser: 'You\'re starting Module 8: a text is a row of numbered characters. Today you learn to pick out exactly the ones you need.',
  celebration: 'You now handle texts from the inside: positions, slices and the golden rule that they can\'t be changed.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'indice', title: 'Each character has a position', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'A text is a **sequence** of characters. Each one has an **index** (its position), which starts at **0**. You reach it with square brackets:' },
        { type: 'code', run: true, code: 'word = "Python"\nprint(word[0])    # first\nprint(word[3])\nprint(word[-1])   # last\nprint(word[-2])   # second to last\nprint(len(word))' },
        {
          type: 'five', items: {
            'From the start': 'P=0, y=1, t=2, h=3, o=4, n=5',
            'From the end': 'n=−1, o=−2, h=−3, t=−4, y=−5, P=−6',
            'The last one': 'Always `text[-1]` or `text[len(text) - 1]`.',
          },
        },
        {
          type: 'check', id: 'm8i-indice', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 's = "LunaPy"\nprint(s[2], s[-3])', answer: 'n a',
          explain: 'L=0, u=1, n=2. From the end: y=−1, P=−2, a=−3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'indexerror', title: 'Going past the end of the text', concepts: ['cadenas', 'errores'],
      blocks: [
        { type: 'p', text: 'If you ask for a position that doesn\'t exist, Python stops with an **IndexError**. The most common case: using `len(text)` as an index.' },
        { type: 'code', run: true, code: 'word = "sun"\nprint(len(word))\nprint(word[len(word)])' },
        { type: 'callout', tone: 'warn', title: 'The last index is len − 1', text: '"sun" has 3 characters, in positions 0, 1 and 2. Position 3 doesn\'t exist.' },
        {
          type: 'check', id: 'm8i-error', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'name = "Ana"\nprint(name[3])', expectError: 'IndexError',
          options: [
            { text: 'IndexError: position 3 doesn\'t exist', correct: true },
            { text: 'It shows a', why: '"Ana" has positions 0, 1 and 2: the final «a» is name[2].' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'porciones', title: 'Slices', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'A **slice** extracts a piece: `text[start:stop]`, from the start **included** to the stop **excluded**, just like range. If you leave out an end, it goes all the way to the edge.' },
        { type: 'code', run: true, code: 's = "Programming"\nprint(s[0:3])\nprint(s[:7])\nprint(s[7:])\nprint(s[-4:])\nprint(s[::2])    # 2 at a time\nprint(s[::-1])   # backwards' },
        {
          type: 'check', id: 'm8i-porcion', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 's = "Barcelona"\nprint(s[3:6], s[:3], s[-4:])', answer: 'cel Bar lona',
          explain: 'Positions 3, 4 and 5: «cel». The first three: «Bar». The last four: «lona».',
        },
        {
          type: 'check', id: 'm8i-reves', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 'print("stressed"[::-1])', answer: 'desserts',
          explain: 'With step −1 the slice goes through the text from back to front.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'inmutable', title: 'Texts can\'t be changed', concepts: ['cadenas', 'errores'],
      blocks: [
        { type: 'p', text: 'Texts are **immutable**: you can\'t change a character. To «change» one, you build a **new** text with slices and store it:' },
        { type: 'code', run: true, title: 'This fails', code: 'greeting = "hello"\ngreeting[0] = "H"' },
        { type: 'code', run: true, title: 'This works', code: 'greeting = "hello"\ngreeting = "H" + greeting[1:]\nprint(greeting)' },
        {
          type: 'check', id: 'm8i-inmutable', concept: 'cadenas', mode: 'choice',
          question: 'What happens?', code: 'word = "cat"\nword[0] = "b"', expectError: 'TypeError',
          options: [
            { text: 'TypeError: a text doesn\'t allow changing characters', correct: true },
            { text: 'word becomes "bat"', why: 'Texts are immutable. To get "bat": `word = "b" + word[1:]`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'recorrer', title: 'Going through by position', concepts: ['cadenas', 'bucles'],
      blocks: [
        { type: 'p', text: 'With `for letter in text` you go through the characters. If you also need the **position**, go through the indexes with `range(len(text))`:' },
        { type: 'code', run: true, code: 'text = "home"\nfor i in range(len(text)):\n    print(i, text[i])' },
        { type: 'p', text: 'It\'s useful for comparing each character with the one next to it or with the one at the opposite end:' },
        { type: 'code', run: true, code: 'text = "letter"\nfor i in range(len(text) - 1):\n    if text[i] == text[i + 1]:\n        print("Double letter at position", i)' },
        {
          type: 'check', id: 'm8i-rango', concept: 'cadenas', mode: 'text',
          question: 'Predict (on one line):', code: 's = "hello"\nfor i in range(len(s)):\n    print(s[len(s) - 1 - i], end="")', answer: 'olleh',
          explain: 'len(s) − 1 − i goes through positions 4, 3, 2, 1 and 0: the text backwards.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'idx-predict' },
    { id: 'a2', activity: 'idx-complete' },
    { id: 'a3', activity: 'idx-fix' },
    { id: 'a4', activity: 'idx-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`text[i]` gives the character in position i; the first is 0 and the last, −1 (or len − 1).',
    'A position that doesn\'t exist produces an **IndexError**.',
    '`text[start:stop:step]` gives a slice: start included, stop excluded. `[::-1]` turns it round.',
    'Texts are **immutable**: to change them, create a new one with slices.',
    '`for i in range(len(text))` goes through the positions when you need the index.',
  ],
};

export const ACTIVITIES_INDICES = {
  'idx-predict': {
    id: 'idx-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The secret code', difficulty: 2, xp: 10, concepts: ['cadenas'],
    prompt: 'Indexes and slices on the same text. **What will it show?**',
    code: 'key = "BLACKBOARD"\nprint(key[0] + key[-1], key[2:5], key[::3])',
    expectedOutput: 'BD ACK BCOD',
    options: [
      { text: 'BD ACK BCOD', correct: true },
      { text: 'BD ACKB BCOD', concept: 'cadenas', why: 'The stop of the slice isn\'t included: [2:5] is positions 2, 3 and 4.' },
      { text: 'BR ACK BCOD', concept: 'cadenas', why: '[-1] is the last character: the D.' },
      { text: 'BD LACK BKA', concept: 'cadenas', why: '[::3] starts at position 0 and jumps 3 at a time: 0, 3, 6, 9.' },
    ],
    explain: ['key[0] + key[-1] → "B" + "D".', 'key[2:5] → positions 2, 3, 4: A, C, K.', 'key[::3] → positions 0, 3, 6, 9: B, C, O, D.'],
  },
  'idx-complete': {
    id: 'idx-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Hiding the card', difficulty: 2, xp: 15, concepts: ['cadenas'],
    statement: 'Complete `hide(number)` to show only the **last 4** characters of a card number and replace the rest with asterisks, **as many as there are hidden characters**.',
    expected: '************3456',
    starter: 'def hide(number):\n    visible = number[___:]\n    hidden = "*" * (len(number) - ___)\n    return hidden + ___\n\nprint(hide("1234567890123456"))',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'hide', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['************3456'] },
        { label: 'hide("98765432")', call: 'print(hide("98765432"))', out_lines: ['****5432'] },
        { label: 'hide("1234")', call: 'print(hide("1234"))', out_lines: ['1234'] },
      ],
      misconceptions: [
        { out_lines: ['************456'], title: 'Only three visible', msg: 'To keep the last 4 characters, the slice starts at -4: `number[-4:]`.' },
      ],
      logic_msg: 'Check with "98765432": 4 asterisks and 5432 should be shown.',
    },
    hints: [
      { level: 'Orientation', text: 'The first gap is where the slice of the last 4 starts; the second, how many stay visible; the third, what\'s joined to the asterisks.' },
      { level: 'Reasoning', text: 'The last 4 start at position −4. The hidden ones are all except those 4.' },
      { level: 'Pseudocode', text: 'visible ← the last 4 characters\nhidden ← "*" repeated (length − 4) times\nreturn hidden + visible', pre: true },
      { level: 'Technical help', text: '`number[-4:]`, `len(number) - 4` and `return hidden + visible`.' },
    ],
    solution: {
      code: 'def hide(number):\n    visible = number[-4:]\n    hidden = "*" * (len(number) - 4)\n    return hidden + visible\n\nprint(hide("1234567890123456"))',
      explanation: 'Negative indexes let you take the last characters without knowing how long the text is. The function works for numbers of any length.',
    },
    reference: ['def hide(number):\n    visible = number[-4:]\n    hidden = "*" * (len(number) - 4)\n    return hidden + visible\n\nprint(hide("1234567890123456"))'],
    wrongs: [
      { code: 'def hide(number):\n    visible = number[___:]\n    hidden = "*" * (len(number) - ___)\n    return hidden + ___', category: 'incompleto' },
      { code: 'def hide(number):\n    visible = number[-4:]\n    hidden = "*" * 12\n    return hidden + visible\n\nprint(hide("1234567890123456"))', category: 'logica' },
    ],
  },
  'idx-fix': {
    id: 'idx-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'First and last', difficulty: 2, xp: 20, concepts: ['cadenas', 'errores'],
    statement: '`ends(word)` should return the first and last letters joined together, but it gives an **IndexError**. Fix it so it works with words of any length.',
    expected: 'Pn\nsn',
    starter: 'def ends(word):\n    return word[1] + word[len(word)]\n\nprint(ends("Python"))\nprint(ends("sun"))',
    spec: {
      functions: [{ name: 'ends', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['Pn', 'sn'] },
        { label: 'ends("ok")', call: 'print(ends("ok"))', out_lines: ['ok'] },
        { label: 'ends("a")', call: 'print(ends("a"))', out_lines: ['aa'] },
      ],
      misconceptions: [
        { out_lines: ['yn', 'un'], title: 'The first is 0', msg: 'Indexes start at 0: the first letter is `word[0]`.' },
      ],
      logic_msg: 'Check with "Python": the first letter is P and the last, n.',
    },
    hints: [
      { level: 'Orientation', text: 'There are two index mistakes: one gives an error and the other picks the wrong letter.' },
      { level: 'Reasoning', text: 'What position is the first letter in? And the last, if the text is len(word) long?' },
      { level: 'Pseudocode', text: 'return character at position 0 + last character', pre: true },
      { level: 'Technical help', text: '`word[0] + word[-1]` (or `word[len(word) - 1]`).' },
    ],
    solution: {
      code: 'def ends(word):\n    return word[0] + word[-1]\n\nprint(ends("Python"))\nprint(ends("sun"))',
      explanation: 'The first position is 0 and the last, −1 (the same as len − 1). `word[len(word)]` is always outside the text.',
    },
    reference: [
      'def ends(word):\n    return word[0] + word[-1]\n\nprint(ends("Python"))\nprint(ends("sun"))',
      'def ends(word):\n    return word[0] + word[len(word) - 1]\n\nprint(ends("Python"))\nprint(ends("sun"))',
    ],
    wrongs: [
      { code: 'def ends(word):\n    return word[1] + word[len(word)]\n\nprint(ends("Python"))\nprint(ends("sun"))', category: 'ejecucion' },
      { code: 'def ends(word):\n    return word[1] + word[-1]\n\nprint(ends("Python"))\nprint(ends("sun"))', category: 'comprension' },
    ],
  },
  'idx-build': {
    id: 'idx-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Is it a palindrome?', difficulty: 3, xp: 30, concepts: ['cadenas', 'booleanos'],
    unlock: { any: ['idx-predict', 'idx-complete', 'idx-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'A **palindrome** reads the same forwards and backwards, like «racecar» or «level». Define `is_palindrome(word)` that returns True if the word is one.\n\nThe words will arrive in lower case and without spaces.',
    expected: 'True',
    plan: [
      {
        q: 'How do you get the word backwards?',
        options: [
          { text: 'word[::-1]', correct: true },
          { text: 'word[-1]', why: 'That\'s only the last letter.' },
          { text: 'word[1:]', why: 'That removes the first letter, it doesn\'t turn it round.' },
        ],
      },
      {
        q: 'What does the function return?',
        options: [
          { text: 'The comparison between the word and its backwards version', correct: true },
          { text: 'The word backwards', why: 'True or False is asked for: compare the word with its backwards version.' },
        ],
      },
    ],
    planScaffold: 'def is_palindrome(word):\n    # compare the word with its backwards version\n\n\nprint(is_palindrome("racecar"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'is_palindrome', params: 1 }],
      cases: [
        { label: 'is_palindrome("racecar")', call: 'print(is_palindrome("racecar"))', out_lines: ['True'] },
        { label: 'is_palindrome("python")', call: 'print(is_palindrome("python"))', out_lines: ['False'] },
        { label: 'is_palindrome("level")', call: 'print(is_palindrome("level"))', out_lines: ['True'] },
        { label: 'is_palindrome("ab")', call: 'print(is_palindrome("ab"))', out_lines: ['False'] },
        { label: 'is_palindrome("a")', call: 'print(is_palindrome("a"))', out_lines: ['True'] },
        { label: 'is_palindrome("arena")', call: 'print(is_palindrome("arena"))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['racecar'], title: 'It returns the text', msg: 'The function has to return True or False: compare the word with its backwards version.' },
        { out_lines: ['True', 'None'], title: 'It shows, but doesn\'t return', msg: 'Use return instead of print.' },
      ],
      logic_msg: 'Check with "ab": backwards it\'s "ba", so it must give False.',
    },
    hints: [
      { level: 'Orientation', text: 'One line is enough: compare the word with its backwards version.' },
      { level: 'Reasoning', text: 'Which slice turns a text round? Which operator compares two texts?' },
      { level: 'Pseudocode', text: 'return word == word backwards', pre: true },
      { level: 'Technical help', text: '`return word == word[::-1]`.' },
    ],
    solution: {
      code: 'def is_palindrome(word):\n    """Return True if word reads the same backwards."""\n    return word == word[::-1]\n\nprint(is_palindrome("racecar"))',
      explanation: '`word[::-1]` creates the word backwards and `==` compares it with the original. The comparison already is the boolean you need to return.',
    },
    reference: [
      'def is_palindrome(word):\n    return word == word[::-1]',
      'def is_palindrome(word):\n    for i in range(len(word) // 2):\n        if word[i] != word[-1 - i]:\n            return False\n    return True',
    ],
    wrongs: [
      { code: 'def is_palindrome(word):\n    return word[::-1]', category: 'comprension' },
      { code: 'def is_palindrome(word):\n    return word[0] == word[-1]', category: 'logica' },
    ],
  },
};
