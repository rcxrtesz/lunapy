// Lesson 13.2 · Style and good practice (English translation of src/content/lesson-estilo.js).

const TOPIC = 'Debugging';

export const LESSON_ESTILO = {
  id: 'estilo',
  moduleId: 'm13',
  code: '13.2',
  title: 'Style and good practice',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Follow the PEP 8 naming conventions',
    'Write readable code: spaces, short lines and useful comments',
    'Avoid changing global variables from functions',
    'Organise a program with a main() function',
    'Refactor a messy script into clear functions',
  ],
  prerequisites: ['Lesson 13.1 «Debugging strategies»'],
  teaser: 'Code is read many more times than it\'s written. Today you learn the habits that make your code understandable, even a year from now.',
  celebration: 'Your code doesn\'t just work any more: it reads well, it\'s tidy and it\'s easy to change.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'nombres', title: 'Python-style names', concepts: ['estilo'],
      blocks: [
        { type: 'p', text: '**PEP 8** is Python\'s official style guide. Its naming conventions are the ones you\'ve seen throughout the course:' },
        {
          type: 'five', items: {
            'variables and functions': 'lower_case_with_underscores: `final_price`, `work_out_average`.',
            'Classes': 'CapitalisedWords: `SavingsAccount`, `Rectangle`.',
            'CONSTANTS': 'CAPITALS_WITH_UNDERSCORES: `VAT`, `MAX_ATTEMPTS`.',
            'Names that explain': '`passed_marks` is better than `l2`. Functions, with verbs: `save`, `is_valid`.',
          },
        },
        {
          type: 'classify', id: 'm13e-nombres', concept: 'estilo',
          question: 'Does it follow the PEP 8 conventions?',
          items: [
            { text: 'def work_out_total(prices):', valid: true, why: 'A function in lower case with underscores and a verb that explains what it does.' },
            { text: 'class bank_account:', valid: false, why: 'Classes go in CapitalisedWords: BankAccount.' },
            { text: 'MAX_ATTEMPTS = 3', valid: true, why: 'A constant, in capitals.' },
            { text: 'def WorkOutTotal(p):', valid: false, why: 'Functions go in lower case (work_out_total), and p doesn\'t explain what it is.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'legible', title: 'Code that reads well', concepts: ['estilo'],
      blocks: [
        { type: 'p', text: 'Python does the same with both versions, but a person doesn\'t read them the same way:' },
        { type: 'code', title: 'Cramped', code: 'def f(a,b):\n    x=a*b/100\n    return a-x' },
        { type: 'code', run: true, title: 'Readable', code: 'def discounted_price(price, percentage):\n    """Return the price after applying the given discount."""\n    discount = price * percentage / 100\n    return price - discount\n\nprint(discounted_price(80, 25))' },
        {
          type: 'five', items: {
            'Spaces': 'Around `=` and the operators, and after commas.',
            'Short lines': 'Under about 80 characters; if a line is long, split it into named steps.',
            'Comments': 'They explain the **why**, they don\'t repeat the code.',
            'Short functions': 'One task each, with a name that describes it.',
          },
        },
        {
          type: 'check', id: 'm13e-comentario', concept: 'estilo', mode: 'choice',
          question: 'Which comment adds most to `price = price * 1.21`?',
          options: [
            { text: '# Add 21 % VAT because the price in the database is before tax', correct: true },
            { text: '# Multiply price by 1.21', why: 'It repeats what the code already says. Better to explain why it\'s done.' },
            { text: '# Price', why: 'It adds nothing.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'globales', title: 'Don\'t change global variables', concepts: ['estilo', 'parametros'],
      blocks: [
        { type: 'p', text: 'A function that changes variables outside it is hard to understand and to test: its result depends on something you can\'t see in its header. What\'s more, Python doesn\'t let you do it directly:' },
        { type: 'code', run: true, code: 'total = 0\n\ndef add(amount):\n    total += amount     # UnboundLocalError\n\nadd(10)' },
        { type: 'p', text: 'The clean solution is the usual rule: **data comes in through parameters and goes out with return**.' },
        { type: 'code', run: true, code: 'def add(total, amount):\n    return total + amount\n\ntotal = 0\ntotal = add(total, 10)\ntotal = add(total, 5)\nprint(total)' },
        {
          type: 'more', summary: 'What about the word global?',
          items: ['There\'s `global total`, which lets you change the outside variable. It works, but it makes functions depend on each other in invisible ways. In real programs it\'s almost always avoided.'],
        },
        {
          type: 'check', id: 'm13e-global', concept: 'estilo', mode: 'choice',
          question: 'What happens?', code: 'counter = 0\n\ndef add_one():\n    counter += 1\n\nadd_one()', expectError: 'UnboundLocalError',
          options: [
            { text: 'UnboundLocalError: counter is used before it\'s given a value inside the function', correct: true },
            { text: 'counter becomes 1', why: 'When you assign to counter inside the function, Python treats it as local, and it doesn\'t have a value yet.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'main', title: 'Organising the program with main()', concepts: ['estilo', 'funciones'],
      blocks: [
        { type: 'p', text: 'A clear structure for any program: imports and constants at the top, then the functions, and the main program inside a `main()` function that\'s called at the end:' },
        { type: 'code', run: true, code: 'VAT = 0.21\n\ndef with_vat(price):\n    return round(price * (1 + VAT), 2)\n\ndef main():\n    for price in [10, 25.5]:\n        print(price, "→", with_vat(price))\n\nif __name__ == "__main__":\n    main()' },
        { type: 'callout', tone: 'info', title: 'if __name__ == "__main__"', text: 'This line makes main() run when you launch the file, but not if another program **imports** it to reuse its functions. It\'s a very widespread habit in Python.' },
        {
          type: 'check', id: 'm13e-main', concept: 'estilo', mode: 'choice',
          question: 'What\'s the advantage of putting the main program in main()?',
          options: [
            { text: 'It\'s clear where the program starts and its variables aren\'t global', correct: true },
            { text: 'The program runs faster', why: 'The advantage is about organisation, not speed.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'est-predict' },
    { id: 'a2', activity: 'est-complete' },
    { id: 'a3', activity: 'est-fix' },
    { id: 'a4', activity: 'est-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'PEP 8: `variables_and_functions`, `Classes`, `CONSTANTS`, and names that explain.',
    'Spaces around operators, short lines, small functions and comments that explain the why.',
    'Don\'t change global variables from functions: parameters to come in, return to go out.',
    'Structure: constants, functions and a `main()` called with `if __name__ == "__main__":`.',
  ],
};

export const ACTIVITIES_ESTILO = {
  'est-predict': {
    id: 'est-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The program with main', difficulty: 2, xp: 10, concepts: ['estilo', 'funciones'],
    prompt: 'A program organised with main(). **What will it show?**',
    code: 'def greet(name):\n    return f"Hello, {name}"\n\ndef main():\n    for name in ["Ana", "Leo"]:\n        print(greet(name))\n\nprint("Start")\nif __name__ == "__main__":\n    main()',
    expectedOutput: 'Start\nHello, Ana\nHello, Leo',
    options: [
      { text: 'Start, Hello, Ana and Hello, Leo', correct: true },
      { text: 'Only Start', concept: 'estilo', why: 'When you run the file directly, __name__ is "__main__" and main() is called.' },
      { text: 'Hello, Ana, Hello, Leo and Start', concept: 'funciones', why: 'Python runs from top to bottom: the print of Start comes before the call to main().' },
      { text: 'Nothing: the functions aren\'t called', concept: 'estilo', why: 'main() is called inside the if at the end.' },
    ],
    explain: ['greet and main are defined.', '«Start» is shown.', 'Since the file is run directly, main() is called, which greets Ana and Leo.'],
  },
  'est-complete': {
    id: 'est-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Tidy up the program', difficulty: 1, xp: 15, concepts: ['estilo'],
    statement: 'Fill in the blanks so the program follows the recommended structure: a **constant** in capitals and a **main()** that\'s called at the end.',
    expected: 'Tickets: 3, total 27 €',
    starter: '___ = 9   # price of one ticket, in euros\n\ndef tickets_total(quantity):\n    return quantity * TICKET_PRICE\n\ndef ___():\n    quantity = 3\n    print(f"Tickets: {quantity}, total {tickets_total(quantity)} €")\n\nif __name__ == "___":\n    main()',
    spec: {
      blanks: true,
      functions: [{ name: 'tickets_total', params: 1 }, { name: 'main', params: 0 }],
      cases: [
        { label: 'Whole program', out_lines: ['Tickets: 3, total 27 €'] },
        { label: 'tickets_total(10)', call: 'print(tickets_total(10))', out_lines: ['90'] },
      ],
      logic_msg: 'Check the blanks: the constant\'s name (the one the function uses), the name of the main function and the special value of __name__.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the constant\'s name, the main function\'s name and the text __name__ is compared with.' },
      { level: 'Reasoning', text: 'Look at which name tickets_total uses for the price. The main function is called… whatever is called at the end.' },
      { level: 'Pseudocode', text: 'TICKET_PRICE ← 9\ndefine main()\nif __name__ is "__main__": main()', pre: true },
      { level: 'Technical help', text: '`TICKET_PRICE = 9`, `def main():` and `if __name__ == "__main__":`.' },
    ],
    solution: {
      code: 'TICKET_PRICE = 9   # price of one ticket, in euros\n\ndef tickets_total(quantity):\n    return quantity * TICKET_PRICE\n\ndef main():\n    quantity = 3\n    print(f"Tickets: {quantity}, total {tickets_total(quantity)} €")\n\nif __name__ == "__main__":\n    main()',
      explanation: 'The constant in capitals shows it mustn\'t change; main() groups the main program and the last line sets it going.',
    },
    reference: ['TICKET_PRICE = 9\n\ndef tickets_total(quantity):\n    return quantity * TICKET_PRICE\n\ndef main():\n    quantity = 3\n    print(f"Tickets: {quantity}, total {tickets_total(quantity)} €")\n\nif __name__ == "__main__":\n    main()'],
    wrongs: [
      { code: '___ = 9\n\ndef tickets_total(quantity):\n    return quantity * TICKET_PRICE\n\ndef ___():\n    print(tickets_total(3))', category: 'incompleto' },
      { code: 'price = 9\n\ndef tickets_total(quantity):\n    return quantity * TICKET_PRICE\n\ndef main():\n    quantity = 3\n    print(f"Tickets: {quantity}, total {tickets_total(quantity)} €")\n\nif __name__ == "__main__":\n    main()', category: 'ejecucion' },
    ],
  },
  'est-fix': {
    id: 'est-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The global total', difficulty: 3, xp: 25, concepts: ['estilo', 'parametros'],
    statement: 'This program gives an **UnboundLocalError** because the function tries to change a global variable. Fix it **without using `global`**: `add_expense(total, amount)` must receive the current total and **return** the new one.',
    expected: 'Total: 35',
    starter: 'total = 0\n\ndef add_expense(amount):\n    total += amount\n\nadd_expense(20)\nadd_expense(15)\nprint("Total:", total)',
    spec: {
      functions: [{ name: 'add_expense', params: 2, missing_msg: 'Keep the add_expense function, now with two parameters: the total and the amount.' }],
      cases: [
        { label: 'Whole program', out_lines: ['Total: 35'] },
        { label: 'add_expense(10, 5)', call: 'print(add_expense(10, 5))', out_lines: ['15'] },
      ],
      misconceptions: [
        { out_lines: ['Total: 0'], title: 'What it returns isn\'t stored', msg: 'The function returns the new total, but you have to store it: `total = add_expense(total, 20)`.' },
      ],
      logic_msg: 'After adding 20 and 15, the total must be 35.',
    },
    hints: [
      { level: 'Orientation', text: 'The error says total is used before it has a value inside the function. When you assign to it inside, Python treats it as local.' },
      { level: 'Reasoning', text: 'Make the function receive the total as a parameter and return the sum. Outside, store what it returns in total.' },
      { level: 'Pseudocode', text: 'add_expense(total, amount): return total + amount\ntotal ← 0\ntotal ← add_expense(total, 20)\ntotal ← add_expense(total, 15)', pre: true },
      { level: 'Technical help', text: '`def add_expense(total, amount): return total + amount` and `total = add_expense(total, 20)`.' },
    ],
    solution: {
      code: 'def add_expense(total, amount):\n    return total + amount\n\ntotal = 0\ntotal = add_expense(total, 20)\ntotal = add_expense(total, 15)\nprint("Total:", total)',
      explanation: 'The function no longer depends on anything outside: everything it needs comes in through its parameters and its result goes out with return. It can be tested on its own: add_expense(10, 5) always gives 15.',
    },
    reference: ['def add_expense(total, amount):\n    return total + amount\n\ntotal = 0\ntotal = add_expense(total, 20)\ntotal = add_expense(total, 15)\nprint("Total:", total)'],
    wrongs: [
      { code: 'def add_expense(total, amount):\n    return total + amount\n\ntotal = 0\nadd_expense(total, 20)\nadd_expense(total, 15)\nprint("Total:", total)', category: 'comprension' },
      { code: 'total = 0\n\ndef add_expense(amount):\n    global total\n    total += amount\n\nadd_expense(20)\nadd_expense(15)\nprint("Total:", total)', category: 'comprension' },
    ],
  },
  'est-build': {
    id: 'est-build', type: 'code', variant: 'build', kindLabel: 'Refactor', topic: TOPIC,
    title: 'From script to tidy program', difficulty: 3, xp: 35, concepts: ['estilo', 'diseno'],
    unlock: { any: ['est-predict', 'est-complete', 'est-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'The starting code works, but it\'s cramped, has no functions and uses names that say nothing. **Refactor it**:\n\n• `average(marks)`: returns the average rounded to 2 decimal places.\n\n• `passed(marks)`: returns how many marks are 5 or more.\n\n• `main()`: shows the report using those functions, and is called at the end.\n\nThe output must be exactly the same as the original code\'s.',
    expected: 'Average: 6.62\nPassed: 3',
    starter: 'n=[7,4.5,9,6]\ns=0\nfor x in n:\n    s=s+x\nm=s/len(n)\nprint("Average:",round(m,2))\na=0\nfor x in n:\n    if x>=5:\n        a=a+1\nprint("Passed:",a)',
    plan: [
      {
        q: 'Which parts of the script become functions?',
        multi: true,
        options: [
          { text: 'Working out the average', correct: true },
          { text: 'Counting the passes', correct: true },
          { text: 'Each print separately', why: 'The prints make up the report: they go together in main().' },
        ],
      },
      {
        q: 'Where does the list of marks go?',
        options: [
          { text: 'Inside main(), which passes it to the functions', correct: true },
          { text: 'As a global variable the functions read', why: 'Functions should receive the data through parameters: that way they work for any list.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      functions: [{ name: 'average', params: 1 }, { name: 'passed', params: 1 }, { name: 'main', params: 0 }],
      cases: [
        { label: 'Whole program', out_lines: ['Average: 6.62', 'Passed: 3'] },
        { label: 'average([10, 5])', call: 'print(average([10, 5]))', out_lines: ['7.5'] },
        { label: 'passed([4, 5, 6])', call: 'print(passed([4, 5, 6]))', out_lines: ['2'] },
      ],
      misconceptions: [
        { out_lines: ['Passed: 3'], title: 'The average is missing', msg: 'main() has to show both lines of the report.' },
      ],
      rules: [{ type: 'must_call', name: 'main', title: 'Call main()', msg: 'The program must end by calling main().' }],
      logic_msg: 'The output must be identical to the original script\'s: «Average: 6.62» and «Passed: 3».',
    },
    hints: [
      { level: 'Orientation', text: 'First run the starting code to see its output. Then create the three functions one by one, testing them.' },
      { level: 'Reasoning', text: 'Each loop in the script becomes the body of a function that receives the list as a parameter and returns its result. main() creates the list and shows the results.' },
      { level: 'Pseudocode', text: 'average(marks): return round(sum / count, 2)\npassed(marks): count the marks ≥ 5\nmain(): marks ← [7, 4.5, 9, 6]; show average and passed\ncall main()', pre: true },
      { level: 'Technical help', text: '`return round(sum(marks) / len(marks), 2)` and, in main, `print("Average:", average(marks))`.' },
    ],
    solution: {
      code: 'def average(marks):\n    """Return the average of the marks, rounded to 2 decimal places."""\n    return round(sum(marks) / len(marks), 2)\n\n\ndef passed(marks):\n    """Return how many marks are 5 or more."""\n    count = 0\n    for mark in marks:\n        if mark >= 5:\n            count += 1\n    return count\n\n\ndef main():\n    marks = [7, 4.5, 9, 6]\n    print("Average:", average(marks))\n    print("Passed:", passed(marks))\n\n\nif __name__ == "__main__":\n    main()',
      explanation: 'The output is the same, but now each piece has a name, can be tested separately (average([10, 5]) → 7.5) and reused with other lists.',
    },
    reference: [
      'def average(marks):\n    return round(sum(marks) / len(marks), 2)\n\ndef passed(marks):\n    return len([n for n in marks if n >= 5])\n\ndef main():\n    marks = [7, 4.5, 9, 6]\n    print("Average:", average(marks))\n    print("Passed:", passed(marks))\n\nmain()',
    ],
    wrongs: [
      { code: 'n=[7,4.5,9,6]\ns=0\nfor x in n:\n    s=s+x\nm=s/len(n)\nprint("Average:",round(m,2))\na=0\nfor x in n:\n    if x>=5:\n        a=a+1\nprint("Passed:",a)', category: 'comprension' },
      { code: 'def average(marks):\n    return round(sum(marks) / len(marks), 2)\n\ndef passed(marks):\n    return len([n for n in marks if n > 5])\n\ndef main():\n    marks = [7, 4.5, 9, 6]\n    print("Average:", average(marks))\n    print("Passed:", passed(marks))\n\nmain()', category: 'logica' },
    ],
  },
};
