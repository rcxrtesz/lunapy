<?php
// Configuración de la API de LunaPy.
//
// 1. Copia este archivo como config.php (en la misma carpeta).
// 2. Rellena los datos de tu base de datos MySQL de Dinahosting.
// 3. config.php NO se sube a GitHub (está en .gitignore): contiene contraseñas.
return [
    // MySQL en Dinahosting (los datos están en el panel, apartado Bases de datos).
    'dsn' => 'mysql:host=localhost;dbname=NOMBRE_DE_LA_BASE;charset=utf8mb4',
    'usuario' => 'USUARIO_DE_LA_BASE',
    'contrasena' => 'CONTRASEÑA_DE_LA_BASE',

    // Pruebas en tu ordenador (sin MySQL): una base SQLite en la carpeta api/datos/.
    // 'dsn' => 'sqlite:' . __DIR__ . '/datos/lunapy.sqlite',

    // Solo estos correos pueden crear una cuenta. El servidor es privado.
    'emails_permitidos' => [
        'tu-correo@ejemplo.com',
    ],

    // Días que dura una sesión sin usarse antes de pedir de nuevo la contraseña.
    'dias_sesion' => 180,
];
