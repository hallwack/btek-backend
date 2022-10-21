const { body } = require("express-validator");

exports.forgotPassword = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    .notEmpty()
    .withMessage("Email must be input"),
];
