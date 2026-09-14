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
sort($files);

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$title = htmlspecialchars($timeCode, ENT_QUOTES, 'UTF-8');
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Stock o' Clock – <?= $title ?></title>
    <style>
      .image-box {
        border: 1px solid silver;
        padding: 1rem;
        margin-bottom: 1rem;
        box-sizing: border-box;
      }

      .image-box h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        overflow-wrap: anywhere;
      }

      img {
        display: block;
        width: 400px;
        max-width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <a
      href="#"
      onclick="
        window.close();
        return false;
      "
      >Back</a
    ><br /><br />
    <h1 style="margin-top: 0"><?= $title ?> (<?= count($files) ?>)</h1><br /><br />
    <?php foreach ($files as $file): ?>
      <?php $src = '../assets/' . rawurlencode($file); ?>
      <div class="image-box">
        <h3><?= htmlspecialchars($file, ENT_QUOTES, 'UTF-8') ?></h3>
        <img src="<?= htmlspecialchars($src, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($file, ENT_QUOTES, 'UTF-8') ?>" />
      </div>
    <?php endforeach; ?>
  </body>
</html>
