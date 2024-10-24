const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function guessNumberGame() {
    const randNum = Math.floor(Math.random() * 100) + 1;

    let count = 0;
    function guess() {
        rl.question("1부터 100 사이의 숫자를 맞춰보세요 :", (answer) => {
            const guessNum = parseInt(answer);

            if (guessNum > randNum) {
                console.log("더 작은 숫자입니다.");
                count++;
                guess();
            } else if (guessNum < randNum) {
                console.log("더 큰 숫자 입니다.");
                count++;
                guess();
            } else {
                count++;
                console.log(`정답입니다! ${count}번 만에 맞췄습니다.`);
                rl.close();
            }
        });
    };

    guess();
};

guessNumberGame();