const fs = require("fs");

// 동기적으로 파일 읽기
const data = fs.readFileSync("file.txt", "utf8");
const lines = data.split("\n");
const sortedLines = lines.sort();

console.log(sortedLines);
console.log("동기 작업 완료");

// 비동기적으로 파일 읽기
fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const lines = data.split("\n");
    const sortedLines = lines.sort();

    console.log(sortedLines);
    console.log("비동기 작업 완료");
});

// console.log("다음 작업");

// 비동기적으로 파일 읽기를 지연시키는 함수
const delayedReadFile = (filename, callback) => {
    setTimeout(() => {
        fs.readFile(filename, "utf8", callback);
    }, 1000);
};

// 비동기적으로 파일 읽기
delayedReadFile("file.txt", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split("\n");
    const sortedLines = lines.sort();

    console.log(sortedLines);
    console.log("비동기 작업 완료");
});

console.log("다음 작업");