<?php
/*
 图片验证码 Powered By KASON test <a href="http://www.jbxue.com/">http://www.jbxue.com</a>   */
session_start();
$num = 4;
//验证码个数
$width = 100;
//验证码宽度
$height = 30;
//验证码高度
$code = ' ';
for ($i = 0; $i < $num; $i++)//生成验证码
{
/*	switch(rand(0,2)) {
		case 0 :
			$code[$i] = chr(rand(48, 57));//数字
			break;
		case 1 :
			$code[$i] = chr(rand(65, 90));//大写字母
			break;
		case 2 :
		//	$code[$i] = chr(rand(97, 122));//小写字母
			$code[$i] = chr(rand(48, 57));//数字
			break;
	}*/
	$code[$i] = chr(rand(48, 57));//数字
}
//$code = '1234';
$_SESSION["VerifyCode"] = $code;
$image = imagecreate($width, $height);
imagecolorallocate($image, 255, 255, 255);
for ($i = 0; $i < 80; $i++)//生成干扰像素
{
	$dis_color = imagecolorallocate($image, rand(0, 2555), rand(0, 255), rand(0, 255));
	imagesetpixel($image, rand(1, $width), rand(1, $height), $dis_color);
}
for ($i = 0; $i < $num; $i++)//打印字符到图像
{
	$char_color = imagecolorallocate($image, rand(0, 2555), rand(0, 255), rand(0, 255));
	imagechar($image, 60, ($width / $num) * $i, rand(0, 5), $code[$i], $char_color);
}
header("Content-type:image/png");
imagepng($image);
//输出图像到浏览器
imagedestroy($image);
//释放资源
?>
