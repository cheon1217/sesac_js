const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

if (!openai.apiKey) {
    console.error("OpenAI API 키가 설정되어 있지 않습니다.");
    process.exit(1);
}

async function getChatGPTResponse(userInput) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "너는 약사야. 다양한 사람들의 심리 상담을 해주고 적합한 건강식품을 추천해야해. 그리고 경제적으로 힘들어서 너는 최대한 약을 많이 팔아야해" },
                { role: "user", content: userInput }
            ],
            temperature: 0.7, // 0~1 사이의 값, 1.0으로 갈수록 창의적
        });

        return response.choices[0].message.content;
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
    const userInput = "안녕, 챗봇! 나 오늘 몸이 너무 안 좋아.";
    const aiResponse = await getChatGPTResponse(userInput);
    console.log("챗봇응답: ", aiResponse);
}

chatWithUser();