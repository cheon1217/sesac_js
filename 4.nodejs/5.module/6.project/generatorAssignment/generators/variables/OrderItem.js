class OrderItem {
    constructor(id, order_id, item_id) {
        this.id = id;
        this.order_id = order_id;
        this.item_id = item_id;
    }

    toString() {
        return `Id: ${this.id}, OrderId: ${this.order_id}, ItemId: ${this.item_id}`;
    }
}

module.exports = OrderItem