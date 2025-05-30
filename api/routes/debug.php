<?php

$router->mount("*/debug")

  ->route("/uri", function () {
    $uri = $_SERVER['REQUEST_URI'];
    $tokens = Router::uri_tokenize($uri);
    $controller = new APIController();

    $controller->sendResponse([
      "tokens" => $tokens
    ]);
  })

  ->route("/routes", function () use ($router) {
    echo "<pre>";
    print_r($router->getRoutes());
    echo "</pre>";
  });
