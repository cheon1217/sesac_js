const { readCSV, writeCSV } = require("./21.csvlibrary");

const filePath = "hello2.csv";

const content = [
    ["이름", "나이", "직업"],
    ["홍길동", "30", "개발자"],
    ["김철수", "25", "디자이너"],
    ["이영희", "28", "기획"]
];

writeCSV(filePath, content, (err) => {
    if (err) {
        console.log("파일 쓰기 실패:", err.message);
        return;
    };
    console.log("데이터 쓰기 완료");
});

// readCSV(filePath, (err, data) => {
//     if (err) {
//         console.log("파일 읽기 실패:", err.message);
//     }
//     console.log("파일 내 결과:", data);
// });
