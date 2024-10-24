function greet(name, callback) {
    const message = `안녕 ${name}`;

    callback(message);
}

function displayGreeting1(greeting) {
    console.log(greeting);
}

function displayGreeting2(greeting) {
    console.log(`<h1>${greeting}</h1>`);
}

greet("홍길동", displayGreeting1);
greet("홍길동", displayGreeting2);

function add(a, b, callback) {
    const sum = a + b;
    callback(a, b, sum);
}

function displaySum(a, b, result) {
    console.log(`두 수 (${a}, ${b}) 합: ${result}`);
}

add(3, 4, displaySum);