const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

// 미들웨어
app.use(express.static("public"));

// 시스템 호출용 API 라우트
app.get("/api/users", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const searchName = req.query.name || "";
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    
    const countQuery = "SELECT COUNT(*) AS count FROM users WHERE Name LIKE ?";
    db.get(countQuery, [`%${searchName}%`], (err, row) => {
        if (err) {
            console.error("Error fetching total user count:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        const dataQuery = "SELECT * FROM users WHERE Name LIKE ? LIMIT ? OFFSET ?";
        db.all(dataQuery, [`%${searchName}%`, itemsPerPage, offset], (err, rows) => {
            if (err) {
                console.error("Error fetching user:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            
            res.json({
                data: rows,
                totalPages,
                currentPage: page,
                searchName,
            });
        });
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

// 라우트
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/users_page.html"));
    // res.sendFile(path.join(__dirname, "public", "users.html"));
});

// 사용자 페이지용
app.get("/users/:id", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.listen(port, () => {
    console.log("Server Ready");
});