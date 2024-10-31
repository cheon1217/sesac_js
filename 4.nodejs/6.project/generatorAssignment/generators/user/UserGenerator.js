const User = require("../variables/User");
const AddressGenerator = require("../common/addressGenerator");
const Generator = require("../common/Generator");
const BirthdateGenerator = require("./BirthdateGenerator");
const GenderGenerator = require("./GenderGenerator");
const NameGenerator = require("./NameGenerator");
const uuid = require("uuid");

class UserGenerator extends Generator {
    constructor() {
        super();
        this.nameGenerator = new NameGenerator();
        this.birthdateGenerator = new BirthdateGenerator();
        this.genderGenerator = new GenderGenerator();
        this.addressGenerator = new AddressGenerator();
    }

    generate() {
        const userId = uuid.v4();
        const name = this.nameGenerator.generate();
        const birthdate = this.birthdateGenerator.generate();
        const age = 2024 - birthdate.slice(0, 4) + 1;
        const gender = this.genderGenerator.generate();
        const address = this.addressGenerator.generate();
        
        return new User(userId, name, gender, age, birthdate, address);
    }

    generateUsers(count) {
        const users = [];

        for (let i = 0; i < count; i++) {
            const user = this.generate();
            users.push(user);
        }

        return users;
    }
}

module.exports = UserGenerator;