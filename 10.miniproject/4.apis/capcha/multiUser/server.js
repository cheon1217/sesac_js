require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const CAPTCHA_DIR = path.join(__dirname, "public");

const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "admin", password: "admin123" },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(express.static(CAPTCHA_DIR));

async function getCaptchaKey() {
    const url = "https://openapi.naver.com/v1/captcha/nkey?code=0";
    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };

    const response = await axios.get(url, { headers });
    return response.data.key;
}

async function getCaptchaImage(key, fileName) {
    const url = `https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=${key}`;
    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };

    const response = await axios.get(url, { headers, responseType: "stream" });
    const filePath = path.join(CAPTCHA_DIR, fileName);
    response.data.pipe(fs.createWriteStream(filePath));

    return fileName;
}

function cleanOldCaptchas() {
    const expirationTime = 1000 * 60 * 10;
    fs.readdir(CAPTCHA_DIR, (err, files) => {
        if (err) return console.error("캡챠 파일 읽기 실패: ", err);

        files.forEach((file) => {
            if (file.startsWith("captcha_") && file.endsWith(".jpg")) {
                const filePath = path.join(CAPTCHA_DIR, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) return console.error("캡챠 파일 상태 확인 실패: ", err);

                    const now = Date.now();
                    if (now - stats.mtimeMs > expirationTime) {
                        fs.unlink(filePath, (err) => {
                            if (err) return console.error("캡챠 파일 삭제 실패: ", err);
                            console.log(`오래된 캡챠 파일 삭제: ${file}`);
                        });
                    }
                });
            }
        });
    });
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/refresh-captcha", async (req, res) => {
    try {
        const captchaKey = await getCaptchaKey();
        const fileName = `captcha_${uuidv4()}.jpg`;
        const captchaImage = await getCaptchaImage(captchaKey, fileName);

        req.session.captchaKey = captchaKey;
        req.session.captchaImage = captchaImage;

        res.json({ captchaImage });
    } catch (err) {
        console.error("Captcha 생성 실패: ", err.message);
        res.status(500).json({ message: "Failed to refresh captcha" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password, captcha } = req.body;

    // 오래된 캡챠 파일 삭제
    cleanOldCaptchas();

    if (!req.session.captchaKey) {
        return res.status(400).json({ message: "Captcha is required. Please refresh and try again." });
    }

    try {
        // 캡챠 검증
        const isValidCaptcha = await verifyCaptcha(req.session.captchaKey, captcha);
        if (!isValidCaptcha) {
            return res.status(400).json({ message: "Invalid Captcha" });
        }

        // 로그인 검증
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            req.session.captchaKey = null;
            req.session.captchaImage = null;
            return res.json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error("로그인 처리 중 오류 발생: ", err.message);
        res.status(500).json({ message: "An expected error occured" });
    }
});

async function verifyCaptcha(key, userInput) {
    const url = `https://openapi.naver.com/v1/captcha/nkey?code=1&key=${key}&value=${userInput}`;

    const headers = {
        'X-Naver-Client-Id': CLIENT_ID, 
        'X-Naver-Client-Secret': CLIENT_SECRET,
    };  

    const response = await axios.get(url, { headers });
    return response.data.result;
}

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});