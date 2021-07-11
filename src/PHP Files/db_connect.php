<?php

  $conn = mysqli_connect('localhost','root', '', 'ultras');
  if(!$conn){
    throw new Exception('failed to connect to db');
    exit();
  }

?>