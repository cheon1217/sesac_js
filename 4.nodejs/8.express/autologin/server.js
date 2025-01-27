const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

const users = [
    { id: 1, username: "user1", password: "password1"},
    { id: 2, username: "user2", password: "password2"},
];

app.use(cookieParser());
app.use(
    session({
        secret: "my-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // HTTPS를 사용하는 경우 true로 설정
            maxAge: 1 * 60 * 1000, // 1분
        }
    })
);

// 로그 설정
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public", "static")));
app.use(express.json());

app.get("/login", (req, res) => {
    // 사용자가 이미 로그인되어 있는 경우 메인 페이지로 리다이렉트
    if (req.session.user) {
        res.redirect("/");
    } else {
        // 로그인 페이지 전달
        res.sendFile(path.join(__dirname, "public", "login.html"));
    }
});

// 로그인 처리
app.post("/login", (req, res) => {
    // 사용자 입력한 정보
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const rememberMe = req.body.rememberMe;

    // 가상의 사용자 목록에서 사용자 찾기
    const user = users.find(u => u.username === inputUsername && u.password === inputPassword);

    if (user) {
        // 로그인 성공시 세션에 사용자 정보 저장
        req.session.user = user;

        // RememberMe 체크시 쿠키에 사용자 정보 저장
        if (rememberMe) {
            // 사용자 정보를 쿠키에 저장
            const storedUserInfo = {
                id: user.id,
                username: user.username,
            };

            // 쿠키 설정
            // res.cookie("rememberMe", hashedUserInfo, { maxAge: 7 * 60 * 60 * 24 * 1000 }); // 쿠키 유효기간 : 7일
            res.cookie("rememberMe", JSON.stringify(storedUserInfo), { maxAge: 10 * 60 * 1000 }); // 쿠키 유효기간 : 10분
        }

        // res.send(`Logged in successfully as {user.username}`);
        // 로그인 성공 JSON 응답
        res.json({
            status: "success",
            message: `Logged in successfully as ${user.username}`,
            redirectUrl: "/",
        });
    } else {
        // 로그인 실패 JSON 응답
        res.json({
            status: "faliure",
            message: "Invalid username or password",
            redirectUrl: null, // or you can include a default redirectUrl for faliure
        });
    }
});

// 로그아웃 처리
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
    });

    res.clearCookie("connect.sid", { maxAge: 0 }); // express-session에서의 기본 세션 변수
    res.clearCookie("rememberMe", { maxAge: 0}); // maxAge: 0을 설정하여 브라우저 쿠키 캐시 시간과 무관하게 바로 삭제 요청
    res.redirect("/login");
}); 

// 메인 페이지 - 자동 로그인 확인
app.get("/", (req, res) => {
    // 쿠키에서 사용자 정보 가져오기 (rememberMe 확인)
    const storedUserInfo = req.cookies.rememberMe;

    if (req.session.user) {
        // 세션에 사용자 정보가 있는 경우 자동으로 로그인 처리
        console.log(`세션 로그인 ${req.session.user.username}`);
        res.send(`Hello, ${req.session.user.username}!`);
    } else if (storedUserInfo) {
        console.log(storedUserInfo);

        // 쿠키에 저장된 사용자 정보 추출
        const decodedUserInfo = JSON.parse(storedUserInfo);

        // 사용자 정보 세션에 저장
        req.session.user = {
            id: decodedUserInfo.id,
            username: decodedUserInfo.username,
        };

        console.log(`쿠키 로그인 ${req.session.user.username}`);
        res.send(`Hello, ${req.session.user.username}`);
    } else {
        console.log(`일반 로그인`);
        res.redirect("/login");
    }
});

app.listen(PORT, () => {
    console.log("Server Ready");
});