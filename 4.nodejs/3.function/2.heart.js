function heart(n) {
    let result = "";
    
    for (let i = (n * 2) - 1; i >= 1; i -= 4) {
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

console.log(heart(7));