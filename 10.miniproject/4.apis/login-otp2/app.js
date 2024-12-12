require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
    console.log("Server Ready");
});