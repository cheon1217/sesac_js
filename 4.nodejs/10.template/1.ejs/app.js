// npm i ejs

const express = require("express");
const app = express();

// express의 view engine으로 ejs를 쓸거야!
app.set("view engine", "ejs");

// <%= 변수명 %>
// <%# 주석 %>
// <% 로직 %>

app.get("/", (req, res) => {
    res.render("index", {title: "Express Web", message: "Welcome To Ejs"});
});

app.get("/fruits", (req, res) => {
    const fruits = ["Apple", "Banana", "Orange", "Graphs"];
    res.render("fruits", {fruits: fruits});
});

app.get("/greeting", (req, res) => {
    const username = "jcpark"; // 실제로 이건 DB에서 가져오는 로직이 있을거고...
    res.render("greeting", {username: username});
});

app.get("/welcome", (req, res) => {
    const isAdmin = false; // 나중에는 실제 사용자 권한으로..
    res.render("welcome", {isAdmin: isAdmin});
});

app.listen(3000, () => {
    console.log("서버 준비");
});