const searchButton = document.getElementById("search-button");
const searchNameInput = document.getElementById("search-name");

let searchName = "";
let currentPage = 1;

searchButton.addEventListener("click", () => {
    searchName = searchNameInput.value;
    fetchUsers(1);
});

searchNameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchName = searchNameInput.value;
        fetchUsers(1);
    }
});

function fetchUsers(page) {
    currentPage = page;
    const queryString = `?page=${page}&name=${encodeURIComponent(searchName)}`;

    fetch(`/api/users${queryString}`)
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            // 랜더링 코드 작성
            renderTable(data.data);
            renderPagination(data.totalPages, currentPage);
        })
        .catch(err => {
            console.error("Error fetching users:", err);
        });
}

function renderTable(data) {
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
    // 헤더 그리기

    if (data.length > 0) {
        const fields = Object.keys(data[0]);
        const headerRow = document.createElement("tr");
        
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
}

function renderPagination(totalPages, currentPage) {
    const pagination = document.getElementById("pagination");

    pagination.innerHTML = "";

    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.textContent = "«";
        prev.href = "#";
        prev.addEventListener("click", (e) => {
            e.preventDefault();
            fetchUsers(currentPage - 1);
        });
        pagination.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.textContent = i;
        pageLink.href = "#";
        if (i === currentPage) {
            pageLink.classList.add("active");
        }
        pageLink.addEventListener("click", (e) => {
            e.preventDefault();
            fetchUsers(i);
        });
        pagination.appendChild(pageLink);
    }

    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.textContent = "»";
        next.href = "#";
        next.addEventListener("click", (e) => {
            e.preventDefault();
            fetchUsers(currentPage + 1);
        });
        pagination.appendChild(next);
    }
}

function parseURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    const name = urlParams.get("name") || "";
    searchNameInput.value = name;
    searchName = name;
    return { page, name };
}

const { page } = parseURLParams();
fetchUsers(page); // 시작할 때는 그냥 빈값으로 검색, 즉 모든 사용자 다 출력
