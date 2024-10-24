const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let money = 0; // bank 안에 넣게되면 증액과 차액이 안됨.

function bank() {
    console.log("ATM 메뉴 :");
    console.log("1. 잔액 확인");
    console.log("2. 입금");
    console.log("3. 출금");
    console.log("4. 종료");


    rl.question("원하는 작업을 선택하세요:", (menu) => {
        const select = parseInt(menu);

        switch(select) {
            case 1 :
                console.log(`=> 현재 잔액은 ${money}원 입니다`);
                bank();
                break;
            case 2 :
                rl.question("입금할 금액을 입력하세요: ", (deposit) => {
                    const depositMoney = parseInt(deposit);
                    money += depositMoney;
                    console.log(`=> ${money}원이 입금되었습니다.`);
                    bank();
                })
                break;
            case 3:
                rl.question("인출할 금액을 입력하세요: ", (withdraw) => {
                    const withdrawMoney = parseInt(withdraw);
                    if (withdrawMoney > money) {
                        console.log("=> 잔액이 부족합니다.");
                    } else {
                        money -= withdrawMoney;
                        console.log(`=> ${withdrawMoney}원이 인출되었습니다.`);
                    }
                    bank();
                })
                break;
            case 4:
                console.log("=> ATM을 종료합니다.");
                rl.close();
                break;
            default:
                console.log("=> 1 ~ 4 중에 하나를 선택하세요.");
                bank();
                break;
        }
    })

}

bank();