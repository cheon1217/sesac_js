try {
    // 실제 여러가지 코드 내용
    invalidFunc();
} catch (error) {
    if (error instanceof TypeError) {
        console.log("타입오류", error.message);
    } else if (error instanceof ReferenceError) {
        console.log("참조 오류", error.message);
    } else if (error instanceof RangeError) {
        console.log("범위 오류", error.message);
    } else {
        console.log("알 수 없는 오류", error.message);
    }
}