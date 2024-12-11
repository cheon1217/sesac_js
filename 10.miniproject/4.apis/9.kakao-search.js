require("dotenv").config();
const axios = require("axios");

const REST_API_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = "https://dapi.kakao.com/v2/search/web";
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
// axios.get(url, { headers, params })
//     .then(response => {
//         const data = response.data;
//         console.log(data);
//     });

// Modern JS 방식
const fetchFunction = async () => {
    try {
        const response = await axios.get(url, { headers, params });
        const data = await response.data;
        console.log(data);
    } catch (err) {
        console.error("Fetch Error: ", err.message);
    }
}

// fetchFunction();

const params2 = {
    query: query,
    sort: "accuracy",
    size: 5
}

const fetchFunctionPages = async (totalPages) => {
    try {
        for (let page = 1; page <= totalPages; page++) {
            params2.page = page;
            const response = await axios.get(url, { headers, params: params2 });
            const data = await response.data;
            console.log(data);
        }
    } catch (err) {
        console.error("Fetch Error: ", err.message);
    }
}

fetchFunctionPages(3);