class GenericCalculator {
    add(num1, num2) { return num1 + num2; }
    
    substract(num1, num2) { return num1 - num2; }
    
    multiply(num1, num2) { return num1 * num2; }
    
    divide(num1, num2) {
        if (num2 === 0) {
            return "Error: Division by zero is not allowed";
        } 
        return num1 / num2; 
    }
    
    calculate(num1, operator, num2) {
        switch (operator) {
            case "+":
                return this.add(num1, num2);
            case "-":
                return this.substract(num1, num2);
            case "*":
                return this.multiply(num1, num2);
            case "/":
                return this.divide(num1, num2);
            default:
                return "Invalid operator";
        };
    };

}

class EngineeringCalculator extends GenericCalculator {
    // 추가적인 공학용 계산기 기능 구현
    exponential(num1, num2) {
        return Math.pow(num1, num2);
    }

    logarithm(num1, num2) {
        return Math.log(num1) / Math.log(num2);
    }

    sin(angle) {
        return Math.sin(angle * (Math.PI / 180));
    }

    cosin(angle) {
        return Math.cos(angle * (Math.PI / 180));
    }

    tangent(angle) {
        return Math.tan(angle * (Math.PI / 180));
    }

    calculate(num1, operator, num2) {
        switch (operator) {
            case "exp":
                return this.exponential(num1, num2);
            case "log":
                return this.logarithm(num1, num2);
            case "sin":
                return this.sin(num1);
            case "cos":
                return this.cosin(num1);
            case "tan":
                return this.tangent(num1);
        }
    }
}

class StandardCalculator extends GenericCalculator {
    // 제곱근, 반올림, 등등
    square(num) {
        return Math.sqrt(num);
    }

    powerOfTwo(num) {
        return Math.pow(num, 2);
    }

    round(num) {
        return Math.round(num);
    }
}

class ProgrammerCalculator extends GenericCalculator {
    // 비트연산, 논리연산, 등등
    bitwiseAnd(num1, num2) {
        return num1 & num2;
    }

    bitwiseOr(num1, num2) {
        return num1 | num2;
    }

    binary(num) {
        return num.toString(2);
    }

    hexademical(num) {
        return num.toString(16);
    }
}

class UserInput {
    constructor (calculator) {
        this.calculator = calculator;
        this.readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    selectCalculatorMode() {
        console.log("계산기 모드를 선택해주세요: ");
        console.log("1. 공학용 계산기");
        console.log("2. 일반용 계산기");
        console.log("3. 프로그래머 계산기");

        this.readline.question("Enter the mode (1/2/3): ", (mode) => {
            switch (mode) {
                case "1":
                    this.calculator = new EngineeringCalculator();
                    this.operators = ["+", "-", "*", "/", "^", "log", "sin", "cosin", "tangent"];
                    break;
                case "2":
                    this.calculator = new StandardCalculator();
                    this.operators = ["+", "-", "*", "/"];
                    break;
                case "3":
                    this.calculator = new ProgrammerCalculator();
                    this.operators = ["+", "-", "*", "/", "bin", "Hex", "and", "or"];
                    break;
                default:
                    console.log("Invalid mode");
                    this.readline.close();
                    return;
            }
            this.getUserInput();
        });
    }

    getUserInput() {
        this.readline.question("첫번째 숫자를 입력하시오: ", (num1) => {
            this.readline.question(`연산자를 입력하시오 (${this.operators.join(", ")}): `, (operator) => {
                this.readline.question("두번째 숫자를 입력하시오: ", (num2) => {
                    const number1 = parseFloat(num1);
                    const number2 = parseFloat(num2);
                    const result = this.calculator.calculate(number1, operator, number2);
                    console.log(`결과: ${result}`);
                    this.readline.close();
                });
            });
        });
    }
    start() {
        this.selectCalculatorMode();
    }
}

const genericCalculator = new GenericCalculator();
const userInput = new UserInput(genericCalculator);


userInput.start();