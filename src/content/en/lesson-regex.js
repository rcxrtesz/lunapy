// Lesson 8.3 · Basic regular expressions (English translation of src/content/lesson-regex.js).

const TOPIC = 'Strings';

export const LESSON_REGEX = {
  id: 'regex',
  moduleId: 'm8',
  code: '8.3',
  title: 'Basic regular expressions',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explain what a regular expression is and what it\'s for',
    'Search for patterns with re.search and re.findall',
    'Use classes (\\d, \\w, [abc]) and quantifiers (+, *, ?, {n})',
    'Validate a whole format with re.fullmatch',
    'Replace with re.sub',
  ],
  prerequisites: ['Lesson 8.2 «String methods»'],
  teaser: 'find looks for an exact text. But how do you look for «any number» or «something shaped like a postcode»? With regular expressions.',
  celebration: 'You\'ve completed Module 8: indexes, slices, methods and regular expressions. Texts have no secrets left for you.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'Looking for patterns, not exact texts', concepts: ['regex'],
      blocks: [
        { type: 'p', text: 'A **regular expression** (*regex*) describes the **shape** of a text: «one or more digits», «a word starting with a capital letter»… Python handles them with the `re` module.' },
        { type: 'code', run: true, code: 'import re\n\ntext = "Order 4521: 3 books and 12 notebooks"\nprint(re.findall(r"\\d+", text))' },
        {
          type: 'five', items: {
            'r"..."': '«Raw» text: the backslashes \\ are taken as they are. Always write patterns like this.',
            '\\d': 'A digit (0-9).',
            '+': 'One or more of the previous one: `\\d+` is a whole number.',
            're.findall': 'Returns every piece that matches, in a list.',
          },
        },
        {
          type: 'check', id: 'm8r-findall', concept: 'regex', mode: 'choice',
          question: 'What will it show?', code: 'import re\nprint(re.findall(r"\\d+", "a1 bb22 ccc333"))', expectOutput: "['1', '22', '333']",
          options: [
            { text: "['1', '22', '333']", correct: true },
            { text: "['1', '2', '2', '3', '3', '3']", why: 'With `+`, digits next to each other make a single match.' },
            { text: '[1, 22, 333]', why: 'findall returns texts (in quotes), not numbers.' },
          ],
          explain: 'Each group of digits next to each other is a match. They\'re returned as texts.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'simbolos', title: 'The most useful symbols', concepts: ['regex'],
      blocks: [
        {
          type: 'five', items: {
            '\\d  \\w  \\s': 'Digit · letter, digit or _ · whitespace.',
            '.': 'Any character (except a line break). For a real dot: `\\.`',
            '[aeiou]  [A-Z]': 'One of the characters in the list or the range.',
            '+  *  ?': 'One or more · zero or more · zero or one (optional).',
            '{3}  {2,4}': 'Exactly 3 · between 2 and 4.',
            '^  $': 'Start · end of the text.',
          },
        },
        { type: 'code', run: true, code: 'import re\n\nsentence = "Ana and Luis have lived in Toledo since 2019"\nprint(re.findall(r"[A-Z]\\w+", sentence))     # words with a capital\nprint(re.findall(r"\\d{4}", sentence))        # 4-digit numbers\nprint(re.findall(r"\\b\\w{3}\\b", sentence))     # 3-letter words' },
        { type: 'callout', tone: 'info', title: '\\b', text: '`\\b` marks the edge of a word: that way `\\w{3}` doesn\'t match pieces of longer words.' },
        {
          type: 'check', id: 'm8r-mayus', concept: 'regex', mode: 'choice',
          question: 'What will it show?', code: 'import re\nprint(re.findall(r"[aeiou]", "café"))', expectOutput: "['a']",
          options: [
            { text: "['a']", correct: true },
            { text: "['a', 'é']", why: 'The «é» has an accent: it\'s a different character from «e» and isn\'t in [aeiou].' },
          ],
          explain: 'The «é» has an accent and isn\'t in the list [aeiou].',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'search', title: 'search: is it there? where?', concepts: ['regex'],
      blocks: [
        { type: 'p', text: '`re.search(pattern, text)` looks for the **first** match. If there isn\'t one, it returns `None`; if there is, it returns an object with the text found (`.group()`) and its position (`.start()`).' },
        { type: 'code', run: true, code: 'import re\n\nm = re.search(r"\\d+", "I have 3 cats and 2 dogs")\nif m:\n    print("Found:", m.group(), "at position", m.start())\n\nprint(re.search(r"\\d+", "no numbers"))' },
        {
          type: 'check', id: 'm8r-search', concept: 'regex', mode: 'text',
          question: 'Predict:', code: 'import re\nm = re.search(r"[A-Z]+", "abcDEFghiJK")\nprint(m.group())', answer: 'DEF',
          explain: 'The first sequence of capitals next to each other is «DEF». search stops there.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Validating a whole format', concepts: ['regex', 'booleanos'],
      blocks: [
        { type: 'p', text: 'To check that the **whole** text has a specific shape, use `re.fullmatch`: the pattern has to match from start to finish.' },
        { type: 'code', run: true, code: 'import re\n\ndef is_zip_code(code):\n    return re.fullmatch(r"\\d{5}", code) is not None\n\nprint(is_zip_code("28013"))\nprint(is_zip_code("2801"))\nprint(is_zip_code("28013A"))' },
        { type: 'callout', tone: 'tip', title: 'is not None', text: '`fullmatch` returns an object or `None`. Comparing it with `is not None` turns it into a clean True/False.' },
        {
          type: 'check', id: 'm8r-fullmatch', concept: 'regex', mode: 'choice',
          question: 'Which pattern validates a Spanish ID number (8 digits and one capital letter)?',
          options: [
            { text: 'r"\\d{8}[A-Z]"', correct: true },
            { text: 'r"\\d+[A-Z]"', why: '`\\d+` accepts any number of digits: "12A" would match too.' },
            { text: 'r"\\d{8}\\w"', why: '`\\w` also accepts digits and lower case: "123456789" would match.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sub', title: 'Replacing with re.sub', concepts: ['regex'],
      blocks: [
        { type: 'p', text: '`re.sub(pattern, replacement, text)` is like replace, but with patterns:' },
        { type: 'code', run: true, code: 'import re\n\nprint(re.sub(r"\\s+", " ", "too    many   spaces  here"))\nprint(re.sub(r"\\d", "#", "My PIN is 4821"))' },
        {
          type: 'check', id: 'm8r-sub', concept: 'regex', mode: 'text',
          question: 'Predict:', code: 'import re\nprint(re.sub(r"[aeiou]", "", "programmer"))', answer: 'prgrmmr',
          explain: 'Each vowel is replaced with an empty text: they disappear.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'reg-predict' },
    { id: 'a2', activity: 'reg-complete' },
    { id: 'a3', activity: 'reg-fix' },
    { id: 'a4', activity: 'reg-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A regular expression describes the shape of a text. You use it with `import re` and `r"..."` patterns.',
    'Symbols: `\\d` digit, `\\w` letter/digit, `\\s` space, `.` anything, `[...]` one from the list.',
    'Quantifiers: `+` one or more, `*` zero or more, `?` optional, `{n}` exactly n.',
    '`re.findall` gives every match; `re.search`, the first one (or None).',
    '`re.fullmatch` validates the whole text; `re.sub` replaces.',
  ],
};

export const ACTIVITIES_REGEX = {
  'reg-predict': {
    id: 'reg-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Hunting numbers', difficulty: 2, xp: 10, concepts: ['regex'],
    prompt: 'Two similar patterns on the same text. **What will it show?**',
    code: 'import re\ntext = "Room 12, floor 3, door 105"\nprint(re.findall(r"\\d", text))\nprint(re.findall(r"\\d+", text))',
    expectedOutput: "['1', '2', '3', '1', '0', '5']\n['12', '3', '105']",
    options: [
      { text: "['1', '2', '3', '1', '0', '5'] and then ['12', '3', '105']", correct: true },
      { text: "['12', '3', '105'] both times", concept: 'regex', why: 'Without the +, `\\d` matches a single digit: each digit is a separate match.' },
      { text: "['12', '3', '105'] and then ['1', '2', '3', '1', '0', '5']", concept: 'regex', why: 'It\'s the other way round: the pattern with + is the one that joins digits next to each other.' },
      { text: '[12, 3, 105] as numbers', concept: 'regex', why: 'findall always returns texts (in quotes). To do maths, convert them with int().' },
    ],
    explain: ['`\\d`: each digit separately.', '`\\d+`: groups of digits next to each other.'],
  },
  'reg-complete': {
    id: 'reg-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Validating a number plate', difficulty: 2, xp: 15, concepts: ['regex', 'booleanos'],
    statement: 'Current Spanish number plates have **4 digits and 3 capital letters** (no vowels, but we\'ll forget about that). Complete `valid_plate` so it returns True only if the **whole** text has that shape.',
    expected: 'True\nFalse',
    starter: 'import re\n\ndef valid_plate(m):\n    return re.___(r"\\d{___}[A-Z]{___}", m) is not None\n\nprint(valid_plate("1234BCD"))\nprint(valid_plate("123BCD"))',
    spec: {
      blanks: true,
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['m'],
      functions: [{ name: 'valid_plate', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['True', 'False'] },
        { label: '"1234BCDX" (one letter too many)', call: 'print(valid_plate("1234BCDX"))', out_lines: ['False'] },
        { label: '"1234bcd" (lower case)', call: 'print(valid_plate("1234bcd"))', out_lines: ['False'] },
        { label: '"9999ZZZ"', call: 'print(valid_plate("9999ZZZ"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True'], title: 'Only part of it matches', msg: 'With `re.search` it\'s enough for one part to match. To validate the **whole** text, use `re.fullmatch`.' },
      ],
      logic_msg: 'Check the re function and the numbers in the curly brackets: 4 digits and 3 letters.',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps: the re function that validates the whole text and the two repetition numbers.' },
      { level: 'Reasoning', text: 'search or fullmatch? Think about "1234BCDX": it has a plate inside it, but it isn\'t a plate.' },
      { level: 'Pseudocode', text: 'the whole text has to be: 4 digits followed by 3 capitals', pre: true },
      { level: 'Technical help', text: '`re.fullmatch(r"\\d{4}[A-Z]{3}", m)`.' },
    ],
    solution: {
      code: 'import re\n\ndef valid_plate(m):\n    return re.fullmatch(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(valid_plate("1234BCD"))\nprint(valid_plate("123BCD"))',
      explanation: '`fullmatch` requires the pattern to cover the whole text. `{4}` and `{3}` fix exactly how many digits and letters.',
    },
    reference: ['import re\n\ndef valid_plate(m):\n    return re.fullmatch(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(valid_plate("1234BCD"))\nprint(valid_plate("123BCD"))'],
    wrongs: [
      { code: 'import re\n\ndef valid_plate(m):\n    return re.___(r"\\d{___}[A-Z]{___}", m) is not None', category: 'incompleto' },
      { code: 'import re\n\ndef valid_plate(m):\n    return re.search(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(valid_plate("1234BCD"))\nprint(valid_plate("123BCD"))', category: 'comprension' },
    ],
  },
  'reg-fix': {
    id: 'reg-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'Adding up the amounts', difficulty: 2, xp: 20, concepts: ['regex', 'bucles'],
    statement: '`total_amounts(text)` should add up all the whole numbers in a text (12 + 3 + 105 = 120), but it adds digit by digit and gives 12. Fix the **pattern**.',
    expected: '120\n0',
    starter: 'import re\n\ndef total_amounts(text):\n    total = 0\n    for number in re.findall(r"\\d", text):\n        total += int(number)\n    return total\n\nprint(total_amounts("Bread 12 €, milk 3 €, wine 105 €"))\nprint(total_amounts("no amounts"))',
    spec: {
      functions: [{ name: 'total_amounts', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['120', '0'] },
        { label: 'total_amounts("1000 and 1")', call: 'print(total_amounts("1000 and 1"))', out_lines: ['1001'] },
      ],
      misconceptions: [
        { out_lines: ['12', '0'], title: 'It adds digit by digit', msg: '`\\d` matches a single digit. Add `+` to take whole numbers: `\\d+`.' },
      ],
      logic_msg: 'Check with "1000 and 1": the result must be 1001.',
    },
    hints: [
      { level: 'Orientation', text: 'Show what `re.findall(r"\\d", text)` returns to see what it\'s adding up.' },
      { level: 'Reasoning', text: 'Which symbol makes a pattern match «one or more» characters in a row?' },
      { level: 'Pseudocode', text: 'pattern ← one or more digits in a row', pre: true },
      { level: 'Technical help', text: 'Change `r"\\d"` to `r"\\d+"`.' },
    ],
    solution: {
      code: 'import re\n\ndef total_amounts(text):\n    total = 0\n    for number in re.findall(r"\\d+", text):\n        total += int(number)\n    return total\n\nprint(total_amounts("Bread 12 €, milk 3 €, wine 105 €"))\nprint(total_amounts("no amounts"))',
      explanation: 'With `\\d+` each whole number is a match: "12", "3" and "105". Then int() converts them so they can be added.',
    },
    reference: ['import re\n\ndef total_amounts(text):\n    total = 0\n    for number in re.findall(r"\\d+", text):\n        total += int(number)\n    return total\n\nprint(total_amounts("Bread 12 €, milk 3 €, wine 105 €"))\nprint(total_amounts("no amounts"))'],
    wrongs: [
      { code: 'import re\n\ndef total_amounts(text):\n    total = 0\n    for number in re.findall(r"\\d", text):\n        total += int(number)\n    return total\n\nprint(total_amounts("Bread 12 €, milk 3 €, wine 105 €"))\nprint(total_amounts("no amounts"))', category: 'comprension' },
      { code: 'import re\n\ndef total_amounts(text):\n    total = 0\n    for number in re.findall(r"\\d+", text):\n        total += number\n    return total\n\nprint(total_amounts("Bread 12 €, milk 3 €, wine 105 €"))\nprint(total_amounts("no amounts"))', category: 'ejecucion' },
    ],
  },
  'reg-build': {
    id: 'reg-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The times in the diary', difficulty: 3, xp: 30, concepts: ['regex', 'cadenas'],
    unlock: { any: ['reg-predict', 'reg-complete', 'reg-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `times(text)` that returns every time that appears in a text in the format **h:mm** or **hh:mm** (one or two digits, a colon and exactly two digits).\n\nExample: `times("Class at 9:30 and tutorial at 14:05")` → `[\'9:30\', \'14:05\']`.',
    expected: "['9:30', '14:05']",
    plan: [
      {
        q: 'Which pattern describes the times?',
        options: [
          { text: 'r"\\d{1,2}:\\d{2}"', correct: true },
          { text: 'r"\\d+:\\d+"', why: 'It would accept "123:4567": hours have one or two digits and minutes exactly two.' },
          { text: 'r"\\d:\\d"', why: 'It would only match one digit on each side: "14:05" wouldn\'t come out whole.' },
        ],
      },
      {
        q: 'Which re function do you use to get them all?',
        options: [
          { text: 're.findall', correct: true },
          { text: 're.search', why: 'search only finds the first one.' },
        ],
      },
    ],
    planScaffold: 'import re\n\ndef times(text):\n    # return every match of the pattern\n\n\nprint(times("Class at 9:30 and tutorial at 14:05"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'times', params: 1 }],
      cases: [
        { label: 'Two times', call: 'print(times("Class at 9:30 and tutorial at 14:05"))', out_lines: ["['9:30', '14:05']"] },
        { label: 'None', call: 'print(times("Nothing on today"))', out_lines: ['[]'] },
        { label: 'One-digit minutes don\'t count', call: 'print(times("at 8:5 or at 20:00"))', out_lines: ["['20:00']"] },
      ],
      misconceptions: [
        { out_lines: ["['9:30']"], title: 'Only the first', msg: 'Use `re.findall` to get every match, not just the first.' },
        { out_lines: ["['9:3', '14:0']"], title: 'Digits are missing', msg: 'Minutes have exactly two digits: `\\d{2}`.' },
      ],
      logic_msg: 'Check the pattern with "at 8:5 or at 20:00": only 20:00 has the right format.',
    },
    hints: [
      { level: 'Orientation', text: 'One line: return re.findall with the right pattern.' },
      { level: 'Reasoning', text: 'Hours: one or two digits → `\\d{1,2}`. Then the colon. Minutes: exactly two → `\\d{2}`.' },
      { level: 'Pseudocode', text: 'return every match of «1 or 2 digits, :, 2 digits»', pre: true },
      { level: 'Technical help', text: '`return re.findall(r"\\d{1,2}:\\d{2}", text)`.' },
    ],
    solution: {
      code: 'import re\n\ndef times(text):\n    """Return the times in h:mm or hh:mm format that appear in text."""\n    return re.findall(r"\\d{1,2}:\\d{2}", text)\n\nprint(times("Class at 9:30 and tutorial at 14:05"))',
      explanation: '`\\d{1,2}` allows hours with one or two digits and `\\d{2}` requires two digits for the minutes. findall returns every match.',
    },
    reference: ['import re\n\ndef times(text):\n    return re.findall(r"\\d{1,2}:\\d{2}", text)'],
    wrongs: [
      { code: 'import re\n\ndef times(text):\n    return re.findall(r"\\d+:\\d+", text)', category: 'logica' },
      { code: 'import re\n\ndef times(text):\n    m = re.search(r"\\d{1,2}:\\d{2}", text)\n    return [m.group()]', category: 'comprension' },
    ],
  },
};
