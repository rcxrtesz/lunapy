// Lesson 12.1 · Classes and objects (English translation of src/content/lesson-clases.js).

const TOPIC = 'Classes';

export const LESSON_CLASES = {
  id: 'clases',
  moduleId: 'm12',
  code: '12.1',
  title: 'Classes and objects',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explain what a class is and what an object (instance) is',
    'Define a class with __init__ and store attributes in self',
    'Create objects and read or change their attributes',
    'Pass objects to functions',
    'Recognise the mistake of forgetting self.',
  ],
  prerequisites: ['Module 11 «Files and data handling»'],
  teaser: 'You\'re starting Module 12: until now you used types that came with Python (int, str, list…). Today you create your own.',
  celebration: 'You now know how to create your own data types: classes with attributes and objects that store them.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'Made-to-measure types', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'Imagine you manage books. You could store each one in separate variables or in a tuple `("Hopscotch", "Cortázar", 1963)`… but remembering which position each piece of data is in gets messy. A **class** lets you create a new type, `Book`, with data that has **names**: `book.title`, `book.author`…' },
        {
          type: 'five', items: {
            'Class': 'The mould or template: it describes what data a book has.',
            'Object (instance)': 'A specific book created from the mould. There can be many.',
            'Attribute': 'A piece of data each object stores: `book.title`.',
          },
        },
        {
          type: 'check', id: 'm12c-idea', concept: 'clases', mode: 'choice',
          question: 'In a recipe app, what would be a class and what an object?',
          options: [
            { text: 'Class: Recipe. Object: the specific recipe for the omelette', correct: true },
            { text: 'Class: the omelette. Object: Recipe', why: 'It\'s the other way round: the class is the general mould (Recipe) and each specific recipe is an object.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'init', title: 'Defining a class', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'A class is defined with `class` and a name that, by convention, starts with a **capital letter**. The special method `__init__` runs when each object is created and stores its data in **self**, which represents the object being created.' },
        { type: 'code', run: true, code: 'class Book:\n    def __init__(self, title, author, pages):\n        self.title = title\n        self.author = author\n        self.pages = pages\n\nmy_book = Book("Hopscotch", "Julio Cortázar", 600)\nother = Book("Nada", "Carmen Laforet", 300)\nprint(my_book.title, "-", my_book.author)\nprint(other.pages)' },
        { type: 'callout', tone: 'info', title: 'And self?', text: 'When you write `Book("Hopscotch", …)`, Python creates an empty object and calls `__init__` passing it as `self`. That\'s why `self.title = title` stores the title **in that object**. You don\'t pass self: Python does.' },
        {
          type: 'check', id: 'm12c-init', concept: 'clases', mode: 'text',
          question: 'Predict:', code: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Point(3, 4)\nq = Point(10, 0)\nprint(p.x + q.x, p.y)', answer: '13 4',
          explain: 'Each object has its own attributes: p.x is 3 and q.x is 10.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mutables', title: 'Objects can be changed', concepts: ['clases', 'alias'],
      blocks: [
        { type: 'p', text: 'Attributes can be read and also **changed**. And as with lists, if two variables point to the same object, the changes are seen from both.' },
        { type: 'code', run: true, code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n        self.read = 0          # attribute with a starting value\n\nbook = Book("Nada", 300)\nbook.read = 120\nprint(book.read, "of", book.pages)\n\nalias = book\nalias.read = 300\nprint(book.read)' },
        {
          type: 'check', id: 'm12c-alias', concept: 'clases', mode: 'text',
          question: 'Predict:', code: 'class Box:\n    def __init__(self):\n        self.contents = 0\n\na = Box()\nb = a\nb.contents = 5\nc = Box()\nprint(a.contents, c.contents)', answer: '5 0',
          explain: 'a and b are the same object; c is a different box, with its own contents.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Objects in functions', concepts: ['clases', 'parametros'],
      blocks: [
        { type: 'p', text: 'An object can be passed to a function like any other value. The function reads (or changes) its attributes:' },
        { type: 'code', run: true, code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n        self.read = 0\n\ndef progress(book):\n    return round(book.read / book.pages * 100)\n\nnada = Book("Nada", 300)\nnada.read = 75\nprint(f"{nada.title}: {progress(nada)} %")' },
        { type: 'callout', tone: 'tip', title: 'Methods are coming', text: 'A function that works with a specific type of object usually fits better **inside** the class, as a method. That\'s what you\'ll see in the next lesson.' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'self', title: 'The mistake of forgetting self.', concepts: ['clases', 'errores'],
      blocks: [
        { type: 'p', text: 'Inside `__init__`, if you write `title = title` instead of `self.title = title`, you create a **local** variable that disappears at the end. The object is left without the attribute:' },
        { type: 'code', run: true, code: 'class Book:\n    def __init__(self, title):\n        title = title        # self. is missing!\n\nbook = Book("Nada")\nprint(book.title)' },
        {
          type: 'check', id: 'm12c-self', concept: 'clases', mode: 'choice',
          question: 'What happens?', code: 'class Dog:\n    def __init__(self, name):\n        name = name\n\nprint(Dog("Toby").name)', expectError: 'AttributeError',
          options: [
            { text: 'AttributeError: the object doesn\'t have the attribute name', correct: true },
            { text: 'It shows Toby', why: 'Without self., the name is stored in a local variable, not in the object.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'cla-predict' },
    { id: 'a2', activity: 'cla-complete' },
    { id: 'a3', activity: 'cla-fix' },
    { id: 'a4', activity: 'cla-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A **class** is a mould for creating objects; each **object** (instance) has its own data.',
    '`class Name:` with an `__init__(self, …)` that stores the data in `self.attribute = value`.',
    'Objects are created by calling the class: `Book("Nada", 300)`. Python passes self.',
    'Attributes are read and changed with the dot: `book.read = 120`.',
    'Without `self.`, the data stays in a local variable and the object doesn\'t have it (AttributeError).',
  ],
};

export const ACTIVITIES_CLASES = {
  'cla-predict': {
    id: 'cla-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Two pets', difficulty: 2, xp: 10, concepts: ['clases'],
    prompt: 'Two objects of the same class and an alias. **What will it show?**',
    code: 'class Pet:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\na = Pet("Luna", 3)\nb = Pet("Sol", 5)\nc = a\nc.age += 1\nprint(a.age, b.age, c.name)',
    expectedOutput: '4 5 Luna',
    options: [
      { text: '4 5 Luna', correct: true },
      { text: '3 5 Luna', concept: 'clases', why: 'c is an alias of a: changing c.age changes a.age.' },
      { text: '4 6 Luna', concept: 'clases', why: 'b is another object: it isn\'t affected.' },
      { text: '4 5 c', concept: 'clases', why: 'c.name is the object\'s attribute (the object is a): «Luna».' },
    ],
    explain: ['a and b are different objects; c points to the same one as a.', 'c.age += 1 changes a.age to 4.', 'b still has 5; c.name is «Luna».'],
  },
  'cla-complete': {
    id: 'cla-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'The Product class', difficulty: 2, xp: 15, concepts: ['clases'],
    statement: 'Complete the `Product` class so each object stores its `name`, its `price` and its `units` in stock.',
    expected: 'Notebook 2.5 10',
    starter: 'class Product:\n    def ___(self, name, price, units):\n        self.name = name\n        ___.price = price\n        self.___ = units\n\np = Product("Notebook", 2.5, 10)\nprint(p.name, p.price, p.units)',
    spec: {
      blanks: true,
      allow_short_names: ['p', 'q'],
      classes: [{ name: 'Product' }],
      cases: [
        { label: 'Whole program', out_lines: ['Notebook 2.5 10'] },
        { label: 'Another product', call: 'q = Product("Pen", 0.8, 50)\nprint(q.units * q.price)', out_lines: ['40.0'] },
      ],
      logic_msg: 'Each object must store its three pieces of data with the names name, price and units.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the name of the method that runs when an object is created, the object where the price is stored and the name of the units attribute.' },
      { level: 'Reasoning', text: 'The special creation method has two underscores on each side. Attributes are stored in self.' },
      { level: 'Pseudocode', text: 'define __init__(self, name, price, units):\n    self.name ← name\n    self.price ← price\n    self.units ← units', pre: true },
      { level: 'Technical help', text: '`def __init__(...)`, `self.price = price` and `self.units = units`.' },
    ],
    solution: {
      code: 'class Product:\n    def __init__(self, name, price, units):\n        self.name = name\n        self.price = price\n        self.units = units\n\np = Product("Notebook", 2.5, 10)\nprint(p.name, p.price, p.units)',
      explanation: '__init__ receives the data when the object is created and stores it in self. From outside it\'s read with the dot: p.price.',
    },
    reference: ['class Product:\n    def __init__(self, name, price, units):\n        self.name = name\n        self.price = price\n        self.units = units\n\np = Product("Notebook", 2.5, 10)\nprint(p.name, p.price, p.units)'],
    wrongs: [
      { code: 'class Product:\n    def ___(self, name, price, units):\n        self.name = name\n        ___.price = price\n        self.___ = units', category: 'incompleto' },
      { code: 'class Product:\n    def __init__(self, name, price, units):\n        self.name = name\n        self.price = price\n        self.stock = units\n\np = Product("Notebook", 2.5, 10)\nprint(p.name, p.price, p.units)', category: 'ejecucion' },
    ],
  },
  'cla-fix': {
    id: 'cla-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The student with no data', difficulty: 2, xp: 20, concepts: ['clases', 'errores'],
    statement: 'When you create a `Student` and show their data, an **AttributeError** appears. Read the error and fix the class.',
    expected: 'Eva has 3 marks',
    starter: 'class Student:\n    def __init__(self, name):\n        name = name\n        marks = []\n\neva = Student("Eva")\neva.marks.append(8)\neva.marks.append(7)\neva.marks.append(9)\nprint(eva.name, "has", len(eva.marks), "marks")',
    spec: {
      classes: [{ name: 'Student' }],
      cases: [
        { label: 'Whole program', out_lines: ['Eva has 3 marks'] },
        { label: 'Each student has their own marks', call: 'a = Student("A")\nb = Student("B")\na.marks.append(5)\nprint(len(a.marks), len(b.marks))', out_lines: ['1 0'] },
      ],
      logic_msg: 'Each student must store their name and their own list of marks.',
    },
    hints: [
      { level: 'Orientation', text: 'The error says the object doesn\'t have the attribute. Where are name and marks being stored?' },
      { level: 'Reasoning', text: 'Without self., the two lines in __init__ create local variables that disappear. You need to store them in the object.' },
      { level: 'Pseudocode', text: 'self.name ← name\nself.marks ← empty list', pre: true },
      { level: 'Technical help', text: '`self.name = name` and `self.marks = []`.' },
    ],
    solution: {
      code: 'class Student:\n    def __init__(self, name):\n        self.name = name\n        self.marks = []\n\neva = Student("Eva")\neva.marks.append(8)\neva.marks.append(7)\neva.marks.append(9)\nprint(eva.name, "has", len(eva.marks), "marks")',
      explanation: 'With self., the data is stored in the object. Also, since the list is created inside __init__, each student has their own.',
    },
    reference: ['class Student:\n    def __init__(self, name):\n        self.name = name\n        self.marks = []\n\neva = Student("Eva")\neva.marks.append(8)\neva.marks.append(7)\neva.marks.append(9)\nprint(eva.name, "has", len(eva.marks), "marks")'],
    wrongs: [
      { code: 'class Student:\n    def __init__(self, name):\n        name = name\n        marks = []\n\neva = Student("Eva")\neva.marks.append(8)\neva.marks.append(7)\neva.marks.append(9)\nprint(eva.name, "has", len(eva.marks), "marks")', category: 'ejecucion' },
      { code: 'class Student:\n    def __init__(self, name):\n        self.name = name\n        marks = []\n\neva = Student("Eva")\neva.marks.append(8)\nprint(eva.name, "has", len(eva.marks), "marks")', category: 'ejecucion' },
    ],
  },
  'cla-build': {
    id: 'cla-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The Film class', difficulty: 3, xp: 30, concepts: ['clases', 'parametros'],
    unlock: { any: ['cla-predict', 'cla-complete', 'cla-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define:\n\n• A class `Film` with the attributes `title`, `minutes` and `watched` (which always starts as `False`; it isn\'t passed when creating it).\n\n• A function `duration_text(film)` that returns the duration in the format `"2 h 15 min"`.\n\nExample: `duration_text(Film("Inception", 148))` → `"2 h 28 min"`.',
    expected: '2 h 28 min',
    plan: [
      {
        q: 'What parameters does __init__ have?',
        options: [
          { text: 'self, title and minutes (watched is set to False inside)', correct: true },
          { text: 'self, title, minutes and watched', why: 'watched always starts as False: there\'s no need to pass it, it\'s set inside __init__.' },
        ],
      },
      {
        q: 'How do you work out hours and minutes?',
        options: [
          { text: 'film.minutes // 60 and film.minutes % 60', correct: true },
          { text: 'film.minutes / 60', why: 'That gives hours with decimals. To separate them, // and %.' },
        ],
      },
    ],
    planScaffold: 'class Film:\n    def __init__(self, title, minutes):\n        # store the attributes (watched starts as False)\n        pass\n\n\ndef duration_text(film):\n    # hours and minutes with // and %\n    pass\n\n\nprint(duration_text(Film("Inception", 148)))\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      classes: [{ name: 'Film' }],
      functions: [{ name: 'duration_text', params: 1 }],
      cases: [
        { label: 'Inception, 148 min', call: 'print(duration_text(Film("Inception", 148)))', out_lines: ['2 h 28 min'] },
        { label: 'A 45-minute short', call: 'print(duration_text(Film("Short", 45)))', out_lines: ['0 h 45 min'] },
        { label: 'Attributes', call: 'p = Film("X", 90)\nprint(p.title, p.minutes, p.watched)', out_lines: ['X 90 False'] },
      ],
      misconceptions: [
        { out_lines: ['2.466666666666667 h 28 min'], title: 'Hours with decimals', msg: 'For whole hours use `//`, not `/`.' },
      ],
      logic_msg: 'Check with 148 minutes: 2 h 28 min.',
    },
    hints: [
      { level: 'Orientation', text: 'A class with three attributes (one with a fixed starting value) and a function that reads one of them.' },
      { level: 'Reasoning', text: 'In __init__: self.title, self.minutes and self.watched = False. In the function: read film.minutes and split it with // and %.' },
      { level: 'Pseudocode', text: 'Film.__init__(title, minutes): store both; watched ← False\nduration_text(f): return f"{f.minutes // 60} h {f.minutes % 60} min"', pre: true },
      { level: 'Technical help', text: '`return f"{film.minutes // 60} h {film.minutes % 60} min"`.' },
    ],
    solution: {
      code: 'class Film:\n    def __init__(self, title, minutes):\n        self.title = title\n        self.minutes = minutes\n        self.watched = False\n\ndef duration_text(film):\n    """Return the duration as «X h Y min»."""\n    hours = film.minutes // 60\n    rest = film.minutes % 60\n    return f"{hours} h {rest} min"\n\nprint(duration_text(Film("Inception", 148)))',
      explanation: 'The class groups a film\'s data with clear names. The function receives the whole object and uses only what it needs.',
    },
    reference: [
      'class Film:\n    def __init__(self, title, minutes):\n        self.title = title\n        self.minutes = minutes\n        self.watched = False\n\ndef duration_text(film):\n    return f"{film.minutes // 60} h {film.minutes % 60} min"',
    ],
    wrongs: [
      { code: 'class Film:\n    def __init__(self, title, minutes):\n        self.title = title\n        self.minutes = minutes\n\ndef duration_text(film):\n    return f"{film.minutes // 60} h {film.minutes % 60} min"', category: 'ejecucion' },
      { code: 'class Film:\n    def __init__(self, title, minutes):\n        self.title = title\n        self.minutes = minutes\n        self.watched = False\n\ndef duration_text(film):\n    return f"{film.minutes / 60} h {film.minutes % 60} min"', category: 'comprension' },
    ],
  },
};
