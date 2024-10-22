// 입력값을 인자로 받아서 처리한다.
// 함수명을 sum_to_n()으로 바꾸고, 입력인자를 입력 받아서, 함수
function sum_to_n(n) {
    // 1부터 100까지의 합산을 반납한다.
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

console.log(sum_to_n(100));

function sum2_to_n(n) {
    let num = 1;
    let sum = 0;
    while (num <= n) {
        sum += num;
        num++;
    }
    return sum;
}

console.log(sum2_to_n(10000));

function sum3_to_n(n) {
    // 이 덧셈을 가장 빠르게 하는 알고리즘??
    let num = n;
    let sum = (num * (num + 1)) / 2;
    return sum;
}

console.log(sum3_to_n(1000000));


// console.time("for");
// console.log(sum_to_100());
// console.timeEnd("forend");

// console.time("while");
// console.log(sum2_to_100());
// console.timeEnd("whileend");