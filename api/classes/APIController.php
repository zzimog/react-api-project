<?php

class APIController {
  protected mixed $request;
  protected object $db;

  public function __construct() {
    $this->init();
  }

  protected final function init() {
    header_remove('Set-Cookie');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: *');

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

  public final function __call($name, $args) {
    $this->sendError(500);
  }

  protected final function query(string $query, ?array $params = []) {
    return $this->db->query($query, $params);
  }

  public final function sendError(int $code = 404, ?string $message = null) {
    http_response_code($code);

    if (isset($message)) {
      $body = [
        "error" => [
          "code" => $code,
          "message" => $message
        ]
      ];
    }

    $this->sendResponse($body ?? null);
  }

  public final function sendResponse(array | null $body, array | string $headers = []) {
    if (is_array($headers)) {
      foreach ($headers as $header) {
        header($header);
      }
    } else {
      header($headers);
    }

    if (is_array($body)) {
      header('Content-Type: application/json; charset=utf-8');
      $body = json_encode($body, JSON_UNESCAPED_SLASHES);
    }

    die($body);
  }
}
