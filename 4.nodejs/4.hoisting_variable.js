console.log(a); // var 변수는 변수 자체는 호이스팅 되지만, 해당 값은 initialize되지 않는다.

var a = 5;

console.log(a);

console.log(b); // let 변수는 호이스팅이 되지 않음... 그래서 언제나 사용전에 선언이 되어야한다.

let b = 7;

console.log(b);