// import fetch from "node-fetch";
// import axios from "axios";
const fetch = require("node-fetch");
const axios = require("axios");

async function fetchexample() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
            console.log("에러");
            return;
        }
    
        const data = await response.json();
        console.log("fetch 데이터: ", data.title);
    } catch (err) {
        console.error(err);
        console.log("fetch 통신오류");
    }
}

async function axiosexample() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        console.log("응답코드: ", response.status);
        console.log("axios 데이터: ", response.data.body);
    } catch (error) {
        console.log("axios 통신오류");
    }
}

(async () => {
    fetchexample();
    axiosexample();
})();