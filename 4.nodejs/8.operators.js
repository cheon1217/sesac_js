let a = 10;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b); // 모듈러 연산, 나눈이후 나머지값..
console.log(a ** b); // 제곱 - 10^5승을 의미함 = 100000

let x = 10;
x += 5; // x = x + 5;
console.log(x);

x -= 3; // x = x - 3;
console.log(x);

x *= 3; // x = x * 3;
console.log(x);

console.log(a > b); // true
console.log(a < b); // false

// 논리연산자
let sunny = true;
let warm = false;

console.log(sunny && warm); // true && false = AND(1,0) = 0 = false
console.log(sunny || warm); // true || false = OR(1,0) = 1 = true

console.log("-- AND --");
console.log(1 && 0); // 0 = false
console.log(0 && 1); // 0 = false
console.log(2 && 3); // 0 = false, 1이거나 나머지 숫자는 다 true에 해당함
console.log(3 && 2); // 0 = false, 1이거나 나머지 숫자는 다 true에 해당함

console.log("-- OR --");
console.log(1 || 0); // 1 = true
console.log(0 || 1); // 1 = true
console.log(2 || 3); // 2
console.log(3 || 2); // 3

console.log("--- 연산자 우선순위 ---");
console.log(2 + 3 * 2);
console.log(2 + (3 * 2) && (3 % 7) || (2 * 3) && (1 * 8));
console.log((2 + (3 * 2)) && (3 % 7) || (2 * 3) && (1 * 8));
console.log(((2 + (3 * 2)) && (3 % 7)) || ((2 * 3) && (1 * 8)));