<?php

class APIController {
  protected $request;
  protected $db;

  public function __construct() {
    header_remove('Set-Cookie');
    header('Access-Control-Allow-Origin: *');

    if (
      isset($_SERVER['CONTENT_TYPE']) &&
      $_SERVER['CONTENT_TYPE'] !== 'application/json'
    ) {
      $this->sendError(415/*, "Only application/json type is supported."*/);
    }

    $request = file_get_contents('php://input');
    $request = json_decode($request, JSON_OBJECT_AS_ARRAY);

    $this->request = $request ?? [];
    $this->db = new Database();
  }

  public function __call($name, $args) {
    $this->sendResponse(404);
  }

  public function query(string $query, ?array $params = []) {
    return $this->db->query($query, $params);
  }

  public function sendError(int $code = 404, ?string $error = null) {
    http_response_code($code);

    if (!empty($error)) {
      $body = ["error" => $error];
    }

    $this->sendResponse($body ?? '', "Content-type: text/html");
  }

  public function sendResponse(mixed $body, array | string $headers = []) {
    if (is_array($headers)) {
      foreach ($headers as $header) {
        header($header);
      }
    } else {
      header($headers);
    }

    if (is_array($body)) {
      header('Content-Type: application/json');

      $body = json_encode($body, JSON_UNESCAPED_SLASHES);
    }

    die($body);
  }
}
