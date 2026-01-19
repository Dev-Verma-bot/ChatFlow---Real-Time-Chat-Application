const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: 465,
    secure:true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const send_mail = async (email, subject, body) => {
    await transporter.sendMail({
        from:  `"Convoo" <${process.env.MAIL_USER}>`,
        to:email,
        subject,
        html: `${body}`,
    });
};

module.exports = send_mail;
