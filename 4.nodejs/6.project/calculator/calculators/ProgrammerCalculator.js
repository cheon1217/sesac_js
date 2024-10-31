const GenericCalculator = require("./GenericCalculator");

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

    getSupportedOperators() {
        return super.getSupportedOperators().concat(["bin", "hex", "and", "or"]);
    }

    calculate(operator, num1, num2 = null) {
        if (!this.getSupportedOperators().includes(operator)) {
            return "Invalid operator";
        }

        switch (operator) {
            case "bin":
                return this.binary(num1);
            case "hex":
                return this.hexademical(num1);
            case "and":
                return this.bitwiseAnd(num1, num2);
            case "or":
                return this.bitwiseOr(num1, num2);
            default:
                return super.calculate(operator, num1, num2);
        }
    }
}

module.exports = ProgrammerCalculator;