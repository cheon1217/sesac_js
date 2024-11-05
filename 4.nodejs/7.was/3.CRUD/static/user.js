document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const userTable = document.getElementById("userTable");
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
                username.value = "";
            } else {
                const errMessage = await response.text();
                alert(`등록 실패: ${errMessage}`);
            }
        } catch (err) {
            console.error("등록 중 오류 발생: ", err);
            alert("등록 중 오류 발생");
        }
    });
});
