const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    // 클라이언트가 접속시 현재 시간
    const sendTime = () => {
        // 데이터는 "data:"으로 시작해서 내용을 담고 "/n/n"으로 끝나는게 기본 프로토콜임
        res.write(`data: ${new Date().toLocaleString()}\n\n`);
    };

    // 주기적으로 전송
    const interval = setInterval(sendTime, 10000);

    req.on("close", () => {
        clearInterval(interval);
        res.end();
    });
});

app.listen(port, () => {        
    console.log(`Server is running on http://localhost:${port}`);
});