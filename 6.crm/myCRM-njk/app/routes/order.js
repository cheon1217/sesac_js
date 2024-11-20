const express = require("express");
const router = express.Router();
const { Order } = require("../database/model");

router.get("/", async (req, res) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 20;
        const offset = (currentPage - 1) * perPage;

        const order = new Order();

        const ordersQuery = `SELECT * FROM orders LIMIT ${perPage} OFFSET ${offset}`;
        const orders = await order.executeQuery(ordersQuery);

        const totalCountQuery = "SELECT COUNT(*) AS count FROM orders";
        const totalCount = (await order.executeQuery(totalCountQuery)).count;

        const pagination = {
            items: orders,
            totalItems: totalCount,
            currentPage: parseInt(currentPage),
            totalPages: Math.ceil(totalCount / perPage),
        };

        res.render("orders", { pagination });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;