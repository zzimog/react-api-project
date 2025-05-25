<?php

class APIController {
  protected $request;

  public function __construct() {
    header('Accept: application/json');

    $request = file_get_contents('php://input');
    $request = json_decode($request, JSON_OBJECT_AS_ARRAY);

    $this->request = $request;
  }

  public function __call($name, $args) {
    // @todo
  }

  public function sendResponse(mixed $body, array|string $headers = []) {
    if (!is_array($body)) {
      $body = ["message" => $body];
    }

    $body = json_encode($body, JSON_UNESCAPED_SLASHES);

    header_remove('Set-Cookie');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    if (is_array($headers)) {
      foreach ($headers as $header) {
        header($header);
      }
    } else {
      header($headers);
    }

    die($body);
  }
}
