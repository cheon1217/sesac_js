const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const users = [
    {id: 1, username: "user1", password: "pass1"},
    {id: 2, username: "user2", password: "pass2"},
];

app.post("/login", (req, res) => {
    // 로그인 코드 개발
    const { username, password } = req.body; // 미들웨어로 파서 추가해야함

    // 사용자가 입력한 id/pw를 위의 users 자료구조에서 검색
    const user = users.find((ip) => ip.username === username && ip.password === password);

    if (user) {
        req.session.user = user;
        res.json({ message: "로그인 성공" });
    } else {
        res.status(401).json({message: "로그인 실패"});
    }
});

app.get("/profile", (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username, message: "프로필 정보" });
    } else {
        res.status(401).json({ message: "인증되지 않은 사용자임"});
    }
});

// 로그아웃은 어떻게??
app.get("/logout", (req, res) => {
    // 세션에서 사용자 정보를 삭제.. 어떻게??? 찾아본다!
    req.session.destroy((err) => {
        if (err) {
            console.error("로그아웃 오류: ", err);
            res.status(500).json({message: "로그아웃 실패"});
        } else {
            res.json({message: "로그아웃 성공"});
        }
    });
});

app.get("/check-login", (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(404).json({ message: "없는 사용자" });
    }
});

app.listen(port, () => {
    console.log("Server Ready");
});