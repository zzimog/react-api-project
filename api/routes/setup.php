<?php

/**
 * @todo
 * Handle strict table
 * checking on columns:
 * 1. count
 * 2. order
 * 3. type
 */
$router->route('*/setup', function () {
  $db = new Database();
  $entities = [
    "User",
    "Person"
  ];

  $results = array_map(function ($entity) use ($db) {
    try {
      $entity::createTable($db);
      return [$entity, "OK"];
    } catch (Throwable $e) {
      return [$entity, $e->getMessage()];
    }
  }, $entities);

  echo "<table border=1 width=100%>";
  echo "  <thead>";
  echo "    <tr>";
  echo "      <th width=30%>Entity</th>";
  echo "      <th width=70%>Status</th>";
  echo "    </tr>";
  echo "  </thead>";
  echo "  <tbody>";
  foreach ($results as [$entity, $error]) {
    echo "  <tr>";
    echo "    <td>$entity</td>";
    echo "    <td>$error</td>";
    echo "  </tr>";
  }
  echo "  </tbody>";
  echo "</table>";
});
