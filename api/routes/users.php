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

  ->route("/:id", function ($method, $args) {
    $users = new User();
    $id = $args['id'];

    switch ($method) {
      case 'OPTIONS':
        $users->options(["OPTIONS", "GET", "PATCH", "DELETE"]);

      case 'GET':
        $users->get($id);

      case 'PATCH':
        $users->patch($id);

      case 'DELETE':
        $users->delete($id);

      default:
        $users->sendError(405);
    }
  });
