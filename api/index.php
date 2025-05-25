<?php

require_once "inc/headers.d.php";
require_once "inc/config.d.php";
require_once "APIController.php";

function pretty_print($data) {
  echo "<pre>";
  print_r($data);
  echo "</pre>";
}

function parse_query_string($query) {
  $array = array();

  if (empty($query)) {
    return $array;
  }

  $params = explode("&", $query);

  foreach ($params as $param) {
    if (strpos($param, "=")) {
      [$name, $value] = explode("=", $param, 2);
    } else {
      $name = $param;
      $value = true;
    }

    if (isset($array[$name])) {
      if (is_array(($array[$name]))) {
        array_push($array[$name], $value);
      } else {
        $array[$name] = array($array[$name], $value);
      }
    } else {
      $array[$name] = $value;
    }
  }

  return $array;
}

// Tokenize URI into array
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');
$uri = explode('/', $uri);
$uri = array_slice($uri, 1);

if (count($uri) == 0) {
  $uri = ['/'];
}

// Parse query string into assoc array
$query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$query = parse_query_string($query);

if (isset($_GET['debug'])) {
  $body = [
    "uri" => $uri,
    "query" => $query
  ];

  pretty_print($body);
  exit;
}

$api = new APIController();

switch (array_shift($uri)) {
  case '/':
    $api->sendResponse("api home");
    break;
  case 'users':
    $api->sendResponse([
      "message" => "users API",
      "shift" => array_shift($uri),
    ]);
    break;
}
