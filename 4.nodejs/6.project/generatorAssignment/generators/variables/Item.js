class Item {
    constructor(id, type, name, unitPrice) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.unitPrice = unitPrice;
    }

    toString() {
        return `Id: ${this.id}, Type: ${this.type}, Name: ${this.name}, unitPrice: ${this.unitPrice}`;
    }
}

module.exports = Item;