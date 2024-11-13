// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db');
// const db = new sqlite3.Database(':memory:');

(async () => { // 비동기 익명함수로 만들어서 바로 당장 실행하기.
    try {
        await new Promise((resolve, reject) => { // pending, resolved, reject
            db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    } catch (err) {
        console.error('에러: ', err);
    }
})();

(async () => {
    try {
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite'], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    } catch (err) {
        console.error('에러: ', err);
    }
})();

db.each('SELECT * FROM messages', (err, row) => {
    if (err) throw err;
    console.log(row);
});

db.close();
