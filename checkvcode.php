<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
ini_set('display_errors', 'Off');
session_start();
if(strtoupper(($_POST['code'])) == strtoupper(($_SESSION['VerifyCode']))){
echo '验证码正确,';
}
else {
    echo '验证码错误,';
}
echo "提交的验证码:".strtoupper($_POST["code"]).",正确的验证码：".strtoupper($_SESSION["VerifyCode"]);
?>