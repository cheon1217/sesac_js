const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(':memory:'); // 실행할 때마다 DB 메모리에 새롭게 생성
// const db = new sqlite3.Database('user2.db');

db.serialize(() => {
    // 테이블 생성
    db.run('CREATE TABLE users (id INTEGER, name TEXT)');

    // 데이터 삽입
    db.run('INSERT INTO users(id, name) VALUES (1, "ALICE")');
    db.run('INSERT INTO users(id, name) VALUES (2, "Bob")');

    // prepared statement 로 데이터 삽입하기
    const statement = db.prepare('INSERT INTO users VALUES (?, ?)');
    statement.run(3, "User3");
    statement.run(4, "User4");
    statement.finalize();

    // 데이터 조회
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) throw err;
        console.log('조회된 데이터: ', rows);
        // console.log(`조회된 데이터: ${JSON.stringify(rows)}`);
    });

    db.each('SELECT id, name FROM users', (err, row) => {
        console.log('조회: ', row.id, row.name);
    })
});

// 끝날 때 db 종료
db.close((err) => {
    if (err) throw err;
    console.log('DB 연결 종료');
});
