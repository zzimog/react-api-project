<?php

class Router {
  public static function uri_tokenize(?string $uri = null) {
    if (empty($uri)) {
      $uri = parse_url($_SERVER['REQUEST_URI'] ?? "", PHP_URL_PATH);
    }

    return preg_split('/\//', $uri, -1, PREG_SPLIT_NO_EMPTY);
  }

  public function __construct() {
    // @todo
  }

  public function add($methods, $path, $callback) {
    //
  }
}
