// Lesson 11.1 · Reading and writing files (English translation of src/content/lesson-archivos.js).

const TOPIC = 'Files';

export const LESSON_ARCHIVOS = {
  id: 'archivos',
  moduleId: 'm11',
  code: '11.1',
  title: 'Reading and writing files',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explain why programs store data in files',
    'Write text to a file with open, write and with',
    'Read a whole file or line by line',
    'Remove the trailing newline with strip',
    'Choose the right mode: "r", "w" or "a"',
  ],
  prerequisites: ['Module 10 «Dictionaries and tuples»'],
  teaser: 'You\'re starting Module 11: until now, when the program ended, everything was forgotten. With files, your data survives.',
  celebration: 'You now know how to save and recover data with files: the first step towards programs that remember.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'por-que', title: 'Data that survives', concepts: ['archivos'],
      blocks: [
        { type: 'p', text: 'Variables live in memory and disappear when the program ends. A **file** stores data on the disk: another program (or the same one, tomorrow) can read it. This is called **persistence**.' },
        { type: 'callout', tone: 'info', title: 'Files in LunaPy', text: 'LunaPy runs Python inside the browser, with its own virtual disk. The files you create last while the page is open; when you reload it, they disappear. That\'s why each example first creates the files it\'s going to read.' },
        {
          type: 'check', id: 'm11a-persistencia', concept: 'archivos', mode: 'choice',
          question: 'What happens to the value of a variable when the program ends?',
          options: [
            { text: 'It\'s lost: to keep it you have to save it, for example in a file', correct: true },
            { text: 'It stays saved for next time', why: 'Variables live in the program\'s memory: when it ends, they\'re freed.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'escribir', title: 'Writing to a file', concepts: ['archivos'],
      blocks: [
        { type: 'p', text: '`open(name, "w")` opens a file for **writing** (if it exists, it empties it). With `with`, the file **closes by itself** at the end of the block, even if there\'s an error.' },
        { type: 'code', run: true, code: 'with open("greeting.txt", "w") as f:\n    f.write("Hello\\n")\n    f.write("from LunaPy\\n")\n\nwith open("greeting.txt") as f:\n    print(f.read())' },
        { type: 'callout', tone: 'warn', title: 'write doesn\'t add newlines', text: 'Unlike print, `write` writes exactly what you give it. If you want one line per piece of data, add `"\\n"` at the end of each one.' },
        {
          type: 'check', id: 'm11a-salto', concept: 'archivos', mode: 'choice',
          question: 'What does the file contain?', code: 'with open("a.txt", "w") as f:\n    f.write("one")\n    f.write("two")\n\nwith open("a.txt") as f:\n    print(f.read())', expectOutput: 'onetwo',
          options: [
            { text: 'onetwo, on a single line', correct: true },
            { text: 'one and two on two lines', why: 'write doesn\'t add "\\n": you have to write it yourself.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'leer', title: 'Reading a file', concepts: ['archivos', 'bucles'],
      blocks: [
        { type: 'p', text: 'Without a second argument, `open` opens for **reading**. You can read it whole with `read()` or, more usually, go through it **line by line** with for:' },
        { type: 'code', run: true, code: 'with open("shopping.txt", "w") as f:\n    f.write("bread\\nmilk\\neggs\\n")\n\nwith open("shopping.txt") as f:\n    for line in f:\n        print(repr(line))      # repr shows the \\n\n\nwith open("shopping.txt") as f:\n    for line in f:\n        print("-", line.strip())' },
        { type: 'callout', tone: 'tip', title: 'strip() when reading', text: 'Each line read ends in `"\\n"`. It\'s almost always a good idea to remove it with `strip()` before comparing or converting it.' },
        {
          type: 'check', id: 'm11a-strip', concept: 'archivos', mode: 'text',
          question: 'Predict:', code: 'with open("n.txt", "w") as f:\n    f.write("Ana\\nLuis\\n")\n\ncount = 0\nwith open("n.txt") as f:\n    for line in f:\n        if line == "Ana":\n            count += 1\nprint(count)', answer: '0',
          explain: 'The line read is "Ana\\n", not "Ana": the comparison fails. With `line.strip() == "Ana"` it would give 1.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modos', title: 'Modes and errors', concepts: ['archivos', 'errores'],
      blocks: [
        {
          type: 'five', items: {
            '"r" (default)': 'Read. Error if the file doesn\'t exist.',
            '"w"': 'Write from scratch. **Deletes** the previous content.',
            '"a"': 'Append at the end, keeping what was there.',
          },
        },
        { type: 'code', run: true, code: 'with open("diary.txt", "w") as f:\n    f.write("Monday\\n")\nwith open("diary.txt", "a") as f:\n    f.write("Tuesday\\n")\nwith open("diary.txt") as f:\n    print(f.read())\n\nopen("does_not_exist.txt")' },
        {
          type: 'check', id: 'm11a-modo', concept: 'archivos', mode: 'choice',
          question: 'You want to write a new line in a diary every day without losing the earlier ones. Which mode do you use?',
          options: [
            { text: '"a"', correct: true },
            { text: '"w"', why: '"w" empties the file every time you open it: you\'d lose what you wrote before.' },
            { text: '"r"', why: '"r" is only for reading.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'arc-predict' },
    { id: 'a2', activity: 'arc-complete' },
    { id: 'a3', activity: 'arc-fix' },
    { id: 'a4', activity: 'arc-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'Files keep data beyond the program\'s run (persistence).',
    '`with open(name, mode) as f:` opens the file and closes it by itself at the end of the block.',
    'Writing: `f.write(text)`, with no automatic newline: add `"\\n"`.',
    'Reading: `f.read()` whole or `for line in f:` line by line; remove the `"\\n"` with `strip()`.',
    'Modes: `"r"` read, `"w"` write from scratch, `"a"` append at the end.',
  ],
};

export const ACTIVITIES_ARCHIVOS = {
  'arc-predict': {
    id: 'arc-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Writing and appending', difficulty: 2, xp: 10, concepts: ['archivos'],
    prompt: 'It writes, writes again and appends. **What will it show?**',
    code: 'with open("list.txt", "w") as f:\n    f.write("a\\nb\\n")\nwith open("list.txt", "w") as f:\n    f.write("c\\n")\nwith open("list.txt", "a") as f:\n    f.write("d\\n")\nwith open("list.txt") as f:\n    print(f.read().split())',
    expectedOutput: "['c', 'd']",
    options: [
      { text: "['c', 'd']", correct: true },
      { text: "['a', 'b', 'c', 'd']", concept: 'archivos', why: 'The second open with "w" empties the file: a and b are lost.' },
      { text: "['c']", concept: 'archivos', why: 'Mode "a" appends at the end: d is added after c.' },
      { text: "['d']", concept: 'archivos', why: '"a" keeps what was there (c) and adds d.' },
    ],
    explain: ['First "w": a, b.', 'Second "w": deletes and writes c.', '"a": appends d.', 'Result: c and d.'],
  },
  'arc-complete': {
    id: 'arc-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Saving the tasks', difficulty: 2, xp: 15, concepts: ['archivos', 'bucles'],
    statement: 'Complete `save(tasks, name)` so it writes each task in the list to the file, **one per line**.',
    expected: '3 tasks saved',
    starter: 'def save(tasks, name):\n    with open(name, ___) as f:\n        for task in tasks:\n            f.write(task + ___)\n\nsave(["study", "shop", "run"], "tasks.txt")\nwith open("tasks.txt") as f:\n    print(len(f.readlines()), "tasks saved")',
    spec: {
      blanks: true,
      functions: [{ name: 'save', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['3 tasks saved'] },
        { label: 'Exact content', call: 'save(["x", "y"], "t2.txt")\nwith open("t2.txt") as f:\n    print(repr(f.read()))', out_lines: ["'x\\ny\\n'"] },
        { label: 'Saving twice doesn\'t pile up', call: 'save(["a"], "t3.txt")\nsave(["b"], "t3.txt")\nwith open("t3.txt") as f:\n    print(repr(f.read()))', out_lines: ["'b\\n'"] },
      ],
      misconceptions: [
        { out_lines: ['1 tasks saved'], title: 'All on one line', msg: 'write doesn\'t add newlines: write `task + "\\n"`.' },
        { out_lines: ["'a\\nb\\n'"], title: 'It piles up', msg: 'With "a" each call appends at the end. To save the list from scratch, use "w".' },
      ],
      logic_msg: 'Each task must go on its own line.',
    },
    hints: [
      { level: 'Orientation', text: 'Two blanks: the opening mode and what goes after each task.' },
      { level: 'Reasoning', text: 'You want to write the file from scratch. Which mode is that? And for each task to go on its own line, which character do you need to add?' },
      { level: 'Pseudocode', text: 'open name for writing:\n    for each task: write task + newline', pre: true },
      { level: 'Technical help', text: '`open(name, "w")` and `f.write(task + "\\n")`.' },
    ],
    solution: {
      code: 'def save(tasks, name):\n    with open(name, "w") as f:\n        for task in tasks:\n            f.write(task + "\\n")\n\nsave(["study", "shop", "run"], "tasks.txt")\nwith open("tasks.txt") as f:\n    print(len(f.readlines()), "tasks saved")',
      explanation: '"w" writes from scratch and the "\\n" separates the tasks into lines. readlines() returns a list with one line per item.',
    },
    reference: ['def save(tasks, name):\n    with open(name, "w") as f:\n        for task in tasks:\n            f.write(task + "\\n")\n\nsave(["study", "shop", "run"], "tasks.txt")\nwith open("tasks.txt") as f:\n    print(len(f.readlines()), "tasks saved")'],
    wrongs: [
      { code: 'def save(tasks, name):\n    with open(name, ___) as f:\n        for task in tasks:\n            f.write(task + ___)', category: 'incompleto' },
      { code: 'def save(tasks, name):\n    with open(name, "w") as f:\n        for task in tasks:\n            f.write(task + "")\n\nsave(["study", "shop", "run"], "tasks.txt")\nwith open("tasks.txt") as f:\n    print(len(f.readlines()), "tasks saved")', category: 'comprension' },
    ],
  },
  'arc-fix': {
    id: 'arc-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The guest list', difficulty: 2, xp: 20, concepts: ['archivos', 'cadenas'],
    statement: '`is_invited(name, file)` should say whether a name appears in the file (one per line), but it always answers False. Fix it.',
    expected: 'True\nFalse',
    starter: 'def is_invited(name, file):\n    with open(file) as f:\n        for line in f:\n            if line == name:\n                return True\n    return False\n\nwith open("guests.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(is_invited("Luis", "guests.txt"))\nprint(is_invited("Leo", "guests.txt"))',
    spec: {
      functions: [{ name: 'is_invited', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['True', 'False'] },
        { label: 'Last line', call: 'with open("inv2.txt", "w") as f:\n    f.write("Sol\\nMar\\n")\nprint(is_invited("Mar", "inv2.txt"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['False', 'False'], title: 'The newline', msg: 'Each line read ends in "\\n": "Luis\\n" isn\'t equal to "Luis". Compare `line.strip() == name`.' },
      ],
      logic_msg: 'Check with "Luis": they\'re in the file, so it must give True.',
    },
    hints: [
      { level: 'Orientation', text: 'Show `repr(line)` inside the loop to see exactly what each line contains.' },
      { level: 'Reasoning', text: 'The lines read end in "\\n". Which method removes it?' },
      { level: 'Pseudocode', text: 'if the line without spaces or newline equals the name: return True', pre: true },
      { level: 'Technical help', text: '`if line.strip() == name:`.' },
    ],
    solution: {
      code: 'def is_invited(name, file):\n    with open(file) as f:\n        for line in f:\n            if line.strip() == name:\n                return True\n    return False\n\nwith open("guests.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(is_invited("Luis", "guests.txt"))\nprint(is_invited("Leo", "guests.txt"))',
      explanation: 'When reading line by line, each line keeps its final "\\n". strip() removes it (along with extra spaces) before comparing.',
    },
    reference: ['def is_invited(name, file):\n    with open(file) as f:\n        for line in f:\n            if line.strip() == name:\n                return True\n    return False\n\nwith open("guests.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(is_invited("Luis", "guests.txt"))\nprint(is_invited("Leo", "guests.txt"))'],
    wrongs: [
      { code: 'def is_invited(name, file):\n    with open(file) as f:\n        for line in f:\n            if line == name:\n                return True\n    return False\n\nwith open("guests.txt", "w") as f:\n    f.write("Ana\\nLuis\\nEva\\n")\nprint(is_invited("Luis", "guests.txt"))\nprint(is_invited("Leo", "guests.txt"))', category: 'comprension' },
    ],
  },
  'arc-build': {
    id: 'arc-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The file\'s average', difficulty: 3, xp: 30, concepts: ['archivos', 'bucles'],
    unlock: { any: ['arc-predict', 'arc-complete', 'arc-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'A file has one mark per line (there may be empty lines, which you must **ignore**). Define `file_average(name)` that returns the average of the marks rounded to 2 decimal places.\n\nTo test it, first create a file with some marks.',
    expected: '7.17',
    plan: [
      {
        q: 'What do you do with each line before adding it?',
        options: [
          { text: 'strip() and, if it isn\'t left empty, convert it with float()', correct: true },
          { text: 'Add it directly', why: 'It\'s a text ("7.5\\n"): first you have to clean it and convert it.' },
        ],
      },
      {
        q: 'What do you divide the sum by?',
        options: [
          { text: 'By the number of marks you\'ve added', correct: true },
          { text: 'By the number of lines in the file', why: 'Empty lines aren\'t marks: they mustn\'t count.' },
        ],
      },
    ],
    planScaffold: 'def file_average(name):\n    # add up and count the marks (skipping empty lines)\n\n\nwith open("marks.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(file_average("marks.txt"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'file_average', params: 1 }],
      cases: [
        { label: '6, 8.5 and 7 (with an empty line)', call: 'with open("m1.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(file_average("m1.txt"))', out_lines: ['7.17'] },
        { label: 'One mark', call: 'with open("m2.txt", "w") as f:\n    f.write("10\\n")\nprint(file_average("m2.txt"))', out_lines: ['10.0'] },
        { label: 'Spaces around', call: 'with open("m3.txt", "w") as f:\n    f.write("  4 \\n6\\n")\nprint(file_average("m3.txt"))', out_lines: ['5.0'] },
      ],
      misconceptions: [
        { out_lines: ['5.38'], title: 'You count the empty lines', msg: 'You divide by all the lines, including the empty one. Count only the marks you add.' },
      ],
      logic_msg: 'Check with 6, 8.5 and 7: (6 + 8.5 + 7) / 3 = 7.17.',
    },
    hints: [
      { level: 'Orientation', text: 'An accumulator for the sum, a counter for the marks and a for over the lines.' },
      { level: 'Reasoning', text: 'For each line: strip(). If the result is empty, skip it; if not, convert it with float, add it and count it.' },
      { level: 'Pseudocode', text: 'total ← 0; count ← 0\nfor each line in the file:\n    text ← line without spaces\n    if text isn\'t empty: total += float(text); count += 1\nreturn round(total / count, 2)', pre: true },
      { level: 'Technical help', text: '`text = line.strip()` and `if text != "":` (or simply `if text:`).' },
    ],
    solution: {
      code: 'def file_average(name):\n    """Return the average of the marks in the file (one per line)."""\n    total = 0\n    count = 0\n    with open(name) as f:\n        for line in f:\n            text = line.strip()\n            if text:\n                total += float(text)\n                count += 1\n    return round(total / count, 2)\n\nwith open("marks.txt", "w") as f:\n    f.write("6\\n8.5\\n\\n7\\n")\nprint(file_average("marks.txt"))',
      explanation: 'Each line is cleaned with strip(); the empty ones are skipped. Only the real marks are counted, so the average isn\'t affected by blank lines.',
    },
    reference: [
      'def file_average(name):\n    marks = []\n    with open(name) as f:\n        for line in f:\n            if line.strip():\n                marks.append(float(line))\n    return round(sum(marks) / len(marks), 2)',
    ],
    wrongs: [
      { code: 'def file_average(name):\n    total = 0\n    lines = 0\n    with open(name) as f:\n        for line in f:\n            lines += 1\n            if line.strip():\n                total += float(line)\n    return round(total / lines, 2)', category: 'comprension' },
      { code: 'def file_average(name):\n    total = 0\n    count = 0\n    with open(name) as f:\n        for line in f:\n            total += float(line)\n            count += 1\n    return round(total / count, 2)', category: 'ejecucion' },
    ],
  },
};
