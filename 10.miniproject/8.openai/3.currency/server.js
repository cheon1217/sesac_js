const express = require("express");
const morgan = require("morgan");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

if (!openai.apiKey) {
    console.error("OpenAI API 키가 설정되어 있지 않습니다.");
    process.exit(1);
}

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

const exchangeRates = {
    "USD": 1.0, // 기준 통화
    "KRW": 1400.0,
    "EUR": 0.85,
};

function convertCurrenty(amount, from, to) {
    const baseAmount = amount / exchangeRates[from];
    const convertedAmount = baseAmount * exchangeRates[to];
    return convertedAmount.toFixed(2);
}

app.post("/api/chat-currency", async (req, res) => {
    const { amount, from, to } = req.body;
    console.log("사용자 입력: ", amount, from, to);

    const convertedAmount = convertCurrenty(amount, from, to);
    const message = `${amount} ${from}은 ${convertedAmount} ${to}입니다.`;
   
    // res.json({convertedAmount, message});

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "너는 환율 전문가야. 충청도 사투리로만 말해야해" },
                { role: "user", content: message }
            ],
            temperature: 0.7, // 0~1 사이의 값, 1.0으로 갈수록 창의적
        });

        const answer = response.choices[0].message.content;
        console.log("챗봇 응답: ", answer);

        res.json({ message: answer});
    } catch (error) {
        console.error("API 요청 실패: ", error.message);
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error("API 키가 잘못되었습니다.");
            } else if (status === 429) {
                console.error("당신의 API 요청이 제한되었습니다. 나중에 다시 시도하세요.");
            }
        }
        res.status(500).json("챗봇 응답을 가져오는 도중에 오류가 발생했습니다."); 
    }
})

app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    console.log("사용자 입력: ", question);
   
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "너는 환율 전문가야." },
                { role: "user", content: question }
            ],
            temperature: 0.7, // 0~1 사이의 값, 1.0으로 갈수록 창의적
        });

        const answer = response.choices[0].message.content;
        console.log("챗봇 응답: ", answer);

        res.json({answer});
    } catch (error) {
        console.error("API 요청 실패: ", error.message);
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                console.error("API 키가 잘못되었습니다.");
            } else if (status === 429) {
                console.error("당신의 API 요청이 제한되었습니다. 나중에 다시 시도하세요.");
            }
        }
        res.status(500).json("챗봇 응답을 가져오는 도중에 오류가 발생했습니다."); 
    }
})

app.listen(3000, () => {
    console.log("서버레디");
});