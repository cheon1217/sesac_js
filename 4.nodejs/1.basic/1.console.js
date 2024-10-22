// console.log('hello, nodejs');

// 1. 기본 헬로우 월드 출력
const greeting = "Hello, world";
console.log(greeting);

// 2. 여러개의 값을 출력하려면?
const a = 10;
const b = 20;
const c = "text";
console.log(a, b, c);
console.log("입력값들은: " , a, b, c);
console.log("입력값들은: a=", a, "b=", b, "c=", c);
console.log("입력값들은: a=" + a + ",b=" + b + ",c=" + c);
console.log(`입력값들은: a=${a}, b=${b}, c=${c}`);

// 3. 객체
const person = { name:"jcpark", age : 30};
console.log("Person: ", person);
console.log("Person 이름: ", person.name);
console.log("Person 나이: ", person.age);
console.log("Person 나이: ", person.agk); // 없는 멤버는 undefined가 나옴

// 4. 배열
const fruit = ["애플", "바나나", "오렌지"];
console.log(fruit[0]);
console.log(fruit[1]);
console.log(fruit[2]);
console.log(fruit[3]); // 없는 멤버는 undefined가 나옴

// 7. 성능측정같은걸 원할 때
console.time("test");
console.log("우리의 복잡한 로직을 처리할 때");
console.timeEnd("test");

// 8. style
console.log("%c 스타일 적용한 텍스트", "color: blue, font-size: 20px");