const Generator = require("./generator");

class AddressGenerator extends Generator {
    constructor() {
        super();
        this.cities = ["서울", "인천", "대전", "대구", "부산"];
        this.villages = ["강남구", "송파구", "강북구", "성동구", "강서구"];
        this.streets = ["길", "로"];
    }

    generate() {
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        const village = this.villages[Math.floor(Math.random() * this.villages.length)];
        const street = this.streets[Math.floor(Math.random() * this.streets.length)];

        const roadNum1 = Math.floor(Math.random() * 100) + 1;
        const roadNum2 = Math.floor(Math.random() * 100) + 1;

        return `${city}시 ${village} ${roadNum1}${street} ${roadNum2}`;
    }
}

module.exports = AddressGenerator;