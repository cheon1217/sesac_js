function showPrice() {
    // 사용자가 입력한 값을 두 개의 변수에 저장함.
    let oPrice = document.querySelector("#originalPrice").value;
    let rate = document.querySelector("#rate").value;

    // 두 개의 값이 음수가 아니라면 실행해라
    if (oPrice > 0 && rate > 0) {
        let savedPrice = oPrice * (rate / 100);
        let resultPrice = oPrice - savedPrice;
        
        document.querySelector("#showResult").innerHTML = `상품의 원래 가격은 ${oPrice}원이고, <div>할인율은 ${rate}%입니다.</div> ${savedPrice}원을 절약한 <b>${resultPrice}원에 살 수 있습니다.</b>`;
    }

}