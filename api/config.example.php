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
    // true: cualquiera puede registrarse (con el correo de verificación), pero solo con correos de
    // proveedores fiables (Gmail, Outlook, Hotmail, Yahoo, iCloud, Proton…: lista en lib.php,
    // DOMINIOS_FIABLES) cuyo dominio tenga servidor de correo. Los de emails_permitidos entran siempre.
    'registro_abierto' => false,
    // Para cambiar la lista de proveedores admitidos:
    // 'dominios_fiables' => ['gmail.com', 'outlook.com', 'hotmail.com', 'tu-universidad.es'],

    // Dirección pública de la app, para los enlaces de los correos.
    'url_app' => 'https://lunadev.es/lunapy/',

    // Correos (verificación, bienvenida y recuperación de contraseña).
    // Crea el buzón en el panel de Dinahosting (Correo → Buzones) y pon aquí sus datos.
    'correo' => [
        'modo' => 'smtp',                    // 'smtp' | 'mail' | 'archivo' (pruebas: se guardan en api/datos/correos/)
        'remitente' => 'no-reply@lunadev.es',
        'nombre' => 'LunaPy',
        'smtp_host' => 'smtp.lunadev.es',    // el servidor de salida que indica el panel para ese buzón
        'smtp_puerto' => 465,                // 465 (SSL) o 587 (STARTTLS)
        'smtp_usuario' => 'no-reply@lunadev.es',
        'smtp_contrasena' => 'CONTRASEÑA_DEL_BUZÓN',
    ],

    // Asistente (Claude): clave de la API de Anthropic. Se crea en console.anthropic.com →
    // API Keys. Déjala vacía para desactivar el asistente.
    'anthropic_api_key' => '',
    // Preguntas al asistente permitidas por persona y día (protege de gastos inesperados).
    'asistente_max_diario' => 60,

    // Días que dura una sesión sin usarse antes de pedir de nuevo la contraseña.
    'dias_sesion' => 180,
];
