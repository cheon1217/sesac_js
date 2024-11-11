 export async function fetch_checkLoginStatus() {
    try {
        const response = await fetch("/api/check-login");
        const userData = await response.json();

        if (userData.username) {
            document.getElementById("user-info").innerHTML = `
                ${userData.username}님
                <span class="logout-btn" id="logout">Logout</span>
            `
            document.getElementById("user-info").style.display = "block";

            document.getElementById("logout").addEventListener("click", logout);

            // showProfile(userData.username);
            return userData.username;
        } else {
            document.getElementById("user-info").style.display = "none";
            return null;
        }
    } catch (err) {
        console.error("Error fetching user info: ", err);
        return null;
    }
    // return fetch("/api/check-login")
    //     .then((response) => response.json())
    //     .then((userData) => {
    //         if (userData.username) {
    //             document.getElementById("user-info").innerHTML = `
    //                 ${userData.username}님
    //                 <span class="logout-btn" id="logout">Logout</span>
    //             `
    //             document.getElementById("user-info").style.display = "block";

    //             document.getElementById("logout").addEventListener("click", logout);

    //             // showProfile(userData.username);
    //             return userData.username;
    //         } else {
    //             document.getElementById("user-info").style.display = "none";
    //             return null;
    //         }
    //     })
    //     .catch((err) => {
    //         console.error("Login Check Error: ", err.message);
    //         return null;
    //     })
}

function logout() {
    fetch("/api/logout")
        .then((response) => {
            if (response.status === 200) {
                // 로그아웃 성공 시 홈으로 돌려보내기
                // window.location.href = "/";
                return response.json();
            } else {
                // 로그아웃 실패
                throw new Error("로그아웃 실패");
            }
        })
        .then((data) => {
            alert(data.message);

            if (data.redirectUrl) { // 이 케이스는 벡엔드에서 로그아웃 이후 갈 곳을 보내주는 경우
                window.location.href = data.redirectUrl;
            } else {
                window.location.reload();
            }
        })
        .catch(error => {
            alert("로그아웃 실패");
        });
}