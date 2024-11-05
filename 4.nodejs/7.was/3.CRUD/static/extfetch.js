export async function getUsers() {
    try {
        const response = await fetch("/user");
        if (!response.ok) {
            throw new Error("사용자 정보 불어오기 실패");
        }
        return response.json();
    } catch (err) {
        console.error("사용자 정보 불러오기 실패: ", err);
        throw err;
    }
}

export async function addUser(name) {
    const response = await fetch("/user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(`등록 실패: ${errMessage}`);
    }
}

export async function updateUser(userId, data) {

}

export async function deleteUser(userId) {
    const response = await fetch(`/user/${userId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(`삭제 실패: ${errMessage}`);
    }
}