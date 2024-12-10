const axios = require("axios");
require("dotenv").config();

const url = "https://api.openweathermap.org/data/2.5/weather";
const params = {
    q: "Seoul",
    appid: process.env.OPENWEATHER_API_KEY,
    units: "metric", // 화씨가 섭씨로 바뀜
    lang: "kr",
};

const fetchWeather = async () => {
    const response = await axios.get(url, {params});
    // console.log("응답: ", response.data);
    const weather = response.data;
    console.log(`도시: ${weather.name}`);
    console.log(`온도: ${weather.main.temp} C 섭씨`);
    console.log(`날씨: ${weather.weather[0].description}`);
}

fetchWeather();

// axios.get(url, {params})
//     .then(response => {
//         console.log("응답: ", response.data);
//     });