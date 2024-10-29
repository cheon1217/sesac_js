const Generator = require("./Generator");

class AddressGenerator extends Generator {
    constructor() {
        super();
        this.cities = ["서울", "부산", "인천", "세종", "울산", "대구", "대전", "제주", "광주", "서귀포"];
        this.gus = ["종로구", "송파구", "관악구", "강남구", "해운대구", "강서구", "중구", "동구", "남구", "북구"];
        this.streets = ["길", "로"];
    }

    generate() {
        const city = this.getRandomData(this.cities);
        const gu = this.getRandomData(this.gus);
        const street = this.getRandomData(this.streets);
        const num1 = this.getRandomInRange(1, 100);
        const num2 = this.getRandomInRange(1, 100);

        return `${city}시 ${gu} ${num1}${street} ${num2}`;
    }
}

module.exports = AddressGenerator;