const cheerio = require("cheerio");

const html = `
    <html>
        <head>
            <title>파싱 예제</title>
        </head>
        <body>
            <div>
                <p>첫 번째 문단</p>
                <p>두 번째 문단</p>
            </div>
            <a href="https://www.naver.com">네이버 링크</a>
            <p>또 하나의 문단</p>
            <div class="box">박스내용</div>
        </body>
    </html>
`;

// DOM 데이터 요청청
const $ = cheerio.load(html);
// console.log($.html());
const paragraphs = $("p");
// console.log(paragraphs);
paragraphs.each((index, element) => {
    console.log(`패러그래프: ${$(element).text()}`);
});

console.log("---");
const firstp = $("p").eq(0).text();
const secondp = $("p").eq(1).text();
console.log(`첫번째 p태그: ${firstp}`);
console.log(`두번째 p태그: ${secondp}`);

console.log("---");
const firstp2 = $("p").first().text();
const lastp = $("p").last().text();
console.log(`첫번째 p태그: ${firstp2}`);
console.log(`마지막 p태그: ${lastp}`);

console.log("---");
const myps = $("body > div > p");
console.log(`첫번째 p태그: ${myps.first().text()}`);
console.log(`마지막 p태그: ${myps.last().text()}`);

// const link = $("a");
// const linkurl = $("a").attr("href");
// console.log("하이퍼링크: ", linkurl);
// console.log("하이퍼링크텍스트: ", link.text());

// DOM 수정 가능
// $("p").text("새로운 텍스트");
// console.log($.html());

// $("div").addClass("highlight");
// $("div").removeClass("box");
// console.log($.html());