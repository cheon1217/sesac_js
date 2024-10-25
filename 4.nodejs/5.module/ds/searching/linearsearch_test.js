// 선형 함수 검색
function lineaeSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// 랜덤으로 10만개의 숫자 생성
const array = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));

// 찾고자 하는 숫자
const tragetNumber = 8000;

// 선형 검색 시간 측정
console.time("linearSearch");
const result = lineaeSearch(array, tragetNumber);
console.timeEnd("linearSearch");

if (result !== -1) {
    console.log(`찾는 숫자 ${tragetNumber}은 배열의 인덱스 ${result}에 있습니다.`);
} else {
    console.log(`배열에서 숫자를 찾을 수 없습니다.`);
}