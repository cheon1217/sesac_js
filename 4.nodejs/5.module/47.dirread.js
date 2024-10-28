const fs = require("fs");
const path = require("path");

const directoryPath = "./";

function checkFile(filePath) {
    // 파일에 대한 정보를 가져다가 준비가 되면??? 나를 불러줘
    // 당장 파일 정보를 가져와서, 그 결과를 나에게 보고하시오
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log("정보 조회 실패");
            return;
        }

        if (stats.isFile()) {
            console.log(`${filePath}: 이것은 파일입니다.`);
        } else if (stats.isDirectory()) {
            console.log(`${filePath}: 이것은 디렉토리입니다.`);
        } else {
            console.log("모르겠습니다.");
        }
    })
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

fs.readdir(directoryPath, (err, files) => {
    // 콜백하수 내용 - 디렉토리 읽는데 끝났을 때 호출하는 내용
    if (err) {
        console.log("읽기 오류");
        return;
    }

    // console.log(files);
    files.forEach(file => {
        try {
            const stats = fs.statSync(file);
            if (stats.isFile()) {
                console.log(`${file}: 이것은 파일입니다.`);
            } else if (stats.isDirectory()) {
                console.log(`${file}: 이것은 디렉토리입니다.`);
            }
        } catch (err) {
            console.log(`${file}: 이건 뭥미`);
        }
    })
});