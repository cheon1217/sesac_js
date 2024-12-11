require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());

const apiSecretKey = process.env.TOSS_SECRET_KEY;
if (!apiSecretKey) {
    throw new Error(`API_SECRET_API 설정해주세요.`);
}

const encryptedApiSecretKey = "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

app.use(express.static("public"));

app.post("/confirm/payment", async (req, res) => {
    const { paymentKey, orderId, amount } = req.body;
    
    try {
        const response = await axios.post("https://api.tosspayments.com/v1/payments/confirm", {
            paymentKey, orderId, amount,
        }, {
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
        });
        res.status(200).json(response.data);
    } catch (err) {
        console.error("결제 승인 요청 실패: ", err.response?.data || err.message);
        res.status(500).json({ error: err.response?.data || "결제 승인 실패" });
    }
});

app.get("/payment/success", async (req, res) => {
    const { paymentKey, orderId, amount } = req.query;
    
    if (!paymentKey || !orderId || !amount) {
        return res.status(400).send("필수 결제 정보가 누락됨");
    }

    try {
        const response = await axios.post("https://api.tosspayments.com/v1/paymets/confirm", {
            paymentKey, orderId, amount
        }, {
            headers: {
                Authorization: encryptedApiSecretKey,
                "Content-Type": "application/json",
            },
        });

        res.sendFile(path.join(__dirname, "public", "success.html"));
    } catch (err) {
        console.error("결제 검증 실패: ", err.response?.data || err.message);
        res.redirect("/payment/fail");
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "product.html"));
});

app.get("/payment/fail", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "fail.html"));
});

app.get("/config", (req, res) => {
    res.json({ clientKey: process.env.TOSS_CLIENT_KEY });
});

app.listen(PORT, () => {
    console.log("Server Ready");
});