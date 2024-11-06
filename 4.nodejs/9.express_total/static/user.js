document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const userTable = document.getElementById("userTable");

    await updateTable();

    // form 버튼을 클릭해서 post
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 폼 자체의 기본 기능 못하게 막기

        const name = username.value;

        if (!name) {
            alert("이름을 입력하세요.");
            return;
        }

        try {
            const response = await fetch("/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                alert("등록 성공");
                username.value = ""; // 입력 필드 초기화
                // 등록 성공시 테이블 갱신
                await updateTable();
            } else {
                const errMessage = await response.text();
                alert(`등록 실패: ${errMessage}`);
            }
        } catch (err) {
            console.error("등록 중 오류 발생: ", err);
            alert("등록 중 오류 발생");
        }
    });

    async function updateTable() {
        await fetch("/user")
            .then(response => response.json())
            .then(users => showUsers(users))
            .catch(err => console.error("사용자 정보 불러오기 실패: ", err));
    }

    async function showUsers(users) {
        userTable.innerHTML = "";

        if (Object.keys(users).length === 0) {
            const message = createTableRow("등록된 사용자 없음");
            userTable.appendChild(message);
        } else {
            for (const key in users) {
                const row = createTableRow(`ID: ${key}, Name: ${users[key]}`);
                row.appendChild(createButton("수정", () => editUser(key)));
                row.appendChild(createButton("삭제", () => deleteUser(key)));
                userTable.appendChild(row);
            }
        }
    }

    function createTableRow(...contents) {
        const row = document.createElement("div");
        row.innerHTML = contents.join(", ");
        return row;
    }
    
    function createButton(content, func) {
        const button = document.createElement("button");
        button.textContent = content;
        button.addEventListener("click", func);
        return button;
    }

    async function editUser(userId) {
        const editName = prompt("수정할 이름을 입력하세요");
        if (editName !== null) {
            try {
                const response = await fetch(`/user/${userId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify({ name: editName }),
                });

                if (response.ok) {
                    alert("수정 성공");
                    await updateTable();
                } else {
                    const errMessage = await response.text();
                    alert(`수정 실패: ${errMessage}`);
                }
            } catch (err) {
                console.error("수정 중 오류: ", err);
                alert("오류 발생");
            }
        }
    }

    async function deleteUser(userId) {
        const alertDelete = confirm("정말로 삭제할겁니까?");
        if (alertDelete) {
            try {
                const response = await fetch(`/user/${userId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("삭제 성공");
                    await updateTable();
                } else {
                    const errMessage = await response.text();
                    alert(`삭제 실패: ${errMessage}`);
                }
            } catch (err) {
                console.error("삭제 중 오류: ", err);
                alert("오류 발생");
            }
        }
    }
});