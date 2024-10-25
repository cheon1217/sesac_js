function insertionsort(arr) {
    const length = arr.length;

    for (let i = 1; i < length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current;
    }

    return arr;
}

// 사용 예시
const array = [12, 11, 13, 5, 6];
console.log("정렬 전:", array);
const sortArray = insertionsort(array);
console.log("정렬 후:", sortArray);