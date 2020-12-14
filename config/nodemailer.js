require("dotenv").config();
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
});

module.exports = transporter;