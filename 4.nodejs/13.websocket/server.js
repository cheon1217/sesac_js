const WebSocket = require('ws');
const port = 8000;

const wss = new WebSocket.Server({ port: port });

wss.on('listening', () => {
    console.log(`WebSocket server is listening on port ${port}`);
});

wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log("접속한 클라이언트: ", clientIp);

    ws.on('message', (message) => {
        const parserdMessage = JSON.parse(message);
        console.log(`${clientIp}로부터 받은 메시지: ${parserdMessage}`);

        // 현재 클라이언트에게 메세지 전송
        // ws.send(JSON.stringify({ type: 'chat', content: message }));

        // 모든 클라이언트에게 메세지 전송
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'server-chat', content: parserdMessage.content }));
                console.log("서버가 응답 보냈음");
            }
        });
    });

    ws.on('close', () => {
        console.log(`${clientIp} 연결이 종료되었습니다.`);
    });
});