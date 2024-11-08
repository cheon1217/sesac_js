document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginButton").addEventListener("click", login);
    document.getElementById("logoutButton").addEventListener("click", logout);
});

function checkLoginStatus() {
    fetch("/check-login")
        .then(response => response.json())
        .then(data => {
            if (data && data.username) {
                console.log(data.username);
                showProfile(data.username);
            } else {
                showLoginForm();
            }
        })
}

function logout() {
    fetch("/logout")
        .then(response => {
            if (response.ok) {
                showLoginForm();
            } 
        });
}

function login(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("로그인 버튼 클릭");

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => {
            if (response.ok) {
                console.log("로그인 성공");
                // window.location.href = "/profile";
                showProfile(username);
            } else {
                console.log("로그인 실패");
            }
        })
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