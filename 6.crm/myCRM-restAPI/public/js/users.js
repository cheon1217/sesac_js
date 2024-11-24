const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchNameInput = document.getElementById("search-name").value;
    const gender = document.getElementById("gender").value;

    fetchUsers(searchNameInput, gender);
})

async function fetchUsers(searchName, gender) {
    try {
        const response = await fetch(`/api/users/?name=${searchName}&gender=${gender}`,
            {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({
                    name: searchName,
                    gender,
                }),
            }
        );
        const data = await response.json();
        console.log("유저 정보: ", data);
        renderTable(data.data);
        renderPagination(data.total, data.page, data.name, data.gender);
    } catch (err) {
        console.error(err);
    }
}

async function fetchUsers(page) {
    try {
        const params = new window.URLSearchParams(window.location.search);
        const name = params.get("name") || "";
        const gender = params.get("gender") || "";
        const response = await fetch(`/api/users/${page}?name=${name}&gender=${gender}`);
        const data = await response.json();
        renderTable(data.data);
        renderPagination(data.total, data.page, data.name, data.gender);
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
            if (f !== "Address") {
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
                if (key !== "Address") {
                    const td = document.createElement("td");
                    td.textContent = value;
                    bodyRow.appendChild(td);
                }
            }
            tableBody.appendChild(bodyRow);
        });
    }
}

function renderPagination(totalArr, currentPage, name, gender) {
    const ul = document.getElementById("page-ul");
    ul.innerHTML = "";
    totalArr.forEach((page) => {
        const li = document.createElement("li");
        li.classList.add("page-li");
        li.innerHTML = `<a href="/users/${page}">${page}</a>`;
        ul.appendChild(li);

        if (currentPage === page) {
            li.classList.add("active");
        }
        if (page === "...") {
            li.classList.add("disabled");
            const link = li.querySelector("a");
            link.removeAttribute("href");
            link.style.pointerEvents = "none";
        }
    });
    
}

const page = window.location.pathname.split("/").pop() || 1;
fetchUsers(page); // 시작할 때는 그냥 빈값으로 검색, 즉 모든 사용자 다 출력