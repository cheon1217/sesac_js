// 1. 문자열을 통한 에러 처리 방식 - 비추천
function divide(a, b) {
    try {
        if (b === 0) {
            throw "0으로 나눌 수 없습니다.";
        }
        return a / b;
    } catch (error) {
        return "오류 발생: " + error;
    }
}

// console.log(divide(5,0));
// console.log(divide(5,100));

// 2. 오류를 Error 객체에 담아서 반환(던지기)
function divide2(a, b) {
    try {
        // if (!(a instanceof Number) || !(b instanceof Number)) {  // 객체 타입으로 넣어줘야함
        if (typeof a !== "number" || typeof b !== "number") {
            throw new Error("숫자만 입력하세요");
        }
        if (b === 0) {
            throw new Error("0으로 나눌 수 없습니다.");
        }
        return a / b;
    } catch (error) {
        return "오류 발생: " + error.message;
    } finally {
        console.log("오류가 나건 안나건 무조건 호출됨.");
    }
}

const b = new Number(5);
const c = new Number(7);

console.log(divide2(10,2));
console.log(divide2(5,7));
console.log(divide2(5,0)); // 실패함
console.log(divide2(5,"7"));
console.log(divide2(b,c));

console.log("이후에 정상적으로 동작 가능");