document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                // headers: {"Content-Type": "application/json"},
                // body: JSON.stringify({ username, password })
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: new URLSearchParams({ username, password })
            });

            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // alert("로그인 실패");
                // window.location.href = "/";
                const data = await response.text();
                document.getElementById("login-message").textContent = data;
            }
        } catch (err) {
            console.error("오류 발생: ", err);
        }
    })
});