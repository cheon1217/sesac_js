const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "progress2.html"));
});

// SSE 엔드포인트
app.get("/progress", (req, res) => {
    // 헤더 설정
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
        }
        res.write(`data: ${JSON.stringify({progress})}\n\n`);
    }, 1000);

    req.on("close", () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(port, () => {        
    console.log(`Server is running on http://localhost:${port}`);
});