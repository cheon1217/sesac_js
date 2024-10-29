const Generator = require("../common/Generator");
const OrderItem = require("../variables/OrderItem");
const getUuids = require("./getUuidFromCsv");
const uuid = require("uuid");

class OrderItemGenerator extends Generator {
    constructor() {
        super();
    }

    async init() {
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