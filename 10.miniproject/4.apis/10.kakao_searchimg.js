require("dotenv").config();
const axios = require("axios");

const REST_API_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = "https://dapi.kakao.com/v2/search/image";
const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`
}

const query = "아이유";

const params = {
    query: query,
    sort: "accuracy",
    page: 1,
    size: 10
}

// Promise 기반 체이닝
axios.get(url, { headers, params })
    .then(response => {
        const data = response.data;
        console.log(data);
    });