const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.listen(3000, () => {
    console.log("서버 레디");
}); 