<?php

try {
  require_once "inc/bootstrap.php";
  require_once "routes/index.php";
} catch (Exception $e) {
  echo "<pre>";
  echo $e;
  echo "</pre>";
  die();
}
