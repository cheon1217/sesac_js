const http = require("http");
const fs = require("fs").promises;
const path = require("path");

// const parse = require("querystring").parse;

// 객체 디스트럭처링 (위에 문법을 짧게 줄인 것)
const { parse } = require("querystring");

const users = {};

const server = http.createServer(async (req, res) => {
    // 만약 사용자가 / 를 요청하면 index.html를 전달하고
    // 만약 사용자가 /about을 요청하면 about.html을 전달하고
    // 그외에 나머지를 요청하면?? 우리는 없다고 반납을 해야함 (404 Not Found)
    // 힌트: req.url 비교
    // console.log(req.method, req.url);
    try {
        // image 폴더를 요청하면 우리는 static 폴더안에 있는 그 파일을 전달해주는걸로
        if (req.method === "GET") {
            if (req.url === "/") {
                const data = await fs.readFile("./index.html");
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                 return res.end(data);
            } else if (req.url === "/about") {
                const data = await fs.readFile("./about.html");
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                return res.end(data);
            } else if (req.url.startsWith("/image/")) {
                console.log(`이미지 파일명 추출은?? ${req.url}`);
                const imageName = path.basename(req.url);
                const imagePath = path.join("static", imageName);

                console.log(`이미지 경로: ${imagePath}`);
                // 1. url 뒤에 있는 글자를 짤라서
                // 2. 파일명을 가져와서
                // 3. 우리의 이미지 디렉토리인 static/ 뒤에 위 파일명을 붙여서
                // 4. 그 내용을 전달한다.
                const imagedata = await fs.readFile(imagePath); 
                res.writeHead(200, {"Content-Type": "image/jpg;"});
                return res.end(imagedata);
            } else if (req.url === "/user") {
                res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                return res.end(JSON.stringify(users));
                
            } else {
                res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
                return res.end("Not Found");
            }
        } else if (req.method === "POST") {
            if (req.url === "/user") {
                let body = "";

                req.on("data", (data) => {
                    body += data;
                    console.log(`데이터가 받아지는 동안의 chunk: ${data}`);
                });

                req.on("end", () => {
                    // console.log(`데이터가 다 받아진 후: ${body}`);

                    const formData = parse(body); // 문자열 name=aaa 가 객체타입으로 변환됨
                    console.log("받은 데이터는: ", formData);
                    const username = formData.name;
                    // console.log("그래서 유저네임은??", username);
                    users[username] = username;
                });
                res.writeHead(201, {"Content-Type": "text/plain; charset=utf-8"});
                res.end("등록 성공");
            } else {
                res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                return res.end("Not Found");
            }
        } else if (req.method === "PUT") {

        } else if (req.method === "DELETE") {
            if (req.url === "/user") {
                let body = "";

                req.on("data", (data) => {
                    body += data;
                    console.log(`데이터가 받아지는 동안의 chunk: ${data}`);
                });

                req.on("end", () => {
                    // console.log(`데이터가 다 받아진 후: ${body}`);

                    const formData = parse(body); // 문자열 name=aaa 가 객체타입으로 변환됨
                    console.log("받은 데이터는: ", formData);
                    const username = formData.name;
                    console.log(`삭제할 사용자 이름: ${username}`);

                    const index = users.findIndex((user) => user.name === username);
                    if (index !== -1) {
                        users.slice(index, 1);
                        console.log("사용자가 삭제되었습니다.");
                        console.log("사용자 목록: ", users);
                        res.writeHead(200, {"Content-Type": "text/plain; chareset=utf-8"});
                        res.end("삭제 성공");
                    } else {
                        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                        return res.end("Not Found");
                    }
                });
            } else {
                res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                return res.end("Not Found");
            }
        } else {
            // GET도 아니고 POST도 아니면
            res.writeHead(404);
            res.end("Not Found");
        }
    } catch (err) {
        console.error(err);
        res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`오류가 발생했습니다: ${err.message}`); // 오류 메시지를 보여주는 것은 좋지 않음
    }
});

server.listen("3000", () => {
    console.log("서버 대기중.. on 3000번에서...");
});