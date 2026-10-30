# Publicar LunaPy en Dinahosting (con cuenta y sincronización)

Guía para cuando decidas publicar. Nada de esto se hace automáticamente.

## Qué se publica

LunaPy son archivos estáticos (la app) más una pequeña API en PHP (`api/`) que guarda tu
progreso en MySQL. Todo va en la misma carpeta del hosting, por ejemplo
`https://tu-dominio.es/lunapy/`.

Requisitos del Hosting Avanzado: **PHP 8.4** con `pdo_mysql` y `mbstring` (vienen de serie)
y una base de datos **MySQL 8.4**.

## 1. Crear la base de datos

1. Panel de Dinahosting → **Bases de datos** → crear una base MySQL.
2. Apunta el **nombre de la base**, el **usuario**, la **contraseña** y el **servidor**
   (normalmente `localhost`).

No hace falta crear tablas: la API las crea sola la primera vez.

## 2. Subir los archivos

Por FTP/SFTP (o el gestor de archivos del panel), sube a la carpeta elegida:

| Subir | No subir |
|---|---|
| `index.html`, `manifest.webmanifest`, `sw.js`, `sw-assets.js`, `.htaccess` | `tests/`, `tests.html`, `tools/`, `serve.py` |
| `src/`, `vendor/`, `icons/` | `.git/`, `.claude/`, los `.md` |
| `api/index.php`, `api/lib.php`, `api/.htaccess`, `api/config.example.php`, `api/herramientas/` | `api/config.php` de tu ordenador y `api/datos/` (son de pruebas) |

## 3. Configurar la API en el servidor

1. En el hosting, dentro de `api/`, copia `config.example.php` como **`config.php`**.
2. Edítalo con los datos del paso 1:
   ```php
   'dsn' => 'mysql:host=localhost;dbname=NOMBRE_DE_LA_BASE;charset=utf8mb4',
   'usuario' => 'USUARIO_DE_LA_BASE',
   'contrasena' => 'CONTRASEÑA_DE_LA_BASE',
   'emails_permitidos' => ['tu-correo@ejemplo.com'],
   ```
3. En `emails_permitidos` pon **solo** los correos que pueden crear cuenta (el tuyo).

`config.php` contiene contraseñas: nunca lo subas a GitHub (ya está en `.gitignore`).
El `api/.htaccess` impide que se pueda descargar desde el navegador.

## 4. Activar HTTPS

Panel → **SSL** → certificado gratuito (Let's Encrypt) para el dominio. Es obligatorio:
sin HTTPS no se puede instalar la app ni enviar la contraseña de forma segura.
El `.htaccess` redirige automáticamente de `http` a `https`.

## 5. Crear tu cuenta y conectar los dispositivos

1. Abre `https://tu-dominio.es/lunapy/` → **Perfil** → escribe tu correo y una contraseña
   (8 caracteres o más) → **Crear cuenta**. Tu progreso actual se sube.
2. En el móvil u otro ordenador: abre la misma dirección, instala la app (Perfil →
   «Instalar la app») e **inicia sesión**. El progreso se descarga y, a partir de ahí,
   se mantiene igual en todos.

## Cómo funciona la sincronización

- El progreso siempre se guarda primero en el dispositivo: la app funciona sin conexión.
- Con la sesión iniciada, los cambios se suben unos segundos después de hacerlos, al
  cerrar u ocultar la app y cada 5 minutos; al abrirla, se traen los de otros dispositivos.
- Si practicas sin conexión en dos dispositivos, al volver la red **se fusionan**: la XP,
  los intentos y las lecciones de los dos se suman; los ajustes (nombre, colores) quedan
  como en el dispositivo que los cambió más recientemente.
- «Reiniciar todo el progreso» o «Importar copia» con la sesión iniciada sustituyen
  también la copia del servidor.

## Si olvidas la contraseña

1. En tu ordenador: `php api/herramientas/hash_contrasena.php "nueva contraseña"`.
2. Copia el resultado.
3. Panel → phpMyAdmin → tabla `usuarias` → tu fila → pega el valor en `hash_contrasena`.

## Seguridad (resumen)

- Contraseñas guardadas con `password_hash` (bcrypt); nunca en claro.
- Sesiones con un token aleatorio; en la base solo se guarda su hash (SHA-256).
- Registro limitado a los correos autorizados; 5 intentos fallidos de inicio de sesión
  cada 15 minutos por correo y dirección IP.
- Consultas preparadas (sin inyección SQL) y peticiones de 2 MB como máximo.
