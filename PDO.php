<?php

 try {
   $dbName = "sqlsrv:Server=127.0.0.1;Database=lccee";   //服务器IP
   $dbUser = "sa";    //登陆账号
   $dbPassword = "111111";    //登陆密码

   $db = new PDO($dbName, $dbUser, $dbPassword);   
    
   if ($db)   
  {       
     echo "恭喜你！数据库连接成功了！！<br />";   
   }


     }
        catch (Exception $e){ echo "数据库连接失败！！";   }

?>

