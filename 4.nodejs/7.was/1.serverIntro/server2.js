const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<p>헬로우 어게인 3000</p>");
}).listen("3000", () => {
    console.log("서버 대기중.. on 3000번에서...");
});

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<p>헬로우 어게인 4000</p>");
}).listen("4000", () => {
    console.log("서버 대기중.. on 4000번에서...");
});

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end("<p>헬로우 어게인 5000</p>");
}).listen("5000", () => {
    console.log("서버 대기중.. on 5000번에서...");
});

