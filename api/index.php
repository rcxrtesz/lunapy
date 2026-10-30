<?php
// API de LunaPy: cuenta y sincronización del progreso entre dispositivos.
//
//   POST   index.php/registro       { email, contrasena }        → { token, email }
//   POST   index.php/sesion         { email, contrasena }        → { token, email }
//   DELETE index.php/sesion                                       → { ok }
//   GET    index.php/cuenta                                       → { email }
//   POST   index.php/cuenta/borrar  { contrasena }               → { ok }
//   GET    index.php/estado?desde=N                               → { revision, datos? }
//   PUT    index.php/estado         { revision_base, datos }     → { revision } | 409 { revision, datos }
//
// Las rutas que tocan datos exigen la cabecera X-LunaPy-Token con el token de la sesión.
declare(strict_types=1);

require __DIR__ . '/lib.php';

$ruta = trim((string) ($_SERVER['PATH_INFO'] ?? ''), '/');
$metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    match ("$metodo $ruta") {
        'POST registro' => registro(),
        'POST sesion' => iniciar_sesion(),
        'DELETE sesion' => cerrar_sesion(),
        'GET cuenta' => cuenta(),
        'POST cuenta/borrar' => borrar_cuenta(),
        'GET estado' => leer_estado(),
        'PUT estado' => guardar_estado(),
        default => responder(404, ['error' => 'Ruta no encontrada.']),
    };
} catch (Throwable $e) {
    error_log('[LunaPy] ' . $e);
    responder(500, ['error' => 'Error interno del servidor. Inténtalo más tarde.']);
}

// ---------- Cuenta ----------

function registro(): never
{
    $datos = leer_json();
    $email = normalizar_email($datos['email'] ?? '');
    $contrasena = (string) ($datos['contrasena'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        responder(400, ['error' => 'Escribe un correo electrónico válido.']);
    }
    $permitidos = array_map('normalizar_email', config()['emails_permitidos']);
    if (!in_array($email, $permitidos, true)) {
        responder(403, ['error' => 'Este servidor es privado: ese correo no está autorizado para crear una cuenta.']);
    }
    if (mb_strlen($contrasena) < 8 || mb_strlen($contrasena) > 200) {
        responder(400, ['error' => 'La contraseña debe tener al menos 8 caracteres.']);
    }

    try {
        db()->prepare('INSERT INTO usuarias (email, hash_contrasena, creada_en) VALUES (?, ?, ?)')
            ->execute([$email, password_hash($contrasena, PASSWORD_DEFAULT), time()]);
    } catch (PDOException $e) {
        if (!es_duplicado($e)) {
            throw $e;
        }
        responder(409, ['error' => 'Ya existe una cuenta con ese correo. Inicia sesión.']);
    }
    $id = (int) db()->lastInsertId();
    responder(201, ['token' => crear_sesion($id), 'email' => $email]);
}

function iniciar_sesion(): never
{
    $datos = leer_json();
    $email = normalizar_email($datos['email'] ?? '');
    $contrasena = (string) ($datos['contrasena'] ?? '');
    comprobar_limite_intentos($email);

    $st = db()->prepare('SELECT id, hash_contrasena FROM usuarias WHERE email = ?');
    $st->execute([$email]);
    $usuaria = $st->fetch();
    // Se verifica siempre una contraseña (aunque la cuenta no exista) para que el tiempo
    // de respuesta no revele qué correos tienen cuenta.
    $hash = $usuaria['hash_contrasena'] ?? '$2y$12$h8/pdfb1qISIsboa9cWq8uvpjpPTmM64L4ZkIK0wKc8LjVn4prcem';
    if (!password_verify($contrasena, $hash) || !$usuaria) {
        registrar_intento_fallido($email);
        responder(401, ['error' => 'Correo o contraseña incorrectos.']);
    }
    borrar_intentos($email);
    if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
        db()->prepare('UPDATE usuarias SET hash_contrasena = ? WHERE id = ?')
            ->execute([password_hash($contrasena, PASSWORD_DEFAULT), $usuaria['id']]);
    }
    responder(200, ['token' => crear_sesion((int) $usuaria['id']), 'email' => $email]);
}

function cerrar_sesion(): never
{
    $token = token_de_la_peticion();
    if ($token !== '') {
        db()->prepare('DELETE FROM sesiones WHERE hash_token = ?')->execute([hash('sha256', $token)]);
    }
    responder(200, ['ok' => true]);
}

function cuenta(): never
{
    $id = usuaria_autenticada();
    $st = db()->prepare('SELECT email FROM usuarias WHERE id = ?');
    $st->execute([$id]);
    responder(200, ['email' => $st->fetchColumn()]);
}

function borrar_cuenta(): never
{
    $id = usuaria_autenticada();
    $contrasena = (string) (leer_json()['contrasena'] ?? '');
    $st = db()->prepare('SELECT hash_contrasena FROM usuarias WHERE id = ?');
    $st->execute([$id]);
    if (!password_verify($contrasena, (string) $st->fetchColumn())) {
        responder(401, ['error' => 'La contraseña no es correcta.']);
    }
    $pdo = db();
    $pdo->beginTransaction();
    foreach (['DELETE FROM estados WHERE usuaria_id = ?', 'DELETE FROM sesiones WHERE usuaria_id = ?', 'DELETE FROM usuarias WHERE id = ?'] as $sql) {
        $pdo->prepare($sql)->execute([$id]);
    }
    $pdo->commit();
    responder(200, ['ok' => true]);
}

// ---------- Estado (progreso) ----------

function leer_estado(): never
{
    $id = usuaria_autenticada();
    $st = db()->prepare('SELECT revision, datos FROM estados WHERE usuaria_id = ?');
    $st->execute([$id]);
    $fila = $st->fetch();
    if (!$fila) {
        responder(200, ['revision' => 0, 'datos' => null]);
    }
    $revision = (int) $fila['revision'];
    // Si el dispositivo ya tiene esta revisión, no hace falta reenviar los datos.
    if (isset($_GET['desde']) && (int) $_GET['desde'] === $revision) {
        responder(200, ['revision' => $revision]);
    }
    responder(200, ['revision' => $revision, 'datos' => json_decode($fila['datos'], true)]);
}

/**
 * Guarda el estado solo si el dispositivo partía de la última revisión (control optimista).
 * Si otro dispositivo guardó antes, responde 409 con lo que hay en el servidor: la app
 * fusiona ambos estados y vuelve a intentarlo.
 */
function guardar_estado(): never
{
    $id = usuaria_autenticada();
    $cuerpo = leer_json();
    $base = $cuerpo['revision_base'] ?? null;
    $datos = $cuerpo['datos'] ?? null;
    if (!is_int($base) || $base < 0 || !is_array($datos) || ($datos['version'] ?? null) !== 1) {
        responder(400, ['error' => 'Datos de progreso no válidos.']);
    }
    $json = json_encode($datos, JSON_UNESCAPED_UNICODE);
    $ahora = time();
    $pdo = db();

    if ($base === 0) {
        try {
            $pdo->prepare('INSERT INTO estados (usuaria_id, revision, datos, actualizado_en) VALUES (?, 1, ?, ?)')
                ->execute([$id, $json, $ahora]);
            responder(200, ['revision' => 1]);
        } catch (PDOException $e) {
            if (!es_duplicado($e)) {
                throw $e;
            }
            conflicto($id); // ya había un estado guardado
        }
    }
    $st = $pdo->prepare('UPDATE estados SET revision = revision + 1, datos = ?, actualizado_en = ? WHERE usuaria_id = ? AND revision = ?');
    $st->execute([$json, $ahora, $id, $base]);
    if ($st->rowCount() === 1) {
        responder(200, ['revision' => $base + 1]);
    }
    conflicto($id);
}

function conflicto(int $id): never
{
    $st = db()->prepare('SELECT revision, datos FROM estados WHERE usuaria_id = ?');
    $st->execute([$id]);
    $fila = $st->fetch();
    responder(409, [
        'error' => 'Otro dispositivo ha guardado cambios.',
        'revision' => $fila ? (int) $fila['revision'] : 0,
        'datos' => $fila ? json_decode($fila['datos'], true) : null,
    ]);
}
