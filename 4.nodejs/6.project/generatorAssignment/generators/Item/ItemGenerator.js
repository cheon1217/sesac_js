const Item = require("../variables/Item");
const Generator = require("../common/Generator");
const uuid = require("uuid");

class ItemGenerator extends Generator {
    constructor() {
        super();
        this.itemTypes = {  // 아이템 타입 배열 안에 배열? 느낌 2중 배열?
            "Coffee": {
                "Americano": 2000,
                "Latte": 3000,
                "CaramelMacchiato": 4500,
                "Cappucchino": 4500,
                "Espresso": 1500,
                "ColdBrew": 3500
            }, 
            "Juice": {
                "Lemon": 2500,
                "GrapeFruit": 3000,
                "PassionFruit": 3500,
                "Apple": 2500,
                "Orange": 2500,
                "Pineapple": 3000
            }, 
            "Cake": {
                "Chocolate": 6000,
                "Strawberry": 6500,
                "Carrot": 7000,
                "Red Velvet": 6500,
                "Apple Mango": 7000
            }
        };
    }

    generate(itemType) { 
        // 전달할 것이 없다면 임의로 타입 선택
        if (!itemType) {
            itemType = this.getRandomData(Object.keys(this.itemTypes));
        }

        const itemId = uuid.v4();
        const itemSubtype = this.getRandomData(Object.keys(this.itemTypes[itemType])); 
        const unitPrice = this.itemTypes[itemType][itemSubtype];
        const itemName = `${itemSubtype} ${itemType}`;

        return new Item(itemId, itemType, itemName, unitPrice);
    }

    generateItems(count) {
        const items = [];
        for (let i = 0; i < count; i++) {
            const item = this.generate();
            items.push(item);
        }

        return items;
    }

    generateCoffee() {
        return this.generate("Coffee");
    }

    generateJuice() {
        return this.generate("Juice");
    }

    generateCake() {
        return this.generate("Cake");
    }
}

// const itemGenerator = new ItemGenerator();
// const randomItem = itemGenerator.generate(); // 임의의 타입의 아이템 생성
// const coffeeItem = itemGenerator.generateCoffee(); // 커피 아이템 생성
// const items = itemGenerator.generateItems(5); // 5개의 임의의 아이템 생성
// console.log(randomItem);
// console.log(coffeeItem);
// console.log(items);

module.exports = ItemGenerator;