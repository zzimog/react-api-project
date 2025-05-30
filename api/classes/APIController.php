<?php

class APIController {
  protected $request;
  protected $db;

  public function __construct() {
    header('Accept: application/json');

    $request = file_get_contents('php://input');
    $request = json_decode($request, JSON_OBJECT_AS_ARRAY);

    $this->request = $request;
    $this->db = new Database();
  }

  public function __call($name, $args) {
    $this->sendResponse(404);
  }

  public function sendError(int $code = 404) {
    http_response_code($code);
    $this->sendResponse('', "Content-type: text/html");
  }

  public function sendResponse(mixed $body, array | string $headers = []) {
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

    if (is_array($body)) {
      echo json_encode($body, JSON_UNESCAPED_SLASHES);
    } else {
      echo $body;
    }

    die();
  }
}
