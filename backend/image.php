<?php

declare(strict_types=1);

$timeCode = $_GET['time'] ?? '';

if (!preg_match('/^(?:[01]\d|2[0-3])_[0-5]\d$/', $timeCode)) {
    http_response_code(400);
    exit;
}

$assetsDirectory = dirname(__DIR__) . '/assets';
$pattern = '/^' . preg_quote($timeCode, '/') . '(?:__.+)?\.jpe?g$/i';
$files = array_values(array_filter(
    scandir($assetsDirectory) ?: [],
    static fn(string $file): bool => preg_match($pattern, $file) === 1
));

if ($files === []) {
    http_response_code(404);
    exit;
}

$file = $files[random_int(0, count($files) - 1)];
$filePath = $assetsDirectory . '/' . $file;
$mimeType = mime_content_type($filePath) ?: 'image/jpeg';

header('Content-Type: ' . $mimeType);
header('Content-Length: ' . (string) filesize($filePath));
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');
readfile($filePath);