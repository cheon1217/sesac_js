document.addEventListener("DOMContentLoaded", () => {
    fetchUser("", "", 1);

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("inputName").value;
        const gender = document.getElementById("gender").value;

        fetchUser(name, gender, 1);
    });
});

async function fetchUser(name, gender, currentPage) {
    const response = await fetch(`api/users?name=${encodeURIComponent(name)}&gender=${encodeURIComponent(gender)}&page=${currentPage}`);

    if (!response.ok) {
        console.log("fetch Error");
        const result = document.getElementById("result");

        try {
            const errorData = await response.json();
            result.innerHTML = `<p>${errorData.message}</p>`
        } catch (err) {
            console.error(err);
        }
        return;
    }

    const data = await response.json();

    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    const headerRow = document.createElement("tr");
    const fields = Object.keys(data.result[0]);
    fields.forEach((field) => {
        if (field !== "Address") {
            const th = document.createElement("th");

            if (field === "Birthdate") {
                th.textContent = "Birthday";
            } else {
                th.textContent = field;
            }

            headerRow.appendChild(th);
        }
    });
    tableHeader.appendChild(headerRow);

    data.result.forEach((row) => {
        const bodyRow = document.createElement("tr");

        for (const [key, value] of Object.entries(row)) {
            if (key != "Address") {
                const td = document.createElement("td");

                if (key === "Id") {
                    td.innerHTML = `<a href="/user_detail/${row.Id}">${value}</a>`;
                } else {
                    td.textContent = value;
                }

                bodyRow.appendChild(td);
            }
        }
        tableBody.appendChild(bodyRow);
    });

    displayPagination(name, gender, parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(name, gender, currentPage, totalPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "이전";
    if (currentPage > 1) {
        prevButton.onclick = () => fetchUser(name, gender, currentPage - 1);
    }
    pagination.appendChild(prevButton);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `${currentPage} / ${totalPage}`;
    pagination.appendChild(pageInfo);

    const nextButton = document.createElement("button");
    nextButton.textContent = "다음";
    if (currentPage < totalPage) {
        nextButton.onclick = () => fetchUser(name, gender, currentPage + 1);
    }
    pagination.appendChild(nextButton);
}