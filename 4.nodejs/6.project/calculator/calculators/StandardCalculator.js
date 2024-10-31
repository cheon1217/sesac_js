const GenericCalculator = require("./GenericCalculator");

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

    getSupportedOperators() {
        return super.getSupportedOperators().concat(["sqrt", "pow2", "round"]);
    }

    calculate(operator, num1) {
        if (!this.getSupportedOperators().includes(operator)) {
            return "Invalid operator";
        }

        switch (operator) {
            case "sqrt":
                return this.square(num1);
            case "pow2":
                return this.powerOfTwo(num1);
            case "round":
                return this.round(num1);
            default:
                return super.calculate(operator, num1);
        }
    }
}

module.exports = StandardCalculator;