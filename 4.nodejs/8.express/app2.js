const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("결과를 출력한다.");
});

app.get("/users", (req, res) => {
    res.send("사용자를 출력한다.");
});

app.get("/users/:id", (req, res) => {
    console.log(req.params);
    res.send(`사용자 ${req.params.id}을 출력한다.`);
});

app.get("/users/:id/profile", (req, res) => {
    console.log(req.params);
    res.send(`사용자 ${req.params.id}에 대한 상세한 profile을 출력한다.`);
});

app.get("/search", (req, res) => {
    const queryparams = req.query;
    console.log(queryparams);
    res.send(`검색을 요청한 내용은 ${queryparams.q}와 최근 ${queryparams.top}갯수 입니다.`);
});

// 서버 시작
app.listen(port, () => {
    console.log("서버 레디");
});