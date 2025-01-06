const express = require("express");
const expressWs = require("express-ws"); // 추가
const WebSocket = require("ws");
const path = require("path");

const port = 3000;

const app = express();
expressWs(app); // 추가

// 나에게 접속하는 사용자들 관리할 자료구조
const wsClients = new Map();
// 예) user1, 0x234720347209347(웹소켓 주소)
// 예) user2, 0x735642541247584(웹소켓 주소)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "chat3_client.html"));
});

// 웹소켓을 처리하는 EP(End Point)
app.ws("/chat", (ws, req) => {
    const clientIp = req.socket.remoteAddress;  
    console.log("클라이언트: ", clientIp);

    ws.on("message", (message) => {
        const messageString = message.toString("utf8");
        console.log(`${clientIp}로부터 받은 메시지: ${messageString}`);

        const parsedMessage = JSON.parse(messageString);
        const username = parsedMessage.username;
        const content = parsedMessage.content;

        if (username && !wsClients.has(username)) {
            wsClients.set(username, ws); // 새로운 사용자면? 우리의 목록에 추가
            console.log(`새로운 사용자 접속: ${username}, ${ws}`);
            broadcastMessage(`[${username}] entered the chat`);
        }

        console.log(`Received message from [${clientIp}] `, username);

        // ws.send(messageString);

        if (parsedMessage.type !== "session") {
            wsClients.forEach((client, clientId) => {
                if (client.readyState === ws.OPEN) {
                    const messageType = client === ws ? "sent" : "received";
                    const messageObj = {
                        type: messageType,
                        content: content,
                        sender: clientId === username ? "me" : username, 
                    }

                    client.send(JSON.stringify(messageObj));
                    // console.log(`메시지 전송: ${clientId}, ${messageResponse}`);
                    // client.send(JSON.stringify(messageResponse));
                }
            });
        }
    });

    // 접속이 끊겼을 때
    ws.on("close", () => {
        console.log("Client disconnected");
        // 연결이 끊긴 클라이언트의 세션을 맵에서 제거
        wsClients.forEach((client, clientId) => {
            if (client === ws) {
                wsClients.delete(clientId);
                broadcastMessage(`[${clientId}] left the chat`);
            }
        });
    });

    function broadcastMessage(message) {
        wsClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const broadcastObj = {
                    type: "broadcast",
                    content: message,
                };

                client.send(JSON.stringify(broadcastObj));
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});