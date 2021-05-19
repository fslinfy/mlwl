<?php

//ini_set('display_errors', 'Off');

$link = mysqli_connect('gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 'root','lfy670313','wms'); 



session_start();
ob_clean();

$act = $_GET['act'];
if (!$act) {
	$act = $_POST['act'];
}
$act = strtolower($act);



$retval = '';



switch($act) {


	case 'getcustomer' :
		$retval = getcustomer();
		break;
    case 'customerlist' :
        $retval = customerlist();
		break;
	case 'customeredit' :
		$retval = customersave();
		break;		
	case 'cwjetjlist' :
   		  $retval = cwjetjlist();
		 break;		
		 case 'cwbytcjetjlist' :
			$retval = cwbytcjetjlist();
		break;		

		 case 'czmxloclist' :
		$retval = czmxloclist();
		break;		
		case 'cztjloclist' :
			$retval = cztjloclist();
			break;		
			
	case 'cwworktjlist' :
			$retval = cwworktjlist();
		break;		
		case 'cwworktjmxlist' :
			$retval = cwworktjmxlist();
		break;		
		
		case 'cpjcworkloclist' :
			$retval = cpjcworkloclist();
		break;		
		 
}
//$retval = checkBOM($retval);
//$retval = substr($retval,1);
/*header("Content-type:text/html;charset=GB2312");
$retval=iconv("UTF-8","gbk//TRANSLIT",$retval);
header("Content-type:text/html;charset=UTF-8");
$retval=iconv('GB2312', 'UTF-8', $retval); 
*/
//sqlsrv_close( $link );
//mysqli_close($link);
echo $retval;
return;	


function customerlist() {
	global 	$link, $search,$query, $total,$page;
	$page=(int)$_POST['page'] ;
	$limit=(int)$_POST['rows'] ;

	$sidx = $_POST['sidx']; 
	$sord = $_POST['sord']; 
	$pcode = $_POST['p_e_code']; 
	$sqlstr0 = " SELECT C_id as Id, C_id,C_code,C_name,C_shortname ,Address,Tel,smsphone,Enddate,Aloneprice,Active FROM customer_dev where E_code='" . $pcode . "'";
	$search='{"groupOp":"AND","rules":[{"field":"C_code","op":"cn","data":"0"},{"field":"C_name","op":"cn","data":"杰"},{"field":"C_shortname","op":"cn","data":"9"}]}';
	$where="";
	$export="";
	if (isset($_POST['filters']))	$where=checkWhere($_POST['filters'],$link,$sqlstr0);
	if (isset($_POST['export']))	$export = $_POST['export']; 
	if(!$sidx) $sidx =1; 
	if(!$page) $page =1; 
	if(!$limit) $limit =20; 
	$start=($page-1)*$limit;
	$sqlstr = " SELECT C_id    FROM customer_dev ";
	if ($where!="") 	$sqlstr .= " where $where ";
	$totalrows=mysqli_num_rows(mysqli_query($link,$sqlstr));
	$total=1;
	if ($limit>0){
		$total=round(($totalrows +$limit - 1) / $limit);
	}
	$sqlstr=$sqlstr0;
	if ($where!="") $sqlstr .= " and ( $where )";
	$sqlstr .= "  order by $sidx $sord  " ;  
	if ($export!="1"){
		$sqlstr .= "   limit  $start , $limit" ;  
	}
	return getjsonJqGriddata($sqlstr,false);	
}
function cwjetjlist() {
	global 	$link, $search,$query, $total,$page;
	$page=(int)$_POST['page'] ;
	$limit=(int)$_POST['rows'] ;
	$sidx = $_POST['sidx']; 
	$sord = $_POST['sord']; 
	$pcode = $_POST['p_e_code']; 

	$Lid=$_POST["p_l_id"];
	$ny=$_POST["ny"];
	$yu=$_POST["yu"];
	$jelb=(int)$_POST["jelb"];
	$khid=$_POST["khid"];
	$sqlstr = "CALL getydmxje(".$Lid.",".$khid.",".$ny.",".$yu.",".$jelb.")";

	//return $sqlstr;
	$page =1; 
	
	$start=1;
	$totalrows=0;
	$total=1;
	
	//return getjsonJqGriddata($sqlstr,false);	



//	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
		if ($query) {
			$z=0;
			$byje=0;
			$ghje=0;
			$gfje=0;
			$qtje=0;
			$je0=0;
			$byxjje=0;
			$ghxjje=0;
			$gfxjje=0;
			$qtxjje=0;
			$je=0;
			$xjje=0;

			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					//$fieldname=mysql_field_name($query, $i);
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					
					$newvar = $row[$fieldname];
	
	
					
					//$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
					//$newvar=str_replace("\n"," ",$newvar);
					$my_array[$fieldname] = urlencode($newvar);
					//$my_array[$fieldname] = $newvar;


					//array_push($my_array,urlencode($newvar));
				};
				

				$byje=$byje+ $row['byje'];
				$byxjje=$byxjje+ $row['byxjje'];

				$ghje=$ghje+ $row['ghje'];
				$ghxjje=$ghxjje+ $row['ghxjje'];

				$gfje=$gfje+ $row['gfje'];
				$gfxjje=$gfxjje+ $row['gfxjje'];

				$qtje=$qtje+ $row['qtje'];
				$qtxjje=$qtxjje+ $row['qtxjje'];
				$je0=$je0+ $row['je0'];
				$je=$je+ $row['je'];
				$xjje=$xjje+ $row['xjje'];
				$z++;
				//if ($idop){
				//	$aa["id"]=$z;
				//}else{
					$aa["id"]=$row['Id'];	
				//}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			$result["total"]=$total;
			$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$my_array = array();
			$my_array['byje'] = $byje;
			$my_array['byxjje'] = $byxjje;

			$my_array['gfje'] = $gfje;
			$my_array['gfxjje'] = $gfxjje;

			$my_array['ghje'] = $ghje;
			$my_array['ghxjje'] = $ghxjje;

			$my_array['qtje'] = $qtje;
			$my_array['qtxjje'] = $qtxjje;
			$my_array['je0'] = $je0;
			$my_array['je'] = $je;
			$my_array['xjje'] = $xjje;

			$result['userdata'] =$my_array;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['userdata'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));







}

function cwbytcjetjlist() {
	global 	$link, $search,$query, $total,$page;
	$page=(int)$_POST['page'] ;
	$limit=(int)$_POST['rows'] ;
	$sidx = $_POST['sidx']; 
	$sord = $_POST['sord']; 
	$pcode = $_POST['p_e_code']; 

	$loc="";
	
	if (isset($_POST["loc"])) $loc=(int)$_POST["loc"];
	
	$Lid=$_POST["p_l_id"];
	$ny=$_POST["ny"];
	$yu=$_POST["yu"];
	$bz=$_POST["bz"];
	$khid=$_POST["khid"];
	$bybz=0;
	if (isset($_POST["bybz"])) $bybz=(int)$_POST["bybz"];

	//if ($loc=="cwworkwz"){
	//	$sqlstr = "CALL getydbytctjmx($Lid,$khid,$ny,$yu,'$bz',1,$bybz)";
	//}else{
		$sqlstr = "CALL getydbytctjmx($Lid,$khid,$ny,$yu,'$bz',0,$bybz)";
	//}


	$page =1; 
	
	$start=1;
	$totalrows=0;
	$total=1;



//	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
		if ($query) {
			$z=0;
			$sumzl=0;
			$sumje=0;

			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					$newvar = $row[$fieldname];
					$my_array[$fieldname] = urlencode($newvar);
				};
				

				$sumje=$sumje+ $row['je'];
				$sumzl=$sumzl+ $row['zl'];
				$z++;
				//if ($idop){
					$aa["id"]=$z;
				//}else{
					//$aa["id"]=$row['Id'];	
				//}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			$result["total"]=$total;
			$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$my_array = array();
			$my_array['je'] = $sumje;
			$my_array['zl'] = $sumzl;
			$result['userdata'] =$my_array;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['userdata'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));







}


function czmxloclist() {
	global 	$link, $search,$query, $total,$page;
	$page=(int)$_POST['page'] ;
	$limit=(int)$_POST['rows'] ;
	$sidx = $_POST['sidx']; 
	$sord = $_POST['sord']; 
	$pcode = $_POST['p_e_code']; 

	$Lid=$_POST["p_l_id"];
	$ny=$_POST["ny"];
	$yu=$_POST["yu"];
	$khid=$_POST["khid"];
	$cpid=$_POST["cpid"];
	$sqlstr = "CALL getydczmx1(".$Lid.",".$khid.",".$cpid.",".$ny.",".$yu.")";

	
	$page =1; 
	
	$start=1;
	$totalrows=0;
	$total=1;
	
	//return getjsonJqGriddata($sqlstr,false);	



//	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
		if ($query) {
			$z=0;
			$je=0;
			$sl=0;
			$zl=0;

			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					//$fieldname=mysql_field_name($query, $i);
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					
					$newvar = $row[$fieldname];
	
	
					
					//$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
					//$newvar=str_replace("\n"," ",$newvar);
					$my_array[$fieldname] = urlencode($newvar);
					//$my_array[$fieldname] = $newvar;


					//array_push($my_array,urlencode($newvar));
				};
				

				$sl=$sl+ $row['sl'];
				$zl=$zl+ $row['zl'];

				$je=$je+ $row['je'];

				$z++;
				//if ($idop){
				//	$aa["id"]=$z;
				//}else{
					$aa["id"]=$row['Id'];	
				//}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			$result["total"]=$total;
			$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$my_array = array();
			$my_array['sl'] = $sl;
			$my_array['zl'] = $zl;
			$my_array['je'] = $je;

			$result['userdata'] =$my_array;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['userdata'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));







}

function cztjloclist() {
	global 	$link, $search,$query, $total,$page;
	$page=(int)$_POST['page'] ;
	$limit=(int)$_POST['rows'] ;
	$sidx = $_POST['sidx']; 
	$sord = $_POST['sord']; 
	$pcode = $_POST['p_e_code']; 

	$Lid=$_POST["p_l_id"];
	$ny=$_POST["ny"];
	$yu=$_POST["yu"];
	$khid=$_POST["khid"];
	$sqlstr = "CALL getydjemx(".$Lid.",".$khid.",".$ny.",".$yu.")";

	
	$page =1; 
	
	$start=1;
	$totalrows=0;
	$total=1;
	
	//return getjsonJqGriddata($sqlstr,false);	



//	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
		if ($query) {
			$z=0;
			$je=0;
			$sl=0;
			$zl=0;
			$byje=0;
			$byxjje=0;
			$sumje=0;
			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					//$fieldname=mysql_field_name($query, $i);
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					
					$newvar = $row[$fieldname];
	
	
					
					//$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
					//$newvar=str_replace("\n"," ",$newvar);
					$my_array[$fieldname] = urlencode($newvar);
					//$my_array[$fieldname] = $newvar;


					//array_push($my_array,urlencode($newvar));
				};
				

				$sl=$sl+ $row['sl'];
				$zl=$zl+ $row['zl'];

				$je=$je+ $row['je'];
				$byje=$byje+ $row['byje'];

				$byxjje=$byxjje+ $row['byxjje'];

				$sumje=$sumje+ $row['sumje'];

				$z++;
				//if ($idop){
					$aa["id"]=$z;
				//}else{
				//	$aa["id"]=$row['Id'];	
				//}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			$result["total"]=$total;
			$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$my_array = array();
			$my_array['sl'] = $sl;
			$my_array['zl'] = $zl;
			$my_array['je'] = $je;
			$my_array['byje'] = $byje;
			$my_array['byxjje'] = $byxjje;
			$my_array['sumje'] = $sumje;
			$result['userdata'] =$my_array;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['userdata'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));







}


function cwworktjlist() {
	global 	$link, $search,$query, $total,$page;
	$loc=$_GET["loc"];
	$Lid=$_GET["p_l_id"];
	$ny=$_GET["ny"];
	$yu=$_GET["yu"];
	$bz=$_GET["bz"];
	$khid=$_GET["khid"];
	$bybz=0;
	if (isset($_GET["bybz"])) $bybz=(int)$_GET["bybz"];
	if ($loc=="cwworkwz"){
		$sqlstr = "CALL getydbytj($Lid,$khid,$ny,$yu,'$bz',1,$bybz)";
	}else{
		$sqlstr = "CALL getydbytj($Lid,$khid,$ny,$yu,'$bz',0,$bybz)";
	}
	$page =1; 
	$start=1;
	$totalrows=0;
	$total=1;
	return getjsonJqGriddatapiv($sqlstr,true);	
}
function cwworktjmxlist() {
	global 	$link, $search,$query, $total,$page;
	$loc=$_GET["loc"];
	$Lid=$_GET["p_l_id"];
	$ny=$_GET["ny"];
	$yu=$_GET["yu"];
	$bz=$_GET["bz"];
	$khid=$_GET["khid"];
	$bybz=0;
	if (isset($_GET["bybz"])) $bybz=(int)$_GET["bybz"];
	if ($loc=="cwworkwz"){
		$sqlstr = "CALL getydbytjmx($Lid,$khid,$ny,$yu,'$bz',1,$bybz)";
	}else{
		$sqlstr = "CALL getydbytjmx($Lid,$khid,$ny,$yu,'$bz',0,$bybz)";
	}
	$page =1; 
	$start=1;
	$totalrows=0;
	$total=1;
	return getjsonJqGriddatapiv($sqlstr,true);	
}
function cpjcworkloclist() {
	global 	$link;
	$Lid=(int)$_POST["p_l_id"];
	$jclb=$_POST["jclb"];

	//return 'jclb='.$jclb;
	$ckid=(int)$_POST["ckid"];
	$khid=(int)$_POST["khid"];
	$cpid=(int)$_POST["cpid"];
	//$loc=$_GET["loc"];
	$filter="";
	$sqlstr0="";
	$sqlstr1="";
	$sqlstr2="";
	$sqlstr3="";
    if (($jclb=="1")|| ($jclb=="0")) {

		$filter =" and cpjkd.delbz=0 ";
		if ($_POST["startdate"])
    	{
    			$filter .=" and cpjkd.czrq>='".$_POST["startdate"]."'";
    	}
    	if ($_POST["enddate"])
    	{
    			$filter .=" and cpjkd.czrq<='".$_POST["enddate"]."'";
	    }

	//	if ($cpid>0)
	//	{
	//			$filter .= " and cpjkdmx.cpid=".$cpid;
	//	}
    	
		if ($ckid>0)
		{
			$filter .= " and cpjkd.L_id=".$ckid;
			
		}
		if ($khid>0)
    	{
    		$filter .= " and cpjkd.khid=".$khid;
    	}
		if ($cpid>0)
    	{
    		$filter .= " and cpjkdmx.cpid=".$cpid;
    	}

	$sqlstr1 = "SELECT '进仓' as jclb,
    `cpjkd`.`jkdh` as dh
    , `cpjkd`.`czrq` as rq
    , `cpjkd`.`khmc`
    , `cpjkdmx`.`cpid`
	, `cpjkdmx`.`cpmc`
    , `cpjkdmx`.`bzmc`
	, `cpjkdmx`.`cdmc`
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

 	if (($jclb=="2")||($jclb=="0")) {

		$filter =" and cpckd.delbz=0 AND CPCKD.ZTBZ>1  ";
		if ($_POST["startdate"])
    	{
    			$filter .=" and cpckd.ckrq>='".$_POST["startdate"]."'";
    	}
    	if ($_POST["enddate"])
    	{
    			$filter .=" and cpckd.ckrq<='".$_POST["enddate"]."'";
	    }
		if ($ckid>0)
		{
			$filter .= " and cpxsd.L_id=".$ckid;
		}
		if ($khid>0)
    	{
    		$filter .= " and cpxsd.khid=".$khid;
    	}
		if ($cpid>0)
    	{
    		$filter .= " and cpxsdmx.cpid=".$cpid;
    	}

	$sqlstr2 = "SELECT '出仓' as jclb,
    `cpckd`.`ckdh` as dh
    , `cpckd`.`ckrq` as rq
    , `cpxsd`.`khmc`
    , `cpxsdmx`.`cpid`
	, `cpxsdmx`.`cpmc`
    , `cpxsdmx`.`bzmc`
	, `cpxsdmx`.`cdmc`
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
	$sqlstr='';
	$sqlstr2='';

	if (($jclb=="3")||($jclb=="0")) {
		//转出客户
		//$filter =" and d.ztbz>1 and d.fhbz>1 and d.jebz=0 ";
		$filter =" and  d.jebz=0 ";
		if ($_POST["startdate"])
    	{
    			$filter .=" and d.ghrq>='".$_POST["startdate"]."'";
    	}
    	if ($_POST["enddate"])
    	{
    			$filter .=" and d.ghrq<='".$_POST["enddate"]."'";
	    }
		if ($ckid>0)
		{
			$filter .= " and d.L_id=".$ckid;
		}
		if ($khid>0)
    	{
    		$filter .= " and d.khid=".$khid;
    	}
		if ($cpid>0)
    	{
    		$filter .= " and mx.cpid=".$cpid;
    	}

	$sqlstr2 = "SELECT '过户' as jclb,
    d.ghdh as dh
    , d.ghrq  as rq
    , d.khmc
	,mx.cpid
    , mx.cpmc
    , mx.bzmc
	, mx.cdmc
	, mx.jldw
    , mx.xssl as jcsl
    , mx.xszl as jczl
    , je.work
    , je.sl
    , je.dw
    , je.dj
    , je.je
    , je.jeid as id
	,case when je.xjbz then je.je else 0 end as xjje
    , je.byg
    , je.gs
    , je.cg
    FROM
    wxcpghdmx mx
    INNER JOIN wxcpghd d 
        ON (mx.ghid = d.ghid)
    INNER JOIN wxcpghdje je 
        ON (je.mxid = mx.mxid)  
	where d.delbz=0 ".$filter;
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
	$sqlstr='';
	$sqlstr2='';
	if (($jclb=="3")||($jclb=="0")) {
     //转入客户
	//$filter =" and d.ztbz>1 and d.fhbz>1 and d.jebz=1 ";
	$filter =" and d.jebz=1 ";
	if ($_POST["startdate"])
	{
			$filter .=" and d.ghrq>='".$_POST["startdate"]."'";
	}
	if ($_POST["enddate"])
	{
			$filter .=" and d.ghrq<='".$_POST["enddate"]."'";
	}
	if ($ckid>0)
	{
		$filter .= " and d.L_id=".$ckid;
	}
	if ($khid>0)
	{
		$filter .= " and d.newkhid=".$khid;
	}
	if ($cpid>0)
	{
		$filter .= " and mx.cpid=".$cpid;
	}

$sqlstr2 = "SELECT '过户' as jclb,
d.ghdh as dh
, d.ghrq  as rq
, d.newkhmc as khmc
, mx.cpid
, mx.cpmc
, mx.bzmc
, mx.cdmc
, mx.jldw
, mx.xssl as jcsl
, mx.xszl as jczl
, je.work
, je.sl
, je.dw
, je.dj
, je.je
, je.jeid as id
,case when je.xjbz then je.je else 0 end as xjje
, je.byg
, je.gs
, je.cg
FROM
wxcpghdmx mx 
INNER JOIN wxcpghd d 
	ON (mx.ghid = d.ghid)
INNER JOIN wxcpghdje je 
	ON (je.mxid = mx.mxid)  
where d.delbz=0 ".$filter;
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




$sqlstr='';
$sqlstr2='';

if (($jclb=="4")||($jclb=="0")) {
	$filter =" and d.delbz=0";
	if ($_POST["startdate"])
	{
			$filter .=" and d.gfrq>='".$_POST["startdate"]."'";
	}
	if ($_POST["enddate"])
	{
			$filter .=" and d.gfrq<='".$_POST["enddate"]."'";
	}
	if ($ckid>0)
	{
		$filter .= " and d.L_id=".$ckid;
	}
	if ($khid>0)
	{
		$filter .= " and d.khid=".$khid;
	}
	if ($cpid>0)
	{
		$filter .= " and mx.cpid=".$cpid;
	}

$sqlstr2 = "SELECT '过车' as jclb,
d.gfdh as dh
, d.gfrq  as rq
, d.khmc
, mx.cpid
, mx.xmmc as cpmc
, mx.bzmc
, mx.cdmc
, mx.jldw
, mx.sl as jcsl
, mx.zl as jczl
, je.work
, je.sl
, je.dw
, je.dj
, je.je
, je.jeid as id
,case when je.xjbz then je.je else 0 end as xjje
, je.byg
, je.gs
, je.cg
FROM
wxcpgfdmx mx 
INNER JOIN wxcpgfd d 
	ON (mx.gfid = d.gfid)
INNER JOIN wxcpgfdje je 
	ON (je.mxid = mx.mxid)  
where d.delbz=0 ".$filter;
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




	$query = mysqli_query($link,$sqlstr1);
		if ($query) {
			$z=0;
			$je=0;
			$sl=0;
			$xjje=0;
			$jcsl=0;
			$jczl=0;

			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					$newvar = $row[$fieldname];
					$my_array[$fieldname] = urlencode($newvar);
				};
				
				$sl=$sl+ $row['sl'];
				$jcsl=$jcsl+ $row['jcsl'];
				$jczl=$jczl+ $row['jczl'];

				$je=$je+ $row['je'];
				$xjje=$xjje+ $row['xjje'];
				$z++;
				//if ($idop){
					$aa["id"]=$z;
				//}else{
				//	$aa["id"]=$row['Id'];	
				//}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			//$result["total"]=$total;
			//$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$my_array = array();
			$my_array['jcsl'] = $jcsl;
			$my_array['jczl'] = $jczl;
			$my_array['sl'] = $sl;
			$my_array['je'] = $je;
			$my_array['xjje'] = $xjje;
			$result['userdata'] =$my_array;
			$result['sql'] =$sqlstr1;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['userdata'] = $sqlstr1;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));



		//return $sqlstr1;
	//	$query = mysql_query($sqlstr1);
	//	return getjsonstoredata($query, 0);
}



function customersave() {
	global 	$link;
	$msg = "数据更新成功！";
	$errmsg = "数据更新失败！";
	$sqlstr="";
	$id=0;
	$Active=0;
	$oper = $_POST['oper']; 
    switch ($oper) {
		case "add": 
			if (isset($_POST['Active'])) 
			{  if ($_POST['Active']=='1')  $Active=1;
			}	
			$Aloneprice=0;
			if (isset($_POST['Aloneprice'])) 
			{  if ($_POST['Aloneprice']=='1') $Aloneprice=1;
			}
			$msg = "数据增加成功！";
			$errmsg = "数据增加失败！";
				$sqlstr = " insert into customer_dev (C_code,C_name,C_shortname,Address,Tel,smsphone,Enddate,Aloneprice,Active) values ( '";
				$sqlstr .= $_POST['C_code'] ;
				$sqlstr .="','" . $_POST['C_name'] ;
				$sqlstr .="','" . $_POST['C_shortname'];
				$sqlstr .="','" . $_POST['Address'];
				$sqlstr .="','" . $_POST['Tel'];
				$sqlstr .="','" . $_POST['smsphone'];
				$sqlstr .="','" . $_POST['Enddate'];
				$sqlstr .="',$Aloneprice , $Active )" ;
			break;
		case "edit":
			if (isset($_POST['Active'])) 
			{  if ($_POST['Active']=='1') $Active=1;
			}
			$Aloneprice=0;
			if (isset($_POST['Aloneprice'])) 
			{  if ($_POST['Aloneprice']=='1') $Aloneprice=1;
			}

			if (isset($_POST['id']))  $id=(int)$_POST['id'];
			 if ($id>0){
				$sqlstr = " update  customer_dev  set c_name= '" . $_POST['C_name'];
				$sqlstr .="',C_shortname= '" . $_POST['C_shortname'];
				$sqlstr .="',C_code= '" . $_POST['C_code'];
				$sqlstr .="',Address= '" . $_POST['Address'];
				$sqlstr .="',Tel= '" . $_POST['Tel'];
				$sqlstr .="',smsphone= '" . $_POST['smsphone'];
				$sqlstr .="',Enddate= '" . $_POST['Enddate'];
				$sqlstr .="',Aloneprice= $Aloneprice " ;
				$sqlstr .=" ,Active= $Active " ;
				$sqlstr .="  where c_id= $id";
			 } else
			 {
				$msg = $errmsg;
				$arr['success'] = false;
			    $arr['data'] = array('id' => -1, 'msg' =>$msg);
				return urldecode(json_encode($arr));
			 }
				break;
		case "del": 
			$msg = "数据删除成功！";
			$errmsg = "数据删除失败！";
			if (isset($_POST['id']))  $id=(int)$_POST['id'];
			if ($id==0){
				$msg = $errmsg;
				$arr['success'] = false;
			    $arr['data'] = array('id' => -1, 'msg' =>$msg);
				return urldecode(json_encode($arr));
	   		}	
		    $sqlstr = "delete from customer_dev  where c_id= $id";
			break;
		default:  //delete
   				$arr['success'] = false;
			    $arr['data'] = array('id' => -1, 'msg' =>'参数错误！');
				return urldecode(json_encode($arr));
			break;
	} 
	//echo $sqlstr;
	mysqli_query($link,$sqlstr);
	 $arr['success'] = true;
	 $arr['sqlstring'] =$sqlstr;
	$err= mysqli_errno($link);
	if ($err > 0) {
		 $msg = $errmsg;
		 $arr['success'] = false;
	 }
	 $arr['data'] = array('id' => $err, 'msg' =>urlencode($msg));
	 return urldecode(json_encode($arr));
}

function checkWhere($s,$link,$sql) {
	if ($s=="") return "";
	
	$sql=$sql." limit 0" ;
	//echo $sql;
	
	
	$result = mysqli_query($link,$sql);
	 
	/*
	for ($i = 0; $i < mysqli_num_fields($link,$query0); $i++) {
		$fieldname =mysqli_fetch_field_direct($query0, $i)->name;
		echo $fieldname;
		echo gettype($fieldname);
		
	}	
	*/
	
	$Farr=array();
	$Tarr=array();
	$fields = mysqli_num_fields($result);
	for ($i=0; $i < $fields; $i++) {
		$type  = mysqli_fetch_field_direct($result,$i )->type;//		mysqli_field_type($result, $i);
		$name  = mysqli_fetch_field_direct($result, $i)->name;// mysqli_field_name($result, $i);
		array_push($Farr, $name);
		array_push($Tarr, $type);
		
	}

	$pa = json_decode($s,true);
	$rules=$pa['rules'] ;
	$where="" ;
	$groupOp=$pa['groupOp'];
	foreach ($rules as $arr)
	{
	   $field=$arr["field"];
	   $type=253;
	   $key=array_search($field,$Farr);
	   if ($key>-1){
			  $type=$Tarr[$key];
	   }
	   $op= $arr['op'];
	   $data= $arr["data"];
	   $retwhere=getWhere($arr,$type);
	   if ($retwhere>""){
    		  if ($where==""){
					$where=$retwhere;
	  			}else{
					$where=$where. " $groupOp ".$retwhere;
	   			}
		}
	}
	return $where;

}

function getWhere($arr,$type) {
	   

	$field=$arr["field"];
	$op= $arr['op'];
	$data= $arr["data"];
	$where="";

/*	$mysql_data_type_hash = array(
		1=>'tinyint',
		2=>'smallint',
		3=>'int',
		4=>'float',
		5=>'double',
		7=>'timestamp',
		8=>'bigint',
		9=>'mediumint',
		10=>'date',
		11=>'time',
		12=>'datetime',
		13=>'year',
		16=>'bit',
		//252 is currently mapped to all text and blob types (MySQL 5.0.51a)
		253=>'varchar',
		254=>'char',
		246=>'decimal'
	);*/

	if (($type<6) || ($type==8) || ($type==9)  || ($type==16) || ($type==246)  ) {
    	 $val=$data ;
	}
	else
	{
		$val=" '$data' " ;
  
	}	
		

   // 'cn','eq', 'ne', 'gt', 'lt', 'ge', 'le'
	switch ($op) {
		case 'eq':
			$where=" $field = $val    " ;		
			break;
		case 'ne':
			$where=" $field <> $val    " ;		
			break;			
		case 'gt':
			$where=" $field > $val  " ;		
			break;				
		case 'lt':
			$where=" $field < $val  " ;		
			break;				
		case 'ge':
			$where=" $field >= $val  " ;		
			break;							
		case 'le':
			$where=" $field <= $val  " ;		
			break;							
		case 'cn':
			$where=" $field like '%$data%' " ;		
			break;
 		default:
		   $where="";
			break;
	}
	
	return $where;

}

function getjsonJqGriddatapiv($sqlstr,$idop) {

global 	$search, $total,$page,$link;
$query = mysqli_query($link,$sqlstr);

	if ($query) {
        $z=0;
		$arr = array();
		while ($row = mysqli_fetch_array($query)) {
		
			
			$my_array = array();
            
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				//$fieldname=mysql_field_name($query, $i);
				$fieldname =mysqli_fetch_field_direct($query, $i)->name;
				
				$newvar = $row[$fieldname];


				if (($fieldname=='cnote')  || ($fieldname=='cphm') || ($fieldname=='sfr') || ($fieldname=='thr') )
				{
				   if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
				   {
					$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
					$newvar=str_replace("\n"," ",$newvar);
				   }
				}
				$my_array[$fieldname] = urlencode($newvar);
				//array_push($my_array,urlencode($newvar));
			};
			
			$z++;
			/*if ($idop){
				$aa["id"]=$z;
			}else{
				$aa["id"]=$row['Id'];	
			}
			$aa["cell"]= $my_array;
			array_push($arr, $aa);*/
			array_push($arr, $my_array);
		}
		
		//$result["total"]=$total;
		//$result["page"]=$page;
		//$result["records"]=$z;
		$result["rows"]=$arr;
		$result['userData'] = $sqlstr;
		//$result['success'] = true;
	} else {
		$result['success'] = false;
		$result['sqlstring'] = $sqlstr;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	//return json_encode($result);
	return urldecode(json_encode($result));
}

function getjsonJqGriddata($sqlstr,$idop) {

	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
		if ($query) {
			$z=0;
			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					//$fieldname=mysql_field_name($query, $i);
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					
					$newvar = $row[$fieldname];
	
	
					if (($fieldname=='cnote')  || ($fieldname=='cphm') || ($fieldname=='sfr') || ($fieldname=='thr') )
					{
					   if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
					   {
						$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
						$newvar=str_replace("\n"," ",$newvar);
					   }
					}
					$my_array[$fieldname] = urlencode($newvar);
					//array_push($my_array,urlencode($newvar));
				};
				
				$z++;
				if ($idop){
					$aa["id"]=$z;
				}else{
					$aa["id"]=$row['Id'];	
				}
				$aa["cell"]= $my_array;
				array_push($arr, $aa);
				//array_push($arr, $my_array);
			}
			$result["total"]=$total;
			$result["page"]=$page;
			$result["records"]=$z;
			$result["rows"]=$arr;
			$result['userData'] = $sqlstr;
			$result['success'] = true;
		} else {
			$result['success'] = false;
			$result['sqlstring'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		//return json_encode($result);
		return urldecode(json_encode($result));
	}
	
function getExportJsonData($sqlstr) {
    //导出数据用
	global 	$search, $total,$page,$link;
	$query = mysqli_query($link,$sqlstr);
	
		if ($query) {
			$z=0;
			$arr = array();
			while ($row = mysqli_fetch_array($query)) {
				$my_array = array();
				
				for ($i = 0; $i < mysqli_num_fields($query); $i++) {
					//$fieldname=mysql_field_name($query, $i);
					$fieldname =mysqli_fetch_field_direct($query, $i)->name;
					
					$newvar = $row[$fieldname];
	
					if (($fieldname=='cnote')  || ($fieldname=='cphm') || ($fieldname=='sfr') || ($fieldname=='thr') )
					{
					   if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
					   {
						$newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
						$newvar=str_replace("\n"," ",$newvar);
					   }
					}
					$my_array[$fieldname] = urlencode($newvar);
					//array_push($my_array,urlencode($newvar));
				};
				
				$z++;
				array_push($arr, $my_array);
			}
			$result["rows"]=$arr;
		} else {
			$result['success'] = false;
			$result['sqlstring'] = $sqlstr;
			$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
		}
		return urldecode(json_encode($result));
	}

?>





























