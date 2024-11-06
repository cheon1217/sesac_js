const express = require("express");
const app = express();
const fsp = require("fs").promises;
const fs = require("fs");
const path = require("path");

// 정적 폴더 정의
app.use(express.static("public")); // 내가 정한 폴더명

app.get("/", async (req, res) => {
    const htmlfile = path.join(__dirname, "public", "index.html");
    
    try{
        const data = await fsp.readFile(htmlfile);
        res.send(data);
    } catch (err) {
        res.status(500).send("서버 오류");
    }
});

app.get("/path", (req, res) => {
    const htmlfile = path.join(__dirname, "public", "index.html");
    
    fs.readFile(htmlfile, "utf8", (err, data) => {
        if (err) {
            res.status(500).send("서버 오류");
            return;
        }

        res.setHeader("Content-Type", "text/html"); // MIME 타입 설정
        res.send(data);
    });
});

app.get("/sendfile", (req, res) => {
    const htmlfile = path.join(__dirname, "public", "index.html");
    // res.sendFile(htmlfile);

    res.sendFile(htmlfile, (err) => {
        if (err) {
            res.status(500).send("서버 오류");
        }
    });
});

// 여기까지 왔는데 매칭되는 라우트 없으면?
app.use((req, res) => {
    res.status(404).send("없음!");
});

app.use((err, req, res, next) => {
    // res.status(500).json({ message: "서버 내부 오류" });
    res.status(500).send("서버 오류!!");
});

app.listen(3000, () => {
    console.log("서버 레디");
})