<?php

class Users extends APIController {
  const FIELDS = [
    "id",
    "username",
    "hash",
    "email"
  ];

  public function getAll() {
    $fields = implode(',', self::FIELDS);

    $result = $this->query(<<<EOD
      SELECT $fields
      FROM users
    EOD);

    $this->sendResponse($result);
  }

  public function get(int $id) {
    $fields = implode(',', self::FIELDS);
    $result = $this->query(<<<EOD
      SELECT $fields
      FROM users
      WHERE id=?
    EOD, ['i', $id]);

    if (count($result) === 1) {
      $this->sendResponse($result[0]);
    }

    $this->sendError(404);
  }

  public function put() {
    $request = $this->getRequest();

    $query = <<<EOD
      INSERT INTO users (
        username,
        hash,
        email
      ) VALUES (?, ?, ?)
    EOD;

    $params = [
      "sss",
      array_map(
        function (string $s) {
          return $this->escape($s);
        },
        [
          $request['username'],
          $request['hash'],
          $request['email']
        ]
      )
    ];

    $result = $this->query($query, $params);

    $this->sendResponse($result);
  }

  public function patch(int $id) {
    $request = $this->getRequest();
    $fieldsAndValues = [];

    foreach ($request as $key => $value) {
      $escapedValue = $this->escape($value);
      $fieldsAndValues[] = "`$key`=`$escapedValue`";
    }

    $fieldsAndValues = join(', ', $fieldsAndValues);

    $result = $this->query(<<<EOD
      UPDATE users
      SET $fieldsAndValues
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
