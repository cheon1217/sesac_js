const fs = require("fs");

const directoryPath = "../3.function";

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log("읽기 실패!!", err.message);
        return;
    } 
    
    console.log(files);
    console.log(files[0]);

    files.forEach((file) => {
        fs.readFile(file, "utf8", (error, data) => {
            if (error) {
                console.log("파일 내용 읽기 실패", error.message);
                return;
            }
            console.log(data);
        })
    })

});