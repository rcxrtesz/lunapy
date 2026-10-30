<?php
// Genera el hash de una contraseña nueva, por si olvidas la tuya.
//
//   php hash_contrasena.php "mi nueva contraseña"
//
// Copia el resultado y, en phpMyAdmin de Dinahosting, pégalo en la columna
// hash_contrasena de tu fila de la tabla usuarias. Solo se ejecuta desde la consola.
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
if ($argc !== 2 || mb_strlen($argv[1]) < 8) {
    fwrite(STDERR, "Uso: php hash_contrasena.php \"nueva contraseña (mínimo 8 caracteres)\"\n");
    exit(1);
}
echo password_hash($argv[1], PASSWORD_DEFAULT), PHP_EOL;
