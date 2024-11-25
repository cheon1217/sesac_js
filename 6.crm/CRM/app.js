const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const morgan = require("morgan");
const path = require("path");

const db = new sqlite3.Database("user-sample.db");
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(myLogger);

function myLogger(req, res, next) {
    console.log(`LOG: ${req.method} ${req.url}`);
    next();
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "users.html"));
});

app.get("/orders", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "orders.html"));
});

app.get("/orderItems", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "orderItems.html"));
});

app.get("/items", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "items.html"));
});

app.get("/stores", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "stores.html"));
});

app.get("/api/users", (req, res) => {
    const { name, gender, page = 1 } = req.query;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    let countSql = ``;
    const queryParams = [];

    if (name) {
        countSql = `SELECT COUNT(*) AS count FROM users WHERE name LIKE ?`;
        queryParams.push(`%${name}%`);
        if (gender) {
            countSql += ` AND gender = ?`;
            queryParams.push(gender);
        }
    } else {
        countSql = `SELECT COUNT(*) AS count FROM users`;
        if (gender) {
            countSql += ` WHERE gender = ?`;
            queryParams.push(gender);
        }
    }

    db.get(countSql, queryParams, (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        } else if (row.count === 0) {
            return res.status(404).json({ message: "사용자 정보가 없습니다" });
        } else {
            const totalPage = Math.ceil(row.count / itemsPerPage);
            let selectQuery = ``;
            const pageParams = [itemsPerPage, offset];

            if (name) {
                selectQuery = `SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?`;
                if (gender) {
                    selectQuery = `SELECT * FROM users WHERE name LIKE ? AND gender = ? LIMIT ? OFFSET ?`;
                    pageParams.push(`%${name}%`, gender);
                } else {
                    pageParams.push(`%${name}%`);
                }
            } else {
                selectQuery = `SELECT * FROM users LIMIT ? OFFSET ?`;
                if (gender) {
                    selectQuery = `SELECT * FROM users WHERE gender = ? LIMIT ? OFFSET ?`;
                    pageParams.push(gender);
                }
            }

            db.all(selectQuery, pageParams, (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500);
                } else {
                    res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
                }
            });
        }
    });
});

app.get("/user_detail/:userId", (req, res) => {
    const userId = req.params.userId;
    res.sendFile(path.join(__dirname, "public", "user_detail.html"));
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const selectQry = `SELECT Name AS name, Gender AS gender, Age AS age, Birthdate AS birthday, Address AS address FROM users WHERE Id = ?`;

    db.get(selectQry, userId, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Server Error"});
        } else {
            res.status(200).json(row);
        }
    });
});

app.get("/users/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "user_detail.html"));
});

app.get("/api/users/:id/orderInfo", (req, res) => {
    const userId = req.params.id;
    const selectQry = `
        SELECT orders.Id AS order_id, orders.OrderAt AS order_time, orders.StoreId AS purchased_store
        FROM orders
        JOIN users ON orders.UserId = users.Id
        WHERE orders.UserId = ?
        ORDER BY OrderAt
    `;

    db.all(selectQry, userId, (err, rows) => {
        console.log("rows: ", rows);
        res.status(200).json(rows);
    });
});

app.get("/api/users/stores/:userId", (req, res) => {
    const userId = req.params.userId;
    const selectQry = `
        SELECT stores.Name AS name, COUNT(*) AS count
        FROM users
        JOIN orders ON users.Id = orders.UserId
        JOIN stores ON orders.StoreId = stores.Id
        WHERE users.Id = ?
        GROUP BY stores.Id
        ORDER BY count DESC
        LIMIT 5
    `;

    db.all(selectQry, userId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/users/items/:userId", (req, res) => {
    const userId = req.params.userId;
    const selectQry = `
        SELECT items.Name AS name, COUNT(*) AS count
        FROM users
        JOIN orders ON users.Id = orders.UserId
        JOIN order_items ON orders.Id = order_items.OrderId
        JOIN items ON order_items.ItemId = items.Id
        WHERE users.Id = ?
        GROUP BY items.Id
        ORDER BY count DESC
        LIMIT 5 
    `;

    db.all(selectQry, userId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/orders", (req, res) => {
    const { page = 1 } = req.query;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const countQuery = `SELECT COUNT(*) AS count FROM orders`;

    db.get(countQuery, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Server Error"});
        } else {
            const totalPage = Math.ceil(row.count / itemsPerPage);

            const selectQuery = `
                SELECT Id AS id, OrderAt AS order_at, StoreId AS store_id, UserId AS user_id
                FROM orders
                LIMIT ?
                OFFSET ?
            `;

            db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error"});
                } else {
                    res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
                }
            });
        }
    });
});

app.get("/orders/:orderId", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "order_detail.html"));
});

app.get("/api/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const selectQry = `
        SELECT orders.Id AS id, orders.OrderAt AS order_at, orders.StoreId AS store_id, orders.UserId AS user_id
        FROM orders
        WHERE orders.Id = ?
    `;

    db.get(selectQry, orderId, (err, row) => {
        res.status(200).json(row);
    });
});

app.get("/api/orderItems", (req, res) => {
    const { page = 1 } = req.query;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const countQuery = `SELECT COUNT(*) AS count FROM order_items`;

    db.get(countQuery, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Server Error"});
        } else {
            const totalPage = Math.ceil(row.count / itemsPerPage);

            const selectQuery = `
                SELECT Id AS id, OrderId AS order_id, ItemId AS item_id
                FROM order_items
                LIMIT ?
                OFFSET ?
            `;

            db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error"});
                } else {
                    res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
                }
            });
        }
    });
});

app.get("/orderItems/:orderId", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "orderItem_detail.html"));
});

app.get("/api/orderItems/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const selectQry = `
        SELECT order_items.Id AS id, order_items.OrderId AS order_id, order_items.ItemId AS item_id, items.Name AS item_name
        FROM order_items
        JOIN items ON order_items.ItemId = items.Id
        WHERE order_items.OrderId = ?
    `;

    db.all(selectQry, orderId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/items", (req, res) => {
    const { page = 1 } = req.query;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const countQuery = `SELECT COUNT(*) AS count FROM items`;

    db.get(countQuery, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Server Error"});
        } else {
            const totalPage = Math.ceil(row.count / itemsPerPage);

            const selectQuery = `
                SELECT Id AS id, Type AS type, Name AS name, UnitPrice AS unit_price
                FROM items
                LIMIT ?
                OFFSET ?
            `;

            db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error"});
                } else {
                    res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
                }
            });
        }
    });
});

app.get("/items/:itemId", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "item_detail.html"));
});

app.get("/api/items/:itemId", (req, res) => {
    const itemId= req.params.itemId;
    const selectQry = `
        SELECT Name AS name, UnitPrice AS unit_price
        FROM items
        WHERE Id = ?
    `;

    db.get(selectQry, itemId, (err, row) => {
        res.status(200).json(row);
    });
});

app.get("/api/items/month/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const selectQry = `
        SELECT STRFTIME('%Y-%m', orders.OrderAt) AS Month, SUM(items.UnitPrice) AS 'TOTAL Revenue', COUNT(*) AS 'Item Count'
        FROM items
        JOIN order_items ON items.Id = order_items.ItemId
        JOIN orders ON order_items.OrderId = orders.Id
        WHERE items.Id = ?
        GROUP BY STRFTIME('%Y-%m', orders.OrderAt)
        ORDER BY Month
    `;

    db.all(selectQry, itemId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/stores", (req, res) => {
    const { page = 1 } = req.query;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;

    const countQuery = `SELECT COUNT(*) AS count FROM stores`;

    db.get(countQuery, (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Server Error"});
        } else {
            const totalPage = Math.ceil(row.count / itemsPerPage);

            const selectQuery = `
                SELECT Id AS id, Type AS type, Name AS name, Address AS address
                FROM stores
                LIMIT ?
                OFFSET ?
            `;

            db.all(selectQuery, [itemsPerPage, offset], (err, rows) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error"});
                } else {
                    res.json({ result: rows, currentPage: page, totalPage: totalPage, status: "ok" });
                }
            });
        }
    });
});

app.get("/stores/:storeId", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "store_detail.html"));
});

app.get("/api/stores/:storeId", (req, res) => {
    const storeId = req.params.storeId;
    const selectQry = `
        SELECT Name AS name, Type AS type, Address AS address
        FROM stores
        WHERE Id = ?
    `;

    db.get(selectQry, storeId, (err, row) => {
        res.status(200).json(row);
    });
});

app.get("/api/stores/month/:storeId", (req, res) => {
    const storeId = req.params.storeId;
    const selectQry = `
        SELECT STRFTIME('%Y-%m', orders.OrderAt) AS month, SUM(items.UnitPrice) AS revenue, COUNT(*) AS count
        FROM stores
        JOIN orders ON stores.Id = orders.StoreId
        JOIN order_items ON orders.Id = order_items.OrderId
        JOIN items ON order_items.ItemId = items.Id
        WHERE stores.Id = ?
        GROUP BY STRFTIME('%Y-%m', orders.OrderAt)
        ORDER BY month
    `;

    db.all(selectQry, storeId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/stores/month/detail/:storeId", (req, res) => {
    const storeId = req.params.storeId;
    const date = req.query.date + "%";
    const selectQry = `
        SELECT STRFTIME('%Y-%m-%d', orders.OrderAt) AS month, SUM(items.UnitPrice) AS revenue, COUNT(*) AS count
        FROM stores
        JOIN orders ON stores.Id = orders.StoreId
        JOIN order_items ON orders.Id = order_items.OrderId
        JOIN items ON order_items.Item.Id = items.Id
        WHERE stores.Id = ? AND orders.OrderAt LIKE ?
        GROUP BY STRFTIME('%Y-%m-%d', orders.OrderAt)
        ORDER BY orders.OrderAt
    `;

    db.all(selectQry, storeId, date, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/stores/users/:storeId", (req, res) => {
    const storeId = req.params.storeId;
    const selectQry = `
        SELECT users.Id AS user_id, users.Name AS name, COUNT(*) AS frequency
        FROM stores
        JOIN orders ON stores.Id = orders.StoreId
        JOIN users ON orders.UserId = users.Id
        WHERE stores.Id = ?
        GROUP BY orders.UserId
        ORDER BY frequency DESC, users.Id
        LIMIT 10
    `;

    db.all(selectQry, storeId, (err, rows) => {
        res.status(200).json(rows);
    });
});

app.get("/api/stores/users/detail/:storeId", (req, res) => {
    const storeId = req.params.storeId;
    const date = req.query.date + "%";
    const selectQry = `
        SELECT users.Id AS user_id, users.Name AS name, COUNT(*) AS frequency
        FROM stores
        JOIN orders ON stores.Id = orders.StoreId
        JOIN users ON orders.UserId = users.Id
        WHERE stores.Id = ? AND orders.OrderAt LIKE ?
        GROUP BY users.Id
        ORDER BY frequency DESC, users.Id
        LIMIT 10
    `;

    db.all(selectQry, storeId, date, (err, rows) => {
        res.status(200).json(rows);
    });
});


app.listen(port, () => {
    console.log("Server Ready");
});