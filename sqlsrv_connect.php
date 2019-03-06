<?php
 
 
$serverName = "NEPTUNE-PC"; //serverName\instanceName
$connectionInfo = array( "Database"=>"lccee", "UID"=>"sa", "PWD"=>"111111");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
  
if( $conn ) {
     echo "连接成功<br />";
}else{
     echo "连接失败<br />";
      
}
 
$query ="select * from phpwamp";
$result = sqlsrv_query($conn, $query);
while($row = sqlsrv_fetch_array($result)){
  
       print_r($row);
       echo "<br>";
}
 
?>