<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");
  
  //data from form request 
  $video_title = mysqli_real_escape_string($conn, filter_var($_POST['video_title'], FILTER_SANITIZE_STRING));
  $video_desc   = mysqli_real_escape_string($conn, filter_var($_POST['video_desc'], FILTER_SANITIZE_STRING));
  $date = date("F j, Y");
  $article_unique_id = time() . rand(1, 100000);
  $video_name     = $_FILES['video_file']['name'];
  $video_tmp_name = $_FILES['video_file']['tmp_name'];
  //set allowed extensions of videos upload
  $allowed_extn = ["flv", "mp4", "wmv", "3gp", "mov", "avi", "ts"]; 
  //get the extension of file uploaded
  $explode = explode('.', $video_name);
  $file_extn = strtolower(end($explode)); //file extension
  //create random video name
  $video_random_name = time() . rand(1, 100000) . $video_name;

  //check if there is a file
  if(isset($_FILES['video_file'])){
    //check if not empty input fields
    if(!empty($video_title) && !empty($video_desc) && !empty($video_name)){
      //check if file extension is allowed
      if(in_array($file_extn, $allowed_extn)){
        //move file to uploaded folder and check if it moved send data to database
        if(move_uploaded_file($video_tmp_name, '../uploaded/' . $video_random_name)){
          $sql = mysqli_query($conn, "INSERT INTO `media`(`media_id`, `media_title`, `media_date_aded`, `media_description`, `media_likes`, `media_comments`, `the_media`)
                                      VALUES('', '{$video_title}', '{$date}', '{$video_desc}', '', '', '{$video_random_name}' ) ");
          echo "video_uploaded";
        }else{echo "Something went wrong, please try again!";}
      }else{echo "Your video extension must be: .flv, .mp4, .wmv, .3gp, .mov, .avi Or .ts!";}
    }else{echo "Please fill all fields.";}
  }else{echo "Please add your video!";}
?>