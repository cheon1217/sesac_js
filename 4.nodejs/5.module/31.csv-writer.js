// 특정 모듈 내에서의 특정 함수만 가져온 것
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csWriter = createCsvWriter({
    path: "example.csv",
    header: [
        // 내 파일의 헤더
        { id: "column1", title: "Column 1" },
        { id: "column2", title: "Column 2" },
    ]
});

const data = [
    { column1: "값1", column2: "값2"},
    { column1: "값3", column2: "값4"},
    { column1: "값5", column2: "값6"},
    { column1: "값7", column2: "값8"},
];

csWriter.writeRecords(data).then(() => {
    console.log("성공적으로 씀");
});