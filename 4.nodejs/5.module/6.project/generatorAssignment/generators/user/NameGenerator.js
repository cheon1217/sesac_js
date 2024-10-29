const Generator = require("../common/Generator");

class NameGenerator extends Generator {
    constructor() {
        super();
        this.lastNames = ["김", "이", "박", "최", "정", "강", "조", "임", "안", "윤"];
        this.firstNames = ["서연", "지호", "민준", "서진", "하윤", "현우", "지안", "아린", "수민", "민서",
                            "준서", "동현", "지훈", "건우", "서영", "수빈", "도윤", "채린", "은영", "재원",
                            "우진", "민재", "원정", "채원", "서현", "하은", "하늘", "하영", "유진", "준석",
                            "예원", "지우", "예준", "주원", "수아", "수하", "수안", "호정", "현준", "승민"];
    }

    generate() {
        const lastName = this.getRandomData(this.lastNames);
        const firstName = this.getRandomData(this.firstNames);

        return lastName + firstName;
    }
}

module.exports = NameGenerator;