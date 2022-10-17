const { check, validationResult } = require("express-validator");

const userValidator = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .notEmpty()
    .withMessage("Provide valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters or more")
    .notEmpty()
    .withMessage("Password is missing"),
];

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      results: errors.array(),
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation Cannot Work Correctly",
      results: err.message,
    });
  }
};

module.exports = {
  userValidator,
  validate,
};
