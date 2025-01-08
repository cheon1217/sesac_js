const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });

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

    // p 요소 가져오기
    const paragraphs = await page.$$("p");
    for (let paragraph of paragraphs) {
        const text = await page.evaluate((element) => element.textContent, paragraph);
        console.log(`패러그래프: ${text}`);
    }

    const firstParagraph = await page.evaluate(() => document.querySelector("p").textContent);
    const secondParagraph = await page.evaluate(() => document.querySelectorAll("p")[1].textContent);
    console.log(`첫번째 p태그: ${firstParagraph}`);
    console.log(`두번째 p태그: ${secondParagraph}`);

    // 5초 대기
    // await new Promise((resolve) => { setTimeout(resolve, 5000); });

    await browser.close();
})();