// 살아있는 사람의 나이 ... 999
function checkAge(age) {
    if (age < 0 || age > 150) {
        throw new Error("유효하지 않은 나이입니다.");
    }
    return `나이는 ${age} 입니다.`;
}

console.log(checkAge(10));
console.log(checkAge(55));
console.log(checkAge(99));

try {
    console.log(checkAge(-1));
} catch (error) {
    console.log("오류발생: ", error.message);
}
