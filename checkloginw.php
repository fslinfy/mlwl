<?php
ini_set('display_errors', 'Off');
//include_once('../connect.php');
//include_once ('mysqli_connect.php');

$link = mysqli_connect('gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 'root', 'lfy670313', 'wms');

if (!$link) {
	printf("Can't connect to MySQL Server. Errorcode: %s ", mysqli_connect_error());
	exit ;
}

session_start();

/*
 $vcode = strtoupper($_SESSION['VerifyCode']);
 if ($_POST['act']==""){}else{
 if ($_POST['password'] == "exit") {
 $arr['success'] = true;
 $arr['data'] = array('userid' => 0, 'username' => '用户登录失败！！');
 echo json_encode($arr);
 return;
 }
 }

 if (strtoupper($_SESSION['VerifyCode']) != strtoupper($_POST['VerifyCode'])) {
 $arr['success'] = true;
 $arr['data'] = array('userid' => -1, 'username' => '1 验证码错误！');
 echo json_encode($arr);
 return;
 }
 */
$act = $_POST['act'];

if (!$act) {
	$act = $_GET['act'];
}

$act = strtolower($act);
$retval = '';
switch($act) {
	case 'systemsetting' :
		$retval = systemsetting($link);
		break;
	case 'changepassword' :
		$retval = changepassword($link);
		break;
	case 'vipuseractive' :
		$retval = vipuseractive($link);
		break;
	case 'vipsystemlogin' :
		$retval = vipsystemlogin($link);
		break;

	default :
		$retval = sysuserlogin($link);
		break;
}
echo $retval;
return;
function vipsystemlogin($link) {
	$id = $_POST['username'];

	$arr['success'] = true;
	$arr['data'] = array('userid' => $id);
	return urldecode(json_encode($arr));
}

function systemsetting($link) {

	$appid = $_POST['appid'];
	$E_code = $_POST['systemcode'];
	$systemid = $_POST['systemid'];

	if ($appid == "1") {
		$sqlstr = "select a.L_id as id ,a.L_name as name,e.E_code,e.E_name,a.areas 
		from location a,enterprise e
		where  a.E_code=e.E_code and a.active=1 and  a.l_id=" . $systemid;
	} else {
		$sqlstr = "select c_id as id ,C_name as name ,e.E_code,e.E_name,1 as areas 
		from customer a,enterprise e
		where a.E_code=e.E_code and a.active=1 and a.c_id=" . $systemid;
	}
	$sqlstr .= " and a.E_code='" . $E_code . "'";

	$id = "0";
	$areas = "1";
	$name = "";

	$E_name = "";
	//return $sqlstr;
	$query = mysqli_query($link,$sqlstr);

	if ($query) {
		while ($row = mysqli_fetch_array($query)) {
			$id = $row['id'];
			$name = $row['name'];
			$E_name = $row['E_name'];
			$E_code = $row['E_code'];
			$areas = $row['areas'];
			break;
		}
	}
	if ($id == "0") {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('数据设置失败！！！ '));

	} else {
		$arr['success'] = true;
		$arr['data'] = array('userid' => $id, 'username' => urlencode($name), 'E_code' => $E_code, 'E_name' => urlencode($E_name), 'areas' => $areas, 'appid' => $appid);
	}

	return urldecode(json_encode($arr));
}

function sysuserlogin($link) {

	$p_khid = (int)$_GET['khid'];
	$username = $_GET['username'];

	$userid = (int)$username;
	//return "0 ".$username.'   id='.$userid ;
	$wxname = $_GET['nickName'];
	$userpsw = base64_encode($_GET['password']);

	//$sqlstr = "select u.*,0 as khsystem from khusers u where u.active=1  and u.khid=" . $p_khid;

	//	return "1   ".$sqlstr;
	///	$sqlstr .= " and ( u.userid=" . $userid . " or  u.username='" . $username . "') ";
	//return "2   ".$sqlstr;
	$sqlstr = "select u.*,0 as khsystem,customer.C_name as khmc from khusers u,customer  where customer.C_id=u.khid and u.active=1  ";
	$sqlstr .= " and  u.userid=" . $userid;

	$sqlstr .= " and  u.password='" . $userpsw . "'";
	//return $sqlstr;
	$id = "0";
	$name = "";
	$lidstring = "";
	$sh = 0;
	$cwsh = 0;
	$edit = 0;
	$smsactive = 0;
	$del = 0;
	$lastdel = 0;
	$new = 0;
	$khsystem = 0;
	$E_name = "";
	$khmc = "";

	$sqlstr1 = "";
	$query = mysqli_query($link, $sqlstr);

	if ($query) {
		while ($row = mysqli_fetch_array($query)) {
			$id = (int)$row['userid'];
			$name = $row['username'];
			$del = $row['del'];
			$lastdel = $row['lastdel'];
			$sh = $row['sh'];
			$cwsh = $row['cwsh'];
			$edit = $row['edit'];
			$khmc = $row['khmc'];
			$khid = $row['khid'];
			$smsactive = $row['smsactive'];
			$khsystem = $row['khsystem'];
			$lidstring = $row['lidstring'];
			$new = $row['new'];
			break;
		}
	}
	if ($id < 1) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户ID或用户名称或密码错误，登录失败！！！ '));
		return urldecode(json_encode($arr));
	}

	if ($smsactive == 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('请用户先激活再进行登录操作！！！ '));
		return urldecode(json_encode($arr));
	}

	$arr['success'] = true;
	$arr['data'] = array('userid' => $id, 'username' => urlencode($name), 'lidstring' => $lidstring, 'sh' => $sh, 'cwsh' => $cwsh, 'edit' => $edit, 'khid' => $khid, 'khmc' => $khmc, 'del' => $del, 'lastdel' => $lastdel, 'new' => $new, 'khsystem' => $khsystem);

	$sqlstr1 = "update khusers ";
	$sqlstr1 .= " set logincount=logincount+1,lastlogin=now(),locked=0,loginguid='" . $wxname . "' where userid=" . $id;

	$query = mysqli_query($link,$sqlstr1);

	return urldecode(json_encode($arr));

}

function changepassword($link) {
	$p_l_id = $_POST['p_l_id'];
	$p_khid = (int)$_POST['p_khid'];
	$userid = $_POST['userid'];
	$id = (int)$_POST['userid'];
	$psw1 = $_POST['newpassword1'];
	$psw2 = $_POST['newpassword2'];
	if ($id == 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('提交数据内容出错！ '));
		return urldecode(json_encode($arr));

	}
	if ($psw1 != $psw2) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('前后新密码不一致！！！ '));
		return urldecode(json_encode($arr));

	}

	$username = $_POST['username'];
	$userid = (int)$_POST['username'];
	$userpsw = base64_encode($_POST['password']);

	if (($username == "system") && ($p_khid > 0)) {
		$sqlstr = "select u.c_id as userid  from customer u  
	where u.active=1 and u.C_id=" . $p_khid;
		$sqlstr .= " and  u.password='" . $userpsw . "'";

	} else {
		if ($p_khid == 0) {
			$sqlstr = "select u.userid,u.username ,t.edit,t.sh,t.del,t.system from users u ,usertype t
		where t.typeid=u.typeid and u.active=1 and u.L_id=" . $p_l_id;
		} else {
			$sqlstr = "select u.* from khusers u  
		where u.active=1 and u.khid=" . $p_khid;
		}
		$sqlstr .= " and ( u.userid=" . $userid . " or  u.username='" . $username . "') ";
		$sqlstr .= " and u.smsactive=1 and  u.password='" . $userpsw . "'";
	}
	$id = "0";
	$query = mysqli_query($link,$sqlstr);
	if ($query) {
		while ($row = mysqli_fetch_array($query)) {
			$id = $row['userid'];
			break;
		}
	}

	if ($id == "0") {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户原密码或名称输入错误！！！ '));
		return urldecode(json_encode($arr));

	}

	$sqlstr = "";
	if (($username == "system") && ($p_khid > 0)) {
		$sqlstr = "update customer set password='" . base64_encode($psw2) . "' where C_id=" . $userid;
	} else {

		if ($p_khid == 0) {
			$sqlstr = "update users set password='" . base64_encode($psw2) . "' where userid=" . $userid;
		} else {
			$sqlstr = "update khusers set password='" . base64_encode($psw2) . "' where userid=" . $userid;
		}
	}
	$query = mysqli_query($link,$sqlstr);
	if (mysqli_errno() > 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户更改密码失败！！！ '));
	} else {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 1, 'username' => urlencode('用户更改密码成功！！！ '));
	}
	return urldecode(json_encode($arr));
}

function vipuseractive($link) {
	$p_l_id = $_GET['p_l_id'];

	$p_khid = (int)$_GET['khid'];
	$userid = (int)$_GET['userid'];
	$khid = (int)$_GET['khid'];
	$vcode = $_GET['vcode'];
	$psw = $_GET['password'];
	$wxname = $_GET['nickName'];
	$wxlogin = $_GET['wxlogin'];

	$arr = array();
	if (($userid == 0) || (!$psw)) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('提交数据内容出错！ '));
		return urldecode(json_encode($arr));
	}


	$userpsw = base64_encode($psw);

	$sqlstr = "";
	///if ($khid == 0) {
	//	$sqlstr = "update users set smsactive=1,password='" . $userpsw. "' where userid=" . $userid;
	//} else {
	$sqlstr = "update khusers set smsactive=1, password='" . $userpsw . "',wxname='" . $wxname . "', wxautologin=" . $wxlogin . " where userid=" . $userid;
	//}

	$query = mysqli_query($link,$sqlstr);

	if (mysqli_errno() > 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户激活失败！！！ ') . $sqlstr);
		return urldecode(json_encode($arr));

	}

	//if ($khid == "0") {
	//$sqlstr = "select u.userid,u.username,u.lastdel,t.edit,t.sh,t.del,t.cwsh,t.new,U.lidstring,0 as khsystem
	//from users u ,usertype t where t.typeid=u.typeid and u.active=1 ";

	//	$sqlstr ="select u.userid,u.username,u.lastdel,t.edit,t.sh,t.del,t.cwsh,t.new,U.lidstring,0 as khsystem from users u ,usertype t where t.typeid=u.typeid and u.active=1 ";
	//}
	//else
	//	{
	$sqlstr = "select u.*,0 as khsystem,customer.c_name as khmc from khusers u,customer  where customer.c_id=u.khid and  u.active=1 ";

	//	}
	$sqlstr .= " and  u.userid=" . $userid;

	$id = "0";
	$name = "";
	$lidstring = "";
	$sh = 0;
	$cwsh = 0;
	$edit = 0;
	$del = 0;
	$lastdel = 0;
	$new = 0;
	$khsystem = 0;
	$E_name = "";
	$khmc = "";
	$sqlstr1 = "";
	$query = mysqli_query($link,$sqlstr);
	if ($query) {
		while ($row = mysqli_fetch_array($query)) {
			$id = $row['userid'];
			$name = $row['username'];
			$del = $row['del'];
			$lastdel = $row['lastdel'];
			$sh = $row['sh'];
			$khmc = $row['khmc'];
			$cwsh = $row['cwsh'];
			$edit = $row['edit'];
			$khsystem = $row['khsystem'];
			$lidstring = $row['lidstring'];
			$new = $row['new'];
			break;
		}

		$arr['success'] = true;
		$arr['data'] = array('userid' => $id, 'username' => urlencode($name), 'lidstring' => $lidstring, 'sh' => $sh, 'cwsh' => $cwsh, 'edit' => $edit, 'del' => $del, 'lastdel' => $lastdel, 'new' => $new, 'khmc' => $khmc, 'khsystem' => $khsystem);
	} else {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户激活失败！'));
	}

	return urldecode(json_encode($arr));
}
?>