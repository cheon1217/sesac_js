// 각각의 인자와 리턴 "타입"을 정의해줌
function add(a: number, b: number): number {
    return a + b;
}

const sum: number = add(5, 10);

console.log(`hello, typescript, 결과: ${sum}`);