<?php
 

header('Access-Control-Allow-Origin:*');

/*
ob_start(); 
header('Access-Control-Allow-Methods:GET,POST');  
header('content-type: application/json; charset=utf-8');
 
*/
	/*$host="localhost:3306";
	$db_user="root";
	$db_pass="670313";
	 */
	
	
	$host="gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689";
	$db_user="root";
	$db_pass="lfy670313";
	
	
	$db_name="wms";
	//$db_name="mlwl_dev";
	$timezone="Asia/Shanghai";
	
	

        
 	define('CLIENT_MULTI_RESULTS', 131072);
	$link=mysql_connect($host,$db_user,$db_pass,1,CLIENT_MULTI_RESULTS) 
	or die("Could not connect: ".mysql_error());
	mysql_select_db($db_name,$link) or die("Could not select database");
	mysql_query("SET names UTF8");

date_default_timezone_set($timezone); //北京时间

/*
	header("Content-Type: text/html; charset=utf-8");
	
	
      define('CLIENT_MULTI_RESULTS', 131072);
      $link = mysql_connect("127.0.0.1", "root", "123456",1,CLIENT_MULTI_RESULTS)   or die("Could not connect: ".mysql_error());
      mysql_select_db("wms",$link) or die("Could not select database");
		mysql_query("SET names UTF8");
        
        date_default_timezone_set($timezone); //北京时间
*/
?>
