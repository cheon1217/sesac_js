class Animal {
    constructor(public readonly name: string) {}

    makeSound() {
        console.log("동물소리. 멍멍/냐옹냐옹");
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }

    makeSound() {
        console.log(`${this.name} 멍멍.`);
    }
}

const dog = new Dog("새싹", "시바견");
console.log(`이름: ${dog.name}, 종: ${dog.breed}`);
dog.makeSound();