<?php
ini_set('display_errors', 'Off');

$link = mysqli_connect('gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 'root', 'lfy670313', 'lfy');

if (!$link) {
	printf("Can't connect to MySQL Server. Errorcode: %s ", mysqli_connect_error());
	exit ;
}

session_start();
$retval = getsixhm($link);
echo $retval;
return;


function getsixhm($link) {

	$selhm= $_GET['selhm'];
	$sqlstr = " call selectsixhm('".$selhm."')";
	$rows=0;
	$query = mysqli_query($link,$sqlstr);
if ($query)	
{
	$my_array1 = array();
	while ($row = mysqli_fetch_array($query)) {
		$my_array = array();

		$rows=$rows+1;
		$fields=mysqli_num_fields($query); 
		for ($i =0; $i < $fields; $i++) {
			$field_info =mysqli_fetch_field_direct($query, $i);
			$newvar = $row[$field_info->name];
			$my_array[$field_info->name] = urlencode($newvar);
		};
		array_push($my_array1, $my_array);
	}
	if ($rows==0){
		$arr['rows']=array();
	}else
	{
		$arr['rows']=$my_array1;

	}
} 
else 
{
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}

	return urldecode(json_encode($arr));
	return json_encode($arr);
}


?>