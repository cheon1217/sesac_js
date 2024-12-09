document.getElementById("searchButton").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;
    if (!query) return alert("Please enter a search term");

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    const playerContainer = document.getElementById("player");
    playerContainer.innerHTML = "";

    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const videos = await response.json();

        videos.forEach(video => {
            const listItem = document.createElement("li");

            listItem.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <h3>${video.snippet.title}</h3>
                        <p>${video.snippet.description}</p>
                    </div>
                    <button class="copy-btn" style="margin-left: 10px; cursor: pointer;" title="Copy URL">📋</button>
                </div>
            `;

            // 마우스 오버 시 Youtube URL 표시
            const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

            // 클릭 이벤트로 플레이어 업데이트
            listItem.addEventListener("click", () => {
                playerContainer.innerHTML = `
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/${video.id.videoId}?autoplay=1"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture
                        allowfullscreen>
                    </iframe>
                `;
            });

            listItem.querySelector(".copy-btn").addEventListener("click", (e) => {
                e.stopPropagation(); // 부모 이벤트 전파 방지
                navigator.clipboard.writeText(videoUrl).then(() => {
                    alert(`URL copied to clipboard!: \n${videoUrl}`);
                }).catch(err => {
                    console.error("Failed to copy URL: ", err);
                    alert("Failed to copy URL.");
                });
            });

            resultsContainer.appendChild(listItem);
        });
    } catch (err) {
        console.error("Error fetching videos: ", err);
        alert("Failed to fetch videos.");
    }
});