<?php

include_once ('Qcloud\Sms\SmsSingleSender.php');
include_once ('Qcloud\Sms\SmsSenderUtil.php');
//namespace Qcloud\Sms;
$appid = 1400083497; // 1400开头
$appkey = "b4ad65d8d9e2617a7d6795c75b98d8ea";
$smsSign = "明联物流"; 
use Qcloud\Sms\SmsSingleSender;  
use Qcloud\Sms\SmsSenderUtil;  

ini_set('display_errors', 'Off');
//include_once ('mysql_connect.php');
 $link = mysqli_connect( 
'gz-cdb-p2hbsmqa.sql.tencentcdb.com:63689', 
'root',
'lfy670313',
'wms'); 

if (!$link) { 
printf("Can't connect to MySQL Server. Errorcode: %s ", mysqli_connect_error()); 
exit; 
} 


$khid=$_GET["khid"];	
$userid=$_GET["userid"];	

$wxactive=$_GET["wxactive"];
$phone=$_GET["smsphone"];

if ($khid>0){
    $sqlstr="select userid,smsactive from khusers where userid=".$userid." and smsphone='" . $phone . "' and khid=".$khid ;
 
}else{
   $sqlstr="select userid,smsactive from users where userid=".$userid." and smsphone='" . $phone . "' " ;
  
}

$arr = array();

  $query = mysqli_query($link,$sqlstr);
//echo "error;".mysqli_connect_error();

  $rows=mysqli_num_rows($query);
  //echo "rows=".$rows;
//$rows=0;
  if ($rows==0)
  {
          echo "非法ID 或电话号码！". $sqlstr;
          $arr["result"]="非法ID 或电话号码！";
          echo urldecode(json_encode($arr)); 
           //echo '{result:"非法ID 或电话号码！"}';
           

  }
  else
  {
    $smsactive=0;
    //if ($wxactive!=1)
    //{
	    while ($row = mysqli_fetch_array($query)) {
		  	$smsactive= $row['smsactive'];
	  	}
    //} 

   // echo "smsactive".$smsactive;

    if  ($smsactive==1)
    {
          $arr["result"]="此用户已激活！";
          echo urldecode(json_encode($arr)); 
         // echo '{result:"此用户已激活！"}';

    }else{
       

      session_start();
      $num = 6;
      $code = ' ';
      for ($i = 0; $i < $num; $i++)//生成验证码
      {
			  $code[$i] = chr(rand(48, 57));//数字
      }
       $code="123456";
      $_SESSION["VerifyCode"] = $code;
/*
    
   	  try {   

      
       $templateId =106661;
	     $params =array();
       array_push($params,$code);
       array_push($params,2);
       $ssender = new SmsSingleSender($appid, $appkey);
       $result = $ssender->sendWithParam("86", $phone, $templateId,  	$params, $smsSign, "", ""); 
       $a=json_decode($result, true);
        if ($a["result"]==0)
        {
       
             
             mysql_query('insert into logs (msg) values ("'.$phone."   vcode: ".$code.'")');

             $arr["result"]="success";

             echo urldecode(json_encode($arr)); 
        }
        else
        {
          $arr["result"]="信息发送失败！";
          echo urldecode(json_encode($arr)); 
        }
         // $arr["result"]="success";
         // echo urldecode(json_encode($arr)); 
    } catch(\Exception $e) {
          $arr["result"]="信息发送失败！";
          echo urldecode(json_encode($arr)); 

		//echo "信息发送失败！";
    }
*/
   $arr["result"]="success";
          echo urldecode(json_encode($arr)); 
    }
  
}
?>
