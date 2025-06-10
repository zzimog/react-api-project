<?php

$router->mount("*/debug")

  ->route("/request", function () {
    $uri = $_SERVER['REQUEST_URI'];
    $tokens = Router::uri_tokenize($uri);

    $api = new APIController();
    $api->sendResponse([
      "method" => $_SERVER['REQUEST_METHOD'],
      "uri" => $uri,
      "tokens" => $tokens
    ]);
  })

  ->route("/routes", function () use ($router) {
    $routes = array_map(function ($route) {
      return $route['route'];
    }, $router->getRoutes());

    $api = new APIController();
    $api->sendResponse($routes);
  });
