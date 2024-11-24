const userId = window.location.pathname.split("/").pop();

fetchUserDetail(userId);
fetchOrderDetail(userId);
fetchStore5(userId);
fetchItem5(userId);

async function fetchUserDetail(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        const tableHeader = document.querySelector("#userTable thead");
        tableHeader.innerHTML = "";
        const fields = Object.keys(data);
        const headerRow = document.createElement("tr");
        fields.forEach((field) => {
            const th = document.createElement("th");
            th.textContent = field;

            headerRow.appendChild(th);
        });
        tableHeader.appendChild(headerRow);

        const tableBody = document.querySelector("#userTable tbody");
        tableBody.innerHTML = "";
        const bodyRow = document.createElement("tr");
        for (const [__, value] of Object.entries(data)) {
            const td = document.createElement("td");
            td.textContent = value;
            bodyRow.appendChild(td);
        }
        tableBody.appendChild(bodyRow);
    } catch (err) {
        console.error(err);
    }
}

async function fetchOrderDetail(userId) {
    const response = await fetch(`/api/users/${userId}/orderInfo`);
    const data = await response.json();

    const tableHeader = document.querySelector("#orderTable thead");
    const headerRow = document.createElement("tr");
    const fields = Object.keys(data[0]);
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
            if (key === "order_id") {
                td.innerHTML = `<a href="/orderItems/${value}">${value}</a>`;
            } else if (key === "purchased_store") {
                td.innerHTML = `<a href="/stores/${value}">${value}</a>`
            } else {
                td.textContent = value;
            }
            bodyRow.appendChild(td);
        }
        tableBody.appendChild(bodyRow);
    });
}

async function fetchStore5(userId) {
    const response = await fetch(`/api/users/stores/${userId}`);
    const data = await response.json();
    const ul = document.getElementById("visitTop5");
    data.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = `${row.name} (${row.count}번 방문)`;
        ul.appendChild(li);
    });
}

async function fetchItem5(userId) {
    const response = await fetch(`/api/users/items/${userId}`);
    const data = await response.json();
    const ul = document.getElementById("orderTop5");
    data.forEach((row) => {
        const li = document.createElement("li");
        li.textContent = `${row.name} (${row.count}번 주문)`;
        ul.appendChild(li);
    });
}