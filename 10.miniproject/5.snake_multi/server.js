const express = require("express");
const path = require("path");
// const expressWs = require("express-ws");
const http = require("http");
const WebSocket = require("ws");

const app = express();
// expressWs(app);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 정적 파일 제공 - 순서 주의 / 보다 앞에 있으면 무조건 public 안에 index.html이 전달됨
app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", (ws, req) => {
    console.log("클라이언트 접속");

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "keypress") {
            console.log(`키 눌림: ${data.key}`);
            broadcast(data.key);
        }
    })
});

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});