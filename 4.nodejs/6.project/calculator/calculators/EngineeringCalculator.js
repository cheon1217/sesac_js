const GenericCalculator = require("./GenericCalculator");


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

    getSupportedOperators() {
        return super.getSupportedOperators().concat(["exp", "log", "sin", "cos", "tan"]);
    }

    calculate(num1, operator, num2 = null) {
        if (!this.getSupportedOperators().includes(operator)) {
            return "Invalid operator";
        }

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
            default:
                return super.calculate(operator, num1, num2);
        }
    }
}

module.exports = EngineeringCalculator;