<?php defined('BASEPATH') OR exit('No direct script access allowed'); 

 class mysqlwxaction extends CI_Controller {
  public function index() 
  {  
    $this->json(['code' => 0,'data' => [
       'msg' => 'Hello World 欢迎 mysqlwxaction ' 
        ]  
      ]
      );     
         
  /*  
     $link = mysqli_connect('gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 
     'root','lfy670313','wms'); 


session_start();

$act = $_GET['act'];
if (!$act) {
	$act = $_POST['act'];
}
$act = strtolower($act);
//$act="as";
$retval = '';
switch($act) {
	case 'cpxsdshsave' :
		$retval =self::cpxsdshsave($link);
		break;

	case 'cpxsdmxsave' :
		$retval =self::cpxsdmxsave($link);
		break;
	case 'cpxsdlist' :
		$retval =self::cpxsdlist($link);
		break;

	case 'cpxsdmxloc' :
		$retval =self::cpxsdmxloc($link);
		break;


	case 'cpckdselectdata' :
		$retval =self::cpckdselectdata($link);
		break;
    case 'ckmclist' :
		$retval =self::ckmclist($link);
		break;
    case 'cpkcmenulist' :
		$retval =self::cpkcmenulist($link);
		break;

	case 'cphmlist' :
		$retval =self::cphmlist($link);
		break;
	case 'cphmedit' :
		$retval =self::cphmedit($link);
		break;
	case 'khuserslist' :
		$retval =self::khuserslist($link);
		break;
	case 'khusersedit' :
		$retval =self::khusersedit($link);
		break;
	default :
			$retval= 'POST=' . $_POST['act'] . '  GET=' . $_GET['act'];
			break;
}




mysqli_close($link);	
echo $retval;


*/
         
  }

  
private static function  cpxsdshsave($link)
{
	$xsid = $_GET['id'];
	
	$loc = $_GET['options'];
    $shr = $_GET['username'];

	if ($loc=="ok"){	
		$sqlstr = " update cpxsd set ztbz=1";
		$sqlstr .= ",endrq='".$_GET['endrq']."'";
		$sqlstr .= ",cphm='".$_GET['cphm']."'";
		$sqlstr .= ",sfr='".$_GET['sfr']."'";
		$sqlstr .= ",cnote='".$_GET['cnote']."'";
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
		

	mysqli_query($link,$sqlstr);
	$result=array();
	if (mysqli_errno($link) > 0) {
		$result['success'] = true;
	    $result['data'] = array('id' =>1, 'msg' => urlencode('数据保存失败'));
         return urldecode(json_encode($result));
		
	} 
	else 
	{
		$result['success'] = true;
	    //$result['data'] = array('result' =>"success");
		$result['data'] = array('id' =>0, 'msg' => urlencode('数据保存成功'));
        return urldecode(json_encode($result));
	}
}

private static function  cpxsdlist($link) {	
	
	
	$xsid=(int)$_GET["xsid"];
	
	$khid=(int)$_GET["khid"];
	
	$ckid=(int)$_GET["ckid"];
	
	
	
    $loc=$_GET["loc"];
	if ($xsid>0)
	{
	  $loc="xsid";	
	}
	$filter="";
	   switch($loc) 
		{
      	case 'cpxsdsh' :
		   //$khkd=$_GET["khkd"];
		   $filter .=" and cpxsd.ztbz=0 and cpxsd.delbz=0 ";   //.$khkd;
		  //$filter .=" and (xsid=3705 )";
		   break;
	  	case 'cpxsdmfh' :
			$filter .=" and cpxsd.ztbz=1 and cpxsd.delbz=0 and cpxsd.fhbz<1 ";  
			//	$filter .=" and cpxsd.ztbz=1 and cpxsd.fhbz<1 ";  
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
		$sqlstr ="SELECT *,xsid as id FROM cpxsd where  khkd>0 ".$filter ;
	//	$sqlstr ="SELECT *,xsid as id FROM cpxsd where  xsid>0 ".$filter ;
	//	return $sqlstr;
		$xsdquery = mysqli_query($link,$sqlstr);
		return self::getjsonstoredata($xsdquery, 0);


	
		if ($xsdquery) {

		$menutype = "";
		$xsd = array();
		$menu_cpkc = array();

		while ($xsdrow = mysqli_fetch_array($xsdquery)) {
			$id = $xsdrow['xsid'];
			$fields=mysqli_num_fields($xsdquery);
			$my_array = array();
			for ($i = 0; $i <$fields ; $i++) {
			    $field_info =mysqli_fetch_field_direct($xsdquery, $i);
				$newvar = $xsdrow[$field_info->name];
				$my_array[$field_info->name] = urlencode($newvar);

			};
			
			
			array_push($xsd, $my_array);


			
			
		}
		$result['rows'] = $xsd;
		$result['success'] = true;
		
	} else {
		$result['success'] = false;
		$result['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($result));
		
}

private static function  cpckdselectdata($link) {
   $khid= $_GET['khid'];
	$sqlstr = "SELECT cphm AS Name,'' AS Id FROM khcphm WHERE  khid=".$khid." AND cphm<>'' GROUP BY cphm ";
	$query = mysqli_query($link,$sqlstr);

	if ($query) {

		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
			     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["cphm"] = $menu_array1;

	    $sqlstr = "SELECT thr AS Name,'' AS Id,cphm FROM khcphm WHERE  khid=".$khid." AND thr<>'' GROUP BY cphm,thr ";
	    $query = mysqli_query($link,$sqlstr);
		$menu_array1 = array();
		while ($row = mysqli_fetch_array($query)) {
			$my_array = array();
			for ($i = 0; $i < mysqli_num_fields($query); $i++) {
				     $field_info =mysqli_fetch_field_direct($query, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
			};
			array_push($menu_array1, $my_array);
		}
		$menu["sfr"] = $menu_array1;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));
}
private static function  cphmlist($link) {
	$sqlstr = " SELECT * FROM khcphm where khid=" . $_GET['khid'] . "  order by cphm ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}
private static function  ckmclist($link) {
	$sqlstr = " SELECT l_id as Id,l_name as Name FROM location   order by l_code ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  cphmedit($link) {

	$options = $_GET['options'];

	$id = $_GET['id'];


	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from khcphm where id=" . $id;
			break;
		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update khcphm set cphm='" . $_GET['cphm'] . "'";
				$sql .= ",thr='" . $_GET['thr'] . "'";
				$sql .= ",wxnumber='" . $_GET['wxnumber'] . "'";
				$sql .= ",wxname='" . $_GET['wxname'] . "'";
				$sql .= ",active=" . $_GET['active'];
				$sql .= " where id=" . $id;
			} 
			else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into khcphm(khid,cphm,thr,wxnumber,wxname) values(" . $_GET['khid'] ;
				$sql .= ",'" . $_GET['cphm'] . "'";
				$sql .= ",'" . $_GET['thr'] . "'";
				$sql .= ",'" . $_GET['wxnumber'] . "'";
				$sql .= ",'" . $_GET['wxname'] . "')";
			}
			break;
	};
	mysqli_query($link,$sql);
	$arr['success'] = true;
	if (mysqli_errno($link) > 0) {
		$msg = $errmsg;
		$arr['data'] = array('id' =>1, 'msg' => urlencode($msg));
	}else
	{
		$arr['data'] = array('id' => 0, 'msg' => urlencode($msg));
	}
	
	return urldecode(json_encode($arr));

}


private static function  khuserslist($link) {
	$sqlstr = " SELECT userid as id,userid,usercode,username,khid,smsphone,wxname,wxnumber,edit,sh,del,lastdel,active,smsactive  FROM khusers where khid=" . $_GET['khid'] . "  order by usercode ";
	$query = mysqli_query($link,$sqlstr);
	return self::getjsonstoredata($query, 0);
}

private static function  khusersedit($link) {

	$options = $_GET['options'];
	$id = $_GET['id'];
	switch ($options) {
		case "delete" :
			//delete
			$msg = "记录数据删除成功！";
			$errmsg = "记录数据删除失败！";
			$sql = "delete from khusers where userid=" . $id;
			break;
		case "smsactive" :
			//delete
			$msg = "成功取消用户激活状态！";
			$errmsg = "取消用户激活状态失败！";
			$sql = "update  khusers set smsactive=0 where smsactive=1 and userid=" . $id;
			break;

		default :
			if ($id > 0)//update
			{
				$msg = "数据更新成功！";
				$errmsg = "数据更新失败！";
				$sql = "update khusers set username='" . $_GET['username'] . "'";
				$sql .= ",usercode='" . $_GET['usercode'] . "'";
				$sql .= ",smsphone='" . $_GET['smsphone'] . "'";
				$sql .= ",active=" . $_GET['active'];
				$sql .= ",edit=" . $_GET['edit'];
				$sql .= ",sh=" . $_GET['sh'];
				$sql .= ",del=" . $_GET['del'];
				$sql .= ",lastdel=" . $_GET['lastdel'];
				$sql .= " where userid=" . $id;
			} else//insert
			{
				$msg = "数据增加成功！";
				$errmsg = "数据增加失败！";
				$sql = "insert into khusers(khid,username,usercode,smsphone,edit,sh,del,lastdel,active) values(" . $_GET['khid'] ;
				$sql .= ",'" . $_GET['username'] . "'";
				$sql .= ",'" . $_GET['usercode'] . "'";
				$sql .= ",'" . $_GET['smsphone'] . "'";
				$sql .= "," . $_GET['edit'] ;
				$sql .= "," . $_GET['sh'] ;
				$sql .= "," . $_GET['del'] ;
				$sql .= "," . $_GET['lastdel'] ;
				$sql .= ",1)";
				
			}
			break;
	};
	//return $sql;
	$rows=mysqli_query($link,$sql);

	$arr['success'] = true;
	if (mysqli_errno($link) > 0) {
		$arr['data'] = array('id' => 1, 'msg' => urlencode($errmsg));
	}
	else
	{
		$arr['data'] = array('id' => 0, 'msg' => urlencode($msg));
	}
	return urldecode(json_encode($arr));
}
private static function  cpxsdmxloc($link) {
	
	
	$xsid=(int)$_GET["xsid"];
	
    
	    $sqlstr = " SELECT  m.*,bz.ps_name as bzmc	FROM cpxsdmx m,cpxsd,packing bz where cpxsd.xsid=m.xsid and bz.PS_id=m.bzid and cpxsd.xsid= ".$xsid ;	
        
    	$query = mysqli_query($link,$sqlstr);
    	return self::getjsonstoredata($query, 0);
}

private static function  cpkcmenulist($link) {
	
$khid=$_GET['khid'];


$sqlstr = "SELECT L_id as ckid ,L_Shortname as ckjc,L_name as ckmc FROM location "; // where E_code='" . $_GET['p_e_code'] . "' AND Active=1 order by L_code";

$ckquery = mysqli_query($link,$sqlstr);

$sqlstr = "SELECT 
  c.cdid,c.cpid,c.bzid,c.jldw,c.L_id as ckid,c.kcid,
  c.cpph,
  mx.sl - c.kdsl AS sl,
  mx.zl - c.kdzl AS zl,
  c.kdsl,c.kdzl,
  cd.p_name AS cdmc,
  cp.S_name AS cpmc,
  bz.PS_name AS bzmc,
  mx.sl AS kcsl,
  mx.zl AS kczl 
  FROM
  cpkc c,
  customer kh,
  produces cd,
  packing bz,
  commodity cp,
  location ck,
  (SELECT 
    kcid,
    SUM(sl) AS sl,
    SUM(zl) AS zl 
  FROM
    cpkcmx 
  GROUP BY kcid 
  HAVING SUM(sl) <> 0 
    OR SUM(zl) <> 0) mx 
  WHERE mx.kcid = c.kcid 
  AND c.L_id = ck.L_id 
  AND c.khid = kh.c_id 
  AND c.cpid = cp.s_id 
  AND c.cdid = cd.p_id 
  AND c.bzid = bz.ps_id
  and c.khid=".$khid." order by c.l_id,Cd.P_name,cp.S_name";
  
   
  
//return 'khid='.$GET['khid']; 
	

	$cpkc = mysqli_query($link,$sqlstr);

	if (($cpkc)&&($ckquery)) {
		$menutype = "";

		$menu_ck = array();
		$menu_cpkc = array();

		while ($menurow = mysqli_fetch_array($ckquery)) {
			$menutype = $menurow['ckid'];
			
			$my_array = array();
			$my_array["menu"] = urlencode($menurow['ckjc']);
			$my_array["ckmc"] = urlencode($menurow['ckmc']);
			$my_array["menuId"] = $menutype;
			array_push($menu_ck, $my_array);

			$menu_array1 = array();
			mysqli_data_seek($cpkc, 0);

			while ($row = mysqli_fetch_array($cpkc)) {
				
				if ($row['ckid'] == $menutype) {
					$my_array = array();
					$fields=mysqli_num_fields($cpkc);
					for ($i = 0; $i <$fields ; $i++) {
					     $field_info =mysqli_fetch_field_direct($cpkc, $i);
						 $newvar = $row[$field_info->name];
						 $my_array[$field_info->name] = urlencode($newvar);
					};
					array_push($menu_array1, $my_array);
				}
			}
			array_push($menu_cpkc, $menu_array1);
			
		}

		$menu["ck"] = $menu_ck;
		$menu["cpkc"] = $menu_cpkc;
		$menu['success'] = true;
	} else {
		$menu['success'] = false;
		$menu['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}
	return urldecode(json_encode($menu));

}


private static function  cpxsdmxsave($link) {



	$str = $_GET['data'];
    $s = base64_decode($str);
	$o =json_decode($s);


	//	return $o->{'ckmc'}. $o->{'cphm'};// json_last_error();   


	$cpxsdmx = $o->{'cpxsdmx'};

  

    $L_id =$o->{'ckid'};

   $khid=$o->{'khid'};

   	$my_date =new DateTime($o->{'xsrq'});
    $my_year = $my_date ->format("Y");

	$dhsql="select C_name as khmc from customer where c_id=".$khid;;
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$khmc =$arr['khmc'];
  
	$dhsql="select setdh(".$L_id.",".$my_year .",'x') as dh ";
	$result = mysqli_query($link,$dhsql);
	$arr=mysqli_fetch_assoc($result);
	$dh =$arr['dh'];




	$cpxsdstr = "insert into cpxsd (xsdh,L_id,khkd,xjbz,khid,khmc,ckmc,sfr,cphm,czy,cnote,xsrq,endrq)values('";
	$cpxsdstr .= $dh. "'";
	$cpxsdstr .= ",". $L_id;
	$cpxsdstr .= ",". $o->{'khkd'};
	$cpxsdstr .= ",". $o->{'xjbz'};
	$cpxsdstr .= ",". $o->{'khid'};
	
	$cpxsdstr .= ",'". $khmc . "'";

	$cpxsdstr .= ",'". $o->{'ckmc'} . "'";
	$cpxsdstr .= ",'". $o->{'sfr'}  . "'";
	$cpxsdstr .= ",'". $o->{'cphm'} . "'";
	$cpxsdstr .= ",'". $o->{'czy'}  . "'";
	$cpxsdstr .= ",'". $o->{'cnote'}. "'";
	$cpxsdstr .= ",'". $o->{'xsrq'} . "'";
	$cpxsdstr .= ",'". $o->{'endrq'} . "')";
	
	mysqli_query($link,'start transaction');
	mysqli_query($link,$cpxsdstr);
	$xdid=mysqli_insert_id($link);
	if ((mysqli_errno($link) > 0 ) ||($xdid==0)) {
		mysqli_query($link,'rollback');
		return '数据保存失败!' . $cpxsdstr;
	}
	//return $cpxsdstr;


	foreach ($cpxsdmx as $row) {
		$cpxsdmxstr  = " insert into cpxsdmx (xsid,kcid,xssl,xszl,xsdj,xsje,cpgg,cpph,jldw,cdid,cpid,bzid,cdmc,cpmc,bzmc)";
		$cpxsdmxstr .= " values (".$xdid."," .$row->{'kcid'}.",".$row->{'sl'};
		$cpxsdmxstr .= "," . $row->{'zl'}.",0,0" ;
		$cpxsdmxstr .= ",'" . $row->{'cpgg'}."','".$row->{'cpph'}."','".$row->{'jldw'} . "'";
		$cpxsdmxstr .= "," . $row->{'cdid'}.",".$row->{'cpid'}.",".$row->{'bzid'};
		$cpxsdmxstr .= ",'" . $row->{'cdmc'}."','".$row->{'cpmc'}."','".$row->{'bzmc'}."')";
		mysqli_query($link,$cpxsdmxstr);
		if (mysqli_errno($link) > 0)
		{
			mysqli_query($link,'rollback');
			return '商品数据保存失败!!' . $cpxsdmxstr;
			break;
		}
	}
	mysqli_query($link,'commit');
	if (mysqli_errno($link) > 0) {
		mysqli_query($link,'rollback');
		return '数据保存失败!!!';
	} 
	else 
	{
		return '{"result":"success","dh":"'.$dh.'","xsid":'.$xdid.'}';
	}
}

//**************************
private static function  getjsonstoredata($query, $total) {//返回STORE所需的数据
     $newvar="";

	if ($query) {
        $rows=0;      
		
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
			//$arr['rows'][] = $my_array;
		}


		if ($rows==0){
			$arr['rows']=array();
		}else
		{
			$arr['rows']=$my_array1;

		}
       //return 'dfgfdgfdgdf';
		/*if ($total == 0) {
			$arr['results'] = mysqli_numrows($query);
			$arr['total'] = mysqli_numrows($query);
		} else {
			$arr['results'] = $total;
			$arr['total'] = $total;
		}*/
		$arr['results'] = $rows;
		$arr['total'] = $rows;
		$arr['success'] = true;
		$arr['data'] = array('id' => 0, 'msg' => urlencode('数据查询操作成功！'));
	} else {
		$arr['success'] = false;
		$arr['rows'] =array();
		$arr['data'] = array('id' => 1, 'msg' => urlencode('数据查询操作失败！'));
	}

	return urldecode(json_encode($arr));

}
  
  
  
  
  
  
  
  
  
  
  private static private static function  sub_abcd() 
  {  

  }   


         
  
}