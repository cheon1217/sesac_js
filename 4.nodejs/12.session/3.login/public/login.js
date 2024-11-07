document.addEventListener("DOMContentLoaded", () => {
   checkLoginStatus();
   
   document.getElementById("loginButton").addEventListener("click", login);
   document.getElementById("logoutButton").addEventListener("click", logout);
});

function checkLoginStatus() {
    fetch("/check-login")
        .then((response) => response.json())
        .then(data => {
            if (data.username) {
                showProfile(data.username);
            } else {
                showLoginForm();
            }
        })
        .catch(err => {
            console.error("로그인 상태 확인 오류: ", err);
            showLoginForm();
        });
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("로그인 실패");
            }
        })
        .then(data => {
            console.log(data.message);
            checkLoginStatus();
        })
        .catch(err => {
            console.error("로그인 오류: ", err);
            alert("로그인 실패");
        });
}

function logout() {
    fetch("/logout")
        .then(response => response.json())
        .then(data => {
            if (data.message === "로그아웃 성공") {
                showLoginForm();
            } else {
                alert("로그아웃 실패");
            }
        });
}

function showProfile(username) {
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("usernameSpan").innerText = username;
}

function showLoginForm() {
    document.getElementById("loginFormContainer").style.display = "block";
    document.getElementById("profile").style.display = "none";
}