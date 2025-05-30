<?php

include __DIR__ . "/users.php";

($router = new Router())

  ->route("*/debug/uri", function () {
    $uri = $_SERVER['REQUEST_URI'];
    $tokens = Router::uri_tokenize($uri);
    $controller = new APIController();

    $controller->sendResponse([
      "tokens" => $tokens
    ]);
  })

  ->route("*/debug/routes", function () use ($router) {
    echo "<pre>";
    print_r($router->getRoutes());
    echo "</pre>";
  })

  ->run();
