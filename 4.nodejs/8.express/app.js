const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello, Express</h1>");
});

app.get("/user", (req, res) => {
    res.send("<h1>여기는 사용자 페이지 입니다.</h1>");
});

app.get("/admin", (req, res) => {
    res.send("<h1>여기는 관리자 페이지 입니다.</h1>");
});

app.post("/", (req, res) => {
    res.send("POST 요청이 /에 날라왔음!");
});

app.post("/user", (req, res) => {
    res.send("POST 요청이 /user에 날라왔음!");
});

app.put("/user", (req, res) => {
    res.send("PUT 요청이 /user에 날라왔음!");
});

app.delete("/user", (req, res) => {
    res.send("DELTE 요청이 /user에 날라왔음!");
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중 입니다.`);
});

const crypto = require("crypto");

const secret = crypto.randomBytes(64).toString("hex");
console.log("Generated Secret Key:", secret);