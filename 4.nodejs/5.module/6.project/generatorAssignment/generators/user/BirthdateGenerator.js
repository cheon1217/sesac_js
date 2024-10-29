const Generator = require("../common/Generator");

class BirthdateGenerator extends Generator {
    generate() {
        const year = this.getRandomInRange(1960, 2010);
        const month = this.getRandomInRange(1, 12);
        const day = this.getRandomInRange(1, 28);

        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    }
}

module.exports = BirthdateGenerator;