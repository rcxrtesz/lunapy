# Publicar LunaPy en Dinahosting (con cuenta y sincronización)

Guía para cuando decidas publicar. Nada de esto se hace automáticamente.

**Publicación real (nov. 2026):** `https://lunapy.lunadev.es`, «Hosting Profesional Linux» de
`lunadev.es` (servidor `hl1707.dinaserver.com`), archivos en `~/www/lunapy`, PHP 8.4,
MariaDB 11.8 (base y usuario `lunad_lunapy`, acceso solo desde `localhost`).

## Qué se publica

LunaPy son archivos estáticos (la app) más una pequeña API en PHP (`api/`) que guarda tu
progreso en MySQL/MariaDB. Todo va en la misma carpeta del hosting. Lo más cómodo es un
**subdominio** (`https://lunapy.tu-dominio.es`) apuntando a una carpeta propia
(`www/lunapy`): Panel → Dominios → DNS / subdominios.

Requisitos: **PHP 8.4** con `pdo_mysql` y `mbstring` (vienen de serie) y una base de datos
MySQL o MariaDB. Si el hosting está en una versión antigua de PHP (estaba en 7.4), se cambia
en el panel (versión de PHP) y tarda unos minutos en aplicarse.

## 1. Crear la base de datos

1. Panel de Dinahosting → **Bases de datos** → crear una base (MySQL/MariaDB).
2. Apunta el **nombre de la base**, el **usuario**, la **contraseña** y el **servidor**
   (normalmente `localhost`). Basta con permitir el acceso solo desde `localhost`.

No hace falta crear tablas: la API las crea sola la primera vez.

## 2. Subir los archivos

Lo más rápido: hacer un ZIP con los archivos de la tabla (≈ 6,5 MB), subirlo con el gestor de
archivos del panel a la carpeta elegida y descomprimirlo desde el **SSH web del panel**
(`cd ~/www/lunapy && unzip lunapy.zip && rm lunapy.zip`). También vale FTP/SFTP.
El `.htaccess` (empieza por punto) debe llegar: compruébalo con `ls -a`.

Archivos:

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

Panel → **SSL** → certificado gratuito (Let's Encrypt) para el dominio, **marcando también el
subdominio** (`lunapy`). Es obligatorio: sin HTTPS no se puede instalar la app ni enviar la
contraseña de forma segura. El `.htaccess` redirige automáticamente de `http` a `https`.

Avisos aprendidos en Dinahosting:
- El HTTPS termina en un proxy delante de Apache, así que `%{HTTPS}` nunca vale `on`. El
  `.htaccess` mira también `X-Forwarded-Proto` y `ENV:HTTPS`; sin eso, la redirección a
  https entra en bucle.
- Let's Encrypt valida por `http://…/.well-known/acme-challenge/`. Esa ruta **no** debe
  redirigirse a https (el `.htaccess` ya la excluye); si se redirige antes de tener
  certificado, la validación falla y el certificado sale sin el subdominio.
- Dinahosting deja sus archivos de validación en `~/www/.well-known` (del usuario root) y el
  hosting no permite enlaces simbólicos: no intentes copiarlos ni enlazarlos.
- Comprueba qué nombres cubre el certificado:
  `echo | openssl s_client -connect lunapy.lunadev.es:443 -servername lunapy.lunadev.es 2>/dev/null | openssl x509 -noout -ext subjectAltName`
  (debe aparecer `DNS:lunapy.lunadev.es`). Si tras reinstalarlo sigue sin aparecer, escribe
  al chat de soporte de Dinahosting.

Comprobaciones tras publicar: la app, el `.wasm` y el manifiesto cargan; `api/config.php`,
`tests.html` y los `.md` dan **403**; la API responde **401** sin sesión y **403** a un correo
no autorizado.

## 5. Crear tu cuenta y conectar los dispositivos

1. Abre `https://lunapy.tu-dominio.es` → **Perfil** → escribe tu correo y una contraseña
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
