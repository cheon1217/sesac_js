-- init_database.sql
-- sqlite3 users.db < init_database.sql

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 기본값은 현재 시간
    role TEXT DEFAULT 'user'
);

-- 초기 사용자 데이터 삽입
INSERT INTO users (username, password, email, role) VALUES
    ('admin', 'sfhk#fa2@', 'ceo@company.com', 'admin'),
    ('user1', 'password1', 'user1@naver.com', 'user1');
    

INSERT INTO users (username, password, email) VALUES
    ('user2', 'password2', 'user2@kakao.com'),
    ('user3', 'password3', 'user3@gmail.com');