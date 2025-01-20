class Person {
    name: string;
    age: number;
    isEmployed: boolean;

    constructor(name: string, age: number, isEmployed: boolean) {
        this.name = name;
        this.age = age;
        this.isEmployed = isEmployed;
    }

    sayHello(): string {
        return `안녕, 나는 ${this.name}이고, 나이는 ${this.age}이야.`
    }
}

const person = new Person('Alice', 23, true);
console.log(person.sayHello());