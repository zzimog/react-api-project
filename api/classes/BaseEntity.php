<?php

abstract class BaseEntity extends APIController {
  /**
   * Database table name
   */
  const TABLE = null;

  /**
   * Table primary key
   */
  const KEY = null;

  /**
   * Table columns
   */
  const COLUMNS = [];

  /**
   * Protected columns (will be excluded from GET requests)
   */
  const PROTECTED_COLUMNS = [];

  /**
   * Other table constraints
   */
  const CONSTRAINTS = [];

  public final function getColumns() {
    return array_is_list(static::COLUMNS)
      ? static::COLUMNS
      : array_keys(static::COLUMNS);
  }

  /**
   * Create database table
   */
  public static function createTable(?Database $db = null) {
    $db = $db ?? new Database();
    $table_name = static::TABLE;

    if (is_null($table_name) || count(static::COLUMNS) <= 0) {
      throw new Error("Table name or columns not defined.");
    }

    if (array_is_list(static::COLUMNS)) {
      throw new Error("Columns property must be associative array, list found.");
    }

    $def = [];

    foreach (static::COLUMNS as $name => $datatype) {
      $def[] = "$name $datatype";
    }

    $def = array_merge($def, static::CONSTRAINTS);
    $def = implode(',', $def);

    return $db->query("CREATE TABLE $table_name ($def)");
  }

  /**
   * @todo
   * Improve check on required fields or maybe default values
   */
  public function checkFields(array $fields, ?array $allowed = null) {
    $allowed_fields = $allowed ?? $this->getColumns();
    $invalid_fields = [];

    foreach ($fields as $key => $value) {
      if (!in_array($key, $allowed_fields) || $key == static::KEY) {
        $invalid_fields[] = $key;
      }
    }

    if (!empty($invalid_fields)) {
      $string = implode(', ', $invalid_fields);
      $this->sendError(400, "Field(s) $string not found on entity " . static::TABLE . ".");
    }
  }

  /**
   * GET all records
   *
   * @todo
   * Handle filters, order by, limit, ecc...
   * (use query string or request body as json? or support both?)
   */
  public function getAll() {
    $fields = implode(',', array_diff($this->getColumns(), static::PROTECTED_COLUMNS));
    $query = sprintf("SELECT %s FROM %s", $fields, static::TABLE);
    $result = $this->query($query);

    $this->sendResponse($result);
  }

  /**
   * GET specific record by primary key
   */
  public function get(int $key) {
    $fields = implode(',', array_diff($this->getColumns(), static::PROTECTED_COLUMNS));
    $query = sprintf(
      "SELECT %s FROM %s WHERE %s=?",
      $fields,
      static::TABLE,
      static::KEY
    );

    $result = $this->query($query, ['i', $key]);
    $result_count = count($result);

    if ($result_count === 1) {
      $this->sendResponse($result[0]);
    } elseif ($result_count > 1) {
      $this->sendError(500, "Expected at least 1 record, multiple found.");
    } else {
      $this->sendError(404);
    }
  }

  /**
   * INSERT new record
   */
  public function put(?array $data = null) {
    $data = $data ?? $this->getRequest();

    $this->checkFields($data);

    $fields = implode(',', array_keys($data));
    $values = array_values($data);
    $placeholders = implode(',', array_fill(0, count($data), '?'));

    $query = sprintf(
      "INSERT INTO %s (%s) VALUES (%s)",
      static::TABLE,
      $fields,
      $placeholders
    );

    /**
     * @todo
     * Assume all parameters as strings
     * Could be improved by checking static::SCHEME to determine types
     */
    $types = str_repeat('s', count($values));

    $result = $this->query($query, [$types, ...$values]);

    $this->sendResponse($result);
  }

  /**
   * UPDATE existing record
   */
  public function patch(int $key, ?array $data = null) {
    $data = $data ?? $this->getRequest();

    $this->checkFields($data);

    $values = array_values($data);
    $placeholders = implode('=?, ', array_keys($data)) . '=?';

    $query = sprintf(
      "UPDATE %s SET %s WHERE %s=?",
      static::TABLE,
      $placeholders,
      static::KEY
    );

    /**
     * @todo
     * Assume all parameters as strings
     * Could be improved by checking static::SCHEME to determine types
     */
    $types = str_repeat('s', count($values)) . 'i';

    $result = $this->query($query, [$types, ...$values, $key]);

    $this->sendResponse($result);
  }

  /**
   * DELETE record by primary key
   */
  public function delete(int $key) {
    $query = sprintf("DELETE FROM %s WHERE %s=?", static::TABLE, static::KEY);
    $result = $this->query($query, ['i', $key]);

    $this->sendResponse($result);
  }
}
