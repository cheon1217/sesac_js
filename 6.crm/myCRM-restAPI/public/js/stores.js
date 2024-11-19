let currentPage = 1;

async function fetchStores(page = 1) {
    currentPage = page;
    try {
        const response = await fetch(`/api/stores?page=${page}`);
        const data = await response.json();

        renderTable(data.data);
        renderPagination(data.totalPages, currentPage);
    } catch (err) {
        console.error("Error fetching stores:", err);
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
            if (f !== "Id") {
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
                window.location = `/stores/${row.Id}`;
            });
        
            for (const [key, value] of Object.entries(row)) {
                if (key !== "Id") {
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
            fetchStores(currentPage - 1);
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
            fetchStores(i);
        });
        pagination.appendChild(pageLink);
    }

    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.textContent = "»";
        next.href = "#";
        next.addEventListener("click", (e) => {
            e.preventDefault();
            fetchStores(currentPage + 1);
        });
        pagination.appendChild(next);
    }
}

fetchStores();