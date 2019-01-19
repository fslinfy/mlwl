<?php

header('Access-Control-Allow-Origin:*');

/*
 ob_start();
 header('Access-Control-Allow-Methods:GET,POST');
 header('content-type: application/json; charset=utf-8');

 */
 /*
$host="localhost:3306";
 $db_user="root";
 $db_pass="670313";
 */

$host = "gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689";
$db_user = "root";
$db_pass = "lfy670313";

$db_name = "wms";
$timezone = "Asia/Shanghai";

define('CLIENT_MULTI_RESULTS', 131072);
$link = mysql_connect($host, $db_user, $db_pass, 1, CLIENT_MULTI_RESULTS) or die("Could not connect: " . mysql_error());
mysql_select_db($db_name, $link) or die("Could not select database");
mysql_query("SET names UTF8");

date_default_timezone_set($timezone);
//北京时间

$sqlstr = "select L_name from location ";

$query = mysql_query($sqlstr);
//echo $query;
if ($query) {
	//if (mysql_numrows($query) > 0) {
		while ($row = mysql_fetch_array($query)) {
			echo $row[mysql_field_name($query,0)];
		}
	//}
}
echo '0';
?>
