class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return "동물소리";
    }

    walk() {
        return `${this.name}가 깡총깡총 걷고 있습니다.`
    }
}

class Dog extends Animal {
    makeSound() {
        return "당근";
    }
}

const myDog = new Dog("토깽이");
console.log(myDog.makeSound());
console.log(myDog.walk());