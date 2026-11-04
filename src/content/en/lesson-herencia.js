// Lesson 12.3 · Inheritance (English translation of src/content/lesson-herencia.js).

const TOPIC = 'Classes';

export const LESSON_HERENCIA = {
  id: 'herencia',
  moduleId: 'm12',
  code: '12.3',
  title: 'Inheritance',
  minutes: 35,
  bonusXp: 35,
  objectives: [
    'Create a child class that inherits attributes and methods from a parent class',
    'Add your own attributes by calling super().__init__',
    'Override a method to change its behaviour',
    'Make use of polymorphism: treat objects of different classes the same way',
    'Check an object\'s type with isinstance',
  ],
  prerequisites: ['Lesson 12.2 «Methods»'],
  teaser: 'A dog and a cat have a lot in common: they\'re animals. Inheritance lets you write what they share once and what\'s particular in each class.',
  celebration: 'You\'ve completed Module 12: you now design programs with classes, methods and inheritance, the basis of object-oriented programming.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'heredar', title: 'Inheriting from another class', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'With `class Child(Parent):`, the child class **inherits** everything the parent has: its attributes and its methods. Then it can add its own.' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def introduce(self):\n        return f"I\'m {self.name}"\n\nclass Dog(Animal):\n    def bark(self):\n        return "Woof!"\n\ntoby = Dog("Toby")\nprint(toby.introduce())   # inherited from Animal\nprint(toby.bark())        # Dog\'s own' },
        {
          type: 'check', id: 'm12h-heredar', concept: 'herencia', mode: 'choice',
          question: 'What happens?', code: 'class Vehicle:\n    def wheels(self):\n        return 4\n\nclass Car(Vehicle):\n    pass\n\nprint(Car().wheels())', expectOutput: '4',
          options: [
            { text: 'It shows 4', correct: true },
            { text: 'AttributeError: Car has no wheels', why: 'Car inherits from Vehicle: it has all its methods even though it doesn\'t write them.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'super', title: 'Adding attributes with super()', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'If the child needs its own data, it defines its own `__init__`. So as not to repeat what the parent already does, it calls it with `super().__init__(…)`:' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Cat(Animal):\n    def __init__(self, name, lives=7):\n        super().__init__(name)   # the parent stores the name\n        self.lives = lives       # the child adds its own\n\nkitty = Cat("Kitty")\nprint(kitty.name, kitty.lives)' },
        { type: 'callout', tone: 'warn', title: 'If you forget super().__init__', text: 'The child\'s __init__ replaces the parent\'s. If you don\'t call it, the attributes the parent stored (here, name) won\'t exist: AttributeError.' },
        {
          type: 'check', id: 'm12h-super', concept: 'herencia', mode: 'choice',
          question: 'What happens?', code: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Student(Person):\n    def __init__(self, name, year):\n        self.year = year\n\nprint(Student("Eva", 2).name)', expectError: 'AttributeError',
          options: [
            { text: 'AttributeError: name hasn\'t been stored', correct: true },
            { text: 'It shows Eva', why: 'Student\'s __init__ doesn\'t call Person\'s, so nobody stores self.name. super().__init__(name) is missing.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sobrescribir', title: 'Overriding methods', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'If the child defines a method with the **same name** as the parent, its own **replaces** the inherited one. That way each class can react in its own way:' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def sound(self):\n        return "..."\n\n    def speak(self):\n        return f"{self.name} says {self.sound()}"\n\nclass Dog(Animal):\n    def sound(self):\n        return "woof"\n\nclass Cat(Animal):\n    def sound(self):\n        return "meow"\n\nprint(Dog("Toby").speak())\nprint(Cat("Kitty").speak())\nprint(Animal("Fish").speak())', caption: 'speak is only in Animal, but it calls self.sound(): the version from the object\'s class is used.' },
        {
          type: 'check', id: 'm12h-override', concept: 'herencia', mode: 'text',
          question: 'Predict:', code: 'class A:\n    def greeting(self):\n        return "hello"\n\nclass B(A):\n    def greeting(self):\n        return "hiya"\n\nprint(A().greeting(), B().greeting())', answer: 'hello hiya',
          explain: 'B overrides greeting; A keeps its own.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'polimorfismo', title: 'Polymorphism and isinstance', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: '**Polymorphism**: if several classes have the same method, you can go through objects of different classes and call it without asking which class each one is. Each object responds in its own way:' },
        { type: 'code', run: true, code: 'import math\n\nclass Shape:\n    def area(self):\n        return 0\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    def area(self):\n        return math.pi * self.radius ** 2\n\nshapes = [Square(2), Circle(1), Square(3)]\nprint(round(sum([s.area() for s in shapes]), 2))\nprint(isinstance(shapes[1], Circle), isinstance(shapes[1], Shape))' },
        { type: 'callout', tone: 'info', title: 'isinstance and inheritance', text: '`isinstance(obj, Class)` is True if obj is of that class **or of a child**. A Circle is also a Shape.' },
        {
          type: 'check', id: 'm12h-isinstance', concept: 'herencia', mode: 'text',
          question: 'Predict:', code: 'class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nt = Dog()\nprint(isinstance(t, Dog), isinstance(t, Animal), isinstance(Animal(), Dog))', answer: 'True True False',
          explain: 'A Dog is an Animal, but any old Animal isn\'t necessarily a Dog.',
        },
      ],
    },
    // ------------------------------------------------------------------ practice
    { id: 'a1', activity: 'her-predict' },
    { id: 'a2', activity: 'her-complete' },
    { id: 'a3', activity: 'her-fix' },
    { id: 'a4', activity: 'her-build' },
    { id: 'fin', title: 'Summary', summary: true },
  ],
  summary: [
    '`class Child(Parent):` inherits the parent\'s attributes and methods.',
    'If the child has its own `__init__`, call `super().__init__(…)` so the parent stores its part.',
    'A method with the same name in the child **overrides** the parent\'s.',
    '**Polymorphism**: objects of different classes each respond to the same method in their own way.',
    '`isinstance(obj, Class)` is True for objects of child classes too.',
  ],
};

export const ACTIVITIES_HERENCIA = {
  'her-predict': {
    id: 'her-predict', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Employees', difficulty: 3, xp: 15, concepts: ['herencia'],
    prompt: 'A parent class, a child that overrides a method and a method that calls another. **What will it show?**',
    code: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n\n    def bonus(self):\n        return 0\n\n    def total(self):\n        return self.salary + self.bonus()\n\nclass Boss(Employee):\n    def bonus(self):\n        return 500\n\nstaff = [Employee("Ana", 1500), Boss("Eva", 2000)]\nfor p in staff:\n    print(p.name, p.total())',
    expectedOutput: 'Ana 1500\nEva 2500',
    options: [
      { text: 'Ana 1500 / Eva 2500', correct: true },
      { text: 'Ana 1500 / Eva 2000', concept: 'herencia', why: 'total() calls self.bonus(), and for a Boss its own version is used: 500.' },
      { text: 'Ana 2000 / Eva 2500', concept: 'herencia', why: 'Ana is an ordinary Employee: her bonus() returns 0.' },
      { text: 'An error: Boss has no __init__ or total', concept: 'herencia', why: 'Boss inherits them from Employee.' },
    ],
    explain: ['Ana: 1500 + Employee\'s bonus() (0) = 1500.', 'Eva: 2000 + Boss\'s bonus() (500) = 2500.'],
  },
  'her-complete': {
    id: 'her-complete', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'Books and ebooks', difficulty: 2, xp: 15, concepts: ['herencia'],
    statement: 'Complete the `Ebook` class, which inherits from `Book` and adds the attribute `megabytes` (file size).',
    expected: 'Nada 300 2.5',
    starter: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nclass Ebook(___):\n    def __init__(self, title, pages, megabytes):\n        ___().__init__(title, pages)\n        self.___ = megabytes\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.title, e.pages, e.megabytes)',
    spec: {
      blanks: true,
      allow_short_names: ['e'],
      classes: [{ name: 'Book' }, { name: 'Ebook' }],
      cases: [
        { label: 'Whole program', out_lines: ['Nada 300 2.5'] },
        { label: 'It\'s a Book', call: 'print(isinstance(Ebook("X", 1, 1), Book))', out_lines: ['True'] },
      ],
      logic_msg: 'Ebook must inherit from Book, call the parent\'s __init__ and store megabytes.',
    },
    hints: [
      { level: 'Orientation', text: 'Three blanks: the parent class in brackets, the function that gives access to the parent and the name of the new attribute.' },
      { level: 'Reasoning', text: 'Which class does Ebook inherit from? Which function lets you call the parent\'s __init__?' },
      { level: 'Pseudocode', text: 'class Ebook(Book):\n    __init__: the parent stores title and pages\n              self.megabytes ← megabytes', pre: true },
      { level: 'Technical help', text: '`class Ebook(Book):`, `super().__init__(title, pages)` and `self.megabytes = megabytes`.' },
    ],
    solution: {
      code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nclass Ebook(Book):\n    def __init__(self, title, pages, megabytes):\n        super().__init__(title, pages)\n        self.megabytes = megabytes\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.title, e.pages, e.megabytes)',
      explanation: 'super().__init__ reuses Book\'s code for title and pages; Ebook only adds what\'s its own.',
    },
    reference: ['class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nclass Ebook(Book):\n    def __init__(self, title, pages, megabytes):\n        super().__init__(title, pages)\n        self.megabytes = megabytes\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.title, e.pages, e.megabytes)'],
    wrongs: [
      { code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nclass Ebook(___):\n    def __init__(self, title, pages, megabytes):\n        ___().__init__(title, pages)\n        self.___ = megabytes', category: 'incompleto' },
      { code: 'class Book:\n    def __init__(self, title, pages):\n        self.title = title\n        self.pages = pages\n\nclass Ebook(Book):\n    def __init__(self, title, pages, megabytes):\n        self.megabytes = megabytes\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.title, e.pages, e.megabytes)', category: 'ejecucion' },
    ],
  },
  'her-fix': {
    id: 'her-fix', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The savings account with no holder', difficulty: 2, xp: 20, concepts: ['herencia', 'errores'],
    statement: '`SavingsAccount` inherits from `Account` and adds an interest rate, but when showing the holder an **AttributeError** appears. Fix it.',
    expected: 'Ana 0 2',
    starter: 'class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\nclass SavingsAccount(Account):\n    def __init__(self, holder, interest):\n        self.interest = interest\n\nc = SavingsAccount("Ana", 2)\nprint(c.holder, c.balance, c.interest)',
    spec: {
      allow_short_names: ['c'],
      classes: [{ name: 'Account' }, { name: 'SavingsAccount' }],
      cases: [
        { label: 'Whole program', out_lines: ['Ana 0 2'] },
        { label: 'Another account', call: 'c = SavingsAccount("Leo", 3)\nc.balance += 100\nprint(c.holder, c.balance, c.interest)', out_lines: ['Leo 100 3'] },
      ],
      logic_msg: 'The savings account must have a holder, a balance (0 to start) and an interest rate.',
    },
    hints: [
      { level: 'Orientation', text: 'SavingsAccount\'s __init__ replaces Account\'s. Who stores holder and balance now?' },
      { level: 'Reasoning', text: 'You need to call the parent\'s __init__ from the child\'s.' },
      { level: 'Pseudocode', text: 'super().__init__(holder)\nself.interest ← interest', pre: true },
      { level: 'Technical help', text: 'Add `super().__init__(holder)` as the first line of SavingsAccount\'s __init__.' },
    ],
    solution: {
      code: 'class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\nclass SavingsAccount(Account):\n    def __init__(self, holder, interest):\n        super().__init__(holder)\n        self.interest = interest\n\nc = SavingsAccount("Ana", 2)\nprint(c.holder, c.balance, c.interest)',
      explanation: 'By defining its own __init__, the child hides the parent\'s. Calling it with super(), the parent stores holder and balance again, and the child adds the interest.',
    },
    reference: ['class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\nclass SavingsAccount(Account):\n    def __init__(self, holder, interest):\n        super().__init__(holder)\n        self.interest = interest\n\nc = SavingsAccount("Ana", 2)\nprint(c.holder, c.balance, c.interest)'],
    wrongs: [
      { code: 'class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\nclass SavingsAccount(Account):\n    def __init__(self, holder, interest):\n        self.interest = interest\n\nc = SavingsAccount("Ana", 2)\nprint(c.holder, c.balance, c.interest)', category: 'ejecucion' },
      { code: 'class Account:\n    def __init__(self, holder):\n        self.holder = holder\n        self.balance = 0\n\nclass SavingsAccount(Account):\n    def __init__(self, holder, interest):\n        self.holder = holder\n        self.interest = interest\n\nc = SavingsAccount("Ana", 2)\nprint(c.holder, c.balance, c.interest)', category: 'ejecucion' },
    ],
  },
  'her-build': {
    id: 'her-build', type: 'code', variant: 'build', kindLabel: 'Build from scratch', topic: TOPIC,
    title: 'Shapes and areas', difficulty: 3, xp: 35, concepts: ['herencia', 'listas'],
    unlock: { any: ['her-predict', 'her-complete', 'her-fix'], count: 2, text: 'Pass at least 2 of the earlier activities in the lesson' },
    statement: 'Define:\n\n• A class `Shape` with a method `area()` that returns 0 and a method `description()` that returns `"<class name>: <area with 2 decimal places>"`, using `type(self).__name__` for the name.\n\n• Two child classes, `Rectangle(width, height)` and `Triangle(base, height)`, that override `area()`.\n\n• A function `total_area(shapes)` that returns the sum of the areas of a list of shapes, rounded to 2 decimal places.',
    expected: 'Rectangle: 6.00',
    plan: [
      {
        q: 'Where does the description() method go?',
        options: [
          { text: 'Only in Shape: the children inherit it and it will use their own area()', correct: true },
          { text: 'In each child class', why: 'It would work, but you\'d repeat the same code. By calling self.area() from Shape, each object uses its own version.' },
        ],
      },
      {
        q: 'What does total_area do with each shape?',
        options: [
          { text: 'Calls shape.area() without asking which class it is', correct: true },
          { text: 'Checks with isinstance whether it\'s a rectangle or a triangle', why: 'There\'s no need: thanks to polymorphism, each shape knows how to work out its area.' },
        ],
      },
    ],
    planScaffold: 'class Shape:\n    def area(self):\n        return 0\n\n    def description(self):\n        pass\n\n\nclass Rectangle(Shape):\n    pass\n\n\nclass Triangle(Shape):\n    pass\n\n\ndef total_area(shapes):\n    pass\n\n\nprint(Rectangle(2, 3).description())\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'], // the triangle's / 2 and round(…, 2) aren't magic numbers
      classes: [{ name: 'Shape' }, { name: 'Rectangle' }, { name: 'Triangle' }],
      functions: [{ name: 'total_area', params: 1 }],
      cases: [
        { label: 'Description of a rectangle', call: 'print(Rectangle(2, 3).description())', out_lines: ['Rectangle: 6.00'] },
        { label: 'Description of a triangle', call: 'print(Triangle(5, 3).description())', out_lines: ['Triangle: 7.50'] },
        { label: 'Total area', call: 'print(total_area([Rectangle(2, 3), Triangle(4, 1), Shape()]))', out_lines: ['8.0'] },
        { label: 'Inheritance', call: 'print(isinstance(Triangle(1, 1), Shape))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['Rectangle: 0.00'], title: 'area isn\'t overridden', msg: 'Rectangle has to define its own area() method that returns width × height.' },
        { out_lines: ['Triangle: 15.00'], title: 'The triangle\'s area', msg: 'The area of a triangle is base × height / 2.' },
      ],
      logic_msg: 'Check: a 2 × 3 rectangle has area 6 and a triangle with base 5 and height 3, 7.5.',
    },
    hints: [
      { level: 'Orientation', text: 'Four pieces: Shape (with two methods), two children (with __init__ and area) and a function.' },
      { level: 'Reasoning', text: 'description() is written just once in Shape and calls self.area(): each object will use its own. The children only need to store their measurements and work out the area.' },
      { level: 'Pseudocode', text: 'Shape.description: return f"{class name}: {self.area():.2f}"\nRectangle: __init__(width, height); area = width × height\nTriangle: __init__(base, height); area = base × height / 2\ntotal_area: return round(sum of s.area() for each s, 2)', pre: true },
      { level: 'Technical help', text: '`return f"{type(self).__name__}: {self.area():.2f}"`. For the total, an accumulator with a for.' },
    ],
    solution: {
      code: 'class Shape:\n    def area(self):\n        return 0\n\n    def description(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n\n    def area(self):\n        return self.base * self.height / 2\n\ndef total_area(shapes):\n    total = 0\n    for shape in shapes:\n        total += shape.area()\n    return round(total, 2)\n\nprint(Rectangle(2, 3).description())',
      explanation: 'description and total_area don\'t know which shapes exist: it\'s enough for them that each one has area(). To add a Circle, you\'d only have to create the class; nothing else changes.',
    },
    reference: [
      'class Shape:\n    def area(self):\n        return 0\n\n    def description(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n\n    def area(self):\n        return self.base * self.height / 2\n\ndef total_area(shapes):\n    return round(sum(s.area() for s in shapes), 2)',
    ],
    wrongs: [
      { code: 'class Shape:\n    def area(self):\n        return 0\n\n    def description(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\nclass Triangle(Shape):\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n\n    def area(self):\n        return self.base * self.height / 2\n\ndef total_area(shapes):\n    return round(sum(s.area() for s in shapes), 2)', category: 'comprension' },
      { code: 'class Shape:\n    def area(self):\n        return 0\n\n    def description(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height\n\nclass Triangle:\n    def __init__(self, base, height):\n        self.base = base\n        self.height = height\n\n    def area(self):\n        return self.base * self.height / 2\n\ndef total_area(shapes):\n    return round(sum(s.area() for s in shapes), 2)', category: 'ejecucion' },
    ],
  },
};
