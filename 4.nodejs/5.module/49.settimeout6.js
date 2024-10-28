console.log("0. 타이머를 통한 비동기처리"); // 첫번째

function setTimeoutSync(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, delay);
    });
}

// const result = setTimeoutSync("1. 첫번째 작업: 1초후 실행", 1000)
//     .then(() => {
//         setTimeoutSync("2. 두번째 작업: 2초후 실행", 1000)  // 위 setTimeoutSync가 완료된 후 시작됨
//             .then(() => {
//                 setTimeoutSync("3. 세번째 작업: 3초후 실행", 1000)
//                     .then(() => {
//                         console.log("4. 모든 작업이 완료되었습니다."); 
//                     });
//             });
//     });

// 프로미스 체이닝
setTimeoutSync("1. 첫번째 작업: 1초후 실행", 1000)
    .then(() => setTimeoutSync("2. 두번째 작업: 2초후 실행", 1000))  // 위 setTimeoutSync가 완료된 후 시작됨
    .then(() => setTimeoutSync("3. 세번째 작업: 3초후 실행", 1000))
    .then(() => {
        console.log("4. 모든 작업이 완료되었습니다."); 
    });