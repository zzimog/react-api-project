<?php

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../classes/Database.php";


function print_table_scheme(string $table_name) {
  $db = new Database();
  $res = $db->tableExists($table_name, true);

  echo "<div style='margin-bottom: 16px'>";

  if ($res && count($res) > 0) {
    $headers = array_keys($res[0]);
    $cols_count = count($headers);
    $html = "";

    $html .= "<table border='1' width='100%'>";
    $html .= "<thead>";
    $html .= "<tr>";
    $html .= "<th colspan=$cols_count>";
    $html .= strtoupper($table_name);
    $html .= "</th>";
    $html .= "</tr>";
    $html .= "<tr>";
    foreach ($headers as $header) {
      $html .= "<th>$header</th>";
    }
    $html .= "</tr>";
    $html .= "</thead>";
    $html .= "<tbody>";
    foreach ($res as $row) {
      $html .= "<tr>";
      foreach ($row as $value) {
        $html .= "<td>$value</td>";
      }
      $html .= "</tr>";
    }
    $html .= "</tbody>";
    $html .= "</table>";

    // print table
    echo $html;
  } else {
    echo "Table <b>$table_name</b> do not exists.";
  }

  echo "</div>";
}

$tables = [
  "users",
  "user_details"
];

foreach ($tables as $table) {
  print_table_scheme($table);
}

try {
  $tdb = new Database();
  $res = $tdb->query("CREATE TABLE test (id INT NOT NULL DEFAULT 0)");

  var_dump($res);
} catch (Throwable $e) {
  echo $e->getMessage();
}
