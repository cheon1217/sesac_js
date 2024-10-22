function sum_to_100() {
    // 1부터 100까지의 합산을 반납한다.
    let sum = 0;

    for (let i = 1; i <= 100; i++) {
        sum += i;
    }

    return sum;
}

function sum2_to_100() {
    let num = 1;
    let sum = 0;
    while (num <= 100) {
        sum += num;
        num++;
    }
    return sum;
}

function sum3_to_100() {
    // 이 덧셈을 가장 빠르게 하는 알고리즘??
    let n = 101;
    let sum = (n * (n - 1)) / 2;
    return sum;
}

console.log(sum_to_100());
console.log(sum2_to_100());
console.log(sum3_to_100());

// console.time("for");
// console.log(sum_to_100());
// console.timeEnd("forend");

// console.time("while");
// console.log(sum2_to_100());
// console.timeEnd("whileend");