const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;


const db = new sqlite3.Database("user-sample.db");

app.listen(port, () => {
    console.log("Server Ready");
});