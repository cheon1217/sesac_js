// npm i puppeteer
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");

    const title = await page.title();
    console.log(`페이지 제목: ${title}`);

    // 방법1. cheerio에 넣고 파싱한다.

    // 방법2. puppeteer의 문법으로 파싱한다.
    const countryData = await page.evaluate(() => {
        const rows = document.querySelectorAll("table.wikitable tr");
        const result = [];
        // 옛날 코딩 스타일
        rows.forEach(row => {
            const columns = row.querySelectorAll("td");
            // 첫번째/두번째 열에서 데이터 가져오기
            if (columns.length > 2) {
                const country = columns[0].innerText.trim() || "N/A";
                const gdp = columns[1].innerText.trim() || "N/A";
                result.push({ country, gdp });
            }
        });

        // 알파벳 순으로 정렬
        return result.sort((a, b) => {
            return a.country < b.country ? -1 : a.country > b.country ? 1 : 0;
        });
    });
    console.log(countryData);
    console.log("=====================================");

    const countryData2 = await page.evaluate(() => {
        const rows = document.querySelectorAll("table.wikitable tr");
        return Array.from(rows).map(row => {
            const columns = row.querySelectorAll("td");
            return {
                country: columns[0]?.innerText.trim() || "N/A",
                gdp: columns[1]?.innerText.trim() || "N/A",
            }
        }).filter(item => item.country !== "N/A");
    });
    countryData2.sort((a, b) => a.country.localeCompare(b.country));
    console.log(countryData2);


    // 5초 대기
    // await new Promise((resolve) => { setTimeout(resolve, 5000); });

    await browser.close();
})();