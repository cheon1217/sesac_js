const EngineeringCalculator = require("./calculators/EngineeringCalculator");
const ProgrammerCalculator = require("./calculators/ProgrammerCalculator");
const StandardCalculator = require("./calculators/StandardCalculator");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("계산기 모드를 선택해주세요: ");
console.log("1. 공학용 계산기");
console.log("2. 일반용 계산기");
console.log("3. 프로그래머 계산기");

readline.question("Enter the mode (1/2/3): ", (mode) => {
    let calculator;

    switch (mode) {
        case "1":
            calculator = new EngineeringCalculator();
            break;
        case "2":
            calculator = new StandardCalculator();
            break;
        case "3":
            calculator = new ProgrammerCalculator();
            break;
        default:
            console.log("Invalid mode");
            readline.close();
            return;
    }

    console.log(`\nAvailable operations: ${calculator.getSupportedOperators().join(", ")}\n`);
    
    readline.question("첫번째 숫자를 입력하시오: ", (num1) => {
        readline.question("연산자를 선택하시오: ", (operator) => {
            if (!calculator.getSupportedOperators().includes(operator)) {
                console.log("Invalid operator. Please select a valid operator from:", calculator.getSupportedOperators().join(","));
                readline.close();
                return;
            }
            
            // 연산자가 유효한 경우, 두 번째 숫자가 필요한지 확인 후 계산 수행
            readline.question("두번째 숫자를 입력하시오: ", (num2) => {
                num1 = parseFloat(num1);
                num2 = num2 ? parseFloat(num2) : null;
                
                const result = calculator.calculate(operator, num1, num2);
                console.log(`Result: ${result}`);
                readline.close();
            });
        });
    });
});