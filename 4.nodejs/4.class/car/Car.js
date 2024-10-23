class Car {
    constructor(brand, model, color) {
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    start() {
        console.log(`${this.brand}의 ${this.model}이(가) 출발합니다.`)
    }

    stop() {
        console.log(`${this.brand}의 ${this.model}이(가) 멈춥니다.`)
    }

    drive() {
        console.log(`${this.brand}의 ${this.model}을 운전합니다.`)
    }

    toString() {
        return `${this.model}`;
    }
}

module.exports = Car;