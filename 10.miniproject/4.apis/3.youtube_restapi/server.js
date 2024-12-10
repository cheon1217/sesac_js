require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// API 키 읽기
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
                part: "snippet",
                q: query,
                maxResults: 10,
                key: API_KEY,
            },
        });

        res.json(response.data.items);
    } catch (err) {
        console.error("Error fetching Youtube API: ", err);
        res.status(500).json({ error: "Failed to fetch data from Youtube API" });
    }
});

app.listen(PORT, ()=> {
    console.log("Server Ready");
});