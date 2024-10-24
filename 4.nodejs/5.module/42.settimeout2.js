function asyncLongtask(callback) {
    setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber >= 0.5) {
            callback(null, "작업이 완료되었습니다.");
        } else {
            callback("작업이 실패하였습니다.", null);
        }
    }, 2000); // 2초 지연 후 작업 실행
}

// function displayResult() {
//     console.log("실행 완료");
// }

asyncLongtask( (error, result) => {
    if (error) {
        console.error("실패:", error);
        return;
    } 
    
    console.log("성공:", result);
});