"use strict";

// server/utils/sendEmail.js
var sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var sendMail = function sendMail(to, subject, html) {
  var msg;
  return regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          msg = {
            to: to,
            from: process.env.EMAIL_FROM,
            subject: subject,
            html: html
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(sgMail.send(msg));

        case 4:
          console.log("Email sent successfully to", to);
          return _context.abrupt("return", true);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error("Error sending email:", _context.t0);

          if (_context.t0.response) {
            console.error(_context.t0.response.body);
          }

          return _context.abrupt("return", false);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = sendMail;