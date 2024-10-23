const Car = require("./Car");

class Sedan extends Car {
    constructor (brand, model, color, cc) {
        super(brand, model, color);
        this.cc = cc;
    }

    openTrunk() {
        console.log(`${this.model}는 오픈카입니다.`);
    }
}

module.exports = Sedan;