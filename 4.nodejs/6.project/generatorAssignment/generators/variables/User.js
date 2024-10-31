class User {
    constructor(id, name, gender, age, birthdate, address) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.birthdate = birthdate;
        this.address = address;
    }

    toString() {
        return `Id: ${this.id}, Name: ${this.name}, Gender: ${this.gender}, Age: ${this.age}, Birthdate: ${this.birthdate}, Address: ${this.address}`;
    }
}

module.exports = User;