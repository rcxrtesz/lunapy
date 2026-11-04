// Module 1 · Computational thinking and Python (English translation of src/content/module1.js).
// Same ids, concepts, XP and structure as the original: only the text, the code examples
// and their expected outputs change. tests.html checks the answers with real Python.

const TOPIC = 'First steps';

// =====================================================================
// Lesson 1.1 · From recipe to algorithm
// =====================================================================
export const LESSON_ALGORITMOS = {
  id: 'algoritmos',
  moduleId: 'm1',
  code: '1.1',
  title: 'What is programming: from recipe to algorithm',
  minutes: 20,
  bonusXp: 20,
  objectives: [
    'Explain what a program is and what an algorithm is',
    'Use the four tools of computational thinking',
    'Know that Python runs instructions in order, from top to bottom',
    'Tell a natural language from a formal one and stop being afraid of errors',
  ],
  prerequisites: ['None: you start here'],
  teaser: 'You start at the very beginning: what programming is and how a programmer thinks before writing code. No prior knowledge needed.',
  celebration: 'You now know what an algorithm is, why order matters and how a programmer thinks before writing code. In the next lesson you\'ll put Python to work doing calculations.',
  steps: [
    {
      id: 'programa', title: 'What is programming?', concepts: ['algoritmo'],
      blocks: [
        { type: 'p', text: 'A **program** is a list of instructions that a computer follows **in order**, one after another. Programming is writing those instructions.' },
        { type: 'p', text: 'It\'s like a cooking recipe, with one huge difference: a person understands «add a pinch of salt»; a computer doesn\'t. The computer does **exactly** what you tell it, no more and no less.' },
        {
          type: 'five', items: {
            'What an algorithm is': 'A sequence of precise steps that solves a problem and comes to an end.',
            'What it\'s for': 'So that anyone —or any machine— can solve the problem by following the steps, without having to think it through again.',
            'How it works': 'Each step is clear, is done in a specific order, and at some point it finishes.',
            'When to use it': 'Always, before programming: first the algorithm, then the code.',
            'Typical mistakes': 'Vague steps («a bit», «for a while»), steps in the wrong order or a missing step.',
          },
        },
        {
          type: 'check', id: 'm1-precision', concept: 'algoritmo', mode: 'choice',
          question: 'Which instruction could a computer follow without hesitating?',
          options: [
            { text: 'Repeat 3 times: write «Hello»', correct: true },
            { text: 'Write a nice greeting', why: '«Nice» is vague: the computer doesn\'t know what it means to you.' },
            { text: 'Write «Hello» a few times', why: '«A few» isn\'t a specific number: 2? 5? 20?' },
          ],
          explain: 'A precise instruction leaves nothing open to interpretation: what to do and how many times.',
        },
      ],
    },
    {
      id: 'pensamiento', title: 'Think before you program', concepts: ['descomponer', 'algoritmo'],
      blocks: [
        { type: 'p', text: 'Before writing code, a programmer **thinks** the problem through. This way of thinking is called **computational thinking**, and it has four tools:' },
        {
          type: 'five', items: {
            'Decompose': 'Split a big problem into small parts you know how to solve.',
            'Recognise patterns': 'Notice that something repeats, or that it looks like a problem you\'ve already solved.',
            'Abstract': 'Keep what matters and ignore the details that don\'t affect the result.',
            'Design the algorithm': 'Write the ordered steps that lead to the solution.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'You\'ll use it in every exercise', text: 'That\'s why LunaPy often asks you what data you have, what result you\'re after and what steps you\'d follow **before** letting you code.' },
        {
          type: 'check', id: 'm1-abstraer', concept: 'descomponer', mode: 'choice',
          question: 'You want to work out how much each person pays for a dinner split equally. Which piece of data can you **ignore**?',
          options: [
            { text: 'The name of the restaurant', correct: true },
            { text: 'The total of the bill', why: 'Without the total there\'s nothing to split: it\'s essential.' },
            { text: 'The number of people', why: 'It\'s what you need to divide by: without it you don\'t know how many ways to split.' },
          ],
          explain: 'That\'s **abstracting**: the restaurant\'s name doesn\'t change the result, so it isn\'t part of the problem.',
        },
      ],
    },
    {
      id: 'orden', title: 'Order matters', concepts: ['algoritmo'],
      blocks: [
        { type: 'p', text: 'In an algorithm, some steps **depend** on others: you can\'t pour the water before heating it. Other steps are independent and it doesn\'t matter which goes first.' },
        { type: 'p', text: 'Python works the same way: it runs the instructions **from top to bottom**, one at a time. `print()` shows on the screen whatever you put between its brackets.' },
        { type: 'code', run: true, code: 'print("1. Heat the water")\nprint("2. Put the tea bag in the cup")\nprint("3. Pour the water")\nprint("4. Wait 3 minutes")', caption: 'Run it. Then swap two lines and run it again: Python will show them in the new order.' },
        {
          type: 'check', id: 'm1-comentario-orden', concept: 'algoritmo', mode: 'text',
          question: 'Lines that start with `#` are **comments**: notes for people that Python ignores. What will this program show?',
          code: '# print("One")\nprint("Two")', answer: 'Two',
          explain: 'The first line is a comment: Python skips it. Only print("Two") runs.',
        },
      ],
    },
    {
      id: 'lenguajes', title: 'Natural languages and programming languages', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'English is a **natural** language: it has double meanings, irony and sentences you understand «from context». Python is a **formal** language: every symbol means exactly one thing and there are strict rules, the **syntax**.' },
        { type: 'p', text: 'The program that reads your code and runs it is called the **interpreter**. If a line doesn\'t follow the rules, the interpreter doesn\'t guess: it stops and shows you an **error**.' },
        { type: 'code', run: true, title: 'An error on purpose', code: 'print("Hello")\nprint("Goodbye"', caption: 'A bracket is missing. Run it and read how LunaPy explains it: the type of error, the line and what to try.' },
        { type: 'callout', tone: 'info', title: 'Making mistakes is normal', text: 'People who have been programming for years see errors every day. What matters is learning to **read** them: they tell you what happened and on which line.' },
        {
          type: 'check', id: 'm1-formal', concept: 'errores', mode: 'choice',
          question: 'Why doesn\'t Python understand the order «write hello»?',
          options: [
            { text: 'Because it only understands instructions that follow its exact rules, like `print("hello")`', correct: true },
            { text: 'Because it doesn\'t speak English', why: 'You can write English text in quotes; what it can\'t do is interpret free sentences as if they were orders.' },
            { text: 'Because there\'s a full stop missing at the end', why: 'Python doesn\'t use full stops at the end of lines: each instruction goes on its own line.' },
          ],
          explain: 'Python is a formal language: it doesn\'t interpret intentions, only instructions written according to its syntax.',
        },
      ],
    },
    { id: 'a1', activity: 'm1-order' },
    { id: 'a2', activity: 'm1-predict' },
    { id: 'a3', activity: 'm1-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A **program** is a list of instructions the computer follows in order; an **algorithm** is the sequence of precise steps that solves a problem.',
    'Computational thinking: **decompose**, **recognise patterns**, **abstract** and **design algorithms**.',
    'Python runs from **top to bottom**; lines starting with `#` are comments and are ignored.',
    'Python is a **formal** language: if something doesn\'t follow the syntax, it stops with an error that tells you what and where.',
  ],
};

// =====================================================================
// Lesson 1.2 · Python as a calculator
// =====================================================================
export const LESSON_CALCULADORA = {
  id: 'calculadora',
  moduleId: 'm1',
  code: '1.2',
  title: 'Python as a calculator',
  minutes: 25,
  bonusXp: 20,
  objectives: [
    'Write expressions with + − * / and show their result',
    'Tell normal division (/), whole-number division (//) and remainder (%) apart',
    'Apply the order of operations and use brackets',
    'Use round() and abs(), and recognise the most common calculation errors',
  ],
  prerequisites: ['Lesson 1.1 (recommended)'],
  teaser: 'Today you turn Python into your calculator: operations, three ways of dividing, the order of operations and rounding.',
  celebration: 'Python is now your calculator: you can divide in three ways, respect the order of operations and round. In the next lesson you\'ll write your first complete programs.',
  steps: [
    {
      id: 'expresiones', title: 'Python can calculate', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'An **expression** is a combination of values and operators that Python can calculate: `2 + 3` is an expression and its result is `5`.' },
        { type: 'p', text: 'To see the result, ask Python to show it with `print()`:' },
        { type: 'code', run: true, code: 'print(2 + 3)\nprint(10 - 4)\nprint(6 * 7)\nprint(20 / 4)' },
        { type: 'callout', tone: 'warn', title: 'Division always gives a decimal', text: 'Look at the last line: `20 / 4` gives `5.0`, not `5`. The `/` operator always returns a decimal number (**float**), even when the division is exact.' },
        {
          type: 'check', id: 'm1-mult', concept: 'operadores', mode: 'choice',
          question: 'Which symbol does Python use to multiply?',
          options: [
            { text: '`*` (asterisk)', correct: true },
            { text: '`x`', why: 'x is a letter: Python would take it for a name.' },
            { text: '`·`', why: 'That symbol isn\'t part of Python: you use the asterisk `*`.' },
          ],
        },
      ],
    },
    {
      id: 'division', title: 'Sharing out: /, // and %', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'Imagine you share 17 sweets between 5 people. You can ask three different questions, and Python has an operator for each one:' },
        {
          type: 'five', items: {
            '/  division': '`17 / 5` → `3.4`: the exact share, with decimals.',
            '//  whole-number division': '`17 // 5` → `3`: how many whole sweets each person gets.',
            '%  remainder': '`17 % 5` → `2`: how many sweets are left over.',
          },
        },
        { type: 'code', run: true, code: 'print(17 / 5)\nprint(17 // 5)\nprint(17 % 5)' },
        {
          type: 'check', id: 'm1-resto', concept: 'operadores', mode: 'text',
          question: 'Predict:', code: 'print(23 % 4)', answer: '3',
          explain: '4 goes into 23 five times (5 × 4 = 20) and 3 are left over.',
        },
        {
          type: 'more', summary: 'What is the remainder useful for?',
          items: [
            'Finding out whether a number is even: `n % 2` gives 0 when it is.',
            'Turning minutes into hours and minutes: `135 // 60` hours and `135 % 60` minutes.',
            'Sharing things into groups and knowing how many are left over.',
          ],
        },
      ],
    },
    {
      id: 'prioridad', title: 'Powers and the order of operations', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: '`**` raises to a power: `2 ** 3` is 2 × 2 × 2 = 8.' },
        { type: 'p', text: 'When there are several operators, Python follows the rules of maths: first **brackets**, then **powers**, then **multiplication and division** and, last, **addition and subtraction**. With the same priority, from left to right.' },
        { type: 'code', run: true, code: 'print(2 ** 3)\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 4 - 3)\nprint(10 - (4 - 3))' },
        {
          type: 'check', id: 'm1-prioridad', concept: 'operadores', mode: 'choice',
          question: 'What will it show?', code: 'print(10 - 2 * 3)', expectOutput: '4',
          options: [
            { text: '4', correct: true },
            { text: '24', why: 'Python multiplies before subtracting: 2 × 3 = 6 and 10 − 6 = 4. To get 24 you\'d need brackets: `(10 - 2) * 3`.' },
          ],
        },
        {
          type: 'check', id: 'm1-potencia', concept: 'operadores', mode: 'text',
          question: 'Predict:', code: 'print((1 + 2) ** 2)', answer: '9',
          explain: 'First the brackets (1 + 2 = 3) and then the power: 3 × 3 = 9.',
        },
      ],
    },
    {
      id: 'funciones', title: 'Rounding and absolute value', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'Python comes with ready-made **functions** for common calculations. You use them by writing their name and, in brackets, the values they work with:' },
        { type: 'code', run: true, code: 'print(round(3.14159, 2))\nprint(round(7.4))\nprint(abs(-12))' },
        { type: 'callout', tone: 'tip', title: 'Two very useful functions', text: '`round(x, 2)` rounds to 2 decimal places: perfect for money. `abs(x)` gives the absolute value, that is, the distance to zero, always positive.' },
        {
          type: 'more', summary: 'A curious detail about round()',
          items: ['`round(7.5)` gives `8`, but `round(6.5)` gives `6`: Python rounds ties (.5) to the nearest **even** number. It\'s a statistical rule so results aren\'t inflated when rounding lots of numbers.'],
        },
        {
          type: 'check', id: 'm1-round', concept: 'operadores', mode: 'text',
          question: 'Predict:', code: 'print(round(2.678, 1))', answer: '2.7',
          explain: 'With one decimal place, 2.678 becomes 2.7 (the 7 in the hundredths pushes the tenths up).',
        },
      ],
    },
    {
      id: 'errores-calculo', title: 'Calculation errors', concepts: ['errores', 'operadores'],
      blocks: [
        { type: 'p', text: 'Run each example and read the explanation. The third one is the trickiest: it **doesn\'t give an error**.' },
        { type: 'code', run: true, title: 'Dividing by zero', code: 'print(10 / 0)' },
        { type: 'code', run: true, title: 'Forgetting a number', code: 'print(5 + )' },
        { type: 'code', run: true, title: 'Using a decimal comma', code: 'print(3,5 + 1)', caption: 'Python uses a **point** for decimals. With a comma it sees two separate values: 3 and 5 + 1.' },
        {
          type: 'check', id: 'm1-coma', concept: 'operadores', mode: 'choice',
          question: 'What will it show?', code: 'print(2,5 * 2)', expectOutput: '2 10',
          options: [
            { text: '2 10', correct: true },
            { text: '5.0', why: 'Python doesn\'t use the comma for decimals: `2,5` are two values (2 and 5). For the decimal you have to write `2.5`.' },
            { text: 'An error', why: 'It doesn\'t give an error, and that\'s what makes it dangerous: print shows 2 and then 5 × 2 = 10.' },
          ],
          explain: 'The comma separates values in print(). That\'s why decimals are always written with a point: `2.5`.',
        },
      ],
    },
    { id: 'a1', activity: 'm1c-predict' },
    { id: 'a2', activity: 'm1c-complete' },
    { id: 'a3', activity: 'm1c-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'Python calculates **expressions** with `+ - * /` and shows them with `print()`.',
    '`/` always gives a decimal; `//` gives the whole part and `%` the remainder of the division.',
    '`**` is the power. Order: brackets, powers, multiplication and division, addition and subtraction.',
    '`round(x, 2)` rounds and `abs(x)` gives the absolute value.',
    'Decimals are written with a **point**: `2,5` is two values, not two and a half.',
  ],
};

// =====================================================================
// Lesson 1.3 · Your first program with print()
// =====================================================================
export const LESSON_PRIMER_PROGRAMA = {
  id: 'primer-programa',
  moduleId: 'm1',
  code: '1.3',
  title: 'Your first program with print()',
  minutes: 25,
  bonusXp: 20,
  objectives: [
    'Show text and numbers with print(), on their own or combined',
    'Write useful comments',
    'Recognise the types int, float and str with type()',
    'Read an error message and fix the program step by step',
  ],
  prerequisites: ['Lessons 1.1 and 1.2 (recommended)'],
  teaser: 'Today you write, run and debug your first complete programs: text, comments, types and errors.',
  celebration: 'You\'ve written, run and debugged your first programs. That completes Module 1: you\'re ready for variables.',
  steps: [
    {
      id: 'textos', title: 'Text in quotes', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` shows on the screen whatever you put between its brackets. If it\'s **text**, it goes in quotes: double `"…"` or single `\'…\'`, both work the same.' },
        { type: 'code', run: true, code: 'print("Hello, world!")\nprint(\'LunaPy speaks other languages too: ñ, á, ü\')' },
        { type: 'callout', tone: 'tip', title: 'Quotes inside a text', text: 'If your text contains double quotes, wrap it in single ones, and vice versa: `print(\'She said "hello"\')`.' },
        {
          type: 'check', id: 'm1-comillas', concept: 'print', mode: 'choice',
          question: 'Which of these lines is correct?',
          options: [
            { text: '`print("My name is Ana")`', correct: true },
            { text: '`print(My name is Ana)`', why: 'Without quotes, Python tries to understand My, name, is and Ana as names: it gives a syntax error.' },
            { text: '`print("My name is Ana\')`', why: 'The opening and closing quotes have to be the same kind.' },
          ],
        },
      ],
    },
    {
      id: 'varios', title: 'Showing several things at once', concepts: ['print'],
      blocks: [
        { type: 'p', text: 'You can pass **several values** to `print()` by separating them with commas: it shows them on the same line, with a space between them. They can be text, numbers or calculations.' },
        { type: 'code', run: true, code: 'print("I have", 3, "cats")\nprint("2 + 2 =", 2 + 2)\nprint()\nprint("After a blank line")' },
        { type: 'callout', tone: 'info', title: 'Empty print()', text: 'It writes a blank line: handy for separating parts of the output.' },
        {
          type: 'check', id: 'm1-texto-calculo', concept: 'print', mode: 'choice',
          question: 'What will it show?', code: 'print("3 + 4")', expectOutput: '3 + 4',
          options: [
            { text: '3 + 4', correct: true },
            { text: '7', why: 'In quotes it\'s text: Python shows it as it is, without calculating it. Without quotes, `print(3 + 4)` would show 7.' },
          ],
        },
        {
          type: 'check', id: 'm1-varios', concept: 'print', mode: 'text',
          question: 'Predict (careful with the spaces):', code: 'print("Total:", 5 * 4, "€")', answer: 'Total: 20 €',
          explain: 'print separates each value with a space: «Total:», the result 20 and «€».',
        },
      ],
    },
    {
      id: 'comentarios', title: 'Comments: notes for people', concepts: ['print'],
      blocks: [
        { type: 'p', text: 'Everything after `#` is a **comment**: Python ignores it. It\'s for explaining the code to whoever reads it, including you a month from now.' },
        { type: 'code', run: true, code: '# Program that works out the seconds in an hour\nprint(60 * 60)  # 60 minutes of 60 seconds' },
        { type: 'callout', tone: 'tip', title: 'Good comments', text: 'Explain **why** you do something, not what can already be seen. `# 60 minutes of 60 seconds` helps; `# I multiply` adds nothing.' },
        {
          type: 'check', id: 'm1-comentario', concept: 'print', mode: 'text',
          question: 'Predict:', code: 'print("A")  # print("B")', answer: 'A',
          explain: 'Everything after # is ignored, even if it\'s on the same line.',
        },
      ],
    },
    {
      id: 'tipos', title: 'Types of values', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Every value has a **type**. For now three are enough: `int` (whole numbers, like 7), `float` (decimals, like 2.5) and `str` (text, like "hello"). The `type()` function tells you the type of any value:' },
        { type: 'code', run: true, code: 'print(type(7))\nprint(type(2.5))\nprint(type("hello"))\nprint(type("7"))' },
        { type: 'callout', tone: 'warn', title: '"7" is not 7', text: 'With quotes it\'s text, even if it looks like a number. You\'ll see this in depth in the variables lesson.' },
        {
          type: 'check', id: 'm1-tipo', concept: 'tipos', mode: 'choice',
          question: 'What type is the result of `10 / 2`?', code: 'print(type(10 / 2))', expectOutput: "<class 'float'>",
          options: [
            { text: '`float` (decimal)', correct: true },
            { text: '`int` (whole number)', why: '`/` always gives a decimal: `10 / 2` is `5.0`. With `//` you would get a whole number.' },
          ],
        },
      ],
    },
    {
      id: 'depurar', title: 'Debugging: reading errors', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'An error in a program (a *bug*) is something that stops it working the way you expect. **Debugging** is finding and fixing it, like a detective: you observe, form a hypothesis and test it.' },
        { type: 'code', run: true, title: 'Capital letters', code: 'Print("Hello")' },
        { type: 'code', run: true, title: 'Unclosed quotes', code: 'print("Hello)' },
        { type: 'code', run: true, title: 'Unclosed bracket', code: 'print("Hello"' },
        { type: 'p', text: 'Every error message gives you three clues: the **type** of error, the **line** and an **explanation**. Always start with the line it points to.' },
        {
          type: 'check', id: 'm1-nameerror', concept: 'errores', mode: 'choice',
          question: 'What happens when you run this program?', code: 'Print("Hello")', expectError: 'NameError',
          options: [
            { text: 'NameError: Python doesn\'t know `Print`', correct: true },
            { text: 'SyntaxError', why: 'The line is written correctly; the problem appears when it runs: `Print`, with a capital P, doesn\'t exist.' },
            { text: 'It shows Hello', why: 'Python is case-sensitive: `print` works, `Print` doesn\'t.' },
          ],
          explain: 'Python is case-sensitive: the function is called `print`, in lower case.',
        },
      ],
    },
    { id: 'a1', activity: 'm1p-predict' },
    { id: 'a2', activity: 'm1p-fix' },
    { id: 'a3', activity: 'm1p-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'Text goes in quotes, double or single, always the same kind when opening and closing.',
    '`print()` can show several values separated by commas; an empty `print()` writes a blank line.',
    '**Comments** (`#`) explain the why of the code and Python ignores them.',
    'Basic types: `int`, `float` and `str`; `type()` tells you which each one is.',
    'Debugging: read the type of error and the line, fix it and run again.',
  ],
};

export const LESSONS_M1 = [LESSON_ALGORITMOS, LESSON_CALCULADORA, LESSON_PRIMER_PROGRAMA];

// =====================================================================
// Module 1 activities
// =====================================================================
export const ACTIVITIES_M1 = {
  // ------------------------------------------------------------- 1.1
  'm1-order': {
    id: 'm1-order', type: 'order', kindLabel: 'Put the steps in order', topic: TOPIC,
    title: 'A hot chocolate algorithm', difficulty: 1, xp: 10, concepts: ['algoritmo', 'descomponer'],
    statement: 'Put the steps in order to **make a cup of hot chocolate**. Think about what each step needs before it can be done.',
    stages: [
      {
        title: 'Order the algorithm',
        items: [
          { id: 'k1', text: 'Take out a mug', after: [] },
          { id: 'k2', text: 'Pour milk into the mug', after: ['k1'], why: 'You can\'t pour milk into a mug you haven\'t taken out yet.' },
          { id: 'k3', text: 'Heat the mug in the microwave for 1 minute', after: ['k2'], why: 'What gets heated is the milk: it has to be in the mug first.' },
          { id: 'k4', text: 'Add two spoonfuls of cocoa', after: ['k1'], why: 'The cocoa goes in the mug: you have to take it out first.' },
          { id: 'k5', text: 'Stir until it dissolves', after: ['k3', 'k4'], why: 'Stirring mixes the cocoa with the hot milk: both have to be in the mug already.' },
        ],
        success: 'Notice: «add the cocoa» can go before or after heating the milk and the result is the same. Knowing which steps depend on others —and which don\'t— is thinking like a programmer.',
      },
    ],
  },
  'm1-predict': {
    id: 'm1-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The countdown', difficulty: 1, xp: 10, concepts: ['algoritmo'],
    prompt: 'Python runs from top to bottom. **What will this program show?**',
    code: 'print("3")\nprint("2")\n# print("Are you sure?")\nprint("1")\nprint("Lift-off!")',
    expectedOutput: '3\n2\n1\nLift-off!',
    options: [
      { text: '3, 2, 1 and Lift-off!, each on its own line', correct: true },
      { text: '3, 2, Are you sure?, 1 and Lift-off!', concept: 'algoritmo', why: 'The line that starts with `#` is a comment: Python ignores it completely.' },
      { text: 'Lift-off!, 1, 2 and 3', concept: 'algoritmo', why: 'Python doesn\'t reorder anything: it runs the lines in the order they\'re written, from top to bottom.' },
      { text: 'Nothing: the program stops at the # line', concept: 'algoritmo', why: 'A comment isn\'t an error: Python simply skips it and carries on with the next line.' },
    ],
    explain: [
      'Lines 1 and 2: show 3 and 2.',
      'Line 3: starts with `#`, so it\'s a comment and Python skips it.',
      'Lines 4 and 5: show 1 and Lift-off!',
    ],
  },
  'm1-build': {
    id: 'm1-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Your first algorithm in Python', difficulty: 1, xp: 15, concepts: ['algoritmo', 'print'],
    unlock: { any: ['m1-order', 'm1-predict'], count: 1, text: 'Pass at least one of the earlier activities in the lesson' },
    statement: 'Write a program that shows, **in this order and one per line**, the steps for washing your hands:',
    expected: '1. Wet your hands\n2. Apply soap\n3. Scrub for 20 seconds\n4. Rinse\n5. Dry',
    starter: '# Write your program here: one print() instruction for each step\n',
    spec: {
      skip_tips: ['repeated_numbers'], // variables arrive in Module 2
      cases: [{ label: 'Expected output', out_lines: ['1. Wet your hands', '2. Apply soap', '3. Scrub for 20 seconds', '4. Rinse', '5. Dry'] }],
      rules: [{ type: 'must_call', name: 'print', title: 'print() is missing', msg: 'Use print() to show each step.' }],
      misconceptions: [
        { out_lines: ['Wet your hands', 'Apply soap', 'Scrub for 20 seconds', 'Rinse', 'Dry'], title: 'The numbers are missing', msg: 'The steps are right, but each line must start with its number: «1. Wet your hands».' },
      ],
      logic_msg: 'Compare line by line with the expected output: the order, the numbers and the punctuation have to match.',
    },
    hints: [
      { level: 'Orientation', text: 'You have to show five lines of text, exactly as in the expected output and in that order.' },
      { level: 'Reasoning', text: 'Python runs from top to bottom and each `print()` writes one line. How many instructions do you need? In what order?' },
      { level: 'Pseudocode', text: 'show «1. Wet your hands»\nshow «2. Apply soap»\n… and so on up to «5. Dry»', pre: true },
      { level: 'Technical help', text: 'A text goes in quotes inside `print()`: `print("1. Wet your hands")`. Copy the full stops exactly.' },
    ],
    solution: {
      code: 'print("1. Wet your hands")\nprint("2. Apply soap")\nprint("3. Scrub for 20 seconds")\nprint("4. Rinse")\nprint("5. Dry")',
      explanation: 'Five print() instructions, one per step and in the order of the algorithm. Python runs them from top to bottom, so the output follows that order.',
    },
    reference: [
      'print("1. Wet your hands")\nprint("2. Apply soap")\nprint("3. Scrub for 20 seconds")\nprint("4. Rinse")\nprint("5. Dry")',
      '# Hand washing\nprint(\'1. Wet your hands\')\nprint(\'2. Apply soap\')\nprint(\'3. Scrub for\', 20, \'seconds\')\nprint(\'4. Rinse\')\nprint(\'5. Dry\')',
    ],
    wrongs: [
      { code: 'print("1. Wet your hands")\nprint("3. Scrub for 20 seconds")\nprint("2. Apply soap")\nprint("4. Rinse")\nprint("5. Dry")', category: 'logica' },
      { code: 'print("Wet your hands")\nprint("Apply soap")\nprint("Scrub for 20 seconds")\nprint("Rinse")\nprint("Dry")', category: 'comprension' },
      { code: 'print(1. Wet your hands)', category: 'sintaxis' },
    ],
  },

  // ------------------------------------------------------------- 1.2
  'm1c-predict': {
    id: 'm1c-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Three ways of dividing', difficulty: 1, xp: 10, concepts: ['operadores'],
    prompt: 'Three similar operators, three different results. **What will it show?**',
    code: 'print(7 // 2, 7 % 2, 7 / 2)',
    expectedOutput: '3 1 3.5',
    options: [
      { text: '3 1 3.5', correct: true },
      { text: '3.5 3.5 3.5', concept: 'operadores', why: 'They\'re three different operators: `//` gives the whole part, `%` the remainder and `/` the result with decimals.' },
      { text: '3 1.5 3.5', concept: 'operadores', why: '`%` gives the **remainder** of the whole-number division: 7 = 2 × 3 + 1, so 1 is left over.' },
      { text: '4 1 3.5', concept: 'operadores', why: '`//` doesn\'t round: it keeps the whole part (3), just like when you share out whole sweets.' },
    ],
    explain: ['`7 // 2` → 3: 2 goes into 7 three whole times.', '`7 % 2` → 1: what\'s left over (7 − 6).', '`7 / 2` → 3.5: the exact division, always with decimals.'],
  },
  'm1c-complete': {
    id: 'm1c-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'From minutes to hours', difficulty: 2, xp: 15, concepts: ['operadores'],
    statement: 'A film lasts **135 minutes**. Replace each `___` with the right operator so the program shows:',
    expected: '135 minutes is 2 hours and 15 minutes',
    starter: 'print(135, "minutes is", 135 ___ 60, "hours and", 135 ___ 60, "minutes")',
    spec: {
      skip_tips: ['repeated_numbers'], // variables arrive in Module 2
      blanks: true,
      cases: [{ label: 'Expected output', out_lines: ['135 minutes is 2 hours and 15 minutes'] }],
      misconceptions: [
        { out_lines: ['135 minutes is 2.25 hours and 15 minutes'], title: 'Hours with decimals', msg: 'With `/` you get hours with decimals (2.25). For **whole** hours you need `//`.' },
        { out_lines: ['135 minutes is 2 hours and 2.25 minutes'], title: 'Check the second gap', msg: 'The minutes left over are the **remainder** of the division: that\'s what `%` gives, not `/`.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['FloorDiv', 'Mod'], title: 'Calculate it with operators', msg: 'Work out the hours and minutes with // and % instead of writing the result: that way the program would work for any length.' }],
      logic_msg: 'Compare your output with the expected one. Which operator gives the whole hours? And which gives the minutes left over?',
    },
    hints: [
      { level: 'Orientation', text: 'There are two gaps: the first calculates the **whole hours**; the second, the **minutes left over**.' },
      { level: 'Reasoning', text: 'An hour has 60 minutes. How many whole times does 60 go into 135? How much is left over after that?' },
      { level: 'Pseudocode', text: 'hours ← 135 divided by 60, without decimals\nminutes ← what\'s left over when dividing 135 by 60', pre: true },
      { level: 'Technical help', text: '`//` gives the whole part of a division and `%` the remainder: `17 // 5` → 3 and `17 % 5` → 2.' },
    ],
    solution: {
      code: 'print(135, "minutes is", 135 // 60, "hours and", 135 % 60, "minutes")',
      explanation: '`135 // 60` gives 2 (whole hours) and `135 % 60` gives 15 (the minutes left over). If you change 135 to another length, the program still works.',
    },
    reference: ['print(135, "minutes is", 135 // 60, "hours and", 135 % 60, "minutes")'],
    wrongs: [
      { code: 'print(135, "minutes is", 135 ___ 60, "hours and", 135 ___ 60, "minutes")', category: 'incompleto' },
      { code: 'print(135, "minutes is", 135 / 60, "hours and", 135 % 60, "minutes")', category: 'comprension' },
      { code: 'print("135 minutes is 2 hours and 15 minutes")', category: 'logica' },
    ],
  },
  'm1c-build': {
    id: 'm1c-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'The restaurant bill', difficulty: 2, xp: 25, concepts: ['operadores', 'descomponer'],
    unlock: { any: ['m1c-predict', 'm1c-complete'], count: 1, text: 'Pass at least one of the earlier activities in the lesson' },
    statement: 'Four friends have dinner together. The bill is **86.50 €** and they want to leave a **10 % tip**. Write a program that works out **how much each one pays**, rounded to **2 decimal places**.\n\nShow the result on the last line (you can add some text with it).',
    plan: [
      {
        q: 'What data do you need?', multi: true,
        options: [
          { text: 'The total of the bill (86.50 €)', correct: true },
          { text: 'The tip percentage (10 %)', correct: true },
          { text: 'The number of people (4)', correct: true },
          { text: 'What each of them ordered', why: 'Not needed: they pay equal shares. Ignoring what doesn\'t affect the result is **abstracting**.' },
        ],
      },
      {
        q: 'In what order do you calculate it?',
        options: [
          { text: 'First the total with the tip; then I divide it by 4', correct: true },
          { text: 'First I divide by 4 and then add 10 € to each share', why: 'The tip is 10 % of the total, not 10 €: with 86.50 € the tip is 8.65 €.' },
        ],
      },
      {
        q: 'How do you calculate the total with a 10 % tip?',
        options: [
          { text: '86.50 * 1.10 (or 86.50 + 86.50 * 10 / 100)', correct: true },
          { text: '86.50 + 10', why: 'That adds 10 €, not 10 %.' },
          { text: '86.50 * 10', why: 'That multiplies the bill by ten.' },
        ],
      },
    ],
    planScaffold: '# 1. Work out the total with the tip\n\n# 2. Split it between the 4 friends\n\n# 3. Round to 2 decimal places and show it\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'], // variables arrive in Module 2
      cases: [{ label: 'Dinner of 86.50 € split 4 ways with 10 %', args: {} }],
      expect_last_number: 'round(86.5 * 1.1 / 4, 2)',
      tolerance: 0.001,
      misconceptions: [
        { expr: '86.5 * 1.1 / 4', category: 'logica', title: 'Rounding is missing', msg: 'The calculation is right, but you still need to round to 2 decimal places with `round(value, 2)`.' },
        { expr: 'round(86.5 / 4, 2)', title: 'The tip is missing', msg: 'You\'ve split the bill, but without the 10 % tip.' },
        { expr: '86.5 / 4', title: 'The tip is missing', msg: 'You\'ve split the bill, but without the 10 % tip.' },
        { expr: 'round((86.5 + 10) / 4, 2)', title: 'Percentage ≠ euros', msg: 'You added 10 €, not 10 %. 10 % of 86.50 € is 8.65 €.' },
        { expr: 'round(86.5 * 1.1, 2)', title: 'You still need to split it', msg: 'That\'s the total with the tip: you still need to divide it between the 4 friends.' },
      ],
      rules: [
        { type: 'must_call', name: 'round', category: 'comprension', title: 'Rounding is missing', msg: 'The task asks for the result rounded to 2 decimal places: use round(value, 2).' },
        { type: 'must_use_op', ops: ['Div'], title: 'Calculate it', msg: 'Make Python work out the share with a division instead of writing the result.' },
      ],
    },
    hints: [
      { level: 'Orientation', text: 'You have three pieces of data (86.50, 10 % and 4 people) and one result: what each one pays, with 2 decimal places.' },
      { level: 'Reasoning', text: 'Break it down: first the total with the tip, then the split and finally the rounding. You can do it all in one expression with brackets.' },
      { level: 'Pseudocode', text: 'total ← 86.50 plus its 10 %\neach one ← total ÷ 4\nshow each one rounded to 2 decimal places', pre: true },
      { level: 'Technical help', text: 'Adding 10 % is multiplying by 1.10. To round: `round(value, 2)`. Example structure: `print(round(... / 4, 2))`.' },
    ],
    solution: {
      code: '# Total with a 10 % tip, split 4 ways and rounded to cents\nprint("Each one pays", round(86.50 * 1.10 / 4, 2), "€")',
      explanation: 'Multiplying by 1.10 adds the 10 % tip (95.15 €). Dividing by 4 gives 23.7875 and `round(…, 2)` turns it into 23.79 €.',
    },
    reference: [
      'print(round(86.50 * 1.10 / 4, 2))',
      'print("Each one pays", round((86.5 + 86.5 * 10 / 100) / 4, 2), "€")',
    ],
    wrongs: [
      { code: 'print(round(86.5 / 4, 2))', category: 'comprension' },
      { code: 'print(86.5 * 1.1 / 4)', category: 'logica' },
      { code: 'print(23.79)', category: 'comprension' },
      { code: 'print(round((86.5 + 10) / 4, 2))', category: 'comprension' },
    ],
  },

  // ------------------------------------------------------------- 1.3
  'm1p-predict': {
    id: 'm1p-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Text, numbers and operations', difficulty: 1, xp: 10, concepts: ['print', 'tipos'],
    prompt: 'This program mixes text and numbers. **What will it show?**',
    code: 'print("Py" + "thon", 3 * "ha", 10 / 4)',
    expectedOutput: 'Python hahaha 2.5',
    options: [
      { text: 'Python hahaha 2.5', correct: true },
      { text: 'Py thon hahaha 2.5', concept: 'print', why: '`+` joins the texts without adding spaces. Spaces only appear between values separated by commas.' },
      { text: 'Python 3ha 2.5', concept: 'tipos', why: 'Multiplying a text by a number **repeats** it: `3 * "ha"` is `"hahaha"`.' },
      { text: 'Python hahaha 2', concept: 'operadores', why: '`/` always gives a decimal: `10 / 4` is 2.5.' },
    ],
    explain: ['`"Py" + "thon"` joins the two texts: "Python".', '`3 * "ha"` repeats the text three times: "hahaha".', '`10 / 4` is 2.5.', 'print separates the three values with a space.'],
  },
  'm1p-fix': {
    id: 'm1p-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The program with three errors', difficulty: 2, xp: 20, concepts: ['errores', 'print'],
    statement: 'This program should show a welcome card, but it has **three errors**. Run it, read each error and fix them one by one.',
    expected: 'Welcome to LunaPy\nToday I learn 3 things\nLet\'s code!',
    starter: 'Print("Welcome to LunaPy")\nprint("Today I learn", 1 + 2, "things)\nprint("Let\'s code!"',
    spec: {
      skip_tips: ['repeated_numbers'], // variables arrive in Module 2
      cases: [{ label: 'Expected output', out_lines: ['Welcome to LunaPy', 'Today I learn 3 things', 'Let\'s code!'] }],
      rules: [{ type: 'must_use_op', ops: ['Add'], title: 'Keep the calculation', msg: 'Let Python work out 1 + 2 instead of writing the 3 yourself.' }],
      logic_msg: 'There are no errors left, but the output doesn\'t match. Check the texts letter by letter and the spaces: print adds a space between values separated by commas.',
    },
    hints: [
      { level: 'Orientation', text: 'Press **Run**. Python first checks that everything is written correctly (the syntax) and tells you about the first problem it finds. Fix that one, run again and repeat.' },
      { level: 'Reasoning', text: 'Go over each line: do the quotes open and close? And the brackets? Is `print` written exactly like that, in lower case?' },
      { level: 'Pseudocode', text: 'Line 2: close the quotes of "things"\nLine 3: close the bracket\nLine 1: write print in lower case', pre: true },
      { level: 'Technical help', text: 'A text starts and ends with quotes: `"things"`. Every `(` needs its `)`. Python is case-sensitive: `print` is not the same as `Print`.' },
    ],
    solution: {
      code: 'print("Welcome to LunaPy")\nprint("Today I learn", 1 + 2, "things")\nprint("Let\'s code!")',
      explanation: 'The syntax errors (unclosed quotes and brackets) appear first, because Python checks the whole program before running it. Once they\'re fixed, the `NameError` for `Print` appears, which is only detected when running.',
    },
    reference: ['print("Welcome to LunaPy")\nprint("Today I learn", 1 + 2, "things")\nprint("Let\'s code!")'],
    wrongs: [
      { code: 'Print("Welcome to LunaPy")\nprint("Today I learn", 1 + 2, "things)\nprint("Let\'s code!"', category: 'sintaxis' },
      { code: 'Print("Welcome to LunaPy")\nprint("Today I learn", 1 + 2, "things")\nprint("Let\'s code!")', category: 'ejecucion' },
      { code: 'print("Welcome to LunaPy")\nprint("Today I learn 3 things")\nprint("Let\'s code!")', category: 'logica' },
    ],
  },
  'm1p-build': {
    id: 'm1p-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The seconds in a day', difficulty: 2, xp: 20, concepts: ['operadores', 'print'],
    unlock: { any: ['m1p-predict', 'm1p-fix'], count: 1, text: 'Pass at least one of the earlier activities in the lesson' },
    statement: 'How many seconds are there in a day? Write a program that **calculates** it from what you already know (a day has 24 hours, an hour 60 minutes and a minute 60 seconds) and shows:',
    expected: 'A day has 86400 seconds',
    note: 'Don\'t write 86400 by hand: make Python calculate it.',
    plan: [
      {
        q: 'Which operation connects hours, minutes and seconds?',
        options: [
          { text: 'Multiply: 24 × 60 × 60', correct: true },
          { text: 'Add: 24 + 60 + 60', why: 'Each of the 24 hours has 60 minutes: you don\'t add them, you multiply them.' },
        ],
      },
      {
        q: 'How do you show the result next to the text?',
        options: [
          { text: 'print("A day has", 24 * 60 * 60, "seconds")', correct: true },
          { text: 'print("A day has 24 * 60 * 60 seconds")', why: 'Inside the quotes everything is text: Python would show it as it is, without calculating.' },
        ],
      },
    ],
    planScaffold: '# 1. Work out the seconds: hours × minutes × seconds\n\n# 2. Show the result with the text\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'], // variables arrive in Module 2
      cases: [{ label: 'Expected output', out_lines: ['A day has 86400 seconds'] }],
      misconceptions: [
        { out_lines: ['A day has 1440 seconds'], title: 'Those are minutes', msg: '1440 is the number of **minutes** in a day (24 × 60). You still need to multiply by the 60 seconds in each minute.' },
        { out_lines: ['A day has 144 seconds'], title: 'They aren\'t added', msg: 'You added 24 + 60 + 60. Each hour has 60 minutes and each minute 60 seconds: you have to multiply.' },
        { out_contains: '24 * 60 * 60', title: 'The calculation is inside the text', msg: 'Inside the quotes, Python shows the calculation as text. Take it out of the quotes and separate it with commas.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['Mult'], title: 'Calculate it', msg: 'Make Python work out the result with multiplications (24 * 60 * 60) instead of writing it.' }],
      logic_msg: 'Compare your output with the expected one: the text and the spaces have to match.',
    },
    hints: [
      { level: 'Orientation', text: 'You need a number (the seconds in a day) and a sentence around it.' },
      { level: 'Reasoning', text: 'If a minute has 60 seconds, an hour has 60 times that. And a day?' },
      { level: 'Pseudocode', text: 'seconds ← 24 × 60 × 60\nshow «A day has», seconds, «seconds»', pre: true },
      { level: 'Technical help', text: 'print can mix texts and calculations separated by commas: `print("A day has", 24 * 60 * 60, "seconds")`.' },
    ],
    solution: {
      code: '# 24 hours × 60 minutes × 60 seconds\nprint("A day has", 24 * 60 * 60, "seconds")',
      explanation: 'Python calculates 24 × 60 × 60 = 86400 and print shows it between the two texts, separated by spaces.',
    },
    reference: [
      'print("A day has", 24 * 60 * 60, "seconds")',
      'print("A day has", 60 * 60 * 24, "seconds")',
    ],
    wrongs: [
      { code: 'print("A day has", 24 * 60, "seconds")', category: 'comprension' },
      { code: 'print("A day has 86400 seconds")', category: 'logica' },
      { code: 'print("A day has 24 * 60 * 60 seconds")', category: 'comprension' },
    ],
  },
};
