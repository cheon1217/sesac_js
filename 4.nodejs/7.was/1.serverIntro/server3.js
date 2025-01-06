const http = require("http");
const fs = require("fs");

// 우리의 fs의 콜백기반의 비동기 함수를 promise를 통해서
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err); // 오류 시 reject 호출
            } else {
                resolve(data); // 성공 시 resolve 호출
            }
        })
    })
}

http.createServer(async (req, res) => {
    // 파일로부터 컨텐츠를 읽어와서 그 내용을 여기에서 전달해주면 끝
    try {
        const data = await readFilePromise("./index.html");
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"});
        res.end(`오류가 발생했습니다: ${err.message}`); // 오류 메시지를 보여주는 것은 좋지 않음
    }
}).listen("3000", () => {
    console.log("서버 대기중.. on 3000번에서...");
});