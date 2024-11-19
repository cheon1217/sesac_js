const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = 3000;
const db = new sqlite3.Database("user-sample.db");

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/users", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const searchName = req.query.name || "";
    const itemsPerPage = 20;
    const offset = (page - 1) * itemsPerPage;
    
    const countQuery = "SELECT COUNT(*) AS count FROM users WHERE Name LIKE ?";
    db.get(countQuery, [`%${searchName}%`], (err, row) => {
        if (err) {
            console.error("Error fetching total user count:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        const dataQuery = "SELECT * FROM users WHERE Name LIKE ? LIMIT ? OFFSET ?";
        db.all(dataQuery, [`%${searchName}%`, itemsPerPage, offset], (err, rows) => {
            if (err) {
                console.error("Error fetching user:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            
            res.json({
                data: rows,
                totalPages,
                currentPage: page,
                searchName,
            });
        });
    });
});

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM users WHERE Id = ?";
    db.get(query, [userId], (err, rows) => {
        if (err) {
            console.error("Error fetching user:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!rows) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(rows);
    });
});

app.get("/api/stores", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const offset = (page - 1) * perPage;

    const countQuery = "SELECT COUNT(*) AS count FROM stores";
    db.get(countQuery, (err, row) => {
        if (err) {
            console.error("Error fetching total store count:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / perPage);

        const dataQuery = "SELECT * FROM stores LIMIT ? OFFSET ?";
        db.all(dataQuery, [perPage, offset], (err, rows) => {
            if (err) {
                console.error("Error fetching store:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            
            res.json({
                data: rows,
                totalPages,
                currentPage: page,
            });
        });
    });
});

app.get("/api/stores/:id", (req, res) => {
    const storeId = req.params.id;

    const query = "SELECT * FROM stores WHERE Id = ?";
    db.get(query, [storeId], (err, rows) => {
        if (err) {
            console.error("Error fetching store:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!rows) {
            return res.status(404).json({ message: "Store not found" });
        }
        res.json(rows);
    });
});

app.get("/api/items", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const offset = (page - 1) * perPage;

    const countQuery = "SELECT COUNT(*) AS count FROM items";
    db.get(countQuery, (err, row) => {
        if (err) {
            console.error("Error fetching total item count:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / perPage);

        const dataQuery = "SELECT * FROM items LIMIT ? OFFSET ?";
        db.all(dataQuery, [perPage, offset], (err, rows) => {
            if (err) {
                console.error("Error fetching item:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            
            res.json({
                data: rows,
                totalPages,
                currentPage: page,
            });
        });
    });
});

app.get("/api/items/:id", (req, res) => {
    const itemId = req.params.id;

    const query = "SELECT * FROM items WHERE Id = ?";
    db.get(query, [itemId], (err, rows) => {
        if (err) {
            console.error("Error fetching item:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!rows) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(rows);
    });
});

app.get("/api/orders", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const offset = (page - 1) * perPage;
    
    const countQuery = "SELECT COUNT(*) AS count FROM orders";
    db.get(countQuery, (err, row) => {
        if (err) {
            console.error("Error fetching total order count:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const totalItems = row.count;
        const totalPages = Math.ceil(totalItems / perPage);

        const dataQuery = "SELECT * FROM orders LIMIT ? OFFSET ?";
        db.all(dataQuery, [perPage, offset], (err, rows) => {
            if (err) {
                console.error("Error fetching order:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
            
            res.json({
                data: rows,
                totalPages,
                currentPage: page,
            });
        });
    });
});

app.get("/api/orders/:id", (req, res) => {
    const orderId = req.params.id;

    const query = "SELECT * FROM orders WHERE Id = ?";
    db.get(query, [orderId], (err, rows) => {
        if (err) {
            console.error("Error fetching order:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!rows) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(rows);
    });
});

app.get("/users", (req, res) => {
    res.sendFile(path.resolve("public/users.html"));
});

app.get("/users/:id", (req, res) => {
    res.sendFile(path.resolve("public/user_detail.html"));
});

app.get("/stores", (req, res) => {
    res.sendFile(path.resolve("public/stores.html"));
});

app.get("/stores/:id", (req, res) => {
    res.sendFile(path.resolve("public/store_detail.html"));
});

app.get("/items", (req, res) => {
    res.sendFile(path.resolve("public/items.html"));
});

app.get("/items/:id", (req, res) => {
    res.sendFile(path.resolve("public/item_detail.html"));
});

app.get("/orders", (req, res) => {
    res.sendFile(path.resolve("public/orders.html"));
});

app.get("/orders/:id", (req, res) => {
    res.sendFile(path.resolve("public/order_detail.html"));
})

app.get("/", (req, res) => {
    res.redirect("/users");
});

app.listen(port, () => {
    console.log("Server Ready");
});