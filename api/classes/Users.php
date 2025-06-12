<?php

class Users extends APIController {
  const TABLE = "users";
  const KEY = "id";
  const FIELDS = [
    "id",
    "username",
    "hash",
    "email"
  ];
  const PROTECTED_FIELDS = ["hash"];

  public function getAll() {
    $fields = implode(',', array_diff(self::FIELDS, self::PROTECTED_FIELDS));
    $query = sprintf("SELECT %s FROM %s", $fields, self::TABLE);
    $result = $this->query($query);

    $this->sendResponse($result);
  }

  public function get(int $key) {
    $fields = implode(',', array_diff(self::FIELDS, self::PROTECTED_FIELDS));
    $query = sprintf(
      "SELECT %s FROM %s WHERE %s=?",
      $fields,
      self::TABLE,
      self::KEY
    );

    $result = $this->query($query, ['i', $key]);
    $result_count = count($result);

    if ($result_count === 1) {
      $this->sendResponse($result[0]);
    } elseif ($result_count > 1) {
      $this->sendError(500, "Select with primary key MUST return only 0 or 1 record(s).");
    }

    $this->sendError(404);
  }

  public function put() {
    $request = $this->getRequest();
    $fields = implode(',', array_diff(self::FIELDS, [self::KEY]));

    $query = sprintf(
      "INSERT INTO %s (%s) VALUES (?, ?, ?)",
      self::TABLE,
      $fields
    );

    /**
     * @todo Generalize params array building
     */
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

  public function patch(int $key) {
    $request = $this->getRequest();

    $fieldsAndValues = [];
    foreach ($request as $key => $value) {
      $escapedValue = $this->escape($value);
      $fieldsAndValues[] = "`$key`=`$escapedValue`";
    }
    $fieldsAndValues = join(',', $fieldsAndValues);

    $query = sprintf(
      "UPDATE %s SET %s WHERE %s=?",
      self::TABLE,
      $fieldsAndValues,
      self::KEY
    );

    $result = $this->query($query, ['i', $key]);

    $this->sendResponse($result);
  }

  public function delete(int $key) {
    $query = sprintf("DELETE FROM %s WHERE %s=?", self::TABLE, self::KEY);
    $result = $this->query($query, ['i', $key]);

    $this->sendResponse($result);
  }
}
