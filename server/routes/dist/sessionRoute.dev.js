"use strict";

var express = require('express');

var router = express.Router();

var Session = require('../models/Session');

router.post('/', function _callee(req, res) {
  var session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          session = new Session(req.body);
          session.save();
          return _context.abrupt("return", res.json({
            message: "Session Added Successfully"
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/', function _callee2(req, res) {
  var session;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Session.find());

        case 2:
          session = _context2.sent;
          return _context2.abrupt("return", res.json({
            data: session
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router["delete"]('/:id', function _callee3(req, res) {
  var id, session;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Session.findByIdAndDelete(id));

        case 3:
          session = _context3.sent;
          return _context3.abrupt("return", res.json({
            message: "Deleted successfully"
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.put('/:id', function _callee4(req, res) {
  var id, session;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Session.findByIdAndUpdate(id, req.body));

        case 3:
          session = _context4.sent;
          return _context4.abrupt("return", res.json({
            message: "Updated Successfully"
          }));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
module.exports = router;