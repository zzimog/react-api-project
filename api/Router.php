<?php

class Router {
  const METHODS = [
    'ANY',
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ];

  protected array $routes;

  public static function uri_tokenize(string $uri) {
    $parsed = parse_url($uri, PHP_URL_PATH);

    return preg_split('/\//', $parsed, -1, PREG_SPLIT_NO_EMPTY);
  }

  public function __construct() {
    $this->routes = [];
  }

  public function getRoutes() {
    return $this->routes;
  }

  public function onError() {
    http_response_code(404);
    header('Content-type: text/html');
    die();
  }

  public function route(
    string $route,
    array | string $methods,
    callable $callback
  ): Router {

    if (!is_array($methods)) {
      $methods = [$methods];
    }

    array_map('strtoupper', $methods);

    $this->routes[] = [
      "route" => $route,
      "methods" => $methods,
      "callback" => $callback
    ];

    return $this;
  }

  public function run() {
    $request_method = $_SERVER['REQUEST_METHOD'];

    if (!in_array($request_method, self::METHODS)) {
      $this->onError();
      return;
    }

    $request_uri = $_SERVER['REQUEST_URI'];
    $request_uri_tokens = self::uri_tokenize($request_uri);

    foreach ($this->routes as $__ROUTE__) {
      $route_tokens = self::uri_tokenize($__ROUTE__['route']);
      if (count($request_uri_tokens) !== count($route_tokens)) {
        continue;
      }

      $match = true;
      $args = [];

      foreach ($request_uri_tokens as $i => $uri) {
        $route = $route_tokens[$i];

        if ($route === $uri || $route === '*') {
          continue;
        }

        if ($route[0] === ':') {
          $name = ltrim($route, ':');
          $args[$name] = $uri;
          continue;
        }

        $match = false;
        break;
      }

      if (!$match) {
        continue;
      }

      $allowed_methods = $__ROUTE__['methods'];

      if (!in_array($request_method, $allowed_methods)) {
        if (count($allowed_methods) !== 1 && $allowed_methods[0] === 'ANY') {
          $this->onError();
          return;
        }
      }

      $__ROUTE__['callback']($args);
      return;
    }

    $this->onError();
    return;
  }
}
