function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        if (arr[middle] === target) {
            return middle; // 찾는 요소의 인덱스 반환
        } else if (arr[middle] < target) {
            left = middle + 1; // 중간 값보다 큰 부분 탐색
        } else {
            right = middle - 1; // 중간 값보다 작은 부분 탐색
        }
    }

    return -1; // 요소를 찾지 못한 경우 -1 반환
}

// 오름차순으로 정렬된 배열 생성
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// 찾고자 하는 숫자
const targetNumber = 21;

// 이진 검색 실행
const result = binarySearch(sortedArray, targetNumber);

if (result !== -1) {
    console.log(`찾는 숫자 ${targetNumber}은 배열의 인덱스 ${result}에 있습니다.`);
} else {
    console.log(`${result}, 배열에서 숫자를 찾을 수 없습니다.`);
}