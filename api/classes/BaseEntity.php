<?php

/**
 * @todo
 *
 * 1. INSERT and UPDATE can be improved by using
 * same code to avoid repetitions (DRY)
 *
 * 2. Methods that rely on $request could be improved
 * to accept also data by parameters to improve child
 * classes methods reimplementations
 * (maybe let child classes handle $request?)
 */
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
   * Table fields
   */
  const FIELDS = [];

  /**
   * Protected fields (will be excluded from GET requests)
   */
  const PROTECTED_FIELDS = [];

  /**
   * @todo
   * Database table schema (optional)
   */
  const SCHEME = [];

  /**
   * GET all records
   */
  public function getAll() {
    $fields = implode(',', array_diff(static::FIELDS, static::PROTECTED_FIELDS));
    $query = sprintf("SELECT %s FROM %s", $fields, static::TABLE);
    $result = $this->query($query);

    $this->sendResponse($result);
  }

  /**
   * GET specific record by primary key
   */
  public function get(int $key) {
    $fields = implode(',', array_diff(static::FIELDS, static::PROTECTED_FIELDS));
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
      $this->sendError(500, "Expected at least 1 record, multiple given.");
    } else {
      $this->sendError(404);
    }
  }

  /**
   * INSERT new record
   */
  public function put() {
    $request = $this->getRequest();

    // Filter request fields
    $valid_fields = array_filter(
      $request,
      fn($key) => in_array($key, static::FIELDS) && $key !== static::KEY,
      ARRAY_FILTER_USE_KEY
    );

    if (empty($valid_fields)) {
      $this->sendError(400);
    }

    $fields = implode(',', array_keys($valid_fields));
    $placeholders = implode(',', array_fill(0, count($valid_fields), '?'));

    $query = sprintf(
      "INSERT INTO %s (%s) VALUES (%s)",
      static::TABLE,
      $fields,
      $placeholders
    );

    $values = array_values($valid_fields);

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
  public function patch(int $key) {
    $request = $this->getRequest();

    // Filter request fields
    $valid_fields = array_filter(
      $request,
      fn($key) => in_array($key, static::FIELDS) && $key !== static::KEY,
      ARRAY_FILTER_USE_KEY
    );

    if (empty($valid_fields)) {
      $this->sendError(400);
    }

    $placeholders = implode('=?, ', array_keys($valid_fields)) . '=?';

    $query = sprintf(
      "UPDATE %s SET %s WHERE %s=?",
      static::TABLE,
      $placeholders,
      static::KEY
    );

    $values = array_values($valid_fields);

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
