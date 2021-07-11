<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: * ");
  header("Access-Control-Allow-Headers: * ");
  require_once '../db_connect.php';

  //admin dataa from login form
  $email = mysqli_real_escape_string($conn, filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $password   = mysqli_real_escape_string($conn, filter_var($_POST['password'], FILTER_SANITIZE_STRING));

  //check the input fields to login
  if(!empty($email) && !empty($password)){
    $sql = mysqli_query($conn, " SELECT * FROM `admin` WHERE `admin_mail` = '{$email}' ");
    if(mysqli_num_rows($sql) > 0){  //if it exist username or paseword
      $row = mysqli_fetch_assoc($sql);
      if(password_verify($password, $row['admin_pass'])){  //if entered password is identical with password(hashed) stored in database (password_verify : to unhash pass)
        echo "successLogin";
        
      }else{echo "Email or password incorrect!";}
    }else{echo "Email or password incorrect!";}
  }else{echo "Please fill out all fields";};
?>