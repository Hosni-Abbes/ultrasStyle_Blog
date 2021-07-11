<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $_POST = json_decode(file_get_contents("php://input"),true);
  $queryData = mysqli_real_escape_string($conn, filter_var($_POST['query'], FILTER_SANITIZE_STRING)); //the limit sended from js
  $queryDataPlusTen = $queryData+10;  // the limit + 10
  $array_of_data = []; //array will contain all data in json format

  //make query to fetch data from admin_videos table from database;
  $sql = mysqli_query($conn, " SELECT * FROM `admin_images` LIMIT $queryData , $queryDataPlusTen  ");
  if(mysqli_num_rows($sql) > 0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($array_of_data, $row);
    }
  }
  echo json_encode($array_of_data);
?>