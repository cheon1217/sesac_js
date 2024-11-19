require("dotenv").config();
const express = require("express");
const nunjucks = require("nunjucks");
const sqlite3 = require("better-sqlite3");
const path = require("path");
const morgan = require("morgan");
const debug = require("debug");

const app = express();
const port = 3000;
const db = new sqlite3("user-sample.db");
const isDebugMode = process.env.DEBUG === "true";
const debugS = new debug("myapp:server");
const debugR = new debug("myapp:request");
const debugDEV = new debug("myapp:DEV");
const debugERR = new debug("myapp:ERR");

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

// 미들웨어
app.use(express.static("public"));
if (isDebugMode) {
    debugS("Running on development mode. Debugging is enabled");
    app.use(morgan("dev"));
} else {
    debugS("Running on production mode. Debugging is disabled");
    app.use(morgan("combined"));
}

app.get("/error", (req, res) => {
    const error = new Error("This is a test error");
    if (isDebugMode) {
        debugERR(`[DEBUG ERROR] ${error}`);
        res.status(500).send(`Internal Error: ${error.stack}`);
    } else {
        res.status(500).send("Internal Error");
    }
})

// 라우트
app.get("/", (req, res) => {
    debugR("내가 쓰고 싶은 메세지 - 사용자 디테일");
    const query = db.prepare("SELECT * FROM users");
    const data = query.all();

    res.render("user.html", {data: data});
});

// 사용자 페이지용
app.get("/users/:id", (req, res) => {
    debugR("내가 쓰고 싶은 메세지 루트 접속");
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