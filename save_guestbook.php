<?php
// 데이터베이스 연결 정보
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// 방명록 데이터 받아오기
$name = $_POST['name'];
$message = $_POST['message'];

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 방명록 데이터 저장
$sql = "INSERT INTO guestbook (name, message) VALUES ('$name', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "Guestbook entry saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
