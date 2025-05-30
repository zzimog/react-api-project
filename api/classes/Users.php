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

    if (count($result) === 1) {
      $this->sendResponse($result);
    }

    $this->sendError(200, "No record found for id: " . $id);
  }
}
