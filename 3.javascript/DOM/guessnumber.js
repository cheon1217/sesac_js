// 1. 랜덤 숫자 1~100 까지를 생성한다.
const ranNum = Math.floor(Math.random()*100) + 1;
        
// 2. Guess 버튼을 통해 입력한 숫자와 내 숫자가 맞는지 비교한다
function checkGuess() {
    const myNum = document.getElementById("myNum").value;
    const result = document.getElementById("result");
    const historylist = document.getElementById("historylist");

    console.log("랜덤: " + ranNum + ", 추측: " + myNum);
   
    // if (myNum < ranNum) {
    //     result.innerHTML = "Too Low";
    // } else if (myNum > ranNum) {
    //     result.innerHTML = "Too High";
    // } else {
    //     result.innerHTML = "Correct";
    // }

    // 3항 연산자
    // (조건문) ? true : false
    result.innerHTML = (myNum < ranNum) ? "Too Low" : (myNum > ranNum) ? "Too High" : "Correct";

    // 미션2
    // 3. 입력한 값들의 로그를 출력하기
    const listItem = document.createElement("li");
    listItem.textContent = `예측 숫자: ${myNum}`;
    historylist.appendChild(listItem);
}



// 미션3.
// 4. 이걸 내가 풀어가는 사람 입장에서, 최소화해서 푸는 기법을 뭐라고 부르는가? 
//    이런 알고리즘을 우리가 뭐라고 부르는가?? 그 이름을 작성하기.. (= 알고리즘) binary search 
// 4-2. 최대(아무리 많이 찍더라도) 몇번만에 이 문제를 (무조건) 풀 수 있는가?? 그 횟수는??  7번
const button = document.getElementById("guessBtn");
button.addEventListener("click", checkGuess);