function bubbleSort1(arr) {
    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 두 요소를 교환
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// 사용 예시
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("정렬 전:", array);
const sortedArray = bubbleSort1(array);
console.log("정렬 후:", sortedArray);


function bubbleSort2(arr) {
    const length = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return arr;
}

// 사용 예시
const array2 = [64, 25, 12, 22, 11];
console.log("정렬 전:", array2);
const sortedArray2 = bubbleSort2(array2);
console.log("정렬 후:", sortedArray2);