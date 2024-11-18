require("dotenv").config();
const express = require("express");
// const sqlite3 = require("sqlite3");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

const dbPath = process.env.DB_PATH;
const db = new sqlite3.Database(dbPath);

// 미들웨어 추가
app.use(express.static("public"));

// 라우트 정의
app.get("/", (req, res) => {
    // public을 미들웨어로 노출한 경우에는 여기 도달하지 않음
    res.sendFile(path.resolve("public/index.html"));
});

app.get("/api/search", (req, res) => {
    const { searchQuery, page = 1 } = req.query;

    console.log(`사용자 입력: ${searchQuery}, 페이지: ${page}`);
    const itemsPerPage = 10; // 페이지당 열개만 출력
    const offset = (page - 1) * itemsPerPage; // 산수 계산을 통해서.. 내 페이지를 원하는 offset

    // 사용자가 요청한 내용이 몇개나 있고, 그게 몇 페이지가 될건지 계산하기
    const countSql = `SELECT COUNT(*) AS count FROM artists WHERE name LIKE ?`;
    db.get(countSql, [`%${searchQuery}%`], (err, row) => {
        const totalPage = Math.ceil(row.count / itemsPerPage);
        console.log(`갯수: ${row.count}, 토탈 페이지: ${totalPage}`);

        const sql = "SELECT * FROM artists WHERE name LIKE ? LIMIT ? OFFSET ?";
        db.all(sql, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => {
            // console.log(rows);
            res.json({ results: rows, currentPage: page, totalPage: totalPage, status: "ok" });
        });
    })

});

app.listen(PORT, () => {
    console.log("Server Ready");
});