// Módulo 1 · Pensamiento computacional y Python.
// Contenido original, alineado con el cap. 1 de «Piensa en Python» (La programación
// como forma de pensar) y con Cisco PE1 módulo 1. Las preguntas con código indican
// expectOutput / expectError / answer: tests.html comprueba con Python real que la
// respuesta marcada como correcta lo es.

const TOPIC = 'Primeros pasos';

// =====================================================================
// Lección 1.1 · De la receta al algoritmo
// =====================================================================
export const LESSON_ALGORITMOS = {
  id: 'algoritmos',
  moduleId: 'm1',
  code: '1.1',
  title: 'Qué es programar: de la receta al algoritmo',
  minutes: 20,
  bonusXp: 20,
  objectives: [
    'Explicar qué es un programa y qué es un algoritmo',
    'Usar las cuatro herramientas del pensamiento computacional',
    'Saber que Python ejecuta las instrucciones en orden, de arriba abajo',
    'Distinguir un lenguaje natural de uno formal y perder el miedo a los errores',
  ],
  prerequisites: ['Ninguno: empiezas aquí'],
  teaser: 'Empiezas por el principio: qué es programar y cómo piensa una programadora antes de escribir código. Sin requisitos previos.',
  celebration: 'Ya sabes qué es un algoritmo, por qué el orden importa y cómo piensa una programadora antes de escribir código. En la siguiente lección pondrás a Python a calcular.',
  steps: [
    {
      id: 'programa', title: '¿Qué es programar?', concepts: ['algoritmo'],
      blocks: [
        { type: 'p', text: 'Un **programa** es una lista de instrucciones que un ordenador sigue **en orden**, una detrás de otra. Programar es escribir esas instrucciones.' },
        { type: 'p', text: 'Se parece a una receta de cocina, con una diferencia enorme: una persona entiende «échale un poco de sal»; un ordenador, no. El ordenador hace **exactamente** lo que le dices, ni más ni menos.' },
        {
          type: 'five', items: {
            'Qué es un algoritmo': 'Una secuencia de pasos precisos que resuelve un problema y que termina.',
            'Para qué sirve': 'Para que cualquiera —o cualquier máquina— resuelva el problema siguiendo los pasos, sin tener que volver a pensarlo.',
            'Cómo funciona': 'Cada paso es claro, se hace en un orden concreto y en algún momento se acaba.',
            'Cuándo usarlo': 'Siempre, antes de programar: primero el algoritmo, después el código.',
            'Errores típicos': 'Pasos ambiguos («un poco», «un rato»), pasos en mal orden o un paso que falta.',
          },
        },
        {
          type: 'check', id: 'm1-precision', concept: 'algoritmo', mode: 'choice',
          question: '¿Qué instrucción podría seguir un ordenador sin dudar?',
          options: [
            { text: 'Repite 3 veces: escribe «Hola»', correct: true },
            { text: 'Escribe un saludo bonito', why: '«Bonito» es ambiguo: el ordenador no sabe qué significa para ti.' },
            { text: 'Escribe «Hola» unas cuantas veces', why: '«Unas cuantas» no es un número concreto: ¿2?, ¿5?, ¿20?' },
          ],
          explain: 'Una instrucción precisa no deja nada a la interpretación: qué hacer y cuántas veces.',
        },
      ],
    },
    {
      id: 'pensamiento', title: 'Pensar antes de programar', concepts: ['descomponer', 'algoritmo'],
      blocks: [
        { type: 'p', text: 'Antes de escribir código, quien programa **piensa** el problema. A esa forma de pensar se le llama **pensamiento computacional** y tiene cuatro herramientas:' },
        {
          type: 'five', items: {
            'Descomponer': 'Dividir un problema grande en partes pequeñas que sabes resolver.',
            'Reconocer patrones': 'Darte cuenta de que algo se repite, o de que se parece a un problema que ya resolviste.',
            'Abstraer': 'Quedarte con lo importante e ignorar los detalles que no influyen en el resultado.',
            'Diseñar el algoritmo': 'Escribir los pasos ordenados que llevan a la solución.',
          },
        },
        { type: 'callout', tone: 'tip', title: 'Lo usarás en cada ejercicio', text: 'Por eso LunaPy te pregunta a menudo qué datos tienes, qué resultado buscas y qué pasos seguirías **antes** de dejarte programar.' },
        {
          type: 'check', id: 'm1-abstraer', concept: 'descomponer', mode: 'choice',
          question: 'Quieres calcular cuánto paga cada persona de una cena a partes iguales. ¿Qué dato puedes **ignorar**?',
          options: [
            { text: 'El nombre del restaurante', correct: true },
            { text: 'El total de la cuenta', why: 'Sin el total no hay nada que repartir: es imprescindible.' },
            { text: 'El número de personas', why: 'Es lo que necesitas para dividir: sin él no sabes entre cuántos repartir.' },
          ],
          explain: 'Eso es **abstraer**: el nombre del restaurante no cambia el resultado, así que no forma parte del problema.',
        },
      ],
    },
    {
      id: 'orden', title: 'El orden importa', concepts: ['algoritmo'],
      blocks: [
        { type: 'p', text: 'En un algoritmo, algunos pasos **dependen** de otros: no puedes echar el agua antes de calentarla. Otros pasos son independientes y da igual cuál vaya primero.' },
        { type: 'p', text: 'Python funciona igual: ejecuta las instrucciones **de arriba abajo**, una a una. `print()` muestra en la pantalla lo que pongas entre sus paréntesis.' },
        { type: 'code', run: true, code: 'print("1. Calentar el agua")\nprint("2. Poner la bolsita en la taza")\nprint("3. Echar el agua")\nprint("4. Esperar 3 minutos")', caption: 'Ejecútalo. Después intercambia dos líneas y vuelve a ejecutar: Python las mostrará en el nuevo orden.' },
        {
          type: 'check', id: 'm1-comentario-orden', concept: 'algoritmo', mode: 'text',
          question: 'Las líneas que empiezan por `#` son **comentarios**: notas para personas que Python ignora. ¿Qué mostrará este programa?',
          code: '# print("Uno")\nprint("Dos")', answer: 'Dos',
          explain: 'La primera línea es un comentario: Python la salta. Solo se ejecuta print("Dos").',
        },
      ],
    },
    {
      id: 'lenguajes', title: 'Lenguajes naturales y lenguajes de programación', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'El español es un lenguaje **natural**: tiene dobles sentidos, ironía y frases que se entienden «por el contexto». Python es un lenguaje **formal**: cada símbolo significa exactamente una cosa y hay reglas estrictas, la **sintaxis**.' },
        { type: 'p', text: 'El programa que lee tu código y lo ejecuta se llama **intérprete**. Si una línea no sigue las reglas, el intérprete no la adivina: se detiene y te muestra un **error**.' },
        { type: 'code', run: true, title: 'Un error a propósito', code: 'print("Hola")\nprint("Adiós"', caption: 'Falta un paréntesis. Ejecútalo y lee cómo te lo explica LunaPy: el tipo de error, la línea y qué probar.' },
        { type: 'callout', tone: 'info', title: 'Equivocarse es normal', text: 'Quienes llevan años programando ven errores a diario. Lo importante es aprender a **leerlos**: te dicen qué ha pasado y en qué línea.' },
        {
          type: 'check', id: 'm1-formal', concept: 'errores', mode: 'choice',
          question: '¿Por qué Python no entiende la orden «escribe hola»?',
          options: [
            { text: 'Porque solo entiende instrucciones que siguen sus reglas exactas, como `print("hola")`', correct: true },
            { text: 'Porque no sabe español', why: 'Puedes escribir textos en español entre comillas; lo que no puede es interpretar frases libres como si fueran órdenes.' },
            { text: 'Porque falta un punto al final', why: 'Python no usa puntos al final de las líneas: cada instrucción va en su propia línea.' },
          ],
          explain: 'Python es un lenguaje formal: no interpreta intenciones, solo instrucciones escritas según su sintaxis.',
        },
      ],
    },
    { id: 'a1', activity: 'm1-order' },
    { id: 'a2', activity: 'm1-predict' },
    { id: 'a3', activity: 'm1-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Un **programa** es una lista de instrucciones que el ordenador sigue en orden; un **algoritmo** es la secuencia de pasos precisos que resuelve un problema.',
    'Pensamiento computacional: **descomponer**, **reconocer patrones**, **abstraer** y **diseñar algoritmos**.',
    'Python ejecuta de **arriba abajo**; las líneas que empiezan por `#` son comentarios y se ignoran.',
    'Python es un lenguaje **formal**: si algo no sigue la sintaxis, se detiene con un error que te dice qué y dónde.',
  ],
};

// =====================================================================
// Lección 1.2 · Python como calculadora
// =====================================================================
export const LESSON_CALCULADORA = {
  id: 'calculadora',
  moduleId: 'm1',
  code: '1.2',
  title: 'Python como calculadora',
  minutes: 25,
  bonusXp: 20,
  objectives: [
    'Escribir expresiones con + − * / y mostrar su resultado',
    'Distinguir la división normal (/), la entera (//) y el resto (%)',
    'Aplicar el orden de las operaciones y usar paréntesis',
    'Usar round() y abs(), y reconocer los errores más comunes al calcular',
  ],
  prerequisites: ['Lección 1.1 (recomendada)'],
  teaser: 'Hoy conviertes Python en tu calculadora: operaciones, tres formas de dividir, el orden de las operaciones y los redondeos.',
  celebration: 'Python ya es tu calculadora: sabes dividir de tres formas, respetar el orden de las operaciones y redondear. En la siguiente lección escribirás tus primeros programas completos.',
  steps: [
    {
      id: 'expresiones', title: 'Python sabe calcular', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'Una **expresión** es una combinación de valores y operadores que Python puede calcular: `2 + 3` es una expresión y su resultado es `5`.' },
        { type: 'p', text: 'Para ver el resultado, pídele a Python que lo muestre con `print()`:' },
        { type: 'code', run: true, code: 'print(2 + 3)\nprint(10 - 4)\nprint(6 * 7)\nprint(20 / 4)' },
        { type: 'callout', tone: 'warn', title: 'La división siempre da decimal', text: 'Fíjate en la última línea: `20 / 4` da `5.0`, no `5`. El operador `/` siempre devuelve un número decimal (**float**), aunque la división sea exacta.' },
        {
          type: 'check', id: 'm1-mult', concept: 'operadores', mode: 'choice',
          question: '¿Qué símbolo usa Python para multiplicar?',
          options: [
            { text: '`*` (asterisco)', correct: true },
            { text: '`x`', why: 'La x es una letra: Python la confundiría con un nombre.' },
            { text: '`·`', why: 'Ese símbolo no forma parte de Python: se usa el asterisco `*`.' },
          ],
        },
      ],
    },
    {
      id: 'division', title: 'Repartir: /, // y %', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'Imagina que repartes 17 caramelos entre 5 personas. Puedes hacerte tres preguntas distintas, y Python tiene un operador para cada una:' },
        {
          type: 'five', items: {
            '/  división': '`17 / 5` → `3.4`: el reparto exacto, con decimales.',
            '//  división entera': '`17 // 5` → `3`: cuántos caramelos enteros recibe cada persona.',
            '%  resto': '`17 % 5` → `2`: cuántos caramelos sobran.',
          },
        },
        { type: 'code', run: true, code: 'print(17 / 5)\nprint(17 // 5)\nprint(17 % 5)' },
        {
          type: 'check', id: 'm1-resto', concept: 'operadores', mode: 'text',
          question: 'Predice:', code: 'print(23 % 4)', answer: '3',
          explain: '23 entre 4 cabe 5 veces (5 × 4 = 20) y sobran 3.',
        },
        {
          type: 'more', summary: '¿Para qué sirve el resto?',
          items: [
            'Saber si un número es par: `n % 2` da 0 cuando es par.',
            'Pasar minutos a horas y minutos: `135 // 60` horas y `135 % 60` minutos.',
            'Repartir cosas en grupos y saber cuántas sobran.',
          ],
        },
      ],
    },
    {
      id: 'prioridad', title: 'Potencias y orden de las operaciones', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: '`**` eleva a una potencia: `2 ** 3` es 2 × 2 × 2 = 8.' },
        { type: 'p', text: 'Cuando hay varios operadores, Python sigue las reglas de las matemáticas: primero los **paréntesis**, después las **potencias**, luego **multiplicaciones y divisiones** y, por último, **sumas y restas**. Con la misma prioridad, de izquierda a derecha.' },
        { type: 'code', run: true, code: 'print(2 ** 3)\nprint(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(10 - 4 - 3)\nprint(10 - (4 - 3))' },
        {
          type: 'check', id: 'm1-prioridad', concept: 'operadores', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print(10 - 2 * 3)', expectOutput: '4',
          options: [
            { text: '4', correct: true },
            { text: '24', why: 'Python multiplica antes de restar: 2 × 3 = 6 y 10 − 6 = 4. Para obtener 24 harían falta paréntesis: `(10 - 2) * 3`.' },
          ],
        },
        {
          type: 'check', id: 'm1-potencia', concept: 'operadores', mode: 'text',
          question: 'Predice:', code: 'print((1 + 2) ** 2)', answer: '9',
          explain: 'Primero el paréntesis (1 + 2 = 3) y después la potencia: 3 × 3 = 9.',
        },
      ],
    },
    {
      id: 'funciones', title: 'Redondear y valor absoluto', concepts: ['operadores'],
      blocks: [
        { type: 'p', text: 'Python trae **funciones** ya hechas para cálculos frecuentes. Se usan escribiendo su nombre y, entre paréntesis, los valores con los que trabajan:' },
        { type: 'code', run: true, code: 'print(round(3.14159, 2))\nprint(round(7.4))\nprint(abs(-12))' },
        { type: 'callout', tone: 'tip', title: 'Dos funciones muy útiles', text: '`round(x, 2)` redondea a 2 decimales: perfecto para dinero. `abs(x)` da el valor absoluto, es decir, la distancia al cero, siempre positiva.' },
        {
          type: 'more', summary: 'Un detalle curioso de round()',
          items: ['`round(7.5)` da `8`, pero `round(6.5)` da `6`: Python redondea los empates (.5) al número **par** más cercano. Es una norma estadística para no inflar los resultados al redondear muchos números.'],
        },
        {
          type: 'check', id: 'm1-round', concept: 'operadores', mode: 'text',
          question: 'Predice:', code: 'print(round(2.678, 1))', answer: '2.7',
          explain: 'Con un decimal, 2.678 se queda en 2.7 (el 7 de las centésimas hace subir las décimas).',
        },
      ],
    },
    {
      id: 'errores-calculo', title: 'Errores al calcular', concepts: ['errores', 'operadores'],
      blocks: [
        { type: 'p', text: 'Ejecuta cada ejemplo y lee la explicación. El tercero es el más traicionero: **no da error**.' },
        { type: 'code', run: true, title: 'Dividir entre cero', code: 'print(10 / 0)' },
        { type: 'code', run: true, title: 'Olvidar un número', code: 'print(5 + )' },
        { type: 'code', run: true, title: 'Usar coma decimal', code: 'print(3,5 + 1)', caption: 'Python usa el **punto** para los decimales. Con coma entiende dos valores distintos: 3 y 5 + 1.' },
        {
          type: 'check', id: 'm1-coma', concept: 'operadores', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print(2,5 * 2)', expectOutput: '2 10',
          options: [
            { text: '2 10', correct: true },
            { text: '5.0', why: 'Python no usa la coma para los decimales: `2,5` son dos valores (2 y 5). Para el decimal hay que escribir `2.5`.' },
            { text: 'Un error', why: 'No da error, y eso lo hace peligroso: print muestra 2 y, después, 5 × 2 = 10.' },
          ],
          explain: 'La coma separa valores en print(). Por eso los decimales siempre se escriben con punto: `2.5`.',
        },
      ],
    },
    { id: 'a1', activity: 'm1c-predict' },
    { id: 'a2', activity: 'm1c-complete' },
    { id: 'a3', activity: 'm1c-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Python calcula **expresiones** con `+ - * /` y las muestra con `print()`.',
    '`/` siempre da decimal; `//` da la parte entera y `%` el resto de la división.',
    '`**` es la potencia. Orden: paréntesis, potencias, multiplicaciones y divisiones, sumas y restas.',
    '`round(x, 2)` redondea y `abs(x)` da el valor absoluto.',
    'Los decimales se escriben con **punto**: `2,5` son dos valores, no dos y medio.',
  ],
};

// =====================================================================
// Lección 1.3 · Tu primer programa con print()
// =====================================================================
export const LESSON_PRIMER_PROGRAMA = {
  id: 'primer-programa',
  moduleId: 'm1',
  code: '1.3',
  title: 'Tu primer programa con print()',
  minutes: 25,
  bonusXp: 20,
  objectives: [
    'Mostrar textos y números con print(), solos o combinados',
    'Escribir comentarios útiles',
    'Reconocer los tipos int, float y str con type()',
    'Leer un mensaje de error y corregir el programa paso a paso',
  ],
  prerequisites: ['Lecciones 1.1 y 1.2 (recomendadas)'],
  teaser: 'Hoy escribes, ejecutas y depuras tus primeros programas completos: textos, comentarios, tipos y errores.',
  celebration: 'Has escrito, ejecutado y depurado tus primeros programas. Con esto completas el Módulo 1: estás lista para las variables.',
  steps: [
    {
      id: 'textos', title: 'Textos entre comillas', concepts: ['print'],
      blocks: [
        { type: 'p', text: '`print()` muestra en la pantalla lo que pongas entre sus paréntesis. Si es un **texto**, va entre comillas: dobles `"…"` o simples `\'…\'`, las dos valen igual.' },
        { type: 'code', run: true, code: 'print("¡Hola, mundo!")\nprint(\'LunaPy también habla español: ñ, á, ü\')' },
        { type: 'callout', tone: 'tip', title: 'Comillas dentro de un texto', text: 'Si tu texto lleva comillas dobles, rodéalo con simples, y al revés: `print(\'Dijo "hola"\')`.' },
        {
          type: 'check', id: 'm1-comillas', concept: 'print', mode: 'choice',
          question: '¿Cuál de estas líneas es correcta?',
          options: [
            { text: '`print("Me llamo Ana")`', correct: true },
            { text: '`print(Me llamo Ana)`', why: 'Sin comillas, Python intenta entender Me, llamo y Ana como nombres: da un error de sintaxis.' },
            { text: '`print("Me llamo Ana\')`', why: 'Las comillas de apertura y de cierre tienen que ser del mismo tipo.' },
          ],
        },
      ],
    },
    {
      id: 'varios', title: 'Mostrar varias cosas a la vez', concepts: ['print'],
      blocks: [
        { type: 'p', text: 'Puedes pasar **varios valores** a `print()` separándolos con comas: los muestra en la misma línea, con un espacio entre ellos. Pueden ser textos, números o cálculos.' },
        { type: 'code', run: true, code: 'print("Tengo", 3, "gatos")\nprint("2 + 2 =", 2 + 2)\nprint()\nprint("Después de una línea en blanco")' },
        { type: 'callout', tone: 'info', title: 'print() vacío', text: 'Escribe una línea en blanco: útil para separar partes de la salida.' },
        {
          type: 'check', id: 'm1-texto-calculo', concept: 'print', mode: 'choice',
          question: '¿Qué mostrará?', code: 'print("3 + 4")', expectOutput: '3 + 4',
          options: [
            { text: '3 + 4', correct: true },
            { text: '7', why: 'Entre comillas es un texto: Python lo muestra tal cual, sin calcularlo. Sin comillas, `print(3 + 4)` mostraría 7.' },
          ],
        },
        {
          type: 'check', id: 'm1-varios', concept: 'print', mode: 'text',
          question: 'Predice (cuidado con los espacios):', code: 'print("Total:", 5 * 4, "€")', answer: 'Total: 20 €',
          explain: 'print separa con un espacio cada valor: «Total:», el resultado 20 y «€».',
        },
      ],
    },
    {
      id: 'comentarios', title: 'Comentarios: notas para personas', concepts: ['print'],
      blocks: [
        { type: 'p', text: 'Todo lo que va detrás de `#` es un **comentario**: Python lo ignora. Sirve para explicar el código a quien lo lea, incluida tú dentro de un mes.' },
        { type: 'code', run: true, code: '# Programa que calcula los segundos de una hora\nprint(60 * 60)  # 60 minutos de 60 segundos' },
        { type: 'callout', tone: 'tip', title: 'Buenos comentarios', text: 'Explica **por qué** haces algo, no lo que ya se ve. `# 60 minutos de 60 segundos` ayuda; `# multiplico` no aporta nada.' },
        {
          type: 'check', id: 'm1-comentario', concept: 'print', mode: 'text',
          question: 'Predice:', code: 'print("A")  # print("B")', answer: 'A',
          explain: 'Todo lo que hay detrás de # se ignora, aunque esté en la misma línea.',
        },
      ],
    },
    {
      id: 'tipos', title: 'Tipos de valores', concepts: ['tipos'],
      blocks: [
        { type: 'p', text: 'Cada valor tiene un **tipo**. De momento te bastan tres: `int` (enteros, como 7), `float` (decimales, como 2.5) y `str` (textos, como "hola"). La función `type()` te dice el tipo de cualquier valor:' },
        { type: 'code', run: true, code: 'print(type(7))\nprint(type(2.5))\nprint(type("hola"))\nprint(type("7"))' },
        { type: 'callout', tone: 'warn', title: '"7" no es 7', text: 'Con comillas es un texto, aunque parezca un número. Lo verás a fondo en la lección de variables.' },
        {
          type: 'check', id: 'm1-tipo', concept: 'tipos', mode: 'choice',
          question: '¿De qué tipo es el resultado de `10 / 2`?', code: 'print(type(10 / 2))', expectOutput: "<class 'float'>",
          options: [
            { text: '`float` (decimal)', correct: true },
            { text: '`int` (entero)', why: '`/` siempre da un decimal: `10 / 2` es `5.0`. Con `//` sí obtendrías un entero.' },
          ],
        },
      ],
    },
    {
      id: 'depurar', title: 'Depurar: leer los errores', concepts: ['errores'],
      blocks: [
        { type: 'p', text: 'Un error en un programa (en inglés, *bug*) es algo que impide que funcione como esperas. **Depurar** es encontrarlo y corregirlo, como una detective: observas, formulas una hipótesis y la compruebas.' },
        { type: 'code', run: true, title: 'Mayúsculas', code: 'Print("Hola")' },
        { type: 'code', run: true, title: 'Comillas sin cerrar', code: 'print("Hola)' },
        { type: 'code', run: true, title: 'Paréntesis sin cerrar', code: 'print("Hola"' },
        { type: 'p', text: 'Cada mensaje de error te da tres pistas: el **tipo** de error, la **línea** y una **explicación**. Empieza siempre por la línea que indica.' },
        {
          type: 'check', id: 'm1-nameerror', concept: 'errores', mode: 'choice',
          question: '¿Qué ocurre al ejecutar este programa?', code: 'Print("Hola")', expectError: 'NameError',
          options: [
            { text: 'NameError: Python no conoce `Print`', correct: true },
            { text: 'SyntaxError', why: 'La línea está bien escrita; el problema aparece al ejecutarla: `Print`, con P mayúscula, no existe.' },
            { text: 'Muestra Hola', why: 'Python distingue mayúsculas y minúsculas: `print` funciona, `Print` no.' },
          ],
          explain: 'Python distingue mayúsculas y minúsculas: la función se llama `print`, en minúsculas.',
        },
      ],
    },
    { id: 'a1', activity: 'm1p-predict' },
    { id: 'a2', activity: 'm1p-fix' },
    { id: 'a3', activity: 'm1p-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Los textos van entre comillas, dobles o simples, siempre del mismo tipo al abrir y al cerrar.',
    '`print()` puede mostrar varios valores separados por comas; `print()` vacío escribe una línea en blanco.',
    'Los **comentarios** (`#`) explican el porqué del código y Python los ignora.',
    'Tipos básicos: `int`, `float` y `str`; `type()` te dice cuál es cada uno.',
    'Depurar: lee el tipo de error y la línea, corrige y vuelve a ejecutar.',
  ],
};

export const LESSONS_M1 = [LESSON_ALGORITMOS, LESSON_CALCULADORA, LESSON_PRIMER_PROGRAMA];

// =====================================================================
// Actividades del Módulo 1
// =====================================================================
export const ACTIVITIES_M1 = {
  // ------------------------------------------------------------- 1.1
  'm1-order': {
    id: 'm1-order', type: 'order', kindLabel: 'Ordena los pasos', topic: TOPIC,
    title: 'Un cacao con algoritmo', difficulty: 1, xp: 10, concepts: ['algoritmo', 'descomponer'],
    statement: 'Ordena los pasos para **preparar una taza de cacao caliente**. Piensa qué necesita cada paso para poder hacerse.',
    stages: [
      {
        title: 'Ordena el algoritmo',
        items: [
          { id: 'k1', text: 'Sacar una taza', after: [] },
          { id: 'k2', text: 'Echar leche en la taza', after: ['k1'], why: 'No puedes echar leche en una taza que todavía no has sacado.' },
          { id: 'k3', text: 'Calentar la taza en el microondas 1 minuto', after: ['k2'], why: 'Lo que se calienta es la leche: primero tiene que estar en la taza.' },
          { id: 'k4', text: 'Añadir dos cucharadas de cacao', after: ['k1'], why: 'El cacao va en la taza: antes hay que sacarla.' },
          { id: 'k5', text: 'Remover hasta que se disuelva', after: ['k3', 'k4'], why: 'Remover sirve para mezclar el cacao con la leche caliente: los dos tienen que estar ya en la taza.' },
        ],
        success: 'Fíjate: «añadir el cacao» puede ir antes o después de calentar la leche y el resultado es el mismo. Saber qué pasos dependen de otros —y cuáles no— es pensar como una programadora.',
      },
    ],
  },
  'm1-predict': {
    id: 'm1-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'La cuenta atrás', difficulty: 1, xp: 10, concepts: ['algoritmo'],
    prompt: 'Python ejecuta de arriba abajo. **¿Qué mostrará este programa?**',
    code: 'print("3")\nprint("2")\n# print("¿Seguro?")\nprint("1")\nprint("¡Despega!")',
    expectedOutput: '3\n2\n1\n¡Despega!',
    options: [
      { text: '3, 2, 1 y ¡Despega!, cada uno en su línea', correct: true },
      { text: '3, 2, ¿Seguro?, 1 y ¡Despega!', concept: 'algoritmo', why: 'La línea que empieza por `#` es un comentario: Python la ignora por completo.' },
      { text: '¡Despega!, 1, 2 y 3', concept: 'algoritmo', why: 'Python no reordena nada: ejecuta las líneas en el orden en que están escritas, de arriba abajo.' },
      { text: 'Nada: el programa se detiene en la línea del #', concept: 'algoritmo', why: 'Un comentario no es un error: Python simplemente lo salta y sigue con la línea siguiente.' },
    ],
    explain: [
      'Líneas 1 y 2: muestran 3 y 2.',
      'Línea 3: empieza por `#`, es un comentario y Python la salta.',
      'Líneas 4 y 5: muestran 1 y ¡Despega!',
    ],
  },
  'm1-build': {
    id: 'm1-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Tu primer algoritmo en Python', difficulty: 1, xp: 15, concepts: ['algoritmo', 'print'],
    unlock: { any: ['m1-order', 'm1-predict'], count: 1, text: 'Supera al menos una de las actividades anteriores de la lección' },
    statement: 'Escribe un programa que muestre, **en este orden y uno por línea**, los pasos para lavarse las manos:',
    expected: '1. Mojar las manos\n2. Poner jabón\n3. Frotar 20 segundos\n4. Aclarar\n5. Secar',
    starter: '# Escribe aquí tu programa: una instrucción print() por cada paso\n',
    spec: {
      skip_tips: ['repeated_numbers'], // las variables llegan en el Módulo 2
      cases: [{ label: 'Salida esperada', out_lines: ['1. Mojar las manos', '2. Poner jabón', '3. Frotar 20 segundos', '4. Aclarar', '5. Secar'] }],
      rules: [{ type: 'must_call', name: 'print', title: 'Falta print()', msg: 'Usa print() para mostrar cada paso.' }],
      misconceptions: [
        { out_lines: ['Mojar las manos', 'Poner jabón', 'Frotar 20 segundos', 'Aclarar', 'Secar'], title: 'Faltan los números', msg: 'Los pasos están bien, pero cada línea debe empezar por su número: «1. Mojar las manos».' },
      ],
      logic_msg: 'Compara línea a línea con la salida esperada: el orden, los números, las tildes y los signos tienen que coincidir.',
    },
    hints: [
      { level: 'Orientación', text: 'Tienes que mostrar cinco líneas de texto, exactamente como en la salida esperada y en ese orden.' },
      { level: 'Razonamiento', text: 'Python ejecuta de arriba abajo y cada `print()` escribe una línea. ¿Cuántas instrucciones necesitas? ¿En qué orden?' },
      { level: 'Pseudocódigo', text: 'mostrar «1. Mojar las manos»\nmostrar «2. Poner jabón»\n… y así hasta «5. Secar»', pre: true },
      { level: 'Ayuda técnica', text: 'Un texto va entre comillas dentro de `print()`: `print("1. Mojar las manos")`. Copia las tildes y los puntos tal cual.' },
    ],
    solution: {
      code: 'print("1. Mojar las manos")\nprint("2. Poner jabón")\nprint("3. Frotar 20 segundos")\nprint("4. Aclarar")\nprint("5. Secar")',
      explanation: 'Cinco instrucciones print(), una por paso y en el orden del algoritmo. Python las ejecuta de arriba abajo, así que la salida respeta ese orden.',
    },
    reference: [
      'print("1. Mojar las manos")\nprint("2. Poner jabón")\nprint("3. Frotar 20 segundos")\nprint("4. Aclarar")\nprint("5. Secar")',
      '# Lavado de manos\nprint(\'1. Mojar las manos\')\nprint(\'2. Poner jabón\')\nprint(\'3. Frotar\', 20, \'segundos\')\nprint(\'4. Aclarar\')\nprint(\'5. Secar\')',
    ],
    wrongs: [
      { code: 'print("1. Mojar las manos")\nprint("3. Frotar 20 segundos")\nprint("2. Poner jabón")\nprint("4. Aclarar")\nprint("5. Secar")', category: 'logica' },
      { code: 'print("Mojar las manos")\nprint("Poner jabón")\nprint("Frotar 20 segundos")\nprint("Aclarar")\nprint("Secar")', category: 'comprension' },
      { code: 'print(1. Mojar las manos)', category: 'sintaxis' },
    ],
  },

  // ------------------------------------------------------------- 1.2
  'm1c-predict': {
    id: 'm1c-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Tres formas de dividir', difficulty: 1, xp: 10, concepts: ['operadores'],
    prompt: 'Tres operadores parecidos, tres resultados distintos. **¿Qué mostrará?**',
    code: 'print(7 // 2, 7 % 2, 7 / 2)',
    expectedOutput: '3 1 3.5',
    options: [
      { text: '3 1 3.5', correct: true },
      { text: '3.5 3.5 3.5', concept: 'operadores', why: 'Son tres operadores distintos: `//` da la parte entera, `%` el resto y `/` el resultado con decimales.' },
      { text: '3 1.5 3.5', concept: 'operadores', why: '`%` da el **resto** de la división entera: 7 = 2 × 3 + 1, así que sobra 1.' },
      { text: '4 1 3.5', concept: 'operadores', why: '`//` no redondea: se queda con la parte entera (3), igual que cuando repartes caramelos enteros.' },
    ],
    explain: ['`7 // 2` → 3: el 2 cabe 3 veces entero en el 7.', '`7 % 2` → 1: lo que sobra (7 − 6).', '`7 / 2` → 3.5: la división exacta, siempre con decimales.'],
  },
  'm1c-complete': {
    id: 'm1c-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'De minutos a horas', difficulty: 2, xp: 15, concepts: ['operadores'],
    statement: 'Una película dura **135 minutos**. Sustituye cada `___` por el operador adecuado para que el programa muestre:',
    expected: '135 minutos son 2 horas y 15 minutos',
    starter: 'print(135, "minutos son", 135 ___ 60, "horas y", 135 ___ 60, "minutos")',
    spec: {
      skip_tips: ['repeated_numbers'], // las variables llegan en el Módulo 2
      blanks: true,
      cases: [{ label: 'Salida esperada', out_lines: ['135 minutos son 2 horas y 15 minutos'] }],
      misconceptions: [
        { out_lines: ['135 minutos son 2.25 horas y 15 minutos'], title: 'Horas con decimales', msg: 'Con `/` obtienes horas con decimales (2.25). Para las horas **completas** necesitas `//`.' },
        { out_lines: ['135 minutos son 2 horas y 2.25 minutos'], title: 'Revisa el segundo hueco', msg: 'Los minutos que sobran son el **resto** de la división: eso lo da `%`, no `/`.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['FloorDiv', 'Mod'], title: 'Calcúlalo con operadores', msg: 'Calcula las horas y los minutos con // y % en lugar de escribir el resultado: así el programa serviría para cualquier duración.' }],
      logic_msg: 'Compara tu salida con la esperada. ¿Qué operador da las horas completas? ¿Y cuál los minutos que sobran?',
    },
    hints: [
      { level: 'Orientación', text: 'Hay dos huecos: el primero calcula las **horas completas**; el segundo, los **minutos que sobran**.' },
      { level: 'Razonamiento', text: 'Una hora tiene 60 minutos. ¿Cuántas veces cabe 60 entero en 135? ¿Cuánto sobra después?' },
      { level: 'Pseudocódigo', text: 'horas ← 135 entre 60, sin decimales\nminutos ← lo que sobra al dividir 135 entre 60', pre: true },
      { level: 'Ayuda técnica', text: '`//` da la parte entera de una división y `%` el resto: `17 // 5` → 3 y `17 % 5` → 2.' },
    ],
    solution: {
      code: 'print(135, "minutos son", 135 // 60, "horas y", 135 % 60, "minutos")',
      explanation: '`135 // 60` da 2 (horas completas) y `135 % 60` da 15 (los minutos que sobran). Si cambias 135 por otra duración, el programa sigue funcionando.',
    },
    reference: ['print(135, "minutos son", 135 // 60, "horas y", 135 % 60, "minutos")'],
    wrongs: [
      { code: 'print(135, "minutos son", 135 ___ 60, "horas y", 135 ___ 60, "minutos")', category: 'incompleto' },
      { code: 'print(135, "minutos son", 135 / 60, "horas y", 135 % 60, "minutos")', category: 'comprension' },
      { code: 'print("135 minutos son 2 horas y 15 minutos")', category: 'logica' },
    ],
  },
  'm1c-build': {
    id: 'm1c-build', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'La cuenta del restaurante', difficulty: 2, xp: 25, concepts: ['operadores', 'descomponer'],
    unlock: { any: ['m1c-predict', 'm1c-complete'], count: 1, text: 'Supera al menos una de las actividades anteriores de la lección' },
    statement: 'Cuatro amigas cenan juntas. La cuenta es de **86.50 €** y quieren dejar un **10 % de propina**. Escribe un programa que calcule **cuánto paga cada una**, redondeado a **2 decimales**.\n\nMuestra el resultado en la última línea (puedes acompañarlo de texto).',
    plan: [
      {
        q: '¿Qué datos necesitas?', multi: true,
        options: [
          { text: 'El total de la cuenta (86.50 €)', correct: true },
          { text: 'El porcentaje de propina (10 %)', correct: true },
          { text: 'El número de personas (4)', correct: true },
          { text: 'Lo que ha pedido cada una', why: 'No hace falta: pagan a partes iguales. Ignorar lo que no influye en el resultado es **abstraer**.' },
        ],
      },
      {
        q: '¿En qué orden lo calculas?',
        options: [
          { text: 'Primero el total con propina; después lo divido entre 4', correct: true },
          { text: 'Primero divido entre 4 y después sumo 10 € a cada una', why: 'La propina es un 10 % del total, no 10 €: con 86.50 € la propina es 8.65 €.' },
        ],
      },
      {
        q: '¿Cómo calculas el total con un 10 % de propina?',
        options: [
          { text: '86.50 * 1.10 (o 86.50 + 86.50 * 10 / 100)', correct: true },
          { text: '86.50 + 10', why: 'Eso suma 10 €, no un 10 %.' },
          { text: '86.50 * 10', why: 'Eso multiplica la cuenta por diez.' },
        ],
      },
    ],
    planScaffold: '# 1. Calcular el total con la propina\n\n# 2. Repartirlo entre las 4 amigas\n\n# 3. Redondear a 2 decimales y mostrarlo\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'], // las variables llegan en el Módulo 2
      cases: [{ label: 'Cena de 86.50 € entre 4 con un 10 %', args: {} }],
      expect_last_number: 'round(86.5 * 1.1 / 4, 2)',
      tolerance: 0.001,
      misconceptions: [
        { expr: '86.5 * 1.1 / 4', category: 'logica', title: 'Falta redondear', msg: 'El cálculo es correcto, pero falta redondear a 2 decimales con `round(valor, 2)`.' },
        { expr: 'round(86.5 / 4, 2)', title: 'Te falta la propina', msg: 'Has repartido la cuenta, pero sin la propina del 10 %.' },
        { expr: '86.5 / 4', title: 'Te falta la propina', msg: 'Has repartido la cuenta, pero sin la propina del 10 %.' },
        { expr: 'round((86.5 + 10) / 4, 2)', title: 'Porcentaje ≠ euros', msg: 'Has sumado 10 €, no un 10 %. El 10 % de 86.50 € son 8.65 €.' },
        { expr: 'round(86.5 * 1.1, 2)', title: 'Falta repartir', msg: 'Ese es el total con propina: falta dividirlo entre las 4 amigas.' },
      ],
      rules: [
        { type: 'must_call', name: 'round', category: 'comprension', title: 'Falta redondear', msg: 'El enunciado pide el resultado redondeado a 2 decimales: usa round(valor, 2).' },
        { type: 'must_use_op', ops: ['Div'], title: 'Calcúlalo', msg: 'Haz que Python calcule el reparto con una división en lugar de escribir el resultado.' },
      ],
    },
    hints: [
      { level: 'Orientación', text: 'Tienes tres datos (86.50, 10 % y 4 personas) y un resultado: lo que paga cada una, con 2 decimales.' },
      { level: 'Razonamiento', text: 'Descompón: primero el total con la propina, después el reparto y al final el redondeo. Puedes hacerlo todo en una expresión con paréntesis.' },
      { level: 'Pseudocódigo', text: 'total ← 86.50 más su 10 %\ncada una ← total ÷ 4\nmostrar cada una redondeado a 2 decimales', pre: true },
      { level: 'Ayuda técnica', text: 'Sumar un 10 % es multiplicar por 1.10. Para redondear: `round(valor, 2)`. Ejemplo de estructura: `print(round(... / 4, 2))`.' },
    ],
    solution: {
      code: '# Total con un 10 % de propina, repartido entre 4 y redondeado a céntimos\nprint("Cada una paga", round(86.50 * 1.10 / 4, 2), "€")',
      explanation: 'Multiplicar por 1.10 suma el 10 % de propina (95.15 €). Al dividir entre 4 sale 23.7875 y `round(…, 2)` lo deja en 23.79 €.',
    },
    reference: [
      'print(round(86.50 * 1.10 / 4, 2))',
      'print("Cada una paga", round((86.5 + 86.5 * 10 / 100) / 4, 2), "€")',
    ],
    wrongs: [
      { code: 'print(round(86.5 / 4, 2))', category: 'comprension' },
      { code: 'print(86.5 * 1.1 / 4)', category: 'logica' },
      { code: 'print(23.79)', category: 'comprension' },
      { code: 'print(round((86.5 + 10) / 4, 2))', category: 'comprension' },
    ],
  },

  // ------------------------------------------------------------- 1.3
  'm1p-predict': {
    id: 'm1p-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Textos, números y operaciones', difficulty: 1, xp: 10, concepts: ['print', 'tipos'],
    prompt: 'Este programa mezcla textos y números. **¿Qué mostrará?**',
    code: 'print("Py" + "thon", 3 * "ja", 10 / 4)',
    expectedOutput: 'Python jajaja 2.5',
    options: [
      { text: 'Python jajaja 2.5', correct: true },
      { text: 'Py thon jajaja 2.5', concept: 'print', why: '`+` une los textos sin añadir espacios. Los espacios solo aparecen entre los valores separados por comas.' },
      { text: 'Python 3ja 2.5', concept: 'tipos', why: 'Multiplicar un texto por un número lo **repite**: `3 * "ja"` es `"jajaja"`.' },
      { text: 'Python jajaja 2', concept: 'operadores', why: '`/` siempre da decimal: `10 / 4` es 2.5.' },
    ],
    explain: ['`"Py" + "thon"` une los dos textos: "Python".', '`3 * "ja"` repite el texto tres veces: "jajaja".', '`10 / 4` es 2.5.', 'print separa los tres valores con un espacio.'],
  },
  'm1p-fix': {
    id: 'm1p-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El programa con tres errores', difficulty: 2, xp: 20, concepts: ['errores', 'print'],
    statement: 'Este programa debería mostrar una tarjeta de bienvenida, pero tiene **tres errores**. Ejecútalo, lee cada error y corrígelos uno a uno.',
    expected: 'Bienvenida a LunaPy\nHoy aprendo 3 cosas\n¡A programar!',
    starter: 'Print("Bienvenida a LunaPy")\nprint("Hoy aprendo", 1 + 2, "cosas)\nprint("¡A programar!"',
    spec: {
      skip_tips: ['repeated_numbers'], // las variables llegan en el Módulo 2
      cases: [{ label: 'Salida esperada', out_lines: ['Bienvenida a LunaPy', 'Hoy aprendo 3 cosas', '¡A programar!'] }],
      rules: [{ type: 'must_use_op', ops: ['Add'], title: 'Mantén el cálculo', msg: 'Deja que Python calcule 1 + 2 en lugar de escribir el 3 a mano.' }],
      logic_msg: 'Ya no hay errores, pero la salida no coincide. Revisa los textos letra a letra y los espacios: print añade un espacio entre los valores separados por comas.',
    },
    hints: [
      { level: 'Orientación', text: 'Pulsa **Ejecutar**. Python revisa primero que todo esté bien escrito (la sintaxis) y te avisa del primer problema que encuentra. Corrige ese, vuelve a ejecutar y repite.' },
      { level: 'Razonamiento', text: 'Repasa cada línea: ¿las comillas se abren y se cierran? ¿Y los paréntesis? ¿`print` está escrito exactamente así, en minúsculas?' },
      { level: 'Pseudocódigo', text: 'Línea 2: cerrar las comillas de "cosas"\nLínea 3: cerrar el paréntesis\nLínea 1: escribir print en minúsculas', pre: true },
      { level: 'Ayuda técnica', text: 'Un texto empieza y acaba con comillas: `"cosas"`. Cada `(` necesita su `)`. Python distingue mayúsculas: `print` no es lo mismo que `Print`.' },
    ],
    solution: {
      code: 'print("Bienvenida a LunaPy")\nprint("Hoy aprendo", 1 + 2, "cosas")\nprint("¡A programar!")',
      explanation: 'Los errores de sintaxis (comillas y paréntesis sin cerrar) aparecen primero, porque Python revisa todo el programa antes de ejecutarlo. Al corregirlos aparece el `NameError` de `Print`, que solo se detecta al ejecutar.',
    },
    reference: ['print("Bienvenida a LunaPy")\nprint("Hoy aprendo", 1 + 2, "cosas")\nprint("¡A programar!")'],
    wrongs: [
      { code: 'Print("Bienvenida a LunaPy")\nprint("Hoy aprendo", 1 + 2, "cosas)\nprint("¡A programar!"', category: 'sintaxis' },
      { code: 'Print("Bienvenida a LunaPy")\nprint("Hoy aprendo", 1 + 2, "cosas")\nprint("¡A programar!")', category: 'ejecucion' },
      { code: 'print("Bienvenida a LunaPy")\nprint("Hoy aprendo 3 cosas")\nprint("¡A programar!")', category: 'logica' },
    ],
  },
  'm1p-build': {
    id: 'm1p-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Los segundos de un día', difficulty: 2, xp: 20, concepts: ['operadores', 'print'],
    unlock: { any: ['m1p-predict', 'm1p-fix'], count: 1, text: 'Supera al menos una de las actividades anteriores de la lección' },
    statement: '¿Cuántos segundos tiene un día? Escribe un programa que lo **calcule** a partir de lo que ya sabes (un día tiene 24 horas, una hora 60 minutos y un minuto 60 segundos) y muestre:',
    expected: 'Un día tiene 86400 segundos',
    note: 'No escribas 86400 a mano: haz que Python lo calcule.',
    plan: [
      {
        q: '¿Qué operación conecta horas, minutos y segundos?',
        options: [
          { text: 'Multiplicar: 24 × 60 × 60', correct: true },
          { text: 'Sumar: 24 + 60 + 60', why: 'Cada una de las 24 horas tiene 60 minutos: no se suman, se multiplican.' },
        ],
      },
      {
        q: '¿Cómo muestras el resultado junto al texto?',
        options: [
          { text: 'print("Un día tiene", 24 * 60 * 60, "segundos")', correct: true },
          { text: 'print("Un día tiene 24 * 60 * 60 segundos")', why: 'Dentro de las comillas todo es texto: Python lo mostraría tal cual, sin calcular.' },
        ],
      },
    ],
    planScaffold: '# 1. Calcular los segundos: horas × minutos × segundos\n\n# 2. Mostrar el resultado con el texto\n',
    starter: '',
    spec: {
      skip_tips: ['repeated_numbers'], // las variables llegan en el Módulo 2
      cases: [{ label: 'Salida esperada', out_lines: ['Un día tiene 86400 segundos'] }],
      misconceptions: [
        { out_lines: ['Un día tiene 1440 segundos'], title: 'Esos son minutos', msg: '1440 son los **minutos** de un día (24 × 60). Falta multiplicar por los 60 segundos de cada minuto.' },
        { out_lines: ['Un día tiene 144 segundos'], title: 'No se suman', msg: 'Has sumado 24 + 60 + 60. Cada hora tiene 60 minutos y cada minuto 60 segundos: hay que multiplicar.' },
        { out_contains: '24 * 60 * 60', title: 'El cálculo está dentro del texto', msg: 'Dentro de las comillas, Python muestra el cálculo como texto. Sácalo fuera de las comillas y sepáralo con comas.' },
      ],
      rules: [{ type: 'must_use_op', ops: ['Mult'], title: 'Calcúlalo', msg: 'Haz que Python calcule el resultado con multiplicaciones (24 * 60 * 60) en lugar de escribirlo.' }],
      logic_msg: 'Compara tu salida con la esperada: el texto y los espacios tienen que coincidir.',
    },
    hints: [
      { level: 'Orientación', text: 'Necesitas un número (los segundos de un día) y una frase alrededor.' },
      { level: 'Razonamiento', text: 'Si un minuto tiene 60 segundos, una hora tiene 60 veces eso. ¿Y un día?' },
      { level: 'Pseudocódigo', text: 'segundos ← 24 × 60 × 60\nmostrar «Un día tiene», segundos, «segundos»', pre: true },
      { level: 'Ayuda técnica', text: 'print puede mezclar textos y cálculos separados por comas: `print("Un día tiene", 24 * 60 * 60, "segundos")`.' },
    ],
    solution: {
      code: '# 24 horas × 60 minutos × 60 segundos\nprint("Un día tiene", 24 * 60 * 60, "segundos")',
      explanation: 'Python calcula 24 × 60 × 60 = 86400 y print lo muestra entre los dos textos, separados por espacios.',
    },
    reference: [
      'print("Un día tiene", 24 * 60 * 60, "segundos")',
      'print("Un día tiene", 60 * 60 * 24, "segundos")',
    ],
    wrongs: [
      { code: 'print("Un día tiene", 24 * 60, "segundos")', category: 'comprension' },
      { code: 'print("Un día tiene 86400 segundos")', category: 'logica' },
      { code: 'print("Un día tiene 24 * 60 * 60 segundos")', category: 'comprension' },
    ],
  },
};
