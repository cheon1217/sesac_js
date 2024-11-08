document.addEventListener("DOMContentLoaded", () => {
   checkLoginStatus();
   
   document.getElementById("loginButton").addEventListener("click", login);
   document.getElementById("logoutButton").addEventListener("click", logout);
});

async function checkLoginStatus() {
    try {
        const response = await fetch("/check-login");
        const data = await response.json();

        if (data.username) {
            showProfile(data.username);
        } else {
            showLoginForm();
        }
    } catch (err) {
        console.error("로그인 상태 확인 오류: ", err);
            showLoginForm();
    }
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        });
        
        if (response.status === 200) {
            const data = await response.json();
            console.log(data.message);
            checkLoginStatus();
        } else {
            throw new Error("로그인 실패");
        }
    } catch (err) {
        console.error("로그인 오류: ", err);
        alert("로그인 실패");
    }
}

async function logout() {
    try {
        const response = await fetch("/logout");
        const data = response.json();
    
        if (data.message === "로그아웃 성공") {
            showLoginForm();
        } else {
            alert("로그아웃 실패");
        }
    } catch (err) {
        console.error("로그아웃 오류: ", err);
        alert("로그아웃 실패");
    }
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