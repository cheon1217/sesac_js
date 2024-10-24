const fs = require("fs");

function readCSV(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
            // console.error("파일 읽는 도중 오류 발생", err.message);
            return;
        }
        const rows = data.split("\n"); // \n은 뉴라인 = 줄바꿈

        const result = rows.map((row) => row.split(","));

        callback(null, result);
    });
}

// const csvContent = content.map((row) => row.join(",")).join("\n");

function writeCSV(filePath, content, callback) {
    // 사용자가 전달한 자료구조를, 다시 String 포멧으로 변환한다.
    const csvContent = content.map((row) => row.join(",")).join("\n");

    fs.writeFile(filePath, csvContent, (err) => {
        if (err) {
            console.error("파일 쓰기 오류:", err.message);
            callback(err);
            return;
        }
        
        console.log("쓰기 완료");
        callback(null);
    })
}

module.exports = { readCSV, writeCSV };