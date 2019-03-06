<?php
ini_set('display_errors', 'Off');
$act = $_GET["act"];
if ($act == "imgdelete") {
	$result = imgdelete();
} else {
	$result = imgupload();
}
echo $result;
return;

function imgupload() {
    $isNoImage=0;
	if ($_FILES["file"]["error"] > 0) {

		//$error = $_FILES["file"]["error"];
		//$response = array('success' => false, 'msg' => $error);
		//echo json_encode($response);
		//return;
		$isNoImage=1;
	}
	if (!isset($_FILES['file'])) {
		//echo json_encode(array("success" => false, 'msg' => "Not get Imgfile"));
		//return;
		$isNoImage=1;
	}
if ($isNoImage<1){
	$newfilename = $_POST["fileguid"];
	$file_name = $_FILES["file"]["name"];
	$file_type = $_FILES["file"]["type"];
	$file_size = round($_FILES["file"]["size"] / 1024, 2) . "  Kilo Bytes";

	//$response = array('success' => true, 'data' => array('name' => $file_name, 'size' => $file_size,'guid'=>$newfilename ), 'msg' => 'File Uploaded successfully');
	//echo json_encode($response);

	//echo $newfilename;
	//return;

	$ext_file_name = "";

	switch ($file_type) {
		case 'image/pjpeg' :
			$okType = true;
			$ext_file_name = ".jpg";
			break;
		case 'image/jpeg' :
			$okType = true;
			$ext_file_name = ".jpg";
			break;
		case 'image/gif' :
			$okType = true;
			$ext_file_name = ".gif";
			break;
		case 'image/png' :
			$okType = true;
			$ext_file_name = ".png";
			break;
	}

	if (!$okType) {
		echo json_encode(array("success" => false, 'msg' => "Not  image "));
		return;
	}

	$temp_file_name = $newfilename . $ext_file_name;

	if (file_exists("uploadFiles/" . $_FILES["file"]["name"])) {
		//echo $temp_file_name . " already exists. ";
		$response = array('success' => false, 'msg' => '文件已存在！');
	} else {
		move_uploaded_file($_FILES["file"]["tmp_name"], "uploadFiles/" . $temp_file_name);
		$response = array('success' => true, 'msg' => '文件上传成功！');
	}

    $info=getimagesize("uploadFiles/" . $temp_file_name);     
    $width=$info[0];//目标图片宽度     
    $height=$info[1];//目标图片高度   
    
    }else
	{

	$info=0;     
    $width=0;
    $height=0;
	$file_name ="";
	$temp_file_name;
	}

	//ini_set('display_errors', 'Off');

	include_once ('mysql_connect.php');

	$dhlb = $_POST['dhlb'];
	$dhid = $_POST['dhid'];
	//$imgnote = $_POST['imgnote'];
	$imgnote = $_POST['notedata'];
	$sqlstr = "insert into uploadimages (dhlb,dhid,imgnote,filename,fileguid,w,h)value ('";
	$sqlstr .= $dhlb . "'," . $dhid . ",'" . $imgnote . "','" . $file_name . "','" . $temp_file_name. "'," . $width. "," . $height . ")";
	$query = mysql_query($sqlstr);
	$id = mysql_insert_id();
	if ($id > 0) {
		$response = array('success' => true, 'msg' => '文件上传成功！', 'id' => $id, 'filename' => $file_name, 'fileguid' => $temp_file_name, 'imgnote' => $imgnote, 'w' => $width, 'h' => $height);

	}
	return json_encode($response);
}

function imgdelete() {
	ini_set('display_errors', 'Off');
	include_once ('mysql_connect.php');
	$file="";
	$imgid = $_GET["imgid"];
	$imgfile = $_GET["imgfile"];
	$sqlstr = "delete from  uploadimages  where id=" . $imgid;
	$response = array('success' => false, 'msg' => '文件删除失败！');
	mysql_query('start transaction');
	$query = mysql_query($sqlstr);
	if ($query) {
             
        if ($imgfile.length>0) 
		{
		$file = "uploadFiles/" . $imgfile;
		if (!unlink($file)) {
			mysql_query('rollback');
		} else {
			$response = array('success' => true, 'msg' => '文件删除成功！');
			mysql_query('commit');
		}

		}
		else
		{
			$response = array('success' => true, 'msg' => '文件删除成功！');
			mysql_query('commit');
		}


	} else {
		mysql_query('rollback');
	}
	//echo
	//return $sqlstr . $imgfile. $file ;
	return json_encode($response);
}
?>
