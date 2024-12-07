const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const sqlite = require("better-sqlite3");

const app = express();
const PORT = 3001;
const upload = multer({ dest: "uploads/" });
const dbfile = "./db/board.db";
const db = new sqlite(dbfile);

// 특정 도메인 허용
app.use(cors());

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/api/posts", (req, res) => {
    const posts = db.prepare(`SELECT * FROM post`).all();
    if (!posts) {
        res.status(404).json({ error: true, message: "게시글 목록 찾을 수 없음" });
    } else {
        res.json(posts);
    }
});

app.post("/post", upload.single("image"), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log(title, content, image);
    db.prepare(`INSERT INTO post(title, content, image, postedAt) values(?, ?, ?, date('now'));`).run(title, content, image);

    res.redirect("http://localhost:3000/");
});

app.delete("/post/:id", (req, res) => {
    const id = req.params.id;
    db.prepare(`DELETE FROM post WHERE id = ?;`).run(id);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log("Server Ready");
});