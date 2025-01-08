// npm i cheerio
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.example.com";

axios.get(url)
    .then((response) => {
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        const title = $("title").text();
        console.log(`사이트 제목: ${title}`);
    })
    .catch((error) => {
        console.error(`요청에러: ${error.status}`);
    });