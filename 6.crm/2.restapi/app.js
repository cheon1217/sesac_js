const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

// 미들웨어
app.use(express.static("public"));

// 라우트
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/users.html"));
    // res.sendFile(path.join(__dirname, "public", "users.html"));
});

// 시스템 호출용 API 라우트
app.get("/api/users", (req, res) => {

    const query = "SELECT * FROM users";
    db.all(query, (err, rows) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        res.json(rows);
    });
});


app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM users WHERE Id = ?";
    db.get(query, [userId], (err, rows) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!rows) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(rows);
    });
});

// 사용자 페이지용
app.get("/users/:id", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.listen(port, () => {
    console.log("Server Ready");
});