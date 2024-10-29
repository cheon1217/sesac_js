const Generator = require("../common/Generator");

class StorenameGenerator extends Generator {
    constructor() {
        super();
        this.storeTypes = ["스탁벅스", "이디야", "투썸", "메가커피", "컴포스커피"];
        this.villages = ["강남", "송파", "잠실", "홍대", "신촌", "성동", "서초"];
    }

    generateType() {
        return this.getRandomData(this.storeTypes);
    }

    generateVillage() {
        return this.getRandomData(this.villages);
    }

    generateStoreName(storeType) {
        const village = this.generateVillage();
        const storeNumber = this.getRandomInRange(1, 10);
        return `${storeType} ${village}${storeNumber}호점`;
    }
}

module.exports = StorenameGenerator;