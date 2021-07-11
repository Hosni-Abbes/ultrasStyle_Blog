<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $_POST = json_decode(file_get_contents("php://input"),true); //to get the sended data object from js 
  $queryID = mysqli_real_escape_string($conn, filter_var($_POST['query'], FILTER_SANITIZE_NUMBER_INT)); //the sended data from js (the unique id at aadress bar)
  $array_of_data = []; //array will contain all data in json format

  //make query to fetch data from admin_articles table from database;
  $sql = mysqli_query($conn, " SELECT * FROM `admin_articles` WHERE `article_unique_id` = $queryID ");
  if(mysqli_num_rows($sql) > 0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($array_of_data, $row);
    }
  }
  echo json_encode($array_of_data);
?>