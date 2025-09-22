"use strict";

var express = require('express');

var router = express.Router();

var Contact = require('../models/Contact');

router.post('/', function _callee(req, res) {
  var contact;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          contact = new Contact(req.body);
          contact.save();
          return _context.abrupt("return", res.json({
            message: "Message Sended Successfully"
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}); // GET: Fetch all messages

router.get("/", function _callee2(req, res) {
  var messages;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Contact.find().sort({
            date: -1
          }));

        case 3:
          messages = _context2.sent;
          res.json(messages);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).json({
            message: "Server error"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;