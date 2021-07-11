<?php
  require_once '../db_connect.php';

  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");

  $_POST = json_decode(file_get_contents("php://input"),true);
  $isClicked = mysqli_real_escape_string($conn, filter_var($_POST['isClicked'], FILTER_SANITIZE_STRING));
  
  //check if not empty data recieved from js increase the likes in database
  if(!empty($isClicked)){
    //make qeury to check if articles is exist in db aand then updae likes
    $sql = mysqli_query($conn, " SELECT * FROM `admin_articles` WHERE `article_title` = '{$isClicked}' ");
    if(mysqli_num_rows($sql) > 0){
      $row = mysqli_fetch_assoc($sql);
      $article_unique_id = $row['article_unique_id'];
      //make query to update likes
      $sql1 = mysqli_query($conn, " UPDATE `admin_articles` SET `likes` = `likes` + 1 WHERE `article_unique_id` = '{$article_unique_id}' ");
    }
  }
?>