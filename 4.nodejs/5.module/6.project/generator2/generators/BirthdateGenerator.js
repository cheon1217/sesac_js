const Generator = require("./generator");
const MyUtility = require("./getRandomInRange");

class BirthdateGenerator extends Generator {
    generate() {
        const year = MyUtility.getRandomInRange(1960, 2010);
        const month = MyUtility.getRandomInRange(1, 12);
        const day = MyUtility.getRandomInRange(1, 28);

        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
}

module.exports = BirthdateGenerator;