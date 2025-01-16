const express = require("express");
const morgan = require("morgan");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

if (!openai.apiKey) {
    console.error("OpenAI API 키가 설정되어 있지 않습니다.");
    process.exit(1);
}

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// 사용자 후기를 저장할 배열
let reviews = [];

app.get("/api/reviews", async (req, res) => {
    res.json({ reviews });
});

app.post("/api/reviews", async (req, res) => {
    const { rating, comment } = req.body;
    console.log("사용자 입력: ", rating, comment);

    reviews.push({ rating, comment });
    res.status(201).json({ message: "리뷰가 성공적으로 저장되었습니다." });
})

app.get("/api/ai-summary", async (req, res) => {
    if (reviews.length === 0) {
        return res.json({ summary: "아직 후기가 없습니다.", averageRating: 0 });
    }

    const averageRating = reviews.reduce((total, review) => total + parseInt(review.rating), 0) / reviews.length;
    console.log("평균 평점: ", averageRating);

    const reviewsText = reviews.map(review => `평점은 ${review.rating}점이고, 다음과 같은 후기를 남겼습니다: ${review.comment}`).join("\n\n");
   
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "너는 휴기를 분석하는 전문가야. 아래 글을 바탕으로 한글로 간략히 요약해줘" },
                { role: "user", content: `다음을 보고 간결하게 요약해주시오: \n\n ${reviewsText}` }
            ],
            temperature: 0.7, // 0~1 사이의 값, 1.0으로 갈수록 창의적
        });

        const summary = response.choices[0].message.content;
        console.log("챗봇 응답: ", summary);

        res.json({summary, averageRating});
    } catch (error) {
        console.error("API 요청 실패: ", error.message);
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error("API 키가 잘못되었습니다.");
            } else if (status === 429) {
                console.error("당신의 API 요청이 제한되었습니다. 나중에 다시 시도하세요.");
            }
        }
        res.status(500).json("챗봇 응답을 가져오는 도중에 오류가 발생했습니다."); 
    }
})

app.listen(3000, () => {
    console.log("서버레디");
});