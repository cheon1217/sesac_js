function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("Hello, TypeScript!"));
console.log(identity<number>(12345));
console.log(identity<boolean>(true));

function wrapInArray<T>(value: T): T[] {
    return [value];
}

console.log(wrapInArray<number>(10));
console.log(wrapInArray<string>("Hello, TypeScript!"));

function getFirstElement<T>(array: T[]): T {
    return array[0];
}

console.log(getFirstElement<number>([1, 2, 3]));
console.log(getFirstElement([1, 2, 3]));

console.log(getFirstElement<string>(["a", "b", "c"]));
console.log(getFirstElement(["a", "b", "c"]));

// 리스트를 <아무타입이나> 인자로 받아서 해당타입의 요소 하나 또는 없음(undefined)을 반환
function getLastElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}

console.log(getLastElement<number>([1, 2, 3]));
console.log(getLastElement([1, 2, 3]));
console.log(getLastElement([]));

console.log(getLastElement<string>(["a", "b", "c"]));
console.log(getLastElement(["a", "b", "c"]));

function getMiddleElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
        return undefined;
    }

    const middleIndex = Math.floor(array.length / 2); // 중간 인덱스를 가져와서 내림처리
    return array[middleIndex];
}

console.log(getMiddleElement<number>([1, 2, 3]));
console.log(getMiddleElement<number>([1, 2, 3, 4]));
console.log(getMiddleElement<number>([1, 2, 3, 4, 5]));
console.log(getMiddleElement<number>([]));

const middle: number | undefined = getMiddleElement([1, 2, 3]);
const middle2: number = getMiddleElement([1, 2, 3]) ?? -1; // 앞에 값이 없으면?? 뒤에 -1이 기본값