<?php
// Correos de LunaPy: verificación del registro, bienvenida y recuperación de contraseña.
//
// Se envían con PHPMailer (api/vendor, Composer). Configuración en config.php → 'correo':
//   'modo' => 'smtp'     (recomendado: buzón de Dinahosting con usuario y contraseña)
//           | 'mail'     (función mail() de PHP del propio servidor)
//           | 'archivo'  (pruebas: no envía nada, guarda cada correo en api/datos/correos/)
declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

const VALIDEZ_VERIFICACION = 48 * 3600; // el enlace para activar la cuenta dura 48 h
const VALIDEZ_RESTABLECER = 3600;       // el de cambiar la contraseña, 1 h
const PAUSA_ENTRE_CORREOS = 60;         // segundos mínimos entre dos correos del mismo tipo a la misma cuenta

function config_correo(): array
{
    return (config()['correo'] ?? []) + [
        'modo' => 'mail',
        'remitente' => 'no-reply@lunadev.es',
        'nombre' => 'LunaPy',
        'smtp_host' => '',
        'smtp_puerto' => 465,
        'smtp_usuario' => '',
        'smtp_contrasena' => '',
        'carpeta' => __DIR__ . '/datos/correos', // solo para el modo 'archivo'
    ];
}

/** Dirección pública de la app (para los enlaces de los correos), acabada en «/». */
function url_app(): string
{
    $url = (string) (config()['url_app'] ?? '');
    if ($url === '') {
        // Sin configurar: se deduce de la propia petición (…/api/index.php → …/).
        $https = ($_SERVER['HTTPS'] ?? '') === 'on' || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
        $dir = dirname(dirname((string) ($_SERVER['SCRIPT_NAME'] ?? '/api/index.php')));
        $url = ($https ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . ($dir === '/' || $dir === '\\' ? '' : $dir);
    }
    return rtrim($url, '/') . '/';
}

/** Envía un correo. Devuelve true si se ha entregado al servidor de correo. */
function enviar_correo(string $para, string $asunto, string $html, string $texto): bool
{
    $c = config_correo();
    if ($c['modo'] === 'archivo') {
        $dir = $c['carpeta'];
        if (!is_dir($dir)) {
            mkdir($dir, 0700, true);
        }
        $nombre = sprintf('%s/%s-%s.json', $dir, date('Ymd-His'), bin2hex(random_bytes(3)));
        file_put_contents($nombre, json_encode(compact('para', 'asunto', 'html', 'texto'), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        return true;
    }
    require_once __DIR__ . '/vendor/autoload.php';
    $m = new PHPMailer(true);
    try {
        $m->CharSet = PHPMailer::CHARSET_UTF8;
        if ($c['modo'] === 'smtp') {
            $m->isSMTP();
            $m->Host = $c['smtp_host'];
            $m->Port = (int) $c['smtp_puerto'];
            $m->SMTPAuth = true;
            $m->Username = $c['smtp_usuario'] ?: $c['remitente'];
            $m->Password = $c['smtp_contrasena'];
            $m->SMTPSecure = (int) $c['smtp_puerto'] === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $m->Timeout = 15;
        } else {
            $m->isMail();
        }
        $m->setFrom($c['remitente'], $c['nombre']);
        $m->addAddress($para);
        $m->Subject = $asunto;
        $m->isHTML(true);
        $m->Body = $html;
        $m->AltBody = $texto;
        $m->send();
        return true;
    } catch (Throwable $e) {
        error_log('[LunaPy] No se pudo enviar el correo a ' . $para . ': ' . $m->ErrorInfo . ' ' . $e->getMessage());
        return false;
    }
}

// ---------- Enlaces de un solo uso (verificar la cuenta, restablecer la contraseña) ----------

/** Crea un enlace de un solo uso y devuelve el token (solo se guarda su hash). null si se pidió otro hace muy poco. */
function crear_token_correo(int $usuariaId, string $tipo, int $validez): ?string
{
    $pdo = db();
    $st = $pdo->prepare('SELECT MAX(creado_en) FROM tokens_correo WHERE usuaria_id = ? AND tipo = ?');
    $st->execute([$usuariaId, $tipo]);
    if ((int) $st->fetchColumn() > time() - PAUSA_ENTRE_CORREOS) {
        return null;
    }
    $pdo->prepare('DELETE FROM tokens_correo WHERE caduca_en < ?')->execute([time()]);
    $token = bin2hex(random_bytes(32));
    $pdo->prepare('INSERT INTO tokens_correo (hash_token, usuaria_id, tipo, creado_en, caduca_en) VALUES (?, ?, ?, ?, ?)')
        ->execute([hash('sha256', $token), $usuariaId, $tipo, time(), time() + $validez]);
    return $token;
}

/** Comprueba un enlace y lo gasta (borra todos los de ese tipo de la cuenta). Devuelve el id de la usuaria o null. */
function usar_token_correo(mixed $token, string $tipo): ?int
{
    if (!is_string($token) || !preg_match('/^[0-9a-f]{64}$/', $token)) {
        return null;
    }
    $st = db()->prepare('SELECT usuaria_id, caduca_en FROM tokens_correo WHERE hash_token = ? AND tipo = ?');
    $st->execute([hash('sha256', $token), $tipo]);
    $fila = $st->fetch();
    if (!$fila || (int) $fila['caduca_en'] < time()) {
        return null;
    }
    $id = (int) $fila['usuaria_id'];
    db()->prepare('DELETE FROM tokens_correo WHERE usuaria_id = ? AND tipo = ?')->execute([$id, $tipo]);
    return $id;
}

// ---------- Plantillas ----------

function plantilla_correo(string $titulo, string $parrafosHtml, ?string $boton = null, ?string $url = null): string
{
    $app = htmlspecialchars(url_app(), ENT_QUOTES);
    $botonHtml = $boton && $url
        ? '<p style="text-align:center;margin:28px 0"><a href="' . htmlspecialchars($url, ENT_QUOTES) . '" style="background:#7a4cc2;color:#ffffff;text-decoration:none;font-weight:bold;padding:13px 26px;border-radius:12px;display:inline-block">' . htmlspecialchars($boton) . '</a></p>'
          . '<p style="font-size:13px;color:#605870">Si el botón no funciona, copia este enlace en el navegador:<br><a href="' . htmlspecialchars($url, ENT_QUOTES) . '" style="color:#7a4cc2;word-break:break-all">' . htmlspecialchars($url) . '</a></p>'
        : '';
    return '<!doctype html><html lang="es"><body style="margin:0;background:#f7f3fc;font-family:Segoe UI,Arial,sans-serif;color:#1d1824">'
        . '<div style="max-width:520px;margin:0 auto;padding:28px 16px">'
        . '<div style="text-align:center;margin-bottom:14px"><img src="' . $app . 'icons/icon-192.png" width="72" height="72" alt="LunaPy"></div>'
        . '<div style="background:#ffffff;border:1px solid #e6dff0;border-radius:18px;padding:28px 26px">'
        . '<h1 style="font-size:22px;margin:0 0 14px;color:#2b2433">' . htmlspecialchars($titulo) . '</h1>'
        . '<div style="font-size:15px;line-height:1.6">' . $parrafosHtml . '</div>' . $botonHtml
        . '</div><p style="text-align:center;font-size:12px;color:#8a8197;margin-top:16px">LunaPy · Aprende Python pensando</p>'
        . '</div></body></html>';
}

function correo_verificacion(string $email, string $token): bool
{
    $url = url_app() . '#/verificar?t=' . $token;
    $html = plantilla_correo('Activa tu cuenta de LunaPy',
        '<p>¡Hola! Para terminar de crear tu cuenta en LunaPy, confirma que este correo es tuyo.</p>'
        . '<p>El enlace caduca en 48 horas. Si no has sido tú, ignora este mensaje: no se creará ninguna cuenta.</p>',
        'Activar mi cuenta', $url);
    $texto = "Para terminar de crear tu cuenta en LunaPy, abre este enlace (caduca en 48 horas):\n$url\n\nSi no has sido tú, ignora este mensaje.";
    return enviar_correo($email, 'Activa tu cuenta de LunaPy', $html, $texto);
}

function correo_bienvenida(string $email): bool
{
    $url = url_app();
    $html = plantilla_correo('¡Te damos la bienvenida a LunaPy!',
        '<p>Tu cuenta ya está activa. 🌙</p>'
        . '<p>Tu progreso se guardará en tu cuenta y lo tendrás igual en el ordenador y en el móvil. '
        . 'Si te atascas, pregúntale a <b>Lunakiri</b>, tu asistente: te explica el porqué y te guía con pistas.</p>'
        . '<p>Recuerda el método: <b>Comprender → Razonar → Planificar → Programar → Ejecutar → Analizar → Mejorar</b>.</p>',
        'Empezar a aprender', $url);
    $texto = "Tu cuenta de LunaPy ya está activa.\nTu progreso se guardará en tu cuenta y lo tendrás en todos tus dispositivos.\nEmpieza aquí: $url";
    return enviar_correo($email, '¡Te damos la bienvenida a LunaPy!', $html, $texto);
}

function correo_restablecer(string $email, string $token): bool
{
    $url = url_app() . '#/restablecer?t=' . $token;
    $html = plantilla_correo('Cambia tu contraseña',
        '<p>Hemos recibido una petición para cambiar la contraseña de tu cuenta de LunaPy.</p>'
        . '<p>El enlace caduca en 1 hora. Si no lo has pedido tú, ignora este mensaje: tu contraseña no cambiará.</p>',
        'Elegir una contraseña nueva', $url);
    $texto = "Para elegir una contraseña nueva en LunaPy, abre este enlace (caduca en 1 hora):\n$url\n\nSi no lo has pedido tú, ignora este mensaje.";
    return enviar_correo($email, 'Cambia tu contraseña de LunaPy', $html, $texto);
}
