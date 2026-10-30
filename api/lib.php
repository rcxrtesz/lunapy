<?php
// Funciones comunes de la API de LunaPy: configuración, base de datos, respuestas y sesiones.
// No se accede a este archivo directamente (el .htaccess lo bloquea); lo incluye index.php.
declare(strict_types=1);

const TAM_MAX_PETICION = 2 * 1024 * 1024; // 2 MB: el estado de una alumna ocupa mucho menos
const MAX_FALLOS_LOGIN = 5;               // intentos fallidos permitidos…
const VENTANA_FALLOS = 15 * 60;           // …en este intervalo (segundos)

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        // LUNAPY_CONFIG permite que las pruebas automáticas usen su propia configuración.
        $ruta = getenv('LUNAPY_CONFIG') ?: __DIR__ . '/config.php';
        if (!is_file($ruta)) {
            responder(500, ['error' => 'Falta api/config.php: copia config.example.php y rellénalo.']);
        }
        $cfg = require $ruta;
        $cfg += ['dias_sesion' => 180, 'emails_permitidos' => []];
    }
    return $cfg;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = config();
        $pdo = new PDO($c['dsn'], $c['usuario'] ?? null, $c['contrasena'] ?? null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        crear_tablas($pdo);
    }
    return $pdo;
}

/** Crea las tablas si no existen (MySQL en el servidor, SQLite en las pruebas locales). */
function crear_tablas(PDO $pdo): void
{
    $mysql = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql';
    $id = $mysql ? 'INT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $fin = $mysql ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : '';
    $texto = $mysql ? 'MEDIUMTEXT' : 'TEXT';
    $sentencias = [
        "CREATE TABLE IF NOT EXISTS usuarias (
            id $id,
            email VARCHAR(254) NOT NULL UNIQUE,
            hash_contrasena VARCHAR(255) NOT NULL,
            creada_en BIGINT NOT NULL
        )$fin",
        "CREATE TABLE IF NOT EXISTS sesiones (
            hash_token CHAR(64) NOT NULL PRIMARY KEY,
            usuaria_id INT NOT NULL,
            creada_en BIGINT NOT NULL,
            caduca_en BIGINT NOT NULL
        )$fin",
        "CREATE TABLE IF NOT EXISTS estados (
            usuaria_id INT NOT NULL PRIMARY KEY,
            revision INT NOT NULL,
            datos $texto NOT NULL,
            actualizado_en BIGINT NOT NULL
        )$fin",
        "CREATE TABLE IF NOT EXISTS intentos_fallidos (
            id $id,
            clave CHAR(64) NOT NULL,
            en BIGINT NOT NULL
        )$fin",
    ];
    foreach ($sentencias as $sql) {
        $pdo->exec($sql);
    }
}

/** Envía una respuesta JSON y termina. */
function responder(int $estado, array $cuerpo): never
{
    http_response_code($estado);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Lee el cuerpo JSON de la petición (un objeto). */
function leer_json(): array
{
    $crudo = file_get_contents('php://input', false, null, 0, TAM_MAX_PETICION + 1);
    if ($crudo === false || strlen($crudo) > TAM_MAX_PETICION) {
        responder(413, ['error' => 'La petición es demasiado grande.']);
    }
    $datos = json_decode($crudo, true);
    if (!is_array($datos)) {
        responder(400, ['error' => 'El cuerpo debe ser un objeto JSON.']);
    }
    return $datos;
}

/** ¿La excepción es por una clave única repetida? (SQLSTATE 23000 en MySQL y en SQLite) */
function es_duplicado(PDOException $e): bool
{
    return $e->getCode() === '23000';
}

function normalizar_email(mixed $email): string
{
    return is_string($email) ? strtolower(trim($email)) : '';
}

// ---------- Sesiones ----------

/** Crea una sesión y devuelve el token (solo se guarda su hash). */
function crear_sesion(int $usuariaId): string
{
    $token = bin2hex(random_bytes(32));
    $ahora = time();
    db()->prepare('INSERT INTO sesiones (hash_token, usuaria_id, creada_en, caduca_en) VALUES (?, ?, ?, ?)')
        ->execute([hash('sha256', $token), $usuariaId, $ahora, $ahora + config()['dias_sesion'] * 86400]);
    return $token;
}

function token_de_la_peticion(): string
{
    return (string) ($_SERVER['HTTP_X_LUNAPY_TOKEN'] ?? '');
}

/** Devuelve el id de la usuaria de la sesión, o responde 401. Renueva la caducidad al usarse. */
function usuaria_autenticada(): int
{
    $token = token_de_la_peticion();
    if (!preg_match('/^[0-9a-f]{64}$/', $token)) {
        responder(401, ['error' => 'Inicia sesión para sincronizar.']);
    }
    $hash = hash('sha256', $token);
    $st = db()->prepare('SELECT usuaria_id, caduca_en FROM sesiones WHERE hash_token = ?');
    $st->execute([$hash]);
    $sesion = $st->fetch();
    if (!$sesion || (int) $sesion['caduca_en'] < time()) {
        responder(401, ['error' => 'La sesión ha caducado. Vuelve a iniciar sesión.']);
    }
    db()->prepare('UPDATE sesiones SET caduca_en = ? WHERE hash_token = ?')
        ->execute([time() + config()['dias_sesion'] * 86400, $hash]);
    return (int) $sesion['usuaria_id'];
}

// ---------- Límite de intentos ----------

function clave_intentos(string $email): string
{
    return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . $email);
}

function comprobar_limite_intentos(string $email): void
{
    $st = db()->prepare('SELECT COUNT(*) FROM intentos_fallidos WHERE clave = ? AND en > ?');
    $st->execute([clave_intentos($email), time() - VENTANA_FALLOS]);
    if ((int) $st->fetchColumn() >= MAX_FALLOS_LOGIN) {
        responder(429, ['error' => 'Demasiados intentos fallidos. Espera unos minutos y vuelve a probar.']);
    }
}

function registrar_intento_fallido(string $email): void
{
    $pdo = db();
    $pdo->prepare('INSERT INTO intentos_fallidos (clave, en) VALUES (?, ?)')->execute([clave_intentos($email), time()]);
    $pdo->prepare('DELETE FROM intentos_fallidos WHERE en < ?')->execute([time() - VENTANA_FALLOS]);
}

function borrar_intentos(string $email): void
{
    db()->prepare('DELETE FROM intentos_fallidos WHERE clave = ?')->execute([clave_intentos($email)]);
}
