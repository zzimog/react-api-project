<?php

class Person extends BaseEntity {
  const TABLE = "Person";

  const KEY = "id";

  const COLUMNS = [
    "id" => "INT UNSIGNED AUTO_INCREMENT PRIMARY KEY",
    // "user" => "INT UNSIGNED NOT NULL",

    // Required fields
    "first_name" => "VARCHAR(255) NOT NULL",
    "last_name" => "VARCHAR(255) NOT NULL",

    // Base info
    "birthday" => "DATE", // YYYY-MM-DD
    "gender" => "ENUM('M','F','A')",
    "nationality" => "VARCHAR(400)",

    // Contact
    "email" => "VARCHAR(400)",
    "phone" => "VARCHAR(15)",
    "mobile_phone" => "VARCHAR(15)",

    // Main address
    "address" => "VARCHAR(400)",
    "city" => "VARCHAR(400)",
    "zip_code" => "VARCHAR(400)",
    "state" => "VARCHAR(400)",
    "country" => "VARCHAR(400)",
  ];
}
