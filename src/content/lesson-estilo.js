// Lección 13.2 · Estilo y buenas prácticas. Contenido original, alineado con el cap. 19
// de «Piensa en Python» (reflexiones finales) y la guía de estilo PEP 8: nombres,
// espacios, funciones pequeñas, sin variables globales y la estructura con main().

const TOPIC = 'Depuración';

export const LESSON_ESTILO = {
  id: 'estilo',
  moduleId: 'm13',
  code: '13.2',
  title: 'Estilo y buenas prácticas',
  minutes: 30,
  bonusXp: 30,
  objectives: [
    'Seguir las convenciones de nombres de PEP 8',
    'Escribir código legible: espacios, líneas cortas y comentarios útiles',
    'Evitar modificar variables globales desde las funciones',
    'Organizar un programa con una función main()',
    'Refactorizar un script desordenado en funciones claras',
  ],
  prerequisites: ['Lección 13.1 «Estrategias de depuración»'],
  teaser: 'El código se lee muchas más veces de las que se escribe. Hoy aprendes las costumbres que hacen que tu código se entienda, incluso dentro de un año.',
  celebration: 'Tu código ya no solo funciona: se lee bien, está ordenado y es fácil de cambiar.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'nombres', title: 'Nombres al estilo Python', concepts: ['estilo'],
      blocks: [
        { type: 'p', text: '**PEP 8** es la guía de estilo oficial de Python. Sus convenciones de nombres son las que has visto durante todo el curso:' },
        {
          type: 'five', items: {
            'variables y funciones': 'minúsculas_con_guiones: `precio_final`, `calcular_media`.',
            'Clases': 'PalabrasConMayúscula: `CuentaAhorro`, `Rectangulo`.',
            'CONSTANTES': 'MAYÚSCULAS_CON_GUIONES: `IVA`, `MAX_INTENTOS`.',
            'Nombres que explican': '`notas_aprobadas` mejor que `l2`. Las funciones, con verbos: `guardar`, `es_valido`.',
          },
        },
        {
          type: 'classify', id: 'm13e-nombres', concept: 'estilo',
          question: '¿Sigue las convenciones de PEP 8?',
          items: [
            { text: 'def calcular_total(precios):', valid: true, why: 'Función en minúsculas con guion bajo y un verbo que explica qué hace.' },
            { text: 'class cuenta_bancaria:', valid: false, why: 'Las clases van en PalabrasConMayúscula: CuentaBancaria.' },
            { text: 'MAX_INTENTOS = 3', valid: true, why: 'Una constante, en mayúsculas.' },
            { text: 'def CalcularTotal(p):', valid: false, why: 'Las funciones van en minúsculas (calcular_total), y p no explica qué es.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'legible', title: 'Código que se lee bien', concepts: ['estilo'],
      blocks: [
        { type: 'p', text: 'Python hace lo mismo con las dos versiones, pero una persona no lee igual:' },
        { type: 'code', title: 'Apretado', code: 'def f(a,b):\n    x=a*b/100\n    return a-x' },
        { type: 'code', run: true, title: 'Legible', code: 'def precio_con_descuento(precio, porcentaje):\n    """Devuelve el precio tras aplicar el descuento indicado."""\n    descuento = precio * porcentaje / 100\n    return precio - descuento\n\nprint(precio_con_descuento(80, 25))' },
        {
          type: 'five', items: {
            'Espacios': 'Alrededor de `=` y de los operadores, y tras las comas.',
            'Líneas cortas': 'Menos de unos 80 caracteres; si una línea es larga, sepárala en pasos con nombre.',
            'Comentarios': 'Explican el **porqué**, no repiten el código.',
            'Funciones cortas': 'Una tarea cada una, con un nombre que la describa.',
          },
        },
        {
          type: 'check', id: 'm13e-comentario', concept: 'estilo', mode: 'choice',
          question: '¿Qué comentario aporta más en `precio = precio * 1.21`?',
          options: [
            { text: '# Se añade el IVA del 21 % porque el precio de la base de datos va sin impuestos', correct: true },
            { text: '# Multiplica precio por 1.21', why: 'Repite lo que ya dice el código. Mejor explicar por qué se hace.' },
            { text: '# Precio', why: 'No aporta nada.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'globales', title: 'Nada de modificar variables globales', concepts: ['estilo', 'parametros'],
      blocks: [
        { type: 'p', text: 'Una función que modifica variables de fuera es difícil de entender y de probar: su resultado depende de algo que no se ve en su cabecera. Además, Python no te deja hacerlo directamente:' },
        { type: 'code', run: true, code: 'total = 0\n\ndef anadir(importe):\n    total += importe     # UnboundLocalError\n\nanadir(10)' },
        { type: 'p', text: 'La solución limpia es la regla de siempre: **los datos entran por parámetros y salen con return**.' },
        { type: 'code', run: true, code: 'def anadir(total, importe):\n    return total + importe\n\ntotal = 0\ntotal = anadir(total, 10)\ntotal = anadir(total, 5)\nprint(total)' },
        {
          type: 'more', summary: '¿Y la palabra global?',
          items: ['Existe `global total`, que permite modificar la variable de fuera. Funciona, pero hace que las funciones dependan unas de otras de forma invisible. En programas de verdad se evita casi siempre.'],
        },
        {
          type: 'check', id: 'm13e-global', concept: 'estilo', mode: 'choice',
          question: '¿Qué ocurre?', code: 'contador = 0\n\ndef sumar():\n    contador += 1\n\nsumar()', expectError: 'UnboundLocalError',
          options: [
            { text: 'UnboundLocalError: contador se usa antes de darle valor dentro de la función', correct: true },
            { text: 'contador pasa a valer 1', why: 'Al asignar a contador dentro de la función, Python la trata como local, y todavía no tiene valor.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'main', title: 'Organizar el programa con main()', concepts: ['estilo', 'funciones'],
      blocks: [
        { type: 'p', text: 'Una estructura clara para cualquier programa: importaciones y constantes arriba, después las funciones, y el programa principal dentro de una función `main()` que se llama al final:' },
        { type: 'code', run: true, code: 'IVA = 0.21\n\ndef con_iva(precio):\n    return round(precio * (1 + IVA), 2)\n\ndef main():\n    for precio in [10, 25.5]:\n        print(precio, "→", con_iva(precio))\n\nif __name__ == "__main__":\n    main()' },
        { type: 'callout', tone: 'info', title: 'if __name__ == "__main__"', text: 'Esta línea hace que main() se ejecute al lanzar el archivo, pero no si otro programa lo **importa** para reutilizar sus funciones. Es una costumbre muy extendida en Python.' },
        {
          type: 'check', id: 'm13e-main', concept: 'estilo', mode: 'choice',
          question: '¿Qué ventaja tiene meter el programa principal en main()?',
          options: [
            { text: 'Queda claro dónde empieza el programa y sus variables no son globales', correct: true },
            { text: 'El programa se ejecuta más rápido', why: 'La ventaja es de organización, no de velocidad.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'est-predict' },
    { id: 'a2', activity: 'est-complete' },
    { id: 'a3', activity: 'est-fix' },
    { id: 'a4', activity: 'est-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'PEP 8: `variables_y_funciones`, `Clases`, `CONSTANTES`, y nombres que expliquen.',
    'Espacios alrededor de operadores, líneas cortas, funciones pequeñas y comentarios que explican el porqué.',
    'No modifiques variables globales desde las funciones: parámetros para entrar, return para salir.',
    'Estructura: constantes, funciones y un `main()` llamado con `if __name__ == "__main__":`.',
  ],
};

export const ACTIVITIES_ESTILO = {
  'est-predict': {
    id: 'est-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El programa con main', difficulty: 2, xp: 10, concepts: ['estilo', 'funciones'],
    prompt: 'Un programa organizado con main(). **¿Qué mostrará?**',
    code: 'def saludar(nombre):\n    return f"Hola, {nombre}"\n\ndef main():\n    for nombre in ["Ana", "Leo"]:\n        print(saludar(nombre))\n\nprint("Inicio")\nif __name__ == "__main__":\n    main()',
    expectedOutput: 'Inicio\nHola, Ana\nHola, Leo',
    options: [
      { text: 'Inicio, Hola, Ana y Hola, Leo', correct: true },
      { text: 'Solo Inicio', concept: 'estilo', why: 'Al ejecutar el archivo directamente, __name__ vale "__main__" y se llama a main().' },
      { text: 'Hola, Ana, Hola, Leo e Inicio', concept: 'funciones', why: 'Python ejecuta de arriba abajo: el print de Inicio va antes de la llamada a main().' },
      { text: 'Nada: las funciones no se llaman', concept: 'estilo', why: 'main() se llama dentro del if del final.' },
    ],
    explain: ['Se definen saludar y main.', 'Se muestra «Inicio».', 'Como el archivo se ejecuta directamente, se llama a main(), que saluda a Ana y a Leo.'],
  },
  'est-complete': {
    id: 'est-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Ordena el programa', difficulty: 1, xp: 15, concepts: ['estilo'],
    statement: 'Completa los huecos para que el programa siga la estructura recomendada: una **constante** en mayúsculas y un **main()** que se llama al final.',
    expected: 'Entradas: 3, total 27 €',
    starter: '___ = 9   # precio de una entrada, en euros\n\ndef total_entradas(cantidad):\n    return cantidad * PRECIO_ENTRADA\n\ndef ___():\n    cantidad = 3\n    print(f"Entradas: {cantidad}, total {total_entradas(cantidad)} €")\n\nif __name__ == "___":\n    main()',
    spec: {
      blanks: true,
      functions: [{ name: 'total_entradas', params: 1 }, { name: 'main', params: 0 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Entradas: 3, total 27 €'] },
        { label: 'total_entradas(10)', call: 'print(total_entradas(10))', out_lines: ['90'] },
      ],
      logic_msg: 'Revisa los huecos: el nombre de la constante (el que usa la función), el nombre de la función principal y el valor especial de __name__.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: el nombre de la constante, el nombre de la función principal y el texto con el que se compara __name__.' },
      { level: 'Razonamiento', text: 'Mira qué nombre usa total_entradas para el precio. La función principal se llama… como se llama al final.' },
      { level: 'Pseudocódigo', text: 'PRECIO_ENTRADA ← 9\ndefinir main()\nsi __name__ es "__main__": main()', pre: true },
      { level: 'Ayuda técnica', text: '`PRECIO_ENTRADA = 9`, `def main():` y `if __name__ == "__main__":`.' },
    ],
    solution: {
      code: 'PRECIO_ENTRADA = 9   # precio de una entrada, en euros\n\ndef total_entradas(cantidad):\n    return cantidad * PRECIO_ENTRADA\n\ndef main():\n    cantidad = 3\n    print(f"Entradas: {cantidad}, total {total_entradas(cantidad)} €")\n\nif __name__ == "__main__":\n    main()',
      explanation: 'La constante en mayúsculas indica que no debe cambiar; main() agrupa el programa principal y la última línea lo pone en marcha.',
    },
    reference: ['PRECIO_ENTRADA = 9\n\ndef total_entradas(cantidad):\n    return cantidad * PRECIO_ENTRADA\n\ndef main():\n    cantidad = 3\n    print(f"Entradas: {cantidad}, total {total_entradas(cantidad)} €")\n\nif __name__ == "__main__":\n    main()'],
    wrongs: [
      { code: '___ = 9\n\ndef total_entradas(cantidad):\n    return cantidad * PRECIO_ENTRADA\n\ndef ___():\n    print(total_entradas(3))', category: 'incompleto' },
      { code: 'precio = 9\n\ndef total_entradas(cantidad):\n    return cantidad * PRECIO_ENTRADA\n\ndef main():\n    cantidad = 3\n    print(f"Entradas: {cantidad}, total {total_entradas(cantidad)} €")\n\nif __name__ == "__main__":\n    main()', category: 'ejecucion' },
    ],
  },
  'est-fix': {
    id: 'est-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El total global', difficulty: 3, xp: 25, concepts: ['estilo', 'parametros'],
    statement: 'Este programa da un **UnboundLocalError** porque la función intenta modificar una variable global. Corrígelo **sin usar `global`**: `anadir_gasto(total, importe)` debe recibir el total actual y **devolver** el nuevo.',
    expected: 'Total: 35',
    starter: 'total = 0\n\ndef anadir_gasto(importe):\n    total += importe\n\nanadir_gasto(20)\nanadir_gasto(15)\nprint("Total:", total)',
    spec: {
      functions: [{ name: 'anadir_gasto', params: 2, missing_msg: 'Mantén la función anadir_gasto, ahora con dos parámetros: el total y el importe.' }],
      cases: [
        { label: 'Programa completo', out_lines: ['Total: 35'] },
        { label: 'anadir_gasto(10, 5)', call: 'print(anadir_gasto(10, 5))', out_lines: ['15'] },
      ],
      misconceptions: [
        { out_lines: ['Total: 0'], title: 'Falta guardar lo que devuelve', msg: 'La función devuelve el nuevo total, pero hay que guardarlo: `total = anadir_gasto(total, 20)`.' },
      ],
      logic_msg: 'Después de añadir 20 y 15, el total debe ser 35.',
    },
    hints: [
      { level: 'Orientación', text: 'El error dice que total se usa antes de tener valor dentro de la función. Al asignarla dentro, Python la trata como local.' },
      { level: 'Razonamiento', text: 'Haz que la función reciba el total como parámetro y devuelva la suma. Fuera, guarda lo que devuelve en total.' },
      { level: 'Pseudocódigo', text: 'anadir_gasto(total, importe): devolver total + importe\ntotal ← 0\ntotal ← anadir_gasto(total, 20)\ntotal ← anadir_gasto(total, 15)', pre: true },
      { level: 'Ayuda técnica', text: '`def anadir_gasto(total, importe): return total + importe` y `total = anadir_gasto(total, 20)`.' },
    ],
    solution: {
      code: 'def anadir_gasto(total, importe):\n    return total + importe\n\ntotal = 0\ntotal = anadir_gasto(total, 20)\ntotal = anadir_gasto(total, 15)\nprint("Total:", total)',
      explanation: 'La función ya no depende de nada externo: todo lo que necesita entra por sus parámetros y su resultado sale con return. Se puede probar sola: anadir_gasto(10, 5) siempre da 15.',
    },
    reference: ['def anadir_gasto(total, importe):\n    return total + importe\n\ntotal = 0\ntotal = anadir_gasto(total, 20)\ntotal = anadir_gasto(total, 15)\nprint("Total:", total)'],
    wrongs: [
      { code: 'def anadir_gasto(total, importe):\n    return total + importe\n\ntotal = 0\nanadir_gasto(total, 20)\nanadir_gasto(total, 15)\nprint("Total:", total)', category: 'comprension' },
      { code: 'total = 0\n\ndef anadir_gasto(importe):\n    global total\n    total += importe\n\nanadir_gasto(20)\nanadir_gasto(15)\nprint("Total:", total)', category: 'comprension' },
    ],
  },
  'est-build': {
    id: 'est-build', type: 'code', variant: 'build', kindLabel: 'Refactoriza', topic: TOPIC,
    title: 'Del script al programa ordenado', difficulty: 3, xp: 35, concepts: ['estilo', 'diseno'],
    unlock: { any: ['est-predict', 'est-complete', 'est-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'El código inicial funciona, pero está apretado, sin funciones y con nombres que no dicen nada. **Refactorízalo**:\n\n• `media(notas)`: devuelve la media redondeada a 2 decimales.\n\n• `aprobadas(notas)`: devuelve cuántas notas son de 5 o más.\n\n• `main()`: muestra el informe usando esas funciones, y se llama al final.\n\nLa salida debe ser exactamente la misma que la del código original.',
    expected: 'Media: 6.62\nAprobadas: 3',
    starter: 'n=[7,4.5,9,6]\ns=0\nfor x in n:\n    s=s+x\nm=s/len(n)\nprint("Media:",round(m,2))\na=0\nfor x in n:\n    if x>=5:\n        a=a+1\nprint("Aprobadas:",a)',
    plan: [
      {
        q: '¿Qué partes del script se convierten en funciones?',
        multi: true,
        options: [
          { text: 'El cálculo de la media', correct: true },
          { text: 'El recuento de aprobadas', correct: true },
          { text: 'Cada print por separado', why: 'Los print forman el informe: van juntos en main().' },
        ],
      },
      {
        q: '¿Dónde va la lista de notas?',
        options: [
          { text: 'Dentro de main(), que se la pasa a las funciones', correct: true },
          { text: 'Como variable global que las funciones leen', why: 'Las funciones deben recibir los datos por parámetro: así sirven para cualquier lista.' },
        ],
      },
    ],
    planScaffold: '',
    spec: {
      functions: [{ name: 'media', params: 1 }, { name: 'aprobadas', params: 1 }, { name: 'main', params: 0 }],
      cases: [
        { label: 'Programa completo', out_lines: ['Media: 6.62', 'Aprobadas: 3'] },
        { label: 'media([10, 5])', call: 'print(media([10, 5]))', out_lines: ['7.5'] },
        { label: 'aprobadas([4, 5, 6])', call: 'print(aprobadas([4, 5, 6]))', out_lines: ['2'] },
      ],
      misconceptions: [
        { out_lines: ['Aprobadas: 3'], title: 'Falta la media', msg: 'main() tiene que mostrar las dos líneas del informe.' },
      ],
      rules: [{ type: 'must_call', name: 'main', title: 'Llama a main()', msg: 'El programa debe terminar llamando a main().' }],
      logic_msg: 'La salida debe ser idéntica a la del script original: «Media: 6.62» y «Aprobadas: 3».',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta primero el código inicial para ver su salida. Después crea las tres funciones una a una, probándolas.' },
      { level: 'Razonamiento', text: 'Cada bucle del script se convierte en el cuerpo de una función que recibe la lista como parámetro y devuelve su resultado. main() crea la lista y muestra los resultados.' },
      { level: 'Pseudocódigo', text: 'media(notas): devolver redondear(suma / cantidad, 2)\naprobadas(notas): contar las notas ≥ 5\nmain(): notas ← [7, 4.5, 9, 6]; mostrar media y aprobadas\nllamar a main()', pre: true },
      { level: 'Ayuda técnica', text: '`return round(sum(notas) / len(notas), 2)` y, en main, `print("Media:", media(notas))`.' },
    ],
    solution: {
      code: 'def media(notas):\n    """Devuelve la media de las notas, redondeada a 2 decimales."""\n    return round(sum(notas) / len(notas), 2)\n\n\ndef aprobadas(notas):\n    """Devuelve cuántas notas son de 5 o más."""\n    cuenta = 0\n    for nota in notas:\n        if nota >= 5:\n            cuenta += 1\n    return cuenta\n\n\ndef main():\n    notas = [7, 4.5, 9, 6]\n    print("Media:", media(notas))\n    print("Aprobadas:", aprobadas(notas))\n\n\nif __name__ == "__main__":\n    main()',
      explanation: 'La salida es la misma, pero ahora cada pieza tiene nombre, se puede probar por separado (media([10, 5]) → 7.5) y reutilizar con otras listas.',
    },
    reference: [
      'def media(notas):\n    return round(sum(notas) / len(notas), 2)\n\ndef aprobadas(notas):\n    return len([n for n in notas if n >= 5])\n\ndef main():\n    notas = [7, 4.5, 9, 6]\n    print("Media:", media(notas))\n    print("Aprobadas:", aprobadas(notas))\n\nmain()',
    ],
    wrongs: [
      { code: 'n=[7,4.5,9,6]\ns=0\nfor x in n:\n    s=s+x\nm=s/len(n)\nprint("Media:",round(m,2))\na=0\nfor x in n:\n    if x>=5:\n        a=a+1\nprint("Aprobadas:",a)', category: 'comprension' },
      { code: 'def media(notas):\n    return round(sum(notas) / len(notas), 2)\n\ndef aprobadas(notas):\n    return len([n for n in notas if n > 5])\n\ndef main():\n    notas = [7, 4.5, 9, 6]\n    print("Media:", media(notas))\n    print("Aprobadas:", aprobadas(notas))\n\nmain()', category: 'logica' },
    ],
  },
};
