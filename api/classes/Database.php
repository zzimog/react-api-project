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
    /*
    echo "preparing statement for query $query with params:<br>";
    echo "<pre>";
    print_r($params);
    echo "</pre>";
    */

    return [
      "query" => $query,
      "params" => $params
    ];
  }
}
