<?php

$router->mount("*/users")

  ->route("/", function ($method) {
    $users = new Users();

    switch ($method) {
      case 'OPTIONS':
        header("Allow: OPTIONS,GET,PUT");
        header("Allow-Types: application/json");
        header("Content-Type: application/json");
        die();

      case 'GET':
        $users->getAll();

      case 'PUT':
        $users->put();

      default:
        $users->sendError(405);
    }
  })

  ->route("/:user_id", function ($method, $args) {
    $users = new Users();
    $user_id = $args['user_id'];

    switch ($method) {
      case 'OPTIONS':
        header("Allow: OPTIONS,GET,PATCH,DELETE");
        header("Allow-Types: application/json");
        header("Content-Type: application/json");
        die();

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
