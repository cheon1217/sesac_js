const express = require("express");
const morgan = require("morgan");
const nunjcuks = require("nunjucks");
const sqlite3 = require("sqlite3");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

app.use(morgan("dev"));
app.use(express.static("public"));

app.set("view engine", "html");

nunjcuks.configure("views", {
    autoescape: true,
    express: app,
});

app.get("/users", async (req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const name = req.query.name || "";
        const gender = req.query.gender || null;

        res.render("users");
    } catch (err) {

    }
});

app.get("/", (req, res) => {
    res.redirect("/users");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});