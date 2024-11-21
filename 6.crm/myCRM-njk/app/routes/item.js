const express = require("express");
const router = express.Router();
const { Item, OrderItem } = require("../database");

router.get("/", async (req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 20;
        const offset = (currentPage - 1) * perPage;

        const item = new Item();

        const itemsQuery = `SELECT * FROM items LIMIT ${perPage} OFFSET ${offset}`;
        const items = await item.executeQuery(itemsQuery);

        const countQuery = "SELECT COUNT(*) AS count FROM items";
        const totalCount = (await item.executeQuery(countQuery)).count;

        const pagination = {
            items: items,
            totalItems: totalCount,
            currentPage: parseInt(currentPage),
            totalPages: Math.ceil(totalCount / perPage),
        };

        res.render("items", { pagination });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:item_id", async (req, res) => {
    try {
        const itemId = req.params.item_id;
        const item = await new Item().executeQuery(`SELECT * FROM items WHERE id = ?`, [itemId]);

        const revenues = await new OrderItem().executeQuery(`
            SELECT strftime('%Y-%m', orders.orderat) as month,
                   SUM(items.unitprice) as total_revenue,
                   COUNT(order_items.itemid) as item_count
            FROM order_items
            JOIN items ON order_items.itemid = items.id
            JOIN orders ON order_items.orderid = orders.id
            WHERE items.id = ?
            GROUP BY month
            ORDER BY month
        `, [itemId]);

        res.render("item_detail", { item: item[0], revenues });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;