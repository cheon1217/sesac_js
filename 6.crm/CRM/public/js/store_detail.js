const storeId = window.location.pathname.split("/").pop();

fetchStore(storeId);
fetchSales(storeId);
fetchPatrons(storeId);

const backButton = document.getElementById("back");
backButton.addEventListener("click" , () => {
    fetchStore(storeId);
    fetchSales(storeId);
    fetchPatrons(storeId);
});

async function fetchStore(storeId) {
    const response = await fetch(`/api/stores/${storeId}`);

    const data = await response.json();

    const tableHeader = document.querySelector("#storeTable thead");
    tableHeader.innerHTML = "";

    const fields = Object.keys(data);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#storeTable tbody");
    tableBody.innerHTML = "";

    const bodyRow = document.createElement("tr");
    for (const [key, value] of Object.entries(data)) {
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
}

async function fetchSales(storeId) {
    const response = await fetch(`/api/stores/month/${storeId}`);
    const data = await response.json();

    const tableHeader = document.querySelector("#monthlySalesTable thead");
    tableHeader.innerHTML = "";

    const fields = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#monthlySalesTable tbody");
    tableBody.innerHTML = "";

    data.forEach((row) => {
        const bodyRow = document.createElement("tr");
        for(const [key, value] of Object.entries(row)) {
            if (key === "month") {
                const link = document.createElement("a");
                link.textContent = value;

                link.addEventListener("click", (e) => {
                    e.preventDefault();

                    updateMonthlySalesTable(storeId, value);

                    updatePatronsTable(storeId, value);
                });
                const td = document.createElement("td");
                td.appendChild(link);
                bodyRow.appendChild(td);
            } else if (key === "revenue") {
                const td = document.createElement("td");
                td.textContent = `${value}원`;
                bodyRow.appendChild(td);
            } else {
                const td = document.createElement("td");
                td.textContent = `${value}개`;
                bodyRow.appendChild(td);
            }
        }
        tableBody.appendChild(bodyRow);
    })
}

async function fetchPatrons(storeId) {
    const response = await fetch(`/api/stores/users/${storeId}`);

    const data = await response.json();

    const tableHeader = document.querySelector("#patronsTable thead");
    tableHeader.innerHTML = "";

    const fields = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#patronsTable tbody");
    tableBody.innerHTML = "";

    data.forEach((row) => {
        const tableRow = document.createElement("tr");
        for (const [key, value] of Object.entries(row)) {
            const td = document.createElement("td");
            if (key === "user_id") {
                td.innerHTML = `<a href="/users/${value}">${value}</a>`;
            } else {
                td.textContent = value;
            }
            tableRow.appendChild(td);
        }
        tableBody.appendChild(tableRow);
    });
}

async function updateMonthlySalesTable(storeId, value) {
    const response = await fetch(`/api/stores/month/detail/${storeId}?date=${value}`);
    const data = await response.json();

    const tableBody = document.querySelector("#monthlySalesTable tbody");
    tableBody.innerHTML = "";

    data.forEach((row) => {
        const tableRow = document.createElement("tr");

        for (const [key, value] of Object.entries(row)) {
            if (key === "revenue") {
                const td = document.createElement("td");
                td.textContent = `${value}원`;
                tableRow.appendChild(td);   
            } else if (key === "count") {
                const td = document.createElement("td");
                td.textContent = `${value}개`;
                tableRow.appendChild(td); 
            } else {
                const td = document.createElement("td");
                td.textContent = value;
                tableRow.appendChild(td);   
            }
        }
        tableBody.appendChild(tableRow);
    });
}

async function updatePatronsTable(storeId, value) {
    const response = await fetch(`/api/stores/users/detail/${storeId}?date=${value}`);
    const data = await response.json();

    const tableBody = document.querySelector("#patronsTable tbody");
    tableBody.innerHTML = "";

    data.forEach((row) => {
        const bodyRow = document.createElement("tr");

        for (const [key, value] of Object.entries(row)) {
            const td = document.createElement("td");
            if (key === "user_id") {
                td.innerHTML = `<a href="/user_detail/${value}">${value}</a>`
            } else {
                td.textContent = value;
            }
            bodyRow.appendChild(td);   
        }
        tableBody.appendChild(bodyRow);
    });
}