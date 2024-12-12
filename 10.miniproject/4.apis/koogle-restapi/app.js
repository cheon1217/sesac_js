require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const path = require("path");
const { error } = require("console");

const app = express();
const PORT = 3000;

const KAKAO_RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "search.html"));
});

app.get("/api/search", async (req, res) => {
    const { query, type, page = 1 } = req.query;

    if (!query || !type) {
        return res.status(400).json({ error: "No query, No type" });
    }

    let apiUrl;
    if (type === "web") {
        apiUrl = "https://dapi.kakao.com/v2/search/web";
    } else if (type === "image") {
        apiUrl = "https://dapi.kakao.com/v2/search/image";
    } else if (type === "vclip") {
        apiUrl = "https://dapi.kakao.com/v2/search/vclip";
    } else {
        return res.status(400).json({ error: "No type, No apiUrl" });
    }

    const params = {
        query,
        sort: "accuracy",
        page: Number(page),
        size: 10
    };

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_RESTAPI_KEY}`
            },
            params
        });

        console.log(response);
        res.json(response.data);
    } catch (err) {
        console.error("Error api: ", err.message);
        res.status(500).json({ error: "Fail fetch" });
    }
})

app.listen(PORT, () => {
    console.log("Server Ready");
});