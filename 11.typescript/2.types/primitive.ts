let username: string = "John";
console.log(`Username: ${username}`);

let age: number = 30;
console.log(`Age: ${age}`);

let isAdmin: boolean = true;
isAdmin = false;

// isAdmin = "true"; // boolean 타입에 string을 할당하려고 하면 에러 발생
console.log(`관리자: ${isAdmin}`);

let unknownValue: any = "아무거나";
unknownValue = 10;
unknownValue = true;
console.log(`아무타입: ${unknownValue}`);

let undefinedValue: undefined = undefined;
console.log(`Undefined value: ${undefinedValue}`);

let nullValue: null = null;
console.log(`Null value: ${nullValue}`);

// 타입 지정을 안하면? 최초 지정시 자동할당
let notype = 1;
// notype = 'a';