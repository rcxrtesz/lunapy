// Currículo. Correspondencia con «Piensa en Python» (libropython.es, versión
// española de Think Python 3.ª ed.) y con Cisco Python Essentials 1 (PE1).
import { t } from '../lib/i18n.js';
import { PAQUETE, traducir } from './traduccion.js';

export const CONCEPTS = {
  asignacion: { name: t('Asignación de variables', 'Assigning variables'), short: t('Asignación', 'Assignment') },
  reasignacion: { name: t('Modificar una variable', 'Changing a variable'), short: t('Reasignación', 'Reassignment') },
  tipos: { name: t('Tipos: texto y números', 'Types: text and numbers'), short: t('Tipos', 'Types') },
  print: { name: t('Mostrar resultados con print()', 'Showing results with print()'), short: t('print()', 'print()') },
  input: { name: t('Pedir datos con input() y convertirlos', 'Asking for data with input() and converting it'), short: t('input()', 'input()') },
  errores: { name: t('Leer y corregir errores', 'Reading and fixing errors'), short: t('Errores', 'Errors') },
  descomponer: { name: t('Descomponer un problema en pasos', 'Breaking a problem into steps'), short: t('Descomponer', 'Decomposing') },
  algoritmo: { name: t('Algoritmos y orden de ejecución', 'Algorithms and order of execution'), short: t('Algoritmos', 'Algorithms') },
  operadores: { name: t('Operadores y expresiones', 'Operators and expressions'), short: t('Operadores', 'Operators') },
  expresiones: { name: t('Cómo evalúa Python una expresión', 'How Python evaluates an expression'), short: t('Expresiones', 'Expressions') },
  funciones: { name: t('Llamar y definir funciones', 'Calling and defining functions'), short: t('Funciones', 'Functions') },
  modulos: { name: t('Importar módulos (math)', 'Importing modules (math)'), short: t('Módulos', 'Modules') },
  parametros: { name: t('Parámetros, return y variables locales', 'Parameters, return and local variables'), short: t('Parámetros', 'Parameters') },
  diseno: { name: t('Diseñar y refactorizar funciones', 'Designing and refactoring functions'), short: t('Diseño', 'Design') },
  booleanos: { name: t('Comparaciones y lógica booleana', 'Comparisons and boolean logic'), short: t('Booleanos', 'Booleans') },
  condicionales: { name: t('Decidir con if, elif y else', 'Deciding with if, elif and else'), short: t('Condicionales', 'Conditionals') },
  recursion: { name: t('Funciones recursivas', 'Recursive functions'), short: t('Recursión', 'Recursion') },
  retorno: { name: t('Valores de retorno', 'Return values'), short: t('return', 'return') },
  incremental: { name: t('Desarrollo incremental', 'Incremental development'), short: t('Incremental', 'Incremental') },
  composicion: { name: t('Composición de funciones', 'Function composition'), short: t('Composición', 'Composition') },
  bucles: { name: t('Bucles for y while', 'for and while loops'), short: t('Bucles', 'Loops') },
  busqueda: { name: t('Patrones de búsqueda', 'Search patterns'), short: t('Búsqueda', 'Search') },
  cadenas: { name: t('Índices, porciones y métodos de cadena', 'Indexes, slices and string methods'), short: t('Cadenas', 'Strings') },
  regex: { name: t('Expresiones regulares', 'Regular expressions'), short: t('Regex', 'Regex') },
  listas: { name: t('Listas: crear, recorrer y transformar', 'Lists: create, loop over and transform'), short: t('Listas', 'Lists') },
  alias: { name: t('Mutabilidad, alias y copias', 'Mutability, aliases and copies'), short: t('Alias', 'Aliases') },
  diccionarios: { name: t('Diccionarios: claves y valores', 'Dictionaries: keys and values'), short: t('Diccionarios', 'Dictionaries') },
  tuplas: { name: t('Tuplas, zip y ordenar por clave', 'Tuples, zip and sorting by key'), short: t('Tuplas', 'Tuples') },
  archivos: { name: t('Leer y escribir archivos', 'Reading and writing files'), short: t('Archivos', 'Files') },
  datos: { name: t('Procesar datos en tabla (CSV)', 'Processing table data (CSV)'), short: t('Datos', 'Data') },
  excepciones: { name: t('Excepciones: try, except y raise', 'Exceptions: try, except and raise'), short: t('Excepciones', 'Exceptions') },
  clases: { name: t('Clases, objetos y métodos', 'Classes, objects and methods'), short: t('Clases', 'Classes') },
  herencia: { name: t('Herencia y polimorfismo', 'Inheritance and polymorphism'), short: t('Herencia', 'Inheritance') },
  depuracion: { name: t('Estrategias de depuración y pruebas', 'Debugging and testing strategies'), short: t('Depuración', 'Debugging') },
  estilo: { name: t('Estilo y buenas prácticas', 'Style and good practices'), short: t('Estilo', 'Style') },
};

const ORIGINAL = [
  {
    id: 'm1', num: 1, title: 'Pensamiento computacional y Python',
    book: ['Cap. 1 · Bienvenida (la programación como forma de pensar)'], cisco: 'PE1 · Módulo 1',
    objectives: ['Entender qué es un programa y cómo lo ejecuta Python', 'Descomponer problemas cotidianos en pasos', 'Escribir y ejecutar tus primeras instrucciones'],
    prerequisites: ['Ninguno'],
    lessons: [
      { id: 'algoritmos', title: 'Qué es programar: de la receta al algoritmo' },
      { id: 'calculadora', title: 'Python como calculadora' },
      { id: 'primer-programa', title: 'Tu primer programa con print()' },
    ],
  },
  {
    id: 'm2', num: 2, title: 'Variables, tipos de datos, expresiones y operadores',
    book: ['Cap. 2 · Variables y sentencias'], cisco: 'PE1 · Módulo 2',
    objectives: ['Guardar y modificar datos con variables', 'Distinguir texto y números y convertir entre ellos', 'Construir expresiones con operadores'],
    prerequisites: ['Módulo 1 (recomendado)'],
    lessons: [
      { id: 'variables', title: 'Variables: dar nombre a los datos' },
      { id: 'expresiones', title: 'Expresiones y operadores aritméticos' },
      { id: 'entrada', title: 'Tipos, conversiones y entrada de datos' },
      { title: 'Reto del módulo: ticket de compra', challenge: 'ch-iva' },
    ],
  },
  {
    id: 'm3', num: 3, title: 'Funciones, parámetros y argumentos',
    book: ['Cap. 3 · Funciones'], cisco: 'PE1 · Módulo 4',
    objectives: ['Definir funciones propias', 'Pasar información mediante parámetros', 'Entender el ámbito de las variables'],
    prerequisites: ['Módulo 2'],
    lessons: [{ id: 'llamar-funciones', title: 'Llamar a funciones' }, { id: 'definir-funciones', title: 'Definir tus propias funciones' }, { id: 'parametros', title: 'Parámetros y variables locales' }],
  },
  {
    id: 'm4', num: 4, title: 'Funciones, interfaces y organización de programas',
    book: ['Cap. 4 · Funciones e interfaces'], cisco: 'PE1 · Módulo 4',
    objectives: ['Diseñar funciones con interfaces claras', 'Encapsular y generalizar', 'Refactorizar código repetido'],
    prerequisites: ['Módulo 3'],
    lessons: [{ id: 'encapsular', title: 'Encapsulación y generalización' }, { id: 'interfaces', title: 'Diseño de interfaces' }, { id: 'refactorizar', title: 'Refactorización' }],
  },
  {
    id: 'm5', num: 5, title: 'Condicionales, lógica booleana y recursión',
    book: ['Cap. 5 · Condicionales y recursión'], cisco: 'PE1 · Módulo 3',
    objectives: ['Tomar decisiones con if / elif / else', 'Combinar condiciones con and, or, not', 'Entender la recursión'],
    prerequisites: ['Módulo 3'],
    lessons: [{ id: 'booleanas', title: 'Expresiones booleanas' }, { id: 'condicionales', title: 'if, elif y else' }, { id: 'recursion', title: 'Recursión' }],
  },
  {
    id: 'm6', num: 6, title: 'Valores de retorno y composición',
    book: ['Cap. 6 · Valores de retorno'], cisco: 'PE1 · Módulo 4',
    objectives: ['Devolver resultados con return', 'Desarrollo incremental', 'Componer funciones'],
    prerequisites: ['Módulos 3 y 5'],
    lessons: [{ id: 'retorno', title: 'return a fondo' }, { id: 'incremental', title: 'Desarrollo incremental' }, { id: 'composicion', title: 'Composición y funciones booleanas' }],
  },
  {
    id: 'm7', num: 7, title: 'Bucles, iteración y búsqueda',
    book: ['Cap. 7 · Iteración y búsqueda'], cisco: 'PE1 · Módulo 3',
    objectives: ['Repetir con for y while', 'Acumuladores y contadores', 'Buscar elementos'],
    prerequisites: ['Módulo 5'],
    lessons: [{ id: 'bucle-for', title: 'Bucles for' }, { id: 'bucle-while', title: 'Bucles while' }, { id: 'busqueda', title: 'Patrones de búsqueda' }],
  },
  {
    id: 'm8', num: 8, title: 'Cadenas de texto',
    book: ['Cap. 8 · Cadenas y expresiones regulares'], cisco: 'PE2 · Módulo 2',
    objectives: ['Indexar y trocear cadenas', 'Métodos de cadena', 'Introducción a expresiones regulares'],
    prerequisites: ['Módulo 7'],
    lessons: [{ id: 'indices', title: 'Índices y porciones' }, { id: 'metodos', title: 'Métodos de cadena' }, { id: 'regex', title: 'Expresiones regulares básicas' }],
  },
  {
    id: 'm9', num: 9, title: 'Listas',
    book: ['Cap. 9 · Listas'], cisco: 'PE1 · Módulo 3',
    objectives: ['Crear y modificar listas', 'Recorrer listas', 'Alias y mutabilidad'],
    prerequisites: ['Módulo 7'],
    lessons: [{ id: 'listas', title: 'Listas y operaciones' }, { id: 'recorrer-listas', title: 'Recorrer listas' }, { id: 'alias', title: 'Mutabilidad y alias' }],
  },
  {
    id: 'm10', num: 10, title: 'Diccionarios y tuplas',
    book: ['Cap. 10 · Diccionarios', 'Cap. 11 · Tuplas', 'Cap. 12 · Análisis y generación de texto (proyecto)'], cisco: 'PE1 · Módulo 4',
    objectives: ['Asociar claves y valores', 'Usar tuplas', 'Contar y analizar texto'],
    prerequisites: ['Módulo 9'],
    lessons: [{ id: 'diccionarios', title: 'Diccionarios' }, { id: 'tuplas', title: 'Tuplas' }, { id: 'proyecto-texto', title: 'Proyecto: análisis de texto' }],
  },
  {
    id: 'm11', num: 11, title: 'Archivos y tratamiento de datos',
    book: ['Cap. 13 · Archivos y bases de datos'], cisco: 'PE2 · Módulo 4',
    objectives: ['Leer y escribir archivos', 'Procesar datos tabulares', 'Gestionar errores con try / except'],
    prerequisites: ['Módulo 10'],
    lessons: [{ id: 'archivos', title: 'Leer y escribir archivos' }, { id: 'procesar', title: 'Procesar datos' }, { id: 'excepciones', title: 'Excepciones' }],
  },
  {
    id: 'm12', num: 12, title: 'Clases, objetos y programación orientada a objetos',
    book: ['Cap. 14 · Clases y funciones', 'Cap. 15 · Clases y métodos', 'Cap. 16 · Clases y objetos', 'Cap. 17 · Herencia'], cisco: 'PE2 · Módulo 3',
    objectives: ['Definir clases y crear objetos', 'Métodos y atributos', 'Herencia'],
    prerequisites: ['Módulo 10'],
    lessons: [{ id: 'clases', title: 'Clases y objetos' }, { id: 'metodos-clase', title: 'Métodos' }, { id: 'herencia', title: 'Herencia' }],
  },
  {
    id: 'm13', num: 13, title: 'Depuración, buenas prácticas y proyectos',
    book: ['Cap. 18 · Extras de Python', 'Cap. 19 · Reflexiones finales', 'Secciones de depuración de cada capítulo'], cisco: 'PE1/PE2 · Proyectos',
    objectives: ['Depurar de forma sistemática', 'Escribir código legible', 'Desarrollar un proyecto completo'],
    prerequisites: ['Módulos anteriores'],
    lessons: [{ id: 'depuracion', title: 'Estrategias de depuración' }, { id: 'estilo', title: 'Estilo y buenas prácticas' }, { id: 'proyecto-final', title: 'Proyecto final: gestor de gastos' }],
  },
];

// Con la app en inglés, los módulos ya traducidos sustituyen a los originales (mismo id).
export const MODULES_ORIGINAL = ORIGINAL;
export const MODULES = ORIGINAL.map((m) => traducir(m, PAQUETE?.MODULES_EN));
