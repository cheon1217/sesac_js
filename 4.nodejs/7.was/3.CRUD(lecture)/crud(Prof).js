const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {};

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'PUT') {
        handlePutRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

async function handleGetRequest(req, res) {
    try {
        if (req.url === '/') {
            const data = await fs.readFile('./index.html')
            res.end(data);
        } else if (req.url === '/about') {
            res.end('GET요청 /about 응답완료');
        } else if (req.url === '/user') {
            // console.log(users);
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
            res.end(JSON.stringify(users)); 
        } else if (req.url.startsWith("/static")) {
            // static 파일들을 전달
            const filePath = path.join(__dirname, req.url);
            // console.log(filePath);
            try {
                const data = await fs.readFile(filePath);
                res.writeHead(200, {"Content-Type": "application/javascript; charset=utf-8"});
                res.end(data);
            } catch {
                res.writeHead(404);
                res.end("Not Found");
            }
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    } catch(err) {
        console.error(err);
        res.writeHead(500);
        res.end('알수 없는 오류');
    }
}

function handlePostRequest(req, res) {
    if (req.url === '/user') {
        let body = '';
        req.on('data', (data) => (body += data));
        req.on('end', () => {
            // 데이터가 다 쌓였을때 할일 여기에 작성
            if (req.headers['content-type'] === 'text/plain') {
                return res.end('plaintext 로 데이터를 줬구나...')
            } else if (req.headers['content-type'] === 'application/json') {
                const parsedData = JSON.parse(body);
                const username = parsedData.name;
                users[username] = username;
                return res.end(`application/json 이구나... body: ${body} json: ${parsedData}`);
            } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
                res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
                return res.end("form으로 데이터를 잘 받았음");
            } else {
                // console.log(req.headers);
                res.writeHead(404);
                return res.end('Not Found')
            }
        });
    }
}

function handlePutRequest(req, res) {
    if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        let body = "";
        req.on("data", (data) => body += data);
        return req.on("end", () => {
            try {
                console.log("PUT Body: ", body);
                users[key] = JSON.parse(body).name;
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(users));
            } catch (err) {
                console.error("PUT 요청 처리 중 에러 발생: ", err);
                res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                res.end("서버 내부 오류");
            }
        })
    }
}

function handleDeleteRequest(req, res) {
    if (req.url.startsWith("/user/")) {
        const username = path.basename(req.url);
        if (username && users[username]) {
            delete users[username]; // 객체 안에 멤버 삭제
            res.writeHead(200, {"Content-Type": "text-plain; charset=utf-8"});
            res.end(`${username} 삭제 성공`);
        } else {
            res.writeHead(200, {"Content-Type": "text-plain; charset=utf-8"});
            res.end(`${username} 사용자를 찾을 수 없습니다.`);
        }
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
}


server.listen(3000, () => {
    console.log('서버가 3000 포트에서 대기 중입니다')
});