require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// 사용자 계정 리스트
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "admin", password: "admin123" },
];

// 비밀번호 틀린 횟수 저장
let loginAttempts = 0;
let captchaKey = null;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

async function getCaptchaKey() {
    const url = "https://openapi.naver.com/v1/captcha/nkey?code=0";
    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data.key;
    } catch (error) {
        console.error("캡차 키 발급 오류: ", error.message);
        return null;
    }
}

async function getCaptchaImage(key) {
    const url = `https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=${key}`;
    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };

    try {
        const response = await axios.get(url, { headers, responseType: "stream" });
        const captchaPath = path.join(__dirname, "public", "captcha.jpg");
        response.data.pipe(fs.createWriteStream(captchaPath));
    } catch (error) {
        console.error("캡차 이미지 생성 오류: ", error.message);
    }
}

async function verifyCaptcha(key, userInput) {
    const url = `https://openapi.naver.com/v1/captcha/nkey?code=1&key=${key}&value=${userInput}`;
    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };  

    try {
        const response = await axios.get(url, { headers });
        return response.data.result;
    } catch (error) {
        console.error("캡챠 검증 오류: ", error.message);
        return false;
    }
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/login-status", (req, res) => {
    res.json({ showCaptcha: loginAttempts >= 3 });
});

app.post("/login", async (req, res) => {
    const { username, password, captcha } = req.body;

    if (loginAttempts >= 3) {
        const isValidCaptcha = await verifyCaptcha(captchaKey, captcha);
        if (!isValidCaptcha) {
            return res.status(400).send("Invalid Captcha");
        }
    }

    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
        loginAttempts = 0;
        captchaKey = null;
        return res.send("Login successful");
    } else {
        loginAttempts++;
        if (loginAttempts >= 3 && !captchaKey) {
            captchaKey = await getCaptchaKey();
            await getCaptchaImage(captchaKey);
        }
        return res.status(401).send("Invalid Credentials");
    }
});

app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000");
});