<?php

final class Database {
  protected $db;

  public function __construct() {
    try {
      $db = new mysqli(
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME
      );

      if ($db->connect_error) {
        throw new Error("Database connection failed.");
      }

      $db->set_charset("utf8mb4");

      $this->db = $db;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  public function escape(string $string) {
    return $this->db->real_escape_string($string);
  }

  public function query(string $query, ?array $params = []) {
    try {
      $stmt = $this->execute($query, $params);
      $result = $stmt->get_result();

      if (is_bool($result) || is_numeric($result)) {
        return [
          "affectedRows" => $this->db->affected_rows,
          "error" => $result,
          "errno" => $stmt->errno
        ];
      }

      return $result->fetch_all(MYSQLI_ASSOC);
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  private function execute(string $query, ?array $params = []) {
    try {
      $db = $this->db;
      $stmt = $db->prepare($query);

      if ($stmt === false) {
        throw new Exception("Unable to prepare statement.");
      }

      if ($params) {
        if (is_array($params[1])) {
          $stmt->bind_param($params[0], ...$params[1]);
        } else {
          $values = array_slice($params, 1);
          $stmt->bind_param($params[0], $values);
        }
      }

      $stmt->execute();

      return $stmt;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
}
