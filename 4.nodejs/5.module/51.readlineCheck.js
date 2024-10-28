const { resolve } = require("path");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("입력값 받기 전");

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>{
        rl.question(query, (answer) => {
            // console.log(`입력한 값: ${answer}`);
            rl.close();
            resolve(answer);
        });
    }) 
}

async function askQuestions() {
    const answer1 = await askQuestion("원하는 값1을 입력하세요: ");
    console.log(`입력한 값: ${answer1}`);

    const answer2 = await askQuestion("원하는 값2을 입력하세요: ");
    console.log(`입력한 값: ${answer2}`);
}

askQuestions();