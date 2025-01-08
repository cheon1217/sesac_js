const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.naver.com/section/105";

axios.get(url)
    .then((response) => {
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        // const title = $("title").text();
        // console.log(`사이트 제목: ${title}`);

        // <strong class="sa_text_strong"></strong> 안에 있는 내용 scrapping하기
        // const strongs = $(".sa_text_strong");
        // strongs.each((index, element) => {
        //     console.log(`제목: ${$(element).text()}`);
        // });

        // 원하는 헤드라인 태그 가져오기
        $("li.sa_item._SECTION_HEADLINE").each((_, element) => {
            $(element).find("div.sa_text a").each((_, subElement) => {
                const title = $(subElement).text().trim();
                console.log(title);
            });
        });
    })
    .catch((error) => {
        console.error(`요청에러: ${error.status}`);
    });