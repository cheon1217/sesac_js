const fs = require("fs");

// 파일 읽기
fs.readFileSync("example.txt", "utf8", (err, data) => {
    if(err) {
        console.log("뭔가 실패?? 파일 읽기 실패", err);
    } else {
        console.log("파일 내용:", data);
    }
});


const content = "이것이 파일에 쓰여질 내용입니다.";
fs.writeFileSync("newfile.txt", content, "utf8", (err) => {
    if (err) {
        console.log("파일에 쓰는 중 오류가 발생했습니다.");
    } else {
        console.log("파일에 내용이 성공적으로 쓰였습니다.");
    }
});
            
