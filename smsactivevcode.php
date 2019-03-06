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
include_once ('mysql_connect.php');
 
$khid=$_GET["khid"];	
$userid=$_GET["userid"];	


$phone=$_GET["smsphone"];

if ($khid>0){
    $sqlstr="select userid,smsactive from khusers where userid=".$userid." and smsphone='" . $phone . "' and khid=".$khid ;
  
}else{
   $sqlstr="select userid,smsactive from users where userid=".$userid." and smsphone='" . $phone . "' " ;
  
}




 
  $query = mysql_query($sqlstr);
  $rows=mysql_num_rows($query);
  if ($rows==0)
  {
          // echo "非法ID 或电话号码！". $sqlstr;
           echo '{result:"非法ID 或电话号码！"}';
           

  }
  else
  {
     $smsactive=0;
	  while ($row = mysql_fetch_array($query)) {
			$smsactive= $row['smsactive'];
		}
    if  ($smsactive==1)
    {
          echo '{result:"此用户已激活！"}';

    }else{
       

      session_start();
      $num = 6;
      $code = ' ';
      for ($i = 0; $i < $num; $i++)//生成验证码
      {
			  $code[$i] = chr(rand(48, 57));//数字
      }
      $_SESSION["VerifyCode"] = $code;
    
   	try {   
     $templateId =106661;
	   $params =array();//
     array_push($params,$code);
     array_push($params,5);



     $ssender = new SmsSingleSender($appid, $appkey);
   	   // echo '{result:"success"}'.$smsactive;
       
       $result = $ssender->sendWithParam("86", $phone, $templateId,  	$params, $smsSign, "", ""); 

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
    }
  
}
?>
