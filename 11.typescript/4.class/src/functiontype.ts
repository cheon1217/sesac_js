interface Calculate {
    (a: number, b: number): number; // 두개의 숫자를 받아서 하나의 숫자를 반환하는 함수
}

const add: Calculate = (x, y) => x + y;
console.log(`덧셈: ${add(10, 20)}`);

const substract: Calculate = (x, y) => x - y;
console.log(`뺄셈: ${substract(20, 10)}`);

const multiply: Calculate = (x, y) => x * y;
console.log(`곱셈: ${multiply(10, 20)}`);

const divide: Calculate = (x, y) => x / y;
console.log(`나눗셈: ${divide(20, 10)}`);