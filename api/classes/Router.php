<?php

class Router {
  protected string $base;
  protected array $routes;

  public static function uri_tokenize(string $uri) {
    $parsed = parse_url($uri, PHP_URL_PATH);

    return preg_split('/\//', $parsed, -1, PREG_SPLIT_NO_EMPTY);
  }

  public function __construct(?string $base = "") {
    $this->base = trim($base, "/") . "/";
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
    callable $callback
  ): Router {
    $route = trim($route, "/");
    $route = $this->base . $route;

    $this->routes[] = [
      "route" => $route,
      "callback" => $callback
    ];

    return $this;
  }

  public function run() {
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

      $callback = $__ROUTE__['callback'];
      $callback($args);
      return;
    }

    $this->onError();
    return;
  }
}
