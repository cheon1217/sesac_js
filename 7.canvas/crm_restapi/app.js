const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "revenue.html"));
});

app.get("/gender_dist_data", (req, res) => {
    const db = new sqlite3.Database("user-sample.db", (err) => {
        if (err) {
            console.log("파일없다");
        } else {
            console.log("DB 로딩 성공");
        }
    });

    db.all(`
        SELECT
            CASE
                WHEN Age BETWEEN 10 AND 19 THEN '10대'
                WHEN Age BETWEEN 20 AND 29 THEN '20대'
                WHEN Age BETWEEN 30 AND 39 THEN '30대'
                WHEN Age BETWEEN 40 AND 49 THEN '40대'
                WHEN Age BETWEEN 50 AND 59 THEN '50대'
                WHEN Age >= 60 THEN '60대이상'
            END AS AgeGroup,
            Gender,
            COUNT(*) AS UserCount
        FROM users
        GROUP BY AgeGroup, Gender
        ORDER BY AgeGroup, Gender
    `, [], (err, rows) => {
        if (err) {
            console.error("실패!");
        } else {
            console.log(rows);

            // 데이터를 가공.. 원하는대로
            // labels: ['10대', '20대', '30대', '40대', '50대']
            // maleCount: [100, 123, 128, 107, 29]
            // femaleCount: [101, 135, 126, 117, 33]

            // const chartData = {
            //     labels: ['10대', '20대', '30대', '40대', '50대'],
            //     maleCount: [100, 123, 128, 107, 29],
            //     femaleCount: [101, 135, 126, 117, 33],
            // }

            const ageGroups = {};

            for (const row of rows) {
                const ageGroup = row.AgeGroup;
                const gender = row.Gender;
                const count = row.UserCount;

                if (!ageGroups[ageGroup]) {
                    ageGroups[ageGroup] = { male: 0, female: 0 };
                }

                if (gender === "Male") {
                    ageGroups[ageGroup].male = count;
                } else if (gender === "Female") {
                    ageGroups[ageGroup].female = count;
                }
            }

            const chartData = {
                labels: Object.keys(ageGroups),
                maleCount: Object.values(ageGroups).map(group => group.male),
                femaleCount: Object.values(ageGroups).map(group => group.female),
            }
            
            console.log(chartData);
            res.json(chartData);
        }
    });
});

app.get("/revenue_data", (req, res) => {
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
            const labels = [];
            const revenues = [];
            const counts = [];

            for (const row of rows) {
                labels.push(row.YearMonth);
                revenues.push(row.MonthlyRevenue);
                counts.push(row.count);
            }

            const chartData = {
                labels: labels,
                revenues: revenues,
                counts: counts
            };

            res.json(chartData);
        }
    });
});

app.listen(port, () => {
    console.log("Server Ready");
});