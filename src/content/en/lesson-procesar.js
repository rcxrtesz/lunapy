// Lesson 11.2 · Processing data (English translation of src/content/lesson-procesar.js).

const TOPIC = 'Files';

const SALES = 'with open("sales.csv", "w") as f:\n    f.write("product,units,price\\n")\n    f.write("notebook,3,2.5\\n")\n    f.write("pen,10,0.8\\n")\n    f.write("notebook,2,2.5\\n")\n';

export const LESSON_PROCESAR = {
  id: 'procesar',
  moduleId: 'm11',
  code: '11.2',
  title: 'Processing data',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Recognise a CSV file: rows and columns separated by commas',
    'Split each row with split and convert each field to its type',
    'Skip the header row',
    'Group and total by category with a dictionary',
    'Use the csv module and write a report to another file',
  ],
  prerequisites: ['Lesson 11.1 «Reading and writing files»'],
  teaser: 'Real data usually comes in tables: sales, marks, expenses… Today you learn to read them, summarise them and draw conclusions.',
  celebration: 'You now process real data: you read tables, convert types, group by category and produce reports.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'csv', title: 'Data in a table: CSV', concepts: ['archivos', 'datos'],
      blocks: [
        { type: 'p', text: 'A **CSV** file (*comma-separated values*) is a table in text: each line is a row and the commas separate the columns. The first row is usually the **header** with the column names.' },
        { type: 'code', run: true, code: SALES + '\nwith open("sales.csv") as f:\n    print(f.read())' },
        {
          type: 'check', id: 'm11p-columnas', concept: 'datos', mode: 'text',
          question: 'Predict: how many columns does the row have?', code: 'row = "notebook,3,2.5\\n"\nprint(len(row.strip().split(",")))', answer: '3',
          explain: 'split(",") gives ["notebook", "3", "2.5"]: three columns.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'convertir', title: 'Splitting and converting', concepts: ['datos', 'tipos'],
      blocks: [
        { type: 'p', text: 'When you split, **everything is text**. To calculate you have to convert each field to its type. And the header is skipped with `next(f)`, which consumes the first line:' },
        { type: 'code', run: true, code: SALES + '\ntotal = 0\nwith open("sales.csv") as f:\n    next(f)                      # skip the header\n    for line in f:\n        product, units, price = line.strip().split(",")\n        amount = int(units) * float(price)\n        print(product, amount)\n        total += amount\nprint("Total:", total)' },
        { type: 'callout', tone: 'warn', title: 'If you forget the header', text: 'The first «data row» would be `product,units,price`, and `int("units")` would give a ValueError.' },
        {
          type: 'check', id: 'm11p-convertir', concept: 'datos', mode: 'text',
          question: 'Predict:', code: 'name, age = "Ana,19".split(",")\nprint(int(age) + 1)', answer: '20',
          explain: 'age is the text "19"; int() converts it to a number and you can add 1 to it.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'agrupar', title: 'Grouping by category', concepts: ['datos', 'diccionarios'],
      blocks: [
        { type: 'p', text: 'How many units were sold of **each** product? It\'s the counter dictionary pattern, but adding a quantity instead of 1:' },
        { type: 'code', run: true, code: SALES + '\nby_product = {}\nwith open("sales.csv") as f:\n    next(f)\n    for line in f:\n        product, units, price = line.strip().split(",")\n        by_product[product] = by_product.get(product, 0) + int(units)\nprint(by_product)' },
        {
          type: 'check', id: 'm11p-agrupar', concept: 'diccionarios', mode: 'text',
          question: 'Predict:', code: 'rows = ["a,5", "b,2", "a,1"]\ntot = {}\nfor r in rows:\n    k, v = r.split(",")\n    tot[k] = tot.get(k, 0) + int(v)\nprint(tot)', answer: "{'a': 6, 'b': 2}",
          explain: 'The two rows for «a» are added: 5 + 1 = 6.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modulo-csv', title: 'The csv module and writing the report', concepts: ['datos', 'archivos'],
      blocks: [
        { type: 'p', text: 'The `csv` module does the split for you and handles tricky cases (like commas inside a field in quotes). `csv.reader` gives each row as a list:' },
        { type: 'code', run: true, code: 'import csv\n\n' + SALES + '\nwith open("sales.csv") as f:\n    reader = csv.reader(f)\n    header = next(reader)\n    for row in reader:\n        print(row)' },
        { type: 'p', text: 'And to save the results, write a new file with the report:' },
        { type: 'code', run: true, code: 'summary = {"notebook": 5, "pen": 10}\nwith open("report.txt", "w") as f:\n    for product, units in summary.items():\n        f.write(f"{product}: {units} units\\n")\n\nwith open("report.txt") as f:\n    print(f.read())' },
        {
          type: 'check', id: 'm11p-reader', concept: 'datos', mode: 'choice',
          question: 'What does csv.reader give on each pass of the for?',
          options: [
            { text: 'A list with the row\'s fields, as texts', correct: true },
            { text: 'The fields already converted to numbers', why: 'csv.reader doesn\'t guess types: the fields are still texts and you have to convert them yourself.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'csv-predict' },
    { id: 'a2', activity: 'csv-complete' },
    { id: 'a3', activity: 'csv-fix' },
    { id: 'a4', activity: 'csv-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A CSV is a table in text: rows on lines and columns separated by commas; the first is usually the header.',
    '`line.strip().split(",")` splits the fields; they\'re all texts and you have to convert them (`int`, `float`).',
    '`next(f)` skips the header before the loop.',
    'Grouping: `totals[key] = totals.get(key, 0) + quantity`.',
    'The `csv` module (`csv.reader`) splits the rows for you; write the results to another file with `write`.',
  ],
};

export const ACTIVITIES_PROCESAR = {
  'csv-predict': {
    id: 'csv-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The month\'s spending', difficulty: 2, xp: 10, concepts: ['datos', 'diccionarios'],
    prompt: 'The expenses are grouped by category. **What will it show?**',
    code: 'with open("expenses.csv", "w") as f:\n    f.write("category,amount\\nfood,30\\nleisure,15\\nfood,20\\n")\n\nby_category = {}\nwith open("expenses.csv") as f:\n    next(f)\n    for line in f:\n        cat, amt = line.strip().split(",")\n        by_category[cat] = by_category.get(cat, 0) + int(amt)\nprint(by_category)',
    expectedOutput: "{'food': 50, 'leisure': 15}",
    options: [
      { text: "{'food': 50, 'leisure': 15}", correct: true },
      { text: "{'food': 20, 'leisure': 15}", concept: 'diccionarios', why: 'It adds to the previous value with get(cat, 0) + amount: 30 + 20 = 50.' },
      { text: "{'category': 'amount', 'food': 50, 'leisure': 15}", concept: 'datos', why: 'next(f) skips the header before the loop.' },
      { text: "{'food': '3020', 'leisure': '15'}", concept: 'tipos', why: 'int(amt) converts each amount to a number before adding.' },
    ],
    explain: ['next(f) skips «category,amount».', 'food: 30 + 20 = 50; leisure: 15.'],
  },
  'csv-complete': {
    id: 'csv-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The class average', difficulty: 2, xp: 15, concepts: ['datos', 'archivos'],
    statement: 'The file has the header `name,mark` and one student per row. Complete `class_average(file_name)` so it returns the average mark rounded to 2 decimal places.',
    expected: '7.17',
    starter: 'def class_average(file_name):\n    marks = []\n    with open(file_name) as f:\n        ___(f)\n        for line in f:\n            name, mark = line.strip().___(",")\n            marks.append(___(mark))\n    return round(sum(marks) / len(marks), 2)\n\nwith open("class.csv", "w") as f:\n    f.write("name,mark\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(class_average("class.csv"))',
    spec: {
      blanks: true,
      functions: [{ name: 'class_average', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['7.17'] },
        { label: 'Another class', call: 'with open("c2.csv", "w") as f:\n    f.write("name,mark\\nLeo,10\\nBea,5\\n")\nprint(class_average("c2.csv"))', out_lines: ['7.5'] },
      ],
      logic_msg: 'Check the three blanks: skip the header, split by commas and convert the mark to a decimal number.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the function that skips a line, the method that splits and the conversion of the mark.' },
      { level: 'Reasoning', text: 'The first line is the header. Marks may have decimals.' },
      { level: 'Pseudocode', text: 'skip the header\nfor each line: name, mark ← split by ","\n    add the mark converted to decimal', pre: true },
      { level: 'Technical help', text: '`next(f)`, `split(",")` and `float(mark)`.' },
    ],
    solution: {
      code: 'def class_average(file_name):\n    marks = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            name, mark = line.strip().split(",")\n            marks.append(float(mark))\n    return round(sum(marks) / len(marks), 2)\n\nwith open("class.csv", "w") as f:\n    f.write("name,mark\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(class_average("class.csv"))',
      explanation: 'next skips the header; split separates name and mark; float converts the mark so it can be added. (8 + 6 + 7.5) / 3 = 7.17.',
    },
    reference: ['def class_average(file_name):\n    marks = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            name, mark = line.strip().split(",")\n            marks.append(float(mark))\n    return round(sum(marks) / len(marks), 2)\n\nwith open("class.csv", "w") as f:\n    f.write("name,mark\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(class_average("class.csv"))'],
    wrongs: [
      { code: 'def class_average(file_name):\n    marks = []\n    with open(file_name) as f:\n        ___(f)\n        for line in f:\n            name, mark = line.strip().___(",")\n            marks.append(___(mark))\n    return round(sum(marks) / len(marks), 2)', category: 'incompleto' },
      { code: 'def class_average(file_name):\n    marks = []\n    with open(file_name) as f:\n        next(f)\n        for line in f:\n            name, mark = line.strip().split(",")\n            marks.append(int(mark))\n    return round(sum(marks) / len(marks), 2)\n\nwith open("class.csv", "w") as f:\n    f.write("name,mark\\nAna,8\\nLuis,6\\nEva,7.5\\n")\nprint(class_average("class.csv"))', category: 'ejecucion' },
    ],
  },
  'csv-fix': {
    id: 'csv-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The treacherous header', difficulty: 2, xp: 20, concepts: ['datos', 'errores'],
    statement: '`total_units(file)` should add up the units column, but it gives a **ValueError** on the first pass. Read the error and fix it.',
    expected: '15',
    starter: SALES + '\ndef total_units(file):\n    total = 0\n    with open(file) as f:\n        for line in f:\n            product, units, price = line.strip().split(",")\n            total += int(units)\n    return total\n\nprint(total_units("sales.csv"))',
    spec: {
      functions: [{ name: 'total_units', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['15'] },
        { label: 'Another file', call: 'with open("v2.csv", "w") as f:\n    f.write("product,units,price\\nx,1,1\\n")\nprint(total_units("v2.csv"))', out_lines: ['1'] },
      ],
      logic_msg: 'It must add only the data rows: 3 + 10 + 2 = 15.',
    },
    hints: [
      { level: 'Orientation', text: 'The error says it can\'t convert «units» to a number. Which row does that text come from?' },
      { level: 'Reasoning', text: 'The first line is the header. You need to skip it before the loop.' },
      { level: 'Pseudocode', text: 'open the file\nskip the first line\nfor each remaining line: add the units', pre: true },
      { level: 'Technical help', text: 'Add `next(f)` just before the `for`.' },
    ],
    solution: {
      code: SALES + '\ndef total_units(file):\n    total = 0\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            total += int(units)\n    return total\n\nprint(total_units("sales.csv"))',
      explanation: 'The header isn\'t data: `int("units")` makes no sense. next(f) consumes it before the loop starts.',
    },
    reference: [SALES + '\ndef total_units(file):\n    total = 0\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            total += int(units)\n    return total\n\nprint(total_units("sales.csv"))'],
    wrongs: [
      { code: SALES + '\ndef total_units(file):\n    total = 0\n    with open(file) as f:\n        for line in f:\n            product, units, price = line.strip().split(",")\n            total += int(units)\n    return total\n\nprint(total_units("sales.csv"))', category: 'ejecucion' },
    ],
  },
  'csv-build': {
    id: 'csv-build', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'The star product', difficulty: 3, xp: 30, concepts: ['datos', 'diccionarios', 'composicion'],
    unlock: { any: ['csv-predict', 'csv-complete', 'csv-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'With a sales file like the one in the lesson (header `product,units,price`), define `revenue(file)` that returns a **dictionary** product → money taken (units × price, rounded to 2 decimal places), adding up all the rows for each product.\n\nExample with the lesson\'s file: `{\'notebook\': 12.5, \'pen\': 8.0}`.',
    expected: "{'notebook': 12.5, 'pen': 8.0}",
    plan: [
      {
        q: 'What does the dictionary store for each product?',
        options: [
          { text: 'The sum of units × price over all its rows', correct: true },
          { text: 'Only the units', why: 'The money taken is asked for: units × price.' },
        ],
      },
      {
        q: 'When do you round?',
        options: [
          { text: 'At the end, when everything has been added', correct: true },
          { text: 'On each row', why: 'It almost always works, but rounding before you finish adding can build up small errors.' },
        ],
      },
    ],
    planScaffold: 'def revenue(file):\n    # read, skip the header, accumulate by product and round\n\n\n' + SALES + 'print(revenue("sales.csv"))\n',
    starter: '',
    spec: {
      functions: [{ name: 'revenue', params: 1 }],
      cases: [
        { label: 'The lesson\'s file', call: SALES + 'print(revenue("sales.csv"))', out_lines: ["{'notebook': 12.5, 'pen': 8.0}"] },
        { label: 'Decimals', call: 'with open("v3.csv", "w") as f:\n    f.write("product,units,price\\ncoffee,3,1.15\\ntea,2,0.9\\ncoffee,1,1.15\\n")\nprint(revenue("v3.csv"))', out_lines: ["{'coffee': 4.6, 'tea': 1.8}"] },
      ],
      misconceptions: [
        { out_lines: ["{'notebook': 5, 'pen': 10}"], title: 'Only units', msg: 'The money is asked for: multiply the units by the price on each row.' },
        { out_lines: ["{'notebook': 5.0, 'pen': 8.0}"], title: 'The value gets overwritten', msg: 'For notebook only the last row is left. Add to the previous value: `rev[p] = rev.get(p, 0) + amount`.' },
      ],
      logic_msg: 'Check with the lesson\'s file: notebook 3 × 2.5 + 2 × 2.5 = 12.5 and pen 10 × 0.8 = 8.0.',
    },
    hints: [
      { level: 'Orientation', text: 'It\'s the grouping-with-a-dictionary pattern, adding an amount instead of 1.' },
      { level: 'Reasoning', text: 'For each row: split, convert units (int) and price (float), work out the amount and add it to its product. At the end, round each value.' },
      { level: 'Pseudocode', text: 'rev ← {}\nskip header\nfor each row: p, u, pr ← fields\n    rev[p] ← rev.get(p, 0) + int(u) × float(pr)\nfor each p: rev[p] ← round(rev[p], 2)\nreturn rev', pre: true },
      { level: 'Technical help', text: 'To round at the end: `for p in rev: rev[p] = round(rev[p], 2)`.' },
    ],
    solution: {
      code: 'def revenue(file):\n    """Return a dictionary product → money taken."""\n    rev = {}\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            rev[product] = rev.get(product, 0) + int(units) * float(price)\n    for product in rev:\n        rev[product] = round(rev[product], 2)\n    return rev\n\n' + SALES + 'print(revenue("sales.csv"))',
      explanation: 'Read, convert, group and round: the steps of almost any data processing. Changing a dictionary\'s values while going through it is allowed; what you can\'t do is add or remove keys.',
    },
    reference: [
      'def revenue(file):\n    rev = {}\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            rev[product] = rev.get(product, 0) + int(units) * float(price)\n    for product in rev:\n        rev[product] = round(rev[product], 2)\n    return rev',
    ],
    wrongs: [
      { code: 'def revenue(file):\n    rev = {}\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            rev[product] = rev.get(product, 0) + int(units)\n    return rev', category: 'comprension' },
      { code: 'def revenue(file):\n    rev = {}\n    with open(file) as f:\n        next(f)\n        for line in f:\n            product, units, price = line.strip().split(",")\n            rev[product] = round(int(units) * float(price), 2)\n    return rev', category: 'comprension' },
    ],
  },
};
