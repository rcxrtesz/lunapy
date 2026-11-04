// Lesson 13.3 · Final project: expense manager (English translation of src/content/lesson-proyecto-final.js).

const TOPIC = 'Final project';

const EXPENSE_CLASS = 'class Expense:\n    def __init__(self, date, category, amount, description):\n        self.date = date\n        self.category = category\n        self.amount = amount\n        self.description = description\n\n    def __str__(self):\n        return f"{self.date} {self.category}: {self.amount:.2f} € ({self.description})"\n';

const DATA = 'with open("expenses.csv", "w") as f:\n    f.write("date,category,amount,description\\n")\n    f.write("2026-10-02,food,23.5,market\\n")\n    f.write("2026-10-05,leisure,12,cinema\\n")\n    f.write("2026-10-09,food,abc,typo\\n")\n    f.write("2026-11-01,transport,40,travel pass\\n")\n    f.write("2026-11-03,food,18.25,dinner\\n")\n';

const SAMPLE_EXPENSES = 'expenses = [\n    Expense("2026-10-02", "food", 23.5, "market"),\n    Expense("2026-10-05", "leisure", 12, "cinema"),\n    Expense("2026-11-01", "transport", 40, "travel pass"),\n    Expense("2026-11-03", "food", 18.25, "dinner"),\n]\n';

export const LESSON_PROYECTO_FINAL = {
  id: 'proyecto-final',
  moduleId: 'm13',
  code: '13.3',
  title: 'Final project: expense manager',
  minutes: 50,
  bonusXp: 60,
  objectives: [
    'Plan a complete program before writing it',
    'Model the data with a class',
    'Load data from a CSV file while tolerating faulty lines',
    'Summarise by category with a dictionary',
    'Present a sorted report with a text chart',
  ],
  prerequisites: ['Lesson 13.2 «Style and good practice»'],
  teaser: 'Final project: you\'re going to build a personal expense manager that reads a file, summarises it and produces a report. Everything you\'ve learnt, in a single program.',
  celebration: 'You\'ve completed LunaPy! You\'ve gone from print("Hello") to building a complete program with classes, files, exceptions and dictionaries. Now it\'s time to create your own projects.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'plan', title: 'The project plan', concepts: ['descomponer', 'diseno'],
      blocks: [
        { type: 'p', text: 'We want a program that reads the expenses from a file, says how much has been spent in each category and shows it in a clear report. Before writing a single line, we **design**:' },
        {
          type: 'five', items: {
            'Data': 'An `Expense` class with date, category, amount and description.',
            'Input': '`load(file)` → list of Expense, skipping the lines with errors.',
            'Processing': '`by_category(expenses)` → dictionary category → total.',
            'Output': '`report(totals)` → lines sorted from most to least, with text bars.',
            'Program': '`main()` joins the pieces together.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'One piece at a time', text: 'Each activity in this lesson builds one piece, and the starting code already brings the earlier ones. That way you can test each one separately, as in incremental development.' },
        {
          type: 'check', id: 'm13p-plan', concept: 'descomponer', mode: 'choice',
          question: 'Why is an Expense class better than (date, category, amount, description) tuples?',
          options: [
            { text: 'Because expense.amount is easier to understand than expense[2] and you can add a __str__ to it', correct: true },
            { text: 'Because tuples can\'t store numbers', why: 'They can. The advantage of the class is clarity: named attributes and methods of its own.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'datos', title: 'The data and the file', concepts: ['clases', 'datos'],
      blocks: [
        { type: 'p', text: 'The expenses file is a CSV. Look at the fourth row: someone typed «abc» in the amount. The program mustn\'t break because of that.' },
        { type: 'code', run: true, code: DATA + '\nwith open("expenses.csv") as f:\n    print(f.read())' },
        { type: 'p', text: 'And this is what an Expense looks like with its `__str__`:' },
        { type: 'code', run: true, code: EXPENSE_CLASS + '\nprint(Expense("2026-10-02", "food", 23.5, "market"))' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'piezas', title: 'How the pieces fit together', concepts: ['composicion', 'estilo'],
      blocks: [
        { type: 'p', text: 'Once you have the three functions, main() only has to chain them together. This is what the final program looks like (with the functions summarised):' },
        { type: 'code', title: 'Final structure', code: 'def main():\n    expenses = load("expenses.csv")\n    totals = by_category(expenses)\n    report(totals)\n\nif __name__ == "__main__":\n    main()' },
        {
          type: 'check', id: 'm13p-orden', concept: 'composicion', mode: 'choice',
          question: 'In what order do the functions have to be called inside main()?',
          options: [
            { text: 'load → by_category → report', correct: true },
            { text: 'report → load → by_category', why: 'The report needs the totals, and the totals need the loaded expenses.' },
          ],
        },
        {
          type: 'more', summary: 'Ideas for extending it further',
          items: [
            'A summary per month: the key would be `expense.date[:7]` («2026-10»).',
            'A budget per category that warns you when it\'s exceeded.',
            'Asking for new expenses with input (validating with try) and adding them to the file with mode "a".',
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'pf-gasto' },
    { id: 'a2', activity: 'pf-cargar' },
    { id: 'a3', activity: 'pf-resumen' },
    { id: 'a4', activity: 'pf-informe' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A medium-sized program is designed before it\'s written: data, input, processing and output.',
    'A class gives the data names (`expense.amount`) and a `__str__` to show them.',
    'When loading real files, catch the errors on each line so one bad row doesn\'t break everything.',
    'Dictionaries summarise by category; `sorted(..., key=..., reverse=True)` sorts them for the report.',
    'main() chains the pieces: load → summarise → report.',
  ],
};

export const ACTIVITIES_PROYECTO_FINAL = {
  'pf-gasto': {
    id: 'pf-gasto', type: 'code', variant: 'complete', kindLabel: 'Project · piece 1', topic: TOPIC,
    title: 'The Expense class', difficulty: 2, xp: 20, concepts: ['clases'],
    statement: 'Complete the `Expense` class: it stores its four pieces of data and defines `__str__` so an expense is shown as in the example.',
    expected: '2026-10-02 food: 23.50 € (market)',
    starter: 'class Expense:\n    def __init__(self, date, category, amount, description):\n        self.date = date\n        self.category = category\n        self.___ = amount\n        self.description = description\n\n    def ___(self):\n        return f"{self.date} {self.category}: {self.amount:___} € ({self.description})"\n\nprint(Expense("2026-10-02", "food", 23.5, "market"))',
    spec: {
      blanks: true,
      exact_lines: true,
      classes: [{ name: 'Expense' }],
      cases: [
        { label: 'Whole program', out_lines: ['2026-10-02 food: 23.50 € (market)'] },
        { label: 'Whole-number amount', call: 'print(Expense("2026-11-01", "transport", 40, "travel pass"))', out_lines: ['2026-11-01 transport: 40.00 € (travel pass)'] },
      ],
      logic_msg: 'Compare the text with the example: the amount with exactly 2 decimal places.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the name of the amount attribute, the name of the method print uses and the 2-decimal format.' },
      { level: 'Reasoning', text: 'Look at which attribute the f-string uses. Which special method decides what print shows?' },
      { level: 'Pseudocode', text: 'self.amount ← amount\ndefine __str__(self): return the text with {self.amount:.2f}', pre: true },
      { level: 'Technical help', text: '`self.amount = amount`, `def __str__(self):` and `{self.amount:.2f}`.' },
    ],
    solution: {
      code: EXPENSE_CLASS + '\nprint(Expense("2026-10-02", "food", 23.5, "market"))',
      explanation: 'The class gives each piece of data a name and __str__ sets how an expense is presented anywhere in the program.',
    },
    reference: [EXPENSE_CLASS + '\nprint(Expense("2026-10-02", "food", 23.5, "market"))'],
    wrongs: [
      { code: 'class Expense:\n    def __init__(self, date, category, amount, description):\n        self.date = date\n        self.category = category\n        self.___ = amount\n        self.description = description', category: 'incompleto' },
      { code: 'class Expense:\n    def __init__(self, date, category, amount, description):\n        self.date = date\n        self.category = category\n        self.amount = amount\n        self.description = description\n\n    def __str__(self):\n        return f"{self.date} {self.category}: {self.amount} € ({self.description})"\n\nprint(Expense("2026-10-02", "food", 23.5, "market"))', category: 'logica' },
    ],
  },
  'pf-cargar': {
    id: 'pf-cargar', type: 'code', variant: 'build', kindLabel: 'Project · piece 2', topic: TOPIC,
    title: 'Loading the file', difficulty: 3, xp: 35, concepts: ['archivos', 'excepciones', 'clases'],
    unlock: { any: ['pf-gasto'], count: 1, text: 'Complete piece 1: the Expense class' },
    statement: 'The `Expense` class is already in the starting code. Define `load(file_name)` that reads the CSV (header `date,category,amount,description`) and returns a **list of Expense**, with the amount as a `float`.\n\nIf a line\'s amount isn\'t a number, **skip it** without stopping the program.',
    expected: '4 expenses loaded',
    starter: EXPENSE_CLASS + '\n\ndef load(file_name):\n    # read, skip the header, create an Expense per valid line\n    pass\n\n\n' + DATA + '\nexpenses = load("expenses.csv")\nprint(len(expenses), "expenses loaded")\n',
    plan: [
      {
        q: 'How do you skip the line with the amount «abc»?',
        options: [
          { text: 'With try/except ValueError around that line\'s float()', correct: true },
          { text: 'With a try around the whole loop', why: 'Then the first error would stop the whole loop and you\'d lose the following lines.' },
        ],
      },
      {
        q: 'What is added to the list for each valid line?',
        options: [
          { text: 'An Expense object created with the four fields', correct: true },
          { text: 'The line of text as it is', why: 'The rest of the program works with Expense objects: create them when loading.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      classes: [{ name: 'Expense' }],
      functions: [{ name: 'load', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['4 expenses loaded'] },
        { label: 'Content', call: DATA + 'gs = load("expenses.csv")\nprint(gs[0])\nprint(type(gs[-1].amount).__name__, gs[-1].amount)', out_lines: ['2026-10-02 food: 23.50 € (market)', 'float 18.25'] },
        { label: 'Header only', call: 'with open("empty.csv", "w") as f:\n    f.write("date,category,amount,description\\n")\nprint(load("empty.csv"))', out_lines: ['[]'] },
      ],
      misconceptions: [
        { out_lines: ['5 expenses loaded'], title: 'The faulty line has slipped in', msg: 'Convert the amount with float() inside a try and, if it gives ValueError, skip that line.' },
      ],
      logic_msg: 'From the sample file 4 expenses must be loaded: the line with «abc» is skipped.',
    },
    hints: [
      { level: 'Orientation', text: 'Open, skip the header, go through the lines, split the fields and create an Expense per valid line.' },
      { level: 'Reasoning', text: 'The try goes inside the for, around only the conversion of the amount. In the except, `continue`… or simply don\'t add anything: create the Expense in an else.' },
      { level: 'Pseudocode', text: 'expenses ← []\nopen the file; skip header\nfor each line:\n    date, cat, amt, description ← split by ","\n    try: amount ← float(amt)\n    if ValueError: skip the line\n    otherwise: add Expense(date, cat, amount, description)\nreturn expenses', pre: true },
      { level: 'Technical help', text: 'Structure: `try: amount = float(amt)` / `except ValueError: pass` / `else: expenses.append(Expense(date, cat, amount, description))`.' },
    ],
    solution: {
      code: EXPENSE_CLASS + '\n\ndef load(file_name):\n    """Return the list of Expense in the file, skipping lines with an invalid amount."""\n    expenses = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            date, category, amount_text, description = line.strip().split(",")\n            try:\n                amount = float(amount_text)\n            except ValueError:\n                continue\n            expenses.append(Expense(date, category, amount, description))\n    return expenses\n\n\n' + DATA + '\nexpenses = load("expenses.csv")\nprint(len(expenses), "expenses loaded")',
      explanation: 'The try surrounds only what can fail (the conversion). `continue` jumps to the next pass of the loop without adding anything: one bad line doesn\'t spoil the others.',
    },
    reference: [
      EXPENSE_CLASS + '\n\ndef load(file_name):\n    expenses = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            date, category, text, description = line.strip().split(",")\n            try:\n                amount = float(text)\n            except ValueError:\n                pass\n            else:\n                expenses.append(Expense(date, category, amount, description))\n    return expenses\n\n\n' + DATA + 'expenses = load("expenses.csv")\nprint(len(expenses), "expenses loaded")',
    ],
    wrongs: [
      { code: EXPENSE_CLASS + '\n\ndef load(file_name):\n    expenses = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            date, category, text, description = line.strip().split(",")\n            expenses.append(Expense(date, category, float(text), description))\n    return expenses\n\n\n' + DATA + '\nexpenses = load("expenses.csv")\nprint(len(expenses), "expenses loaded")', category: 'ejecucion' },
    ],
  },
  'pf-resumen': {
    id: 'pf-resumen', type: 'code', variant: 'build', kindLabel: 'Project · piece 3', topic: TOPIC,
    title: 'Totals by category', difficulty: 3, xp: 30, concepts: ['diccionarios', 'clases'],
    unlock: { any: ['pf-cargar'], count: 1, text: 'Complete piece 2: loading the file' },
    statement: 'With a list of `Expense` objects (already in the starting code), define `by_category(expenses)` that returns a **dictionary** category → total spent, with the totals **rounded to 2 decimal places**.',
    expected: "{'food': 41.75, 'leisure': 12, 'transport': 40}",
    starter: EXPENSE_CLASS + '\n\ndef by_category(expenses):\n    # dictionary category → total\n    pass\n\n\n' + SAMPLE_EXPENSES + '\nprint(by_category(expenses))\n',
    planScaffold: '',
    spec: {
      classes: [{ name: 'Expense' }],
      functions: [{ name: 'by_category', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ["{'food': 41.75, 'leisure': 12, 'transport': 40}"] },
        { label: 'Decimals', call: 'gs = [Expense("d", "a", 0.1, "x"), Expense("d", "a", 0.2, "y")]\nprint(by_category(gs))', out_lines: ["{'a': 0.3}"] },
        { label: 'Empty list', call: 'print(by_category([]))', out_lines: ['{}'] },
      ],
      misconceptions: [
        { out_lines: ["{'food': 18.25, 'leisure': 12, 'transport': 40}"], title: 'The total gets overwritten', msg: 'For food only the last expense is left. Add to the previous total: `totals[c] = totals.get(c, 0) + expense.amount`.' },
        { out_lines: ["{'a': 0.30000000000000004}"], title: 'Rounding is missing', msg: 'Round each total to 2 decimal places at the end.' },
      ],
      logic_msg: 'food: 23.5 + 18.25 = 41.75; leisure: 12; transport: 40.',
    },
    hints: [
      { level: 'Orientation', text: 'It\'s the grouping dictionary pattern, reading the attributes of each Expense.' },
      { level: 'Reasoning', text: 'For each expense: the key is expense.category and expense.amount is added. At the end, round each total.' },
      { level: 'Pseudocode', text: 'totals ← {}\nfor each expense: totals[category] ← get(category, 0) + amount\nfor each category: round\nreturn totals', pre: true },
      { level: 'Technical help', text: '`totals[expense.category] = totals.get(expense.category, 0) + expense.amount` and then `for c in totals: totals[c] = round(totals[c], 2)`.' },
    ],
    solution: {
      code: EXPENSE_CLASS + '\n\ndef by_category(expenses):\n    """Return a dictionary category → total spent (2 decimal places)."""\n    totals = {}\n    for expense in expenses:\n        totals[expense.category] = totals.get(expense.category, 0) + expense.amount\n    for category in totals:\n        totals[category] = round(totals[category], 2)\n    return totals\n\n\n' + SAMPLE_EXPENSES + '\nprint(by_category(expenses))',
      explanation: 'The same counting-with-a-dictionary pattern, but adding amounts and reading the data from objects. The final rounding avoids totals like 0.30000000000000004.',
    },
    reference: [
      EXPENSE_CLASS + '\n\ndef by_category(expenses):\n    totals = {}\n    for g in expenses:\n        totals[g.category] = totals.get(g.category, 0) + g.amount\n    return {c: round(t, 2) for c, t in totals.items()}\n\n\n' + SAMPLE_EXPENSES + 'print(by_category(expenses))',
    ],
    wrongs: [
      { code: EXPENSE_CLASS + '\n\ndef by_category(expenses):\n    totals = {}\n    for expense in expenses:\n        totals[expense.category] = expense.amount\n    return totals\n\n\n' + SAMPLE_EXPENSES + '\nprint(by_category(expenses))', category: 'comprension' },
    ],
  },
  'pf-informe': {
    id: 'pf-informe', type: 'code', variant: 'build', kindLabel: 'Project · piece 4', topic: TOPIC,
    title: 'The report with bars', difficulty: 3, xp: 40, concepts: ['tuplas', 'cadenas', 'composicion'],
    unlock: { any: ['pf-resumen'], count: 1, text: 'Complete piece 3: totals by category' },
    statement: 'Define `report(totals)`, which receives the dictionary category → total and **shows** one line per category, **from highest to lowest spending**, in this format:\n\n`food: #### 41.75 €`\n\nThe number of `#` is the total divided by 10, with no decimals (`int(total // 10)`). At the end, a line `Total: X €` with the sum of everything (2 decimal places).',
    expected: 'food: #### 41.75 €\ntransport: #### 40.00 €\nleisure: # 12.00 €\nTotal: 93.75 €',
    starter: 'def report(totals):\n    # sort from highest to lowest and show the lines\n    pass\n\n\nreport({"food": 41.75, "leisure": 12, "transport": 40})\n',
    planScaffold: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'report', params: 1 }],
      cases: [
        { label: 'Example', call: 'report({"food": 41.75, "leisure": 12, "transport": 40})', out_lines: ['food: #### 41.75 €', 'transport: #### 40.00 €', 'leisure: # 12.00 €', 'Total: 93.75 €'] },
        { label: 'Under 10 €', call: 'report({"coffee": 3.5})', out_lines: ['coffee:  3.50 €', 'Total: 3.50 €'] },
        { label: 'Empty', call: 'report({})', out_lines: ['Total: 0.00 €'] },
      ],
      misconceptions: [
        { out_lines: ['food: #### 41.75 €', 'leisure: # 12.00 €', 'transport: #### 40.00 €', 'Total: 93.75 €'], title: 'Not sorted', msg: 'The categories must go from highest to lowest spending: sort the items by the total with key and reverse=True.' },
        { out_lines: ['leisure: # 12.00 €', 'transport: #### 40.00 €', 'food: #### 41.75 €', 'Total: 93.75 €'], title: 'Order reversed', msg: 'Highest to lowest is asked for: add reverse=True.' },
      ],
      logic_msg: 'Compare line by line with the example: order, number of #, decimals and the final line.',
    },
    hints: [
      { level: 'Orientation', text: 'Three steps: sort the pairs by total, show each line and show the total.' },
      { level: 'Reasoning', text: 'sorted(totals.items(), key=…, reverse=True) gives (category, total) tuples from highest to lowest. The bars: "#" * int(total // 10). The total: sum(totals.values()).' },
      { level: 'Pseudocode', text: 'for each (category, total) sorted by total, from highest to lowest:\n    show f"{category}: {bars} {total:.2f} €"\nshow f"Total: {sum:.2f} €"', pre: true },
      { level: 'Technical help', text: 'With `def second(pair): return pair[1]`, use `sorted(totals.items(), key=second, reverse=True)`. The line: `print(f"{category}: {\'#\' * int(total // 10)} {total:.2f} €")`.' },
    ],
    solution: {
      code: 'def second(pair):\n    return pair[1]\n\n\ndef report(totals):\n    """Show the totals from highest to lowest with a # bar for every 10 €."""\n    for category, total in sorted(totals.items(), key=second, reverse=True):\n        bars = "#" * int(total // 10)\n        print(f"{category}: {bars} {total:.2f} €")\n    print(f"Total: {sum(totals.values()):.2f} €")\n\n\nreport({"food": 41.75, "leisure": 12, "transport": 40})',
      explanation: 'Sorting by the second item of each pair puts the most expensive categories first. Repeating strings draws the bars and the f-strings fix the 2 decimal places. With this piece, the expense manager is complete.',
    },
    reference: [
      'def second(pair):\n    return pair[1]\n\ndef report(totals):\n    for category, total in sorted(totals.items(), key=second, reverse=True):\n        print(f"{category}: {\'#\' * int(total // 10)} {total:.2f} €")\n    print(f"Total: {sum(totals.values()):.2f} €")',
    ],
    wrongs: [
      { code: 'def report(totals):\n    for category, total in totals.items():\n        print(f"{category}: {\'#\' * int(total // 10)} {total:.2f} €")\n    print(f"Total: {sum(totals.values()):.2f} €")', category: 'comprension' },
      { code: 'def second(pair):\n    return pair[1]\n\ndef report(totals):\n    for category, total in sorted(totals.items(), key=second, reverse=True):\n        print(f"{category}: {\'#\' * int(total // 10)} {total} €")\n    print(f"Total: {sum(totals.values())} €")', category: 'logica' },
    ],
  },
};
