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
    res.render("index", { results: [], searchList: "" });
});

app.get("/search", (req, res) => {
    const { searchQuery, searchList } = req.query;

    const searchOptions = {
        "artist": { table: "artists", field: "Name"},
        "album": { table: "albums", field: "Title"},
        "track": { table: "tracks", field: "Name"},
        "composer": { table: "tracks", field: "Composer"},
        "genre": { table: "genres", field: "Name"},
        "customer": { table: "customers", field: "FirstName"},
    };

    const option = searchOptions[searchList];
    if (!option) {
        return res.status(400).send("잘못된 검색");
    }

    const query = `SELECT * FROM ${option.table} WHERE ${option.field} LIKE ?`;
    db.all(query, [`%${searchQuery}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Error");
        }
        res.render("index", { results: rows, searchList });
    });
});

app.listen(port, () => {
    console.log("Server Ready");
});