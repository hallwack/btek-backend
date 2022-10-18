const { body, query, validationResult, param } = require("express-validator");

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
  validate,
};
