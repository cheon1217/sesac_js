const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

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

    await page.setContent(html);

    const pageContent = await page.content();
    const $ = cheerio.load(pageContent);

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

    // 5초 대기
    // await new Promise((resolve) => { setTimeout(resolve, 5000); });

    await browser.close();
})();