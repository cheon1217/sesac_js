const Generator = require("./generator");

class GenderGenerator extends Generator {
    generate() {
        const genders = ["Male", "female"];
        return genders[Math.floor(Math.random() * genders.length)];
    }
}

module.exports = GenderGenerator;