const userDetailContainer = document.getElementById("user-detail-container");

const userId = window.location.pathname.split("/").pop();
console.log(userId);

function fetchUserDetail() {
    fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("사용자 찾을 수 없음");
            }
            return response.json();
        })
        .then(user => {
            renderUserDetail(user);
        })
        .catch(err => {
            userDetailContainer.innerHTML = `<p>${err.message}</p>`;
        });
}

function renderUserDetail(user) {
    const table = document.createElement("table");
    const fields = Object.keys(user);

    const headerRow = document.createElement("tr");
    const headers = ["필드", "값"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    fields.forEach(f => {
        const row = document.createElement("tr");

        const fieldName = document.createElement("td");
        fieldName.textContent = f;
        row.appendChild(fieldName);

        const fieldValue = document.createElement("td");
        fieldValue.textContent = user[f];
        row.appendChild(fieldValue);

        table.appendChild(row);
    });

    userDetailContainer.innerHTML = "";
    userDetailContainer.appendChild(table);
}

fetchUserDetail();