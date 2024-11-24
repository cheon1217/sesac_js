const itemId = window.location.pathname.split("/").pop();

fetchItem(itemId);
fetchSales(itemId);

async function fetchItem(itemId) {
    const response = await fetch(`/api/items/${itemId}`);

    const data = await response.json();

    const tableHeader = document.querySelector("#itemTable thead");
    const fields = Object.keys(data);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#itemTable tbody");

    const bodyRow = document.createElement("tr");
    for (const [__, value] of Object.entries(data)) {
        const td = document.createElement("td");
        
        td.textContent = value;

        bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
}

async function fetchSales(itemId) {
    const response = await fetch(`/api/items/month/${itemId}`);
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
        for(const [__, value] of Object.entries(row)) {
            const td = document.createElement("td");
            td.textContent = value;
            bodyRow.appendChild(td);
        }
        tableBody.appendChild(bodyRow);
    })
}