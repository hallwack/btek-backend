const { body, validationResult, param } = require("express-validator");

const userValidator = [
  body("email")
    .normalizeEmail()
    .isEmail()
    .notEmpty()
    .withMessage("Provide valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters or more")
    .notEmpty()
    .withMessage("Password is missing"),
];

const paramsUUID = [
  param("id").isUUID(4).withMessage("Invalid Id")
]

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
  paramsUUID,
  validate,
};
