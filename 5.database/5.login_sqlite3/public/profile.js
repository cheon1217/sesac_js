document.addEventListener("DOMContentLoaded", () => {
    loadProfileData();

    document.getElementById("logout-btn").addEventListener("click", logout);
});

async function loadProfileData() {
    try {
        const response = await fetch("/profile-data");
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            document.getElementById("username").textContent = data.username;
            document.getElementById("email").textContent = data.email;
            document.getElementById("created_at").textContent = data.created_at;
            document.getElementById("role").textContent = data.role;
        } else {
            // console.log(response.status);
            window.location.href = "/";
        }
    } catch (err) {
        console.error("오류 발생: ", err);
    }
}

async function logout() {
    try {
        const response = await fetch("/logout");
        if (response.ok) {
            window.location.href = "/";
            console.log("로그아웃 성공");
        } else {
            console.log("로그아웃 실패");
        }
    } catch (err) {
        console.error("오류 발생: ", err);
    }
}