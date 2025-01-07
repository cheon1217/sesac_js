const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

const app = express();
expressWs(app);

const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "progress2.html"));
});

app.ws("/progress", (ws, req) => {
    console.log("클라이언트 웹소켓으로 접속");


    // stop 이벤트를 받으면 interval을 멈추고, progress를 0으로 초기화
    let interval; // interval 변수를 함수 외부에서 선언
    let progress = 0;

    ws.on("message", (message) => {
        console.log(message, message.toString());
        if (message.toString() === "start") {

            interval = setInterval(() => {
                progress += 10;
                ws.send(JSON.stringify({ progress }));

                if (progress === 100) {
                    clearInterval(interval);
                    console.log("작업 완료");
                    progress = 0; // 작업 완료 후 progress 초기화
                }
            }, 500); // 500ms 마다 10씩 증가

            ws.send(JSON.stringify({ progress }));
        } else if (message.toString() === "stop") {
            clearInterval(interval); // interval 정리
        }
    });
});

const server = app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
