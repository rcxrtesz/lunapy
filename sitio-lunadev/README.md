# Página «en construcción» de lunadev.es

Portada temporal de lunadev.es con el estilo de LunaPy (cielo lila con estrellas, Kuromi motera, carretera animada) y un botón a LunaPy.

**No toca WordPress.** En el servidor, `index.html` tiene prioridad sobre el `index.php` de WordPress, así que solo cambia la portada; el resto de WordPress (`/wp-admin`, `/wp-login.php`…) sigue igual.

- Publicada en `~/www/index.html` y `~/www/en-construccion/`.
- **Para volver a mostrar WordPress:** borrar `~/www/index.html` (y, si se quiere, `~/www/en-construccion/`).
- Probar en local: `python -m http.server 5190 --directory sitio-lunadev` y abrir http://localhost:5190/.
- El hosting tiene Varnish: tras cambiar la página puede tardar unos minutos en verse (o vaciar la caché en el panel → Servidor → Varnish Caché).
