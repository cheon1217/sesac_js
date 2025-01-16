let reviews = [];

async function submitReview() {
    const rating = parseInt(document.querySelector("input[name='rating']:checked").value);
    const comment = document.getElementById("comment").value;

    try {
        const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating, comment }),
        })

        console.log(response);

        await getReviews();
        await fetchAISummary();
    } catch (error) {
        console.error("리뷰 저장 실패: ", error.message);
    }
}

async function getReviews() {
    try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        reviews = data.reviews
        console.log(reviews);
        displayReviews();
    } catch (error) {
        console.error("리뷰 가져오기 실패: ", error.message);
    }
}   

window.onload = async () => {
    await getReviews();
}

function displayReviews() {
    const reviewsContainer = document.getElementById("reviews-container");

    // 현재 있는 것부터 삭제
    reviewsContainer.querySelectorAll(".review-box").forEach(box => box.remove());

    // 새로 추가
    reviews.forEach(review => {
        const reviewBox = document.createElement("div");
        reviewBox.className = "review-box";
        reviewBox.innerHTML = `
            <p>Rating: ${review.rating}점</p]>
            <p>${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewBox);
    })
}

async function fetchAISummary() {
    try {
        const response = await fetch("/api/ai-summary");
        const data = await response.json();
        const aisummary = data.summary;
        console.log(reviews);
        displayAIReviews(aisummary, data.averageRating);
    } catch (error) {
        console.error("리뷰 summary 가져오기 실패: ", error.message);
    }
}

function displayAIReviews(summary, score) {
    const summaryContainer = document.getElementById("ai-summary");
    summaryContainer.innerHTML = `<p><strong>AI 요약: </strong>${summary}</p><p><strong>평균 평점: </strong>${score}점</p>`;
}