<?php

$router = new Router();

$router->route('*/', function () {
  echo "hello world";
});

include __DIR__ . "/debug.php";
include __DIR__ . "/users.php";

$router->run();
