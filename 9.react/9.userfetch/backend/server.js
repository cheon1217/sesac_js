const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// 기본 개발자 디버깅
app.use(morgan("dev"));

// 특정 도메인만 허용
app.use(cors({ 
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    methods: ["GET", "POST"],
}));
// app.use(express.json());

// 모든 도메인 허용 (개발용) API 라우트 셋업
//app.use(cors()); // 나는 모든거 다 허용할거야 (보안 최악)

// const users = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Charlie" },
// ]
const users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 },
]

app.get("/api/users", (req, res) => {
    // db가 커졌으니 /api/users 전체를 요청할 땐, 이 많은것 중에 id, name만 전달한다.
    const summary = users.map(u => ({id: u.id, name: u.name}));
    // console.log(summary);

    res.json(summary);
});

app.get("/api/users/:userId", (req, res) => {
    const userId= parseInt(req.params.userId);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({error: "User not found"});
    }

    // console.log(user);

    res.json(user);
});

app.listen(PORT, () => {
    console.log("Server Ready");
});