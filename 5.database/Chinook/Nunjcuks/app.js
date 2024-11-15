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
    const { searchQuery, searchList, page = 1 } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = 10;
    const offset = (currentPage - 1) * itemsPerPage;

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

    const countQuery = `SELECT COUNT(*) AS count FROM ${option.table} WHERE ${option.field} LIKE ?`;
    db.get(countQuery, [`%${searchQuery}%`], (err, countRow) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send({ message: "DB error" });
        }

        const totalResults = countRow.count;
        const totalPages = Math.ceil(totalResults / itemsPerPage);

        const query = `SELECT * FROM ${option.table} WHERE ${option.field} LIKE ? LIMIT ? OFFSET ?`;
        db.all(query, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Error");
            }
            res.render("index", { 
                results: rows,
                searchList,
                searchQuery,
                currentPage,
                totalPages
            });
        }); 
    });
});

app.listen(port, () => {
    console.log("Server Ready");
});