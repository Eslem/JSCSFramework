<?php
	function save(){
		$name=$_POST['name'];
		$resp= shell_exec("renderHtml.bat $name");

		$html=$_POST['html'];

		echo $html;
	}
	
	function remove(){
		$name=$_POST['name'];
		unlink("../pages/$name.html");
	}

	$wth=$_POST['wth'];

	if($wth=='save'){
		save();
	}else if($wth=='remove'){
		remove();
	}
?>
