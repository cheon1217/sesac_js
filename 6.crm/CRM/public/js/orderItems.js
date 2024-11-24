document.addEventListener("DOMContentLoaded", () => {
    fetchItems(1);
});

async function fetchItems(page) {
    const response = await fetch(`/api/orderItems?page=${page}`);

    const data = await response.json();

    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    const headerRow = document.createElement("tr");
    const fields = Object.keys(data.result[0]);
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    data.result.forEach((row) => {
        const bodyRow = document.createElement("tr");

        for (const [key, value] of Object.entries(row)) {
            const td = document.createElement("td");
            if (key === "order_id") {
                td.innerHTML = `<a href="/orders/${value}">${value}</a>`;
            } else if (key === "item_id") {
                td.innerHTML = `<a href="/items/${value}">${value}</a>`;
            } else {
                td.textContent = value;
            }
            bodyRow.appendChild(td);
        }
        tableBody.appendChild(bodyRow);
    });
    displayPagination(parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(currentPage, totalPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "이전";
    if (currentPage > 1) {
        prevButton.onclick = () => fetchItems(currentPage - 1);
    }
    pagination.appendChild(prevButton);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `${currentPage} / ${totalPage}`;
    pagination.appendChild(pageInfo);

    const nextButton = document.createElement("button");
    nextButton.textContent = "다음";
    if (currentPage < totalPage) {
        nextButton.onclick = () => fetchItems(currentPage + 1);
    }
    pagination.appendChild(nextButton);
}