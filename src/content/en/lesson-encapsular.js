// Lesson 4.1 · Encapsulation and generalisation (English translation of src/content/lesson-encapsular.js).

const TOPIC = 'Function design';

export const LESSON_ENCAPSULAR = {
  id: 'encapsular',
  moduleId: 'm4',
  code: '4.1',
  title: 'Encapsulation and generalisation',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Encapsulate: wrap a piece of code in a named function',
    'Generalise: replace fixed values with parameters',
    'Build big functions out of small ones',
    'Spot a function that ignores its parameters',
  ],
  prerequisites: ['Module 3 «Functions, parameters and arguments»'],
  teaser: 'You\'re starting Module 4: today you turn code that only works for one case into functions that work for all of them.',
  celebration: 'You now know how to encapsulate and generalise: your functions stop working for just one case and start working for all of them.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'encapsular', title: 'Encapsulating: giving a piece of code a name', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'This program draws a line of 10 hash signs. It works, but if you need the line in several places you\'ll have to repeat it.' },
        { type: 'code', run: true, code: 'print("#" * 10)' },
        { type: 'p', text: '**Encapsulating** is wrapping that code in a function with a name that says what it does. You already did it in Module 3; now we give the technique a name:' },
        { type: 'code', run: true, code: 'def line_of_10():\n    print("#" * 10)\n\nline_of_10()\nprint("Title")\nline_of_10()' },
        {
          type: 'check', id: 'm4e-encapsular', concept: 'diseno', mode: 'choice',
          question: 'What do you gain by encapsulating?',
          options: [
            { text: 'A name that explains the code and the ability to reuse it', correct: true },
            { text: 'The program runs faster', why: 'The speed is the same: the advantage is that the code is easier to understand and reuse.' },
            { text: 'Nothing: it just adds lines', why: 'It adds a few lines, but each call saves repeating the code and the name documents what it does.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'generalizar', title: 'Generalising: from one case to all', concepts: ['diseno', 'parametros'],
      blocks: [
        { type: 'p', text: '`line_of_10()` only knows how to make lines of 10. What if you need one of 25? **Generalising** is changing the fixed value into a parameter:' },
        { type: 'code', run: true, code: 'def line(n):\n    print("#" * n)\n\nline(3)\nline(8)' },
        { type: 'p', text: 'You can keep generalising: why always hash signs? Another parameter for the symbol:' },
        { type: 'code', run: true, code: 'def line(n, symbol):\n    print(symbol * n)\n\nline(5, "*")\nline(3, "=-")' },
        { type: 'callout', tone: 'tip', title: 'Ask yourself what could change', text: 'Look for values typed in by hand in your function. If another use could need a different value, turn it into a parameter. Without overdoing it: a function with ten parameters is hard to use.' },
        {
          type: 'check', id: 'm4e-general', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'def line(n, symbol):\n    print(symbol * n)\n\nline(4, "ab")', answer: 'abababab',
          explain: 'The text "ab" is repeated 4 times.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'componer', title: 'Functions made of functions', concepts: ['diseno', 'funciones'],
      blocks: [
        { type: 'p', text: 'With a line you can build a rectangle: a row repeated several times. The trick: `"\\n"` is the **line break** inside a text, so `(row + "\\n") * height` repeats the row on separate lines.' },
        { type: 'code', run: true, code: 'def rectangle(width, height, symbol):\n    row = symbol * width\n    print((row + "\\n") * height, end="")\n\nrectangle(6, 3, "#")\nrectangle(2, 2, "o")', caption: '`end=""` avoids the extra blank line: the text already ends with a line break.' },
        { type: 'p', text: 'And with small functions you can put together bigger ones. Each piece is tested separately:' },
        { type: 'code', run: true, code: 'def line(n, symbol):\n    print(symbol * n)\n\ndef title(text):\n    line(len(text), "=")\n    print(text)\n    line(len(text), "=")\n\ntitle("Menu")\ntitle("Settings")' },
        {
          type: 'check', id: 'm4e-rect', concept: 'diseno', mode: 'choice',
          question: 'What will it show?', code: 'def rectangle(width, height, symbol):\n    row = symbol * width\n    print((row + "\\n") * height, end="")\n\nrectangle(3, 2, "*")', expectOutput: '***\n***',
          options: [
            { text: 'Two rows of three asterisks', correct: true },
            { text: 'Three rows of two asterisks', why: 'The first argument is the width (3 per row) and the second, the height (2 rows).' },
            { text: 'One row of six asterisks', why: 'The `"\\n"` makes each repetition of the row start on a new line.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ignorar', title: 'Watch out for half-done generalising', concepts: ['diseno', 'errores'],
      blocks: [
        { type: 'p', text: 'A common mistake when generalising: adding the parameter… and still using the fixed value inside. The program gives no error, but the function always does the same thing:' },
        { type: 'code', run: true, code: 'def line(n):\n    print("#" * 10)   # it ignores n!\n\nline(3)\nline(15)' },
        { type: 'callout', tone: 'warn', title: 'Test it with different values', text: 'If a function with parameters gives the same result with different arguments, it\'s probably ignoring one. Test it with at least two very different values.' },
        {
          type: 'check', id: 'm4e-ignora', concept: 'diseno', mode: 'choice',
          question: 'What\'s wrong with this function?', code: 'def greet(name):\n    print("Hello, Ana")\n\ngreet("Luis")', expectOutput: 'Hello, Ana',
          options: [
            { text: 'It ignores its parameter: it always greets Ana', correct: true },
            { text: 'It gives an error because it doesn\'t use name', why: 'Python doesn\'t force you to use the parameters: there\'s no error, and that\'s why the bug goes unnoticed.' },
          ],
          explain: 'The right version uses the parameter: `print("Hello,", name)`.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'enc-predict' },
    { id: 'a2', activity: 'enc-complete' },
    { id: 'a3', activity: 'enc-fix' },
    { id: 'a4', activity: 'enc-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '**Encapsulate**: wrap code in a function with a name that explains what it does.',
    '**Generalise**: change fixed values into parameters so the function works in more cases.',
    'Big functions are put together from small functions, each one tested separately.',
    '`"\\n"` is a line break inside a text: `(row + "\\n") * height` draws several rows.',
    'A function that ignores its parameters doesn\'t give an error: test it with different values.',
  ],
};

export const ACTIVITIES_ENCAPSULAR = {
  'enc-predict': {
    id: 'enc-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Made-to-measure lines', difficulty: 1, xp: 10, concepts: ['diseno', 'parametros'],
    prompt: 'The same function, two calls with different arguments. **What will it show?**',
    code: 'def line(n, symbol):\n    print(symbol * n)\n\nline(3, "*")\nline(2, "ab")',
    expectedOutput: '***\nabab',
    options: [
      { text: '*** and abab underneath', correct: true },
      { text: '*** and ab ab underneath', concept: 'tipos', why: 'Repeating a text doesn\'t add spaces: "ab" * 2 is "abab".' },
      { text: '3* and 2ab underneath', concept: 'tipos', why: 'Multiplying a text by a number **repeats** it: "*" * 3 is "***".' },
      { text: '*** twice', concept: 'parametros', why: 'Each call uses its own arguments: the second one repeats "ab" twice.' },
    ],
    explain: ['`line(3, "*")`: n = 3, symbol = "*" → ***', '`line(2, "ab")`: n = 2, symbol = "ab" → abab'],
  },
  'enc-complete': {
    id: 'enc-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Boxes of any size', difficulty: 2, xp: 15, concepts: ['diseno', 'parametros'],
    statement: 'This function should draw a box of `#` of any width and height. Fill in the gaps **with the parameters** so it works with any size:',
    expected: '####\n####',
    starter: 'def box(width, height):\n    row = "#" * ___\n    print((row + "\\n") * ___, end="")\n\nbox(4, 2)',
    spec: {
      blanks: true,
      functions: [{ name: 'box', params: 2 }],
      cases: [
        { label: 'box(4, 2)', call: 'box(4, 2)', out_lines: ['####', '####'] },
        { label: 'box(2, 3)', call: 'box(2, 3)', out_lines: ['##', '##', '##'] },
        { label: 'box(5, 1)', call: 'box(5, 1)', out_lines: ['#####'] },
      ],
      misconceptions: [
        { out_lines: ['##', '##', '##', '##'], title: 'Width and height swapped', msg: 'You\'ve swapped the parameters: the row is `width` long and is repeated `height` times.' },
      ],
      logic_msg: 'With this size the box doesn\'t come out right. Are you using the parameters, or have you written fixed numbers?',
    },
    hints: [
      { level: 'Orientation', text: 'Both gaps are parameters of the function: one decides how long a row is and the other how many rows there are.' },
      { level: 'Reasoning', text: 'If you write numbers (4 and 2), it will only work for the example box. What\'s the name of the width data? And the height?' },
      { level: 'Pseudocode', text: 'row ← "#" repeated width times\nshow the row repeated height times', pre: true },
      { level: 'Technical help', text: '`row = "#" * width` and `(row + "\\n") * height`.' },
    ],
    solution: {
      code: 'def box(width, height):\n    row = "#" * width\n    print((row + "\\n") * height, end="")\n\nbox(4, 2)',
      explanation: 'By using the parameters instead of fixed numbers, the same function draws boxes of any size: that\'s generalising.',
    },
    reference: ['def box(width, height):\n    row = "#" * width\n    print((row + "\\n") * height, end="")\n\nbox(4, 2)'],
    wrongs: [
      { code: 'def box(width, height):\n    row = "#" * ___\n    print((row + "\\n") * ___, end="")', category: 'incompleto' },
      { code: 'def box(width, height):\n    row = "#" * 4\n    print((row + "\\n") * 2, end="")', category: 'logica' },
      { code: 'def box(width, height):\n    row = "#" * height\n    print((row + "\\n") * width, end="")', category: 'comprension' },
    ],
  },
  'enc-fix': {
    id: 'enc-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The one-size-fits-all underline', difficulty: 2, xp: 20, concepts: ['diseno', 'funciones'],
    statement: 'The `underline` function should put **as many dashes as the text has letters** under each text. It gives no error, but something is wrong: run it and compare.',
    expected: 'Hello\n-----\nProgramming\n-----------',
    starter: 'def underline(text):\n    print(text)\n    print("-" * 10)\n\nunderline("Hello")\nunderline("Programming")',
    spec: {
      functions: [{ name: 'underline', params: 1 }],
      cases: [
        { label: 'underline("Hello")', call: 'underline("Hello")', out_lines: ['Hello', '-----'] },
        { label: 'underline("Programming")', call: 'underline("Programming")', out_lines: ['Programming', '-----------'] },
        { label: 'underline("Python is great")', call: 'underline("Python is great")', out_lines: ['Python is great', '---------------'] },
      ],
      misconceptions: [
        { out_lines: ['Hello', '----------'], title: 'Always 10 dashes', msg: 'The function uses a fixed 10: count the letters of the text with `len(text)`.' },
      ],
      logic_msg: 'The number of dashes must match the length of the text, whatever it is.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: «Hello» has 5 letters and 10 dashes appear. Where does that 10 come from?' },
      { level: 'Reasoning', text: 'The number of dashes depends on the text. Which function from lesson 3.1 counts characters?' },
      { level: 'Pseudocode', text: 'show text\nshow "-" repeated as many times as text has characters', pre: true },
      { level: 'Technical help', text: '`len(text)` gives the number of characters: `print("-" * len(text))`.' },
    ],
    solution: {
      code: 'def underline(text):\n    print(text)\n    print("-" * len(text))\n\nunderline("Hello")\nunderline("Programming")',
      explanation: 'The 10 was a fixed value that made the function «one size fits all». With `len(text)` the underline adapts to any text.',
    },
    reference: ['def underline(text):\n    print(text)\n    print("-" * len(text))'],
    wrongs: [
      { code: 'def underline(text):\n    print(text)\n    print("-" * 10)', category: 'comprension' },
      { code: 'def underline(text):\n    print(text)\n    print("-" * len(Text))', category: 'ejecucion' },
      { code: 'def underline(text):\n    print(text)\n    print("-" * 4)', category: 'logica' },
    ],
  },
  'enc-build': {
    id: 'enc-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The frame for texts', difficulty: 3, xp: 30, concepts: ['diseno', 'funciones', 'descomponer'],
    unlock: { any: ['enc-predict', 'enc-complete', 'enc-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define a function `frame(text)` that shows the text inside a frame that **adapts to its length**. For example, `frame("Hello")` must show the expected output below.\n\nThe border has a `+` at each end and as many dashes as the text has letters **plus 2** (for the spaces on each side).',
    expected: '+-------+\n| Hello |\n+-------+',
    plan: [
      {
        q: 'For «Hello» (5 letters), how many dashes does the border have?',
        options: [
          { text: '7: the 5 letters plus the 2 spaces', correct: true },
          { text: '5: one per letter', why: 'Look at the middle line: there\'s a space on each side of the text, and the border covers them too.' },
        ],
      },
      {
        q: 'How do you avoid writing the border twice?',
        options: [
          { text: 'By storing it in a variable (or with another function) and showing it at the top and the bottom', correct: true },
          { text: 'It can\'t be avoided', why: 'Work it out once, store it in a `border` variable and show it twice.' },
        ],
      },
    ],
    planScaffold: 'def frame(text):\n    # 1. Work out the border from the length of the text\n\n    # 2. Show border, text with | and spaces, border\n\n\nframe("Hello")\n',
    starter: '',
    spec: {
      functions: [{ name: 'frame', params: 1 }],
      cases: [
        { label: 'frame("Hello")', call: 'frame("Hello")', out_lines: ['+-------+', '| Hello |', '+-------+'] },
        { label: 'frame("LunaPy")', call: 'frame("LunaPy")', out_lines: ['+--------+', '| LunaPy |', '+--------+'] },
        { label: 'frame("Python rocks!")', call: 'frame("Python rocks!")', out_lines: ['+---------------+', '| Python rocks! |', '+---------------+'] },
      ],
      misconceptions: [
        { out_lines: ['+-----+', '| Hello |', '+-----+'], title: '2 dashes are missing', msg: 'The border is 2 dashes longer than the text, because of the spaces on each side: `len(text) + 2`.' },
        { out_lines: ['+-------+', '|Hello|', '+-------+'], title: 'The spaces are missing', msg: 'The middle line has a space between each `|` and the text: `"| " + text + " |"`.' },
      ],
      rules: [{ type: 'must_call', name: 'len', title: 'Fit the frame to the text', msg: 'Work out the border with len(text) so it works with any text.' }],
      logic_msg: 'Compare the three lines with the expected ones: the + in the corners, the number of dashes and the spaces next to the |.',
    },
    hints: [
      { level: 'Orientation', text: 'Three lines: border, framed text and the same border. Only the length of the border changes.' },
      { level: 'Reasoning', text: 'The number of dashes depends on the text: `len(text) + 2`. Build the border by joining `"+"`, the dashes and `"+"`.' },
      { level: 'Pseudocode', text: 'border ← "+" + "-" × (length of the text + 2) + "+"\nshow border\nshow "| " + text + " |"\nshow border', pre: true },
      { level: 'Technical help', text: '`border = "+" + "-" * (len(text) + 2) + "+"`. Watch the brackets: without them, the `+ 2` would be added to the text.' },
    ],
    solution: {
      code: 'def frame(text):\n    border = "+" + "-" * (len(text) + 2) + "+"\n    print(border)\n    print("| " + text + " |")\n    print(border)\n\nframe("Hello")',
      explanation: 'The border is worked out just once from `len(text)` and shown at the top and the bottom. The same function works for any text.',
    },
    reference: [
      'def frame(text):\n    border = "+" + "-" * (len(text) + 2) + "+"\n    print(border)\n    print("| " + text + " |")\n    print(border)',
      'def border(n):\n    print("+" + "-" * n + "+")\n\ndef frame(text):\n    border(len(text) + 2)\n    print(f"| {text} |")\n    border(len(text) + 2)',
    ],
    wrongs: [
      { code: 'def frame(text):\n    border = "+" + "-" * len(text) + "+"\n    print(border)\n    print("| " + text + " |")\n    print(border)', category: 'comprension' },
      { code: 'def frame(text):\n    border = "+" + "-" * (len(text) + 2) + "+"\n    print(border)\n    print("|" + text + "|")\n    print(border)', category: 'comprension' },
      { code: 'def frame(text):\n    print("+-------+")\n    print("| " + text + " |")\n    print("+-------+")', category: 'logica' },
    ],
  },
};
