<?php

$router->mount("*/users")

  ->route("/", function ($method) {
    $users = new User();

    switch ($method) {
      case 'OPTIONS':
        $users->options(["OPTIONS", "GET", "PUT"]);

      case 'GET':
        $users->getAll();

      case 'PUT':
        $users->put();

      default:
        $users->sendError(405);
    }
  })

  ->route("/:user_id", function ($method, $args) {
    $users = new User();
    $user_id = $args['user_id'];

    switch ($method) {
      case 'OPTIONS':
        $users->options(["OPTIONS", "GET", "PATCH", "DELETE"]);

      case 'GET':
        $users->get($user_id);

      case 'PATCH':
        $users->patch($user_id);

      case 'DELETE':
        $users->delete($user_id);

      default:
        $users->sendError(405);
    }
  });
