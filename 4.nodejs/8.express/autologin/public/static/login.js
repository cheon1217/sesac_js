// 함수를 선언하여 쿠키가 존재하는 경우 체크박스 설정
function checkRememberMe() {
    const rememberMeCheckbox = document.getElementById("rememberMe");
    const rememberMeCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("rememberMe="));

    if (rememberMeCookie) {
        // 쿠키가 존재하는 경우 체크박스를 체크
        rememberMeCheckbox.checked = true;
    }
}

// 페이지 로딩시 함수 호출
checkRememberMe();

function submitForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // fetch 사용하여 서버에 로그인 요청
    // 응답에 따라 적절한 처리 수행
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            username: username,
            password: password,
            rememberMe: rememberMe,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                alert(data.message);
                window.location.href = data.redirectUrl;
            } else {
                alert(data.message);
            }
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}