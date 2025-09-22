"use strict";

var Examinee = require('../models/Examinee');

var express = require('express');

var router = express.Router();

var sendEmail = require('../utils/sendMail');

var multer = require("multer");

var path = require("path"); // Storage config


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
}); // ✅ Update profile with file upload
// ✅ Update profile with file upload

router.put("/:id", upload.single("profileImage"), function _callee(req, res) {
  var _req$body, name, email, number, address, password, college, qualification, status, session, updateData, updatedExaminee;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, number = _req$body.number, address = _req$body.address, password = _req$body.password, college = _req$body.college, qualification = _req$body.qualification, status = _req$body.status, session = _req$body.session;
          updateData = {
            name: name,
            email: email,
            number: number,
            address: address,
            password: password,
            college: college,
            qualification: qualification,
            status: status,
            session: session
          };

          if (req.file) {
            updateData.profileImage = req.file.filename;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Examinee.findByIdAndUpdate(req.params.id, updateData, {
            "new": true
          }));

        case 6:
          updatedExaminee = _context.sent;

          if (updatedExaminee) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: "Examinee not found"
          }));

        case 9:
          res.json({
            success: true,
            message: "Profile updated successfully",
            data: updatedExaminee
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            success: false,
            message: "Server error"
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.get('/:id', function _callee2(req, res) {
  var id, examinee;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Examinee.findById(id));

        case 3:
          examinee = _context2.sent;

          if (examinee) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "Examinee not found"
          }));

        case 6:
          return _context2.abrupt("return", res.json({
            data: examinee
          }));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/', function _callee3(req, res) {
  var examinee;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Examinee.find());

        case 2:
          examinee = _context3.sent;
          return _context3.abrupt("return", res.json({
            data: examinee
          }));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/', function _callee5(req, res) {
  var _req$body2, email, name, existingExaminee, examinee, html;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, name = _req$body2.name;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Examinee.findOne({
            email: email
          }));

        case 3:
          existingExaminee = _context5.sent;

          if (!existingExaminee) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "Examinee with this email is already exists"
          }));

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(new Examinee(req.body));

        case 8:
          examinee = _context5.sent;
          examinee.save();
          res.status(200).json(" Examinee registered successfully");
          html = "\n  <div style=\"font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e3f2fd, #ffffff); padding: 40px;\">\n    <div style=\"max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;\">\n     \n      <!-- Header -->\n      <div style=\"background: linear-gradient(90deg, #007bff, #00c6ff); padding: 25px; text-align: center;\">\n        <h1 style=\"color: #ffffff; margin: 0; font-size: 28px;\">\uD83C\uDF93 Welcome to ExamPrep!</h1>\n      </div>\n     \n      <!-- Body -->\n      <div style=\"padding: 30px;\">\n        <p style=\"font-size: 18px; color: #333;\"><strong>Dear ".concat(name, ",</strong></p>\n\n        <p style=\"font-size: 16px; color: #555; line-height: 1.6;\">\n          We're excited to welcome you to the <strong>ExamPrep </strong>! Your registration was successful, and your account is now active.\n        </p>\n\n        <p style=\"font-size: 16px; color: #555; line-height: 1.6;\">\n          You can now log in to access your dashboard, take exams, track your progress, and explore learning resources.\n        </p>\n\n        <!-- CTA Button -->\n        <div style=\"text-align: center; margin: 30px 0;\">\n          <a href=\"https://localhost:5000/login; style=\"background: #007bff; color: #fff; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; display: inline-block;\">\n            \uD83D\uDD10 Log in to Your Account\n          </a>\n        </div>\n\n        <p style=\"font-size: 16px; color: #555;\">\n          If you have any questions or face issues logging in, feel free to contact our support team.\n        </p>\n\n        <p style=\"margin-top: 30px; font-size: 16px; color: #333;\">\n          Best regards,<br>\n          <strong>Team ExamPrep</strong>\n        </p>\n      </div>\n\n      <!-- Footer -->\n      <div style=\"background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 12px; color: #777;\">\n        This is an automated System generated message. Please do not reply to this email. \n      </div>\n    </div>\n  </div>\n");
          setTimeout(function _callee4() {
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(sendEmail(email, "welcome to the exam portal", html));

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }, 100);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
});
router["delete"]('/:id', function _callee6(req, res) {
  var id, examinee;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Examinee.findByIdAndDelete(id));

        case 3:
          examinee = _context6.sent;
          return _context6.abrupt("return", res.json({
            message: "Deleted successfully"
          }));

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.post('/login', function _callee7(req, res) {
  var _req$body3, email, password, examinee;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Examinee.findOne({
            email: email
          }));

        case 3:
          examinee = _context7.sent;

          if (examinee) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.json({
            message: "Your Email Incorrect"
          }));

        case 6:
          if (!(examinee.password == password)) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.json({
            message: "Login Successfully",
            user: {
              email: examinee.email,
              role: "user",
              id: examinee._id
            }
          }));

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // change pASSword LOGIC

router.put('/change/:id', function _callee8(req, res) {
  var _req$body4, op, np, cnp, examinee, updateExaminee;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body4 = req.body, op = _req$body4.op, np = _req$body4.np, cnp = _req$body4.cnp;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Examinee.find({
            _id: req.params.id
          }));

        case 3:
          examinee = _context8.sent;

          if (examinee) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", res.json({
            message: "User not found"
          }));

        case 6:
          if (!(examinee[0].password !== op)) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.json({
            message: "Old password is incorrect"
          }));

        case 8:
          if (!(np !== cnp)) {
            _context8.next = 10;
            break;
          }

          return _context8.abrupt("return", res.json({
            message: "New password and confirm password do not match"
          }));

        case 10:
          _context8.prev = 10;
          _context8.next = 13;
          return regeneratorRuntime.awrap(Examinee.findByIdAndUpdate(req.params.id, {
            password: np
          }, {
            "new": true
          }));

        case 13:
          updateExaminee = _context8.sent;
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](10);
          console.error('Error updating password:', _context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            message: "Server error while changing password"
          }));

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[10, 16]]);
});
module.exports = router;