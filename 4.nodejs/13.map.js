// filter는 말 그대로 검색하는 함수
// map은 배열의 멤버에게 공통적으로 원하는 함수내용을 적용할 때 쓰는 함수

const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map(콜백함수); // 각각의 개별 멤버에게 이 함수가 적용된다.

function double(n) {
    return n * 2;
}

const doubled = numbers.map(double);
console.log(doubled);

const doubled2 = numbers.map(n => n * 2);
console.log(doubled2);

const squared = numbers.map(n => n * n); // n ** 2
console.log(squared);

// 객체...
const people = [
    { name: "Alice", age: 25},
    { name: "Bob", age: 30},
    { name: "charlie", age: 20},
    { name: "David", age: 35},
]

// 맵을 통해서 사람들의 이름만 가져오기
const names = people.map(p => p.name);
console.log(names);

// 맵을 통해서 사람들의 나이만 가져오기
const ages = people.map(p => p.age);
console.log(ages);

// 퀴즈1.
const fruits = ["apple", "banana", "grape"];
const htmlTages = fruits.map(fruit => `<li>${fruit}</li>`); // 좌우를 <li></li> 태그로 감싸기
console.log(htmlTages);

// 퀴즈2.
const apiData = [
    {id: 1, firstName: "John", lastName: "Doe"},
    {id: 2, firstName: "Jane", lastName: "Smith"}
];

// const fullName = apiData.map(name => name.firstName + name.lastName); // 이 각각의 사용자 객체에서 FULL NAME을 만들기
const fullName = apiData.map(user => `${user.firstName} ${user.lastName}`);
console.log(fullName);