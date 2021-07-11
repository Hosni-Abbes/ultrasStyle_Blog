<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");

  $targetMember = mysqli_real_escape_string($conn, filter_var($_POST['deleteMember'], FILTER_SANITIZE_STRING));
  
  //check if the member is exist in database
  $sql1 = mysqli_query($conn, " SELECT * FROM `members` WHERE `member_name` = '{$targetMember}' ");
  if(mysqli_num_rows($sql1) === 1){
    $row = mysqli_fetch_assoc($sql1);
    $sql2 = mysqli_query($conn, " DELETE FROM `members` WHERE `member_name` = '{$row['member_name']}' ");
  }
?>