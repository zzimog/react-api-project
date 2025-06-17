<?php

$router->mount("*/persons")

  ->route("/", function ($method) {
    $person = new Person();

    switch ($method) {
      case 'OPTIONS':
        $person->options(["OPTIONS", "GET", "PUT"]);

      case 'GET':
        $person->getAll();

      case 'PUT':
        $person->put();

      default:
        $person->sendError(405);
    }
  })

  ->route("/:id", function ($method, $args) {
    $person = new Person();
    $id = $args['id'];

    switch ($method) {
      case 'OPTIONS':
        $person->options(["OPTIONS", "GET", "PATCH", "DELETE"]);

      case 'GET':
        $person->get($id);

      case 'PATCH':
        $person->patch($id);

      case 'DELETE':
        $person->delete($id);

      default:
        $person->sendError(405);
    }
  });
