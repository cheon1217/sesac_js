const express = require("express");
const router = express.Router();

// 라우트 체인
router.route("/")
    .get((req, res) => {
        res.send("상품 조회");
    })
    .post((req, res) => {
        res.send("상품 생성");
    })
    .put((req, res) => {
        res.send("상품 갯수 수정");
    })
    .delete((req, res) => {
        res.send("상품 삭제");
    });

module.exports = router;