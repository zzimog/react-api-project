<?php

/*
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL,
  hash VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT 0
)
*/

class User extends BaseEntity {
  const TABLE = "users";

  const KEY = "id";

  const FIELDS = [
    "id",
    "username",
    "hash",
    "active"
  ];

  const PROTECTED_FIELDS = ["hash"];

  const FORM_FIELDS = [
    "username",
    "password",
    "password_confirm",
    "active"
  ];

  private function checkUsername(array $data) {
    // Check if username is empty
    if (!isset($data['username'])) {
      $this->sendError(400, "USERNAME_EMPTY");
    }

    // Check if username already exists
    $query = sprintf(
      "SELECT id FROM %s WHERE %s=?",
      static::TABLE,
      "username"
    );

    $result = $this->query($query, ['s', $data['username']]);

    if (count($result) > 0) {
      // Username already exists.
      $this->sendError(400, "USERNAME_DUPLICATE");
    }
  }

  private function hashPassword(array $data) {
    // Check if password and password_confirm are set
    if (!isset($data['password']) || !isset($data['password_confirm'])) {
      $this->sendError(400, "PASSWORD_EMPTY");
    }

    $pwd = $data['password'];
    $pwd_c = $data['password_confirm'];

    // Check password length
    if (strlen($pwd) < 8) {
      // Password must be at least 8 characters.
      $this->sendError(400, "PASSWORD_INSECURE");
    }

    // Check password matching
    if ($pwd !== $pwd_c) {
      // Password not provided or not matching.
      $this->sendError(400, "PASSWORD_NOT_MATCH");
    }

    return password_hash($pwd, PASSWORD_BCRYPT);
  }

  public function put(?array $data = null) {
    $data = $data ?? $this->getRequest();

    $this->checkFields($data, self::FORM_FIELDS);

    $this->checkUsername($data);

    parent::put([
      "username" => $data['username'],
      "hash" => $this->hashPassword($data),
      "active" => $data['active'] ?? 0
    ]);
  }

  public function patch(int $key, ?array $data = null) {
    $data = $data ?? $this->getRequest();

    $this->checkFields($data, self::FORM_FIELDS);

    if (isset($data['username'])) {
      $this->checkUsername($data);
    }

    parent::patch($key, $data);
  }
}
