// Lesson 7.3 · Search patterns (English translation of src/content/lesson-busqueda.js).

const TOPIC = 'Loops';

export const LESSON_BUSQUEDA = {
  id: 'busqueda',
  moduleId: 'm7',
  code: '7.3',
  title: 'Search patterns',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Check whether a text contains another with the in operator',
    'Look for the first item that meets a condition and leave as soon as it appears',
    'Decide «yes or no» by going through every case (as in is_prime)',
    'Find the maximum or minimum with a loop',
    'Avoid the mistake of returning inside the loop\'s else',
  ],
  prerequisites: ['Lesson 7.2 «while loops»'],
  teaser: 'Searching is one of the most common jobs a program does: is it there?, where?, which is the biggest? Today you learn the patterns that solve it.',
  celebration: 'You\'ve completed Module 7: you now know how to repeat with for and while and search for whatever you need in ranges and texts.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'in', title: 'The in operator', concepts: ['busqueda'],
      blocks: [
        { type: 'p', text: '`a in b` asks whether the text `a` appears inside `b`. It returns True or False:' },
        { type: 'code', run: true, code: 'print("a" in "banana")\nprint("nan" in "banana")\nprint("x" in "banana")\nprint("A" in "banana")   # case-sensitive' },
        { type: 'p', text: 'It\'s perfect for asking whether a letter belongs to a group:' },
        { type: 'code', run: true, code: 'def is_vowel(letter):\n    return letter in "aeiou"\n\nprint(is_vowel("e"), is_vowel("z"))' },
        {
          type: 'check', id: 'm7b-in', concept: 'busqueda', mode: 'text',
          question: 'Predict:', code: 'print("py" in "Python", "Py" in "Python")', answer: 'False True',
          explain: '"py" in lower case doesn\'t appear; "Py" does, at the start.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'primero', title: 'Finding the first one and leaving', concepts: ['busqueda', 'retorno'],
      blocks: [
        { type: 'p', text: 'To find the **first** value that meets something, go through them and **return as soon as you find it**. If the loop ends without finding it, return a value that says so (like `None` or `-1`).' },
        { type: 'code', run: true, code: 'def first_divisor(n):\n    """Return the smallest divisor of n greater than 1."""\n    for d in range(2, n + 1):\n        if n % d == 0:\n            return d      # found: leave now\n    return None          # only if n < 2\n\nprint(first_divisor(35), first_divisor(13))' },
        { type: 'p', text: 'To know **where** a character is in a text, keep count of the position:' },
        { type: 'code', run: true, code: 'def position(text, wanted):\n    pos = 0\n    for letter in text:\n        if letter == wanted:\n            return pos\n        pos += 1\n    return -1\n\nprint(position("Python", "h"), position("Python", "z"))', caption: 'Positions start at 0, just like range. -1 means «it isn\'t there».' },
        {
          type: 'check', id: 'm7b-primero', concept: 'busqueda', mode: 'text',
          question: 'Predict:', code: 'def first_multiple(start, of):\n    n = start\n    while n % of != 0:\n        n += 1\n    return n\n\nprint(first_multiple(20, 7))', answer: '21',
          explain: '20 isn\'t a multiple of 7; 21 is: the loop stops there.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'todos', title: 'Checking every case', concepts: ['busqueda', 'booleanos'],
      blocks: [
        { type: 'p', text: 'To answer «no divisors?» you have to look at **all** the candidates. If one fails, you can return False straight away; but True can only be returned **after the loop**, once you\'ve checked them all.' },
        { type: 'code', run: true, code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False   # one divisor is enough to say no\n    return True            # none of them was\n\nprint(is_prime(13), is_prime(15), is_prime(2))' },
        { type: 'callout', tone: 'warn', title: 'The most typical mistake', text: 'Putting `else: return True` **inside** the loop makes the function decide by looking only at the first candidate. With 15: 15 % 2 isn\'t 0 → it would return True, and 15 isn\'t prime!' },
        {
          type: 'check', id: 'm7b-else', concept: 'busqueda', mode: 'choice',
          question: 'What does this version return with 9?', code: 'def is_prime(n):\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n\nprint(is_prime(9))', expectOutput: 'True',
          options: [
            { text: 'True (wrong: 9 = 3 × 3!)', correct: true },
            { text: 'False', why: 'It only gets to look at d = 2: 9 % 2 isn\'t 0, it goes into the else and returns True without trying 3.' },
          ],
          explain: 'The return True has to go outside the loop, once all the divisors have been tried.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'maximo', title: 'The largest (or the smallest)', concepts: ['busqueda', 'bucles'],
      blocks: [
        { type: 'p', text: 'To find the maximum, keep the **best so far** and update it when a better one appears:' },
        { type: 'code', run: true, code: '# Which number from 1 to 30 has the most divisors?\ndef num_divisors(n):\n    count = 0\n    for d in range(1, n + 1):\n        if n % d == 0:\n            count += 1\n    return count\n\nbest = 1\nfor n in range(1, 31):\n    if num_divisors(n) > num_divisors(best):\n        best = n\nprint(best, "has", num_divisors(best), "divisors")' },
        {
          type: 'check', id: 'm7b-max', concept: 'busqueda', mode: 'text',
          question: 'Predict: which letter of the text comes latest in the alphabet?', code: 'largest = "a"\nfor letter in "python":\n    if letter > largest:\n        largest = letter\nprint(largest)', answer: 'y',
          explain: 'Each letter is compared with the largest found so far: p, then t, then y. None of the following ones beats y.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'bus-predict' },
    { id: 'a2', activity: 'bus-complete' },
    { id: 'a3', activity: 'bus-fix' },
    { id: 'a4', activity: 'bus-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`a in b` checks whether a text appears inside another (case-sensitive).',
    'Finding the first: go through and return as soon as you find it; after the loop, return «not found» (None or -1).',
    'To claim something about **every** case, the `return True` goes **after** the loop.',
    'Don\'t put `else: return …` inside the loop: it would decide by looking only at the first case.',
    'Maximum: keep the best so far and update it when a better one appears.',
  ],
};

export const ACTIVITIES_BUSQUEDA = {
  'bus-predict': {
    id: 'bus-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Looking for the first vowel', difficulty: 2, xp: 10, concepts: ['busqueda'],
    prompt: 'The function returns as soon as it finds what it\'s looking for. **What will it show?**',
    code: 'def first_vowel(text):\n    for letter in text:\n        if letter in "aeiou":\n            return letter\n    return "-"\n\nprint(first_vowel("Python"), first_vowel("spring"), first_vowel("xyz"))',
    expectedOutput: 'o i -',
    options: [
      { text: 'o i -', correct: true },
      { text: 'o o -', concept: 'busqueda', why: 'In «spring» the first vowel is i: the function returns as soon as it finds it.' },
      { text: 'y i -', concept: 'busqueda', why: '«y» isn\'t in "aeiou".' },
      { text: 'o i None', concept: 'busqueda', why: 'If it doesn\'t find any, the loop ends and return "-" runs.' },
    ],
    explain: ['Python: P, y, t, h aren\'t vowels; o is → "o".', 'spring: s, p, r no; i yes → "i".', 'xyz: none → when the loop ends, "-".'],
  },
  'bus-complete': {
    id: 'bus-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Counting letters from a group', difficulty: 2, xp: 15, concepts: ['busqueda', 'bucles'],
    statement: 'Complete `count_vowels(text)` so it returns how many vowels (lower case) a text has.',
    expected: '5\n0',
    starter: 'def count_vowels(text):\n    count = 0\n    for letter in ___:\n        if letter ___ "aeiou":\n            count += 1\n    return ___\n\nprint(count_vowels("education"))\nprint(count_vowels("xyz"))',
    spec: {
      blanks: true,
      functions: [{ name: 'count_vowels', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['5', '0'] },
        { label: 'count_vowels("banana")', call: 'print(count_vowels("banana"))', out_lines: ['3'] },
        { label: 'count_vowels("")', call: 'print(count_vowels(""))', out_lines: ['0'] },
      ],
      logic_msg: 'Check with «banana»: it has 3 vowels (the three «a»s).',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps: what you go through, which operator asks if the letter is in the group and what\'s returned.' },
      { level: 'Reasoning', text: 'You go through the function\'s parameter. For «is it in?» there\'s a two-letter operator.' },
      { level: 'Pseudocode', text: 'for each letter of text:\n    if letter is in "aeiou": count + 1\nreturn count', pre: true },
      { level: 'Technical help', text: '`for letter in text:`, `if letter in "aeiou":` and `return count`.' },
    ],
    solution: {
      code: 'def count_vowels(text):\n    count = 0\n    for letter in text:\n        if letter in "aeiou":\n            count += 1\n    return count\n\nprint(count_vowels("education"))\nprint(count_vowels("xyz"))',
      explanation: 'It\'s the counter pattern: go through, check and add 1. «education» has all five vowels.',
    },
    reference: ['def count_vowels(text):\n    count = 0\n    for letter in text:\n        if letter in "aeiou":\n            count += 1\n    return count\n\nprint(count_vowels("education"))\nprint(count_vowels("xyz"))'],
    wrongs: [
      { code: 'def count_vowels(text):\n    count = 0\n    for letter in ___:\n        if letter ___ "aeiou":\n            count += 1\n    return ___', category: 'incompleto' },
      { code: 'def count_vowels(text):\n    count = 0\n    for letter in text:\n        if letter == "aeiou":\n            count += 1\n    return count\n\nprint(count_vowels("education"))\nprint(count_vowels("xyz"))', category: 'logica' },
    ],
  },
  'bus-fix': {
    id: 'bus-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The absent-minded prime detector', difficulty: 3, xp: 25, concepts: ['busqueda', 'errores'],
    statement: '`is_prime(n)` says that 9 and 15 are prime. **There\'s no Python error**: the bug is in where it decides the number is prime. Fix it.',
    expected: 'True\nFalse\nFalse\nTrue',
    starter: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n    return True\n\nprint(is_prime(7))\nprint(is_prime(9))\nprint(is_prime(15))\nprint(is_prime(2))',
    spec: {
      skip_tips: ['repeated_numbers'], // the 2 is part of the definition of a prime
      functions: [{ name: 'is_prime', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['True', 'False', 'False', 'True'] },
        { label: 'is_prime(97)', call: 'print(is_prime(97))', out_lines: ['True'] },
        { label: 'is_prime(91) (7 × 13)', call: 'print(is_prime(91))', out_lines: ['False'] },
        { label: 'is_prime(1)', call: 'print(is_prime(1))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'True', 'True', 'True'], title: 'It decides too early', msg: 'The `else: return True` is inside the loop: the function decides by looking only at the divisor 2. Remove that else: the return True is already after the loop.' },
      ],
      logic_msg: 'Check with 9: it has the divisor 3, so it must give False.',
    },
    hints: [
      { level: 'Orientation', text: 'Follow the loop with n = 9: what happens on the first lap (d = 2)?' },
      { level: 'Reasoning', text: 'To say a number is prime you have to have tried **every** divisor. Can that be decided inside the loop?' },
      { level: 'Pseudocode', text: 'for each d from 2 to n − 1:\n    if d divides n: return False\n(after the loop) return True', pre: true },
      { level: 'Technical help', text: 'Delete the `else:` and `return True` lines inside the loop. The final `return True` (outside the for) is already correct.' },
    ],
    solution: {
      code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(is_prime(7))\nprint(is_prime(9))\nprint(is_prime(15))\nprint(is_prime(2))',
      explanation: 'One divisor is enough to say «not prime», so that return can go inside. But «it is prime» is only known after trying them all: that return goes outside the loop.',
    },
    reference: ['def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(is_prime(7))\nprint(is_prime(9))\nprint(is_prime(15))\nprint(is_prime(2))'],
    wrongs: [
      { code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n        else:\n            return True\n    return True\n\nprint(is_prime(7))\nprint(is_prime(9))\nprint(is_prime(15))\nprint(is_prime(2))', category: 'comprension' },
      { code: 'def is_prime(n):\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nprint(is_prime(7))\nprint(is_prime(9))\nprint(is_prime(15))\nprint(is_prime(2))', category: 'logica' },
    ],
  },
  'bus-build': {
    id: 'bus-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The first prime after…', difficulty: 3, xp: 30, concepts: ['busqueda', 'composicion', 'bucles'],
    unlock: { any: ['bus-predict', 'bus-complete', 'bus-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `is_prime(n)` (as in the lesson) and `next_prime(n)`, which returns the **first prime number greater than n**, using `is_prime`.\n\nExamples: `next_prime(10)` → 11; `next_prime(13)` → 17; `next_prime(1)` → 2.',
    expected: '11',
    plan: [
      {
        q: 'Which kind of loop fits best in next_prime?',
        options: [
          { text: 'while: you don\'t know how many numbers you\'ll have to try', correct: true },
          { text: 'for i in range(10)', why: 'There can be more than 10 numbers between two primes: you don\'t know in advance how many to try.' },
        ],
      },
      {
        q: 'Where do you start trying?',
        options: [
          { text: 'At n + 1, because it has to be greater than n', correct: true },
          { text: 'At n', why: 'If n is already prime (like 13), you\'d return the same n, and a greater one is asked for.' },
        ],
      },
    ],
    planScaffold: 'def is_prime(n):\n    # ...\n\n\ndef next_prime(n):\n    # start at n + 1 and move on while it isn\'t prime\n\n\nprint(next_prime(10))\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'],
      functions: [{ name: 'is_prime', params: 1 }, { name: 'next_prime', params: 1 }],
      cases: [
        { label: 'next_prime(10)', call: 'print(next_prime(10))', out_lines: ['11'] },
        { label: 'next_prime(13)', call: 'print(next_prime(13))', out_lines: ['17'] },
        { label: 'next_prime(1)', call: 'print(next_prime(1))', out_lines: ['2'] },
        { label: 'next_prime(89)', call: 'print(next_prime(89))', out_lines: ['97'] },
        { label: 'is_prime(91)', call: 'print(is_prime(91))', out_lines: ['False'] },
      ],
      misconceptions: [
        { out_lines: ['13'], title: 'It has to be greater', msg: 'If n is already prime, the function returns it. Start trying at n + 1.' },
      ],
      rules: [{ type: 'must_call', name: 'is_prime', title: 'Reuse is_prime', msg: 'next_prime must use is_prime to check each candidate.' }],
      logic_msg: 'Check with 13: the next prime is 17 (14, 15 and 16 aren\'t).',
    },
    hints: [
      { level: 'Orientation', text: 'Two functions: is_prime (you already know it) and next_prime, which tries candidates one by one.' },
      { level: 'Reasoning', text: 'Start at n + 1 and, while the candidate isn\'t prime, add 1 to it. When you leave the loop, the candidate is the answer.' },
      { level: 'Pseudocode', text: 'candidate ← n + 1\nwhile not is_prime(candidate):\n    candidate ← candidate + 1\nreturn candidate', pre: true },
      { level: 'Technical help', text: '`while not is_prime(candidate):` inside next_prime.' },
    ],
    solution: {
      code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef next_prime(n):\n    """Return the first prime greater than n."""\n    candidate = n + 1\n    while not is_prime(candidate):\n        candidate += 1\n    return candidate\n\nprint(next_prime(10))',
      explanation: 'next_prime combines searching and checking: it tries candidates with while and hands the question «is it prime?» over to is_prime.',
    },
    reference: [
      'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef next_prime(n):\n    candidate = n + 1\n    while not is_prime(candidate):\n        candidate += 1\n    return candidate',
    ],
    wrongs: [
      { code: 'def is_prime(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\ndef next_prime(n):\n    candidate = n\n    while not is_prime(candidate):\n        candidate += 1\n    return candidate', category: 'comprension' },
      { code: 'def is_prime(n):\n    return n % 2 != 0\n\ndef next_prime(n):\n    candidate = n + 1\n    while not is_prime(candidate):\n        candidate += 1\n    return candidate', category: 'logica' },
    ],
  },
};
