<?php  
  require_once '../db_connect.php';
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: POST ");
  header("Access-Control-Allow-Headers: * ");

  //data from form request 
  $username = mysqli_real_escape_string($conn, filter_var($_POST['username'], FILTER_SANITIZE_STRING));
  $email = mysqli_real_escape_string($conn, filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
  $password   = mysqli_real_escape_string($conn, filter_var($_POST['password'], FILTER_SANITIZE_STRING));
  $member_unique_id = time() . rand(1, 100000);
  $avatar_img_name = $_FILES['avatar']['name'];
  $avatar_img_tmp_name = $_FILES['avatar']['tmp_name'];
  $avatar_img_error = $_FILES['avatar']['error'];
  //hash password
  $hashed_pass = password_hash($password, PASSWORD_DEFAULT);
  //avataar img parameters
  $allowed_extn = ["jpg", "png", "jpeg"]; //set array of allowed avatar img extenstions
  $random_img_name = time() . rand(1, 10000) . $avatar_img_name;  //set random avatar img name
  //get the extension of the added avatar img
  $explode = explode('.', $avatar_img_name);  //divise image name to an array 
  $avatar_img_extn = strtolower(end($explode)); //the aavatar img extension

  //check on fields
  if(!empty($username) && !empty($email) && !empty($password)){
    //check if email is valid
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
      //check if email is exist in database
      $sql = mysqli_query($conn, " SELECT `member_mail` FROM `members` WHERE `member_mail` = '{$email}' ");
      if(mysqli_num_rows($sql) < 1){  //if email is not exist
        //check on username must be > 3 letters and unique
        $sql2 = mysqli_query($conn, " SELECT `member_name` FROM `members` WHERE `member_name` = '{$username}' ");
        if(mysqli_num_rows($sql2) < 1 ){ //if username is not exist
          if(strlen($username) > 3){  //if username length is > 3
            //check if password is too short
            if(strlen($password) > 5){
              //check if exists avatar img => upload image to db
              if(isset($_FILES['avatar']) && !empty($avatar_img_name) && $avatar_img_error != UPLOAD_ERR_NO_FILE){
                //check if file extension is allowed
                if(in_array($avatar_img_extn ,$allowed_extn)){
                  //move image to folder avatar uploads and add data to database
                  if(move_uploaded_file($avatar_img_tmp_name, '../avatar_uploads/' . $random_img_name)){
                    //add data to database
                    $sql3 = mysqli_query($conn, " INSERT INTO `members`(`member_id`, `member_unique_id`, `member_name`, `member_mail`, `member_pass`, `member_img`)
                                                  VALUES('', '{$member_unique_id}', '{$username}', '{$email}', '{$hashed_pass}', '{$random_img_name}') " );
                    if($sql3){  //chech if daata inserted into taable => start session to this member and echo seccess
                      $sql4 = mysqli_query($conn, " SELECT * from `members` WHERE `member_mail` = '{$email}' "); //check on this user data
                      if(mysqli_num_rows($sql4) > 0){  //if data of this user exist in database
                        $row = mysqli_fetch_assoc($sql4);
                        //Start SEssion with this user unique id
                        $_SESSION['member_unique_id'] = $row['member_unique_id'];
                        //echo success message to manage with javascript
                        echo "success_signup";

                      }else{echo "Something went wrong!";}
                    }else{echo "Something went wrong!";}
                  }else{echo "Something went wrong!";}
                }else{echo "Your Profile image must be of type JPG, PNG or JPEG";}
              }else{  //if user dont add an image profil we'll give him a user icon
                //add data to database
                $sql5 = mysqli_query($conn, " INSERT INTO `members`(`member_id`, `member_unique_id`, `member_name`, `member_mail`, `member_pass`, `member_img`)
                                              VALUES('', '{$member_unique_id}', '{$username}', '{$email}', '{$hashed_pass}', '' ) " );
                if($sql5){  //chech if daata inserted into taable => start session to this member and echo seccess
                  $sql6 = mysqli_query($conn, " SELECT * from `members` WHERE `member_mail` = '{$email}' "); //check on this user data
                  if(mysqli_num_rows($sql6) > 0){  //if data of this user exist in database
                    $row = mysqli_fetch_assoc($sql6);
                    //Start SEssion with this user unique id
                    $_SESSION['member_unique_id'] = $row['member_unique_id'];
                    //echo success message to manage with javascript
                    echo "success_signup";
                    
                  }else{echo "Something went wrong!";}
                }else{echo "Something went wrong!";}
              }
            }else{echo "Password is Too short!";}
          }else{echo "Username must be at least 4 characters.";}
        }else{echo "Username is already exist!\nPlease Enter an other one.";}
      }else{echo "Email is already exist!\nPlease Enter an other one.";}
    }else{echo "Please enter a valid Email !";}
  }else{ echo "Username, Email and Password Fields are requied !";}
?>