const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

// 현재 디렉토리
const currentDir = path.dirname(path.resolve(__filename));
// console.log(currentDir);

// CSV 파일 디렉토리
const csvDirectory = path.join(currentDir, "../../csvFile/");
// console.log(csvDirectory);

// 지정된 디렉토리와 파일명에서 csv파일 읽어 id값 배열로 가져오기 (비동기함수)
function getUuidFromCSV(csvDirectory, csvFilename) {
    const uuids = []; 
    const csvPath = path.join(csvDirectory, csvFilename);

    // 경로가 없을 경우 빈 배열 반환
    if (!fs.existsSync(csvPath)) {
        return Promise.resolve(uuids);
    }

    // csv-parser로 CSV 읽기
    // fs.createReadStream()는 파일을 읽기 위한 readstream 생성 -> csvPath 경로에 있는 CSV 파일을 스트림으로 읽어들이기 위해 사용
    // pipe() => 스트림 간에 데이터를 전달할 때 사용하는 메서드
    // 읽어온 CSV 파일의 데이터를 csv() 함수에 파이프(piping)하여 전달
    // csv()는 csv-parser 라이브러리가 제공하는 함수 (파이프를 통해 전달받은 데이터를 CSV 형식에서 자바스크립트 객체로 변환)
    const fileStream = fs.createReadStream(csvPath).pipe(csv());

    // CSV의 각 행을 처리하며, data 이벤트가 발생할 때마다 row 객체를 받아서 필요한 작업을 수행
    // promise가 uuids 배열을 resolve로 반환
    return new Promise((resolve, reject) => { fileStream
            .on("data", (row) => {
                uuids.push(row.id); // 각 행의 id값을 uuids 배열에 추가
            })
            .on("end", () => {
                resolve(uuids); // 작업이 끝날 시 배열 반환
            })
            .on("error", (error) => {
                reject(error); // 에러 발생 시 reject
            });
    });
}

// 비동기함수 getUuids 위에 만든 getUuidFromCSV 함수로 csv 파일에서 id 값 추출
// 모든 CSV 파일을 비동기적으로 읽고 UUID 배열을 반환
const getUuids = async () => {
    const userUuids = await getUuidFromCSV(csvDirectory, "user.csv");
    const storeUuids = await getUuidFromCSV(csvDirectory, "store.csv");
    const itemUuids = await getUuidFromCSV(csvDirectory, "item.csv");
    const orderUuids = await getUuidFromCSV(csvDirectory, "order.csv");

    // console.log(userUuids);
    // console.log(storeUuids);
    // console.log(itemUuids);

    return {
        userUuids,
        storeUuids,
        itemUuids,
        orderUuids,
    };
};

// getUuids();

module.exports = getUuids;