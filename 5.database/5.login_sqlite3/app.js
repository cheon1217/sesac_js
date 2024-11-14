// 모듈 불러오기
const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");
const path = require("path");

// 내부에서 사용할 변수들 정의
const app = express();
const port = 3000;
const db = new sqlite3.Database("users.db");

// 세션 초기화
app.use(session({
    secret: "my-secret-1234",
    resave: false,
    saveUninitialized: true
}));

// 미들웨어 등록
app.use(express.urlencoded({ extended: true })); // 기본 폼 입력값 처리
app.use(express.json());
app.use(express.static("public"));

// 라우팅 등록
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (row) {
            // console.log(`사용자 조회: ${JSON.stringify(row)}`);
            req.session.user = row;
            // res.send(`로그인 성공: ${row.username}`);
            res.redirect("/profile");
        } else {
            res.send("로그인 실패");
        }
    });
});

app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(path.resolve("public/profile.html"));
    // res.sendFile(path.join(__dirname, "public", "profile.html"));
});

app.get("/profile-data", (req, res) => {
    const user = req.session.user;

    db.get('SELECT email, created_at FROM users WHERE id = ?', [user.id], (err, row) => {
        if (err) {
            console.error("조회 오류: ", err);
            return res.status(500).json({ error: "서버 오류" });
        }

        if (row) {
            res.json({
                username: user.username,
                email: row.email,
                created_at: row.created_at,
                role: user.role,
            });
        } else {
            res.status(404).json({ message: "정보를 찾을 수 없음" });
        }
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
})

app.listen(port, () => {
    console.log("Server Ready");
});