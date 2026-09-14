<?php

declare(strict_types=1);

$assetsDirectory = dirname(__DIR__) . '/assets';

$counts = [];
foreach (scandir($assetsDirectory) ?: [] as $file) {
    if (preg_match('/^((?:[01]\d|2[0-3])_[0-5]\d)(?:__.+)?\.jpe?g$/i', $file, $matches) === 1) {
        $counts[$matches[1]] = ($counts[$matches[1]] ?? 0) + 1;
    }
}

ksort($counts);

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');

echo json_encode($counts, JSON_FORCE_OBJECT);
