const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "news.html"));
});

const newsArticles = [
    "'역사의 평가' 두렵다는 崔대행 '尹체포 현안 불개입' 기조 연합뉴스 2025.01.07. 오전 11:36",
    "與 '공수처, 尹수사권 포기하라'…野 '다음엔 반드시 尹체포해야' 연합뉴스 2025.01.07. 오후 12:24",
    "日정부 '6일 北미사일 IRBM 추정…극초음속 무기 여부 분석 중' 연합뉴스 2025.01.07. 오후 12:23",
    "中티베트서 규모 7.1 지진으로 9명 사망…네팔·인도도 '흔들' 연합뉴스 2025.01.07. 오후 12:06",
    "'영끌'로 집 사느라…작년 3분기 가계 여윳돈 3.5조원 줄어 연합뉴스 2025.01.07. 오후 12:00",
    "'제주항공 참사 열흘째' 함박눈에 시간 멈춘 무안공항 연합뉴스 2025.01.07. 오전 11:29",
    "건강보험 4년 연속 흑자…누적 준비금 30조원 '역대 최대' 연합뉴스 2025.01.07. 오후 12:00",
    "당뇨환자 병원 접근성, 시군구별로 최대 5.8배 격차 연합뉴스 2025.01.07. 오후 12:00"
];

// SSE 엔드포인트
app.get("/news", (req, res) => {
    // 헤더 설정
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    const sendRandomNews = () => {
        const randomIndex = Math.floor(Math.random() * newsArticles.length);
        const news = newsArticles[randomIndex];
        res.write(`data: ${JSON.stringify({ news })}\n\n`);
    }

    // 2~5초마다 랜덤 뉴스 전송
    const interval = setInterval(() => {
        sendRandomNews();
    }, Math.floor(Math.random() * 3000) + 2000);

    req.on("close", () => {
        clearInterval(interval);
        console.log("사용자 도망감");
    });
});

app.listen(port, () => {        
    console.log(`Server is running on http://localhost:${port}`);
});