const express = require("express");
const router = express.Router();
const { OrderItem } = require("../database/model");

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

module.exports = router;