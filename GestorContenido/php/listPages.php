<?php
	$dir="../pages/";
  $files =scandir($dir);
  $pages=array();
  $x=0;
  foreach($files as $file){
  	if($file != "." && $file != ".." && $file != "images" && $file != "thumbnails" ){
  		$name=explode(".",$file);
  		$pages[$x]=$name[0];
  		$x++;
	}
  }
  header("Content-type:application/json");
  echo json_encode($pages);
?>
