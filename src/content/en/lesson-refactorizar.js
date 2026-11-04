// Lesson 4.3 · Refactoring (English translation of src/content/lesson-refactorizar.js).

const TOPIC = 'Function design';

export const LESSON_REFACTORIZAR = {
  id: 'refactorizar',
  moduleId: 'm4',
  code: '4.3',
  title: 'Refactoring',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Explain what refactoring is and when it\'s worth doing',
    'Remove duplicated code by extracting a function',
    'Improve names and replace magic numbers with constants',
    'Follow an incremental development plan',
    'Check that a refactoring doesn\'t change the result',
  ],
  prerequisites: ['Lesson 4.2 «Interface design»'],
  teaser: 'A program that works isn\'t always well written. Today you learn to improve it without breaking it.',
  celebration: 'You\'ve completed Module 4: you no longer just write programs that work, but programs that are clear, reusable and easy to change.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'que-es', title: 'What is refactoring?', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: '**Refactoring** is changing how a program is written **without changing what it does**. The aim is for it to be easier to read, reuse and change.' },
        {
          type: 'five', items: {
            'Repeated code': 'The same lines in several places: extract a function.',
            'Names that say nothing': '`x`, `f2`, `data`: change them for names that explain.',
            'Magic numbers': 'A stray `0.21`: what is it? Give it a name with a constant.',
            'Functions that do too much': 'If it\'s hard to name, split it into smaller functions.',
          },
        },
        {
          type: 'check', id: 'm4r-definicion', concept: 'diseno', mode: 'choice',
          question: 'After refactoring a program, its output…',
          options: [
            { text: 'Must be exactly the same', correct: true },
            { text: 'Must be better', why: 'Refactoring improves the **code**, not the result. If what it does changes, it\'s not refactoring any more: it\'s adding a new feature (or introducing a bug).' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'extraer', title: 'Extracting a function', concepts: ['diseno', 'funciones'],
      blocks: [
        { type: 'p', text: 'Look at this program: the same three lines are repeated with different data.' },
        { type: 'code', run: true, title: 'Before', code: 'print("Product:", "Pencil")\nprint("Total:", 4 * 1.5)\nprint("-" * 15)\nprint("Product:", "Rubber")\nprint("Total:", 2 * 0.75)\nprint("-" * 15)' },
        { type: 'p', text: 'What changes between repetitions becomes **parameters**; what\'s repeated becomes the **body** of the function:' },
        { type: 'code', run: true, title: 'After', code: 'def show_line(product, units, price):\n    print("Product:", product)\n    print("Total:", units * price)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line("Rubber", 2, 0.75)', caption: 'The output is identical. But now, to change the separator, you touch a single line.' },
        {
          type: 'check', id: 'm4r-parametros', concept: 'diseno', mode: 'choice',
          question: 'When extracting a function from repeated code, what becomes parameters?',
          options: [
            { text: 'The data that changes from one repetition to another', correct: true },
            { text: 'Everything that appears in the repeated lines', why: 'What\'s the same in every repetition (like `"-" * 15`) stays inside the function.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'nombres', title: 'Clear names and constants', concepts: ['diseno'],
      blocks: [
        { type: 'p', text: 'Compare these two versions. They do exactly the same thing:' },
        { type: 'code', title: 'Before', code: 'def f(x):\n    return x + x * 0.21' },
        { type: 'code', run: true, title: 'After', code: 'VAT = 0.21\n\ndef price_with_vat(price):\n    return price + price * VAT\n\nprint(price_with_vat(100))' },
        { type: 'callout', tone: 'info', title: 'Constants in CAPITALS', text: 'By convention, a value that shouldn\'t change during the program is written in capitals at the start: `VAT = 0.21`. If VAT changes, you change it in one place.' },
        {
          type: 'check', id: 'm4r-magico', concept: 'diseno', mode: 'choice',
          question: 'What improves this code most? `total = hours * 12.5`',
          options: [
            { text: 'HOURLY_RATE = 12.5 and total = hours * HOURLY_RATE', correct: true },
            { text: 'Writing 12.50 instead of 12.5', why: 'It\'s still a magic number: it doesn\'t explain what it represents.' },
            { text: 'Changing total to t', why: 'A shorter name explains even less.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'An incremental development plan', concepts: ['diseno', 'descomponer'],
      blocks: [
        { type: 'p', text: 'Experienced programmers don\'t write a hundred lines and then run them. They move forward in **small steps**, checking each one:' },
        {
          type: 'five', items: {
            '1 · Start small': 'Write a few lines that solve one part, without functions if you like.',
            '2 · Run and check': 'With data whose result you know. If it fails, the error is in the last thing you added.',
            '3 · Encapsulate and generalise': 'When it works, turn it into a function with parameters.',
            '4 · Repeat and refactor': 'Add the next part and, now and then, improve what already works.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Temporary prints', text: 'While you\'re developing, a `print` that shows an in-between value tells you if you\'re on track. When the function works, remove it: it\'s scaffolding, not part of the building.' },
        {
          type: 'check', id: 'm4r-plan', concept: 'descomponer', mode: 'choice',
          question: 'You\'ve added three new functions and the program gives an error you don\'t understand. What would have helped most?',
          options: [
            { text: 'Running it after adding each function', correct: true },
            { text: 'Writing the three functions faster', why: 'Speed doesn\'t help: if you run at each step, you know the error is in the last thing you added.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'comprobar', title: 'Refactoring without breaking anything', concepts: ['diseno', 'errores'],
      blocks: [
        { type: 'p', text: 'The risk of refactoring is changing the behaviour by accident. The most typical mistake when extracting a function: still using a variable **from outside** instead of the parameter.' },
        { type: 'code', run: true, code: 'price = 80\n\ndef with_discount(base_price, percentage):\n    return price - price * percentage / 100   # uses price, not base_price\n\nprint(with_discount(80, 25))   # 60.0: it seems to work\nprint(with_discount(40, 50))   # 40.0: it should be 20.0!', caption: 'With the first example it matches by chance. That\'s why you have to check with several pieces of data.' },
        {
          type: 'check', id: 'm4r-global', concept: 'parametros', mode: 'text',
          question: 'Predict:', code: 'n = 5\n\ndef double(x):\n    return n * 2\n\nprint(double(10))', answer: '10',
          explain: 'The function ignores its parameter x and uses the n from outside (5): 5 × 2 = 10, not 20.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'ref-predict' },
    { id: 'a2', activity: 'ref-complete' },
    { id: 'a3', activity: 'ref-fix' },
    { id: 'a4', activity: 'ref-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '**Refactoring** is improving how a program is written without changing what it does.',
    'Repeated code → extract a function: what changes are the parameters; what\'s repeated, the body.',
    'Names that explain and constants in CAPITALS instead of magic numbers.',
    'Incremental development: small steps, running and checking each one.',
    'After refactoring, check with several pieces of data that the output is the same.',
  ],
};

export const ACTIVITIES_REFACTORIZAR = {
  'ref-predict': {
    id: 'ref-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The VAT constant', difficulty: 1, xp: 10, concepts: ['diseno', 'parametros'],
    prompt: 'An already refactored program, with a constant and a function. **What will it show?**',
    code: 'VAT = 0.21\n\ndef with_vat(price):\n    return price * (1 + VAT)\n\nprint(with_vat(100), with_vat(50))',
    expectedOutput: '121.0 60.5',
    options: [
      { text: '121.0 60.5', correct: true },
      { text: '100.21 50.21', concept: 'expresiones', why: 'The brackets are worked out first: 1 + 0.21 = 1.21, and then the price is multiplied by 1.21.' },
      { text: '121.0 121.0', concept: 'parametros', why: 'Each call uses its own argument: the second one calculates with 50.' },
      { text: 'An error: VAT isn\'t inside the function', concept: 'parametros', why: 'A function can **read** a constant defined outside. What isn\'t a good idea is depending on outside variables that change.' },
    ],
    explain: ['`VAT` is 0.21 throughout the program.', '`with_vat(100)` → 100 × 1.21 = 121.0.', '`with_vat(50)` → 50 × 1.21 = 60.5.'],
  },
  'ref-complete': {
    id: 'ref-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Extract the function', difficulty: 2, xp: 15, concepts: ['diseno', 'funciones'],
    statement: 'This program used to repeat three lines for each product. The function has already been extracted: fill in the gaps so it shows **exactly the same** as before.',
    expected: 'Product: Pencil\nTotal: 6.0\n---------------\nProduct: Rubber\nTotal: 1.5\n---------------',
    starter: 'def show_line(product, units, price):\n    print("Product:", ___)\n    print("Total:", ___ * ___)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line(___)',
    spec: {
      blanks: true,
      functions: [{ name: 'show_line', params: 3 }],
      cases: [
        { label: 'Whole program', out_lines: ['Product: Pencil', 'Total: 6.0', '---------------', 'Product: Rubber', 'Total: 1.5', '---------------'] },
        { label: 'show_line("Ruler", 3, 2.0)', call: 'show_line("Ruler", 3, 2.0)', out_lines: ['Product: Ruler', 'Total: 6.0', '---------------'] },
      ],
      logic_msg: 'The output doesn\'t match the original program\'s. Are you using the parameters inside the function? Are you passing "Rubber", 2 and 0.75 to the second call?',
    },
    hints: [
      { level: 'Orientation', text: 'The gaps in the body are parameters of the function. The last gap is the arguments of the second call.' },
      { level: 'Reasoning', text: 'Inside the function you don\'t write «Pencil» or 4: you use the parameter names. In the second call, think about the rubber: 2 units at 0.75 €.' },
      { level: 'Pseudocode', text: 'show "Product:", product\nshow "Total:", units × price\ncall show_line with "Rubber", 2 and 0.75', pre: true },
      { level: 'Technical help', text: '`print("Product:", product)`, `print("Total:", units * price)` and `show_line("Rubber", 2, 0.75)`.' },
    ],
    solution: {
      code: 'def show_line(product, units, price):\n    print("Product:", product)\n    print("Total:", units * price)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line("Rubber", 2, 0.75)',
      explanation: 'What changed between repetitions (product, units and price) became parameters. The output is identical to the original program\'s.',
    },
    reference: ['def show_line(product, units, price):\n    print("Product:", product)\n    print("Total:", units * price)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line("Rubber", 2, 0.75)'],
    wrongs: [
      { code: 'def show_line(product, units, price):\n    print("Product:", ___)\n    print("Total:", ___ * ___)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line(___)', category: 'incompleto' },
      { code: 'def show_line(product, units, price):\n    print("Product:", "Pencil")\n    print("Total:", 4 * 1.5)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line("Rubber", 2, 0.75)', category: 'logica' },
      { code: 'def show_line(product, units, price):\n    print("Product:", product)\n    print("Total:", units * price)\n    print("-" * 15)\n\nshow_line("Pencil", 4, 1.5)\nshow_line("Rubber")', category: 'ejecucion' },
    ],
  },
  'ref-fix': {
    id: 'ref-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The refactoring that broke something', difficulty: 2, xp: 20, concepts: ['diseno', 'parametros'],
    statement: 'Someone extracted this function and tested it only with the first example, which comes out right. But the second should give **20.0** and gives something else. Find the bug and fix it **in the function**.',
    expected: '60.0\n20.0',
    starter: 'original_price = 80\n\ndef final_price(price, percentage):\n    return original_price - original_price * percentage / 100\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))',
    spec: {
      functions: [{ name: 'final_price', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['60.0', '20.0'] },
        { label: 'print(final_price(200, 10))', call: 'print(final_price(200, 10))', out_lines: ['180.0'] },
      ],
      misconceptions: [
        { out_lines: ['60.0', '40.0'], title: 'It still uses the outside variable', msg: 'The function calculates with `original_price` (which is always 80) instead of its parameter `price`.' },
      ],
      logic_msg: 'The output doesn\'t match. Work it out by hand: 40 € with a 50 % discount is 20 €.',
    },
    hints: [
      { level: 'Orientation', text: 'The first example comes out right by chance: the price passed in (80) matches `original_price`. Try changing the first argument.' },
      { level: 'Reasoning', text: 'A function should work with its parameters. Which parameter receives the price? Does the body use it?' },
      { level: 'Pseudocode', text: 'return price − price × percentage ÷ 100', pre: true },
      { level: 'Technical help', text: 'Replace `original_price` with `price` inside the function. The outside variable isn\'t needed any more.' },
    ],
    solution: {
      code: 'def final_price(price, percentage):\n    return price - price * percentage / 100\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))',
      explanation: 'The body used an outside variable instead of the parameter, so the function always calculated with 80. With `price`, it works with any data. That\'s why you have to test with several examples.',
    },
    reference: [
      'def final_price(price, percentage):\n    return price - price * percentage / 100\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))',
      'original_price = 80\n\ndef final_price(price, percentage):\n    return price * (1 - percentage / 100)\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))',
    ],
    wrongs: [
      { code: 'original_price = 80\n\ndef final_price(price, percentage):\n    return original_price - original_price * percentage / 100\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))', category: 'comprension' },
      { code: 'def final_price(price, percentage):\n    return price - percentage\n\nprint(final_price(80, 25))\nprint(final_price(40, 50))', category: 'logica' },
    ],
  },
  'ref-build': {
    id: 'ref-build', type: 'code', variant: 'build', kindLabel: 'Refactor', topic: TOPIC,
    title: 'Receipts without repetition', difficulty: 3, xp: 30, concepts: ['diseno', 'funciones', 'print'],
    unlock: { any: ['ref-predict', 'ref-complete', 'ref-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'The starting code works, but it repeats the same thing three times. **Refactor it**: define a function `receipt(customer, amount)` that shows the two lines of a receipt (with the amount to 2 decimal places) and use it for the three customers. The output must be **the same** as the original program\'s.',
    expected: 'Customer: Ana\nAmount: 25.00 €\nCustomer: Luis\nAmount: 7.50 €\nCustomer: Marta\nAmount: 12.30 €',
    starter: 'print("Customer: Ana")\nprint(f"Amount: {25:.2f} €")\nprint("Customer: Luis")\nprint(f"Amount: {7.5:.2f} €")\nprint("Customer: Marta")\nprint(f"Amount: {12.3:.2f} €")',
    plan: [
      {
        q: 'What changes from one receipt to another?',
        multi: true,
        options: [
          { text: 'The customer\'s name', correct: true },
          { text: 'The amount', correct: true },
          { text: 'The format of the lines', why: 'The format is the same in all three receipts: it stays inside the function.' },
        ],
      },
      {
        q: 'How do you check that the refactoring hasn\'t changed anything?',
        options: [
          { text: 'By comparing the new output with the original program\'s', correct: true },
          { text: 'If there\'s no error, it\'s fine', why: 'A program can run without errors and show something different. Compare the output line by line.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'receipt', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['Customer: Ana', 'Amount: 25.00 €', 'Customer: Luis', 'Amount: 7.50 €', 'Customer: Marta', 'Amount: 12.30 €'] },
        { label: 'receipt("Eva", 3)', call: 'receipt("Eva", 3)', out_lines: ['Customer: Eva', 'Amount: 3.00 €'] },
      ],
      misconceptions: [
        { out_lines: ['Customer: Ana', 'Amount: 25 €', 'Customer: Luis', 'Amount: 7.5 €', 'Customer: Marta', 'Amount: 12.3 €'], title: 'Decimals are missing', msg: 'The original output shows the amount with 2 decimal places: use `{amount:.2f}`.' },
      ],
      rules: [{ type: 'must_call', name: 'receipt', title: 'Use the function', msg: 'The program must show the three receipts by calling receipt().' }],
      logic_msg: 'The output must be identical to the original program\'s. Compare it line by line.',
    },
    hints: [
      { level: 'Orientation', text: 'First run the starting code and look at its output: your version must produce exactly the same.' },
      { level: 'Reasoning', text: 'What changes between receipts (customer and amount) will be the parameters. The two print lines, the body.' },
      { level: 'Pseudocode', text: 'define receipt(customer, amount):\n    show "Customer: " + customer\n    show the amount with 2 decimal places\nreceipt("Ana", 25)\nreceipt("Luis", 7.5)\nreceipt("Marta", 12.3)', pre: true },
      { level: 'Technical help', text: '`print(f"Customer: {customer}")` and `print(f"Amount: {amount:.2f} €")` inside the function.' },
    ],
    solution: {
      code: 'def receipt(customer, amount):\n    """Show a customer\'s receipt with the amount to 2 decimal places."""\n    print(f"Customer: {customer}")\n    print(f"Amount: {amount:.2f} €")\n\nreceipt("Ana", 25)\nreceipt("Luis", 7.5)\nreceipt("Marta", 12.3)',
      explanation: 'Six repeated lines become a two-line function and three calls. If tomorrow the receipt needs one more line, it\'s added in a single place.',
    },
    reference: ['def receipt(customer, amount):\n    print(f"Customer: {customer}")\n    print(f"Amount: {amount:.2f} €")\n\nreceipt("Ana", 25)\nreceipt("Luis", 7.5)\nreceipt("Marta", 12.3)'],
    wrongs: [
      { code: 'print("Customer: Ana")\nprint(f"Amount: {25:.2f} €")\nprint("Customer: Luis")\nprint(f"Amount: {7.5:.2f} €")\nprint("Customer: Marta")\nprint(f"Amount: {12.3:.2f} €")', category: 'comprension' },
      { code: 'def receipt(customer, amount):\n    print(f"Customer: {customer}")\n    print(f"Amount: {amount} €")\n\nreceipt("Ana", 25)\nreceipt("Luis", 7.5)\nreceipt("Marta", 12.3)', category: 'comprension' },
      { code: 'def receipt(customer, amount):\n    print(f"Customer: {customer}")\n    print(f"Amount: {amount:.2f} €")\n\nreceipt("Ana", 25)\nreceipt("Luis", 7.5)', category: 'logica' },
    ],
  },
};
