// 외부 모듈 import
const express = require("express");
const path = require("path");
const fs = require("fs").promises;

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// 미들웨어
app.use("/static", express.static("static"));
app.use("/image", express.static("static/image"));

app.use(express.json());

// 라우트
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/user", (req, res) => {
    res.json(users);
});

app.post("/user", (req, res) => {
    // const name = req.body.name;
    const { name } = req.body;
    users[name] = name;
    res.status(201).send("등록 성공"); // 201은 Created
});

app.put("/user/:id", (req, res) => { // id 받아오는 것
    try {
        const { id } = req.params;
        users[id] = req.body.name;
        // res.json(users);
        res.status(200).send("수정 성공");
    } catch (err) {
        console.error("수정 요청 중 에러 발생: ", err);
        res.status(500).send("서버 오류");
    }
});

app.delete("/user/:id", (req, res) => { // id 받아오는 것
    try {
        const { id } = req.params;
        delete users[id];
        res.status(204).send("삭제 성공");
    } catch (err) {
        console.error("삭제 요청 중 에러 발생:", err);
        res.status(500).send("서버 오류");
    }
});

// 오류 미들웨어
app.use(async (req, res, next) => {
    try {
        const data = await fs.readFile(path.join(__dirname, "static", "404.html"));
        res.status(404).type("html").send(data);
    } catch (err) {
        console.error("404 page fail", err);
        res.status(500).send("서버 오류");
    }
})

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 대기 중입니다.`);
});