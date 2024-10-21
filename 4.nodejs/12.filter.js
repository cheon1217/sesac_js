const numbers = [10, 15, 20, 25, 30];
// const aboveTwenty = numbers.filter(); // <-- 안에 받을 함수가 필터링 조건

function aboveTwentyCondition(n) {
    if (n > 20) {
        return true;
    } else {
        return false;
    }
}

function belowTwentyCondition(n) {
    if (n < 20) {
        return true;
    } else {
        return false;
    }
}

const aboveTwenty = numbers.filter(n => n > 20);
    // if (n > 20) { return true; } else { return false; }
    // return n > 20 ? true : false;
//     return n > 20;
// });
console.log(aboveTwenty);

const belowTwenty = numbers.filter(n => n < 20);
console.log(belowTwenty);

console.log(numbers.filter( n =>  n > 20 ));
console.log(numbers.filter( n =>  n < 20 ));

console.log(numbers.reduce((acc, num) => acc + num, 0));

// ---------------------------------------------------
const number2 = [1,2,3,4,5,6,7,8,9];

const evenNumbers = number2.filter(n => n % 2 == 0); // 짝수만 골라내기
console.log(evenNumbers);
const oddNumbers = number2.filter(n => n % 2 == 1); // 홀수만 골라내기
console.log(oddNumbers);

// 특정 문자열을 필터링
const words = ["apple", "banana", "grape", "blueberry", "avocado"];
// const containA = words.filter(); // a 라는 글자를 포함하는 것 담기
// console.log(containA);

function containALetter(word) {
    // 이 단어를 for 문으로 길이만큼 반복하면서
    // 만약(if) 그 char위치에 해당 글자 "a"를 포함하면? return true인 함수 작성
    for (let i = 0; i < word.length; i++) {
        if (word[i] == "a") {
            return true;
        }
    }

    return false;
}

const containA = words.filter(word => word.includes("a"));
const B = words.filter(word => word.startsWith("a"));
const C = words.filter(word => word.endsWith("e"));
console.log(containA); 
console.log(B); 
console.log(C);  

// 객체 배열(object를 담고 있는 Array)에서 무언가 골라내고 싶음
const people = [
    { name: "Alice", age: 25},
    { name: "Bob", age: 30},
    { name: "charlie", age: 20},
    { name: "David", age: 35},
]

const adults = people.filter(p => p.age >= 30); // 30세 이상.. >=
console.log(adults);

const people2 = [
    { name: "Alice", age: 25},
    { name: "Bob", age: 30},
    { name: "charlie"},
    { name: "David", age: 35},
]

// Object가 어떤 속성을 갖고 있는가 -> hasOwnProperty 
const unknownAge = people2.filter(p => !p.hasOwnProperty("age")); // 나이가 없는 사람을 고르시오
console.log(unknownAge);