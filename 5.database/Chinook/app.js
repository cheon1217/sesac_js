const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const nunjucks = require("nunjucks");
const path = require("path");

const app = express();
const port = 3000;
const db = new sqlite3.Database("chinook.db");

nunjucks.configure("public", {
    autoescape: true,
    express: app
});

app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { results: [] });
});

app.post("/search", (req, res) => {
    const { searchQuery } = req.body;

    const query = 'SELECT * FROM artists WHERE name LIKE ?';
    db.all(query, [`%${searchQuery}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Error");
        }
        res.render("index.njk", { results: rows });
    });
});

app.listen(port, () => {
    console.log("Server Ready");
});