const Person = require("./Person");

class Child extends Person {
    constructor(name, age, gender, grade) {
        super(name, age, gender);
        this.grade = grade;
    }

    playInCar(car) {
        console.log(`${this.name}는 ${car} 뒷자석에 탔습니다.`);
    }

    sing() {
        console.log(`${this.name}는 노래를 부릅니다.`);
    }
}

module.exports = Child;