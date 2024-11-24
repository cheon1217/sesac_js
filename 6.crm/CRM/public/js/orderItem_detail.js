const orderId = window.location.pathname.split("/").pop();

fetchOrderItem(orderId);

async function fetchOrderItem(orderId) {
    const response = await fetch(`/api/orderItems/${orderId}`);
    const data = await response.json();

    const tableHeader = document.querySelector("#orderTable thead");
    const fields = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    fields.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);

    const tableBody = document.querySelector("#orderTable tbody");

    data.forEach((row) => {
        const bodyRow = document.createElement("tr");
        for (const [key, value] of Object.entries(row)) {
            const td = document.createElement("td");
            if (key == "order_id") {
                td.innerHTML = `<a href="/orders/${value}">${value}</a>`
            } else if (key == "item_id") {
                td.innerHTML = `<a href="/items/${value}">${value}</a>`
            } else {
                td.textContent = value;
            }
            bodyRow.appendChild(td);
        }
        tableBody.appendChild(bodyRow);
    });
}