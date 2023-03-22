<?

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$db_server      = 'localhost';
$db_user_name   = 'yshy9373';
$db_password    = 'donkey0702!';
$db_name        = 'yshy9373';

$conn = mysqli_connect($db_server, $db_user_name, $db_password, $db_name);
mysqli_set_charset($conn, 'utf8');


$id         = $_POST['id'];
$pw         = $_POST['pw'];
$irum       = $_POST['irum'];
$email      = $_POST['email'];
$hp         = $_POST['hp'];
$addr       = $_POST['addr']; 
$gender     = $_POST['gender'];
$birth      = $_POST['birth']; 
$addInput  = $_POST['addInput'];
$service    = $_POST['service'];
$gaibDate  = $_POST['gaibDate'];


$sql = "INSERT INTO front5_member_table(id, pw, irum, email, hp, addr, gender, birth, add_input, service, gaib_date) 
        VALUES('$id', '$pw', '$irum', '$email', '$hp', '$addr', '$gender', '$birth', '$addInput', '$service', '$gaibDate')"; 
$result = mysqli_query($conn, $sql);


if( !$result ){
    echo('데이터베이스 데이터 저장 실패!');
}
else {
    echo( $irum . '데이터베이스 데이터 저장 성공!');
}


?>