<?php

$localConfig = __DIR__ . "/local.config.php";

if (file_exists($localConfig)) {
  include_once $localConfig;
} else {
  include_once __DIR__ . "/config.php";
}

require_once __DIR__ . "/classes/Router.php";
require_once __DIR__ . "/classes/Database.php";
require_once __DIR__ . "/classes/APIController.php";
require_once __DIR__ . "/classes/Users.php";

try {
  $router = new Router();
  $router->route('*/', function () {
    echo "hello world";
  });

  include __DIR__ . "/routes/debug.php";
  include __DIR__ . "/routes/users.php";

  $router->run();
} catch (Exception $e) {
  echo "<pre>";
  echo $e;
  echo "</pre>";
  die();
}
