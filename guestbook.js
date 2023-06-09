// 방명록 작성 폼 제출 시 실행되는 함수
function submitGuestbookForm(event) {
    event.preventDefault(); // 폼 전송 기본 동작 막기

    // 입력한 값 가져오기
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    // 서버로 데이터 전송
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_guestbook.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // 서버 응답 처리
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // 성공적으로 저장되었을 경우 방명록 목록 업데이트
                updateGuestbookList();
            }
        }
    };
    xhr.send('name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message));
}

// 방명록 목록 업데이트 함수
function updateGuestbookList() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_guestbook.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // 서버 응답 처리
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // 방명록 목록 업데이트
                var guestbookList = document.getElementById('guestbookList');
                guestbookList.innerHTML = ''; // 목록 초기화

                // 방명록 데이터를 동적으로 추가
                response.data.forEach(function(entry) {
                    var guestbookEntry = document.createElement('div');
                    guestbookEntry.innerHTML = '<strong>' + entry.name + '</strong>: ' + entry.message;
                    guestbookList.appendChild(guestbookEntry);
                });
            }
        }
    };
    xhr.send();
}

// 폼 제출 이벤트 리스너 등록
document.getElementById('guestbookForm').addEventListener('submit', submitGuestbookForm);

// 페이지 로드 시 방명록 목록 업데이트
updateGuestbookList();