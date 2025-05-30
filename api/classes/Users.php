<?php

class Users extends APIController {
  public function getAll() {
    $result = $this->db->query("SELECT * FROM users");

    $this->sendResponse($result);
  }
}
