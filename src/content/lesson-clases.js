// Lección 12.1 · Clases y objetos. Contenido original, alineado con los caps. 14–16
// de «Piensa en Python» (tipos definidos por el programador, atributos, objetos
// mutables, __init__) y PE2 módulo 3.

const TOPIC = 'Clases';

export const LESSON_CLASES = {
  id: 'clases',
  moduleId: 'm12',
  code: '12.1',
  title: 'Clases y objetos',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explicar qué es una clase y qué es un objeto (instancia)',
    'Definir una clase con __init__ y guardar atributos en self',
    'Crear objetos y leer o modificar sus atributos',
    'Pasar objetos a funciones',
    'Reconocer el error de olvidar self.',
  ],
  prerequisites: ['Módulo 11 «Archivos y tratamiento de datos»'],
  teaser: 'Empiezas el Módulo 12: hasta ahora usabas tipos que venían con Python (int, str, list…). Hoy creas los tuyos.',
  celebration: 'Ya sabes crear tus propios tipos de datos: clases con atributos y objetos que los guardan.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'Tipos hechos a medida', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'Imagina que gestionas libros. Podrías guardar cada uno en variables sueltas o en una tupla `("Rayuela", "Cortázar", 1963)`… pero acordarse de qué posición es cada dato se vuelve un lío. Una **clase** te deja crear un tipo nuevo, `Libro`, con datos que tienen **nombre**: `libro.titulo`, `libro.autor`…' },
        {
          type: 'five', items: {
            'Clase': 'El molde o la plantilla: describe qué datos tiene un libro.',
            'Objeto (instancia)': 'Un libro concreto creado a partir del molde. Puede haber muchos.',
            'Atributo': 'Un dato que guarda cada objeto: `libro.titulo`.',
          },
        },
        {
          type: 'check', id: 'm12c-idea', concept: 'clases', mode: 'choice',
          question: 'En una app de recetas, ¿qué sería una clase y qué un objeto?',
          options: [
            { text: 'Clase: Receta. Objeto: la receta concreta de la tortilla', correct: true },
            { text: 'Clase: la tortilla. Objeto: Receta', why: 'Es al revés: la clase es el molde general (Receta) y cada receta concreta es un objeto.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'init', title: 'Definir una clase', concepts: ['clases'],
      blocks: [
        { type: 'p', text: 'Una clase se define con `class` y un nombre que, por convención, empieza en **mayúscula**. El método especial `__init__` se ejecuta al crear cada objeto y guarda sus datos en **self**, que representa al objeto que se está creando.' },
        { type: 'code', run: true, code: 'class Libro:\n    def __init__(self, titulo, autor, paginas):\n        self.titulo = titulo\n        self.autor = autor\n        self.paginas = paginas\n\nmi_libro = Libro("Rayuela", "Julio Cortázar", 600)\notro = Libro("Nada", "Carmen Laforet", 300)\nprint(mi_libro.titulo, "-", mi_libro.autor)\nprint(otro.paginas)' },
        { type: 'callout', tone: 'info', title: '¿Y self?', text: 'Al escribir `Libro("Rayuela", …)`, Python crea un objeto vacío y llama a `__init__` pasándolo como `self`. Por eso `self.titulo = titulo` guarda el título **en ese objeto**. Tú no pasas self: lo hace Python.' },
        {
          type: 'check', id: 'm12c-init', concept: 'clases', mode: 'text',
          question: 'Predice:', code: 'class Punto:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\np = Punto(3, 4)\nq = Punto(10, 0)\nprint(p.x + q.x, p.y)', answer: '13 4',
          explain: 'Cada objeto tiene sus propios atributos: p.x es 3 y q.x es 10.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'mutables', title: 'Los objetos se pueden modificar', concepts: ['clases', 'alias'],
      blocks: [
        { type: 'p', text: 'Los atributos se pueden leer y también **cambiar**. Y como pasa con las listas, si dos variables apuntan al mismo objeto, los cambios se ven desde las dos.' },
        { type: 'code', run: true, code: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n        self.leidas = 0          # atributo con valor inicial\n\nlibro = Libro("Nada", 300)\nlibro.leidas = 120\nprint(libro.leidas, "de", libro.paginas)\n\nalias = libro\nalias.leidas = 300\nprint(libro.leidas)' },
        {
          type: 'check', id: 'm12c-alias', concept: 'clases', mode: 'text',
          question: 'Predice:', code: 'class Caja:\n    def __init__(self):\n        self.contenido = 0\n\na = Caja()\nb = a\nb.contenido = 5\nc = Caja()\nprint(a.contenido, c.contenido)', answer: '5 0',
          explain: 'a y b son el mismo objeto; c es otra caja distinta, con su propio contenido.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'funciones', title: 'Objetos en funciones', concepts: ['clases', 'parametros'],
      blocks: [
        { type: 'p', text: 'Un objeto se puede pasar a una función como cualquier otro valor. La función lee (o modifica) sus atributos:' },
        { type: 'code', run: true, code: 'class Libro:\n    def __init__(self, titulo, paginas):\n        self.titulo = titulo\n        self.paginas = paginas\n        self.leidas = 0\n\ndef progreso(libro):\n    return round(libro.leidas / libro.paginas * 100)\n\nnada = Libro("Nada", 300)\nnada.leidas = 75\nprint(f"{nada.titulo}: {progreso(nada)} %")' },
        { type: 'callout', tone: 'tip', title: 'Pronto, métodos', text: 'Una función que trabaja con un tipo de objeto concreto suele quedar mejor **dentro** de la clase, como método. Es lo que verás en la próxima lección.' },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'self', title: 'El error de olvidar self.', concepts: ['clases', 'errores'],
      blocks: [
        { type: 'p', text: 'Dentro de `__init__`, si escribes `titulo = titulo` en lugar de `self.titulo = titulo`, creas una variable **local** que desaparece al terminar. El objeto se queda sin el atributo:' },
        { type: 'code', run: true, code: 'class Libro:\n    def __init__(self, titulo):\n        titulo = titulo        # ¡falta self.!\n\nlibro = Libro("Nada")\nprint(libro.titulo)' },
        {
          type: 'check', id: 'm12c-self', concept: 'clases', mode: 'choice',
          question: '¿Qué ocurre?', code: 'class Perro:\n    def __init__(self, nombre):\n        nombre = nombre\n\nprint(Perro("Toby").nombre)', expectError: 'AttributeError',
          options: [
            { text: 'AttributeError: el objeto no tiene el atributo nombre', correct: true },
            { text: 'Muestra Toby', why: 'Sin self., el nombre se guarda en una variable local, no en el objeto.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'cla-predict' },
    { id: 'a2', activity: 'cla-complete' },
    { id: 'a3', activity: 'cla-fix' },
    { id: 'a4', activity: 'cla-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una **clase** es un molde para crear objetos; cada **objeto** (instancia) tiene sus propios datos.',
    '`class Nombre:` con un `__init__(self, …)` que guarda los datos en `self.atributo = valor`.',
    'Los objetos se crean llamando a la clase: `Libro("Nada", 300)`. self lo pasa Python.',
    'Los atributos se leen y modifican con el punto: `libro.leidas = 120`.',
    'Sin `self.`, el dato se queda en una variable local y el objeto no lo tiene (AttributeError).',
  ],
};

export const ACTIVITIES_CLASES = {
  'cla-predict': {
    id: 'cla-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Dos mascotas', difficulty: 2, xp: 10, concepts: ['clases'],
    prompt: 'Dos objetos de la misma clase y un alias. **¿Qué mostrará?**',
    code: 'class Mascota:\n    def __init__(self, nombre, edad):\n        self.nombre = nombre\n        self.edad = edad\n\na = Mascota("Luna", 3)\nb = Mascota("Sol", 5)\nc = a\nc.edad += 1\nprint(a.edad, b.edad, c.nombre)',
    expectedOutput: '4 5 Luna',
    options: [
      { text: '4 5 Luna', correct: true },
      { text: '3 5 Luna', concept: 'clases', why: 'c es un alias de a: cambiar c.edad cambia a.edad.' },
      { text: '4 6 Luna', concept: 'clases', why: 'b es otro objeto: no se ve afectado.' },
      { text: '4 5 c', concept: 'clases', why: 'c.nombre es el atributo del objeto (que es a): «Luna».' },
    ],
    explain: ['a y b son objetos distintos; c apunta al mismo que a.', 'c.edad += 1 cambia a.edad a 4.', 'b sigue con 5; c.nombre es «Luna».'],
  },
  'cla-complete': {
    id: 'cla-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'La clase Producto', difficulty: 2, xp: 15, concepts: ['clases'],
    statement: 'Completa la clase `Producto` para que cada objeto guarde su `nombre`, su `precio` y sus `unidades` en stock.',
    expected: 'Libreta 2.5 10',
    starter: 'class Producto:\n    def ___(self, nombre, precio, unidades):\n        self.nombre = nombre\n        ___.precio = precio\n        self.___ = unidades\n\np = Producto("Libreta", 2.5, 10)\nprint(p.nombre, p.precio, p.unidades)',
    spec: {
      blanks: true,
      allow_short_names: ['p', 'q'],
      classes: [{ name: 'Producto' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Libreta 2.5 10'] },
        { label: 'Otro producto', call: 'q = Producto("Boli", 0.8, 50)\nprint(q.unidades * q.precio)', out_lines: ['40.0'] },
      ],
      logic_msg: 'Cada objeto debe guardar sus tres datos con los nombres nombre, precio y unidades.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: el nombre del método que se ejecuta al crear un objeto, el objeto donde se guarda el precio y el nombre del atributo de las unidades.' },
      { level: 'Razonamiento', text: 'El método especial de creación tiene dos guiones bajos a cada lado. Los atributos se guardan en self.' },
      { level: 'Pseudocódigo', text: 'definir __init__(self, nombre, precio, unidades):\n    self.nombre ← nombre\n    self.precio ← precio\n    self.unidades ← unidades', pre: true },
      { level: 'Ayuda técnica', text: '`def __init__(...)`, `self.precio = precio` y `self.unidades = unidades`.' },
    ],
    solution: {
      code: 'class Producto:\n    def __init__(self, nombre, precio, unidades):\n        self.nombre = nombre\n        self.precio = precio\n        self.unidades = unidades\n\np = Producto("Libreta", 2.5, 10)\nprint(p.nombre, p.precio, p.unidades)',
      explanation: '__init__ recibe los datos al crear el objeto y los guarda en self. Desde fuera se leen con el punto: p.precio.',
    },
    reference: ['class Producto:\n    def __init__(self, nombre, precio, unidades):\n        self.nombre = nombre\n        self.precio = precio\n        self.unidades = unidades\n\np = Producto("Libreta", 2.5, 10)\nprint(p.nombre, p.precio, p.unidades)'],
    wrongs: [
      { code: 'class Producto:\n    def ___(self, nombre, precio, unidades):\n        self.nombre = nombre\n        ___.precio = precio\n        self.___ = unidades', category: 'incompleto' },
      { code: 'class Producto:\n    def __init__(self, nombre, precio, unidades):\n        self.nombre = nombre\n        self.precio = precio\n        self.stock = unidades\n\np = Producto("Libreta", 2.5, 10)\nprint(p.nombre, p.precio, p.unidades)', category: 'ejecucion' },
    ],
  },
  'cla-fix': {
    id: 'cla-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'La alumna sin datos', difficulty: 2, xp: 20, concepts: ['clases', 'errores'],
    statement: 'Al crear una `Alumna` y mostrar sus datos aparece un **AttributeError**. Lee el error y corrige la clase.',
    expected: 'Eva tiene 3 notas',
    starter: 'class Alumna:\n    def __init__(self, nombre):\n        nombre = nombre\n        notas = []\n\neva = Alumna("Eva")\neva.notas.append(8)\neva.notas.append(7)\neva.notas.append(9)\nprint(eva.nombre, "tiene", len(eva.notas), "notas")',
    spec: {
      classes: [{ name: 'Alumna' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Eva tiene 3 notas'] },
        { label: 'Cada alumna tiene sus notas', call: 'a = Alumna("A")\nb = Alumna("B")\na.notas.append(5)\nprint(len(a.notas), len(b.notas))', out_lines: ['1 0'] },
      ],
      logic_msg: 'Cada alumna debe guardar su nombre y su propia lista de notas.',
    },
    hints: [
      { level: 'Orientación', text: 'El error dice que el objeto no tiene el atributo. ¿Dónde se están guardando nombre y notas?' },
      { level: 'Razonamiento', text: 'Sin self., las dos líneas de __init__ crean variables locales que desaparecen. Hay que guardarlas en el objeto.' },
      { level: 'Pseudocódigo', text: 'self.nombre ← nombre\nself.notas ← lista vacía', pre: true },
      { level: 'Ayuda técnica', text: '`self.nombre = nombre` y `self.notas = []`.' },
    ],
    solution: {
      code: 'class Alumna:\n    def __init__(self, nombre):\n        self.nombre = nombre\n        self.notas = []\n\neva = Alumna("Eva")\neva.notas.append(8)\neva.notas.append(7)\neva.notas.append(9)\nprint(eva.nombre, "tiene", len(eva.notas), "notas")',
      explanation: 'Con self., los datos se guardan en el objeto. Además, como la lista se crea dentro de __init__, cada alumna tiene la suya.',
    },
    reference: ['class Alumna:\n    def __init__(self, nombre):\n        self.nombre = nombre\n        self.notas = []\n\neva = Alumna("Eva")\neva.notas.append(8)\neva.notas.append(7)\neva.notas.append(9)\nprint(eva.nombre, "tiene", len(eva.notas), "notas")'],
    wrongs: [
      { code: 'class Alumna:\n    def __init__(self, nombre):\n        nombre = nombre\n        notas = []\n\neva = Alumna("Eva")\neva.notas.append(8)\neva.notas.append(7)\neva.notas.append(9)\nprint(eva.nombre, "tiene", len(eva.notas), "notas")', category: 'ejecucion' },
      { code: 'class Alumna:\n    def __init__(self, nombre):\n        self.nombre = nombre\n        notas = []\n\neva = Alumna("Eva")\neva.notas.append(8)\nprint(eva.nombre, "tiene", len(eva.notas), "notas")', category: 'ejecucion' },
    ],
  },
  'cla-build': {
    id: 'cla-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'La clase Película', difficulty: 3, xp: 30, concepts: ['clases', 'parametros'],
    unlock: { any: ['cla-predict', 'cla-complete', 'cla-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define:\n\n• Una clase `Pelicula` con los atributos `titulo`, `minutos` y `vista` (que empieza siempre en `False`; no se pasa al crearla).\n\n• Una función `duracion_texto(pelicula)` que devuelva la duración con el formato `"2 h 15 min"`.\n\nEjemplo: `duracion_texto(Pelicula("Origen", 148))` → `"2 h 28 min"`.',
    expected: '2 h 28 min',
    plan: [
      {
        q: '¿Qué parámetros tiene __init__?',
        options: [
          { text: 'self, titulo y minutos (vista se pone a False dentro)', correct: true },
          { text: 'self, titulo, minutos y vista', why: 'vista siempre empieza en False: no hace falta pasarlo, se fija dentro de __init__.' },
        ],
      },
      {
        q: '¿Cómo calculas horas y minutos?',
        options: [
          { text: 'pelicula.minutos // 60 y pelicula.minutos % 60', correct: true },
          { text: 'pelicula.minutos / 60', why: 'Eso da horas con decimales. Para separar, // y %.' },
        ],
      },
    ],
    planScaffold: 'class Pelicula:\n    def __init__(self, titulo, minutos):\n        # guardar los atributos (vista empieza en False)\n        pass\n\n\ndef duracion_texto(pelicula):\n    # horas y minutos con // y %\n    pass\n\n\nprint(duracion_texto(Pelicula("Origen", 148)))\n',
    starter: '',
    spec: {
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      classes: [{ name: 'Pelicula' }],
      functions: [{ name: 'duracion_texto', params: 1 }],
      cases: [
        { label: 'Origen, 148 min', call: 'print(duracion_texto(Pelicula("Origen", 148)))', out_lines: ['2 h 28 min'] },
        { label: 'Corto de 45 min', call: 'print(duracion_texto(Pelicula("Corto", 45)))', out_lines: ['0 h 45 min'] },
        { label: 'Atributos', call: 'p = Pelicula("X", 90)\nprint(p.titulo, p.minutos, p.vista)', out_lines: ['X 90 False'] },
      ],
      misconceptions: [
        { out_lines: ['2.466666666666667 h 28 min'], title: 'Horas con decimales', msg: 'Para las horas completas usa `//`, no `/`.' },
      ],
      logic_msg: 'Comprueba con 148 minutos: 2 h 28 min.',
    },
    hints: [
      { level: 'Orientación', text: 'Una clase con tres atributos (uno con valor fijo inicial) y una función que lee uno de ellos.' },
      { level: 'Razonamiento', text: 'En __init__: self.titulo, self.minutos y self.vista = False. En la función: lee pelicula.minutos y sepáralo con // y %.' },
      { level: 'Pseudocódigo', text: 'Pelicula.__init__(titulo, minutos): guardar ambos; vista ← False\nduracion_texto(p): devolver f"{p.minutos // 60} h {p.minutos % 60} min"', pre: true },
      { level: 'Ayuda técnica', text: '`return f"{pelicula.minutos // 60} h {pelicula.minutos % 60} min"`.' },
    ],
    solution: {
      code: 'class Pelicula:\n    def __init__(self, titulo, minutos):\n        self.titulo = titulo\n        self.minutos = minutos\n        self.vista = False\n\ndef duracion_texto(pelicula):\n    """Devuelve la duración como «X h Y min»."""\n    horas = pelicula.minutos // 60\n    resto = pelicula.minutos % 60\n    return f"{horas} h {resto} min"\n\nprint(duracion_texto(Pelicula("Origen", 148)))',
      explanation: 'La clase agrupa los datos de una película con nombres claros. La función recibe el objeto entero y usa solo lo que necesita.',
    },
    reference: [
      'class Pelicula:\n    def __init__(self, titulo, minutos):\n        self.titulo = titulo\n        self.minutos = minutos\n        self.vista = False\n\ndef duracion_texto(pelicula):\n    return f"{pelicula.minutos // 60} h {pelicula.minutos % 60} min"',
    ],
    wrongs: [
      { code: 'class Pelicula:\n    def __init__(self, titulo, minutos):\n        self.titulo = titulo\n        self.minutos = minutos\n\ndef duracion_texto(pelicula):\n    return f"{pelicula.minutos // 60} h {pelicula.minutos % 60} min"', category: 'ejecucion' },
      { code: 'class Pelicula:\n    def __init__(self, titulo, minutos):\n        self.titulo = titulo\n        self.minutos = minutos\n        self.vista = False\n\ndef duracion_texto(pelicula):\n    return f"{pelicula.minutos / 60} h {pelicula.minutos % 60} min"', category: 'comprension' },
    ],
  },
};
