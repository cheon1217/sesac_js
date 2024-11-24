const orderId = window.location.pathname.split("/").pop();

fetchOrder(orderId);

async function fetchOrder(orderId) {
    const response = await fetch(`/api/orders/${orderId}`);
    const data = await response.json();

    const tableHeader = document.querySelector("#orderTable thead");
    const fields = Object.keys(data);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#orderTable tbody");
    const bodyRow = document.createElement("tr");
    for (const [key, value] of Object.entries(data)) {
        const td = document.createElement("td");
        if (key === "store_id") {
            td.innerHTML = `<a href="/stores/${value}">${value}</a>`
        } else if (key === "user_id") {
            td.innerHTML = `<a href="/users/${value}">${value}</a>` 
        } else {
            td.textContent = value;
        }
        bodyRow.appendChild(td);
    }
    tableBody.appendChild(bodyRow);
}