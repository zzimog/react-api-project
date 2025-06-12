<?php

class APIController {
  private Database $db;

  protected final function getRequest(): array {
    if (
      isset($_SERVER['CONTENT_TYPE']) &&
      $_SERVER['CONTENT_TYPE'] !== 'application/json'
    ) {
      $this->sendError(415, "Only application/json type is supported.");
    }

    $request = file_get_contents('php://input');
    $request = json_decode($request, JSON_OBJECT_AS_ARRAY);
    return $request ?? [];
  }

  protected final function db() {
    if (!isset($this->db)) {
      $this->db = new Database();
    }

    return $this->db;
  }

  protected final function escape(string $string) {
    return $this->db()->escape($string);
  }

  protected final function query(string $query, ?array $params = []) {
    return $this->db()->query($query, $params);
  }

  public final function options(array $methods = []) {
    $methods = array_map("strtoupper", $methods);
    $methods = implode(',', $methods);

    header("Allow: $methods");
    header("Allow-Types: application/json");

    $this->sendResponse([]);
  }

  public final function sendResponse(array | null $body, array | string $headers = []) {
    header_remove('Set-Cookie');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: *');

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
}
