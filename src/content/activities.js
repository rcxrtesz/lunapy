// Actividades y desafíos como datos. Cada ejercicio de código incluye:
//  - spec: cómo se valida (casos de prueba, casos límite, variantes anti-trampa, reglas)
//  - hints: 5 niveles (orientación → razonamiento → pseudocódigo → técnica → solución)
//  - reference / wrongs: usados por tests.html para comprobar que el validador
//    acepta soluciones correctas distintas y rechaza las erróneas con la categoría adecuada.
// En los textos, `código` se muestra como código en línea y **texto** en negrita.

import { ACTIVITIES_M1 } from './module1.js';
import { ACTIVITIES_EXPRESIONES } from './lesson-expresiones.js';
import { ACTIVITIES_ENTRADA } from './lesson-entrada.js';
import { ACTIVITIES_LLAMAR_FUNCIONES } from './lesson-llamar-funciones.js';
import { ACTIVITIES_DEFINIR_FUNCIONES } from './lesson-definir-funciones.js';
import { ACTIVITIES_PARAMETROS } from './lesson-parametros.js';
import { ACTIVITIES_ENCAPSULAR } from './lesson-encapsular.js';
import { ACTIVITIES_INTERFACES } from './lesson-interfaces.js';
import { ACTIVITIES_REFACTORIZAR } from './lesson-refactorizar.js';
import { ACTIVITIES_BOOLEANAS } from './lesson-booleanas.js';
import { ACTIVITIES_CONDICIONALES } from './lesson-condicionales.js';
import { ACTIVITIES_RECURSION } from './lesson-recursion.js';
import { ACTIVITIES_RETORNO } from './lesson-retorno.js';
import { ACTIVITIES_INCREMENTAL } from './lesson-incremental.js';
import { ACTIVITIES_COMPOSICION } from './lesson-composicion.js';
import { ACTIVITIES_FOR } from './lesson-for.js';
import { ACTIVITIES_WHILE } from './lesson-while.js';
import { ACTIVITIES_BUSQUEDA } from './lesson-busqueda.js';
import { ACTIVITIES_INDICES } from './lesson-indices.js';
import { ACTIVITIES_METODOS } from './lesson-metodos.js';
import { ACTIVITIES_REGEX } from './lesson-regex.js';
import { ACTIVITIES_LISTAS } from './lesson-listas.js';
import { ACTIVITIES_RECORRER_LISTAS } from './lesson-recorrer-listas.js';
import { ACTIVITIES_ALIAS } from './lesson-alias.js';
import { ACTIVITIES_DICCIONARIOS } from './lesson-diccionarios.js';
import { ACTIVITIES_TUPLAS } from './lesson-tuplas.js';
import { ACTIVITIES_PROYECTO_TEXTO } from './lesson-proyecto-texto.js';
import { ACTIVITIES_ARCHIVOS } from './lesson-archivos.js';
import { ACTIVITIES_PROCESAR } from './lesson-procesar.js';
import { ACTIVITIES_EXCEPCIONES } from './lesson-excepciones.js';
import { ACTIVITIES_CLASES } from './lesson-clases.js';
import { ACTIVITIES_METODOS_CLASE } from './lesson-metodos-clase.js';
import { ACTIVITIES_HERENCIA } from './lesson-herencia.js';
import { ACTIVITIES_DEPURACION } from './lesson-depuracion.js';
import { ACTIVITIES_ESTILO } from './lesson-estilo.js';
import { ACTIVITIES_PROYECTO_FINAL } from './lesson-proyecto-final.js';

const ACTIVITIES_M2 = {
  // ------------------------------------------------------------------ 1
  'var-predict': {
    id: 'var-predict', type: 'predict', kindLabel: 'Predice el resultado',
    title: 'El marcador', difficulty: 1, xp: 10, concepts: ['reasignacion', 'print'],
    prompt: 'Lee el programa con calma, línea a línea, como lo haría Python. **¿Qué crees que mostrará?**',
    code: `puntos = 10
puntos = puntos + 5
bonus = puntos * 2
puntos = 3
print(puntos, bonus)`,
    expectedOutput: '3 30',
    options: [
      { text: '3 30', correct: true },
      { text: '15 30', concept: 'reasignacion', why: 'La línea 4 cambia `puntos` a 3 **antes** del `print`. `print` muestra el valor que tiene la variable en ese momento, no el que tuvo antes.' },
      { text: '3 6', concept: 'reasignacion', why: '`bonus` se calculó en la línea 3, cuando `puntos` valía 15. Una variable guarda un **valor**, no una fórmula: cambiar `puntos` después no recalcula `bonus` (Python no es una hoja de cálculo).' },
      { text: 'puntos bonus', concept: 'print', why: 'Sin comillas, `puntos` y `bonus` son nombres de variables: `print` muestra sus **valores**. Para mostrar la palabra tendrías que escribir `"puntos"`.' },
    ],
    explain: [
      'Línea 1: `puntos` vale 10.',
      'Línea 2: Python calcula primero la derecha (10 + 5 = 15) y guarda 15 en `puntos`.',
      'Línea 3: `bonus` = 15 × 2 = 30. Se guarda el número 30, no la operación.',
      'Línea 4: `puntos` pasa a valer 3. `bonus` no se entera: sigue valiendo 30.',
      'Línea 5: se muestran los dos valores separados por un espacio → `3 30`.',
    ],
  },

  // ------------------------------------------------------------------ 2
  'var-complete': {
    id: 'var-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código',
    title: 'La ficha de Lucía', difficulty: 1, xp: 15, concepts: ['asignacion', 'reasignacion', 'print'],
    statement: 'Sustituye cada `___` para que el programa muestre **exactamente** esto:',
    expected: 'Lucía tiene 19 años\nEl año que viene tendrá 20',
    note: 'Pista para pensar: el segundo hueco debe funcionar **aunque cambies la edad inicial**.',
    starter: `nombre = ___
edad = 19
print(nombre, "tiene", edad, "años")
edad = ___
print("El año que viene tendrá", edad)`,
    spec: {
      blanks: true,
      cases: [{ label: 'Salida esperada', out_lines: ['Lucía tiene 19 años', 'El año que viene tendrá 20'] }],
      variants: [{
        label: 'Edad inicial cambiada a 30', set: { edad: 30 },
        out_lines: ['Lucía tiene 30 años', 'El año que viene tendrá 31'],
        msg: 'Tu programa muestra lo correcto, pero solo por casualidad: si la edad inicial fuera 30, seguiría diciendo que el año que viene tendrá 20. La nueva edad debe calcularse a partir del valor anterior de edad.',
      }],
      misconceptions: [
        { out_lines: ['Lucia tiene 19 años', 'El año que viene tendrá 20'], title: 'Casi', msg: 'Fíjate en la salida esperada: «Lucía» lleva tilde. Para Python, "Lucia" y "Lucía" son textos distintos.' },
        { out_contains: 'nombre tiene', title: 'Revisa qué estás mostrando', msg: 'Se está mostrando la palabra «nombre» en lugar del valor de la variable.' },
      ],
      logic_msg: 'Compara tu salida con la esperada carácter a carácter.',
    },
    hints: [
      { level: 'Orientación', text: 'Hay dos huecos. El primero es el **valor** que se guarda en `nombre`: mira la salida esperada para saber cuál es. El segundo es el **nuevo valor** de `edad`.' },
      { level: 'Razonamiento', text: 'Primer hueco: ¿es un número o un texto? ¿Cómo se escribe un texto en Python? Segundo hueco: «el año que viene» tendrá un año más que **ahora**. ¿Cómo dirías «lo que vale edad, más uno»?' },
      { level: 'Pseudocódigo', text: 'nombre ← el texto Lucía\nedad ← (valor actual de edad) + 1', pre: true },
      { level: 'Ayuda técnica', text: 'Los textos van entre comillas: `"Hola"`. Para modificar una variable a partir de su valor anterior se usa el patrón `x = x + 1`: Python calcula la derecha con el valor viejo y guarda el resultado.' },
    ],
    solution: {
      code: `nombre = "Lucía"
edad = 19
print(nombre, "tiene", edad, "años")
edad = edad + 1
print("El año que viene tendrá", edad)`,
      explanation: '`"Lucía"` lleva comillas porque es texto. En `edad = edad + 1`, Python lee primero la derecha (19 + 1 = 20) y después guarda 20 en `edad`. Así el programa sigue funcionando si cambias la edad inicial.',
    },
    reference: [
      `nombre = "Lucía"\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad = edad + 1\nprint("El año que viene tendrá", edad)`,
      `nombre = 'Lucía'\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad += 1\nprint("El año que viene tendrá", edad)`,
    ],
    wrongs: [
      { code: `nombre = ___\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad = ___\nprint("El año que viene tendrá", edad)`, category: 'incompleto' },
      { code: `nombre = Lucía\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad = edad + 1\nprint("El año que viene tendrá", edad)`, category: 'ejecucion' },
      { code: `nombre = "Lucía"\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad = 20\nprint("El año que viene tendrá", edad)`, category: 'logica' },
      { code: `nombre = "Lucia"\nedad = 19\nprint(nombre, "tiene", edad, "años")\nedad = edad + 1\nprint("El año que viene tendrá", edad)`, category: 'comprension' },
    ],
  },

  // ------------------------------------------------------------------ 3
  'var-order': {
    id: 'var-order', type: 'order', kindLabel: 'Ordena los pasos',
    title: 'Planifica el descuento', difficulty: 2, xp: 15, concepts: ['descomponer', 'asignacion'],
    statement: 'Una tienda aplica un descuento en porcentaje. Queremos un programa que calcule el **precio final**. Antes de programar, ordena la solución.',
    stages: [
      {
        title: 'Paso 1 · Ordena el plan en lenguaje natural',
        items: [
          { id: 'p1', text: 'Pedir el precio original', after: [] },
          { id: 'p2', text: 'Pedir el porcentaje de descuento', after: [] },
          { id: 'p3', text: 'Calcular el importe descontado (precio × descuento ÷ 100)', after: ['p1', 'p2'], why: 'Para calcular el importe descontado necesitas conocer **antes** el precio y el porcentaje.' },
          { id: 'p4', text: 'Calcular el precio final (precio − importe descontado)', after: ['p3'], why: 'El precio final depende del importe descontado: primero hay que calcularlo.' },
          { id: 'p5', text: 'Mostrar el precio final', after: ['p4'], why: 'No puedes mostrar un resultado que todavía no has calculado.' },
        ],
        success: 'Fíjate: «pedir el precio» y «pedir el porcentaje» podrían intercambiarse y el plan seguiría siendo correcto. Lo que importa son las **dependencias**: cada paso necesita los datos de pasos anteriores.',
      },
      {
        title: 'Paso 2 · Ahora ordena el código que corresponde a ese plan',
        code: true,
        items: [
          { id: 'c1', text: 'precio = float(input("Precio: "))', after: [] },
          { id: 'c2', text: 'descuento = float(input("Descuento (%): "))', after: [] },
          { id: 'c3', text: 'importe = precio * descuento / 100', after: ['c1', 'c2'], why: 'Esta línea usa `precio` y `descuento`: si todavía no existen, Python dará un NameError.' },
          { id: 'c4', text: 'final = precio - importe', after: ['c3', 'c1'], why: 'Esta línea usa `importe`, que se crea en otra línea: esa debe ir antes.' },
          { id: 'c5', text: 'print("Precio final:", final)', after: ['c4'], why: '`print` necesita que `final` ya tenga un valor.' },
        ],
        success: 'Cada línea de código corresponde a un paso del plan. Esa es la idea clave: **primero se piensa, después se traduce a Python**.',
      },
    ],
  },

  // ------------------------------------------------------------------ 4
  'var-fix': {
    id: 'var-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error',
    title: 'El saludo roto', difficulty: 2, xp: 20, concepts: ['tipos', 'errores'],
    statement: 'Este programa debería mostrar un saludo, pero falla. **Ejecútalo, lee el error y corrígelo.** Cuidado: puede haber más de un fallo.',
    expected: 'Hola, Marco. Tienes 17 años.',
    starter: `nombre = "Marco"
edad = 17
mensaje = "Hola, " + nombre + ". Tienes " + edad + " años."
print(Mensaje)`,
    spec: {
      cases: [{ label: 'Salida esperada', out_lines: ['Hola, Marco. Tienes 17 años.'] }],
      variants: [{
        label: 'Edad cambiada a 30', set: { edad: 30 }, out_lines: ['Hola, Marco. Tienes 30 años.'],
        msg: 'Has escrito la edad a mano dentro del texto. Si la edad cambiara, el mensaje quedaría mal. El programa debe usar la variable edad.',
      }],
      rules: [{ type: 'must_load', names: ['nombre', 'edad'], title: 'El mensaje debe construirse con las variables', msg: 'Usa las variables nombre y edad para construir el mensaje, en lugar de escribir sus valores directamente.' }],
      logic_msg: 'El programa ya no da error, pero el texto no coincide. Revisa espacios y signos de puntuación: print añade un espacio entre los elementos que separas con comas.',
    },
    hints: [
      { level: 'Orientación', text: 'Pulsa **Ejecutar** y lee el error: ¿en qué línea está? ¿De qué tipo es? Hay **dos** fallos; Python te los mostrará de uno en uno, porque se detiene en el primero.' },
      { level: 'Razonamiento', text: 'El primer error está en la línea 3: estás uniendo con `+` piezas de **tipos distintos**. ¿Qué tipo tiene cada pieza? El segundo error tiene que ver con **mayúsculas y minúsculas**.' },
      { level: 'Pseudocódigo', text: 'Línea 3: convertir edad en texto antes de unirla con el resto\nLínea 4: escribir el nombre de la variable exactamente como se creó', pre: true },
      { level: 'Ayuda técnica', text: '`str(17)` convierte el número 17 en el texto `"17"`. Python distingue mayúsculas: `mensaje` y `Mensaje` son nombres distintos.' },
    ],
    solution: {
      code: `nombre = "Marco"
edad = 17
mensaje = "Hola, " + nombre + ". Tienes " + str(edad) + " años."
print(mensaje)`,
      explanation: 'Con `+` Python puede pegar textos o sumar números, pero no mezclar ambos: `str(edad)` convierte el número en texto. Además, la variable se llama `mensaje` en minúsculas; `Mensaje` sería otra variable que no existe (NameError).',
    },
    reference: [
      `nombre = "Marco"\nedad = 17\nmensaje = "Hola, " + nombre + ". Tienes " + str(edad) + " años."\nprint(mensaje)`,
      `nombre = "Marco"\nedad = 17\nmensaje = f"Hola, {nombre}. Tienes {edad} años."\nprint(mensaje)`,
      `nombre = "Marco"\nedad = 17\nprint("Hola, " + nombre + ". Tienes", edad, "años.")`,
    ],
    wrongs: [
      { code: `nombre = "Marco"\nedad = 17\nmensaje = "Hola, " + nombre + ". Tienes " + edad + " años."\nprint(Mensaje)`, category: 'ejecucion' },
      { code: `nombre = "Marco"\nedad = 17\nmensaje = "Hola, " + nombre + ". Tienes " + str(edad) + " años."\nprint(Mensaje)`, category: 'ejecucion' },
      { code: `print("Hola, Marco. Tienes 17 años.")`, category: 'logica' },
      { code: `nombre = "Marco"\nedad = 17\nprint("Hola,", nombre, ". Tienes", edad, "años.")`, category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 5
  'var-build': {
    id: 'var-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero',
    title: 'Calculadora de rebajas', difficulty: 3, xp: 30, concepts: ['input', 'tipos', 'asignacion', 'descomponer'],
    topic: 'Variables', unlock: { any: ['var-predict', 'var-complete', 'var-order', 'var-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Una tienda online necesita un programa que **pida** el precio de un producto y el porcentaje de descuento, y **muestre el precio final**.\n\nEjemplo: precio `100` y descuento `20` → `80.0`.\n\nPuedes acompañar el resultado con texto (por ejemplo «Precio final: 80.0»). Muestra el precio final en la **última línea** de tu programa.',
    plan: [
      {
        q: '¿Qué datos tiene que pedir el programa al usuario?', multi: true,
        options: [
          { text: 'El precio original', correct: true },
          { text: 'El porcentaje de descuento', correct: true },
          { text: 'El precio final', why: 'Es lo que hay que **calcular**: el resultado, no un dato de entrada.' },
          { text: 'El nombre del producto', why: 'El enunciado no lo necesita para calcular el resultado. Identificar qué datos sobran también es parte de entender el problema.' },
        ],
      },
      {
        q: '¿Qué resultado tienes que obtener?',
        options: [
          { text: 'El precio final, después de aplicar el descuento', correct: true },
          { text: 'El importe que se descuenta', why: 'Es un paso intermedio útil, pero no es lo que pide el enunciado.' },
          { text: 'El porcentaje de descuento', why: 'Ese es un dato de entrada: lo escribe el usuario.' },
        ],
      },
      {
        q: 'Con precio 100 € y descuento del 20 %, ¿cómo calculas el importe descontado?',
        options: [
          { text: '100 × 20 ÷ 100 = 20 €', correct: true },
          { text: '100 − 20 = 80 €', why: 'Eso resta 20 euros, no un 20 %. Solo coincide por casualidad cuando el precio es 100: prueba con 50 € y un 20 % (el descuento serían 10 €, no 20 €).' },
          { text: '20 ÷ 100 = 0,2 €', why: 'Eso es el porcentaje expresado como decimal; falta multiplicarlo por el precio.' },
        ],
      },
      {
        q: 'Si el usuario escribe 100, ¿qué devuelve input()?',
        options: [
          { text: 'El texto "100": hay que convertirlo con float()', correct: true },
          { text: 'El número 100, listo para operar', why: '`input()` **siempre** devuelve texto (str), aunque el usuario escriba cifras. Sin convertirlo, no podrás hacer cálculos.' },
        ],
      },
    ],
    planScaffold: `# 1. Pedir el precio original (y convertirlo en número)

# 2. Pedir el porcentaje de descuento (y convertirlo en número)

# 3. Calcular el importe descontado

# 4. Calcular el precio final

# 5. Mostrar el precio final
`,
    starter: '',
    spec: {
      cases: [
        { label: '100 € con 20 %', stdin: ['100', '20'], args: { p: 100, d: 20 } },
        { label: 'Precio con decimales: 59.99 € con 15 %', stdin: ['59.99', '15'], args: { p: 59.99, d: 15 } },
        { label: 'Caso límite: sin descuento', stdin: ['40', '0'], args: { p: 40, d: 0 } },
        { label: 'Caso límite: descuento del 100 %', stdin: ['250', '100'], args: { p: 250, d: 100 } },
      ],
      expect_last_number: 'p - p * d / 100',
      hidden: { count: 2, args: { p: [1, 500, 2], d: [0, 90, 0] }, stdin: ['p', 'd'] }, // casos ocultos aleatorios
      tolerance: 0.01,
      misconceptions: [
        { expr: 'p * d / 100', title: 'Revisa qué pide el enunciado', msg: 'Has mostrado el importe descontado, no el precio final. Es un paso intermedio correcto, pero falta restarlo al precio original.' },
        { expr: 'p - d', title: 'Porcentaje ≠ euros', msg: 'Has restado el porcentaje como si fueran euros. Un 15 % de 59.99 € no son 15 €: el importe descontado es precio × descuento ÷ 100.' },
        { expr: 'p - p * d', title: 'Falta un paso', msg: 'Parece que has olvidado dividir entre 100: un porcentaje es «tantos de cada cien».' },
        { expr: 'p - d / 100', title: 'Falta un paso', msg: 'Has restado el porcentaje en forma decimal, pero falta multiplicarlo por el precio.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir los datos', msg: 'El enunciado pide que el programa pregunte el precio y el descuento al usuario. Usa input() para leerlos.' }],
    },
    hints: [
      { level: 'Orientación', text: 'Relee el enunciado: el programa **recibe dos datos** y **produce un resultado**. ¿Cuáles son? Si has hecho la planificación, ya los tienes identificados.' },
      { level: 'Razonamiento', text: 'Divide el problema en piezas pequeñas: primero consigue los datos, después calcula el importe descontado, luego réstalo al precio y, por último, muéstralo. Escribe una pieza, **ejecuta** y comprueba antes de seguir.' },
      { level: 'Pseudocódigo', text: 'precio ← pedir número al usuario\ndescuento ← pedir número al usuario\nimporte ← precio × descuento ÷ 100\nfinal ← precio − importe\nmostrar final', pre: true },
      { level: 'Ayuda técnica', text: 'Para leer un número decimal: `precio = float(input("Precio: "))`. Los operadores son `*` (multiplicar), `/` (dividir) y `-` (restar). Usa `float` y no `int`: los precios pueden tener decimales.' },
    ],
    solution: {
      code: `precio = float(input("Precio: "))
descuento = float(input("Descuento (%): "))
importe = precio * descuento / 100
final = precio - importe
print("Precio final:", final)`,
      explanation: 'Cada línea es un paso del plan. `float(input(...))` lee el texto que escribe el usuario y lo convierte en número decimal. Calcular el `importe` en una variable propia hace el programa más fácil de leer y de comprobar.',
    },
    reference: [
      `precio = float(input("Precio: "))\ndescuento = float(input("Descuento (%): "))\nimporte = precio * descuento / 100\nfinal = precio - importe\nprint("Precio final:", final)`,
      `precio = float(input())\ndescuento = float(input())\nprint(round(precio * (1 - descuento / 100), 2))`,
    ],
    wrongs: [
      { code: `print(80.0)`, category: 'logica' },
      { code: `precio = float(input())\ndescuento = float(input())\nprint(precio * descuento / 100)`, category: 'comprension' },
      { code: `precio = input()\ndescuento = input()\nprint(precio - precio * descuento / 100)`, category: 'ejecucion' },
      { code: `precio = int(input())\ndescuento = int(input())\nprint(precio - precio * descuento / 100)`, category: 'ejecucion' },
      { code: `precio = float(input()\nprint(precio)`, category: 'sintaxis' },
    ],
  },

  // ------------------------------------------------------------------ desafíos extra
  'ch-swap': {
    id: 'ch-swap', type: 'code', variant: 'build', kindLabel: 'Reto de razonamiento',
    title: 'Intercambia los vasos', difficulty: 2, xp: 20, concepts: ['reasignacion'],
    topic: 'Variables', unlock: { activity: 'var-complete', text: 'Completa «La ficha de Lucía»' },
    statement: 'Tienes dos vasos: `vaso_a` contiene `"café"` y `vaso_b` contiene `"té"`. Escribe el código que **intercambia** sus contenidos: al terminar, `vaso_a` debe valer `"té"` y `vaso_b` `"café"`.\n\nNo vuelvas a escribir los textos: tu solución debe funcionar con cualquier contenido.',
    plan: [
      {
        q: 'Si escribes vaso_a = vaso_b, ¿qué le pasa al café?',
        options: [
          { text: 'Se pierde: vaso_a pasa a apuntar al té y ya nada apunta al café', correct: true },
          { text: 'Pasa automáticamente a vaso_b', why: 'Una asignación solo cambia la variable de la izquierda. vaso_b no se entera de nada.' },
          { text: 'Da un error', why: 'Es una asignación válida: el problema no es un error, sino que se pierde un dato.' },
        ],
      },
      {
        q: '¿Qué necesitas hacer ANTES de sobrescribir vaso_a?',
        options: [
          { text: 'Guardar su contenido en otra variable', correct: true },
          { text: 'Escribir "café" en vaso_b', why: 'Así solo funcionaría con café. El programa debe servir para cualquier contenido.' },
        ],
      },
    ],
    starter: `vaso_a = "café"
vaso_b = "té"

# Escribe aquí el intercambio
`,
    spec: {
      cases: [{ label: 'café ↔ té', vars: { vaso_a: 'té', vaso_b: 'café' } }],
      variants: [{
        label: 'Con otro contenido (zumo ↔ té)', set: { vaso_a: 'zumo' }, vars: { vaso_a: 'té', vaso_b: 'zumo' },
        msg: 'Has escrito los contenidos a mano. Si el vaso A tuviera zumo, tu programa no lo intercambiaría. Mueve los valores usando las variables.',
      }],
      logic_msg: 'Si haces vaso_a = vaso_b, el café se pierde para siempre (la etiqueta vaso_a pasa a apuntar al té). En la vida real, ¿qué harías para intercambiar el contenido de dos vasos?',
      allow_short_names: [],
    },
    hints: [
      { level: 'Orientación', text: 'Al terminar, cada variable debe tener el valor que tenía la otra al principio.' },
      { level: 'Razonamiento', text: 'Prueba `vaso_a = vaso_b` en el visualizador paso a paso: ¿qué le pasa al café? Necesitas «apartar» un valor antes de sobrescribirlo. Con vasos reales usarías un **tercer vaso**.' },
      { level: 'Pseudocódigo', text: 'auxiliar ← vaso_a\nvaso_a ← vaso_b\nvaso_b ← auxiliar', pre: true },
      { level: 'Ayuda técnica', text: 'Una variable auxiliar es una variable normal: `aux = vaso_a`. Python también permite el atajo `a, b = b, a`, pero intenta primero entender la versión con variable auxiliar.' },
    ],
    solution: {
      code: `vaso_a = "café"
vaso_b = "té"

aux = vaso_a
vaso_a = vaso_b
vaso_b = aux`,
      explanation: 'Antes de sobrescribir `vaso_a`, guardamos su valor en `aux`. Así, cuando `vaso_a` pasa a valer "té", el café sigue a salvo en `aux` y podemos dárselo a `vaso_b`.',
    },
    reference: [
      `vaso_a = "café"\nvaso_b = "té"\naux = vaso_a\nvaso_a = vaso_b\nvaso_b = aux`,
      `vaso_a = "café"\nvaso_b = "té"\nvaso_a, vaso_b = vaso_b, vaso_a`,
    ],
    wrongs: [
      { code: `vaso_a = "café"\nvaso_b = "té"\nvaso_a = vaso_b\nvaso_b = vaso_a`, category: 'logica' },
      { code: `vaso_a = "café"\nvaso_b = "té"\nvaso_a = "té"\nvaso_b = "café"`, category: 'logica' },
    ],
  },

  'ch-explain': {
    id: 'ch-explain', type: 'predict', kindLabel: 'Explica el código',
    title: '¿Qué hace este programa?', difficulty: 1, xp: 10, concepts: ['reasignacion'],
    topic: 'Variables', unlock: { lesson: 'variables', step: 4, text: 'Llega a «Modificar una variable» en la lección' },
    prompt: 'Elige la explicación que describe **mejor** lo que hace este programa.',
    code: `total = 0
total = total + 12.5
total = total + 7.5
print("Total:", total)`,
    expectedOutput: 'Total: 20.0',
    options: [
      { text: 'Acumula dos importes en total y muestra «Total: 20.0»', correct: true },
      { text: 'Muestra «Total: 7.5», porque cada asignación borra lo anterior', concept: 'reasignacion', why: 'Cada asignación sustituye el valor, sí, pero el nuevo valor se calcula **a partir del anterior** (total + 7.5). Por eso se acumula.' },
      { text: 'Da un error, porque total aparece a los dos lados del =', concept: 'reasignacion', why: 'Es perfectamente válido: Python calcula primero la derecha con el valor actual y después lo guarda. Es el patrón «acumulador», que usarás muchísimo con bucles.' },
    ],
    explain: ['`total` empieza en 0.', 'Se le suma 12.5 → 12.5.', 'Se le suma 7.5 → 20.0 (es float porque intervienen decimales).', 'Este patrón se llama **acumulador**.'],
  },

  'ch-iva': {
    id: 'ch-iva', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real',
    title: 'Ticket con IVA', difficulty: 3, xp: 30, concepts: ['input', 'tipos'],
    topic: 'Variables', unlock: { activity: 'var-build', text: 'Resuelve «Calculadora de rebajas»' },
    plan: [
      {
        q: '¿Qué datos tiene que pedir el programa?', multi: true,
        options: [
          { text: 'El precio sin IVA', correct: true },
          { text: 'El porcentaje de IVA', why: 'Es fijo (21 %): no hace falta pedirlo, puedes escribirlo en el programa.' },
          { text: 'El precio con IVA', why: 'Es el resultado que hay que calcular, no un dato de entrada.' },
        ],
      },
      {
        q: 'Con un precio de 100 € sin IVA, ¿cómo obtienes el precio con IVA?',
        options: [
          { text: '100 + 100 × 21 ÷ 100 = 121 €', correct: true },
          { text: '100 × 21 ÷ 100 = 21 €', why: 'Eso es solo el impuesto. Falta sumarlo al precio original.' },
          { text: '100 + 21 = 121 €', why: 'Coincide solo con 100 €: con 50 € el IVA son 10,50 €, no 21 €.' },
        ],
      },
      {
        q: 'Si el usuario escribe 19.99, ¿qué hay que hacer antes de calcular?',
        options: [
          { text: 'Convertirlo con float(), porque input() devuelve texto', correct: true },
          { text: 'Convertirlo con int()', why: 'int() no acepta decimales: int("19.99") da un error. Para precios, usa float().' },
          { text: 'Nada, ya es un número', why: 'input() siempre devuelve texto (str).' },
        ],
      },
    ],
    planScaffold: `# 1. Pedir el precio sin IVA (y convertirlo en número)

# 2. Calcular el importe del IVA (21 %)

# 3. Calcular el precio con IVA

# 4. Mostrar el precio con IVA
`,
    statement: 'Un pequeño comercio introduce los precios **sin IVA**. Escribe un programa que pida el precio sin IVA y muestre el **precio con IVA** (21 %).\n\nMuestra el precio con IVA en la **última línea** de tu programa. Puedes redondearlo a dos decimales con `round(valor, 2)`.',
    starter: '',
    spec: {
      cases: [
        { label: '100 €', stdin: ['100'], args: { p: 100 } },
        { label: '19.99 €', stdin: ['19.99'], args: { p: 19.99 } },
        { label: 'Caso límite: 0 €', stdin: ['0'], args: { p: 0 } },
      ],
      expect_last_number: 'p * 1.21',
      hidden: { count: 2, args: { p: [1, 1000, 2] }, stdin: ['p'] }, // casos ocultos aleatorios
      tolerance: 0.01,
      misconceptions: [
        { expr: 'p * 0.21', title: 'Solo has calculado el impuesto', msg: 'Has mostrado cuánto IVA hay que pagar, pero el enunciado pide el precio total con el IVA incluido.' },
        { expr: 'p + 21', title: 'Porcentaje ≠ euros', msg: 'Has sumado 21 euros, no un 21 %.' },
      ],
      rules: [{ type: 'must_call', name: 'input', category: 'comprension', title: 'El programa debe pedir el precio', msg: 'Usa input() para pedir el precio sin IVA.' }],
    },
    hints: [
      { level: 'Orientación', text: 'Un dato de entrada (precio sin IVA) y un resultado (precio con IVA).' },
      { level: 'Razonamiento', text: 'El precio con IVA es el precio original **más** el 21 % del precio original. Calcula esas dos piezas por separado si te ayuda.' },
      { level: 'Pseudocódigo', text: 'precio ← pedir número\niva ← precio × 21 ÷ 100\ntotal ← precio + iva\nmostrar total', pre: true },
      { level: 'Ayuda técnica', text: 'Atajo matemático: sumar un 21 % equivale a multiplicar por 1.21. `round(24.1879, 2)` devuelve `24.19`.' },
    ],
    solution: {
      code: `precio = float(input("Precio sin IVA: "))
iva = precio * 21 / 100
total = precio + iva
print("Precio con IVA:", round(total, 2))`,
      explanation: 'Se calcula el importe del IVA y se suma al precio original. `round(total, 2)` deja dos decimales, como en un ticket real.',
    },
    reference: [`precio = float(input())\nprint(round(precio * 1.21, 2))`],
    wrongs: [{ code: `precio = float(input())\nprint(precio * 0.21)`, category: 'comprension' }],
  },
};

for (const a of Object.values(ACTIVITIES_M2)) a.topic ||= 'Variables';

export const ACTIVITIES = { ...ACTIVITIES_M1, ...ACTIVITIES_M2, ...ACTIVITIES_EXPRESIONES, ...ACTIVITIES_ENTRADA, ...ACTIVITIES_LLAMAR_FUNCIONES, ...ACTIVITIES_DEFINIR_FUNCIONES, ...ACTIVITIES_PARAMETROS,
  ...ACTIVITIES_ENCAPSULAR, ...ACTIVITIES_INTERFACES, ...ACTIVITIES_REFACTORIZAR,
  ...ACTIVITIES_BOOLEANAS, ...ACTIVITIES_CONDICIONALES, ...ACTIVITIES_RECURSION,
  ...ACTIVITIES_RETORNO, ...ACTIVITIES_INCREMENTAL, ...ACTIVITIES_COMPOSICION,
  ...ACTIVITIES_FOR, ...ACTIVITIES_WHILE, ...ACTIVITIES_BUSQUEDA,
  ...ACTIVITIES_INDICES, ...ACTIVITIES_METODOS, ...ACTIVITIES_REGEX,
  ...ACTIVITIES_LISTAS, ...ACTIVITIES_RECORRER_LISTAS, ...ACTIVITIES_ALIAS,
  ...ACTIVITIES_DICCIONARIOS, ...ACTIVITIES_TUPLAS, ...ACTIVITIES_PROYECTO_TEXTO,
  ...ACTIVITIES_ARCHIVOS, ...ACTIVITIES_PROCESAR, ...ACTIVITIES_EXCEPCIONES,
  ...ACTIVITIES_CLASES, ...ACTIVITIES_METODOS_CLASE, ...ACTIVITIES_HERENCIA,
  ...ACTIVITIES_DEPURACION, ...ACTIVITIES_ESTILO, ...ACTIVITIES_PROYECTO_FINAL };

// Zona de desafíos: todas las actividades, en el orden del curso.
export const CHALLENGES = Object.keys(ACTIVITIES);
