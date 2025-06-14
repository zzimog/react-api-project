<?php

class Users extends BaseEntity {
  const TABLE = "users";

  const KEY = "id";

  const FIELDS = [
    "id",
    "username",
    "hash",
    "email"
  ];

  const PROTECTED_FIELDS = ["hash"];

  const SCHEME = [
    "id" => "INT(10) UNSIGNED AUTO_INCREMENT NOT NULL",
    "username" => "VARCHAR(64) NOT NULL",
    "hash" => "VARCHAR(255) NOT NULL",
    "email" => "VARCHAR(400)"
  ];
}
