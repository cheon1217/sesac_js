const Generator = require("./generator");

class NameGenerator extends Generator {
    constructor() {
        super();
        this.lastNames = ["김", "이", "박", "정", "최"];
        this.firstNames = ["서연", "민준", "하준", "하윤", "재원"];
    }

    generate() {
        const lastname = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
        const firstname = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];     
        return lastname + firstname;
    }
}

module.exports = NameGenerator;