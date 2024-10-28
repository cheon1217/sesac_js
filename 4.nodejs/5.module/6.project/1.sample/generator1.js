const fs = require("fs");

const names = ["John", "Jane", "Michael", "Emily", "William", "Olivia"];
const lastname = ["박", "김", "이", "조", "최", "안"];
const firstname = ["가", "나", "다", "라", "마"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Philadelphia"];

function generateName() {
    return lastname[Math.floor(Math.random() * lastname.length)] + firstname[Math.floor(Math.random() * firstname.length)];
}

function generateGender() {
    return Math.random() < 0.5 ? "남성" : "여성";
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBirthdate() {
    // YYYY-MM-DD 포멧으로 반환하기
    const year = getRandomInRange(1960, 2010);
    const month = getRandomInRange(1, 12); // 1 ~ 12
    const day = getRandomInRange(1, 28); // 1 ~ 28
    
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function generateAddress() {
    // 앞에 1 ~ 100까지의 번지수를 붙인 주소를 생성하시오
    const street = getRandomInRange(1, 100);
    const city = cities[Math.floor(Math.random() * cities.length)]
    return `${street} ${city}`;
}

const userdb = [];
for (let i = 0; i < 10; i++) {
    userdb.push([generateName(), generateGender(), generateBirthdate(), generateAddress()]);
}

// db에 있는 내용
for (const user of userdb) {
    console.log(user);
}

// csv 형태로 파일에 저장
// user.csv
function writeDataToCSV(data, filePath) {
    const header = ["Name", "Gender", "Birthdate", "Address"];
    const rows = data.map(row => row.join(","));
    const csvContent = [header, ...rows].join("\n");

    fs.writeFileSync(filePath, csvContent, "utf8");
}

writeDataToCSV(userdb, "user.csv");