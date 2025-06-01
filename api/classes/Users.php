<?php

class Users extends APIController {
  public function getAll() {
    $result = $this->query(<<<EOD
      SELECT id, username, hash, email
      FROM users
    EOD);

    $this->sendResponse($result);
  }

  public function get(int $id) {
    $result = $this->query(<<<EOD
      SELECT username, hash, email
      FROM users
      WHERE id=?
    EOD, ['i', $id]);

    if (count($result) === 1) {
      $this->sendResponse($result[0]);
    }

    $this->sendError(200, "No user found with id: " . $id);
  }

  public function put() {
    $query = <<<EOD
      INSERT INTO users (
        username,
        hash,
        email
      ) VALUES (?, ?, ?)
    EOD;

    $params = [
      "sss",
      [
        $this->request['username'],
        $this->request['hash'],
        $this->request['email']
      ]
    ];

    $result = $this->query($query, $params);

    $this->sendResponse($result);
  }

  public function patch(int $id) {
    $fields = [];

    foreach ($this->request as $key => $value) {
      $fields[] = "$key='$value'";
    }

    $fields = join(', ', $fields);

    $result = $this->query(<<<EOD
      UPDATE users
      SET $fields
      WHERE id=?
    EOD, ['i', $id]);

    $this->sendResponse($result);
  }

  public function delete(int $id) {
    $result = $this->query(<<<EOD
      DELETE FROM users
      WHERE id=?
    EOD, ['i', $id]);

    $this->sendResponse($result);
  }
}
