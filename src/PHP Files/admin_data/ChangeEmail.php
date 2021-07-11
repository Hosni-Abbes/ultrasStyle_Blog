<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type: multipart/form-data");

  //change email form data
  $old_email = mysqli_real_escape_string($conn, filter_var($_POST['old_email'], FILTER_SANITIZE_EMAIL));
  $new_email = mysqli_real_escape_string($conn, filter_var($_POST['new_email'], FILTER_SANITIZE_EMAIL));
  $password  = mysqli_real_escape_string($conn, filter_var($_POST['password'], FILTER_SANITIZE_STRING));

  if(!empty($old_email) && !empty($new_email) && !empty($password)){
    if(filter_var($old_email, FILTER_VALIDATE_EMAIL) && filter_var($new_email, FILTER_VALIDATE_EMAIL)){
      $sql = mysqli_query($conn, " SELECT * FROM `admin` WHERE `admin_mail` = '{$old_email}' ");
      if(mysqli_num_rows($sql) === 1){
        $row = mysqli_fetch_assoc($sql);
        if($old_email === $row['admin_mail'] && password_verify($password, $row['admin_pass'])){
          $sql2 = mysqli_query($conn, " UPDATE `admin` SET `admin_mail` = '{$new_email}' ");
          echo "emailChanged";

        }else{echo "Incorrect email or password!";}
      }else{echo "Email is incorrect";}
    }else{echo "Please enter a valid email";}
  }else{echo "Please fill out all fields";}

?>