<?php
  $name=$_POST['name'];
  $resp= shell_exec("renderHtml.bat $name");
  
  $html=$_POST['html'];
  
  
  
  echo $html;
?>
