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
 
$username=$_GET["username"];	
//$act='cpjkd';
$phone=$_GET["smsphone"];

  $sqlstr="select * from customer where c_id=".$username." and instr(smsphone,'" . $phone . "')>0  " ;              // "   and smsphone='".$smsphone."'";
 
  $query = mysql_query($sqlstr);
  $rows=mysql_num_rows($query);
  if ($rows==0)
  {
          echo '{result:"非法ID 或电话号码！"}';

  }
  else
  {
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
   	    //echo '{result:"success"}';
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
?>
