// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db');
// const db = new sqlite3.Database(':memory:');

function dbRunQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

function dbAllQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

(async () => { // 비동기 익명함수로 만들어서 바로 당장 실행하기.
    try {
        await dbRunQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
        await dbRunQuery('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite']);
        const rows = await dbAllQuery('SELECT * FROM messages');
        rows.forEach(row => { console.log(row); });
    } catch (err) {
        console.error('에러: ', err);
    } finally {
        db.close();
    }
})();

console.log('가장 먼저 출력됨');