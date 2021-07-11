<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $arr = [];
  $sql = mysqli_query($conn, " SELECT * FROM `articles` ");
  if(mysqli_num_rows($sql)>0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($arr, $row);
    }
  }
  print_r(json_encode($arr)); //print data in format json
?>