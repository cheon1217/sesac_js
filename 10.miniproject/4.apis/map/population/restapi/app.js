const express = require("express");
const { getSeoulPopulationData } = require("./data");

const app = express();
const PORT = 3000;

app.use(express.static("views"));

app.get("/api/seoulData", (req, res) => {
    const seoulData = getSeoulPopulationData();
    res.json(seoulData);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/population.html")
});

app.listen(PORT, () => {
    console.log("Server Ready");
});