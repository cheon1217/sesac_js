const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchNameInput = document.getElementById("search-name");
    const gender = document.getElementById("gender").value;

    fetchUsers(searchName, gender);
})

async function fetchUsers(searchName, gender) {
    try {
        const response = await fetch(`/api/users/?name=${searchName}&gender=${gender}`,
            {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({
                    name: searchName,
                    gender: gender,
                }),
            }
        );
        const data = await response.json();
        console.log("유저 정보: ", data);
        renderTable(data.data);
        renderPagination();
    } catch (err) {
        console.error(err);
    }
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
