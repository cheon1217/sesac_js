class Order {
    constructor(id, order_at, store_id, user_id) {
        this.id = id;
        this.order_at = order_at;
        this.store_id = store_id;
        this.user_id =user_id;
    }

    toString() {
        return `Id: ${this.id}, OrderAt: ${this.order_at}, StoreId: ${this.store_id}, UserId: ${this.user_id}`;
    }
}

module.exports = Order;