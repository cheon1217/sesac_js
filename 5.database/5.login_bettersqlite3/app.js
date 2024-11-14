const express = require("express");
const sqlite3 = require("better-sqlite3");
const path = require("path");

const app = express();
const port = 3000;
const db = sqlite3("users.db");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const row = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);

    if (row) {
        console.log("사용자 조회: ", row);
        res.send(`로그인 성공: ${row.username}`);
    } else {
        res.send("로그인 실패");
    }
});

app.listen(port, () => {
    console.log("Server Ready");
});