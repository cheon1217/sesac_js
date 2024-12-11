const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 465,
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD,
    }
})
console.log(transport);

const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: process.env.SENDTO_EMAIL,
    subject: "테스트 이메일",
    text: "안녕하세요, 이것은 나의 네이버 메일에서 보낸 메일입니다."
}

console.log(mailOptions.from);
console.log(mailOptions.to);

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log("이메일 전송 성공: ", info.response);
    }
});