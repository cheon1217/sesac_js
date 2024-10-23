class Car { // 실명, 호이스팅 O, 초기화는 X
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
const myCar2 = new Car("기아차", "모닝");
console.log(myCar);

console.log(myCar.drive());
console.log(myCar.open());
console.log(myCar.close());

console.log(myCar2.drive());
console.log(myCar2.open());
console.log(myCar2.close());