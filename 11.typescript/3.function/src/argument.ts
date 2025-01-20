// 가변인자와 필수인자는 순서를 섞을 수 없음.
// 필수인자가 무조건 모두 다 가변인자 앞에 와야함!
function greet(name: string = "Guest", greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice", "Hi"));
console.log(greet("Alice", "안녕"));
console.log(greet("Alice"));
console.log(greet());

const greet2 = (name: string = "Guest", age?: number): string => {
    return age ? `안녕, 나는 ${name}이고 ${age}살이야.` : `안녕, 나는 ${name}!`;
}

console.log(greet2());
console.log(greet2("bob"));
console.log(greet2("bob", 23));