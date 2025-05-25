<?php

$input = file_get_contents("php://input");
$requestBody = json_decode($input, JSON_OBJECT_AS_ARRAY);

header('Content-Type: application/json; charset=utf-8');
header('Accept: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$data = [
  "method" => $_SERVER["REQUEST_METHOD"],
  "body" => $requestBody
];

echo json_encode($data);
die();
