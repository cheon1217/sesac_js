const Generator = require("../common/Generator");

class GenderGenerator extends Generator {
    generate() {
        const genders = ["Male", "Female"];
        return this.getRandomData(genders);
    }
}

module.exports = GenderGenerator;