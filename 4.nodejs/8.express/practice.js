const express = require("express");
const app = express();
const PORT = 3000;

function timeRequest(req, res, next) {
    console.log(`요청시간: ${req.requestedTime}`);
    req.requestedTime = Date.now();
    console.log(`요청시간: ${req.requestedTime}`);
}

app.use(timeRequest);

app.use((req, res, next) => {
    console.log("요청이 들어왔습니다.");
    next();
})

app.get("/", (req, res) => {
    res.send("Hello, World");
    const timeString = new Date(req.requestedTime).toISOString();
    res.send(`요청한 시간: ${timeString}`);
});

app.get("/users", (req, res) => {
    res.send("사용자 출력");
});

app.get("/users/:id", (req, res) => {
    console.log(req.params);
    res.send(`사용자 ${req.params.id}을 출력한다.`);
});

app.get("/users/:id/profile", (req, res) => {
    console.log(req.params);
    res.send(`사용자 ${req.params.id}에 대한 상세한 profile을 출력`);
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});