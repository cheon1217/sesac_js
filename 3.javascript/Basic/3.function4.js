// ---------------------------
// add(+), subtract(-), multipy(*), division(/)

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multipy(a, b) {
    return a * b;
}

function division(a, b) {
    if (b == 0) {
        console.log("분모는 0일 수 없습니다.");
    } else {
        return a / b;
    }
}

console.log(add(1,2));
console.log(subtract(2,1));
console.log(multipy(3,5));
console.log(division(4,0));

let add1 = (a, b) => a + b;
let sub1 = (a, b) => a - b;
let mul1 = (a, b) => a * b;
let div1 = (a, b) => a / b;

console.log(add1(5,5));
console.log(sub1(5,5));
console.log(mul1(5,5));
console.log(div1(5,5));