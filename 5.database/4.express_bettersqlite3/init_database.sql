-- 이곳에 DB 초기화 코드 등등 추가

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);

-- 초기 사용자 데이터 삽입
INSERT INTO users (id, username, password) VALUES
    (1, 'user1', 'password1'),
    (2, 'user2', 'password2');

-- 상품 테이블 생성
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER
);

-- 초기 상품 데이터 삽입
INSERT INTO products (id, name, price) VALUES
    (1, '상품1', 2000),
    (2, '상품2', 3000),
    (3, '상품3', 1500);

-- 도서 테이블 생성
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    genre TEXT
);

-- 초기 도서 데이터 삽입
INSERT INTO books (id, title, author, genre) VALUES
    (1, 'Book1', '저자1', 'Fiction'),
    (2, 'Book2', '저자2', 'Non-Fiction'),
    (3, 'Book3', '저자3', 'Mystery');