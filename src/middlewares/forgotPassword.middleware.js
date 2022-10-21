const { body } = require("express-validator");

exports.resetPassword = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    .notEmpty()
    .withMessage("Email must be input"),
];
