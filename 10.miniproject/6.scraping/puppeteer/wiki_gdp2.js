// npm i puppeteer
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto("https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)");

    const title = await page.title();
    console.log(`페이지 제목: ${title}`);

    // 방법1. cheerio에 넣고 파싱한다.
    const content = await page.content();
    const $ = cheerio.load(content);
    // console.log($.html());

    const countryData = [];
    const tableRows = $("table.wikitable").find("tr");
    tableRows.each((index, element) => {
        const columns = $(element).find("td");
        const country = $(columns[0]).text().trim();
        const gdp = $(columns[1]).text().trim();

        // console.log(`${index + 1}: 국가: ${country}, GDP: ${gdp}`);
        if (country && gdp) {
            countryData.push({ country, gdp });
        }
    })

    // console.log(countryData);
    countryData.forEach((item, index) => {
        const gdpValue = parseInt(item.gdp.replace(/,/g, ""));
        if (gdpValue >= 10000 && gdpValue < 20000) {
            console.log(`${index + 1}: 국가: ${item.country}, GDP: ${item.gdp}`);
        }
    });

    // TODO. gdp가 10000~20000 사이인 국가만 출력하시오
    const filteredData = countryData.filter(item => {
        const gdp = item.gdp.replace(/,/g, "");
        return 10000 <= gdp && gdp <= 20000;
    })

    console.log(filteredData);

    filteredData.forEach((item, index) => {
        console.log(`${index + 1}: 국가: ${item.country}, GDP: ${item.gdp}`);
    });

    await browser.close();
})();