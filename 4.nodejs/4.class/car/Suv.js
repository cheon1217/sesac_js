const Car = require("./Car");

class Suv extends Car {
    constructor (brand, model, color, cc) {
        super(brand, model, color);
        this.cc = cc;
    }

    offRoad() {
        console.log(`${this.model}는 오프로드 차량입니다.`);
    }
}

module.exports = Suv;