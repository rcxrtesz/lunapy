// Motorbike challenges (English translation of src/content/desafios-motos.js): the same course
// concepts with biker examples, starring Lunakiri's Kawasaki ZX-4RR. Same ids and structure.

const TOPIC = 'Motorbikes';
const BASICS = ['moto-deposito', 'moto-autonomia', 'moto-rpm', 'moto-vueltas', 'moto-aceite'];

export const ACTIVITIES_MOTOS = {
  // ------------------------------------------------------------------ 1
  'moto-deposito': {
    id: 'moto-deposito', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'The ZX-4RR\'s tank', difficulty: 1, xp: 10, concepts: ['reasignacion', 'expresiones'],
    prompt: 'Lunakiri sets off with the ZX-4RR\'s tank full, rides a route and stops to top up a little. Follow the program line by line: **what will it show?**',
    code: 'tank = 15\nused = 4\ntank = tank - used\ntank = tank + 3\nprint("Litres:", tank)',
    expectedOutput: 'Litres: 14',
    options: [
      { text: 'Litres: 14', correct: true },
      { text: 'Litres: 11', concept: 'reasignacion', why: 'After using 4 litres (11 left), line 4 **adds** 3 more: 11 + 3 = 14.' },
      { text: 'Litres: 15', concept: 'reasignacion', why: 'Each assignment changes the value of `tank`: first to 11 and then to 14. The 15 was only the starting value.' },
      { text: 'Litres: tank', concept: 'print', why: 'Without quotes, `tank` is a variable: `print` shows its **value**, not its name.' },
    ],
    explain: [
      'Line 1: `tank` is 15 (full tank).',
      'Line 3: Python works out the right-hand side (15 − 4 = 11) and stores it in `tank`.',
      'Line 4: 11 + 3 = 14. The previous value is replaced.',
      'Line 5: `Litres: 14` is shown.',
    ],
  },

  // ------------------------------------------------------------------ 2
  'moto-autonomia': {
    id: 'moto-autonomia', type: 'code', variant: 'complete', kindLabel: 'Complete the code', topic: TOPIC,
    title: 'How far can I go?', difficulty: 1, xp: 15, concepts: ['expresiones', 'print'],
    statement: 'Lunakiri\'s ZX-4RR has a **15-litre** tank and uses about **5 litres every 100 km**. Complete the calculation of the **range** (the km it can ride on a full tank) so the program shows:',
    expected: 'Range: 300.0 km',
    note: 'It has to work **even if the consumption changes**: if it used 6 litres every 100 km, the range would be 250 km.',
    starter: 'litres = 15\nconsumption = 5        # litres every 100 km\nrange_km = ___\nprint("Range:", range_km, "km")',
    spec: {
      blanks: true,
      cases: [{ label: 'Expected output', out_lines: ['Range: 300.0 km'] }],
      variants: [{
        label: 'Consumption changed to 6 litres', set: { consumption: 6 },
        out_lines: ['Range: 250.0 km'],
        msg: 'It shows 300 by coincidence: if the consumption were 6 litres, the range should drop to 250 km. Calculate from the variables litres and consumption.',
      }],
      misconceptions: [
        { out_lines: ['Range: 75 km'], title: 'Multiplying isn\'t the operation', msg: 'You\'ve multiplied litres by consumption. Think: if you do 100 km with 5 litres, how many times do 5 litres fit in the tank?' },
        { out_lines: ['Range: 3.0 km'], title: 'You\'re missing a step', msg: 'litres / consumption tells you how many times the consumption fits in the tank (3). Each of those times is 100 km.' },
      ],
      logic_msg: 'The range is (litres ÷ consumption) × 100.',
    },
    hints: [
      { level: 'Orientation', text: 'The blank is an **expression** that uses the variables `litres` and `consumption`.' },
      { level: 'Reasoning', text: 'With 5 litres you ride 100 km. How many «blocks» of 5 litres are there in 15? Each block is 100 km.' },
      { level: 'Pseudocode', text: 'blocks ← litres ÷ consumption\nrange ← blocks × 100', pre: true },
      { level: 'Technical help', text: '`/` divides (and gives a decimal number) and `*` multiplies: `litres / consumption * 100`.' },
    ],
    solution: {
      code: 'litres = 15\nconsumption = 5        # litres every 100 km\nrange_km = litres / consumption * 100\nprint("Range:", range_km, "km")',
      explanation: '`15 / 5` gives 3.0 (division `/` always gives a decimal) and times 100 is 300.0 km. Because it uses the variables, if you change the consumption the range recalculates by itself.',
    },
    reference: [
      'litres = 15\nconsumption = 5\nrange_km = litres / consumption * 100\nprint("Range:", range_km, "km")',
      'litres = 15\nconsumption = 5\nrange_km = 100 * litres / consumption\nprint("Range:", range_km, "km")',
    ],
    wrongs: [
      { code: 'litres = 15\nconsumption = 5\nrange_km = ___\nprint("Range:", range_km, "km")', category: 'incompleto' },
      { code: 'litres = 15\nconsumption = 5\nrange_km = litres * consumption\nprint("Range:", range_km, "km")', category: 'comprension' },
      { code: 'litres = 15\nconsumption = 5\nrange_km = 300.0\nprint("Range:", range_km, "km")', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 3
  'moto-rpm': {
    id: 'moto-rpm', type: 'code', variant: 'fix', kindLabel: 'Find and fix the error', topic: TOPIC,
    title: 'The rev counter', difficulty: 2, xp: 20, concepts: ['condicionales', 'errores'],
    statement: 'The ZX-4RR\'s 4-cylinder engine revs extremely high. This function warns Lunakiri according to the revs (rpm): **over 14000**, «Rev limiter!»; **over 8000**, «Shift up»; **under 3000**, «Shift down»; otherwise, «Perfect». But at 15000 rpm it says «Shift up». **There\'s no Python error**: the fault is in the logic.',
    expected: 'Rev limiter!\nShift up\nShift down\nPerfect',
    starter: 'def rpm_warning(rpm):\n    if rpm > 8000:\n        return "Shift up"\n    elif rpm > 14000:\n        return "Rev limiter!"\n    elif rpm < 3000:\n        return "Shift down"\n    else:\n        return "Perfect"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))',
    spec: {
      functions: [{ name: 'rpm_warning', params: 1 }],
      cases: [
        { label: 'Whole program', out_lines: ['Rev limiter!', 'Shift up', 'Shift down', 'Perfect'] },
        { label: 'rpm_warning(14000) (limit)', call: 'print(rpm_warning(14000))', out_lines: ['Shift up'] },
        { label: 'rpm_warning(14001)', call: 'print(rpm_warning(14001))', out_lines: ['Rev limiter!'] },
        { label: 'rpm_warning(3000) (limit)', call: 'print(rpm_warning(3000))', out_lines: ['Perfect'] },
      ],
      misconceptions: [
        { out_lines: ['Shift up', 'Shift up', 'Shift down', 'Perfect'], title: 'The first condition grabs everything', msg: '15000 is also greater than 8000, and since that condition goes first, the 14000 one is never checked. The strictest one has to go first.' },
      ],
      logic_msg: 'Check the limits: 14000 rpm is «Shift up», 14001 is already the limiter, and 3000 rpm is «Perfect».',
    },
    hints: [
      { level: 'Orientation', text: 'Run the program: at 15000 rpm it says «Shift up». Which condition is checked first?' },
      { level: 'Reasoning', text: 'Python takes the **first** true condition. 15000 > 8000 is true… and so is 15000 > 14000. Which one should be looked at first?' },
      { level: 'Pseudocode', text: 'if rpm > 14000: limiter\notherwise, if rpm > 8000: shift up\notherwise, if rpm < 3000: shift down\notherwise: perfect', pre: true },
      { level: 'Technical help', text: 'Swap the first two conditions (and their `return`s): start with `if rpm > 14000:`.' },
    ],
    solution: {
      code: 'def rpm_warning(rpm):\n    if rpm > 14000:\n        return "Rev limiter!"\n    elif rpm > 8000:\n        return "Shift up"\n    elif rpm < 3000:\n        return "Shift down"\n    else:\n        return "Perfect"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))',
      explanation: 'With «greater than» conditions, the strictest (14000) goes first. That way 15000 rpm stays at the limiter and doesn\'t «slip into» «Shift up».',
    },
    reference: [
      'def rpm_warning(rpm):\n    if rpm > 14000:\n        return "Rev limiter!"\n    elif rpm > 8000:\n        return "Shift up"\n    elif rpm < 3000:\n        return "Shift down"\n    else:\n        return "Perfect"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))',
      'def rpm_warning(rpm):\n    if rpm < 3000:\n        return "Shift down"\n    if rpm <= 8000:\n        return "Perfect"\n    if rpm <= 14000:\n        return "Shift up"\n    return "Rev limiter!"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))',
    ],
    wrongs: [
      { code: 'def rpm_warning(rpm):\n    if rpm > 8000:\n        return "Shift up"\n    elif rpm > 14000:\n        return "Rev limiter!"\n    elif rpm < 3000:\n        return "Shift down"\n    else:\n        return "Perfect"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))', category: 'comprension' },
      { code: 'def rpm_warning(rpm):\n    if rpm >= 14000:\n        return "Rev limiter!"\n    elif rpm > 8000:\n        return "Shift up"\n    elif rpm < 3000:\n        return "Shift down"\n    else:\n        return "Perfect"\n\nprint(rpm_warning(15000))\nprint(rpm_warning(10000))\nprint(rpm_warning(2000))\nprint(rpm_warning(5000))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 4
  'moto-vueltas': {
    id: 'moto-vueltas', type: 'predict', kindLabel: 'Predict the result', topic: TOPIC,
    title: 'Laps of the track', difficulty: 2, xp: 10, concepts: ['bucles'],
    prompt: 'Lunakiri is training on a track: each lap covers more km than the one before. **What will the program show?**',
    code: 'total = 0\nfor lap in range(1, 4):\n    total = total + lap * 2\nprint(total)',
    expectedOutput: '12',
    options: [
      { text: '12', correct: true },
      { text: '20', concept: 'bucles', why: '`range(1, 4)` gives 1, 2 and 3: **4 isn\'t included**. It would be 2 + 4 + 6 + 8 if it went up to 4.' },
      { text: '6', concept: 'bucles', why: 'Each lap adds `lap * 2`, not `lap`: 2 + 4 + 6.' },
      { text: '2\n4\n6', concept: 'bucles', why: 'The `print` isn\'t indented: it\'s **outside** the loop, so it only runs once, at the end.' },
    ],
    explain: [
      '`range(1, 4)` produces 1, 2 and 3.',
      'Lap 1: total = 0 + 2 = 2. Lap 2: 2 + 4 = 6. Lap 3: 6 + 6 = 12.',
      'The `print` is outside the loop: only the final result, 12, is shown.',
    ],
  },

  // ------------------------------------------------------------------ 5
  'moto-aceite': {
    id: 'moto-aceite', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Time for an oil change', difficulty: 2, xp: 25, concepts: ['expresiones', 'retorno', 'parametros'],
    statement: 'Lunakiri\'s ZX-4RR needs an oil change **every 6000 km**: at 6000, at 12000, at 18000…\n\nDefine `km_to_oil_change(km)` that, given the km on the odometer, **returns** how many km are left until the next change. If it\'s due right now (for example, at 12000 km), return **0**.',
    expected: '4500',
    plan: [
      {
        q: 'At 13500 km, how many km has it done since the last change (at 12000)?',
        options: [
          { text: '1500: it\'s the remainder of dividing 13500 by 6000', correct: true },
          { text: '2.25: it\'s 13500 divided by 6000', why: 'That says how many «stretches of 6000» fit, not the km left over from the last stretch.' },
        ],
      },
      {
        q: 'And how many are left until the next one?',
        options: [
          { text: '6000 − 1500 = 4500', correct: true },
          { text: '1500', why: 'That\'s what it has already ridden since the last change, not what\'s left.' },
        ],
      },
    ],
    planScaffold: 'def km_to_oil_change(km):\n    # 1. km ridden since the last change (remainder by 6000)\n    # 2. km left until 6000\n    # 3. If it\'s due right now, 0\n\n\nprint(km_to_oil_change(13500))\n',
    starter: '',
    spec: {
      functions: [{ name: 'km_to_oil_change', params: 1 }],
      cases: [
        { label: 'km_to_oil_change(13500)', call: 'print(km_to_oil_change(13500))', out_lines: ['4500'] },
        { label: 'km_to_oil_change(1000)', call: 'print(km_to_oil_change(1000))', out_lines: ['5000'] },
        { label: 'km_to_oil_change(5999)', call: 'print(km_to_oil_change(5999))', out_lines: ['1'] },
        { label: 'km_to_oil_change(12000) (due right now)', call: 'print(km_to_oil_change(12000))', out_lines: ['0'] },
      ],
      misconceptions: [
        { out_lines: ['6000'], title: 'When it\'s due right now', msg: 'At 12000 km the remainder is 0, and 6000 − 0 = 6000. But if the oil change is due right now, 0 km are left: handle that case separately (or use the remainder again).' },
      ],
      logic_msg: 'What\'s left is 6000 minus the km ridden since the last change (km % 6000); and 0 if it\'s due right now.',
    },
    hints: [
      { level: 'Orientation', text: 'You need to know how many km the bike has done **since the last change**. The operator that gives the **remainder** of a division is your friend.' },
      { level: 'Reasoning', text: '`13500 % 6000` gives 1500: the km ridden since the change at 12000. What\'s left is 6000 − 1500. And if the remainder is 0?' },
      { level: 'Pseudocode', text: 'ridden ← km % 6000\nif ridden = 0: return 0\nreturn 6000 − ridden', pre: true },
      { level: 'Technical help', text: '`%` gives the remainder: `km % 6000`. Check it with `if ridden == 0:` and return with `return`.' },
    ],
    solution: {
      code: 'def km_to_oil_change(km):\n    ridden = km % 6000\n    if ridden == 0:\n        return 0\n    return 6000 - ridden\n\n\nprint(km_to_oil_change(13500))',
      explanation: 'The remainder `km % 6000` is the km since the last change; what\'s left is 6000 minus that. If the remainder is 0, the change is due right now and 0 is returned.',
    },
    reference: [
      'def km_to_oil_change(km):\n    ridden = km % 6000\n    if ridden == 0:\n        return 0\n    return 6000 - ridden\n\nprint(km_to_oil_change(13500))',
      'def km_to_oil_change(km):\n    return (6000 - km % 6000) % 6000\n\nprint(km_to_oil_change(13500))',
    ],
    wrongs: [
      { code: 'def km_to_oil_change(km):\n    return 6000 - km % 6000\n\nprint(km_to_oil_change(13500))', category: 'comprension' },
      { code: 'def km_to_oil_change(km):\n    return 6000 - km\n\nprint(km_to_oil_change(13500))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 6
  'moto-ruta': {
    id: 'moto-ruta', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'The route summary', difficulty: 3, xp: 30, concepts: ['listas', 'bucles', 'retorno'],
    unlock: { any: BASICS, count: 2, text: 'Pass at least 2 of the simpler motorbike challenges' },
    statement: 'Lunakiri notes down the km of each stretch of a route in a list, for example `[120, 45, 80]`.\n\nDefine `route_summary(stretches)` that **returns** two values: the **total km** and the **longest stretch**. For `[120, 45, 80]` it returns `(245, 120)`.\n\nCareful: if the list is **empty** (a day without riding), return `(0, 0)` without the program failing.',
    expected: '(245, 120)',
    starter: '',
    spec: {
      functions: [{ name: 'route_summary', params: 1 }],
      cases: [
        { label: 'route_summary([120, 45, 80])', call: 'print(route_summary([120, 45, 80]))', out_lines: ['(245, 120)'] },
        { label: 'route_summary([30])', call: 'print(route_summary([30]))', out_lines: ['(30, 30)'] },
        { label: 'route_summary([10, 200, 200, 5])', call: 'print(route_summary([10, 200, 200, 5]))', out_lines: ['(415, 200)'] },
        { label: 'route_summary([]) (no ride)', call: 'print(route_summary([]))', out_lines: ['(0, 0)'] },
      ],
      logic_msg: 'Go through the list adding each stretch to the total and keeping the biggest you\'ve seen.',
    },
    hints: [
      { level: 'Orientation', text: 'You need two accumulators: one for the **total** and another for the **longest** seen so far. At the end, `return total, longest`.' },
      { level: 'Reasoning', text: 'What value do they start at? If you start `longest` at 0, an empty list returns 0 without errors, and any real stretch will be bigger.' },
      { level: 'Pseudocode', text: 'total ← 0; longest ← 0\nfor each stretch in stretches:\n    total ← total + stretch\n    if stretch > longest: longest ← stretch\nreturn total, longest', pre: true },
      { level: 'Technical help', text: 'A `for stretch in stretches:` with an `if` inside. `return total, longest` returns a tuple. (If you use `max(stretches)`, first check the list isn\'t empty: `max([])` gives an error).' },
    ],
    solution: {
      code: 'def route_summary(stretches):\n    total = 0\n    longest = 0\n    for stretch in stretches:\n        total = total + stretch\n        if stretch > longest:\n            longest = stretch\n    return total, longest\n\n\nprint(route_summary([120, 45, 80]))',
      explanation: 'A single pass works out both things. Starting both accumulators at 0 makes the empty list work without a special case, and `return total, longest` returns a tuple.',
    },
    reference: [
      'def route_summary(stretches):\n    total = 0\n    longest = 0\n    for stretch in stretches:\n        total = total + stretch\n        if stretch > longest:\n            longest = stretch\n    return total, longest\n\nprint(route_summary([120, 45, 80]))',
      'def route_summary(stretches):\n    if not stretches:\n        return 0, 0\n    return sum(stretches), max(stretches)\n\nprint(route_summary([120, 45, 80]))',
    ],
    wrongs: [
      { code: 'def route_summary(stretches):\n    return sum(stretches), max(stretches)\n\nprint(route_summary([120, 45, 80]))', category: 'ejecucion' },
      { code: 'def route_summary(stretches):\n    total = 0\n    longest = 0\n    for stretch in stretches:\n        total = stretch\n        if stretch > longest:\n            longest = stretch\n    return total, longest\n\nprint(route_summary([120, 45, 80]))', category: 'logica' },
    ],
  },

  // ------------------------------------------------------------------ 7
  'moto-garaje': {
    id: 'moto-garaje', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'The club garage', difficulty: 3, xp: 30, concepts: ['diccionarios', 'bucles', 'cadenas'],
    unlock: { any: BASICS, count: 2, text: 'Pass at least 2 of the simpler motorbike challenges' },
    statement: 'Lunakiri\'s motorbike club has a list of its members\' bikes: make and model, like `"Kawasaki ZX-4RR"`.\n\nDefine `bikes_by_make(bikes)` that **returns a dictionary** with how many bikes there are of each make (the make is the **first word**).\n\nFor example, `["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]` → `{\'Kawasaki\': 2, \'Yamaha\': 1}`.',
    expected: "{'Kawasaki': 2, 'Yamaha': 1}",
    starter: '',
    spec: {
      functions: [{ name: 'bikes_by_make', params: 1 }],
      cases: [
        { label: 'Three bikes, two makes', call: 'print(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', out_lines: ["{'Kawasaki': 2, 'Yamaha': 1}"] },
        { label: 'Just one bike', call: 'print(bikes_by_make(["Honda CBR650R"]))', out_lines: ["{'Honda': 1}"] },
        { label: 'Empty list', call: 'print(bikes_by_make([]))', out_lines: ['{}'] },
        { label: 'Models with several words', call: 'print(bikes_by_make(["Kawasaki Ninja ZX-4RR", "Ducati Panigale V2", "Kawasaki Ninja 500"]))', out_lines: ["{'Kawasaki': 2, 'Ducati': 1}"] },
      ],
      misconceptions: [
        { out_lines: ["{'Kawasaki ZX-4RR': 1, 'Yamaha R7': 1, 'Kawasaki Z900': 1}"], title: 'You\'re counting models, not makes', msg: 'You\'re using the full name as the key. Split the text into words and keep only the first: `bike.split()[0]`.' },
      ],
      logic_msg: 'For each bike, take the first word and add 1 to its counter in the dictionary.',
    },
    hints: [
      { level: 'Orientation', text: 'It\'s the **counter dictionary** pattern: start with `{}` and, for each bike, add 1 to the make it belongs to.' },
      { level: 'Reasoning', text: 'How do you get the make out of `"Kawasaki ZX-4RR"`? Split the text into words and take the first.' },
      { level: 'Pseudocode', text: 'count ← empty dictionary\nfor each bike in bikes:\n    make ← first word of bike\n    count[make] ← count[make] (or 0) + 1\nreturn count', pre: true },
      { level: 'Technical help', text: '`bike.split()[0]` gives the first word, and `count.get(make, 0) + 1` adds 1 even if the make isn\'t in the dictionary yet.' },
    ],
    solution: {
      code: 'def bikes_by_make(bikes):\n    count = {}\n    for bike in bikes:\n        make = bike.split()[0]\n        count[make] = count.get(make, 0) + 1\n    return count\n\n\nprint(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
      explanation: '`split()` separates by spaces and `[0]` keeps the make. `get(make, 0)` returns 0 the first time a make appears, so there\'s no need for an `if`.',
    },
    reference: [
      'def bikes_by_make(bikes):\n    count = {}\n    for bike in bikes:\n        make = bike.split()[0]\n        count[make] = count.get(make, 0) + 1\n    return count\n\nprint(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
      'def bikes_by_make(bikes):\n    count = {}\n    for bike in bikes:\n        make = bike.split(" ")[0]\n        if make in count:\n            count[make] += 1\n        else:\n            count[make] = 1\n    return count\n\nprint(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))',
    ],
    wrongs: [
      { code: 'def bikes_by_make(bikes):\n    count = {}\n    for bike in bikes:\n        count[bike] = count.get(bike, 0) + 1\n    return count\n\nprint(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', category: 'comprension' },
      { code: 'def bikes_by_make(bikes):\n    count = {}\n    for bike in bikes:\n        make = bike.split()[0]\n        count[make] = count[make] + 1\n    return count\n\nprint(bikes_by_make(["Kawasaki ZX-4RR", "Yamaha R7", "Kawasaki Z900"]))', category: 'ejecucion' },
    ],
  },

  // ------------------------------------------------------------------ 8
  'moto-clase': {
    id: 'moto-clase', type: 'code', variant: 'build', kindLabel: 'Real-life challenge', topic: TOPIC,
    title: 'Your own ZX-4RR in Python', difficulty: 3, xp: 40, concepts: ['clases', 'condicionales'],
    unlock: { any: ['moto-ruta', 'moto-garaje'], count: 1, text: 'Pass «The route summary» or «The club garage»' },
    statement: 'Model Lunakiri\'s bike with a `Motorbike` class:\n\n• `Motorbike(model, capacity)` stores the model, the tank capacity in litres and starts with the tank **full** (attribute `litres`).\n\n• `ride(km)`: the bike uses **5 litres every 100 km**. If there\'s enough fuel, it subtracts what was used and **returns True**; if not, it doesn\'t move, uses nothing and **returns False**.\n\n• `refuel()`: fills the tank up again.',
    expected: 'True 10.0',
    starter: '',
    spec: {
      classes: [{ name: 'Motorbike' }],
      cases: [
        { label: 'Ride 100 km with 15 litres', call: 'm = Motorbike("ZX-4RR", 15)\nprint(m.ride(100), m.litres)', out_lines: ['True 10.0'] },
        { label: 'Ride 300 km (exactly the tank)', call: 'm = Motorbike("ZX-4RR", 15)\nprint(m.ride(300), m.litres)', out_lines: ['True 0.0'] },
        { label: 'Ride 400 km: not enough', call: 'm = Motorbike("ZX-4RR", 15)\nprint(m.ride(400), m.litres)', out_lines: ['False 15'] },
        { label: 'Ride and refuel', call: 'm = Motorbike("ZX-4RR", 15)\nm.ride(200)\nm.refuel()\nprint(m.litres, m.model)', out_lines: ['15 ZX-4RR'] },
      ],
      misconceptions: [
        { out_lines: ['True -5.0'], title: 'You ran out of fuel… and kept going', msg: 'Before subtracting, check whether there are enough litres for those km. If there aren\'t, return False without touching the tank.' },
      ],
      logic_msg: 'Fuel used = km × 5 ÷ 100. It\'s only subtracted if fuel used ≤ litres.',
    },
    hints: [
      { level: 'Orientation', text: 'Three methods: `__init__` (stores the data and fills the tank), `ride` and `refuel`. They all take `self` as their first parameter.' },
      { level: 'Reasoning', text: 'In `ride`, first work out how much you\'d use. If it\'s more than what\'s in `self.litres`, the bike doesn\'t move.' },
      { level: 'Pseudocode', text: 'ride(km):\n    used ← km × 5 ÷ 100\n    if used > litres: return False\n    litres ← litres − used\n    return True', pre: true },
      { level: 'Technical help', text: 'In `__init__`: `self.model = model`, `self.capacity = capacity` and `self.litres = capacity`. In `refuel`: `self.litres = self.capacity`.' },
    ],
    solution: {
      code: 'class Motorbike:\n    def __init__(self, model, capacity):\n        self.model = model\n        self.capacity = capacity\n        self.litres = capacity\n\n    def ride(self, km):\n        used = km * 5 / 100\n        if used > self.litres:\n            return False\n        self.litres = self.litres - used\n        return True\n\n    def refuel(self):\n        self.litres = self.capacity\n\n\nzx = Motorbike("ZX-4RR", 15)\nprint(zx.ride(100), zx.litres)',
      explanation: 'The object remembers its state in `self.litres`. `ride` checks before using fuel (so there\'s never negative fuel) and `refuel` uses the capacity stored in `__init__`.',
    },
    reference: [
      'class Motorbike:\n    def __init__(self, model, capacity):\n        self.model = model\n        self.capacity = capacity\n        self.litres = capacity\n\n    def ride(self, km):\n        used = km * 5 / 100\n        if used > self.litres:\n            return False\n        self.litres = self.litres - used\n        return True\n\n    def refuel(self):\n        self.litres = self.capacity\n\nzx = Motorbike("ZX-4RR", 15)\nprint(zx.ride(100), zx.litres)',
    ],
    wrongs: [
      { code: 'class Motorbike:\n    def __init__(self, model, capacity):\n        self.model = model\n        self.capacity = capacity\n        self.litres = capacity\n\n    def ride(self, km):\n        self.litres = self.litres - km * 5 / 100\n        return True\n\n    def refuel(self):\n        self.litres = self.capacity\n\nzx = Motorbike("ZX-4RR", 15)\nprint(zx.ride(100), zx.litres)', category: 'comprension' },
      { code: 'class Motorbike:\n    def __init__(self, model, capacity):\n        self.model = model\n        self.litres = capacity\n\n    def ride(self, km):\n        used = km * 5 / 100\n        if used > self.litres:\n            return False\n        self.litres = self.litres - used\n        return True\n\n    def refuel(self):\n        self.litres = self.capacity\n\nzx = Motorbike("ZX-4RR", 15)\nprint(zx.ride(100), zx.litres)', category: 'ejecucion' },
    ],
  },
};
