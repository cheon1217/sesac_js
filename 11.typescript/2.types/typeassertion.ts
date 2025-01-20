let someValue: any = "Hello, TypeScript";

// 첫번째 방식 as 문법법
let stringLength: number = (someValue as string).length;
console.log(`문자열 길이: ${stringLength}`);

// 두번째 방식 angle bracket <> 문법 = JSX에서는 사용 불가, react에서 비추
let stringLength2: number = (<string>someValue).length;
console.log(`문자열 길이: ${stringLength2}`);