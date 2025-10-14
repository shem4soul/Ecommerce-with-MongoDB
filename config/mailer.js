const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

module.exports = transporter;

// const nodemailer = require("nodemailer");
// const mg = require("nodemailer-mailgun-transport");
// require("dotenv").config();

// const mailgunAuth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
//   },
// };

// const transporter = nodemailer.createTransport(mg(mailgunAuth));

// module.exports = transporter;
