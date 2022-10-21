const { body } = require("express-validator");

exports.resetPassword = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    .notEmpty()
    .withMessage("Email must be input"),
  body("code")
    .isNumeric()
    .withMessage("Code must be numeric")
    .isLength(6)
    .withMessage("Code must be at least 6 number"),
  body("newPassword")
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
    .withMessage("Password is missing"),
  body("confirmPassword").custom((value, { req }) => {
    if (value != req.body.newPassword) {
      throw new Error("Password not match with Confirm Password");
    }
    return true;
  }),
];
