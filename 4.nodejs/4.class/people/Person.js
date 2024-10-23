class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet(name) { // 함수(function) = 클래스의 함수를 Method라고 부름
        console.log(`안녕 ${name}님, 나는 ${this.name}이고, ${this.age}살이야`);
    }

    walk(distance) {
        if (distance) {
            console.log(`${this.name}이(가) ${distance}미터를 걷고 있습니다.`);
        } else {
            console.log(`${this.name}이(가) 멍하니~ 걷고 있습니다.`);
            // throw TypeError("거리 입력이 필수입니다.");
        }
    }

    eat() {
        console.log(`${this.name}이(가) 식사 중입니다.`);
    }
}

module.exports = Person;