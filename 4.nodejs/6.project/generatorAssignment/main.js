const ItemGenerator = require("./generators/Item/ItemGenerator");
const OrderGenerator = require("./generators/order/orderGenerator");
const OrderItemGenerator = require("./generators/order/OrderItemGenerator");
const StoreGenerator = require("./generators/store/StoreGenerator");
const UserGenerator = require("./generators/user/UserGenerator");
const { printConsole, saveToCVS } = require("./result/result");

async function main() {
    const dataType = "order";
    const count = 20;
    const result = "console";

    let data;

    switch (dataType) {
        case "user":
            const userGen = new UserGenerator();
            data = userGen.generateUsers(count);
            break;
        case "store":
            const storeGen = new StoreGenerator();
            data = storeGen.generateStores(count);
            break;
        case "item":
            const itemGen = new ItemGenerator();
            data = itemGen.generateItems(count);
            break;
        case "order":
            const orderGen = new OrderGenerator();
            await orderGen.bringIn();
            data = orderGen.generateOrders(count);
            break;
        case "orderitem":
            const orderitemGen = new OrderItemGenerator();
            await orderitemGen.bringIn();
            data = orderitemGen.generateOrderItems(count);
            break;
        default:
            console.log("잘못된 데이터타입");
    }

    if (result === "csv") {
        saveToCVS(data, dataType);
    } else if (result === "console") {
        printConsole(data);
    } else {
        console.log("없는 항목입니다");
    }
   
}

main();