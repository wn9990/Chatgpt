<?php
// 데이터베이스 연결 정보
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 방명록 데이터 조회
$sql = "SELECT * FROM guestbook";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 결과 출력
    while ($row = $result->fetch_assoc()) {
        echo "<p><strong>Name:</strong> " . $row["name"] . "</p>";
        echo "<p><strong>Message:</strong> " . $row["message"] . "</p>";
        echo "<hr>";
    }
} else {
    echo "No entries found in the guestbook.";
}

$conn->close();
?>
