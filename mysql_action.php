<?php
ini_set('display_errors', 'Off');
include_once ('mysql_connect.php');
// 设置此页面的过期时间(用格林威治时间表示)，只要是已经过去的日期即可。 
header ( " Expires: Mon, 26 Jul 1970 05:00:00 GMT " );
 // 设置此页面的最后更新日期(用格林威治时间表示)为当天，可以强制浏览器获取最新资料
header ( " Last-Modified:" . gmdate ( " D, d M Y H:i:s " ). "GMT " );
 
// 告诉客户端浏览器不使用缓存，HTTP 1.1 协议
 header ( " Cache-Control: no-cache, must-revalidate " );
 
 // 告诉客户端浏览器不使用缓存，兼容HTTP 1.0 协议
header ( " Pragma: no-cache " );


$act = $_GET['act'];
if (!$act) {
	$act = $_POST['act'];
}
$act = strtolower($act);
$retval = '';
session_start();
 $LoginUserName=urldecode($_SESSION['LoginUserName']);
 $LoginUserId=$_SESSION['LoginUserId'];
 //echo "非法访问！".urldecode($LoginUserName);
 //return;  
$SE=get_seo();
IF (($SE<1)  || (!$LoginUserName)  || $LoginUserName=="" )
{
	echo "非法访问！";
	return; 
}

//echo "非法访问！==".$LoginUserName;
//return; 

switch($act) {
	case 'systemsetting' :
		$retval = systemsetting();
		break;
	case 'getsqlselect' :
			$retval = getsqlselect();
			break;
	case 'cpjkdselectdata' :
		$retval = cpjkdselectdata();
		break;

	case 'menusystemnavlist' :
		$retval = menusystemnavlist();
		break;
	case 'test' :
		$retval = test();
		break;
		
	case 'cpjkdmxsave' :
		$retval = cpjkdmxsave();
		break;
	case 'cpjkdjesave' :
			$retval = cpjkdjesave();
			break;
	case 'cpckdjesave' :
			$retval = cpckdjesave();
			break;
			case 'cpghdjesave' :
				$retval = cpghdjesave();
				break;
				case 'cpgfdjesave' :
					$retval = cpgfdjesave();
					break;
		
			case 'cpgfdmxsave' :
		$retval = cpgfdmxsave();
		break;
	case 'cpgfkdmxsave' :
		$retval = cpgfkdmxsave();
		break;
		
	case 'cptzdmxsave' :
		$retval = cptzdmxsave();
		break;
	
	case 'cpckdmxcksave' :
		$retval = cpckdmxcksave();
		break;

	case 'cpghdmxcksave' :
		$retval = cpghdmxcksave();
		break;
	case 'wxcpgfdmxcksave' :
		$retval = wxcpgfdmxcksave();
		break;

		case 'cpckdmxcwcksave' :
		$retval = cpckdmxcwcksave();
		break;
		
	case 'cpxsdmxsave' :
		$retval = cpxsdmxsave();
		break;
	case 'wxcpghdmxsave' :
		$retval = wxcpghdmxsave();
		break;

	case 'cptzdywshsave' :
		$retval = cptzdywshsave();
		break;
	case 'cptzdckshsave' :
		$retval = cptzdckshsave();
		break;


	case 'cptzdcwshsave' :
		$retval = cptzdcwshsave();
		break;

	case 'cpjkdshsave' :
		$retval = cpjkdshsave();
		break;

    case 'cpjkdckshsave' :
		
		$retval = cpjkdckshsave();
		break;		 


    case 'cpckdckshsave' :
		
		$retval = cpckdckshsave();
		break;		 
		
	case 'cpjkdcwshsave' :
		$retval = cpjkdcwshsave();
		break;

	case 'wxcpgfdshsave' :
		$retval = wxcpgfdshsave();
		break;		
		case 'wxcpgfddeletesave' :
		$retval = wxcpgfddeletesave();
		break;		

		


	
	case 'cpghdghshsave' :
		$retval = cpghdghshsave();
		break;		



	case 'cpghdckshsave' :
		$retval = cpghdckshsave();
		break;		
	case 'cpghdcwshsave' :
		$retval = cpghdcwshsave();
		break;		
		
case 'cpckdshsave' :
		$retval = cpckdshsave();
		break;		

case 'cpckdcwshsave' :
		$retval = cpckdcwshsave();
		break;		
		
	case 'cpxsdshsave' :
		$retval = cpxsdshsave();
		break;
		case 'cpghdshsave' :
		$retval = cpghdshsave();
		break;

	case 'save_type_test' :
		$retval = save_type_test();
		break;

	case 'treelist' :
		$retval = treelist();
		break;

	case 'commoditytypetreelist' :
		$retval = commoditytypetreelist();
		break;
	case 'commodityselecttreelist' :
		$retval = commodityselecttreelist();
		break;
	case 'producesselecttreelist' :
		$retval = producesselecttreelist();
		break;
	case 'customerselecttreelist' :
		$retval = customerselecttreelist();
		break;
	case 'locationselecttreelist' :
		$retval = locationselecttreelist();
		break;
		
	case 'workselecttreelist' :
		$retval = workselecttreelist();
		break;

	case 'khworkselecttreelist' :
		$retval = khworkselecttreelist();
		break;
	case 'workerselecttreelist' :
		$retval = workerselecttreelist();
		break;

	case 'systemmenutreelist' :
		$retval = systemmenutreelist();
		break;

    case 'wxsystemmenutreelist' :
			$retval = wxsystemmenutreelist();
			break;
	
	case 'packingselecttreelist' :
		$retval = packingselecttreelist();
		break;

	case 'typetreelist' :
		$retval = typetreelist();
		break;

	case 'usertypetreelist' :
		$retval = usertypetreelist();
		break;

	case 'imagesload' :
		$retval = imagesload();
		break;

	case 'menusystemlist' :
		$retval = menusystemlist();
		break;
	case 'workerlist' :
		$retval = workerlist();
		break;
	case 'worklist' :
		$retval = worklist();
		break;
	case 'khworklist' :
		$retval = khworklist();
		break;

	case 'workeredit' :
		$retval = workeredit();
		break;
	case 'workedit' :
		$retval = workedit();
		break;

	case 'enterpriselist' :
		$retval = enterpriselist();
		break;
	case 'enterprisesave' :
		$retval = enterprisesave(0);
		break;
	case 'enterprisenew' :
		$retval = enterprisesave(1);
		break;
	case 'enterprisedelete' :
		$retval = enterprisesave(2);
		break;
case 'cwsjupdate' :
		$retval = cwsjupdate();
		break;
case 'cpkccwedit' :
		$retval = cpkccwedit();
		break;
case 'jobssave' :
			$retval = jobssave(0);
			break;
	


	case 'producessave' :
		$retval = producessave(0);
		break;

	case 'producesnew' :
		$retval = producessave(1);
		break;
	case 'producesdelete' :
		$retval = producessave(2);
		break;

	case 'typesave' :
		$retval = typesave(0);
		break;
	case 'typenew' :
		$retval = typesave(1);
		break;
	case 'typedelete' :
		$retval = typesave(2);
		break;
	case 'usertypeupdate' :
		$retval = usertypeupdate();
		break;
	case 'commoditytypeupdate' :
		$retval = commoditytypeupdate();
		break;

	case 'commoditytypesave' :
		$retval = commoditytypesave(0);
		break;
	case 'commoditytypenew' :
		$retval = commoditytypesave(1);
		break;
	case 'commoditytypedelete' :
		$retval = typesave(2);
		break;

	case 'cktjjdsave' :
		$retval = cktjjdsave(0);
		break;

	case 'cktjjdnew' :
		$retval = cktjjdsavenew();
		break;

	case 'locationsave' :
		$retval = locationsave(0);
		break;
	case 'locationnew' :
		$retval = locationsave(1);
		break;
	case 'locationdelete' :
		$retval = locationsave(2);
		break;

	case 'packinglist' :
		$retval = packinglist(0);
		break;


	case 'packinglist0' :
		$retval = packinglist(1);
		break;


			
	case 'executesql' :
		$retval = executesql();
		break;


	case 'packingsave' :
		$retval = packingsave(0);
		break;
	case 'packingnew' :
		$retval = packingsave(1);
		break;
	case 'packingdelete' :
		$retval = packingsave(2);
		break;

	case 'cktjjdlist' :
		$retval = cktjjdlist();
		break;

	case 'cwjetj' :
			$retval = cwjetj();
			break;
	
	case 'cwworktj' :
				$retval = cwworktj();
				break;
		
	

	case 'locationlist' :
		$retval = locationlist();
		break;


	case 'locationedit' :
		$retval = locationedit();
		break;
	case 'enterpriseedit' :
		$retval = enterpriseedit();
		break;
	case 'customeredit' :
		$retval = customeredit();
		break;
	case 'packingedit' :
		$retval = packingedit();
		break;
	case 'commoditytypeedit' :
		$retval = commoditytypeedit();
		break;

	case 'commodityedit' :
		$retval = commodityedit();
		break;

	case 'warehouseedit' :
		$retval = warehouseedit();
		break;

	case 'unitsedit' :
		$retval = unitsedit();
		break;

	case 'typeedit' :
		$retval = typeedit();
		break;

	case 'typelist' :
		$retval = typelist();
		break;
		
	case 'userslist' :
		$retval = userslist();
		break;
	case 'commoditytypelist' :
		$retval = commoditytypelist();
		break;

	case 'commoditytypelist_pc' :
		$retval = commoditytypelist_pc();
		break;
	case 'cpjkdmxlist_pc' :
		$retval = cpjkdmxlist_pc();
		break;

		case 'cpgfdmxlist_pc' :
		$retval = cpgfdmxlist_pc();
		break;
	
	case 'cptzdmxlist_pc' :
		$retval = cptzdmxlist_pc();
		break;

	case 'cpckdmxlist_pc' :
		$retval = cpckdmxlist_pc();
		break;

	case 'cpghdghmxlist_pc' :
		$retval = cpghdghmxlist_pc();
		break;
	case 'wxcpgfdgfmxlist_pc' :
		$retval = wxCpgfdgfmxlist_pc();
		break;


	case 'cpckdmxlist_prt' :
		$retval = cpckdmxlist_prt();
		break;
	case 'cpghdghmxlist_prt' :
		$retval = cpghdghmxlist_prt();
		break;	
	case 'cpjxcloc' :
		$retval = cpjxcloc();
		break;
	case 'cpjxcmxloc' :
		$retval = cpjxcmxloc();
		break;
		case 'cpjxcriloc' :
		$retval = cpjxcriloc();
		break;
		case 'loccheckcpkc' :
		$retval = loccheckcpkc();
		break;


	case 'cpjkdlist_pc' :
		$retval = cpjkdlist_pc();
		break;

	case 'cpgfdlist_pc' :
		$retval = cpgfdlist_pc();
		break;

	case 'cpjcworklist_pc' :
		$retval = cpjcworklist_pc();
		break;
	case 'cpjcttlist_pc' :
		$retval = cpjcttlist_pc();
		break;

	case 'cpdaykclist_pc' :
		$retval = cpdaykclist_pc();
		break;
	case 'cptzdlist_pc' :
		$retval = cptzdlist_pc();
		break;
		
	case 'cpckdlist_pc' :
		$retval = cpckdlist_pc();
		break;
	case 'cpghdghlist_pc' :
		$retval = cpghdghlist_pc();
		break;

	case 'cpxsdmxlist_pc' :
		$retval = cpxsdmxlist_pc();
		break;
    case 'cpghdmxlist_pc' :
		$retval = cpghdmxlist_pc();
		break;

	case 'wxcpgfdmxlist_pc' :
		$retval = wxcpgfdmxlist_pc();
		break;



	case 'cpxsdlist_pc' :
		$retval = cpxsdlist_pc();
		break;
    case 'cpghdlist_pc' :
		$retval = cpghdlist_pc();
		break;

	case 'wxcpgfdlist_pc' :
		$retval = wxcpgfdlist_pc();
		break;


	case 'cpkclist_pc' :
		$retval = cpkclist_pc();
		break;
	case 'cpkcmxlist_pc' :
		$retval = cpkcmxlist_pc();
		break;

	case 'cpjkdcwlist_pc' :
		$retval = cpjkdcwlist_pc();
		break;

	case 'cpckdcwlist_pc' :
		$retval = cpckdcwlist_pc();
		break;
	case 'cpghdcwlist_pc' :
		$retval = cpghdcwlist_pc();
		break;


	case 'worklist0' :
		$retval = worklist0();
		break;

	case 'worksave' :
		$retval = worksave(0);
		break;
	case 'worknew' :
		$retval = worksave(1);
		break;
	case 'workdelete' :
		$retval = worksave(2);
		break;

	case 'workerlist_pc' :
		$retval = workerlist_pc();
		break;

	case 'workersave' :
		$retval = workersave(0);
		break;
	case 'workernew' :
		$retval = workersave(1);
		break;
	case 'workerdelete' :
		$retval = workersave(2);
		break;
	case 'cwsjlist' :
		$retval = cwsjlist();
		break;
	case 'jobslist' :
			$retval = jobslist();
			break;
	
	case 'produceslist' :
		$retval = produceslist();
		break;
	case 'producesedit' :
		$retval = producesedit();
		break;
	case 'customerlist' :
		$retval = customerlist();
		break;
	
	case 'warehouselist' :
		$retval = warehouselist();
		break;

	case 'unitslist' :
		$retval = unitslist();
		break;

	case 'customersave' :
		$retval = customersave(0);
		break;
	case 'customernew' :
		$retval = customersave(1);
		break;
	case 'customerdelete' :
		$retval = customersave(2);
		break;

	case 'commoditytypetree' :
		$retval = commoditytypetree();
		break;

	case 'commoditylist' :
		$retval = commoditylist();
		break;
	case 'commoditylist_pc' :
		$retval = commoditylist_pc();
		break;

	case 'commoditymenulist' :
		$retval = commoditymenulist();
		break;
	case 'commoditytypemenulist' :
		$retval = commoditytypemenulist();
		break;

	case 'commoditysave' :
		$retval = commoditysave(0);
		break;
	case 'commoditynew' :
		$retval = commoditysave(1);
		break;
	case 'commoditydelete' :
		$retval = commoditysave(2);
		break;


	case 'userssave' :
		$retval = userssave(0);
		break;
	case 'usersnew' :
		$retval = userssave(1);
		break;
	case 'usersdelete' :
		$retval = userssave(2);
		break;


	case 'menusystemselect' :
		$retval = menusystemselect();
		break;

	case 'currencylist' :
		$retval = currencylist();
		break;
	case 'currencylistall' :
		$retval = currencylist1();
		break;

	case 'currencyedit' :
		$retval = currencyedit(0);
		break;
	case 'currencyadd' :
		$retval = currencyedit(3);
		break;
	case 'currencydel' :
		$retval = currencyedit(1);
		break;
	case 'vipclasslist' :
		$retval = vipclasslist();
		break;
	case 'menulist' :
		$retval = menulist();
		break;
}
if ($retval != '')
{
		echo $retval;
		return;	
}

$psw = $_GET["psw"];
$outputStr = "";
$useridstr = "0";
$isweb = "0";
$userid = 0;
$mac = $_GET['mac'];
if ($act == 'userlogin') {
	$psw = $_GET['psw'];
	$web = $_GET['web'];

	$outputstr = '';
	$useridstr = '';
	$userid = 0;
	if ($psw == null)
		$psw = "";
	if ($web == null)
		$web = "1";
	if ($web == '0') {
		if ($_GET["aid"] == null)
			$outputStr = "错误的操作参数!！";
		if ($_GET["bid"] == null)
			$outputStr = "错误的操作参数!！";
		if ($_GET["cid"] == null)
			$outputStr = "错误的操作参数！!";
		if ($outputStr == "") {
			$useridstr = checkuser($_GET["aid"], $_GET["bid"]);
			if ($useridstr == "0")
				$outputStr = "非法用户操作!！";
		}

	} else {
		if ($_GET["userid"] == null)
			$outputStr = "错误的操作参数!！";
		if ($outputStr == "") {
			$userid = $_GET["userid"];
			if ($userid == null)
				$userid = 0;
			if ($userid > 0)
				$useridstr = checkuser1($psw, $userid);
			if ($useridstr == "0")
				$outputStr = "非法用户操作！";
		}
		$mac = "";
	}

	if ($outputStr == "") {
		$userid = $useridstr;
		$varret = userlogin($userid, $mac);
		echo $varret;
		return;
	} else {
		return $outputStr;

	}
	//    break;
} else {
	if ($psw == null)
		$psw = "";
	if ($psw == "") {
		if ($_GET["aid"] == null)
			$outputStr = "错误的操作参数!！";
		if ($_GET["bid"] == null)
			$outputStr = "错误的操作参数!！";

		if ($outputStr == "") {
			$useridstr = checkuser($_GET["aid"], $_GET["bid"]);
			if ($useridstr == "0")
				$outputStr = "非法用户操作！";

		}

	} else {
		if ($_GET["userid"] == null)
			$outputStr = "错误的操作参数!！";
		if ($outputStr == "") {
			$userid = $_GET["userid"];

			if ($userid == null)
				$userid = 0;
			if ($userid > 0)
				$useridstr = checkuser1($psw, $userid);

			if ($useridstr == "0")
				$outputStr = "非法用户操作！";

		}
		$isweb = "1";
	}
	$userid = $useridstr;

	//检查用户是否在其它地方登录

	if ($outputStr == "") {
		if ($action == "extractgoldadd") {
			$locuserid0 = $_GET["locuserid"];
			if ($locuserid0 == null) {
				$locuserid0 = $_GET["userid"];
			}
			$mac1 = $_GET["mac"];
			$outputStr = getmacvalue($locuserid0, $mac1);
		}
	}
	//   echo 'userid='.$userid;

	//  echo  'outstr='.$outputStr;

	//context.Response.Write(userid);
	//  return;

	//echo 'post='. $_POST['act'].'    get='.$_GET['act'];
	switch($act) {
		case 'getallzg' :
			$retval = getallzg($userid);

			break;
		case 'getcurzg' :
			$retval = getcurzg($userid);

			break;
		case 'getnextpkcode' :
			$retval = getnextpkcode($userid);

			break;
		case 'getcurjs' :
			$retval = getcurjs($userid);

			break;
		case 'deletelastzg' :
			$retval = deletelastzg($userid);

			break;
		case 'savetj' :
			$retval = savetj($userid);

			break;
		case 'savebjlzg' :
			$retval = savebjlzg($userid);

			break;
		case 'savebjltelzg' :
			$retval = savebjltelzg($userid);

			break;
		case 'userzllist' :
			$retval = userzllist();

			break;
		case 'bjlnewjs' :
			$retval = bjlnewjs($userid);

			break;
		case 'bjlctrjelist' :
			$retval = bjlctrjelist();

			break;
		case 'bjljsidloclist' :
			$retval = bjljsidloclist($userid);

			break;

		case 'deletejs' :
			$retval = deletejs($userid);

			break;
		case 'bjlzgloclist' :
			$retval = bjlzgloclist();

			break;
		case 'userjetreelist' :
			$retval = userjetreelist();

			break;
		case 'vipclasstree' :
			$retval = vipclasstree();

			break;

		case 'userzlwflist' :
			$retval = userzlwflist();

			break;
		case 'donationlist' :
			$retval = donationlist();

			break;
		case 'donationadd' :
			$retval = donationadd($userid);

			break;
		case 'donationedit' :
			$retval = donationedit();

			break;
		case 'donationsh' :
			$retval = donationsh();

			break;

		case 'menulistset' :
			$retval = menulistset();

			break;
		case 'sysmenuchange' :
			$retval = sysmenuchange();

			break;

		case 'extractgoldsl' :
			$retval = extractgoldsl();

			break;
		case 'extractgoldlist' :
			$retval = extractgoldlist();

			break;
		case 'extractgoldlist0' :
			$retval = extractgoldlist0();

			break;

		case 'extractgoldedit' :
			$retval = extractgoldedit();

			break;
		case 'bjluserzzbz' :
			$retval = bjluserzzbz();

			break;
		case 'extractgoldadd' :
			$retval = extractgoldadd();

			break;
		case 'extractgoldsh' :
			$retval = extractgoldsh();

			break;
		case 'extractgoldpay' :
			$retval = extractgoldpay();

			break;
		//***************************************************************************/

		case 'tlbleveltree' :
			$retval = tlbleveltree();

			break;

		case 'tkspclasstree' :
			$retval = tkspclasstree();

			break;
		case 'tkspzllist' :
			$retval = tkspzllist();

			break;
		case 'tkspsellist' :
			$retval = tkspsellist();

			break;

		case 'tkuserspclasstree' :
			$retval = tkuserspclasstree();
			//        echo 'aaaaaaaaaaaaaaaaaaaaa';

			break;
		case 'tkuserspzllist' :
			$retval = tkuserspzllist();

			break;

		case 'tkspselsave' :
			$retval = tkspselsave();

			break;

		case 'tkclassedit' :
			$retval = tkclassedit();

			break;

		case 'tkuserclassdel' :
			$retval = tkuserclassdel();

			break;
		case 'tkuserclassswap' :
			$retval = tkuserclassswap();

			break;
		case 'tkusergridtotree' :
			$retval = tkusergridtotree();

			break;
		case 'tkusergridremove' :
			$retval = tkusergridremove();

			break;
		case 'tkusergridupdate' :
			$retval = tkusergridupdate();

			break;

		case 'tkpriceupdate' :
			$retval = tkpriceupdate();

			break;

		case 'testproc' :
			$retval = testproc();

			break;

		default :
			$retval= 'POST=' . $_POST['act'] . '  GET=' . $_GET['act'];
			break;
	};
	if ($retval != '')
    {
		echo $retval;
		
    }
}


function get_referer(){
	$url = $_SERVER["HTTP_REFERER"]; //获取完整的来路URL
	$str = str_replace("http://","",$url); //去掉http://
	$strdomain = explode("/",$str); // 以“/”分开成数组
	$domain = $strdomain[0]; //取第一个“/”以前的字符
	return $domain;
}
	 
	//对于百度、谷歌搜索引擎来路判断
function get_seo(){
	$s = 0;
	if(get_referer()=='localhost:8080'){
	$s = 1;
	}
	else if(get_referer()=='fsminglian.com'){
	$s = 1;
	}
	return $s;
}
function commoditytypetree() {
	//$sqlstr=" SELECT CT_code as id,CT_name as text,P_CT_code as pid,1 as leaf  FROM commoditytype where active=1 and  L_id=".$_GET['p_l_id']." order by CT_code"  ;
	//$query = mysql_query($sqlstr);
	//return gettreedata($query);
	/*
	 return @'
	 [
	 { "id": 1, "text": "Phil", "leaf": true },
	 { "id": 2, "text": "Nico", "expanded": true, "children": [
	 { "id": 3, "text": "Mitchell", "leaf": true }
	 ]},
	 { "id": 4, "text": "Sue", "loaded": true }

	 ]';
	 */

	return @'[
    {"id": 1, "text": "aaaa", "leaf": false,
    "children": [
        { "id": 2, "text": "Phil", "leaf": true },
        { "id": 3, "text": "Nico", "expanded": true, "children": [
            { "id": 4, "text": "Mitchell", "leaf": true }
        ]},
        { "id": 10, "text": "Sue", "leaf": true }
		]

    },
	{"id": 5, "text": "bbbb", "leaf": false,
    "children": [
        { "id": 6, "text": "Phil  b", "leaf": true },
        { "id": 7, "text": "Nico  b", "expanded": true, "children": [
            { "id": 8, "text": "Mitchell  b", "leaf": true }
        ]},
        { "id": 9, "text": "Sue b", "leaf" : true }]
    }
    
    ]';

}

function enterpriselist() {
	$sqlstr = " SELECT *,E_code as id FROM enterprise ";
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cktjjdlist() {
	$ny=(int)$_GET['ny'];
	$ny1=$ny-2;
	$ny2=$ny+2;
	$sqlstr = " SELECT sys_tjjd.*,location.L_name as ckmc FROM sys_tjjd,location 
	where sys_tjjd.L_id=location.L_id
	 and sys_tjjd.L_id=" . $_GET['p_l_id'] . " and ( sys_tjjd.ny >".$ny1."  and sys_tjjd.ny<".$ny2." )order by ny,yu";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function getsqlselect() {
	$sqlstr=$_GET['sql'];
//	return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function locationlist() {
	$sqlstr = " SELECT *,L_id as id FROM location where E_code='" . $_GET['p_e_code'] . "' order by L_code";
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function customerlist() {
    $page=$_GET['page'] ;
	$start=$_GET['start'] ;
	$limit=$_GET['limit'] ;
	$p_l_id=$_GET['p_l_id'] ;
	$active =1;
	$allkh=1;
	if (isset($_GET["active"]))
	{
     $active=$_GET['active'];
	}
	if (isset($_GET['allkh']))
	{
     $allkh=(int)$_GET['allkh'];
	}
    if ($allkh==1)
	{
   		$sqlstr = " SELECT C_id    FROM customer where E_code='" . $_GET['p_e_code'] . "' order by C_code";
    	$totalrow=mysql_numrows(mysql_query($sqlstr));
		$sqlstr = " SELECT *,C_id as id  FROM customer where E_code='" . $_GET['p_e_code'] . "'";
	}else{
		$sqlstr = " SELECT customer.C_id    FROM customer,cpkc where customer.l_id=cpkc.l_id and cpkc.l_id=".$p_l_id." and customer.E_code='" . $_GET['p_e_code'] . "' order by customer.C_code";
		$totalrow=mysql_numrows(mysql_query($sqlstr));
		$sqlstr = " SELECT distinct  customer.*,C_id as id  FROM customer,cpkc where customer.l_id=cpkc.l_id and cpkc.l_id=".$p_l_id." and customer.E_code='" . $_GET['p_e_code'] . "'";
	}
	if (isset($_GET["CustomerDj"]))
	{
		$sqlstr .= " and customer.Aloneprice=1 and customer.active=1 ";
	}else{
		$sqlstr .= " and customer.active=".$active ;
	}
	if ($allkh !=1 )
	{
		$sqlstr .= " group by  customer.c_id";
	}
    $sqlstr .= "  order by customer.C_code   limit ".$start.",".$limit ;    
	//a.Aloneprice=1 and 
   // return $allkh.'  '. $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, $totalrow);
}





function cpjkdselectdata() {
	$sqlstr = " SELECT C_id as Id,C_name as Name FROM customer where active=1 and E_code='" . $_GET['p_e_code'] . "' order by C_code";
	$query = mysql_query($sqlstr);

	if ($query) {

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["customer"] = $menu_array1;

		$sqlstr = " SELECT Id,Name FROM Worker where Jobs=3 and L_id=" . $_GET['p_l_id'];
		//$sqlstr=" SELECT Id,Name FROM Worker where  L_id=".$_GET['p_l_id'] ;
		$query = mysql_query($sqlstr);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cgyArray"] = $menu_array1;

		$sqlstr = " SELECT Worker.Id,Worker.Name,Work.Jobs,Work.Jobsname FROM Worker,Work where Worker.Jobsid=Work.Id and Work.L_id=" . $_GET['p_l_id'];

		$query = mysql_query($sqlstr);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["Worker"] = $menu_array1;

		$sqlstr = " SELECT P_id as Id,P_name as Name FROM produces where  E_code='" . $_GET['p_e_code'] . "'  order by P_code";

		$query = mysql_query($sqlstr);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["produces"] = $menu_array1;

		$sqlstr = " SELECT ct.Quantity_Unit,ct.Weight_Unit,c.S_id as Id,c.S_name as Name,c.Rate FROM type t,commoditytype ct,commodity c  where t.T_id=ct.T_id and ct.CT_id =c.CT_id  and t.E_code='" . $_GET['p_e_code'] . "'";

		$query = mysql_query($sqlstr);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["commodity"] = $menu_array1;

		$sqlstr = " SELECT  Id,Jobsname as Name ,Unit_price,WeightStatus,Auto,Jobs FROM Work where  L_id=" . $_GET['p_l_id'];
		$query = mysql_query($sqlstr);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}

		$menu["work"] = $menu_array1;

		/*
		 $sqlstr=" SELECT  Id,Jobsname as Name ,Unit_price,WeightStatus,Auto,Jobs FROM Work where Jobs=1 and L_id=".$_GET['p_l_id'] ;
		 $query = mysql_query($sqlstr);

		 $menu_array1=array();
		 while($row=mysql_fetch_array($query)) {
		 $my_array=array();
		 for ($i=0; $i<mysql_num_fields($query); $i++) {
		 $newvar=$row[mysql_field_name($query,$i)];
		 $my_array[mysql_field_name($query,$i)]=urlencode($newvar);
		 };
		 array_push($menu_array1,$my_array);
		 }

		 $menu["byWork"]=$menu_array1;

		 $sqlstr=" SELECT  Id,Work as Name,Unit_price FROM Work where Jobs=2 and L_id=".$_GET['p_l_id'] ;

		 $query = mysql_query($sqlstr);

		 $menu_array1=array();
		 while($row=mysql_fetch_array($query)) {
		 $my_array=array();
		 for ($i=0; $i<mysql_num_fields($query); $i++) {
		 $newvar=$row[mysql_field_name($query,$i)];
		 $my_array[mysql_field_name($query,$i)]=urlencode($newvar);
		 };
		 array_push($menu_array1,$my_array);
		 }
		 $menu["gsWork"]=$menu_array1;
		 */

		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function commoditytypelist() {
	$sqlstr = "SELECT `CT`.*,T.T_name FROM `commoditytype` AS `CT`     INNER JOIN `type` AS `T`   ON (`CT`.`T_id` = `T`.`T_id`) ";
	$sqlstr = $sqlstr . " where T.E_code='" . $_GET['p_e_code'] . "' AND T.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and CT.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code";
	$commoditytype = mysql_query($sqlstr);
	$sqlstr = "SELECT T_id,T_code,T_name FROM TYPE where E_code='" . $_GET['p_e_code'] . "' AND Active=1 order by T_code";
	$typequery = mysql_query($sqlstr);

	if ($commoditytype) {

		$menutype = "";

		$menu_type = array();
		$menu_commoditytype = array();

		$my_array = array();
		$my_array["T_name"] = "全部小类";
		$my_array["T_id"] = "0";
		array_push($menu_type, $my_array);

		$menu_array1 = array();
		while ($row = mysql_fetch_array($commoditytype)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($commoditytype); $i++) {
				$newvar = $row[mysql_field_name($commoditytype, $i)];
				$my_array[mysql_field_name($commoditytype, $i)] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);

		}
		array_push($menu_array1, array());
		array_push($menu_commoditytype, $menu_array1);

		while ($menurow = mysql_fetch_array($typequery)) {
			$menutype = $menurow['T_id'];
			$my_array = array();
			$my_array["T_name"] = urlencode($menurow['T_name']);
			$my_array["T_id"] = $menutype;
			array_push($menu_type, $my_array);
			$menu_array1 = array();
			mysql_data_seek($commoditytype, 0);
			while ($row = mysql_fetch_array($commoditytype)) {
				if ($row["T_id"] == $menutype) {
					$my_array = array();
					for ($i = 0; $i < mysql_num_fields($commoditytype); $i++) {
						$newvar = $row[mysql_field_name($commoditytype, $i)];
						$my_array[mysql_field_name($commoditytype, $i)] = urlencode($newvar);
					};
					array_push($menu_array1, $my_array);
				}
			}
			array_push($menu_array1, array());
			array_push($menu_commoditytype, $menu_array1);
		}
		$my_array = array();
		$my_array["T_name"] = "";
		$my_array["T_id"] = "0";
		array_push($menu_type, $my_array);

		$menu["type"] = $menu_type;
		$menu["commoditytype"] = $menu_commoditytype;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function commoditytypetreelist() {

	$p_e_code =$_GET["p_e_code"];
	
	$all = "0";

	if ($_GET['displayall']) {
		$all = $_GET['displayall'];
	};

	//return $all;
	$sqlstr = "SELECT CT.CT_id as id,CT.CT_name as text,CT.CT_name as name,CT.T_id as pid,CT.T_id,CT.CT_id,CT.CT_code as code ,CT.Active  FROM `commoditytype` AS `CT`     INNER JOIN `type` AS `T`   ON (`CT`.`T_id` = `T`.`T_id`) ";
	$sqlstr = $sqlstr . " where T.E_code='" . $p_e_code . "'  ";

	if ($all == "0") {
		$sqlstr = $sqlstr . " and CT.Active =1 and T.Active=1";
	}
	$sqlstr = $sqlstr . " order by CT.CT_code ";
	//return $sqlstr;
	$commoditytype = mysql_query($sqlstr);

	$sqlstr = "SELECT T_id as id ,T_name as text,0 as pid ,T_code as code,Active FROM TYPE where  E_code='" . $p_e_code . "' ";
	if ($all == "0") {
		$sqlstr = $sqlstr . " and Active =1 ";
	}

	$sqlstr = $sqlstr . " order by T_code ";

	//return $sqlstr;
	$typequery = mysql_query($sqlstr);

	if ($commoditytype) {

		$menutype = "";
		$tree = array();
		while ($menurow = mysql_fetch_array($typequery)) {

			$menutype = $menurow['id'];
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			if (!$menurow['Active']) {
				$my0_array["text"] = $my0_array["text"] . "*";

			}
			//return $menurow['Active'];
			$my0_array["id"] = $menurow['id'] + 10000;
			$my0_array["T_id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["name"] = $menurow['text'];
			$my0_array["Active"] = $menurow['Active'];
			$my0_array["pid"] = 0;
			$s = 0;
			$menu_array1 = array();
			mysql_data_seek($commoditytype, 0);
			while ($row = mysql_fetch_array($commoditytype)) {
				if ($row["pid"] == $menutype) {
					$s = $S + 1;
					$my_array = array();
					for ($i = 0; $i < mysql_num_fields($commoditytype); $i++) {
						$newvar = $row[mysql_field_name($commoditytype, $i)];
						$my_array[mysql_field_name($commoditytype, $i)] = urlencode($newvar);
						$my_array[mysql_field_name($commoditytype, $i)] = $newvar;
					};

					//$my_array["text"] = urlencode($row['text']);
					// $my_array["id"] = $row['id'];
					if (!$row['Active']) {
						$my_array["text"] = $my_array["text"] . "*";

					}

					$my_array["leaf"] = 1;
					$my_array["expanded"] = 0;

					array_push($menu_array1, $my_array);
				}
			}

			if ($s > 0) {
				$my0_array["leaf"] = 0;
				$my0_array["expanded"] = 1;
				$my0_array["children"] = $menu_array1;

			} else {
				$my0_array["leaf"] = 1;
			}
			array_push($tree, $my0_array);
			//return json_encode($tree);
		}
		return urldecode(json_encode($tree));
		//json_encode($tree);

	} else {
		//return "bbbbbbbb";
		//$menu['success'] = false;
		//$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return @'[]';

	//return urldecode(json_encode($menu));

}
function commodityselecttreelist() {

	$p_e_code =$_GET["p_e_code"];
	$l_id =$_GET["p_l_id"];
	$c_id =$_GET["p_c_id"];
	$all = "0";
	if ($_GET['displayall']) {
		$all = $_GET['displayall'];
	};
//return $_GET['displayall'];
	$sqlstr = "SELECT DISTINCT type.`t_code` AS code, type.`T_name` AS text  , Type.`T_id`  AS id";
	$sqlstr = $sqlstr . " FROM `commodity` s INNER JOIN `commoditytype` ct  ON (`s`.`CT_id` = `ct`.`CT_id`) ";
	$sqlstr = $sqlstr . " INNER JOIN `type` ON (`ct`.`T_id` = `type`.`T_id`) WHERE   ct.`Active`=1 AND s.`Active`=1 AND type.`Active`=1";
	$sqlstr = $sqlstr . " and Type.E_code='" . $p_e_code . "'  ";
	
	$displayall=$_GET['displayall'];
	if ($displayall=='cpkc')
	{
		  $sqlstr .=" and s.S_id in (SELECT 
    cpid 
  FROM
    cpkc,cpkcmx 
  WHERE cpkc.kcid=cpkcmx.kcid AND ( cpkcmx.sl != 0 
    OR cpkcmx.sl != 0) ";

	 if ($l_id>0) 
	  {
		$sqlstr .=" and cpkc.l_id=".$l_id;
	  }
	  if ($c_id>0) 
	  {
		 $sqlstr .=" and cpkc.khid=".$c_id;
	  }
     $sqlstr .=")";
		
	}
	
	$sqlstr = $sqlstr . " GROUP BY type.T_code ORDER BY type.T_code";
    //return $sqlstr  ;  
	$typequery = mysql_query($sqlstr);

	$sqlstr = " SELECT DISTINCT Ct.`Ct_code` AS code , Ct.`CT_name` AS text  , CT.`CT_id`  AS id ";
	$sqlstr = $sqlstr . ",CT.T_id as pid FROM `commodity` s
    INNER JOIN `commoditytype` ct
        ON (`s`.`CT_id` = `ct`.`CT_id`)
    INNER JOIN `type` 
        ON (`ct`.`T_id` = `type`.`T_id`)
WHERE   ct.`Active`=1 AND s.`Active`=1 AND type.`Active`=1 ";
	$sqlstr = $sqlstr . " and Type.E_code='" . $p_e_code . "'  ";
	
	if ($displayall=='cpkc')
	{
		  $sqlstr .=" and s.S_id in (SELECT 
    cpid 
  FROM
    cpkc,cpkcmx 
  WHERE cpkc.kcid=cpkcmx.kcid AND ( cpkcmx.sl != 0 
    OR cpkcmx.sl != 0) ";
	 if ($l_id>0) 
	  {
		$sqlstr .=" and cpkc.l_id=".$l_id;
	  }
	  if ($c_id>0) 
	  {
		 $sqlstr .=" and cpkc.khid=".$c_id;
	  }
     $sqlstr .=")";
	}
	
	
	$sqlstr = $sqlstr . "GROUP BY type.T_code,ct.CT_code ORDER BY type.T_code,ct.CT_code";

	$commoditytype = mysql_query($sqlstr);

	$sqlstr = "	SELECT
    `s`.`S_code` AS code 
    , `s`.`S_name` AS text
    , `s`.`S_id`  AS id
    , `s`.`Py_code` AS py_code
    ,s.CT_id as pid 
FROM
    `commodity` s
    INNER JOIN `commoditytype` ct
        ON (`s`.`CT_id` = `ct`.`CT_id`)
    INNER JOIN `type` 
        ON (`ct`.`T_id` = `type`.`T_id`)
WHERE   ct.`Active`=1 AND s.`Active`=1 AND type.`Active`=1 ";
	$sqlstr = $sqlstr . " and Type.E_code='" . $p_e_code . "'";
	if ($displayall=='cpkc')
	{
		  $sqlstr .=" and s.S_id in (SELECT 
    cpid 
  FROM
    cpkc,cpkcmx 
  WHERE cpkc.kcid=cpkcmx.kcid AND ( cpkcmx.sl != 0 
    OR cpkcmx.sl != 0) ";
	 if ($l_id>0) 
	  {
		$sqlstr .=" and cpkc.l_id=".$l_id;
	  }
	  if ($c_id>0) 
	  {
		 $sqlstr .=" and cpkc.khid=".$c_id;
	  }
     $sqlstr .=")";
	}
	$sqlstr = $sqlstr . "ORDER BY type.T_code,ct.CT_code,s.S_code ";

	//return $sqlstr;
	$commodityquery = mysql_query($sqlstr);

	if ($commodityquery) {
		$menutype = "";
		$menutype1 = "";
		$tree = array();
		while ($menurow = mysql_fetch_array($typequery)) {
			$menutype = $menurow['id'];
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'] + 100000;
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = "";
			$my_array["leaf"] = 0;
			$my_array["expanded"] = 1;
			$s = 0;
			$menu_array1 = array();
			mysql_data_seek($commoditytype, 0);
			while ($row = mysql_fetch_array($commoditytype)) {
				if ($row["pid"] == $menutype) {
					$menutype1 = $row['id'];
					$s = $S + 1;
					$my_array = array();
					$my_array["text"] = urlencode($row['text']);
					$my_array["id"] = $row['id'] + 10000;
					$my_array["code"] = $row['code'];
					$my_array["py_code"] = "";
					$my_array["leaf"] = 0;

					//*********************************

					$k = 0;
					$menu_array2 = array();
					mysql_data_seek($commodityquery, 0);
					while ($row0 = mysql_fetch_array($commodityquery)) {
						if ($row0["pid"] == $menutype1) {
							$k = $k + 1;

							$my1_array = array();
							$my1_array["text"] = urlencode($row0['text']);
							$my1_array["id"] = $row0['id'];
							$my1_array["code"] = $row0['code'];
							$my1_array["py_code"] = $row0['py_code'];
							;
							$my1_array["leaf"] = 1;
							array_push($menu_array2, $my1_array);

						}

					}
					//return $menutype;
					if ($k > 0) {
						$my_array["leaf"] = 0;
						$my_array["expanded"] = 1;
						$my_array["children"] = $menu_array2;

					} else {
						$my_array["leaf"] = 1;
					}

					//**////////////////////////////////
					array_push($menu_array1, $my_array);
				}
			}

			if ($s > 0) {
				$my0_array["leaf"] = 0;
				$my0_array["expanded"] = 1;
				$my0_array["children"] = $menu_array1;

			} else {
				$my0_array["leaf"] = 1;
			}
			array_push($tree, $my0_array);

			//return json_encode($tree);
		}
		return urldecode(json_encode($tree));
		//json_encode($tree);

	} else {
		//return "bbbbbbbb";
		//$menu['success'] = false;
		//$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return @'[]';

	//return urldecode(json_encode($menu));

}

function producesselecttreelist() {
	$p_e_code =$_GET["p_e_code"];
    $l_id =(int)$_GET["p_l_id"]; 
    $c_id =(int)$_GET["p_c_id"]; 

	$sqlstr = "SELECT P_code AS code, P_name AS text  ,P_id  AS id,Py_code ";
	
	$sqlstr .=" FROM produces WHERE   Active=1 ";
	
	$displayall=$_GET['displayall'];
	
	if ($displayall=='cpkc')
	{
	  $sqlstr .=" and P_id in (SELECT cdid FROM cpkc,cpkcmx  WHERE cpkc.kcid=cpkcmx.kcid AND ( cpkcmx.sl != 0 OR cpkcmx.sl != 0)";

      if ($l_id>0) 
	  {
		$sqlstr .=" and cpkc.l_id=".$l_id;
	  }
	  if ($c_id>0) 
	  {
		 $sqlstr .=" and cpkc.khid=".$c_id;
	  }
     $sqlstr .=")";		
	}
	
	$sqlstr = $sqlstr . " and E_code='" . $p_e_code . "'  ";
	$sqlstr = $sqlstr . " ORDER BY P_code";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = $menurow['Py_code'];
			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';

}
function customerselecttreelist() {

	$p_e_code =$_GET["p_e_code"];
	$L_id =$_GET["p_l_id"];
	
	$sqlstr = "SELECT customer.C_code AS code, customer.C_name AS text  ,customer.C_id  AS id,customer.Py_code ";
	$sqlstr = $sqlstr . " FROM customer WHERE   customer.Active=1 ";
	
	$displayall=$_GET['displayall'];
	if ($displayall=='cpkc')
	{
		  $sqlstr .=" and C_id in (SELECT cpkc.khid FROM cpkc,cpkcmx 
  WHERE cpkc.kcid=cpkcmx.kcid AND ( cpkcmx.sl != 0 OR cpkcmx.sl != 0) and l_id=".$L_id.")";
		
	}
	
	$sqlstr = $sqlstr . " and customer.E_code='" . $p_e_code . "'  ";
	$sqlstr = $sqlstr . " ORDER BY customer.C_code";
	//return $sqlstr; 
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = $menurow['Py_code'];
			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';

}

function locationselecttreelist() {
	$p_e_code =$_GET['p_e_code'];
	$loc=$_GET['loc'];
	$sqlstr = "SELECT L_code AS code, L_name AS text  ,L_id  AS id";
	$sqlstr = $sqlstr . " FROM location WHERE   Active=1 ";
	
	
	$displayall=$_GET['displayall'];
	//if (($displayall!='cpkc') && ($displayall.length>0))
	if (strpos($displayall,',')>-1 )
	{
	   $sqlstr .= "  and POSITION(CONCAT(',',L_id ,',') IN '".$displayall."')>0 ";
	   //return $sqlstr."===".$displayall;
	  
	}
	
	$sqlstr = $sqlstr . " and E_code='" . $p_e_code . "'  ";
	$sqlstr = $sqlstr . " ORDER BY L_code";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = '';
			$my0_array["leaf"] = 1;
			if ($loc=='lidstring'){
				$my0_array["checked"] = false;
			}
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';

}


function systemsetting() {

	$appid = $_GET['appid'];
	$E_code = $_GET['systemcode'];
	$systemid = $_GET['systemid'];

	if ($appid == "1") {
		$sqlstr = "select a.L_id as id ,a.L_name as name,e.E_code,e.E_name,a.areas ,a.L_area
		from location a,enterprise e
		where  a.E_code=e.E_code and a.active=1 and  a.l_id=" . $systemid;
	} else {
		$sqlstr = "select c_id as id ,C_name as name ,e.E_code,e.E_name,1 as areas ,'ALL' as L_area
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
			$L_area = $row['L_area'];
			break;
		}
	}
	if ($id == "0") {
		$arr['success'] = true;
		$arr['data'] = array('userid' => 0, 'username' => urlencode('数据设置失败！！！ '));

	} else {
		$arr['success'] = true;
		$arr['data'] = array('userid' => $id, 'username' => urlencode($name),'L_area' => urlencode($L_area), 'E_code' => $E_code, 'E_name' => urlencode($E_name), 'areas' => $areas, 'appid' => $appid);
	}
	
	return urldecode(json_encode($arr));
}


function workselecttreelist() {
	$p_e_code =$_GET["p_e_code"];
	$p_l_id = $_GET['p_l_id'];
	$sqlstr = "SELECT Jobs AS code, Jobsname AS text,id,Unit_price as dj,
	Weight_status as zljs,Auto,Quantity_in as inbz,Price_in as indj  ";
	$sqlstr = $sqlstr . " FROM work WHERE   Active=1 ";
	$sqlstr = $sqlstr . " and L_id=" . $p_l_id;

	$sqlstr = $sqlstr . " ORDER BY Jobs";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = '';
			$my0_array["leaf"] = 1;
			$my0_array["dj"] = $menurow['dj'];
			$my0_array["zljs"] = $menurow['zljs'];
			$my0_array["inbz"] = $menurow['inbz'];
			$my0_array["indj"] = $menurow['indj'];

			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';

}

function khworkselecttreelist() {
        $lid =(int)$_GET['p_l_id'];
		$E_code =(int)$_GET['p_e_code'];
		$khid=(int)$_GET['khid'];

		$lid=1;

if ($_GET['bzid']=='undefined'){
     $gfbz=1;

	if ($khid>0)
	{
		$lid =(int)$_GET['p_l_id'];
		$sqlstr = "	SELECT  `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
			`Weight_Status`,`PS_code`,`Active`,`E_code`,
			a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
			a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,c.*
			FROM V_packing_l a LEFT OUTER JOIN (
			SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints  
			FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid 
			where active=1 and a.L_id=".$lid."  and  E_code='".$_GET['p_e_code']."' and a.Xmlb=".$gfbz;
		
	}
	else
	{
		$sqlstr = " SELECT * ,PS_id as id  FROM packing where E_code='" . $_GET['p_e_code'] . "'";
		
		$sqlstr = $sqlstr . " and Active=1  and Xmlb=".$gfbz;
		$sqlstr = $sqlstr . "   order by PS_code ";
	}



  //return $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['PS_name']);
			$my0_array["id"] = $menurow['PS_id'];
			$my0_array["code"] = $menurow['PS_code'];
			$my0_array["py_code"] = '';

			$my0_array["rate"] = $menurow['Rate'];
			$my0_array["czdj"] =($menurow['Czdj']==null)? $menurow['Czdj0']: $menurow['Czdj'];
			$my0_array["phdj"] =($menurow['Phdj']==null)?$menurow['Phdj0']: $menurow['Phdj'];
			$my0_array["czdj2"] =($menurow['Czdj2']==null)?$menurow['Czdj20']:$menurow['Czdj2'];
			$my0_array["phdj2"] =($menurow['Phdj2']==null)?$menurow['Phdj20']:$menurow['Phdj2'];
			$my0_array["pfdj"] = ($menurow['Pfdj']==null)?$menurow['Pfdj0']:$menurow['Pfdj'];
			$my0_array["bydj"] = ($menurow['Bydj']==null)?$menurow['Bydj0']:$menurow['Bydj'];

			$my0_array["sldw"] = $menurow['Quantity_Unit'];
			$my0_array["zldw"] = $menurow['Weight_Unit'];
			$my0_array["zljs"] = $menurow['Weight_Status'];

			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}


}
else
{

$lid =(int)$_GET['p_l_id'];
$bzid=(int)$_GET['bzid'];
		
$sqlstr="			
SELECT id,text,CASE WHEN ISNULL(dj) or dj=0  THEN dj0 ELSE dj END  AS dj ,zljs,'' AS code, inbz, indj
FROM ( 
SELECT `PS_id`,a.Bydj AS dj0,c.dj,'装卸' AS TEXT ,a.Weight_Status  AS zljs,1 AS id,1 AS inbz,1 AS indj
FROM v_packing_l a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Bydj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid 
WHERE E_code='".$E_code."'  AND PS_id=".$bzid." AND a.l_id=".$lid."  
UNION ALL
SELECT `PS_id`,a.Pbdj AS dj0,c.dj,'破包修复' AS TEXT ,0 AS zljs,2 AS id,1 AS inbz,1 AS indj
FROM v_packing_l a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Pbdj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid 
WHERE E_code='".$E_code."'  AND PS_id=".$bzid." AND a.l_id=".$lid."  
UNION ALL
SELECT `PS_id`,a.Ghdj AS dj0,c.dj,'过户费' AS TEXT ,1 AS zljs,3 AS id,1 AS inbz,1 AS indj
FROM v_packing_L a LEFT OUTER JOIN (
SELECT PS_id AS pid ,`Ghdj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid 
WHERE E_code='".$E_code."'  AND PS_id=".$bzid."  AND a.l_id=".$lid."  
UNION ALL
SELECT 0 AS ps_id,Unit_price AS dj0 ,Unit_price AS dj ,Jobsname AS TEXT,Weight_status AS zljs,
id,Quantity_in AS inbz,Price_in AS indj
FROM WORK 
WHERE editbz=1 AND l_id=".$lid." AND E_code='".$E_code."') packing";

//return  $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["py_code"] = '';
			$my0_array["leaf"] = 1;
			$my0_array["dj"] = $menurow['dj'];
			$my0_array["zljs"] = $menurow['zljs'];
			$my0_array["inbz"] = $menurow['inbz'];
			$my0_array["indj"] = $menurow['indj'];

			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';
}

}


function workerselecttreelist() {

	$p_e_code =$_GET["p_e_code"];
	$p_l_id = $_GET['p_l_id'];
	$jobs = $_GET['jobs'];
	if ($jobs==undefined) $jobs=0; 
	

	$sqlstr = "SELECT distinct Jobsname as text,Jobs as code  FROM worker ";
	$sqlstr = $sqlstr . " where active=1 and L_id=" . $p_l_id;
	if ($jobs>0)
	{
			$sqlstr .= "  and Jobs='" . $jobs."'";
		
	}
	$sqlstr = $sqlstr . " order by Jobs";
	$type = mysql_query($sqlstr);
	$sqlstr = "SELECT Id as id ,Name as text,Jobs as code from worker where active=1 and  l_id=" . $p_l_id;
	if ($jobs>0)
	{
			$sqlstr .= "  and Jobs='" . $jobs."'";
		
	}
	
	$sqlstr = $sqlstr . " order by Jobs ";
	$workerquery = mysql_query($sqlstr);
	if ($workerquery) {

		$menutype = "";
		$tree = array();
		while ($menurow = mysql_fetch_array($type)) {
			$menutype = $menurow['code'];
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['code'] + '1000';
			$my0_array["pname"] =urlencode($menurow['text']);
			$my0_array["code"] = $menurow['code'];
			$my0_array["pid"] = 0;
			$s = 0;
			$menu_array1 = array();
			mysql_data_seek($workerquery, 0);
			while ($row = mysql_fetch_array($workerquery)) {
				if ($row["code"] == $menutype) {
					$s = $S + 1;
					$my_array = array();

					$my_array["text"] = urlencode($row['text']);
					$my_array["id"] = $row['id'];
					$my_array["code"] = $row['code'];
					$my_array["leaf"] = 1;
					$my_array["checked"] = false;
					$my_array["pname"] =urlencode($menurow['text']);
					$my_array["expanded"] = 0;
					array_push($menu_array1, $my_array);
				}
			}

			if ($s > 0) {
				$my0_array["leaf"] = 0;
				$my0_array["expanded"] = 1;
				$my0_array["children"] = $menu_array1;

			} else {
				$my0_array["leaf"] = 1;
			}
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));

	}
	return @'[]';

}

function systemmenutreelist() {

	//$p_e_code =$_GET["p_e_code"]
	//$typeid = $_GET['typeid'];

	$sqlstr = "SELECT distinct Menu as text,Psort as code  FROM menusystem where khbz<2 and alluser=0 ";
	//$sqlstr = $sqlstr . " where active=1 and L_id=" . $p_l_id;
	$sqlstr = $sqlstr . " order by Psort";
	$type = mysql_query($sqlstr);
	
	$sqlstr = "SELECT Menu_id as id ,Name as text,Psort as code from menusystem where khbz<2  and alluser=0  and  Name<>'-' ";
	$sqlstr = $sqlstr . " order by Sort ";
	$workerquery = mysql_query($sqlstr);
	if ($workerquery) {

		$menutype = "";
		$tree = array();
		while ($menurow = mysql_fetch_array($type)) {
			$menutype = $menurow['code'];
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['code'] + '1000';
			$my0_array["pname"] =urlencode($menurow['text']);
			$my0_array["code"] = $menurow['code'];
			$my0_array["checked"] = false;
			$my0_array["pid"] = 0;
			$s = 0;
			$menu_array1 = array();
			mysql_data_seek($workerquery, 0);
			while ($row = mysql_fetch_array($workerquery)) {
				if ($row["code"] == $menutype) {
					$s = $S + 1;
					$my_array = array();

					$my_array["text"] = urlencode($row['text']);
					$my_array["id"] = $row['id'];
					$my_array["code"] = $row['code'];
					$my_array["leaf"] = 1;
					$my_array["checked"] = false;
					$my_array["pname"] =urlencode($menurow['text']);
					$my_array["expanded"] = 0;
					array_push($menu_array1, $my_array);
				}
			}

			if ($s > 0) {
				$my0_array["leaf"] = 0;
				$my0_array["expanded"] = 0;
				$my0_array["children"] = $menu_array1;

			} else {
				$my0_array["leaf"] = 1;
			}
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));

	}
	return @'[]';

}
function wxsystemmenutreelist() {


	$sqlstr = "SELECT distinct type as text,TypeOrder as code  FROM wx_menu where system=0 ";
	$sqlstr = $sqlstr . " order by TypeOrder";
	$type = mysql_query($sqlstr);
	
	$sqlstr = "SELECT id ,Name as text,PageOrder as code,TypeOrder from wx_menu where system=0  ";
	$sqlstr = $sqlstr . " order by PageOrder ";
	$workerquery = mysql_query($sqlstr);
	if ($workerquery) {
		$menutype = "";
		$tree = array();
		while ($menurow = mysql_fetch_array($type)) {
			$menutype = $menurow['code'];
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['code'] + '1000';
			$my0_array["pname"] =urlencode($menurow['text']);
			$my0_array["code"] = $menurow['code'];
			$my0_array["checked"] = false;
			$my0_array["pid"] = 0;
			$s = 0;
			$menu_array1 = array();
			mysql_data_seek($workerquery, 0);
			while ($row = mysql_fetch_array($workerquery)) {
				if ($row["TypeOrder"] == $menutype) {
					$s = $S + 1;
					$my_array = array();

					$my_array["text"] = urlencode($row['text']);
					$my_array["id"] = $row['id'];
					$my_array["code"] = $row['code'];
					$my_array["leaf"] = 1;
					$my_array["checked"] = false;
					$my_array["pname"] =urlencode($menurow['text']);
					$my_array["expanded"] = 0;
					array_push($menu_array1, $my_array);
				}
			}

			if ($s > 0) {
				$my0_array["leaf"] = 0;
				$my0_array["expanded"] = 0;
				$my0_array["children"] = $menu_array1;

			} else {
				$my0_array["leaf"] = 1;
			}
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));

	}
	return @'[]';

}


function packingselecttreelist() {
	$p_e_code =$_GET["p_e_code"];
	$khid =(int)$_GET["p_c_id"];

	$gfbz =(int)$_GET["gfbz"];
   
	if ($gfbz==undefined) $gfbz=0;
	if ($khid>0)
	{
	$lid =(int)$_GET['p_l_id'];
  		/*$sqlstr = "	SELECT  `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
		`Weight_Status`,`PS_code`,`Active`,`E_code`,
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,c.*
		FROM packing a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints  
		FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid 
		where active=1 and  E_code='".$_GET['p_e_code']."' and a.Xmlb=".$gfbz;
		*/

	    $sqlstr = "	SELECT  `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
		`Weight_Status`,`PS_code`,`Active`,`E_code`,
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,c.*
		FROM v_packing_L a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints,L_id  
		FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid 
		where active=1 and  a.l_id=".$lid."  and  E_code='".$_GET['p_e_code']."' and a.Xmlb=".$gfbz;
		
	}
	else
	{
		$sqlstr = " SELECT * ,PS_id as id  FROM packing where E_code='" . $_GET['p_e_code'] . "'";
		$sqlstr = $sqlstr . " and Active=1  and Xmlb=".$gfbz;
		$sqlstr = $sqlstr . "   order by PS_code ";
	}



 // return $sqlstr;
	$query = mysql_query($sqlstr);
	if ($query) {
		$tree = array();
		while ($menurow = mysql_fetch_array($query)) {

			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['PS_name']);
			$my0_array["id"] = $menurow['PS_id'];
			$my0_array["code"] = $menurow['PS_code'];
			$my0_array["py_code"] = '';

			$my0_array["rate"] = $menurow['Rate'];
			$my0_array["czdj"] =($menurow['Czdj']==null)? $menurow['Czdj0']: $menurow['Czdj'];
			$my0_array["phdj"] =($menurow['Phdj']==null)?$menurow['Phdj0']: $menurow['Phdj'];
			$my0_array["czdj2"] =($menurow['Czdj2']==null)?$menurow['Czdj20']:$menurow['Czdj2'];
			$my0_array["phdj2"] =($menurow['Phdj2']==null)?$menurow['Phdj20']:$menurow['Phdj2'];
			$my0_array["pfdj"] = ($menurow['Pfdj']==null)?$menurow['Pfdj0']:$menurow['Pfdj'];
			$my0_array["bydj"] = ($menurow['Bydj']==null)?$menurow['Bydj0']:$menurow['Bydj'];

			$my0_array["sldw"] = $menurow['Quantity_Unit'];
			$my0_array["zldw"] = $menurow['Weight_Unit'];
			$my0_array["zljs"] = $menurow['Weight_Status'];

			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));
	}
	return @'[]';

}

function typetreelist() {

	$p_e_code =$_GET["p_e_code"];
	//$_GET['p_e_code'];

	$sqlstr = "SELECT T_id as id ,T_name as text,T_code,Active FROM TYPE where E_code='" . $p_e_code . "'  order by T_code";
	//return $sqlstr;
	$typequery = mysql_query($sqlstr);

	if ($typequery) {
		$tree = array();
		while ($menurow = mysql_fetch_array($typequery)) {
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["T_code"] = $menurow['T_code'];
			$my0_array["Active"] = $menurow['Active'];
			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));

	}
	return @'[]';

}
function usertypetreelist() {

	$p_e_code =$_GET["p_e_code"];
	$sqlstr = "SELECT typeid as id ,typename as text,code,new,del,edit,cwsh ,sh,system,menustring,wxmenustring  FROM usertype where E_code='" . $p_e_code . "'  order by code";
	//return $sqlstr;
	$typequery = mysql_query($sqlstr);

	if ($typequery) {
		$tree = array();
		while ($menurow = mysql_fetch_array($typequery)) {
			$my0_array = array();
			$my0_array["text"] = urlencode($menurow['text']);
			$my0_array["id"] = $menurow['id'];
			$my0_array["code"] = $menurow['code'];
			$my0_array["new"] = $menurow['new'];
			$my0_array["edit"] = $menurow['edit'];
			$my0_array["del"] = $menurow['del'];
			$my0_array["sh"] = $menurow['sh'];
			$my0_array["cwsh"] = $menurow['cwsh'];
			$my0_array["menustring"] = $menurow['menustring'];
			$my0_array["wxmenustring"] = $menurow['wxmenustring'];
			$my0_array["system"] = $menurow['system'];
			
			$my0_array["leaf"] = 1;
			$my0_array["expanded"] = 1;
			array_push($tree, $my0_array);
		}
		return urldecode(json_encode($tree));

	}
	return @'[]';

}
function warehouselist() {
	$sqlstr = " SELECT * FROM warehouse where L_id=" . $_GET['p_l_id'] . " order by W_code";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function unitslist() {
	$sqlstr = " SELECT *  FROM units where L_id=" . $_GET['p_l_id'] . " order by Sort";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function produceslist() {

	$active =1;
	if (isset($_GET["active"]))
	{
     $active=$_GET['active'];
	}
	$sqlstr = " SELECT * ,P_id as id FROM produces where E_code='" . $_GET['p_e_code'] . "' and active=" . $active . "  order by P_code";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}
function jobslist() {

	$sqlstr = " SELECT *  FROM Jobs where E_code='" . $_GET['p_e_code'] . "'   and l_id=".$_GET['p_l_id'];
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cwsjlist() {
    $shzt=$_GET['shzt'];
	$lid=(int)$_GET['p_l_id'];

	if ($shzt)
	{ 
		$shzt='1';
		
	}
	else
	{
		$shzt='0';
	}
	$sqlstr = " SELECT *  FROM cwsj where E_code='" . $_GET['p_e_code'] ."' and shzt=".$shzt; 

 			if ($_GET["startdate"])
     		{
    			$sqlstr  .=" and sjrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$sqlstr  .=" and sjrq<='".$_GET["enddate"]."'";
	    	}
    		if ($lid>0)
    		{
    			$sqlstr  .=" and L_id=".$lid;
	    	}
	
	
	$sqlstr .= " order by sjrq desc";
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}



function typelist() {
	$sqlstr = " SELECT *,T_id as id  FROM type where E_code='" . $_GET['p_e_code'] . "'";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and Active=" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T_code ";
	//return $sqlstr.$_GET['active'];
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function userslist() {
	$table=$_GET['table'];
	$e_code=$_GET['p_e_code'];
	
	if ($table=="users"){
		$sqlstr = " SELECT users.*,users.userid as id  FROM users,usertype where users.typeid=usertype.typeid and usertype.E_code=" . $e_code ;
		if ($_GET['typeid']) {
			if ((int)$_GET['typeid']>0) {
				$sqlstr = $sqlstr . " and users.typeid=" . $_GET['typeid'];
			}
		}
	}
	else
	{   if ((int)$_GET['khid']>0){
		$sqlstr = " SELECT *,userid as id  FROM khusers where khid=" . $_GET['khid'] ;
	    }else{
	    	$sqlstr = " SELECT *,userid as id  FROM khusers " ;
	    }
	}
	$sqlstr = $sqlstr . " order by usercode";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}
function commoditytypelist_pc() {

	$sqlstr = " SELECT CT.*,CT.CT_id as id  FROM CommodityType CT,Type T where CT.T_id=T.T_id  and T.E_code='" . $_GET['p_e_code'] . "'";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and CT.Active=" . $_GET['active'];
	}
	if ($_GET['T_id']) {
		$sqlstr = $sqlstr . " and CT.T_id=" . $_GET['T_id'];
	}
	$sqlstr = $sqlstr . " order by CT.CT_code ";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cpjkdmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	$jkid=(int)$_GET["jkid"];
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
        case "cpjkdmxcksh":
			$filter .=" and cpjkd.ztbz<1 and cpjkd.delbz=0 ";
			break;
        case "cpjkdmxsh":
			$filter .=" and cpjkd.ztbz<2 and cpjkd.delbz=0 ";
			break;
			
        case "cpjkdmxcwsh":
			$filter .=" and cpjkd.ztbz=2 ";
			break;
        case "cpjkdmxloc":
			$filter .=" and (cpjkd.ztbz>1 or cpjkd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
	    	}
		if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpjkd.delbz=0";
		}

			break;
	}
    	if ($jkid>0)
		{
			$filter = " and cpjkd.jkid=".$jkid;
		}
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}
	
   if ($loc=="cpjkdprt"){
     	$sqlstr = " (SELECT 
  '1' AS mxdh,
  m.jkid,
  m.mxid,
  0 AS jeid,
  m.cdmc,
  m.cpmc,
  m.bzid,
  m.bzmc,
  m.cpgg,
  cw.cw,
  cw.cpph,
  m.jldw,
  cw.sl AS jcsl,
  cw.zl AS jczl,
  m.czdj,
  0 AS jcje,
  0 AS xjje,
  '' AS gs,
  '' AS byg,
  '' AS cg ,
  '' as zyfs
FROM
  cpjkdmx m,
  cpjkd, 
  cpjkdcw cw
WHERE cpjkd.jkid = m.jkid AND m.mxid=cw.mxid  ".$filter;
   }
   else
   {	


	$sqlstr = " (SELECT '1' as mxdh, m.jkid,m.mxid,0 as jeid,m.cdmc,m.cpmc,m.bzid,m.bzmc,m.cpgg,'' as cw,'' as cpph,m.jldw,m.jcsl,m.jczl,m.czdj,0 as jcje,0 as xjje 
     	,'' as gs,'' as byg,'' as cg ,'' as zyfs FROM cpjkdmx m,cpjkd where cpjkd.jkid=m.jkid  ".$filter;
    
    	
   }
    	$sqlstr =$sqlstr. ") union all ( SELECT '2' as mxdh,m.jkid,m.mxid,j.jeid,'' as cdmc,j.work as cpmc,0 as bzid,'' as bzmc,'' as cpgg,''  as cw,'' as cpph,j.dw as jldw,case when j.zljs=1 then 0 else j.sl end as  jcsl , ";
		$sqlstr =$sqlstr. " case when j.zljs=1 then j.sl else 0 end  as  jczl ,j.dj as czdj,case when j.xjbz=1 then 0 else j.je end  as  jcje ,case when j.xjbz=1 then j.je else 0 end  as  xjje 
		,gs,byg,cg ,'' as zyfs FROM cpjkdmx m,cpjkd,cpjkdje j where cpjkd.jkid=m.jkid and m.mxid=j.mxid  ".$filter;	
		$sqlstr =$sqlstr. ") order by mxid,mxdh";	
    //return $sqlstr;
    
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}

function cpgfdmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	$gfid=(int)$_GET["gfid"];
	//$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
        case "cpgfdmxsh":
			$filter .=" and cpgfd.ztbz<1 and cpgfd.delbz=0 ";
			break;
			
        case "cpgfdmxloc":
			$filter .=" and (cpgfd.ztbz>0 or cpgfd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpgfd.gfrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpgfd.gfrq<='".$_GET["enddate"]."'";
	    	}
		if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpgfd.delbz=0";
		}

			break;
	}
    	if ($gfid>0)
		{
			$filter = " and cpgfd.gfid=".$gfid;
		}
		if ($Lid>0)
		{
			$filter .= " and cpgfd.L_id=".$Lid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpgfd.khid=".$khid;
    	}

	$sqlstr = " SELECT  m.gfid,m.xmmc,m.mxid,m.cdmc,m.jldw,m.sl,m.zl,m.dj,m.je,m.xjje ,m.gs,m.byg,m.cg  
	FROM cpgfdmx m,cpgfd where cpgfd.gfid=m.gfid  ".$filter;

//	return $sqlstr;
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}

function cptzdmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	$tzid=(int)$_GET["tzid"];
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
        case "cptzdmxsh":
			$filter .=" and cptzd.ztbz=0 and cptzd.delbz=0 ";
			break;
	 //  case "cptzdmxcksh":
		//	$filter .=" and cptzd.ztbz=1 and cptzd.delbz=0 ";
		//	break;

        case "cptzdmxcwsh":
			$filter .=" and cptzd.ztbz=1  and cptzd.delbz=0  ";
			break;
        case "cptzdmxloc":
			$filter .=" and (cptzd.ztbz>1 or cptzd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cptzd.tzrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cptzd.tzrq<='".$_GET["enddate"]."'";
	    	}
					if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cptzd.delbz=0";
		}

			break;
	}
    	if ($tzid>0)
		{
			$filter = " and cptzd.tzid=".$tzid;
		}
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.khid=".$khid;
    	}
    
	
	
	
     	$sqlstr = " (SELECT '1' as mxdh, m.tzid,m.mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.jldw,
     	
     	m.tzsl,m.tzzl,m.czdj,0 as tzje,0 as xjje,
     	m.mints,m.area,m.cw,m.sm,m.cpph,m.czrq,m.newcw,m.newsm,m.newczdj,m.newczrq,m.newcpph ,'' as byg,'' as gs,'' as cg
     	FROM cptzdmx m,cptzd where cptzd.tzid=m.tzid  ".$filter;

     	$sqlstr =$sqlstr. ") union all ( SELECT '2' as mxdh,cptzd.tzid,j.jeid as mxid,'' as cdmc,
     	j.work as cpmc,'' as bzmc,'' as cpgg,j.dw as jldw,case when j.zljs=1 then 0 else j.sl end as  tzsl , ";
		$sqlstr =$sqlstr. " case when j.zljs=1 then j.sl else 0 end  as  tzzl , j.dj as czdj,
		case when j.xjbz=1 then 0 else j.je end  as  tzje ,case when j.xjbz=1 then j.je else 0 end  as  xjje
		,0 as mints,'' as area,'' as cw,'' as sm,'' as cpph,'' as czrq,'' as newcw,'' as newsm,0 as newczdj,'' as newczrq,'' as newcpph,j.byg,j.gs,j.cg 
		FROM cptzd,cptzdje j where cptzd.tzid=j.tzid ".$filter;	
		$sqlstr =$sqlstr. ") order by mxdh ,mxid ";
		
    	
		
   // return $sqlstr; 
    
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}


function cpckdmxlist_pc() {
		
	$Lid=(int)$_GET["l_id"];
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];

        $filter="";  	   
      switch($loc) 
	    {
      case "cpckdmxloc" :
  		$filter .="  and (cpckd.ztbz>2 or cpckd.delbz=1) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    		$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
	    }

		if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpckd.delbz=0";
		}

		break;
	case "cpckdmxcksh" :
  		$filter .="  and (cpckd.ztbz=1 and cpckd.delbz=0) ";	
		break;
	case "cpckdmxcwsh" :
  		$filter .="  and cpckd.ztbz=2 and cpckd.delbz=0  ";	
		break;
	case "cpckdmxsh" :
  		$filter .="  and cpckd.ztbz=0 and cpckd.delbz=0 ";	
		break;
	
	}

		if ($ckid>0)
		{
			$filter = " and cpckd.ckid=".$ckid;
		}
		if ($khid>0)
		{
			$filter .= " and cpxsd.khid=".$khid;
		}



   $sqlfilter=$filter;
   
   
   	if($Lid>0)
	{
			$filter .= " and cpxsd.L_id=".$Lid;
	}	
	
   
   
  $sqlstr = "(SELECT '1' AS mxdh, ck.ckid,ck.mxid,ck.cdmc,ck.cpmc,ck.bzmc,ck.cpgg,ck.cpph,ck.sm,ck.jldw,
  		0 as czdj,ck.ccsl,ck.cczl ,cw.cwsl,cw.cwzl,0 as ccje,0 as xjje,gs,byg,cg,jeid,bzid,xjbz   from   
		( SELECT '1' AS mxdh, cpckd.ckid,cm.ckmxid as mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.cpph,m.sm,m.jldw ,
		'' as gs,'' as byg,'' as cg,0 as jeid,cm.ccsl,cm.cczl ,m.bzid,cpxsd.xjbz
  		FROM cpxsdmx m,cpckd,cpxsd,cpckdmx cm  
  		WHERE cpckd.xsid = m.xsid AND cpxsd.xsid = m.xsid and cm.ckid=cpckd.ckid 
  		and cm.xsmxid=m.mxid  ".$filter;
   $sqlstr .=" ) ck LEFT OUTER JOIN (SELECT 
      m.ckid,
      m.ckmxid AS mxid ,
      SUM(w.sl) AS cwsl,
      SUM(w.zl) AS cwzl 
    FROM 
    cpckdcw w ,cpckdmx m,cpckd,cpxsd 
    WHERE w.ckmxid=m.ckmxid and cpckd.ckid=m.ckid  
	AND cpckd.xsid = cpxsd.xsid 
	 ".$sqlfilter;
    
   $sqlstr .="  GROUP BY m.ckid,
      m.ckmxid ) cw 
   ON cw.ckid=ck.ckid AND cw.mxid=ck.mxid ";
   
   


/*

SELECT '1' AS mxdh, cpckd.ckid,cm.ckmxid AS mxid,m.cdmc,m.cpmc,m.bzmc,
		m.cpgg,m.cpph,m.sm,m.jldw ,
		'' AS gs,'' AS byg,'' AS cg,0 AS jeid,cw.cwsl AS ccsl,cw.cwzl AS cczl,cw.area ,cw.cw
  		FROM cpxsdmx m,cpckd,cpxsd,cpckdmx cm ,(SELECT 
      m.ckid,
      m.ckmxid ,
      w.`area`,
      w.cw,
      SUM(w.sl) AS cwsl,
      SUM(w.zl) AS cwzl 
    FROM 
    cpckdcw w ,cpckdmx m,cpckd,cpxsd 
    WHERE w.ckmxid=m.ckmxid AND cpckd.ckid=m.ckid  
AND cpckd.xsid = cpxsd.xsid AND CPCKD.CKID=4652 
 GROUP BY m.ckid,m.ckmxid,w.area,w.cw ) cw 
  		WHERE cpckd.xsid = m.xsid AND cpxsd.xsid = m.xsid 
  		AND cm.ckid=cpckd.ckid
  		AND cw.ckmxid=cm.ckmxid
  		AND cm.xsmxid=m.mxid  AND CPCKD.CKID=4652

*/
   // $sqlstr ="";
   
   $sqlstr .=" )	union 	all	 (";
   
   
   $sqlstr .=" 	SELECT '2' AS mxdh, cpckd.ckid, cm.ckmxid as mxid, '' AS cdmc, 
    j.work AS cpmc, '' AS bzmc,   '' AS cpgg,'' as cpph,'' as sm ,
  j.dw AS jldw,  j.dj AS czdj,  CASE    WHEN j.zljs = 1    THEN 0  ELSE j.sl  END AS ccsl,
  CASE WHEN j.zljs = 1  THEN j.sl  ELSE 0  END AS cczl,0 as cwsl,0 as cwzl, 
  CASE WHEN j.xjbz = 1  THEN 0  ELSE j.je  END AS ccje,
  CASE WHEN j.xjbz = 1  THEN j.je   ELSE 0 END AS xjje
  ,j.gs,j.byg,j.cg,j.jeid  ,m.bzid,cpxsd.xjbz
  FROM
  cpxsdmx m,
  cpckd,
  cpckdje j,
  cpxsd,
  cpckdmx cm 
   WHERE cpckd.xsid = cpxsd.xsid 
  AND cpckd.ckid = cm.ckid
  AND cm.xsmxid=m.mxid and j.sl<>0  
  AND cm.ckmxid = j.ckmxid ".$filter;	
		$sqlstr .=") order by ckid,mxid,mxdh";
  
//  return $sqlstr;
    
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}


function cpghdghmxlist_pc() {
	  
	$Lid=1;
	$ghid=0;
	$khid=0;
	$loc='';

	if (isset($_GET["p_l_id"]))
	{
	$Lid=(int)$_GET["p_l_id"];
	}
	if (isset($_GET["ghid"]))
	{
	$ghid=(int)$_GET["ghid"];
	}if (isset($_GET["khid"]))
	{
	$khid=(int)$_GET["khid"];
	}
	if (isset($_GET["loc"]))
	{
	$loc=$_GET["loc"];
	}

	 $filter="";  	   
	 
	 

      switch($loc) 
	    {
        case "wxcpghdmxloc" :
  		$filter .="  and (wxcpghd.ztbz>3 and  wxcpghd.delbz=0 and wxcpghd.fhbz>0) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and wxcpghd.ghrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    		$filter .=" and wxcpghd.ghrq<='".$_GET["enddate"]."'";
	    }

		//if ($_GET["deletebz"]=="0")
		//{
		//		$filter .= " and wxcpghd.delbz=0";
		//}

		break;
	  case "wxcpghdmxcksh" :
  		$filter .="  and (wxcpghd.ztbz=2 and wxcpghd.fhbz>0 and wxcpghd.delbz=0) ";	
		break;
	  case "wxcpghdmxywsh" :
		$filter .="  and (wxcpghd.ztbz>3 and wxcpghd.fhbz>0 and wxcpghd.delbz=0) ";	
	  break;

	  case "wxcpghdmxcwsh" :
  		$filter .="  and wxcpghd.ztbz=3 and wxcpghd.fhbz>0 and wxcpghd.delbz=0  ";	
		break;
	//case "wxcpghdmxsh" :
  	//	$filter .="  and wxcpghd.ztbz=0 and wxcpghd.delbz=0 ";	
	//	break;
	
	}
	if ($ghid>0)
	{
		$filter = " and   wxcpghd.ghid=".$ghid;
	}
		
	$sqlfilter=$filter;
   
	if ($khid>0)
	{
			$filter .= " and wxcpghd.khid=".$khid;
	}
	if($Lid>0)
	 {
			 $filter .= " and wxcpghd.L_id=".$Lid;
	 }
	
  

   	
	
   
   /*
  $sqlstr = "(SELECT '1' AS mxdh, ck.ghid,ck.mxid,ck.cdmc,ck.cpmc,ck.bzmc,ck.cpgg,ck.cpph,ck.sm,ck.jldw,
  		0 as czdj,ck.ccsl,ck.cczl ,cw.cwsl,cw.cwzl,0 as ccje,0 as xjje,gs,byg,cg,jeid   from   
		( SELECT '1' AS mxdh, wxcpghd.ghid,cm.ckmxid as mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.cpph,m.sm,m.jldw ,
		'' as gs,'' as byg,'' as cg,0 as jeid,cm.ccsl,cm.cczl 
  		FROM cpxsdmx m,wxcpghd,cpxsd,wxcpghdmx cm  
  		WHERE wxcpghd.xsid = m.xsid AND cpxsd.xsid = m.xsid and cm.ghid=wxcpghd.ghid 
  		and cm.xsmxid=m.mxid  ".$filter;
   $sqlstr .=" ) ck LEFT OUTER JOIN (SELECT 
      m.ghid,
      m.ckmxid AS mxid ,
      SUM(w.sl) AS cwsl,
      SUM(w.zl) AS cwzl 
    FROM 
    wxcpghdcw w ,wxcpghdmx m,wxcpghd,cpxsd 
    WHERE w.ckmxid=m.ckmxid and wxcpghd.ghid=m.ghid  
	AND wxcpghd.xsid = cpxsd.xsid 
	 ".$sqlfilter;
    
   $sqlstr .="  GROUP BY m.ghid,
      m.ckmxid ) cw 
   ON cw.ghid=ck.ghid AND cw.mxid=ck.mxid ";
   */
   
   
   $sqlstr = "( SELECT '1' AS mxdh, ck.ghid,ck.mxid,ck.cdmc,ck.cpmc,ck.bzmc,ck.cpgg,ck.cpph,ck.sm,ck.jldw,
   0 AS czdj,ck.ghsl,ck.ghzl ,ck.xssl,ck.xszl,cw.cwsl,cw.cwzl,0 AS ccje,0 AS xjje,gs,byg,cg,jeid   FROM   
 ( SELECT '1' AS mxdh, wxcpghd.ghid,m.mxid AS mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.cpph,m.sm,m.jldw ,
 '' AS gs,'' AS byg,'' AS cg,0 AS jeid,m.ghsl,m.ghzl,m.xssl,m.xszl 
   FROM wxcpghd,wxcpghdmx m  
   WHERE wxcpghd.ghid = m.ghid ".$filter;

   $sqlstr .=") ck LEFT OUTER JOIN (SELECT 
m.ghid,
m.mxid ,
SUM(w.sl) AS cwsl,
SUM(w.zl) AS cwzl 
FROM 
wxcpghdcw w ,wxcpghdmx m,wxcpghd
WHERE w.mxid=m.mxid AND wxcpghd.ghid=m.ghid ".$sqlfilter;
    
 $sqlstr .=" GROUP BY m.ghid,m.mxid ) cw ON cw.ghid=ck.ghid AND cw.mxid=ck.mxid";


/*

SELECT '1' AS mxdh, wxcpghd.ghid,cm.ckmxid AS mxid,m.cdmc,m.cpmc,m.bzmc,
		m.cpgg,m.cpph,m.sm,m.jldw ,
		'' AS gs,'' AS byg,'' AS cg,0 AS jeid,cw.cwsl AS ccsl,cw.cwzl AS cczl,cw.area ,cw.cw
  		FROM cpxsdmx m,wxcpghd,cpxsd,wxcpghdmx cm ,(SELECT 
      m.ghid,
      m.ckmxid ,
      w.`area`,
      w.cw,
      SUM(w.sl) AS cwsl,
      SUM(w.zl) AS cwzl 
    FROM 
    wxcpghdcw w ,wxcpghdmx m,wxcpghd,cpxsd 
    WHERE w.ckmxid=m.ckmxid AND wxcpghd.ghid=m.ghid  
AND wxcpghd.xsid = cpxsd.xsid AND wxcpghd.ghid=4652 
 GROUP BY m.ghid,m.ckmxid,w.area,w.cw ) cw 
  		WHERE wxcpghd.xsid = m.xsid AND cpxsd.xsid = m.xsid 
  		AND cm.ghid=wxcpghd.ghid
  		AND cw.ckmxid=cm.ckmxid
  		AND cm.xsmxid=m.mxid  AND wxcpghd.ghid=4652

*/
   // $sqlstr ="";
   
   $sqlstr .=" )	union 	all	 (";
   
   
   $sqlstr .=" 	SELECT '2' AS mxdh, wxcpghd.ghid, m.mxid, '' AS cdmc, 
    j.work AS cpmc, '' AS bzmc,   '' AS cpgg,'' as cpph,'' as sm ,
  j.dw AS jldw,  j.dj AS czdj,  
  CASE    WHEN j.zljs = 1    THEN 0  ELSE j.sl  END AS ghsl,
  CASE WHEN j.zljs = 1  THEN j.sl  ELSE 0  END AS ghzl,0 as xssl,0 as xszl, 0 as cwsl,0 as cwzl, 
  CASE WHEN j.xjbz = 1  THEN 0  ELSE j.je  END AS ghje,
  CASE WHEN j.xjbz = 1  THEN j.je   ELSE 0 END AS xjje
  ,j.gs,j.byg,j.cg,j.jeid  
  FROM
  
  wxcpghd,
  wxcpghdje j,
  
  wxcpghdmx m 
   WHERE  wxcpghd.ghid = m.ghid
  and j.sl<>0  
  AND m.mxid = j.mxid ".$filter;	
		$sqlstr .=") order by ghid,mxid,mxdh";
  
  //return $sqlstr;
    
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}


function wxCpgfdgfmxlist_pc() {
	  
	$Lid=1;
	$gfid=0;
	$khid=0;
	$loc='';

	if (isset($_GET["p_l_id"]))
	{
	$Lid=(int)$_GET["p_l_id"];
	}
	if (isset($_GET["gfid"]))
	{
	$gfid=(int)$_GET["gfid"];
	}if (isset($_GET["khid"]))
	{
	$khid=(int)$_GET["khid"];
	}
	if (isset($_GET["loc"]))
	{
	$loc=$_GET["loc"];
	}

     $filter="";  	   
      switch($loc) 
	    {
      case "wxcpgfdmxloc" :
  		$filter .="  and (wxcpgfd.ztbz>0 and  wxcpgfd.delbz=0 and wxcpgfd.fhbz>0) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and wxcpgfd.gfrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    		$filter .=" and wxcpgfd.gfrq<='".$_GET["enddate"]."'";
	    }

		break;
	case "wxcpgfdmxcksh" :
  		$filter .="  and (wxcpgfd.ztbz=2 and wxcpgfd.fhbz>0 and wxcpgfd.delbz=0) ";	
		break;
	case "wxcpgfdmxywsh" :
		$filter .="  and (wxcpgfd.ztbz=1 and wxcpgfd.fhbz>0 and wxcpgfd.delbz=0) ";	
	  break;

	case "wxcpgfdmxcwsh" :
  		$filter .="  and wxcpgfd.ztbz=3 and wxcpgfd.fhbz>0 and wxcpgfd.delbz=0  ";	
		break;
	
	}

		if ($gfid>0)
		{
			$filter = " and wxcpgfd.gfid=".$gfid;
		}
		if ($khid>0)
		{
			$filter .= " and wxcpgfd.khid=".$khid;
		}



   $sqlfilter=$filter;
   
   
   	if($Lid>0)
	{
			$filter .= " and wxcpgfd.L_id=".$Lid;
	}	

   
   $sqlstr = "( SELECT '1' AS mxdh, m.gfid,m.mxid,m.cdmc,m.xmmc AS cpmc,m.bzmc,m.jldw,
   0 AS dj,m.sl,m.zl ,m.khsl,m.khzl,0 AS je,0 AS xjje, '' AS gs,'' AS byg,'' AS cg, 0 AS jeid   
   FROM wxcpgfd,wxcpgfdmx m  
   WHERE wxcpgfd.gfid = m.gfid ".$filter;
   
   $sqlstr .="  )	union 	all	 (";
      
   $sqlstr .=" 	SELECT '2' AS mxdh, wxcpgfd.gfid, m.mxid, '' AS cdmc, 
    j.work AS cpmc, '' AS bzmc,   
  j.dw AS jldw,  j.dj ,  
  CASE    WHEN j.zljs = 1    THEN 0  ELSE j.sl  END AS sl,
  CASE WHEN j.zljs = 1  THEN j.sl  ELSE 0  END AS zl,0 as khsl,0 as khzl,  
  CASE WHEN j.xjbz = 1  THEN 0  ELSE j.je  END AS je,
  CASE WHEN j.xjbz = 1  THEN j.je   ELSE 0 END AS xjje
  ,j.gs,j.byg,j.cg,j.jeid  
  FROM  wxcpgfd, wxcpgfdje j,  wxcpgfdmx m 
  WHERE  wxcpgfd.gfid = m.gfid
  and j.sl<>0  
  AND m.mxid = j.mxid ".$filter;	
		$sqlstr .=") order by gfid,mxid,mxdh";
  
  //return $sqlstr;
    
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}



function cpckdmxlist_prt() {
		
	$ckid=(int)$_GET["ckid"];
	$filter = " and cpckd.ckid=".$ckid;
   



  $sqlstr ="(SELECT '1' AS mxdh, cpckd.ckid,cm.ckmxid AS mxid,m.cdmc,m.cpmc,m.bzmc,
		m.cpgg,m.cpph,m.sm,m.jldw ,0 AS czdj,
		cw.cwsl AS ccsl,cw.cwzl AS cczl,
		0 AS ccje,0 AS xjje,
		'' AS gs,'' AS byg,'' AS cg,0 AS jeid,
		cw.area ,cw.cw
  		FROM cpxsdmx m,cpckd,cpxsd,cpckdmx cm ,(
	  SELECT  m.ckid,m.ckmxid,w.area,w.cw,SUM(w.sl) AS cwsl,SUM(w.zl) AS cwzl 
    FROM 
    cpckdcw w ,cpckdmx m,cpckd,cpxsd 
    WHERE w.ckmxid=m.ckmxid AND cpckd.ckid=m.ckid  
AND cpckd.xsid = cpxsd.xsid ".$filter;
    
  $sqlstr .=" GROUP BY m.ckid,m.ckmxid,w.area,w.cw ) cw 
  		WHERE cpckd.xsid = m.xsid AND cpxsd.xsid = m.xsid 
  		AND cm.ckid=cpckd.ckid
  		AND cw.ckmxid=cm.ckmxid
  		AND cm.xsmxid=m.mxid ".$filter;
    
  

		  $sqlstr .=" )	union 	all	 (";
   
   
		  $sqlstr .=" 	SELECT '2' AS mxdh, cpckd.ckid, cm.ckmxid as mxid, '' AS cdmc, 
		   j.work AS cpmc, '' AS bzmc,   '' AS cpgg,'' as cpph,'' as sm ,
		 j.dw AS jldw,  j.dj AS czdj,  CASE    WHEN j.zljs = 1    THEN 0  ELSE j.sl  END AS ccsl,
		 CASE WHEN j.zljs = 1  THEN j.sl  ELSE 0  END AS cczl, 
		 CASE WHEN j.xjbz = 1  THEN 0  ELSE j.je  END AS ccje,
		 CASE WHEN j.xjbz = 1  THEN j.je   ELSE 0 END AS xjje
		 ,j.gs,j.byg,j.cg,j.jeid  ,'' AS AREA,'' AS cw 
		 FROM
		 cpxsdmx m,
		 cpckd,
		 cpckdje j,
		 cpxsd,
		 cpckdmx cm 
		  WHERE cpckd.xsid = cpxsd.xsid 
		 AND cpckd.ckid = cm.ckid
		 AND cm.xsmxid=m.mxid and j.sl<>0  
		 AND cm.ckmxid = j.ckmxid ".$filter;	
			   $sqlstr .=") order by ckid,mxid,mxdh";
		



	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}


function cpghdghmxlist_prt() {
		
	$ghid=(int)$_GET["ghid"];
	$filter = " and wxcpghd.ghid=".$ghid;


  $sqlstr =" SELECT '1' AS mxdh, wxcpghd.ghid,m.mxid,m.cdmc,m.cpmc,m.bzmc,
  m.cpgg,m.cpph,m.sm,m.jldw ,0 AS czdj,
  cw.cwsl AS ccsl,cw.cwzl AS cczl,
  0 AS ccje,0 AS xjje,
  '' AS gs,'' AS byg,'' AS cg,0 AS jeid,
  cw.area ,cw.cw,'' as zyfs 
	FROM wxcpghd,wxcpghdmx m ,(
	SELECT  m.ghid,m.mxid,w.area,w.cw,SUM(w.sl) AS cwsl,SUM(w.zl) AS cwzl 
FROM  wxcpghdcw w ,wxcpghdmx m,wxcpghd 
WHERE w.mxid=m.mxid AND wxcpghd.ghid=m.ghid  ".$filter;
    
	$sqlstr .="	 GROUP BY m.ghid,m.mxid,w.area,w.cw ) cw 
	WHERE wxcpghd.ghid = m.ghid AND cw.mxid=m.mxid ".$filter;
    
	$sqlstr .="   UNION ALL  
SELECT '2' AS mxdh, wxcpghd.ghid, m.mxid , '' AS cdmc,j.work AS cpmc, '' AS bzmc,  
'' AS cpgg,'' AS cpph,'' AS sm ,  j.dw AS jldw, j.dj AS czdj, 
CASE WHEN j.zljs = 1  THEN 0  ELSE j.sl  END AS ccsl,
CASE WHEN j.zljs = 1  THEN j.sl  ELSE 0  END AS cczl,
CASE WHEN j.xjbz = 1  THEN 0  ELSE j.je  END AS ccje,
CASE WHEN j.xjbz = 1  THEN j.je   ELSE 0 END AS xjje
,j.gs,j.byg,j.cg,j.jeid,j.area,'' AS cw  ,'' as zyfs
FROM  wxcpghd,wxcpghdje j,wxcpghdmx m 
WHERE wxcpghd.ghid = m.ghid 
AND j.sl <>0  AND m.mxid = j.mxid ".$filter;
   // return $sqlstr;
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}


function cpjkdlist_pc() {
	$Lid=(int)$_GET["p_l_id"];
	$jkid=(int)$_GET["jkid"];
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
	$cpid=(int)$_GET["cpid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
        case "cpjkdcksh":
			$filter .=" and cpjkd.ztbz<1 and cpjkd.delbz=0 ";
			break;
			
        case "cpjkdsh":
			$filter .=" and cpjkd.ztbz<2  and cpjkd.delbz=0 ";
			break;
			
						
        case "cpjkdcwsh":
			$filter .=" and cpjkd.ztbz=2 and cpjkd.delbz=0  ";
			break;
        case "cpjkdloc":
			$filter .=" and (cpjkd.ztbz>2 or cpjkd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
	    	}
					if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpjkd.delbz=0";
		}

			break;
	
	    case "cpjksploc":
			$ckid=(int)$_GET["p_l_id"];
			$filter .=" and (cpjkd.ztbz>0 and cpjkd.delbz=0) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
	    	}

			if ($cpid>0)
		    {
				$filter .= " and w.cpid=".$cpid;
		    }

			break;
	}
    	if ($jkid>0)
		{
			$filter = " and cpjkd.jkid=".$jkid;
		}
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}
   		//if($Lid>0)
		//{
		//	$filter .= " and cpjkd.L_id=".$Lid;
		//}
		//$sqlstr = " SELECT cpjkd.*,cpjkd.jkid as id,location.L_name as ckmc,location.Address FROM cpjkd,location  where location.L_id=cpjkd.L_id ".$filter;
	if ($loc=="cpjksploc")
	{
	    $sqlstr = "SELECT cpjkd.khmc,cpjkd.czrq,w.cdmc,w.cpmc,w.bzmc,w.cpgg,cw.cpph,w.jldw,cpjkd.jkdh  as dh,cw.sl aS sl,cw.zl AS zl,location.l_name AS ckmc,cpjkd.ztbz
    FROM   CPJKDMX W,   cpjkd,location  ,cpjkdcw cw
    WHERE cpjkd.jkid = w.jkid and w.mxid=cw.mxid
	AND cpjkd.L_id=location.`L_id` ". $filter ;
	}
	else
	{
		$sqlstr = "SELECT *  FROM CPJKD   LEFT OUTER JOIN  (
		SELECT  W.JKid AS id,SUM(w.JCsl) AS JCSl, SUM(w.JCzl) AS JCzl,  SUM(w.JCJE) AS JCJE 
        FROM CPJKDMX W,cpjkd where cpjkd.jkid=w.jkid ". $filter ;
        $sqlstr .= " GROUP BY W.JKID ) CW  on cpjkd.JKID = CW.ID 
        LEFT OUTER JOIN  ( SELECT L_id,L_name AS ckmc  FROM location ) l ON cpjkd.l_id=l.l_id  where cpjkd.jkid>0 ". $filter ;
	}
		//return $sqlstr;
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}


function cpgfdlist_pc() {
	$Lid=(int)$_GET["p_l_id"];
	$gfid=(int)$_GET["gfid"];
	//$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
			
        case "cpgfdsh":
			$filter .=" and cpgfd.ztbz<1  and cpgfd.delbz=0 ";
			break;
			
						
        case "cpgfdloc":
			$filter .=" and (cpgfd.ztbz>0 or cpgfd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpgfd.gfrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpgfd.gfrq<='".$_GET["enddate"]."'";
	    	}
			if ($_GET["deletebz"]=="0")
	  		{
				$filter .= " and cpgfd.delbz=0";
			}
			break;
	
	}
    	if ($gfid>0)
		{
			$filter = " and cpgfd.gfid=".$gfid;
		}
		if ($Lid>0)
		{
			$filter .= " and cpgfd.L_id=".$Lid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpgfd.khid=".$khid;
    	}

		/*$sqlstr = "SELECT *  FROM CPgfD   LEFT OUTER JOIN  (
		SELECT  W.gfid AS id,SUM(w.sl) AS Sl, SUM(w.zl) AS zl,  SUM(w.JE) AS JE ,  SUM(w.xjJE) AS xjJE 
        FROM CPgfDMX W,cpgfd where cpgfd.gfid=w.gfid ". $filter ;
        $sqlstr .= " GROUP BY W.gfID ) CW  on cpgfd.gfID = CW.ID 
        LEFT OUTER JOIN  ( SELECT L_id,L_name AS ckmc  FROM location ) l ON cpgfd.l_id=l.l_id  where cpgfd.gfid>0 ". $filter ;
		*/
		$sqlstr = " SELECT CPgfD.*,l.ckmc,cpgfd.gfid as id  FROM CPgfD " ;
        
        $sqlstr .= " LEFT OUTER JOIN  ( SELECT L_id,L_name AS ckmc  FROM location ) l ON cpgfd.l_id=l.l_id  where cpgfd.gfid>0 ". $filter ;

		//return $sqlstr;
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}


function cpjxcloc() {
	$Lid=(int)$_GET["p_l_id"];
    $khid=(int)$_GET["khid"];
	$cpid=(int)$_GET["cpid"];
	$ny=(int)$_GET["ny"];
	$yu=(int)$_GET["yu"];
	
	$filter =" and cpjxc.l_id=".$Lid;
	if ($cpid>0)
		{
			$filter .= " and cpjxc.cpid=".$cpid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjxc.khid=".$khid;
    	}

		if ($ny>0)
    	{
    		$filter .= " and cpjxc.ny=".$ny;
    	}
		if ($yu>0)
    	{
    		$filter .= " and cpjxc.yu=".$yu;
    	}
	$sqlstr="SELECT cpjxc.l_id,khid,cdid,cpid,bzid,kh.c_name as khmc,kh.c_shortname as khjc,cd.P_name as cdmc,
	cp.s_name as cpmc,bz.ps_name as bzmc, cpph,
	jldw,
	SUM(kcsl0) AS kcsl0,SUM(kczl0) AS kczl0,
	SUM(jcsl) AS jcsl,SUM(jczl) AS jczl,
	SUM(ccsl) AS ccsl,SUM(cczl) AS cczl,
	SUM(tzjcsl-tzccsl) AS tzsl,SUM(tzjczl-tzcczl) AS tzzl,
	SUM(kcsl0+jcsl-ccsl+tzjcsl-tzccsl) AS kcsl,SUM(kczl0+jczl-cczl+tzjczl-tzcczl) AS kczl
	FROM cpjxc ,commodity cp,customer kh ,packing bz,produces cd
	WHERE cpjxc.khid=kh.C_id and cpjxc.cpid=cp.s_id 
	and cpjxc.cdid=cd.p_id and cpjxc.bzid=bz.ps_id ".$filter;
	$sqlstr .=" GROUP BY cpjxc.l_id,khid,cdid,cpid,bzid,kh.c_name,cd.P_name,cp.s_name ,bz.ps_name,cpph,jldw 
	 having sum(jcsl)<>0  or sum(ccsl)<>0  or sum(kcsl0)<>0  or SUM(tzjcsl-tzccsl)<>0  or SUM(kcsl0+jcsl-ccsl+tzjcsl-tzccsl) <>0";
    $query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cpjxcmxloc() {
	$Lid=(int)$_GET["p_l_id"];
    $khid=(int)$_GET["khid"];
	$cpid=(int)$_GET["cpid"];
	$cdid=(int)$_GET["cdid"];
	$bzid=(int)$_GET["bzid"];
	$ny=(int)$_GET["ny"];
	$yu=(int)$_GET["yu"];
	
	if ($khid>0)
	{
	$filter = " and cpjxc.khid=".$khid;
	}
	if ($cpid>0)
    	{
	$filter .= " and cpjxc.cpid=".$cpid;
		}
		if ($bzid>0)
    	{
	$filter .= " and cpjxc.bzid=".$cpid;
		}	
	
		if ($cdid>0)
    	{
    		$filter .= " and cd.p_id=".$cdid;
    	}


	    $filter1 =" and cpjxc.l_id=".$Lid;
		
    	$filter1 .= " and cpjxc.ny=".$ny;
    	
		if ($yu>0)
    	{
    		$filter1 .= " and cpjxc.yu=".$yu;
    	}
	$sqlstr="SELECT cpjxc.l_id,khid,cdid,cpid,bzid,kh.c_name as khmc,kh.c_shortname as khjc,cd.P_name as cdmc,
	cp.s_name as cpmc,bz.ps_name as bzmc, cpph,cpgg,jldw,
	SUM(kcsl0) AS kcsl0,SUM(kczl0) AS kczl0,
	0 AS jcsl,0 AS jczl,
	0 AS ccsl,0 AS cczl,
	0 AS tzsl,0 AS tzzl,
	SUM(kcsl0) AS kcsl,SUM(kczl0) AS kczl,'0' as cw,'' as czrq
	FROM cpjxc ,commodity cp,customer kh ,packing bz,produces cd
	WHERE cpjxc.khid=kh.C_id and cpjxc.cpid=cp.s_id 
	and (cpjxc.kcsl0<>0 or cpjxc.kczl0<>0) and cpjxc.cdid=cd.p_id and cpjxc.bzid=bz.ps_id ".$filter.$filter1 ;
	$sqlstr .=" GROUP BY cpjxc.l_id,khid,cdid,cpid,bzid,kh.c_name,cd.P_name
	,cp.s_name ,bz.ps_name,cpph,cpgg,jldw ";

	//	return $sqlstr;
    $query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cpjxcriloc() {
	$Lid=(int)$_GET["p_l_id"];
	$khid=(int)$_GET["khid"];
	$cpid=(int)$_GET["cpid"];
	$cdid=(int)$_GET["cdid"];
	$bzid=(int)$_GET["bzid"];
	$rq=$_GET["rq"];
	$area=$_GET["area"];
	$sqlstr="CALL loccprikc(".$Lid.",".$khid.",'".$rq."',".$cpid.",".$cdid.",".$bzid.",NULL)";
    $query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}
function loccheckcpkc() {
	$Lid=(int)$_GET["p_l_id"];
	$khid=(int)$_GET["khid"];
	$cpid=(int)$_GET["cpid"];
	$cdid=(int)$_GET["cdid"];
	$bzid=(int)$_GET["bzid"];
	$ny=$_GET["ny"];
	$yu=$_GET["yu"];
	$area=$_GET["area"];
	$sqlstr="CALL loccheckcpkc(".$Lid.",".$khid.",'".$ny."','".$yu."',".$cpid.",".$cdid.",".$bzid.",'')";
	//return $sqlstr;
    $query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}



function cptzdlist_pc() {
	$Lid=$_GET["p_l_id"];
	$tzid=(int)$_GET["tzid"];
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
    $loc=$_GET["loc"];
	$filter="";
	switch($loc){
        case "cptzdsh":
			$filter .=" and cptzd.ztbz=0 and cptzd.delbz=0 ";
			break;
       // case "cptzdcksh":
	//		$filter .=" and cptzd.ztbz=1 and cptzd.delbz=0 ";
	//		break;
        case "cptzdcwsh":
			$filter .=" and cptzd.ztbz=1  and cptzd.delbz=0 ";
			break;
        case "cptzdloc":
			$filter .=" and (cptzd.ztbz>1 or cptzd.delbz=1) ";
			//$filter .=" and (cptzd.ztbz=0 or cptzd.delbz=0) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cptzd.tzrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cptzd.tzrq<='".$_GET["enddate"]."'";
	    	}
			if ($_GET["deletebz"]=="0")
			{
				$filter .= " and cptzd.delbz=0";
			}

 		




			break;
	    }
    	if ($tzid>0)
		{
			$filter = " and cptzd.tzid=".$tzid;
		}

		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.khid=".$khid;
    	}






        if ($loc=="cptzsploc"){


			$ckid=(int)$_GET["p_l_id"];
 			$cpid=(int)$_GET["cpid"];
			
			$filter =" and (cptzd.ztbz>0 and  cptzd.delbz=0) ";
			
			if ($_GET["startdate"])
    		{
    			$filter .=" and cptzd.tzrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cptzd.tzrq<='".$_GET["enddate"]."'";
	    	}
			if ($cpid>0)
			{
				$filter .= " and w.cpid=".$cpid;
			}

			if ($ckid>0)
			{
				$filter .= " and cptzd.L_id=".$ckid;
			
			}
			if ($khid>0)
    		{
    			$filter .= " and cptzd.khid=".$khid;
    		}





			 $sqlstr1 = "SELECT cptzd.khmc,cptzd.tzrq as czrq,w.cdmc,w.cpmc,w.bzmc,w.cpgg,w.cpph,w.jldw,cptzd.tzdh  as dh,w.tzsl aS sl,w.tzzl AS zl,0 as tzsl,0 as tzzl,location.l_name AS ckmc
    FROM   CPtzdMX W,   cptzd,location  
    WHERE cptzd.tzid = w.tzid AND cptzd.L_id=location.`L_id` ". $filter ;

			$filter =" and (cptzd.ztbz>0 and  cptzd.delbz=0) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and w.newczrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and w.newczrq<='".$_GET["enddate"]."'";
	    	}
			if ($cpid>0)
			{
				$filter .= " and w.cpid=".$cpid;
			}

			if ($ckid>0)
			{
				$filter .= " and cptzd.L_id=".$ckid;
			
			}
			if ($khid>0)
    		{
    			$filter .= " and cptzd.newkhid=".$khid;
    		}
	$sqlstr2 = "SELECT cptzd.newkhmc as khmc,w.newczrq as czrq,w.cdmc,w.cpmc,w.bzmc,w.cpgg,w.cpph,w.jldw,cptzd.tzdh  as dh,0 as sl,0 as zl,w.tzsl ,w.tzzl ,location.l_name AS ckmc
    FROM   CPtzdMX W,   cptzd,location  
    WHERE cptzd.tzid = w.tzid AND cptzd.L_id=location.`L_id` ". $filter ;
     $sqlstr=	$sqlstr1." union all ".	$sqlstr2;



        }
        else
	    {
		 $sqlstr = " SELECT cptzd.*,cptzd.tzid as id,Location.L_name as ckmc FROM cptzd,Location where location.L_id=cptzd.L_id ".$filter;
        }
    		//return $sqlstr; 
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}



function cpghdghlist_pc() {
	
	$Lid=(int)$_GET["p_l_id"];
	$khid=(int)$_GET["khid"];
	$ghid=(int)$_GET["ghid"];
    $loc=$_GET["loc" ];
	$filter="";  	   
    switch($loc) 
	    {
      case "cpghdghloc" :
  		$filter .="  and (cpghd.ztbz>3 and  cpghd.delbz=0) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    		$filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
	    }
		
		//if ($_GET["deletebz"]=="0")
		//{
		//		$filter .= " and cpghd.delbz=0";
		//}
		break;
      case "cpghsploc" :
  		$filter .="  and (cpghd.ztbz>3 and cpghd.delbz=0) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    		$filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
	    }
		$cpid=$_GET["cpid"];

		if ($cpid>0)
		{
				$filter .= " and xm.cpid=".$cpid;
		}
		break;

	 case "cpghdcksh" :
  		$filter .="  and (cpghd.ztbz=2 and cpghd.delbz=0) ";	
		break;
	 case "cpghdghsh" :
  		$filter .="  and cpghd.ztbz=1   and cpghd.fhbz=2  and cpghd.delbz=0  ";	
		break;	
	  case "cpghdcwsh" :
  		$filter .="  and cpghd.ztbz=3 and cpghd.delbz=0   ";	
		break;

	}
		if($Lid>0)
		{
			$filter .= " and cpghd.L_id=".$Lid;
		}	
		if ($ghid>0)
		{
			$filter = " and cpghd.ghid=".$ghid;
		}
		if ($khid>0)
		{
			$filter .= " and cpghd.khid=".$khid;
		}

    if ($loc=="cpcksploc")
	{
	    $sqlstr = "SELECT cpghd.khmc,cpghd.ghrq as czrq,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.cpph,
		m.jldw,cpghd.ghdh  as dh,m.ghsl aS sl,m.ghzl AS zl,location.l_name AS ckmc
        FROM   wxcpghd cpghd,wxcpghdmx m,location  
        WHERE cpghd.ghid = m.ghid 
	    AND cpghd.L_id=location.L_id ". $filter ;
	}
	else
	{
		$sqlstr = "SELECT d.ghid,d.ghrq,d.czy,'' as thr,d.ztbz,d.cnote,d.shr,d.delbz,d.xsrq,d.ghdh,
		d.rq,d.shrq,d.l_id,d.ckmc,d.khmc,
		cw.* FROM (
			SELECT *  FROM wxcpghd  cpghd where cpghd.ghid>0 ". $filter ; 
			$sqlstr .= ") d LEFT OUTER JOIN  (
		SELECT  W.ghid AS id,SUM(w.ghsl) AS ghsl, SUM(w.ghzl) AS ghzl, SUM(w.cwccsl) AS ccsl, SUM(w.cwcczl) AS cczl,  SUM(w.ghje) AS ccje,  SUM(w.xjje) AS xjje  
		FROM wxcpghdMX W,wxcpghd cpghd WHERE  cpghd.ghid=w.ghid  ". $filter ; 
		$sqlstr .= " GROUP BY W.ghid ) CW ON d.ghid = CW.ID ";
	}

//return $sqlstr;
		$query = mysql_query($sqlstr);

		return getjsonstoredata($query, 0);
		}

		function cpckdlist_pc() {
	
			$Lid=(int)$_GET["p_l_id"];
			$khid=(int)$_GET["khid"];
			$ckid=(int)$_GET["ckid"];
				$loc=$_GET["loc" ];
				$filter="";  	   
			
			switch($loc) 
				{
			  case "cpckdloc" :
				  $filter .="  and (cpckd.ztbz>2 or cpckd.delbz=1) ";
				if ($_GET["startdate"])
				{
					$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
				}
				if ($_GET["enddate"])
				{
					$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
				}
				
				if ($_GET["deletebz"]=="0")
				{
						$filter .= " and cpckd.delbz=0";
				}
				break;
			  case "cpcksploc" :
				  $filter .="  and (cpckd.ztbz>0 and cpckd.delbz=0) ";
				if ($_GET["startdate"])
				{
					$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
				}
				if ($_GET["enddate"])
				{
					$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
				}
				$cpid=$_GET["cpid"];
			  //  $ckid=(int)$_GET["p_l_id"];
				if ($cpid>0)
				{
						$filter .= " and xm.cpid=".$cpid;
				}
				break;
		
			 case "cpckdcksh" :
				  $filter .="  and (cpckd.ztbz=1 and cpckd.delbz=0) ";	
				break;
			 case "cpckdsh" :
				  $filter .="  and cpckd.ztbz=0  and cpckd.delbz=0  ";	
				break;	
			  case "cpckdcwsh" :
				  $filter .="  and cpckd.ztbz=2 and cpckd.delbz=0   ";	
				break;
		
			}
				if($Lid>0)
				{
					$filter .= " and cpxsd.L_id=".$Lid;
				}	
				if ($ckid>0)
				{
					$filter = " and cpckd.ckid=".$ckid;
				}
				if ($khid>0)
				{
					$filter .= " and cpxsd.khid=".$khid;
				}
		
		if ($loc=="cpcksploc")
			{
				$sqlstr = "SELECT cpxsd.khid,cpxsd.khmc,cpckd.ckrq as czrq,xm.cdmc,xm.cpmc,xm.bzmc,xm.cpgg,xm.cpph,
				xm.jldw,cpckd.ckdh  as dh,m.ccsl aS sl,m.cczl AS zl,location.l_name AS ckmc,cpxsd.xjbz
			FROM   CPxsdmx xm, cpckd,cpckdmx m,cpxsd,location  
			WHERE cpxsd.xsid=xm.xsid and  cpckd.ckid = m.ckid 
			and   cpxsd.xsid=cpckd.xsid and xm.mxid=m.xsmxid
			 AND cpxsd.L_id=location.L_id ". $filter ;
			}
			else
			{
		
		$sqlstr = "SELECT d.ckid,d.xsid,d.ckrq,d.czy,d.thr,d.ztbz,d.cnote,d.shr,d.delbz,d.xsrq,d.xsdh,
		d.rq,d.shrq,d.ckdh,d.cwsh,d.cwshrq,d.cphm,d.ckcl,d.ckzt,d.cgy,d.l_id,d.ckmc,d.khmc,d.khid,d.xjbz,
		cw.* FROM (
		SELECT cpckd.* ,cpxsd.l_id,cpxsd.ckmc,cpxsd.khmc,cpxsd.khid,cpxsd.xsrq,cpxsd.xsdh,cpxsd.xjbz FROM CPCKD  
		INNER JOIN cpxsd  ON (cpckd.xsid = cpxsd.xsid) where cpckd.ckid>0 ". $filter ; 
		
		$sqlstr .= ") d LEFT OUTER JOIN  (
		SELECT  W.cKid AS id,SUM(w.cwccsl) AS ccsl, SUM(w.cwcczl) AS cczl,  SUM(w.ccje) AS ccje,  SUM(w.xjje) AS xjje  
		FROM CPCKDMX W,cpckd,cpxsd WHERE cpxsd.xsid=cpckd.xsid and cpckd.ckid=w.ckid  ". $filter ; 
		$sqlstr .= " GROUP BY W.cKID ) CW ON d.cKID = CW.ID ";
			}
		
		//return $sqlstr;
				$query = mysql_query($sqlstr);
		
				return getjsonstoredata($query, 0);
				}
		

function cpjcworklist_pc() {
	$Lid=(int)$_GET["p_l_id"];
	$jclb=$_GET["jclb"];
	if ($jclb=='全部')
	{
		$jclb='';
	}
	$ckid=(int)$_GET["ckid"];
	$khid=(int)$_GET["khid"];
	$loc=$_GET["loc"];
	$filter="";
	$sqlstr1="";
	$sqlstr2="";
	$sqlstr3="";
    if (($jclb=="进仓")|| ($jclb=="")) {

		$filter =" and cpjkd.ztbz>2 ";
		if ($_GET["startdate"])
    	{
    			$filter .=" and cpjkd.czrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    			$filter .=" and cpjkd.czrq<='".$_GET["enddate"]."'";
	    }

		if ($cpid>0)
		{
				$filter .= " and cpjkdmx.cpid=".$cpid;
		}
    	
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}

	$sqlstr1 = "SELECT '进仓' as jclb,
    `cpjkd`.`jkdh` as dh
    , `cpjkd`.`czrq` as rq
    , `cpjkd`.`khmc`
    , `cpjkdmx`.`cpmc`
    , `cpjkdmx`.`bzmc`
	, `cpjkdmx`.`jldw`
    , `cpjkdmx`.`jcsl`
    , `cpjkdmx`.`jczl`
    , `cpjkdje`.`work`
    , `cpjkdje`.`sl`
    , `cpjkdje`.`dw`
    , `cpjkdje`.`dj`
    , `cpjkdje`.`je`
    , `cpjkdje`.`jeid` as id
	,case when cpjkdje.xjbz then cpjkdje.je else 0 end as xjje
    , `cpjkdje`.`byg`
    , `cpjkdje`.`gs`
    , `cpjkdje`.`cg`
    FROM
    `wms`.`cpjkdmx`
    INNER JOIN `wms`.`cpjkd` 
        ON (`cpjkdmx`.`jkid` = `cpjkd`.`jkid`)
    INNER JOIN `wms`.`cpjkdje` 
        ON (`cpjkdje`.`mxid` = `cpjkdmx`.`mxid`)  
		where cpjkd.delbz=0  ".$filter;
	}

 	if (($jclb=="出仓")||($jclb=="")) {

		$filter =" and cpckd.ztbz>2 ";
		if ($_GET["startdate"])
    	{
    			$filter .=" and cpckd.ckrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    			$filter .=" and cpckd.ckrq<='".$_GET["enddate"]."'";
	    }

		if ($cpid>0)
		{
				$filter .= " and cpxddmx.cpid=".$cpid;
		}
    	
		if ($ckid>0)
		{
			$filter .= " and cpxsd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpxsd.khid=".$khid;
    	}

	$sqlstr2 = "SELECT '出仓' as jclb,
    `cpckd`.`ckdh` as dh
    , `cpckd`.`ckrq` as rq
    , `cpxsd`.`khmc`
    , `cpxsdmx`.`cpmc`
    , `cpxsdmx`.`bzmc`
	, `cpxsdmx`.`jldw`
    , `cpckdmx`.`ccsl` as jcsl
    , `cpckdmx`.`cczl` as jczl
    , `cpckdje`.`work`
    , `cpckdje`.`sl`
    , `cpckdje`.`dw`
    , `cpckdje`.`dj`
    , `cpckdje`.`je`
    , `cpckdje`.`jeid` as id
	,case when cpckdje.xjbz then cpckdje.je else 0 end as xjje
    , `cpckdje`.`byg`
    , `cpckdje`.`gs`
    , `cpckdje`.`cg`
    FROM
    `wms`.`cpckdmx`
    INNER JOIN `wms`.`cpckd` 
        ON (`cpckdmx`.`ckid` = `cpckd`.`ckid`)
	INNER JOIN `wms`.`cpxsdmx` 
        ON (`cpckdmx`.`xsmxid` = `cpxsdmx`.`mxid`)	
	INNER JOIN `wms`.`cpxsd` 
        ON (`cpckd`.`xsid` = `cpxsd`.`xsid`)	
    INNER JOIN `wms`.`cpckdje` 
        ON (`cpckdje`.`ckmxid` = `cpckdmx`.`ckmxid`)  
	
	where cpckd.delbz=0 ".$filter;
	}

    if (($sqlstr1!="")&&($sqlstr2!=""))
	{
      $sqlstr1.=" union all ".$sqlstr2;
	}
	else{

		if ($sqlstr2!="")
		{
			$sqlstr1=$sqlstr2;
		}
	}    




if (($jclb=="过货")|| ($jclb=="")) {

		$filter =" and cpgfd.ztbz>0 ";
		if ($_GET["startdate"])
    	{
    			$filter .=" and cpgfd.gfrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    			$filter .=" and cpgfd.gfrq<='".$_GET["enddate"]."'";
	    }
   	
		if ($ckid>0)
		{
			$filter .= " and cpgfd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpgfd.khid=".$khid;
    	}

	$sqlstr0 = "SELECT '过货' as jclb,
    `cpgfd`.`gfdh` as dh
    , `cpgfd`.`gfrq` as rq
    , `cpgfd`.`khmc`
    , `cpgfdmx`.`xmmc` as cpmc
    , '' as `bzmc`
	, '' as jldw
    , 0 as jcsl
    , 0 as jczl
    , '过货' as `work`
    , `cpgfdmx`.`zl` as sl
    , `cpgfdmx`.`jldw` as dw
    , `cpgfdmx`.`dj`
    , `cpgfdmx`.`je`
    , `cpgfdmx`.`mxid` as id
	,case when cpgfd.xjbz then cpgfdmx.je else 0 end as xjje
    , `cpgfdmx`.`byg`
    , `cpgfdmx`.`gs`
    , `cpgfdmx`.`cg`
    FROM
    `wms`.`cpgfdmx`
    INNER JOIN `wms`.`cpgfd` 
        ON (`cpgfdmx`.`gfid` = `cpgfd`.`gfid`)
    where cpgfd.delbz=0  ".$filter;
	}


    if (($sqlstr1!="")&&($sqlstr0!=""))
	{
      $sqlstr1.=" union all ".$sqlstr0;
	}
	else{
		if ($sqlstr0!="")
		{
			$sqlstr1=$sqlstr0;
		}
	}    













  if (($jclb=="其它")|| ($jclb=="")) {

		$filter =" and cptzd.ztbz>0 ";
		if ($_GET["startdate"])
    	{
    			$filter .=" and cptzd.tzrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
    	{
    			$filter .=" and cptzd.tzrq<='".$_GET["enddate"]."'";
	    }

    	
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.khid=".$khid;
    	}

	$sqlstr3 = "SELECT '其它' as jclb,
      `cptzd`.`tzdh` as dh
    , `cptzd`.`tzrq` as rq
    , `cptzd`.`khmc`
	 , '' as cpmc
    , '' as bzmc
	, '' as jldw
    , 0 as jcsl
    , 0 as jczl

    , `cptzdje`.`work`
    , `cptzdje`.`sl`
    , `cptzdje`.`dw`
    , `cptzdje`.`dj`
    , `cptzdje`.`je`
    , `cptzdje`.`jeid` as id
	,case when cptzdje.xjbz then cptzdje.je else 0 end as xjje
    , `cptzdje`.`byg`
    , `cptzdje`.`gs`
    , `cptzdje`.`cg`
    FROM
    `wms`.`cptzd`
     INNER JOIN `wms`.`cptzdje` 
        ON (`cptzd`.`tzid` = `cptzdje`.`tzid`)  
		where cptzd.delbz=0 ".$filter;
	}

    if (($sqlstr1!="")&&($sqlstr3!=""))
	{
      $sqlstr1.=" union all ".$sqlstr3;
	}
	else{

		if ($sqlstr3!="")
		{
			$sqlstr1=$sqlstr3;
		}
	}    




		//return $sqlstr1;
		$query = mysql_query($sqlstr1);
		return getjsonstoredata($query, 0);
}


function cpdaykclist_pc() {
	$Lid=(int)$_GET["p_l_id"];
	
	$jclb="";
	$ckid=$Lid;//(int)$_GET["ckid"];

	$khid=(int)$_GET["khid"];
	
	$loc=$_GET["loc"];

	$ny=(int)$_GET["ny"];
	$yu=(int)$_GET["yu"];
    $startdate="2017-01-01"; 
    $enddate= $_GET["enddate"];
	
    if ($yu==1)
	{
		$ny0=$ny-1;
        $yu0=12;
	} else
	{
		$ny0=$ny;
		$yu0=$yu-1;		
	}   




	 
	$ri=(int)$_GET["ri"];

	$filter="";
	$sqlstr1="";
	$sqlstr2="";
	$sqlstr3="";
    if (($jclb=="进仓")|| ($jclb=="")) {

		/*$filter =" and cpjkd.ztbz>2 and YEAR(cpjkd.czrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cpjkd.czrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cpjkd.czrq)<=".$ri;
	    }*/

        $filter =" and cpjkd.ztbz>2 and cpjkd.czrq BETWEEN '2017-01-01' and '".$enddate."'";
    	
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}

	$sqlstr1 = "SELECT '进仓' as jclb
    , `cpjkd`.`khmc`
	,commodity.S_name as cpmc
	,0 as kcsl,0 as kczl
	,0 as kcsl0,0 as kczl0
    , `cpjkdmx`.`jcsl`
    , `cpjkdmx`.`jczl`,
	0 as ccsl,0 as cczl
	, 0 as gfsl, 0 as gfzl
    , 0 as tzsl, 0 as tzzl

    FROM
    `wms`.`cpjkdmx`
	
    INNER JOIN `wms`.`cpjkd` 
        ON (`cpjkdmx`.`jkid` = `cpjkd`.`jkid`)
	INNER JOIN `wms`.`commodity` 
		ON (`cpjkdmx`.`cpid` = `commodity`.`S_id`)	
        where cpjkd.delbz=0  ".$filter;
	}

 	if (($jclb=="出仓")||($jclb=="")) {

   		$filter =" and cpckd.ztbz>2 and  cpckd.ckrq  BETWEEN '2017-01-01' and '".$enddate."'";

    	/*if ($yu>0)
    	{
    			$filter .=" and MONTH(cpckd.ckrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cpckd.ckrq)<=".$ri;
	    }*/
   	
		if ($ckid>0)
		{
			$filter .= " and cpxsd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpxsd.khid=".$khid;
    	}

	$sqlstr2 = "SELECT '出仓' as jclb
    , `cpxsd`.`khmc`
	,cpxsdmx.cpmc
	,0 as kcsl,0 as kczl
	,0 as kcsl0,0 as kczl0
	,0 as jcsl,0 as jczl
    , `cpckdmx`.`ccsl` as jcsl
    , `cpckdmx`.`cczl` as jczl
	, 0 as gfsl, 0 as gfzl
    , 0 as tzsl, 0 as tzzl
	
	
    FROM
    `wms`.`cpckdmx`
    INNER JOIN `wms`.`cpckd` 
        ON (`cpckdmx`.`ckid` = `cpckd`.`ckid`)
	INNER JOIN `wms`.`cpxsdmx` 
        ON (`cpckdmx`.`xsmxid` = `cpxsdmx`.`mxid`)	
	INNER JOIN `wms`.`cpxsd` 
        ON (`cpckd`.`xsid` = `cpxsd`.`xsid`)	
    where cpckd.delbz=0 ".$filter;
	}

    if (($sqlstr1!="")&&($sqlstr2!=""))
	{
      $sqlstr1.=" union all ".$sqlstr2;
	}
	else{

		if ($sqlstr2!="")
		{
			$sqlstr1=$sqlstr2;
		}
	}    






	    $filter =" and ( cpjxc.kcsl<>0 or cpjxc.kczl<>0 )";

    	
    	$filter =" and cpjxc.ny=".$ny0;
		$filter .=" and cpjxc.yu=".$yu0;
	    
   	

		if ($ckid>0)
		{
			$filter .= " and cpjxc.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjxc.khid=".$khid;
    	}

	$sqlstr0 = "SELECT '' as jclb,
  kh.c_name AS khmc,
  cp.S_name AS cpmc,
  kcsl,
  kczl,
  0 as kcsl0,0 as kczl0,
  0 AS jcsl,
  0 AS jczl,
  0 AS ccsl,
  0 AS cczl,
  0 AS gfsl,
  0 AS gfzl,
  0 AS tzsl,
  0 AS tzzl 
FROM
  cpjxc 
  INNER JOIN commodity cp 
    ON (cpjxc.cpid = cp.S_id) 
  INNER JOIN customer kh 
    ON (cpjxc.khid = kh.c_id)	
WHERE  ( cpjxc.kcsl<>0 OR cpjxc.kczl<>0 )  ".$filter;



    if (($sqlstr1!="")&&($sqlstr0!=""))
	{
      $sqlstr1.=" union all ".$sqlstr0;
	}
	else{
		if ($sqlstr0!="")
		{
			$sqlstr1=$sqlstr0;
		}
	}    







//*******************************


	    
   /*	


			$filter = " and cpkc.L_id=".$ckid;
				if ($khid>0)
    	{
    		$filter .= " and cpkc.khid=".$khid;
    	
		}
	$sqlstr0 = "SELECT '' AS jclb,customer.c_name AS khmc,
commodity.s_name AS cpmc,
0 as kcsl,0 as kczl
,cpkcmx.sl AS kcsl0,cpkcmx.zl AS kczl0
	
    , 0 as jcsl    , 0 as jczl
    , 0 as ccsl    , 0 as cczl
    , 0 as gfsl    , 0 as gfzl
	, 0 as tzsl ,0 as tzzl 

FROM cpkc,cpkcmx ,customer,commodity
WHERE cpkc.kcid=cpkcmx.kcid
AND cpkc.cpid=commodity.`S_id`
 AND (cpkcmx.sl<>0 OR cpkcmx.zl<>0)
AND cpkc.khid=customer.`C_id`  ".$filter;



    if (($sqlstr1!="")&&($sqlstr0!=""))
	{
      $sqlstr1.=" union all ".$sqlstr0;
	}
	else{
		if ($sqlstr0!="")
		{
			$sqlstr1=$sqlstr0;
		}
	}    



*/





//********************************







  if (($jclb=="其它")|| ($jclb=="")) {

 	    $filter =" and cptzd.khid<> cptzd.newkhid  and cptzd.ztbz>0 and cptzd.tzrq BETWEEN '2017-01-01' and '".$enddate."'";

    	/*if ($yu>0)
    	{
    			$filter .=" and MONTH(cptzd.tzrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cptzd.tzrq)<=".$ri;
	    }
   	
*/



    	
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.khid=".$khid;
    	}

	$sqlstr3 = "SELECT '其它' as jclb
    , cptzd.khmc
	, cptzdmx.cpmc
	,0 as kcsl,0 as kczl
	,0 as kcsl0,0 as kczl0
    , 0 as jcsl    , 0 as jczl
    , 0 as ccsl    , 0 as cczl
	,cptzdmx.tzsl as gfsl ,cptzdmx.tzzl as gfzl 
	, 0 as tzsl    , 0 as tzzl
    FROM
    `wms`.`cptzd`
     INNER JOIN `wms`.`cptzdmx` 
        ON (`cptzd`.`tzid` = `cptzdmx`.`tzid`)  
		where cptzd.delbz=0 ".$filter;
}

    if (($sqlstr1!="")&&($sqlstr3!=""))
	{
      $sqlstr1.=" union all ".$sqlstr3;
	}
	else{

		if ($sqlstr3!="")
		{
			$sqlstr1=$sqlstr3;
		}
	}    


  if (($jclb=="其它")|| ($jclb=="")) {

 	    $filter =" and cptzd.khid<> cptzd.newkhid  and cptzd.ztbz>0 and cptzd.tzrq BETWEEN '2017-01-01' and '".$enddate."'";

    /*	if ($yu>0)
    	{
    			$filter .=" and MONTH(cptzd.tzrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cptzd.tzrq)<=".$ri;
	    }
   	

*/


    	
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.newkhid=".$khid;
    	}

	$sqlstr3 = "SELECT '其它' as jclb
    , cptzd.newkhmc as khmc
	, cptzdmx.cpmc
	,0 as kcsl,0 as kczl
	,0 as kcsl0,0 as kczl0
    , 0 as jcsl    , 0 as jczl
    , 0 as ccsl    , 0 as cczl
    , 0 as gfsl    , 0 as gfzl
	,cptzdmx.tzsl ,cptzdmx.tzzl 
    FROM
    `wms`.`cptzd`
     INNER JOIN `wms`.`cptzdmx` 
        ON (`cptzd`.`tzid` = `cptzdmx`.`tzid`)  
		where cptzd.delbz=0 ".$filter;
}

    if (($sqlstr1!="")&&($sqlstr3!=""))
	{
      $sqlstr1.=" union all ".$sqlstr3;
	}
	else{

		if ($sqlstr3!="")
		{
			$sqlstr1=$sqlstr3;
		}
	}    

//return $sqlstr1;
		$sql="select * from ( select  khmc as bz,'' as khmc, cpmc,
		sum(kcsl) as kcsl,sum(kczl) as kczl,
		sum(kcsl0) as kcsl0,sum(kczl0) as kczl0,
		sum(jcsl) as jcsl,sum(jczl) as jczl,
		sum(ccsl) as ccsl,sum(cczl) as cczl,
		sum(gfsl) as gfsl,sum(gfzl) as gfzl,
		sum(tzsl) as tzsl,sum(tzzl) as tzzl,
		sum(kcsl-ccsl+jcsl-gfsl+tzsl) as sl,sum(kczl-cczl+jczl-gfzl+tzzl) as zl,
		sum(kcsl-ccsl+jcsl-gfsl+tzsl-kcsl0) as sl0,sum(kczl-cczl+jczl-gfzl+tzzl-kczl0) as zl0
		from (".$sqlstr1.") k  group by khmc,cpmc ) k where 
		k.kcsl<>0 or k.kczl<>0 or
		k.jcsl<>0 or k.jczl<>0 or
		k.ccsl<>0 or k.cczl<>0 or
		k.gfsl<>0 or k.gfzl<>0 or
		k.tzsl<>0 or k.tzzl<>0 or kcsl-ccsl+jcsl-gfsl+tzsl-kcsl0<>0


		";




	//return $sql;
		$query = mysql_query($sql);
		return getjsonstoredata($query, 0);
}

function cpjcttlist_pc() {
	$Lid=(int)$_GET["p_l_id"];
	$jclb=$_GET["jclb"];
	if ($jclb=='全部')
	{
		$jclb='';
	}
	$jclb="";
	$ckid=$Lid;//(int)$_GET["ckid"];

	$khid=(int)$_GET["khid"];
	$loc=$_GET["loc"];

	$ny=(int)$_GET["ny"];
	$yu=(int)$_GET["yu"];
	$ri=(int)$_GET["ri"];
	$area=$_GET["area"];

	$filter="";
	$sqlstr1="";
	$sqlstr2="";
	$sqlstr3="";
    if (($jclb=="进仓")|| ($jclb=="")) {

		$filter =" and cpjkd.ztbz>2 and YEAR(cpjkd.czrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cpjkd.czrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cpjkd.czrq)=".$ri;
	    }

        if ($area>"")
		{
			$filter .= " and cpjkd.area='".$area."'";
			
		}
    	
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}

	$sqlstr1 = "SELECT '进仓' as jclb
    , `cpjkd`.`khmc`
	,commodity.S_name as cpmc
    , `cpjkdmx`.`jcsl`
    , `cpjkdmx`.`jczl`,
	0 as ccsl,0 as cczl
	, 0 as gfsl, 0 as gfzl
    , 0 as tzsl, 0 as tzzl

    FROM
    `wms`.`cpjkdmx`
	
    INNER JOIN `wms`.`cpjkd` 
        ON (`cpjkdmx`.`jkid` = `cpjkd`.`jkid`)
	INNER JOIN `wms`.`commodity` 
		ON (`cpjkdmx`.`cpid` = `commodity`.`S_id`)	
        where cpjkd.delbz=0  ".$filter;
	}

 	if (($jclb=="出仓")||($jclb=="")) {

   		$filter =" and cpckd.ztbz>2 and YEAR(cpckd.ckrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cpckd.ckrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cpckd.ckrq)=".$ri;
	    }
   	
        if ($area>"")
		{
			$filter .= " and cpckdcw.area='".$area."'";
			
		}

		if ($ckid>0)
		{
			$filter .= " and cpxsd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpxsd.khid=".$khid;
    	}

	$sqlstr2 = "SELECT '出仓' as jclb
    , `cpxsd`.`khmc`
	,cpxsdmx.cpmc,
	0 as jcsl,0 as jczl
    , `cpckdcw`.`sl` as ccsl
    , `cpckdcw`.`zl` as cczl
	, 0 as gfsl, 0 as gfzl
    , 0 as tzsl, 0 as tzzl
	
    FROM
    `wms`.`cpckdmx`
    INNER JOIN `wms`.`cpckd` 
        ON (`cpckdmx`.`ckid` = `cpckd`.`ckid`)
	INNER JOIN `wms`.`cpxsdmx` 
        ON (`cpckdmx`.`xsmxid` = `cpxsdmx`.`mxid`)	
	INNER JOIN `wms`.`cpckdcw` 
        ON (`cpckdcw`.`ckmxid` = `cpckdmx`.`ckmxid`)	
	INNER JOIN `wms`.`cpxsd` 
        ON (`cpckd`.`xsid` = `cpxsd`.`xsid`)	
    where cpckd.delbz=0 ".$filter;
	}

    if (($sqlstr1!="")&&($sqlstr2!=""))
	{
      $sqlstr1.=" union all ".$sqlstr2;
	}
	else{

		if ($sqlstr2!="")
		{
			$sqlstr1=$sqlstr2;
		}
	}    














if (($jclb=="过货")|| ($jclb=="")) {

	    $filter =" and cpgfd.ztbz>0 and YEAR(cpgfd.gfrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cpgfd.gfrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cpgfd.gfrq)=".$ri;
	    }
   	
        if ($area>"")
		{
			$filter .= " and cpgfd.area='".$area."'";
			
		}


		if ($ckid>0)
		{
			$filter .= " and cpgfd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpgfd.khid=".$khid;
    	}

	$sqlstr0 = "SELECT '过货' as jclb
    , `cpgfd`.`khmc`
	, cpgfdmx.xmmc as cpmc
	,0 as jcsl,0 as jczl
	,0 as ccsl,0 as cczl
    , `cpgfdmx`.`sl` as gfsl
	, `cpgfdmx`.`zl` as gfzl
	, 0 as tzsl, 0 as tzzl
    FROM
    `wms`.`cpgfdmx`
    INNER JOIN `wms`.`cpgfd` 
        ON (`cpgfdmx`.`gfid` = `cpgfd`.`gfid`)
    where cpgfd.delbz=0  ".$filter;
	}


    if (($sqlstr1!="")&&($sqlstr0!=""))
	{
      $sqlstr1.=" union all ".$sqlstr0;
	}
	else{
		if ($sqlstr0!="")
		{
			$sqlstr1=$sqlstr0;
		}
	}    


  //wxcpgf

	$filter =" and cpgfd.ztbz>0 and YEAR(cpgfd.gfrq)=".$ny;

	if ($yu>0)
	{
			$filter .=" and MONTH(cpgfd.gfrq)=".$yu;
	}
	if ($ri>0)
	{
			$filter .=" and DAYOFMONTH(cpgfd.gfrq)=".$ri;
	}
   
	if ($area>"")
	{
		$filter .= " and cpgfd.area='".$area."'";
		
	}


	if ($ckid>0)
	{
		$filter .= " and cpgfd.L_id=".$ckid;
		
	}
	if ($khid>0)
	{
		$filter .= " and cpgfd.khid=".$khid;
	}

$sqlstr0 = "SELECT '过车' as jclb
, `cpgfd`.`khmc`
, cpgfdmx.xmmc as cpmc
,0 as jcsl,0 as jczl
,0 as ccsl,0 as cczl
, `cpgfdmx`.`sl` as gfsl
, `cpgfdmx`.`zl` as gfzl
, 0 as tzsl, 0 as tzzl
FROM wxcpgfdmx cpgfdmx
INNER JOIN wxcpgfd cpgfd 
	ON (`cpgfdmx`.`gfid` = `cpgfd`.`gfid`)
where cpgfd.delbz=0 and cpgfd.fhbz>0  ".$filter;



if (($sqlstr1!="")&&($sqlstr0!=""))
{
  $sqlstr1.=" union all ".$sqlstr0;
}
else{
	if ($sqlstr0!="")
	{
		$sqlstr1=$sqlstr0;
	}
}    




  if (($jclb=="其它")|| ($jclb=="")) {

 	    $filter =" and cptzd.khid<> cptzd.newkhid  and cptzd.ztbz>0 and YEAR(cptzd.tzrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cptzd.tzrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cptzd.tzrq)=".$ri;
	    }
   	


       if ($area>"")
		{
			$filter .= " and cptzdmx.area='".$area."'";
			
		}

    	
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.khid=".$khid;
    	}

	$sqlstr3 = "SELECT '其它' as jclb
    , cptzd.khmc
	, cptzdmx.cpmc
    , 0 as jcsl    , 0 as jczl
    , 0 as ccsl    , 0 as cczl
    , 0 as gfsl    , 0 as gfzl
	,cptzdmx.tzsl ,cptzdmx.tzzl 
    FROM
    `wms`.`cptzd`
     INNER JOIN `wms`.`cptzdmx` 
        ON (`cptzd`.`tzid` = `cptzdmx`.`tzid`)  
		where cptzd.delbz=0 ".$filter;
}

    if (($sqlstr1!="")&&($sqlstr3!=""))
	{
      $sqlstr1.=" union all ".$sqlstr3;
	}
	else{

		if ($sqlstr3!="")
		{
			$sqlstr1=$sqlstr3;
		}
	}    


  if (($jclb=="其它")|| ($jclb=="")) {

 	    $filter =" and cptzd.khid<> cptzd.newkhid  and cptzd.ztbz>0 and YEAR(cptzd.tzrq)=".$ny;

    	if ($yu>0)
    	{
    			$filter .=" and MONTH(cptzd.tzrq)=".$yu;
	    }
    	if ($ri>0)
    	{
    			$filter .=" and DAYOFMONTH(cptzd.tzrq)=".$ri;
	    }
   	

       if ($area>"")
		{
			$filter .= " and cptzdmx.area='".$area."'";
			
		}


    	
		if ($ckid>0)
		{
			$filter .= " and cptzd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cptzd.newkhid=".$khid;
    	}

	$sqlstr3 = "SELECT '其它' as jclb
    , cptzd.newkhmc as khmc
	, cptzdmx.cpmc
    , 0 as jcsl    , 0 as jczl
    , 0 as ccsl    , 0 as cczl
    , 0 as gfsl    , 0 as gfzl
	,cptzdmx.tzsl ,cptzdmx.tzzl 
    FROM
    `wms`.`cptzd`
     INNER JOIN `wms`.`cptzdmx` 
        ON (`cptzd`.`tzid` = `cptzdmx`.`tzid`)  
		where cptzd.delbz=0 ".$filter;
}

    if (($sqlstr1!="")&&($sqlstr3!=""))
	{
      $sqlstr1.=" union all ".$sqlstr3;
	}
	else{

		if ($sqlstr3!="")
		{
			$sqlstr1=$sqlstr3;
		}
	}    


// 过户出仓

$filter =" and wxcpghd.ztbz>2 and wxcpghd.fhbz>0 and YEAR(wxcpghd.ghrq)=".$ny;

if ($yu>0)
{
		$filter .=" and MONTH(wxcpghd.ghrq)=".$yu;
}
if ($ri>0)
{
		$filter .=" and DAYOFMONTH(wxcpghd.ghrq)=".$ri;
}

if ($area>"")
{
	$filter .= " and wxcpghdcw.area='".$area."'";
	
}

if ($ckid>0)
{
	$filter .= " and wxcpghd.L_id=".$ckid;
	
}
if ($khid>0)
{
	$filter .= " and wxcpghd.khid=".$khid;
}

$sqlstr2 = "SELECT '过户出仓' as jclb
, `wxcpghd`.`khmc`
,wxcpghdmx.cpmc,
0 as jcsl,0 as jczl
, `wxcpghdcw`.`sl` as ccsl
, `wxcpghdcw`.`zl` as cczl
, 0 as gfsl, 0 as gfzl
, 0 as tzsl, 0 as tzzl

FROM
`wms`.`wxcpghdmx`
INNER JOIN `wms`.`wxcpghd` 
ON (`wxcpghdmx`.`ghid` = `wxcpghd`.`ghid`)
INNER JOIN `wms`.`wxcpghdcw` 
ON (`wxcpghdcw`.`mxid` = `wxcpghdmx`.`mxid`)	
where wxcpghd.delbz=0 ".$filter;


if (($sqlstr1!="")&&($sqlstr2!=""))
{
$sqlstr1.=" union all ".$sqlstr2;
}
else{

if ($sqlstr2!="")
{
	$sqlstr1=$sqlstr2;
}
}    





// 过户入仓

$filter =" and wxcpghd.ztbz>2 and wxcpghd.fhbz>0 and YEAR(wxcpghd.ghrq)=".$ny;

if ($yu>0)
{
		$filter .=" and MONTH(wxcpghd.ghrq)=".$yu;
}
if ($ri>0)
{
		$filter .=" and DAYOFMONTH(wxcpghd.ghrq)=".$ri;
}

if ($area>"")
{
	$filter .= " and wxcpghdcw.area='".$area."'";
	
}

if ($ckid>0)
{
	$filter .= " and wxcpghd.L_id=".$ckid;
	
}
if ($khid>0)
{
	$filter .= " and wxcpghd.newkhid=".$khid;
}

$sqlstr2 = "SELECT '过户入仓' as jclb
, `customer`.c_name AS khmc
,wxcpghdmx.cpmc
, `wxcpghdcw`.`sl` as jcsl
, `wxcpghdcw`.`zl` as jczl
, 0 as ccsl,0 as cczl
, 0 as gfsl, 0 as gfzl
, 0 as tzsl, 0 as tzzl

FROM
`wms`.`wxcpghdmx`
INNER JOIN `wms`.`wxcpghd` 
ON (`wxcpghdmx`.`ghid` = `wxcpghd`.`ghid`)
INNER JOIN `wms`.`wxcpghdcw` 
ON (`wxcpghdcw`.`mxid` = `wxcpghdmx`.`mxid`)	
INNER JOIN `wms`.`customer` 
ON (`wxcpghd`.`newkhid` = `customer`.`c_id`)	
where wxcpghd.delbz=0 ".$filter;


if (($sqlstr1!="")&&($sqlstr2!=""))
{
$sqlstr1.=" union all ".$sqlstr2;
}
else{

if ($sqlstr2!="")
{
	$sqlstr1=$sqlstr2;
}
}    











$khbz=(int)$_GET["khbz"];
$cpbz=(int)$_GET["cpbz"];
if (($khbz==1) && ($cpbz==0))
{
	$sql="select  khmc,
	sum(jcsl) as jcsl,sum(jczl) as jczl,
	sum(ccsl) as ccsl,sum(cczl) as cczl,
	sum(gfsl) as gfsl,sum(gfzl) as gfzl,
	sum(tzsl) as tzsl,sum(tzzl) as tzzl,
	sum(ccsl+jcsl+gfsl+tzsl) as sl,sum(cczl+jczl+gfzl+tzzl) as zl
	from (".$sqlstr1.") k  group by khmc ";
}
else{
	if (($khbz==0)&&($cpbz==1)){
		$sql="select  cpmc,
		sum(jcsl) as jcsl,sum(jczl) as jczl,
		sum(ccsl) as ccsl,sum(cczl) as cczl,
		sum(gfsl) as gfsl,sum(gfzl) as gfzl,
		sum(tzsl) as tzsl,sum(tzzl) as tzzl,
		sum(ccsl+jcsl+gfsl+tzsl) as sl,sum(cczl+jczl+gfzl+tzzl) as zl
		from (".$sqlstr1.") k    group by cpmc ";

	}else{
		$sql="select khmc as bz,'' as  khmc, cpmc,
		sum(jcsl) as jcsl,sum(jczl) as jczl,
		sum(ccsl) as ccsl,sum(cczl) as cczl,
		sum(gfsl) as gfsl,sum(gfzl) as gfzl,
		sum(tzsl) as tzsl,sum(tzzl) as tzzl,
		sum(ccsl+jcsl+gfsl+tzsl) as sl,sum(cczl+jczl+gfzl+tzzl) as zl
		from (".$sqlstr1.") k   group by khmc,cpmc ";
	}


}




		//return $sql;
		$query = mysql_query($sql);
		return getjsonstoredata($query, 0);
}


function cpxsdmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	
	$xsid=(int)$_GET["xsid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];
    
    $loc=$_GET["loc"];
	if ($xsid>0)
	{
	  $loc="xsid";	
	}
	
	$filter="";
	   switch($loc) 
		{
      	case 'cpxsdmxsh' :
		  $khkd=$_GET["khkd"];
	   	$filter .=" and cpxsd.ztbz=0 and cpxsd.delbz=0 and cpxsd.khkd=".$khkd;
		break;
	  	case 'cpxsdmxmfh' :
		$filter .=" and cpxsd.ztbz=1 and cpxsd.fhbz<1 and cpxsd.delbz=0 ";  
	  	break;
	  	case 'cpxsdmxmfhck' :
		$filter .=" and cpxsd.ztbz=1 and cpxsd.fhbz<1 and cpxsd.cdbz=0 and cpxsd.delbz=0 ";  
	  	break;

	  	case 'cpxsdmxloc' :
		$filter .=" and (cpxsd.ztbz=1 or cpxsd.delbz=1) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and cpxsd.xsrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
		{
    		$filter .=" and cpxsd.xsrq<='".$_GET["enddate"]."'";
	    }	
		if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpxsd.delbz=0";
		}

	  	break;
    	}


	  	if ($xsid>0)
		{
			$filter =" and cpxsd.xsid=".$xsid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and cpxsd.khid=".$khid;
    	}
    	if ($ckid>0)
    	{
    		$filter .=" and cpxsd.L_id=".$ckid;
    	}

		//$filter .=" and cpxsd.rq<'2019-06-17 18:03:13'";
		//if ($lid>0)
    //	{
    	//	$filter .=" and cpxsd.L_id=".$lid;
    //	}

	    $sqlstr = " SELECT '1' as mxdh,m.kcid, m.xsid,m.mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.jldw,
     	m.xssl,m.xszl,m.xsdj,m.xsje,m.xssl-m.ccsl as mccsl,m.xszl-m.cczl as mcczl,m.ccsl,m.cczl,
     	bz.Quantity_Unit AS sldw,  bz.Weight_Unit AS zldw,m.sm,m.cpph,m.bzid   
     	FROM cpxsdmx m,cpxsd,packing bz where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid ".$filter ;	
     //   return $sqlstr;
    	$query = mysql_query($sqlstr);
    	return getjsonstoredata($query, 0);
}

function cpghdmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	
	$ghid=(int)$_GET["ghid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];
    
    $loc=$_GET["loc"];
	if ($ghid>0)
	{
	  $loc="ghid";	
	}
	
	$filter="";
	   switch($loc) 
		{
		case 'cpghdmxkdsh' :
		
  		$filter .=" and cpghd.ztbz=0 and cpghd.fhbz<2  and cpghd.delbz=0 ";
			
		 break;
 
		case 'cpghdmxsh' :
		   $filter .=" and cpghd.ztbz=0 and cpghd.fhbz=0  and cpghd.delbz=0 ";//  and cpghd.khkd=".$khkd;
			break;
	
		case 'cpghdmxywsh' :
		
			$filter .=" and cpghd.ztbz=1 and cpghd.fhbz=2  and cpghd.delbz=0 ";//  and cpghd.khkd=".$khkd;
	    	 break;
		case 'cpghdmxcksh' :
		
		 	$filter .=" and cpghd.ztbz=2 and cpghd.fhbz=2  and cpghd.delbz=0 ";//  and cpghd.khkd=".$khkd;
			break;	
		case 'cpghdmxcwsh' :
		
		$filter .=" and cpghd.ztbz=3 and cpghd.fhbz=2  and cpghd.delbz=0 ";//  and cpghd.khkd=".$khkd;
	   break;	
	  	case 'cpghdmxmfh' :
		$filter .=" and cpghd.ztbz=1 and cpghd.fhbz<2 and cpghd.delbz=0 ";  
	  	break;
	  	case 'cpghdmxmfhck' :
		$filter .=" and cpghd.ztbz=1 and cpghd.fhbz<2 and cpghd.cdbz=0 and cpghd.delbz=0 ";  
	  	break;

	  	case 'cpghdmxloc' :
		$filter .=" and cpghd.ztbz>0 ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and cpghd.xsrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
		{
    		$filter .=" and cpghd.xsrq<='".$_GET["enddate"]."'";
	    }	
		if ($_GET["deletebz"]=="0")
		{
				$filter .= " and cpghd.delbz=0";
		}

		  break;
		  
		  case 'cpghdmxghloc' :
		  $filter .=" and cpghd.ztbz>3 ";
		  if ($_GET["startdate"])
		  {
			  $filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
		  }
		  if ($_GET["enddate"])
		  {
			  $filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
		  }	
		  if ($_GET["deletebz"]=="0")
		  {
				  $filter .= " and cpghd.delbz=0";
		  }
  
			break;
  
    	}


	  	if ($ghid>0)
		{
			$filter =" and cpghd.ghid=".$ghid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and cpghd.khid=".$khid;
    	}
    	if ($Lid>0)
    	{
    		$filter .=" and cpghd.L_id=".$Lid;
    	}

		//$filter .=" and cpghd.rq<'2019-06-17 18:03:13'";
		//if ($lid>0)
    //	{
    	//	$filter .=" and cpghd.L_id=".$lid;
    //	}

	    $sqlstr = " SELECT '1' as mxdh,m.kcid, m.ghid,m.mxid,m.cdmc,m.cpmc,m.bzmc,m.cpgg,m.jldw,
     	m.xssl,m.xszl,m.xsdj,m.xsje,m.xssl-m.ghsl as mccsl,m.xszl-m.ghzl as mcczl,m.ghsl,m.ghzl,
     	bz.Quantity_Unit AS sldw,  bz.Weight_Unit AS zldw,m.sm,m.cpph,m.bzid   
     	FROM wxcpghdmx m,wxcpghd cpghd,packing bz where cpghd.ghid=m.ghid and bz.PS_id=m.bzid ".$filter ;	
     //return $sqlstr;
    	$query = mysql_query($sqlstr);
    	return getjsonstoredata($query, 0);
}

function wxcpgfdmxlist_pc() {
	
	$Lid=$_GET["p_l_id"];
	$gfid=(int)$_GET["gfid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];
	$deletebz=0;

	if (isset($_GET["deletebz"])){
		$deletebz=(int)$_GET["deletebz"];
	}
	
		
    $loc=$_GET["loc"];
	if ($gfid>0)
	{
	  $loc="gfid";	
	}
	
	$filter="";
	if ($gfid>0)
	{
		$filter =" and wxcpgfd.gfid=".$gfid;
	} else
	{

	   switch($loc) 
		{
      	case 'wxcpgfdmxkdsh' :
	   	$filter .=" and wxcpgfd.ztbz=0 and wxcpgfd.fhbz<1  ";//  and wxcpgfd.khkd=".$khkd;
		break;
		case 'wxcpgfdmxsh' :
		$filter .=" and wxcpgfd.ztbz=1 and wxcpgfd.fhbz=2   ";//  and wxcpgfd.khkd=".$khkd;
    	 break;

		case 'wxcpgfdmxywsh' :
		
		$filter .=" and wxcpgfd.ztbz=1 and wxcpgfd.fhbz=2   ";//  and wxcpgfd.khkd=".$khkd;
	     break;
		case 'wxcpgfdmxcksh' :
		
		 $filter .=" and wxcpgfd.ztbz=2 and wxcpgfd.fhbz=2   ";//  and wxcpgfd.khkd=".$khkd;
		break;	
		case 'wxcpgfdmxcwsh' :
		
		$filter .=" and wxcpgfd.ztbz=3 and wxcpgfd.fhbz=2   ";//  and wxcpgfd.khkd=".$khkd;
	   break;	
	  	case 'wxcpgfdmxmfh' :
		$filter .=" and wxcpgfd.ztbz=1 and wxcpgfd.fhbz<2  ";  
	  	break;
	  	case 'wxcpgfdmxmfhck' :
		$filter .=" and wxcpgfd.ztbz=1 and wxcpgfd.fhbz<2   ";  
	  	break;

	  	case 'wxcpgfdmxloc' :
		$filter .=" and (wxcpgfd.ztbz>0 ) ";
		if ($_GET["startdate"])
    	{
    		$filter .=" and wxcpgfd.kdrq>='".$_GET["startdate"]."'";
    	}
    	if ($_GET["enddate"])
		{
    		$filter .=" and wxcpgfd.kdrq<='".$_GET["enddate"]."'";
	    }	

		  break;
		  
	  case 'wxcpgfdmxgfloc' :
		  $filter .=" and (wxcpgfd.ztbz>3 ) ";
		  if ($_GET["startdate"])
		  {
			  $filter .=" and wxcpgfd.gfrq>='".$_GET["startdate"]."'";
		  }
		  if ($_GET["enddate"])
		  {
			  $filter .=" and wxcpgfd.gfrq<='".$_GET["enddate"]."'";
		  }	
 
			break;
  
		}
		
		if ($deletebz==0){
			$filter .=" and wxcpgfd.delbz=0";
		}
	
	 }
    
		if ($khid>0)
    	{
    		$filter .=" and wxcpgfd.khid=".$khid;
    	}
    	if ($Lid>0)
    	{
    		$filter .=" and wxcpgfd.L_id=".$Lid;
    	}


		
	    $sqlstr = "SELECT 
		'1' AS mxdh,
		m.*
	  FROM
		wxcpgfdmx m,
		wxcpgfd
	  WHERE wxcpgfd.gfid = m.gfid 
		AND wxcpgfd.ztbz = 1 
		AND wxcpgfd.fhbz < 2 
		AND wxcpgfd.delbz = 0  ".$filter ;	
	$sqlstr = " SELECT  '1' as mxdd,m.*
	FROM wxcpgfdmx m,wxcpgfd where wxcpgfd.gfid=m.gfid  ".$filter;

//  return $sqlstr;
	  
	  
    	$query = mysql_query($sqlstr);
    	return getjsonstoredata($query, 0);
}


function cpxsdlist_pc() {	
	$Lid=$_GET["p_l_id"];
	$xsid=(int)$_GET["xsid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];
    
    $loc=$_GET["loc"];
	if ($xsid>0)
	{
	  $loc="xsid";	
	}
	$filter="";
	   switch($loc) 
		{
      	case 'cpxsdsh' :
		   $khkd=$_GET["khkd"];
		   if ($khkd==0 ){
				$filter .=" and cpxsd.ztbz=0 and cpxsd.delbz=0 and khkd=0";
		   }else{
		  		 $filter .=" and cpxsd.ztbz=0 and cpxsd.delbz=0 and khkd>0";
		   }
		   break;
	  	case 'cpxsdmfh' :
			$filter .=" and cpxsd.ztbz=1 and cpxsd.delbz=0 and cpxsd.fhbz<1 ";  
	  		break;
	  	case 'cpxsdmfhck' :
			$filter .=" and cpxsd.ztbz=1 and cpxsd.delbz=0 and cpxsd.fhbz<1 and cpxsd.cdbz=0 ";  
	  		break;

	  	case 'cpxsdloc' :
			$filter .=" and (cpxsd.ztbz=1 or cpxsd.delbz=1) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpxsd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and cpxsd.xsrq<='".$_GET["enddate"]."'";
		    }	
			if ($_GET["deletebz"]=="0")
		    {
				$filter .= " and cpxsd.delbz=0";
		    }

		  	break;
    	}
		if ($xsid>0)
		{
			$filter =" and cpxsd.xsid=".$xsid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and cpxsd.khid=".$khid;
    	}
    	if ($ckid>0)
    	{
    		$filter .=" and cpxsd.L_id=".$ckid;
    	}
	//	$filter .=" and cpxsd.rq<'2019-06-17 18:03:13'";
//		if ($lid>0)
  //  	{
    //		$filter .=" and cpxsd.L_id=".$lid;
    	//}
	
//        if ($loc=="cpxsdmfh")
//		{
//             $filter=$filter." and cpxsd.xsid in (select cpxsd.xsid from cpxsd ,cpxsdmx where cpxsd.xsid=cpxsdmx.xsid and cpxsdmx.xssl>cpxsdmx.ccsl  " .$filter. ")";
//		}
		$sqlstr ="SELECT *,xsid as id FROM cpxsd where xsid>0 ".$filter ;
     //	return $sqlstr ; 
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}


function cpghdlist_pc() {	
	$Lid=$_GET["p_l_id"];
	$ghid=(int)$_GET["ghid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];
    
    $loc=$_GET["loc"];
	if ($ghid>0)
	{
	  $loc="ghid";	
	}
	$filter="";
	   switch($loc) 
		{
      	case 'cpghdkdsh' :
		   $khkd=$_GET["khkd"];
		   $filter .=" and cpghd.ztbz=0 and cpghd.fhbz<2 and cpghd.delbz=0  "; //and khkd=0
		  
		   break;
		case 'cpghdsh' :
		       $khkd=$_GET["khkd"];
		  // if ($khkd==0 ){
				$filter .=" and cpghd.ztbz=0 and cpghd.fhbz<2 and cpghd.delbz=0  ";// and khkd=0";
		  // }else{
		  //		 $filter .=" and cpghd.ztbz=0 and cpghd.delbz=0 and khkd>0";
		  // }
		   break;
	  	case 'cpghdmfh' :
			$filter .=" and cpghd.ztbz=1 and cpghd.delbz=0 and cpghd.fhbz<2 ";  
	  		break;
	  	case 'cpghdmfhck' :
			$filter .=" and cpghd.ztbz=1 and cpghd.delbz=0 and cpghd.fhbz<1 and cpghd.cdbz=0 ";  
	  		break;
	   case 'cpghdywsh' :
			$filter .=" and cpghd.ztbz=1 and cpghd.delbz=0 and cpghd.fhbz>1 and cpghd.cdbz=0 ";  
			break;
			case 'cpghdcksh' :
			$filter .=" and cpghd.ztbz=2 and cpghd.delbz=0 and cpghd.fhbz>1 and cpghd.cdbz=0 ";  
		   break;
		   case 'cpghdcwsh' :
		   $filter .=" and cpghd.ztbz=3 and cpghd.delbz=0 and cpghd.fhbz>1 and cpghd.cdbz=0 ";  
		  break;
			   
	  	case 'cpghdloc' :
			$filter .=" and cpghd.ztbz>0  ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpghd.xsrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and cpghd.xsrq<='".$_GET["enddate"]."'";
		    }	
			if ($_GET["deletebz"]=="0")
		    {
				$filter .= " and cpghd.delbz=0";
		    }

			  break;
	   case 'cpghdghloc' :
			  $filter .=" and cpghd.ztbz>3  ";
			  if ($_GET["startdate"])
			  {
				  $filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
			  }
			  if ($_GET["enddate"])
			  {
				  $filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
			  }	
  			if ($_GET["deletebz"]=="0")
  		    {
  				$filter .= " and cpghd.delbz=0";
  		    }
  
				break;
	
    	}
		if ($ghid>0)
		{
			$filter =" and cpghd.ghid=".$ghid;
		}
    
		if ($khid>0)
    	{
    		$filter .=" and cpghd.khid=".$khid;
    	}
    	if ($Lid>0)
    	{
    		$filter .=" and cpghd.L_id=".$Lid;
		}
		

  if ($loc=="cpghsploc"){


			$ckid=(int)$_GET["p_l_id"];
 			$cpid=(int)$_GET["cpid"];
			
			$filter =" and cpghd.ztbz>0 and  cpghd.delbz=0 and cpghd.fhbz>0   ";
			
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
	    	}
			if ($cpid>0)
			{
				$filter .= " and cpghdmx.cpid=".$cpid;
			}

			if ($ckid>0)
			{
				$filter .= " and cpghd.L_id=".$ckid;
			
			}
			if ($khid>0)
    		{
    			$filter .= " and cpghd.khid=".$khid;
    		}

    $sqlstr1 = "SELECT cpghd.khmc,w.czrq,cpghdmx.cdmc,cpghdmx.cpmc,cpghdmx.bzmc,cpghdmx.cpgg,cpghdmx.cpph,cpghdmx.jldw,cpghd.ghdh  as dh,w.sl ,w.zl ,0 as jcsl,0 as jczl,
	location.l_name AS ckmc
    FROM  wxcpghdmx cpghdmx,wxcpghdcw W, wxcpghd cpghd,location  
    WHERE cpghd.ghid = cpghdmx.ghid and cpghdmx.mxid=w.mxid 
	AND cpghd.L_id=location.`L_id` ". $filter ;




			$filter =" and cpghd.ztbz>0 and  cpghd.delbz=0 and cpghd.fhbz>0  ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and cpghd.ghrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
    		{
    			$filter .=" and cpghd.ghrq<='".$_GET["enddate"]."'";
	    	}
			if ($cpid>0)
			{
				$filter .= " and cpghdmx.cpid=".$cpid;
			}

			if ($ckid>0)
			{
				$filter .= " and cpghd.L_id=".$ckid;
			
			}
			if ($khid>0)
    		{
    			$filter .= " and cpghd.newkhid=".$khid;
    		}
	$sqlstr2 = "SELECT cpghd.newkhmc as khmc,cpghd.ghrq as czrq,cpghdmx.cdmc,cpghdmx.cpmc,cpghdmx.bzmc,cpghdmx.cpgg,cpghdmx.cpph,cpghdmx.jldw,
	cpghd.ghdh  as dh,0 as sl,0 as zl,w.sl as jcsl  ,w.zl as jczl ,location.l_name AS ckmc
    FROM  wxcpghdmx cpghdmx ,wxcpghdcw W, wxcpghd  cpghd,location  
    WHERE cpghd.ghid = cpghdmx.ghid and cpghdmx.mxid=w.mxid AND cpghd.L_id=location.`L_id` ". $filter ;
     $sqlstr=	$sqlstr1." union all ".	$sqlstr2;



        }
        else
	    {
//		 $sqlstr = " SELECT cptzd.*,cptzd.tzid as id,Location.L_name as ckmc FROM cptzd,Location where location.L_id=cptzd.L_id ".$filter;
		 $sqlstr ="SELECT *,ghid as id FROM wxcpghd cpghd where ghid>0 ".$filter ;

		}


     //	return $sqlstr . $loc; 
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}
function wxcpgfdlist_pc() {	
	$Lid=$_GET["p_l_id"];
	$gfid=(int)$_GET["gfid"];
	$khid=(int)$_GET["khid"];
	$ckid=(int)$_GET["ckid"];
	$lid=(int)$_GET["L_id"];

	$deletebz=0;
	if (isset($_GET["deletebz"])){
		$deletebz=(int)$_GET["deletebz"];
	}
	

    $loc=$_GET["loc"];
	$filter="";
	if ($gfid>0)
	{
	  $loc="gfid";	
	  $filter =" and wxcpgfd.gfid=".$gfid;
 	}
	else
	{
	   switch($loc) 
		{
      	case 'wxcpgfdsh' :
		   $khkd=$_GET["khkd"];
		  // if ($khkd==0 ){
				$filter .=" and wxcpgfd.ztbz=1 and wxcpgfd.fhbz=2 ";// and khkd=0";
		  // }else{
		  //		 $filter .=" and wxcpgfd.ztbz=0  and khkd>0";
		  // }
		   break;
	  	case 'wxcpgfdmfh' :
			$filter .=" and wxcpgfd.ztbz=1 and  wxcpgfd.fhbz<2 ";  
	  		break;
	  	case 'wxcpgfdfhck' :
			$filter .=" and wxcpgfd.ztbz=1 and  wxcpgfd.fhbz<1  ";  
			  break;
	  case 'wxcpgfdkdsh' :
			  $filter .=" and wxcpgfd.ztbz=0  and wxcpgfd.fhbz<1  ";  
				break;			  
	   case 'wxcpgfdywsh' :
			$filter .=" and wxcpgfd.ztbz=1  and wxcpgfd.fhbz>1  ";  
			break;
		case 'wxcpgfdcksh' :
			$filter .=" and wxcpgfd.ztbz=2  and wxcpgfd.fhbz>1  ";  
		   break;
		case 'wxcpgfdcwsh' :
		   $filter .=" and wxcpgfd.ztbz=3  and wxcpgfd.fhbz>1  ";  
		  break;
			   
	  	case 'wxcpgfdloc' :
			$filter .=" and (wxcpgfd.ztbz>0 ) ";
			if ($_GET["startdate"])
    		{
    			$filter .=" and wxcpgfd.kdrq>='".$_GET["startdate"]."'";
    		}
    		if ($_GET["enddate"])
			{
	    		$filter .=" and wxcpgfd.kdrq<='".$_GET["enddate"]."'";
		    }	

			  break;
  	   case 'wxcpgfdgfloc' :
			  $filter .=" and (wxcpgfd.ztbz>3 ) ";
			  if ($_GET["startdate"])
			  {
				  $filter .=" and wxcpgfd.gfrq>='".$_GET["startdate"]."'";
			  }
			  if ($_GET["enddate"])
			  {
				  $filter .=" and wxcpgfd.gfrq<='".$_GET["enddate"]."'";
			  }	
				break;
	
		}




		if ($deletebz==0){
			$filter .=" and wxcpgfd.delbz=0";
		}
	}
	



		if ($khid>0)
    	{
    		$filter .=" and wxcpgfd.khid=".$khid;
    	}
    	if ($Lid>0)
    	{
    		$filter .=" and wxcpgfd.L_id=".$Lid;
    	}


		$sqlstr = " SELECT wxCPgfD.*,l.ckmc,wxcpgfd.gfid as id  FROM  wxcpgfd  " ;
        $sqlstr .= " LEFT OUTER JOIN  ( SELECT L_id,L_name AS ckmc  FROM location ) l ON wxcpgfd.l_id=l.l_id  where wxcpgfd.gfid>0 ". $filter ;

     //	return $sqlstr . $loc; 
		$query = mysql_query($sqlstr);
		return getjsonstoredata($query, 0);
}


function cpkclist_pc() {
	$Lid=$_GET["p_l_id"];
	$loc=$_GET["loc"];
	if (($loc=='cpkcloc')||($loc=='cpkckhloc'))
	{
	  if ($loc=='cpkckhloc')
	  {
	     $sqlstr=" SELECT c.*,  CASE WHEN c.kdsl <0 THEN 0 ELSE c.kdsl END AS kdsl,CASE WHEN c.kdzl <0 THEN 0 ELSE c.kdzl END AS kdzl,
		 CASE WHEN c.kdsl <0 THEN mx.sl ELSE mx.sl-c.kdsl END AS sl,CASE WHEN c.kdzl <0 THEN mx.zl ELSE mx.zl-c.kdzl END AS zl,
 		 ck.L_name AS ckmc, kh.c_name AS khmc,kh.c_shortname AS khjc,
 		 cd.p_name AS cdmc,cp.S_name AS cpmc ,bz.PS_name AS bzmc ,mx.sl AS kcsl,  mx.zl AS kczl  
		 FROM cpkc c,customer kh,produces cd,packing bz,commodity cp,location ck, 
		 (SELECT kcid,SUM(sl) AS sl ,SUM(zl) AS zl FROM cpkcmx ";
	  }
	  else
	  {
	     $sqlstr=" SELECT c.*,  
		 CASE WHEN c.kdsl <0 THEN 0 ELSE c.kdsl END AS kdsl,CASE WHEN c.kdzl <0 THEN 0 ELSE c.kdzl END AS kdzl,
		 CASE WHEN c.kdsl <0 THEN mx.sl ELSE mx.sl-c.kdsl END AS sl,CASE WHEN c.kdzl <0 THEN mx.zl ELSE mx.zl-c.kdzl END AS zl,
 		 ck.L_name AS ckmc, kh.c_name AS khmc,kh.c_shortname AS khjc,
 		 cd.p_name AS cdmc,cp.S_name AS cpmc ,bz.PS_name AS bzmc ,mx.sl AS kcsl,  mx.zl AS kczl  
		 FROM cpkc c,customer kh,produces cd,packing bz,commodity cp,location ck, 
		 (SELECT kcid,SUM(sl) AS sl ,SUM(zl) AS zl FROM cpkcmx ";
	  }

	     $sqlstr .=" where (cpkcmx.sl<>0 OR cpkcmx.Zl<>0) ";

		 if ($_GET["area"])
    	  {
    		if ($_GET["area"]!=""){
				$sqlstr .=" and cpkcmx.area='".$_GET["area"]."'";
			}
		 }
	
	     $sqlstr.="GROUP BY kcid HAVING SUM(sl)<>0 OR SUM(zl)<>0) mx 
			WHERE  mx.kcid=c.kcid AND c.L_id=ck.L_id AND c.khid=kh.c_id AND c.cpid=cp.s_id 
			AND c.cdid=cd.p_id AND c.bzid=bz.ps_id  and kh.active=1 and cd.active=1 and cp.active=1  " ;
	
	}
	else
	{
      $sqlstr = " SELECT c.*,CASE WHEN c.kdsl <0 THEN 0 ELSE c.kdsl END AS kdsl,CASE WHEN c.kdzl <0 THEN 0 ELSE c.kdzl END AS kdzl,ck.L_name as ckmc,kh.c_name as khmc,
      kh.c_shortname as khjc,cd.p_name as cdmc,cp.S_name as cpmc ,bz.PS_name as bzmc ";
      $sqlstr .= " ,mx.id as kcmxid,mx.area,mx.cw,mx.czdj,mx.sl,mx.zl,mx.sm,mx.mints,mx.czrq 
      FROM cpkc c,customer kh,produces cd,packing bz,commodity cp,cpkcmx mx ,location ck";
      $sqlstr .=" where c.L_id=ck.L_id and c.kcid=mx.kcid and c.khid=kh.c_id and c.cpid=cp.s_id 
      and c.cdid=cd.p_id and c.bzid=bz.ps_id and (mx.sl<>0 or mx.zl<>0 )   and kh.active=1 and cd.active=1 and cp.active=1 ";		
		if ($_GET["area"])
    	{
    		if ($_GET["area"]!=""){
				$sqlstr =$sqlstr." and mx.area='".$_GET["area"]."'";
			}
		}
	}
	
	if ($_GET["p_l_id"])
    {
    	if ($Lid!="0"){
			$sqlstr =$sqlstr." and c.L_id=".$Lid;
		}
	}

    if ($_GET["khid"])
    {
    	if ($_GET["khid"]!="0"){
    		$sqlstr =$sqlstr." and c.khid=".$_GET["khid"];
			}
    }
    
    if ($_GET["cpid"])
    {
    	if ($_GET["cpid"]!="0"){
    		$sqlstr =$sqlstr." and c.cpid=".$_GET["cpid"];
		}
    }
 	if ($_GET["cdid"])
    {
    	if ($_GET["cdid"]!="0"){
    		$sqlstr =$sqlstr." and c.cdid=".$_GET["cdid"];
		}
    }
	if ($loc=='cpkckhloc'){
			$sqlstr =$sqlstr." order by l_id,kh.C_code,cdmc,cpmc ";
	}
	else
	{
		$sqlstr =$sqlstr." order by khmc,l_id,cdmc,cpmc ";
	}
			//$sqlstr =$sqlstr." order by khmc,cdmc,spmc ";
   //return $sqlstr;
	$query = mysql_query($sqlstr);

	return getjsonstoredata($query, 0);
}

function cpkcmxlist_pc() {
	$Lid=$_GET["p_l_id"];
	$sqlstr = " SELECT cpkcmx.*,cpkcmx.id as kcmxid FROM cpkc c,customer kh,produces cd,packing bz,commodity cp,cpkcmx ";
	$sqlstr =$sqlstr." where c.khid=kh.c_id and c.cpid=cp.s_id and c.cdid=cd.p_id and c.bzid=bz.ps_id and (cpkcmx.sl<>0 or cpkcmx.zl<>0 )  ";
	$sqlstr =$sqlstr."and cpkcmx.kcid=c.kcid and kh.active=1 and cd.active=1 and cp.active=1  ";
	if ($_GET["p_l_id"])
    {
    	if ($Lid!="0"){
			$sqlstr =$sqlstr." and c.L_id=".$Lid;
		}
	}
    if ($_GET["khid"])
    {
    	if ($_GET["khid"]!="0"){
    		$sqlstr =$sqlstr." and c.khid=".$_GET["khid"];
			}
    }
    if ($_GET["cpid"])
    {
    	if ($_GET["cpid"]!="0"){
    		$sqlstr =$sqlstr." and c.cpid=".$_GET["cpid"];
		}
    }
 	if ($_GET["area"])
    {
    	if ($_GET["area"]!=""){
    		$sqlstr =$sqlstr." and cpkcmx.area=".$_GET["area"];
		}
    }
 	if ($_GET["cdid"])
    {
    	if ($_GET["cdid"]!="0"){
    		$sqlstr =$sqlstr." and c.cdid=".$_GET["cdid"];
		}
    }
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}


function cwjetj() {
	$Lid=$_GET["p_l_id"];
	$ny=$_GET["ny"];
	$yu=$_GET["yu"];
	$khid=$_GET["khid"];
	$sqlstr = "CALL getydmxje(".$Lid.",".$khid.",".$ny.",".$yu.",0)";
	//return $sqlstr; 
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function cwworktj() {
	$Lid=$_GET["p_l_id"];
	$ny=$_GET["ny"];
	$yu=$_GET["yu"];
	$bz=$_GET["bz"];
	$loc=$_GET["loc"];

	$khid=$_GET["khid"];
	if ($loc="Cwworkwz"){
		$sqlstr = "CALL getydbytj(".$Lid.",".$khid.",".$ny.",".$yu.",'".$bz."',1,0)";
	}else{
		$sqlstr = "CALL getydbytj(".$Lid.",".$khid.",".$ny.",".$yu.",'".$bz."',0,0)";
	}
	//return $sqlstr; 
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}



function cpjkdcwlist_pc() {
	$jkid=(int)$_GET['jkid'];
	
	$sqlstr = " SELECT w.cwid as id,w.* FROM cpjkdmx m,cpjkdcw w  where m.mxid=w.mxid "; 
	if ($jkid>0)
	{
		$sqlstr =$sqlstr." and m.jkid=".$jkid;	
	}
	//return $sqlstr; 
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}


function cpckdcwlist_pc(){
	$ckid=(int)$_GET['ckid'];
	$xsid=(int)$_GET['xsid'];
	$loc=$_GET['loc'];


	switch($loc) 
	{ case 'xsid' :
		$sqlstr = "SELECT w.*,x.xsid,x.mxid FROM cpkcmx w,cpxsdmx  x
		where w.kcid=x.kcid ";	
   		if ($xsid>0)
		{
	      $sqlstr .=" and x.xsid=".$xsid;	
		}
		break;
		
	    case 'ckid' :
		$sqlstr = "SELECT w.cwid as id,w.* FROM cpckdcw w,cpckdmx m where w.ckmxid=m.ckmxid ";	
   		if ($ckid>0)
		{
	      $sqlstr .=" and m.ckid=".$ckid;	
		}
		break;
		
		case 'cpckdckcpkcmx' :
		$ckmxid=(int)$_GET['ckmxid'];
		$sqlstr = " SELECT w.*,m.ckid,m.ckmxid,w.id as kcmxid,cpkc.cpph   
		FROM cpkc,cpkcmx w,cpckd ,cpckdmx m,cpxsdmx xm  
		where  cpckd.ckid=m.ckid and m.xsmxid=xm.mxid and xm.kcid=w.kcid and cpkc.kcid=w.kcid ";
		$sqlstr .=" and m.ckmxid=".$ckmxid;	
		
		break;
		  
						
      case 'cpckdcwkcmx' :
		$sqlstr = " SELECT w.*   
		FROM cpckdcw w,cpckd ,cpckdmx m  where cpckd.ckid=m.ckid and m.ckmxid=w.ckmxid  "; 
		if ($xsid>0)
		{
		  $sqlstr .=" and cpckd.xsid=".$xsid;	
		}
		break;	
	  default :
		$sqlstr = "SELECT w.cwid as id,w.* FROM cpckdcw w,cpckdmx m  
		where m.ckmxid=w.ckmxid"; // and (w.sl-w.djsl<>0 or w.zl-w.djzl<>0 ) ";	
   		if ($ckid>0)
		{
	      $sqlstr .=" and m.ckid=".$ckid;	
		}
		break;
	}
	  $sqlstr .=" and ( w.sl<>0 or w.zl<>0 ) ";
	
	//return $sqlstr. $loc; 
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}


function cpghdcwlist_pc(){

	$ckid=(int)$_GET['ckid'];
	$ghid=(int)$_GET['ghid'];
	$loc=$_GET['loc'];


	switch($loc) 
	{case 'ghid' :
		$sqlstr = "SELECT w.*,x.ghid,x.mxid FROM cpkcmx w,wxcpghdmx  x
		where w.kcid=x.kcid ";	
   		if ($ghid>0)
		{
	      $sqlstr .=" and x.ghid=".$ghid;	
		}
		break;
		
	 case 'ckid' :
		$sqlstr = "SELECT w.cwid as id,w.* FROM wxcpghdcw w,wxcpghdmx m where w.mxid=m.mxid ";	
   		if ($ckid>0)
		{
	      $sqlstr .=" and m.ckid=".$ckid;	
		}
		break;
		
	case 'cpghdckcpkcmx' :
		  // $ckmxid=(int)$_GET['mxid'];
		  // $sqlstr = " SELECT w.*,m.ckid,m.ckmxid,w.id as kcmxid,cpkc.cpph   
		  // FROM cpkc,cpkcmx w,wxcpghd d ,wxcpghdmx m
		  // where  d.ghid=m.ghid  and m.kcid=w.kcid and cpkc.kcid=w.kcid ";
		  //  $sqlstr .=" and m.mxid=".$ckmxid;	
			$mxid=(int)$_GET['mxid'];
		   
			$sqlstr = " SELECT w.*,m.ghid,m.mxid,w.id as kcmxid,cpkc.cpph   
			FROM cpkc,cpkcmx w,wxcpghd d ,wxcpghdmx m
			where  d.ghid=m.ghid  and m.kcid=w.kcid and cpkc.kcid=w.kcid AND w.sl<>0 ";
			$sqlstr .=" and m.mxid=".$mxid;	

		break;
		  
						
      case 'cpghdcwkcmx' :
		$sqlstr = " SELECT w.* FROM wxcpghdcw w,wxcpghd d  ,wxcpghdmx m  where d.ghid=m.ghid and m.mxid=w.mxid  "; 
		if ($ghid>0)
		{
		  $sqlstr .=" and d.ghid=".$ghid;	
		}
		break;	
	  default :
		$sqlstr = "SELECT w.cwid as id,w.*,m.ghid,m.mxid FROM wxcpghdcw w,wxcpghdmx m  
		where m.mxid=w.mxid"; // and (w.sl-w.djsl<>0 or w.zl-w.djzl<>0 ) ";	
   		if ($ghid>0)
		{
	      $sqlstr .=" and m.ghid=".$ghid;	
		}
		break;
	}
	  $sqlstr .=" and ( w.sl<>0 or w.zl<>0 ) ";
	
	//return $sqlstr. $loc; 
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}



function packinglist($optype) {
	
	$optype =$_GET['optype'];
	$active =1;
	if (isset($_GET["active"]))
	{
     $active=$_GET['active'];
	}
			
	switch($optype) 
	{case 'location' :
		$lid =(int)$_GET['p_l_id'];
		$sqlstr = "	SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
	    `Weight_Status`,`PS_code`,`Active`,`E_code`, Flbz,
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,
		a.Bytcdj as Bytcdj0,a.Gstcdj as Gstcdj0,a.Cgtcdj as Cgtcdj0,
		c.*
		FROM packing a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,id,mints,czts,Bytcdj,Gstcdj,Cgtcdj  
		FROM packing_l WHERE  L_id=".$lid." ) c ON a.PS_id=c.Pid where a.xmlb=0  and  E_code='".$_GET['p_e_code']."' and a.active=1 ";
	   break;
	 case 'gfgl' :
		$lid =(int)$_GET['p_l_id'];
		$sqlstr = "	SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
	    `Weight_Status`,`PS_code`,`Active`,`E_code`, Flbz,
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,
		a.Bytcdj as Bytcdj0,a.Gstcdj as Gstcdj0,a.Cgtcdj as Cgtcdj0,c.Bytcdjt as Bytcdjt0,
		c.*
		FROM packing a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,id,mints,czts,Bytcdj,Bytcdjt,Gstcdj,Cgtcdj  
		FROM packing_l WHERE  L_id=".$lid." ) c ON a.PS_id=c.Pid where  a.xmlb=1  and  E_code='".$_GET['p_e_code']."'  and a.active=1 ";
	   break;	   
	 case 'customer' :
		$khid =(int)$_GET['khid'];
		$lid =(int)$_GET['p_l_id'];
				
		$sqlstr = "SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
	    `Weight_Status`,`PS_code`,`Active`,`E_code`, Flbz,
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,c.*
		FROM V_packing_L a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints,czts  
		FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid 
		where  a.L_id=".$lid." and  a.E_code='".$_GET['p_e_code']."'  and a.active=1";
		
		/*$sqlstr = "SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
	    `Weight_Status`,`PS_code`,`Active`,`E_code`, 
		a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
		a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,c.*
		FROM packing a LEFT OUTER JOIN (
		SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints,czts  
		FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid where E_code='".$_GET['p_e_code']."'";
        */
	
	break;
	default:
		$sqlstr = " SELECT * ,PS_id as id  FROM packing where E_code='" . $_GET['p_e_code'] . "'";
	//	if ($_GET['active']) {
	//		$sqlstr = $sqlstr . " and Active=" . $_GET['active'];
	//	}
	    $sqlstr .= " and Active=" . $active;
		$sqlstr .=  "   order by PS_code ";
	break;
	}


		
/*	$khid =(int)$_GET['khid'];
	if ($khid>0)
	{
	$lid =(int)$_GET['p_l_id'];
	$sqlstr = "	SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
`Weight_Status`,`PS_code`,`Active`,`E_code`,
a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,
c.*
FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints,czts  
FROM packing_kh WHERE khid=".$khid." and L_id=".$lid." ) c ON a.PS_id=c.Pid where E_code='".$_GET['p_e_code']."'";
		
	}
	else
	{
		$sqlstr = " SELECT * ,PS_id as id  FROM packing where E_code='" . $_GET['p_e_code'] . "'";
		if ($_GET['active']) {
			$sqlstr = $sqlstr . " and Active=" . $_GET['active'];
		}
		$sqlstr = $sqlstr . "   order by PS_code ";
		if ($optype == 1) {
			$sqlstr = $sqlstr . " Limit " . $_GET["start"] . "," . $_GET["limit"];
		}
	}*/

//	return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}
/*
function L_packinglist($optype) {
	
	

$lid =(int)$_GET['p_l_id'];
$sqlstr = "	SELECT `PS_id`,`PS_name`,`Quantity_Unit`,`Weight_Unit`,`PS_shortname`,`Rate`,
`Weight_Status`,`PS_code`,`Active`,`E_code`,
a.Czdj as Czdj0,a.Phdj as Phdj0,a.Czdj2 as Czdj20,a.Phdj2 as Phdj20,a.Bydj as Bydj0,
a.Pbdj as Pbdj0,a.Ghdj as Ghdj0,a.Pfdj as Pfdj0,a.mints as mints0,a.czts as czts0, a.Xmlb,
c.*
FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Czdj`,`Phdj`,`Czdj2`,`Phdj2`,`Bydj`,`Pbdj`,`Ghdj`,`Pfdj`,Khps_id as id,Khid,mints,czts  
FROM packing_L WHERE  L_id=".$lid." ) c ON a.PS_id=c.Pid where E_code='".$_GET['p_e_code']."'";

$query = mysql_query($sqlstr);
return getjsonstoredata($query, 0);
}
*/


function executesql() {
	$sqlstr =$_GET['sql'];
	$query = mysql_query($sqlstr);
	return getjsondata($query);
}


function khworklist($optype) {
	
		$lid =(int)$_GET['p_l_id'];
		$E_code =(int)$_GET['p_e_code'];
		$khid=(int)$_GET['khid'];
		$bzid=(int)$_GET['bzid'];
		
$sqlstr="			
SELECT id,TEXT,CASE WHEN ISNULL(dj) or dj=0  THEN dj0 ELSE dj END  AS dj ,zljs,'' AS CODE, inbz, indj
FROM ( 
SELECT `PS_id`,a.Bydj AS dj0,c.dj,'装卸' AS TEXT ,1 AS zljs,1 AS id,1 AS inbz,1 AS indj
FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Bydj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid WHERE E_code='".$E_code."'  AND PS_id=".$bzid."
UNION ALL
SELECT `PS_id`,a.Pbdj AS dj0,c.dj,'破包修复' AS TEXT ,0 AS zljs,2 AS id,1 AS inbz,1 AS indj
FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS Pid ,`Pbdj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid WHERE E_code='".$E_code."'  AND PS_id=".$bzid."
UNION ALL
SELECT `PS_id`,a.Ghdj AS dj0,c.dj,'过户费' AS TEXT ,1 AS zljs,3 AS id,1 AS inbz,1 AS indj
FROM packing a LEFT OUTER JOIN (
SELECT PS_id AS pid ,`Ghdj` AS dj 
FROM packing_kh WHERE khid=".$khid." AND L_id=".$lid." ) c ON a.PS_id=c.Pid WHERE E_code='".$E_code."'  AND PS_id=".$bzid."
UNION ALL
SELECT 0 AS ps_id,Unit_price AS dj0 ,Unit_price AS dj ,Jobsname AS TEXT,Weight_status AS zljs,
jobs AS id,Quantity_in AS inbz,Price_in AS indj
FROM WORK 
WHERE editbz=1 AND l_id=".$lid." AND E_code='".$E_code."') packing";

		
			//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function commoditylist_pc() {

	$active =1;
	if (isset($_GET["active"]))
	{
     $active=$_GET['active'];
	}

	$sqlstr = "select CT.Quantity_Unit,CT.Weight_Unit,C.*,T.T_id,CT.CT_name FROM commodity C ,commoditytype CT,type T ";

	$sqlstr = "select C.*,T.T_id,C.S_id as id,CT_name FROM commodity C ,commoditytype CT,type T ";
	$sqlstr = $sqlstr . " where C.CT_id = CT.CT_id and CT.T_id = T.T_id and  T.E_code='" . $_GET['p_e_code'] . "'  ";

	$all = "0";
	if ($_GET['displayall']) {
		$all = $_GET['displayall'];
	}
	$sqlstr = $sqlstr . " and  C.Active =". $active; 
	if ($all == "0") {
		$sqlstr = $sqlstr . " and T.Active=1 and  CT.Active=1 ";
	}

	if ($_GET['CT_id'] != '0') {
		$sqlstr = $sqlstr . " and CT.CT_id =" . $_GET['CT_id'];
	} else {
		if ($_GET['T_id'] != "0") {
			$sqlstr = $sqlstr . " and T.T_id =" . $_GET['T_id'];
		}
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code,c.S_code ";
	//return $_GET['T_id'] . $_GET['CT_id'].$sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);

}

function commoditylist() {
	$sqlstr = "SELECT `CT`.* FROM `commoditytype` AS `CT`     INNER JOIN `type` AS `T`   ON (`CT`.`T_id` = `T`.`T_id`) ";
	$sqlstr = $sqlstr . " where T.E_code='" . $_GET['p_e_code'] . "' AND T.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and CT.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code";
	$commoditytype = mysql_query($sqlstr);

	$sqlstr = "SELECT T_id,T_code,T_name FROM TYPE where E_code='" . $_GET['p_e_code'] . "' AND Active=1 order by T_code";
	$typequery = mysql_query($sqlstr);

	$sqlstr = "select CT.Quantity_Unit,CT.Weight_Unit,C.*,T.T_id,CT.CT_name FROM commodity C ,commoditytype CT,type T ";
	$sqlstr = $sqlstr . " where C.CT_id = CT.CT_id and CT.T_id = T.T_id and  T.E_code='" . $_GET['p_e_code'] . "' and T.Active=1 and  CT.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and C.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code,c.S_code ";

	$commodity = mysql_query($sqlstr);

	if ($commodity) {
		$menutype = "";
		$menu_type = array();
		$menu_commoditytype = array();
		$menu_commodity = array();
		while ($menurow = mysql_fetch_array($typequery)) {
			$menutype = $menurow['T_id'];
			$my_array = array();
			$my_array["T_name"] = urlencode($menurow['T_name']);
			$my_array["T_id"] = $menutype;
			array_push($menu_type, $my_array);
			$menu_array2 = array();
			$menu_array1 = array();
			$menu_array0 = array();
			//					$my_array=array();
			//      			$CT_id=$row['T_id']=$menutype;
			//    			$my_array["CT_id"]="0";
			//  			$my_array["CT_code"]="all";
			//			$my_array["CT_name"]=urlencode("所有");
			//        array_push($menu_array1,$my_array);
			//	$menu_array2=array();
			// 		mysql_data_seek($commodity,0);
			//			while($row2=mysql_fetch_array($commodity)) {
			//			   if ($row2['T_id']==$menutype){
			//				  $my_array=array();

			//                	  for ($i=0; $i<mysql_num_fields($commodity); $i++) {
			//                  	$newvar=$row2[mysql_field_name($commodity,$i)];
			//                	$my_array[mysql_field_name($commodity,$i)]=urlencode($newvar);
			//                };
			//			  $my_array["Status"]=$False;
			//      	array_push($menu_array2,$my_array);
			//	   }
			//		}
			//			array_push($menu_array2,array());
			//			array_push($menu_array0,$menu_array2);
			mysql_data_seek($commoditytype, 0);
			while ($row = mysql_fetch_array($commoditytype)) {
				if ($row['T_id'] == $menutype) {
					$my_array = array();
					$CT_id = $row['CT_id'];
					for ($i = 0; $i < mysql_num_fields($commoditytype); $i++) {
						$newvar = $row[mysql_field_name($commoditytype, $i)];
						$my_array[mysql_field_name($commoditytype, $i)] = urlencode($newvar);
					};
					array_push($menu_array1, $my_array);
					//************************************

					$menu_array2 = array();
					mysql_data_seek($commodity, 0);
					while ($row2 = mysql_fetch_array($commodity)) {
						if ($row2['CT_id'] == $CT_id) {
							$my_array = array();
							// $my_array['testid']=$CT_id;
							for ($i = 0; $i < mysql_num_fields($commodity); $i++) {
								$newvar = $row2[mysql_field_name($commodity, $i)];
								$my_array[mysql_field_name($commodity, $i)] = urlencode($newvar);
							};
							$my_array["Status"] = false;
							array_push($menu_array2, $my_array);
						}
					}
					array_push($menu_array2, array());
					array_push($menu_array0, $menu_array2);
					//**************************************
				}
			}
			$my_array = array();
			$my_array["CT_id"] = "0";
			array_push($menu_array1, $my_array);

			array_push($menu_commoditytype, $menu_array1);
			array_push($menu_commodity, $menu_array0);
		}

		$my_array = array();
		$my_array["T_id"] = "all";
		$my_array["T_name"] = "all";
		array_push($menu_type, $my_array);

		$my_array = array();
		$my_array["T_id"] = "a01";
		$my_array["T_name"] = "菜单01";
		array_push($menu_type, $my_array);
		$my_array = array();
		$my_array["T_id"] = "a02";
		$my_array["T_name"] = "菜单02";
		array_push($menu_type, $my_array);

		$my_array = array();
		$my_array["T_id"] = "a03";
		$my_array["T_name"] = "菜单03";
		array_push($menu_type, $my_array);

		$my_array = array();
		$my_array["T_id"] = "a04";
		$my_array["T_name"] = "菜单04";
		array_push($menu_type, $my_array);

		$my_array = array();
		$my_array["T_id"] = "a05";
		$my_array["T_name"] = "菜单05";
		array_push($menu_type, $my_array);

		$menu["type"] = $menu_type;
		$menu["commoditytype"] = $menu_commoditytype;
		$menu["commodity"] = $menu_commodity;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function commoditymenulist() {
	$sqlstr = "SELECT `CT`.* FROM `commoditytype` AS `CT`     INNER JOIN `type` AS `T`   ON (`CT`.`T_id` = `T`.`T_id`) ";
	$sqlstr = $sqlstr . " where T.E_code='" . $_GET['p_e_code'] . "' AND T.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and CT.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code";
	$commoditytype = mysql_query($sqlstr);

	$sqlstr = "SELECT T_id,T_code,T_name FROM TYPE where E_code='" . $_GET['p_e_code'] . "' AND Active=1 order by T_code";
	$typequery = mysql_query($sqlstr);

	$sqlstr = "select CT.Quantity_Unit,CT.Weight_Unit,C.*,T.T_id,CT.CT_name FROM commodity C ,commoditytype CT,type T ";
	$sqlstr = $sqlstr . " where C.CT_id = CT.CT_id and CT.T_id = T.T_id and  T.E_code='" . $_GET['p_e_code'] . "' and T.Active=1 and  CT.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and C.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code,c.S_code ";

	$commodity = mysql_query($sqlstr);

	if ($commodity) {
		$menutype = "";
		$menu_type = array();
		$menu_commoditytype = array();
		$menu_commodity = array();
		while ($menurow = mysql_fetch_array($typequery)) {
			$menutype = $menurow['T_id'];
			$my_array = array();
			$my_array["menu"] = urlencode($menurow['T_name']);
			$my_array["menuId"] = $menutype;
			array_push($menu_type, $my_array);
			$menu_array2 = array();
			$menu_array1 = array();
			$menu_array0 = array();
			mysql_data_seek($commoditytype, 0);
			while ($row = mysql_fetch_array($commoditytype)) {
				if ($row['T_id'] == $menutype) {
					$my_array = array();
					$CT_id = $row['CT_id'];
					$my_array["tabName"] = urlencode($row['CT_name']);
					$my_array["id"] = $row['CT_id'];
					$my_array["Rate"] = $row['Rate'];

					$my_array["Quantity_Unit"] = $row['Quantity_Unit'];
					$my_array["Weight_Unit"] = $row['Weight_Unit'];

					array_push($menu_array1, $my_array);
					//************************************

					$menu_array2 = array();
					mysql_data_seek($commodity, 0);
					while ($row2 = mysql_fetch_array($commodity)) {
						if ($row2['CT_id'] == $CT_id) {
							$my_array = array();
							// $my_array['testid']=$CT_id;
							for ($i = 0; $i < mysql_num_fields($commodity); $i++) {
								$newvar = $row2[mysql_field_name($commodity, $i)];
								$my_array[mysql_field_name($commodity, $i)] = urlencode($newvar);
							};
							$my_array["Status"] = false;
							array_push($menu_array2, $my_array);
						}
					}
					//array_push($menu_array2,array());
					array_push($menu_array0, $menu_array2);
					//**************************************
				}
			}
			/*
			 $my_array=array();
			 $my_array["id"]="0";
			 $my_array["tabName"]="";
			 array_push($menu_array1,$my_array);
			 */

			array_push($menu_commoditytype, $menu_array1);
			array_push($menu_commodity, $menu_array0);
		}

		/*            $my_array=array();
		 $my_array["menuId"]="all";
		 $my_array["menu"]="all";
		 array_push($menu_type,$my_array);

		 $my_array=array();
		 $my_array["menuId"]="a01";
		 $my_array["menu"]="菜单01";
		 array_push($menu_type,$my_array);
		 $my_array=array();
		 $my_array["menuId"]="a02";
		 $my_array["menu"]="菜单02";
		 array_push($menu_type,$my_array);
		 $my_array=array();
		 $my_array["menuId"]="a03";
		 $my_array["menu"]="菜单03";
		 array_push($menu_type,$my_array);
		 $my_array=array();
		 $my_array["menuId"]="a04";
		 $my_array["menu"]="菜单04";
		 array_push($menu_type,$my_array);
		 */

		$menu["menus"] = $menu_type;
		$menu["tabs"] = $menu_commoditytype;
		$menu["commodity"] = $menu_commodity;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function commoditytypemenulist() {
	$sqlstr = "SELECT `CT`.* FROM `commoditytype` AS `CT`     INNER JOIN `type` AS `T`   ON (`CT`.`T_id` = `T`.`T_id`) ";
	$sqlstr = $sqlstr . " where T.E_code='" . $_GET['p_e_code'] . "' AND T.Active=1 ";
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and CT.Active =" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by T.T_code,CT.CT_code";
	$commoditytype = mysql_query($sqlstr);

	$sqlstr = "SELECT T_id,T_code,T_name FROM TYPE where E_code='" . $_GET['p_e_code'] . "' AND Active=1 order by T_code";
	$typequery = mysql_query($sqlstr);

	if ($typequery) {
		$menutype = "";
		$menu_type = array();
		$menu_array1 = array();
		$menu_array0 = array();
		$menu_commoditytype = array();

		while ($row = mysql_fetch_array($typequery)) {

			$my_array = array();
			$T_id = $row['T_id'];
			$my_array["tabName"] = urlencode($row['T_name']);
			$my_array["id"] = $row['T_id'];

			array_push($menu_array1, $my_array);
			//************************************

			$menu_array2 = array();
			mysql_data_seek($commoditytype, 0);

			while ($row2 = mysql_fetch_array($commoditytype)) {
				if ($row2['T_id'] == $T_id) {
					$my_array = array();

					for ($i = 0; $i < mysql_num_fields($commoditytype); $i++) {
						$newvar = $row2[mysql_field_name($commoditytype, $i)];
						$my_array[mysql_field_name($commoditytype, $i)] = urlencode($newvar);
					};
					$my_array["Status"] = false;
					array_push($menu_array2, $my_array);
				}

			}

			array_push($menu_array0, $menu_array2);

			array_push($menu_type, $menu_array1);
			array_push($menu_commoditytype, $menu_array0);
		}

		$menu["tabs"] = $menu_array1;
		$menu["commoditytype"] = $menu_array0;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function menusystemlist() {

	$termtype = $_GET['termtype'];
	$appid = $_GET['appid'];
	//$khsysyem = $_GET['khsystem'];
    //return $khsysyem;
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
	$userid =$o['userid'] ;
	$khsystem = $o['khsystem'];

   //return $khsystem;

   if ($khsystem=="1")
   {
	$sqlstr = " SELECT Psort,menu,sort,name,iconurl,viewpath ,menu_id,widgetName FROM menusystem where   menu_id<>19 and menu_id<>22 and (alluser=1 or ( enabled=1 and khbz=2  and instr(termtype,'" . $termtype . "')>0  ) )";
	$sqlstr .= "  order by Psort,Sort ";
   }
   else
   {
	$menustring="";
	
    $sqlstr="	SELECT usertype.`menustring` FROM users,usertype WHERE usertype.`typeid`=users.`typeid` AND users.`userid`=".$userid;
    $query = mysql_query($sqlstr);
    while ($menurow = mysql_fetch_array($query)) {
    	$menustring=$menurow['menustring'];
     	break;
    }
	if ($termtype == 'classic') {
		$sqlstr = " SELECT Psort,menu,sort,name,iconurl,viewpath ,menu_id,widgetName FROM menusystem where alluser=1 or ( enabled=1  and instr(termtype,'" . $termtype . "')>0   ";
		if ($appid == "2"){
			$sqlstr .=" and khbz=1"; 
		}else
		{
			if ($menustring>"")
			{
				$sqlstr .= " and khbz<2 and (name='-' or  POSITION( CONCAT(';',menu_id ,';')  in '".$menustring."')>0 )";		
			}
		}
		$sqlstr .= " ) order by Psort,Sort ";
	} else {
		$type = $_GET['menutype'];
		if ($type == "all") {
			$sqlstr = " SELECT * FROM menusystem where Enabled=1 ";
		} else {
			$sqlstr = " SELECT Psort,menu,sort,name,iconurl,page,menu_id FROM menusystem where alluser=1 or( enabled=1 and type='" . $type . "' ";
		}
		if ($menustring>"")
		{
			$sqlstr .= "  and (name='-' or  POSITION( ';'+menu_id+';' in '".$menustring."')>0) ";	
		}    
		$sqlstr .= " ) order by Psort,Sort";
	}
    }


	//return $sqlstr;
	$query = mysql_query($sqlstr);
	//return getjsonstoredata($query, 0);
	$main_array =",,";
	if ($query) {

		while ($row = mysql_fetch_array($query)) {
			if ($row["name"]!="-")
			{
				$main_array= $main_array.$row["Psort"].",";
			}
		}
		//return ",".$row[$Psort].",";
		/*if (strpos($main_array,",1,")){
		return $main_array;
		}
		else
		{
        return '0';
		}
*/

		mysql_data_seek($query, 0);



		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			if (strpos($main_array,",".$row["Psort"].","))			{
				for ($i = 0; $i < mysql_num_fields($query); $i++) 
				{
				$fieldname=mysql_field_name($query, $i);
				$newvar = $row[$fieldname];

					if (($fieldname=='cnote')  || ($fieldname=='cphm') || ($fieldname=='sfr') || ($fieldname=='thr') )
					{
				   	if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
				  	 {

						$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
						$newvar=str_replace("\n"," ",$newvar);
				   	}
					}
				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
				}	;
				$arr['rows'][] = $my_array;
		    }
		}

		if ($total == 0) {
			$arr['results'] = mysql_numrows($query);
			$arr['total'] = mysql_numrows($query);
		} else {
			$arr['results'] = $total;
			$arr['total'] = $total;
		}
		$arr['success'] = true;
	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($arr));


}

function imagesload() {
	$dhlb = $_GET['dhlb'];
	$dhid = $_GET['dhid'];
	$sqlstr = " SELECT * FROM uploadimages where dhlb='".$dhlb."' and dhid=".$dhid;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function menusystemnavlist() {





	
	$sqlstr = " SELECT Psort,Menu,Sort,Name,Page0 as Page FROM menusystem where Active=1";
	$sqlstr .= " order by Psort,Sort ";

   return  $sqlstr;
	$query = mysql_query($sqlstr);
	$sqlstr1 = " SELECT Psort,Menu,Description FROM menusystem where Active=1 group by Psort  order by Psort  ";
	$typequery = mysql_query($sqlstr1);
	if ($query) {
		$menu_array = array();
		$menu = array();
		$menutype = "";

		$menu_array1 = array();
		$menu_array2 = array();

		while ($menurow = mysql_fetch_array($typequery)) {
			$menutype = $menurow['Psort'];
			$my_array = array();
			$my_array["menu"] = urlencode($menurow['Menu']);
			$my_array["menuId"] = $menutype;
			$my_array["Description"] = urlencode($menurow['Description']);

			array_push($menu_array1, $my_array);
			$menu_array3 = array();
			mysql_data_seek($query, 0);
			while ($row = mysql_fetch_array($query)) {
				if ($row["Psort"] == $menutype) {
					$my_array = array();
					for ($i = 0; $i < mysql_num_fields($query); $i++) {
						$newvar = $row[mysql_field_name($query, $i)];
						$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
					};
					array_push($menu_array3, $my_array);
				}
			}
			//array_push($menu_array3,array());
			array_push($menu_array2, $menu_array3);
		}

		$menu_array3 = array();
		mysql_data_seek($query, 0);
		while ($row = mysql_fetch_array($query)) {

			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {

				$newvar = $row[mysql_field_name($query, $i)];
				if ($newvar == "Psort") {
					$my_array[mysql_field_name($query, $i)] = "all";
				} else {
					$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
				}
			};
			array_push($menu_array3, $my_array);

		}
		array_push($menu_array3, array());
		array_push($menu_array2, $menu_array3);


		$menu["menu"] = $menu_array1;
		$menu["submenu"] = $menu_array2;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function menusystemselect() {

	$sqlstr = " SELECT menu_id as id ,Name FROM menusystem order by Psort,Sort ";
	$query = mysql_query($sqlstr);
	if ($query) {
		$menu_array1 = array();
		while ($menurow = mysql_fetch_array($query)) {
			$my_array = array();
			$my_array["id"] = urlencode($menurow['id']);
			$my_array["name"] = urlencode($menurow['Name']);
			array_push($menu_array1, $my_array);
		}
		$menu["menu"] = $menu_array1;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}

function workerlist() {
	$sqlstr = " SELECT Jobs,Jobsname FROM worker where L_id=" . $_GET['p_l_id'] . " and Active=1  group by Jobs,Jobsname order by Jobs,Jobsname  ";
	$jobsquery = mysql_query($sqlstr);

	$sqlstr = " SELECT * ";
	$sqlstr = $sqlstr . " FROM worker where L_id=" . $_GET['p_l_id'];

	if ($_GET['active']) {
		//$sqlstr=$sqlstr." and worker.Active =".$_GET['active'] ;
	}
	$sqlstr = $sqlstr . " order by worker.Jobs,worker.Name ";

	$workerquery = mysql_query($sqlstr);

	//return $sqlstr;
	if ($workerquery) {
		$result = array();
		$jobs = "";
		$jobs_array = array();
		$worker_array = array();

		while ($jobsrow = mysql_fetch_array($jobsquery)) {
			$jobsid = $jobsrow['Jobs'];
			//	$my_array=array();
			//    $my_array["tabId"]=$jobsrow['Jobs'];
			//    $my_array["tabName"]=$jobsrow['Jobsname'];
			//array_push($jobs_array,$my_array);

			$cur_array = array();
			mysql_data_seek($workerquery, 0);
			while ($row = mysql_fetch_array($workerquery)) {
				if ($row["Jobs"] == $jobsid) {
					$my_array = array();
					$my_array["WeightStatus"] = $row['WeightStatus'];
					$my_array["Auto"] = $row['Auto'];
					$my_array["Name"] = $row['Name'];
					$my_array["Jobs"] = $row['Jobs'];
					$my_array["Tel"] = $row['Tel'];
					$my_array["Active"] = $row['Active'];
					$my_array["Id"] = $row['Id'];
					array_push($cur_array, $my_array);
				}
			}
			array_push($cur_array, array());

			array_push($worker_array, $cur_array);
		}

		$jobs_array = array();
		$my_array = array();
		$my_array["tabId"] = 1;
		$my_array["tabName"] = "搬运";
		array_push($jobs_array, $my_array);

		$my_array = array();
		$my_array["tabId"] = 2;
		$my_array["tabName"] = "机械";
		array_push($jobs_array, $my_array);

		$my_array = array();
		$my_array["tabId"] = 3;
		$my_array["tabName"] = "其它";
		array_push($jobs_array, $my_array);

		$result["tabs"] = $jobs_array;

		$result["worker"] = $worker_array;
		$result['success'] = true;
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));

}

function workerlist_pc() {
	$sqlstr = "SELECT *,Id as id FROM worker where L_id=" . $_GET['p_l_id'];
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and Active=" . $_GET['active'];
	}
	if ($_GET['Jobs']) {
		$sqlstr = $sqlstr . " and Jobs='" . $_GET['Jobs'] . "'";
	}

	$sqlstr = $sqlstr . " order by Jobs ";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function worklist0() {
	$L_id=1;
	if (isset($_GET['p_l_id'])) {
		$L_id=$_GET['p_l_id'];
		
	}
  //return $_GET['p_l_id'];
	
 

	$sqlstr = "SELECT * FROM work where editbz=1 and  E_code='" . $_GET['p_e_code'] . "' and  L_id=" . $L_id ;
	if ($_GET['active']) {
		$sqlstr = $sqlstr . " and Active=" . $_GET['active'];
	}
	$sqlstr = $sqlstr . " order by Jobs ";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsonstoredata($query, 0);
}

function worklist() {
	//$sqlstr=" SELECT Jobs,Jobsname FROM work where L_id=".$_GET['p_l_id']." and Active=1 group by Jobs order by Jobs  "  ;
	//$jobsquery = mysql_query($sqlstr);

	$sqlstr = " SELECT * FROM work where E_code='" . $_GET['p_e_code'] . "'";
	if ($_GET['active']) {
		// $sqlstr=$sqlstr." and Active =".$_GET['active'] ;
	}
	$sqlstr = $sqlstr . " order by Jobs ";

	$workquery = mysql_query($sqlstr);

	if ($workquery) {
		$result = array();
		$jobs = "";
		$jobs_array = array();
		$work_array = array();

		$cur_array = array();
		mysql_data_seek($workquery, 0);
		while ($row = mysql_fetch_array($workquery)) {

			$my_array = array();

			$my_array["Jobs"] = $row['Jobs'];
			$my_array["Jobsname"] = $row['Jobsname'];
			$my_array["Active"] = $row['Active'];
			$my_array["Quantity_in"] = $row['Quantity_in'];
			$my_array["Weight_status"] = $row['Weight_status'];
			$my_array["Unit_price"] = $row['Unit_price'];
			$my_array["Price_in"] = $row['Price_in'];
			$my_array["Auto"] = $row['Auto'];
			$my_array["id"] = $row['id'];
			array_push($cur_array, $my_array);

		}
		//array_push($cur_array,array());
		//array_push($work_array,$cur_array);
		$result["tab"] = array();
		$result["work"] = $cur_array;
		//$work_array;
		$result['success'] = true;
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));

}

function getstoredata($query, $total) {//返回STORE所需的数据
	//mysql_num_fields($query)字段数
	//mysql_field_name($query,0) 字段名称
	//mysql_numrows($query)记录数

	if ($query) {

		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				/*
				 if (is_bool($newvar)) {
				 if ($newvar){
				 $my_array[mysql_field_name($query,$i)]=1;
				 }else{
				 $my_array[mysql_field_name($query,$i)]=0;
				 }
				 }   else
				 {*/
				$my_array[mysql_field_name($query, $i)] = $newvar;

				//}

			};
			$arr['rows'][] = $my_array;

		}

		if ($total == 0) {
			$arr['results'] = mysql_numrows($query);
		} else {
			$arr['results'] = $total;
		}
	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => '数据查询操作失败！');

	}

	return json_encode($arr);
}

function enterprisesave($optype) {
	//0 update 1 add 2 delete

	$error = '';
	$raw = '';
	$sq = '';
	$fp = fopen('php://input', 'r');
	while ($kb = fread($fp, 1024)) {
		$raw .= $kb;
	}

	$params = json_decode($raw, true);
	if (count($params) && !isset($params[0])) {
		$params = array($params);
	}
	$str = $params[0]['Address'];

	// $_POST['php_input'] = $raw;
	// $params;

	$sql = '';
	//mysql_query('start transaction');
	foreach ($params as $arr) {

		switch ($optype) {
			case 1 :
				//insert
				$sql = "insert into enterprise(E_code,E_name,Address,Tel) values('" . $arr['E_code'] . "'";
				$sql .= ",'" . $arr['E_name'] . "'";
				$sql .= ",'" . $arr['Address'] . "'";
				$sql .= ",'" . $arr['Tel'] . "')";
				break;
			case 2 :
				//delete
				$sql = "delete from enterprise where E_code='" . $arr['id'] . "'";
				break;
			default :
				$sql = "";
				$str = $arr['Address'];
				if (isset($str)) {
					$sql .= ",Address='" . $str . "'";
				}
				$str = $arr['Tel'];
				if (isset($str)) {
					$sql .= ",Tel='" . $str . "'";
				}
				$str = $arr['E_code'];
				if (isset($str)) {
					$sql .= ",E_code='" . $str . "'";
				}
				$str = $arr['E_name'];
				if (isset($str)) {
					$sql .= ",E_name='" . $str . "'";
				}
				$str = $arr['Active'];
				if (isset($str)) {
					if ($str) {
						$sql .= ",Active=1";
					} else {
						$sql .= ",Active=0";
					}
				}

				$sql = "update enterprise set " . substr($sql, 1) . " where E_code='" . $arr['id'] . "'";
				break;
		}

		$sq .= $sql;
		mysql_query($sql);

		if (mysql_errno() > 0) {
			$error = 'yes';
			break;
		}
	}

	//  mysql_query('commit');
	//return $raw ;
	if ($error == 'yes') {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败！!"}';
//		return '数据保存失败！!' + $sql;
	} else {
		mysql_query('commit');
		return '{result:"success"}';
	}

	return $sql;

}

function locationedit() {
	$options = $_GET['options'];
	$L_id = $_GET['LL_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from location where L_id=" . $L_id;
			break;
		default :
			if ($L_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";

				$sql = "update location set L_code='" . $_GET['L_code'] . "'";
				$sql .= ",L_name='" . $_GET['L_name'] . "'";
				$sql .= ",Address='" . $_GET['Address'] . "'";
				$sql .= ",Tel='" . $_GET['Tel'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where L_id=" . $L_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into location(L_code,E_code,L_name,Address,Tel) values('" . $_GET['L_code'] . "'";
				$sql .= ",'" . $_GET['E_code'] . "'";
				$sql .= ",'" . $_GET['L_name'] . "'";
				$sql .= ",'" . $_GET['Address'] . "'";
				$sql .= ",'" . $_GET['Tel'] . "')";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function customeredit() {
	$options = $_GET['options'];
	$C_id = $_GET['C_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from customer where C_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update customer set C_code='" . $_GET['C_code'] . "'";
				$sql .= ",C_name='" . $_GET['C_name'] . "'";
				$sql .= ",Address='" . $_GET['Address'] . "'";
				$sql .= ",Tel='" . $_GET['Tel'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where C_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into customer(C_code,E_code,C_name,Address,Tel) values('" . $_GET['C_code'] . "'";
				$sql .= ",'" . $_GET['E_code'] . "'";
				$sql .= ",'" . $_GET['C_name'] . "'";
				$sql .= ",'" . $_GET['Address'] . "'";
				$sql .= ",'" . $_GET['Tel'] . "')";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function commoditytypeedit() {
	$options = $_GET['options'];
	$C_id = $_GET['CT_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from commoditytype where CT_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update commoditytype set  CT_code='" . $_GET['CT_code'] . "'";
				$sql .= ",CT_name='" . $_GET['CT_name'] . "'";
				//$sql.=",Quantity_Unit='".$_GET['Quantity_Unit']."'";
				//$sql.=",Weight_Unit='".$_GET['Weight_Unit']."'";
				//$sql.=",Rate=".$_GET['Rate'];
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where CT_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into commoditytype(CT_code,T_id,CT_name) values('" . $_GET['CT_code'] . "'";
				$sql .= "," . $_GET['T_id'];
				$sql .= ",'" . $_GET['CT_name'] . "')";
				// $sql.=",'".$_GET['Quantity_Unit']."'";
				// $sql.=",'".$_GET['Weight_Unit']."'";
				// $sql.=",".$_GET['Rate'].")";
			}
			break;
	};

	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function packingedit() {
	$options = $_GET['options'];
	$C_id = $_GET['PS_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from packing where PS_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update packing set  PS_code='" . $_GET['PS_code'] . "'";
				$sql .= ",PS_name='" . $_GET['PS_name'] . "'";
				$sql .= ",PS_shortname='" . $_GET['PS_shortname'] . "'";
				$sql .= ",Quantity_Unit='" . $_GET['Quantity_Unit'] . "'";
				$sql .= ",Weight_Unit='" . $_GET['Weight_Unit'] . "'";
				$sql .= ",Rate=" . $_GET['Rate'];
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= ",Weight_Status=" . $_GET['Weight_Status'];
				$sql .= " where PS_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into packing(PS_code,E_code,PS_name,PS_shortname,Quantity_Unit,Weight_Unit,Rate,Weight_Status) values('" . $_GET['PS_code'] . "'";
				$sql .= ",'" . $_GET['E_code'] . "'";
				$sql .= ",'" . $_GET['PS_name'] . "'";
				$sql .= ",'" . $_GET['PS_shortname'] . "'";
				$sql .= ",'" . $_GET['Quantity_Unit'] . "'";
				$sql .= ",'" . $_GET['Weight_Unit'] . "'";
				$sql .= "," . $_GET['Rate'];
				$sql .= "," . $_GET['Weight_Status'] . ")";
			}
			break;
	};

	//return $sql;
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {

		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function workeredit() {
	$options = $_GET['options'];
	$C_id = $_GET['Id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from worker where Id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update worker set  Tel='" . $_GET['Tel'] . "'";
				$sql .= ",Name='" . $_GET['Name'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where Id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into worker (Jobs,L_id,Name,Jobsname,Tel) values(" . $_GET['Jobs'];
				$sql .= "," . $_GET['L_id'];
				$sql .= ",'" . $_GET['Name'] . "'";
				$sql .= ",'" . $_GET['Jobsname'] . "'";
				$sql .= ",'" . $_GET['Tel'] . "')";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function workedit() {
	$options = $_GET['options'];
	$C_id = $_GET['Id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from work where Id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update work set Unit_price=" . $_GET['Unit_price'];
				$sql .= ",Jobs='" . $_GET['Jobs'] . "'";
				$sql .= ",Jobsname='" . $_GET['Jobsname'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= ",Quantity_in=" . $_GET['Quantity_in'];
				$sql .= " where Id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into work (Jobs,L_id,Quantity_in,Jobsname,Unit_price) values(" . $_GET['Jobs'];
				$sql .= "," . $_GET['L_id'];
				$sql .= "," . $_GET['Quantity_in'];
				$sql .= ",'" . $_GET['Jobsname'] . "'";
				$sql .= "," . $_GET['Unit_price'] . ")";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function commodityedit() {
	$options = $_GET['options'];
	$C_id = $_GET['S_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from commodity where S_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update commodity set  S_code='" . $_GET['S_code'] . "'";
				$sql .= ",S_name='" . $_GET['S_name'] . "'";
				//		   $sql.=",Quantity_Unit='".$_GET['Quantity_Unit']."'";
				//	   $sql.=",Weight_Unit='".$_GET['Weight_Unit']."'";
				//  $sql.=",Size='".$_GET['Sise']."'";
				//  $sql.=",Rate=".$_GET['Rate'];
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where S_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into commodity(S_code,CT_id,S_name) values('" . $_GET['S_code'] . "'";
				$sql .= "," . $_GET['CT_id'];
				$sql .= ",'" . $_GET['S_name'] . "')";
				//   $sql.=",'".$_GET['Quantity_Unit']."'";
				//   $sql.=",'".$_GET['Weight_Unit']."'";
				// $sql.=",'".$_GET['Size']."'";
				// $sql.=",".$_GET['Rate'].")";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function warehouseedit() {
	$options = $_GET['options'];
	$C_id = $_GET['W_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from warehouse where W_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update warehouse set W_code='" . $_GET['W_code'] . "'";
				$sql .= ",W_name='" . $_GET['W_name'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where W_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into warehouse (W_code,L_id,W_name) values('" . $_GET['W_code'] . "'";
				$sql .= "," . $_GET['L_id'];
				$sql .= ",'" . $_GET['W_name'] . "')";
			}
			break;
	};

	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function unitsedit() {
	$options = $_GET['options'];
	$C_id = $_GET['Id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from units where id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update units set unit='" . $_GET['Unit'] . "'";
				$sql .= ",sort='" . $_GET['Sort'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into units(sort,L_id,unit) values('" . $_GET['Sort'] . "'";
				$sql .= "," . $_GET['L_id'];
				$sql .= ",'" . $_GET['Unit'] . "')";

			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function producesedit() {
	$options = $_GET['options'];
	$C_id = $_GET['P_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from produces where P_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update produces set P_code='" . $_GET['P_code'] . "'";
				$sql .= ",P_name='" . $_GET['P_name'] . "'";
				//$sql.=",Address='".$_GET['Address']."'";
				//$sql.=",Tel='".$_GET['Tel']."'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where P_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into produces (P_code,E_code,P_name) values('" . $_GET['P_code'] . "'";
				$sql .= ",'" . $_GET['E_code'] . "'";
				$sql .= ",'" . $_GET['P_name'] . "')";
				// $sql.=",'".$_GET['Address']."'";
				// $sql.=",'".$_GET['Tel']."')";
			}
			break;
	};
	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function typeedit() {
	$options = $_GET['options'];
	$C_id = $_GET['T_id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from type where T_id=" . $C_id;
			break;
		default :
			if ($C_id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update type set T_code='" . $_GET['T_code'] . "'";
				$sql .= ",T_name='" . $_GET['T_name'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where T_id=" . $C_id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into type(T_code,E_code,T_name) values('" . $_GET['T_code'] . "'";
				$sql .= ",'" . $_GET['E_code'] . "'";
				$sql .= ",'" . $_GET['T_name'] . "')";
			}
			break;
	};

	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function enterpriseedit() {
	$options = $_GET['options'];
	$E_code = $_GET['E_code'];
	$id = $_GET['id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from enterprise where E_code='" . $id . "'";
			break;
		default :
			if (($id == "") || ($id == "0") || ($id == null))//update
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into enterprise(E_code,E_name,E_shortname,Address,Tel) values('" . $E_code . "'";
				$sql .= ",'" . $_GET['E_name'] . "'";
				$sql .= ",'" . $_GET['E_shortname'] . "'";
				$sql .= ",'" . $_GET['Address'] . "'";
				$sql .= ",'" . $_GET['Tel'] . "')";

			} else//insert
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";

				$sql = "update enterprise set E_code='" . $E_code . "'";
				$sql .= ",E_name='" . $_GET['E_name'] . "'";
				$sql .= ",E_shortname='" . $_GET['E_shortname'] . "'";
				$sql .= ",Address='" . $_GET['Address'] . "'";
				$sql .= ",Tel='" . $_GET['Tel'] . "'";
				$sql .= ",Active=" . $_GET['Active'];
				$sql .= " where E_code='" . $id . "'";

			}
			break;
	};

	mysql_query($sql);
	$arr['success'] = true;
	if (mysql_errno() > 0) {
		$msg = $errmsg;
	}
	//$msg=$msg.$sql;
	$arr['data'] = array('id' => mysql_errno(), 'msg' => urlencode($msg));
	return urldecode(json_encode($arr));

}

function getjsonstoredata($query, $total) {//返回STORE所需的数据
	//mysql_num_fields($query)字段数
	//mysql_field_name($query,0) 字段名称
	//mysql_numrows($query)记录数

	if ($query) {
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$fieldname=mysql_field_name($query, $i);
				$newvar = $row[$fieldname];

				if (($fieldname=='cnote')  || ($fieldname=='cphm') || ($fieldname=='sfr') || ($fieldname=='thr') )
				{
				   if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
				   {

					$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
					$newvar=str_replace("\n"," ",$newvar);
				   }
                       

				}


				$my_array[mysql_field_name($query, $i)] = urlencode($newvar);
			};
			$arr['rows'][] = $my_array;
		}

		if ($total == 0) {
			$arr['results'] = mysql_numrows($query);
			$arr['total'] = mysql_numrows($query);
		} else {
			$arr['results'] = $total;
			$arr['total'] = $total;
		}
		$arr['success'] = true;
	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}

	return urldecode(json_encode($arr));
	return json_encode($arr);
}

//            new end
function getstoredata1($query, $total) {//返回STORE所需的数据

	$json = '[{"name":"商品库存查询","page":""},{"name":"商品进仓处理","page":""}]';
	return $json;
	$obj = json_encode($json);
	return $obj;
	//return'[{"aaa":1111,"bbb":2222}]';
	$returnstr = "";
	$rowstr = "";
	if ($query) {
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			$rowstr = "";
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newname = mysql_field_name($query, $i);
				$newvar = $row[$newname];
				$rowstr = $rowstr + "," + "{\"" + $newname + "\":\"" + $newvar + "\"}";

			};
			$returnstr = $returnstr + "," + substr($rowstr, 1);
		}
		//$returnstr=json_decode(substr($returnstr,1),true);
		$returnstr = substr($returnstr, 1);

	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}

	return $returnstr;

	return json_encode($arr);
}

//*************************************************

function currencylist1() {
	$sqlstr = "select * from currency where currency<>'GLD' order by xh ";
	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);
}

function menulist() {
	$bz = $_GET['bz'];
	$userid = $_GET['userid'];
	if ($bz == 1) {
		$sqlstr = "SELECT   sys_menu.* FROM  sys_menu,  bjluser WHERE bjluser.userid =" . $userid;
		$sqlstr = $sqlstr . " and sys_menu.zzbz=0 AND bjluser.sysmenu LIKE CONCAT('%|' , sys_menu.menu_id , '|%' ) ORDER BY sys_menu.menu_xh ";
	} else {
		$sqlstr = "SELECT   sys_menu.* FROM  sys_menu WHERE menu_id0=0 and zzbz=0";

	}

	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);

}

function checkuser($aid, $bid) {
	$sqlstr = "select checkdiskno('" . $aid . "','" . $bid . "',0)";
	$query = mysql_query($sqlstr);
	if ($query) {
		if (mysql_numrows($query) > 0) {
			while ($row = mysql_fetch_array($query)) {
				return $row[mysql_field_name($query, 0)];
			}
		}
	}
	return '0';
}

function getmacvalue($userid, $mac) {
	$sqlstr = "select  lastloginmac from bjluser where userid=" . $userid . ' LIMIT 0,1';
	$query = mysql_query($sqlstr);
	if ($query) {
		if (mysql_numrows($query) > 0) {
			while ($row = mysql_fetch_array($query)) {
				$s = $row[mysql_field_name($query, 0)];
				if ($s == $mac) {
					return "";
				} else {
					return "此用户已在其它地方登录，数据保存失败！";
				}

			}
		}
	}
	return '';
}

function checkuser1($psw, $userid) {

	$sqlstr = "select checkdiskno('" . $psw . "',''," . $userid . ")";

	$query = mysql_query($sqlstr);
	if ($query) {
		if (mysql_numrows($query) > 0) {
			while ($row = mysql_fetch_array($query)) {
				return $row[mysql_field_name($query, 0)];
			}
		}
	}
	return '0';
}

function bjlctrjelist() {
	$sqlstr = "select ctrid,minje,maxje,xh  from bjlctrje  where zzbz=0 order by xh ";
	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);

}

function bjljsidloclist($userid) {
	$tel = $_GET['Telbz'];
	if ($tel == 0) {
		$sqlstr = "SELECT @rownum:=@rownum+1 AS id, b.jsid FROM (SELECT @rownum:=0) r, bjljs b WHERE b.USERID=" . $userid . " AND b.zt=1   ORDER BY b.jsid ";
	} else {
		$sqlstr = "SELECT @rownum:=@rownum+1 AS id, b.jsid FROM (SELECT @rownum:=0) r, bjlteljs b WHERE b.USERID=" . $userid . " AND b.zt=1   ORDER BY b.jsid ";
	}

	//$sqlstr="select ctrid,minje,maxje,xh  from bjlctrje  where zzbz=0 order by xh " ;

	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);

}

function donationadd($userid) {
	$userid = $_POST['locuserid'];

	$sqrq = $_POST['sqrq'];
	$currency = $_POST['currency'];
	$cnote = $_POST['donationnote'];
	$sqje = $_POST['sqje'];
	if ($currency == "GLD") {
		//$sqgoldsl=$_POST["sqgoldsl-inputEl"];
		//$userid=$_POST['locuserid'];
		$sqgoldsl = $sqje;
		$sqlstr = "insert into userdonation ( userid,sqrq,shrq,currency,sqje,donationnote,state ,shr,renote,donation,lastdonation,wl,date)";
		$sqlstr = $sqlstr . ' values (' . $userid;
		$sqlstr = $sqlstr . " ,'" . $sqrq . "' ,'" . $sqrq . "' ,'GLD' ," . $sqgoldsl . " ,'" . $cnote . "'";
		$sqlstr = $sqlstr . ",2,'系统自动','捐赠金币' ," . $sqgoldsl . " ," . $sqgoldsl . " ,1,now())";
		//  return $sqlstr;
	} else {
		$sqlstr = "insert into userdonation ( userid,sqrq,currency,sqje,donationnote,date) values (" . $userid;
		$sqlstr = $sqlstr . " ,'" . $sqrq . "' ,'" . $currency . "' ," . $sqje . " ,'" . $cnote . "',now())";
	}
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
}

// sql ="delete from  extractgold  where state<2 and id="+id.ToString();

function extractgoldadd() {
	$userid = $_POST['locuserid'];
	$userid1 = $_POST['userid1'];
	if ($userid1 == null) {
		$userid1 = 0;
	}
	$sqrq = $_POST['sqrq'];
	$currency = $_POST['currency'];
	$cnote = $_POST['extractgoldnote'];

	$sqgoldsl = $_POST["sqgoldsl"];
	$goldsl = $sqgoldsl;
	if ($userid1 > 0) {
		$query1 = mysql_query("select userid from bjluser where userid=" . $userid1);
		if (mysql_num_rows($query1) == 0) {
			$arr['success'] = true;
			$arr['data'] = "转入用户不存在，数据保存失败！";
			return json_encode($arr);
		}
		$sqlstr = "insert into extractgold ( userid,sqrq,shrq,sqje,sqgoldsl,goldsl,note,state,wl,currency,je,renote,shr,userid1,date)";
		$sqlstr = $sqlstr . "  values (" . $userid;
		$sqlstr = $sqlstr . " ,'" . $sqrq . "' ,'" . $sqrq . "' ," . $sqgoldsl . " ," . $sqgoldsl . " ,ceil(1.05*" . $goldsl . ") ,'" . $cnote . "'";
		$sqlstr = $sqlstr . " ,4,1,'GLD', " . $sqgoldsl . " ,'转赠金币','系统'," . $userid1 . ",now())";
	} else {
		$sqje = $_POST["je"];
		$sqlstr = "insert into extractgold ( userid,sqrq,sqje,sqgoldsl,goldsl,note,currency,date) values (" . $userid;
		$sqlstr = $sqlstr . " ,'" . $sqrq . "' ," . $sqje . " ," . $sqgoldsl . " ,ceil(1.05*" . $goldsl . ") ,'" . $cnote . "','" . $currency . "',now())";
	}
	//  return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
}

function currencyedit($bz) {
	//$id=$_GET['id'];

	$stop = '0';
	if ($_POST['stop'] == 'on') {
		$stop = '1';
	}
	$dispbz = '0';
	if ($_POST['dispbz'] == 'on') {
		$dispbz = '1';
	}

	switch($bz) {
		case 1 :
			$id = $_GET['id'];
			$sqlstr = "delete from  currency  where currency='" . $_GET['id'] . "'";
			$query = mysql_query($sqlstr);

			return returnText($query);
			break;
		case 3 :
			$sqlstr = " insert into   currency (currency,name,wl,xh,gold,dispbz) values ('" . $_POST['currency'] . "'";
			$sqlstr = $sqlstr . " ,'" . $_POST['name'] . "' ," . $_POST['wl'] . " ," . $_POST['xh'] . " ,0,1)";

			break;
		default :
			$id = $_POST['id'];
			$sqlstr = " update  currency  set currency='" . $_POST['currency'] . "'";
			$sqlstr = $sqlstr . " ,name='" . $_POST['name'] . "' ,wl=" . $_POST['wl'] . " ,xh=" . $_POST['xh'] . " ,stop=" . $stop . ",dispbz=" . $dispbz . " where currency='" . $_POST['id'] . "'";
			break;
	}

	//   return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
	//return returnText($query);
}

function extractgoldedit() {
	$id = $_GET['id'];
	if ($id == null) {
		return '删除此申请单失败！';
	}
	$sqlstr = "delete from  extractgold  where state<2 and id=" . $id;

	$query = mysql_query($sqlstr);
	return returnText($query);
}

function donationedit() {
	$id = $_GET['id'];
	if ($id == null) {
		return '删除此申请单失败！';
	}
	$sqlstr = "delete from  userdonation  where state<2 and id=" . $id;
	//    return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);
}

function donationsh() {
	$sqlstr = "update userdonation  set  state=2 ";
	$sqlstr = $sqlstr . " ,shrq='" . $_POST['shrq'] . "' ,renote='" . $_POST['renote'] . "' ,donation=" . $_POST['donation'];
	$sqlstr = $sqlstr . " ,lastdonation=" . $_POST['lastdonation'] . " ,wl=" . $_POST['wl'] . " , shr='" . $_POST['shr'] . "'";
	$sqlstr = $sqlstr . " where id=" . $_POST['donationid'];
	//  return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
}

function bjluserzzbz() {
	$id = $_GET['locuserid'];
	$sqlstr = "update bjluser  set  main=" . $_GET['bz'];
	$sqlstr = $sqlstr . " where userid=" . $id;
	$query = mysql_query($sqlstr);
	return returnText($query);
	//  return returnjsonokdata($query);
}

function extractgoldsh() {

	$id = $_POST["id"];
	if ($id == 0) {
		$arr['success'] = false;
		$arr['data'] = '数据保存失败！';
		return json_encode($arr);

	}
	$sqlstr = "update  extractgold  set state=2";
	$sqlstr = $sqlstr . " ,shrq='" . $_POST['shrq'] . "',wl=" . $_POST['wl'] . ",je=" . $_POST["extractje"] . ",renote='" . $_POST["extractgoldrenote"] . "',shr='" . $_POST["shr"] . "'";
	$sqlstr = $sqlstr . "  where id=" . $id;

	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
}

function extractgoldpay() {

	$id = $_POST["id"];
	if ($id == 0) {
		$arr['success'] = false;
		$arr['data'] = '数据保存失败！';
		return json_encode($arr);

	}
	$sqlstr = "update  extractgold  set state=4";
	$sqlstr = $sqlstr . " ,jfrq='" . $_POST['jfrq'] . "',jfr='" . $_POST["jfr"] . "'";
	$sqlstr = $sqlstr . "  where id=" . $id;

	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnjsonokdata($query);
}

function menulistset() {
	$bz = $_GET["bz"];
	$id = $_GET["locuserid"];

	if ($bz == 2) {
		$sqlstr = "select menu_id0,menu_id,menu_name from sys_menu where menu_id0=0 and zzbz=0   order by menu_id0,menu_xh";
	} else {
		//sql="select menu_id0,menu_id,menu_name from sys_menu where menu_id0>0 and rtrim(menu_name)<>'-' order by menu_id0,menu_xh";
		$sqlstr = "select menu_id0,menu_id,menu_name,case when  INSTR(sysmenu,
      CONCAT('|' , menu_id , '|')
      
    ) > 0     then 'true' else 'false' end as menu_checked from sys_menu ,bjluser";
		$sqlstr = $sqlstr . " where  rtrim(menu_name)<>'-' and  menu_id0>0 and sys_menu.zzbz=0  and bjluser.userid=" . $id . " order by menu_id0,menu_xh";
	}
	//$sqlstr = "update  bjluser  set sysmenu='" .$_GET['idstr']. "' where userid=" .$id;
	// return $sqlstr;
	$query = mysql_query($sqlstr);

	return getstoredata($query, 0);
}

function sysmenuchange() {

	$id = $_GET["locuserid"];
	$sqlstr = "update  bjluser  set sysmenu='" . $_GET['idstr'] . "' where userid=" . $id;
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);
	//return returnjsonokdata($query);
}

function extractgoldsl() {
	$locuserid = $_GET["locuserid"];
	$filter = " select a.userid ,a.userje,a.yhzh,a.yhmc,a.yhzhxm,a.currency,b.sqgoldsl,c.wl,c.name,a.lastloginmac ";
	$filter = $filter . " from bjluser a ,(select sum(sqgoldsl) as sqgoldsl from extractgold where state<2 and userid =" . $locuserid;
	$filter = $filter . " ) b,currency c  where a.userid=" . $locuserid;
	$filter = $filter . "  and c.currency=a.currency and a.userid=" . $locuserid;
	//    return $filter ;
	$query = mysql_query($filter);
	return getstoredata($query, 0);

}

function donationlist() {

	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$shbz = $_GET['shbz'];
	if ($shbz == '1') {
		$filter = "  state<2 ";

	} else {
		$rq1 = $_GET['rq1'];
		$rq2 = $_GET['rq2'];
		$locuserid = $_GET['locuserid'];
		$filter = "  a.userid=" . $locuserid;
		if ($rq1 != "" && $rq2 != "") {
			$filter = "(" . $filter . ")  and  sqrq  BETWEEN '" . $rq1 . "' AND '" . $rq2 . "' ";
		}

	}

	$sqlstr = " select  a.id,a.userid,sqrq,a.sqje,a.state,a.donationnote,a.renote,b.name,c.username,a.wl,b.wl as wl0,a.shr,a.shrq,a.donation,a.lastdonation ";
	$sqlstr = $sqlstr . " from  userdonation  a INNER JOIN currency b  ON a.currency=b.currency INNER JOIN bjluser c on a.userid=c.userid   ";
	$sqlstr = $sqlstr . " where  " . $filter;
	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数
	$sqlstr = $sqlstr . " limit " . $start . "," . $limit;
	//   return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstoredata($query, $total);

}

function extractgoldlist() {

	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$shbz = $_GET['shbz'];
	if ($shbz == '1') {
		$filter = "  state<2 ";

	} else {
		$rq1 = $_GET['rq1'];
		$rq2 = $_GET['rq2'];
		$locuserid = $_GET['locuserid'];
		$filter = "  a.userid=" . $locuserid;
		if ($rq1 != "" && $rq2 != "") {
			$filter = "(" . $filter . ")  and  sqrq  BETWEEN '" . $rq1 . "' AND '" . $rq2 . "' ";
		}

	}

	$sqlstr = " select  a.*,b.name,c.username,c.yhzh,c.yhzhxm,c.yhmc ,b.wl as wl0  ";
	$sqlstr = $sqlstr . " from  extractgold a INNER JOIN bjluser c on a.userid=c.userid  INNER JOIN  currency b  ON a.currency=b.currency   ";
	$sqlstr = $sqlstr . " where  " . $filter;
	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数

	$sqlstr = $sqlstr . " limit " . $start . "," . $limit;
	//   return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstoredata($query, $total);

}

function extractgoldlist0() {

	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$shbz = $_GET['shbz'];

	if ($shbz == 1) {
		$filter = "a.state=2";
	} else {

		$filter = "a.state=" . $shbz;
		$rq1 = $_GET['rq1'];
		$rq2 = $_GET['rq2'];
		if ($rq1 != "" && $rq2 != "") {
			$filter = "(" . $filter . ")  and  sqrq  BETWEEN '" . $rq1 . "' AND '" . $rq2 . "' ";
		}

		$locuserid = $_GET['locuserid'];
		if ($locuserid > 0) {
			$filter = $filter . " and  a.userid=" . $locuserid;
		}
	}

	$sqlstr = " select  a.*,b.name,c.username,c.yhzh,c.yhzhxm,c.yhmc ,b.wl as wl0  ";
	$sqlstr = $sqlstr . " from  extractgold a INNER JOIN bjluser c on a.userid=c.userid  INNER JOIN  currency b  ON a.currency=b.currency   ";
	$sqlstr = $sqlstr . " where  " . $filter;
	//  return $sqlstr;
	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数

	$sqlstr = $sqlstr . " limit " . $start . "," . $limit;

	$query = mysql_query($sqlstr);
	return getstoredata($query, $total);

}

function userzlwflist() {
	$locuserid = $_GET['locuserid'];
	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$level = $_GET['level'];
	if ($level == '') {
		$level = 0;
	}

	if ($locuserid > 0) {
		$filter = " a.userid=" . $locuserid;
	} else {
		if ($level < 999) {
			$filter = " a.viplevel=" . $level;
		} else {
			$filter = " a.viplevel>0";
		}
	}

	$sqlstr = " select a.*,c.vipname,b.name ";
	$sqlstr = $sqlstr . " from  bjluser  a  LEFT OUTER JOIN currency b  ON a.currency=b.currency INNER JOIN  vipclass c on a.viplevel=c.viplevel    ";
	$sqlstr = $sqlstr . " where  " . $filter;
	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数

	$sqlstr = $sqlstr . " limit " . $start . "," . $limit;
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstoredata($query, $total);

}

function userlogin() {
	$sqlstr = "CALL _login(" . $_GET['aid'] . "," . $_GET['bid'] . "," . $_GET['cid'] . "," . $_GET['iid'] . ")";
	return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstoredata($query);

}

function getallzg($userid) {
	$jsid = $_GET['jsid'];
	$tel = $_GET['Tel'];
	$bz = $_GET['bz'];
	$zgid = $_GET['zgid'];
	IF ($zgid == '') {
		$zgid = '0';
	}
	IF ($bz == '') {
		$bz = '0';
	}
	IF ($tel == '') {
		$tel = '0';
	}
	$sqlstr = "CALL _getallzg(" . $userid . "," . $jsid . "," . $zgid . "," . $tel . "," . $bz . ")";
	// return $sqlstr;
	$query = mysql_query($sqlstr);

	//$total = mysql_num_rows($result);//总记录数
	// $sqlstr=$sqlstr."   limit ".$start.",".$limit;
	// $query = mysql_query($sqlstr);
	// return $sqlstr;
	return getstoredata($query, 0);
}

function getcurzg($userid) {
	$jsid = $_GET['jsid'];
	$tel = $_GET['Tel'];
	$bz = $_GET['bz'];
	$zgid = $_GET['zgid'];
	IF ($zgid == '') {
		$zgid = '0';
	}

	IF ($bz == '') {
		$bz = '0';
	}
	IF ($tel == '') {
		$tel = '0';
	}
	$sqlstr = "CALL _getcurzg(" . $userid . "," . $jsid . "," . $zgid . "," . $tel . ")";
	//  return $sqlstr;
	$query = mysql_query($sqlstr);
	if (@bz == 0) {
		return getstoredata($query, 0);
	} else {
		return getstringdata($query, 0);
	}

}

function getcurjs($userid) {
	$jsid = $_GET['id'];
	$tel = $_GET['tel'];
	$sqlstr = "CALL _getcurjsid(" . $userid . "," . $jsid . "," . $tel . ")";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);
}

function userjetreelist() {
	$locid = $_GET['locuserid'];
	$str = "SELECT   a.parentid,  a.userid,0 AS sl,   childen,  a.username,   userje,  userjf,   donation, introducerid,  a.viplevel,  c.vipname   FROM   bjluser a,  vipclass c ";

	$str1 = $str . " WHERE (a.parentid =" . $locid . " OR a.userid =" . $locid . " )   AND a.viplevel = c.viplevel   ORDER BY a.parentid,   a.userid ";

	$str2 = $str . " WHERE  a.parentid IN    (SELECT  userid   FROM   bjluser  WHERE parentid =" . $locid . ")    AND a.viplevel = c.viplevel   ORDER BY a.parentid,   a.userid ";
	$str3 = $str . " WHERE  a.parentid IN   (SELECT        userid       FROM        bjluser       WHERE parentid IN         (SELECT           userid         FROM
          bjluser    WHERE parentid =" . $locid . "))    AND a.viplevel = c.viplevel   ORDER BY a.parentid,   a.userid ";
	$str4 = $str . " WHERE  a.parentid IN (SELECT userid FROM        bjluser      WHERE parentid IN        (SELECT          userid        FROM
          bjluser WHERE parentid IN   (SELECT userid FROM    bjluser   WHERE parentid =" . $locid . ")))    AND a.viplevel = c.viplevel   ORDER BY a.parentid,   a.userid ";

	$query = mysql_query($str1);
	$query2 = mysql_query($str2);
	$query3 = mysql_query($str3);
	$query4 = mysql_query($str4);

	if ($query) {

		$arr = array();
		$arr1 = array();
		$arr2 = array();
		$arr3 = array();
		$arr4 = array();
		$arr['text'] = '.';
		while ($row = mysql_fetch_array($query)) {
			if ($row['userid'] == $locid) {
				$my_array = array();
				for ($i = 0; $i < mysql_num_fields($query); $i++) {
					$newvar = $row[mysql_field_name($query, $i)];
					$my_array[mysql_field_name($query, $i)] = $newvar . '';
				};
				if ($row['childen'] == 0) {
					$my_array['leaf'] = true;
				} else {
					$my_array['leaf'] = false;
					$p1 = $row['userid'];

					//***********************************************************第一级
					$arr2 = array();
					while ($row1 = mysql_fetch_array($query)) {
						if ($row1['parentid'] == $p1) {
							$my_array1 = array();
							for ($i1 = 0; $i1 < mysql_num_fields($query); $i1++) {
								$newvar1 = $row1[mysql_field_name($query, $i1)];
								$my_array1[mysql_field_name($query, $i1)] = $newvar1 . '';
							};
							if ($row1['childen'] == 0) {
								$my_array1['leaf'] = true;
							} else {
								$my_array1['leaf'] = false;
								$p2 = $row1['userid'];
								//***********************************************************第二级

								mysql_data_seek($query2, 0);
								$arr3 = array();
								while ($row2 = mysql_fetch_array($query2)) {
									if ($row2['parentid'] == $p2) {
										$my_array2 = array();
										for ($i2 = 0; $i2 < mysql_num_fields($query2); $i2++) {
											$newvar2 = $row2[mysql_field_name($query2, $i2)];
											$my_array2[mysql_field_name($query2, $i2)] = $newvar2 . '';
										};
										if ($row2['childen'] == 0) {
											$my_array2['leaf'] = true;
										} else {
											$my_array2['leaf'] = false;
											$p3 = $row2['userid'];
											//***********************************************************第3级

											mysql_data_seek($query3, 0);
											$arr4 = array();
											while ($row3 = mysql_fetch_array($query3)) {
												if ($row3['parentid'] == $p3) {
													$my_array3 = array();
													for ($i3 = 0; $i3 < mysql_num_fields($query3); $i3++) {
														$newvar3 = $row3[mysql_field_name($query3, $i3)];
														$my_array3[mysql_field_name($query3, $i3)] = $newvar3 . '';
													};
													if ($row3['childen'] == 0) {
														$my_array3['leaf'] = true;
													} else {
														$my_array3['leaf'] = false;
														$p4 = $row3['userid'];
														//***********************************************************第4级

														mysql_data_seek($query4, 0);
														$arr5 = array();
														while ($row4 = mysql_fetch_array($query4)) {
															if ($row4['parentid'] == $p4) {
																$my_array4 = array();
																for ($i4 = 0; $i4 < mysql_num_fields($query4); $i4++) {
																	$newvar4 = $row4[mysql_field_name($query4, $i4)];
																	$my_array4[mysql_field_name($query4, $i4)] = $newvar4 . '';
																};

																$my_array4['leaf'] = true;

																$arr5[] = $my_array4;
															}
														}
														$my_array3['children'] = $arr5;

														//************************************************************

													};
													$arr4[] = $my_array3;
												}
											}
											$my_array2['children'] = $arr4;

											//************************************************************

										};
										$arr3[] = $my_array2;
									}
								}
								$my_array1['children'] = $arr3;

								//************************************************************
							};
							$arr2[] = $my_array1;
						}
					}
					$my_array['children'] = $arr2;

					//************************************************************

				};
				$arr1[] = $my_array;
			}
		}
		$arr['children'] = $arr1;

		return json_encode($arr);
	}
}

function getnextpkcode($userid) {

	$sqlstr = "CALL _getnextpkcode(" . $userid . ")";

	$query = mysql_query($sqlstr);

	return getstoredata($query, 0);
}

function deletejs($userid) {
	$jsid = $_GET['id'];
	$tel = $_GET['telbz'];
	$sqlstr = "CALL _deletejs(" . $userid . "," . $jsid . "," . $tel . ")";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);
}

function deletelastzg($userid) {
	$jsid = $_GET['id'];
	$sqlstr = "CALL _deletelastzg(" . $userid . "," . $jsid . ")";
	$query = mysql_query($sqlstr);
	return getstringdata($query);

}

function bjlzgloclist() {

	$limit = $_GET['limit'];
	$start = $_GET['start'];
	$jsid = $_GET['jsid'];

	$sqlstr = " select id,ztok,_p1,_p2,_p3,_b1,_b2,_b3,sj,jsid,winje,pds,bds,zg,pd,bd,playerje,bankerje,ppje,bpje,tieje,playerje+bankerje+ppje+bpje+tieje as sumje ";
	$sqlstr = $sqlstr . " from bjlzg  where jsid= " . $jsid;
	$sqlstr = $sqlstr . " limit " . $start . "," . $limit;
	//   return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);

}

function bjlnewjs($userid) {
	$minje = $_GET['minje'];
	$maxje = $_GET['maxje'];
	$telbz = $_GET['telbz'];
	$cps = $_GET['cps'];
	//_creatnewjs(2,1000,100000,0,0);
	$sqlstr = "CALL _creatnewjs(" . $userid . "," . $minje . "," . $maxje . "," . $cps . "," . $telbz . ")";

	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);

}

function savebjlzg($userid) {
	$zgid = $_GET['id'];
	$hkzt = $_GET['hkzt'];
	$sqlstr = "CALL _savecurzg(" . $userid . "," . $zgid . "," . $hkzt . ")";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);

}

function savebjltelzg($userid) {
	$zgid = $_GET['id'];
	$zg = $_GET['zg'];
	$pd = $_GET['pd'];
	$bd = $_GET['bd'];
	$sqlstr = "CALL _savetelzg(" . $userid . "," . $zgid . "," . $zg . "," . $pd . "," . $bd . ")";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);

}

function savetj($userid) {
	$tel = $_GET['telbz'];
	IF ($tel == NULL) {
		$tel = 0;

	};
	IF ($tel == '') {
		$tel = '0';
	}
	$sqlstr = "CALL _savetj(" . $userid . "," . $_GET['jsid'] . "," . $_GET['playerje'] . "," . $_GET['bankerje'] . "," . $_GET['ppje'] . "," . $_GET['bpje'] . "," . $_GET['tieje'] . "," . $tel . ")";
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return getstringdata($query);

}

//****************************************************************************************//
function testproc() {
	$query = mysql_query("CALL aaaaa");
	//or die("Query failed:" .mysql_error());
	//return gettreedata($query);
	//   return    returnjsondata($query);

	return getstoredata($query, 0);

}

//tkuserclassdel
function tkclassedit() {
	$id = $_POST['id'];
	$pid = $_POST['pid'];
	//return "pid=".$pid;
	$userid = $_POST['userid'];
	$ctext = $_POST['classname'];
	$xh = $_POST['xh'];
	$sqlstr = "CALL tkclasssave(" . $userid . "," . $pid . "," . $id . "," . $xh . ",'" . $ctext . "')";
	$query = mysql_query($sqlstr);
	//   return  $sqlstr;
	return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkspselsave() {
	$idstr = $_GET['idstr'];
	$classid = $_GET['classid'];

	$sqlstr = "CALL tkuserspsel('" . $idstr . "'," . $classid . ")";

	$query = mysql_query($sqlstr);
	return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkuserclassdel() {
	$id = $_GET['classid'];
	$sqlstr = "CALL tkuserclassdel(" . $id . ")";
	//  return $sqlstr;
	$query = mysql_query($sqlstr);
	return getjsondata($query);

	//$sqlstr="delete from tlb_userproductclass where userclassid=".$id;
	//$query = mysql_query($sqlstr ) ;
	//return returnText($query);

	//return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkuserclassswap() {
	$id = $_GET['classid'];
	$pid = $_GET['pid'];
	if ($pid == null) {
		$pid = 0;
	}
	if ($pid == '') {
		$pid = 0;
	}
	$sqlstr = "update tlb_userproductclass  set parentid=" . $pid . " where userclassid=" . $id;
	//return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);

	//return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkusergridtotree() {
	$id = $_GET['classid'];
	$idstr = $_GET['idstr'];

	$sqlstr = "update tlb_userproduct  set userclassid=" . $id . " where FIND_IN_SET(userproductid,'" . $idstr . "')";
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);

	//return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkusergridupdate() {
	$id = $_GET['id'];
	$hot = $_GET['hot'];
	$link = $_GET['link'];
	$sqlstr = "update tlb_userproduct  set hot=" . $hot . ",link=" . $link . "       where userproductid=" . $id;
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);

	//return getjsondata($query);
	//     return    returnjsondata($query);

	//    return getstoredata($query,0);
}

function tkpriceupdate() {
	$id = $_GET['id'];
	$price = $_GET['price'];
	$sqlstr = "update tlb_product  set price=" . $price . "       where productid=" . $id;
	// return $sqlstr;
	$query = mysql_query($sqlstr);
	return returnText($query);
}

function tkusergridremove() {
	$id = $_GET['id'];
	$sqlstr = "delete from tlb_userproduct   where userproductid=" . $id;
	$query = mysql_query($sqlstr);
	return returnText($query);
}

function userzllist() {

	$userid = $_GET['locuserid'];
	//   $code = $_GET['usercode'];
	//  $xm = $_GET['username'];
	//  $level = $_GET['level'];
	$sqlstr = " SELECT a.*,b.vipname  FROM vipclass  b,bjluser a WHERE  a.viplevel=b.viplevel ";
	$sqlstr = $sqlstr . " and a.userid=" . $userid;

	$query = mysql_query($sqlstr);

	return getstoredata($query, 0);
}

function currencylist() {
	$sqlstr = " SELECT * FROM currency WHERE  stop=0  order by xh";
	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);
}

function vipclasslist() {
	$sqlstr = " SELECT * FROM vipclass  order by viplevel";
	$query = mysql_query($sqlstr);
	return getstoredata($query, 0);
}

function tlbleveltree() {
	$sqlstr = " SELECT viplevel as id,vipname as text,0 as pid,1 as leaf  FROM tlb_viplevel order by viplevel  ";
	$query = mysql_query($sqlstr);

	return gettreedata($query);
}

function treelist() {
	$sqlstr = " SELECT T_name as text,T_id as id, 1 as leaf  FROM Type order by T_code ";
	$query = mysql_query($sqlstr);

	return gettreedata($query);
}

function tkspclasstree() {
	$sqlstr = " SELECT classid as id,classname as text,0 as pid,1 as leaf  FROM tlb_productclass order by classid  ";
	$query = mysql_query($sqlstr);
	return gettreedata($query);
}

function tkuserspclasstree() {
	$userid = $_GET['userid'];
	$level = $_GET['level'];
	$node = $_GET['node'];

	$sqlstr = " SELECT userclassid as id,classname as text,parentid as pid,xh  FROM tlb_userproductclass a where a.userid=" . $userid;

	//$sqlstr="SELECT  a.userclassid AS id,  a.classname AS text,  a.parentid AS pid,a.xh,  CASE    WHEN b.parentid IS NULL     THEN TRUE     ELSE FALSE   END AS leaf ";
	//$sqlstr= $sqlstr." FROM  tlb_userproductclass a   LEFT OUTER JOIN tlb_userproductclass b     ON a.userclassid = b.parentid where a.userid=".$userid  ;

	if ($node == 0) {
		$sqlstr = $sqlstr . " and a.parentid=0";
	} else {

		$sqlstr = $sqlstr . " and a.parentid=" . $node;
	}

	// $sqlstr= $sqlstr." GROUP BY pid,xh,id";
	$sqlstr = $sqlstr . " order by pid,xh,id ";

	//  return $sqlstr;

	$query = mysql_query($sqlstr);
	//if ($node==0) {
	return gettreedata($query);
	//}

	// return 'aaaaaaaaaaaa';
	return 'node=' . $node -> text;

}

function tkspzllist() {

	$shop = $_GET['shopname'];
	$xm = $_GET['productname'];
	$level = $_GET['level'];

	$price1 = $_GET['price1'];
	$percent1 = $_GET['percent1'];
	$price2 = $_GET['price2'];
	$percent2 = $_GET['percent2'];

	$sqlstr = " SELECT a.*,b.classname  FROM tlb_productclass  b,tlb_product a WHERE  a.classid=b.classid ";

	if ($level > 0 and $level != 999) {
		$sqlstr = $sqlstr . " and a.classid=" . $level;
	}

	if ($xm > '') {
		$sqlstr = $sqlstr . " and a.productname like '%" . $xm . "%'";
	}
	if ($shop > '') {
		$sqlstr = $sqlstr . " and a.shopname like '%" . $shop . "%'";
	}

	if ($price1 > 0) {
		$sqlstr = $sqlstr . " and a.price>=" . $price1;
	}
	if ($price2 > 0) {
		$sqlstr = $sqlstr . " and a.price<=" . $price2;
	}
	if ($percent1 > 0) {
		$sqlstr = $sqlstr . " and a.percentage>=" . $percent1;
	}

	if ($percent2 > 0) {
		$sqlstr = $sqlstr . " and a.percentage<=" . $percent2;
	}

	$start = $_GET['start'];
	$limit = $_GET['limit'];

	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数
	$sqlstr = $sqlstr . "   limit " . $start . "," . $limit;
	$query = mysql_query($sqlstr);
	// return $sqlstr;
	return getstoredata($query, $total);
}

function tkspsellist() {

	$shop = $_GET['shopname'];
	$xm = $_GET['productname'];
	$level = $_GET['level'];

	$price1 = $_GET['price1'];
	$percent1 = $_GET['percent1'];
	$price2 = $_GET['price2'];
	$percent2 = $_GET['percent2'];

	$userid = $_GET['userid'];

	$sqlstr = " SELECT a.productid,a.price,a.percentage,a.spid,a.classid,a.shopname,a.creditimg,b.classname,a.productname  FROM tlb_productclass  b,tlb_product a WHERE  a.classid=b.classid ";
	$sqlstr = $sqlstr . " and productid not in ( select productid from tlb_userproduct where userid=" . $userid . ")";
	if ($level > 0 and $level != 999) {
		$sqlstr = $sqlstr . " and a.classid=" . $level;
	}

	if ($xm > '') {
		$sqlstr = $sqlstr . " and a.productname like '%" . $xm . "%'";
	}
	if ($shop > '') {
		$sqlstr = $sqlstr . " and a.shopname like '%" . $shop . "%'";
	}

	if ($price1 > 0) {
		$sqlstr = $sqlstr . " and a.price>=" . $price1;
	}
	if ($price2 > 0) {
		$sqlstr = $sqlstr . " and a.price<=" . $price2;
	}
	if ($percent1 > 0) {
		$sqlstr = $sqlstr . " and a.percentage>=" . $percent1;
	}

	if ($percent2 > 0) {
		$sqlstr = $sqlstr . " and a.percentage<=" . $percent2;
	}

	$start = $_GET['start'];
	$limit = $_GET['limit'];

	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数
	$sqlstr = $sqlstr . "   limit " . $start . "," . $limit;
	$query = mysql_query($sqlstr);
	// return $sqlstr;
	return getstoredata($query, $total);
}

function tkuserspzllist() {
	$userid = $_GET['userid'];
	$shop = $_GET['shopname'];
	$xm = $_GET['productname'];
	$level = $_GET['level'];

	$price1 = $_GET['price1'];
	$percent1 = $_GET['percent1'];
	$price2 = $_GET['price2'];
	$percent2 = $_GET['percent2'];

	$sqlstr = " SELECT a.productname,a.userproductid,c.*,b.classname,a.link,a.hot,a.disable   FROM tlb_userproductclass  b,tlb_product c,tlb_userproduct a ";
	$sqlstr = $sqlstr . "  WHERE    c.disable=0  and  a.userclassid=b.userclassid and c.productid=a.productid and b.userid=" . $userid;

	if ($level > 0 and $level != 999) {
		$sqlstr = $sqlstr . " and a.userclassid=" . $level;
	}

	if ($xm > '') {
		$sqlstr = $sqlstr . " and c.productname like '%" . $xm . "%'";
	}
	if ($shop > '') {
		$sqlstr = $sqlstr . " and c.shopname like '%" . $shop . "%'";
	}

	if ($price1 > 0) {
		$sqlstr = $sqlstr . " and c.price>=" . $price1;
	}
	if ($price2 > 0) {
		$sqlstr = $sqlstr . " and c.price<=" . $price2;
	}
	if ($percent1 > 0) {
		$sqlstr = $sqlstr . " and c.percentage>=" . $percent1;
	}

	if ($percent2 > 0) {
		$sqlstr = $sqlstr . " and c.percentage<=" . $percent2;
	}

	$start = $_GET['start'];
	$limit = $_GET['limit'];

	$result = mysql_query($sqlstr);
	$total = mysql_num_rows($result);
	//总记录数
	$sqlstr = $sqlstr . "   limit " . $start . "," . $limit;
	$query = mysql_query($sqlstr);
	// return $sqlstr;
	return getstoredata($query, $total);
}

function vipclasstree() {
	$sqlstr = " SELECT viplevel as id,vipname as text,0 as pid,1 as leaf  FROM vipclass order by viplevel  ";
	$query = mysql_query($sqlstr);
	return gettreedata($query);
}

/*************************************************************************************************/

function getstringdata($query) {//返回json格式的数据
	$retstr = '';
	if ($query) {
		while ($row = mysql_fetch_array($query)) {
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$retstr = $retstr . $row[mysql_field_name($query, $i)] . ',';
			};
		}
	} else {
		$retstr = '1,数据查询操作失败！';
	}
	return $retstr;
}

function getjsondata($query) {//返回json格式的数据

	if ($query) {
		$my_array = array();
		while ($row = mysql_fetch_array($query)) {
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$my_array[mysql_field_name($query, $i)] = $row[mysql_field_name($query, $i)];
			};
		}

		$arr['success'] = true;
		//$arr['id'] =0;
		$arr['data'] = $my_array;

	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => '数据查询操作失败！');

	}
	return json_encode($arr);
}

function returnjsondata($query) {//返回json格式的数据

	if ($query) {
		$arr['success'] = true;
		$arr['data'] = array('id' => 0, 'msg' => '数据保存成功！');
	} else {
		$arr['success'] = false;
		$arr['data'] = array('id' => 1, 'msg' => '数据保存失败！');
	}
	return json_encode($arr);

}

function returnjsonokdata($query) {//返回json格式的数据

	if ($query) {
		$arr['success'] = true;
		$arr['data'] = 'ok';
	} else {
		$arr['success'] = false;
		$arr['data'] = '数据保存失败！';
		;
	}
	return json_encode($arr);

}

function returnText($query) {
	if ($query) {
		return 'ok';
	} else {
		return '数据处理失败！';
	}
}

function gettreedata($query) {
	//返回STORE所需的数据
	//mysql_num_fields($query)字段数
	//mysql_field_name($query,0) 字段名称
	//mysql_numrows($query)记录数

	if ($query) {
		$arr = array();
		while ($row = mysql_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysql_num_fields($query); $i++) {
				$newvar = $row[mysql_field_name($query, $i)];
				$my_array[mysql_field_name($query, $i)] = $newvar;
			};
			$arr[] = $my_array;

		}
	}

	return json_encode($arr);
}

function cpjkdmxsave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];  
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$cpjkdmx = $o['cpjkdmx'];
 
	 $my_date =new DateTime( $o['jkrq']);
     $my_year = $my_date ->format("Y");  
     
	$dhsql="select setdh(".$L_id.",".$my_year .",'j') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	
	$cpjkdstr = " insert into cpjkd (jkdh,L_id,khid,khmc,area,sfdh,sfr,cphm,czy,cnote,czrq,jkrq)values('";
	$cpjkdstr .= $dh. "'";
	$cpjkdstr .= "," . $L_id;
	$cpjkdstr .= "," . $o['khid'];
	$cpjkdstr .= ",'" . $o['khmc'] . "'";
	$cpjkdstr .= ",'" . $o['area'] . "'";
	$cpjkdstr .= ",'" . $o['sfdh'] . "'";
	
	$cpjkdstr .= ",'" . $o['sfr'] . "'";
	$cpjkdstr .= ",'" . $o['cphm'] . "'";
	$cpjkdstr .= ",'" . $o['czy'] . "'";
	$cpjkdstr .= ",'" . $o['cnote'] . "'";
	$cpjkdstr .= ",'" . $o['czrq'] . "'";
	$cpjkdstr .= ",'" . $o['jkrq'] . "')";
	
	mysql_query('start transaction');
	
	
	
	mysql_query($cpjkdstr);
	$jkid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($jkid==0)) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//	return '数据保存失败!' . $cpjkdstr;
	}
     
	//return $jkdid; 
	foreach ($cpjkdmx as $row) {

		$cpjkdcw = $row['cpjkdcw'];
		$cpjkdje = $row['cpjkdje'];
		$sumjcsl = 0;
		$sumjczl = 0;
		$sumjcje = 0;
	//	foreach ($cpjkdcw as $cwrow) {
	//		$sumjcsl = $sumjcsl + $cwrow['sl'];
	//		$sumjczl = $sumjczl + $cwrow['zl'];
	//	}
	//	foreach ($cpjkdje as $jerow) {
	//		$sumjcje = $sumjcje + $jerow['je'];
	//	}
	if ($row['zljs']=='on'){
		$zljs='1';
	}else
	{
		$zljs='0';
	}
			
    //$mints=="0";
				
	//if ($row['mints'])
	//{ 
		$mints=$row['mints'];
	//}
	
	
	
		$cpjkdmxstr = " insert into cpjkdmx (cdid,jkid,cpid,bzid,cdmc,cpmc,bzmc,cpgg,mints,rate,jldw,czdj,phdj,zljs)";
		$cpjkdmxstr = $cpjkdmxstr . " values (". $row['cdid'] . "," . $jkid . "," . $row['cpid'] . "," . $row['bzid'];
		$cpjkdmxstr = $cpjkdmxstr . ",'" . $row['cdmc'] . "','" . $row['cpmc'] . "','" . $row['bzmc'] . "','" . $row['cpgg'] . "',".$mints;
		$cpjkdmxstr = $cpjkdmxstr . "," . $row['rate'] . ",'" . $row['jldw'] . "'," . $row['czdj'] . "," . $row['phdj'] . "," .$zljs.")";
		mysql_query($cpjkdmxstr);
		$mxid=mysql_insert_id();
		if ((mysql_errno() > 0)||($mxid==0)) {
			mysql_query('rollback');
			return '{result:"fail",msg:"商品数据保存失败!" }';
			//return '商品数据保存失败!!' . $cpjkdmxstr;
			break;
		}
		 
		foreach ($cpjkdcw as $cwrow) {
			$cpjkdcwstr = " insert into cpjkdcw (cw,cpph,dw,sm,sl,czdj,mxid,zl)";
			$cpjkdcwstr = $cpjkdcwstr . " values ('" .$cwrow['cw'] . "','" . $cwrow['cpph'] . "','" . $cwrow['dw'] . "'";
			$cpjkdcwstr = $cpjkdcwstr . ",'" . $cwrow['sm'] . "'," . $cwrow['sl'] . "," . $cwrow['czdj'].",".$mxid . "," . $cwrow['zl'] . ")";
			mysql_query($cpjkdcwstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"仓位数据保存失败!" }';
			//	return '仓位数据保存失败!!' . $cpjkdcwstr;
				break;
			}
		}
		foreach ($cpjkdje as $jerow) {
			$cpjkdjestr = " insert into cpjkdje (work,byg,gs,cg,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj)";
			$cpjkdjestr .= " values ('" . $jerow['work']. "','" . $jerow['byg']. "','" . $jerow['gs']. "','" . $jerow['cg'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
			$cpjkdjestr .= "," . $jerow['workid'] ;
		    $cpjkdjestr .= "," . $mxid ;
		   $cpjkdjestr .= "," .($jerow['xjbz']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['zljs']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['inbz']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['indj']?'1':'0') ; 
		   $cpjkdjestr .= ")";
		
			mysql_query($cpjkdjestr);
			
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"费用数据保存失败!" }';
				//return '费用数据保存失败!!' . $cpjkdjestr;
				break;
			}
		}	
	}


	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",jkid:'.$jkid.' }';
	}
}

function cpjkdjesave() {
	//return "sdfsfhsdfhsdfkhdskf";
	
	/*$headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
	var_dump($headers);
	return "";
*/
/*	$cookies = explode('; ', $_SERVER['HTTP_COOKIE']);
    $allCookies = [];

    foreach($cookies as $cookie) {
        $keyAndValue = explode('=', $cookie);
        $allCookies[$keyAndValue[0]] = $keyAndValue[1];
    }

    var_dump(urldecode(json_encode($allCookies)));
//urldecode(json_encode(
   return urldecode(json_encode( $allCookies['ext-sys_enterprise_name']));
*/
	
	$jeid='';
	if (isset($_GET['jeid']))
	{
     $jeid=$_GET['jeid'];
	}
	
	$loc='';
	if (isset($_GET['loc']))
	{
     $loc=$_GET['loc'];
	}

    if ($jeid>'' && $loc != 'workersave')
	{
			$cpjkdjedel = " delete from cpjkdje where jeid=".$jeid;
			mysql_query($cpjkdjedel);
			if (mysql_errno() > 0) {
				return '{result:"fail",msg:"费用数据删除失败!"}';
			}else{
				return '{result:"success",msg:"费用数据删除成功!"}';
			}
	  
	}
    


	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$cpjkdje = $o['cpjkdje'];
	if ($loc=='workersave') 
	{
		foreach ($cpjkdje as $jerow) {	
	 		 $cpjkdjedel = "update  cpjkdje set byg='".$jerow['byg']."', gs='".$jerow['gs']."', cg='".$jerow['cg']."'  where jeid=".$jeid;
	  		 mysql_query($cpjkdjedel);
	  		 if (mysql_errno() > 0) {
		  			return '{result:"fail",msg:"作业人员数据保存失败!"}';
	  		 }else{
		  			return '{result:"success",msg:"作业人员数据保存成功!"}';
	  		  }
	    }
	}
	$L_id = $_GET['p_l_id'];  
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$jeid=0;
	mysql_query('start transaction');
		foreach ($cpjkdje as $jerow) {
			$cpjkdjestr = " insert into cpjkdje (work,byg,gs,cg,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj)";
			$cpjkdjestr .= " values ('" . $jerow['work']. "','" . $jerow['byg']. "','" . $jerow['gs']. "','" . $jerow['cg'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
			$cpjkdjestr .= "," . $jerow['workid'] ;
		    $cpjkdjestr .= "," .  $jerow['mxid'] ;
		   $cpjkdjestr .= "," .($jerow['xjbz']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['zljs']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['inbz']?'1':'0') ;
		   $cpjkdjestr .= "," .($jerow['indj']?'1':'0') ; 
		   $cpjkdjestr .= ")";
		
			mysql_query($cpjkdjestr);
			$jeid=mysql_insert_id();
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				//return $cpjkdjestr;
				return '{result:"fail",msg:"费用数据保存失败!" }';
				//return '费用数据保存失败!!' . $cpjkdjestr;
				break;
			}
		}	
	


	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		//return $cpjkdjestr;
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",msg:"费用数据保存成功!",jeid:'.$jeid.' }';
	}
}

function cpckdjesave() {
	$jeid='';
	if (isset($_GET['jeid']))
	{
     $jeid=$_GET['jeid'];
	}
	
	$loc='';
	if (isset($_GET['loc']))
	{
     $loc=$_GET['loc'];
	}
	
	  


    if ($jeid>'' && $loc != 'workersave')
	{
		$cpckdjedel = " delete from cpckdje where jeid=".$jeid;
	
		mysql_query($cpckdjedel);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"费用数据删除失败!'.$cpckdjedel.'"}';
		}else{
			return '{result:"success",msg:"费用数据删除成功!'.$cpckdjedel.'"}';
		}
	  
	}
    


	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$cpckdje = $o['cpckdje'];
	if ($loc=='workersave') 
	{
		foreach ($cpckdje as $jerow) {	
	 		 $cpckdjedel = "update  cpckdje set byg='".$jerow['byg']."', gs='".$jerow['gs']."', cg='".$jerow['cg']."'  where jeid=".$jeid;
	  		 mysql_query($cpckdjedel);
	  		 if (mysql_errno() > 0) {
		  			return '{result:"fail",msg:"作业人员数据保存失败!'.$cpckdjedel.'"}';
	  		 }else{
		  			return '{result:"success",msg:"作业人员数据保存成功!'.$cpckdjedel.'"}';
	  		  }
	    }
	}



	$L_id = $_GET['p_l_id'];  
	$i = 0;
	

	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$jeid=0;
	




	mysql_query('start transaction');
		foreach ($cpckdje as $jerow) {
		$cpckdjestr = " insert into cpckdje (work,byg,gs,cg,dw,sl,dj,je,xjje,workid,ckmxid,xjbz,zljs,inbz,indj)";
		$cpckdjestr .= " values ('" . $jerow['work']. "','" . $jerow['byg']. "','" . $jerow['gs']. "','" . $jerow['cg'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je']. "," . $jerow['xjje'];
		$cpckdjestr .= "," . $jerow['workid'] ;
	    $cpckdjestr .= "," .  $jerow['mxid'] ;
	    $cpckdjestr .= "," .($jerow['xjbz']?'1':'0') ;
	    $cpckdjestr .= "," .($jerow['zljs']?'1':'0') ;
	    $cpckdjestr .= "," .($jerow['inbz']?'1':'0') ;
	    $cpckdjestr .= "," .($jerow['indj']?'1':'0') ; 
	    $cpckdjestr .= ")";
		
			mysql_query($cpckdjestr);
			$jeid=mysql_insert_id();
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				//return $cpckdjestr;
				return '{result:"fail",msg:"费用数据保存失败!" }';
				//return '费用数据保存失败!!' . $cpckdjestr;
				break;
			}
		}	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
	} 
	else 
	{
		return '{result:"success",msg:"费用数据保存成功!",jeid:'.$jeid.' }';
	}
}
function cpghdjesave() {
	$jeid='';
	if (isset($_GET['jeid']))
	{
     $jeid=$_GET['jeid'];
	}
	$loc='';
	if (isset($_GET['loc']))
	{
     $loc=$_GET['loc'];
	}
	
	  


    if ($jeid>'' && $loc != 'workersave')
	{
		$cpghdjedel = " delete from wxcpghdje where jeid=".$jeid;
		mysql_query($cpghdjedel);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"费用数据删除失败!"}';
		}else{
			return '{result:"success",msg:"费用数据删除成功!"}';
		}
	
	  
	}
    


	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$cpghdje = $o['cpghdje'];
	if ($loc=='workersave') 
	{
		foreach ($cpghdje as $jerow) {	
	 		 $cpghdjedel = "update  wxcpghdje set byg='".$jerow['byg']."', gs='".$jerow['gs']."', cg='".$jerow['cg']."'  where jeid=".$jeid;
	  		 mysql_query($cpghdjedel);
	  		 if (mysql_errno() > 0) {
		  			return '{result:"fail",msg:"作业人员数据保存失败!'.$cpghdjedel.'"}';
	  		 }else{
		  			return '{result:"success",msg:"作业人员数据保存成功!'.$cpghdjedel.'"}';
	  		  }
	    }
	}




    
	
    
//	return "delete  cpghdje where jeid=".$jeid;


	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);

	$L_id = $_GET['p_l_id'];  
	$i = 0;
	

	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$jeid=0;
	$cpghdje = $o['cpghdje'];
	mysql_query('start transaction');
		foreach ($cpghdje as $jerow) {
		$cpghdjestr = " insert into wxcpghdje (work,byg,gs,cg,dw,sl,dj,je,xjje,workid,mxid,xjbz,zljs,inbz,indj)";
		$cpghdjestr .= " values ('" . $jerow['work']. "','" . $jerow['byg']. "','" . $jerow['gs']. "','" . $jerow['cg'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je']. "," . $jerow['xjje'];
		$cpghdjestr .= "," . $jerow['workid'] ;
	    $cpghdjestr .= "," .  $jerow['mxid'] ;
	    $cpghdjestr .= "," .($jerow['xjbz']?'1':'0') ;
	    $cpghdjestr .= "," .($jerow['zljs']?'1':'0') ;
	    $cpghdjestr .= "," .($jerow['inbz']?'1':'0') ;
	    $cpghdjestr .= "," .($jerow['indj']?'1':'0') ; 
	    $cpghdjestr .= ")";
		
			mysql_query($cpghdjestr);
			$jeid=mysql_insert_id();
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				//return $cpckdjestr;
				return '{result:"fail",msg:"费用数据保存失败!'.$cpghdjestr.'" }';
				//return '费用数据保存失败!!' . $cpckdjestr;
				break;
			}
		}	
	mysql_query('commit');
	//return "cpghdjestr=".$cpghdjestr;
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!'.$cpghdjestr.'" }';
	} 
	else 
	{
		return '{result:"success",msg:"费用数据保存成功!'.$cpghdjestr.'",jeid:'.$jeid.' }';
	}
}
function cpgfdjesave() {
	$jeid='';
	if (isset($_GET['jeid']))
	{
     $jeid=$_GET['jeid'];
	}

	$loc='';
	if (isset($_GET['loc']))
	{
     $loc=$_GET['loc'];
	}
	
	  


    if ($jeid>'' && $loc != 'workersave')
	{
		$cpgfdjedel = " delete from wxcpgfdje where jeid=".$jeid;
		mysql_query($cpgfdjedel);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"费用数据删除失败!"}';
		}else{
			return '{result:"success",msg:"费用数据删除成功!"}';
		}
	
	  
	}
    


	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$cpgfdje = $o['cpgfdje'];
	if ($loc=='workersave') 
	{
		foreach ($cpgfdje as $jerow) {	
	 		 $cpgfdjedel = "update  wxcpgfdje set byg='".$jerow['byg']."', gs='".$jerow['gs']."', cg='".$jerow['cg']."'  where jeid=".$jeid;
	  		 mysql_query($cpgfdjedel);
	  		 if (mysql_errno() > 0) {
		  			return '{result:"fail",msg:"作业人员数据保存失败!'.$cpgfdjedel.'"}';
	  		 }else{
		  			return '{result:"success",msg:"作业人员数据保存成功!'.$cpgfdjedel.'"}';
	  		  }
	    }
	}





    
 	
	$str = $_GET['data'];

    
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);

	$L_id = $_GET['p_l_id'];  
	$i = 0;
	

	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$jeid=0;
	$cpgfdje = $o['cpgfdje'];
	mysql_query('start transaction');
		foreach ($cpgfdje as $jerow) {
		$cpgfdjestr = " insert into wxcpgfdje (work,byg,gs,cg,dw,sl,dj,je,xjje,workid,mxid,xjbz,zljs,inbz,indj)";
		$cpgfdjestr .= " values ('" . $jerow['work']. "','" . $jerow['byg']. "','" . $jerow['gs']. "','" . $jerow['cg'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je']. "," . $jerow['xjje'];
		$cpgfdjestr .= "," . $jerow['workid'] ;
	    $cpgfdjestr .= "," .  $jerow['mxid'] ;
	    $cpgfdjestr .= "," .($jerow['xjbz']?'1':'0') ;
	    $cpgfdjestr .= "," .($jerow['zljs']?'1':'0') ;
	    $cpgfdjestr .= "," .($jerow['inbz']?'1':'0') ;
	    $cpgfdjestr .= "," .($jerow['indj']?'1':'0') ; 
	    $cpgfdjestr .= ")";
		
			mysql_query($cpgfdjestr);
			$jeid=mysql_insert_id();
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				//return $cpckdjestr;
				return '{result:"fail",msg:"费用数据保存失败!" }';
				//return '费用数据保存失败!!' . $cpckdjestr;
				break;
			}
		}	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
	} 
	else 
	{
		return '{result:"success",msg:"费用数据保存成功!",jeid:'.$jeid.' }';
	}
}
function cpgfdmxsave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];  
    $loc = $_GET['loc'];  
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    //$czy =$_SESSION['LoginUserName'] ;
	$czy =$o['username'] ;
    $s = base64_decode($str);

	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumsl = 0;
	$sumzl = 0;
	$sumje = 0;
	$sumxjje = 0;
    if($loc=='delete')
	{
		$dh =$o['gfdh'];
		$gfid =$_GET['data'];
		$cpgfdstr = " update  cpgfd  set  shr='" . $o['czy'] . "' ";
		$cpgfdstr .= ",shrq=now(),delbz=1  where gfid=".$gfid;
		mysql_query($cpgfdstr);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"数据保存失败!" }';
		//	return '数据删除失败!!!'.$cpgfdstr;
		} 
		else 
		{
			return '{result:"success",dh:"'.$dh.'",gfid:'.$gfid.' }';
		}
	}  
      


	$cpgfdmx = $o['gfdmx'];
     
	$my_date =new DateTime( $o['gfrq']);
    $my_year = $my_date ->format("Y");  


     $gfid=$o['gfid'] ;

    if ($gfid==0)
	{
	$dhsql="select setdh(".$L_id.",".$my_year .",'G') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpgfdstr = " insert into cpgfd (gfdh,L_id,khid,khmc,cphm,area,sfr,czy,cnote,sl,zl,je,xjje,khkd,xjbz,gfrq)values('";
	$cpgfdstr .= $dh. "'";
	$cpgfdstr .= "," . $L_id;
	$cpgfdstr .= "," . $o['khid'];
	$cpgfdstr .= ",'" . $o['khmc'] . "'";
	$cpgfdstr .= ",'" . $o['cphm'] . "'";
	$cpgfdstr .= ",'" . $o['area'] . "'";
	$cpgfdstr .= ",'" . $o['sfr'] . "'";
	$cpgfdstr .= ",'" . $czy . "'";
	$cpgfdstr .= ",'" . $o['cnote'] . "'";
	$cpgfdstr .= "," . $o['sl'] ;
	$cpgfdstr .= "," . $o['zl'] ;
	$cpgfdstr .= "," . $o['je'] ;
	$cpgfdstr .= "," . $o['xjje'] ;
	$cpgfdstr .= "," . $o['xjbz'] ;
	$cpgfdstr .= "," . $o['khkd'] ;
	$cpgfdstr .= ",'" . $o['gfrq'] . "')";
	//return $cpgfdstr;
	mysql_query('start transaction');
	mysql_query($cpgfdstr);
	$gfid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($gfid==0)) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!' . $cpgfdstr;
	}
	foreach ($cpgfdmx as $row) {
		$cpjkdmxstr = " insert into cpgfdmx (xmmc,cdmc,gfid,jldw,sl,zl,dj,je,byg,gs,cg)";
		$cpjkdmxstr = $cpjkdmxstr . " values ('". $row['xmmc'] . "','". $row['cdmc'] . "'," . $gfid . ",'" . $row['jldw'] . "'," . $row['sl'];
		$cpjkdmxstr = $cpjkdmxstr . "," . $row['zl'] . "," . $row['dj'] . "," . $row['je']; 
		$cpjkdmxstr = $cpjkdmxstr . ",'" . $row['byg'] . "','" . $row['gs'] . "','" . $row['cg'] . "')";
		mysql_query($cpjkdmxstr);
		$mxid=mysql_insert_id();
		if ((mysql_errno() > 0)||($mxid==0)) {
			mysql_query('rollback');
			return '{result:"fail",msg:"明细数据保存失败!" }';
		//	return '明细数据保存失败!!' . $cpjkdmxstr;
			break;
		}
	}
	}
	else
	{

	$dh =$o['gfdh'];
	$cpgfdstr = " update  cpgfd  set  ";
	$cpgfdstr .= "khid=" . $o['khid'];
	$cpgfdstr .= ",khmc='" . $o['khmc'] . "'";
	$cpgfdstr .= ",cphm='" . $o['cphm'] . "'";
	$cpgfdstr .= ",sfr='" . $o['sfr'] . "'";
	$cpgfdstr .= ",shr='" . $o['czy'] . "'";
	$cpgfdstr .= ",area='" . $o['area'] . "'";
	$cpgfdstr .= ",shrq=now(),ztbz=1";
	$cpgfdstr .= ",cnote='" . $o['cnote'] . "'";
    $cpgfdstr .= ",sl=" . $o['sl'] ;
	$cpgfdstr .= ",zl=" . $o['zl'] ;
	$cpgfdstr .= ",je=" . $o['je'] ;
	$cpgfdstr .= ",xjje=" . $o['xjje'] ;
	$cpgfdstr .= ",xjbz=" . $o['xjbz'] ;
	$cpgfdstr .= ",gfrq='" . $o['gfrq'] . "' where gfid=".$gfid;
	//return $cpgfdstr;
	mysql_query('start transaction');
		mysql_query($cpgfdstr);
		if (mysql_errno() > 0  ) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!" }';
		//	return '数据保存失败!' . $cpgfdstr;
		}
		foreach ($cpgfdmx as $row) {
			$cpjkdmxstr = " update cpgfdmx set  xmmc='". $row['xmmc']  . "',cdmc='" . $row['cdmc'] . "',jldw='" . $row['jldw'] . "',sl=" . $row['sl'];
			$cpjkdmxstr .= ",zl=" . $row['zl'] . ",dj=" . $row['dj'] . ",je=" . $row['je']; 
		    $cpjkdmxstr .= ",byg='" . $row['byg'] . "',gs='" . $row['gs'] . "',cg='" . $row['cg'] . "' where mxid=".$row['mxid'];
			mysql_query($cpjkdmxstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"明细数据保存失败!" }';
			//	return '明细数据保存失败!!' . $cpjkdmxstr;
				break;
			}
		}
	}


	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",gfid:'.$gfid.' }';
	}
}

function cpgfkdmxsave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];  
    $loc = $_GET['loc'];  
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $czy =$_SESSION['LoginUserName'] ;
	$czy =$o['username'] ;
    $s = base64_decode($str);

	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumsl = 0;
	$sumzl = 0;
	$sumje = 0;
	$sumxjje = 0;
    if($loc=='delete')
	{

		$gfid =$_GET['data'];
		$cpgfdstr = " update  wxcpgfd  set  khshr='" .  $czy . "' ";
		$cpgfdstr .= ",khshrq=now(),delbz=1  where gfid=".$gfid;
		mysql_query($cpgfdstr);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"数据保存失败!" }';
		//	return '数据删除失败!!!'.$cpgfdstr;
		} 
		else 
		{
			return '{result:"success",gfid:'.$gfid.' }';
		}
	}  
	if($loc=='ok')
	{

		$gfid =$_GET['data'];
		$cpgfdstr = " update  wxcpgfd  set  khshr='" .  $czy . "' ";
		$cpgfdstr .= ",khshrq=now(),ztbz=1  where gfid=".$gfid;
		mysql_query($cpgfdstr);
		if (mysql_errno() > 0) {
		//	return '{result:"fail",msg:"数据保存失败!" }';
			return '数据删除失败!!!'.$cpgfdstr;
		} 
		else 
		{
			return '{result:"success",gfid:'.$gfid.' }';
		}
	}  
      


	$cpgfdmx = $o['gfdmx'];
     
	$my_date =new DateTime( $o['kdfrq']);
    $my_year = $my_date ->format("Y");  


     $gfid=$o['gfid'] ;

		//新单
	$dhsql="select setdh(".$L_id.",".$my_year .",'G') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpgfdstr = " insert into wxcpgfd (gfdh,L_id,khid,khmc,cphm,area,sfr,czy,cnote,khsl,khzl,kdrq,endrq)values('";
	$cpgfdstr .= $dh. "'";
	$cpgfdstr .= "," . $L_id;
	$cpgfdstr .= "," . $o['khid'];
	$cpgfdstr .= ",'" . $o['khmc'] . "'";
	$cpgfdstr .= ",'" . $o['cphm'] . "'";
	$cpgfdstr .= ",'" . $o['area'] . "'";
	$cpgfdstr .= ",'" . $o['sfr'] . "'";
	$cpgfdstr .= ",'" . $czy . "'";
	$cpgfdstr .= ",'" . $o['cnote'] . "'";
	$cpgfdstr .= "," . $o['sl'] ;
	$cpgfdstr .= "," . $o['zl'] ;
	$cpgfdstr .= ",'" . $o['kdrq'] . "'";
	$cpgfdstr .= ",'" . $o['endrq'] . "')";
	//return $cpgfdstr;
	mysql_query('start transaction');
	mysql_query($cpgfdstr);
	$gfid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($gfid==0)) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!' . $cpgfdstr;
	}
	foreach ($cpgfdmx as $row) {
		$cpjkdmxstr = " insert into wxcpgfdmx (xmmc,cdmc,bzmc,bzid,cpid,gfid,jldw,khsl,khzl)";
		$cpjkdmxstr = $cpjkdmxstr . " values ('". $row['xmmc'] . "','". $row['cdmc'] . "','". $row['bzmc'] . "',". $row['bzid'] . ","   . $row['cpid'] . ","  . $gfid . ",'" . $row['jldw'] . "'," . $row['khsl'];
		$cpjkdmxstr = $cpjkdmxstr . "," . $row['khzl'] . ")";
		mysql_query($cpjkdmxstr);
		$mxid=mysql_insert_id();
		if ((mysql_errno() > 0)||($mxid==0)) {
			mysql_query('rollback');
			return '{result:"fail",msg:"明细数据保存失败!" }';
		//	return '明细数据保存失败!!' . $cpjkdmxstr;
			break;
		}
	}



	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",gfid:'.$gfid.' }';
	}
}

function cptzdmxsave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];  
    $s = base64_decode($str);
	
	$o = json_decode($s);
	//return $o;
	$o = json_decode($o, true);
	$i = 0;
	$cptzdmx = $o['cptzdmx'];
	$cptzdje = $o['cptzdje'];
	
	
   // return $cptzdje;       
	$my_date =new DateTime( $o['tzrq']);
    $my_year = $my_date ->format("Y");  
     
	$dhsql="select setdh(".$L_id.",".$my_year .",'T') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
		$sumtzsl = 0;
		$sumtzzl = 0;
		$sumtzje = 0;
		$sumxjje = 0;
		foreach ($cptzdmx as $cwrow) {
			$sumtzsl = $sumtzsl + $cwrow['tzsl'];
			$sumtzzl = $sumtzzl + $cwrow['tzzl'];
		}
		foreach ($cptzdje as $jerow) {
			
			$sumtzje = $sumtzje + $jerow['je'];
			if ($jerow['xjbz']>0)
			{
				$sumxjje = $sumxjje + $jerow['je'];				
			}
		}
	
	$cptzdstr = " insert into cptzd (tzdh,L_id,khid,khmc,newkhid,newkhmc,czy,cnote,jekh,tzsl,tzzl,tzje,xjje,tzrq)values('";
	$cptzdstr .= $dh. "'";
	$cptzdstr .= "," . $L_id;
	$cptzdstr .= "," . $o['khid'];
	$cptzdstr .= ",'". $o['khmc'] . "'";
	$cptzdstr .= "," . $o['newkhid'];
	$cptzdstr .= ",'". $o['newkhmc'] . "'";
	$cptzdstr .= ",'". $o['czy'] . "'";
	$cptzdstr .= ",'". $o['cnote'] . "'";
	$cptzdstr .= ",". $o['jekh'] ;//  $jerow['jekh']  ;//($jerow['jekh']?'1':'0') ;
	$cptzdstr .= "," . $sumtzsl;
	$cptzdstr .= "," . $sumtzzl;
	$cptzdstr .= "," . $sumtzje;
	$cptzdstr .= "," . $sumxjje;
	
	$cptzdstr .= ",'" . $o['tzrq'] . "')";
//	return $cptzdstr ;// $jerow['jekh'];
	mysql_query('start transaction');
	mysql_query($cptzdstr);
	$tzid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($tzid==0)) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
		//return '数据保存失败!' . $cptzdstr;
	}
     
	//return $tzdid; 
	foreach ($cptzdmx as $row) {
		$cptzdmxstr = " insert into cptzdmx (cdid,tzid,cpid,bzid,cdmc,cpmc,bzmc,cpgg,mints,
		cpph,jldw,czdj,czrq,area,cw,sm,newcw,newsm,newczdj,newczrq,newcpph,kcmxid,tzsl,tzzl)";
		$cptzdmxstr .= " values (". $row['cdid'] . "," . $tzid . "," . $row['cpid'] . "," . $row['bzid'];
		$cptzdmxstr .= ",'" . $row['cdmc'] . "','" . $row['cpmc'] . "','" . $row['bzmc'] . "','" . $row['cpgg'] . "'," . $row['mints'];
		$cptzdmxstr .= ",'" . $row['cpph'] . "','" . $row['jldw'] . "'," . $row['czdj'] . ",'" . $row['czrq'] . "','". $row['area'] . "','".$row['cw'] . "','". $row['sm'] . "'";
        $cptzdmxstr .= ",'" . $row['newcw'] . "','" . $row['newsm'] . "'," . $row['newczdj'] . ",'" . $row['newczrq'] . "','". $row['newcpph'] . "'";
        $cptzdmxstr .= "," . $row['kcmxid']."," . $row['tzsl'] ."," . $row['tzzl']  . ")";		
		mysql_query($cptzdmxstr);
		if (mysql_errno() > 0)
		{
			mysql_query('rollback');
			return '{result:"fail",msg:"商品数据保存失败!" }';
		//	return '商品数据保存失败!!' . $cptzdmxstr;
			break;
		}
		 
	}
	
  	 foreach ($cptzdje as $jerow) {
		   $cptzdjestr = " insert into cptzdje (work,dw,sl,dj,je,workid,tzid,xjbz,zljs,inbz,indj)";
		   $cptzdjestr .= " values ('" . $jerow['work'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
		   $cptzdjestr .= "," . $jerow['workid'] ;
		   $cptzdjestr .= "," . $tzid ;
		   $cptzdjestr .= "," .($jerow['xjbz']?'1':'0') ;
		   $cptzdjestr .= "," .($jerow['zljs']?'1':'0') ;
		   $cptzdjestr .= "," .($jerow['inbz']?'1':'0') ;
		   $cptzdjestr .= "," .($jerow['indj']?'1':'0') ; 
		   $cptzdjestr .= ")";
			mysql_query($cptzdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"费用数据保存失败!" }';
				//return '费用数据保存失败!!' . $cptzdjestr;
				break;
			}
	  }	
	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!" }';
	//	return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",tzid:'.$tzid.'}';
	}
}
function cpckdmxcksave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $loc = $_GET['loc'];  
    $s = base64_decode($str);
//	return $s;
	$sq="";
	$jeid=0;
    mysql_query('insert into logs_err (msg) values ("'.$s.'")');
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$cpckdmx = $o['cpckdmx'];
	$cpckdje = $o['cpckdje'];
	$cpckdcw = $o['cpckdcw'];
	$my_date =new DateTime( $o['ckrq']);
    $my_year = $my_date ->format("Y");  
	$dhsql="select setdh(".$L_id.",".$my_year .",'C') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpckdstr = " insert into cpckd (ckdh,xsid,thr,cphm,czy,cnote,ckrq)values('";
	$cpckdstr .= $dh. "'";
	$cpckdstr .=",".$o['xsid'];
	$cpckdstr .= ",'" . $o['thr'] . "'";
	$cpckdstr .= ",'" . $o['cphm'] . "'";
	$cpckdstr .= ",'" . $o['czy'] . "'";
	$cpckdstr .= ",'" . $o['cnote'] . "'";
	$cpckdstr .= ",'" . $o['ckrq'] . "')";
    $cpxsdstr=" update cpxsd set fhbz=". $o['fhbz'] . " where xsid=".$o['xsid'];
	$sq.=';'.$cpckdstr;
	mysql_query('start transaction');
	mysql_query($cpckdstr);
	$ckid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($ckid==0)) {
		mysql_query('rollback');
		mysql_query('insert into logs_err (msg) values ("'.$sq.'")');
		return '{result:"fail",msg:"数据保存失败!"}';
	}
     foreach ($cpckdmx as $row) {
     	    $xsmxid=$row['mxid'];
		//	$cpckdmxstr = " insert into cpckdmx (ckid,xsmxid,ccsl,cczl,ccje,xjje)";
		//	$cpckdmxstr .= " values (" .$ckid . "," . $row['mxid'] . "," . $row['ccsl'];
		//	$cpckdmxstr .=  "," . $row['cczl'] . "," . $row['ccje'] . "," . $row['xjje']. ")";
		$sumccje=0;		
		$ccje=(float)$row['ccje'];		
		$sumccsl=0;		
		$ccsl=(float)$row['ccsl'];		
			$cpckdmxstr = " insert into cpckdmx (ckid,xsmxid,ccsl,cczl)";
			$cpckdmxstr .= " values (" .$ckid . "," . $row['mxid'] . "," . $row['ccsl'];
			$cpckdmxstr .=  "," . $row['cczl'] . ")";	
			$sq.=';'.$cpckdmxstr;
			mysql_query($cpckdmxstr);
			$ckmxid=mysql_insert_id();
			if ((mysql_errno() > 0)|| ($ckmxid==0)) {
				mysql_query('rollback');
				//return '{result:"fail",msg:"仓位数据保存失败!"}';
				mysql_query('insert into logs_err (msg) values ("'.$sq.'")');
				return '{result:"fail",msg:"出仓明细数据保存失败!" } ';
				break;
			}
			foreach ($cpckdcw as $cwrow) {
	 			if ($xsmxid==$cwrow['mxid']){
					$cpckdcwstr = "insert into cpckdcw (cw,czrq,area,cpph,dw,sm,sl,czdj,ckmxid,kcmxid,mints,zl) ";
					//$cpckdcwstr .= "select  cpkcmx.cw,cpkcmx.czrq,cpkcmx.area,cpkc.cpph,cpkcmx.dw,cpkcmx.sm,".$cwrow['ccsl'].",cpkcmx.czdj,".$ckmxid.",cpkcmx.id,cpkcmx.mints,".$cwrow['cczl']." from cpkcmx,cpkc where cpkcmx.kcid=cpkc.kcid AND  cpkcmx.id=".$cwrow['kcmxid'];
					$cpckdcwstr .= " values ('" .$cwrow['cw'] . "','" . $cwrow['czrq']. "','" . $cwrow['area']. "','" . $cwrow['cpph'] . "','" . $cwrow['dw'] . "'";
					$cpckdcwstr .=  ",'" . $cwrow['sm'] . "'," . $cwrow['ccsl'] . "," . $cwrow['czdj'].",".$ckmxid. ",". $cwrow['kcmxid'] . ",". $cwrow['mints']. ",". $cwrow['cczl'] . ")";
					$sq.=';'.$cpckdcwstr;
					$sumccsl=$sumccsl+(float)$cwrow['ccsl'];

					mysql_query($cpckdcwstr);
					$cwid=mysql_insert_id();
					if ((mysql_errno() > 0) ||( $cwid==0 )) {
						mysql_query('rollback');
						mysql_query('insert into logs_err (msg) values ("'.$sq.'")');
						return '{result:"fail",msg:"仓位数据保存失败!" } ';
						break;
					}
				}
			}
            if ($sumccsl!=$ccsl){
				mysql_query('rollback');
				mysql_query('insert into logs_err (msg) values ("'.$sq.'")');
				
				return '{result:"fail",msg:"仓位数据保存失败!" } ';
				break;

			}  
			foreach ($cpckdje as $jerow) {
				if ($xsmxid==$jerow['mxid']){
					$xjbz=($jerow['xjbz']?'1':'0');
					$xjje=$jerow['xjje'];
					if ($xjbz=='1'){
						$xjje=$jerow['je'];
					}
					$cpckdjestr = " insert into cpckdje (work,area,dw,sl,dj,je,xjje,workid,ckmxid,xjbz,zljs,inbz,indj)";
					$cpckdjestr .= " values ('" . $jerow['work']. "','" . $jerow['area'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je']. "," . $xjje;
					$cpckdjestr .= "," .$jerow['workid'] ;
					$cpckdjestr .= "," .$ckmxid;
					$cpckdjestr .= "," .$xjbz ;
					$cpckdjestr .= "," .($jerow['zljs']?'1':'0') ;
					$cpckdjestr .= "," .($jerow['inbz']?'1':'0') ;
					$cpckdjestr .= "," .($jerow['indj']?'1':'0') ; 
					$cpckdjestr .= ")";
					$sq.=';'.$cpckdjestr;
					$sumccje=$sumccje+(float)$jerow['je'];
					$jeid=0;
					mysql_query($cpckdjestr);
					$jeid=mysql_insert_id();
					if ((mysql_errno() > 0) ||( $jeid==0 ) ) {
						mysql_query('rollback');
						//mysql_query('insert into logs_err (msg) values ("1: 费用数据保存失败: jeid='.$jeid.' sql= ' .$sq.'")');
						mysql_query('insert into logs_err (msg) values (" 2:费用数据保存失败 sumccje='.$sumccje.' ccje=  '.$ccje.'  jeid='.$jeid.'   sql= ' .$sq.'")');
						return '{result:"fail",msg:"费用数据保存失败!" } ';
						break;
					}
				}
			}	
			if ($sumccje!=$ccje){
				mysql_query('rollback');
				mysql_query('insert into logs_err (msg) values (" 2:费用数据保存失败 sumccje='.$sumccje.' ccje=  '.$ccje.'  jeid='.$jeid.'   sql= ' .$sq.'")');
				return '{result:"fail",msg:"费用数据保存失败!" } ';
				break;
			}  
		}
		mysql_query($cpxsdstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			mysql_query('insert into logs_err (msg) values ("'.$cpxsdstr.'")');
			return '{result:"fail",msg:"费用数据保存失败!"}';
			break;
		}
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		mysql_query('insert into logs_err (msg) values ("'.$sq.'")');
		return '{result:"fail",msg:"数据保存失败!请再试一次!"}';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",ckid:'.$ckid.'}';
	}
}

function cpghdmxcksave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
	$loc = $_GET['loc'];  
    $s = base64_decode($str);
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
//	$cpghdmx = $o['cpghdmx'];
	$cpghdje = $o['cpghdje'];
	$cpghdcw = $o['cpghdcw'];
//	$my_date =new DateTime( $o['ckrq']);
 //   $my_year = $my_date ->format("Y");  //
//	$dhsql="select setdh(".$L_id.",".$my_year .",'C') as dh ";
//	$result = mysql_query($dhsql);
//	$arr=mysql_fetch_assoc($result);
//	//$dh =$arr['dh'];
	$ghid=$o['ghid'] ;

	$cpghdstr = " update wxcpghd set fhbz=2";
	$cpghdstr .= ",ghr='" . $o['czy'] . "'";
	$cpghdstr .= ",cnote='" . $o['cnote'] . "'";
	$cpghdstr .= ",ghrq='" . $o['ghrq'] . "' where ghid=".$ghid;
	
	/*$sumje=0;
	$sumxjje=0
	foreach ($cpghdmx as $row) {


	}
*/

	mysql_query('start transaction');
	
	mysql_query($cpghdstr);
	
	if (mysql_errno() > 0 ) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!"'.$cpghdstr.'}';
		//		return '数据保存失败!' ;
	}
	foreach ($cpghdcw as $cwrow) {
	 			
					$cpghdcwstr = " insert into wxcpghdcw (cw,czrq,area,cpph,dw,sm,sl,czdj,mxid,kcmxid,mints,zl)";
					$cpghdcwstr .= " values ('" .$cwrow['cw'] . "','" . $cwrow['czrq']. "','" . $cwrow['area']. "','" . $cwrow['cpph'] . "','" . $cwrow['dw'] . "'";
					$cpghdcwstr .=  ",'" . $cwrow['sm'] . "'," . $cwrow['ccsl'] . "," . $cwrow['czdj'].",".$cwrow['mxid']. ",". $cwrow['kcmxid'] . ",". $cwrow['mints']. ",". $cwrow['cczl'] . ")";
					mysql_query($cpghdcwstr);
					if (mysql_errno() > 0) {
						mysql_query('rollback');
						return '{result:"fail",msg:"仓位数据保存失败!"'.$cpghdcwstr.'}';
						//return '仓位数据保存失败!!' ;
						break;
					}
				
	}
		  
	foreach ($cpghdje as $jerow) {
				
					$cpghdjestr = " insert into wxcpghdje (work,area,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj)";
					$cpghdjestr .= " values ('" . $jerow['work']. "','" . $jerow['area'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
					$cpghdjestr .= "," . $jerow['workid'] ;
					$cpghdjestr .= "," . $jerow['mxid'];
					$cpghdjestr .= "," .($jerow['xjbz']?'1':'0') ;
					$cpghdjestr .= "," .($jerow['zljs']?'1':'0') ;
					$cpghdjestr .= "," .($jerow['inbz']?'1':'0') ;
					$cpghdjestr .= "," .($jerow['indj']?'1':'0') ; 
					$cpghdjestr .= ")";
					mysql_query($cpghdjestr);
					if (mysql_errno() > 0) {
						mysql_query('rollback');
						return '{result:"fail",msg:"费用数据保存失败!"'.$cpghdjestr.'}';
						//return '费用数据保存失败!!!' ;
						break;
					}
				
	}	
		     
	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		//return '数据保存失败!!!!';
		return '{result:"fail",msg:"数据保存失败!!"}';
	} 
	else 
	{
		return '{result:"success",dh:" ", ghid:'.$ghid.'}';
	}
}
function wxcpgfdmxcksave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
	$loc = $_GET['loc'];  
    $s = base64_decode($str);
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$cpgfdmx = $o['cpgfdmx'];
	$cpgfdje = $o['cpgfdje'];


	$gfid=$o['gfid'] ;

	$cpgfdstr = " update wxcpgfd set fhbz=2";
	$cpgfdstr .= ",czy='" . $o['czy'] . "'";
	$cpgfdstr .= ",cnote='" . $o['cnote'] . "'";
	$cpgfdstr .= ",gfrq='" . $o['gfrq'] . "' where gfid=".$gfid;

	
	mysql_query('start transaction');
	
	mysql_query($cpgfdstr);
	
	if (mysql_errno() > 0 ) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!"'.$cpgfdstr.'}';
		//		return '数据保存失败!' ;
	}
     
 //  改由TRIGGER修改
	foreach ($cpgfdmx as $mxrow) {
		$cpgfdmxstr = " update  wxcpgfdmx set sl=".$mxrow['sl'];
		
		$cpgfdmxstr .= ",zl=" . $mxrow['zl'] ;

		$cpgfdmxstr .= ",area='" . $mxrow['area'] ;
//		$cpgfdmxstr .= ",je=" . $mxrow['je'];
       $cpgfdmxstr .="' where mxid=".$mxrow['mxid'] ;

		mysql_query($cpgfdmxstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:" 费用数据保存失败!"'.$cpgfdmxstr.'}';
			//return '费用数据保存失败!!!' ;
			break;
		}
	
     }	

	 
		  
	foreach ($cpgfdje as $jerow) {
					$cpgfdjestr = " insert into wxcpgfdje (work,area,dw,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj)";
					$cpgfdjestr .= " values ('" . $jerow['work']. "','" . $jerow['area'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
					$cpgfdjestr .= "," . $jerow['workid'] ;
					$cpgfdjestr .= "," . $jerow['mxid'];
					$cpgfdjestr .= "," .($jerow['xjbz']?'1':'0') ;
					$cpgfdjestr .= "," .($jerow['zljs']?'1':'0') ;
					$cpgfdjestr .= "," .($jerow['inbz']?'1':'0') ;
					$cpgfdjestr .= "," .($jerow['indj']?'1':'0') ; 
					$cpgfdjestr .= ")";
					mysql_query($cpgfdjestr);
					if (mysql_errno() > 0) {
						mysql_query('rollback');
						return '{result:"fail",msg:"费用数据保存失败!"'.$cpgfdjestr.'}';
						//return '费用数据保存失败!!!' ;
						break;
					}
				
	}	
		     
	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		//return '数据保存失败!!!!';
		return '{result:"fail",msg:"数据保存失败!!"}';
	} 
	else 
	{
		return '{result:"success",dh:" ", gfid:'.$gfid.'}';
	}
}

function cpckdmxcwcksave() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $loc = $_GET['loc'];  
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$cpckdcw = $o['cpckdcw'];
	
	mysql_query('start transaction');
	 		foreach ($cpckdcw as $cwrow) {
	 			
					$cpckdcwstr = " insert into cpckdcw (cw,area,cpph,dw,sm,sl,czdj,ckmxid,kcmxid,zl)";
					$cpckdcwstr .= " values ('" .$cwrow['cw'] . "','" . $cwrow['area']. "','" . $cwrow['cpph'] . "','" . $cwrow['dw'] . "'";
					$cpckdcwstr .=  ",'" . $cwrow['sm'] . "'," . $cwrow['ccsl'] . "," . $cwrow['czdj'].",".$cwrow['ckmxid']. ",". $cwrow['kcmxid'] . ",". $cwrow['cczl'] . ")";
					mysql_query($cpckdcwstr);
					if (mysql_errno() > 0) {
						mysql_query('rollback');
						return '{result:"fail",msg:"仓位数据保存失败!"}';
					//	return '仓位数据保存失败!!' . $cpckdcwstr;
						break;
					}
				
			}
		  
		     

	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!!!!';
	} 
	else 
	{
		return '{result:"success"}';
	}
}





function cpckdmxcksave_old() {
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $loc = $_GET['loc'];  
    $s = base64_decode($str);
	//return $s;
	$o = json_decode($s);
	$o = json_decode($o, true);
	$i = 0;
	$sumjcsl = 0;
	$sumjczl = 0;
	$sumjcje = 0;
	$cpckdcw = $o['cpckdcw'];
	$cpckdje = $o['cpckdje'];
	$my_date =new DateTime( $o['ckrq']);
    $my_year = $my_date ->format("Y");  
	$dhsql="select setdh(".$L_id.",".$my_year .",'C') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpckdstr = " insert into cpckd (ckdh,xsid,thr,cphm,czy,cnote,ckrq)values('";
	$cpckdstr .= $dh. "'";
	$cpckdstr .=",".$o['xsid'];
	$cpckdstr .= ",'" . $o['thr'] . "'";
	$cpckdstr .= ",'" . $o['cphm'] . "'";
	$cpckdstr .= ",'" . $o['czy'] . "'";
	$cpckdstr .= ",'" . $o['cnote'] . "'";
	$cpckdstr .= ",'" . $o['ckrq'] . "')";
    $cpxsdstr=" update cpxsd set fhbz=". $o['fhbz'] . " where xsid=".$o['xsid'];
	mysql_query('start transaction');
	mysql_query($cpckdstr);
	$ckid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($ckid==0)) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!' . $cpckdstr. $ckid;
	}
     
		 
     foreach ($cpckdcw as $cwrow) {
			$cpckdcwstr = " insert into cpckdcw (cw,cpph,dw,sm,sl,czdj,mxid,ckid,kcmxid,zl)";
			$cpckdcwstr .= " values ('" .$cwrow['cw'] . "','" . $cwrow['cpph'] . "','" . $cwrow['dw'] . "'";
			$cpckdcwstr .=  ",'" . $cwrow['sm'] . "'," . $cwrow['ccsl'] . "," . $cwrow['czdj'].",".$cwrow['mxid'].",".$ckid. ",". $cwrow['kcmxid'] . ",". $cwrow['cczl'] . ")";
			mysql_query($cpckdcwstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"仓位数据保存失败!"}';
			//	return '仓位数据保存失败!!' . $cpckdcwstr;
				break;
			}
		}
		foreach ($cpckdje as $jerow) {
			$cpckdjestr = " insert into cpckdje (work,dw,sl,dj,je,workid,mxid,ckid,xjbz,zljs,inbz,indj)";
			$cpckdjestr .= " values ('" . $jerow['work'] . "','" . $jerow['dw'] . "'," . $jerow['sl'] . "," . $jerow['dj'] . "," . $jerow['je'];
			$cpckdjestr .= "," . $jerow['workid'] ;
			$cpckdjestr .= "," . $jerow['mxid'];
			$cpckdjestr .= "," . $ckid ;
			$cpckdjestr .= "," .($jerow['xjbz']?'1':'0') ;
			$cpckdjestr .= "," .($jerow['zljs']?'1':'0') ;
			$cpckdjestr .= "," .($jerow['inbz']?'1':'0') ;
			$cpckdjestr .= "," .($jerow['indj']?'1':'0') ; 
			$cpckdjestr .= ")";
		
			mysql_query($cpckdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"费用数据保存失败!"}';
			//	return '费用数据保存失败!!!' . $cpckdjestr;
				break;
			}
		}	
             
			mysql_query($cpxsdstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"费用数据保存失败!"}';
				//return '费用数据保存失败!!!' . $cpxsdstr;
				break;
			}

	
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!!!!';
	} 
	else 
	{
		return '{result:"success"}';
	}
}

function cpxsdmxsave() {
	$str = $_GET['data'];
    $s = base64_decode($str);
//	return  $s;
	$o = json_decode($s);

	$o = json_decode($o,true);
	$cpxsdmx = $o['cpxsdmx'];
    $L_id =$o['ckid'];
   	$my_date =new DateTime($o['xsrq']);
    $my_year = $my_date ->format("Y");
	$dhsql="select setdh(".$L_id.",".$my_year .",'x') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpxsdstr = "insert into cpxsd (xsdh,L_id,khkd,xjbz,khid,khmc,ckmc,sfr,cphm,czy,cnote,xsrq,endrq)values('";
	$cpxsdstr .= $dh. "'";
	$cpxsdstr .= ",". $L_id;
	$cpxsdstr .= ",". $o['khkd'];
	$cpxsdstr .= ",". $o['xjbz'];
	$cpxsdstr .= ",". $o['khid'];
	$cpxsdstr .= ",'". $o['khmc'] . "'";
	$cpxsdstr .= ",'". $o['ckmc'] . "'";
	$cpxsdstr .= ",'". $o['sfr']  . "'";
	$cpxsdstr .= ",'". $o['cphm'] . "'";
	$cpxsdstr .= ",'". $o['czy']  . "'";
	$cpxsdstr .= ",'". $o['cnote']. "'";
	$cpxsdstr .= ",'". $o['xsrq'] . "'";
	$cpxsdstr .= ",'". $o['endrq'] . "')";
	mysql_query('start transaction');
	mysql_query($cpxsdstr);
	$xdid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($xdid==0)) {
		mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!' . $cpxsdstr;
	}
	foreach ($cpxsdmx as $row) {
		$cpxsdmxstr  = " insert into cpxsdmx (xsid,kcid,xssl,xszl,xsdj,xsje,sm,cpgg,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpxsdmxstr .= " values (".$xdid."," .$row['kcid'].",".$row['xssl'];
		$cpxsdmxstr .= "," . $row['xszl'].",".$row['xsdj'].",".$row['xsje'] . ",'" . $row['sm'] . "'";
		$cpxsdmxstr .= ",'" . $row['cpgg']."','".$row['cpph']."','".$row['jldw'] . "'";
		$cpxsdmxstr .= "," . $row['cdid'].",".$row['cpid'].",".$row['bzid'];
		$cpxsdmxstr .= ",'" . $row['cdmc']."','".$row['cpmc']."','".$row['bzmc']."')";
		mysql_query($cpxsdmxstr);
		if (mysql_errno() > 0)
		{
			mysql_query('rollback');
				return '{result:"fail",msg:"商品数据保存失败!"}';
			//return '商品数据保存失败!!' . $cpxsdmxstr;
			break;
		}
	}
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!!"}';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",xsid:'.$xdid.'}';
	}
}

function wxcpghdmxsave() {
	$str = $_GET['data'];
    $s = base64_decode($str);
	$o = json_decode($s);
	$o = json_decode($o,true);
	$cpghdmx = $o['cpghdmx'];
    $L_id =$o['ckid'];
   	$my_date =new DateTime($o['xsrq']);
    $my_year = $my_date ->format("Y");
	$dhsql="select setdh(".$L_id.",".$my_year .",'H') as dh ";
	$result = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result);
	$dh =$arr['dh'];
	$cpghdstr = "insert into wxcpghd (ghdh,L_id,khkd,jebz,xjbz,khid,khmc,newkhid,newkhmc,ckmc,sfr,cphm,czy,cnote,xsrq,endrq)values('";
	$cpghdstr .= $dh. "'";
	$cpghdstr .= ",". $L_id;
	$cpghdstr .= ",". $o['khkd'];
//	$cpghdstr .= ",". $o['jebz'];
    if ($o['jebz']=="on") {
		$cpghdstr .= ",1";
	}
	else
	{
		$cpghdstr .= ",0";
	}
	$cpghdstr .= ",". $o['xjbz'];
	
	$cpghdstr .= ",". $o['khid'];
	$cpghdstr .= ",'". $o['khmc'] . "'";
	$cpghdstr .= ",". $o['newkhid'];
	$cpghdstr .= ",'". $o['newkhmc'] . "'";
	$cpghdstr .= ",'". $o['ckmc'] . "'";
	$cpghdstr .= ",'". $o['sfr']  . "'";
	$cpghdstr .= ",'". $o['cphm'] . "'";
	$cpghdstr .= ",'". $o['czy']  . "'";
	$cpghdstr .= ",'". $o['cnote']. "'";
	$cpghdstr .= ",'". $o['xsrq'] . "'";
	$cpghdstr .= ",'". $o['endrq'] . "')";
	mysql_query('start transaction');
	mysql_query($cpghdstr);
	$xdid=mysql_insert_id();
	if ((mysql_errno() > 0 ) ||($xdid==0)) {
		mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"'.$cpghdstr.'}';
		//return '数据保存失败!' . $cpghdstr;
	}
	foreach ($cpghdmx as $row) {
		$cpghdmxstr  = " insert into wxcpghdmx (ghid,kcid,xssl,xszl,sm,cpgg,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpghdmxstr .= " values (".$xdid."," .$row['kcid'].",".$row['xssl'];
		$cpghdmxstr .= "," . $row['xszl'].",'" . $row['sm'] . "'";
		$cpghdmxstr .= ",'" . $row['cpgg']."','".$row['cpph']."','".$row['jldw'] . "'";
		$cpghdmxstr .= "," . $row['cdid'].",".$row['cpid'].",".$row['bzid'];
		$cpghdmxstr .= ",'" . $row['cdmc']."','".$row['cpmc']."','".$row['bzmc']."')";
		mysql_query($cpghdmxstr);
		if (mysql_errno() > 0)
		{
			mysql_query('rollback');
				return '{result:"fail",msg:"商品数据保存失败!"}';
			//return '商品数据保存失败!!' . $cpxsdmxstr;
			break;
		}
	}
	mysql_query('commit');
	if (mysql_errno() > 0) {
		mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!!"}';
		//return '数据保存失败!!!';
	} 
	else 
	{
		return '{result:"success",dh:"'.$dh.'",ghid:'.$xdid.'}';
	}
}

function cpckdckshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	
		
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
	  
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ckid = $o['ckid'];
		//$shr = $o['shr'];

		mysql_query('start transaction');
		
	if ($loc=="ok"){		

		$sqlstr = " update cpckd set ztbz=2";
		$sqlstr .= ",cgy='" . $shr . "',shrq=now()  where  ztbz=1 and delbz=0 and ckid=" . $ckid;



		mysql_query($sqlstr);

		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
		//	return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpckdjestr = " update cpckdje set gs='" . $row['gs'] . "'";
			$cpckdjestr .= ",byg='" . $row['byg'] . "'";
			$cpckdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpckdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
			//	return '商品数据保存失败!!' . $cpckdjestr;
				break;
			}
		}
	}else{
		if ($loc=="cancel"){	
			$ckid = $_GET['data'];	
			$sqlstr = " update cpckd set ztbz=1 where ztbz=2 and delbz=0 and ckid=" . $ckid;
		}
		else{

			$sqlstr = " update cpckd set delbz=1";
			$sqlstr .= ",cgy='" . $shr . "',shrq=now() where  ztbz=1 and delbz=0 and ckid=" . $ckid;
		}
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!!"}';
			//	return '数据保存失败!' . $sqlstr;
			}
	}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!!!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpckdcwshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	
		
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
	  
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ckid = $o['ckid'];
		//$shr = $o['shr'];

		mysql_query('start transaction');
		
	if ($loc=="ok"){		

		$sqlstr = " update cpckd set ztbz=3";
		$sqlstr .= ",cwsh='" . $shr . "',cwshrq=now()  where  (ztbz=2 or ztbz=3) and delbz=0 and ckid=" . $ckid;

		mysql_query($sqlstr);

		if (mysql_errno() > 0) {
			mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpckdjestr = " update cpckdje set gs='" . $row['gs'] . "'";
			$cpckdjestr .= ",byg='" . $row['byg'] . "'";
			$cpckdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpckdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
						return '{result:"fail",msg:"商品数据保存失败!"}';
				//return '商品数据保存失败!!' . $cpckdjestr;
				break;
			}
		}
	}else
	{
		if ($loc=="cancel"){		
			$ckid = $_GET['data'];
			
			$sqlstr = " update cpckd set ztbz=2  where  ztbz>2 and delbz=0 and ckid=" . $ckid;
		}
		else{
			$sqlstr = " update cpckd set delbz=1";
			$sqlstr .= ",cwsh='" . $shr . "',cwshrq=now() where  (ztbz=2 or ztbz=3) and delbz=0 and ckid=" . $ckid;
		}

			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
						return '{result:"fail",msg:"数据保存失败!"}';
			//	return '数据保存失败!' . $sqlstr;
			}
	}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpckdshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =urldecode($_SESSION['LoginUserName']) ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ckid = $o['ckid'];
	//	$shr = $o['shr'];
		mysql_query('start transaction');
		
		
		if ($loc=="ok"){		
			$sqlstr = " update cpckd set ztbz=1";
			$sqlstr .= ",shr='" . $shr . "',shrq=now() where delbz=0 and  ztbz=0 and ckid=" . $ckid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}else
			{
		      foreach ($gsby as $row) {
				$cpckdjestr = " update cpckdje set gs='" . $row['gs'] . "'";
				$cpckdjestr .= ",byg='" . $row['byg'] . "'";
				$cpckdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
				mysql_query($cpckdjestr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
				//	return '商品数据保存失败!!' . $cpckdjestr;
					break;
				}
			  }
			}
		}else{
			$sqlstr = " update cpckd set delbz=1";
			$sqlstr .= ",cgy='" . $shr . "',shrq=now()  where  ztbz=0 and delbz=0 and ckid=" . $ckid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}
			
		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpghdghshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ghid = $o['ghid'];
	//	$shr = $o['shr'];
		mysql_query('start transaction');
		
		
		if ($loc=="ok"){		
			$sqlstr = " update wxcpghd set ztbz=2";
			$sqlstr .= ",shr='" . $shr . "',shrq=now() where delbz=0 and  fhbz=2 and ghid=" . $ghid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}else
			{
		      foreach ($gsby as $row) {
				$wxcpghdjestr = " update wxcpghdje set gs='" . $row['gs'] . "'";
				$wxcpghdjestr .= ",byg='" . $row['byg'] . "'";
				$wxcpghdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
				mysql_query($wxcpghdjestr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
				//	return '商品数据保存失败!!' . $wxcpghdjestr;
					break;
				}
			  }
			}
		}else{
			// 删除处理
			/*
		  	$sqlstr = " update wxcpghd set delbz=1";
			$sqlstr .= ",cgy='" . $shr . "',shrq=now()  where  ztbz=1 and delbz=0 and ghid=" . $ghid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}*/

			$sqlstr = "select mxid from  wxcpghdmx where  ghid=" . $ghid;
			$query=mysql_query($sqlstr);
			  if ($query){
			   while ($row = mysql_fetch_array($query)) {
				   $sqlstr = " delete from  wxcpghdcw where mxid=".$row['mxid'] ;
				   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"仓位数据删除保存失败!"}'.$sqlstr;
					   //return '商品数据保存失败!!' . $cpckdjestr;
					   break;
				   }
				   $sqlstr = " delete from  wxcpghdje where mxid=".$row['mxid'] ;
				   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"费用数据保存失败!"}'.$sqlstr;
					   //return '商品数据保存失败!!' . $cpckdjestr;
					   break;
				   }

			   }
			   $sqlstr = " update wxcpghd set ztbz=1,fhbz=0";
			   $sqlstr .= ",shr='" . $shr . "',shrq=now()  where  ztbz>0 and delbz=0 and ghid=" . $ghid;
			   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"数据保存失败!!"}'.$sqlstr;
					   //return '数据保存失败!' . $sqlstr;
				   }
			   
			}else{
			   mysql_query('rollback');
			   return '{result:"fail",msg:"数据保存失败!!!"}'.$sqlstr;
			}


			
		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}


function wxcpgfdshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
	
    $o = json_decode($s);
    $o = json_decode($o, true);
	$gsby = $o['gfdje'];
	$gfid = $o['gfid'];
	//	$shr = $o['shr'];
	mysql_query('start transaction');

		switch($loc) {
		case 'cpgfdywsh' :
				$sqlstr = " update wxcpgfd set ztbz=2";
				$sqlstr .= ",shr='" . $shr . "',shrq=now() where delbz=0 and fhbz=2 and gfid=" . $gfid;
				mysql_query($sqlstr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}';
				}else
				{
		      			foreach ($gsby as $recrow) {
							$ret=getwxcpgfdjesql($recrow);
							if ($ret>'') {
								
								return $ret;
								break;
							}
			  			}
				}
			
				break;
				case 'cpgfdcksh' :
				$sqlstr = " update wxcpgfd set ztbz=3";
				$sqlstr .= ",ckshr='" . $shr . "',ckshrq=now() where delbz=0 and fhbz=2 and gfid=" . $gfid;
				mysql_query($sqlstr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}';
				}else
				{
		      			foreach ($gsby as $recrow) {
							$ret=getwxcpgfdjesql($recrow);
						
							if ($ret>'') {
								
								return $ret;
								break;
							}

			  			}
				}
			
				break;
			case 'cpgfdcwsh' :
				$sqlstr = " update wxcpgfd set ztbz=4";
				$sqlstr .= ",cwsh='" . $shr . "',cwshrq=now() where delbz=0 and fhbz=2 and gfid=" . $gfid;
				mysql_query($sqlstr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}';
				}else
				{
		      			foreach ($gsby as $recrow) {
							$ret=getwxcpgfdjesql($recrow);
						
							if ($ret>'') {
								
								return $ret;
								break;
							}

			  			}
				}
			
				break;

		case 'delete':  //删除过车内容
		
		// $sqlstr = "select jeid from  wxcpgfdje where mxid in (select mxid from wxcpgfdmx where  gfid=" . $gfid.")";
		 $sqlstr = "select mxid from  wxcpgfdmx where  gfid=" . $gfid;
		 $query=mysql_query($sqlstr);
  		 if ($query){
			while ($row = mysql_fetch_array($query)) {
						//$sqlstr = " delete from  wxcpgfdje where jeid=".$row['jeid'] ;
				$sqlstr = " delete from  wxcpgfdje where mxid=".$row['mxid'] ;
				mysql_query($sqlstr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!"}'.$sqlstr;
					//return '商品数据保存失败!!' . $cpckdjestr;
					break;
				}
			}
			$sqlstr = " update wxcpgfd set ztbz=1,fhbz=0";
			$sqlstr .= ",cgy='" . $shr . "',shrq=now()  where  ztbz>0 and delbz=0 and gfid=" . $gfid;
			mysql_query($sqlstr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"数据保存失败!!"}'.$sqlstr;
					//return '数据保存失败!' . $sqlstr;
				}
			
		 }else{
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!!!"}'.$sqlstr;
		 }
		
		 break;
		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}
function getwxcpgfdjesql($row)
{
	if ($row['jeid']>0){  //原有记录
		$wxcpgfdjestr = " update wxcpgfdje set gs='" . $row['gs'] . "'";
		$wxcpgfdjestr .= ",byg='" . $row['byg'] . "'";
		$wxcpgfdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
	}else
	{
		$wxcpgfdjestr = "insert into wxcpgfdje (work,area,dw,gs,byg,cg,sl,dj,je,workid,mxid,xjbz,zljs,inbz,indj)";
		$wxcpgfdjestr .= " values ('" . $row['work']. "','" . $row['area'] . "','" . $row['jldw']. "','" . $row['gs']. "','" . $row['byg']. "','" . $row['cg'] . "'," . $row['zl'] . "," . $row['dj'] . "," . $row['je'];
		$wxcpgfdjestr .= "," . $row['workid'] ;
		$wxcpgfdjestr .= "," . $row['mxid'];
		$wxcpgfdjestr .= "," .($row['xjbz']?'1':'0') ;
		$wxcpgfdjestr .= "," .($row['zljs']?'1':'0') ;
		$wxcpgfdjestr .= "," .($row['inbz']?'1':'0') ;
		$wxcpgfdjestr .= "," .($row['indj']?'1':'0') ; 
		$wxcpgfdjestr .= ")";
	}
	mysql_query($wxcpgfdjestr);
	    if (mysql_errno() > 0) {
		    mysql_query('rollback');
			return '商品数据保存失败!!' . $wxcpgfdjestr;
		}
    return '';// $wxcpgfdjestr;
}

function cpghdckshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ghid = $o['ghid'];
	//	$shr = $o['shr'];
		mysql_query('start transaction');
		
		
		if ($loc=="ok"){		
			$sqlstr = " update wxcpghd set ztbz=3";
			$sqlstr .= ",ckshr='" . $shr . "',ckshrq=now() where delbz=0 and  fhbz=2 and ghid=" . $ghid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}else
			{
		      foreach ($gsby as $row) {
				$wxcpghdjestr = " update wxcpghdje set gs='" . $row['gs'] . "'";
				$wxcpghdjestr .= ",byg='" . $row['byg'] . "'";
				$wxcpghdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
				mysql_query($wxcpghdjestr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
				//	return '商品数据保存失败!!' . $wxcpghdjestr;
					break;
				}
			  }
			}
		}else{
			// 删除处理
			$sqlstr = "select mxid from  wxcpghdmx where  ghid=" . $ghid;
			$query=mysql_query($sqlstr);
			  if ($query){
			   while ($row = mysql_fetch_array($query)) {
				   $sqlstr = " delete from  wxcpghdcw where mxid=".$row['mxid'] ;
				   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"仓位数据删除保存失败!"}'.$sqlstr;
					   //return '商品数据保存失败!!' . $cpckdjestr;
					   break;
				   }
				   $sqlstr = " delete from  wxcpghdje where mxid=".$row['mxid'] ;
				   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"费用数据保存失败!"}'.$sqlstr;
					   //return '商品数据保存失败!!' . $cpckdjestr;
					   break;
				   }

			   }
			   $sqlstr = " update wxcpghd set ztbz=1,fhbz=0";
			   $sqlstr .= ",shr='" . $shr . "',shrq=now()  where  ztbz>0 and delbz=0 and ghid=" . $ghid;
			   mysql_query($sqlstr);
				   if (mysql_errno() > 0) {
					   mysql_query('rollback');
					   return '{result:"fail",msg:"数据保存失败!!"}'.$sqlstr;
					   //return '数据保存失败!' . $sqlstr;
				   }
			   
			}else{
			   mysql_query('rollback');
			   return '{result:"fail",msg:"数据保存失败!!!"}'.$sqlstr;
			}

		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpghdcwshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ghid = $o['ghid'];
	//	$shr = $o['shr'];
		mysql_query('start transaction');
		
		
		if ($loc=="ok"){		
			$sqlstr = " update wxcpghd set ztbz=4";
			$sqlstr .= ",cwshr='" . $shr . "',cwshrq=now() where delbz=0 and  fhbz=2 and ghid=" . $ghid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
				//return '数据保存失败!' . $sqlstr;
			}else
			{
		      foreach ($gsby as $row) {
				$wxcpghdjestr = " update wxcpghdje set gs='" . $row['gs'] . "'";
				$wxcpghdjestr .= ",byg='" . $row['byg'] . "'";
				$wxcpghdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
				mysql_query($wxcpghdjestr);
				if (mysql_errno() > 0) {
					mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
				//	return '商品数据保存失败!!' . $wxcpghdjestr;
					break;
				}
			  }
			}
		}else{
// 删除处理
$sqlstr = "select mxid from  wxcpghdmx where  ghid=" . $ghid;
$query=mysql_query($sqlstr);
  if ($query){
   while ($row = mysql_fetch_array($query)) {
	   $sqlstr = " delete from  wxcpghdcw where mxid=".$row['mxid'] ;
	   mysql_query($sqlstr);
	   if (mysql_errno() > 0) {
		   mysql_query('rollback');
		   return '{result:"fail",msg:"仓位数据删除保存失败!"}'.$sqlstr;
		   //return '商品数据保存失败!!' . $cpckdjestr;
		   break;
	   }
	   $sqlstr = " delete from  wxcpghdje where mxid=".$row['mxid'] ;
	   mysql_query($sqlstr);
	   if (mysql_errno() > 0) {
		   mysql_query('rollback');
		   return '{result:"fail",msg:"费用数据保存失败!"}'.$sqlstr;
		   //return '商品数据保存失败!!' . $cpckdjestr;
		   break;
	   }

   }
   $sqlstr = " update wxcpghd set ztbz=1,fhbz=0";
   $sqlstr .= ",shr='" . $shr . "',shrq=now()  where  ztbz>0 and delbz=0 and ghid=" . $ghid;
   mysql_query($sqlstr);
	   if (mysql_errno() > 0) {
		   mysql_query('rollback');
		   return '{result:"fail",msg:"数据保存失败!!"}'.$sqlstr;
		   //return '数据保存失败!' . $sqlstr;
	   }
   
}else{
   mysql_query('rollback');
   return '{result:"fail",msg:"数据保存失败!!!"}'.$sqlstr;
}

		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cptzdckshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];

	  
    $s = base64_decode($str);
	
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$tzid = $o['tzid'];
	
		mysql_query('start transaction');
		
		
	if ($loc=="ok"){
		$sqlstr = " update cptzd set ztbz=2";
		$sqlstr .= ",cgy='" . $shr . "',shrq=now() where  ztbz=1 and delbz=0 and tzid=" . $tzid;
	
		
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cptzdjestr = " update cptzdje set gs='" . $row['gs'] . "'";
			$cptzdjestr .= ",byg='" . $row['byg'] . "'";
			$cptzdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cptzdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"商品数据保存失败!"}';
			//	return '商品数据保存失败!!' . $cptzdjestr;
				break;
			}
		}
	}else{
		$sqlstr = " update cptzd set delbz=1";
		$sqlstr .= ",cgy='" . $shr . "',shrq=now()  where  ztbz=1 and delbz=0 and tzid=" . $tzid;
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
		//	return '数据保存失败!' . $sqlstr;
		}
	}	
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			///return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpjkdcwshsave()
{
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr = $o['username'] ;
			
	//return $shr.'--'.$o['username'].'=='.base64_decode($shr) ;

	if ($loc=="ok"){
		$str = $_GET['data'];
    	$L_id = $_GET['p_l_id'];
		  
    	$s = base64_decode($str);
		$o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$jkid = $o['jkid'];
		//$shr = $o['shr'];
		
		$sqlstr = " update cpjkd set ztbz=3,cwshrq=now()";
		$sqlstr .= ",cwsh='" . $shr . "' where  ztbz=2 and delbz=0 and jkid=" . $jkid;
		mysql_query('start transaction');
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpjkdjestr = " update cpjkdje set gs='" . $row['gs'] . "'";
			$cpjkdjestr .= ",byg='" . $row['byg'] . "'";
			$cpjkdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpjkdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"商品数据保存失败!"}';
			//	return '商品数据保存失败!!' . $cpjkdjestr;
				break;
			}
		}


	}else
	{
		$jkid = $_GET['data'];
		if ($loc=="cancel"){
	  		$sqlstr = "update cpjkd set ztbz=2,cwshrq=now(),cwsh='".$shr."' where delbz=0 and  ztbz>2 and jkid=" . $jkid;
		}
		else
		{
			$sqlstr = "update cpjkd set delbz=1,cwshrq=now(),cwsh='".$shr."' where delbz=0 and  ztbz=2 and jkid=" . $jkid;
		}
		mysql_query('start transaction');
		mysql_query($sqlstr);
	}

    //return 	$sqlstr;

		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}

}

function cptzdywshsave()
{
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$loc = $_GET['loc'];
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
    $s = base64_decode($str);
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$tzid = $o['tzid'];
	
		mysql_query('start transaction');
		
		
	if ($loc=="ok"){
		$sqlstr = " update cptzd set ztbz=1";
		$sqlstr .= ",shr='" . $shr . "' ,shrq=now() where  ztbz=0 and delbz=0 and tzid=" . $tzid;
	
		
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cptzdjestr = " update cptzdje set gs='" . $row['gs'] . "'";
			$cptzdjestr .= ",byg='" . $row['byg'] . "'";
			$cptzdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cptzdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
			//	return '商品数据保存失败!!' . $cptzdjestr;
				break;
			}
		}
	}else{
		 if ($loc=="cancel"){
			$tzid = $_GET['data'];
			$sqlstr = " update cptzd set ztbz=0";
			$sqlstr .= ",shr='" . $shr . "',shrq=now()  where  delbz=0 and ztbz=1 and tzid=" . $tzid;

		 }
		 else{
			$sqlstr = " update cptzd set delbz=1";
			$sqlstr .= ",shr='" . $shr . "',shrq=now()  where  delbz=0 and ztbz=0 and tzid=" . $tzid;
		 }
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
		//	return '数据保存失败!' . $sqlstr;
		}
	}	
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}

function cpjkdckshsave()
{
		$loc = $_GET['loc'];
		$s = base64_decode($_GET['userInfo']);
		$o = json_decode($s);
		$o = json_decode($o, true);
    	//$shr =$o['username'] ;
		$shr =$_SESSION['LoginUserName'];
		$shr =$o['username'] ;
	if ($loc=="ok"){	
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];  
    $s = base64_decode($str);
	//return $s;
     $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$jkid = $o['jkid'];
		
		
		//$shr = $o['shr'];
		//$jkid = $_GET['loc'];
		$sqlstr = " update cpjkd set ztbz=1 ,shrq=now()";
		$sqlstr .= ",cgy='" . $shr . "' where  ztbz=0 and delbz=0 and jkid=" . $jkid;
		mysql_query('start transaction');
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpjkdjestr = " update cpjkdje set gs='" . $row['gs'] . "'";
			$cpjkdjestr .= ",byg='" . $row['byg'] . "'";
			$cpjkdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpjkdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '{result:"fail",msg:"商品数据保存失败!"}';
				//return '商品数据保存失败!!' . $cpjkdjestr;
				break;
			}
		}
		}
		else
		{
			$jkid = $_GET['data'];
			$sqlstr = " update cpjkd set delbz=1,shrq=now(),cgy='".$shr."' where delbz=0 and  ztbz=0 and jkid=" . $jkid;
			mysql_query('start transaction');
			mysql_query($sqlstr);
			
		}
		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败!"}';
		//	return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}

}
function cpjkdshsave()
{
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$o['username'] ;
	//$shr =$_SESSION['LoginUserName'];
//return $shr.' --  '.$_SESSION['LoginUserName'].'=='.$o['username'];
				

	if ($loc=="ok"){
		$str = $_GET['data'];
    	$L_id = $_GET['p_l_id'];
		
		
		  
    	$s = base64_decode($str);
		$o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$jkid = $o['jkid'];
		//$shr = $o['shr'];
		
		$sqlstr = " update cpjkd set ztbz=2,shrq=now()";
		$sqlstr .= ",shr='" . $shr . "' where  ztbz<2 and delbz=0 and jkid=" . $jkid;
		mysql_query('start transaction');
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
		//	return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpjkdjestr = " update cpjkdje set gs='" . $row['gs'] . "'";
			$cpjkdjestr .= ",byg='" . $row['byg'] . "'";
			$cpjkdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpjkdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
					return '{result:"fail",msg:"商品数据保存失败!"}';
				//return '商品数据保存失败!!' . $cpjkdjestr;
				break;
			}
		}


	}else
	{
		$jkid = $_GET['data'];
		$sqlstr = " update cpjkd set delbz=1,shrq=now(),shr='".$shr."' where delbz=0 and  ztbz<2 and jkid=" . $jkid;
		mysql_query('start transaction');
		mysql_query($sqlstr);
		  
	}


		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
				return '{result:"fail",msg:"数据保存失败!"}';
			//return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}

}

function wxcpgfddeletesave()
{
	/*
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
	$shr =$o['username'] ;
	*/
		$gfid = $_GET['data'];
		$sqlstr = " delete from wxcpgfd  where gfid =" . $gfid;
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			return '{result:"fail",msg:"数据删除失败!"}';
		}
		else 
		{
			return '{result:"success"}';
		}

}
/*
function cpjkdshsave()
		{
		$jkid = $_GET[
	'data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$o['username'] ;
	if ($loc=="ok"){	
		$sqlstr = " update cpjkd set ztbz=2";
	}else
	{
		$sqlstr = " update cpjkd set delbz=1";
	}
		$sqlstr .= " ,shrq=NOW(), shr='".$shr."' where  ztb<2 and delbz=0 and jkid=".$jkid;
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}

function cptzdshsave()
{
	$tzid = $_GET['data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$o['username'] ;
	if ($loc=="ok"){	
		$sqlstr = " update cptzd set ztbz=1";
	}else
	{
		$sqlstr = " update cptzd set delbz=1";
	}
		$sqlstr .= " ,shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and tzid=".$tzid;
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}
  */
function cptzdcwshsave()
{
	$tzid = $_GET['data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	if ($loc=="ok"){	
		$sqlstr = " update cptzd set ztbz=2";
		$sqlstr .= " ,cwshrq=NOW(), cwsh='".$shr."' where  ztbz=1 and delbz=0  and tzid=".$tzid;
	}else
	{
		if ($loc=="cancel"){	
			$sqlstr = " update cptzd set ztbz=1";
			$sqlstr .= " ,cwshrq=NOW(), cwsh='".$shr."' where  ztbz=2 and delbz=0  and tzid=".$tzid;
		}
		else
		{
			$sqlstr = " update cptzd set delbz=1";
			$sqlstr .= " ,cwshrq=NOW(), cwsh='".$shr."' where  ztbz=1 and delbz=0  and tzid=".$tzid;
		}
	}
	
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}
function cpjkdcwshsave_()
{
	$jkid = $_GET['data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	//return $shr.'=='.$o['username'].'   -- '.base64_decode($_SESSION['LoginUserName']);
	//if ($loc=="ok"){	
		$sqlstr = " update cpjkd set ztbz=3";
	//}else
//	{
	//	$sqlstr = " update cpjkd set delbz=1";
//	}
		$sqlstr .= " ,cwshrq=NOW(), cwsh='".$shr."' where  ztbz=2 and jkid=".$jkid;
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"数据保存失败!"}';
		//return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}
/*
function cpckdshsave()
{
	$ckid = $_GET['data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	
 * if ($loc=="ok"){	
		$sqlstr = " update cpckd set ztbz=1";
	}else
	{
		$sqlstr = " update cpckd set delbz=1";
	}
	$sqlstr .= " ,shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and ckid=".$ckid;
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}*/
/*
function cpckdckshsave_OLD()
{
			
	$str = $_GET['data'];
    $L_id = $_GET['p_l_id'];
	$loc = $_GET['loc'];
	
	  
         $s = base64_decode($str);
	
        $o = json_decode($s);
		$o = json_decode($o, true);
		$gsby = $o['gsby'];
		$ckid = $o['ckid'];
		$shr = $o['shr'];
	 mysql_query('start transaction');
	 
	if ($loc=="ok"){
			
		$sqlstr = " update cpckd set ztbz=1";
		$sqlstr .= ",cgy='" . $shr . "' where  ztbz=0 and delbz=0 and ckid=" . $ckid;
		
		mysql_query($sqlstr);
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '数据保存失败!' . $sqlstr;
		}
		foreach ($gsby as $row) {
			$cpckdjestr = " update cpckdje set gs='" . $row['gs'] . "'";
			$cpckdjestr .= ",byg='" . $row['byg'] . "'";
			$cpckdjestr .= ",cg='" . $row['cg'] . "' where jeid=" . $row['jeid'];
			mysql_query($cpckdjestr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '商品数据保存失败!!' . $cpckdjestr;
				break;
			}
		}
		}
		else
		{
			$sqlstr = " update cpckd set delbz=1";
			$sqlstr .= ",shr='" . $shr . "' where  ztbz=1 and delbz=0 and ckid=" . $ckid;
			mysql_query($sqlstr);
			if (mysql_errno() > 0) {
				mysql_query('rollback');
				return '数据保存失败!' . $sqlstr;
			}
		}	

		mysql_query('commit');
		if (mysql_errno() > 0) {
			mysql_query('rollback');
			return '数据保存失败!!!';
		} else {
			return '{result:"success"}';
		}
}
*/
function cpckdcwshsave_old()
{
	$ckid = $_GET['data'];
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	//if ($loc=="ok"){	
		$sqlstr = " update cpckd set ztbz=3";
	//}else
	//{
	//	$sqlstr = " update cpckd set delbz=1";
	//}
	$sqlstr .= " ,cwshrq=NOW(), cwsh='".$shr."' where  ztbz=2  and ckid=".$ckid;
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"数据保存失败!"}';
	//	return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}

function cpxsdshsave()
{
	$xsid = $_GET['data'];
	
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	if ($loc=="ok"){	
		$sqlstr = " update cpxsd set ztbz=1";
		$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and xsid=".$xsid;
	}else
	{
		if ($loc=="lastdel")
		{	 
			$sqlstr = " update cpxsd set delbz=1";
			$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  ztbz>0 and delbz=0 and xsid=".$xsid;
		}
		else
		{
			$sqlstr = " update cpxsd set delbz=1";
			$sqlstr .= ",shrq=NOW(), shr='".$shr."' where  ztbz=0 and delbz=0 and xsid=".$xsid;
		}
	}
		
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"数据保存失败!"}';
	//	return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}
function cpghdshsave()
{
	$xsid = $_GET['data'];
	
	$loc = $_GET['loc'];
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	if ($loc=="ok"){	
		$sqlstr = " update wxcpghd set ztbz=1";
		$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  ztbz=0 and delbz=0 and ghid=".$xsid;
	}else
	{
		if ($loc=="lastdel")
		{	 
			$sqlstr = " update wxcpghd set delbz=1";
			$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  ztbz>0 and delbz=0 and ghid=".$xsid;
		}
		else
		{
			$sqlstr = " update wxcpghd set delbz=1";
			$sqlstr .= ",khshrq=NOW(), khshr='".$shr."' where  ztbz=0 and delbz=0 and ghid=".$xsid;
		}
	}
		
	mysql_query($sqlstr);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"数据保存失败!"}';
	//	return '数据保存失败!!!'.$sqlstr;
	} 
	else 
	{
		return '{result:"success"}';
	}
}

function test() {
	$str=$_GET['data'];
	$s=base64_decode($str);
	$o=json_decode($s);
	$o=json_decode($o,true);
	return json_encode($o);
}

function save_type_test() {
$str =
"id=" . $_POST['id'] . "  T_code=" . $_POST['T_code'] . "  T_name=" . $_POST['T_name'] . " Active= " . $_POST['Active'];
$result = array();
$result['success'] = true;
$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
//$result['data'] = array('id' => 1, 'msg' => '数据查询操作失败！');
//$result['success'] = true;
//$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));

return urldecode(json_encode($result));
}

//******************************************************/

function decrypt($string) {
$key = md5('18165608618');
$string = base64_decode($string);
$len = strlen($key);
$code = '';
for ($i = 0; $i < strlen($string); $i++) {
$k = $i % $len;
$code .= $string[$i] ^ $key[$k];
}
return base64_decode($code);
}

function object_to_array($obj) {
$_arr = is_object($obj) ? get_object_vars($obj) : $obj;
foreach ($_arr as $key => $val) {
$val = (is_array($val)) || is_object($val) ? object_to_array($val) : $val;
$arr[$key] = $val;
}
return $arr;
}

//**     pc function start      **/////

function locationsave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into location(L_code,E_code,L_name,L_shortname,Address,Tel) values('" . $arr['L_code'] . "'";
$sql .= ",'" . $arr['E_code'] . "'";
$sql .= ",'" . $arr['L_name'] . "'";
$sql .= ",'" . $arr['L_shortname'] . "'";
$sql .= ",'" . $arr['Address'] . "'";
$sql .= ",'" . $arr['Tel'] . "')";
break;
case 2 :
//delete
$sql = "delete from location where L_id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['Address'];
if (isset($str)) {
$sql .= ",Address='" . $str . "'";
}
$str = $arr['Tel'];
if (isset($str)) {
$sql .= ",Tel='" . $str . "'";
}
$str = $arr['L_code'];
if (isset($str)) {
$sql .= ",L_code='" . $str . "'";
}
$str = $arr['L_name'];
if (isset($str)) {
$sql .= ",L_name='" . $str . "'";
}

$str = $arr['L_shortname'];
if (isset($str)) {
$sql .= ",L_shortname='" . $str . "'";
}

$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}

$sql = "update location set " . substr($sql, 1) . " where L_id=" . $arr['id'];
break;
}

$sq .= $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
//return $sql;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function cktjjdsavenew() {
	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $jby =$_SESSION['LoginUserName'] ;
	$jby =$o['username'] ;
	$l_id = $_GET['p_l_id'];
	$ny = $_GET['ny'];
	$yu = $_GET['yu'];
	$sql = "call cpjxc(" . $l_id.",".$ny.",".$yu.",'".$jby."')";
//	return $sql;
	mysql_query($sql);
	if (mysql_errno() > 0) {
		return '{result:"fail",msg:"月度数据统计失败！!"}';
	}
	return '{result:"success"}';
}


function cktjjdsave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}

$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');


foreach ($params as $arr) {
	$sql = ",rq=now()";
	$str = $arr['status'];
	if (isset($str)) {
		$sql .= ",status=" . $str ;
	}	
	$str = $arr['jby'];
	if (isset($str)) {
		$sql .= ",jby='" . $str . "'";
	}

	$sql = "update sys_tjjd set  " . substr($sql, 1) . " where id=" . $arr['id'];
	$sq .= $sql;
	mysql_query($sql);

	if (mysql_errno() > 0) {
	$error = 'yes';
	break;
	}
}

//mysql_query('commit');
//return $sql;
if ($error == 'yes') {
	mysql_query('rollback');
	return '{result:"fail",msg:"数据保存失败！!"}';
	//return '数据保存失败！!';
} else {
	mysql_query('commit');
	return '{result:"success"}';
}

return $sql;

}


function customersave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}
$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {
//return $arr['id'];
switch ($optype) {

case 1 :
//insert

$Active =1;
	if (isset($_GET["active"]))
	{
     $Active=$_GET['active'];
	}
$str = $arr['Aloneprice'];
if (isset($str)) {
	if ($str) {
		$Aloneprice=1;
	} else {
	$Aloneprice=0;
	}
}


$sql = "insert into Customer(C_code,L_id,C_name,Address,Tel,smsphone,Py_code,password,C_shortname,Aloneprice,Active) values('" . $arr['C_code'] . "'";
$sql .= "," . $arr['L_id'];
$sql .= ",'" . $arr['C_name'] . "'";
$sql .= ",'" . $arr['Address'] . "'";
$sql .= ",'" . $arr['Tel'] . "'";
$sql .= ",'" . $arr['smsphone'] . "'";
$sql .= ",'" . $arr['Py_code'] . "'";
$sql .= ",'" . base64_encode('8888') . "'";
$sql .= ",'" . $arr['C_shortname'] . "'";
$sql .= "," . $Aloneprice ;
$sql .= "," . $Active . ")";

break;
case 2 :
//delete
$sql = "delete from Customer where C_id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['Address'];
if (isset($str)) {
$sql .= ",Address='" . $str . "'";
}

$str = $arr['Tel'];
if (isset($str)) {
$sql .= ",Tel='" . $str . "'";
}
$str = $arr['smsphone'];
if (isset($str)) {
$sql .= ",smsphone='" . $str . "'";
}

$str = $arr['C_code'];
if (isset($str)) {
$sql .= ",C_code='" . $str . "'";
}
$str = $arr['C_name'];
if (isset($str)) {
$sql .= ",C_name='" . $str . "'";
}
$str = $arr['C_shortname'];
if (isset($str)) {
$sql .= ",C_shortname='" . $str . "'";
}
$str = $arr['Py_code'];
if (isset($str)) {
$sql .= ",Py_code='" . $str . "'";
}
$str = $arr['password'];
if (isset($str)) {
$sql .= ",password='" . $str . "'";
}
$str = $arr['Active'];
if (isset($str)) {
	if ($str) {
		$sql .= ",Active=1";
	} else {
	$sql .= ",Active=0";
	}
}
$str = $arr['Aloneprice'];
if (isset($str)) {
	if ($str) {
		$sql .= ",Aloneprice=1";
	} else {
	$sql .= ",Aloneprice=0";
	}
}
$sql = "update Customer set " . substr($sql, 1) . " where C_id=" . $arr['id'];
break;
}

$sq .= $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
// return $sql.'----'.mysql_errno() ;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function commoditysave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}
$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into commodity(S_code,CT_id,S_name) values('" . $arr['S_code'] . "'";
$sql .= "," . $arr['CT_id'];
$sql .= ",'" . $arr['S_name'] . "')";
//$sql .= ",'" . $arr['Quantity_Unit'] . "'";
//$sql .= ",'" . $arr['Weight_Unit'] . "'";
//$sql .= ",'" . $arr['Size'] . "'";
//$sql .= "," . $arr['Rate'] . ")";

break;
case 2 :
//delete
$sql = "delete from commodity where S_id=" . $arr['id'];
break;
default :
$sql = "";

/*$str = $arr['Quantity_Unit'];
if (isset($str)) {
$sql .= ",Quantity_Unit='" . $str . "'";
}
$str = $arr['Weight_Unit'];
if (isset($str)) {
$sql .= ",Weight_Unit='" . $str . "'";
}
$str = $arr['Size'];
if (isset($str)) {
$sql .= ",Size='" . $str . "'";
}*/

$str = $arr['S_code'];
if (isset($str)) {
$sql .= ",S_code='" . $str . "'";
}
$str = $arr['S_name'];
if (isset($str)) {
$sql .= ",S_name='" . $str . "'";
}
//$str = $arr['Rate'];
//if (isset($str)) {
//	$sql .= ",Rate=" . $str;
//}
$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}

$sql = "update commodity set " . substr($sql, 1) . " where S_id=" . $arr['id'];
break;
}

$sq .= $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
//return $sql.'----'.mysql_errno() ;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function userssave($optype) {
	$error = '';
	$raw = '';
	$sq = '';
	

	
	$table=$_GET['table'];
	$fp = fopen('php://input', 'r');
	while ($kb = fread($fp, 1024)) {
		$raw .= $kb;
	}
	$params = json_decode($raw, true);
	if (count($params) && !isset($params[0])) {
		$params = array($params);
	}

	
	$sql = '';
	mysql_query('start transaction');
	
	foreach ($params as $arr) {
		
	 switch ($optype) 
	 {
	 case 1 :
		if ($table=="khusers"){
			$sql = "insert into khusers(khid,edit,sh,cwsh,del,new,system,usercode,username,tel,smsphone,sfjhm,qqnumber,
			wxnumber,wxname,lastdel) values(" . $arr['khid'] ;
			$str = $arr['edit'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}
			$str = $arr['sh'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}
			$str = $arr['cwsh'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}
		
			$str = $arr['del'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}

			$str = $arr['new'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}

			$str = $arr['system'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
		 		}
			}

			//	$sql .= "," . $arr['edit'];
			//	$sql .= "," . $arr['sh'];
		} 
		else {
			$e_code=$_GET['p_e_code'];
			$sql = "insert into users(typeid,e_code,lidstring,usercode,username,tel,smsphone,sfjhm,qqnumber,
			wxnumber,wxname,lastdel) values(" . $arr['typeid'];
			$sql .= ",'" . $e_code."'";
			$sql .= ",'" . $arr['lidstring']."'";
	    }
			$sql .= ",'" . $arr['usercode'] . "'";
			$sql .= ",'" . $arr['username'] . "'";
			$sql .= ",'" . $arr['tel'] . "'";
			$sql .= ",'" . $arr['smsphone'] . "'";
			$sql .= ",'" . $arr['sfjhm'] . "'";
			$sql .= ",'" . $arr['qqnumber'] . "'";
			$sql .= ",'" . $arr['wxnumber'] . "'";
			$sql .= ",'" . $arr['wxname'] . "'";
			$str = $arr['lastdel'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";
				} else {
					$sql .= ",0";
				}
			}

			$sql.= ')';
            break;			
	case 2 :
	
	 if ($table=="khusers"){
			$sql = "delete from khusers where userid=" . $arr['id'];
		} 
		else {
			$sql = "delete from users where userid=" . $arr['id'];
		}
		break;
		
          
    
default:		 
		$sql = "";
		$str = $arr['usercode'];
		if (isset($str)) {
			$sql .= ",usercode='" . $str . "'";
		}
		$str = $arr['username'];
		if (isset($str)) {
			$sql .= ",username='" . $str . "'";
		}
		$str = $arr['sfjhm'];
		if (isset($str)) {
			$sql .= ",sfjhm='" . $str . "'";
		}
	
		$str = $arr['tel'];
		if (isset($str)) {
			$sql .= ",tel='" . $str . "'";
		}
		$str = $arr['smsphone'];
		if (isset($str)) {
			$sql .= ",smsphone='" . $str . "'";
		}
	
		$str = $arr['qqnumber'];
		if (isset($str)) {
			$sql .= ",qqnumber='" . $str . "'";
		}
	
		$str = $arr['wxnumber'];
		if (isset($str)) {
			$sql .= ",wxnumber='" . $str . "'";
		}
	
		$str = $arr['wxname'];
		if (isset($str)) {
			$sql .= ",wxname='" . $str . "'";
		}
		$str = $arr['password'];
		if (isset($str)) {
			$sql .= ",password='" . $str . "'";
		}

		$str = $arr['lidstring'];
		if (isset($str)) {
			$sql .= ",lidstring='" . $str . "'";
		}
		$str = $arr['lastdel'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",lastdel=1";
			} else {
				$sql .= ",lastdel=0";
			}
		}
		$str = $arr['smsactive'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",smsactive=1";
			} else {
				$sql .= ",smsactive=0";
			}
		}
			
		$str = $arr['active'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",active=1";
			} else {
				$sql .= ",active=0";
			}
		}
		$str = $arr['locked'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",locked=1";
			} else {
				$sql .= ",locked=0";
			}
		}
    
	    if ($table=="khusers"){
	    	
		$str = $arr['edit'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",edit=1";
			} else {
				$sql .= ",edit=0";
			}
		}
        $str = $arr['sh'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",sh=1";
			} else {
				$sql .= ",sh=0";
			}
		}
        $str = $arr['cwsh'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",cwsh=1";
			} else {
				$sql .= ",cwsh=0";
			}
		}
        $str = $arr['new'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",new=1";
			} else {
				$sql .= ",new=0";
			}
		}
		
        $str = $arr['del'];
		if (isset($str)) {
			if ($str) {
				$sql .= ",del=1";
			} else {
				$sql .= ",del=0";
			}
		}
			
		$sql = "update khusers set " . substr($sql, 1) . " where userid=" . $arr['id'];
			
		} 
		else {
			$sql = "update users set " . substr($sql, 1) . " where userid=" . $arr['id'];
		}
		break;
	 }
	
		//return $sql; 
		mysql_query($sql);
		if (mysql_errno() > 0) {
			$error = 'yes';
			break;
		
		}
		}
	if ($error == 'yes') 
	    {
			mysql_query('rollback');
			return '{result:"fail",msg:"数据保存失败！!"}';
			//return '数据保存失败！!'.$sql;
		} 
		else 
		{
			mysql_query('commit');
			return '{result:"success"}';
	    }
	return $sql;
}


function producessave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into produces(P_code,E_code,Py_code,P_name,Address,Tel) values('" . $arr['P_code'] . "'";
$sql .= ",'" . $arr['E_code'] . "'";
$sql .= ",'" . $arr['Py_code'] . "'";
$sql .= ",'" . $arr['P_name'] . "'";
$sql .= ",'" . $arr['Address'] . "'";
$sql .= ",'" . $arr['Tel'] . "')";
break;
case 2 :
//delete
$sql = "delete from produces where P_id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['Address'];
if (isset($str)) {
$sql .= ",Address='" . $str . "'";
}
$str = $arr['Tel'];
if (isset($str)) {
$sql .= ",Tel='" . $str . "'";
}
$str = $arr['P_code'];
if (isset($str)) {
$sql .= ",P_code='" . $str . "'";
}
$str = $arr['Py_code'];
if (isset($str)) {
$sql .= ",Py_code='" . $str . "'";
}

$str = $arr['P_name'];
if (isset($str)) {
$sql .= ",P_name='" . $str . "'";
}
$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}

$sql = "update produces set " . substr($sql, 1) . " where P_id=" . $arr['id'];
break;
}

$sq .= $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
//return $sql;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function jobssave($optype) {
	//0 update 1 add 2 delete
	
	$error = '';
	$raw = '';
	$sq = '';
	$fp = fopen('php://input', 'r');
	while ($kb = fread($fp, 1024)) {
	$raw .= $kb;
	}
	
	$params = json_decode($raw, true);
	if (count($params) && !isset($params[0])) {
	$params = array($params);
	}
	
	$sql = '';
	mysql_query('start transaction');
	foreach ($params as $arr) {


		$sql = "";
		$str = $arr['Tcdj'];
		if (isset($str)) {
			$sql .= ",Tcdj=" . $str;
		}
		$str = $arr['Tcdj1'];
		if (isset($str)) {
			$sql .= ",Tcdj1=" . $str;
		}
		
		$sql = "update jobs set " . substr($sql, 1) . " where id=" . $arr['id'];
	
	
		$sq .= $sql;
		mysql_query($sql);
	
		if (mysql_errno() > 0) {
			$error = 'yes';
			break;
		}
	}
	
	//mysql_query('commit');
	//return $sql;
	if ($error == 'yes') {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败！!"'.$sq.'}';
		//return '数据保存失败！!';
	} else {
		mysql_query('commit');
		return '{result:"success"}';
	}
	
	return $sql;
	
	}

function typesave($optype) {
//0 update 1 add 2 delete

$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into type(E_code,T_code,T_name) values('" . $arr['E_code'] . "'";
$sql .= ",'" . $arr['T_code'] . "'";
$sql .= ",'" . $arr['T_name'] . "')";

break;
case 2 :
//delete
$sql = "delete from type where T_id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['T_code'];
if (isset($str)) {
$sql .= ",T_code='" . $str . "'";
}
$str = $arr['T_name'];
if (isset($str)) {
$sql .= ",T_name='" . $str . "'";
}
$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}

$sql = "update type set " . substr($sql, 1) . " where T_id=" . $arr['id'];
break;
}

//return $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//	return $sql;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function commoditytypesave($optype) {
$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}
$str = $params[0]['Address'];

$sql = '';
mysql_query('start transaction');

foreach ($params as $arr) {
switch ($optype) {
case 1 :
//insert
$sql = "insert into CommodityType(T_id,CT_code,CT_name) values(" . $arr['T_id'];
$sql .= ",'" . $arr['CT_code'] . "'";
$sql .= ",'" . $arr['CT_name'] . "')";

break;
case 2 :
//delete
$sql = "delete from CommodityType where CT_id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['CT_code'];
if (isset($str)) {
$sql .= ",CT_code='" . $str . "'";
}
$str = $arr['CT_name'];
if (isset($str)) {
$sql .= ",CT_name='" . $str . "'";
}
$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}

$sql = "update CommodityType set " . substr($sql, 1) . " where CT_id=" . $arr['id'];
break;
}

$sq .= $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
//return $sql;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function commoditytypeupdate() {

$error = '';
$raw = '';
$sql = '';
$id = (int)$_POST['id'];
$update = $_POST['update'];
$table = $_POST['table'];
if ($update == "delete") {
if ($table == 'type') {
$sql = "delete from type where T_id=" . $id;
} else {
$sql = "delete from commoditytype where CT_id=" . $id;
}
} else {

$E_code = $_POST['E_code'];

$T_id = (int)$_POST['T_id'];
$code = $_POST['code'];
$name = $_POST['name'];
$Active = $_POST['Active'];
//return $Active;
if ($table == 'type') {
if ($id < 1) {
$sql = "insert into type (E_code,T_code,T_name) values ('" . $E_code . "','" . $code . "','" . $name . "')";
} else {

$sql = "update type  set T_code='" . $code . "',T_name='" . $name . "'";
if ($Active == "on") {
$sql = $sql . ",Active=1";
} else {
$sql = $sql . ",Active=0";
}
$sql = $sql . " where T_id=" . $id;

}

} else {
if ($id < 1) {
$sql = "insert into commoditytype (T_id,CT_code,CT_name) values (" . $T_id . ",'" . $code . "','" . $name . "')";

} else {

$sql = "update commoditytype  set CT_code='" . $code . "',CT_name='" . $name . "'";
if ($Active == "on") {
$sql = $sql . ",Active=1";
} else {
$sql = $sql . ",Active=0";
}
$sql = $sql . " where CT_id=" . $id;

}

}
}
//return $sql;
$result = array();
mysql_query($sql);
if (mysql_errno() > 0) {
$result['success'] = false;
$result['data'] = array('id' => 1, 'msg' => urlencode('数据保存失败！！' . $sql));

} else {
$result['success'] = true;
$result['data'] = array('id' => 0, 'msg' => urlencode('数据保存成功！'));

}
return urldecode(json_encode($result));
}



function cwsjupdate() {
$error = '';
$raw = '';
$sql = '';
$loc =$_GET['loc'];


if ($loc=='sjsh')
{

	$s = base64_decode($_GET['userInfo']);
	$o = json_decode($s);
	$o = json_decode($o, true);
    $shr =$_SESSION['LoginUserName'] ;
	$shr =$o['username'] ;
	$sjid = $_GET['data'];
	
	$sql = "update cwsj set shzt=1,shrq=now(),shr='".$shr."' where shzt=0 and sjid=".$sjid;

	mysql_query($sql);


if (mysql_errno() > 0) {
	return '{result:"fail",msg:"数据保存失败！!"}';
	//return '数据保存失败！！';    
}
return '{result:"success"}';




}
else
{


$id = (int)$_POST['id'];
$E_code = $_POST['p_e_code'];
$l_id = $_POST['p_l_id'];
$sjrq = $_POST['sjrq'];

     $my_date =new DateTime($sjrq );
     $my_year =substr( $my_date ->format("Y"),2,2);  
	 $my_month = $my_date ->format("m");  
     $my_year=$my_year.$my_month;

	$dhsql="select setdh('".$l_id."',".$my_year.",'') as dh ";
	$result0 = mysql_query($dhsql);
	$arr=mysql_fetch_assoc($result0);
	$dh =$arr['dh'];


$srje = (float)$_POST['srje'];
$jcje = (float)$_POST['jcje'];

$khmc = $_POST['khmc'];
$cwzy = $_POST['cwzy'];
$czy = $_POST['czy'];
$cnote = $_POST['cnote'];
$sql = "insert into cwsj (sjdh,E_code,sjrq,khmc,cwzy,srje,jcje,l_id,cnote,czy) values ('" . $dh . "','". $E_code . "','" . $sjrq . "','" . $khmc . "'";
$sql .= ",'".$cwzy."'";
$sql .= ",".$srje;
$sql .= ",".$jcje;
$sql .= ",".$l_id;
$sql .= ",'".$cnote."'";
$sql .= ",'".$czy."')";
}


mysql_query($sql);

$result['success'] = true;
if (mysql_errno() > 0) {
	$result['success'] = false;
	$result['data'] = array('id' => 1, 'msg' => urlencode('数据保存失败！！' . $sql));

} else {

	$result['data'] = array('id' => 0, 'msg' => urlencode('数据保存成功！'));
}
return urldecode(json_encode($result));
}







function cpkccwedit() {
	$error = '';
	$sql = '';





$kcmxid = (int)$_POST['kcmxid'];
$E_code = $_POST['p_e_code'];
$l_id = $_POST['p_l_id'];
$rq = $_POST['rq'];


$sl = (float)$_POST['newsl'];
$zl = (float)$_POST['newzl'];

$newcw = $_POST['newcw'];
$newsm = $_POST['newsm'];
$oldArea = $_POST['oldArea'];
$area = $_POST['area'];

$cw = $_POST['cw'];
$sm = $_POST['sm'];

$czy = $_POST['czy'];


/*$sql = "insert into cpkccwedit(rq,cw,sm,newcw,newsm,sl,zl,kcmxid,czy) values ('" . $rq . "','". $cw . "','" . $sm . "','" . $newcw . "'";
$sql .= ",'".$newsm."'";
$sql .= ",".$sl;
$sql .= ",".$zl;
$sql .= ",".$kcmxid;
$sql .= ",'".$czy."')";
*/

$sql = "insert into cpkccwedit(rq,cw,sm,newcw,newsm,oldArea,area,sl,zl,kcmxid,czy) values ('" . $rq . "','". $cw . "','" . $sm . "','" . $newcw . "'";
$sql .= ",'".$newsm."'";
$sql .= ",'".$oldArea."'";
$sql .= ",'".$area."'";
$sql .= ",".$sl;
$sql .= ",".$zl;
$sql .= ",".$kcmxid;
$sql .= ",'".$czy."')";



mysql_query($sql);

$result['success'] = true;
if (mysql_errno() > 0) {
	$result['success'] = false;
	$result['data'] = array('id' => 1, 'msg' => urlencode('数据保存失败！！' . $sql));
} else {
	$result['data'] = array('id' => 0, 'msg' => urlencode('数据保存成功！'));
}
return urldecode(json_encode($result));
}






function usertypeupdate() {

$error = '';
$raw = '';
$sql = '';
$id = (int)$_POST['id'];
$update = $_POST['update'];
//return $id ;
	if ($update == "delete") {
		$sql = "delete from usertype where typeid=" . $id;
	} else {

		$E_code = $_POST['E_code'];
		$code = $_POST['code'];
		$name = $_POST['typename'];
		$new = $_POST['new'];
		$edit = $_POST['edit'];
		$del = $_POST['del'];
		$sh = $_POST['sh'];
		$cwsh = $_POST['cwsh'];
		$menustring = $_GET['menustring'];
        $wxmenustring=$_GET['wxmenustring'];
	
		if ($id < 1) 
		{
			$sql = "insert into usertype (E_code,code,menustring,wxmenustring,typename,new,del,edit,sh,cwsh) values ('" . $E_code . "','" . $code . "','". $menustring. "','". $WXmenustring . "','" . $name . "'";
			if ($new == "on") {
				$sql = $sql . ",1";
			} else {
				$sql = $sql . ",0";
			}
			
			if ($del == "on") {
				$sql = $sql . ",1";
			} else {
				$sql = $sql . ",0";
			}
			if ($edit == "on") {
				$sql = $sql . ",1";
			} else {
				$sql = $sql . ",0";
			}
			if ($sh == "on") {
				$sql = $sql . ",1";
			} else {
				$sql = $sql . ",0";
			}
			if ($cwsh == "on") {
				$sql = $sql . ",1";
			} else {
				$sql = $sql . ",0";
			}
			
			$sql = $sql . ")";
			
			
		}
		else
		{
			$sql = "update usertype  set code='" . $code . "',typename='" . $name . "'";
			$sql = $sql . ",menustring='".$menustring."'";
			$sql = $sql . ",wxmenustring='".$wxmenustring."'";
			if ($new == "on") {
				$sql = $sql . ",new=1";
			} else {
				$sql = $sql . ",new=0";
			}
			
			if ($del == "on") {
				$sql = $sql . ",del=1";
			} else {
				$sql = $sql . ",del=0";
			}
			if ($edit == "on") {
				$sql = $sql . ",edit=1";
			} else {
				$sql = $sql . ",edit=0";
			}
			if ($sh == "on") {
				$sql = $sql . ",sh=1";
			} else {
				$sql = $sql . ",sh=0";
			}
			if ($cwsh == "on") {
				$sql = $sql . ",cwsh=1";
			} else {
				$sql = $sql . ",cwsh=0";
			}
			
			$sql = $sql . " where typeid=" . $id;
		}
	}
//return $sql;
	$result = array();
	mysql_query($sql);
	if (mysql_errno() > 0) {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据保存失败！！' . $sql));
	} else {
		$result['success'] = true;
		$result['data'] = array('id' => 0, 'msg' => urlencode('数据保存成功！'));
	}
	return urldecode(json_encode($result));
}













function packingsave($op) {
	$optype=$_GET['optype'];
	
	//$L_id=(int)$_GET['khid'];
	$error = '';
	$raw = '';
	$sq = '';
	$fp = fopen('php://input', 'r');
	while ($kb = fread($fp, 1024)) {
		$raw .= $kb;
	}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
	$params = array($params);
}

// $_POST['php_input'] = $raw;
// $params;

$sql = '';
mysql_query('start transaction');

foreach ($params as $arr) {

	switch ($op) {
	case 1 :
	//insert

		switch ($optype) {
			case "location" :
			$lid=$_GET['p_l_id'];
			$sql = "insert into packing_L (PS_id,L_id,mints,czts,Bytcdj,Bytcdjt,Gstcdj,Cgtcdj,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values(" . $arr['Pid'] ;
			$sql .= "," . $lid;
			$sql .= "," .$arr['mints'];
			$sql .= "," .$arr['czts'];		
			$sql .= "," .$arr['Bytcdj'];		
			$sql .= "," .$arr['Bytcdjt'];		
			$sql .= "," .$arr['Gstcdj'];		
			$sql .= "," .$arr['Cgtcdj'];		
			break;
			case "customer" :
			$lid=$_GET['p_l_id'];
			$khid=(int)$_GET['khid'];
			$sql = "insert into packing_kh (PS_id,khid,L_id,mints,czts,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values(" . $arr['Pid'] ;
			$sql .= "," . $khid;
			$sql .= "," . $lid;
			$sql .= "," .$arr['mints'];
			$sql .= "," .$arr['czts'];
			break;
			default :
			$sql = "insert into packing(PS_code,E_code,PS_name,Quantity_Unit,Weight_Unit,Rate,Bytcdj,Gstcdj,Cgtcdj,Weight_Status,flbz,xmlb,mints,czts,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values('" . $arr['PS_code'] . "'";
			$sql .= ",'" . $arr['E_code'] . "'";
			$sql .= ",'" . $arr['PS_name'] . "'";
			$sql .= ",'" . $arr['Quantity_Unit'] . "'";
			$sql .= ",'" . $arr['Weight_Unit'] . "'";
			$sql .= "," . $arr['Rate'];	
			$sql .= "," .$arr['Bytcdj'];		

			$sql .= "," .$arr['Gstcdj'];		
			$sql .= "," .$arr['Cgtcdj'];		

			$sql .= "," . $arr['Weight_Status'];	
			
			$str = $arr['Flbz'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";	
					
				   } else {
					$sql .= ",0";	
					  
				}
			}
            $str = $arr['Xmlb'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",1";	
					
				   } else {
					$sql .= ",0";	
					  
				}
			}
			//$sql .= "," . $arr['flbz'];	
			//$sql .= "," . $arr['Xmlb'];	
			$sql .= "," .$arr['mints'];
			$sql .= "," .$arr['czts'];
			break;
		}
		$sql .= "," . $arr['Czdj'];
		$sql .= "," . $arr['Phdj'];
		$sql .= "," . $arr['Czdj2'];
		$sql .= "," . $arr['Phdj2'];
		$sql .= "," . $arr['Pfdj'];
		$sql .= "," . $arr['Bydj'];
		$sql .= "," . $arr['Pbdj'];
		$sql .= "," . $arr['Ghdj'];
		$sql .= ")";
		
	    break;
	case 2 :
		//delete
		$sql = "delete from packing where PS_id=" . $arr['id'];
		break;
	default :
	
		$id=(int)$arr['id'];
		if ($id>0){ 
			$sql = "";
			$str = $arr['Quantity_Unit'];
			if (isset($str)) {
				$sql .= ",Quantity_Unit='" . $str . "'";
			}
			$str = $arr['Weight_Unit'];
			if (isset($str)) {
				$sql .= ",Weight_Unit='" . $str . "'";
			}
			$str = $arr['PS_code'];
			if (isset($str)) {
				$sql .= ",PS_code='" . $str . "'";
			}
			$str = $arr['PS_name'];
			if (isset($str)) {
				$sql .= ",PS_name='" . $str . "'";
			}
			$str = $arr['Rate'];
			if (isset($str)) {
				$sql .= ",Rate=" . $str;
			}
			$str = $arr['mints'];
			if (isset($str)) {
				$sql .= ",mints=" . $str;
			}
			$str	 = $arr['czts'];
			if (isset($str)) {
				$sql .= ",czts=" . $str;
			}
			$str = $arr['Czdj'];
			if (isset($str)) {
				$sql .= ",Czdj=" . $str;
			}
			$str	 = $arr['Phdj'];
			if (isset($str)) {
				$sql .= ",Phdj=" . $str;
			}
			$str = $arr['Czdj2'];
			if (isset($str)) {
				$sql .= ",Czdj2=" . $str;
			}
			$str = $arr['Phdj2'];
			if (isset($str)) {
				$sql .= ",Phdj2=" . $str;
			}
			$str = $arr['Pfdj'];
			if (isset($str)) {
				$sql .= ",Pfdj=" . $str;
			}
			$str = $arr['Bydj'];
			if (isset($str)) {
				$sql .= ",Bydj=" . $str;
			}
			$str = $arr['Pbdj'];
			if (isset($str)) {
				$sql .= ",Pbdj=" . $str;
			}
			$str = $arr['Ghdj'];
			if (isset($str)) {
				$sql .= ",Ghdj=" . $str;
			}
			$str = $arr['Weight_Status'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",Weight_Status=1";
				} else {
					$sql .= ",Weight_Status=0";
				}
			}
			$str = $arr['Active'];
			if (isset($str)) {
				if ($str) {
					$sql .= ",Active=1";
				} else {
					$sql .= ",Active=0";
				}
			}


			
		switch ($optype) {
			case "location" :
				//$lid=$_GET['p_l_id'];


				$str = $arr['Bytcdj'];
				if (isset($str)) {
					$sql .= ",Bytcdj=" . $str;
				}
	
				$str = $arr['Gstcdj'];
				if (isset($str)) {
					$sql .= ",Gstcdj=" . $str;
				}

				$str = $arr['Cgtcdj'];
				if (isset($str)) {
					$sql .= ",Cgtcdj=" . $str;
				}


				$sql = "update packing_L set " . substr($sql, 1) . " where id=" . $arr['id'];
			break;
			
			case "gfgl" :
				//$lid=$_GET['p_l_id'];


				$str = $arr['Bytcdj'];
				if (isset($str)) {
					$sql .= ",Bytcdj=" . $str;
				}

				$str = $arr['Bytcdjt'];
				if (isset($str)) {
					$sql .= ",Bytcdjt=" . $str;
				}

				$str = $arr['Gstcdj'];
				if (isset($str)) {
					$sql .= ",Gstcdj=" . $str;
				}

				$str = $arr['Cgtcdj'];
				if (isset($str)) {
					$sql .= ",Cgtcdj=" . $str;
				}


				$sql = "update packing_L set " . substr($sql, 1) . " where id=" . $arr['id'];
		    break;

			case "customer" :
				//$lid=$_GET['p_l_id'];
				$sql = "update packing_kh set " . substr($sql, 1) . " where khPS_id=" . $arr['id'];
   			break;
			default :
				$str = $arr['Xmlb'];
				if (isset($str)) {
	    			if ($str) {
		       			$sql .= ",Xmlb=1";
   					} else {
	      				$sql .= ",Xmlb=0";
    				}
				}
				
				$str = $arr['Flbz'];
				if (isset($str)) {
	    			if ($str) {
		       			$sql .= ",Flbz=1";
   					} else {
	      				$sql .= ",Flbz=0";
    				}
				}
				$str = $arr['Bytcdj'];
				if (isset($str)) {
					$sql .= ",Bytcdj=" . $str;
				}
	
				$str = $arr['Gstcdj'];
				if (isset($str)) {
					$sql .= ",Gstcdj=" . $str;
				}

				$str = $arr['Cgtcdj'];
				if (isset($str)) {
					$sql .= ",Cgtcdj=" . $str;
				}
				$sql = "update packing set " . substr($sql, 1) . " where PS_id=" . $arr['id'];	
		    break;
		}

			



		}else  
		{//id==0 insert 
		switch ($optype) {
			case "location" :
				$lid=$_GET['p_l_id'];
				$sql = "insert into packing_L (PS_id,L_id,Bytcdj,Gstcdj,Cgtcdj,mints,czts,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values(" . $arr['Pid'] ;
				$sql .= "," . $lid;
				$str = $arr['Bytcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}
			$str = $arr['Gstcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}
			$str = $arr['Cgtcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}
			break;
			case "gfgl" :
				$lid=$_GET['p_l_id'];
				$sql = "insert into packing_L (PS_id,L_id,Bytcdj,Bytcdjt,Gstcdj,Cgtcdj,mints,czts,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values(" . $arr['Pid'] ;
				$sql .= "," . $lid;

				$str = $arr['Bytcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}

			
			$str = $arr['Bytcdjt'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}

			$str = $arr['Gstcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}
			$str = $arr['Cgtcdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}
		    break;
			case "customer" :
				$lid=$_GET['p_l_id'];
				$khid=(int)$_GET['khid'];
				$sql = "insert into packing_kh (PS_id,Khid,L_id,mints,czts,Czdj,Phdj,Czdj2,Phdj2,Pfdj,Bydj,Pbdj,Ghdj) values(" . $arr['Pid'] ;
				$sql .= "," . $khid;
				$sql .= "," . $lid;
			   break;
			   default :
		   $sql = "";	
		   break;
		}
		
			$str = $arr['mints'];
			if (isset($str)) {
					$sql .= "," . $str;
			}else
			{
				$sql .= ",1" ;	
			}
			$str = $arr['czts'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{	
				$sql .= ",1" ;	
			}
			$str = $arr['Czdj'];
			if (isset($str)) {
					$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Phdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Czdj2'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Phdj2'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Pfdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Bydj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Pbdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			$str = $arr['Ghdj'];
			if (isset($str)) {
				$sql .= "," . $str;
			}else
			{
				$sql .= ",0" ;	
			}		
			
			$sql .= ")" ;	
		}
		break;
	}


	mysql_query($sql);
	if (mysql_errno() > 0) {
		return $sql;
		$error = 'yes';
		break;
		}
	}

	//mysql_query('commit');
	//return $sql;
	if ($error == 'yes') {
		mysql_query('rollback');
		return '{result:"fail",msg:"数据保存失败！!"}';
		//return '数据保存失败!!!'.$sql;
	} else {
		mysql_query('commit');
		return '{result:"success"}';
	}
	return $sql;

}

function worksave($optype) {
$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}

$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into work(E_code,Jobs,Jobsname,L_id,Unit_price,Bytcdj,Bytcdj2,Gstcdj,Cgtcdj,   Weight_status,Quantity_in,Price_in) values('" . $arr['E_code'] . "'";
$sql .= "," . $arr['Jobs'] ;
$sql .= ",'" . $arr['Jobsname'] . "'";
$sql .= "," . $arr['L_id'];
$sql .= "," . $arr['Unit_price'];
$sql .= "," . $arr['Bytcdj'];
$sql .= "," . $arr['Bytcdj2'];
$sql .= "," . $arr['Gstcdj'];
$sql .= "," . $arr['Cgtcdj'];

$sql .= "," . $arr['Weight_status'];

$str = $arr['Quantity_in'];
if (isset($str)) {
if ($str) {
	$sql .= ",1";
} else {
	$sql .= ",0";
}
}





$str = $arr['Price_in'];
if (isset($str)) {
if ($str) {
	$sql .= ",1)";
} else {
	$sql .= ",0)";
}
}

break;
case 2 :
//delete
$sql = "delete from work where id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['Jobs'];
if (isset($str)) {
$sql .= ",Jobs=" . $str ;
}
$str = $arr['Jobsname'];
if (isset($str)) {
$sql .= ",Jobsname='" . $str . "'";
}

$str = $arr['Unit_price'];
if (isset($str)) {
$sql .= ",Unit_price=" . $str;
}

$str = $arr['Bytcdj'];
if (isset($str)) {
$sql .= ",Bytcdj=" . $str;
}

$str = $arr['Bytcdj2'];
if (isset($str)) {
$sql .= ",Bytcdj2=" . $str;
}

$str = $arr['Gstcdj'];
if (isset($str)) {
$sql .= ",Gstcdj=" . $str;
}
$str = $arr['Cgtcdj'];
if (isset($str)) {
$sql .= ",Cgtcdj=" . $str;
}

$str = $arr['Weight_status'];
if (isset($str)) {
if ($str) {
$sql .= ",Weight_status=1";
} else {
$sql .= ",Weight_status=0";
}
}
$str = $arr['Quantity_in'];
if (isset($str)) {
if ($str) {
$sql .= ",Quantity_in=1";
} else {
$sql .= ",Quantity_in=0";
}
}
$str = $arr['Price_in'];
if (isset($str)) {
if ($str) {
$sql .= ",Price_in=1";
} else {
$sql .= ",Price_in=0";
}
}
$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}
$sql = "update work set " . substr($sql, 1) . " where id=" . $arr['id'];
break;
}

$sq .= $sql;
//return $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');
//return $sql;
if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!'.$sql.'"}';
//return '数据保存失败！!';
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

function workersave($optype) {
$error = '';
$raw = '';
$sq = '';
$fp = fopen('php://input', 'r');
while ($kb = fread($fp, 1024)) {
$raw .= $kb;
}
$params = json_decode($raw, true);
if (count($params) && !isset($params[0])) {
$params = array($params);
}

$sql = '';
mysql_query('start transaction');
foreach ($params as $arr) {

switch ($optype) {
case 1 :
//insert
$sql = "insert into worker(Jobs,Jobsname,Name,Tel,L_id) values('" . $_GET['Jobs'] . "'";

$sql .= ",'" .$_GET['Jobsname'] . "'";
$sql .= ",'" . $arr['Name'] . "'";
$sql .= ",'" . $arr['Tel'] . "'";
$sql .= "," . $_GET['p_l_id'] . ")";

break;
case 2 :
//delete
$sql = "delete from worker where Id=" . $arr['id'];
break;
default :
$sql = "";
$str = $arr['Tel'];
if (isset($str)) {
$sql .= ",Tel='" . $str . "'";
}
$str = $arr['Name'];
if (isset($str)) {
$sql .= ",Name='" . $str . "'";
}

$str = $arr['Active'];
if (isset($str)) {
if ($str) {
$sql .= ",Active=1";
} else {
$sql .= ",Active=0";
}
}
$sql = "update worker set " . substr($sql, 1) . " where Id=" . $arr['id'];
break;
}

//$sq .= $sql;
//return $sql;
mysql_query($sql);

if (mysql_errno() > 0) {
$error = 'yes';
break;
}
}

//mysql_query('commit');

if ($error == 'yes') {
mysql_query('rollback');
return '{result:"fail",msg:"数据保存失败！!"}';
//return '数据保存失败!' . $sql;
} else {
mysql_query('commit');
return '{result:"success"}';
}

return $sql;

}

/*
function encode($input)
{
$_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
console.log($_keyStr);
$output = "";
//$chr1, chr2, chr3, enc1, enc2, enc3, enc4;
$i = 0;
$input = _utf8_encode($input);
while ($i < input.length) {
chr1 = input.charCodeAt(i++);
chr2 = input.charCodeAt(i++);
chr3 = input.charCodeAt(i++);
enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;
if (isNaN(chr2)) {
enc3 = enc4 = 64;
} else if (isNaN(chr3)) {
enc4 = 64;
}
output = output +
_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
}
console.log("output:",output);
return output;
}
function decode(input) {
var output = "";
var _keyStr=encode_keyStr;
var chr1, chr2, chr3;
var enc1, enc2, enc3, enc4;
var i = 0;
input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
while (i < input.length) {
enc1 = _keyStr.indexOf(input.charAt(i++));
enc2 = _keyStr.indexOf(input.charAt(i++));
enc3 = _keyStr.indexOf(input.charAt(i++));
enc4 = _keyStr.indexOf(input.charAt(i++));
chr1 = (enc1 << 2) | (enc2 >> 4);
chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
chr3 = ((enc3 & 3) << 6) | enc4;
output = output + String.fromCharCode(chr1);
if (enc3 != 64) {
output = output + String.fromCharCode(chr2);
}
if (enc4 != 64) {
output = output + String.fromCharCode(chr3);
}
}
output = _utf8_decode(output);
return output;
}

// private method for UTF-8 encoding
function _utf8_encode(string) {
string = string.replace(/\r\n/g,"\n");

var utftext = "";
for (var n = 0; n < string.length; n++) {
var c = string.charCodeAt(n);
if (c < 128) {
utftext += String.fromCharCode(c);
} else if((c > 127) && (c < 2048)) {
utftext += String.fromCharCode((c >> 6) | 192);
utftext += String.fromCharCode((c & 63) | 128);
} else {
utftext += String.fromCharCode((c >> 12) | 224);
utftext += String.fromCharCode(((c >> 6) & 63) | 128);
utftext += String.fromCharCode((c & 63) | 128);
}

}
return utftext;
}

// private method for UTF-8 decoding
function _utf8_decode(utftext) {
var string = "";
var i = 0;
var c =0;
var c1 = 0;
var c2 = 0;
var c3 = 0;

while ( i < utftext.length ) {
c = utftext.charCodeAt(i);
if (c < 128) {
string += String.fromCharCode(c);
i++;
} else if((c > 191) && (c < 224)) {
c2 = utftext.charCodeAt(i+1);
string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
i += 2;
} else {
c2 = utftext.charCodeAt(i+1);
c3 = utftext.charCodeAt(i+2);
string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
i += 3;
}
}
return string;
}
*/

function encode($decStr){
$base64s ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
$i = 0;
$encOut = "";
while($decStr.length >= $i + 3){
$bits = ($decStr.charCodeAt($i++) & 0xff) <<16 | ($decStr.charCodeAt($i++) & 0xff) <<8 | $decStr.charCodeAt($i++) & 0xff;
$encOut += $base64s.charAt((bits & 0x00fc0000) >>18) + base64s.charAt((bits & 0x0003f000) >>12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
}
if($decStr.length -$i > 0 && $decStr.length -$i < 3){
$dual = Boolean($decStr.length -$i -1);
$bits = (($decStr.charCodeAt($i++) & 0xff) <<16) |    ($dual ? ($decStr.charCodeAt($i) & 0xff) <<8 : 0);
$encOut += $base64s.charAt(($bits & 0x00fc0000) >>18) + $base64s.charAt(($bits & 0x0003f000) >>12) + ($dual ? $base64s.charAt(($bits & 0x00000fc0) >>6) : '=') + '=';
}
return($encOut);
}

function decode($encStr){
$base64s ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
$decOut = "";
$i = 0;
for(; $i<$encStr.length; $i += 4){
$bits = ($base64s.indexOf($encStr.charAt($i)) & 0xff) <<18 | ($base64s.indexOf($encStr.charAt($i +1)) & 0xff) <<12 | ($base64s.indexOf($encStr.charAt($i +2)) & 0xff) << 6 | $base64s.indexOf($encStr.charAt($i +3))&0xff;
$decOut += String.fromCharCode(($bits & 0xff0000) >>16, ($bits & 0xff00) >>8, $bits & 0xff);
}
if($encStr.charCodeAt($i -2) == 61){
return($decOut.substring(0, $decOut.length -2));
}
else if($encStr.charCodeAt($i -1) == 61){
return($decOut.substring(0, $decOut.length -1));
}
else {
return($decOut);
}
}



//**     pc function end   **/////
?>