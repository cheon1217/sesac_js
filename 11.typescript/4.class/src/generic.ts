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