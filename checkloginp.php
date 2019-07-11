<?php
ini_set('display_errors', 'Off');
//include_once('../connect.php');
include_once ('mysql_connect.php');



session_start();

$vcode = strtoupper($_SESSION['VerifyCode']);
if ($_POST['act']==""){}else{
	if ($_POST['password'] == "exit") {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户登录失败！！'));
		echo urldecode(json_encode($arr));
		return;
	}
}

if (strtoupper($_SESSION['VerifyCode']) != strtoupper($_POST['VerifyCode'])) {
	$arr['success'] = true;
	$arr['data'] = array('userid' => -1, 'username' => urlencode('1 验证码错误！'));
	echo urldecode(json_encode($arr));
	return;
}

$act = $_POST['act'];
if (!$act) {
	$act = $_GET['act'];
}
// echo  'act='.$act;

$act = strtolower($act);
$retval = '';
switch($act) {

	case 'systemsetting' :
		$retval = systemsetting();
		break;
	case 'changepassword' :
		$retval = changepassword();
		break;
	case 'vipuseractive' :
		$retval = vipuseractive();
		break;

		
	case 'vipsystemlogin' :
		$retval = vipsystemlogin();
		break;


	default :
		$retval = sysuserlogin();
		break;
}
echo $retval;
return;
function vipsystemlogin() {
	$id = $_POST['username'];

	$arr['success'] = true;
	$arr['data'] = array('userid' => $id);
	return urldecode(json_encode($arr));
}

function systemsetting() {

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
	$query = mysql_query($sqlstr);

	if ($query) {
		while ($row = mysql_fetch_array($query)) {
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

function sysuserlogin() {
     
	$p_l_id = $_POST['p_l_id'];
	$sysguid = $_POST['sys_guid'];
	$p_khid = $_POST['p_khid'];
	$username = $_POST['username'];
	$userid =(int)$_POST['username'];
	//return $userid;
	$userpsw =base64_encode($_POST['password']);


	//if ($username=="")
	//	{
	//		$sqlstr = "select u.c_id as userid,'system' as username ,0 as edit,0 as sh,0 as del,0 as cwsh,	0 as new ,'' as lidstring,1 as khsystem,0 as lastdel from customer  u where u.active=1 and c_id=".$p_khid." and password='".$userpsw."'";
	
	//	}
	//	else
	//	{
			if ($p_khid == "0") {
				$sqlstr = "select u.userid,u.username,u.lastdel,t.edit,t.sh,t.del,t.cwsh,t.new,U.lidstring,0 as khsystem,u.smsactive,u.locked,option_min_date(".$p_l_id.") AS minrq  from users u ,usertype t
				where t.typeid=u.typeid and u.active=1 ";
			} 
			else 
			{
				$sqlstr = "select u.*,0 as khsystem ,option_min_date(".$p_l_id.") AS minrq from khusers u where u.active=1  and u.khid=" . $p_khid;

			}	
			//if ($userid>0){
				//$sqlstr .= " and  u.userid=" . $userid ;
				$sqlstr .= " and ( u.userid=" . $userid . " or  u.username='" . $username . "') ";
			//}else{
		//		$sqlstr .= " and   u.username='" . $username . "' ";

		//	}
			//$sqlstr .= " and ( u.userid=" . $userid . " or  u.username='" . $username . "') ";
    		
			$sqlstr .= " and  u.password='" . $userpsw . "'";
	//}
	$id = 0;
	$locked = 0;
	$name = "";
	$minrq = "";
	$lidstring = "";
	$sh = 0;

	$cwsh = 0;
	$edit = 0;
		$smsactive = 0;
	$del = 0;
	$lastdel = 0;
	$new = 0;
	$khsystem=0;
	$E_name = "";
	//return $sqlstr;
	$sqlstr1 = "";
	
	$query = mysql_query($sqlstr);
    
	if ($query) {
		while ($row = mysql_fetch_array($query)) {
			$id =(int)$row['userid'];
			$locked =(int)$row['locked'];
			$name = $row['username'];
			$del = $row['del'];
			$minrq = $row['minrq'];
			$lastdel = $row['lastdel'];
			$sh = $row['sh'];
			$cwsh = $row['cwsh'];
			$edit = $row['edit'];
			$smsactive=$row['smsactive'];
			$khsystem = $row['khsystem'];
			$lidstring = $row['lidstring'];
			$new = $row['new'];
			break;
		}
	}

	if ($id <1) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户ID或用户名称或密码错误，登录失败！！！ '));
		return urldecode(json_encode($arr));
	} 
	if ($locked>0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('此用户已被锁，请系统管理员解锁后再登录！！！'));
		return urldecode(json_encode($arr));
	}

	if ($smsactive==0)
	{
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('请用户先激活再进行登录操作！！！ '));
		return urldecode(json_encode($arr));
	}

	
		$arr['success'] = true;
		$arr['data'] = array('userid' => $id, 'username' => urlencode($name), 'lidstring' => $lidstring,'sh' => $sh, 'cwsh' => $cwsh, 'edit' => $edit, 'del' => $del, 'lastdel' => $lastdel, 'new' => $new, 'khsystem' => $khsystem,'mindate' => $minrq);
		if ($username=="")
		{}else{
			if ($p_khid == "0") {
				$sqlstr1 = "update users ";
			} else {
				$sqlstr1 = "update khusers ";
			}
			$sqlstr1 .= " set logincount=logincount+1,lastlogin=now(),locked=0,loginguid='".$sysguid."' where userid=" . $id;
		
			$query = mysql_query($sqlstr1);
		}
	
	return urldecode(json_encode($arr));

	//$arr['success'] = true;
	//	$arr['data'] = array('userid' => 1, 'username' => 'lfy');
	//	return urldecode(json_encode($arr));
}

function changepassword() {
	$p_l_id = $_POST['p_l_id'];
	$p_khid =(int)$_POST['p_khid'];
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
//	$userid =(int)$_POST['username'];
	$userpsw =base64_encode($_POST['password']);

if (($username == "system") && ($p_khid>0))
{
	$sqlstr = "select u.c_id as userid  from customer u  
	where u.active=1 and u.C_id=" . $p_khid;
	$sqlstr .= " and  u.password='" . $userpsw . "'";


}
else
{
	if ($p_khid == 0) {
		$sqlstr = "select u.userid,u.username ,t.edit,t.sh,t.del,t.system from users u ,usertype t
		where t.typeid=u.typeid and u.active=1 " ;
	} else {
		$sqlstr = "select u.* from khusers u  
		where u.active=1 and u.khid=" . $p_khid;
	}
	//$sqlstr .= " and ( u.userid=" . $userid . " or  u.username='" . $username . "') ";
	$sqlstr .= " and  u.userid=" . $userid ;
	$sqlstr .= " and u.smsactive=1 and  u.password='" . $userpsw . "'";
}
	$id = "0";
	$query = mysql_query($sqlstr);
	if ($query) {
		while ($row = mysql_fetch_array($query)) {
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
if (($username == "system") && ($p_khid>0))
{
		$sqlstr = "update customer set password='" . base64_encode($psw2). "' where C_id=" . $userid;
}
else
{

	if ($p_khid == 0) {
		$sqlstr = "update users set password='" . base64_encode($psw2). "' where userid=" . $userid;
	} else {
		$sqlstr = "update khusers set password='" . base64_encode($psw2) . "' where userid=" . $userid;
	}
}
	$query = mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户更改密码失败！！！ ' ));
	} else {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 1, 'username' => urlencode('用户更改密码成功！！！ ' ));
	}
	return urldecode(json_encode($arr));
}

function vipuseractive() {
	$p_l_id = $_POST['p_l_id'];
	$p_khid =(int)$_POST['p_khid'];
	
	$userid =(int)$_POST['userid'];
	$khid = (int)$_POST['khid'];

	$psw1 = $_POST['newpassword1'];
	$psw2 = $_POST['newpassword2'];

	if ($userid == 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('提交数据内容出错！ '));
		return urldecode(json_encode($arr));
	}

	if ($psw1 != $psw2) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('前后新密码不一致！！！ '));
		return urldecode(json_encode($arr));

	}

	$userpsw =base64_encode($psw1);


	$sqlstr = "";
	if ($khid == 0) {
		$sqlstr = "update users set smsactive=1,password='" . $userpsw. "' where userid=" . $userid;
	} else {
		$sqlstr = "update khusers set smsactive=1, password='" . $userpsw . "' where userid=" . $userid;
	}
	$query = mysql_query($sqlstr);

	if (mysql_errno() > 0) {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户激活密码失败！！！ ' ));
	} else {
	
	
	
	
			if ($khid == "0") {
				//$sqlstr = "select u.userid,u.username,u.lastdel,t.edit,t.sh,t.del,t.cwsh,t.new,U.lidstring,0 as khsystem 
				//from users u ,usertype t where t.typeid=u.typeid and u.active=1 ";

				$sqlstr ="select u.userid,u.username,u.lastdel,t.edit,t.sh,t.del,t.cwsh,t.new,U.lidstring,0 as khsystem from users u ,usertype t where t.typeid=u.typeid and u.active=1 ";
			} 
			else 
			{
				$sqlstr = "select u.*,0 as khsystem from khusers u where u.active=1 " ;

			}	
			$sqlstr .= " and  u.userid=" . $userid ;
    		


    $id = "0";
	$name = "";
	$lidstring = "";
	$sh = 0;
	$cwsh = 0;
	$edit = 0;
	$del = 0;
	$lastdel = 0;
	$new = 0;
	$khsystem=0;
	$E_name = "";
	
	$sqlstr1 = "";
	$query = mysql_query($sqlstr);
	if ($query) {
		while ($row = mysql_fetch_array($query)) {
			$id = $row['userid'];
			$name = $row['username'];
			$del = $row['del'];
			$lastdel = $row['lastdel'];
			$sh = $row['sh'];
			$cwsh = $row['cwsh'];
			$edit = $row['edit'];
			$khsystem = $row['khsystem'];
			$lidstring = $row['lidstring'];
			$new = $row['new'];
			break;
		}
	

	$arr['success'] = true;
	$arr['data'] = array('userid' => $id, 'username' => urlencode($name), 'lidstring' => $lidstring,'sh' => $sh, 'cwsh' => $cwsh, 'edit' => $edit, 'del' => $del, 'lastdel' => $lastdel, 'new' => $new, 'khsystem' => $khsystem);
	}else
	{
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('用户激活密码失败！！！ ' ));
	}

	}
	return urldecode(json_encode($arr));
}

?>