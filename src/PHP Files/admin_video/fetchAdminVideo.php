<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $array_of_data = []; //array will contain all data in json format

  //make query to fetch data from admin_videos table from database;
  $sql = mysqli_query($conn, " SELECT * FROM `admin_videos` WHERE `top_ten` = 'NO' ");
  if(mysqli_num_rows($sql) > 0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($array_of_data, $row);
    }
  }
  echo json_encode($array_of_data);
?>