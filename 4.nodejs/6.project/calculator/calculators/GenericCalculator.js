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

    getSupportedOperators() {
        return ["+", "-", "*", "/"];
    }
    
    calculate(num1, operator, num2 = null) {
        if (!this.getSupportedOperators().includes(operator)) {
            return "Invalid operator";
        }

        switch (operator) {
            case "+":
                return this.add(num1, num2);
            case "-":
                return this.substract(num1, num2);
            case "*":
                return this.multiply(num1, num2);
            case "/":
                return this.divide(num1, num2);
        };
    };

}

module.exports = GenericCalculator;