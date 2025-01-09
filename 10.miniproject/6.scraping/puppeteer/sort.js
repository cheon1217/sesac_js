const numbers = [5, 2, 9, 1];
console.log(numbers);

numbers.sort((a, b) => a - b); // 0 두 값이 같다, 음수가 나오면 b가 크다, 양수가 나오면 a가 크다
console.log(numbers);

const fruits = ["banana", "apple", "orange", "cherry", "사과", "바나나"];
console.log(fruits);

// fruits.sort((a, b) => a > b ? 1 : -1);
fruits.sort((a, b) => a.localeCompare(b)); // 문자열을 비교하는 함수
console.log(fruits);