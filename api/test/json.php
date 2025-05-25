<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:5173");

if (isset($_GET['test'])) {
  $data = [
    "addr" => $_SERVER['REMOTE_ADDR'],
    "test" => $_GET['test']
  ];
} else {
  $data = [
    "error" => "Param not defined."
  ];
}

echo json_encode($data);
die();
