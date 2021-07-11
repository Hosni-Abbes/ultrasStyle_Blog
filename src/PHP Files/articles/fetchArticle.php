<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");
  
  $_POST = json_decode(file_get_contents("php://input"),true);
  $query = mysqli_real_escape_string($conn, filter_var($_POST['queryNum'], FILTER_SANITIZE_NUMBER_INT));
  $mmbr_create_art = mysqli_real_escape_string($conn, filter_var($_POST['mmbr_create_art'], FILTER_SANITIZE_STRING));
  $queryPlusFour = $query + 4;

  $arr = [];
  $sql = mysqli_query($conn, " SELECT * FROM `articles` 
  LEFT JOIN `members` ON members.member_name = articles.member_created_art
  ORDER BY `article_id`   DESC  LIMIT 0,$queryPlusFour ");
  if(mysqli_num_rows($sql)>0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($arr, $row);
    }
  }
  print_r(json_encode($arr)); //print data in format json
?>