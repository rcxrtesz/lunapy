// Lesson 13.1 · Debugging strategies (English translation of src/content/lesson-depuracion.js).

const TOPIC = 'Debugging';

export const LESSON_DEPURACION = {
  id: 'depuracion',
  moduleId: 'm13',
  code: '13.1',
  title: 'Debugging strategies',
  minutes: 35,
  bonusXp: 35,
  objectives: [
    'Identify whether an error is a syntax, runtime or logic error, and what to do in each case',
    'Read a traceback with several calls down to the guilty line',
    'Debug methodically: observe, form a hypothesis and test it',
    'Check functions automatically with assert',
    'Test the edge cases',
  ],
  prerequisites: ['Module 12 (recommended)'],
  teaser: 'Last module: you\'ve spent the whole course fixing errors. Today you organise them into a method you can use with any program.',
  celebration: 'You now debug methodically: you read the error, form hypotheses, test with assert and think about the edge cases.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'familias', title: 'Three families of errors', concepts: ['depuracion'],
      blocks: [
        {
          type: 'five', items: {
            'Syntax': 'Python doesn\'t understand how it\'s written and doesn\'t start running. Look at the line shown… and the one before (unclosed brackets or quotes).',
            'Runtime': 'The program stops halfway (NameError, TypeError, IndexError…). Read the type, the message and the line.',
            'Logic': 'There\'s no error message, but the result is wrong. It\'s the hardest: you have to investigate.',
          },
        },
        {
          type: 'classify', id: 'm13d-familias', concept: 'depuracion',
          question: 'Is it a logic error (the program works but gives a wrong result)?',
          items: [
            { text: 'The average of 4 and 6 comes out as 7.0', valid: true, why: 'There\'s no error message: it calculates wrongly (probably a missing bracket).' },
            { text: 'NameError: name \'totl\' is not defined', valid: false, why: 'It\'s a runtime error: Python stops when it can\'t find the name.' },
            { text: 'The colon at the end of the def is missing', valid: false, why: 'It\'s a syntax error: the program doesn\'t even start.' },
            { text: 'The discount program overcharges members', valid: true, why: 'It works without errors, but it does something different from what it should.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'traceback', title: 'Reading an error with several calls', concepts: ['depuracion', 'errores'],
      blocks: [
        { type: 'p', text: 'When the error happens inside a function called from another, Python shows the **chain of calls** (the *traceback*). The most important clue is **at the end**: the type of error and the line where it happened.' },
        { type: 'code', run: true, code: 'def average(marks):\n    return sum(marks) / len(marks)\n\ndef report(student, marks):\n    return f"{student}: {average(marks):.2f}"\n\nprint(report("Ana", [7, 8]))\nprint(report("Leo", []))' },
        { type: 'callout', tone: 'tip', title: 'From the bottom up', text: 'The error goes off in average (dividing by zero), but the cause is whoever called it with an empty list. First read where it happens and then ask yourself where that data comes from.' },
        {
          type: 'check', id: 'm13d-causa', concept: 'depuracion', mode: 'choice',
          question: 'In that example, what\'s the best fix?',
          options: [
            { text: 'Have average check whether the list is empty and deal with it (for example, returning None)', correct: true },
            { text: 'Delete Leo\'s line', why: 'It hides the symptom, but the function will fail again the next time it receives an empty list.' },
            { text: 'Change / to //', why: 'Dividing by zero fails just the same with // .' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: 'Debugging methodically', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: 'With logic errors, changing things at random almost never works. What works is thinking like a scientist:' },
        {
          type: 'five', items: {
            '1 · Observe': 'What comes out and what should come out? Look for the smallest case that fails.',
            '2 · Hypothesis': '«I think the total is reset on each pass».',
            '3 · Experiment': 'A print of an intermediate value, the step-by-step viewer or an assert.',
            '4 · Conclusion': 'If the hypothesis was right, fix it; if not, form another one.',
          },
        },
        { type: 'callout', tone: 'info', title: 'The rubber duck', text: 'Explaining the code line by line out loud (to someone, or to a rubber duck) forces you to notice what it really does, not what you think it does. It\'s surprising how often the error turns up halfway through the explanation.' },
        {
          type: 'check', id: 'm13d-metodo', concept: 'depuracion', mode: 'choice',
          question: 'A 30-line function gives a wrong result. What do you do first?',
          options: [
            { text: 'Look for the smallest example that fails and show intermediate values', correct: true },
            { text: 'Rewrite it completely in another way', why: 'You could repeat the same mistake. First understand where it is.' },
            { text: 'Change lines until it comes out right', why: 'Without a hypothesis, you might «fix» one case and break others.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'assert', title: 'Checking with assert', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: '`assert condition` does nothing if the condition is true, and stops the program with an **AssertionError** if it\'s false. It\'s perfect for writing **tests** for your functions that run by themselves:' },
        { type: 'code', run: true, code: 'def is_even(n):\n    return n % 2 == 0\n\nassert is_even(4)\nassert not is_even(7)\nassert is_even(0)\nprint("All the tests pass")' },
        { type: 'p', text: 'If a test fails, you know straight away which case doesn\'t work. Add a message to make it even clearer:' },
        { type: 'code', run: true, code: 'def double(x):\n    return x * 3        # logic error\n\nassert double(2) == 4, "double(2) should be 4"\nprint("ok")' },
        {
          type: 'check', id: 'm13d-assert', concept: 'depuracion', mode: 'choice',
          question: 'What happens?', code: 'def area(a, b):\n    return a * b\n\nassert area(2, 3) == 6\nassert area(0, 5) == 0\nprint("Tests passed")', expectOutput: 'Tests passed',
          options: [
            { text: 'It shows «Tests passed»', correct: true },
            { text: 'AssertionError', why: 'Both conditions are true: 2 × 3 = 6 and 0 × 5 = 0.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'limites', title: 'Edge cases', concepts: ['depuracion'],
      blocks: [
        { type: 'p', text: 'Many errors only appear with «odd» data. Before calling a function good, test it with:' },
        {
          type: 'five', items: {
            'Empty': 'Empty list, empty text, empty dictionary.',
            'Just one': 'A list with one item.',
            'Zero and negatives': '0, −1, very large numbers.',
            'Right on the limit': 'If the rule is «≥ 5», test with 5 and with 4.99.',
          },
        },
        {
          type: 'check', id: 'm13d-limite', concept: 'depuracion', mode: 'choice',
          question: 'You\'re testing `passes(marks)`, which counts the marks of 5 or more. Which list best detects a `>` where `>=` should have been?',
          options: [
            { text: '[5]', correct: true },
            { text: '[9, 8]', why: 'With marks far from the limit, > and >= give the same.' },
            { text: '[2, 3]', why: 'It doesn\'t tell them apart either: no mark reaches 5.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'dep-predict' },
    { id: 'a2', activity: 'dep-complete' },
    { id: 'a3', activity: 'dep-fix' },
    { id: 'a4', activity: 'dep-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'Syntax (doesn\'t start), runtime (stops) and logic (wrong result): each one calls for a strategy.',
    'In a traceback, the main clue is at the end: type of error and line. Then look for where the data comes from.',
    'Debug methodically: observe, form a hypothesis, test it (print, viewer, assert) and conclude.',
    '`assert condition, "message"` checks assumptions and is used to write automatic tests.',
    'Always test the edge cases: empty, just one, zero, negatives and right on the limit.',
  ],
};

export const ACTIVITIES_DEPURACION = {
  'dep-predict': {
    id: 'dep-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Scaffolding prints', difficulty: 2, xp: 10, concepts: ['depuracion'],
    prompt: 'Someone has added a print to investigate. **What will it show?**',
    code: 'def average(v):\n    total = 0\n    for x in v:\n        total += x\n        print("total:", total)\n    return total / len(v)\n\nprint(average([4, 6, 2]))',
    expectedOutput: 'total: 4\ntotal: 10\ntotal: 12\n4.0',
    options: [
      { text: 'total: 4, total: 10, total: 12 and then 4.0', correct: true },
      { text: 'Only 4.0', concept: 'depuracion', why: 'The print is inside the loop: it runs on every pass, before the result.' },
      { text: 'total: 12 and then 4.0', concept: 'depuracion', why: 'The print is inside the loop, not after it: it shows the total after each addition.' },
      { text: 'total: 4, total: 6, total: 2 and then 4.0', concept: 'bucles', why: 'It shows the running total, not each item.' },
    ],
    explain: ['Pass 1: total = 4. Pass 2: 10. Pass 3: 12.', 'Then, 12 / 3 = 4.0.'],
  },
  'dep-complete': {
    id: 'dep-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Write the tests', difficulty: 2, xp: 15, concepts: ['depuracion'],
    statement: 'The `maximum` function is already written. Complete the asserts with the **correct result** for each case, edge cases included.',
    expected: 'All the tests pass',
    starter: 'def maximum(items):\n    biggest = items[0]\n    for x in items:\n        if x > biggest:\n            biggest = x\n    return biggest\n\nassert maximum([3, 9, 2]) == ___\nassert maximum([-5, -2, -8]) == ___     # all negative\nassert maximum([7]) == ___              # a single item\nprint("All the tests pass")',
    spec: {
      blanks: true,
      skip_tips: ['repeated_numbers'],
      cases: [{ label: 'Whole program', out_lines: ['All the tests pass'] }],
      logic_msg: 'Work out the maximum of each list by hand.',
    },
    hints: [
      { level: 'Orientation', text: 'Each blank is the value maximum should return for that list.' },
      { level: 'Reasoning', text: 'Among negative numbers, the biggest is the one closest to zero.' },
      { level: 'Pseudocode', text: '[3, 9, 2] → 9\n[-5, -2, -8] → -2\n[7] → 7', pre: true },
      { level: 'Technical help', text: '`== 9`, `== -2` and `== 7`.' },
    ],
    solution: {
      code: 'def maximum(items):\n    biggest = items[0]\n    for x in items:\n        if x > biggest:\n            biggest = x\n    return biggest\n\nassert maximum([3, 9, 2]) == 9\nassert maximum([-5, -2, -8]) == -2     # all negative\nassert maximum([7]) == 7              # a single item\nprint("All the tests pass")',
      explanation: 'The all-negative case checks that biggest doesn\'t start at 0 (a common mistake); the single-item one, that the loop works even when there\'s nothing else to compare.',
    },
    reference: ['def maximum(items):\n    biggest = items[0]\n    for x in items:\n        if x > biggest:\n            biggest = x\n    return biggest\n\nassert maximum([3, 9, 2]) == 9\nassert maximum([-5, -2, -8]) == -2\nassert maximum([7]) == 7\nprint("All the tests pass")'],
    wrongs: [
      { code: 'def maximum(items):\n    biggest = items[0]\n    for x in items:\n        if x > biggest:\n            biggest = x\n    return biggest\n\nassert maximum([3, 9, 2]) == ___\nprint("All the tests pass")', category: 'incompleto' },
      { code: 'def maximum(items):\n    biggest = items[0]\n    for x in items:\n        if x > biggest:\n            biggest = x\n    return biggest\n\nassert maximum([3, 9, 2]) == 9\nassert maximum([-5, -2, -8]) == -8\nassert maximum([7]) == 7\nprint("All the tests pass")', category: 'ejecucion' },
    ],
  },
  'dep-fix': {
    id: 'dep-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The failing tests', difficulty: 3, xp: 25, concepts: ['depuracion', 'bucles'],
    statement: '`count_greater(items, limit)` should count how many items are **strictly greater** than the limit. The tests at the end fail: use the AssertionErrors to locate the **two** errors and fix them (don\'t change the asserts).',
    expected: 'OK',
    starter: 'def count_greater(items, limit):\n    count = 1\n    for x in items:\n        if x >= limit:\n            count += 1\n    return count\n\nassert count_greater([], 5) == 0, "empty list"\nassert count_greater([5, 6, 7], 5) == 2, "the limit doesn\'t count"\nassert count_greater([1, 2], 5) == 0, "none greater"\nprint("OK")',
    spec: {
      functions: [{ name: 'count_greater', params: 2 }],
      cases: [
        { label: 'Whole program', out_lines: ['OK'] },
        { label: 'count_greater([10, 20, 30], 15)', call: 'print(count_greater([10, 20, 30], 15))', out_lines: ['2'] },
      ],
      rules: [{ type: 'must_call', name: 'count_greater', title: 'Keep the tests', msg: 'Don\'t delete the asserts: fix the function so it passes them.' }],
      logic_msg: 'The function must count only the items strictly greater than the limit, starting from 0.',
    },
    hints: [
      { level: 'Orientation', text: 'Run it and read the message of the assert that fails: «empty list». With an empty list the loop doesn\'t go round at all… what does it return?' },
      { level: 'Reasoning', text: 'The counter starts at the wrong value. When you fix that, «the limit doesn\'t count» will fail: check the comparison operator.' },
      { level: 'Pseudocode', text: 'count ← 0\nfor each x: if x > limit: count + 1', pre: true },
      { level: 'Technical help', text: '`count = 0` and `if x > limit:`.' },
    ],
    solution: {
      code: 'def count_greater(items, limit):\n    count = 0\n    for x in items:\n        if x > limit:\n            count += 1\n    return count\n\nassert count_greater([], 5) == 0, "empty list"\nassert count_greater([5, 6, 7], 5) == 2, "the limit doesn\'t count"\nassert count_greater([1, 2], 5) == 0, "none greater"\nprint("OK")',
      explanation: 'Each assert points to an edge case: the empty list gives away that the counter doesn\'t start at 0, and the exact limit (5) gives away the >= that should have been >.',
    },
    reference: ['def count_greater(items, limit):\n    count = 0\n    for x in items:\n        if x > limit:\n            count += 1\n    return count\n\nassert count_greater([], 5) == 0, "empty list"\nassert count_greater([5, 6, 7], 5) == 2, "the limit doesn\'t count"\nassert count_greater([1, 2], 5) == 0, "none greater"\nprint("OK")'],
    wrongs: [
      { code: 'def count_greater(items, limit):\n    count = 1\n    for x in items:\n        if x >= limit:\n            count += 1\n    return count\n\nassert count_greater([], 5) == 0, "empty list"\nassert count_greater([5, 6, 7], 5) == 2, "the limit doesn\'t count"\nassert count_greater([1, 2], 5) == 0, "none greater"\nprint("OK")', category: 'ejecucion' },
      { code: 'def count_greater(items, limit):\n    count = 0\n    for x in items:\n        if x >= limit:\n            count += 1\n    return count\n\nassert count_greater([], 5) == 0, "empty list"\nassert count_greater([5, 6, 7], 5) == 2, "the limit doesn\'t count"\nassert count_greater([1, 2], 5) == 0, "none greater"\nprint("OK")', category: 'ejecucion' },
    ],
  },
  'dep-build': {
    id: 'dep-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'A median with no surprises', difficulty: 3, xp: 35, concepts: ['depuracion', 'listas'],
    unlock: { any: ['dep-predict', 'dep-complete', 'dep-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'The **median** is the middle value of a sorted list. If there\'s an even number of items, it\'s the average of the two middle ones. Define `median(items)` that:\n\n• returns the median without changing the original list,\n\n• returns `None` if the list is empty.\n\nExamples: `[3, 1, 2]` → 2; `[4, 1, 3, 2]` → 2.5. Write your own asserts for the edge cases before checking.',
    expected: '2',
    plan: [
      {
        q: 'Which edge cases should you test?', multi: true,
        options: [
          { text: 'Empty list', correct: true },
          { text: 'A single item', correct: true },
          { text: 'An even number of items', correct: true },
          { text: 'That the original list doesn\'t change', correct: true },
        ],
      },
      {
        q: 'With 4 sorted items, which positions are the middle ones?',
        options: [
          { text: '1 and 2 (n // 2 − 1 and n // 2)', correct: true },
          { text: '2 and 3', why: 'Positions start at 0: with 4 items (0, 1, 2, 3) the middle ones are 1 and 2.' },
        ],
      },
    ],
    planScaffold: 'def median(items):\n    # empty case\n    # sort a copy\n    # odd: the middle one; even: average of the two middle ones\n    pass\n\n\nassert median([3, 1, 2]) == 2\nprint("ok")\n',
    starter: '',
    spec: {
      allow_short_names: ['n'],
      skip_tips: ['repeated_numbers'], // the 2 for the half and for even/odd is part of the definition
      functions: [{ name: 'median', params: 1 }],
      cases: [
        { label: 'Odd: [3, 1, 2]', call: 'print(median([3, 1, 2]))', out_lines: ['2'] },
        { label: 'Even: [4, 1, 3, 2]', call: 'print(median([4, 1, 3, 2]))', out_lines: ['2.5'] },
        { label: 'Empty', call: 'print(median([]))', out_lines: ['None'] },
        { label: 'A single item', call: 'print(median([7]))', out_lines: ['7'] },
        { label: 'The original doesn\'t change', call: 'v = [3, 1, 2]\nmedian(v)\nprint(v)', out_lines: ['[3, 1, 2]'] },
      ],
      misconceptions: [
        { out_lines: ['1'], title: 'Have you sorted?', msg: 'The median is worked out on the **sorted** list: use sorted(items).' },
        { out_lines: ['[1, 2, 3]'], title: 'You\'ve changed the original', msg: 'sort() changes the list the function receives. Use sorted(), which returns a copy.' },
        { out_lines: ['3'], title: 'Check the middle ones', msg: 'With an even number of items, the median is the average of positions n // 2 − 1 and n // 2.' },
      ],
      logic_msg: 'Check the edge cases: empty, one item and an even number of items.',
    },
    hints: [
      { level: 'Orientation', text: 'Three steps: the empty case, sorting a copy and deciding between even and odd.' },
      { level: 'Reasoning', text: 'With n sorted items: if n is odd, the middle one is at n // 2; if it\'s even, average n // 2 − 1 and n // 2.' },
      { level: 'Pseudocode', text: 'if the list is empty: return None\nv ← sorted(items); n ← len(v); m ← n // 2\nif n is odd: return v[m]\nreturn (v[m − 1] + v[m]) / 2', pre: true },
      { level: 'Technical help', text: '`if not items: return None`, `if n % 2 == 1: return v[m]` and `return (v[m - 1] + v[m]) / 2`.' },
    ],
    solution: {
      code: 'def median(items):\n    """Return the median of items (None if it\'s empty), without changing it."""\n    if not items:\n        return None\n    ordered = sorted(items)\n    n = len(ordered)\n    half = n // 2\n    if n % 2 == 1:\n        return ordered[half]\n    return (ordered[half - 1] + ordered[half]) / 2\n\nassert median([3, 1, 2]) == 2\nassert median([4, 1, 3, 2]) == 2.5\nassert median([]) is None\nassert median([7]) == 7\nprint("All the tests pass")',
      explanation: 'Each assert watches over an edge case. With them you can change the function later, safe in the knowledge that if you break something, you\'ll know at once.',
    },
    reference: [
      'def median(items):\n    if not items:\n        return None\n    ordered = sorted(items)\n    n = len(ordered)\n    half = n // 2\n    if n % 2 == 1:\n        return ordered[half]\n    return (ordered[half - 1] + ordered[half]) / 2',
    ],
    wrongs: [
      { code: 'def median(items):\n    if not items:\n        return None\n    items.sort()\n    n = len(items)\n    half = n // 2\n    if n % 2 == 1:\n        return items[half]\n    return (items[half - 1] + items[half]) / 2', category: 'comprension' },
      { code: 'def median(items):\n    ordered = sorted(items)\n    n = len(ordered)\n    half = n // 2\n    if n % 2 == 1:\n        return ordered[half]\n    return (ordered[half - 1] + ordered[half]) / 2', category: 'ejecucion' },
    ],
  },
};
