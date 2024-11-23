const express = require("express");
const router = express.Router();
const { Store } = require("../database");

router.get("/", async (req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 20;
        const offset = (currentPage - 1) * perPage;

        const store = new Store();

        const storesQuery = `SELECT * FROM stores LIMIT ${perPage} OFFSET ${offset}`;
        const stores = await store.executeQuery(storesQuery);

        const countQuery = "SELECT COUNT(*) AS count FROM stores";
        const totalCount = (await store.executeQuery(countQuery)).count;

        const pagination = {
            items: stores,
            totalItems: totalCount,
            currentPage: parseInt(currentPage),
            totalPages: Math.ceil(totalCount / perPage),
        };

        res.render("stores", { pagination });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:store_id", async (req, res) => {
    try {
        const storeId = req.params.store_id;

        const store = new Store();
        const queryStore = `SELECT * FROM stores WHERE id = ?`;
        const store_data = await store.executeQuery(queryStore, [ storeId ]);

        if (!store_data) {
            return res.redirect("/stores");
        }

        const revMonth = req.query.rev_month;
        let query = 
            'SELECT substr(orders.orderAt, 1, 7) AS month, ' +
            'SUM(items.unitPrice) AS revenue, ' +
            'COUNT(*) AS count ' +
            'FROM order_items ' + 
            'JOIN items ON order_items.itemId = items.id ' +
            'JOIN orders ON order_items.orderId = orders.id ' +
            `WHERE orders.storeid = ? `;

        if (revMonth) {
            query += ` AND substr(orders.orderAt, 1, 7) = '${revMonth}'`;
        }

        query += `GROUP BY substr(orders.orderAt, 1, 7) ORDER BY substr(orders.orderAt, 1, 7)`;

        const revenues = await store.executeQuery(query, [ storeId ]);

        res.render("store_detail", {
            store: store_data[0],
            revenues: revenues,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;