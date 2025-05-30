<?php

class Database {
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

      $this->db = $db;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }

  public function query(string $query, ?array $params = []) {
    try {
      $stmt = $this->execute($query, $params);

      $result = $stmt->get_result();
      $data = $result->fetch_all(MYSQLI_ASSOC);

      return $data;
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
        $stmt->bind_param($params[0], $params[1]);
      }

      $stmt->execute();

      return $stmt;
    } catch (Exception $e) {
      throw new Exception($e->getMessage());
    }
  }
}
