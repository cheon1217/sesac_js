// 랜덤으로 10만개의 숫자 생성
const array = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));

// 랜덤으로 10만개의 숫자 겹치지 않게 생성
const uniqueRandNums = new Set();

while (uniqueRandNums.size < 10000) {
    uniqueRandNums.add(Math.floor(Math.random() * 10000));
}

const arrayUniqueRandNums = Array.from(uniqueRandNums);
console.log(arrayUniqueRandNums);

console.log();

// Set()을 사용하지 않고, for 구문을 통해 직접 하면?
const noneUniqueRandNums = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));

const uniqueRandNums2 = [];

for (let i = 0; i < noneUniqueRandNums.length; i++) {
    let randNum = noneUniqueRandNums[i];

    if (!arrayUniqueRandNums.includes(randNum)) {
        uniqueRandNums2.push(randNum);
    } else {
        while (arrayUniqueRandNums.includes(randNum)) {
            randNum = Math.floor(Math.random() * 100000);
        }
        uniqueRandNums2.push(randNum);
    }
}

console.log(uniqueRandNums2);