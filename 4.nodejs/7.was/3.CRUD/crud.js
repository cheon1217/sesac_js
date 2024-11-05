const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === "GET") {
        handleGetRequest(req, res);
    } else if (req.method === "POST") {
        handlePostRequest(req, res);
    } else if (req.method === "PUT") {
        handlePutRequest(req, res);
    } else if (req.method === "DELETE") {
        handleDeleteRequest(req, res);
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

async function handleGetRequest(req, res) {
    try {
        if (req.url === "/") {
            const data = await fs.readFile("./index.html");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
        } else if (req.url === "/about") {
            const data = await fs.readFile("./about.html");
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
        } else if (req.url.startsWith("/image/") || req.url.startsWith("/static/")) {
            // const imageName = path.basename(req.url);
            // const imagePath = path.join("static", imageName);
            // const imageData = await fs.readFile(imagePath);
            // res.writeHead(200, {"Content-Type": "image/jpg;"})
            // return res.end(imageData)
            const urlPath = req.url.startsWith("/static") ? req.url : req.url.replace("/image/", "./static/");
            const filePath = path.join(__dirname, urlPath);
            try {
                const data = await fs.readFile(filePath);
                const contentType = getContentType(filePath);
                res.writeHead(200, {"Content-Type": contentType});
                return res.end(data);
            } catch (err) {
                res.writeHead(404);
                return res.end("Not Found");
            }
        } else if (req.url === "/user") {
            // console.log(users);
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404);
            res.end("Not Found");
        }
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end("알 수 없는 오류 발생");
    }
}

function handlePostRequest(req, res) {
    if (req.url === "/user") {
        let body = "";
        req.on("data", (data) => (body += data));

        req.on("end", () => {
            try {
                // // 데이터가 다 쌓였을 때 할 일 여기에 작성
                // if (req.headers["content-type"] === "text/plain") {
                //     return res.end("plaintext로 데이터를 줬구나..");
                // } else if (req.headers["content-type"] === "application/json") {
                //     const parsedData = JSON.parse(body);
                //     const username = parsedData.name;
                //     users[username] = username;
                //     return res.end(`application/json 이구나.. body: ${body} json: ${parsedData}`);
                // } else {
                //     res.writeHead(404);
                //     return res.end("Not Found");
                // }
                const parsedData = JSON.parse(body);
                const username = parsedData.name;
                users[username] = username;
                res.writeHead(201, {"Content-Type": "text/plain; charset=utf-8"});
                res.end("등록 성공");
            } catch (err) {
                console.error("POST 요청 처리 중 오류 발생: ", err);
                res.writeHead(500, { "Content-Type": "text/plain; chareset=utf-8" });
                res.end("서버 내부 오류");
            }
        });
    }
}

function handlePutRequest(req, res) {
    res.end("PUT요청 응답완료");
}

function handleDeleteRequest(req, res) {
    if (req.url.startsWith("/user/")) {
        try {
            const key = req.url.split("/")[2];
            delete users[key];
            res.writeHead(204);
            return res.end();
        } catch (err) {
            console.error("DELETE 요청 처리 중 에러 발생: ", err);
            res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
            res.end("서버 오류");
        }
    }
}

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case ".html":
            return "text/html; charset=utf-8";
        case ".js":
            return "application/javascript; charset=utf-8";
        case ".jpg":
            return "image/jpg";
        default:
            return "없음";
    }
}

server.listen(3000, () => {
    console.log("서버가 3000 포트에서 대기 중입니다.");
});