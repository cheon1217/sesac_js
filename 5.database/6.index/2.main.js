const {connectToDatabase, queryName, queryAll} = require("./queryTime");

const db = connectToDatabase();

const searchName = "정다사";

// queryName(db, searchName);

// db.close();

const searchDetail = {
    // name: "정다사",
    department: "HR",
    salary: 60000
};

queryAll(db, searchDetail);