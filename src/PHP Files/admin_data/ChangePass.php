<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type: multipart/form-data");

  //change pass form data
  $myemail = mysqli_real_escape_string($conn, filter_var($_POST['myemail'], FILTER_SANITIZE_EMAIL));
  $mypassword = mysqli_real_escape_string($conn, filter_var($_POST['mypassword'], FILTER_SANITIZE_EMAIL));
  $newPassword  = mysqli_real_escape_string($conn, filter_var($_POST['newPassword'], FILTER_SANITIZE_STRING));
  //hash password
  $new_hashed_pass = password_hash($newPassword, PASSWORD_DEFAULT);

  if(!empty($myemail) && !empty($mypassword) && !empty($newPassword)){
    if(filter_var($myemail, FILTER_VALIDATE_EMAIL)){
      $sql = mysqli_query($conn, " SELECT * FROM `admin` WHERE `admin_mail` = '{$myemail}' ");
      if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
        if($myemail === $row['admin_mail'] && password_verify($mypassword, $row['admin_pass'])){
          $sql2 = mysqli_query($conn, " UPDATE `admin` SET `admin_pass` = '{$new_hashed_pass}' ");
          echo "passwordChanged";

        }else{echo "Incorrect email or password!";}
      }else{echo "Email is incorrect";}
    }else{echo "Please enter a valid email";}
  }else{echo "Please fill out all fields";}
?>