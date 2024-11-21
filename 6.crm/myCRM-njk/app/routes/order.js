const express = require("express");
const router = express.Router();
const { Order } = require("../database");

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

router.get("/:order_id", async (req, res) => {
    try {
        const orderId = req.params.order_id;

        const orderModel = new Order();

        const orders = await orderModel.executeQuery(`
            SELECT * FROM orders WHERE id = ?
        `, [orderId]);

        orderModel.close();

        res.render("order_detail", { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;