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

const person1 = new Person("철수", 25, "남성");
person1.greet("길동");
person1.walk(10);
person1.eat();

class Employee extends Person {
    constructor(name, age, gender, jobTitle, salary) {
        super(name, age, gender);
        this.jobTitle = jobTitle;
        this.salary = salary;
    }

    displayInfo() {
        console.log(`직원 ${this.name}의 직위는 ${this.jobTitle}이며, 급여는 ${this.salary}원 입니다.`);
    }

    work() {
        console.log(`${this.name}이(가) 업무 중 입니다.`);
    }
}

const employee1 = new Employee("영희", 30, "여성", "매니저", 50000);
employee1.greet("길순");
employee1.displayInfo();
employee1.walk();
employee1.work();

const employee2 = new Employee("영수", 31, "여성", null, 50000);
employee2.greet("길치");
employee2.displayInfo();

console.log("직원1이 직원객체인가요?", employee1 instanceof Employee);
console.log("직원1이 사람인가요?", employee1 instanceof Person);

console.log("사람1은 직원인가요?", person1 instanceof Employee);
console.log("사람1은 사람인가요?", person1 instanceof Person);

console.log("직원1 이라는 변수는??", typeof employee1);
console.log("사람1 이라는 변수는??", typeof person1);

class Manager extends Employee {
    constructor(name, age, gender, jobTitle, salary, team) {
        super(name, age, gender,jobTitle, salary);
        this.team = team;
    }

    assignTask() {
        console.log(`${this.name} 매니져가 ${this.team}에 업무를 배분하고 있습니다.`);
    }
}

const manager1 = new Manager("수현", 35, "남성", "팀장", 60000, "개발");
manager1.assignTask();

class Student extends Person {
    constructor(name, age, gender, studentId, major) {
        super(name, age, gender);
        this.studentId = studentId;
        this.major = major;
    }

    study() {
        console.log(`${this.name} 학생은 ${this.age}살이고, ${this.major}을(를) 공부하고 있습니다.`);
    }
}

class Customer extends Person {
    constructor(name, age, gender, customerId, orderHistory) {
        super(name, age, gender);
        this.customerId = customerId;
        this.orderHistory = orderHistory;
    }

    placeOrder(product) {
        this.orderHistory.push(product);
        console.log(`${this.name} 고객이 ${product}을(를) 주문하였습니다`);
    }

    orderMenu() {
        for (let i = 0; i < this.orderHistory.length; i++) {
            console.log(`- ${this.orderHistory[i]}`);
        }

        this.orderHistory.forEach((orderItem) => {
            console.log(`<li>${orderItem}</li>`);
        });

        console.log(`주문 내역: ${this.orderHistory.join(`<br>`)}`)
    }
}

const student1 = new Student("지연", 20, "여성", "20240101", "컴퓨터공학");
student1.study();

const customer1 = new Customer("지민", 21, "여성", "C1001", ["커피", "라떼"]);
customer1.placeOrder("아메리카노");
customer1.orderMenu(); // 이 사람이 지금까지 주문한 내역을 모두 출력하시오

console.log("-----");
console.log("-".repeat(20));

const people = [manager1, student1, customer1, employee1, employee2];
introduce(people);

function introduce(people) {

    for (const person of people) {
        person.greet("철수");
    }

    for (let i = 0; i < people.length; i++) {
        people[i].walk(Math.floor(Math.random() * 10 + 1));
    }

    people.forEach((person) => {
        if (person instanceof Employee) {
            person.work();
        } else if (person instanceof Student) {
            person.study();
        }
    })
}