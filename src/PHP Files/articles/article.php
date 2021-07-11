<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");
  //data from request
  $article_title   = mysqli_real_escape_string($conn, filter_var($_POST['article_title'], FILTER_SANITIZE_STRING));
  $the_article     = mysqli_real_escape_string($conn, filter_var($_POST['the_article'], FILTER_SANITIZE_STRING));
  $mmbr_create_art = mysqli_real_escape_string($conn, filter_var($_POST['mmbr_create_art'], FILTER_SANITIZE_STRING));
  $date = date("F j, Y");
  $article_unique_id = time() . rand(1, 100000);

  if(!empty($article_title) && !empty($the_article)){
    // echo ('hi');
    if($sql = mysqli_query($conn, "INSERT INTO `articles`(`article_id`, `article_unique_id`, `article_title`, `article_date_add`, `the_article`, `member_created_art`)
                      VALUES ('', '{$article_unique_id}', '{$article_title}', '{$date}', '{$the_article}', '{$mmbr_create_art}' )")
    ){
    echo ('article_published');
    }
  }else{
    echo 'Please fill out all fields';
  };
?>