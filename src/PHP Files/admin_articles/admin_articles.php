<?php
  require_once '../db_connect.php';

  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");

  //uploaded files variable from js code to proof that its exist files selected
  $selectedFiles = mysqli_real_escape_string($conn, filter_var($_POST['uploadedFiles'], FILTER_SANITIZE_STRING));
  //data from form
  $article_title = mysqli_real_escape_string($conn, filter_var($_POST['title'], FILTER_SANITIZE_STRING));
  $the_place_town = mysqli_real_escape_string($conn, filter_var($_POST['place'], FILTER_SANITIZE_STRING));
  $the_article   = mysqli_real_escape_string($conn, filter_var($_POST['desc'], FILTER_SANITIZE_STRING));
  $date = date("F j, Y");
  $article_unique_id = time() . rand(1, 100000);
  $article_files = $_FILES['files'];  //the selected files
  //aarraay of allowed uploaad files
  $allowedFiles = ['jpeg', 'jpg', 'png', "flv", "mp4", "wmv", "3gp", "mov", "avi", "ts"];
  $allowedSelected = [];  //array will contaain the selected files that are allowed

  if(!empty($article_title) && !empty($the_place_town) && !empty($the_article) && !empty($selectedFiles)){
    $files_count = count($article_files['name']);  //the selected files length
    //check if files is allowed to upload
    for($i=0;$i<$files_count;$i++){
      $file_explode = explode('.', $article_files['name'][$i]);  //explode each files
      $file_extension = strtolower(end($file_explode)); //get the extension of each files
      if(in_array($file_extension, $allowedFiles)){ //if extension is allowed
        //create random_name for each file
        $random_file_name = $article_unique_id . $article_files['name'][$i];  //random name
        //add the random file name to allowedSelected array
        array_push($allowedSelected, $random_file_name);
        //move files to folder uploaded at server and add all data to database
          move_uploaded_file($article_files['tmp_name'][$i], '../uploaded_art/'.$random_file_name);
      } //end if exsten check
    } //end for loop
    //make query to add data to database
    if(count($allowedSelected) === $files_count ){  //if the array of selected files (after cheking the allowed exten) === to files that choosed by admin
      //implode array allowedSelected to add to db
      $imploded = implode(',', $allowedSelected);  //the final data will added into db
      //add data to db
      if($sql = mysqli_query($conn, " INSERT INTO `admin_articles`(`article_id`, `article_unique_id`,	`article_title`, `place_town` ,	`article_desc`,	`article_imgs`,	`date`)
                                            VALUES('' ,'{$article_unique_id}' ,'{$article_title}', '{$the_place_town}' ,'{$the_article}' ,'{$imploded}' ,'{$date}') ")){
        //if data is aadded successfully echo successUpload
        echo "successUpload";

      }else{echo "Something went wrong, Please try again";} //if data not added to database
    }else{echo 'Please choose allowed files to download';} //if the there is some files no allowed (the two arrays not equal)
  }else{echo 'Please fill out all fields!';}  //fields are empty
?>