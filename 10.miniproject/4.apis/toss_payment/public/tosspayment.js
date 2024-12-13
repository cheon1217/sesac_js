let selectedProduct = null;
let selectedPaymentMethod = null;
let clientKey;
let customerKey; // 랜덤 고객
let tossPayments;
let payment; // 토스의 함수 호출

async function initializePayments() {
    try {
        clientKey = await fetchClientKey();
        customerKey = generateRandomString();
        tossPayments = TossPayments(clientKey);
        payment = tossPayments.payment({ customerKey });
        console.log("Toss Payments initialized successfully");
    } catch (err) {
        console.error("Fail: ", err.message);
        alert("초기화 실패");
    }
}

async function fetchClientKey() {
    const response = await fetch("/config");
    const data = await response.json();
    return data.clientKey;
}

function selectProduct(event, name, price) {
    selectedProduct = {name, price};
    document.querySelectorAll(".product-button").forEach(button => {
        button.style.backgroundColor = "#ffffff";
    });
    event.target.style.backgroundColor = "rgb(229, 239, 255)";
}

function selectPaymentMethod(method) {
    if (selectedPaymentMethod) {    
        document.getElementById(selectedPaymentMethod).style.backgroundColor = "#ffffff";
    }

    selectedPaymentMethod = method;
    document.getElementById(selectedPaymentMethod).style.backgroundColor = "rgb(229, 239, 255)";
}

async function requestPayment() {
    if (!selectedProduct) {
        alert("상품을 선택해주세요");
        return;
    }

    if (!selectedPaymentMethod) {
        alert("결제 수단을 선택해주세요");
        return;
    }

    const { name, price } = selectedProduct;
    const orderId = generateRandomString();

    try {
        await payment.requestPayment({
            method: selectedPaymentMethod,
            amount: { currency: "KRW", value: price },
            orderId: orderId,
            orderName: name,
            successUrl: `${window.location.origin}/success.html`,
            failUrl: `${window.location.origin}/fail.html`,
        })
    } catch (err) {
        alert(`결제 요청 중 오류 발생: ${err.message}`);
    }
}

function generateRandomString() {
    return Math.random().toString(36).slice(2, 10); // 8자리 문자..
}

document.addEventListener("DOMContentLoaded", () => {
    initializePayments();
});