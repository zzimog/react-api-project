<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "react-api-project";

$db = new mysqli($host, $username, $password, $dbname);

if ($db->connect_error) {
  die("connection failed: " . $db->connect_error);
}

echo "connect ok, errno: " . $db->connect_errno;
die();