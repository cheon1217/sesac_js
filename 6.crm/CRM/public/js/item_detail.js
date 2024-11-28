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
    });

    chartGraph(data);
}

async function chartGraph(data) {
    const labels = data.map((d) => d.Month);
    const revenues = data.map((d) => d["Revenue"]);
    const counts = data.map((d) => d["Count"]);

    const ctx = document.getElementById("monthlySalesChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total Revenue",
                    data: revenues,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.7)",
                    borderWidth: 1,
                    yAxisID: "y"
                },
                {
                    type: "line",
                    label: "Count",
                    data: counts,
                    borderColor: "rgba(153, 102, 255, 1)",
                    backgroundColor: "rgba(153, 102, 255, 0.7)",
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: "y1"
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: "linear", 
                    position: "left",
                    title: {
                        display: true,
                        text: "총 매출액",
                    },
                },
                y1: {
                    type: "linear",
                    position: "right",
                    title: {
                        display: true,
                        text: "개수",
                    },
                    grid: {
                        drawOnChartArea: false,  
                    }
                }
            }
        }
    });
}