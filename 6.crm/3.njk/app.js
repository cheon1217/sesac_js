const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("better-sqlite3");
const path = require("path");

const app = express();
const port = 3000;
const db = new sqlite3("user-sample.db");

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

// 미들웨어
app.use(express.static("public"));

// 라우트
app.get("/", (req, res) => {
    const query = db.prepare("SELECT * FROM users");
    const data = query.all();

    res.render("user.html", {data: data});
});

// 사용자 페이지용
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;

    const query = db.prepare("SELECT * FROM users WHERE Id = ?");
    const data = query.get(userId);
    res.render("user_detail.html", {user: data});
});

// 시스템 호출용 API 라우트
app.get("/api/users", (req, res) => {
    const query = "SELECT * FROM users";
    db.all(query, [], (err, rows) => {
        res.json(rows);
    });
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM users WHERE Id = ?";
    db.get(query, [userId], (err, rows) => {
        res.json(rows);
    });
});


app.listen(port, () => {
    console.log("Server Ready");
});