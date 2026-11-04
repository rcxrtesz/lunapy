// Lesson 11.3 · Exceptions (English translation of src/content/lesson-excepciones.js).

const TOPIC = 'Files';

export const LESSON_EXCEPCIONES = {
  id: 'excepciones',
  moduleId: 'm11',
  code: '11.3',
  title: 'Exceptions',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Catch errors with try and except so the program doesn\'t stop',
    'Catch specific exceptions and avoid the bare except',
    'Repeat a question until the data is valid',
    'Raise your own exceptions with raise',
    'Handle a file that doesn\'t exist',
  ],
  prerequisites: ['Lesson 11.2 «Processing data»', 'Lesson 7.2 «While loops»'],
  teaser: 'In lesson 2.3 we promised you a way to stop the program breaking when someone types «twelve» instead of 12. Today we keep that promise.',
  celebration: 'You\'ve completed Module 11: you read and process files and your programs know how to react to errors without breaking.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'try', title: 'try and except', concepts: ['excepciones'],
      blocks: [
        { type: 'p', text: 'An **exception** is an error while the program runs (ValueError, KeyError…). If nobody catches it, the program stops. With `try`/`except` you can **catch it** and decide what to do:' },
        { type: 'code', run: true, code: 'text = input("Type a number: ")\ntry:\n    number = int(text)\n    print("Double is", number * 2)\nexcept ValueError:\n    print("That isn\'t a whole number.")\nprint("The program carries on.")', caption: 'Try 21 and then «hello».' },
        {
          type: 'five', items: {
            'try': 'The code that might fail.',
            'except Type': 'What is done if that type of error happens. If there\'s no error, it\'s skipped.',
            'Afterwards': 'The program continues as normal.',
          },
        },
        {
          type: 'check', id: 'm11e-flujo', concept: 'excepciones', mode: 'choice',
          question: 'What will it show?', code: 'try:\n    print("A")\n    x = int("three")\n    print("B")\nexcept ValueError:\n    print("C")\nprint("D")', expectOutput: 'A\nC\nD',
          options: [
            { text: 'A, C, D', correct: true },
            { text: 'A, B, C, D', why: 'When int("three") fails, Python jumps straight to the except: «B» isn\'t run.' },
            { text: 'A and a ValueError', why: 'The except catches the ValueError: the program doesn\'t stop.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'concretas', title: 'Catch only what you expect', concepts: ['excepciones', 'errores'],
      blocks: [
        { type: 'p', text: 'You can have several excepts, one per type of error. What you **shouldn\'t** do is use an `except:` with no type: it also catches errors you weren\'t expecting, like a misspelt variable, and hides them.' },
        { type: 'code', run: true, code: 'def divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("You can\'t divide by zero")\n    except TypeError:\n        print("Both values have to be numbers")\n\nprint(divide(10, 2))\ndivide(5, 0)\ndivide("5", 2)' },
        { type: 'code', run: true, title: 'An except with no type hides the real error', code: 'try:\n    number = int("42")\n    print(numbr * 2)    # typo: numbr\nexcept:\n    print("Invalid data")   # but the data was valid!' },
        {
          type: 'check', id: 'm11e-tipo', concept: 'excepciones', mode: 'choice',
          question: 'Which except do you need for `ages["Leo"]` if "Leo" might not be in the dictionary?',
          options: [
            { text: 'except KeyError:', correct: true },
            { text: 'except ValueError:', why: 'A key that doesn\'t exist produces a KeyError.' },
            { text: 'except:', why: 'It would work, but it would also hide any other error. Catch only the one you expect.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Repeat until it\'s valid', concepts: ['excepciones', 'bucles'],
      blocks: [
        { type: 'p', text: 'By combining while and try you can ask for a piece of data **until it\'s correct**, without the program ever breaking:' },
        { type: 'code', run: true, code: 'while True:\n    try:\n        age = int(input("Age: "))\n        break               # you only get here if int() worked\n    except ValueError:\n        print("Please type the age in numbers.")\nprint("Age saved:", age)', caption: 'Type «twelve» or «12.5» before a correct age.' },
        {
          type: 'check', id: 'm11e-break', concept: 'excepciones', mode: 'choice',
          question: 'In that program, why is the break inside the try and after the int()?',
          options: [
            { text: 'To leave the loop only if the conversion has worked', correct: true },
            { text: 'Because you have to put a break in a try', why: 'You don\'t have to. It\'s there because, if int() fails, Python jumps to the except and the break is never reached: the loop asks again.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'raise', title: 'Raising your own exceptions', concepts: ['excepciones', 'diseno'],
      blocks: [
        { type: 'p', text: 'A function can also **warn** that it has received data that makes no sense. With `raise` it raises an exception with a message; whoever calls it decides whether to catch it:' },
        { type: 'code', run: true, code: 'def discounted_price(price, percentage):\n    if not 0 <= percentage <= 100:\n        raise ValueError("the percentage must be between 0 and 100")\n    return price * (1 - percentage / 100)\n\nprint(discounted_price(80, 25))\ntry:\n    discounted_price(80, 150)\nexcept ValueError as error:\n    print("Error:", error)' },
        {
          type: 'more', summary: 'else and finally',
          items: [
            '`else:` goes after the excepts and runs only if there was **no** exception.',
            '`finally:` runs **always**, whether there\'s an error or not. Useful for closing resources (although with `with` you almost never need it).',
          ],
        },
        {
          type: 'check', id: 'm11e-raise', concept: 'excepciones', mode: 'choice',
          question: 'What will it show?', code: 'def root(x):\n    if x < 0:\n        raise ValueError("negative")\n    return x ** 0.5\n\ntry:\n    print(root(16))\n    print(root(-4))\nexcept ValueError as e:\n    print("Error:", e)', expectOutput: '4.0\nError: negative',
          options: [
            { text: '4.0 and then «Error: negative»', correct: true },
            { text: 'Only «Error: negative»', why: 'root(16) works and is shown before root(-4) raises the exception.' },
            { text: '4.0 and a ValueError that stops the program', why: 'The except catches the ValueError and shows its message.' },
          ],
          explain: 'root(16) gives 4.0; root(-4) raises the exception, which the except catches and shows.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'archivos', title: 'Files that don\'t exist', concepts: ['excepciones', 'archivos'],
      blocks: [
        { type: 'p', text: 'Opening a file that doesn\'t exist produces a **FileNotFoundError**. Catching it lets you give a clear message or use a default value:' },
        { type: 'code', run: true, code: 'def read_notes(name):\n    try:\n        with open(name) as f:\n            return f.read()\n    except FileNotFoundError:\n        return ""\n\nprint(repr(read_notes("does_not_exist.txt")))' },
        {
          type: 'check', id: 'm11e-fnf', concept: 'excepciones', mode: 'choice',
          question: 'Which exception does `open("missing.txt")` produce if the file doesn\'t exist?',
          options: [
            { text: 'FileNotFoundError', correct: true },
            { text: 'KeyError', why: 'KeyError is for dictionary keys.' },
            { text: 'ValueError', why: 'ValueError is for values with invalid content, like int("hello").' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'exc-predict' },
    { id: 'a2', activity: 'exc-complete' },
    { id: 'a3', activity: 'exc-fix' },
    { id: 'a4', activity: 'exc-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`try:` holds the code that might fail; `except Type:` decides what to do if it fails.',
    'If there\'s an error, the rest of the try is skipped and the except runs; then the program continues.',
    'Catch specific exceptions (ValueError, KeyError, FileNotFoundError…); avoid a bare `except:`.',
    'To validate data: `while True` + `try` + `break` when the conversion works.',
    '`raise ValueError("message")` warns about invalid data; `except ValueError as e` picks it up.',
  ],
};

export const ACTIVITIES_EXCEPCIONES = {
  'exc-predict': {
    id: 'exc-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Add what you can', difficulty: 2, xp: 10, concepts: ['excepciones', 'bucles'],
    prompt: 'Some of the data aren\'t numbers. **What will it show?**',
    code: 'data = ["4", "two", "6", "1.5"]\ntotal = 0\nerrors = 0\nfor d in data:\n    try:\n        total += int(d)\n    except ValueError:\n        errors += 1\nprint(total, errors)',
    expectedOutput: '10 2',
    options: [
      { text: '10 2', correct: true },
      { text: '11.5 1', concept: 'excepciones', why: 'int("1.5") fails too: int doesn\'t accept texts with decimals.' },
      { text: '4 1', concept: 'excepciones', why: 'The try is inside the loop: after an error, the loop carries on with the next value.' },
      { text: 'A ValueError', concept: 'excepciones', why: 'The errors are caught with except: the program doesn\'t stop.' },
    ],
    explain: ['"4" → 4.', '"two" → ValueError: errors = 1.', '"6" → total 10.', '"1.5" → ValueError: errors = 2.'],
  },
  'exc-complete': {
    id: 'exc-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Converting without breaking', difficulty: 2, xp: 15, concepts: ['excepciones'],
    statement: 'Complete `to_number(text)` so it returns the text converted to `float`, or `None` if it isn\'t a number.',
    expected: '3.5\nNone',
    starter: 'def to_number(text):\n    ___:\n        return float(text)\n    except ___:\n        return ___\n\nprint(to_number("3.5"))\nprint(to_number("three"))',
    spec: {
      blanks: true,
      functions: [{ name: 'to_number', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['3.5', 'None'] },
        { label: 'to_number("7")', call: 'print(to_number("7"))', out_lines: ['7.0'] },
        { label: 'to_number("")', call: 'print(to_number(""))', out_lines: ['None'] },
      ],
      logic_msg: 'With a numeric text it returns the number; with any other, None.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the word that opens the protected block, the type of error and what\'s returned if it fails.' },
      { level: 'Reasoning', text: 'Which exception does float("three") give? Which special value means «there\'s no result»?' },
      { level: 'Pseudocode', text: 'try: return float(text)\nif ValueError: return None', pre: true },
      { level: 'Technical help', text: '`try:`, `except ValueError:` and `return None`.' },
    ],
    solution: {
      code: 'def to_number(text):\n    try:\n        return float(text)\n    except ValueError:\n        return None\n\nprint(to_number("3.5"))\nprint(to_number("three"))',
      explanation: 'If float() works, the return in the try gives back the number. If it raises a ValueError, the except returns None: the function never breaks the program.',
    },
    reference: ['def to_number(text):\n    try:\n        return float(text)\n    except ValueError:\n        return None\n\nprint(to_number("3.5"))\nprint(to_number("three"))'],
    wrongs: [
      { code: 'def to_number(text):\n    ___:\n        return float(text)\n    except ___:\n        return ___', category: 'incompleto' },
      { code: 'def to_number(text):\n    try:\n        return float(text)\n    except KeyError:\n        return None\n\nprint(to_number("3.5"))\nprint(to_number("three"))', category: 'ejecucion' },
    ],
  },
  'exc-fix': {
    id: 'exc-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The except that hides everything', difficulty: 3, xp: 25, concepts: ['excepciones', 'errores'],
    statement: '`double(text)` should return double the number, or the text `"invalid"` if it isn\'t a number. But it **always** says «invalid», even with "4". The `except` with no type is hiding another error. Find it and fix it, and make the except catch only the right error.',
    expected: '8\ninvalid',
    starter: 'def double(text):\n    try:\n        number = int(text)\n        return numbr * 2\n    except:\n        return "invalid"\n\nprint(double("4"))\nprint(double("four"))',
    spec: {
      functions: [{ name: 'double', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['8', 'invalid'] },
        { label: 'double("-10")', call: 'print(double("-10"))', out_lines: ['-20'] },
      ],
      misconceptions: [
        { out_lines: ['invalid', 'invalid'], title: 'Something is still failing inside the try', msg: 'The except with no type catches any error. Change it to `except ValueError:` and run it: you\'ll see the error that was hidden.' },
      ],
      logic_msg: 'double("4") must return 8.',
    },
    hints: [
      { level: 'Orientation', text: 'Change `except:` to `except ValueError:` and run it. Which error appears now?' },
      { level: 'Reasoning', text: 'There\'s a typo in a variable name inside the try. The except with no type turned it into «invalid».' },
      { level: 'Pseudocode', text: 'try: number ← int(text); return number × 2\nif ValueError: return "invalid"', pre: true },
      { level: 'Technical help', text: 'Change `numbr` to `number` and use `except ValueError:`.' },
    ],
    solution: {
      code: 'def double(text):\n    try:\n        number = int(text)\n        return number * 2\n    except ValueError:\n        return "invalid"\n\nprint(double("4"))\nprint(double("four"))',
      explanation: 'The NameError from the typo was caught by the except with no type and looked like invalid data. By catching only ValueError, programming errors come to light.',
    },
    reference: ['def double(text):\n    try:\n        number = int(text)\n        return number * 2\n    except ValueError:\n        return "invalid"\n\nprint(double("4"))\nprint(double("four"))'],
    wrongs: [
      { code: 'def double(text):\n    try:\n        number = int(text)\n        return numbr * 2\n    except:\n        return "invalid"\n\nprint(double("4"))\nprint(double("four"))', category: 'comprension' },
      { code: 'def double(text):\n    try:\n        number = int(text)\n        return numbr * 2\n    except ValueError:\n        return "invalid"\n\nprint(double("4"))\nprint(double("four"))', category: 'ejecucion' },
    ],
  },
  'exc-build': {
    id: 'exc-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Asking for an age, foolproof', difficulty: 3, xp: 30, concepts: ['excepciones', 'bucles', 'input'],
    unlock: { any: ['exc-predict', 'exc-complete', 'exc-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define `ask_age()` that asks for an age with input and **returns** it as a whole number. While the data isn\'t a whole number **between 0 and 120**, show `Invalid age` and ask again.\n\nExample: if the user types «twenty», «-3» and «25», the function shows «Invalid age» twice and returns 25.',
    expected: 'Invalid age\nInvalid age\n25',
    plan: [
      {
        q: 'What two problems can the data have?',
        multi: true,
        options: [
          { text: 'It isn\'t a number (int() gives ValueError)', correct: true },
          { text: 'It\'s a number outside 0–120', correct: true },
          { text: 'It\'s an even number', why: 'The task doesn\'t set any condition about whether it\'s even.' },
        ],
      },
      {
        q: 'Which structure fits?',
        options: [
          { text: 'while True with try/except inside and return when the data is valid', correct: true },
          { text: 'An if with try', why: 'An if only checks once: you have to repeat until the data is valid.' },
        ],
      },
    ],
    planScaffold: 'def ask_age():\n    while True:\n        # try to convert; if it\'s valid, return it\n        # if not, show "Invalid age"\n        pass\n\n\nprint(ask_age())\n',
    starter: '',
    spec: {
      functions: [{ name: 'ask_age', params: 0 }],
      cases: [
        { label: '«twenty», «-3» and «25»', stdin: ['twenty', '-3', '25'], call: 'print(ask_age())', out_lines: ['Invalid age', 'Invalid age', '25'] },
        { label: 'Valid first time', stdin: ['40'], call: 'print(ask_age())', out_lines: ['40'] },
        { label: 'Limits: 121, 12.5 and 0', stdin: ['121', '12.5', '0'], call: 'print(ask_age())', out_lines: ['Invalid age', 'Invalid age', '0'] },
      ],
      misconceptions: [
        { out_lines: ['Invalid age', '-3'], title: 'The range check is missing', msg: 'A whole number isn\'t enough: it also has to be between 0 and 120.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The function must ask for the data', msg: 'Use input() inside ask_age.' }],
      logic_msg: 'For each invalid value «Invalid age» must appear; at the end the correct age is returned.',
    },
    hints: [
      { level: 'Orientation', text: 'An infinite loop that only ends with a return when the data is valid.' },
      { level: 'Reasoning', text: 'Inside the loop: try with int(input()). If it works and it\'s in range, return. In any other case (ValueError or out of range), show the warning.' },
      { level: 'Pseudocode', text: 'repeat forever:\n    try: age ← int(ask)\n        if 0 ≤ age ≤ 120: return age\n    if ValueError: (nothing)\n    show "Invalid age"', pre: true },
      { level: 'Technical help', text: 'Inside the try: `age = int(input("Age: "))` and `if 0 <= age <= 120: return age`. In the except: `pass`. After the try/except: `print("Invalid age")`.' },
    ],
    solution: {
      code: 'def ask_age():\n    """Ask for an age until it\'s a whole number between 0 and 120, and return it."""\n    while True:\n        try:\n            age = int(input("Age: "))\n            if 0 <= age <= 120:\n                return age\n        except ValueError:\n            pass\n        print("Invalid age")\n\nprint(ask_age())',
      explanation: 'The return leaves the function (and the loop) only with valid data. If int() fails, the except absorbs it with pass; in that case, as well as when it\'s out of range, the warning print is reached and the loop asks again.',
    },
    reference: [
      'def ask_age():\n    while True:\n        try:\n            age = int(input())\n            if 0 <= age <= 120:\n                return age\n        except ValueError:\n            pass\n        print("Invalid age")',
    ],
    wrongs: [
      { code: 'def ask_age():\n    while True:\n        try:\n            return int(input())\n        except ValueError:\n            print("Invalid age")', category: 'comprension' },
      { code: 'def ask_age():\n    age = int(input())\n    while age < 0 or age > 120:\n        print("Invalid age")\n        age = int(input())\n    return age', category: 'ejecucion' },
    ],
  },
};
