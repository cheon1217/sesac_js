const Car = class Car { // 익명,실명 가능, 호이스팅 X
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make}의 ${this.model}이 운항중입니다.`;
    }

    open() {
        return `${this.model}의 문이 열렸습니다.`;
    }

    close() {
        return `${this.model}의 문이 닫혔습니다.`;
    }
}

// 클래스 사용
const myCar = new Car("현대차", "k5");
console.log(myCar);

console.log(myCar.drive());
console.log(myCar.open());
console.log(myCar.close());