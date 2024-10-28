const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class NameGenerator {
    constructor(file_path) {
        this.names = this.load_data(file_path);
        this.lastname = ["박", "김", "이", "조", "최", "안"];
        this.firstname = ["가", "나", "다", "라", "마"];
    }

    load_data(file_path) {
        const data = fs.readFileSync(file_path, "utf8").split("\r\n");
        return data;
    }

    generateName() {
        // return this.lastname[Math.floor(Math.random() * this.lastname.length)] + this.firstname[Math.floor(Math.random() * this.firstname.length)];
        return this.names[Math.floor(Math.random() * this.names.length)];
    }
}

class GenderGenerator {
    generateGender() {
        return Math.random() < 0.5 ? "남성" : "여성";
    }
}

class MyUtility {
    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class BirthdateGenerator {
    generateBirthdate() {
        // YYYY-MM-DD 포멧으로 반환하기
        const year = MyUtility.getRandomInRange(1960, 2010);
        const month = MyUtility.getRandomInRange(1, 12); // 1 ~ 12
        const day = MyUtility.getRandomInRange(1, 28); // 1 ~ 28
        
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
}

class AddressGenerator {
    constructor(file_path) {
        this.cities = this.load_data(file_path);
    }

    load_data(file_path) {
        const data = fs.readFileSync(file_path, "utf8").split("\r\n");
        return data;
    }

    generateAddress() {
        // 앞에 1 ~ 100까지의 번지수를 붙인 주소를 생성하시오
        const street = MyUtility.getRandomInRange(1, 100);
        const city = this.cities[Math.floor(Math.random() * this.cities.length)]
        return `${street} ${city}`;
    }
}

class DataGenerator {
    constructor(name_file, city_file) {
        this.nameGen = new NameGenerator(name_file);
        this.bitrthGen = new BirthdateGenerator();
        this.genderGen = new GenderGenerator();
        this.addressGen = new AddressGenerator(city_file);
    }

    generateData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const name = this.nameGen.generateName();
            const birthdate = this.bitrthGen.generateBirthdate();
            const gender = this.genderGen.generateGender();
            const address = this.addressGen.generateAddress();
            data.push([name, birthdate, gender, address]);
        }
        return data;
    }
}

class DataExporter extends DataGenerator {
    exportCSV(count, filename) {
        const data = this.generateData(count);
        const csv =  createCsvWriter({
            path: filename,
            header: [
                { id: "Name", title: "Name" },
                { id: "Birthdate", title: "Birthdate" },
                { id: "Gender", title: "Gender" },
                { id: "Address", title: "Address" }
            ]
        });

        const records = data.map(([name, birthdate, gender, address]) => ({
            Name: name,
            Birthdate: birthdate,
            Gender: gender,
            Address: address
        }));

        csv.writeRecords(records)
            .then(() => console.log(`CSV file ${filename} has been written successfully`))
            .catch((err) => console.log(err));
    }
}

const nameFile = "names.txt";
const cityFile = "cities.txt";

const exporter = new DataExporter(nameFile, cityFile);

exporter.exportCSV(100, "user.csv");