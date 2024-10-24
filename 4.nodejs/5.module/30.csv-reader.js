// npm i csv-parser
const fs = require("fs"); // 빌트인
const csv = require("csv-parser"); // 외부
                                   // 내부 (자체 라이브러리)

const results = [];

fs.createReadStream('hello.csv', "utf8")
  .pipe(csv())
  .on('data', (data) => {
    // 데이터를 스트림으로 읽으면서 처리
    results.push(data)
  })
  .on('end', () => {
    // 데이터 읽는게 끝났을 때 처리하는 로직
    console.log(results);
});