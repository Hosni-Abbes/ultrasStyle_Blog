<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");
  require_once '../db_connect.php';

  //data from form request 
  $username = mysqli_real_escape_string($conn, filter_var($_POST['username'], FILTER_SANITIZE_STRING));
  $password   = mysqli_real_escape_string($conn, filter_var($_POST['password'], FILTER_SANITIZE_STRING));

  //check the input fields to login
  if(!empty($username) && !empty($password)){
    $sql = mysqli_query($conn, " SELECT * FROM `members` WHERE `member_name` = '{$username}' ");
    if(mysqli_num_rows($sql) > 0){  //if it exist username or paseword
      $row = mysqli_fetch_assoc($sql);
      if(password_verify($password, $row['member_pass'])){  //if entered password is identical with password(hashed) stored in database (password_verify : to unhash pass)
        echo "success_login";
        
      }else{echo "Password Is Incorrect!";}
    }else{echo "Username or Email is Not exist!";}
  }else{echo "Please fill out all fields";};
?>