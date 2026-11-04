// Lesson 2.1 · Variables (English translation of src/content/lesson-variables.js).

export const LESSON_VARIABLES = {
  id: 'variables',
  moduleId: 'm2',
  code: '2.1',
  title: 'Variables: giving data a name',
  minutes: 30,
  bonusXp: 25,
  teaser: 'Today you start with variables: the foundation of every program. First you\'ll understand the idea, then you\'ll see it working and, finally, you\'ll solve problems on your own.',
  celebration: 'You can now store data, change it, tell types apart, ask for information and read errors.',
  objectives: [
    'Explain what a variable is and what it\'s for',
    'Assign and change values knowing in what order Python acts',
    'Tell text (str) apart from numbers (int, float)',
    'Show results with print() and ask for data with input()',
    'Recognise and fix the most common errors',
  ],
  prerequisites: ['Know what a program is and how it runs (Module 1)'],
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'que-es', title: 'Why do we need variables?', concepts: ['asignacion'],
      blocks: [
        { type: 'p', text: 'Think about a shop\'s app. It needs to **remember** things: the price of a product, the discount, the customer\'s name… and use them later to do calculations.' },
        { type: 'p', text: 'A **variable** is a **name** that points to a **value** stored in memory. Picture a label: the value is the object and the name is the label you stick on it so you can find it later.' },
        { type: 'diagram', caption: 'This is how the state of memory is drawn: each name points to its value.', vars: [{ name: 'price', value: '25.5', type: 'float' }, { name: 'customer', value: "'Ana'", type: 'str' }, { name: 'units', value: '3', type: 'int' }] },
        {
          type: 'five', items: {
            'What it is': 'A name linked to a value.',
            'What it\'s for': 'To store data and reuse it without writing it again and again.',
            'How it works': 'With `=` you give a name a value. When you use the name, Python replaces it with its value.',
            'When to use it': 'Whenever a piece of data is used more than once, may change, or deserves a name that explains what it is.',
            'Typical mistakes': 'Using it before giving it a value, misspelling its name or confusing the name with a text.',
          },
        },
        {
          type: 'check', id: 'q-def', concept: 'asignacion', mode: 'choice',
          question: 'Which description fits a variable best?',
          options: [
            { text: 'A name that points to a value stored in memory', correct: true },
            { text: 'A maths operation that recalculates itself', why: 'No: a variable stores a specific value. If you want a different one, you have to assign it again (you\'ll see this shortly).' },
            { text: 'A special kind of text', why: 'A variable can store text, numbers or other kinds of data. The name is not the value.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'asignar', title: 'Assigning: storing a value with a name', concepts: ['asignacion'],
      blocks: [
        { type: 'code', code: 'age = 18', caption: 'Read it as: «age takes the value 18»' },
        { type: 'p', text: 'The `=` sign in Python does **not** mean «is equal to». It means **assign**: «work out what\'s on the right and store it under the name on the left».' },
        { type: 'callout', tone: 'tip', title: 'Golden rule', text: 'Python **always** works out what\'s to the right of the `=` first and then stores the result in the name on the left.' },
        { type: 'p', text: 'Press **Run** to see this program in action. You can change it: change the name or the age and run it again.' },
        { type: 'code', run: true, code: 'name = "Lucy"\nage = 18\nprint(name)\nprint(age)' },
        {
          type: 'check', id: 'q-ciudad', concept: 'asignacion', mode: 'text',
          question: 'Predict: what will this program show?', code: 'city = "London"\nprint(city)', answer: 'London',
          explain: '`print(city)` doesn\'t show the word «city»: it shows the **value** that name points to.',
        },
        {
          type: 'more', summary: 'Rules for choosing variable names',
          items: [
            'They can contain letters, numbers and the underscore `_`, but **they can\'t start with a number**.',
            'They can\'t have spaces: `final_price`, not `final price`.',
            'Python is case-sensitive: `age` and `Age` are different variables.',
            'You can\'t use reserved words like `if`, `for`, `class` or `while`.',
            'By convention they\'re written in lower case with underscores (*snake_case* style).',
            'Most important of all: choose names that explain what they store. `price` is clear; `p` not so much.',
          ],
        },
        {
          type: 'classify', id: 'q-nombres', concept: 'errores',
          question: 'Are these valid variable names in Python?',
          items: [
            { text: 'final_price', valid: true, why: 'Letters and underscore: perfect.' },
            { text: '2age', valid: false, why: 'It can\'t start with a number.' },
            { text: 'my age', valid: false, why: 'It can\'t contain spaces.' },
            { text: 'Age', valid: true, why: 'It\'s valid, but remember it\'s different from age.' },
            { text: 'class', valid: false, why: 'It\'s a Python reserved word.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'paso-a-paso', title: 'Watch it step by step', concepts: ['reasignacion'],
      blocks: [
        { type: 'p', text: 'Before running, **predict**. It\'s the best way to find out which part you understand and which you don\'t.' },
        {
          type: 'check', id: 'q-edad2', concept: 'reasignacion', mode: 'choice',
          question: 'What will this program show?', code: 'age = 18\nage = age + 2\nprint(age)', expectOutput: '20',
          options: [
            { text: '18', why: 'Line 2 changes the value of age before the print.' },
            { text: '20', correct: true },
            { text: 'age + 2', why: 'print shows values. Besides, Python already worked out age + 2 on line 2.' },
            { text: 'An error, because age can\'t be equal to age + 2', why: 'Remember: `=` isn\'t mathematical equality, it\'s an assignment.' },
          ],
        },
        { type: 'p', text: 'Now check it with the **visualiser**: move forward line by line and watch the **Memory** panel and the **Console**. What you see is the real execution of the program in Python.' },
        { type: 'trace', code: 'age = 18\nage = age + 2\nprint(age)' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Changing a variable', concepts: ['reasignacion'],
      blocks: [
        { type: 'p', text: 'If you assign a new value to a variable that already exists, the old value **is lost**: the label now points to the new value.' },
        { type: 'code', code: 'age = age + 2', caption: '① Python reads the right-hand side: age is 18 → 18 + 2 = 20   ② stores 20 in age' },
        { type: 'callout', tone: 'warn', title: 'It\'s not an equation', text: 'In maths `age = age + 2` would be impossible. In Python it\'s an **instruction**: «work out age + 2 and store the result in age». It\'s one of the most common patterns in programming.' },
        {
          type: 'check', id: 'q-puntos', concept: 'reasignacion', mode: 'text',
          question: 'Predict the result:', code: 'points = 5\npoints = points * 3\npoints = points - 1\nprint(points)', answer: '14',
          explain: '5 → 5 × 3 = 15 → 15 − 1 = 14. Each line starts from the value the previous one left.',
        },
        {
          type: 'check', id: 'q-copia', concept: 'reasignacion', mode: 'choice',
          question: 'This is a classic trap. What will it show?', code: 'a = 10\nb = a\na = 99\nprint(b)', expectOutput: '10',
          options: [
            { text: '10', correct: true },
            { text: '99', why: '`b = a` copies into b the value a had **at that moment** (10). Variables don\'t stay «linked»: changing a afterwards doesn\'t change b.' },
          ],
        },
        { type: 'p', text: 'If that was tricky, look at what happens in memory:' },
        { type: 'trace', code: 'a = 10\nb = a\na = 99\nprint(b)' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'tipos', title: 'Text and numbers are not the same', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Every value has a **type**, and the type decides what you can do with it. The first three you need:' },
        {
          type: 'five', items: {
            'int': 'Whole numbers: `18`, `-3`, `2024`.',
            'float': 'Decimal numbers, with a **point**: `3.5`, `59.99`.',
            'str': 'Text, in quotes: `"Hello"`, `\'Ana\'`, `"18"`.',
          },
        },
        { type: 'p', text: 'You can ask Python the type of any value with `type()`:' },
        { type: 'code', run: true, code: 'print(type(18))\nprint(type(3.5))\nprint(type("18"))' },
        { type: 'p', text: 'Quotes change everything: `18` is a number; `"18"` is a text made of the characters 1 and 8. And the `+` operator behaves differently depending on the type:' },
        { type: 'code', run: true, code: 'print(18 + 2)\nprint("18" + "2")' },
        {
          type: 'check', id: 'q-55', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'print("5" + "5")', answer: '55',
          explain: 'They\'re texts: + sticks them together (concatenates). Result: the text "55".',
        },
        {
          type: 'check', id: 'q-mezcla', concept: 'tipos', mode: 'choice',
          question: 'And this one?', code: 'print(7 + "3")', expectError: 'TypeError',
          options: [
            { text: '10', why: 'Python doesn\'t turn the text "3" into a number on its own.' },
            { text: '73', why: 'Python doesn\'t turn the 7 into text automatically either.' },
            { text: 'An error (TypeError)', correct: true },
          ],
          explain: 'Python doesn\'t guess: if you mix text and numbers with +, it stops with a TypeError. You decide the conversion: `7 + int("3")` gives 10; `str(7) + "3"` gives "73".',
        },
        { type: 'p', text: 'To **join** a number with a text, turn it into text first with `str()`:' },
        { type: 'code', run: true, code: 'age = 17\nprint("I am " + str(age) + " years old")', caption: 'str(17) is the text "17", which can now be joined to other texts.' },
        { type: 'callout', tone: 'tip', title: 'The three conversions', text: '`int("18")` → whole number 18 · `float("3.5")` → decimal number 3.5 · `str(18)` → text "18".' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'operaciones', title: 'Operations with numbers', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Python can do a calculator\'s operations: `+` adds, `-` subtracts, `*` multiplies and `/` divides.' },
        { type: 'code', run: true, code: 'print(10 + 3)\nprint(10 - 3)\nprint(10 * 3)\nprint(10 / 4)\nprint(10 / 2)' },
        { type: 'callout', tone: 'warn', title: 'Division always gives a decimal', text: 'The result of `/` is always a float, even when the division is exact: `10 / 2` gives `5.0`, not `5`. That\'s why, when working out prices, you\'ll see results like `80.0`.' },
        { type: 'p', text: 'Just like in maths, `*` and `/` are worked out before `+` and `-`. If you want a different order, use brackets: `(2 + 3) * 4` gives 20.' },
        {
          type: 'check', id: 'q-prioridad', concept: 'tipos', mode: 'choice',
          question: 'What will it show?', code: 'print(2 + 3 * 4)', expectOutput: '14',
          options: [
            { text: '14', correct: true },
            { text: '20', why: 'Python multiplies before adding: 3 * 4 = 12 and then 2 + 12 = 14. To get 20 you\'d need brackets: (2 + 3) * 4.' },
          ],
        },
        { type: 'p', text: '**Percentages.** A percentage means «so many out of every hundred». 20 % of 50 € is 50 × 20 ÷ 100 = 10 €. In Python:' },
        { type: 'code', run: true, code: 'price = 50\ndiscount = 20\namount = price * discount / 100\nprint(amount)', caption: 'Try changing the price or the discount and run it again.' },
        {
          type: 'check', id: 'q-division', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'print(8 / 2)', answer: '4.0',
          explain: 'With `/` the result is always a decimal, even when the division is exact.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'print', title: 'Showing results with print()', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` shows values in the console. You can pass it several values separated by **commas**: it shows them on the same line, separated by a space.' },
        { type: 'code', run: true, code: 'name = "Lucy"\nage = 18\nprint("Hello,", name)\nprint(name, "is", age, "years old")' },
        { type: 'callout', tone: 'tip', title: 'Commas versus +', text: 'With commas you can mix text and numbers without converting anything: `print("You are", age, "years old")`. With `+` everything has to be text.' },
        {
          type: 'check', id: 'q-comillas', concept: 'print', mode: 'choice',
          question: 'What will it show?', code: 'age = 18\nprint("age")', expectOutput: 'age',
          options: [
            { text: 'age', correct: true },
            { text: '18', why: 'The quotes turn age into a literal text. To show the value: `print(age)`, without quotes.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'input', title: 'Asking for data with input()', concepts: ['input', 'tipos'],
      blocks: [
        { type: 'p', text: '`input()` pauses the program, shows a message and waits for the user to type something and press Enter. It returns what was typed.' },
        { type: 'code', run: true, code: 'name = input("What\'s your name? ")\nprint("Hello,", name)', caption: 'Run it: the console will ask you to type your name.' },
        { type: 'callout', tone: 'warn', title: 'Important', text: '`input()` **always returns text (str)**, even if the user types digits. To do calculations you have to convert it with `int()` (whole numbers) or `float()` (decimals).' },
        { type: 'code', run: true, code: 'age = input("How old are you? ")\nprint(type(age))\nage = int(age)\nprint("In a year you will be", age + 1)' },
        { type: 'p', text: 'It\'s usual to convert on the same line: `age = int(input("Age: "))`. Python works from the inside out: first `input()`, then `int()`.' },
        {
          type: 'check', id: 'q-input', concept: 'input', mode: 'choice',
          question: 'If the user types 20 in `x = input()`, what does x store?',
          options: [
            { text: 'The text "20"', correct: true },
            { text: 'The number 20', why: 'input() always returns text. It would be the number 20 if you wrote `x = int(input())`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'errores', title: 'Common errors (and how to read them)', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'Making mistakes is part of programming. What matters is **reading the error**: Python tells you the **type** of error, the **line** and a clue to the cause. Run each example and read the explanation.' },
        { type: 'code', run: true, title: 'Using a variable that doesn\'t exist', code: 'print(name)' },
        { type: 'code', run: true, title: 'Different capitals', code: 'Age = 20\nprint(age)' },
        { type: 'code', run: true, title: 'Unclosed quotes', code: 'print("Hello)' },
        { type: 'code', run: true, title: 'Mixing text and numbers with +', code: 'age = 17\nprint("I am " + age + " years old")' },
        { type: 'code', run: true, title: 'Assignment the wrong way round', code: '18 = age' },
        { type: 'callout', tone: 'info', title: 'Two families of errors', text: 'A **syntax error** (SyntaxError) stops the program from starting: it\'s written wrongly. A **runtime error** (NameError, TypeError…) appears while it runs. And there\'s a third family, the trickiest one: the **logic error**, when the program works but doesn\'t do what it should.' },
        {
          type: 'check', id: 'q-error', concept: 'errores', mode: 'choice',
          question: 'What error will this program give?', code: 'price = 10\nprint(Price)', expectError: 'NameError',
          options: [
            { text: 'NameError', correct: true },
            { text: 'SyntaxError', why: 'It\'s written correctly: the problem appears when running, when Python looks for a name that doesn\'t exist.' },
            { text: 'None: it shows 10', why: 'Price and price are different names for Python.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'var-predict' },
    { id: 'a2', activity: 'var-complete' },
    { id: 'a3', activity: 'var-order' },
    { id: 'a4', activity: 'var-fix' },
    { id: 'a5', activity: 'var-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A variable is a name that points to a value.',
    '`=` assigns: Python works out the right-hand side and stores it in the name on the left.',
    'When you reassign, the old value is lost; `x = x + 1` uses the old value to work out the new one.',
    'Variables store values, not formulas: they don\'t recalculate themselves.',
    '`18` (int) and `"18"` (str) are different; `input()` always returns str. You convert with `int()`, `float()` and `str()`.',
    'The operators `+ - * /` work as in maths; `/` always gives a decimal (`10 / 2` → `5.0`).',
    'Reading the error (type, line, cause) is the first step to fixing it.',
  ],
};
