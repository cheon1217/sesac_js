require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(
    session({
        secret: "my_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(morgan("dev"));

const CLIENT_ID  = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const REDIRECT_URI = process.env.NAVER_REDIRECT_URI;

// 네이버 로그인
const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';

// 사용자의 개인 정보를 조회하기 위한 URL (accesstoken을 기반으로, 사용자 정보를 더 요청할 수 있다. (사용자가 동의한 경우))
const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

app.get("/login", (req, res) => {
    const state = Math.random().toString(36).substring(2);
    console.log(state);

    const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;

    console.log(authUrl);
    res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
    const { code, state } = req.query;

    try {
        const tokenResponse = await axios.get(NAVER_TOKEN_URL, {
            params: {
                grant_type: "authorization_code",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: code,
                state: state,
            },
        });

        const accessToken = tokenResponse.data.access_token;
        
        // 사용자 정보 요청
        const userInfoResponse = await axios.get(NAVER_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        const userInfo = userInfoResponse.data.response;

        req.session.user = {
            nickname: userInfo.nickname || "미동의",
            email: userInfo.email || "No email",
            profileImage: userInfo.profile_image || null,
            gender: userInfo.gender || "미동의",
            age: userInfo.age || "미동의",
            birthyear: userInfo.birthyear || "미동의",
            birthday: userInfo.birthday || "미동의",
        };
        console.log(req.session.user);

        res.redirect("/dashboard");
    } catch (err) {
        console.error(err.message);
    }
});

// 로그인 확인을 위한 middleware
function loggedIn(req, res, next) {
    if (req.session?.user) {
        return next();
    } else {
        res.status(403).send("권한이 없다");
        // res.status(403).sendFile(path.join(__dirname, "public", "error.html"));
    }
}

app.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else {
        res.sendFile(path.join(__dirname, "public", "index.html"));
    }
});

app.get("/dashboard", loggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/api/user", loggedIn, (req, res) => {
    // 여기에서 사용자 정보를 반납
    res.json(req.session.user);
});

app.get("/logout", (req, res) => {
    // 세션 삭제
    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session: ", err);
        }
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Go to http://localhost:${PORT}/login to start the login process`);
})