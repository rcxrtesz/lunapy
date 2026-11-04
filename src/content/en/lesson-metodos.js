// Lesson 8.2 · String methods (English translation of src/content/lesson-metodos.js).

const TOPIC = 'Strings';

export const LESSON_METODOS = {
  id: 'metodos',
  moduleId: 'm8',
  code: '8.2',
  title: 'String methods',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Call methods with the text.method() notation',
    'Transform texts: upper, lower, title, strip and replace',
    'Search and count: find, count, startswith and endswith',
    'Remember that methods return a new text',
    'Split a text into words with split and join them with join',
  ],
  prerequisites: ['Lesson 8.1 «Indexes and slices»'],
  teaser: 'Texts come with built-in tools: changing to capitals, removing spaces, replacing, counting… Today you get to know them.',
  celebration: 'You now have a complete toolbox for working with texts: cleaning, searching, transforming and splitting.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: 'What is a method?', concepts: ['cadenas', 'funciones'],
      blocks: [
        { type: 'p', text: 'A **method** is a function that belongs to a data type. You call it with a dot after the value: `text.upper()`. It\'s like `len(text)`, but written the other way round: first the data, then the action.' },
        { type: 'code', run: true, code: 'name = "lucía garcía"\nprint(name.upper())\nprint(name.title())\nprint("HELLO".lower())' },
        {
          type: 'check', id: 'm8m-upper', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 'print("good morning".title())', answer: 'Good Morning',
          explain: 'title() capitalises the first letter of each word.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nuevo', title: 'Methods return a new text', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Since texts are immutable, a method **doesn\'t change** the original text: it returns a new one. If you want to keep the result, store it.' },
        { type: 'code', run: true, code: 'city = "madrid"\ncity.upper()          # worked out… and lost\nprint(city)\ncity = city.upper()  # now it\'s stored\nprint(city)' },
        {
          type: 'check', id: 'm8m-nuevo', concept: 'cadenas', mode: 'choice',
          question: 'What will it show?', code: 'x = "  hello  "\nx.strip()\nprint("[" + x + "]")', expectOutput: '[  hello  ]',
          options: [
            { text: '[  hello  ]', correct: true },
            { text: '[hello]', why: 'strip() returns a new text without spaces, but it hasn\'t been stored: x stays the same.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limpiar', title: 'Cleaning and transforming', concepts: ['cadenas'],
      blocks: [
        {
          type: 'five', items: {
            'strip()': 'Removes the spaces at the start and end. Essential with data a person types.',
            'replace(a, b)': 'Changes every occurrence of a to b.',
            'upper() / lower()': 'All capitals / all lower case. Useful for comparing without caring about capitals.',
          },
        },
        { type: 'code', run: true, code: 'answer = "  YES "\nprint(answer.strip().lower() == "yes")   # chained methods\nprint("3,5".replace(",", "."))\nprint(float("3,5".replace(",", ".")) * 2)' },
        { type: 'callout', tone: 'tip', title: 'Chaining', text: '`answer.strip().lower()` applies the methods from left to right: first it removes the spaces and then turns the result into lower case.' },
        {
          type: 'check', id: 'm8m-replace', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 'print("banana".replace("a", "o"))', answer: 'bonono',
          explain: 'replace changes **every** occurrence.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'buscar', title: 'Searching and counting', concepts: ['cadenas', 'busqueda'],
      blocks: [
        {
          type: 'five', items: {
            'find(x)': 'Position of the first occurrence of x, or −1 if it isn\'t there.',
            'count(x)': 'How many times x appears.',
            'startswith(x) / endswith(x)': 'Does it start / end with x? They return True or False.',
          },
        },
        { type: 'code', run: true, code: 'email = "ana.lopez@mail.com"\nprint(email.find("@"))\nprint(email.count("."))\nprint(email.endswith(".com"))\nprint(email[:email.find("@")])   # user' },
        {
          type: 'check', id: 'm8m-find', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 's = "programmer"\nprint(s.find("r"), s.count("r"), s.find("z"))', answer: '1 3 -1',
          explain: 'The first «r» is at position 1; there are three; the «z» isn\'t there: −1.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'split', title: 'Splitting and joining words', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: '`split()` splits a text into pieces (by default, at the spaces) and returns a **list**, which you\'ll get to know in depth in Module 9. You can already go through it with for. `join` does the opposite: it joins pieces with a separator.' },
        { type: 'code', run: true, code: 'sentence = "learning Python is fun"\nwords = sentence.split()\nprint(words)\nprint(len(words), "words")\nfor w in words:\n    print(w.upper())\nprint("-".join(words))\nprint("12/05/2026".split("/"))' },
        {
          type: 'check', id: 'm8m-split', concept: 'cadenas', mode: 'text',
          question: 'Predict:', code: 'print(len("  hello   world  ".split()))', answer: '2',
          explain: 'split() with no arguments splits at any number of spaces and ignores the ones at the ends.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'met-predict' },
    { id: 'a2', activity: 'met-complete' },
    { id: 'a3', activity: 'met-fix' },
    { id: 'a4', activity: 'met-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A method is called with a dot: `text.upper()`.',
    'String methods **return a new text**: store it if you need it.',
    'Cleaning and transforming: `strip`, `replace`, `upper`, `lower`, `title`. They can be chained.',
    'Searching and counting: `find` (−1 if not there), `count`, `startswith`, `endswith`.',
    '`split()` splits into words; `separator.join(pieces)` joins them.',
  ],
};

export const ACTIVITIES_METODOS = {
  'met-predict': {
    id: 'met-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The user\'s answer', difficulty: 2, xp: 10, concepts: ['cadenas'],
    prompt: 'The user has typed «  Yes  » with spaces and a capital letter. **What will it show?**',
    code: 'answer = "  Yes  "\nprint(answer == "yes", answer.strip() == "yes", answer.strip().lower() == "yes")',
    expectedOutput: 'False False True',
    options: [
      { text: 'False False True', correct: true },
      { text: 'False True True', concept: 'cadenas', why: 'strip() removes the spaces, but «Yes» with a capital still isn\'t equal to «yes».' },
      { text: 'True True True', concept: 'cadenas', why: '== compares the texts exactly: spaces and capitals included.' },
      { text: 'False False False', concept: 'cadenas', why: 'With strip() and lower(), «  Yes  » becomes «yes»: now they are equal.' },
    ],
    explain: ['«  Yes  » isn\'t «yes» (spaces and a capital).', '«Yes» isn\'t either (capital).', '«yes» is.'],
  },
  'met-complete': {
    id: 'met-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'User and domain', difficulty: 2, xp: 15, concepts: ['cadenas', 'retorno'],
    statement: 'Complete `email_parts(email)` so it returns two values: the **user** (what comes before the @) and the **domain** (what comes after).',
    expected: 'ana.lopez mail.com',
    starter: 'def email_parts(email):\n    pos = email.___("@")\n    user = email[:___]\n    domain = email[pos + ___:]\n    return user, domain\n\nu, d = email_parts("ana.lopez@mail.com")\nprint(u, d)',
    spec: {
      blanks: true,
      allow_short_names: ['u', 'd'],
      functions: [{ name: 'email_parts', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['ana.lopez mail.com'] },
        { label: 'email_parts("x@y.com")', call: 'print(email_parts("x@y.com"))', out_lines: ["('x', 'y.com')"] },
      ],
      misconceptions: [
        { out_lines: ['ana.lopez @mail.com'], title: 'The @ shouldn\'t be there', msg: 'The domain starts **after** the @: `email[pos + 1:]`.' },
      ],
      logic_msg: 'Check with "x@y.com": the user is "x" and the domain "y.com".',
    },
    hints: [
      { level: 'Orientation', text: 'First find the position of the @; then cut before and after it.' },
      { level: 'Reasoning', text: 'Which method gives the position of a character? The user ends just before that position; the domain starts just after.' },
      { level: 'Pseudocode', text: 'pos ← position of "@"\nuser ← from the start up to pos (not included)\ndomain ← from pos + 1 to the end', pre: true },
      { level: 'Technical help', text: '`email.find("@")`, `email[:pos]` and `email[pos + 1:]`.' },
    ],
    solution: {
      code: 'def email_parts(email):\n    pos = email.find("@")\n    user = email[:pos]\n    domain = email[pos + 1:]\n    return user, domain\n\nu, d = email_parts("ana.lopez@mail.com")\nprint(u, d)',
      explanation: 'find gives the position of the @; the slices cut just before and just after. You could also use split("@"), but this version practises indexes and methods together.',
    },
    reference: [
      'def email_parts(email):\n    pos = email.find("@")\n    user = email[:pos]\n    domain = email[pos + 1:]\n    return user, domain\n\nu, d = email_parts("ana.lopez@mail.com")\nprint(u, d)',
    ],
    wrongs: [
      { code: 'def email_parts(email):\n    pos = email.___("@")\n    user = email[:___]\n    domain = email[pos + ___:]\n    return user, domain', category: 'incompleto' },
      { code: 'def email_parts(email):\n    pos = email.find("@")\n    user = email[:pos]\n    domain = email[pos:]\n    return user, domain\n\nu, d = email_parts("ana.lopez@mail.com")\nprint(u, d)', category: 'comprension' },
    ],
  },
  'met-fix': {
    id: 'met-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The uncleaned name', difficulty: 2, xp: 20, concepts: ['cadenas', 'errores'],
    statement: '`clean_name` should remove the extra spaces at the ends and give each word a capital first letter, but it returns the text as it is. **There\'s no Python error.** Fix it.',
    expected: 'Ana García\nLuis Pérez',
    starter: 'def clean_name(name):\n    name.strip()\n    name.title()\n    return name\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))',
    spec: {
      exact_lines: true,
      functions: [{ name: 'clean_name', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['Ana García', 'Luis Pérez'] },
        { label: 'clean_name("   eva  ")', call: 'print("[" + clean_name("   eva  ") + "]")', out_lines: ['[Eva]'] },
      ],
      misconceptions: [
        { out_lines: ['  ana garcía', 'LUIS PÉREZ'], title: 'The results are lost', msg: 'strip() and title() return a new text, but nobody stores it. Assign the result: `name = name.strip()`.' },
      ],
      logic_msg: 'Check with «   eva  »: it must return «Eva», without spaces and with a capital.',
    },
    hints: [
      { level: 'Orientation', text: 'The two middle lines work something out… and what happens to what they work out?' },
      { level: 'Reasoning', text: 'Texts are immutable: the methods don\'t change `name`, they return a new one. You have to store it (or return it directly).' },
      { level: 'Pseudocode', text: 'name ← name without spaces at the ends\nname ← name with capital first letters\nreturn name', pre: true },
      { level: 'Technical help', text: '`name = name.strip()` and `name = name.title()`, or in one line: `return name.strip().title()`.' },
    ],
    solution: {
      code: 'def clean_name(name):\n    return name.strip().title()\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))',
      explanation: 'String methods don\'t change the original: they return a new text. Chaining them and returning the result solves it in one line.',
    },
    reference: [
      'def clean_name(name):\n    return name.strip().title()\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))',
      'def clean_name(name):\n    name = name.strip()\n    name = name.title()\n    return name\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))',
    ],
    wrongs: [
      { code: 'def clean_name(name):\n    name.strip()\n    name.title()\n    return name\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))', category: 'comprension' },
      { code: 'def clean_name(name):\n    return name.title()\n\nprint(clean_name("  ana garcía "))\nprint(clean_name("LUIS PÉREZ"))', category: 'logica' },
    ],
  },
  'met-build': {
    id: 'met-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Validating an email', difficulty: 3, xp: 30, concepts: ['cadenas', 'booleanos', 'descomponer'],
    unlock: { any: ['met-predict', 'met-complete', 'met-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `valid_email(email)` that returns True if the email meets these simple rules:\n\n• It has **exactly one** @.\n\n• It has no spaces.\n\n• After the @ there\'s at least one dot.\n\n• It doesn\'t start with @.\n\nExamples: "ana@mail.com" → True; "ana@mail" → False; "a na@mail.com" → False.',
    expected: 'True',
    plan: [
      {
        q: 'How do you check that there\'s exactly one @?',
        options: [
          { text: 'email.count("@") == 1', correct: true },
          { text: '"@" in email', why: 'That only says there\'s at least one: "a@@b.com" would pass too.' },
        ],
      },
      {
        q: 'How do you check for a dot after the @?',
        options: [
          { text: 'Look for "." in the slice that goes from the @ to the end', correct: true },
          { text: '"." in email', why: '"ana.lopez@mail" has a dot, but before the @: it doesn\'t count.' },
        ],
      },
    ],
    planScaffold: 'def valid_email(email):\n    # 1. Exactly one @?\n    # 2. No spaces?\n    # 3. A dot after the @?\n    # 4. Doesn\'t start with @?\n\n\nprint(valid_email("ana@mail.com"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'valid_email', params: 1 }],
      cases: [
        { label: '"ana@mail.com"', call: 'print(valid_email("ana@mail.com"))', out_lines: ['True'] },
        { label: '"ana@mail"', call: 'print(valid_email("ana@mail"))', out_lines: ['False'] },
        { label: '"a na@mail.com"', call: 'print(valid_email("a na@mail.com"))', out_lines: ['False'] },
        { label: '"ana@@mail.com"', call: 'print(valid_email("ana@@mail.com"))', out_lines: ['False'] },
        { label: '"ana.lopez@mail"', call: 'print(valid_email("ana.lopez@mail"))', out_lines: ['False'] },
        { label: '"@mail.com"', call: 'print(valid_email("@mail.com"))', out_lines: ['False'] },
        { label: '"luis.p@uni.ac.uk"', call: 'print(valid_email("luis.p@uni.ac.uk"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True', 'None'], title: 'It shows, but doesn\'t return', msg: 'Use return instead of print.' },
      ],
      logic_msg: 'Check the rule that fails in the marked case. Each rule can be checked with a string method.',
    },
    hints: [
      { level: 'Orientation', text: 'Four rules, four conditions. If one fails, the email isn\'t valid.' },
      { level: 'Reasoning', text: 'count for the @, in for the spaces, find to know where the @ is plus a slice to look at what comes after it, startswith for the start.' },
      { level: 'Pseudocode', text: 'if there isn\'t exactly one @: return False\nif there\'s a space: return False\nif it starts with @: return False\ndomain ← what comes after the @\nreturn "." is in domain', pre: true },
      { level: 'Technical help', text: '`email.count("@") != 1`, `" " in email`, `email.startswith("@")` and `"." in email[email.find("@"):]`.' },
    ],
    solution: {
      code: 'def valid_email(email):\n    """Return True if email follows some basic format rules."""\n    if email.count("@") != 1 or " " in email or email.startswith("@"):\n        return False\n    domain = email[email.find("@") + 1:]\n    return "." in domain\n\nprint(valid_email("ana@mail.com"))',
      explanation: 'The guard clauses rule out the clearly invalid cases early; the last line returns the check for the dot in the domain directly.',
    },
    reference: [
      'def valid_email(email):\n    if email.count("@") != 1 or " " in email or email.startswith("@"):\n        return False\n    domain = email[email.find("@") + 1:]\n    return "." in domain',
      'def valid_email(email):\n    if email.count("@") != 1:\n        return False\n    user, domain = email.split("@")\n    return user != "" and " " not in email and "." in domain',
    ],
    wrongs: [
      { code: 'def valid_email(email):\n    return "@" in email and "." in email', category: 'logica' },
      { code: 'def valid_email(email):\n    print(email.count("@") == 1 and " " not in email and "." in email[email.find("@"):] and not email.startswith("@"))', category: 'comprension' },
    ],
  },
};
