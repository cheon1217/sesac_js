const { v4: uuidv4 } = require("uuid");

for (let i = 0; i < 100; i++) {
    console.log(uuidv4());
}