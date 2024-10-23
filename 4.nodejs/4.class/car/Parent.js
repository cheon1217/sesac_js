const Car = require("./Car");
const Person = require("./Person");

class Parent extends Person {
    constructor(name, age, gender, role) {
        super(name, age, gender);
        this.role = role;
    }

    diveCar(car) {
        console.log(`${this.role} ${this.name}는 ${car}를 운전합니다.`);
    }
}

module.exports = Parent;