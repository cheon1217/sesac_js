export function add(a, b) {
    return a + b;
}

export function sub(a, b) {
    return a - b;
}

export function mul(a, b) {
    return a * b;
}

export function div(a, b) {
    if (b === 0) {
        return "0으로 나눌 수 없음";
    }
    return a / b;
}