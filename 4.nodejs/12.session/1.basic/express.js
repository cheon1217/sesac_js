const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
    // 클라이언트에서 쿠키를 보낸다.
    res.cookie("mycookie", "abcd", {maxAge: 60000}); // 60000ms = 60s = 1min
    res.cookie("username", "user1", {maxAge: 30000});
    res.cookie("cart", ["사과우유", "딸기우유", "바나나우유"], {maxAge: 90000});
    res.send("쿠키를 담아서 보낸다");
});

app.get("/readcookie", (req, res) => {
    const myCookie = req.cookies;
    console.log(myCookie);

    res.send(`번호표(쿠키)를 잘 들고왔군: ${JSON.stringify(myCookie)}`);
});

app.listen(port, () => {
    console.log("Server Ready");
});