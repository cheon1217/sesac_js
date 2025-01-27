const fs = require("fs");

function saveToCVS(data, datatype) {
    let filename;

    switch (datatype) {
        case "user":
            filename = "user.csv";
            break;
        case "store":
            filename = "store.csv";
            break;
        case "item":
            filename = "item.csv";
            break;
        case "order":
            filename = "order.csv";
            break;
        case "orderitem":
            filename = "orderitem.csv";
            break;
        default:
            console.log("CSV가 아닙니다.");
    }

    const header = Object.keys(data[0]);
    const rows = data.map(item => Object.values(item));

    const csvContent = [header.join(", "), ...rows.map(row => row.join(", "))].join("\n");

    fs.writeFileSync(filename, csvContent, "utf8");
    console.log(`Data saved to ${filename}`);
}

function printConsole(data) {
    data.forEach(item => {
        if (item instanceof Object) {
            // key, value 형태의 배열로 변환 entries() 함수 사용
            Object.entries(item).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });
            console.log();
        } else {
            console.log(item);
        }
    });
}

module.exports = {
    saveToCVS,
    printConsole
};