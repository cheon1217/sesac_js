// document.addEventListener("DOMContentLoaded", () => {

// })

function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then(data => {
        if (data.message === "로그인 성공") {

        } else {
            alert("로그인 실패");
        }
    });
}

function checkLoginStatus() {
    fetch("/check-login")
        .then((response) => response.json())
        .then(data => {
            if (data.username) {
                
            } else {

            }
        })
}