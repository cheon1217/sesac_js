// npm i puppeteer
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto("https://www.google.com/");

    const title = await page.title();
    console.log(`페이지 제목: ${title}`);

    // 5초 대기
    // await new Promise((resolve) => { setTimeout(resolve, 5000); });

    await browser.close();
})();