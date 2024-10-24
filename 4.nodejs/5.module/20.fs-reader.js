const fs = require("fs");

const filePath = "hello.csv";

function csv_readfile(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("파일 읽는 도중 오류 발생", err.message);
            return;
        }
        // console.log(data);
        // console.log(typeof data); // <- String

        // 이 문자열을 다시 우리가 원하는 자료구조(데이터형)으로 변환을 시켜줘야함.
        // 1. 데이터를 한줄한줄 구분한다.
        const rows = data.split("\n"); // \n은 뉴라인 = 줄바꿈
        // console.log(rows);
        
        // 2. 한줄 한줄 내에서 , 콤마로 구분짓는다
        // for (let i = 0; i < rows.length; i++) {
        //     const row = rows[i];
        //     const colums = row.split(",");
        //     console.log(colums);
        // }

        const result = rows.map((row) => row.split(","));

        callback(result);
    });
}

const content = [
    ["이름", "나이", "직업"],
    ["홍길동", "30", "개발자"],
    ["김철수", "25", "디자이너"],
    ["이영희", "28", "기획"]
];

// console.log(content);
// console.log(typeof content);

const csvContent = content.map((row) => row.join(",")).join("\n");
// console.log(csvContent);
// console.log(typeof csvContent);


function csv_writefile(filePath, csvContent) {
    fs.writeFile(filePath, csvContent, (err) => {
        if (err) {
            console.error("파일 쓰기 오류:", err.message);
            return;
        }
        
        console.log("쓰기 완료");
    })
}

csv_readfile(filePath, (data) => {
    console.log("CSV 파일 내용:", data);
});

// csv_writefile(filePath, csvContent);