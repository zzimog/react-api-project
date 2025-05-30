<?php

$router->mount("*/users")

  ->route("/", function () {
    $users = new Users();
    $users->getAll();
  })

  ->route("/:user_id", function ($args) {
    $user_id = $args['user_id'];
    $users = new Users();
    $users->get($user_id);
  });
