const express = require("express");
const sqlite3 = require('better-sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = sqlite3(dbFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initializeDatabase() {
    const sql = fs.readFileSync('init_database.sql', 'utf8');
    const statements = sql.split(";");
    // console.log(statement);

    try {
        db.transaction(() => {
            // 실행을 원하는 쿼리문
            for (const statement of statements) {
                db.exec(statement);
            }
        })(); // 트랜젝션은 성공하면 자동 커밋, 실패하면 자동 롤백
        console.log('초기화 성공!!');
    } catch (err) {
        console.error('초기화 오류!!');
    }
}

initializeDatabase();

app.get("/users", (req, res) => {
    try {
        const users = db.prepare('SELECT * FROM users').all();
        res.json(users);
    } catch (err) {
        res.status(500).send('내부 오류');
    }
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            return res.status(404).send('사용자 없음');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('내부 오류');
    }
});

app.post("/users", (req, res) => {
    try {
        const { username, password } = req.body;
        const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
        res.send(`사용자 추가 완료: ${insert.lastInsertRowid}`);
    } catch (err) {
        res.status(500).send('내부 오류');
    }
});

app.put("/users/:id", (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password } = req.body;
        
        const query = db.prepare('UPDATE users SET username = ?, password = ? WHERE id = ?');
        query.run(username, password, userId);
        res.send("업데이트 성공");
    } catch (err) {
        res.status(500).send('내부 오류');
    }
});

app.delete("/users/:id", (req, res) => {
    try {
        const userId = req.params.id;
        const query = db.prepare('DELETE FROM users WHERE id = ?');
        query.run(userId);
        res.send("삭제 성공");
    } catch (err) {
        res.status(500).send('내부 오류');
    }
});

app.get("/:table", (req, res) => {
    const db_table = req.params.table;

    try {
        const query = db.prepare(`SELECT * FROM ${db_table}`);
        const rows = query.all();
        res.json(rows);
    } catch (err) {
        res.send(`테이블이 없다! : ${db_table}`);
    }
});

app.listen(port, () => {
    console.log('Server Ready');
});