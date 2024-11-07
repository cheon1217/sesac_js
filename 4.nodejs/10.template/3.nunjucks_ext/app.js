const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

app.set("view engine", "html");

nunjucks.configure("views", {
    autoescape: true,
    express: app,
    // watch: true // 템플릿 파일 변경된 것 자동으로 감지
});

app.get("/", (req, res) => {
    const data = {
        title: "My Page",
        content: "This is my content page"
    };
    res.render("main", data);
});

app.get("/user", (req, res) => {
    const data = {
        title: "User Page",
        content: "This is User content page"
    };
    res.render("user", data);
});

app.get("/product", (req, res) => {
    const data = {
        title: "Product Page",
        content: "This is product content page",
    };
    res.render("product", data);
});

app.get("/page1", (req, res) => {
    const data = {
        title: "상속하는 스타일",
        content: "This is 상속받은 page1의 content page",
    };
    res.render("page1", data);
});

app.get("/page2", (req, res) => {
    const data = {
        title: "상속하는 스타일",
        content: "This is 상속받은 page2의 content page",
    };
    res.render("page2", data);
});

app.get("/page3", (req, res) => {
    const data = {
        title: "상속하는 스타일",
        content: "This is 상속받은 page3의 content page",
    };
    res.render("page3", data);
});

app.listen(3000, () => {
    console.log("Server Ready");
});