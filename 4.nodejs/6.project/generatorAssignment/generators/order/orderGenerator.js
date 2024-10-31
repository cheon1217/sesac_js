const Generator = require("../common/Generator");
const Order = require("../variables/order");
const getUuids = require("./getUuidFromCsv");
const uuid = require("uuid");

class OrderGenerator extends Generator {
    constructor() {
        super();
        this.start = new Date(2024, 0, 1);  
        this.end = new Date(2024, 9, 31);
    }

    // async 비동기로 선언되어 await 사용 가능 -> 작업이 완료될 때까지 다음 줄로 안넘어감
    async bringIn() {
        const { userUuids, storeUuids } = await getUuids();
        this.userUuids = userUuids;
        this.storeUuids = storeUuids;
    }

    formatDate(date) {
        const year = date.getFullYear(); // 현재 년도
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 현재 몇 월인지 but 1부터 시작이므로 + 1 해줘야함
        const day = date.getDate().toString().padStart(2, "0"); 
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    generate() {
        // 임의의 주문 날짜와 시간 계산
        const timeDiff = this.end - this.start; // end와 start 간의 시간 차이를 밀리초 단위로 계산
        const randMilsec = Math.floor(Math.random() * timeDiff); // 0 ~ timeDifference 사이의 랜덤한 정수 값 생성
        const orderAt = new Date(this.start.getTime() + randMilsec); // start 시간에서 밀리초를 더한 시점의 Date 객체

        const orderAtFormatted = this.formatDate(orderAt); // orderAt 날짜를 formatDate 함수를 이용하여 정해놓은 형식으로 변환

        const userId = this.getRandomData(this.userUuids);
        const storeId = this.getRandomData(this.storeUuids);

        const orderId = uuid.v4();

        return new Order(orderId, orderAtFormatted, storeId, userId);
    }

    generateOrders(count) {
        const orders = [];

        for (let i = 0; i < count; i++) {
            const order = this.generate();
            orders.push(order);
        }

        return orders;
    }
}


module.exports = OrderGenerator;