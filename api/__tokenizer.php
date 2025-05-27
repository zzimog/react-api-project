<?php

declare(strict_types=1);

function print_p($data) {
  echo "<pre>";
  print_r($data);
  echo "</pre>";
}

function get_uri_tokens(?string $uri = null) {
  if (empty($uri)) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
  }

  $uri = strtok($uri, '/');
  $tokens = [];

  while ($uri !== false) {
    $tokens[] = $uri;
    $uri = strtok('/');
  }

  return $tokens;
}

function get(string $target, callable $callback) {
  $uri_t = get_uri_tokens();
  $target_t = get_uri_tokens($target);

  if (count($uri_t) !== count($target_t)) {
    return;
  }

  $args = [];

  for ($__i__ = 0; $__i__ < count($uri_t); $__i__++) {
    $uri = $uri_t[$__i__];
    $path = $target_t[$__i__];

    if ($path[0] === '{') {
      //sscanf($target, "{%[^:]:%[^}]}", $type, $name);
      $path = trim($path, "{}");
      [$type, $name] = explode(":", $path, 2);

      switch (strtolower($type)) {
        case 'int':
          $uri = intval($uri);
          break;
        case 'float':
          $uri = floatval($uri);
          break;
        case 'bool':
          $uri = boolval($uri);
          break;
      }

      $args[$name] = $uri;
      continue;
    }

    if ($uri !== $path) {
      return;
    }
  }

  return $callback($args);
}

$json_response = function ($data) {
  header("Content-type: application/json");
  echo json_encode($data);
  die();
};

get("api/users/{int:id}", $json_response);

get("api/users/{int:id}/orders/{int:order_id}", $json_response);
