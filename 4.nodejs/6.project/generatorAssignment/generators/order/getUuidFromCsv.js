const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

// 현재 디렉토리
const currentDir = path.dirname(path.resolve(__filename));
// console.log(currentDir);

// CSV 파일 디렉토리
const csvDirectory = path.join(currentDir, "../../");
// console.log(csvDirectory);

function getUuidFromCSV(csvDirectory, csvFilename) {
    const uuids = [];
    const csvPath = path.join(csvDirectory, csvFilename);

    if (!fs.existsSync(csvPath)) {
        return uuids;
    }

    const fileStream = fs.createReadStream(csvPath).pipe(csv());

    return new Promise((resolve, reject) => {
        fileStream
            .on("data", (row) => {
                uuids.push(row.id);
            })
            .on("end", () => {
                resolve(uuids);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}

const getUuids = async () => {
    const userUuids = await getUuidFromCSV(csvDirectory, "user.csv");
    const storeUuids = await getUuidFromCSV(csvDirectory, "store.csv");
    const itemUuids = await getUuidFromCSV(csvDirectory, "item.csv");
    const orderUuids = await getUuidFromCSV(csvDirectory, "order.csv");

    // console.log(userUuids);
    // console.log(storeUuids);
    // console.log(itemUuids);

    return {
        userUuids,
        storeUuids,
        itemUuids,
        orderUuids,
    };
};

// getUuids();

module.exports = getUuids;