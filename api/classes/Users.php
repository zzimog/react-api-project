<?php

class Users extends APIController {
  public function getAll() {
    $db = $this->db;
    $result = $db->query("SELECT * FROM users");

    $this->sendResponse($result);
  }

  public function get(int $id) {
    $db = $this->db;
    $result = $db->query("SELECT * FROM users WHERE id=?", ['i', $id]);

    $this->sendResponse($result);
  }
}
