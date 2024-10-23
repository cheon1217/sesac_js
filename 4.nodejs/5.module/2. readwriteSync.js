const fs = require("fs");

// 파일 읽기
try {
    const data = fs.readFileSync("example2.txt", "utf8");
    console.log(data);
} catch (error) {
    console.error("파일을 읽는데 실패함", error.message);
}

// 파일 쓰기
const content = "이것이 파일에 쓰여질 내용입니다222.";
fs.writeFileSync("newfile.txt", content);

console.log("쓰기 완료");