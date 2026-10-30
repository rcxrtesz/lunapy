// Lección 8.3 · Expresiones regulares básicas. Contenido original, alineado con el
// cap. 8 de «Piensa en Python» (búsqueda con expresiones regulares) y PE2 módulo 2.
// Solo lo esencial: search, findall, fullmatch, sub y los símbolos más comunes.

const TOPIC = 'Cadenas';

export const LESSON_REGEX = {
  id: 'regex',
  moduleId: 'm8',
  code: '8.3',
  title: 'Expresiones regulares básicas',
  minutes: 35,
  bonusXp: 30,
  objectives: [
    'Explicar qué es una expresión regular y para qué sirve',
    'Buscar patrones con re.search y re.findall',
    'Usar clases (\\d, \\w, [abc]) y cuantificadores (+, *, ?, {n})',
    'Validar un formato completo con re.fullmatch',
    'Sustituir con re.sub',
  ],
  prerequisites: ['Lección 8.2 «Métodos de cadena»'],
  teaser: 'find busca un texto exacto. Pero ¿cómo buscas «cualquier número» o «algo con forma de código postal»? Con expresiones regulares.',
  celebration: 'Has completado el Módulo 8: índices, porciones, métodos y expresiones regulares. Los textos ya no tienen secretos para ti.',
  steps: [
    // ------------------------------------------------------------------
    {
      id: 'idea', title: 'Buscar patrones, no textos exactos', concepts: ['regex'],
      blocks: [
        { type: 'p', text: 'Una **expresión regular** (*regex*) describe la **forma** de un texto: «uno o más dígitos», «una palabra que empieza por mayúscula»… Python las maneja con el módulo `re`.' },
        { type: 'code', run: true, code: 'import re\n\ntexto = "Pedido 4521: 3 libros y 12 cuadernos"\nprint(re.findall(r"\\d+", texto))' },
        {
          type: 'five', items: {
            'r"..."': 'Texto «crudo»: las barras \\ se toman tal cual. Escribe siempre los patrones así.',
            '\\d': 'Un dígito (0-9).',
            '+': 'Uno o más del anterior: `\\d+` es un número entero.',
            're.findall': 'Devuelve todos los trozos que encajan, en una lista.',
          },
        },
        {
          type: 'check', id: 'm8r-findall', concept: 'regex', mode: 'choice',
          question: '¿Qué mostrará?', code: 'import re\nprint(re.findall(r"\\d+", "a1 bb22 ccc333"))', expectOutput: "['1', '22', '333']",
          options: [
            { text: "['1', '22', '333']", correct: true },
            { text: "['1', '2', '2', '3', '3', '3']", why: 'Con `+`, los dígitos seguidos forman una sola coincidencia.' },
            { text: '[1, 22, 333]', why: 'findall devuelve textos (entre comillas), no números.' },
          ],
          explain: 'Cada grupo de dígitos seguidos es una coincidencia. Se devuelven como textos.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'simbolos', title: 'Los símbolos más útiles', concepts: ['regex'],
      blocks: [
        {
          type: 'five', items: {
            '\\d  \\w  \\s': 'Dígito · letra, dígito o _ · espacio en blanco.',
            '.': 'Cualquier carácter (salvo salto de línea). Para un punto de verdad: `\\.`',
            '[aeiou]  [A-Z]': 'Uno de los caracteres de la lista o del rango.',
            '+  *  ?': 'Uno o más · cero o más · cero o uno (opcional).',
            '{3}  {2,4}': 'Exactamente 3 · entre 2 y 4.',
            '^  $': 'Principio · final del texto.',
          },
        },
        { type: 'code', run: true, code: 'import re\n\nfrase = "Ana y Luis viven en Toledo desde 2019"\nprint(re.findall(r"[A-Z]\\w+", frase))     # palabras con mayúscula\nprint(re.findall(r"\\d{4}", frase))        # números de 4 cifras\nprint(re.findall(r"\\b\\w{3}\\b", frase))     # palabras de 3 letras' },
        { type: 'callout', tone: 'info', title: '\\b', text: '`\\b` marca el borde de una palabra: así `\\w{3}` no encaja con trozos de palabras más largas.' },
        {
          type: 'check', id: 'm8r-mayus', concept: 'regex', mode: 'choice',
          question: '¿Qué mostrará?', code: 'import re\nprint(re.findall(r"[aeiou]", "murciélago"))', expectOutput: "['u', 'i', 'a', 'o']",
          options: [
            { text: "['u', 'i', 'a', 'o']", correct: true },
            { text: "['u', 'i', 'é', 'a', 'o']", why: 'La «é» lleva tilde: es un carácter distinto de la «e» y no está en [aeiou].' },
          ],
          explain: 'La «é» lleva tilde y no está en la lista [aeiou].',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'search', title: 'search: ¿aparece? ¿dónde?', concepts: ['regex'],
      blocks: [
        { type: 'p', text: '`re.search(patron, texto)` busca la **primera** coincidencia. Si no la hay, devuelve `None`; si la hay, devuelve un objeto con el texto encontrado (`.group()`) y su posición (`.start()`).' },
        { type: 'code', run: true, code: 'import re\n\nm = re.search(r"\\d+", "Tengo 3 gatos y 2 perros")\nif m:\n    print("Encontrado:", m.group(), "en la posición", m.start())\n\nprint(re.search(r"\\d+", "sin números"))' },
        {
          type: 'check', id: 'm8r-search', concept: 'regex', mode: 'text',
          question: 'Predice:', code: 'import re\nm = re.search(r"[A-Z]+", "abcDEFghiJK")\nprint(m.group())', answer: 'DEF',
          explain: 'La primera secuencia de mayúsculas seguidas es «DEF». search se detiene ahí.',
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'validar', title: 'Validar un formato completo', concepts: ['regex', 'booleanos'],
      blocks: [
        { type: 'p', text: 'Para comprobar que **todo** el texto tiene una forma concreta, usa `re.fullmatch`: el patrón tiene que encajar de principio a fin.' },
        { type: 'code', run: true, code: 'import re\n\ndef es_codigo_postal(cp):\n    return re.fullmatch(r"\\d{5}", cp) is not None\n\nprint(es_codigo_postal("28013"))\nprint(es_codigo_postal("2801"))\nprint(es_codigo_postal("28013A"))' },
        { type: 'callout', tone: 'tip', title: 'is not None', text: '`fullmatch` devuelve un objeto o `None`. Compararlo con `is not None` lo convierte en un True/False limpio.' },
        {
          type: 'check', id: 'm8r-fullmatch', concept: 'regex', mode: 'choice',
          question: '¿Qué patrón valida un DNI español (8 dígitos y una letra mayúscula)?',
          options: [
            { text: 'r"\\d{8}[A-Z]"', correct: true },
            { text: 'r"\\d+[A-Z]"', why: '`\\d+` acepta cualquier número de dígitos: "12A" también encajaría.' },
            { text: 'r"\\d{8}\\w"', why: '`\\w` acepta también dígitos y minúsculas: "123456789" encajaría.' },
          ],
        },
      ],
    },
    // ------------------------------------------------------------------
    {
      id: 'sub', title: 'Sustituir con re.sub', concepts: ['regex'],
      blocks: [
        { type: 'p', text: '`re.sub(patron, reemplazo, texto)` es como replace, pero con patrones:' },
        { type: 'code', run: true, code: 'import re\n\nprint(re.sub(r"\\s+", " ", "demasiados    espacios   aquí"))\nprint(re.sub(r"\\d", "#", "Mi PIN es 4821"))' },
        {
          type: 'check', id: 'm8r-sub', concept: 'regex', mode: 'text',
          question: 'Predice:', code: 'import re\nprint(re.sub(r"[aeiou]", "", "programar"))', answer: 'prgrmr',
          explain: 'Cada vocal se sustituye por un texto vacío: desaparecen.',
        },
      ],
    },
    // ------------------------------------------------------------------ práctica
    { id: 'a1', activity: 'reg-predict' },
    { id: 'a2', activity: 'reg-complete' },
    { id: 'a3', activity: 'reg-fix' },
    { id: 'a4', activity: 'reg-build' },
    { id: 'fin', title: 'Resumen', summary: true },
  ],
  summary: [
    'Una expresión regular describe la forma de un texto. Se usa con `import re` y patrones `r"..."`.',
    'Símbolos: `\\d` dígito, `\\w` letra/dígito, `\\s` espacio, `.` cualquiera, `[...]` uno de la lista.',
    'Cuantificadores: `+` uno o más, `*` cero o más, `?` opcional, `{n}` exactamente n.',
    '`re.findall` da todas las coincidencias; `re.search`, la primera (o None).',
    '`re.fullmatch` valida el texto completo; `re.sub` sustituye.',
  ],
};

export const ACTIVITIES_REGEX = {
  'reg-predict': {
    id: 'reg-predict', type: 'predict', kindLabel: 'Predice el resultado', topic: TOPIC,
    title: 'Cazando números', difficulty: 2, xp: 10, concepts: ['regex'],
    prompt: 'Dos patrones parecidos sobre el mismo texto. **¿Qué mostrará?**',
    code: 'import re\ntexto = "Sala 12, planta 3, puerta 105"\nprint(re.findall(r"\\d", texto))\nprint(re.findall(r"\\d+", texto))',
    expectedOutput: "['1', '2', '3', '1', '0', '5']\n['12', '3', '105']",
    options: [
      { text: "['1', '2', '3', '1', '0', '5'] y después ['12', '3', '105']", correct: true },
      { text: "['12', '3', '105'] las dos veces", concept: 'regex', why: 'Sin el +, `\\d` encaja con un solo dígito: cada cifra es una coincidencia distinta.' },
      { text: "['12', '3', '105'] y después ['1', '2', '3', '1', '0', '5']", concept: 'regex', why: 'Es al revés: el patrón con + es el que junta los dígitos seguidos.' },
      { text: '[12, 3, 105] como números', concept: 'regex', why: 'findall siempre devuelve textos (entre comillas). Para operar, conviértelos con int().' },
    ],
    explain: ['`\\d`: cada dígito por separado.', '`\\d+`: grupos de dígitos seguidos.'],
  },
  'reg-complete': {
    id: 'reg-complete', type: 'code', variant: 'complete', kindLabel: 'Completa el código', topic: TOPIC,
    title: 'Validar una matrícula', difficulty: 2, xp: 15, concepts: ['regex', 'booleanos'],
    statement: 'Las matrículas españolas actuales tienen **4 dígitos y 3 letras mayúsculas** (sin vocales, pero de eso nos olvidamos). Completa `matricula_valida` para que devuelva True solo si **todo** el texto tiene esa forma.',
    expected: 'True\nFalse',
    starter: 'import re\n\ndef matricula_valida(m):\n    return re.___(r"\\d{___}[A-Z]{___}", m) is not None\n\nprint(matricula_valida("1234BCD"))\nprint(matricula_valida("123BCD"))',
    spec: {
      blanks: true,
      exact_lines: true,
      skip_tips: ['repeated_numbers'],
      allow_short_names: ['m'],
      functions: [{ name: 'matricula_valida', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['True', 'False'] },
        { label: '"1234BCDX" (sobra una letra)', call: 'print(matricula_valida("1234BCDX"))', out_lines: ['False'] },
        { label: '"1234bcd" (minúsculas)', call: 'print(matricula_valida("1234bcd"))', out_lines: ['False'] },
        { label: '"9999ZZZ"', call: 'print(matricula_valida("9999ZZZ"))', out_lines: ['True'] },
      ],
      misconceptions: [
        { out_lines: ['True'], title: 'Encaja solo una parte', msg: 'Con `re.search` basta con que una parte encaje. Para validar **todo** el texto, usa `re.fullmatch`.' },
      ],
      logic_msg: 'Revisa la función de re y los números de las llaves: 4 dígitos y 3 letras.',
    },
    hints: [
      { level: 'Orientación', text: 'Tres huecos: la función de re que valida el texto completo y los dos números de repeticiones.' },
      { level: 'Razonamiento', text: '¿search o fullmatch? Piensa en "1234BCDX": tiene dentro una matrícula, pero no es una matrícula.' },
      { level: 'Pseudocódigo', text: 'el texto completo tiene que ser: 4 dígitos seguidos de 3 mayúsculas', pre: true },
      { level: 'Ayuda técnica', text: '`re.fullmatch(r"\\d{4}[A-Z]{3}", m)`.' },
    ],
    solution: {
      code: 'import re\n\ndef matricula_valida(m):\n    return re.fullmatch(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(matricula_valida("1234BCD"))\nprint(matricula_valida("123BCD"))',
      explanation: '`fullmatch` exige que el patrón cubra todo el texto. `{4}` y `{3}` fijan exactamente cuántos dígitos y letras.',
    },
    reference: ['import re\n\ndef matricula_valida(m):\n    return re.fullmatch(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(matricula_valida("1234BCD"))\nprint(matricula_valida("123BCD"))'],
    wrongs: [
      { code: 'import re\n\ndef matricula_valida(m):\n    return re.___(r"\\d{___}[A-Z]{___}", m) is not None', category: 'incompleto' },
      { code: 'import re\n\ndef matricula_valida(m):\n    return re.search(r"\\d{4}[A-Z]{3}", m) is not None\n\nprint(matricula_valida("1234BCD"))\nprint(matricula_valida("123BCD"))', category: 'comprension' },
    ],
  },
  'reg-fix': {
    id: 'reg-fix', type: 'code', variant: 'fix', kindLabel: 'Detecta y corrige el error', topic: TOPIC,
    title: 'Sumar los importes', difficulty: 2, xp: 20, concepts: ['regex', 'bucles'],
    statement: '`total_importes(texto)` debería sumar todos los números enteros de un texto (12 + 3 + 105 = 120), pero suma cifra a cifra y da 12. Corrige el **patrón**.',
    expected: '120\n0',
    starter: 'import re\n\ndef total_importes(texto):\n    total = 0\n    for numero in re.findall(r"\\d", texto):\n        total += int(numero)\n    return total\n\nprint(total_importes("Pan 12 €, leche 3 €, vino 105 €"))\nprint(total_importes("sin importes"))',
    spec: {
      functions: [{ name: 'total_importes', params: 1 }],
      cases: [
        { label: 'Programa completo', out_lines: ['120', '0'] },
        { label: 'total_importes("1000 y 1")', call: 'print(total_importes("1000 y 1"))', out_lines: ['1001'] },
      ],
      misconceptions: [
        { out_lines: ['12', '0'], title: 'Suma cifra a cifra', msg: '`\\d` encaja con un solo dígito. Añade `+` para coger números enteros completos: `\\d+`.' },
      ],
      logic_msg: 'Comprueba con "1000 y 1": el resultado debe ser 1001.',
    },
    hints: [
      { level: 'Orientación', text: 'Muestra lo que devuelve `re.findall(r"\\d", texto)` para ver qué está sumando.' },
      { level: 'Razonamiento', text: '¿Qué símbolo hace que un patrón encaje con «uno o más» caracteres seguidos?' },
      { level: 'Pseudocódigo', text: 'patrón ← uno o más dígitos seguidos', pre: true },
      { level: 'Ayuda técnica', text: 'Cambia `r"\\d"` por `r"\\d+"`.' },
    ],
    solution: {
      code: 'import re\n\ndef total_importes(texto):\n    total = 0\n    for numero in re.findall(r"\\d+", texto):\n        total += int(numero)\n    return total\n\nprint(total_importes("Pan 12 €, leche 3 €, vino 105 €"))\nprint(total_importes("sin importes"))',
      explanation: 'Con `\\d+` cada número completo es una coincidencia: "12", "3" y "105". Después int() los convierte para sumarlos.',
    },
    reference: ['import re\n\ndef total_importes(texto):\n    total = 0\n    for numero in re.findall(r"\\d+", texto):\n        total += int(numero)\n    return total\n\nprint(total_importes("Pan 12 €, leche 3 €, vino 105 €"))\nprint(total_importes("sin importes"))'],
    wrongs: [
      { code: 'import re\n\ndef total_importes(texto):\n    total = 0\n    for numero in re.findall(r"\\d", texto):\n        total += int(numero)\n    return total\n\nprint(total_importes("Pan 12 €, leche 3 €, vino 105 €"))\nprint(total_importes("sin importes"))', category: 'comprension' },
      { code: 'import re\n\ndef total_importes(texto):\n    total = 0\n    for numero in re.findall(r"\\d+", texto):\n        total += numero\n    return total\n\nprint(total_importes("Pan 12 €, leche 3 €, vino 105 €"))\nprint(total_importes("sin importes"))', category: 'ejecucion' },
    ],
  },
  'reg-build': {
    id: 'reg-build', type: 'code', variant: 'build', kindLabel: 'Construye desde cero', topic: TOPIC,
    title: 'Las horas de la agenda', difficulty: 3, xp: 30, concepts: ['regex', 'cadenas'],
    unlock: { any: ['reg-predict', 'reg-complete', 'reg-fix'], count: 2, text: 'Supera al menos 2 de las actividades anteriores de la lección' },
    statement: 'Define `horas(texto)` que devuelva todas las horas que aparecen en un texto con el formato **h:mm** o **hh:mm** (una o dos cifras, dos puntos y exactamente dos cifras).\n\nEjemplo: `horas("Clase a las 9:30 y tutoría a las 14:05")` → `[\'9:30\', \'14:05\']`.',
    expected: "['9:30', '14:05']",
    plan: [
      {
        q: '¿Qué patrón describe las horas?',
        options: [
          { text: 'r"\\d{1,2}:\\d{2}"', correct: true },
          { text: 'r"\\d+:\\d+"', why: 'Aceptaría "123:4567": las horas tienen una o dos cifras y los minutos, exactamente dos.' },
          { text: 'r"\\d:\\d"', why: 'Solo encajaría con una cifra a cada lado: "14:05" no saldría entero.' },
        ],
      },
      {
        q: '¿Qué función de re usas para obtener todas?',
        options: [
          { text: 're.findall', correct: true },
          { text: 're.search', why: 'search solo encuentra la primera.' },
        ],
      },
    ],
    planScaffold: 'import re\n\ndef horas(texto):\n    # devolver todas las coincidencias del patrón\n\n\nprint(horas("Clase a las 9:30 y tutoría a las 14:05"))\n',
    starter: '',
    spec: {
      exact_lines: true,
      functions: [{ name: 'horas', params: 1 }],
      cases: [
        { label: 'Dos horas', call: 'print(horas("Clase a las 9:30 y tutoría a las 14:05"))', out_lines: ["['9:30', '14:05']"] },
        { label: 'Ninguna', call: 'print(horas("Hoy no hay nada"))', out_lines: ['[]'] },
        { label: 'Minutos de una cifra no valen', call: 'print(horas("a las 8:5 o a las 20:00"))', out_lines: ["['20:00']"] },
      ],
      misconceptions: [
        { out_lines: ["['9:30']"], title: 'Solo la primera', msg: 'Usa `re.findall` para obtener todas las coincidencias, no solo la primera.' },
        { out_lines: ["['9:3', '14:0']"], title: 'Faltan cifras', msg: 'Los minutos tienen exactamente dos cifras: `\\d{2}`.' },
      ],
      logic_msg: 'Revisa el patrón con "a las 8:5 o a las 20:00": solo 20:00 tiene el formato correcto.',
    },
    hints: [
      { level: 'Orientación', text: 'Una línea: devolver re.findall con el patrón adecuado.' },
      { level: 'Razonamiento', text: 'Horas: una o dos cifras → `\\d{1,2}`. Después los dos puntos. Minutos: exactamente dos → `\\d{2}`.' },
      { level: 'Pseudocódigo', text: 'devolver todas las coincidencias de «1 o 2 dígitos, :, 2 dígitos»', pre: true },
      { level: 'Ayuda técnica', text: '`return re.findall(r"\\d{1,2}:\\d{2}", texto)`.' },
    ],
    solution: {
      code: 'import re\n\ndef horas(texto):\n    """Devuelve las horas con formato h:mm o hh:mm que aparecen en texto."""\n    return re.findall(r"\\d{1,2}:\\d{2}", texto)\n\nprint(horas("Clase a las 9:30 y tutoría a las 14:05"))',
      explanation: '`\\d{1,2}` admite horas de una o dos cifras y `\\d{2}` exige dos cifras en los minutos. findall devuelve todas las coincidencias.',
    },
    reference: ['import re\n\ndef horas(texto):\n    return re.findall(r"\\d{1,2}:\\d{2}", texto)'],
    wrongs: [
      { code: 'import re\n\ndef horas(texto):\n    return re.findall(r"\\d+:\\d+", texto)', category: 'logica' },
      { code: 'import re\n\ndef horas(texto):\n    m = re.search(r"\\d{1,2}:\\d{2}", texto)\n    return [m.group()]', category: 'comprension' },
    ],
  },
};
