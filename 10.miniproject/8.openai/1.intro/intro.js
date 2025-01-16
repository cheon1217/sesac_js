const axios = require("axios");

require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const url = "https://api.openai.com/v1/chat/completions";

// console.log(openaiApiKey);

async function getChatGPTResponse(userInput) {
    try {
        const response = await axios.post(url,
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: userInput }
                ],
                temperature: 1.0, // 0~1 사이의 값, 1.0으로 갈수록 창의적
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openaiApiKey}`
                },
            },
        );

        return response.data.choices[0].message.content;
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
        return "챗봇 응답을 가져오는 도중에 오류가 발생했습니다."
    }
}

async function chatWithUser() {
    const userInput = "안녕, 챗봇! 나 오늘 기분이 너무 안 좋아.";
    const aiResponse = await getChatGPTResponse(userInput);
    console.log("챗봇응답: ", aiResponse);
}

chatWithUser();
// setInterval(chatWithUser, 5000); // 5초마다 챗봇과 대화