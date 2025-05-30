<?php

require_once "inc/config.d.php";
require_once "inc/headers.d.php";

require_once "Router.php";
require_once "APIController.php";

$controller = new APIController();

($router = new Router())

  ->route("*/debug/uri", "GET", function () use ($controller) {
    $uri = $_SERVER['REQUEST_URI'];
    $tokens = Router::uri_tokenize($uri);

    $controller->sendResponse([
      "tokens" => $tokens
    ]);
  })

  ->route("*/debug/routes", "ANY", function () use ($router, $controller) {
    $list = $router->getRoutes();
    $controller->sendResponse($list);
  })

  ->route(
    "*/users",
    ["GET", "POST"],
    function () use ($controller) {
      $controller->sendResponse([
        [
          "id" => 1,
          "username" => "admin"
        ],
        [
          "id" => 2,
          "username" => "user1"
        ],
        [
          "id" => 3,
          "username" => "user2"
        ],
      ]);
    }
  )

  ->route("*/users/:user_id", "ANY", function ($args) use ($controller) {
    $user_id = $args['user_id'];

    $controller->sendResponse([
      "id" => $user_id,
      "username" => "some username..."
    ]);
  })

  ->run();
