<?php

(new Router("*/users"))

  ->route("/", function () {
    $users = new Users();
    $users->getAll();
  })

  ->route("/:user_id", function ($args) {
    $user_id = $args['user_id'];

    $controller = new APIController();
    $controller->sendResponse([
      "id" => $user_id,
      "username" => "some username..."
    ]);
  })

  ->run();
