class Circle {
    constructor(radius) {
        this._radius = radius; 
    }

    get diameter() {
        return this._radius * 2;
    }

    set diameter(diameter) {
        this._radius = diameter / 2;
    }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter);

myCircle.diameter = 14;
console.log(myCircle.diameter);

// console.log(myCircle._radius); // 할 수 있지만 하지마라