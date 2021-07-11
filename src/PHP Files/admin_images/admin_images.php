<?php
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");

  //uploaded files variable from js code to proof that its exist files selected
  $selectedFiles = mysqli_real_escape_string($conn, filter_var($_POST['uploadedFiles'], FILTER_SANITIZE_STRING));
  //data from request
  $image_title = mysqli_real_escape_string($conn, filter_var($_POST['img_title'], FILTER_SANITIZE_STRING));
  $image_desc  = mysqli_real_escape_string($conn, filter_var($_POST['img_desc'], FILTER_SANITIZE_STRING));
  $image_town  = mysqli_real_escape_string($conn, filter_var($_POST['place'], FILTER_SANITIZE_STRING));
  $date        = date("F j, Y");
  $image_unique_id = time() . rand(1, 100000);
  $allowed_extn = ["jpeg", "jpg", "png"];  //set allowed extensions of images upload
  $allowedSelected = [];  //array will contaain the selected files that are allowed

  // //check if there is a file
  if(isset($_FILES['the_img'])){
    $imagesFiles  = $_FILES['the_img'];
    if(!empty($image_title) && !empty($image_desc) && !empty($image_town) && !empty($selectedFiles)){
      $files_count = count($imagesFiles['name']);  //the selected files length
      //check if files is allowed to upload
      for($i=0;$i<$files_count;$i++){
        $file_explode = explode('.', $imagesFiles['name'][$i]);  //explode each files
        $file_extension = strtolower(end($file_explode)); //get the extension of each files
        if(in_array($file_extension, $allowed_extn)){ //if extension is allowed
          //create random_name for each file
          $random_file_name = $image_unique_id . $imagesFiles['name'][$i];  //random name
          //add the random file name to allowedSelected array
          array_push($allowedSelected, $random_file_name);
          //move files to folder uploaded at server and add all data to database
            move_uploaded_file($imagesFiles['tmp_name'][$i], '../uploaded_img/'.$random_file_name);
        } //end if exsten check
      } //end for loop
      //make query to add data to database
      if(count($allowedSelected) === $files_count ){  //if the array of selected files (after cheking the allowed exten) === to files that choosed by admin
        //implode array allowedSelected to add to db
        $imploded = implode(',', $allowedSelected);  //the final data will added into db
        //add data to db
        if($sql = mysqli_query($conn, " INSERT INTO `admin_images`(`image_id`, `image_unique_id`,	`image_title`, `place_town` ,	`image_desc`,	`image_src`,	`date`)
                                              VALUES('' ,'{$image_unique_id}' ,'{$image_title}', '{$image_town}' ,'{$image_desc}' ,'{$imploded}' ,'{$date}') ")){
          //if data is aadded successfully echo successUpload
          echo "successUpload";
  
        }else{echo "Something went wrong, Please try again";} //if data not added to database
      }else{echo 'Please choose allowed files to download';} //if the there is some files no allowed (the two arrays not equal)
    }else{echo "Please fill all fields.";}
  }else{echo "Please fill out all fields!. Add at least one Image.";}

?>