// Lección 11.3 · Excepciones. Contenido original, alineado con el cap. 13 de
// «Piensa en Python» (capturar excepciones) y PE2 módulo 4 (try, except, raise,
// else, finally). Cierra el círculo abierto en la 2.3 con el ValueError de input.

const TOPIC = 'Archivos';

export const LESSON_EXCEPCIONES = {
  id: 'excepciones',
  moduleId: 'm11',
  code: '11.3',
  title: 'Excepciones',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Capturar errores con try y except para que el programa no se detenga',
    'Capturar excepciones concretas y evitar el except sin tipo',
    'Repetir una pregunta hasta que el dato sea válido',
    'Lanzar tus propias excepciones con raise',
    'Manejar un archivo que no existe',
  ],
  prerequisites: ['Lección 11.2 «Procesar datos»', 'Lección 7.2 «Bucles while»'],
  teaser: 'En la lección 2.3 te prometimos una forma de que el programa no se rompa cuando alguien escribe «doce» en vez de 12. Hoy la cumplimos.',
  celebration: 'Has completado el Módulo 11: lees y procesas archivos y tus programas saben reaccionar ante los errores sin romperse.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'try', title: 'try y except', concepts: ['excepciones'],
      blocks: [
        { type: 'p', text: 'Una **excepción** es un error durante la ejecución (ValueError, KeyError…). Si nadie la captura, el programa se detiene. Con `try`/`except` puedes **capturarla** y decidir qué hacer:' },
        { type: 'code', run: true, code: 'texto = input("Escribe un número: ")\ntry:\n    numero = int(texto)\n    print("El doble es", numero * 2)\nexcept ValueError:\n    print("Eso no es un número entero.")\nprint("El programa sigue.")', caption: 'Prueba con 21 y después con «hola».' },
        {
          type: 'five', items: {
            'try': 'El código que puede fallar.',
            'except Tipo': 'Lo que se hace si ocurre ese tipo de error. Si no hay error, se salta.',
            'Después': 'El programa continúa con normalidad.',
          },
        },
        {
          type: 'check', id: 'm11e-flujo', concept: 'excepciones', mode: 'choice',
          question: '¿Qué mostrará?', code: 'try:\n    print("A")\n    x = int("tres")\n    print("B")\nexcept ValueError:\n    print("C")\nprint("D")', expectOutput: 'A\nC\nD',
          options: [
            { text: 'A, C, D', correct: true },
            { text: 'A, B, C, D', why: 'Cuando int("tres") falla, Python salta directamente al except: «B» no se ejecuta.' },
            { text: 'A y un ValueError', why: 'El except captura el ValueError: el programa no se detiene.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'concretas', title: 'Captura solo lo que esperas', concepts: ['excepciones', 'errores'],
      blocks: [
        { type: 'p', text: 'Puedes tener varios except, uno por tipo de error. Lo que **no** conviene es un `except:` sin tipo: captura también errores que no esperabas, como una variable mal escrita, y los esconde.' },
        { type: 'code', run: true, code: 'def dividir(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        print("No se puede dividir entre cero")\n    except TypeError:\n        print("Los dos datos tienen que ser números")\n\nprint(dividir(10, 2))\ndividir(5, 0)\ndividir("5", 2)' },
        { type: 'code', run: true, title: 'Un except sin tipo esconde el error de verdad', code: 'try:\n    numero = int("42")\n    print(numro * 2)    # errata: numro\nexcept:\n    print("Dato no válido")   # ¡pero el dato era válido!' },
        {
          type: 'check', id: 'm11e-tipo', concept: 'excepciones', mode: 'choice',
          question: '¿Qué except necesitas para `edades["Leo"]` si "Leo" puede no estar en el diccionario?',
          options: [
            { text: 'except KeyError:', correct: true },
            { text: 'except ValueError:', why: 'Una clave que no existe produce un KeyError.' },
            { text: 'except:', why: 'Funcionaría, pero también escondería cualquier otro error. Captura solo el que esperas.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Repetir hasta que sea válido', concepts: ['excepciones', 'bucles'],
      blocks: [
        { type: 'p', text: 'Combinando while y try puedes pedir un dato **hasta que sea correcto**, sin que el programa se rompa nunca:' },
        { type: 'code', run: true, code: 'while True:\n    try:\n        edad = int(input("Edad: "))\n        break               # solo se llega aquí si int() funcionó\n    except ValueError:\n        print("Escribe la edad en números, por favor.")\nprint("Edad guardada:", edad)', caption: 'Escribe «doce» o «12.5» antes de una edad correcta.' },
        {
          type: 'check', id: 'm11e-break', concept: 'excepciones', mode: 'choice',
          question: 'En ese programa, ¿por qué el break está dentro del try y después del int()?',
          options: [
            { text: 'Para salir del bucle solo si la conversión ha funcionado', correct: true },
            { text: 'Porque es obligatorio poner break en un try', why: 'No es obligatorio. Está ahí porque, si int() falla, Python salta al except y el break no llega a ejecutarse: el bucle vuelve a preguntar.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'raise', title: 'Lanzar tus propias excepciones', concepts: ['excepciones', 'diseno'],
      blocks: [
        { type: 'p', text: 'Una función también puede **avisar** de que ha recibido un dato que no tiene sentido. Con `raise` lanza una excepción con un mensaje; quien la llama decide si la captura:' },
        { type: 'code', run: true, code: 'def precio_con_descuento(precio, porcentaje):\n    if not 0 <= porcentaje <= 100:\n        raise ValueError("el porcentaje debe estar entre 0 y 100")\n    return precio * (1 - porcentaje / 100)\n\nprint(precio_con_descuento(80, 25))\ntry:\n    precio_con_descuento(80, 150)\nexcept ValueError as error:\n    print("Error:", error)' },
        {
          type: 'more', summary: 'else y finally',
          items: [
            '`else:` va después de los except y se ejecuta solo si **no** hubo excepción.',
            '`finally:` se ejecuta **siempre**, haya error o no. Útil para cerrar recursos (aunque con `with` casi nunca hace falta).',
          ],
        },
        {
          type: 'check', id: 'm11e-raise', concept: 'excepciones', mode: 'choice',
          question: '¿Qué mostrará?', code: 'def raiz(x):\n    if x < 0:\n        raise ValueError("negativo")\n    return x ** 0.5\n\ntry:\n    print(raiz(16))\n    print(raiz(-4))\nexcept ValueError as e:\n    print("Error:", e)', expectOutput: '4.0\nError: negativo',
          options: [
            { text: '4.0 y después «Error: negativo»', correct: true },
            { text: 'Solo «Error: negativo»', why: 'raiz(16) funciona y se muestra antes de que raiz(-4) lance la excepción.' },
            { text: '4.0 y un ValueError que detiene el programa', why: 'El except captura el ValueError y muestra su mensaje.' },
          ],
          explain: 'raiz(16) da 4.0; raiz(-4) lanza la excepción, que el except captura y muestra.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'archivos', title: 'Archivos que no existen', concepts: ['excepciones', 'archivos'],
      blocks: [
        { type: 'p', text: 'Abrir un archivo que no existe produce un **FileNotFoundError**. Capturarlo permite dar un mensaje claro o usar un valor por defecto:' },
        { type: 'code', run: true, code: 'def leer_notas(nombre):\n    try:\n        with open(nombre) as f:\n            return f.read()\n    except FileNotFoundError:\n        return ""\n\nprint(repr(leer_notas("no_existe.txt")))' },
        {
          type: 'check', id: 'm11e-fnf', concept: 'excepciones', mode: 'choice',
          question: '¿Qué excepción produce `open("faltan.txt")` si el archivo no existe?',
          options: [
            { text: 'FileNotFoundError', correct: true },
            { text: 'KeyError', why: 'KeyError es para claves de diccionario.' },
            { text: 'ValueError', why: 'ValueError es para valores con un contenido no válido, como int("hola").' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'exc-predict' },
    { id: 'a2', activity: 'exc-complete' },
    { id: 'a3', activity: 'exc-fix' },
    { id: 'a4', activity: 'exc-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    '`try:` contiene el código que puede fallar; `except Tipo:` decide qué hacer si falla.',
    'Si hay error, el resto del try se salta y se ejecuta el except; después el programa continúa.',
    'Captura excepciones concretas (ValueError, KeyError, FileNotFoundError…); evita `except:` sin tipo.',
    'Para validar datos: `while True` + `try` + `break` cuando la conversión funciona.',
    '`raise ValueError("mensaje")` avisa de un dato no válido; `except ValueError as e` lo recoge.',
  ],
};

export const ACTIVITIES_EXCEPCIONES = {
  'exc-predict': {
    id: 'exc-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Sumar lo que se pueda', difficulty: 2, xp: 10, concepts: ['excepciones', 'bucles'],
    prompt: 'Algunos datos no son números. **¿Qué mostrará?**',
    code: 'datos = ["4", "dos", "6", "1.5"]\ntotal = 0\nerrores = 0\nfor d in datos:\n    try:\n        total += int(d)\n    except ValueError:\n        errores += 1\nprint(total, errores)',
    expectedOutput: '10 2',
    options: [
      { text: '10 2', correct: true },
      { text: '11.5 1', concept: 'excepciones', why: 'int("1.5") también falla: int no acepta textos con decimales.' },
      { text: '4 1', concept: 'excepciones', why: 'El try está dentro del bucle: tras un error, el bucle sigue con el siguiente dato.' },
      { text: 'Un ValueError', concept: 'excepciones', why: 'Los errores se capturan con except: el programa no se detiene.' },
    ],
    explain: ['"4" → 4.', '"dos" → ValueError: errores = 1.', '"6" → total 10.', '"1.5" → ValueError: errores = 2.'],
  },
  'exc-complete': {
    id: 'exc-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Convertir sin romperse', difficulty: 2, xp: 15, concepts: ['excepciones'],
    statement: 'Completa `a_numero(texto)` para que devuelva el texto convertido a `float`, o `None` si no es un número.',
    expected: '3.5\nNone',
    starter: 'def a_numero(texto):\n    ___:\n        return float(texto)\n    except ___:\n        return ___\n\nprint(a_numero("3.5"))\nprint(a_numero("tres"))',
    spec: {
      blanks: true,
      functions: [{ name: 'a_numero', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['3.5', 'None'] },
        { label: 'a_numero("7")', call: 'print(a_numero("7"))', out_lines: ['7.0'] },
        { label: 'a_numero("")', call: 'print(a_numero(""))', out_lines: ['None'] },
      ],
      logic_msg: 'Con un texto numérico devuelve el número; con cualquier otro, None.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: la palabra que abre el bloque protegido, el tipo de error y lo que se devuelve si falla.' },
      { level: 'Razonamiento', text: '¿Qué excepción da float("tres")? ¿Qué valor especial significa «no hay resultado»?' },
      { level: 'Pseudocódigo', text: 'intentar: devolver float(texto)\nsi ValueError: devolver None', pre: true },
      { level: 'Ayuda técnica', text: '`try:`, `except ValueError:` y `return None`.' },
    ],
    solution: {
      code: 'def a_numero(texto):\n    try:\n        return float(texto)\n    except ValueError:\n        return None\n\nprint(a_numero("3.5"))\nprint(a_numero("tres"))',
      explanation: 'Si float() funciona, el return del try devuelve el número. Si lanza un ValueError, el except devuelve None: la función nunca rompe el programa.',
    },
    reference: ['def a_numero(texto):\n    try:\n        return float(texto)\n    except ValueError:\n        return None\n\nprint(a_numero("3.5"))\nprint(a_numero("tres"))'],
    wrongs: [
      { code: 'def a_numero(texto):\n    ___:\n        return float(texto)\n    except ___:\n        return ___', category: 'incompleto' },
      { code: 'def a_numero(texto):\n    try:\n        return float(texto)\n    except KeyError:\n        return None\n\nprint(a_numero("3.5"))\nprint(a_numero("tres"))', category: 'ejecucion' },
    ],
  },
  'exc-fix': {
    id: 'exc-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El except que lo esconde todo', difficulty: 3, xp: 25, concepts: ['excepciones', 'errores'],
    statement: '`doble(texto)` debería devolver el doble del número, o el texto `"no válido"` si no es un número. Pero dice «no válido» **siempre**, incluso con "4". El `except` sin tipo está escondiendo otro error. Encuéntralo y corrígelo, y haz que el except capture solo el error que corresponde.',
    expected: '8\nno válido',
    starter: 'def doble(texto):\n    try:\n        numero = int(texto)\n        return numro * 2\n    except:\n        return "no válido"\n\nprint(doble("4"))\nprint(doble("cuatro"))',
    spec: {
      functions: [{ name: 'doble', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['8', 'no válido'] },
        { label: 'doble("-10")', call: 'print(doble("-10"))', out_lines: ['-20'] },
      ],
      misconceptions: [
        { out_lines: ['no válido', 'no válido'], title: 'Algo sigue fallando dentro del try', msg: 'El except sin tipo captura cualquier error. Cámbialo por `except ValueError:` y ejecuta: verás el error que estaba escondido.' },
      ],
      logic_msg: 'doble("4") debe devolver 8.',
    },
    hints: [
      { level: 'Orientación', text: 'Cambia `except:` por `except ValueError:` y ejecuta. ¿Qué error aparece ahora?' },
      { level: 'Razonamiento', text: 'Hay una errata en el nombre de una variable dentro del try. El except sin tipo la convertía en «no válido».' },
      { level: 'Pseudocódigo', text: 'intentar: numero ← int(texto); devolver numero × 2\nsi ValueError: devolver "no válido"', pre: true },
      { level: 'Ayuda técnica', text: 'Corrige `numro` por `numero` y usa `except ValueError:`.' },
    ],
    solution: {
      code: 'def doble(texto):\n    try:\n        numero = int(texto)\n        return numero * 2\n    except ValueError:\n        return "no válido"\n\nprint(doble("4"))\nprint(doble("cuatro"))',
      explanation: 'El NameError de la errata quedaba capturado por el except sin tipo y parecía un dato no válido. Capturando solo ValueError, los errores de programación salen a la luz.',
    },
    reference: ['def doble(texto):\n    try:\n        numero = int(texto)\n        return numero * 2\n    except ValueError:\n        return "no válido"\n\nprint(doble("4"))\nprint(doble("cuatro"))'],
    wrongs: [
      { code: 'def doble(texto):\n    try:\n        numero = int(texto)\n        return numro * 2\n    except:\n        return "no válido"\n\nprint(doble("4"))\nprint(doble("cuatro"))', category: 'comprension' },
      { code: 'def doble(texto):\n    try:\n        numero = int(texto)\n        return numro * 2\n    except ValueError:\n        return "no válido"\n\nprint(doble("4"))\nprint(doble("cuatro"))', category: 'ejecucion' },
    ],
  },
  'exc-build': {
    id: 'exc-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'Pedir una edad a prueba de todo', difficulty: 3, xp: 30, concepts: ['excepciones', 'bucles', 'input'],
    unlock: { any: ['exc-predict', 'exc-complete', 'exc-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `pedir_edad()` que pida una edad con input y la **devuelva** como número entero. Mientras el dato no sea un entero **entre 0 y 120**, muestra `Edad no válida` y vuelve a preguntar.\n\nEjemplo: si el usuario escribe «veinte», «-3» y «25», la función muestra «Edad no válida» dos veces y devuelve 25.',
    expected: 'Edad no válida\nEdad no válida\n25',
    plan: [
      {
        q: '¿Qué dos problemas puede tener el dato?',
        multi: true,
        options: [
          { text: 'Que no sea un número (int() da ValueError)', correct: true },
          { text: 'Que sea un número fuera de 0–120', correct: true },
          { text: 'Que sea un número par', why: 'El enunciado no pone ninguna condición sobre si es par.' },
        ],
      },
      {
        q: '¿Qué estructura encaja?',
        options: [
          { text: 'while True con try/except dentro y return cuando el dato es válido', correct: true },
          { text: 'Un if con try', why: 'Un if solo comprueba una vez: hay que repetir hasta que el dato sea válido.' },
        ],
      },
    ],
    planScaffold: 'def pedir_edad():\n    while True:\n        # intentar convertir; si es válida, devolverla\n        # si no, mostrar "Edad no válida"\n        pass\n\n\nprint(pedir_edad())\n',
    starter: '',
    spec: {
      functions: [{ name: 'pedir_edad', params: 0 }],
      cases: [
        { label: '«veinte», «-3» y «25»', stdin: ['veinte', '-3', '25'], call: 'print(pedir_edad())', out_lines: ['Edad no válida', 'Edad no válida', '25'] },
        { label: 'Válida a la primera', stdin: ['40'], call: 'print(pedir_edad())', out_lines: ['40'] },
        { label: 'Límites: 121, 12.5 y 0', stdin: ['121', '12.5', '0'], call: 'print(pedir_edad())', out_lines: ['Edad no válida', 'Edad no válida', '0'] },
      ],
      misconceptions: [
        { out_lines: ['Edad no válida', '-3'], title: 'Falta comprobar el rango', msg: 'Un número entero no basta: también tiene que estar entre 0 y 120.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'La función debe pedir el dato', msg: 'Usa input() dentro de pedir_edad.' }],
      logic_msg: 'Por cada dato no válido debe aparecer «Edad no válida»; al final se devuelve la edad correcta.',
    },
    hints: [
      { level: 'Orientación', text: 'Un bucle infinito que solo termina con un return cuando el dato es válido.' },
      { level: 'Razonamiento', text: 'Dentro del bucle: try con int(input()). Si funciona y está en el rango, return. En cualquier otro caso (ValueError o fuera de rango), muestra el aviso.' },
      { level: 'Pseudocódigo', text: 'repetir siempre:\n    intentar: edad ← int(pedir)\n        si 0 ≤ edad ≤ 120: devolver edad\n    si ValueError: (nada)\n    mostrar "Edad no válida"', pre: true },
      { level: 'Ayuda técnica', text: 'Dentro del try: `edad = int(input("Edad: "))` y `if 0 <= edad <= 120: return edad`. En el except: `pass`. Después del try/except: `print("Edad no válida")`.' },
    ],
    solution: {
      code: 'def pedir_edad():\n    """Pide una edad hasta que sea un entero entre 0 y 120, y la devuelve."""\n    while True:\n        try:\n            edad = int(input("Edad: "))\n            if 0 <= edad <= 120:\n                return edad\n        except ValueError:\n            pass\n        print("Edad no válida")\n\nprint(pedir_edad())',
      explanation: 'El return sale de la función (y del bucle) solo con un dato válido. Si int() falla, el except lo absorbe con pass; tanto en ese caso como si está fuera de rango, se llega al print del aviso y el bucle vuelve a preguntar.',
    },
    reference: [
      'def pedir_edad():\n    while True:\n        try:\n            edad = int(input())\n            if 0 <= edad <= 120:\n                return edad\n        except ValueError:\n            pass\n        print("Edad no válida")',    ],
    wrongs: [
      { code: 'def pedir_edad():\n    while True:\n        try:\n            return int(input())\n        except ValueError:\n            print("Edad no válida")', category: 'comprension' },
      { code: 'def pedir_edad():\n    edad = int(input())\n    while edad < 0 or edad > 120:\n        print("Edad no válida")\n        edad = int(input())\n    return edad', category: 'ejecucion' },
    ],
  },
};
