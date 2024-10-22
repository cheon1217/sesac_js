function triangle(n) {
    let result = "";
    for(let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            result += "*";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle(5));

function triangle2(n) {
    let result = "";
    for (let i = n; i >= 1; i--) {
        for (let j = 1; j <= i; j++) {
            result += "*";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle2(5));

function triangle3(n) {
    let result = "";
    for (let i = n; i >= 1; i--) {
        for (let j = 1; j < (n + 1) - i; j++) {
            result += " ";
        }
        for (let j = 1; j <= i; j++) {
            result += "*";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle3(5));

function triangle4(n) {
    let result = "";
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n - i; j++) {
            result += " ";
        }
        for (let j = 1; j <= i; j++) {
            result += "*";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle4(5));

function triangle5(n) {
    let result = "";
    for (let i = 1; i <= n * 2; i += 2) {
        for (let j = 1; j < ((n * 2) - i) / 2; j++) {
            result += " ";
        }
        for (let j = 1; j <= i; j++) {
            result += "*";
        }
        for (let j = 1; j < ((n * 2) - i) / 2; j++) {
            result += " ";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle5(5));

function triangle6(n) {
    let result = "";
    for (let i = (n * 2) - 1; i >= 1; i -= 2) {
        for (let j = 1; j < ((n * 2) - i) / 2; j++) {
            result += " ";
        }
        for (let j = i; j >= 1; j--) {
            result += "*";
        }
        for (let j = 1; j < ((n * 2) - i) / 2; j++) {
            result += " ";
        }
        result += "\n";
    }
    return result;
}

console.log(triangle6(5));