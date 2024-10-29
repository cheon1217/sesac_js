const fs = require("fs");
const NameGenerator = require("./generators/NameGenerator");
const BirthdateGenerator = require("./generators/BirthdateGenerator");
const GenderGenerator = require("./generators/GenderGenerator");
const AddressGenerator = require("./generators/AddressGenerator");  

function generateData(count) {
    const nameGen = new NameGenerator();
    const birthGen = new BirthdateGenerator();
    const genderGen = new GenderGenerator();
    const addressGen = new AddressGenerator();

    const data = [];
    for (let i = 0; i < count; i++) {
        const name  = nameGen.generate();
        const birth = birthGen.generate();
        const gender = genderGen.generate();
        const address = addressGen.generate();
        
        data.push([name, birth, gender, address]);
    }

    return data;
}

function saveToCVS(data) {
    let csvContent = "Name,Birthdate,Gender,Address\n";
    data.forEach((row) => {
        csvContent += row.join(",") + "\n";
    });

    fs.writeFileSync("user.csv", csvContent);
    console.log("파일 쓰기 완료");
}

function printConsole(data) {
    data.forEach((row) => {
        console.log(`Name: ${row[0]}`);
        console.log(`Birthdate: ${row[1]}`);
        console.log(`Gender: ${row[2]}`);
        console.log(`Address: ${row[3]}\n`);
    });
}

function printStdout(data) {
    data.forEach((row) => {
        console.log(row.join(", "));
    });
}

function main() {
    const count = 10;
    const outputFormat = "csv";

    if (process.argv.length > 2) {
        count = parseInt(process.argv[2]);
    }

    if (process.argv.length > 3) {
        outputFormat = process.argv[3];
    }

    const generatedData = generateData(count);

    if (outputFormat === "console") {
        printConsole(generatedData);
    } else if (outputFormat === "csv") {
        saveToCVS(generatedData);
    } else {
        printStdout(generatedData);
    }
}

main();