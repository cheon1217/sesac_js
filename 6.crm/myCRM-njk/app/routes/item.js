const express = require("express");
const router = express.Router();
const { Item } = require("../database/model");

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

module.exports = router;