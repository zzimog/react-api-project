<?php

final class Database {
  const CHARSET = "utf8mb4";

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
        throw new Error("Database connection failed");
      }

      $db->set_charset(self::CHARSET);

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
          "code" => $stmt->errno
        ];
      }

      return $result->fetch_all(MYSQLI_ASSOC);
    } catch (Throwable $e) {
      throw new Error($e->getMessage());
    }
  }

  private function execute(string $query, ?array $params = []) {
    try {
      $db = $this->db;
      $stmt = $db->prepare($query);

      if ($stmt === false) {
        throw new Error("Unable to prepare statement");
      }

      if ($params) {
        if (is_array($params[1])) {
          $stmt->bind_param($params[0], ...$params[1]);
        } else {
          $values = array_slice($params, 1);
          $stmt->bind_param($params[0], ...$values);
        }
      }

      $stmt->execute();

      return $stmt;
    } catch (Throwable $e) {
      throw new Error($e->getMessage());
    }
  }

  public function tableExists(string $table_name, ?bool $schema = false): bool|array {
    try {
      $result = $schema == true
        ? $this->query("DESCRIBE $table_name")
        : $this->query("SELECT 1 FROM $table_name LIMIT 1");

      if (isset($result['error']) && $result['error'] == true) {
        return false;
      }

      return $schema ? $result : true;
    } catch (Throwable $_) {
      return false;
    }
  }
}
