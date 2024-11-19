const storeDetailContainer = document.getElementById("store-detail-container");

const storeId = window.location.pathname.split("/").pop();
console.log(storeId);

function fetchStoreDetail() {
    fetch(`/api/stores/${storeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("상점 찾을 수 없음");
            }
            return response.json();
        })
        .then(store => {
            renderStoreDetail(store);
        })
        .catch(err => {
            storeDetailContainer.innerHTML = `<p>${err.message}</p>`;
        });
}

function renderStoreDetail(store) {
    const table = document.createElement("table");
    const fields = Object.keys(store);

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
        fieldValue.textContent = store[f];
        row.appendChild(fieldValue);

        table.appendChild(row);
    });

    storeDetailContainer.innerHTML = "";
    storeDetailContainer.appendChild(table);
}

fetchStoreDetail();