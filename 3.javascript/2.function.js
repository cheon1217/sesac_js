function greet(name) {
    console.log("Hello, " + name);
};

greet();
greet("");
greet("안녕");
greet("Tom");
greet("John");
greet("Park");

// 가장 기본 함수
function add(a, b) {
    // console.log(a + b);
    return a + b;
}

let sum = add(2, 3);
console.log(sum);

console.log(add(5, 10));

// 변수가 함수를 담는다.
let sum2 = function(a, b) { // 이름이 없는 함수 = 익명함수
    return a + b;
}

// 그럼?? 변수가 함수로서의 역할을 한다...
console.log(sum2(2,3));

// 변수에 함수를 담는데, function이라는 불필요한 키워드를 없애기 위해서 생겨난게?? 화살표 함수..
let sum3 = (a, b) => { // Arrow function
    return a + b;
}

console.log(sum3(10,5));

// 더 줄여버림
// 화살표 함수의 변천사 ... 아래가 최종, 가장 간결해진 코드
let sum4 = (a, b) => a + b;
console.log(sum4(1,5));