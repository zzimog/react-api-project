<?php

require_once "inc/config.d.php";
require_once "inc/headers.d.php";
require_once "Router.php";

$router = new Router();

echo "<pre>";
print_r($router::uri_tokenize());
echo "</pre>";
