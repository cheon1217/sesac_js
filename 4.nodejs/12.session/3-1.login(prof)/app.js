const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000, // 세션의 유효시간을 60초 = 1분
    }
}));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static 폴더를 정의
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const users = [
    {id: 1, username: "user1", password: "pass1", hobby: "sleeping"},
    {id: 2, username: "user2", password: "pass2", hobby: "walking"},
    {id: 3, username: "user3", password: "pass3", hobby: "running"},
];

app.post("/login", (req, res) => {
    // 로그인 코드 개발
    const { username, password } = req.body; // 미들웨어로 파서 추가해야함
    console.log(`사용자로부터 받아온 username: ${username}, password: ${password}`);

    // 사용자가 입력한 id/pw를 위의 users 자료구조에서 검색
    // const user = null;
    // for (let i = 0; i < users.length; i++) {
    //     console.log(users[i]);
    //     if (users[i].username === username && users[i].password === password) {
    //         user = users[i];
    //         break;
    //     }
    // }
    const user = users.find((u) => u.username == username && u.password == password);

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

app.get("/logout", (req, res )=> {
    // 구현
    const user = req.session.user;
    if (user && user.username) {
        req.session.destroy();
        res.json({ message: "로그아웃 성공"});
    } else {
        res.json({ message: "로그인 한 적이 없음!" });
    }
});

app.get("/check-login", (req, res) => {
    const user = req.session.user;

    if (user) {
        res.json({ username: user.username });
    } else {
        res.status(404).json({ message: "사용자 없음" })
    }
});

app.listen(port, () => {
    console.log("Server Ready");
});