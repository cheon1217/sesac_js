const express = require("express");
const router = express.Router();

// 라우트 체인
router.route("/profile")
    .get((req, res) => {
        res.send("사용자 프로필 조회");
    })
    .post((req, res) => {
        res.send("사용자 프로필 생성");
    })
    .put((req, res) => {
        res.send("사용자 프로필 수정");
    })
    .delete((req, res) => {
        res.send("사용자 프로필 삭제");
    });

module.exports = router;