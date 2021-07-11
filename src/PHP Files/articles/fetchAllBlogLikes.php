<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $arr = [];
  $sql = mysqli_query($conn, " SELECT SUM(`likes`) as likes FROM `articles` ");
  if(mysqli_num_rows($sql)>0){
    $row = mysqli_fetch_assoc($sql);
  }
  print_r(json_encode($row)); //print data in format json
?>