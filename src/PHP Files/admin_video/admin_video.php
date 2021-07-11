<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");
  
  //data from request
  $video_title = mysqli_real_escape_string($conn, filter_var($_POST['title'], FILTER_SANITIZE_STRING));
  $video_desc  = mysqli_real_escape_string($conn, filter_var($_POST['desc'], FILTER_SANITIZE_STRING));
  $video_topten  = mysqli_real_escape_string($conn, filter_var($_POST['topten'], FILTER_SANITIZE_STRING));
  $video_town  = mysqli_real_escape_string($conn, filter_var($_POST['place'], FILTER_SANITIZE_STRING));
  $date        = date("F j, Y");
  $video_unique_id = time() . rand(1, 100000);
  $allowed_extn = ["flv", "mp4", "wmv", "3gp", "mov", "avi", "ts"];  //set allowed extensions of videos upload

  //check if there is a file
  if(isset($_FILES['video'])){
    $thevideo    = $_FILES['video'];
    //get the extension of file uploaded
    $explode = explode('.', $thevideo['name']);
    $file_extn = strtolower(end($explode)); //file extension
    //create random video name
    $video_random_name = time() . rand(1, 100000) . $thevideo['name'];

    //check if not empty input fields
    if(!empty($video_title) && !empty($video_desc) && !empty($thevideo['name']) && !empty($video_topten) && !empty($video_town) ){
      if($video_topten === 'YES' || $video_topten === 'NO'){  // must creaate yes or no in video top ten field
        //check if file extension is allowed
        if(in_array($file_extn, $allowed_extn)){
          //move file to uploaded folder and check if it moved send data to database
          if(move_uploaded_file($thevideo['tmp_name'], '../uploaded_vid/' . $video_random_name)){
            $sql = mysqli_query($conn, "INSERT INTO `admin_videos`(`video_id`, `video_unique_id`, `video_title`, `video_desc`, `video_src`, `date`, `top_ten`, `place_town`)
                                        VALUES('', '{$video_unique_id}', '{$video_title}', '{$video_desc}','{$video_random_name}', '{$date}', '{$video_topten}', '{$video_town}' ) ");
            echo "video_uploaded";
  
          }else{echo "Something went wrong, please try again!";}
        }else{echo "Your video extension must be: .flv, .mp4, .wmv, .3gp, .mov, .avi Or .ts!";}
      }else{echo "Please create 'YES' if this viedo is from top ten and 'NO' if not.";} //echo message to add YES or NO (topten videos)
    }else{echo "Please fill all fields.";}
  }else{echo "Please add your video!";}
?>