const Generator = require("../common/Generator");
const Order = require("../variables/order");
const getUuids = require("./getUuidFromCsv");
const uuid = require("uuid");

class OrderGenerator extends Generator {
    constructor() {
        super();
        this.start = new Date(2023, 0, 1);  
        this.end = new Date(2023, 11, 31);
    }

    async init() {
        const { userUuids, storeUuids } = await getUuids();
        this.userUuids = userUuids;
        this.storeUuids = storeUuids;
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    generate() {
        const timeDifference = this.end - this.start;
        const randomMilsec = Math.floor(Math.random() * timeDifference);
        const orderAt = new Date(this.start.getTime() + randomMilsec);

        const orderAtFormatted = this.formatDate(orderAt);

        const userId = this.getRandomData(this.userUuids);
        const storeId = this.getRandomData(this.storeUuids);

        const orderId = uuid.v4();
        const order = new Order(orderId, orderAtFormatted, storeId, userId)

        return order;
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