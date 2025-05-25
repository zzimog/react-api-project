<?php

$input = file_get_contents("php://input");
$input = json_decode($input, JSON_OBJECT_AS_ARRAY);

$data = [
  "headers" => getallheaders(),
  "php://input" => $input,
  "\$_SERVER" => $_SERVER,
  "\$_REQUEST" => $_REQUEST,
  "\$_POST" => $_POST
];

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

echo json_encode($data);
die();

/*
<style>
  details {
    margin-bottom: 16px;

    summary {
      padding: 16px;
      cursor: pointer;
      border: 1px solid black;
    }

    pre {
      padding: 16px;
      border: 1px solid gray;
      border-top: 0;
      margin: 0;
    }
  }
</style>

foreach ($data as $key => $entry) {
  $json = json_encode($entry, JSON_PRETTY_PRINT);

  echo "<details>";
  echo "<summary>$key</summary>";
  echo "<pre>$json</pre>";
  echo "</details>";
}
*/