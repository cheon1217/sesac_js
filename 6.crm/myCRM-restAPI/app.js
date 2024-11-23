const express = require("express");
const sqlite3 = require("better-sqlite3");
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = 3000;
const db = new sqlite3("user-sample.db");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/users/", (req, res) => {
    const { name, gender } = req.query;
    const queryParams = [];
    const countParams = [];
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    
    let query = `SELECT * FROM users WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) as count FROM users WHERE 1=1`;

    if (name) {
        query += ` AND name = ?`;
        countQuery += ` AND name = ?`;
        queryParams.push(name);
        countParams.push(name);
    }

    if (gender) {
        query += ` AND gender = ?`;
        countQuery += ` AND gender = ?`;
        queryParams.push(name);
        countParams.push(name);
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbQuery = db.prepare(query);
    const data = dbQuery.all(queryParams);

    const totalShow = pagination(page, countQuery, countParams);
    console.log("Total : ", totalShow);
    res.json({
        data: data,
        page: page,
        total: totalShow,
        name: name,
        gender: gender,
    });
});

app.get("/api/users/:page", (req, res) => {
    const { name, gender } = req.query;
    const queryParams = [];
    const countParams = [];
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    
    let query = `SELECT * FROM users WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) as count FROM users WHERE 1=1`;

    if (name) {
        query += ` AND name = ?`;
        countQuery += ` AND name = ?`;
        queryParams.push(name);
        countParams.push(name);
    }

    if (gender) {
        query += ` AND gender = ?`;
        countQuery += ` AND gender = ?`;
        queryParams.push(name);
        countParams.push(name);
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbQuery = db.prepare(query);
    const data = dbQuery.all(queryParams);

    const totalShow = pagination(page, countQuery, countParams);
    console.log("Total : ", totalShow);
    res.json({
        data: data,
        page: page,
        total: totalShow,
        name: name,
        gender: gender,
    });
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM users WHERE Id = ?";
    const dbQuery = db.prepare(query);
    const user = dbQuery.get(userId);

    const orderQuery = `
        SELECT orders.id AS orderId, orders.OrderAt, stores.id AS storeId, stores.Name
        FROM orders
        JOIN stores ON stores.id = orders.StoreId
        JOIN users ON users.id = orders.UserId
        WHERE users.id = ?;
    `;

    const dbOrder = db.prepare(orderQuery);
    const orders = dbOrder.all(userId);

    const visitQuery = `
        SELECT (stores.type ||' '|| stores.name) AS name, COUNT(*) AS visitCount
        FROM users
        JOIN orders ON orders.UserId = user.id
        JOIN stores ON stores.id = orders.StoreId
        WHERE users.id = ?
        GROUP BY stores.id
        ORDER BY visitCount DESC
        LIMIT 5;    
    `;
    const dbVisit = db.prepare(visitQuery);
    const topVisit = dbVisit.all(userId);
    
    res.json({
        user: user,
        orders: orders,
        topVisit: topVisit,
    })
});

app.get("api/orderItems/:page", (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const queryParams = [];
    const countParams = [];

    let query = `SELECT * FROM orderitems WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM orderitems WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbOrderItems = db.prepare(query);
    const data = dbOrderItems.all(queryParams);
    
    const totalShow = pagination(page, countQuery, countParams);
    console.log(totalShow);
    res.json({
        data: data,
        page: page,
        totalShow: totalShow,
    });
});

app.get("/api/orders/:page", (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const queryParams = [];
    const countParams = [];

    let query = `SELECT * FROM orders WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM orders WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbOrders = db.prepare(query);
    const data = dbOrders.all(queryParams);
    
    const totalShow = pagination(page, countQuery, countParams);
    console.log(totalShow);
    res.json({
        data: data,
        page: page,
        totalShow: totalShow,
    });
});

app.get("/api/items/:page", (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const queryParams = [];
    const countParams = [];

    let query = `SELECT * FROM items WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM items WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbItems = db.prepare(query);
    const data = dbItems.all(queryParams);
    
    const totalShow = pagination(page, countQuery, countParams);
    console.log(totalShow);
    res.json({
        data: data,
        page: page,
        totalShow: totalShow,
    });
});

app.get("/api/stores/:page", (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    const queryParams = [];
    const countParams = [];

    let query = `SELECT * FROM stores WHERE 1=1`;
    let countQuery = `SELECT count(*) as count FROM stores WHERE 1=1`;

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(itemsPerPage);
    queryParams.push(offset);

    const dbStores = db.prepare(query);
    const data = dbStores.all(queryParams);
    
    const totalShow = pagination(page, countQuery, countParams);
    console.log(totalShow);
    res.json({
        data: data,
        page: page,
        totalShow: totalShow,
    });
});

app.get("/api/stores/:id", (req, res) => {
    const storeId = req.params.id;
    const month = req.query.rev_month;

    const query = "SELECT * FROM stores WHERE Id = ?";
    const dbStores = db.prepare(query);
    const store = dbStores.get(storeId);

    const freCusQuery = `
        SELECT orders.userId, users.name, COUNT(*) AS frequency
        FROM stores
        JOIN orders ON stores.id = orders.storeId
        JOIN users ON orders.UserId = users.id
        WHERE stores.id = ?
        HAVING COUNT(*) > 1
        ORDER BY COUNT(*) DESC
        LIMIT 10;
    `;

    const dbFreCus = db.prepare(freCusQuery);
    const freCus = dbFreCus.all(storeId);

    
});

function pagination(page, countQuery, params) {
    const totalData = db.prepare(countQuery).get(params);
    const total = Math.ceil(parseInt(totalData.count) / 20);
    const pageRange = 3;
    const totalArr = [];
    let lastElement;
    
    for (let i = 1; i <= total; i++) {
        if (i <= 3) {
            totalArr.push(i);
            lastElement = i;
        } else if (i >= total - 2) {
            totalArr.push(i);
            lastElement = i;
        } else if (i >= page - pageRange && i <= page + pageRange) {
            totalArr.push(i);
            lastElement = i;
        } else {
            if (lastElement !== "...") {
                totalArr.push("...");
                lastElement = "...";
            }
        }
    }
    return totalArr;
}

app.get("/users", (req, res) => {
    res.sendFile(path.resolve("public/users.html"));
});

app.get("/users/:id", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.get("/users/", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.get("/users/:page", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.get("/stores/", (req, res) => {
    res.sendFile(path.resolve("public/stores.html"));
});

app.get("/stores/:page", (req, res) => {
    res.sendFile(path.resolve("public/stores.html"));
});

app.get("/store_detail/:id", (req, res) => {
    res.sendFile(path.resolve("public/store_detail.html"));
});

app.get("/items/", (req, res) => {
    res.sendFile(path.resolve("public/items.html"));
});

app.get("/items/:page", (req, res) => {
    res.sendFile(path.resolve("public/items.html"));
});

app.get("/item_detail/:id", (req, res) => {
    res.sendFile(path.resolve("public/item_detail.html"));
});

app.get("/orders/", (req, res) => {
    res.sendFile(path.resolve("public/orders.html"));
});

app.get("/orders/:page", (req, res) => {
    res.sendFile(path.resolve("public/orders.html"));
});

app.get("/order_detail/:id", (req, res) => {
    res.sendFile(path.resolve("public/order_detail.html"));
});

app.get("/orderItems/", (req, res) => {
    res.sendFile(path.resolve("public/orderItems.html"));
});

app.get("/orderItems/:page", (req, res) => {
    res.sendFile(path.resolve("public/orderItems.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/users.html"));
});

app.listen(port, () => {
    console.log("Server Ready");
});