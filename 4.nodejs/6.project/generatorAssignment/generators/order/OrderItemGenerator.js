const Generator = require("../common/Generator");
const OrderItem = require("../variables/OrderItem");
const getUuids = require("./getUuidFromCsv");
const uuid = require("uuid");

class OrderItemGenerator extends Generator {
    constructor() {
        super();
    }

    // async 비동기로 선언되어 await 사용 가능 -> 작업이 완료될 때까지 다음 줄로 안넘어감
    async bringIn() {
        const { orderUuids, itemUuids } = await getUuids();
        this.orderUuids = orderUuids;
        this.itemUuids = itemUuids;
    }

    generate() {
        const orderUuid = this.getRandomData(this.orderUuids);
        const itemUuid = this.getRandomData(this.itemUuids);

        const orderItemId = uuid.v4();

        return new OrderItem(orderItemId, orderUuid, itemUuid);
    }

    generateOrderItems(count) {
        const orderitems = [];

        for (let i = 0; i < count; i++) {
            const orderitem = this.generate();
            orderitems.push(orderitem);
        }

        return orderitems;
    }
}

module.exports = OrderItemGenerator;