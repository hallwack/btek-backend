const { body } = require("express-validator");

exports.login = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    .notEmpty()
    .withMessage("Provide valid email"),
  /* body("password")
    .isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
    .withMessage(
      "Password must be at least 8 characters or more, including 1 symbol, 1 uppercase, and 1 number"
    )
    .notEmpty()
    .withMessage("Password is missing"), */
];
