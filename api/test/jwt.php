<?php

include __DIR__ . '/../classes/JWT.php';

// Sample payload
$payload = [
  'id' => 1,
  'username' => "admin",
  'roles' => ["admin", "system"]
];

// Sample secret key
$secret = "some_very_long_and_secure_secret_key_lol";

// Encode the payload with secret key
// JWT expires in 1 second for testing purposes
$jwt = JWT::encode($payload, $secret, 1);

echo "JWT: $jwt<br/><br/>";

// If 'expired' is set in QueryString sleep to
// expire token for testing purposes
if (isset($_GET['expired'])) {
  sleep(1);
}

// Try to decode the JWT token
try {
  $time = time();
  $payload = JWT::decode($jwt, $secret);

  echo "<pre>";
  echo "Decoded at time: $time";
  echo "<br/><br/>";
  print_r($payload);
  echo "</pre>";
} catch (Exception $e) {
  die($e->getMessage());
}
