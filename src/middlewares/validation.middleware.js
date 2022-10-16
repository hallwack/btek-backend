const { check, validationResult } = require("express-validator");

const userValidation = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .notEmpty()
    .withMessage("Provide valid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character")
    .notEmpty()
    .withMessage("Password is missing"),
];

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    return res.status(422).json({
      errors: errors.array(),
    });
  } catch (err) {
    return res.status(400).json({
      errors: err,
    });
  }
};

module.exports = {
  userValidation,
  validate,
};
