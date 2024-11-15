document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchQuery = document.getElementById("searchQuery").value;
    const searchList = document.getElementById("searchList").value;

    showSearchResult(searchQuery, searchList, 1);
});

async function showSearchResult(searchQuery, searchList, page) {
    try {
        const response = await fetch(`/search?searchQuery=${searchQuery}&searchList=${searchList}&page=${page}`);
        const data = await response.json();

        displayResult(data.results, data.searchList);
        displayPagination(data.searchQuery, data.searchList, data.currentPage, data.totalPages);
    } catch (err) {
        console.error("Error");
        alert("오류 발생");
    }
}

function displayResult(results, searchList) {
    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    if (results && results.length > 0) {
        results.forEach(result => {
            const li = document.createElement("li");

            if (searchList === "artist" || searchList === "genre" || searchList === "track") {
                li.textContent = result.Name;
            } else if (searchList === "album") {
                li.textContent = result.Title; 
            } else if (searchList === "composer") {
                li.textContent = result.Composer;
            } else if (searchList === "customer") {
                li.textContent = `${result.FirstName} ${result.LastName}`;
            }

            resultList.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "검색 결과 없음";
        resultList.appendChild(li);
    }
}

function displayPagination(searchQuery, searchList, currentPage, totalPages) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "prev";
    prevBtn.disabled = currentPage <= 1;
    prevBtn.onclick = () => showSearchResult(searchQuery, searchList, currentPage - 1);
    pagination.appendChild(prevBtn);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = `페이지 ${currentPage} / ${totalPages}`;
    pagination.appendChild(pageInfo);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "next";
    nextBtn.disabled = currentPage >= totalPages;
    nextBtn.onclick = () => showSearchResult(searchQuery, searchList, currentPage + 1);
    pagination.appendChild(nextBtn);
}