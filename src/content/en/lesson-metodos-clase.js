// Lesson 12.2 · Methods (English translation of src/content/lesson-metodos-clase.js).

const TOPIC = 'Classes';

export const LESSON_METODOS_CLASE = {
  id: 'metodos-clase',
  moduleId: 'm12',
  code: '12.2',
  title: 'Methods',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Define methods: functions that belong to a class',
    'Call a method with object.method() and understand the role of self',
    'Tell apart methods that query (return) from those that change the object',
    'Control how an object is shown with __str__',
    'Protect the object\'s state by validating inside the methods',
  ],
  prerequisites: ['Lesson 12.1 «Classes and objects»'],
  teaser: 'An object doesn\'t just store data: it also knows how to do things with it. Today you give your classes behaviour.',
  celebration: 'Your classes now have data and behaviour: methods that query, that change and that look good with print.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: 'Functions inside the class', concepts: ['clases', 'funciones'],
      blocks: [
        { type: 'p', text: 'A **method** is a function defined **inside** the class. Its first parameter is always `self`: the object it\'s called on. That way, the method can use that object\'s attributes.' },
        { type: 'code', run: true, code: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\n    def is_square(self):\n        return self.width == self.height\n\nr = Rectangle(3, 4)\nprint(r.area(), r.is_square())\nprint(Rectangle(5, 5).is_square())' },
        { type: 'callout', tone: 'info', title: 'r.area() is Rectangle.area(r)', text: 'When you write `r.area()`, Python calls the method passing `r` as self. That\'s why you don\'t write self when calling: it\'s already «in front of the dot».' },
        {
          type: 'check', id: 'm12m-metodo', concept: 'clases', mode: 'text',
          question: 'Predict:', code: 'class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def diameter(self):\n        return self.radius * 2\n\nc = Circle(7)\nprint(c.diameter())', answer: '14',
          explain: 'diameter uses the radius of the object it\'s called on: 7 × 2.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Methods that change the object', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'Some methods **query** (return something without changing the object) and others **change** its state. A bank account is the classic example:' },
        { type: 'code', run: true, code: 'class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\n    def deposit(self, amount):       # changes\n        self.balance += amount\n\n    def withdraw(self, amount):      # changes\n        self.balance -= amount\n\n    def overdrawn(self):             # queries\n        return self.balance < 0\n\nc = Account("Ana")\nc.deposit(100)\nc.withdraw(30)\nprint(c.balance, c.overdrawn())' },
        {
          type: 'check', id: 'm12m-modificar', concept: 'clases', mode: 'text',
          question: 'Predict:', code: 'class Counter:\n    def __init__(self):\n        self.value = 0\n\n    def add(self):\n        self.value += 1\n\nc = Counter()\nc.add()\nc.add()\nd = Counter()\nd.add()\nprint(c.value, d.value)', answer: '2 1',
          explain: 'Each counter keeps its own count: c adds twice and d once.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'str', title: 'Looking good: __str__', concepts: ['clases', 'print'],
      blocks: [
        { type: 'p', text: 'If you do `print(object)`, Python shows something not very useful like `<__main__.Account object at 0x…>`. The special method `__str__` decides which text represents the object:' },
        { type: 'code', run: true, code: 'class Account:\n    def __init__(self, holder, balance=0):\n        self.holder = holder\n        self.balance = balance\n\n    def __str__(self):\n        return f"{self.holder}\'s account: {self.balance:.2f} €"\n\nc = Account("Ana", 75.5)\nprint(c)\nprint("Summary →", str(c))' },
        { type: 'callout', tone: 'tip', title: '__str__ returns, it doesn\'t show', text: '`__str__` has to **return** a text with return. It\'s print that shows it.' },
        {
          type: 'check', id: 'm12m-str', concept: 'clases', mode: 'text',
          question: 'Predict:', code: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nprint(Point(2, -1))', answer: '(2, -1)',
          explain: 'print uses __str__ to know how to show the object.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'proteger', title: 'Methods that protect the state', concepts: ['clases', 'excepciones'],
      blocks: [
        { type: 'p', text: 'One advantage of methods: they can **check** that the change makes sense before making it. That way the object never ends up in an absurd state:' },
        { type: 'code', run: true, code: 'class Account:\n    def __init__(self):\n        self.balance = 0\n\n    def withdraw(self, amount):\n        if amount <= 0:\n            raise ValueError("the amount must be positive")\n        if amount > self.balance:\n            raise ValueError("insufficient funds")\n        self.balance -= amount\n\nc = Account()\nc.balance = 50\nc.withdraw(20)\nprint(c.balance)\ntry:\n    c.withdraw(100)\nexcept ValueError as e:\n    print("Couldn\'t do it:", e)' },
        {
          type: 'check', id: 'm12m-self-param', concept: 'errores', mode: 'choice',
          question: 'What happens?', code: 'class Lamp:\n    def __init__(self):\n        self.on = False\n\n    def switch_on():\n        self.on = True\n\nLamp().switch_on()', expectError: 'TypeError',
          options: [
            { text: 'TypeError: switch_on() receives the object but has no self parameter', correct: true },
            { text: 'It switches on without any problem', why: 'Python always passes the object as the first argument: the method needs the self parameter to receive it.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'mc-predict' },
    { id: 'a2', activity: 'mc-complete' },
    { id: 'a3', activity: 'mc-fix' },
    { id: 'a4', activity: 'mc-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    'A **method** is a function inside the class; its first parameter is `self`.',
    '`object.method(args)` calls the method with that object as self.',
    'There are methods that **query** (return) and methods that **change** the attributes.',
    '`__str__` returns the text that print shows for the object.',
    'Methods can validate and raise exceptions to protect the object\'s state.',
  ],
};

export const ACTIVITIES_METODOS_CLASE = {
  'mc-predict': {
    id: 'mc-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The money box with methods', difficulty: 2, xp: 10, concepts: ['clases'],
    prompt: 'Several methods change the same object. **What will it show?**',
    code: 'class MoneyBox:\n    def __init__(self):\n        self.coins = []\n\n    def put(self, value):\n        self.coins.append(value)\n\n    def total(self):\n        return sum(self.coins)\n\n    def __str__(self):\n        return f"{len(self.coins)} coins, {self.total()} €"\n\nh = MoneyBox()\nh.put(2)\nh.put(1)\nh.put(2)\nprint(h)',
    expectedOutput: '3 coins, 5 €',
    options: [
      { text: '3 coins, 5 €', correct: true },
      { text: '<__main__.MoneyBox object at …>', concept: 'clases', why: 'The class defines __str__, so print shows the text it returns.' },
      { text: '2 coins, 3 €', concept: 'clases', why: 'A coin goes in on each call: three calls, three coins (2 + 1 + 2).' },
      { text: 'An error: total() has no arguments', concept: 'clases', why: 'self.total() calls the method with the same object as self: nothing else is needed.' },
    ],
    explain: ['Three calls to put: coins = [2, 1, 2].', '__str__ uses len and the total method: 3 coins, 5 €.'],
  },
  'mc-complete': {
    id: 'mc-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'A complete rectangle', difficulty: 2, xp: 15, concepts: ['clases'],
    statement: 'Complete the `perimeter` and `__str__` methods of the `Rectangle` class.',
    expected: 'Rectangle 3 x 4\n14',
    starter: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def perimeter(___):\n        return 2 * (self.width + ___.height)\n\n    def __str__(self):\n        ___ f"Rectangle {self.width} x {self.height}"\n\nr = Rectangle(3, 4)\nprint(r)\nprint(r.perimeter())',
    spec: {
      blanks: true,
      allow_short_names: ['r'],
      classes: [{ name: 'Rectangle' }],
      cases: [
        { label: 'Whole program', out_lines: ['Rectangle 3 x 4', '14'] },
        { label: 'Another rectangle', call: 'r = Rectangle(10, 1)\nprint(r.perimeter(), str(r))', out_lines: ['22 Rectangle 10 x 1'] },
      ],
      logic_msg: 'Check the blanks: the self parameter, the object the height is read from and the word that returns the text.',
    },
    hints: [
      { level: 'Orientation', text: 'Two blanks are the object (self) and the third is the word that returns a value.' },
      { level: 'Reasoning', text: 'What is always the first parameter of a method? How does __str__ return its text?' },
      { level: 'Pseudocode', text: 'perimeter(self): return 2 × (self.width + self.height)\n__str__(self): return the text', pre: true },
      { level: 'Technical help', text: '`def perimeter(self):`, `self.height` and `return f"…"`.' },
    ],
    solution: {
      code: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\n    def __str__(self):\n        return f"Rectangle {self.width} x {self.height}"\n\nr = Rectangle(3, 4)\nprint(r)\nprint(r.perimeter())',
      explanation: 'Both methods receive self to access the attributes. __str__ returns the text and print shows it.',
    },
    reference: ['class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\n    def __str__(self):\n        return f"Rectangle {self.width} x {self.height}"\n\nr = Rectangle(3, 4)\nprint(r)\nprint(r.perimeter())'],
    wrongs: [
      { code: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def perimeter(___):\n        return 2 * (self.width + ___.height)\n\n    def __str__(self):\n        ___ f"Rectangle {self.width} x {self.height}"', category: 'incompleto' },
      { code: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def perimeter():\n        return 2 * (self.width + self.height)\n\n    def __str__(self):\n        return f"Rectangle {self.width} x {self.height}"\n\nr = Rectangle(3, 4)\nprint(r)\nprint(r.perimeter())', category: 'ejecucion' },
    ],
  },
  'mc-fix': {
    id: 'mc-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The thermostat that doesn\'t change', difficulty: 2, xp: 20, concepts: ['clases', 'errores'],
    statement: 'The `raise_temp` method should increase the thermostat\'s temperature, but the temperature doesn\'t change. **There\'s no Python error.** Fix it.',
    expected: '21\n23',
    starter: 'class Thermostat:\n    def __init__(self, temperature):\n        self.temperature = temperature\n\n    def raise_temp(self, degrees=1):\n        temperature = self.temperature + degrees\n\nt = Thermostat(20)\nt.raise_temp()\nprint(t.temperature)\nt.raise_temp(2)\nprint(t.temperature)',
    spec: {
      allow_short_names: ['t'],
      classes: [{ name: 'Thermostat' }],
      cases: [
        { label: 'Whole program', out_lines: ['21', '23'] },
        { label: 'Another thermostat', call: 't = Thermostat(15)\nt.raise_temp(5)\nprint(t.temperature)', out_lines: ['20'] },
      ],
      misconceptions: [
        { out_lines: ['20', '20'], title: 'The new value isn\'t stored', msg: 'The sum is stored in a local variable `temperature` that disappears. Store it in the object: `self.temperature += degrees`.' },
      ],
      logic_msg: 'After raising it 1 and then 2 degrees from 20, it must end up at 23.',
    },
    hints: [
      { level: 'Orientation', text: 'Look at the line inside raise_temp: where is the result stored?' },
      { level: 'Reasoning', text: 'Without self., `temperature` is a local variable of the method. To change the object you have to assign to its attribute.' },
      { level: 'Pseudocode', text: 'self.temperature ← self.temperature + degrees', pre: true },
      { level: 'Technical help', text: '`self.temperature += degrees`.' },
    ],
    solution: {
      code: 'class Thermostat:\n    def __init__(self, temperature):\n        self.temperature = temperature\n\n    def raise_temp(self, degrees=1):\n        self.temperature += degrees\n\nt = Thermostat(20)\nt.raise_temp()\nprint(t.temperature)\nt.raise_temp(2)\nprint(t.temperature)',
      explanation: 'Just like in __init__, for a piece of data to belong to the object you have to store it in self. A variable without self. is local to the method.',
    },
    reference: ['class Thermostat:\n    def __init__(self, temperature):\n        self.temperature = temperature\n\n    def raise_temp(self, degrees=1):\n        self.temperature += degrees\n\nt = Thermostat(20)\nt.raise_temp()\nprint(t.temperature)\nt.raise_temp(2)\nprint(t.temperature)'],
    wrongs: [
      { code: 'class Thermostat:\n    def __init__(self, temperature):\n        self.temperature = temperature\n\n    def raise_temp(self, degrees=1):\n        temperature = self.temperature + degrees\n\nt = Thermostat(20)\nt.raise_temp()\nprint(t.temperature)\nt.raise_temp(2)\nprint(t.temperature)', category: 'comprension' },
    ],
  },
  'mc-build': {
    id: 'mc-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'The shopping basket', difficulty: 3, xp: 30, concepts: ['clases', 'diccionarios'],
    unlock: { any: ['mc-predict', 'mc-complete', 'mc-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define a class `Basket` with:\n\n• `__init__`: the basket starts empty (a dictionary product → total price of that product).\n\n• `add(product, price, units=1)`: adds `price × units` to that product.\n\n• `total()`: returns the total amount rounded to 2 decimal places.\n\n• `__str__`: returns `"Basket: N products, T €"`, with N the number of different products and T the total with 2 decimal places.',
    expected: 'Basket: 2 products, 7.50 €',
    plan: [
      {
        q: 'What attribute does the basket need?',
        options: [
          { text: 'A dictionary that starts empty in __init__', correct: true },
          { text: 'A total variable passed when creating it', why: 'The basket starts empty: there\'s no need to pass anything when creating it.' },
        ],
      },
      {
        q: 'If you add the same product twice, what happens?',
        options: [
          { text: 'It\'s added to what there already was of that product (get(product, 0) + …)', correct: true },
          { text: 'The previous value is replaced', why: 'You\'d lose what was added before. Add to the previous value.' },
        ],
      },
    ],
    planScaffold: 'class Basket:\n    def __init__(self):\n        pass\n\n    def add(self, product, price, units=1):\n        pass\n\n    def total(self):\n        pass\n\n    def __str__(self):\n        pass\n\n\nc = Basket()\nc.add("bread", 1.5)\nc.add("coffee", 3, 2)\nprint(c)\n',
    starter: '',
    spec: {
      exact_lines: true,
      classes: [{ name: 'Basket' }],
      cases: [
        { label: 'Bread and two coffees', call: 'c = Basket()\nc.add("bread", 1.5)\nc.add("coffee", 3, 2)\nprint(c)', out_lines: ['Basket: 2 products, 7.50 €'] },
        { label: 'Repeated product', call: 'c = Basket()\nc.add("tea", 1.2)\nc.add("tea", 1.2, 2)\nprint(c.total(), c)', out_lines: ['3.6 Basket: 1 products, 3.60 €'] },
        { label: 'Empty', call: 'print(Basket())', out_lines: ['Basket: 0 products, 0.00 €'] },
        { label: 'Independent baskets', call: 'a = Basket()\nb = Basket()\na.add("x", 1)\nprint(b.total())', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['2.4 Basket: 1 products, 2.40 €'], title: 'The product gets replaced', msg: 'When you add the same product again, add it to what was there: `self.products[p] = self.products.get(p, 0) + price * units`.' },
      ],
      logic_msg: 'Check with bread (1.5) and two coffees (3 each): 2 products and 7.50 €.',
    },
    hints: [
      { level: 'Orientation', text: 'Four short methods. Start with __init__ and add, and test with total before writing __str__.' },
      { level: 'Reasoning', text: 'The dictionary goes in self (self.products = {}). total adds up its values. __str__ uses len of the dictionary and the total method.' },
      { level: 'Pseudocode', text: '__init__: self.products ← {}\nadd: products[p] ← products.get(p, 0) + price × units\ntotal: return round(sum of values, 2)\n__str__: return f"Basket: {len} products, {total:.2f} €"', pre: true },
      { level: 'Technical help', text: '`return round(sum(self.products.values()), 2)` and `return f"Basket: {len(self.products)} products, {self.total():.2f} €"`.' },
    ],
    solution: {
      code: 'class Basket:\n    def __init__(self):\n        self.products = {}\n\n    def add(self, product, price, units=1):\n        self.products[product] = self.products.get(product, 0) + price * units\n\n    def total(self):\n        return round(sum(self.products.values()), 2)\n\n    def __str__(self):\n        return f"Basket: {len(self.products)} products, {self.total():.2f} €"\n\nbasket = Basket()\nbasket.add("bread", 1.5)\nbasket.add("coffee", 3, 2)\nprint(basket)',
      explanation: 'The state (the dictionary) lives in the object and only changes through add. total queries and __str__ reuses total: each method does one thing.',
    },
    reference: [
      'class Basket:\n    def __init__(self):\n        self.products = {}\n\n    def add(self, product, price, units=1):\n        self.products[product] = self.products.get(product, 0) + price * units\n\n    def total(self):\n        return round(sum(self.products.values()), 2)\n\n    def __str__(self):\n        return f"Basket: {len(self.products)} products, {self.total():.2f} €"',
    ],
    wrongs: [
      { code: 'class Basket:\n    def __init__(self):\n        self.products = {}\n\n    def add(self, product, price, units=1):\n        self.products[product] = price * units\n\n    def total(self):\n        return round(sum(self.products.values()), 2)\n\n    def __str__(self):\n        return f"Basket: {len(self.products)} products, {self.total():.2f} €"', category: 'comprension' },
      { code: 'class Basket:\n    def __init__(self):\n        self.products = {}\n\n    def add(self, product, price, units=1):\n        self.products[product] = self.products.get(product, 0) + price * units\n\n    def total(self):\n        return round(sum(self.products.values()), 2)\n\n    def __str__(self):\n        print(f"Basket: {len(self.products)} products, {self.total():.2f} €")', category: 'ejecucion' },
    ],
  },
};
