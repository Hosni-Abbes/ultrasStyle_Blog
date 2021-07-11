<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");
  
  //data from request
  $comment_text    = mysqli_real_escape_string($conn, filter_var($_POST['comment'], FILTER_SANITIZE_STRING));
  $articleID       = mysqli_real_escape_string($conn, filter_var($_POST['articleID'], FILTER_SANITIZE_NUMBER_INT));
  $memberCommented = mysqli_real_escape_string($conn, filter_var($_POST['memberCommented'], FILTER_SANITIZE_STRING));
  $date = date("F j, Y");
  
  if(!empty($comment_text)){ //check if comment field sended from js not empty
    if(!empty($articleID) && !empty($memberCommented) ){ //check if commen$articleID (the id in navigator adress), and the member that commented are not empty
      //make query to check if commen$articleID  is exist
      $sql1 = mysqli_query($conn, " SELECT `article_unique_id` FROM `articles` WHERE `article_unique_id` = '{$articleID}' ");
      if(mysqli_num_rows($sql1) === 1){ //if page id is exist in db maake query and check if member commented is exist in db or no
        $sql2 = mysqli_query($conn, " SELECT `member_name` FROM `members` WHERE `member_name` = '{$memberCommented}' ");
        if(mysqli_num_rows($sql2) === 1){ //if member commented is exist in db add the comment to db
          //make query to add comment to db
          if($sql3 = mysqli_query($conn, " INSERT INTO `blog_comments`(`comment_id`, `commentowner_id`, `commenttarget_id`, `the_comment`, `comment_date`)
                                                    VALUES('', '{$memberCommented}', '{$articleID}', '{$comment_text}', '{$date}' )") ){
            //if comment added to db
            echo "comment_added";
            
          }else{echo "Faild to add your comment! Please try again.";} //comment not added to db
        }else{echo 'Please LogIn or SignUp to create a comment!';}  //member commented not exist in db
      }else{echo 'Something went wrong! Please try again later.';}  //articleID not exist in db
    }else{echo 'Something went wrong!';}  //articleID and MemberName sended from js empty
  }else{echo 'Please add your comment.';} //comment field is empty
?>