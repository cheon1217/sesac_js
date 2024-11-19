const itemDetailContainer = document.getElementById("item-detail-container");

const itemId = window.location.pathname.split("/").pop();
console.log(itemId);

function fetchItemDetail() {
    fetch(`/api/items/${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("아이템 찾을 수 없음");
            }
            return response.json();
        })
        .then(item => {
            renderItemDetail(item);
        })
        .catch(err => {
            itemDetailContainer.innerHTML = `<p>${err.message}</p>`;
        });
}

function renderItemDetail(item) {
    const table = document.createElement("table");
    const fields = Object.keys(item);

    const headerRow = document.createElement("tr");
    const headers = ["필드", "값"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    fields.forEach(f => {
        const row = document.createElement("tr");

        const fieldName = document.createElement("td");
        fieldName.textContent = f;
        row.appendChild(fieldName);

        const fieldValue = document.createElement("td");
        fieldValue.textContent = item[f];
        row.appendChild(fieldValue);

        table.appendChild(row);
    });

    itemDetailContainer.innerHTML = "";
    itemDetailContainer.appendChild(table);
}

fetchItemDetail();