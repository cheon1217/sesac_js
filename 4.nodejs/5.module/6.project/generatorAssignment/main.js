const ItemGenerator = require("./generators/Item/ItemGenerator");
const OrderGenerator = require("./generators/order/orderGenerator");
const StoreGenerator = require("./generators/store/StoreGenerator");
const UserGenerator = require("./generators/user/UserGenerator");
const { printConsole, saveToCVS } = require("./result/result");

async function main() {
    const dataType = "order";
    const count = 10000;
    const result = "csv";

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
            await orderGen.init();
            data = orderGen.generateOrders(count);
        default:
            console.log("Unsupported data type");
    }

    if (result === "csv") {
        saveToCVS(data, dataType);
    } else if (result === "console") {
        printConsole(data);
    } else {
        console.log("Unsupported output format.");
    }
   
}

main();