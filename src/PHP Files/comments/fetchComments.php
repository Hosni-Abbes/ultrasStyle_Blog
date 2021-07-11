<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $_POST = json_decode(file_get_contents("php://input"),true);
  $pageID = mysqli_real_escape_string($conn, filter_var($_POST['query'], FILTER_SANITIZE_NUMBER_INT));
  $array_of_comments = [];

  $sql = mysqli_query($conn, " SELECT * FROM `comments` 
                                LEFT JOIN `members` ON `member_name` = comments.commentowner_id
                                WHERE `commenttarget_id` = '{$pageID}' ORDER BY `comment_id` DESC ");
  if(mysqli_num_rows($sql)>0){
    while($row = mysqli_fetch_assoc($sql)){
      array_push($array_of_comments, $row);
    }
  }
  print_r(json_encode($array_of_comments)); //print data in format json
?>