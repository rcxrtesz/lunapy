// Lesson 9.1 · Lists and operations (English translation of src/content/lesson-listas.js).

const TOPIC = 'Lists';

export const LESSON_LISTAS = {
  id: 'listas',
  moduleId: 'm9',
  code: '9.1',
  title: 'Lists and operations',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Create lists and reach their items with indexes and slices',
    'Change items: unlike texts, lists are mutable',
    'Add and remove items with append, insert, remove and pop',
    'Sort with sort (changes the list) and sorted (returns a new one)',
    'Summarise a list with len, sum, max, min and in',
  ],
  prerequisites: ['Module 8 «Strings»'],
  teaser: 'You\'re starting Module 9: until now each variable stored one piece of data. A list stores many, in order, and can grow or shrink.',
  celebration: 'You now know how to create, look up, change and sort lists: the most used data structure in Python.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'crear', title: 'Lots of data in one variable', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'A **list** is a sequence of values in square brackets, separated by commas. Like texts, it uses indexes from 0, negative indexes and slices.' },
        { type: 'code', run: true, code: 'marks = [7.5, 9, 6, 8.25]\nnames = ["Ana", "Luis", "Eva"]\nempty = []\n\nprint(marks[0], marks[-1])\nprint(names[1:])\nprint(len(marks), len(empty))\nprint("Eva" in names)' },
        { type: 'callout', tone: 'info', title: 'They can mix types', text: 'A list can contain anything, even other lists: `[1, "two", 3.0, [4, 5]]`. Usually, though, all the items are the same type.' },
        {
          type: 'check', id: 'm9l-indice', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'days = ["mon", "tue", "wed", "thu", "fri"]\nprint(days[2], days[-2], len(days))', answer: 'wed thu 5',
          explain: 'Position 2: «wed». Second to last: «thu». Five items.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mutable', title: 'Lists can be changed', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Unlike texts, lists are **mutable**: you can change an item by assigning it a new value.' },
        { type: 'code', run: true, code: 'marks = [7.5, 9, 6]\nmarks[2] = 6.5\nprint(marks)\n\ntext = "cat"\n# text[0] = "b"  → TypeError: texts can\'t' },
        {
          type: 'check', id: 'm9l-mutable', concept: 'listas', mode: 'choice',
          question: 'What will it show?', code: 'colours = ["red", "green", "blue"]\ncolours[-1] = "black"\nprint(colours)', expectOutput: "['red', 'green', 'black']",
          options: [
            { text: "['red', 'green', 'black']", correct: true },
            { text: 'A TypeError', why: 'That would happen with a text. Lists are mutable: you can change an item.' },
            { text: "['red', 'green', 'blue', 'black']", why: 'Assigning to a position **replaces** the item; to add a new one you use append.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'metodos', title: 'Adding and removing', concepts: ['listas'],
      blocks: [
        {
          type: 'five', items: {
            'append(x)': 'Adds x at the end.',
            'insert(i, x)': 'Inserts x at position i.',
            'remove(x)': 'Removes the first occurrence of x (error if it isn\'t there).',
            'pop()': 'Removes and **returns** the last one (or the one at the position you give it).',
          },
        },
        { type: 'code', run: true, code: 'basket = ["bread", "milk"]\nbasket.append("eggs")\nbasket.insert(0, "coffee")\nprint(basket)\nbasket.remove("milk")\nlast = basket.pop()\nprint(basket, "— I took out:", last)' },
        { type: 'p', text: 'You can also join lists with `+` and repeat them with `*`, just like texts:' },
        { type: 'code', run: true, code: 'print([1, 2] + [3, 4])\nprint([0] * 5)' },
        {
          type: 'check', id: 'm9l-metodos', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'stack = [1, 2, 3]\nstack.append(4)\nstack.pop(0)\nprint(stack)', answer: '[2, 3, 4]',
          explain: 'append adds the 4 at the end; pop(0) removes the one at position 0 (the 1).',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'ordenar', title: 'sort and sorted', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'There are two ways of sorting, and the difference matters:' },
        {
          type: 'five', items: {
            'list.sort()': '**Changes** the list and returns `None`.',
            'sorted(list)': 'Returns a **new** sorted list and leaves the original as it was.',
          },
        },
        { type: 'code', run: true, code: 'times = [12.5, 10.1, 11.8]\nordered = sorted(times)\nprint(ordered, times)\n\ntimes.sort()\nprint(times)\n\nprint(sorted(times, reverse=True))' },
        { type: 'callout', tone: 'warn', title: 'Classic trap', text: '`x = list.sort()` leaves the value `None` in x: sort sorts the list, but doesn\'t return anything.' },
        {
          type: 'check', id: 'm9l-sort', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'a = [3, 1, 2]\nb = a.sort()\nprint(a, b)', answer: '[1, 2, 3] None',
          explain: 'sort sorts a and returns None, which is what gets stored in b.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'resumir', title: 'Summarising a list', concepts: ['listas'],
      blocks: [
        { type: 'p', text: 'Functions you already know work directly with lists of numbers:' },
        { type: 'code', run: true, code: 'marks = [7.5, 9, 6, 8.25]\nprint("Sum:", sum(marks))\nprint("Highest:", max(marks), "Lowest:", min(marks))\nprint("Average:", round(sum(marks) / len(marks), 2))\nprint("Is there a 9?", 9 in marks)\nprint("Position of the 6:", marks.index(6))' },
        {
          type: 'check', id: 'm9l-sum', concept: 'listas', mode: 'text',
          question: 'Predict:', code: 'v = [4, 8, 2, 6]\nprint(sum(v) / len(v), max(v) - min(v))', answer: '5.0 6',
          explain: '20 / 4 = 5.0 and 8 − 2 = 6.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'lis-predict' },
    { id: 'a2', activity: 'lis-complete' },
    { id: 'a3', activity: 'lis-fix' },
    { id: 'a4', activity: 'lis-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A list stores several values in order: `[1, 2, 3]`. Indexes, slices, `len` and `in` work like with texts.',
    'Lists are **mutable**: `list[i] = new` changes an item.',
    '`append`, `insert`, `remove` and `pop` add and remove items.',
    '`list.sort()` sorts the list and returns None; `sorted(list)` returns a new one.',
    '`sum`, `max`, `min` and `index` summarise and search a list.',
  ],
};

export const ACTIVITIES_LISTAS = {
  'lis-predict': {
    id: 'lis-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The cinema queue', difficulty: 2, xp: 10, concepts: ['listas'],
    prompt: 'The queue changes: people arrive, someone pushes in and someone goes in. **What will it show?**',
    code: 'queue = ["Ana", "Luis"]\nqueue.append("Eva")\nqueue.insert(1, "Leo")\nfirst = queue.pop(0)\nprint(first, queue, len(queue))',
    expectedOutput: "Ana ['Leo', 'Luis', 'Eva'] 3",
    options: [
      { text: "Ana ['Leo', 'Luis', 'Eva'] 3", correct: true },
      { text: "Eva ['Ana', 'Leo', 'Luis'] 3", concept: 'listas', why: 'pop(0) removes the one at position 0 (Ana). Without an argument it would remove the last.' },
      { text: "Ana ['Luis', 'Leo', 'Eva'] 3", concept: 'listas', why: 'insert(1, "Leo") puts Leo at position 1, just behind Ana, while Ana was still there.' },
      { text: "Ana ['Leo', 'Luis', 'Eva'] 4", concept: 'listas', why: 'pop removes the item from the list: 3 are left.' },
    ],
    explain: ['append → Ana, Luis, Eva.', 'insert(1, "Leo") → Ana, Leo, Luis, Eva.', 'pop(0) takes Ana out → Leo, Luis, Eva.'],
  },
  'lis-complete': {
    id: 'lis-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The shopping basket', difficulty: 1, xp: 15, concepts: ['listas'],
    statement: 'Complete the program: add the price of the cheese (4.25 €) at the end of the list and show the **number of products** and the **total**.',
    expected: '4 products, total: 12.5',
    starter: 'prices = [2.5, 1.25, 4.5]\nprices.___(4.25)\nprint(___(prices), "products, total:", ___(prices))',
    spec: {
      blanks: true,
      cases: [{ label: 'Whole program', out_lines: ['4 products, total: 12.5'] }],
      rules: [{ type: 'must_call', name: 'sum', title: 'Work it out with the list', msg: 'Use len() and sum() on the list instead of writing the numbers by hand.' }],
      misconceptions: [
        { out_lines: ['3 products, total: 8.25'], title: 'The cheese hasn\'t been added', msg: 'The first gap has to **add** 4.25 at the end of the list: `append`.' },
      ],
      logic_msg: 'Check the gaps: one adds, another counts and another adds up.',
    },
    hints: [
      { level: 'Orientation', text: 'Three gaps: a method that adds at the end, a function that counts items and another that adds them up.' },
      { level: 'Reasoning', text: 'Which method adds at the end? Which function gives the length? And the sum?' },
      { level: 'Pseudocode', text: 'add 4.25 at the end of prices\nshow length of prices and sum of prices', pre: true },
      { level: 'Technical help', text: '`prices.append(4.25)`, `len(prices)` and `sum(prices)`.' },
    ],
    solution: {
      code: 'prices = [2.5, 1.25, 4.5]\nprices.append(4.25)\nprint(len(prices), "products, total:", sum(prices))',
      explanation: 'append changes the list by adding an item; len and sum summarise it without changing it.',
    },
    reference: ['prices = [2.5, 1.25, 4.5]\nprices.append(4.25)\nprint(len(prices), "products, total:", sum(prices))'],
    wrongs: [
      { code: 'prices = [2.5, 1.25, 4.5]\nprices.___(4.25)\nprint(___(prices), "products, total:", ___(prices))', category: 'incompleto' },
      { code: 'prices = [2.5, 1.25, 4.5]\nprices.append(4.25)\nprint(4, "products, total:", 12.5)', category: 'logica' },
    ],
  },
  'lis-fix': {
    id: 'lis-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The disappearing ranking', difficulty: 2, xp: 20, concepts: ['listas', 'errores'],
    statement: '`ranking(points)` should return a **new** list with the scores from highest to lowest, without changing the original. Right now it returns `None` and also reorders the original list. Fix it.',
    expected: '[90, 75, 60]\n[60, 90, 75]',
    starter: 'def ranking(points):\n    return points.sort(reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)',
    spec: {
      functions: [{ name: 'ranking', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['[90, 75, 60]', '[60, 90, 75]'] },
        { label: 'ranking([3, 1, 2])', call: 'print(ranking([3, 1, 2]))', out_lines: ['[3, 2, 1]'] },
      ],
      misconceptions: [
        { out_lines: ['None', '[90, 75, 60]'], title: 'sort returns None', msg: '`sort()` sorts the original list and returns None. Use `sorted(points, reverse=True)`, which returns a new list.' },
        { out_lines: ['[90, 75, 60]', '[90, 75, 60]'], title: 'The original has changed', msg: 'It now returns the right list, but the original has been sorted too. Use sorted, which doesn\'t change it.' },
      ],
      logic_msg: 'The function must return the list sorted from highest to lowest and leave the original as it was.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it: the first print shows None and the second, the list already sorted. Both come from sort().' },
      { level: 'Reasoning', text: 'Which function sorts by returning a new list, without touching the original?' },
      { level: 'Pseudocode', text: 'return a sorted copy of points, from highest to lowest', pre: true },
      { level: 'Technical help', text: '`return sorted(points, reverse=True)`.' },
    ],
    solution: {
      code: 'def ranking(points):\n    return sorted(points, reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)',
      explanation: 'sorted creates a new sorted list and returns it; the original stays untouched. sort, on the other hand, changes the list and returns None.',
    },
    reference: ['def ranking(points):\n    return sorted(points, reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)'],
    wrongs: [
      { code: 'def ranking(points):\n    return points.sort(reverse=True)\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)', category: 'comprension' },
      { code: 'def ranking(points):\n    points.sort(reverse=True)\n    return points\n\noriginal = [60, 90, 75]\nprint(ranking(original))\nprint(original)', category: 'comprension' },
    ],
  },
  'lis-build': {
    id: 'lis-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The podium', difficulty: 3, xp: 30, concepts: ['listas', 'retorno'],
    unlock: { any: ['lis-predict', 'lis-complete', 'lis-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'In a race the winner is whoever takes the **least time**. Define `podium(times)` that returns a list with the **3 best times**, from best to worst, **without changing** the original list. If there are fewer than 3 times, return all of them sorted.',
    expected: '[9.8, 10.2, 10.5]',
    plan: [
      {
        q: 'How do you get the times sorted without changing the original list?',
        options: [
          { text: 'sorted(times)', correct: true },
          { text: 'times.sort()', why: 'sort changes the original list (and returns None).' },
        ],
      },
      {
        q: 'How do you keep the first 3?',
        options: [
          { text: 'With the slice [:3]', correct: true },
          { text: 'With [0], [1] and [2]', why: 'If there were fewer than 3 times it would give IndexError. The slice [:3] works with any length.' },
        ],
      },
    ],
    planScaffold: 'def podium(times):\n    # sort without changing it and keep the first 3\n\n\nprint(podium([10.5, 12.0, 9.8, 10.2, 11.1]))\n',
    starter: '',
    spec: {
      functions: [{ name: 'podium', params: 1 }],
      cases: [
        { label: 'Five times', call: 'print(podium([10.5, 12.0, 9.8, 10.2, 11.1]))', out_lines: ['[9.8, 10.2, 10.5]'] },
        { label: 'Only two times', call: 'print(podium([15.0, 14.2]))', out_lines: ['[14.2, 15.0]'] },
        { label: 'The original doesn\'t change', call: 't = [3, 1, 2, 5]\npodium(t)\nprint(t)', out_lines: ['[3, 1, 2, 5]'] },
      ],
      misconceptions: [
        { out_lines: ['[12.0, 11.1, 10.5]'], title: 'Backwards', msg: 'The winner is whoever takes the least time: sort from lowest to highest (without reverse).' },
        { out_lines: ['[1, 2, 3, 5]'], title: 'You\'ve changed the original', msg: 'sort changes the list the function receives. Use sorted, which creates a new one.' },
      ],
      logic_msg: 'Check with the five times: the podium is 9.8, 10.2 and 10.5.',
    },
    hints: [
      { level: 'Orientation', text: 'One line is enough: sort a copy and cut it.' },
      { level: 'Reasoning', text: 'sorted returns a new list; a slice [:3] keeps the first 3 (or fewer if there aren\'t that many).' },
      { level: 'Pseudocode', text: 'return (times sorted from lowest to highest)[:3]', pre: true },
      { level: 'Technical help', text: '`return sorted(times)[:3]`.' },
    ],
    solution: {
      code: 'def podium(times):\n    """Return the 3 best (lowest) times, without changing the list."""\n    return sorted(times)[:3]\n\nprint(podium([10.5, 12.0, 9.8, 10.2, 11.1]))',
      explanation: 'sorted creates a sorted copy and the slice [:3] keeps the first three. With fewer than three items, the slice simply returns the ones there are.',
    },
    reference: ['def podium(times):\n    return sorted(times)[:3]'],
    wrongs: [
      { code: 'def podium(times):\n    times.sort()\n    return times[:3]', category: 'comprension' },
      { code: 'def podium(times):\n    return sorted(times, reverse=True)[:3]', category: 'comprension' },
      { code: 'def podium(times):\n    t = sorted(times)\n    return [t[0], t[1], t[2]]', category: 'ejecucion' },
    ],
  },
};
