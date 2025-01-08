// npm i puppeteer
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });

    const page = await browser.newPage();

    await page.goto("https://www.google.com");

    // 검색어 입력
    await page.type('textarea[name="q"]', "javascript programming");
    await page.keyboard.press('Enter');

    await page.waitForSelector("div#search"); // div#res

    // 이 결과 내에서 원하는 요소 추출하기
    const results = await page.evaluate(() => {
        const items = [];

        const resDiv = document.querySelector("div#search");
        const elements = resDiv.querySelectorAll("h3");

        elements.forEach((element, index) => {
            const linkElement = element.closest("a");
            items.push({
                title: element.innerText,
                url: linkElement ? linkElement.href : "링크없음"
            });
        });

        return items;
    })

    console.log("검색 결과: ");
    console.log(results);

    await page.screenshot({ path: "screenshot.png" });

    await browser.close();
})();