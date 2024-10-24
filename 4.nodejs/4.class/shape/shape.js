class Shape {
    constructor(shape) {
        this.shape = shape;
    }

    getArea() {
        throw new Error("getArea() must be implemented by a subclass!");
    }

    getInfo() {
        return "나는 어떤 도형이고 어떤 속성을 가지고 있을까?";
    }

    toString() {
        return `${this.shape} - Area: ${this.getArea().toFixed(2)}`;
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super("Square");
        this.sideLength = sideLength;
    }

    getArea() {
        return this.sideLength ** 2;
    }

    getInfo() {
        return `Square with side Length ${this.sideLength}`;
    }
}

class Triangle extends Shape {
    constructor(side1, height) {
        super("Triangle");
        this.side1 = side1;
        this.height = height;
    }

    getArea() {
        return 0.5 * this.side1 * this.height;
    }

    getInfo() {
        return `Triangle with base ${this.side1} and height ${this.height}`;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    getArea() {
        return this.radius ** 2 * Math.PI;
    }

    getInfo() {
        return `Circle with radius ${this.radius}`;
    }
}

class Trapezium extends Shape {
    constructor(side1, side2, height) {
        super("Trapezium");
        this.side1 = side1;
        this.side2 = side2;
        this.height = height;
    }

    getArea() {
        return 0.5 * (this.side1 + this.side2) * this.height;
    }

    getInfo() {
        return `Trapezium with base1 ${this.side1}, base2 ${this.side2}, and height ${this.height}`;
    }
}

// 사용 예시
const square = new Square(5);
const triangle = new Triangle(4, 3);
const circle = new Circle(3);
const trapezium = new Trapezium(4, 6, 5);

console.log("SquareArea", square.getArea());
console.log("TriangleArea", triangle.getArea());
console.log("TrapeziumArea", trapezium.getArea());
console.log("CircleArea", circle.getArea().toFixed(2));

console.log(square.getInfo(), "Area:", square.getArea());
console.log(triangle.getInfo(), "Area:", triangle.getArea());
console.log(trapezium.getInfo(), "Area:", trapezium.getArea());
console.log(circle.getInfo(), "Area:", circle.getArea().toFixed(0));

console.log(`${square}`);
console.log(`${triangle}`);
console.log(`${trapezium}`);
console.log(`${circle}`);