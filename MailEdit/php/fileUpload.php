<?php

$dir="../images/";


if(file_exists("../images/images.json")){
	$json = json_decode(file_get_contents("../images/images.json"), true);
}else{
	$json=array();
}

$file=$_FILES["file"];
print_r($_FILES);
$type=explode("/", $file["type"])[1];		
move_uploaded_file($file["tmp_name"], $dir. $_POST["id"].".$type");

$json[]=array(
	"type"=>$type,
	"filename"=>$_POST['id']
);

$data = $_POST['thumbnail'];

$uri =  substr($data,strpos($data,",")+1);
$file ="../images/thumbnails/".$_POST['id']. '.png';

file_put_contents($file, base64_decode($uri));

// return the filename
print_r($json);

file_put_contents("../images/images.json", json_encode($json));	
?>
