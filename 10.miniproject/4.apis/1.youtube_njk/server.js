require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const nunjucks = require("nunjucks");

const app = express();
const PORT = 3000;

const API_KEY = process.env.YOUTUBE_API_KEY;

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// 사용자 정의 필터 등록
env.addFilter('stringify', function (obj) {
    return JSON.stringify(obj);
});

app.set("view engine", "html");

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/search", async (req, res) => {
    // 여기에서 실제로 youtube에 검색해서 결과를 반환한다.
    const query = req.query.q;
    if (!query) {
        return res.render("index");
    }

    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 10,
                key: API_KEY,
            },
        });
        // 왕창 다 던져주지
        // const videos = response.data.items;
        // 필요한 데이터만 골라서 주기
        const videos = response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: decodeHtmlEntities(item.snippet.title),
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium.url,
        }))
        // console.log(videos);
        res.render("index", { videos });
    } catch (err) {
        console.error("오류: ", err.message);
        return res.status(500).send("알 수 없는 서버 오류");
    }
});

function decodeHtmlEntities(text) {
    const entities = {
        '&#39;': "'",
        '&quot;': '"',
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
    }
    return text.replace(/&#39;|&quot;|&amp;|&lt:|&gt;/g, match => entities[match] || match);
}

app.get("/play", (req, res) => {
    const videoId = req.query.videoId;
    const videos = JSON.parse(decodeURIComponent(req.query.videos || "[]"));
    const selectedVideo = videos.find((video) => video.videoId === videoId);

    res.render("index", { videos, selectedVideo });
})

app.listen(PORT, () => {
    console.log("Server Ready");
});