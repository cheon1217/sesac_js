const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function bank() {
    console.log("ATM 메뉴 :");
    console.log("1. 잔액 확인");
    console.log("2. 입금");
    console.log("3. 출금");
    console.log("4. 종료");

    rl.question("원하는 작업을 선택하세요:", (menu) => {
        
    })

}
