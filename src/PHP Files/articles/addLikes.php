<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");

  $_POST = json_decode(file_get_contents("php://input"),true);
  $artIDToLike = mysqli_real_escape_string($conn, filter_var($_POST['artIDToLike'], FILTER_SANITIZE_NUMBER_INT));
  
  //check if not empty data recieved from js increase the likes in database
  if(!empty($artIDToLike)){
    // //make qeury to check if article is exist in db aand then updae likes
    $sql = mysqli_query($conn, " SELECT * FROM `articles` WHERE `article_unique_id` = '{$artIDToLike}' ");
    if(mysqli_num_rows($sql) > 0){
      //make query to update likes
      $sql1 = mysqli_query($conn, " UPDATE `articles` SET `likes` = `likes` + 1 WHERE `article_unique_id` = '{$artIDToLike}' ");
    // }
  }
}
?>