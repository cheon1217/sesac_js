// npm i express nunjucks
const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

// app.set("view engine", "njk");
app.set("view engine", "html");

nunjucks.configure("views", {
    autoescape: true, // 입력값 처리할 때 XSS 같은 것 발생하지 않도록 처리하는 기능
    express: app
});

app.get("/", (req, res) => {
    // 기본값: njk 그래서 index.njk를 찾음
    res.render("index", {title: "ExpressWeb", message: "Welcome To Nunjucks"});
    // res.render("index.html", {title: "ExpressWeb", message: "Welcome To Nunjucks"});
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
    const isAdmin = true; // 나중에는 실제 사용자 권한으로..
    res.render("welcome", {isAdmin: isAdmin});
});

app.listen(3000, () => {
    console.log("Server Ready");
});