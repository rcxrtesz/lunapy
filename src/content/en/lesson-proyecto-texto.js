// Lesson 10.3 · Project: text analysis (English translation of src/content/lesson-proyecto-texto.js).

const TOPIC = 'Dictionaries';

export const LESSON_PROYECTO_TEXTO = {
  id: 'proyecto-texto',
  moduleId: 'm10',
  code: '10.3',
  title: 'Project: text analysis',
  minutes: 40,
  bonusXp: 40,
  objectives: [
    'Break a medium-sized problem down into small functions',
    'Clean a text: lower case and no punctuation marks',
    'Count how often each word appears with a dictionary',
    'Get the most common words by sorting by frequency',
    'Put all the pieces together in a report',
  ],
  prerequisites: ['Lesson 10.2 «Tuples»'],
  teaser: 'Module project: you\'re going to build a text analyser that counts words, finds the most used ones and produces a report. All with what you already know.',
  celebration: 'You\'ve completed Module 10 with a real project: a text analyser built piece by piece.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'The plan', concepts: ['descomponer', 'diccionarios'],
      blocks: [
        { type: 'p', text: 'We want the program, given a text, to say how many words it has, how many are different and which ones are repeated most. Before programming, we **break it down**:' },
        {
          type: 'five', items: {
            '1 · clean(text)': 'Change to lower case and remove the punctuation marks.',
            '2 · count(words)': 'Dictionary word → number of times.',
            '3 · most_common(counts, n)': 'The n words that appear most.',
            '4 · report(text)': 'Use the three previous ones and show the result.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'One piece at a time', text: 'Write and test each function separately, as in incremental development. When all three work, the report will be almost immediate.' },
        {
          type: 'check', id: 'm10p-plan', concept: 'descomponer', mode: 'choice',
          question: 'Why do you need to clean the text before counting?',
          options: [
            { text: 'So that «Sun», «sun» and «sun,» count as the same word', correct: true },
            { text: 'So that the program runs faster', why: 'It isn\'t about speed: without cleaning, the same word would appear as several different keys.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limpiar', title: 'Step 1: clean', concepts: ['cadenas'],
      blocks: [
        { type: 'p', text: 'Lower case with `lower()` and, for each punctuation mark, a `replace` that removes it:' },
        { type: 'code', run: true, code: 'PUNCTUATION = ".,;:!?\\"()"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\nprint(clean("Hello, World! How are you?"))' },
        {
          type: 'check', id: 'm10p-limpiar', concept: 'cadenas', mode: 'text',
          question: 'With that function, how many words does clean("Sun, sun. SUN").split() give?', code: 'PUNCTUATION = ".,;:!?\\"()"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\nprint(len(clean("Sun, sun. SUN").split()))', answer: '3',
          explain: 'Three words, and after cleaning all three are exactly «sun».',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'contar', title: 'Step 2: count', concepts: ['diccionarios'],
      blocks: [
        { type: 'p', text: 'The counter dictionary pattern, applied to words:' },
        { type: 'code', run: true, code: 'def count(words):\n    counts = {}\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n\nprint(count("the sun and the sea and the sky".split()))' },
        {
          type: 'check', id: 'm10p-distintas', concept: 'diccionarios', mode: 'text',
          question: 'Predict: how many different words are there?', code: 'counts = {}\nfor w in "a b a c b a".split():\n    counts[w] = counts.get(w, 0) + 1\nprint(len(counts))', answer: '3',
          explain: 'The dictionary has one key per different word: a, b and c.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'top', title: 'Step 3: the most common', concepts: ['tuplas', 'diccionarios'],
      blocks: [
        { type: 'p', text: '`counts.items()` gives (word, times) tuples. Sorting them by the second item, from highest to lowest, the first ones are the most common:' },
        { type: 'code', run: true, code: 'def times(pair):\n    return pair[1]\n\ndef most_common(counts, n):\n    ordered = sorted(counts.items(), key=times, reverse=True)\n    return ordered[:n]\n\ncounts = {"the": 3, "sun": 1, "and": 2, "sea": 1}\nprint(most_common(counts, 2))' },
        { type: 'callout', tone: 'info', title: 'Ties', text: 'sorted is **stable**: if two words appear the same number of times, they keep the order they were in (the order of their first appearance in the text).' },
        {
          type: 'check', id: 'm10p-top', concept: 'tuplas', mode: 'text',
          question: 'Predict:', code: 'def times(pair):\n    return pair[1]\n\nr = {"a": 1, "b": 4, "c": 2}\nprint(sorted(r.items(), key=times, reverse=True)[0])', answer: "('b', 4)",
          explain: 'The pair that appears most is ("b", 4).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'informe', title: 'Step 4: the report', concepts: ['composicion', 'descomponer'],
      blocks: [
        { type: 'p', text: 'With the three pieces tested, the report only has to combine them:' },
        { type: 'code', run: true, code: 'PUNCTUATION = ".,;:!?\\"()"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\ndef count(words):\n    counts = {}\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n\ndef times(pair):\n    return pair[1]\n\ndef most_common(counts, n):\n    return sorted(counts.items(), key=times, reverse=True)[:n]\n\ndef report(text):\n    words = clean(text).split()\n    counts = count(words)\n    print("Words:", len(words))\n    print("Different:", len(counts))\n    for word, n in most_common(counts, 3):\n        print(f"  {word}: {n}")\n\nreport("The sea is blue. The sky is blue. And the sun? The sun is yellow.")', caption: 'Change the text to one of your own and run it again.' },
        {
          type: 'check', id: 'm10p-informe', concept: 'composicion', mode: 'choice',
          question: 'What\'s the advantage of having split the program into functions?',
          options: [
            { text: 'Each piece can be tested, understood and reused separately', correct: true },
            { text: 'The program has fewer lines', why: 'In fact it has a few more. The advantage is that each part is simple and testable.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'txt-predict' },
    { id: 'a2', activity: 'txt-complete' },
    { id: 'a3', activity: 'txt-fix' },
    { id: 'a4', activity: 'txt-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A medium-sized problem is broken down into small functions that are tested separately.',
    'Clean: `lower()` and a `replace` for each punctuation mark.',
    'Count: a word → times dictionary with `get(w, 0) + 1`.',
    'The most common: `sorted(counts.items(), key=times, reverse=True)[:n]`.',
    'The report combines the pieces: clean → split → count → sort → show.',
  ],
};

const CLEAN = 'PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\n';

export const ACTIVITIES_PROYECTO_TEXTO = {
  'txt-predict': {
    id: 'txt-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Counting after cleaning', difficulty: 2, xp: 10, concepts: ['diccionarios', 'cadenas'],
    prompt: 'The text is cleaned and the words are counted. **What will it show?**',
    code: 'text = "Yes, yes. NO! no, yes"\nclean = text.lower().replace(",", "").replace(".", "").replace("!", "")\ncounts = {}\nfor w in clean.split():\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)',
    expectedOutput: "{'yes': 3, 'no': 2}",
    options: [
      { text: "{'yes': 3, 'no': 2}", correct: true },
      { text: "{'Yes': 1, 'yes': 2, 'NO': 1, 'no': 1}", concept: 'cadenas', why: 'lower() changes everything to lower case before counting: «Yes» and «yes» are the same word.' },
      { text: "{'yes,': 1, 'yes.': 1, 'no!': 1, 'no,': 1, 'yes': 1}", concept: 'cadenas', why: 'The replace calls remove the marks before splitting the words.' },
      { text: "{'no': 2, 'yes': 3}", concept: 'diccionarios', why: 'The dictionary keeps the order in which the keys appear: «yes» appears first.' },
    ],
    explain: ['After cleaning: "yes yes no no yes".', '3 «yes» and 2 «no» are counted, in order of appearance.'],
  },
  'txt-complete': {
    id: 'txt-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The clean function', difficulty: 2, xp: 15, concepts: ['cadenas', 'bucles'],
    statement: 'Complete `clean(text)`: it must change the text to lower case and remove all the marks in `PUNCTUATION`.',
    expected: 'hello world how are you',
    starter: 'PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.___()\n    for mark in ___:\n        text = text.___(mark, "")\n    return text\n\nprint(clean("Hello, World! How are you?"))',
    spec: {
      blanks: true,
      exact_lines: true,
      functions: [{ name: 'clean', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['hello world how are you'] },
        { label: 'clean("A; B: C.")', call: 'print(clean("A; B: C."))', out_lines: ['a b c'] },
      ],
      misconceptions: [
        { out_lines: ['hello, world! how are you?'], title: 'The marks are still there', msg: 'replace returns a new text: store it in text on each pass (`text = text.replace(...)`).' },
      ],
      logic_msg: 'The result must be in lower case and without any of the marks.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the lower-case method, what the loop goes through and the method that replaces.' },
      { level: 'Reasoning', text: 'Go through each mark in the PUNCTUATION constant and replace it with an empty text.' },
      { level: 'Pseudocode', text: 'text ← text in lower case\nfor each mark in PUNCTUATION:\n    text ← text without that mark', pre: true },
      { level: 'Technical help', text: '`text.lower()`, `for mark in PUNCTUATION:` and `text.replace(mark, "")`.' },
    ],
    solution: {
      code: 'PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\nprint(clean("Hello, World! How are you?"))',
      explanation: 'A loop over the PUNCTUATION text goes through each mark; replace returns a new text without it, which is stored for the next pass.',
    },
    reference: ['PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text = text.replace(mark, "")\n    return text\n\nprint(clean("Hello, World! How are you?"))'],
    wrongs: [
      { code: 'PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.___()\n    for mark in ___:\n        text = text.___(mark, "")\n    return text', category: 'incompleto' },
      { code: 'PUNCTUATION = ".,;:!?"\n\ndef clean(text):\n    text = text.lower()\n    for mark in PUNCTUATION:\n        text.replace(mark, "")\n    return text\n\nprint(clean("Hello, World! How are you?"))', category: 'comprension' },
    ],
  },
  'txt-fix': {
    id: 'txt-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The top that sorts wrongly', difficulty: 3, xp: 25, concepts: ['tuplas', 'diccionarios'],
    statement: '`most_common(counts, n)` should return the n words **that appear most**, but it returns the ones at the end of the alphabet. Fix it.',
    expected: "[('the', 3), ('and', 2)]",
    starter: 'def most_common(counts, n):\n    ordered = sorted(counts.items(), reverse=True)\n    return ordered[:n]\n\nprint(most_common({"the": 3, "sun": 1, "and": 2, "sea": 1}, 2))',
    spec: {
      functions: [{ name: 'most_common', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ["[('the', 3), ('and', 2)]"] },
        { label: 'Top 1', call: 'print(most_common({"zeta": 1, "alpha": 5}, 1))', out_lines: ["[('alpha', 5)]"] },
        { label: 'Tie (original order)', call: 'print(most_common({"b": 2, "a": 2, "c": 1}, 2))', out_lines: ["[('b', 2), ('a', 2)]"] },
      ],
      misconceptions: [
        { out_lines: ["[('the', 3), ('sun', 1)]"], title: 'It sorts by the word', msg: 'Without key, tuples are sorted by their first item: the word. Use a key function that returns the number of times.' },
      ],
      logic_msg: 'It must sort by the number of times, from highest to lowest.',
    },
    hints: [
      { level: 'Orientation', text: '(word, times) tuples are sorted by the word by default. Which item do you want to sort by?' },
      { level: 'Reasoning', text: 'You need to pass sorted a key function that returns the second item of each tuple.' },
      { level: 'Pseudocode', text: 'times(pair): return pair[1]\nordered ← sort counts.items() by times, from highest to lowest', pre: true },
      { level: 'Technical help', text: 'Define `def times(pair): return pair[1]` and use `sorted(counts.items(), key=times, reverse=True)`.' },
    ],
    solution: {
      code: 'def times(pair):\n    return pair[1]\n\ndef most_common(counts, n):\n    ordered = sorted(counts.items(), key=times, reverse=True)\n    return ordered[:n]\n\nprint(most_common({"the": 3, "sun": 1, "and": 2, "sea": 1}, 2))',
      explanation: 'Without key, sorted compares the tuples by their first item (the word). With key=times it compares the number of times; since sorted is stable, ties keep the original order.',
    },
    reference: ['def times(pair):\n    return pair[1]\n\ndef most_common(counts, n):\n    ordered = sorted(counts.items(), key=times, reverse=True)\n    return ordered[:n]\n\nprint(most_common({"the": 3, "sun": 1, "and": 2, "sea": 1}, 2))'],
    wrongs: [
      { code: 'def most_common(counts, n):\n    ordered = sorted(counts.items(), reverse=True)\n    return ordered[:n]\n\nprint(most_common({"the": 3, "sun": 1, "and": 2, "sea": 1}, 2))', category: 'comprension' },
      { code: 'def times(pair):\n    return pair[1]\n\ndef most_common(counts, n):\n    ordered = sorted(counts.items(), key=times)\n    return ordered[:n]\n\nprint(most_common({"the": 3, "sun": 1, "and": 2, "sea": 1}, 2))', category: 'logica' },
    ],
  },
  'txt-build': {
    id: 'txt-build', type: 'code', variant: 'build', kindLabel: 'Project', topic: TOPIC,
    title: 'The text summary', difficulty: 3, xp: 40, concepts: ['diccionarios', 'composicion', 'descomponer'],
    unlock: { any: ['txt-predict', 'txt-complete', 'txt-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'You already have `clean` in the starting code. Define `summary(text)` that returns a **tuple** with three facts about the clean text:\n\n• the total number of words,\n\n• the number of different words,\n\n• the longest word (if there\'s a tie, the first one to appear).\n\nExample: `summary("The sun, the sea and the clouds.")` → `(7, 5, \'clouds\')`.',
    expected: "(7, 5, 'clouds')",
    plan: [
      {
        q: 'How do you get the number of different words?',
        options: [
          { text: 'With len of a counter dictionary (or of a set)', correct: true },
          { text: 'With len(words)', why: 'That counts all of them, including the repeated ones.' },
        ],
      },
      {
        q: 'How do you get the longest word?',
        options: [
          { text: 'max(words, key=len)', correct: true },
          { text: 'max(words)', why: 'Without key, max compares alphabetically.' },
        ],
      },
    ],
    planScaffold: '',
    starter: CLEAN + 'def summary(text):\n    words = clean(text).split()\n    # total, different and the longest\n\n\nprint(summary("The sun, the sea and the clouds."))\n',
    spec: {
      functions: [{ name: 'summary', params: 1 }, { name: 'clean', params: 1 }],
      cases: [
        { label: 'Example', call: 'print(summary("The sun, the sea and the clouds."))', out_lines: ["(7, 5, 'clouds')"] },
        { label: 'Tie in length', call: 'print(summary("Cat, hat. Bat!"))', out_lines: ["(3, 3, 'cat')"] },
        { label: 'Repetitions', call: 'print(summary("Yes, yes, YES."))', out_lines: ["(3, 1, 'yes')"] },
      ],
      misconceptions: [
        { out_lines: ["(7, 7, 'clouds')"], title: 'Different isn\'t all of them', msg: 'Repeated words only count once: use len of a counter dictionary or of set(words).' },
        { out_lines: ["(7, 5, 'the')"], title: 'It compares alphabetically', msg: 'max without key compares in alphabetical order. Use `max(words, key=len)`.' },
        { out_lines: ['None'], title: 'The return is missing', msg: 'The function has to return the tuple: `return total, different, longest`.' },
      ],
      logic_msg: 'Check with the example: 7 words in total, 5 different («the» appears three times) and «clouds» is the longest.',
    },
    hints: [
      { level: 'Orientation', text: 'You already have the list of clean words. You\'re missing three calculations and a return.' },
      { level: 'Reasoning', text: 'Total: len of the list. Different: len of a counter (or of set). Longest: max with key=len, which keeps the first one if there\'s a tie.' },
      { level: 'Pseudocode', text: 'total ← len(words)\ndifferent ← len(counter of words)\nlongest ← max(words, key=len)\nreturn total, different, longest', pre: true },
      { level: 'Technical help', text: '`len(set(words))` gives the different ones in one line. `return len(words), len(set(words)), max(words, key=len)`.' },
    ],
    solution: {
      code: CLEAN + 'def summary(text):\n    """Return (total words, different words, longest word)."""\n    words = clean(text).split()\n    counts = {}\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    longest = max(words, key=len)\n    return len(words), len(counts), longest\n\nprint(summary("The sun, the sea and the clouds."))',
      explanation: 'summary combines pieces you already know: clean, the counter dictionary and max with key. It returns a tuple, so it can be unpacked: `total, different, longest = summary(text)`.',
    },
    reference: [
      CLEAN + 'def summary(text):\n    words = clean(text).split()\n    return len(words), len(set(words)), max(words, key=len)',
    ],
    wrongs: [
      { code: CLEAN + 'def summary(text):\n    words = clean(text).split()\n    return len(words), len(words), max(words, key=len)', category: 'comprension' },
      { code: CLEAN + 'def summary(text):\n    words = clean(text).split()\n    return len(words), len(set(words)), max(words)', category: 'comprension' },
    ],
  },
};
