document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 동작 비활성화

    const query = document.getElementById("query").value.trim();
    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = `<li>loading...</li>`;
    
    // 나중에 try catch 넣기
    const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    resultsElement.innerHTML = "";

    if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
                <p>${item.description}</p>
                <small>Post Date: ${item.postdate}</small>
            `;
            resultsElement.appendChild(li);
        })
    } else {
        resultsElement.innerHTML = "<li>검색 결과가 없습니다.</li>";
    }
})