// Module 2 · lesson 2.1 activities and Variables challenges (English translation of the
// ACTIVITIES_M2 block in src/content/activities.js). Same ids, concepts and XP.

const TOPIC = 'Variables';

export const ACTIVITIES_M2 = {
  // ------------------------------------------------------------------ 1
  'var-predict': {
    id: 'var-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The scoreboard', difficulty: 1, xp: 10, concepts: ['reasignacion', 'print'],
    prompt: 'Read the program calmly, line by line, the way Python would. **What do you think it will show?**',
    code: `points = 10
points = points + 5
bonus = points * 2
points = 3
print(points, bonus)`,
    expectedOutput: '3 30',
    options: [
      { text: '3 30', correct: true },
      { text: '15 30', concept: 'reasignacion', why: 'Line 4 changes `points` to 3 **before** the `print`. `print` shows the value the variable has at that moment, not the one it had before.' },
      { text: '3 6', concept: 'reasignacion', why: '`bonus` was worked out on line 3, when `points` was 15. A variable stores a **value**, not a formula: changing `points` later doesn\'t recalculate `bonus` (Python isn\'t a spreadsheet).' },
      { text: 'points bonus', concept: 'print', why: 'Without quotes, `points` and `bonus` are variable names: `print` shows their **values**. To show the word you\'d have to write `"points"`.' },
    ],
    explain: [
      'Line 1: `points` is 10.',
      'Line 2: Python first works out the right-hand side (10 + 5 = 15) and stores 15 in `points`.',
      'Line 3: `bonus` = 15 × 2 = 30. The number 30 is stored, not the operation.',
      'Line 4: `points` becomes 3. `bonus` doesn\'t notice: it\'s still 30.',
      'Line 5: both values are shown separated by a space → `3 30`.',
    ],
  },

  // ------------------------------------------------------------------ 2
  'var-complete': {
    id: 'var-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Lucía\'s profile', difficulty: 1, xp: 15, concepts: ['asignacion', 'reasignacion', 'print'],
    statement: 'Replace each `___` so the program shows **exactly** this:',
    expected: 'Lucía is 19 years old\nNext year she will be 20',
    note: 'Something to think about: the second gap must work **even if you change the starting age**.',
    starter: `name = ___
age = 19
print(name, "is", age, "years old")
age = ___
print("Next year she will be", age)`,
    spec: {
      blanks: true,
      cases: [{ label: 'Expected output', out_lines: ['Lucía is 19 years old', 'Next year she will be 20'] }],
      variants: [{
        label: 'Starting age changed to 30', set: { age: 30 },
        out_lines: ['Lucía is 30 years old', 'Next year she will be 31'],
        msg: 'Your program shows the right thing, but only by chance: if the starting age were 30, it would still say she\'ll be 20 next year. The new age must be worked out from the previous value of age.',
      }],
      misconceptions: [
        { out_lines: ['Lucia is 19 years old', 'Next year she will be 20'], title: 'Almost', msg: 'Look at the expected output: «Lucía» has an accent. For Python, "Lucia" and "Lucía" are different texts.' },
        { out_contains: 'name is', title: 'Check what you\'re showing', msg: 'The word «name» is being shown instead of the variable\'s value.' },
      ],
      logic_msg: 'Compare your output with the expected one character by character.',
    },
    hints: [
      { level: 'Orientation', text: 'There are two gaps. The first is the **value** stored in `name`: look at the expected output to see what it is. The second is the **new value** of `age`.' },
      { level: 'Reasoning', text: 'First gap: is it a number or a text? How do you write a text in Python? Second gap: «next year» she\'ll be one year older than **now**. How would you say «whatever age is, plus one»?' },
      { level: 'Pseudocode', text: 'name ← the text Lucía\nage ← (current value of age) + 1', pre: true },
      { level: 'Technical help', text: 'Texts go in quotes: `"Hello"`. To change a variable based on its previous value you use the pattern `x = x + 1`: Python works out the right-hand side with the old value and stores the result.' },
    ],
    solution: {
      code: `name = "Lucía"
age = 19
print(name, "is", age, "years old")
age = age + 1
print("Next year she will be", age)`,
      explanation: '`"Lucía"` has quotes because it\'s text. In `age = age + 1`, Python first reads the right-hand side (19 + 1 = 20) and then stores 20 in `age`. That way the program still works if you change the starting age.',
    },
    reference: [
      `name = "Lucía"\nage = 19\nprint(name, "is", age, "years old")\nage = age + 1\nprint("Next year she will be", age)`,
      `name = 'Lucía'\nage = 19\nprint(name, "is", age, "years old")\nage += 1\nprint("Next year she will be", age)`,
    ],
    wrongs: [
      { code: `name = ___\nage = 19\nprint(name, "is", age, "years old")\nage = ___\nprint("Next year she will be", age)`, category: 'incompleto' },
      { code: `name = Lucía\nage = 19\nprint(name, "is", age, "years old")\nage = age + 1\nprint("Next year she will be", age)`, category: 'ejecucion' },
      { code: `name = "Lucía"\nage = 19\nprint(name, "is", age, "years old")\nage = 20\nprint("Next year she will be", age)`, category: 'logica' },
      { code: `name = "Lucia"\nage = 19\nprint(name, "is", age, "years old")\nage = age + 1\nprint("Next year she will be", age)`, category: 'comprension' },
    ],
  },

  // ------------------------------------------------------------------ 3
  'var-order': {
    id: 'var-order', type: 'order', kindLabel: 'Put the steps in order', topic: TOPIC,
    title: 'Plan the discount', difficulty: 2, xp: 15, concepts: ['descomponer', 'asignacion'],
    statement: 'A shop applies a percentage discount. We want a program that works out the **final price**. Before coding, put the solution in order.',
    stages: [
      {
        title: 'Step 1 · Order the plan in plain language',
        items: [
          { id: 'p1', text: 'Ask for the original price', after: [] },
          { id: 'p2', text: 'Ask for the discount percentage', after: [] },
          { id: 'p3', text: 'Work out the amount taken off (price × discount ÷ 100)', after: ['p1', 'p2'], why: 'To work out the amount taken off you need to know the price and the percentage **first**.' },
          { id: 'p4', text: 'Work out the final price (price − amount taken off)', after: ['p3'], why: 'The final price depends on the amount taken off: you have to work that out first.' },
          { id: 'p5', text: 'Show the final price', after: ['p4'], why: 'You can\'t show a result you haven\'t worked out yet.' },
        ],
        success: 'Notice: «ask for the price» and «ask for the percentage» could be swapped and the plan would still be right. What matters are the **dependencies**: each step needs the data from earlier steps.',
      },
      {
        title: 'Step 2 · Now order the code that matches that plan',
        code: true,
        expectEnd: 'Final price: 80.0',
        items: [
          { id: 'c1', text: 'price = float(input("Price: "))', after: [] },
          { id: 'c2', text: 'discount = float(input("Discount (%): "))', after: [] },
          { id: 'c3', text: 'amount = price * discount / 100', after: ['c1', 'c2'], why: 'This line uses `price` and `discount`: if they don\'t exist yet, Python will give a NameError.' },
          { id: 'c4', text: 'final = price - amount', after: ['c3', 'c1'], why: 'This line uses `amount`, which is created on another line: that one has to come first.' },
          { id: 'c5', text: 'print("Final price:", final)', after: ['c4'], why: '`print` needs `final` to have a value already.' },
        ],
        success: 'Each line of code matches a step of the plan. That\'s the key idea: **first you think, then you translate it into Python**.',
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  'var-fix': {
    id: 'var-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The broken greeting', difficulty: 2, xp: 20, concepts: ['tipos', 'errores'],
    statement: 'This program should show a greeting, but it fails. **Run it, read the error and fix it.** Careful: there may be more than one bug.',
    expected: 'Hello, Marco. You are 17 years old.',
    starter: `name = "Marco"
age = 17
message = "Hello, " + name + ". You are " + age + " years old."
print(Message)`,
    spec: {
      cases: [{ label: 'Expected output', out_lines: ['Hello, Marco. You are 17 years old.'] }],
      variants: [{
        label: 'Age changed to 30', set: { age: 30 }, out_lines: ['Hello, Marco. You are 30 years old.'],
        msg: 'You\'ve typed the age by hand inside the text. If the age changed, the message would be wrong. The program must use the age variable.',
      }],
      rules: [{ type: 'must_load', names: ['name', 'age'], title: 'The message must be built with the variables', msg: 'Use the name and age variables to build the message, instead of writing their values directly.' }],
      logic_msg: 'The program no longer gives an error, but the text doesn\'t match. Check spaces and punctuation: print adds a space between the items you separate with commas.',
    },
    hints: [
      { level: 'Orientation', text: 'Press **Run** and read the error: which line is it on? What type is it? There are **two** bugs; Python will show them one at a time, because it stops at the first.' },
      { level: 'Reasoning', text: 'The first error is on line 3: you\'re joining pieces of **different types** with `+`. What type is each piece? The second error has to do with **capital and lower-case letters**.' },
      { level: 'Pseudocode', text: 'Line 3: turn age into text before joining it with the rest\nLine 4: write the variable name exactly as it was created', pre: true },
      { level: 'Technical help', text: '`str(17)` turns the number 17 into the text `"17"`. Python is case-sensitive: `message` and `Message` are different names.' },
    ],
    solution: {
      code: `name = "Marco"
age = 17
message = "Hello, " + name + ". You are " + str(age) + " years old."
print(message)`,
      explanation: 'With `+` Python can stick texts together or add numbers, but not mix both: `str(age)` turns the number into text. Also, the variable is called `message` in lower case; `Message` would be another variable that doesn\'t exist (NameError).',
    },
    reference: [
      `name = "Marco"\nage = 17\nmessage = "Hello, " + name + ". You are " + str(age) + " years old."\nprint(message)`,
      `name = "Marco"\nage = 17\nmessage = f"Hello, {name}. You are {age} years old."\nprint(message)`,
      `name = "Marco"\nage = 17\nprint("Hello, " + name + ". You are", age, "years old.")`,
    ],
    wrongs: [
      { code: `name = "Marco"\nage = 17\nmessage = "Hello, " + name + ". You are " + age + " years old."\nprint(Message)`, category: 'ejecucion' },
      { code: `name = "Marco"\nage = 17\nmessage = "Hello, " + name + ". You are " + str(age) + " years old."\nprint(Message)`, category: 'ejecucion' },
      { code: `print("Hello, Marco. You are 17 years old.")`, category: 'logica' },
      { code: `name = "Marco"\nage = 17\nprint("Hello,", name, ". You are", age, "years old.")`, category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 5
  'var-build': {
    id: 'var-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch',
    title: 'Sale price calculator', difficulty: 3, xp: 30, concepts: ['input', 'tipos', 'asignacion', 'descomponer'],
    topic: TOPIC, unlock: { any: ['var-predict', 'var-complete', 'var-order', 'var-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'An online shop needs a program that **asks for** a product\'s price and the discount percentage, and **shows the final price**.\n\nExample: price `100` and discount `20` → `80.0`.\n\nYou can add text to the result (for example «Final price: 80.0»). Show the final price on the **last line** of your program.',
    plan: [
      {
        q: 'What data does the program have to ask the user for?', multi: true,
        options: [
          { text: 'The original price', correct: true },
          { text: 'The discount percentage', correct: true },
          { text: 'The final price', why: 'That\'s what has to be **worked out**: the result, not an input.' },
          { text: 'The name of the product', why: 'The task doesn\'t need it to work out the result. Spotting which data isn\'t needed is also part of understanding the problem.' },
        ],
      },
      {
        q: 'What result do you have to get?',
        options: [
          { text: 'The final price, after applying the discount', correct: true },
          { text: 'The amount taken off', why: 'It\'s a useful in-between step, but it\'s not what the task asks for.' },
          { text: 'The discount percentage', why: 'That\'s an input: the user types it.' },
        ],
      },
      {
        q: 'With a price of 100 € and a 20 % discount, how do you work out the amount taken off?',
        options: [
          { text: '100 × 20 ÷ 100 = 20 €', correct: true },
          { text: '100 − 20 = 80 €', why: 'That takes off 20 euros, not 20 %. It only matches by chance when the price is 100: try 50 € and 20 % (the discount would be 10 €, not 20 €).' },
          { text: '20 ÷ 100 = 0.2 €', why: 'That\'s the percentage as a decimal; you still need to multiply it by the price.' },
        ],
      },
      {
        q: 'If the user types 100, what does input() return?',
        options: [
          { text: 'The text "100": you have to convert it with float()', correct: true },
          { text: 'The number 100, ready for maths', why: '`input()` **always** returns text (str), even if the user types digits. Without converting it, you can\'t do calculations.' },
        ],
      },
    ],
    planScaffold: `# 1. Ask for the original price (and turn it into a number)

# 2. Ask for the discount percentage (and turn it into a number)

# 3. Work out the amount taken off

# 4. Work out the final price

# 5. Show the final price
`,
    starter: '',
    spec: {
      cases: [
        { label: '100 € with 20 %', stdin: ['100', '20'], args: { p: 100, d: 20 } },
        { label: 'Price with decimals: 59.99 € with 15 %', stdin: ['59.99', '15'], args: { p: 59.99, d: 15 } },
        { label: 'Edge case: no discount', stdin: ['40', '0'], args: { p: 40, d: 0 } },
        { label: 'Edge case: 100 % discount', stdin: ['250', '100'], args: { p: 250, d: 100 } },
      ],
      expect_last_number: 'p - p * d / 100',
      hidden: { count: 2, args: { p: [1, 500, 2], d: [0, 90, 0] }, stdin: ['p', 'd'] }, // random hidden cases
      tolerance: 0.01,
      misconceptions: [
        { expr: 'p * d / 100', title: 'Check what the task asks for', msg: 'You\'ve shown the amount taken off, not the final price. It\'s a correct in-between step, but you still need to subtract it from the original price.' },
        { expr: 'p - d', title: 'Percentage ≠ euros', msg: 'You subtracted the percentage as if it were euros. 15 % of 59.99 € isn\'t 15 €: the amount taken off is price × discount ÷ 100.' },
        { expr: 'p - p * d', title: 'A step is missing', msg: 'It looks like you forgot to divide by 100: a percentage is «so many out of every hundred».' },
        { expr: 'p - d / 100', title: 'A step is missing', msg: 'You subtracted the percentage as a decimal, but you still need to multiply it by the price.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the data', msg: 'The task asks the program to ask the user for the price and the discount. Use input() to read them.' }],
    },
    hints: [
      { level: 'Orientation', text: 'Read the task again: the program **receives two pieces of data** and **produces one result**. Which are they? If you did the planning, you\'ve already identified them.' },
      { level: 'Reasoning', text: 'Split the problem into small pieces: first get the data, then work out the amount taken off, then subtract it from the price and, finally, show it. Write one piece, **run** it and check before carrying on.' },
      { level: 'Pseudocode', text: 'price ← ask the user for a number\ndiscount ← ask the user for a number\namount ← price × discount ÷ 100\nfinal ← price − amount\nshow final', pre: true },
      { level: 'Technical help', text: 'To read a decimal number: `price = float(input("Price: "))`. The operators are `*` (multiply), `/` (divide) and `-` (subtract). Use `float` and not `int`: prices can have decimals.' },
    ],
    solution: {
      code: `price = float(input("Price: "))
discount = float(input("Discount (%): "))
amount = price * discount / 100
final = price - amount
print("Final price:", final)`,
      explanation: 'Each line is a step of the plan. `float(input(...))` reads the text the user types and turns it into a decimal number. Working out the `amount` in its own variable makes the program easier to read and to check.',
    },
    reference: [
      `price = float(input("Price: "))\ndiscount = float(input("Discount (%): "))\namount = price * discount / 100\nfinal = price - amount\nprint("Final price:", final)`,
      `price = float(input())\ndiscount = float(input())\nprint(round(price * (1 - discount / 100), 2))`,
    ],
    wrongs: [
      { code: `print(80.0)`, category: 'logica' },
      { code: `price = float(input())\ndiscount = float(input())\nprint(price * discount / 100)`, category: 'comprension' },
      { code: `price = input()\ndiscount = input()\nprint(price - price * discount / 100)`, category: 'ejecucion' },
      { code: `price = int(input())\ndiscount = int(input())\nprint(price - price * discount / 100)`, category: 'ejecucion' },
      { code: `price = float(input()\nprint(price)`, category: 'sintaxis' },
    ],
  },

  // ------------------------------------------------------------------ extra challenges
  'ch-swap': {
    id: 'ch-swap', type: 'code', variant: 'build', kindLabel: 'Reasoning challenge',
    title: 'Swap the glasses', difficulty: 2, xp: 20, concepts: ['reasignacion'],
    topic: TOPIC, unlock: { activity: 'var-complete', text: 'Complete «Lucía\'s profile»' },
    statement: 'You have two glasses: `glass_a` contains `"coffee"` and `glass_b` contains `"tea"`. Write the code that **swaps** their contents: at the end, `glass_a` must be `"tea"` and `glass_b` `"coffee"`.\n\nDon\'t write the texts again: your solution must work with any contents.',
    plan: [
      {
        q: 'If you write glass_a = glass_b, what happens to the coffee?',
        options: [
          { text: 'It\'s lost: glass_a now points to the tea and nothing points to the coffee any more', correct: true },
          { text: 'It automatically moves to glass_b', why: 'An assignment only changes the variable on the left. glass_b doesn\'t notice anything.' },
          { text: 'It gives an error', why: 'It\'s a valid assignment: the problem isn\'t an error, it\'s that a piece of data gets lost.' },
        ],
      },
      {
        q: 'What do you need to do BEFORE overwriting glass_a?',
        options: [
          { text: 'Save its contents in another variable', correct: true },
          { text: 'Write "coffee" into glass_b', why: 'That would only work with coffee. The program must work with any contents.' },
        ],
      },
    ],
    starter: `glass_a = "coffee"
glass_b = "tea"

# Write the swap here
`,
    spec: {
      cases: [{ label: 'coffee ↔ tea', vars: { glass_a: 'tea', glass_b: 'coffee' } }],
      variants: [{
        label: 'With other contents (juice ↔ tea)', set: { glass_a: 'juice' }, vars: { glass_a: 'tea', glass_b: 'juice' },
        msg: 'You\'ve typed the contents by hand. If glass A had juice, your program wouldn\'t swap it. Move the values using the variables.',
      }],
      logic_msg: 'If you do glass_a = glass_b, the coffee is lost forever (the glass_a label now points to the tea). In real life, what would you do to swap the contents of two glasses?',
      allow_short_names: [],
    },
    hints: [
      { level: 'Orientation', text: 'At the end, each variable must have the value the other one had at the start.' },
      { level: 'Reasoning', text: 'Try `glass_a = glass_b` in the step-by-step visualiser: what happens to the coffee? You need to «put aside» a value before overwriting it. With real glasses you\'d use a **third glass**.' },
      { level: 'Pseudocode', text: 'temp ← glass_a\nglass_a ← glass_b\nglass_b ← temp', pre: true },
      { level: 'Technical help', text: 'A helper variable is just a normal variable: `temp = glass_a`. Python also allows the shortcut `a, b = b, a`, but try to understand the helper-variable version first.' },
    ],
    solution: {
      code: `glass_a = "coffee"
glass_b = "tea"

temp = glass_a
glass_a = glass_b
glass_b = temp`,
      explanation: 'Before overwriting `glass_a`, we save its value in `temp`. That way, when `glass_a` becomes "tea", the coffee is still safe in `temp` and we can give it to `glass_b`.',
    },
    reference: [
      `glass_a = "coffee"\nglass_b = "tea"\ntemp = glass_a\nglass_a = glass_b\nglass_b = temp`,
      `glass_a = "coffee"\nglass_b = "tea"\nglass_a, glass_b = glass_b, glass_a`,
    ],
    wrongs: [
      { code: `glass_a = "coffee"\nglass_b = "tea"\nglass_a = glass_b\nglass_b = glass_a`, category: 'logica' },
      { code: `glass_a = "coffee"\nglass_b = "tea"\nglass_a = "tea"\nglass_b = "coffee"`, category: 'logica' },
    ],
  },

  'ch-explain': {
    id: 'ch-explain', type: 'predict', kindLabel: 'Explain the code',
    title: 'What does this program do?', difficulty: 1, xp: 10, concepts: ['reasignacion'],
    topic: TOPIC, unlock: { lesson: 'variables', step: 4, text: 'Reach «Changing a variable» in the lesson' },
    prompt: 'Choose the explanation that **best** describes what this program does.',
    code: `total = 0
total = total + 12.5
total = total + 7.5
print("Total:", total)`,
    expectedOutput: 'Total: 20.0',
    options: [
      { text: 'It adds up two amounts in total and shows «Total: 20.0»', correct: true },
      { text: 'It shows «Total: 7.5», because each assignment wipes out the previous one', concept: 'reasignacion', why: 'Each assignment does replace the value, but the new value is worked out **from the previous one** (total + 7.5). That\'s why it adds up.' },
      { text: 'It gives an error, because total appears on both sides of the =', concept: 'reasignacion', why: 'It\'s perfectly valid: Python first works out the right-hand side with the current value and then stores it. It\'s the «accumulator» pattern, which you\'ll use a lot with loops.' },
    ],
    explain: ['`total` starts at 0.', '12.5 is added → 12.5.', '7.5 is added → 20.0 (it\'s a float because decimals are involved).', 'This pattern is called an **accumulator**.'],
  },

  'ch-iva': {
    id: 'ch-iva', type: 'code', variant: 'build', kindLabel: 'Real-life challenge',
    title: 'Receipt with VAT', difficulty: 3, xp: 30, concepts: ['input', 'tipos'],
    topic: TOPIC, unlock: { activity: 'var-build', text: 'Solve «Sale price calculator»' },
    plan: [
      {
        q: 'What data does the program have to ask for?', multi: true,
        options: [
          { text: 'The price before VAT', correct: true },
          { text: 'The VAT percentage', why: 'It\'s fixed (21 %): there\'s no need to ask for it, you can write it in the program.' },
          { text: 'The price with VAT', why: 'That\'s the result you have to work out, not an input.' },
        ],
      },
      {
        q: 'With a price of 100 € before VAT, how do you get the price with VAT?',
        options: [
          { text: '100 + 100 × 21 ÷ 100 = 121 €', correct: true },
          { text: '100 × 21 ÷ 100 = 21 €', why: 'That\'s just the tax. You still need to add it to the original price.' },
          { text: '100 + 21 = 121 €', why: 'It only matches with 100 €: with 50 € the VAT is 10.50 €, not 21 €.' },
        ],
      },
      {
        q: 'If the user types 19.99, what do you have to do before calculating?',
        options: [
          { text: 'Convert it with float(), because input() returns text', correct: true },
          { text: 'Convert it with int()', why: 'int() doesn\'t accept decimals: int("19.99") gives an error. For prices, use float().' },
          { text: 'Nothing, it\'s already a number', why: 'input() always returns text (str).' },
        ],
      },
    ],
    planScaffold: `# 1. Ask for the price before VAT (and turn it into a number)

# 2. Work out the amount of VAT (21 %)

# 3. Work out the price with VAT

# 4. Show the price with VAT
`,
    statement: 'A small shop enters its prices **before VAT**. Write a program that asks for the price before VAT and shows the **price with VAT** (21 %).\n\nShow the price with VAT on the **last line** of your program. You can round it to two decimal places with `round(value, 2)`.',
    starter: '',
    spec: {
      cases: [
        { label: '100 €', stdin: ['100'], args: { p: 100 } },
        { label: '19.99 €', stdin: ['19.99'], args: { p: 19.99 } },
        { label: 'Edge case: 0 €', stdin: ['0'], args: { p: 0 } },
      ],
      expect_last_number: 'p * 1.21',
      hidden: { count: 2, args: { p: [1, 1000, 2] }, stdin: ['p'] }, // random hidden cases
      tolerance: 0.01,
      misconceptions: [
        { expr: 'p * 0.21', title: 'You\'ve only worked out the tax', msg: 'You\'ve shown how much VAT has to be paid, but the task asks for the total price with VAT included.' },
        { expr: 'p + 21', title: 'Percentage ≠ euros', msg: 'You added 21 euros, not 21 %.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'The program must ask for the price', msg: 'Use input() to ask for the price before VAT.' }],
    },
    hints: [
      { level: 'Orientation', text: 'One input (price before VAT) and one result (price with VAT).' },
      { level: 'Reasoning', text: 'The price with VAT is the original price **plus** 21 % of the original price. Work out those two pieces separately if it helps.' },
      { level: 'Pseudocode', text: 'price ← ask for a number\nvat ← price × 21 ÷ 100\ntotal ← price + vat\nshow total', pre: true },
      { level: 'Technical help', text: 'Maths shortcut: adding 21 % is the same as multiplying by 1.21. `round(24.1879, 2)` returns `24.19`.' },
    ],
    solution: {
      code: `price = float(input("Price before VAT: "))
vat = price * 21 / 100
total = price + vat
print("Price with VAT:", round(total, 2))`,
      explanation: 'The amount of VAT is worked out and added to the original price. `round(total, 2)` leaves two decimal places, like on a real receipt.',
    },
    reference: [`price = float(input())\nprint(round(price * 1.21, 2))`],
    wrongs: [{ code: `price = float(input())\nprint(price * 0.21)`, category: 'comprension' }],
  },
};
