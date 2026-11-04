// Lesson 3.2 · Defining your own functions (English translation of src/content/lesson-definir-funciones.js).

const TOPIC = 'Functions';

export const LESSON_DEFINIR_FUNCIONES = {
  id: 'definir-funciones',
  moduleId: 'm3',
  code: '3.2',
  title: 'Defining your own functions',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Explain what creating your own functions is for',
    'Define a function with def, a colon and indentation',
    'Tell defining a function apart from calling it',
    'Follow the flow of execution when functions call other functions',
    'Fix the typical errors: indentation, colon and names',
  ],
  prerequisites: ['Lesson 3.1 «Calling functions»'],
  teaser: 'Until now you used functions that other people had written. Today you create your own: you name them, decide what they do and reuse them.',
  celebration: 'You now create your own functions and can follow the path Python takes when calling them. In the next lesson you\'ll give them data with parameters.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'por-que', title: 'Why create functions?', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'Imagine your program shows the same header in three places. Copy and paste works… until you want to change it and have to do it three times (and forget one).' },
        { type: 'code', run: true, code: 'print("==========")\nprint("  LunaPy")\nprint("==========")\nprint("Lesson 1")\nprint("==========")\nprint("  LunaPy")\nprint("==========")\nprint("Lesson 2")' },
        { type: 'p', text: 'A **function of your own** groups those lines under a name. After that, just writing the name runs them all:' },
        { type: 'code', run: true, code: 'def header():\n    print("==========")\n    print("  LunaPy")\n    print("==========")\n\nheader()\nprint("Lesson 1")\nheader()\nprint("Lesson 2")' },
        {
          type: 'five', items: {
            'Reuse': 'You write the code once and use it as many times as you like.',
            'Give it a name': '`header()` explains what it does better than three `print` lines in a row.',
            'Change in one place': 'If you change the function, it changes everywhere you call it.',
          },
        },
        {
          type: 'check', id: 'm3d-motivo', concept: 'funciones', mode: 'choice',
          question: 'You want to change the header text. How many changes do you make in the version with a function?',
          options: [
            { text: 'One: inside the function', correct: true },
            { text: 'Two: one for each time I call it', why: 'The calls only say «run header». The content is in a single place: the definition.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'def', title: 'Defining and calling', concepts: ['funciones'],
      blocks: [
        { type: 'p', text: 'A **definition** has a header and a body:' },
        {
          type: 'five', items: {
            'def': 'The word that says «I\'m going to define a function».',
            'Name and ()': 'Same rules as variables: `header`, `show_menu`…',
            'Colon': 'At the end of the header: `def header():`',
            'Indented body': 'The lines of the function, moved 4 spaces to the right.',
          },
        },
        { type: 'callout', tone: 'warn', title: 'Defining isn\'t running', text: 'When it reads `def`, Python only **learns** the function: it doesn\'t run its body. The body runs every time you **call** it by writing its name with brackets.' },
        {
          type: 'check', id: 'm3d-sin-llamar', concept: 'funciones', mode: 'text',
          question: 'Predict:', code: 'def hello():\n    print("Hello")\n\nprint("End")', answer: 'End',
          explain: 'The function is defined, but nobody calls it: its `print` never runs.',
        },
        {
          type: 'check', id: 'm3d-dos-llamadas', concept: 'funciones', mode: 'choice',
          question: 'What will it show?', code: 'def echo():\n    print("Hello!")\n\necho()\necho()', expectOutput: 'Hello!\nHello!',
          options: [
            { text: 'Hello! twice, one per line', correct: true },
            { text: 'Hello! once', why: 'Each call runs the body again: two calls, two greetings.' },
            { text: 'Hello! three times', why: 'The definition doesn\'t count: only the calls run the body.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sangria', title: 'Indentation marks the body', concepts: ['funciones', 'errores'],
      blocks: [
        { type: 'p', text: 'In Python, **indentation** (the spaces on the left) isn\'t decoration: it decides which lines are part of the function. As soon as a line goes back to the margin, the function has ended.' },
        { type: 'code', run: true, code: 'def menu():\n    print("1. Play")\n    print("2. Options")\nprint("Welcome")   # outside the function\nmenu()' },
        { type: 'code', run: true, title: 'No indentation', code: 'def menu():\nprint("1. Play")' },
        { type: 'code', run: true, title: 'No colon', code: 'def menu()\n    print("1. Play")' },
        { type: 'callout', tone: 'tip', title: 'Four spaces', text: 'Always use 4 spaces (the editor adds them when you press Tab). Mixing 2 and 4 spaces in the same body produces an IndentationError.' },
        {
          type: 'check', id: 'm3d-fuera', concept: 'funciones', mode: 'choice',
          question: 'What will it show?', code: 'def menu():\n    print("1. Play")\nprint("2. Quit")\nmenu()', expectOutput: '2. Quit\n1. Play',
          options: [
            { text: '«2. Quit» and then «1. Play»', correct: true },
            { text: '«1. Play» and then «2. Quit»', why: '«2. Quit» has no indentation: it doesn\'t belong to the function and runs first, because menu() is called on the last line.' },
            { text: 'Only «1. Play»', why: 'The «2. Quit» line is outside the function, in the main program, so it runs too.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'flujo', title: 'Functions that call functions', concepts: ['funciones', 'algoritmo'],
      blocks: [
        { type: 'p', text: 'A function can call another one. When it does, Python **jumps** into the body of the called function, runs all of it and **comes back** exactly where it was. It\'s like a detour that always returns to the road.' },
        { type: 'p', text: 'Move forward step by step and watch the **Memory** panel: each call opens its own frame, which disappears when it finishes.' },
        { type: 'trace', code: 'def line():\n    print("----------")\n\ndef title():\n    line()\n    print("  LunaPy")\n    line()\n\nprint("Start")\ntitle()\nprint("End")' },
        {
          type: 'check', id: 'm3d-flujo', concept: 'funciones', mode: 'choice',
          question: 'What will it show?', code: 'def a():\n    print("A")\n\ndef b():\n    print("B")\n    a()\n\nb()\na()', expectOutput: 'B\nA\nA',
          options: [
            { text: 'B, A, A (one per line)', correct: true },
            { text: 'A, B, A', why: 'Python runs the calls in order: first `b()`, which shows B and then calls `a()`.' },
            { text: 'B, A', why: 'The last line is missing: after `b()` there\'s another call to `a()`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'orden', title: 'Define first, call afterwards', concepts: ['funciones', 'errores'],
      blocks: [
        { type: 'p', text: 'Python reads the program from top to bottom. If you call a function before its `def` has run, it doesn\'t know it yet:' },
        { type: 'code', run: true, code: 'greet()\n\ndef greet():\n    print("Hello")' },
        { type: 'callout', tone: 'tip', title: 'A structure that always works', text: 'Put all the definitions at the top and the main program (the calls) at the bottom. Inside a function you can call another one defined further down, as long as the call happens when both already exist.' },
        {
          type: 'more', summary: 'Tips for naming functions',
          items: [
            'Use verbs that describe the action: `show_menu`, `draw_line`, `greet`.',
            'Don\'t reuse the name of a variable or of a Python function like `print` or `len`: you\'d hide it.',
            'Python is case-sensitive: `Greet()` and `greet()` are different names.',
          ],
        },
        {
          type: 'check', id: 'm3d-antes', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'say_goodbye()\n\ndef say_goodbye():\n    print("Goodbye")', expectError: 'NameError',
          options: [
            { text: 'NameError: say_goodbye doesn\'t exist yet', correct: true },
            { text: 'It shows Goodbye', why: 'The call is on the first line, before Python has read the `def`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'def-predict' },
    { id: 'a2', activity: 'def-complete' },
    { id: 'a3', activity: 'def-fix' },
    { id: 'a4', activity: 'def-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A function of your own groups code under a name so you can reuse it and change it in one place.',
    'It\'s defined with `def name():` and a body indented by 4 spaces.',
    'Defining doesn\'t run anything: the body runs on each **call**, `name()`.',
    'Indentation decides which lines belong to the function; with no indentation or no colon there\'s an error.',
    'When calling, Python jumps into the body, runs it and comes back to where it was.',
    'Define functions before calling them: definitions at the top, main program at the bottom.',
  ],
};

export const ACTIVITIES_DEFINIR_FUNCIONES = {
  'def-predict': {
    id: 'def-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The chorus', difficulty: 1, xp: 10, concepts: ['funciones'],
    prompt: 'Follow the flow: when does the body of the function run? **What will it show?**',
    code: 'def chorus():\n    print("la la la")\n\nprint("Start")\nchorus()\nprint("Middle")\nchorus()',
    expectedOutput: 'Start\nla la la\nMiddle\nla la la',
    options: [
      { text: 'Start, la la la, Middle, la la la', correct: true },
      { text: 'la la la, Start, la la la, Middle, la la la', concept: 'funciones', why: 'The definition doesn\'t run anything: the body only runs on each call.' },
      { text: 'Start, la la la, Middle', concept: 'funciones', why: 'Each call runs the body again: there are two calls, so «la la la» comes out twice.' },
      { text: 'Start, Middle, la la la, la la la', concept: 'funciones', why: 'Python runs the lines in order: the first call is between «Start» and «Middle».' },
    ],
    explain: [
      'Lines 1–2: Python learns `chorus`, without running it.',
      'It shows «Start» and the first call shows «la la la».',
      'It shows «Middle» and the second call shows «la la la» again.',
    ],
  },
  'def-complete': {
    id: 'def-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The framed menu', difficulty: 1, xp: 15, concepts: ['funciones'],
    statement: 'Fill in the gaps to **define** the `separator` function and **call** it before and after the title:',
    expected: '====================\nToday\'s menu\n====================',
    starter: '___ separator___\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\n___',
    spec: {
      blanks: true,
      functions: [{ name: 'separator', params: 0 }],
      cases: [{ label: 'Expected output', out_lines: ['====================', 'Today\'s menu', '===================='] }],
      misconceptions: [
        { out_lines: ['====================', 'Today\'s menu'], title: 'A call is missing', msg: 'The bottom line doesn\'t appear: the last gap has to **call** the function again.' },
      ],
      rules: [{ type: 'must_call', name: 'separator', title: 'Use the function', msg: 'Call separator() instead of repeating the print.' }],
      logic_msg: 'Compare your output with the expected one: a line of equals signs, the title and another line of equals signs.',
    },
    hints: [
      { level: 'Orientation', text: 'The first two gaps are in the **definition**; the last one, in the main program.' },
      { level: 'Reasoning', text: 'Which word does a definition start with? What comes after the name? How do you run a function that\'s already defined?' },
      { level: 'Pseudocode', text: 'define separator with no data:\n    show 20 = signs\ncall separator\nshow the title\ncall separator', pre: true },
      { level: 'Technical help', text: 'The header is `def separator():` (brackets and colon). To call it: `separator()`.' },
    ],
    solution: {
      code: 'def separator():\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\nseparator()',
      explanation: '`def separator():` defines the function; each `separator()` runs it. The line of equals signs is written once and appears twice.',
    },
    reference: ['def separator():\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\nseparator()'],
    wrongs: [
      { code: '___ separator___\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\n___', category: 'incompleto' },
      { code: 'def separator()\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\nseparator()', category: 'sintaxis' },
      { code: 'def separator():\n    print("=" * 20)\n\nseparator()\nprint("Today\'s menu")\nseparator', category: 'comprension' },
    ],
  },
  'def-fix': {
    id: 'def-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The broken header', difficulty: 2, xp: 20, concepts: ['funciones', 'errores'],
    statement: 'This program should show the header twice, but it has **three errors**. Run it, read each error and fix them one by one.',
    expected: 'LunaPy\nLearn Python\nLunaPy\nLearn Python',
    starter: 'def header()\n    print("LunaPy")\n  print("Learn Python")\n\nheader()\nHeader()',
    spec: {
      functions: [{ name: 'header', params: 0, missing_msg: 'Keep the header function: fix its errors instead of removing it.' }],
      cases: [{ label: 'Expected output', out_lines: ['LunaPy', 'Learn Python', 'LunaPy', 'Learn Python'] }],
      misconceptions: [
        { out_lines: ['Learn Python', 'LunaPy', 'LunaPy'], title: 'A line has slipped out', msg: '«Learn Python» is shown only once and at the start: that line has ended up outside the function. Give it the same indentation as the one before.' },
      ],
      rules: [{ type: 'must_call', name: 'header', title: 'Call the function', msg: 'The program must call header() instead of repeating the print lines.' }],
      logic_msg: 'There are no errors left, but the output doesn\'t match. How many times is the function called? Are both lines inside it?',
    },
    hints: [
      { level: 'Orientation', text: 'Run it and read the first error: Python checks the writing (syntax) before running anything. Fix it, run again and repeat.' },
      { level: 'Reasoning', text: 'What\'s missing at the end of the function header? Do the two lines of the body have the same indentation? Does the name in the last call match the one in the definition?' },
      { level: 'Pseudocode', text: 'Line 1: add the colon\nLine 3: 4 spaces of indentation, like line 2\nLine 6: the name in lower case', pre: true },
      { level: 'Technical help', text: 'The header ends with `:`. The whole body has 4 spaces. Python is case-sensitive: `header` isn\'t `Header`.' },
    ],
    solution: {
      code: 'def header():\n    print("LunaPy")\n    print("Learn Python")\n\nheader()\nheader()',
      explanation: 'The first two errors are writing errors (the colon is missing and the indentation doesn\'t match) and Python spots them before running. The third, `Header()`, is a NameError that only appears when running.',
    },
    reference: ['def header():\n    print("LunaPy")\n    print("Learn Python")\n\nheader()\nheader()'],
    wrongs: [
      { code: 'def header()\n    print("LunaPy")\n  print("Learn Python")\n\nheader()\nHeader()', category: 'sintaxis' },
      { code: 'def header():\n    print("LunaPy")\n  print("Learn Python")\n\nheader()\nHeader()', category: 'sintaxis' },
      { code: 'def header():\n    print("LunaPy")\n    print("Learn Python")\n\nheader()\nHeader()', category: 'ejecucion' },
      { code: 'def header():\n    print("LunaPy")\nprint("Learn Python")\n\nheader()\nheader()', category: 'comprension' },
    ],
  },
  'def-build': {
    id: 'def-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The birthday card', difficulty: 2, xp: 25, concepts: ['funciones', 'descomponer'],
    unlock: { any: ['def-predict', 'def-complete', 'def-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define two functions:\n\n• `border()`, which shows a line of **20 asterisks**.\n\n• `card()`, which shows the border, the text `Happy birthday!` and the border again, **by calling `border()`**.\n\nWhen checking, LunaPy will call your functions. You can call them yourself too to test them.',
    expected: '********************\nHappy birthday!\n********************',
    plan: [
      {
        q: 'Which function should you define first?',
        options: [
          { text: 'The order doesn\'t matter, as long as both are defined before card() is called', correct: true },
          { text: 'card(), necessarily', why: 'All that matters is that, **when** `card()` **is called**, `border()` already exists.' },
        ],
      },
      {
        q: 'How does card() show the lines of asterisks?',
        options: [
          { text: 'By calling border() twice', correct: true },
          { text: 'By copying the print from border() twice', why: 'It would work, but if you changed the border you\'d have to change it in three places. Reuse is the whole point of functions.' },
        ],
      },
    ],
    planScaffold: '# Function that draws the border\n\n# Function that draws the card using border()\n\n# Test: call card()\n',
    starter: '',
    spec: {
      functions: [{ name: 'border', params: 0 }, { name: 'card', params: 0 }],
      cases: [
        { label: 'card()', call: 'card()', out_lines: ['********************', 'Happy birthday!', '********************'] },
        { label: 'border()', call: 'border()', out_lines: ['********************'] },
      ],
      misconceptions: [
        { out_lines: ['Happy birthday!'], title: 'The borders are missing', msg: '`card()` has to call `border()` before and after the text.' },
        { out_lines: ['********************', 'Happy birthday!'], title: 'The bottom border is missing', msg: 'After the text, `card()` has to call `border()` again.' },
      ],
      rules: [{ type: 'must_call', name: 'border', title: 'Reuse border()', msg: 'Make card() call border() instead of repeating the asterisks.' }],
      logic_msg: 'Compare the output with the expected one: exactly 20 asterisks, the text with its punctuation and another 20 asterisks.',
    },
    hints: [
      { level: 'Orientation', text: 'Two small functions. Start with `border()`, test it by calling it and then write `card()`.' },
      { level: 'Reasoning', text: 'For 20 asterisks you don\'t need to count them by hand: remember what `*` does with a text.' },
      { level: 'Pseudocode', text: 'define border:\n    show "*" repeated 20 times\ndefine card:\n    border\n    show Happy birthday!\n    border', pre: true },
      { level: 'Technical help', text: '`print("*" * 20)` shows 20 asterisks. Inside `card`, each `border()` has 4 spaces of indentation.' },
    ],
    solution: {
      code: 'def border():\n    print("*" * 20)\n\ndef card():\n    border()\n    print("Happy birthday!")\n    border()\n\ncard()',
      explanation: '`card()` reuses `border()` twice. If tomorrow you want a border of dashes, you only change one line.',
    },
    reference: [
      'def border():\n    print("*" * 20)\n\ndef card():\n    border()\n    print("Happy birthday!")\n    border()',
      'def card():\n    border()\n    print("Happy birthday!")\n    border()\n\ndef border():\n    print("********************")\n\ncard()',
    ],
    wrongs: [
      { code: 'def border():\n    print("*" * 20)\n\ndef card():\n    print("Happy birthday!")', category: 'comprension' },
      { code: 'def border():\n    print("*" * 20)\n\ndef card():\n    border()\n    print("Happy birthday!")', category: 'comprension' },
      { code: 'def border():\n    print("*" * 20)', category: 'comprension' },
      { code: 'def border():\n    print("*" * 2)\n\ndef card():\n    border()\n    print("Happy birthday!")\n    border()', category: 'logica' },
    ],
  },
};
