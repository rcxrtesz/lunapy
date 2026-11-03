<?php
// Asistente de LunaPy: responde dudas de Python con Claude (API de Anthropic).
//
//   GET  index.php/asistente                              → { disponible, restantes, maximo }
//   POST index.php/asistente  { mensajes, contexto? }     → text/event-stream
//
// La respuesta llega por partes (Server-Sent Events) para que el texto aparezca poco a poco:
//   data: {"texto":"…"}                       un trozo de la respuesta
//   data: {"fin":true,"motivo":"…","restantes":N}  terminado
//   data: {"error":"…"}                       algo falló a mitad de la respuesta
// Los errores antes de empezar (sesión, límite, datos no válidos) son respuestas JSON normales.
//
// La clave de la API de Anthropic vive solo en config.php (nunca en la app).
declare(strict_types=1);

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\AuthenticationException;
use Anthropic\Core\Exceptions\RateLimitException;
use Anthropic\Messages\RawContentBlockDeltaEvent;
use Anthropic\Messages\RawMessageDeltaEvent;
use Anthropic\Messages\RawMessageStartEvent;
use Anthropic\Messages\TextDelta;

const MODELO_ASISTENTE = 'claude-haiku-5-5';
const MAX_TOKENS_RESPUESTA = 4096;  // tope de cada respuesta (controla el coste)
const MAX_MENSAJES = 40;            // historial que se envía: los últimos N mensajes
const MAX_CARACTERES_MENSAJE = 8000;
const MAX_CARACTERES_CODIGO = 12000;
const MAX_CARACTERES_ERROR = 3000;

const INSTRUCCIONES_ASISTENTE = <<<'TXT'
Eres Lunakiri, la asistente de LunaPy (una Kuromi motera con su luna), una app en español para aprender Python desde cero «aprendiendo a pensar»: cada problema se trabaja con el ciclo Comprender → Razonar → Planificar → Programar → Ejecutar → Analizar → Mejorar.

El temario va desde lo más básico (variables, expresiones, input, funciones) hasta condicionales, bucles, cadenas, listas, diccionarios, tuplas, archivos, excepciones, clases, herencia, recursión, expresiones regulares, depuración y estilo. En la app el código se ejecuta en el navegador con Pyodide (Python 3): input() funciona, pero no se pueden instalar paquetes externos ni acceder a internet.

Cómo responder:
- Escribe en español de España, con un tono cercano y paciente. Tutea. Evita marcar el género de quien aprende cuando puedas.
- Explica para una persona que está empezando: frases claras, sin jerga innecesaria, y define los términos técnicos la primera vez que los uses.
- Sé breve por defecto: ve al grano y ofrece ampliar si hace falta. Usa ejemplos pequeños.
- Cuando expliques un error: di qué significa, en qué línea está y por qué ocurre, y cómo arreglarlo. Si el error real es otro distinto del que aparece, explícalo.
- Explica también el porqué, no solo el cómo.
- Si la pregunta es sobre un ejercicio o desafío, guía con pistas y preguntas que ayuden a razonar, sin dar la solución completa. Da la solución solo si te la piden expresamente, y entonces explícala paso a paso.
- Si no estás seguro de algo, dilo.
- Si te preguntan algo que no tiene que ver con programar o aprender, responde con amabilidad en una frase y vuelve a Python.

Formato: párrafos cortos, listas con guiones, **negrita** para lo importante, `código` en línea y bloques ```python para el código. No uses tablas, títulos ni HTML.

Los mensajes pueden empezar con un bloque <contexto> con la lección en la que está la persona, su código y el último error. Úsalo si sirve para la pregunta, pero no lo repitas entero ni lo menciones si no viene al caso.
TXT;

// ---------- Rutas ----------

function estado_asistente(): never
{
    $id = usuaria_autenticada();
    $maximo = maximo_diario();
    responder(200, [
        'disponible' => clave_anthropic() !== '',
        'restantes' => max(0, $maximo - preguntas_de_hoy($id)),
        'maximo' => $maximo,
    ]);
}

function preguntar_asistente(): never
{
    $id = usuaria_autenticada();
    if (clave_anthropic() === '') {
        responder(503, ['error' => 'El asistente no está configurado en el servidor (falta la clave de Anthropic en config.php).']);
    }
    $cuerpo = leer_json();
    $mensajes = validar_mensajes($cuerpo['mensajes'] ?? null);
    $contexto = texto_contexto(is_array($cuerpo['contexto'] ?? null) ? $cuerpo['contexto'] : []);
    if ($contexto !== '') {
        $ultimo = array_key_last($mensajes);
        $mensajes[$ultimo]['content'] = $contexto . "\n\n" . $mensajes[$ultimo]['content'];
    }

    if (preguntas_de_hoy($id) >= maximo_diario()) {
        responder(429, ['error' => 'Has llegado al límite de preguntas de hoy. Mañana podrás seguir preguntando.']);
    }
    contar_pregunta($id);

    abrir_eventos();
    $entrada = 0;
    $salida = 0;
    $motivo = null;
    try {
        $stream = cliente_anthropic()->messages->createStream(
            model: MODELO_ASISTENTE,
            maxTokens: MAX_TOKENS_RESPUESTA,
            system: [['type' => 'text', 'text' => INSTRUCCIONES_ASISTENTE, 'cacheControl' => ['type' => 'ephemeral']]],
            outputConfig: ['effort' => 'low'],
            messages: $mensajes,
        );
        foreach ($stream as $evento) {
            if ($evento instanceof RawContentBlockDeltaEvent && $evento->delta instanceof TextDelta) {
                enviar_evento(['texto' => $evento->delta->text]);
            } elseif ($evento instanceof RawMessageStartEvent) {
                $u = $evento->message->usage;
                $entrada = $u->inputTokens + ($u->cacheCreationInputTokens ?? 0) + ($u->cacheReadInputTokens ?? 0);
            } elseif ($evento instanceof RawMessageDeltaEvent) {
                $motivo = $evento->delta->stopReason;
                $salida = $evento->usage->outputTokens;
            }
            if (connection_aborted()) {
                break; // la persona cerró el chat: no seguimos gastando
            }
        }
    } catch (Throwable $e) {
        error_log('[LunaPy] Asistente: ' . $e);
        enviar_evento(['error' => mensaje_de_error($e)]);
        exit;
    } finally {
        sumar_tokens($id, $entrada, $salida);
    }

    if ($motivo === 'refusal') {
        enviar_evento(['error' => 'El asistente no puede responder a esa pregunta. Prueba a formularla de otra manera.']);
        exit;
    }
    enviar_evento(['fin' => true, 'motivo' => $motivo, 'restantes' => max(0, maximo_diario() - preguntas_de_hoy($id))]);
    exit;
}

// ---------- Petición ----------

/** Comprueba el historial: alterna persona/asistente, empieza y acaba con la persona. */
function validar_mensajes(mixed $mensajes): array
{
    if (!is_array($mensajes) || !array_is_list($mensajes) || $mensajes === []) {
        responder(400, ['error' => 'Falta la pregunta.']);
    }
    $mensajes = array_slice($mensajes, -MAX_MENSAJES);
    if (($mensajes[0]['role'] ?? null) !== 'user') {
        array_shift($mensajes); // al recortar, el historial debe seguir empezando por la persona
    }
    if ($mensajes === []) {
        responder(400, ['error' => 'Falta la pregunta.']);
    }
    $limpios = [];
    foreach ($mensajes as $i => $m) {
        $rol = is_array($m) ? ($m['role'] ?? null) : null;
        $texto = is_array($m) && is_string($m['content'] ?? null) ? trim($m['content']) : '';
        if ($rol !== ($i % 2 === 0 ? 'user' : 'assistant') || $texto === '' || mb_strlen($texto) > MAX_CARACTERES_MENSAJE) {
            responder(400, ['error' => 'La conversación no es válida o algún mensaje es demasiado largo.']);
        }
        $limpios[] = ['role' => $rol, 'content' => $texto];
    }
    if (end($limpios)['role'] !== 'user') {
        responder(400, ['error' => 'Falta la pregunta.']);
    }
    return $limpios;
}

/** Contexto de la app (lección, código, error) como bloque de texto para Claude. */
function texto_contexto(array $c): string
{
    $partes = [];
    $leccion = is_string($c['leccion'] ?? null) ? trim(mb_substr($c['leccion'], 0, 300)) : '';
    $codigo = is_string($c['codigo'] ?? null) ? rtrim(mb_substr($c['codigo'], 0, MAX_CARACTERES_CODIGO)) : '';
    $error = is_string($c['error'] ?? null) ? trim(mb_substr($c['error'], 0, MAX_CARACTERES_ERROR)) : '';
    if ($leccion !== '') {
        $partes[] = "Lección actual: $leccion";
    }
    if (trim($codigo) !== '') {
        $partes[] = "Código de la persona:\n```python\n$codigo\n```";
    }
    if ($error !== '') {
        $partes[] = "Último error al ejecutarlo:\n$error";
    }
    return $partes ? "<contexto>\n" . implode("\n\n", $partes) . "\n</contexto>" : '';
}

// ---------- Claude ----------

function clave_anthropic(): string
{
    return trim((string) (config()['anthropic_api_key'] ?? ''));
}

function cliente_anthropic(): Client
{
    require_once __DIR__ . '/vendor/autoload.php';
    return new Client(
        apiKey: clave_anthropic(),
        baseUrl: config()['anthropic_base_url'] ?? null, // solo para pruebas automáticas
        requestOptions: ['timeout' => 90.0, 'maxRetries' => 2],
    );
}

function mensaje_de_error(Throwable $e): string
{
    return match (true) {
        $e instanceof AuthenticationException => 'La clave de Anthropic del servidor no es válida. Revisa config.php.',
        $e instanceof RateLimitException => 'El asistente está recibiendo demasiadas preguntas. Espera un momento y vuelve a probar.',
        $e instanceof APIStatusException && str_contains(strtolower($e->getMessage()), 'credit') => 'La cuenta de Anthropic se ha quedado sin saldo. Recárgala en console.anthropic.com.',
        $e instanceof APIConnectionException => 'No se ha podido contactar con el asistente. Inténtalo de nuevo en un momento.',
        default => 'El asistente ha tenido un problema. Inténtalo de nuevo en un momento.',
    };
}

// ---------- Respuesta por partes (Server-Sent Events) ----------

function abrir_eventos(): void
{
    @set_time_limit(180);
    while (ob_get_level() > 0) {
        ob_end_clean();
    }
    http_response_code(200);
    header('Content-Type: text/event-stream; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('X-Accel-Buffering: no'); // que el proxy del hosting no acumule la respuesta
    echo ':' . str_repeat(' ', 2048) . "\n\n"; // algunos proxies esperan a tener unos KB antes de enviar
    flush();
}

function enviar_evento(array $datos): void
{
    echo 'data: ' . json_encode($datos, JSON_UNESCAPED_UNICODE) . "\n\n";
    flush();
}

// ---------- Límite diario ----------

function maximo_diario(): int
{
    return (int) (config()['asistente_max_diario'] ?? 60);
}

function hoy(): string
{
    return (new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid')))->format('Y-m-d');
}

function preguntas_de_hoy(int $id): int
{
    $st = db()->prepare('SELECT preguntas FROM uso_asistente WHERE usuaria_id = ? AND dia = ?');
    $st->execute([$id, hoy()]);
    return (int) $st->fetchColumn();
}

function contar_pregunta(int $id): void
{
    $pdo = db();
    $st = $pdo->prepare('UPDATE uso_asistente SET preguntas = preguntas + 1 WHERE usuaria_id = ? AND dia = ?');
    $st->execute([$id, hoy()]);
    if ($st->rowCount() === 1) {
        return;
    }
    try {
        $pdo->prepare('INSERT INTO uso_asistente (usuaria_id, dia, preguntas, tokens_entrada, tokens_salida) VALUES (?, ?, 1, 0, 0)')
            ->execute([$id, hoy()]);
    } catch (PDOException $e) {
        if (!es_duplicado($e)) {
            throw $e;
        }
        $st->execute([$id, hoy()]); // otra petición creó la fila a la vez
    }
}

/** Guarda los tokens gastados (para poder consultar el consumo en la base de datos). */
function sumar_tokens(int $id, int $entrada, int $salida): void
{
    db()->prepare('UPDATE uso_asistente SET tokens_entrada = tokens_entrada + ?, tokens_salida = tokens_salida + ? WHERE usuaria_id = ? AND dia = ?')
        ->execute([$entrada, $salida, $id, hoy()]);
}
