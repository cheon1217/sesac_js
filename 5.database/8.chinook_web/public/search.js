document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 폼 기능 비활성화 GET/POST 폼이 직접 요청하는 것 못하게 함

    const searchQuery = document.getElementById("searchQuery").value;

    search(searchQuery, 1);
});

async function search(searchQuery, page) {
    // 폼 대신 내가 할 일 - 입력값 가져온다.
    console.log(searchQuery);

    // 2. 요청한다 - GET은 BODY가 없는 것이 표준
    // const response = await fetch("/api/search", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({ searchQuery })
    // });
    // GET 파리미터, 즉 URL로 ? 인자값으로 보낸다.
    const response = await fetch(`/api/search?searchQuery=${encodeURIComponent(searchQuery)}&page=${page}`);
    const data = await response.json();
    console.log(data);

    // 3. 받아온걸 DOM에 랜더링한다.
    const results = document.getElementById("results");
    results.innerHTML = ""; // 기존에 있는 것 초기화

    if (data.results && data.results.length > 0) {
        data.results.forEach((artist) => {
            const li = document.createElement("li");
            li.textContent = artist.Name;
            results.appendChild(li);
        })
    } else {
        const li = document.createElement("li");
        li.textContent = "검색 결과가 없습니다.";
        results.appendChild(li);
    }

    // 4. 페이징 처리를 한다.
    displayPagination(searchQuery, parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(searchQuery, currPage, totalPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // 이전 버튼 추가
    const prevButton = document.createElement("button");
    prevButton.textContent = "이전";
    
    pagination.appendChild(prevButton);

    // 내용 출력
    const pageInfo = document.createElement("span");
    pageInfo.textContent = `페이지 ${currPage} / ${totalPage}`;
    pagination.appendChild(pageInfo);

    // 다음 버튼 추가
    const nextButton = document.createElement("button");
    nextButton.textContent = "다음";
    nextButton.onclick = () => search(searchQuery, currPage + 1);
    pagination.appendChild(nextButton);
}