// reduce() 함수는, 전체 배열 내의 데이터를 합산(등)을 통해서, 누계기(accumulator)
const numbers = [1, 2, 3, 4, 5]; // 하나로 합치면?? 합산

// const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);

// 모든 수의 곱셈?
const product = numbers.reduce((acc, curV) => acc * curV, 1);  // 0을 초기값으로 주면 곱셈값이 0이 되니 1부터 시작해야함
console.log(product);

// 저 배열에서 가장 큰 값??
const numbers2 = [4, 10, 20, 100, 2];
const max = numbers2.reduce((acc, curV) => acc > curV ? acc : curV, numbers2[0]);
console.log(max);

console.log(Math.max(...numbers2));

// 내가 max 함수를 구현한다면??

function my_max(numbers) {
    let max = numbers[0]; // 초기값 선언

    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }

    return max;
}

const numbers3 = [-10, -999, -20, -50, -15];

console.log(my_max(numbers3));