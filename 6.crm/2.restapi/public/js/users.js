const searchButton = document.getElementById("search-button");
const searchNameInput = document.getElementById("search-name");

let searchName = "";

searchButton.addEventListener("click", () => {
    searchName = searchNameInput.value;
    fetchUsers();
});

function fetchUsers() {
    fetch("/api/users")
    .then((response) => response.json())
    .then(data => {
        // console.log(data);
        // 랜더링 코드 작성
        renderTable(data);
    });
}

function renderTable(data) {
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
    // 헤더 그리기
    const headerRow = document.createElement("tr");
    const fields = Object.keys(data[0]);
    
    fields.forEach(f => {
        if (f !== "Id" && f !== "Address") {
            const th = document.createElement("th");
            th.textContent = f;
            headerRow.appendChild(th);
        }
    });
    tableHeader.appendChild(headerRow); 

    // 바디 그리기: tr 안에 td 그리기

    data.forEach(row => {
        const bodyRow = document.createElement("tr");
        bodyRow.addEventListener("click", () => {
            window.location = `/users/${row.Id}`;
        });

        for (const [key, value] of Object.entries(row)) {
            if (key !== "Id" && key !== "Address") {
                const td = document.createElement("td");
                td.textContent = value;
                bodyRow.appendChild(td);
            }
        }
        tableBody.appendChild(bodyRow);
    });
}

fetchUsers(); // 시작할 때는 그냥 빈값으로 검색, 즉 모든 사용자 다 출력