const fs = require("fs");
const path = require("path");

function tree(directoryPath, content = "") {
    // 디렉토리 내 모든 파일 및 폴더 읽기
    const allF = fs.readdirSync(directoryPath);

    // 순회하기
    allF.forEach((file, index) => {
        const filePath = path.join(directoryPath, file);
        const lastFile = index === allF.length - 1;
        const connector = lastFile ? "+" : "+-+";

        console.log(content + connector + file);

        const isDir = fs.statSync(filePath).isDirectory();
        if (isDir) {
            const newContent = content + (lastFile ? "   " : "\\--");
            tree(filePath, newContent);
        }
    });
}

const startDir = __dirname;

tree(startDir);