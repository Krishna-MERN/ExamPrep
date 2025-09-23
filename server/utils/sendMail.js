// server/utils/sendEmail.js
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    };

    await sgMail.send(msg);
    console.log("Email sent successfully to", to);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
};

module.exports = sendMail;
