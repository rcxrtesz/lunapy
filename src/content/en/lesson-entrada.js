// Lesson 2.3 · Types, conversions and data input (English translation of src/content/lesson-entrada.js).

const TOPIC = 'Types and input';

export const LESSON_ENTRADA = {
  id: 'entrada',
  moduleId: 'm2',
  code: '2.3',
  title: 'Types, conversions and data input',
  minutes: 30,
  bonusXp: 25,
  objectives: [
    'Predict what int(), float() and str() do in the tricky cases',
    'Choose the right type for each piece of data a program asks for',
    'Understand ValueError and why it appears with input()',
    'Control the output with sep, end and f-strings',
    'Organise a program into input, processing and output',
  ],
  prerequisites: ['Lesson 2.1 «Variables»', 'Lesson 2.2 «Expressions» (recommended)'],
  teaser: 'Today you finish Module 2: conversions without surprises, data from the user and output in exactly the format you want.',
  celebration: 'With this lesson you finish the theory of Module 2: you can now store, transform, ask for and show data. All that\'s left is the module challenge: the shopping receipt.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'conversiones', title: 'Conversions in depth', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'In lesson 2.1 you met `int()`, `float()` and `str()`. Now it\'s time to see what they do in the most confusing cases:' },
        { type: 'code', run: true, code: 'print(int(3.9), round(3.9))\nprint(float("3"), int(" 42 "))\nprint(str(2.5) + " €")' },
        {
          type: 'five', items: {
            'int() of a decimal': 'It **cuts off** the decimals, it doesn\'t round: `int(3.9)` is 3. To round, use `round()`.',
            'float() of a whole number': 'It adds the decimal: `float("3")` is 3.0.',
            'Spaces': 'Spaces at the start and end are ignored: `int(" 42 ")` is 42.',
            'Text with decimals': '`int("3.5")` gives an error: only `float()` understands a text with a point.',
          },
        },
        {
          type: 'check', id: 'm2t-int-corta', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'print(int(7.99))', answer: '7',
          explain: '`int()` cuts off the decimals without rounding: 7.99 → 7.',
        },
        {
          type: 'check', id: 'm2t-int-texto', concept: 'tipos', mode: 'choice',
          question: 'What happens?', code: 'print(int("3.5"))', expectError: 'ValueError',
          options: [
            { text: 'ValueError: "3.5" isn\'t a whole number', correct: true },
            { text: 'It shows 3', why: '`int()` cuts off the decimals of a **number**, but it doesn\'t accept a **text** with a point. You\'d have to do `float("3.5")` first.' },
            { text: 'It shows 4', why: '`int()` never rounds, and here it doesn\'t even get to convert: the text "3.5" isn\'t a valid whole number.' },
          ],
          explain: 'If you need the whole part of a text with decimals: `int(float("3.5"))` → 3.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'valueerror', title: 'When the user types something else', concepts: ['input', 'errores'],
      blocks: [
        { type: 'p', text: 'With `input()` you don\'t control what the person types. If you convert with `int()` and they type «twelve» or «17.5», Python stops with a **ValueError**: the value has the right type (text), but its content can\'t be converted.' },
        { type: 'code', run: true, code: 'age = int(input("Age: "))\nprint("Next year you will be", age + 1)', caption: 'Run it several times: type 17, then «twelve» and then 17.5. Read the error each time.' },
        { type: 'callout', tone: 'info', title: 'For now, trust the user', text: 'Later on you\'ll learn to catch these errors with `try` so you can ask again. For now, choose the conversion carefully and write clear messages: «Age (in years): ».' },
        {
          type: 'check', id: 'm2t-altura', concept: 'input', mode: 'choice',
          question: 'With `height = int(input("Height: "))` the user types 1.68 and a ValueError pops up. How do you fix it?',
          options: [
            { text: 'height = float(input("Height: "))', correct: true },
            { text: 'height = input("Height: ")', why: 'It wouldn\'t give an error any more, but `height` would be a text: you couldn\'t do calculations with it.' },
            { text: 'height = int(input("Height (no decimals): "))', why: 'It changes the message, but a height in metres needs decimals: the right type is `float`.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'elegir-tipo', title: 'int, float or text?', concepts: ['tipos', 'input'],
      blocks: [
        { type: 'p', text: 'Before writing `input()`, ask yourself two things: **am I going to do calculations with this data?** If not, leave it as text. **Can it have decimals?** If so, `float`; if it\'s always whole, `int`.' },
        {
          type: 'classify', id: 'm2t-tipo-dato', concept: 'tipos',
          question: 'Would you read it with int()? (if not, it would be float() or you\'d leave it as text)',
          items: [
            { text: 'Age in years', valid: true, why: 'It\'s a whole number and you can do maths with it (age + 1).' },
            { text: 'The price of a product', valid: false, why: 'It can have cents: `float()`.' },
            { text: 'The number of brothers and sisters', valid: true, why: 'It\'s always a whole number.' },
            { text: 'Height in metres', valid: false, why: 'It has decimals (1.68): `float()`.' },
            { text: 'The postcode', valid: false, why: 'It\'s left as **text**: you don\'t calculate with it and `int("08001")` would lose the leading zero.' },
          ],
        },
        {
          type: 'check', id: 'm2t-cero', concept: 'tipos', mode: 'text',
          question: 'Predict:', code: 'postcode = int("08001")\nprint(postcode)', answer: '8001',
          explain: 'As a number, the zero on the left means nothing and disappears. That\'s why postcodes and phone numbers are stored as text.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'print-avanzado', title: 'Tailor-made print(): sep and end', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` separates values with a space and ends with a line break. You can change both: `sep` is the separator and `end` is what it writes at the end.' },
        { type: 'code', run: true, code: 'print(29, 10, 2026, sep="/")\nprint("A", "B", "C", sep="")\nprint("Loading", end="")\nprint("...")\nprint("Done")' },
        { type: 'callout', tone: 'tip', title: 'When to use them', text: '`sep=""` sticks the values together without spaces; `end=""` makes the next `print` carry on on the same line.' },
        {
          type: 'check', id: 'm2t-sep', concept: 'print', mode: 'text',
          question: 'Predict:', code: 'print("a", "b", "c", sep="-")', answer: 'a-b-c',
          explain: '`sep="-"` puts a hyphen between each value, instead of the space.',
        },
        {
          type: 'check', id: 'm2t-end', concept: 'print', mode: 'text',
          question: 'Predict (it\'s a single line):', code: 'print("Hello", end=" ")\nprint("world")', answer: 'Hello world',
          explain: 'The first print ends with a space instead of a line break, so «world» appears right after it.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'fstrings', title: 'f-strings: texts with gaps', concepts: ['print', 'tipos'],
      blocks: [
        { type: 'p', text: 'An **f-string** is a text with an `f` in front of the quotes. Inside, anything you put between curly brackets `{ }` is calculated and put in its place, without needing `str()`:' },
        { type: 'code', run: true, code: 'name = "Lucía"\nage = 18\nprint(f"{name} is {age} years old")\nprint(f"Next year she will be {age + 1}")' },
        { type: 'p', text: 'After a colon you can give the **format**. The most useful one: `:.2f`, which shows the number with exactly 2 decimal places.' },
        { type: 'code', run: true, code: 'price = 4.5\ntotal = 19.999\nprint(f"Price: {price:.2f} €")\nprint(f"Total: {total:.2f} €")' },
        {
          type: 'five', items: {
            'With commas': '`print("She is", age, "years old")`: simple; adds spaces.',
            'With +': '`print("She is " + str(age) + " years old")`: everything has to be text.',
            'With an f-string': '`print(f"She is {age} years old")`: the clearest, and it lets you format.',
          },
        },
        {
          type: 'check', id: 'm2t-fstring', concept: 'print', mode: 'text',
          question: 'Predict:', code: 'n = 3\nprint(f"{n} x 2 = {n * 2}")', answer: '3 x 2 = 6',
          explain: 'Each pair of curly brackets is replaced by its value: n is 3 and n * 2 is 6.',
        },
        {
          type: 'check', id: 'm2t-sin-f', concept: 'print', mode: 'choice',
          question: 'What will it show?', code: 'name = "Ana"\nprint("Hello, {name}")', expectOutput: 'Hello, {name}',
          options: [
            { text: 'Hello, {name}', correct: true },
            { text: 'Hello, Ana', why: 'The `f` in front of the quotes is missing: without it, the curly brackets are ordinary text.' },
          ],
          explain: 'Without the `f`, it\'s an ordinary text: `print(f"Hello, {name}")` would show «Hello, Ana».',
        },
        {
          type: 'check', id: 'm2t-2f', concept: 'print', mode: 'text',
          question: 'Predict:', code: 'average = 7.0 / 3\nprint(f"{average:.2f}")', answer: '2.33',
          explain: '7 / 3 is 2.333…; `:.2f` shows it rounded to 2 decimal places.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'eps', title: 'Input, processing and output', concepts: ['descomponer', 'input'],
      blocks: [
        { type: 'p', text: 'Almost all the programs you\'ll write in this module follow the same pattern. Thinking about it before writing helps you plan:' },
        {
          type: 'five', items: {
            '1 · Input': 'Ask for the data and convert it to the right type.',
            '2 · Processing': 'Do the calculations and store them in well-named variables.',
            '3 · Output': 'Show the result in a clear format.',
          },
        },
        { type: 'code', run: true, code: '# Input\ncelsius = float(input("Temperature in °C: "))\n# Processing\nfahrenheit = celsius * 9 / 5 + 32\n# Output\nprint(f"{celsius} °C is {fahrenheit:.1f} °F")', caption: 'Try 100 (water boils: 212 °F) and 36.6.' },
        {
          type: 'check', id: 'm2t-eps', concept: 'descomponer', mode: 'choice',
          question: 'In that program, which part does `fahrenheit = celsius * 9 / 5 + 32` belong to?',
          options: [
            { text: 'Processing', correct: true },
            { text: 'Input', why: 'The input is where the data is asked for (`input`). This line calculates from it.' },
            { text: 'Output', why: 'The output is the `print`. This line only calculates and stores the result.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'tip-predict' },
    { id: 'a2', activity: 'tip-complete' },
    { id: 'a3', activity: 'tip-fix' },
    { id: 'a4', activity: 'tip-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`int()` cuts off the decimals of a number (it doesn\'t round) and doesn\'t accept texts with a point: `int("3.5")` gives ValueError.',
    'A **ValueError** appears when the content can\'t be converted, for example if the user types «twelve».',
    'Choose the type by thinking about the data: whole numbers with `int`, decimals with `float` and codes or names as text.',
    '`sep` changes the separator of `print` and `end`, what it writes at the end.',
    'f-strings (`f"…{value}…"`) put values into a text; `:.2f` gives exactly 2 decimal places.',
    'The shape of a program: input → processing → output.',
  ],
};

export const ACTIVITIES_ENTRADA = {
  'tip-predict': {
    id: 'tip-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The chameleon seven', difficulty: 1, xp: 10, concepts: ['tipos'],
    prompt: 'The same «7» behaves differently depending on its type. **What will it show?**',
    code: 'a = "7"\nb = int(a) + 3\nc = a * 2\nprint(b, c, float(b))',
    expectedOutput: '10 77 10.0',
    options: [
      { text: '10 77 10.0', correct: true },
      { text: '10 14 10.0', concept: 'tipos', why: '`a` is still the text "7": `int(a)` creates a new number, but it doesn\'t change `a`. And a text times 2 is **repeated**: "77".' },
      { text: '73 77 10.0', concept: 'tipos', why: '`int(a)` turns the text into the number 7, so `+ 3` adds: 10.' },
      { text: '10 77 10', concept: 'tipos', why: '`float()` always gives a decimal: `float(10)` is 10.0.' },
    ],
    explain: [
      '`a` is the text "7".',
      '`int(a)` is the number 7, and 7 + 3 = 10.',
      '`a * 2` repeats the text: "77". `a` hasn\'t changed type.',
      '`float(10)` is 10.0.',
    ],
  },
  'tip-complete': {
    id: 'tip-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The receipt line', difficulty: 2, xp: 15, concepts: ['print', 'tipos'],
    statement: 'Complete the f-string so the receipt line shows the **product name** and the **total with exactly 2 decimal places**:',
    expected: 'Notebook x3: 7.50 €',
    starter: 'product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{___} x{units}: {total:___} €")',
    spec: {
      blanks: true,
      exact_lines: true,
      cases: [{ label: 'Expected output', out_lines: ['Notebook x3: 7.50 €'] }],
      variants: [{
        label: 'Price 1.2 € and 4 units', set: { price: 1.2, units: 4 }, out_lines: ['Notebook x4: 4.80 €'],
        msg: 'With other data the line doesn\'t come out right: show the values of the variables, don\'t type them by hand.',
      }],
      misconceptions: [
        { out_lines: ['Notebook x3: 7.5 €'], title: 'Decimals are missing', msg: 'The total must show **exactly 2 decimal places** (7.50). You get that with the `.2f` format after the colon.' },
        { out_contains: 'product x', title: 'You\'ve written the word', msg: 'The word «product» is being shown. Inside the curly brackets goes the **variable name**, without quotes: `{product}`.' },
      ],
      rules: [{ type: 'must_load', names: ['product', 'total'], title: 'Use the variables', msg: 'Put the product and total variables into the f-string.' }],
      logic_msg: 'Compare your output with the expected one character by character: the decimals count here too.',
    },
    hints: [
      { level: 'Orientation', text: 'There are two gaps: the first is **what** is shown (the product name); the second, **how** the total is shown.' },
      { level: 'Reasoning', text: 'Which variable stores «Notebook»? Which format gives exactly 2 decimal places?' },
      { level: 'Pseudocode', text: 'first gap ← the variable with the product name\nsecond gap ← 2-decimal format', pre: true },
      { level: 'Technical help', text: 'Inside the curly brackets goes the variable without quotes: `{product}`. For 2 decimal places: `{total:.2f}`.' },
    ],
    solution: {
      code: 'product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{product} x{units}: {total:.2f} €")',
      explanation: '`{product}` puts in the variable\'s value and `{total:.2f}` shows 7.5 as 7.50: prices are always written with two decimal places.',
    },
    reference: ['product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{product} x{units}: {total:.2f} €")'],
    wrongs: [
      { code: 'product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{___} x{units}: {total:___} €")', category: 'incompleto' },
      { code: 'product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{product} x{units}: {total} €")', category: 'comprension' },
      { code: 'product = "Notebook"\nprice = 2.5\nunits = 3\ntotal = price * units\nprint(f"{product} x{units}: 7.50 €")', category: 'logica' },
    ],
  },
  'tip-fix': {
    id: 'tip-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The profile that won\'t start', difficulty: 2, xp: 20, concepts: ['input', 'tipos', 'errores'],
    statement: 'This program asks for a name, age and height, but it fails. **Run it** (try Ana, 30 and 1.68), read each error and fix it. There are **two** bugs.',
    expected: 'Ana will be 31 years old\nHeight: 1.68 m',
    starter: 'name = input("Name: ")\nage = input("Age: ")\nheight = int(input("Height (m): "))\nprint(name + " will be " + age + 1 + " years old")\nprint("Height:", height, "m")',
    spec: {
      cases: [
        { label: 'Ana, 30 years, 1.68 m', stdin: ['Ana', '30', '1.68'], out_lines: ['Ana will be 31 years old', 'Height: 1.68 m'] },
        { label: 'Luis, 9 years, 1.3 m', stdin: ['Luis', '9', '1.3'], out_lines: ['Luis will be 10 years old', 'Height: 1.3 m'] },
      ],
      misconceptions: [
        { out_lines: ['Ana will be 301 years old', 'Height: 1.68 m'], title: '30 + 1 isn\'t 301', msg: 'You\'ve stuck the text "1" onto the text "30". To **add**, `age` has to be a number: convert it with `int()`.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the data', msg: 'Keep the input() calls: the program has to work for anyone.' }],
      logic_msg: 'There are no errors left, but the output doesn\'t match. Check the spaces: + doesn\'t add any automatically.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it and type Ana, 30 and 1.68. The first error is a **ValueError**: on which line? Which value couldn\'t be converted?' },
      { level: 'Reasoning', text: 'Line 3: what type does a height with decimals need? Line 4: `age` is a text; can you add 1 to it? And join a number to texts using `+`?' },
      { level: 'Pseudocode', text: 'Line 2: convert the age to a whole number\nLine 3: convert the height to a decimal\nLine 4: show age + 1 without mixing types with +', pre: true },
      { level: 'Technical help', text: '`float(input())` reads decimals. With an f-string you don\'t need `str()`: `print(f"{name} will be {age + 1} years old")`.' },
    ],
    solution: {
      code: 'name = input("Name: ")\nage = int(input("Age: "))\nheight = float(input("Height (m): "))\nprint(f"{name} will be {age + 1} years old")\nprint("Height:", height, "m")',
      explanation: '`int("1.68")` gives ValueError: a height with decimals is read with `float()`. Then `age` must be a number so you can add 1 to it, and the f-string avoids mixing text and numbers with `+`.',
    },
    reference: [
      'name = input("Name: ")\nage = int(input("Age: "))\nheight = float(input("Height (m): "))\nprint(f"{name} will be {age + 1} years old")\nprint("Height:", height, "m")',
      'name = input()\nage = int(input())\nheight = float(input())\nprint(name + " will be " + str(age + 1) + " years old")\nprint("Height:", height, "m")',
    ],
    wrongs: [
      { code: 'name = input("Name: ")\nage = input("Age: ")\nheight = int(input("Height (m): "))\nprint(name + " will be " + age + 1 + " years old")\nprint("Height:", height, "m")', category: 'ejecucion' },
      { code: 'name = input("Name: ")\nage = input("Age: ")\nheight = float(input("Height (m): "))\nprint(name + " will be " + age + 1 + " years old")\nprint("Height:", height, "m")', category: 'ejecucion' },
      { code: 'name = input("Name: ")\nage = input("Age: ")\nheight = float(input("Height (m): "))\nprint(name + " will be " + age + "1" + " years old")\nprint("Height:", height, "m")', category: 'comprension' },
      { code: 'name = input()\nage = input()\nheight = input()\nprint("Ana will be 31 years old")\nprint("Height: 1.68 m")', category: 'logica' },
    ],
  },
  'tip-build': {
    id: 'tip-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Average speed', difficulty: 3, xp: 30, concepts: ['input', 'tipos', 'descomponer'],
    unlock: { any: ['tip-predict', 'tip-complete', 'tip-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'A sports app wants to show the **average speed in km/h** of each outing. Write a program that asks for the **distance in km** (it can have decimals) and the **time in minutes** (whole number) and shows the speed in km/h.\n\nExample: 10 km in 30 minutes → 20 km/h.\n\nShow the speed on the **last line**; you can round it to one decimal place with `:.1f`.',
    plan: [
      {
        q: 'How do you read each piece of data?', multi: true,
        options: [
          { text: 'distance = float(input(...))', correct: true },
          { text: 'minutes = int(input(...))', correct: true },
          { text: 'distance = int(input(...))', why: 'A distance like 42.195 km has decimals: `int()` would give ValueError.' },
          { text: 'minutes = input(...)', why: 'Without converting it would be text and you couldn\'t divide.' },
        ],
      },
      {
        q: 'Speed in km/h is kilometres divided by **hours**. How do you turn the minutes into hours?',
        options: [
          { text: 'minutes / 60', correct: true },
          { text: 'minutes * 60', why: '30 minutes would be 1800 hours: the other way round. An hour has 60 minutes, so you divide.' },
          { text: 'minutes // 60', why: 'With `//` the decimals are lost: 30 minutes would give 0 hours (and a division by zero).' },
        ],
      },
      {
        q: 'With 10 km in 30 minutes, which calculation gives 20 km/h?',
        options: [
          { text: '10 / (30 / 60)', correct: true },
          { text: '10 / 30 / 60', why: 'Without brackets you also divide by 60: it gives 0.0055. Look at the order of operations.' },
          { text: '10 / 30', why: 'That\'s kilometres per **minute** (0.33), not per hour.' },
        ],
      },
    ],
    planScaffold: '# Input: distance (km) and time (minutes)\n\n# Processing: turn the minutes into hours and work out the speed\n\n# Output: show the speed\n',
    starter: '',
    spec: {
      cases: [
        { label: '10 km in 30 min', stdin: ['10', '30'], args: { d: 10, t: 30 } },
        { label: 'Marathon: 42.195 km in 180 min', stdin: ['42.195', '180'], args: { d: 42.195, t: 180 } },
        { label: 'Edge case: 5 km in 60 min', stdin: ['5', '60'], args: { d: 5, t: 60 } },
      ],
      expect_last_number: 'd / (t / 60)',
      hidden: { count: 2, args: { d: [1, 100, 1], t: [10, 300, 0] }, stdin: ['d', 't'] },
      tolerance: 0.05,
      misconceptions: [
        { expr: 'd / t', title: 'Km per minute', msg: 'You divided by minutes: that\'s kilometres per **minute**. Turn the minutes into hours first (÷ 60).' },
        { expr: 'd / t / 60', title: 'Check the order', msg: 'Without brackets you divide the distance by the minutes and then by 60 again. Use `distance / (minutes / 60)`.' },
        { expr: 'd / (t * 60)', title: 'Minutes to hours', msg: 'To turn minutes into hours you **divide** by 60, you don\'t multiply.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the data', msg: 'Use input() to ask for the distance and the time.' }],
    },
    hints: [
      { level: 'Orientation', text: 'Two inputs (distance and minutes) and one result (km/h). Follow the input → processing → output pattern.' },
      { level: 'Reasoning', text: 'km/h means «kilometres every hour». You have minutes: first turn them into hours and then divide the distance by the hours.' },
      { level: 'Pseudocode', text: 'distance ← ask for a decimal number\nminutes ← ask for a whole number\nhours ← minutes ÷ 60\nspeed ← distance ÷ hours\nshow speed', pre: true },
      { level: 'Technical help', text: '`float(input("Distance (km): "))` and `int(input("Minutes: "))`. To show one decimal place: `print(f"Speed: {speed:.1f} km/h")`.' },
    ],
    solution: {
      code: '# Input\ndistance = float(input("Distance (km): "))\nminutes = int(input("Time (minutes): "))\n# Processing\nhours = minutes / 60\nspeed = distance / hours\n# Output\nprint(f"Average speed: {speed:.1f} km/h")',
      explanation: 'The data is read with the right type, the minutes are turned into hours and you divide. With 42.195 km in 180 minutes: 3 hours and 14.1 km/h.',
    },
    reference: [
      'd = float(input())\nt = int(input())\nprint(d / (t / 60))',
      'distance = float(input("Km: "))\nminutes = int(input("Min: "))\nprint(f"{distance * 60 / minutes:.1f} km/h")',
    ],
    wrongs: [
      { code: 'distance = float(input())\nminutes = int(input())\nprint(distance / minutes)', category: 'comprension' },
      { code: 'distance = int(input())\nminutes = int(input())\nprint(distance / (minutes / 60))', category: 'ejecucion' },
      { code: 'print(20)', category: 'logica' },
    ],
  },
};
