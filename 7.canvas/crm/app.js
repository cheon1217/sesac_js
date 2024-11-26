const express = require("express");
const sqlite3 = require("sqlite3");
const nunjucks = require("nunjucks");

const app = express();
const port = 3000;

// 눈적스 초기화
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.set("view engine", "html"); // 눈적스 기본 확장자 njk -> html로 변경

app.get("/", (req, res) => {
    const db = new sqlite3.Database("user-sample.db", (err) => {
        if (err) {
            console.log("파일없다");
        } else {
            console.log("DB 로딩 성공");
        }
    });
    
    db.all(`
       SELECT 
            strftime('%Y-%m', "orders"."OrderAt") AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue, COUNT(order_items.ItemId) AS count 
        FROM 
            "orders"
        JOIN 
            "order_items" ON "orders"."Id" = "order_items"."OrderId"
        JOIN 
            "items" ON "order_items"."ItemId" = "items"."Id"
        WHERE 
            "orders"."OrderAt" >= date('now', '-2 year')
        GROUP BY 
            strftime('%Y-%m', "orders"."OrderAt")
        ORDER BY 
            strftime('%Y-%m', "orders"."OrderAt")
    `, [], (err, rows) => {
        if (err) {
            console.error("실패!");
        } else {
            console.log(rows);
            // res.render("monthly_revenue", { rows });
            const labels = rows.map((row) => row.YearMonth);
            const revenues = rows.map((row) => row.MonthlyRevenue);

            res.render("monthly_revenue", {
                rows: rows,
                labels: JSON.stringify(labels),
                revenues: JSON.stringify(revenues),
            });
        }
    });

    // 데이터 베이스 연결 닫기
    db.close((err) => {
        if (err) {
            console.error("DB 닫기 실패");
        } else {
            console.log("DB 닫기 성공");
        }
    })
});

app.listen(port, () => {
    console.log("Server Ready");
});