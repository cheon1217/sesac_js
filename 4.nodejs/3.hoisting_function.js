console.log(multiply(4,2));

function multiply(x, y) {
    return x * y;
}

functionA();

function functionA() {
    functionB();
}

function functionB() {
    console.log("함수B");
}

// 변수에 함수를 담으면?
// console.log("곱셈:", multiply2(4, 2));

let multiply2 = function(x, y) {
    return x * y;
}

