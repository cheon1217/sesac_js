const fs = require("fs");
const path = require("path");

const directoryPath = "./";

function checkFile(filePath) {
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
        console.log(`${filePath}: 이것은 파일입니다.`);
    } else if (stats.isDirectory()) {
        console.log(`${filePath}: 이것은 디렉토리입니다.`);
    } else {
        console.log("모르겠습니다.");
    }
}

fs.readdir(directoryPath, (err, files) => {
    // 콜백하수 내용 - 디렉토리 읽는데 끝났을 때 호출하는 내용
    if (err) {
        console.log("읽기 오류");
        return;
    }

    // console.log(files);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log("파일: ", filePath);
        checkFile(filePath);
    })
});