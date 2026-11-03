// Desafíos de motos: los mismos conceptos del curso con ejemplos moteros, protagonizados por la
// Kawasaki ZX-4RR de Lunakiri. Solo están en la zona de desafíos (no forman parte de ninguna lección).
// Los datos de la moto son aproximados y se dan en cada enunciado: lo importante es el razonamiento.

const TOPIC = 'Motos';
const BASICOS = ['moto-deposito', 'moto-autonomia', 'moto-rpm', 'moto-vueltas', 'moto-aceite'];

export const ACTIVITIES_MOTOS = {
  // ------------------------------------------------------------------ 1
  'moto-deposito': {
    id: 'moto-deposito', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'El depósito de la ZX-4RR', difficulty: 1, xp: 10, concepts: ['reasignacion', 'expresiones'],
    prompt: 'Lunakiri sale con el depósito de su ZX-4RR lleno, hace una ruta y para a repostar un poco. Sigue el programa línea a línea: **¿qué mostrará?**',
    code: 'deposito = 15\ngastado = 4\ndeposito = deposito - gastado\ndeposito = deposito + 3\nprint("Litros:", deposito)',
    expectedOutput: 'Litros: 14',
    options: [
      { text: 'Litros: 14', correct: true },
      { text: 'Litros: 11', concept: 'reasignacion', why: 'Después de gastar 4 litros (quedan 11), la línea 4 **suma** 3 más: 11 + 3 = 14.' },
      { text: 'Litros: 15', concept: 'reasignacion', why: 'Cada asignación cambia el valor de `deposito`: primero a 11 y después a 14. El 15 solo era el valor inicial.' },
      { text: 'Litros: deposito', concept: 'print', why: 'Sin comillas, `deposito` es una variable: `print` muestra su **valor**, no su nombre.' },
    ],
    explain: [
      'Línea 1: `deposito` vale 15 (depósito lleno).',
      'Línea 3: Python calcula la derecha (15 − 4 = 11) y lo guarda en `deposito`.',
      'Línea 4: 11 + 3 = 14. El valor anterior se sustituye.',
      'Línea 5: se muestra `Litros: 14`.',
    ],
  },

  // ------------------------------------------------------------------ 2
  'moto-autonomia': {
    id: 'moto-autonomia', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: '¿Hasta dónde llego?', difficulty: 1, xp: 15, concepts: ['expresiones', 'print'],
    statement: 'La ZX-4RR de Lunakiri tiene un depósito de **15 litros** y gasta unos **5 litros cada 100 km**. Completa el cálculo de la **autonomía** (los km que puede recorrer con el depósito lleno) para que el programa muestre:',
    expected: 'Autonomía: 300.0 km',
    note: 'Tiene que funcionar **aunque cambie el consumo**: si gastara 6 litros cada 100 km, la autonomía sería 250 km.',
    starter: 'litros = 15\nconsumo = 5        # litros cada 100 km\nautonomia = ___\nprint("Autonomía:", autonomia, "km")',
    spec: {
      blanks: true,
      cases: [{ label: 'Salida esperada', out_lines: ['Autonomía: 300.0 km'] }],
      variants: [{
        label: 'Consumo cambiado a 6 litros', set: { consumo: 6 },
        out_lines: ['Autonomía: 250.0 km'],
        msg: 'Muestra 300 por casualidad: si el consumo fuera de 6 litros, la autonomía debería bajar a 250 km. Calcula a partir de las variables litros y consumo.',
      }],
      misconceptions: [
        { out_lines: ['Autonomía: 75 km'], title: 'Multiplicar no es la operación', msg: 'Has multiplicado litros por consumo. Piensa: si con 5 litros haces 100 km, ¿cuántas veces caben 5 litros en el depósito?' },
        { out_lines: ['Autonomía: 3.0 km'], title: 'Te falta un paso', msg: 'litros / consumo te dice cuántas veces cabe el consumo en el depósito (3). Cada una de esas veces son 100 km.' },
      ],
      logic_msg: 'La autonomía es (litros ÷ consumo) × 100.',
    },
    hints: [
      { level: 'Orientación', text: 'El hueco es una **expresión** que usa las variables `litros` y `consumo`.' },
      { level: 'Razonamiento', text: 'Con 5 litros recorres 100 km. ¿Cuántos «bloques» de 5 litros hay en 15? Cada bloque son 100 km.' },
      { level: 'Pseudocódigo', text: 'bloques ← litros ÷ consumo\nautonomía ← bloques × 100', pre: true },
      { level: 'Ayuda técnica', text: '`/` divide (y da un número decimal) y `*` multiplica: `litros / consumo * 100`.' },
    ],
    solution: {
      code: 'litros = 15\nconsumo = 5        # litros cada 100 km\nautonomia = litros / consumo * 100\nprint("Autonomía:", autonomia, "km")',
      explanation: '`15 / 5` da 3.0 (la división `/` siempre da decimal) y por 100 son 300.0 km. Al usar las variables, si cambias el consumo la autonomía se recalcula sola.',
    },
    reference: [
      'litros = 15\nconsumo = 5\nautonomia = litros / consumo * 100\nprint("Autonomía:", autonomia, "km")',
      'litros = 15\nconsumo = 5\nautonomia = 100 * litros / consumo\nprint("Autonomía:", autonomia, "km")',
    ],
    wrongs: [
      { code: 'litros = 15\nconsumo = 5\nautonomia = ___\nprint("Autonomía:", autonomia, "km")', category: 'incompleto' },
      { code: 'litros = 15\nconsumo = 5\nautonomia = litros * consumo\nprint("Autonomía:", autonomia, "km")', category: 'comprension' },
      { code: 'litros = 15\nconsumo = 5\nautonomia = 300.0\nprint("Autonomía:", autonomia, "km")', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 3
  'moto-rpm': {
    id: 'moto-rpm', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'El cuentavueltas', difficulty: 2, xp: 20, concepts: ['condicionales', 'errores'],
    statement: 'El motor de 4 cilindros de la ZX-4RR sube muchísimo de vueltas. Esta función avisa a Lunakiri según las revoluciones (rpm): **más de 14000**, «¡Corte de encendido!»; **más de 8000**, «Sube de marcha»; **menos de 3000**, «Baja de marcha»; y si no, «Perfecto». Pero a 15000 rpm dice «Sube de marcha». **No hay error de Python**: el fallo está en la lógica.',
    expected: '¡Corte de encendido!\nSube de marcha\nBaja de marcha\nPerfecto',
    starter: 'def aviso_rpm(rpm):\n    if rpm > 8000:\n        return "Sube de marcha"\n    elif rpm > 14000:\n        return "¡Corte de encendido!"\n    elif rpm < 3000:\n        return "Baja de marcha"\n    else:\n        return "Perfecto"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))',
    spec: {
      functions: [{ name: 'aviso_rpm', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['¡Corte de encendido!', 'Sube de marcha', 'Baja de marcha', 'Perfecto'] },
        { label: 'aviso_rpm(14000) (límite)', call: 'print(aviso_rpm(14000))', out_lines: ['Sube de marcha'] },
        { label: 'aviso_rpm(14001)', call: 'print(aviso_rpm(14001))', out_lines: ['¡Corte de encendido!'] },
        { label: 'aviso_rpm(3000) (límite)', call: 'print(aviso_rpm(3000))', out_lines: ['Perfecto'] },
      ],
      misconceptions: [
        { out_lines: ['Sube de marcha', 'Sube de marcha', 'Baja de marcha', 'Perfecto'], title: 'La primera condición se lo queda todo', msg: '15000 también es mayor que 8000, y como esa condición va primero, nunca se llega a comprobar la de 14000. La más exigente tiene que ir antes.' },
      ],
      logic_msg: 'Revisa los límites: 14000 rpm es «Sube de marcha», 14001 ya es corte, y 3000 rpm es «Perfecto».',
    },
    hints: [
      { level: 'Orientación', text: 'Ejecuta el programa: a 15000 rpm sale «Sube de marcha». ¿Qué condición se comprueba primero?' },
      { level: 'Razonamiento', text: 'Python se queda con la **primera** condición verdadera. 15000 > 8000 es verdad… y 15000 > 14000 también. ¿Cuál debería mirarse antes?' },
      { level: 'Pseudocódigo', text: 'si rpm > 14000: corte\nsi no, si rpm > 8000: sube de marcha\nsi no, si rpm < 3000: baja de marcha\nsi no: perfecto', pre: true },
      { level: 'Ayuda técnica', text: 'Intercambia las dos primeras condiciones (y sus `return`): empieza por `if rpm > 14000:`.' },
    ],
    solution: {
      code: 'def aviso_rpm(rpm):\n    if rpm > 14000:\n        return "¡Corte de encendido!"\n    elif rpm > 8000:\n        return "Sube de marcha"\n    elif rpm < 3000:\n        return "Baja de marcha"\n    else:\n        return "Perfecto"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))',
      explanation: 'Con condiciones de tipo «mayor que», la más exigente (14000) va primero. Así 15000 rpm se queda en el corte y no «se cuela» en «Sube de marcha».',
    },
    reference: [
      'def aviso_rpm(rpm):\n    if rpm > 14000:\n        return "¡Corte de encendido!"\n    elif rpm > 8000:\n        return "Sube de marcha"\n    elif rpm < 3000:\n        return "Baja de marcha"\n    else:\n        return "Perfecto"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))',
      'def aviso_rpm(rpm):\n    if rpm < 3000:\n        return "Baja de marcha"\n    if rpm <= 8000:\n        return "Perfecto"\n    if rpm <= 14000:\n        return "Sube de marcha"\n    return "¡Corte de encendido!"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))',
    ],
    wrongs: [
      { code: 'def aviso_rpm(rpm):\n    if rpm > 8000:\n        return "Sube de marcha"\n    elif rpm > 14000:\n        return "¡Corte de encendido!"\n    elif rpm < 3000:\n        return "Baja de marcha"\n    else:\n        return "Perfecto"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))', category: 'comprension' },
      { code: 'def aviso_rpm(rpm):\n    if rpm >= 14000:\n        return "¡Corte de encendido!"\n    elif rpm > 8000:\n        return "Sube de marcha"\n    elif rpm < 3000:\n        return "Baja de marcha"\n    else:\n        return "Perfecto"\n\nprint(aviso_rpm(15000))\nprint(aviso_rpm(10000))\nprint(aviso_rpm(2000))\nprint(aviso_rpm(5000))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 4
  'moto-vueltas': {
    id: 'moto-vueltas', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Vueltas al circuito', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'Lunakiri entrena en un circuito: en cada vuelta hace más km que en la anterior. **¿Qué mostrará el programa?**',
    code: 'total = 0\nfor vuelta in range(1, 4):\n    total = total + vuelta * 2\nprint(total)',
    expectedOutput: '12',
    options: [
      { text: '12', correct: true },
      { text: '20', concept: 'bucles', why: '`range(1, 4)` da 1, 2 y 3: **el 4 no se incluye**. Sería 2 + 4 + 6 + 8 si llegara hasta el 4.' },
      { text: '6', concept: 'bucles', why: 'Cada vuelta suma `vuelta * 2`, no `vuelta`: 2 + 4 + 6.' },
      { text: '2\n4\n6', concept: 'bucles', why: 'El `print` no tiene sangría: está **fuera** del bucle, así que solo se ejecuta una vez, al final.' },
    ],
    explain: [
      '`range(1, 4)` produce 1, 2 y 3.',
      'Vuelta 1: total = 0 + 2 = 2. Vuelta 2: 2 + 4 = 6. Vuelta 3: 6 + 6 = 12.',
      'El `print` está fuera del bucle: se muestra solo el resultado final, 12.',
    ],
  },

  // ------------------------------------------------------------------ 5
  'moto-aceite': {
    id: 'moto-aceite', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'Toca cambiar el aceite', difficulty: 2, xp: 25, concepts: ['expresiones', 'retorno', 'parametros'],
    statement: 'La ZX-4RR de Lunakiri necesita un cambio de aceite **cada 6000 km**: a los 6000, a los 12000, a los 18000…\n\nDefine `km_hasta_aceite(km)` que, con los km que marca el cuentakilómetros, **devuelva** cuántos km faltan para el próximo cambio. Si justo toca (por ejemplo, con 12000 km), devuelve **0**.',
    expected: '4500',
    plan: [
      {
        q: 'Con 13500 km, ¿cuántos km lleva desde el último cambio (a los 12000)?',
        options: [
          { text: '1500: es el resto de dividir 13500 entre 6000', correct: true },
          { text: '2.25: es 13500 entre 6000', why: 'Eso dice cuántos «tramos de 6000» caben, no los km que sobran del último tramo.' },
        ],
      },
      {
        q: '¿Y cuántos faltan para el siguiente?',
        options: [
          { text: '6000 − 1500 = 4500', correct: true },
          { text: '1500', why: 'Eso es lo que ya ha recorrido desde el último cambio, no lo que falta.' },
        ],
      },
    ],
    planScaffold: 'def km_hasta_aceite(km):\n    # 1. km recorridos desde el último cambio (resto entre 6000)\n    # 2. km que faltan hasta 6000\n    # 3. Si justo toca, 0\n\n\nprint(km_hasta_aceite(13500))\n',
    starter: '',
    spec: {
      functions: [{ name: 'km_hasta_aceite', params: 1 }],
      cases: [
        { label: 'km_hasta_aceite(13500)', call: 'print(km_hasta_aceite(13500))', out_lines: ['4500'] },
        { label: 'km_hasta_aceite(1000)', call: 'print(km_hasta_aceite(1000))', out_lines: ['5000'] },
        { label: 'km_hasta_aceite(5999)', call: 'print(km_hasta_aceite(5999))', out_lines: ['1'] },
        { label: 'km_hasta_aceite(12000) (justo toca)', call: 'print(km_hasta_aceite(12000))', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['6000'], title: 'Cuando justo toca', msg: 'Con 12000 km el resto es 0, y 6000 − 0 = 6000. Pero si justo toca cambiar el aceite, faltan 0 km: trata ese caso aparte (o usa otra vez el resto).' },
      ],
      logic_msg: 'Faltan 6000 menos los km recorridos desde el último cambio (km % 6000); y 0 si justo toca.',
    },
    hints: [
      { level: 'Orientación', text: 'Necesitas saber cuántos km lleva la moto **desde el último cambio**. El operador que da el **resto** de una división es tu amigo.' },
      { level: 'Razonamiento', text: '`13500 % 6000` da 1500: los km recorridos desde el cambio de los 12000. Lo que falta es 6000 − 1500. ¿Y si el resto es 0?' },
      { level: 'Pseudocódigo', text: 'recorridos ← km % 6000\nsi recorridos = 0: devolver 0\ndevolver 6000 − recorridos', pre: true },
      { level: 'Ayuda técnica', text: '`%` da el resto: `km % 6000`. Compruébalo con `if recorridos == 0:` y devuelve con `return`.' },
    ],
    solution: {
      code: 'def km_hasta_aceite(km):\n    recorridos = km % 6000\n    if recorridos == 0:\n        return 0\n    return 6000 - recorridos\n\n\nprint(km_hasta_aceite(13500))',
      explanation: 'El resto `km % 6000` son los km desde el último cambio; lo que falta es 6000 menos eso. Si el resto es 0, el cambio toca justo ahora y se devuelve 0.',
    },
    reference: [
      'def km_hasta_aceite(km):\n    recorridos = km % 6000\n    if recorridos == 0:\n        return 0\n    return 6000 - recorridos\n\nprint(km_hasta_aceite(13500))',
      'def km_hasta_aceite(km):\n    return (6000 - km % 6000) % 6000\n\nprint(km_hasta_aceite(13500))',
    ],
    wrongs: [
      { code: 'def km_hasta_aceite(km):\n    return 6000 - km % 6000\n\nprint(km_hasta_aceite(13500))', category: 'comprension' },
      { code: 'def km_hasta_aceite(km):\n    return 6000 - km\n\nprint(km_hasta_aceite(13500))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 6
  'moto-ruta': {
    id: 'moto-ruta', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'El resumen de la ruta', difficulty: 3, xp: 30, concepts: ['listas', 'bucles', 'retorno'],
    unlock: { any: BASICOS, count: 2, text: 'Supera al menos 2 desafíos de motos más sencillos' },
    statement: 'Lunakiri apunta los km de cada tramo de sus rutas en una lista, por ejemplo `[120, 45, 80]`.\n\nDefine `resumen_ruta(tramos)` que **devuelva** dos valores: los **km totales** y el **tramo más largo**. Para `[120, 45, 80]` devuelve `(245, 120)`.\n\nOjo: si la lista está **vacía** (un día sin salir), devuelve `(0, 0)` sin que el programa falle.',
    expected: '(245, 120)',
    starter: '',
    spec: {
      functions: [{ name: 'resumen_ruta', params: 1 }],
      cases: [
        { label: 'resumen_ruta([120, 45, 80])', call: 'print(resumen_ruta([120, 45, 80]))', out_lines: ['(245, 120)'] },
        { label: 'resumen_ruta([30])', call: 'print(resumen_ruta([30]))', out_lines: ['(30, 30)'] },
        { label: 'resumen_ruta([10, 200, 200, 5])', call: 'print(resumen_ruta([10, 200, 200, 5]))', out_lines: ['(415, 200)'] },
        { label: 'resumen_ruta([]) (sin salir)', call: 'print(resumen_ruta([]))', out_lines: ['(0, 0)'] },
      ],
      logic_msg: 'Recorre la lista sumando cada tramo al total y quedándote con el mayor que hayas visto.',
    },
    hints: [
      { level: 'Orientación', text: 'Necesitas dos acumuladores: uno para el **total** y otro para el **más largo** visto hasta ahora. Al final, `return total, mas_largo`.' },
      { level: 'Razonamiento', text: '¿Con qué valor empiezan? Si empiezas `mas_largo` en 0, una lista vacía devuelve 0 sin errores, y cualquier tramo real será mayor.' },
      { level: 'Pseudocódigo', text: 'total ← 0; mas_largo ← 0\npara cada tramo en tramos:\n    total ← total + tramo\n    si tramo > mas_largo: mas_largo ← tramo\ndevolver total, mas_largo', pre: true },
      { level: 'Ayuda técnica', text: 'Un `for tramo in tramos:` con un `if` dentro. `return total, mas_largo` devuelve una tupla. (Si usas `max(tramos)`, comprueba antes que la lista no esté vacía: `max([])` da error).' },
    ],
    solution: {
      code: 'def resumen_ruta(tramos):\n    total = 0\n    mas_largo = 0\n    for tramo in tramos:\n        total = total + tramo\n        if tramo > mas_largo:\n            mas_largo = tramo\n    return total, mas_largo\n\n\nprint(resumen_ruta([120, 45, 80]))',
      explanation: 'Un solo recorrido calcula las dos cosas. Empezar ambos acumuladores en 0 hace que la lista vacía funcione sin un caso especial, y `return total, mas_largo` devuelve una tupla.',
    },
    reference: [
      'def resumen_ruta(tramos):\n    total = 0\n    mas_largo = 0\n    for tramo in tramos:\n        total = total + tramo\n        if tramo > mas_largo:\n            mas_largo = tramo\n    return total, mas_largo\n\nprint(resumen_ruta([120, 45, 80]))',
      'def resumen_ruta(tramos):\n    if not tramos:\n        return 0, 0\n    return sum(tramos), max(tramos)\n\nprint(resumen_ruta([120, 45, 80]))',
    ],
    wrongs: [
      { code: 'def resumen_ruta(tramos):\n    return sum(tramos), max(tramos)\n\nprint(resumen_ruta([120, 45, 80]))', category: 'ejecucion' },
      { code: 'def resumen_ruta(tramos):\n    total = 0\n    mas_largo = 0\n    for tramo in tramos:\n        total = tramo\n        if tramo > mas_largo:\n            mas_largo = tramo\n    return total, mas_largo\n\nprint(resumen_ruta([120, 45, 80]))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 7
  'moto-garaje': {
    id: 'moto-garaje', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'El garaje del club', difficulty: 3, xp: 30, concepts: ['diccionarios', 'bucles', 'cadenas'],
    unlock: { any: BASICOS, count: 2, text: 'Supera al menos 2 desafíos de motos más sencillos' },
    statement: 'El club motero de Lunakiri tiene una lista con las motos de sus socias: marca y modelo, como `"Kawasaki ZX-4RR"`.\n\nDefine `motos_por_marca(motos)` que **devuelva un diccionario** con cuántas motos hay de cada marca (la marca es la **primera palabra**).\n\nPor ejemplo, `["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]` → `{\'Kawasaki\': 2, \'Yamaha\': 1}`.',
    expected: "{'Kawasaki': 2, 'Yamaha': 1}",
    starter: '',
    spec: {
      functions: [{ name: 'motos_por_marca', params: 1 }],
      cases: [
        { label: 'Tres motos, dos marcas', call: 'print(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', out_lines: ["{'Kawasaki': 2, 'Yamaha': 1}"] },
        { label: 'Una sola moto', call: 'print(motos_por_marca(["Honda CBR650R"]))', out_lines: ["{'Honda': 1}"] },
        { label: 'Lista vacía', call: 'print(motos_por_marca([]))', out_lines: ['{}'] },
        { label: 'Modelos con varias palabras', call: 'print(motos_por_marca(["Kawasaki Ninja ZX-4RR", "Ducati Panigale V2", "Kawasaki Ninja 500"]))', out_lines: ["{'Kawasaki': 2, 'Ducati': 1}"] },
      ],
      misconceptions: [
        { out_lines: ["{'Kawasaki ZX-4RR': 1, 'Yamaha R7': 1, 'Kawasaki Z900': 1}"], title: 'Cuentas modelos, no marcas', msg: 'Estás usando el nombre completo como clave. Separa el texto en palabras y quédate solo con la primera: `moto.split()[0]`.' },
      ],
      logic_msg: 'Para cada moto, toma la primera palabra y súmale 1 a su contador en el diccionario.',
    },
    hints: [
      { level: 'Orientación', text: 'Es el patrón del **diccionario contador**: empieza con `{}` y, por cada moto, suma 1 a la marca que le corresponda.' },
      { level: 'Razonamiento', text: '¿Cómo sacas la marca de `"Kawasaki ZX-4RR"`? Separa el texto en palabras y coge la primera.' },
      { level: 'Pseudocódigo', text: 'cuenta ← diccionario vacío\npara cada moto en motos:\n    marca ← primera palabra de moto\n    cuenta[marca] ← cuenta[marca] (o 0) + 1\ndevolver cuenta', pre: true },
      { level: 'Ayuda técnica', text: '`moto.split()[0]` da la primera palabra, y `cuenta.get(marca, 0) + 1` suma 1 aunque la marca aún no esté en el diccionario.' },
    ],
    solution: {
      code: 'def motos_por_marca(motos):\n    cuenta = {}\n    for moto in motos:\n        marca = moto.split()[0]\n        cuenta[marca] = cuenta.get(marca, 0) + 1\n    return cuenta\n\n\nprint(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
      explanation: '`split()` separa por espacios y `[0]` se queda con la marca. `get(marca, 0)` devuelve 0 la primera vez que aparece una marca, así no hace falta un `if`.',
    },
    reference: [
      'def motos_por_marca(motos):\n    cuenta = {}\n    for moto in motos:\n        marca = moto.split()[0]\n        cuenta[marca] = cuenta.get(marca, 0) + 1\n    return cuenta\n\nprint(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
      'def motos_por_marca(motos):\n    cuenta = {}\n    for moto in motos:\n        marca = moto.split(" ")[0]\n        if marca in cuenta:\n            cuenta[marca] += 1\n        else:\n            cuenta[marca] = 1\n    return cuenta\n\nprint(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
    ],
    wrongs: [
      { code: 'def motos_por_marca(motos):\n    cuenta = {}\n    for moto in motos:\n        cuenta[moto] = cuenta.get(moto, 0) + 1\n    return cuenta\n\nprint(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', category: 'comprension' },
      { code: 'def motos_por_marca(motos):\n    cuenta = {}\n    for moto in motos:\n        marca = moto.split()[0]\n        cuenta[marca] = cuenta[marca] + 1\n    return cuenta\n\nprint(motos_por_marca(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', category: 'ejecucion' },
    ],
  },

  // ------------------------------------------------------------------ 8
  'moto-clase': {
    id: 'moto-clase', type: 'code', variant: 'build', kindLabel: 'Reto de la vida real', topic: TOPIC,
    title: 'Tu propia ZX-4RR en Python', difficulty: 3, xp: 40, concepts: ['clases', 'condicionales'],
    unlock: { any: ['moto-ruta', 'moto-garaje'], count: 1, text: 'Supera «El resumen de la ruta» o «El garaje del club»' },
    statement: 'Modela la moto de Lunakiri con una clase `Moto`:\n\n• `Moto(modelo, capacidad)` guarda el modelo, la capacidad del depósito en litros y empieza con el depósito **lleno** (atributo `litros`).\n\n• `rodar(km)`: la moto gasta **5 litros cada 100 km**. Si hay gasolina suficiente, resta lo gastado y **devuelve True**; si no, no se mueve, no gasta nada y **devuelve False**.\n\n• `repostar()`: vuelve a llenar el depósito.',
    expected: 'True 10.0',
    starter: '',
    spec: {
      classes: [{ name: 'Moto' }],
      cases: [
        { label: 'Rodar 100 km con 15 litros', call: 'm = Moto("ZX-4RR", 15)\nprint(m.rodar(100), m.litros)', out_lines: ['True 10.0'] },
        { label: 'Rodar 300 km (justo el depósito)', call: 'm = Moto("ZX-4RR", 15)\nprint(m.rodar(300), m.litros)', out_lines: ['True 0.0'] },
        { label: 'Rodar 400 km: no llega', call: 'm = Moto("ZX-4RR", 15)\nprint(m.rodar(400), m.litros)', out_lines: ['False 15'] },
        { label: 'Rodar y repostar', call: 'm = Moto("ZX-4RR", 15)\nm.rodar(200)\nm.repostar()\nprint(m.litros, m.modelo)', out_lines: ['15 ZX-4RR'] },
      ],
      misconceptions: [
        { out_lines: ['True -5.0'], title: 'Te has quedado sin gasolina… y has seguido', msg: 'Antes de restar, comprueba si hay litros suficientes para esos km. Si no los hay, devuelve False sin tocar el depósito.' },
      ],
      logic_msg: 'Gasto = km × 5 ÷ 100. Solo se resta si gasto ≤ litros.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres métodos: `__init__` (guarda los datos y llena el depósito), `rodar` y `repostar`. Todos llevan `self` como primer parámetro.' },
      { level: 'Razonamiento', text: 'En `rodar`, calcula primero cuánto gastarías. Si es más de lo que hay en `self.litros`, la moto no se mueve.' },
      { level: 'Pseudocódigo', text: 'rodar(km):\n    gasto ← km × 5 ÷ 100\n    si gasto > litros: devolver False\n    litros ← litros − gasto\n    devolver True', pre: true },
      { level: 'Ayuda técnica', text: 'En `__init__`: `self.modelo = modelo`, `self.capacidad = capacidad` y `self.litros = capacidad`. En `repostar`: `self.litros = self.capacidad`.' },
    ],
    solution: {
      code: 'class Moto:\n    def __init__(self, modelo, capacidad):\n        self.modelo = modelo\n        self.capacidad = capacidad\n        self.litros = capacidad\n\n    def rodar(self, km):\n        gasto = km * 5 / 100\n        if gasto > self.litros:\n            return False\n        self.litros = self.litros - gasto\n        return True\n\n    def repostar(self):\n        self.litros = self.capacidad\n\n\nzx = Moto("ZX-4RR", 15)\nprint(zx.rodar(100), zx.litros)',
      explanation: 'El objeto recuerda su estado en `self.litros`. `rodar` comprueba antes de gastar (así nunca queda gasolina negativa) y `repostar` usa la capacidad guardada en `__init__`.',
    },
    reference: [
      'class Moto:\n    def __init__(self, modelo, capacidad):\n        self.modelo = modelo\n        self.capacidad = capacidad\n        self.litros = capacidad\n\n    def rodar(self, km):\n        gasto = km * 5 / 100\n        if gasto > self.litros:\n            return False\n        self.litros = self.litros - gasto\n        return True\n\n    def repostar(self):\n        self.litros = self.capacidad\n\nzx = Moto("ZX-4RR", 15)\nprint(zx.rodar(100), zx.litros)',
    ],
    wrongs: [
      { code: 'class Moto:\n    def __init__(self, modelo, capacidad):\n        self.modelo = modelo\n        self.capacidad = capacidad\n        self.litros = capacidad\n\n    def rodar(self, km):\n        self.litros = self.litros - km * 5 / 100\n        return True\n\n    def repostar(self):\n        self.litros = self.capacidad\n\nzx = Moto("ZX-4RR", 15)\nprint(zx.rodar(100), zx.litros)', category: 'comprension' },
      { code: 'class Moto:\n    def __init__(self, modelo, capacidad):\n        self.modelo = modelo\n        self.litros = capacidad\n\n    def rodar(self, km):\n        gasto = km * 5 / 100\n        if gasto > self.litros:\n            return False\n        self.litros = self.litros - gasto\n        return True\n\n    def repostar(self):\n        self.litros = self.capacidad\n\nzx = Moto("ZX-4RR", 15)\nprint(zx.rodar(100), zx.litros)', category: 'ejecucion' },
    ],
  },
};
