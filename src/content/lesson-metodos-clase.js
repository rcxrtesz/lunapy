// Lección 12.2 · Métodos. Contenido original, alineado con los caps. 15–16 de
// «Piensa en Python» (métodos, el método __str__, modificadores y funciones puras)
// y PE2 módulo 3.

const TOPIC = 'Clases';

export const LESSON_METODOS_CLASE = {
  id: 'metodos-clase',
  moduleId: 'm12',
  code: '12.2',
  title: 'Métodos',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Definir métodos: funciones que pertenecen a una clase',
    'Llamar a un método con objeto.metodo() y entender el papel de self',
    'Distinguir métodos que consultan (devuelven) de los que modifican el objeto',
    'Controlar cómo se muestra un objeto con __str__',
    'Proteger el estado del objeto validando dentro de los métodos',
  ],
  prerequisites: ['Lección 12.1 «Clases y objetos»'],
  teaser: 'Un objeto no solo guarda datos: también sabe hacer cosas con ellos. Hoy les das comportamiento a tus clases.',
  celebration: 'Tus clases ya tienen datos y comportamiento: métodos que consultan, que modifican y que se presentan bien con print.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'metodo', title: 'Funciones dentro de la clase', concepts: ['clases', 'funciones'],
      blocks: [
        { type: 'p', text: 'Un **método** es una función definida **dentro** de la clase. Su primer parámetro es siempre `self`: el objeto con el que se llama. Así, el método puede usar los atributos de ese objeto.' },
        { type: 'code', run: true, code: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def area(self):\n        return self.ancho * self.alto\n\n    def es_cuadrado(self):\n        return self.ancho == self.alto\n\nr = Rectangulo(3, 4)\nprint(r.area(), r.es_cuadrado())\nprint(Rectangulo(5, 5).es_cuadrado())' },
        { type: 'callout', tone: 'info', title: 'r.area() es Rectangulo.area(r)', text: 'Al escribir `r.area()`, Python llama al método pasando `r` como self. Por eso no escribes self al llamar: ya va «delante del punto».' },
        {
          type: 'check', id: 'm12m-metodo', concept: 'clases', mode: 'text',
          question: 'Predice:', code: 'class Circulo:\n    def __init__(self, radio):\n        self.radio = radio\n\n    def diametro(self):\n        return self.radio * 2\n\nc = Circulo(7)\nprint(c.diametro())', answer: '14',
          explain: 'diametro usa el radio del objeto con el que se llama: 7 × 2.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'modificar', title: 'Métodos que modifican el objeto', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'Algunos métodos **consultan** (devuelven algo sin cambiar el objeto) y otros **modifican** su estado. Una cuenta bancaria es el ejemplo clásico:' },
        { type: 'code', run: true, code: 'class Cuenta:\n    def __init__(self, titular):\n        self.titular = titular\n        self.saldo = 0\n\n    def ingresar(self, cantidad):      # modifica\n        self.saldo += cantidad\n\n    def retirar(self, cantidad):       # modifica\n        self.saldo -= cantidad\n\n    def en_numeros_rojos(self):        # consulta\n        return self.saldo < 0\n\nc = Cuenta("Ana")\nc.ingresar(100)\nc.retirar(30)\nprint(c.saldo, c.en_numeros_rojos())' },
        {
          type: 'check', id: 'm12m-modificar', concept: 'clases', mode: 'text',
          question: 'Predice:', code: 'class Contador:\n    def __init__(self):\n        self.valor = 0\n\n    def sumar(self):\n        self.valor += 1\n\nc = Contador()\nc.sumar()\nc.sumar()\nd = Contador()\nd.sumar()\nprint(c.valor, d.valor)', answer: '2 1',
          explain: 'Cada contador lleva su propia cuenta: c suma dos veces y d una.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'str', title: 'Presentarse bien: __str__', concepts: ['clases', 'print'],
      blocks: [
        { type: 'p', text: 'Si haces `print(objeto)`, Python muestra algo poco útil como `<__main__.Cuenta object at 0x…>`. El método especial `__str__` decide qué texto representa al objeto:' },
        { type: 'code', run: true, code: 'class Cuenta:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def __str__(self):\n        return f"Cuenta de {self.titular}: {self.saldo:.2f} €"\n\nc = Cuenta("Ana", 75.5)\nprint(c)\nprint("Resumen →", str(c))' },
        { type: 'callout', tone: 'tip', title: '__str__ devuelve, no muestra', text: '`__str__` tiene que **devolver** un texto con return. Es print quien lo muestra.' },
        {
          type: 'check', id: 'm12m-str', concept: 'clases', mode: 'text',
          question: 'Predice:', code: 'class Punto:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nprint(Punto(2, -1))', answer: '(2, -1)',
          explain: 'print usa __str__ para saber cómo mostrar el objeto.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'proteger', title: 'Métodos que protegen el estado', concepts: ['clases', 'excepciones'],
      blocks: [
        { type: 'p', text: 'Una ventaja de los métodos: pueden **comprobar** que el cambio tiene sentido antes de hacerlo. Así el objeto nunca queda en un estado absurdo:' },
        { type: 'code', run: true, code: 'class Cuenta:\n    def __init__(self):\n        self.saldo = 0\n\n    def retirar(self, cantidad):\n        if cantidad <= 0:\n            raise ValueError("la cantidad debe ser positiva")\n        if cantidad > self.saldo:\n            raise ValueError("saldo insuficiente")\n        self.saldo -= cantidad\n\nc = Cuenta()\nc.saldo = 50\nc.retirar(20)\nprint(c.saldo)\ntry:\n    c.retirar(100)\nexcept ValueError as e:\n    print("No se pudo:", e)' },
        {
          type: 'check', id: 'm12m-self-param', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre?', code: 'class Lampara:\n    def __init__(self):\n        self.encendida = False\n\n    def encender():\n        self.encendida = True\n\nLampara().encender()', expectError: 'TypeError',
          options: [
            { text: 'TypeError: encender() recibe el objeto pero no tiene parámetro self', correct: true },
            { text: 'Se enciende sin problemas', why: 'Python pasa siempre el objeto como primer argumento: el método necesita el parámetro self para recibirlo.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'mc-predict' },
    { id: 'a2', activity: 'mc-complete' },
    { id: 'a3', activity: 'mc-fix' },
    { id: 'a4', activity: 'mc-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un **método** es una función dentro de la clase; su primer parámetro es `self`.',
    '`objeto.metodo(args)` llama al método con ese objeto como self.',
    'Hay métodos que **consultan** (devuelven) y métodos que **modifican** los atributos.',
    '`__str__` devuelve el texto que print muestra para el objeto.',
    'Los métodos pueden validar y lanzar excepciones para proteger el estado del objeto.',
  ],
};

export const ACTIVITIES_METODOS_CLASE = {
  'mc-predict': {
    id: 'mc-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La hucha con métodos', difficulty: 2, xp: 10, concepts: ['clases'],
    prompt: 'Varios métodos modifican el mismo objeto. **¿Qué mostrará?**',
    code: 'class Hucha:\n    def __init__(self):\n        self.monedas = []\n\n    def meter(self, valor):\n        self.monedas.append(valor)\n\n    def total(self):\n        return sum(self.monedas)\n\n    def __str__(self):\n        return f"{len(self.monedas)} monedas, {self.total()} €"\n\nh = Hucha()\nh.meter(2)\nh.meter(1)\nh.meter(2)\nprint(h)',
    expectedOutput: '3 monedas, 5 €',
    options: [
      { text: '3 monedas, 5 €', correct: true },
      { text: '<__main__.Hucha object at …>', concept: 'clases', why: 'La clase define __str__, así que print muestra el texto que devuelve.' },
      { text: '2 monedas, 3 €', concept: 'clases', why: 'Se mete una moneda en cada llamada: tres llamadas, tres monedas (2 + 1 + 2).' },
      { text: 'Un error: total() no tiene argumentos', concept: 'clases', why: 'self.total() llama al método con el mismo objeto como self: no hace falta nada más.' },
    ],
    explain: ['Tres llamadas a meter: monedas = [2, 1, 2].', '__str__ usa len y el método total: 3 monedas, 5 €.'],
  },
  'mc-complete': {
    id: 'mc-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Rectángulo completo', difficulty: 2, xp: 15, concepts: ['clases'],
    statement: 'Completa los métodos `perimetro` y `__str__` de la clase `Rectangulo`.',
    expected: 'Rectángulo 3 x 4\n14',
    starter: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def perimetro(___):\n        return 2 * (self.ancho + ___.alto)\n\n    def __str__(self):\n        ___ f"Rectángulo {self.ancho} x {self.alto}"\n\nr = Rectangulo(3, 4)\nprint(r)\nprint(r.perimetro())',
    spec: {
      blanks: true,
      allow_short_names: ['r'],
      classes: [{ name: 'Rectangulo' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Rectángulo 3 x 4', '14'] },
        { label: 'Otro rectángulo', call: 'r = Rectangulo(10, 1)\nprint(r.perimetro(), str(r))', out_lines: ['22 Rectángulo 10 x 1'] },
      ],
      logic_msg: 'Revisa los huecos: el parámetro self, el objeto del que se lee el alto y la palabra que devuelve el texto.',
    },
    hints: [
      { level: 'Orientación', text: 'Dos huecos son el objeto (self) y el tercero, la palabra que devuelve un valor.' },
      { level: 'Razonamiento', text: '¿Cuál es siempre el primer parámetro de un método? ¿Cómo devuelve __str__ su texto?' },
      { level: 'Pseudocódigo', text: 'perimetro(self): devolver 2 × (self.ancho + self.alto)\n__str__(self): devolver el texto', pre: true },
      { level: 'Ayuda técnica', text: '`def perimetro(self):`, `self.alto` y `return f"…"`.' },
    ],
    solution: {
      code: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def perimetro(self):\n        return 2 * (self.ancho + self.alto)\n\n    def __str__(self):\n        return f"Rectángulo {self.ancho} x {self.alto}"\n\nr = Rectangulo(3, 4)\nprint(r)\nprint(r.perimetro())',
      explanation: 'Los dos métodos reciben self para acceder a los atributos. __str__ devuelve el texto y print lo muestra.',
    },
    reference: ['class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def perimetro(self):\n        return 2 * (self.ancho + self.alto)\n\n    def __str__(self):\n        return f"Rectángulo {self.ancho} x {self.alto}"\n\nr = Rectangulo(3, 4)\nprint(r)\nprint(r.perimetro())'],
    wrongs: [
      { code: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def perimetro(___):\n        return 2 * (self.ancho + ___.alto)\n\n    def __str__(self):\n        ___ f"Rectángulo {self.ancho} x {self.alto}"', category: 'incompleto' },
      { code: 'class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n\n    def perimetro():\n        return 2 * (self.ancho + self.alto)\n\n    def __str__(self):\n        return f"Rectángulo {self.ancho} x {self.alto}"\n\nr = Rectangulo(3, 4)\nprint(r)\nprint(r.perimetro())', category: 'ejecucion' },
    ],
  },
  'mc-fix': {
    id: 'mc-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El termostato que no cambia', difficulty: 2, xp: 20, concepts: ['clases', 'errores'],
    statement: 'El método `subir` debería aumentar la temperatura del termostato, pero la temperatura no cambia. **No hay error de Python.** Corrígelo.',
    expected: '21\n23',
    starter: 'class Termostato:\n    def __init__(self, temperatura):\n        self.temperatura = temperatura\n\n    def subir(self, grados=1):\n        temperatura = self.temperatura + grados\n\nt = Termostato(20)\nt.subir()\nprint(t.temperatura)\nt.subir(2)\nprint(t.temperatura)',
    spec: {
      allow_short_names: ['t'],
      classes: [{ name: 'Termostato' }],
      cases: [
        { label: 'Programa completo', out_lines: ['21', '23'] },
        { label: 'Otro termostato', call: 't = Termostato(15)\nt.subir(5)\nprint(t.temperatura)', out_lines: ['20'] },
      ],
      misconceptions: [
        { out_lines: ['20', '20'], title: 'El nuevo valor no se guarda', msg: 'La suma se guarda en una variable local `temperatura` que desaparece. Guárdala en el objeto: `self.temperatura += grados`.' },
      ],
      logic_msg: 'Tras subir 1 y después 2 grados desde 20, debe quedar en 23.',
    },
    hints: [
      { level: 'Orientación', text: 'Fíjate en la línea de dentro de subir: ¿dónde se guarda el resultado?' },
      { level: 'Razonamiento', text: 'Sin self., `temperatura` es una variable local del método. Para cambiar el objeto hay que asignar a su atributo.' },
      { level: 'Pseudocódigo', text: 'self.temperatura ← self.temperatura + grados', pre: true },
      { level: 'Ayuda técnica', text: '`self.temperatura += grados`.' },
    ],
    solution: {
      code: 'class Termostato:\n    def __init__(self, temperatura):\n        self.temperatura = temperatura\n\n    def subir(self, grados=1):\n        self.temperatura += grados\n\nt = Termostato(20)\nt.subir()\nprint(t.temperatura)\nt.subir(2)\nprint(t.temperatura)',
      explanation: 'Igual que en __init__, para que un dato pertenezca al objeto hay que guardarlo en self. Una variable sin self. es local al método.',
    },
    reference: ['class Termostato:\n    def __init__(self, temperatura):\n        self.temperatura = temperatura\n\n    def subir(self, grados=1):\n        self.temperatura += grados\n\nt = Termostato(20)\nt.subir()\nprint(t.temperatura)\nt.subir(2)\nprint(t.temperatura)'],
    wrongs: [
      { code: 'class Termostato:\n    def __init__(self, temperatura):\n        self.temperatura = temperatura\n\n    def subir(self, grados=1):\n        temperatura = self.temperatura + grados\n\nt = Termostato(20)\nt.subir()\nprint(t.temperatura)\nt.subir(2)\nprint(t.temperatura)', category: 'comprension' },
    ],
  },
  'mc-build': {
    id: 'mc-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'El carrito de la compra', difficulty: 3, xp: 30, concepts: ['clases', 'diccionarios'],
    unlock: { any: ['mc-predict', 'mc-complete', 'mc-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define una clase `Carrito` con:\n\n• `__init__`: el carrito empieza vacío (un diccionario producto → precio total de ese producto).\n\n• `anadir(producto, precio, unidades=1)`: suma `precio × unidades` a ese producto.\n\n• `total()`: devuelve el importe total redondeado a 2 decimales.\n\n• `__str__`: devuelve `"Carrito: N productos, T €"`, con N el número de productos distintos y T el total con 2 decimales.',
    expected: 'Carrito: 2 productos, 7.50 €',
    plan: [
      {
        q: '¿Qué atributo necesita el carrito?',
        options: [
          { text: 'Un diccionario que empieza vacío en __init__', correct: true },
          { text: 'Una variable total que se pasa al crearlo', why: 'El carrito empieza vacío: no hace falta pasar nada al crearlo.' },
        ],
      },
      {
        q: 'Si añades dos veces el mismo producto, ¿qué pasa?',
        options: [
          { text: 'Se suma a lo que ya había de ese producto (get(producto, 0) + …)', correct: true },
          { text: 'Se sustituye el valor anterior', why: 'Perderías lo añadido antes. Suma al valor anterior.' },
        ],
      },
    ],
    planScaffold: 'class Carrito:\n    def __init__(self):\n        pass\n\n    def anadir(self, producto, precio, unidades=1):\n        pass\n\n    def total(self):\n        pass\n\n    def __str__(self):\n        pass\n\n\nc = Carrito()\nc.anadir("pan", 1.5)\nc.anadir("café", 3, 2)\nprint(c)\n',
    starter: '',
    spec: {
      exact_lines: true,
      classes: [{ name: 'Carrito' }],
      cases: [
        { label: 'Pan y dos cafés', call: 'c = Carrito()\nc.anadir("pan", 1.5)\nc.anadir("café", 3, 2)\nprint(c)', out_lines: ['Carrito: 2 productos, 7.50 €'] },
        { label: 'Repetir producto', call: 'c = Carrito()\nc.anadir("té", 1.2)\nc.anadir("té", 1.2, 2)\nprint(c.total(), c)', out_lines: ['3.6 Carrito: 1 productos, 3.60 €'] },
        { label: 'Vacío', call: 'print(Carrito())', out_lines: ['Carrito: 0 productos, 0.00 €'] },
        { label: 'Carritos independientes', call: 'a = Carrito()\nb = Carrito()\na.anadir("x", 1)\nprint(b.total())', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['2.4 Carrito: 1 productos, 2.40 €'], title: 'Se sustituye el producto', msg: 'Al añadir otra vez el mismo producto, súmalo a lo que había: `self.productos[p] = self.productos.get(p, 0) + precio * unidades`.' },
      ],
      logic_msg: 'Comprueba con pan (1.5) y dos cafés (3 cada uno): 2 productos y 7.50 €.',
    },
    hints: [
      { level: 'Orientación', text: 'Cuatro métodos cortos. Empieza por __init__ y anadir, y prueba con total antes de escribir __str__.' },
      { level: 'Razonamiento', text: 'El diccionario va en self (self.productos = {}). total suma sus valores. __str__ usa len del diccionario y el método total.' },
      { level: 'Pseudocódigo', text: '__init__: self.productos ← {}\nanadir: productos[p] ← productos.get(p, 0) + precio × unidades\ntotal: devolver redondear(suma de valores, 2)\n__str__: devolver f"Carrito: {len} productos, {total:.2f} €"', pre: true },
      { level: 'Ayuda técnica', text: '`return round(sum(self.productos.values()), 2)` y `return f"Carrito: {len(self.productos)} productos, {self.total():.2f} €"`.' },
    ],
    solution: {
      code: 'class Carrito:\n    def __init__(self):\n        self.productos = {}\n\n    def anadir(self, producto, precio, unidades=1):\n        self.productos[producto] = self.productos.get(producto, 0) + precio * unidades\n\n    def total(self):\n        return round(sum(self.productos.values()), 2)\n\n    def __str__(self):\n        return f"Carrito: {len(self.productos)} productos, {self.total():.2f} €"\n\ncarrito = Carrito()\ncarrito.anadir("pan", 1.5)\ncarrito.anadir("café", 3, 2)\nprint(carrito)',
      explanation: 'El estado (el diccionario) vive en el objeto y solo cambia a través de anadir. total consulta y __str__ reutiliza total: cada método hace una cosa.',
    },
    reference: [
      'class Carrito:\n    def __init__(self):\n        self.productos = {}\n\n    def anadir(self, producto, precio, unidades=1):\n        self.productos[producto] = self.productos.get(producto, 0) + precio * unidades\n\n    def total(self):\n        return round(sum(self.productos.values()), 2)\n\n    def __str__(self):\n        return f"Carrito: {len(self.productos)} productos, {self.total():.2f} €"',
    ],
    wrongs: [
      { code: 'class Carrito:\n    def __init__(self):\n        self.productos = {}\n\n    def anadir(self, producto, precio, unidades=1):\n        self.productos[producto] = precio * unidades\n\n    def total(self):\n        return round(sum(self.productos.values()), 2)\n\n    def __str__(self):\n        return f"Carrito: {len(self.productos)} productos, {self.total():.2f} €"', category: 'comprension' },
      { code: 'class Carrito:\n    def __init__(self):\n        self.productos = {}\n\n    def anadir(self, producto, precio, unidades=1):\n        self.productos[producto] = self.productos.get(producto, 0) + precio * unidades\n\n    def total(self):\n        return round(sum(self.productos.values()), 2)\n\n    def __str__(self):\n        print(f"Carrito: {len(self.productos)} productos, {self.total():.2f} €")', category: 'ejecucion' },
    ],
  },
};
