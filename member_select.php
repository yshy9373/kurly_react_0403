<?

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');


$db_server      = 'localhost';
$db_user_name   = 'yshy9373';
$db_password    = 'donkey0702!';
$db_name        = 'yshy9373';

$conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
mysqli_set_charset($conn, 'utf8');


$sql = "SELECT id, email FROM front5_member_table";
$result = mysqli_query($conn, $sql);


$imsi = array(); 

if( mysqli_num_rows($result) >= 1 ){ 
    while( $row = mysqli_fetch_array($result) ){
        array_push($imsi, array(
            '아이디'=> $row['id'], 
            '이메일'=> $row['email'] 
        ));
    }
}


echo json_encode($imsi, JSON_UNESCAPED_UNICODE);


?>