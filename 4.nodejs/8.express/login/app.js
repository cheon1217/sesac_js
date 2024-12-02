const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션 미들웨어
app.use(session({
    secret: "my-scret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 // 세션의 유효시간 (1분)
    }
}));

app.use("/static", express.static(path.join(__dirname, "public")));

const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
    { id: 3, username: "user3", password: "password3" },
]

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.json({ message: "로그인 성공!" });
    } else {
        res.status(404).json({ message: "로그인 실패" });
    }
});

app.get("/profile", (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username, message: "프로필 정보" });
    } else {
        res.status(404).json({ message: "인증되지 않은 사용자" });
    }

    // 전체 세션 정보 출력
    // console.log("Session Info:", req.sessionStore.sessions);
});

app.get("/logout", (req, res) => {
    // 세션에서 사용자 정보를 삭제
    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 오류:", err);
            res.status(500).json({ message: "로그아웃 실패" });
        } else {
            res.json({ message: "로그아웃 성공!" });
        }
    });
});

app.get("/check-login", (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(401).json({ message: "인증되지 않은 사용자" });
    }
});

app.get("/user-activity", (req, res) => {
    req.session.touch();
    console.log(req.session);   

    res.json({ message: "User activity recorded" });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.listen(PORT, () => {
    console.log("Server Ready");
});