<?php
function saveError($txt){
	$fecha=date("Y-m-d_h:m");
	$content = "Log: $fecha"."\r\n".$txt;
	$fechaU=date("U");

	if(!file_exists("log"))	mkdir("log");

	$fp = fopen("log/LogMail_$fecha.txt","wb");
	fwrite($fp,$content);
	fclose($fp);
}
function sendMessage($from, $to, $subj, $html){
	$headers = "From:$from\r\n";
	$headers .= "Reply-To: $from\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

	$message='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>Responsive email</title>
	<style type="text/css">
	body {margin: 10px 0; padding: 0 10px;  font-size: 13px;
	width:600px}
	table {border-collapse: collapse;}
	td {font-family: arial, sans-serif; color: #333333;}

	@media only screen and (max-width: 480px) {
	body,table,td,p,a,li,blockquote {
	-webkit-text-size-adjust:none !important;
	}
	table {width: 100% !important;}

	.responsive-image img {
	height: auto !important;
	max-width: 100% !important;
	width: 100% !important;
	}
	}
	</style>
	<link href="http://www.slemframework.alzatezabala.com/framework/framework.css" rel="stylesheet">
	</head>
	<body>
	'.$html.'				
	</body>
	</html>';

	if(!mail($to,$subj,$message,$headers)){
		saveErro("error enviando mail a $to : \r\n $message");
	}
}
?>
