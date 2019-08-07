<?php
ini_set('display_errors', 'Off');

include_once ('mysql_connect.php');
include_once ('Qcloud\Sms\SmsSingleSender.php');
include_once ('Qcloud\Sms\SmsSenderUtil.php');
//namespace Qcloud\Sms;
	$appid = 1400083497; // 1400开头
	$appkey = "b4ad65d8d9e2617a7d6795c75b98d8ea";
    $smsSign = "明联物流"; 

use Qcloud\Sms\SmsSingleSender;  
use Qcloud\Sms\SmsSenderUtil;  
  
$act=$_GET["act"];	
//$act='cpjkd';
$id=(int)$_GET["id"];


//出仓信息处理  
if ($act=="cpckd"){
  if ($id==null)  $id=2253;   

  $sqlstr = "SELECT m.cdmc,m.cpmc,m.jldw,cm.ccsl,cm.cczl,customer.C_shortname AS khjc,location.L_shortname AS ckmc,
  cpxsd.cphm,cpxsd.xsdh,customer.smsphone
  FROM cpxsdmx m,cpckd,cpxsd,cpckdmx cm,customer,location  
  WHERE cpckd.xsid = m.xsid AND cpxsd.xsid = m.xsid 
  AND cm.ckid=cpckd.ckid AND cpxsd.khid=customer.C_id
  AND  cpxsd.L_id=location.L_id
  AND cm.xsmxid=m.mxid AND cpckd.ckid=".$id;
  
  $query = mysql_query($sqlstr);
  $ckstr="";
  $dh="";
  $cphm="";
  $ckmc="";
  $phone="";  
  if ($query){
    	while ($row = mysql_fetch_array($query)) {
        $ckstr.="\n产地:".$row['cdmc'];				
        $ckstr.="\n商品:".$row['cpmc'];				
        $ckstr.="\n数量:".printsl($row['ccsl'])."".$row['jldw'];				
        $ckstr.=printsl($row['cczl'])."吨\n";	
        $dh=$row['xsdh'];
        $ckmc=$row['ckmc'];
        $cphm=$row['cphm'];
        $phone=$row['smsphone'];  
        }
        $newvar=$cphm;
        if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
         {
          $newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
          $newvar=str_replace("\n"," ",$newvar);
         }
         $cphm=$newvar ;        
        


        $ckstr=$dh.$ckstr." ".$cphm."已办理提货！"." (".$ckmc.")";	
  }
    
     //echo $cphm;



    $phone_array=explode(',',$phone);

   if (count($phone_array)>0){

    $templateId =111420;
	$params =array();//
    array_push($params,$ckstr);

     //[$ckstr];

	try {
    	$ssender = new SmsSingleSender($appid, $appkey);
		$sendcount=0;
    	foreach ( $phone_array as $smsphone ){ 
		  if (strlen($smsphone)>0){
	    	$result = $ssender->sendWithParam("86", $smsphone, $templateId,
    	    	$params, $smsSign, "", ""); 

                $str= $smsphone." ck msg:".$ckstr;
                $str=mysql_query('insert into logs (msg) values ("'.$str.'")');
           }
			
		}
        $a=json_decode($result, true);

        if ($a["result"]==0)
        {
         	echo '{result:"success"}';
        }
        else
        {
          echo $a["errmsg"];
        }
    } catch(\Exception $e) {
		echo "信息发送失败！";
    }

  }else
  {
		echo "客户未定义接收信息手机号码！";
  }
   

}



//进仓信息处理  
if ($act=="cpjkd"){
   if ($id==null)  $id=1364;   
  $sqlstr = "SELECT m.cdmc,m.cpmc,m.jldw,m.jcsl,m.jczl,customer.C_shortname AS khjc,location.L_shortname AS ckmc,
  cpjkd.cphm,cpjkd.sfdh,customer.smsphone
  FROM cpjkdmx m,cpjkd,customer,location  
  WHERE cpjkd.jkid = m.jkid
  AND  cpjkd.khid=customer.C_id
  AND  cpjkd.L_id=location.L_id
  AND  cpjkd.jkid=".$id;
  
  $query = mysql_query($sqlstr);
  $ckstr="";
  $dh="";
  $cphm="";
  $ckmc="";
  $phone="";  
  if ($query){
    	while ($row = mysql_fetch_array($query)) {
        $ckstr.="\n产地:".$row['cdmc'];				
        $ckstr.="\n商品:".$row['cpmc'];				
        $ckstr.="\n数量:".printsl($row['jcsl'])."".$row['jldw'];				
        $ckstr.=printsl($row['jczl'])."吨\n";	
        $dh=$row['sfdh']." (".$row['ckmc'].")";
        $cphm=$row['cphm'];
        $ckmc=$row['ckmc'];
        $phone=$row['smsphone'];  
                  }
                  /*
                  $newvar=$cphm;
                  if  ((substr($newvar,0,1)=="~")  && (substr($newvar,strlen($newvar)-1,1)=="~"))
                   {
                    $newvar =base64_decode(substr($newvar ,1,strlen(	$newvar )-2));
                    $newvar=str_replace("\n"," ",$newvar);
                   }
                   $cphm=$newvar ;    
        $ckstr=$dh.$ckstr." ".$cphm."已办理进仓！";	*/
   }


$phone_array=explode(',',$phone);

  if (count($phone_array)>0){
	$templateId =111465; 
	//$params = [$cphm,$ckstr,$dh];

    $params =array();//
    array_push($params,$cphm);
    array_push($params,$ckstr);
    array_push($params,$dh);
	try {
    	$ssender = new SmsSingleSender($appid, $appkey);
		$sendcount=0;
    	foreach ( $phone_array as $smsphone ){ 
            if (strlen($smsphone)>0){
	            	$result = $ssender->sendWithParam("86", $smsphone, $templateId,
    	    	    $params, $smsSign, "", ""); 

                    $str= $smsphone." jc msg:".$ckstr;
                    $str=mysql_query('insert into logs (msg) values ("'.$str.'")');
                    
            }
			
	    }
    $a=json_decode($result, true);
    if ($a["result"]==0)
    {
    	echo '{result:"success"}';
    }
    else
    {
       echo $a["errmsg"];
    }
 
    } catch(\Exception $e) {
		echo "信息发送失败！";
    }

  }else
  {
		echo "客户未定义接收信息手机号码！";
  }


}















function printsl($sl)
{
    if (Math.round($sl,0)==$sl)
    {
        return $sl;
    }
    if (Math.round(10*$sl,0)==10*$sl)
    {
        return round($sl,1);
    }
    if (Math.round(100*$sl,0)==100*$sl)
    {
        return round($sl,2);
    }   
    return round($sl,3);
}
?>