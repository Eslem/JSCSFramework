<?php
	require('connect.php');


	function loadMenus(){
		$sql="SELECT * FROM menus";
		$json=queryToJSON(ejec($sql));
		header("Content-type:application/json");
		echo $json;
	}

	function savemenu(){
		$nombre=$_POST['nombre'];
		$tipo=$_POST['tipo'];
		$clases=str_replace(",", " ",$_POST['clase']);
		$elementos=array();		

		$izq=null;
		if(!empty($_POST['left'])){
			$izq=explode(",", $_POST['left']);
			$i=0;
			foreach($izq as $elem){
				$el=array();
				$elem=explode("|", $elem);
				$el['text']=$elem[0];
				$el['link']=$elem[1];
				$el['type']=$elem[2];
				$el['className']=$elem[3];
				$izq[$i]=$el;		
				$i++;
			}
		}

		$der=null;
		if(!empty($_POST['right'])){
			$der=explode(",", $_POST['right']);
			$i=0;
			foreach($der as $elem){
				$el=array();
				$elem=explode("|", $elem);
				$el['text']=$elem[0];
				$el['link']=$elem[1];
				$el['type']=$elem[2];
				$el['className']=$elem[3];
				$der[$i]=$el;		
				$i++;
			}
		}

		$elementos['name']=$nombre;
		$elementos['type']=$tipo;
		$elementos['className']=$clases;
		if(!empty($izq))	$elementos['left']=$izq;
		if(!empty($der))	$elementos['right']=$der;

		echo json_encode($elementos);
	}


	$wth=$_POST['wth'];

	if($wth=="loadMenus"){
		loadMenus();
	}elseif($wth=="saveMenu"){
		savemenu();
	}
?>
