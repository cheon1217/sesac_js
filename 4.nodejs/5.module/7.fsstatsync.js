const fs = require("fs");

const directoryPath = "./"; // 현재 디렉토리

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log("디렉토르 읽기 오류", err.message);
        return;
    }
    files.forEach(file => {
        try {
            const stats = fs.statSync(file);
            if (stats.isDirectory()) {
                console.log(`이 파일 ${file}은 디렉토리 입니다.`);
            }
            if (stats.isFile()) {
                console.log(`이 파일 ${file}은 파일입니다.`);
            }
        } catch (error) {
            console.log("파일 stat 오류");
        }
    })
})
