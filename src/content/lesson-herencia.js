// Lección 12.3 · Herencia. Contenido original, alineado con el cap. 17 de «Piensa en
// Python» (herencia, sobrescribir métodos, polimorfismo) y PE2 módulo 3 (super,
// isinstance).

const TOPIC = 'Clases';

export const LESSON_HERENCIA = {
  id: 'herencia',
  moduleId: 'm12',
  code: '12.3',
  title: 'Herencia',
  minutes: 35,
  bonusXp: 35,
  objectives: [
    'Crear una clase hija que hereda atributos y métodos de una clase madre',
    'Añadir atributos propios llamando a super().__init__',
    'Sobrescribir un método para cambiar su comportamiento',
    'Aprovechar el polimorfismo: tratar igual a objetos de clases distintas',
    'Comprobar el tipo de un objeto con isinstance',
  ],
  prerequisites: ['Lección 12.2 «Métodos»'],
  teaser: 'Un perro y un gato tienen mucho en común: son animales. La herencia te permite escribir lo común una vez y lo particular en cada clase.',
  celebration: 'Has completado el Módulo 12: ya diseñas programas con clases, métodos y herencia, la base de la programación orientada a objetos.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'heredar', title: 'Heredar de otra clase', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'Con `class Hija(Madre):`, la clase hija **hereda** todo lo que tiene la madre: sus atributos y sus métodos. Después puede añadir los suyos.' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def presentarse(self):\n        return f"Soy {self.nombre}"\n\nclass Perro(Animal):\n    def ladrar(self):\n        return "¡Guau!"\n\ntoby = Perro("Toby")\nprint(toby.presentarse())   # heredado de Animal\nprint(toby.ladrar())        # propio de Perro' },
        {
          type: 'check', id: 'm12h-heredar', concept: 'herencia', mode: 'choice',
          question: '¿Qué ocurre?', code: 'class Vehiculo:\n    def ruedas(self):\n        return 4\n\nclass Coche(Vehiculo):\n    pass\n\nprint(Coche().ruedas())', expectOutput: '4',
          options: [
            { text: 'Muestra 4', correct: true },
            { text: 'AttributeError: Coche no tiene ruedas', why: 'Coche hereda de Vehiculo: tiene todos sus métodos aunque no los escriba.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'super', title: 'Añadir atributos con super()', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'Si la hija necesita datos propios, define su propio `__init__`. Para no repetir lo que ya hace la madre, la llama con `super().__init__(…)`:' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nclass Gato(Animal):\n    def __init__(self, nombre, vidas=7):\n        super().__init__(nombre)   # la madre guarda el nombre\n        self.vidas = vidas         # la hija añade lo suyo\n\nmichi = Gato("Michi")\nprint(michi.nombre, michi.vidas)' },
        { type: 'callout', tone: 'warn', title: 'Si olvidas super().__init__', text: 'El __init__ de la hija sustituye al de la madre. Si no la llamas, los atributos que guardaba la madre (aquí, nombre) no existirán: AttributeError.' },
        {
          type: 'check', id: 'm12h-super', concept: 'herencia', mode: 'choice',
          question: '¿Qué ocurre?', code: 'class Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\nclass Alumna(Persona):\n    def __init__(self, nombre, curso):\n        self.curso = curso\n\nprint(Alumna("Eva", 2).nombre)', expectError: 'AttributeError',
          options: [
            { text: 'AttributeError: nombre no se ha guardado', correct: true },
            { text: 'Muestra Eva', why: 'El __init__ de Alumna no llama al de Persona, así que nadie guarda self.nombre. Falta super().__init__(nombre).' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sobrescribir', title: 'Sobrescribir métodos', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: 'Si la hija define un método con el **mismo nombre** que la madre, el suyo **sustituye** al heredado. Así cada clase puede reaccionar a su manera:' },
        { type: 'code', run: true, code: 'class Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def sonido(self):\n        return "..."\n\n    def hablar(self):\n        return f"{self.nombre} dice {self.sonido()}"\n\nclass Perro(Animal):\n    def sonido(self):\n        return "guau"\n\nclass Gato(Animal):\n    def sonido(self):\n        return "miau"\n\nprint(Perro("Toby").hablar())\nprint(Gato("Michi").hablar())\nprint(Animal("Pez").hablar())', caption: 'hablar está solo en Animal, pero llama a self.sonido(): se usa la versión de la clase del objeto.' },
        {
          type: 'check', id: 'm12h-override', concept: 'herencia', mode: 'text',
          question: 'Predice:', code: 'class A:\n    def saludo(self):\n        return "hola"\n\nclass B(A):\n    def saludo(self):\n        return "buenas"\n\nprint(A().saludo(), B().saludo())', answer: 'hola buenas',
          explain: 'B sobrescribe saludo; A conserva el suyo.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'polimorfismo', title: 'Polimorfismo e isinstance', concepts: ['herencia'],
      blocks: [
        { type: 'p', text: '**Polimorfismo**: si varias clases tienen el mismo método, puedes recorrer objetos de clases distintas y llamarlo sin preguntar de qué clase es cada uno. Cada objeto responde a su manera:' },
        { type: 'code', run: true, code: 'import math\n\nclass Figura:\n    def area(self):\n        return 0\n\nclass Cuadrado(Figura):\n    def __init__(self, lado):\n        self.lado = lado\n    def area(self):\n        return self.lado ** 2\n\nclass Circulo(Figura):\n    def __init__(self, radio):\n        self.radio = radio\n    def area(self):\n        return math.pi * self.radio ** 2\n\nfiguras = [Cuadrado(2), Circulo(1), Cuadrado(3)]\nprint(round(sum([f.area() for f in figuras]), 2))\nprint(isinstance(figuras[1], Circulo), isinstance(figuras[1], Figura))' },
        { type: 'callout', tone: 'info', title: 'isinstance y la herencia', text: '`isinstance(obj, Clase)` es True si obj es de esa clase **o de una hija**. Un Círculo es también una Figura.' },
        {
          type: 'check', id: 'm12h-isinstance', concept: 'herencia', mode: 'text',
          question: 'Predice:', code: 'class Animal:\n    pass\n\nclass Perro(Animal):\n    pass\n\nt = Perro()\nprint(isinstance(t, Perro), isinstance(t, Animal), isinstance(Animal(), Perro))', answer: 'True True False',
          explain: 'Un Perro es un Animal, pero un Animal cualquiera no es necesariamente un Perro.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'her-predict' },
    { id: 'a2', activity: 'her-complete' },
    { id: 'a3', activity: 'her-fix' },
    { id: 'a4', activity: 'her-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`class Hija(Madre):` hereda los atributos y métodos de la madre.',
    'Si la hija tiene su propio `__init__`, llama a `super().__init__(…)` para que la madre guarde lo suyo.',
    'Un método con el mismo nombre en la hija **sobrescribe** el de la madre.',
    '**Polimorfismo**: objetos de clases distintas responden al mismo método cada uno a su manera.',
    '`isinstance(obj, Clase)` es True también para objetos de clases hijas.',
  ],
};

export const ACTIVITIES_HERENCIA = {
  'her-predict': {
    id: 'her-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Empleados', difficulty: 3, xp: 15, concepts: ['herencia'],
    prompt: 'Una clase madre, una hija que sobrescribe un método y un método que llama a otro. **¿Qué mostrará?**',
    code: 'class Empleado:\n    def __init__(self, nombre, sueldo):\n        self.nombre = nombre\n        self.sueldo = sueldo\n\n    def extra(self):\n        return 0\n\n    def total(self):\n        return self.sueldo + self.extra()\n\nclass Jefa(Empleado):\n    def extra(self):\n        return 500\n\nplantilla = [Empleado("Ana", 1500), Jefa("Eva", 2000)]\nfor p in plantilla:\n    print(p.nombre, p.total())',
    expectedOutput: 'Ana 1500\nEva 2500',
    options: [
      { text: 'Ana 1500 / Eva 2500', correct: true },
      { text: 'Ana 1500 / Eva 2000', concept: 'herencia', why: 'total() llama a self.extra(), y para una Jefa se usa su versión: 500.' },
      { text: 'Ana 2000 / Eva 2500', concept: 'herencia', why: 'Ana es una Empleado normal: su extra() devuelve 0.' },
      { text: 'Un error: Jefa no tiene __init__ ni total', concept: 'herencia', why: 'Jefa los hereda de Empleado.' },
    ],
    explain: ['Ana: 1500 + extra() de Empleado (0) = 1500.', 'Eva: 2000 + extra() de Jefa (500) = 2500.'],
  },
  'her-complete': {
    id: 'her-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Libros y ebooks', difficulty: 2, xp: 15, concepts: ['herencia'],
    statement: 'Completa la clase `Ebook`, que hereda de `Libro` y añade el atributo `megas` (tamaño del archivo).',
    expected: 'Nada 300 2.5',
    starter: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n\nclass Ebook(___):\n    def __init__(self, titulo, paginas, megas):\n        ___().__init__(titulo, paginas)\n        self.___ = megas\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.titulo, e.paginas, e.megas)',
    spec: {
      blanks: true,
      allow_short_names: ['e'],
      classes: [{ name: 'Libro' }, { name: 'Ebook' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Nada 300 2.5'] },
        { label: 'Es un Libro', call: 'print(isinstance(Ebook("X", 1, 1), Libro))', out_lines: ['True'] },
      ],
      logic_msg: 'Ebook debe heredar de Libro, llamar al __init__ de la madre y guardar megas.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: la clase madre entre paréntesis, la función que da acceso a la madre y el nombre del atributo nuevo.' },
      { level: 'Razonamiento', text: '¿De qué clase hereda Ebook? ¿Qué función permite llamar al __init__ de la madre?' },
      { level: 'Pseudocódigo', text: 'class Ebook(Libro):\n    __init__: la madre guarda titulo y paginas\n              self.megas ← megas', pre: true },
      { level: 'Ayuda técnica', text: '`class Ebook(Libro):`, `super().__init__(titulo, paginas)` y `self.megas = megas`.' },
    ],
    solution: {
      code: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n\nclass Ebook(Libro):\n    def __init__(self, titulo, paginas, megas):\n        super().__init__(titulo, paginas)\n        self.megas = megas\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.titulo, e.paginas, e.megas)',
      explanation: 'super().__init__ reutiliza el código de Libro para título y páginas; Ebook solo añade lo que le es propio.',
    },
    reference: ['class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n\nclass Ebook(Libro):\n    def __init__(self, titulo, paginas, megas):\n        super().__init__(titulo, paginas)\n        self.megas = megas\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.titulo, e.paginas, e.megas)'],
    wrongs: [
      { code: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n\nclass Ebook(___):\n    def __init__(self, titulo, paginas, megas):\n        ___().__init__(titulo, paginas)\n        self.___ = megas', category: 'incompleto' },
      { code: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n\nclass Ebook(Libro):\n    def __init__(self, titulo, paginas, megas):\n        self.megas = megas\n\ne = Ebook("Nada", 300, 2.5)\nprint(e.titulo, e.paginas, e.megas)', category: 'ejecucion' },
    ],
  },
  'her-fix': {
    id: 'her-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La cuenta de ahorro sin titular', difficulty: 2, xp: 20, concepts: ['herencia', 'errores'],
    statement: '`CuentaAhorro` hereda de `Cuenta` y añade un interés, pero al mostrar el titular aparece un **AttributeError**. Corrígelo.',
    expected: 'Ana 0 2',
    starter: 'class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\nclass CuentaAhorro(Cuenta):\n    def __init__(self, titular, interes):\n        self.interes = interes\n\nc = CuentaAhorro("Ana", 2)\nprint(c.titular, c.saldo, c.interes)',
    spec: {
      allow_short_names: ['c'],
      classes: [{ name: 'Cuenta' }, { name: 'CuentaAhorro' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Ana 0 2'] },
        { label: 'Otra cuenta', call: 'c = CuentaAhorro("Leo", 3)\nc.saldo += 100\nprint(c.titular, c.saldo, c.interes)', out_lines: ['Leo 100 3'] },
      ],
      logic_msg: 'La cuenta de ahorro debe tener titular, saldo (0 al empezar) e interés.',
    },
    hints: [
      { level: 'Orientación', text: 'El __init__ de CuentaAhorro sustituye al de Cuenta. ¿Quién guarda ahora titular y saldo?' },
      { level: 'Razonamiento', text: 'Hay que llamar al __init__ de la madre desde el de la hija.' },
      { level: 'Pseudocódigo', text: 'super().__init__(titular)\nself.interes ← interes', pre: true },
      { level: 'Ayuda técnica', text: 'Añade `super().__init__(titular)` como primera línea del __init__ de CuentaAhorro.' },
    ],
    solution: {
      code: 'class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\nclass CuentaAhorro(Cuenta):\n    def __init__(self, titular, interes):\n        super().__init__(titular)\n        self.interes = interes\n\nc = CuentaAhorro("Ana", 2)\nprint(c.titular, c.saldo, c.interes)',
      explanation: 'Al definir su propio __init__, la hija tapa el de la madre. Llamándolo con super(), la madre vuelve a guardar titular y saldo, y la hija añade el interés.',
    },
    reference: ['class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\nclass CuentaAhorro(Cuenta):\n    def __init__(self, titular, interes):\n        super().__init__(titular)\n        self.interes = interes\n\nc = CuentaAhorro("Ana", 2)\nprint(c.titular, c.saldo, c.interes)'],
    wrongs: [
      { code: 'class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\nclass CuentaAhorro(Cuenta):\n    def __init__(self, titular, interes):\n        self.interes = interes\n\nc = CuentaAhorro("Ana", 2)\nprint(c.titular, c.saldo, c.interes)', category: 'ejecucion' },
      { code: 'class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\nclass CuentaAhorro(Cuenta):\n    def __init__(self, titular, interes):\n        self.titular = titular\n        self.interes = interes\n\nc = CuentaAhorro("Ana", 2)\nprint(c.titular, c.saldo, c.interes)', category: 'ejecucion' },
    ],
  },
  'her-build': {
    id: 'her-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Figuras y áreas', difficulty: 3, xp: 35, concepts: ['herencia', 'listas'],
    unlock: { any: ['her-predict', 'her-complete', 'her-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define:\n\n• Una clase `Figura` con un método `area()` que devuelve 0 y un método `descripcion()` que devuelve `"<nombre de la clase>: <área con 2 decimales>"`, usando `type(self).__name__` para el nombre.\n\n• Dos clases hijas, `Rectangulo(ancho, alto)` y `Triangulo(base, altura)`, que sobrescriben `area()`.\n\n• Una función `area_total(figuras)` que devuelve la suma de las áreas de una lista de figuras, redondeada a 2 decimales.',
    expected: 'Rectangulo: 6.00',
    plan: [
      {
        q: '¿Dónde va el método descripcion()?',
        options: [
          { text: 'Solo en Figura: las hijas lo heredan y usará su propio area()', correct: true },
          { text: 'En cada clase hija', why: 'Funcionaría, pero repetirías el mismo código. Al llamar a self.area() desde Figura, cada objeto usa su versión.' },
        ],
      },
      {
        q: '¿Qué hace area_total con cada figura?',
        options: [
          { text: 'Llama a figura.area() sin preguntar de qué clase es', correct: true },
          { text: 'Comprueba con isinstance si es rectángulo o triángulo', why: 'No hace falta: gracias al polimorfismo, cada figura sabe calcular su área.' },
        ],
      },
    ],
    planScaffold: 'class Figura:\n    def area(self):\n        return 0\n\n    def descripcion(self):\n        pass\n\n\nclass Rectangulo(Figura):\n    pass\n\n\nclass Triangulo(Figura):\n    pass\n\n\ndef area_total(figuras):\n    pass\n\n\nprint(Rectangulo(2, 3).descripcion())\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'], // el / 2 del triángulo y round(…, 2) no son números mágicos
      classes: [{ name: 'Figura' }, { name: 'Rectangulo' }, { name: 'Triangulo' }],
      functions: [{ name: 'area_total', params: 1 }],
      cases: [
        { label: 'Descripción de un rectángulo', call: 'print(Rectangulo(2, 3).descripcion())', out_lines: ['Rectangulo: 6.00'] },
        { label: 'Descripción de un triángulo', call: 'print(Triangulo(5, 3).descripcion())', out_lines: ['Triangulo: 7.50'] },
        { label: 'Área total', call: 'print(area_total([Rectangulo(2, 3), Triangulo(4, 1), Figura()]))', out_lines: ['8.0'] },
        { label: 'Herencia', call: 'print(isinstance(Triangulo(1, 1), Figura))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['Rectangulo: 0.00'], title: 'No se sobrescribe area', msg: 'Rectangulo tiene que definir su propio método area() que devuelva ancho × alto.' },
        { out_lines: ['Triangulo: 15.00'], title: 'El área del triángulo', msg: 'El área de un triángulo es base × altura / 2.' },
      ],
      logic_msg: 'Comprueba: un rectángulo 2 × 3 tiene área 6 y un triángulo de base 5 y altura 3, 7.5.',
    },
    hints: [
      { level: 'Orientación', text: 'Cuatro piezas: Figura (con dos métodos), dos hijas (con __init__ y area) y una función.' },
      { level: 'Razonamiento', text: 'descripcion() se escribe una sola vez en Figura y llama a self.area(): cada objeto usará la suya. Las hijas solo necesitan guardar sus medidas y calcular el área.' },
      { level: 'Pseudocódigo', text: 'Figura.descripcion: devolver f"{nombre de la clase}: {self.area():.2f}"\nRectangulo: __init__(ancho, alto); area = ancho × alto\nTriangulo: __init__(base, altura); area = base × altura / 2\narea_total: devolver redondear(suma de f.area() para cada f, 2)', pre: true },
      { level: 'Ayuda técnica', text: '`return f"{type(self).__name__}: {self.area():.2f}"`. Para el total, un acumulador con un for.' },
    ],
    solution: {
      code: 'class Figura:\n    def area(self):\n        return 0\n\n    def descripcion(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangulo(Figura):\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def area(self):\n        return self.ancho * self.alto\n\nclass Triangulo(Figura):\n    def __init__(self, base, altura):\n        self.base = base\n        self.altura = altura\n\n    def area(self):\n        return self.base * self.altura / 2\n\ndef area_total(figuras):\n    total = 0\n    for figura in figuras:\n        total += figura.area()\n    return round(total, 2)\n\nprint(Rectangulo(2, 3).descripcion())',
      explanation: 'descripcion y area_total no saben qué figuras existen: les basta con que cada una tenga area(). Para añadir un Círculo, solo habría que crear la clase; nada más cambia.',
    },
    reference: [
      'class Figura:\n    def area(self):\n        return 0\n\n    def descripcion(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangulo(Figura):\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def area(self):\n        return self.ancho * self.alto\n\nclass Triangulo(Figura):\n    def __init__(self, base, altura):\n        self.base = base\n        self.altura = altura\n\n    def area(self):\n        return self.base * self.altura / 2\n\ndef area_total(figuras):\n    return round(sum(f.area() for f in figuras), 2)',
    ],
    wrongs: [
      { code: 'class Figura:\n    def area(self):\n        return 0\n\n    def descripcion(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangulo(Figura):\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\nclass Triangulo(Figura):\n    def __init__(self, base, altura):\n        self.base = base\n        self.altura = altura\n\n    def area(self):\n        return self.base * self.altura / 2\n\ndef area_total(figuras):\n    return round(sum(f.area() for f in figuras), 2)', category: 'comprension' },
      { code: 'class Figura:\n    def area(self):\n        return 0\n\n    def descripcion(self):\n        return f"{type(self).__name__}: {self.area():.2f}"\n\nclass Rectangulo(Figura):\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def area(self):\n        return self.ancho * self.alto\n\nclass Triangulo:\n    def __init__(self, base, altura):\n        self.base = base\n        self.altura = altura\n\n    def area(self):\n        return self.base * self.altura / 2\n\ndef area_total(figuras):\n    return round(sum(f.area() for f in figuras), 2)', category: 'ejecucion' },
    ],
  },
};
