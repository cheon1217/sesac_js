const { dbRunQuery, dbAllQuery } = require('./5.intro_library');

async function runDatabaseOperations() { // 비동기 익명함수로 만들어서 바로 당장 실행하기.
    try {
        await dbRunQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
        await dbRunQuery('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite']);
        const rows = await dbAllQuery('SELECT * FROM messages');
        rows.forEach(row => { console.log(row); });
    } catch (err) {
        console.error('에러: ', err);
    } 
};

runDatabaseOperations();