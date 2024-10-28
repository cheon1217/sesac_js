console.log("1. 타이머를 통한 비동기처리"); // 첫번째

setTimeout(() => {
    console.log("2. 첫번째 작업: 2초후 실행"); // 네번째
}, 2000); // 2초

setTimeout(() => {
    console.log("3. 두번째 작업: 1초후 실행"); // 세번째
}, 1000); // 1초

console.log("4. 모든 작업이 완료되었습니다."); // 두번째