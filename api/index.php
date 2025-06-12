<?php define("__LOCAL_CONF__", __DIR__ . "/local.config.php");

if (file_exists(__LOCAL_CONF__)) {
  include_once __LOCAL_CONF__;
} else {
  include_once __DIR__ . "/config.php";
}

require_once __DIR__ . "/classes/Router.php";
require_once __DIR__ . "/classes/Database.php";
require_once __DIR__ . "/classes/APIController.php";
require_once __DIR__ . "/classes/Users.php";

try {
  $dir = __DIR__ . "/routes";
  $router = new Router();

  include $dir . "/debug.php";
  include $dir . "/users.php";

  $router->run();
} catch (Throwable $e) {
  $code = $e->getCode();
  $message = $e->getMessage();

  if ($code != 404) {
    $code = 500;
  }

  $api = new APIController();
  $api->sendError($code, $message);
}

die();
