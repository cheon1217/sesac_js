const express = require("express");
const router = express.Router();
const { OrderItem } = require("../database");

router.get("/", async (req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 20;
        const offset = (currentPage - 1) * perPage;

        const orderItem = new OrderItem();

        const orderItemsQuery = `SELECT * FROM order_items LIMIT ${perPage} OFFSET ${offset}`;
        const orderItems = await orderItem.executeQuery(orderItemsQuery);

        const countQuery = "SELECT COUNT(*) AS count FROM order_items";
        const totalCount = (await orderItem.executeQuery(countQuery)).count;

        const pagination = {
            items: orderItems,
            totalItems: totalCount,
            currentPage: parseInt(currentPage),
            totalPages: Math.ceil(totalCount / perPage),
        };

        res.render("orderitems", { pagination });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:order_id", async (req, res) => {
    try {
        const orderId = req.params.order_id;

        const orderItemModel = new OrderItem();

        const orderitems = await orderItemModel.executeQuery(`
            SELECT order_items.Id, order_items.OrderId, order_items.ItemId, items.Name AS item_name
            FROM order_items
            JOIN items ON order_items.ItemId = items.Id
            WHERE order_items.OrderId = ?
        `, [orderId]);

        orderItemModel.close();

        if (orderitems.length === 0) {
            return res.status(404).send("Order Items not found");
        }

        res.render("orderitem_detail", { orderitems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;