const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const clients = [];
const messages = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat.html"));
});

app.get("/chat", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    // 새로운 클라이언트 추가
    clients.push(res);
    console.log("새로운 클라이언트 연결됨");
    
    // 기존 메시지 전송 (연결 직후)
    messages.forEach((message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
    });
    
    // 연결 종료시
    req.on("close", () => {
        clients.splice(clients.indexOf(res), 1);
        console.log("클라이언트 연결 종료됨");
    });
});

app.post();

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {    
    console.log(`Server is running on http://localhost:${port}`);
});